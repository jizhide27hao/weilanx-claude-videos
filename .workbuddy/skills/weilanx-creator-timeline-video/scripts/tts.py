"""
时间轴长卷风 · 配音与字幕时间轴生成（通用版）

做法：把整篇口播拆成一句一条，逐条丢给 edge-tts 合成 mp3，用实测时长
反推出 cues.json（第 n 句的起止秒）。画面只要跟着 cf(n) / cw(n, '词') 写，
就一定和声音对得上 —— 不需要手猜每句多长。

用法（工程根目录，先 export NODE_OPTIONS 不是必需的，这个脚本不跑 node）：

    # 1) 写文案：audio/lines/<期>.py
    # 2) 生成配音和时间轴
    python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep ep53-xxx

常用开关：

    --lines <path>     文案文件，默认 audio/lines/<期>.py
    --voice  <name>    覆盖文案里的 VOICE，例如 zh-CN-XiaoyiNeural
    --rate   "+30%"    覆盖 RATE
    --pitch  "-3Hz"    覆盖 PITCH
    --dry-run          只解析、校验和打印，不联网合成

产出：

    public/audio/<期>/voice.wav    48kHz 立体声
    src/episodes/<期>/cues.json    [{i, start, end, text}]

文案文件格式（所有字段可选，缺省用下面的默认值）：

    VOICE = "zh-CN-XiaoxiaoNeural"
    RATE  = "+30%"
    PITCH = "-3Hz"
    LEAD  = 0.45
    GAP   = 0.22
    TAIL  = 0.9
    # (字幕文本, 朗读文本或 None)；给 None 时用文本本身
    LINES = [
        # ---- 钩子 ----
        ("现在，小米市值近 7000 亿港元", None),
        ("小米 1 代，1999 元", "小米一代，一千九百九十九元"),
    ]

为什么第二个字段有用：字幕要保留阿拉伯数字（观众看得清），但 TTS 念
"1999" 时读法不一定对，这时给一个纯汉字版本，字号对齐仍然按字幕文本走。
"""

import argparse
import asyncio
import importlib.util
import json
import os
import random
import subprocess
import sys
import tempfile

DEFAULTS = {
    "VOICE": "zh-CN-XiaoxiaoNeural",
    "RATE": "+30%",
    "PITCH": "-3Hz",
    "LEAD": 0.45,
    "GAP": 0.22,
    "TAIL": 0.9,
}


def root_dir() -> str:
    """脚本在 .workbuddy/skills/<skill>/scripts/ 下，往上四层是工程根目录。"""
    here = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(here, "..", "..", "..", ".."))


def load_module(path: str):
    spec = importlib.util.spec_from_file_location("ep_lines", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def readings_scan(text: str):
    """查同目录 readings.py 里的读音陷阱词典。词典不存在就静默跳过。"""
    here = os.path.dirname(os.path.abspath(__file__))
    rd = os.path.join(here, "readings.py")
    if not os.path.isfile(rd):
        return []
    try:
        spec = importlib.util.spec_from_file_location("vox_readings", rd)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return mod.scan(text)
    except Exception:
        return []


def normalize_lines(raw) -> list:
    """允许 ("文本",) / "文本" / ("文本", None) 三种写法。"""
    out = []
    for k, item in enumerate(raw, 1):
        if isinstance(item, str):
            out.append((item, None))
        elif isinstance(item, (list, tuple)):
            text = str(item[0]).strip()
            say = item[1] if len(item) > 1 else None
            out.append((text, str(say).strip() if say else None))
        else:
            raise ValueError("第 %d 条文案格式不认识：%r" % (k, item))
        if not out[-1][0]:
            raise ValueError("第 %d 条文案是空的" % k)
    return out


def probe_duration(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def silence(sec: float, path: str):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi",
         "-i", "anullsrc=r=48000:cl=stereo", "-t", "%.3f" % sec,
         "-c:a", "pcm_s16le", path],
        check=True,
    )


async def synth(text: str, path: str, voice: str, rate: str, pitch: str, tries: int = 7):
    """微软 edge 的朗读端点会间歇性回 503（限流），退避重试。

    一次连发几十条几乎一定会被拦，所以重试是必需的，不是保险。
    """
    import edge_tts

    for k in range(tries):
        try:
            c = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
            await c.save(path)
            return
        except Exception as e:  # noqa: BLE001
            if k == tries - 1:
                raise
            wait = min(20.0, 1.5 * (2 ** k)) + random.random()
            print("  重试 %d/%d（%s），等 %.1fs" % (k + 1, tries - 1, type(e).__name__, wait),
                  flush=True)
            await asyncio.sleep(wait)


async def run(args):
    root = root_dir()
    ep = args.ep
    lines_path = args.lines or os.path.join(root, "audio", "lines", ep + ".py")
    if not os.path.isfile(lines_path):
        sys.exit("找不到文案文件：%s\n先按参考格式写一份（见本脚本开头的说明）。" % lines_path)

    mod = load_module(lines_path)
    lines = normalize_lines(getattr(mod, "LINES", []))
    if not lines:
        sys.exit("文案文件里 LINES 是空的：%s" % lines_path)

    voice = args.voice or getattr(mod, "VOICE", DEFAULTS["VOICE"])
    rate = args.rate or getattr(mod, "RATE", DEFAULTS["RATE"])
    pitch = args.pitch or getattr(mod, "PITCH", DEFAULTS["PITCH"])
    lead = float(getattr(mod, "LEAD", DEFAULTS["LEAD"]))
    gap = float(getattr(mod, "GAP", DEFAULTS["GAP"]))
    tail = float(getattr(mod, "TAIL", DEFAULTS["TAIL"]))

    # 文案自检：这几条在写画面时最容易踩
    warn = []
    for i, (text, say) in enumerate(lines, 1):
        if len(text) > 26:
            warn.append("第 %d 句 %d 字，偏长（Vox 式短句建议 ≤ 22 字）" % (i, len(text)))
        if "——" in text:
            warn.append("第 %d 句含破折号，TTS 停顿会怪" % i)
        # 读音陷阱：字幕/朗读文本命中词典，且读法没改干净的
        # 词典在同目录 readings.py，每期踩新坑就往里加
        hay = say if say is not None else text
        for hit, kind, tip in readings_scan(hay):
            if say is None:
                warn.append("第 %d 句命中「%s」：%s（现在没写第二字段）" % (i, hit, tip))
            elif kind == "REWRITE":
                warn.append("第 %d 句第二字段里仍含「%s」：%s" % (i, hit, tip))
            else:
                warn.append("第 %d 句命中「%s」：%s（已写第二字段，确认连读没被断开）" % (i, hit, tip))
    if len(lines) < 40:
        warn.append("只 %d 句：3–4 分钟的片子通常 65–90 句" % len(lines))

    print("期号    %s" % ep)
    print("文案    %s（%d 句）" % (lines_path, len(lines)))
    print("发音人  %s  rate %s  pitch %s" % (voice, rate, pitch))
    print("节奏    LEAD %.2fs / GAP %.2fs / TAIL %.2fs" % (lead, gap, tail))
    for w in warn:
        print("  ⚠ %s" % w)
    if args.dry_run:
        print("\n--dry-run：不合成。")
        for i, (text, say) in enumerate(lines, 1):
            print("%3d  %s%s" % (i, text, "" if not say else "   （读作：%s）" % say))
        return

    outdir = os.path.join(root, "public", "audio", ep)
    os.makedirs(outdir, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="tts-%s-" % ep)

    clips = []
    for i, (text, say) in enumerate(lines, 1):
        mp3 = os.path.join(tmp, "%03d.mp3" % i)
        wav = os.path.join(tmp, "%03d.wav" % i)
        await synth(say or text, mp3, voice, rate, pitch)
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", mp3,
             "-ar", "48000", "-ac", "2", wav],
            check=True,
        )
        d = probe_duration(wav)
        clips.append((i, text, wav, d))
        await asyncio.sleep(0.25)  # 句间节流，别把端点打满
        print("%3d  %5.2fs  %s" % (i, d, text), flush=True)

    sp_gap = os.path.join(tmp, "gap.wav")
    sp_lead = os.path.join(tmp, "lead.wav")
    sp_tail = os.path.join(tmp, "tail.wav")
    silence(gap, sp_gap)
    silence(lead, sp_lead)
    silence(tail, sp_tail)

    seq = [sp_lead]
    cues = []
    t = lead
    for i, text, wav, d in clips:
        cues.append({"i": i, "start": round(t, 2), "end": round(t + d, 2), "text": text})
        seq.append(wav)
        t += d
        if i != len(clips):
            seq.append(sp_gap)
            t += gap
    seq.append(sp_tail)
    total = t + tail

    listfile = os.path.join(tmp, "list.txt")
    with open(listfile, "w", encoding="utf-8") as f:
        for p in seq:
            f.write("file '%s'\n" % p.replace("\\", "/"))

    voice_path = os.path.join(outdir, "voice.wav")
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
         "-i", listfile, "-c", "copy", voice_path],
        check=True,
    )

    cues_path = os.path.join(root, "src", "episodes", ep, "cues.json")
    os.makedirs(os.path.dirname(cues_path), exist_ok=True)
    with open(cues_path, "w", encoding="utf-8") as f:
        json.dump(cues, f, ensure_ascii=False, indent=1)

    print("\nvoice.wav  %.2fs" % probe_duration(voice_path))
    print("cues       %d 条" % len(cues))
    print("TOTAL      %.2fs  (%d 帧 @30fps)" % (total, round(total * 30)))
    print("→ %s" % voice_path)
    print("→ %s" % cues_path)
    print("\n下一步：cues.ts 的 VOICE_SECONDS 写 %.2f；timeline.ts 和 film.tsx 里所有的"
          % (cues[-1]["end"] + tail))
    print("cf(n) / cw(n,'词') 都按这份 cues.json 对齐。")


def main():
    ap = argparse.ArgumentParser(description="时间轴长卷风 · 配音与字幕时间轴生成")
    ap.add_argument("--ep", required=True, help="作品 ID，如 ep53-xxx")
    ap.add_argument("--lines", help="文案文件路径，默认 audio/lines/<ep>.py")
    ap.add_argument("--voice", help="覆盖发音人")
    ap.add_argument("--rate", help="覆盖语速，如 +30%%")
    ap.add_argument("--pitch", help="覆盖音高，如 -3Hz")
    ap.add_argument("--dry-run", action="store_true", help="只解析和打印，不合成")
    args = ap.parse_args()

    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:  # noqa: BLE001
            pass
    asyncio.run(run(args))


if __name__ == "__main__":
    main()
