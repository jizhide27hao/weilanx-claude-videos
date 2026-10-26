import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';
import {CAP} from '../ep54-apple-history/timeline';

/**
 * ep55 暗金文献版 · 16:9 横版封面（1920×1080）。
 * 竖版缩过来会挤，重排：左半幅立字，右半幅放五十年的市值线，右侧留平台角标区。
 */

const W = 1920;
const H = 1080;

const X0 = 1024;
const X1 = 1664;
const BASE = 742;
const TOPY = 268;
const L0 = Math.log10(10);
const L1 = Math.log10(60000);

const x = (yr: number) => X0 + ((yr - 1980.95) / (2026.75 - 1980.95)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

const PATH = CAP.map(([yr, v]) => `${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).reduce((acc, p, i) => acc + (i ? ' L' : 'M') + p, '');

export const Ep55CoverWideGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[38, 34]} />
    <Dust f={0} n={44} w={W} h={H} seed={17} />

    <div style={{position: 'absolute', left: 96, top: 82, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.gold}}>科技简史 · 03</div>
    </div>

    <div style={{position: 'absolute', left: 96, top: 136, fontFamily: GF.num, fontSize: 26, letterSpacing: 10, color: G.ivoryFaint}}>1976 — 2026</div>

    <div style={{position: 'absolute', left: 92, top: 186, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 20, ...goldText(1)}}>苹果</div>
    <div style={{position: 'absolute', left: 92, top: 350, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 14, ...goldText(1)}}>50 年</div>

    <div style={{position: 'absolute', left: 96, top: 542, width: 620, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 566, fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>1,300 美元起家</div>
    <div style={{position: 'absolute', left: 96, top: 612, width: 720, fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, color: G.ivoryDim}}>
      做到 <span style={{...goldTextLight(0.22)}}>5 万亿</span>，中间差点关门两次
    </div>

    <div style={{position: 'absolute', left: 96, top: 678, width: 520, height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0.5), rgba(214,180,106,0.02))`}} />

    <div style={{position: 'absolute', left: 96, top: 878, fontFamily: GF.cn, fontWeight: 700, fontSize: 46, letterSpacing: 5, color: G.ivory}}>它从来没先做</div>

    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      {[100, 1000, 10000].map((v) => (
        <line key={v} x1={X0} y1={y(v)} x2={X1} y2={y(v)} stroke="rgba(239,230,210,0.055)" />
      ))}
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.6} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2026.58)} cy={y(50450)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2026.58) - 12} y={y(50450) + 44} textAnchor="end" fontFamily={GF.num} fontSize={30} fill={G.goldBright}>5 万亿</text>
      <text x={X0} y={BASE + 32} fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>1980 上市</text>
      <text x={X1} y={BASE + 32} textAnchor="end" fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>2026</text>
    </svg>

    <div style={{position: 'absolute', left: 1024, top: 200, fontFamily: GF.cn, fontSize: 16, letterSpacing: 6, color: G.ivoryFaint}}>市 值 · 对 数 刻 度</div>
    <div style={{position: 'absolute', right: 96, top: 898}}>
      <SealMark text="排队" size={104} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 46, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 15, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>市值线为量级示意 · 数据来自年报与交易所记录</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
