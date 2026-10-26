import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';
import {CAP} from './timeline';

/**
 * ep53 暗金文献版 · 16:9 横版封面（1920×1080）。
 *
 * 和 3:4 竖版同一套语法，只是重心横过来：左边立标题、右边放数据线。
 * 用途：B 站 / YouTube / 视频号 / 公众号的横版封面和片头首帧。
 * 注意右边 260px 内是平台角标区（时长、UP 主头像），不放主体信息。
 */

const W = 1920;
const H = 1080;

const X0 = 1024;
const X1 = 1724;
const BASE = 742;
const TOPY = 262;
const L0 = Math.log10(0.05);
const L1 = Math.log10(8914);

const x = (yr: number) => X0 + ((yr - 1987) / (2026 - 1987)) * (X1 - X0);
const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);

const PATH = CAP.map(([yr, v]) => `${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).reduce((acc, p, i) => acc + (i ? ' L' : 'M') + p, '');

export const Ep53CoverWideGilded: React.FC = () => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[38, 34]} />
    <Dust f={0} n={44} w={W} h={H} seed={17} />

    {/* 系列号 */}
    <div style={{position: 'absolute', left: 96, top: 82, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.gold}}>科技简史 · 02</div>
    </div>

    {/* 年份 */}
    <div style={{position: 'absolute', left: 96, top: 136, fontFamily: GF.num, fontSize: 26, letterSpacing: 10, color: G.ivoryFaint}}>1987 — 2026</div>

    {/* 标题：两行，横版降到 152px 才够宽（竖版是 214px） */}
    <div style={{position: 'absolute', left: 92, top: 186, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 20, ...goldText(1)}}>华为</div>
    <div style={{position: 'absolute', left: 92, top: 350, fontFamily: GF.cn, fontWeight: 900, fontSize: 152, lineHeight: 1.04, letterSpacing: 14, ...goldText(1)}}>39 年</div>

    <div style={{position: 'absolute', left: 96, top: 542, width: 620, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.05))`}} />

    <div style={{position: 'absolute', left: 96, top: 566, fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>2.1 万块起家</div>
    <div style={{position: 'absolute', left: 96, top: 612, width: 700, fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, color: G.ivoryDim}}>
      做到 <span style={{...goldTextLight(0.22)}}>8,809 亿</span>，中间被断供两次
    </div>

    {/* 第一组的封口线：横版留白比竖版大，不给组收边会显得没画完 */}
    <div style={{position: 'absolute', left: 96, top: 678, width: 520, height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0.5), rgba(214,180,106,0.02))`}} />

    {/* 钩子压在 86% 处（和竖版的 1234/1440 同一个比例），中间大片留白是呼吸，不是没做完 */}
    <div style={{position: 'absolute', left: 96, top: 878, fontFamily: GF.cn, fontWeight: 700, fontSize: 46, letterSpacing: 5, color: G.ivory}}>被断供两次，还在涨</div>

    {/* 39 年营收线（右半幅） */}
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      {[1, 10, 100, 1000].map((v) => (
        <line key={v} x1={X0} y1={y(v)} x2={X1} y2={y(v)} stroke="rgba(239,230,210,0.055)" />
      ))}
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
      <path d={PATH} fill="none" stroke={G.gold} strokeWidth={2.6} style={{filter: 'drop-shadow(0 0 10px rgba(214,180,106,0.6))'}} />
      <circle cx={x(2025)} cy={y(8809)} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 14px ${G.gold})`}} />
      <text x={x(2025) - 10} y={y(8809) - 24} textAnchor="end" fontFamily={GF.num} fontSize={30} fill={G.goldBright}>8,809 亿</text>
      <text x={x(1988)} y={BASE + 32} fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>1987</text>
      <text x={X1} y={BASE + 32} textAnchor="end" fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>2026</text>
    </svg>

    {/* 右侧栏目名 + 朱印（印贴基线下方，和线是一组） */}
    <div style={{position: 'absolute', left: 1024, top: 196, fontFamily: GF.cn, fontSize: 16, letterSpacing: 6, color: G.ivoryFaint}}>销 售 收 入 · 对 数 刻 度</div>
    <div style={{position: 'absolute', right: 96, top: 898}}>
      <SealMark text="活着" size={104} />
    </div>

    <div style={{position: 'absolute', left: 96, right: 96, bottom: 46, display: 'flex', justifyContent: 'space-between', fontFamily: GF.cn, fontSize: 15, letterSpacing: 3, color: G.ivoryFaint}}>
      <span>暗金文献</span>
      <span>2002 起转自研 · 数据来自年报与官方新闻稿</span>
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
