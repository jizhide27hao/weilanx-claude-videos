import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Dust, GildedBg, Grain, SealMark} from '../../library/gilded/stage';
import {G, GF, goldText} from '../../library/gilded/theme';

/**
 * 「公司史」抖音合集封面（1:1，1080×1080）。
 *
 * 合集封面在抖音里是圆角小方块，缩略后只剩一个字形轮廓，所以全图只服务一件事：
 * 让「公司史」三个字占满视线。其余信息（年份跨度、收录公司、钩子）全部压成小字排在下方，
 * 缩略时糊掉也不心疼。暗金文献风和单期封面同源，进合集不会显得是另一套片子。
 * 下缘那三条淡金曲线没有具体数值，只是「几家公司都大起大落」的剪影，填补下半张的空白。
 */

const W = 1080;
const H = 1080;

/** 背景里五道极淡的「书脊」竖纹，暗示这是一个多期系列 */
const SPINES: [number, number, number][] = [
  [86, 300, 0.055],
  [268, 240, 0.04],
  [430, 330, 0.05],
  [660, 210, 0.035],
  [878, 290, 0.045],
];

const CW = 888;
const CH = 192;
const CY = 700;

/** 归一化折点 → 平滑贝塞尔的 path */
const smooth = (pts: [number, number][]) => {
  const p = pts.map(([x, y]) => [x * CW, y * CH] as [number, number]);
  let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
};

/** 三条剪影曲线（0..1 归一化，y 越大越低） */
const CURVES: {pts: [number, number][]; color: string; width: number; opacity: number; glow?: boolean}[] = [
  {
    pts: [
      [0, 0.74],
      [0.09, 0.56],
      [0.19, 0.68],
      [0.29, 0.3],
      [0.39, 0.46],
      [0.47, 0.16],
      [0.55, 0.42],
      [0.64, 0.64],
      [0.73, 0.28],
      [0.83, 0.54],
      [0.92, 0.24],
      [1, 0.36],
    ],
    color: G.gold,
    width: 2.2,
    opacity: 1,
    glow: true,
  },
  {
    pts: [
      [0, 0.9],
      [0.1, 0.86],
      [0.2, 0.72],
      [0.3, 0.78],
      [0.4, 0.6],
      [0.5, 0.66],
      [0.6, 0.46],
      [0.7, 0.5],
      [0.8, 0.34],
      [0.9, 0.4],
      [1, 0.22],
    ],
    color: G.gold,
    width: 1.4,
    opacity: 0.34,
  },
  {
    pts: [
      [0, 0.94],
      [0.12, 0.9],
      [0.24, 0.92],
      [0.36, 0.84],
      [0.48, 0.88],
      [0.6, 0.74],
      [0.72, 0.8],
      [0.84, 0.62],
      [0.94, 0.66],
      [1, 0.44],
    ],
    color: G.gold,
    width: 1.2,
    opacity: 0.18,
  },
];

export interface CompanyCollectionCoverProps {
  /** 左上角系列标签 */
  kicker?: string;
  /** 年份跨度 */
  years?: string;
  /** 主标题（一行） */
  title?: string;
  /** 收录公司，会以「 · 」连接 */
  companies?: string[];
  /** 标题下的一句话 */
  lead?: string;
  /** 左下角角标 */
  footNote?: string;
  /** 右下角朱印 */
  seal?: string;
  titleSize?: number;
}

export const CompanyCollectionCover: React.FC<CompanyCollectionCoverProps> = ({
  kicker = '科技简史 · 合辑',
  years = '1987 — 2026',
  title = '公司史',
  companies = ['华为', '腾讯', '阿里', '小米', '苹果', '英伟达'],
  lead = '六家公司，四十年沉浮',
  footNote = '持续更新',
  seal = '合集',
  titleSize = 258,
}) => (
  <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
    <GildedBg f={0} tone="warm" glow={[50, 28]} strength={1.05} />
    <Dust f={0} n={44} w={W} h={H} seed={41} />

    {/* 书脊竖纹 */}
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
      {SPINES.map(([x, h, o], i) => (
        <rect key={i} x={x} y={H - 40 - h} width={54} height={h} fill="none" stroke={G.gold} strokeWidth={1} opacity={o} />
      ))}
    </svg>

    {/* 系列标签 */}
    <div style={{position: 'absolute', left: 96, top: 92, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 40, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 6, color: G.gold}}>{kicker}</div>
    </div>

    {/* 年份跨度 */}
    <div style={{position: 'absolute', left: 96, top: 184, fontFamily: GF.num, fontSize: 30, letterSpacing: 8, color: G.ivoryFaint}}>{years}</div>

    {/* 主标题 */}
    <div
      style={{
        position: 'absolute',
        left: 90,
        top: 246,
        width: W - 180,
        paddingLeft: 14,
        textAlign: 'center',
        fontFamily: GF.cn,
        fontWeight: 900,
        fontSize: titleSize,
        lineHeight: 1.05,
        letterSpacing: 10,
        whiteSpace: 'nowrap',
        ...goldText(1),
      }}
    >
      {title}
    </div>

    {/* 分隔金线 */}
    <div style={{position: 'absolute', left: 96, top: 568, width: 888, height: 1, background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.08) 85%, rgba(214,180,106,0))`}} />

    {/* 收录公司 */}
    <div style={{position: 'absolute', left: 96, right: 96, top: 602, fontFamily: GF.cn, fontSize: 30, letterSpacing: 2, color: G.ivory, whiteSpace: 'nowrap'}}>{companies.join(' · ')}</div>

    {/* 一句话 */}
    <div style={{position: 'absolute', left: 96, top: 656, fontFamily: GF.cn, fontSize: 22, letterSpacing: 4, color: G.ivoryDim}}>{lead}</div>

    {/* 命途剪影 */}
    <svg width={CW} height={CH} style={{position: 'absolute', left: 96, top: CY, overflow: 'visible'}}>
      <line x1={0} y1={CH - 2} x2={CW} y2={CH - 2} stroke={G.gold} strokeWidth={1} opacity={0.16} />
      {CURVES.map((c, i) => (
        <path
          key={i}
          d={smooth(c.pts)}
          fill="none"
          stroke={c.color}
          strokeWidth={c.width}
          strokeLinecap="round"
          opacity={c.opacity}
          style={c.glow ? {filter: 'drop-shadow(0 0 9px rgba(214,180,106,0.55))'} : undefined}
        />
      ))}
      <circle cx={CW * 0.47} cy={CH * 0.16} r={4.5} fill={G.goldBright} style={{filter: `drop-shadow(0 0 12px ${G.gold})`}} />
    </svg>

    {/* 左下角标 */}
    <div style={{position: 'absolute', left: 96, bottom: 104, display: 'flex', alignItems: 'center', gap: 12}}>
      <div style={{width: 28, height: 1, background: 'rgba(214,180,106,0.5)'}} />
      <div style={{fontFamily: GF.cn, fontSize: 16, letterSpacing: 3, color: G.ivoryDim}}>{footNote}</div>
    </div>

    {/* 右下朱印 */}
    <div style={{position: 'absolute', right: 92, bottom: 64}}>
      <SealMark text={seal} size={96} />
    </div>

    <Grain opacity={0.13} />
  </AbsoluteFill>
);
