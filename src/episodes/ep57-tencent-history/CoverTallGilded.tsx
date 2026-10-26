import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/**
 * ep57 暗金文献版 · 3:4 竖版封面（1080×1440）。
 * 一张账页：系列号、年份、两行金标题、一条 28 年的对数市值线、一枚朱印。
 */

const W = 1080;
const H = 1440;

const X0 = 96;
const X1 = 984;
const BASE = 1150;
const TOPY = 838;
const L0 = Math.log10(3);
const L1 = Math.log10(73500);

const x = (yr: number) => X0 + ((yr - 1999.2) / (2026.8 - 1999.2)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

/** 腾讯市值线（亿港元，对数刻度）：1999 估值 → 2004 上市 → 2016 两万亿 → 2021 峰值 → 2022 坠落 → 2026 回落 */
const CAP: [number, number][] = [
  [1999.2, 3.5],
  [2000.3, 4.3],
  [2001.5, 4.7],
  [2004.46, 62],
  [2006, 200],
  [2008.5, 500],
  [2011, 2500],
  [2014.2, 8000],
  [2016.7, 20000],
  [2018.05, 45000],
  [2018.8, 24000],
  [2020.5, 48000],
  [2021.05, 73500],
  [2022.8, 19600],
  [2024.6, 32000],
  [2026.05, 60000],
  [2026.8, 35000],
];

const PATH = CAP.map(([yr, v]) => `${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).reduce((acc, p, i) => acc + (i ? ' L' : 'M') + p, '');

export const Ep57CoverTallGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[52, 24]} />
    <Dust f={0} n={40} w={W} h={H} seed={57} />

    <div style={{position: 'absolute', left: 96, top: 88, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 6, color: G.gold}}>科技简史 · 04</div>
    </div>

    <div style={{position: 'absolute', left: 96, top: 168, fontFamily: GF.num, fontSize: 30, letterSpacing: 10, color: G.ivoryFaint}}>1998 — 2026</div>

    <div style={{position: 'absolute', left: 92, top: 232, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 26, ...goldText(1)}}>腾讯</div>
    <div style={{position: 'absolute', left: 92, top: 452, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 20, ...goldText(1)}}>28 年</div>

    <div style={{position: 'absolute', left: 96, top: 720, width: 700, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 752, fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory}}>50 万起家，100 万没人要</div>
    <div style={{position: 'absolute', left: 96, top: 806, fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryDim}}>
      做到 <span style={{...goldTextLight(0.22)}}>7.35 万亿</span>，中间腰斩两次
    </div>

    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      {[10, 100, 10000].map((v) => (
        <line key={v} x1={X0} y1={y(v)} x2={X1} y2={y(v)} stroke="rgba(239,230,210,0.055)" />
      ))}
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.4} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2021.05)} cy={y(73500)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2021.05) + 14} y={y(73500) + 40} fontFamily={GF.num} fontSize={30} fill={G.goldBright}>7.35 万亿</text>
      <text x={X0} y={BASE + 34} fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>1999 估值 550 万美元</text>
      <text x={X1} y={BASE + 34} textAnchor="end" fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>2026</text>
    </svg>

    <div style={{position: 'absolute', left: 96, top: 1234, fontFamily: GF.cn, fontWeight: 700, fontSize: 50, letterSpacing: 4, color: G.ivory}}>差 40 万，差点卖掉</div>
    <div style={{position: 'absolute', right: 92, top: 1216}}>
      <SealMark text="没卖" size={112} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 72, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 16, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>市值 · 对数刻度</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
