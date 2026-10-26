import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/**
 * ep59 暗金文献版 · 3:4 竖版封面（1080×1440）。
 * 一张账页：系列号、年份、两行金标题、一条 26 年的对数市值线、一枚朱印。
 */

const W = 1080;
const H = 1440;

const X0 = 96;
const X1 = 984;
const BASE = 1150;
const TOPY = 838;
const L0 = Math.log10(15000);
const L1 = Math.log10(67000);

/** 只画 2014 集团上市以后的市值：纵轴贴合 1.5 万亿—6.7 万亿，落差才看得出来 */
const x = (yr: number) => X0 + ((yr - 2014.7) / (2026.8 - 2014.7)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

/** 集团市值（亿港元，对数刻度 · 示意） */
const LATE: [number, number][] = [
  [2014.72, 18000],
  [2019.9, 40000],
  [2020.82, 67000],
  [2021.95, 22000],
  [2022.8, 16000],
  [2025.2, 22000],
  [2025.8, 37000],
  [2026.45, 19000],
  [2026.8, 19500],
];

const toPath = (pts: [number, number][]) => pts.map(([yr, v]) => `${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).reduce((acc, p, i) => acc + (i ? ' L' : 'M') + p, '');

const PATH = toPath(LATE);

export const Ep59CoverTallGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[50, 24]} />
    <Dust f={0} n={40} w={W} h={H} seed={59} />

    <div style={{position: 'absolute', left: 96, top: 88, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 6, color: G.gold}}>科技简史 · 05</div>
    </div>

    <div style={{position: 'absolute', left: 96, top: 168, fontFamily: GF.num, fontSize: 30, letterSpacing: 10, color: G.ivoryFaint}}>1999 — 2026</div>

    <div style={{position: 'absolute', left: 92, top: 232, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 30, ...goldText(1)}}>阿里</div>
    <div style={{position: 'absolute', left: 92, top: 452, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 18, ...goldText(1)}}>26 年</div>

    <div style={{position: 'absolute', left: 96, top: 720, width: 700, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 752, fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory}}>50 万起家，6.7 万亿登顶</div>
    <div style={{position: 'absolute', left: 96, top: 806, fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryDim}}>
      三次上市，一次退市，<span style={{...goldTextLight(0.22)}}>今天回到 1.95 万亿</span>
    </div>

    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.4} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2020.82)} cy={y(67000)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2020.82) + 26} y={y(67000) + 52} fontFamily={GF.num} fontSize={30} fill={G.goldBright}>6.7 万亿</text>
      <circle cx={x(2026.8)} cy={y(19500)} r={5} fill={G.ivory} opacity={0.9} />
      <text x={X0} y={BASE + 34} fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>2014 集团上市 1.8 万亿</text>
      <text x={X1} y={BASE + 34} textAnchor="end" fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>2026</text>
    </svg>

    <div style={{position: 'absolute', left: 96, top: 1234, fontFamily: GF.cn, fontWeight: 700, fontSize: 50, letterSpacing: 4, color: G.ivory}}>最狠时，跌掉八成</div>
    <div style={{position: 'absolute', right: 92, top: 1216}}>
      <SealMark text="跌回" size={112} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 72, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 16, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>集团市值 · 对数刻度 · 示意</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
