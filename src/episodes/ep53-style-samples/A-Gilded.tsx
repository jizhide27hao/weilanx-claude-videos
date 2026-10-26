import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RedStamp} from '../../library/gilded/props';
import {BookCite, Dust, GCaption, GildedBg, Grain, Soft, YearHeader} from '../../library/gilded/stage';
import {G, GF, goldText} from '../../library/gilded/theme';
import {F, H, REV_MAX, REV_MIN, SERIES, W} from './common';

/**
 * 样片 A · 暗金文献风：近黑底 + 暖光晕 + 金线衬线，像在烛光下翻一本年度报告。
 * 语气偏纪录片、庄重，适合「39 年」这种跨度大的叙述。
 */
export const GildedSample: React.FC = () => {
  const f = F;
  const pts = SERIES.map((d, i) => [300 + i * 330, 860 - ((d.v - REV_MIN) / (REV_MAX - REV_MIN)) * 200] as [number, number]);
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

  return (
    <AbsoluteFill style={{background: G.bg}}>
      <GildedBg f={f} tone="warm" glow={[44, 36]} />
      <Dust f={f} n={54} />
      <Grain opacity={0.12} />

      <YearHeader f={f} at={4} year="2019" caption="深圳 · 第一次被断供" prev="2018" rollAt={22} />
      <BookCite
        f={f}
        at={12}
        original="Huawei Investment & Holding — Annual Report 2019"
        title="华为投资控股 2019 年年度报告"
        meta="销售收入 8,588 亿元人民币 · 同比 +19.1%"
        seal="年报"
      />

      {/* 六年营收：一条金线，2019 那一点亮着 */}
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={path} fill="none" stroke={G.goldLine} strokeWidth={2.5} strokeLinejoin="round" />
        {pts.map(([x, y], i) => {
          const hot = i === 2;
          return (
            <g key={i}>
              {hot && <circle cx={x} cy={y} r={30} fill="none" stroke={G.gold} strokeWidth={1.2} opacity={0.5} />}
              <circle cx={x} cy={y} r={hot ? 9 : 5} fill={hot ? G.goldBright : G.goldDeep} />
              <text
                x={x}
                y={y - (hot ? 52 : 26)}
                textAnchor="middle"
                fontFamily={GF.cn}
                fontSize={hot ? 32 : 19}
                fill={hot ? G.goldBright : G.ivoryFaint}
              >
                {SERIES[i].y}
              </text>
            </g>
          );
        })}
      </svg>

      <Soft f={f} at={30} style={{position: 'absolute', left: 0, right: 0, top: 196, textAlign: 'center'}}>
        <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 16, color: G.ivoryDim}}>全 年 销 售 收 入</div>
        <div style={{fontFamily: GF.num, fontSize: 268, lineHeight: 1, letterSpacing: 2, ...goldText(0.8)}}>8,588</div>
        <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 12, color: G.gold, marginTop: -6}}>亿元</div>
      </Soft>

      <div style={{position: 'absolute', right: 190, top: 596, width: 180, textAlign: 'center'}}>
        <RedStamp f={f} at={58} text="断供" size={148} rot={-9} />
        <div style={{fontFamily: GF.cn, fontSize: 19, color: G.ivoryDim, marginTop: 18, letterSpacing: 1, lineHeight: 1.6}}>
          5 月 16 日
          <br />
          68 家关联公司
        </div>
      </div>

      <GCaption f={f} at={96} text="第一次被断供，它那年反而【涨了 19%】。" />
    </AbsoluteFill>
  );
};
