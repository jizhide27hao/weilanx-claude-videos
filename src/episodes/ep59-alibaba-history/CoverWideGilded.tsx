import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/**
 * ep59 暗金文献版 · 16:9 横版封面（1920×1080）。
 * 竖版缩过来会挤，重排：左半幅立字，右半幅放 26 年的市值线，右侧留平台角标区。
 */

const W = 1920;
const H = 1080;

const X0 = 1000;
const X1 = 1780;
const BASE = 706;
const TOPY = 318;
const L0 = Math.log10(15000);
const L1 = Math.log10(67000);

/** 只画 2014 集团上市以后的市值 */
const x = (yr: number) => X0 + ((yr - 2014.7) / (2026.8 - 2014.7)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

/** 与竖版同一条集团市值线（亿港元，对数刻度 · 示意） */
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

export const Ep59CoverWideGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[36, 34]} />
    <Dust f={0} n={44} w={W} h={H} seed={59} />

    <div style={{position: 'absolute', left: 96, top: 82, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.gold}}>科技简史 · 05</div>
    </div>

    <div style={{position: 'absolute', left: 96, top: 136, fontFamily: GF.num, fontSize: 26, letterSpacing: 10, color: G.ivoryFaint}}>1999 — 2026</div>

    <div style={{position: 'absolute', left: 92, top: 186, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 22, ...goldText(1)}}>阿里</div>
    <div style={{position: 'absolute', left: 92, top: 350, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 14, ...goldText(1)}}>26 年</div>

    <div style={{position: 'absolute', left: 96, top: 542, width: 620, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 566, fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>50 万起家，6.7 万亿登顶</div>
    <div style={{position: 'absolute', left: 96, top: 612, width: 760, fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, color: G.ivoryDim}}>
      三次上市，一次退市，<span style={{...goldTextLight(0.22)}}>今天回到 1.95 万亿</span>
    </div>

    <div style={{position: 'absolute', left: 96, top: 678, width: 520, height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0.5), rgba(214,180,106,0.02))`}} />

    <div style={{position: 'absolute', left: 96, top: 878, fontFamily: GF.cn, fontWeight: 700, fontSize: 46, letterSpacing: 5, color: G.ivory}}>最狠时，跌掉八成</div>

    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.6} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2020.82)} cy={y(67000)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2020.82) + 24} y={y(67000) - 22} fontFamily={GF.num} fontSize={30} fill={G.goldBright}>6.7 万亿</text>
      <circle cx={x(2026.8)} cy={y(19500)} r={5} fill={G.ivory} opacity={0.9} />
      <text x={X0} y={BASE + 32} fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>2014 集团上市 1.8 万亿</text>
      <text x={X1} y={BASE + 32} textAnchor="end" fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>2026</text>
    </svg>

    <div style={{position: 'absolute', left: 1000, top: 268, fontFamily: GF.cn, fontSize: 16, letterSpacing: 6, color: G.ivoryFaint}}>集 团 市 值 · 对 数 刻 度</div>
    <div style={{position: 'absolute', right: 96, top: 898}}>
      <SealMark text="跌回" size={104} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 46, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 15, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>集团市值 · 对数刻度 · 数据来自年报与交易所记录</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
