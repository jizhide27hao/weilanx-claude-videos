import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';
import {CAP} from './timeline';

/**
 * ep53 暗金文献版 · 3:4 竖版封面（1080×1440）。
 * 和 Vox 版那张（网点照 + 荧光黄钩子条）不同：这里不要照片、不要贴纸，
 * 只有一张「账页」——系列号、年份、两行金标题、一条 39 年的对数线、一枚朱印。
 */

const W = 1080;
const H = 1440;

const X0 = 96;
const X1 = 984;
const BASE = 1150;
const TOPY = 850;
const L0 = Math.log10(0.05);
const L1 = Math.log10(8914);

const x = (yr: number) => X0 + ((yr - 1987) / (2026 - 1987)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

const PATH = CAP.map(([yr, v]) => `${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).reduce((acc, p, i) => acc + (i ? ' L' : 'M') + p, '');

export const Ep53CoverTallGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[52, 24]} />
    <Dust f={0} n={40} w={W} h={H} seed={13} />

    {/* 系列号 */}
    <div style={{position: 'absolute', left: 96, top: 88, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 6, color: G.gold}}>科技简史 · 02</div>
    </div>

    {/* 年份 */}
    <div style={{position: 'absolute', left: 96, top: 168, fontFamily: GF.num, fontSize: 30, letterSpacing: 10, color: G.ivoryFaint}}>1987 — 2026</div>

    {/* 标题 */}
    <div style={{position: 'absolute', left: 92, top: 232, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 26, ...goldText(1)}}>华为</div>
    <div style={{position: 'absolute', left: 92, top: 452, fontFamily: GF.cn, fontWeight: 900, fontSize: 214, lineHeight: 1.02, letterSpacing: 20, ...goldText(1)}}>39 年</div>

    <div style={{position: 'absolute', left: 96, top: 720, width: 700, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 752, fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory}}>2.1 万块起家</div>
    <div style={{position: 'absolute', left: 96, top: 806, fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryDim}}>
      做到 <span style={{...goldTextLight(0.22)}}>8,809 亿</span>，中间被断供两次
    </div>

    {/* 39 年营收线 */}
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      {[1, 10, 100, 1000].map((v) => (
        <line key={v} x1={X0} y1={y(v)} x2={X1} y2={y(v)} stroke="rgba(239,230,210,0.055)" />
      ))}
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.4} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2025)} cy={y(8809)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2025) - 8} y={y(8809) - 22} textAnchor="end" fontFamily={GF.num} fontSize={30} fill={G.goldBright}>8,809 亿</text>
      <text x={x(1988)} y={BASE + 34} fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>1987</text>
      <text x={X1} y={BASE + 34} textAnchor="end" fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>2026</text>
    </svg>

    {/* 钩子 + 印 */}
    <div style={{position: 'absolute', left: 96, top: 1234, fontFamily: GF.cn, fontWeight: 700, fontSize: 54, letterSpacing: 6, color: G.ivory}}>被断供两次，还在涨</div>
    <div style={{position: 'absolute', right: 92, top: 1216}}>
      <SealMark text="活着" size={112} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 72, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 16, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>营收 · 对数刻度</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
