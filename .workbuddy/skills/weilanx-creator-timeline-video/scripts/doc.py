"""
时间轴长卷风 · 口播文稿 + 事实核查表排版

把 cues.json（配音实测出来的时间轴）和一份核查配置排成可以直接发给人看的
markdown：分段时间码文稿、逐条事实核查、修正记录、存疑点。

用法（工程根目录）：

    python .workbuddy/skills/weilanx-creator-timeline-video/scripts/doc.py --ep ep53-xxx

读取：

    src/episodes/<期>/cues.json       配音脚本产出的时间轴（必需）
    docs/<期>-核查.json               核查配置（必需，格式见下）

产出：

    docs/<期>-口播文稿与事实核查.md

docs/<期>-核查.json 格式：

    {
      "title": "小米 16 年",
      "lede": "一句话说明这期讲什么（可选）",
      "tail": 0.9,
      "segs": [[1, 7, "钩子：7000 亿和 4 万台是同一家"], [8, 14, "2010 银谷大厦"]],
      "checks": [
        [1, "已改", "2026-10-20 收盘 27.06 港元，总市值 6967 亿。原文 6614 亿是 9 月数据。"],
        [8, "无误", "小米官网大事记：2010-04-06 成立。"],
        [75, "存疑", "两种口径都能查到，片里按 A 说，需要用户确认。"]
      ],
      "notes": "## 画面文字同步清单\\n\\n- ...（可选，原样插在正文末尾）"
    }

checks 里三列是「第几句 / 结论 / 依据」。结论只有三种：

    无误   查到了明确出处，和片里说的一致
    已改   原来说法有误或不严谨，已经改了（脚本会自动列出改前 → 改后）
    存疑   查不到明确出处，或者两种口径都有，交付时要单独告诉用户

分段（segs）必须是连续的、覆盖第 1 句到最后一句，脚本会校验，漏句会报错。
"""

import argparse
import json
import os
import sys

STATUS_TAG = {"已改": "❌ 已修正", "无误": "✅ 核实无误", "存疑": "⚠️ 存疑待确认"}


def root_dir() -> str:
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))


def ts(sec: float) -> str:
    m, s = divmod(sec, 60)
    return "%d:%04.1f" % (int(m), s)


def read_voice(root: str, ep: str):
    """从 audio/lines/<期>.py 里读发音人参数，读不到就返回 None。"""
    p = os.path.join(root, "audio", "lines", ep + ".py")
    if not os.path.isfile(p):
        return None
    import re

    txt = open(p, encoding="utf-8").read()
    got = {}
    for k in ("VOICE", "RATE", "PITCH"):
        m = re.search(k + r"\s*=\s*[\"']([^\"']+)[\"']", txt)
        if m:
            got[k] = m.group(1)
    if "VOICE" not in got:
        return None
    extra = " / ".join("%s %s" % (k.lower(), got[k]) for k in ("RATE", "PITCH") if k in got)
    return "`%s`%s" % (got["VOICE"], ("，" + extra) if extra else "")


def main():
    ap = argparse.ArgumentParser(description="口播文稿 + 事实核查表排版")
    ap.add_argument("--ep", required=True)
    ap.add_argument("--out", help="输出路径，默认 docs/<ep>-口播文稿与事实核查.md")
    args = ap.parse_args()

    root = root_dir()
    ep = args.ep

    cues_path = os.path.join(root, "src", "episodes", ep, "cues.json")
    cfg_path = os.path.join(root, "docs", ep + "-核查.json")
    for p in (cues_path, cfg_path):
        if not os.path.isfile(p):
            sys.exit("缺文件：%s" % p)

    cues = json.load(open(cues_path, encoding="utf-8"))
    cfg = json.load(open(cfg_path, encoding="utf-8"))

    tail = float(cfg.get("tail", 0.9))
    segs = [tuple(s) for s in cfg.get("segs", [])]
    checks = cfg.get("checks", [])
    title = cfg.get("title", ep)
    lede = cfg.get("lede", "")

    # 校验分段连续性：写漏一句会让整张表错位，而且很难一眼看出来
    if segs:
        expect = 1
        for a, b, _ in segs:
            if a != expect:
                sys.exit("segs 不连续：上一段止于 %d，下一段从 %d 开始" % (expect - 1, a))
            if b < a:
                sys.exit("segs 区间反了：%r" % ((a, b),))
            expect = b + 1
        if expect - 1 != len(cues):
            sys.exit("segs 只覆盖到第 %d 句，cues 有 %d 句" % (expect - 1, len(cues)))

    by_i = {c["i"]: c for c in cues}
    changed = [c for c in checks if c[1] == "已改"]
    doubt = [c for c in checks if c[1] == "存疑"]
    total_s = cues[-1]["end"] + tail

    L = []
    L.append("# 《%s》口播文稿 · 事实核查版\n" % title)
    L.append("> 工程：`weilanx-claude-videos` · 作品 ID `%s`\n" % ep)
    if lede:
        L.append("%s\n" % lede)
    L.append("| 项 | 值 |\n|---|---|")
    L.append("| 成片 | `out/%s.mp4`（1920×1080 / 30fps / H.264 + AAC） |" % ep)
    L.append("| 时长 | %d 分 %.1f 秒（%.2fs，%d 帧 @30fps） |" % (
        total_s // 60, total_s % 60, total_s, int(round(total_s * 30))))
    voice = read_voice(root, ep)
    L.append("| 口播 | %d 句%s |" % (
        len(cues), ("，edge-tts " + voice) if voice else ""))
    L.append("| 配乐 | `audio/episodes/%s.mjs`，程序化合成总谱 |" % ep)
    L.append("| 文案源 | `audio/lines/%s.py` 的 `LINES`（改这里，重跑 tts.py 即可） |" % ep)
    L.append("| 时间轴 | `src/episodes/%s/cues.json`（配音实测反推，和画面同源） |" % ep)
    if checks:
        L.append("| 核查结论 | 硬事实 %d 条，%d 条有误已修正，%d 条核实无误，%d 条存疑 |\n" % (
            len(checks), len(changed),
            len([c for c in checks if c[1] == "无误"]), len(doubt)))
    else:
        L.append("")

    # ---- 文稿 ----
    L.append("---\n")
    L.append("## 一、口播文稿（%d 句，分 %d 段）\n" % (len(cues), len(segs) or 1))
    L.append("时间码是配音实测反推的起播时间，与画面 `cf(n)` 同源。表格右列是画面上的关键文字。\n")

    if not segs:
        segs = [(1, len(cues), "全篇")]

    for a, b, name in segs:
        L.append("### %s（第 %d–%d 句）\n" % (name, a, b))
        L.append("| # | 起 | 止 | 台词 |")
        L.append("|---|---|---|---|")
        for i in range(a, b + 1):
            c = by_i.get(i)
            if not c:
                continue
            L.append("| %d | %s | %s | %s |" % (i, ts(c["start"]), ts(c["end"]), c["text"]))
        L.append("")

    # ---- 核查 ----
    if checks:
        L.append("---\n")
        L.append("## 二、事实核查（逐条）\n")
        L.append("只核「有出处可查」的硬信息：数字、日期、引语、名次、绝对说法（第一次/唯一/最）。"
                 "观点、形容、时间顺序不在核查范围内。\n")
        L.append("| # | 台词 | 结论 | 依据 |")
        L.append("|---|---|---|---|")
        for item in checks:
            i, status, note = item[0], item[1], item[2]
            c = by_i.get(i)
            text = c["text"] if c else "（cues 里没有第 %d 句）" % i
            L.append("| %d | %s | %s | %s |" % (i, text, STATUS_TAG.get(status, status), note))
        L.append("")

        if changed:
            L.append("---\n")
            L.append("## 三、修正记录（%d 处）\n" % len(changed))
            L.append("这些是原稿里**看起来很像真的**但实际站不住的说法，逐条记下来备查。\n")
            L.append("| # | 改前 | 改后 | 为什么 |")
            L.append("|---|---|---|---|")
            for item in changed:
                i, _, note = item[0], item[1], item[2]
                before = item[3] if len(item) > 3 and item[3] else "—"
                c = by_i.get(i)
                L.append("| %d | %s | %s | %s |" % (
                    i, before, c["text"] if c else "", note))
            L.append("")
            L.append("> 「改前」来自 `docs/%s-核查.json` 里 `checks` 的第 4 列。"
                     "写核查配置时把原句一并填进去，这份记录才有价值。\n" % ep)

        if doubt:
            L.append("---\n")
            L.append("## 四、存疑点（交付时要单独跟用户说）\n")
            for item in doubt:
                i, note = item[0], item[2]
                c = by_i.get(i)
                L.append("- 第 %d 句「%s」：%s" % (i, c["text"] if c else "", note))
            L.append("")

    if cfg.get("notes"):
        L.append("---\n")
        L.append("## 五、附注\n")
        L.append(cfg["notes"].strip() + "\n")

    out_path = args.out or os.path.join(root, "docs", ep + "-口播文稿与事实核查.md")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(L))

    print("wrote %s（%d 行）" % (out_path, len(L)))
    print("时长 %.2fs / %d 帧；核查 %d 条（改 %d、无误 %d、存疑 %d）" % (
        total_s, int(round(total_s * 30)), len(checks), len(changed),
        len([c for c in checks if c[1] == "无误"]), len(doubt)))


if __name__ == "__main__":
    main()
