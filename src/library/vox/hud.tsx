import React from 'react';
import {V, VF} from './theme';

/* ============ 右上角禁区 ============ */

/**
 * 年份计数器是**屏幕固定层**，压在世界层上面。它盖住的那块地方，任何世界坐标里的
 * 内容经过时都会被切掉半截 —— 一排刻度字只剩最后两个字露在左边，一句注释从右边缘
 * 钻出来半句，这类残字比"看不见"难看十倍。
 *
 * 实测占位（1920×1080）：盒宽 330 + 左右 padding 18 = 366，右边距 36、上边距 28，
 * 盒高约 150（76 年份 + 10 + 14 进度条 + 4 + 22 底行 + 24 padding），阴影再往右下拉 8。
 *   → 盒子落在 x 1518–1884、y 28–178，视觉到 ~190
 */
export const HUD_BOX = {right: 36, top: 28, w: 366, h: 150} as const;

/**
 * 禁区（加了 24px 呼吸）：屏幕 x ≥ 1490 且 y ≤ 210 这一块不放任何内容。
 * 排布时按这个算；装饰性元素（刻度、图例、格线标签）用 hudHit 在运行时自己让开。
 */
export const HUD_SAFE = {x: 1490, y: 210} as const;

/** 世界坐标 → 屏幕坐标（跟 VoxShow 的 World 同一套变换） */
export const toScreen = (wx: number, wy: number, cam: {x: number; y: number; z: number}, W = 1920, H = 1080) => ({
  x: (wx - cam.x) * cam.z + W / 2,
  y: (wy - cam.y) * cam.z + H / 2,
});

/**
 * 世界里的一个矩形（左上角 wx/wy，本体宽高 w/h，会被 cam.z 缩放）此刻是否压到禁区。
 * 给装饰元素用：命中就淡出，别让它在 HUD 底下露出半截。
 */
export const hudHit = (wx: number, wy: number, w: number, h: number, cam: {x: number; y: number; z: number}, W = 1920, H = 1080) => {
  const a = toScreen(wx, wy, cam, W, H);
  const b = toScreen(wx + w, wy + h, cam, W, H);
  const x0 = Math.min(a.x, b.x);
  const x1 = Math.max(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const y1 = Math.max(a.y, b.y);
  return x1 > HUD_SAFE.x && x0 < W && y0 < HUD_SAFE.y && y1 > 0;
};

/**
 * 同上，但返回 0–1 的透明度而不是布尔：接近禁区时平滑淡出，相机横移时不会闪。
 * pad 是淡出带宽度（屏幕 px），装饰元素给 160 左右最自然。
 */
export const hudFade = (wx: number, wy: number, w: number, h: number, cam: {x: number; y: number; z: number}, pad = 160, W = 1920, H = 1080) => {
  const a = toScreen(wx, wy, cam, W, H);
  const b = toScreen(wx + w, wy + h, cam, W, H);
  const x1 = Math.max(a.x, b.x);
  const y0 = Math.min(a.y, b.y);
  const y1 = Math.max(a.y, b.y);
  if (y1 < 0 || y0 > HUD_SAFE.y) return 1;
  const t = (x1 - (HUD_SAFE.x - pad)) / pad;
  return Math.max(0, Math.min(1, 1 - t));
};

/**
 * 屏幕右上角的年份计数器：大字年份 + 一条从 from 到 to 的进度条。
 * bands 是进度条上的浅色区段（比如寒冬、低谷），year 由调用方按口播或相机算好。
 */
export const YearCounter: React.FC<{year: number; from: number; to: number; title: string; bands?: [number, number][]; bandColor?: string}> = ({year, from, to, title, bands = [], bandColor = 'rgba(160,186,206,0.7)'}) => {
  const y = Math.round(Math.max(from, Math.min(to, year)));
  const p = (y - from) / (to - from);
  return (
    <div style={{position: 'absolute', right: HUD_BOX.right, top: HUD_BOX.top, background: V.ink, padding: '10px 18px 14px', width: HUD_BOX.w - 36, boxShadow: '3px 6px 8px rgba(23,23,22,0.3)'}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: VF.num, fontSize: 76, color: V.paper, lineHeight: 1}}>{y}</div>
        <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.hiSolid, whiteSpace: 'nowrap'}}>{title}</div>
      </div>
      <div style={{position: 'relative', height: 14, marginTop: 10}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 6, height: 3, background: 'rgba(238,237,237,0.4)'}} />
        {bands.map(([a, b]) => (
          <div key={a} style={{position: 'absolute', left: `${((a - from) / (to - from)) * 100}%`, width: `${((b - a) / (to - from)) * 100}%`, top: 3, height: 9, background: bandColor}} />
        ))}
        <div style={{position: 'absolute', left: 0, width: `${p * 100}%`, top: 5, height: 5, background: V.red}} />
        <div style={{position: 'absolute', left: `calc(${p * 100}% - 7px)`, top: 0, width: 14, height: 14, borderRadius: 7, background: V.red, border: `2px solid ${V.paper}`}} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: VF.num, fontSize: 18, color: 'rgba(238,237,237,0.6)', marginTop: 4}}>
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  );
};

/**
 * 按口播算年份：stops 是 [开始帧, 年份, 滚动帧数]，到了开始帧就从上一个年份滚到这一年。
 * 滚动帧数默认 12（快速翻过去），给大一点就是「慢慢走过十几年」。
 */
export const rollYear = (f: number, stops: [number, number, number?][], step: (f: number) => number) => {
  let prev = stops[0][1];
  let cur = prev;
  let at = 0;
  let dur = 12;
  for (const [s, y, d] of stops) {
    if (f < s) break;
    prev = cur;
    cur = y;
    at = s;
    dur = d ?? 12;
  }
  const t = Math.min(1, (step(f) - at) / dur);
  return prev + (cur - prev) * (dur > 12 ? t : 1 - Math.pow(1 - t, 3));
};
