"""读音陷阱词典 —— tts.py --dry-run / 正式合成前自动扫描用。

每期踩一个新的坑就往里加一条，别让同一个坑踩两次。
只有「确定会读错」的才收，没把握的不收（会误报，误报多了就没人看警告了）。

两类：
    REWRITE  读法是错的，第二字段必须改写（缩写、字母数字混写、数字读法）。
    PAUSE    读法本身对，但 TTS 容易在词中断开或加停顿，第二字段要连写。

检查逻辑（tts.py 里实现）：
    第二字段为 None → 拿字幕文本查；非 None → 拿朗读文本查。
    朗读文本里仍命中原词 = 没改干净，照样警告。
"""

import re

# (正则, 说明)。说明要写清「会被读成什么」和「第二字段该怎么写」。
REWRITE = [
    (r"B2[BCG]|C2C",
     "数字会被念成「二」，第二字段写「B to B」这种读法"),
    (r"O2O|P2P",
     "数字会被念成「二」，第二字段写「O to O」「P to P」"),
    (r"\b[A-Z]{2,}\d+\b",
     "字母数字混写（SU7 / YU7 / X40 这类），第二字段拆开写「S U 七」"),
    (r"MIUI",
     "整体连读会怪，第二字段写「M I U I」"),
    (r"\d+ 代\b",
     "「1 代 2 代」建议第二字段写「一代二代」，数字直接念可能读成日期"),
]

# (正则, 说明)
PAUSE = [
    (r"第[一二三四五六七八九十百千0-9]+大",
     "「第五大」这类容易在「第 X」后断开，第二字段整词连写（如「全球第五大的互联网公司」），别在中间加标点"),
]


def scan(text: str):
    """返回 text 命中的 [(命中词, 类别, 说明)]，给 tts.py 用。"""
    hits = []
    for pat, tip in REWRITE:
        m = re.search(pat, text)
        if m:
            hits.append((m.group(0), "REWRITE", tip))
    for pat, tip in PAUSE:
        m = re.search(pat, text)
        if m:
            hits.append((m.group(0), "PAUSE", tip))
    return hits
