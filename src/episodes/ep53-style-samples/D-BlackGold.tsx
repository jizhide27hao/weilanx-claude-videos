import React from 'react';
import {AbsoluteFill} from 'remotion';
import {NeonLines} from '../../library/blackgold/charts';
import {BGCaption, CenterWord, ChapterTag, Grain, SmokeBg} from '../../library/blackgold/stage';
import {B} from '../../library/blackgold/theme';
import {F, REV_MAX, REV_MIN, SERIES} from './common';

/**
 * 样片 D · 黑金光影风：近黑 + 暖烟 + 一切发光，霓虹细线把曲线一笔画出来。
 * 语气偏「暗房里的实验」，戏剧张力最强，适合把一个反差数字推到观众脸上。
 */
export const BlackGoldSample: React.FC = () => {
  const f = F;
  const pts = SERIES.map((d, i) => [i / (SERIES.length - 1), (d.v - REV_MIN) / (REV_MAX - REV_MIN)] as [number, number]);

  return (
    <AbsoluteFill style={{background: B.bg}}>
      <SmokeBg f={f} tone="warm" focus={[32, 70]} />
      <Grain opacity={0.1} />

      <ChapterTag f={f} at={6} cn="2019 · 第一次断供" en="THE FIRST CUT-OFF" />

      <CenterWord f={f} at={24} text="8,588 亿" size={156} color={B.gold} y={344} />

      <NeonLines
        f={f}
        at={50}
        x={400}
        y={826}
        w={1120}
        h={200}
        xLabel="2016 — 2021"
        yLabel="销售收入 · 亿元"
        lines={[{pts, color: B.gold, at: 52, dur: 40}]}
        cross={{p: pts[2], at: 96}}
        dashY={1}
        dashLabel="峰值 8,914"
      />

      <BGCaption f={f} at={120} text="它反而【涨了 19%】" en="Cut off from its suppliers — and it still grew 19%." y={956} />
    </AbsoluteFill>
  );
};
