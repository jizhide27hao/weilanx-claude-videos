#!/usr/bin/env bash
# 为某一期生成「能盖过配音」的音效副本。
#
# 用法：bash .workbuddy/skills/weilanx-creator-receipt-video/scripts/sfx-eq.sh <期>
#   bash .../sfx-eq.sh ep60-child-cost
#   bash .../sfx-eq.sh ep60-child-cost paper type stamp    # 只处理指定的几个
#
# 从 public/audio/sfx/ 复制并做 EQ，输出到 public/audio/<期>/sfx/。
#
# 为什么必须做：配音 RMS ≈ 2500，撕纸音效满音量 RMS 只有 1800，而且频段重叠，
# 混进成片后完全听不见。把能量往 2.6k / 5.2k 推，就能从配音的中低频里钻出来。
#
# 不要用 alimiter：limit=0.88 时输出仍有 -1.0 样本（attack 瞬态超调）。
# 用纯 volume 增益，峰值从 32768 降到 15-25k，clip=0。
#
# 参数与 ep60 一致，但源文件和 ffmpeg 版本不同时不保证逐字节相同 ——
# 输出只要满足「max_volume 在 -1 ~ -4 dB、mean_volume 明显高于 -30 dB」就能用。
set -euo pipefail

EP=${1:?用法：sfx-eq.sh <期> [音效名...]}
SRC=public/audio/sfx
DST=public/audio/$EP/sfx

if [[ ! -d $SRC ]]; then
  echo "✗ 源目录不存在：$SRC" >&2
  exit 1
fi

mkdir -p "$DST"

if [[ $# -gt 1 ]]; then
  NAMES=("${@:2}")
else
  NAMES=(paper type click stamp whoosh snip ding)
fi

for n in "${NAMES[@]}"; do
  src="$SRC/$n.wav"
  if [[ ! -f "$src" ]]; then
    echo "· 跳过 $n（源文件不存在）"
    continue
  fi
  ffmpeg -y -loglevel error -i "$src" \
    -af "equalizer=f=2600:t=q:w=1:g=5,equalizer=f=5200:t=q:w=1:g=3,volume=-6dB" \
    "$DST/$n.wav"
  # 报告峰值与 RMS，确认没有削波（RMS 要够高才盖得过配音）
  stats=$(ffmpeg -hide_banner -i "$DST/$n.wav" -af volumedetect -f null - 2>&1 || true)
  peak=$(printf '%s' "$stats" | grep -o 'max_volume: [-0-9.]* dB' | head -1)
  rms=$(printf '%s' "$stats" | grep -o 'mean_volume: [-0-9.]* dB' | head -1)
  echo "✓ $n.wav  ${peak:-?} / ${rms:-?}"
done

echo
echo "→ $DST"
echo "  装配时配音 volume 给 0.72，音效统一 1.0，并在音效点上做闪避。"
