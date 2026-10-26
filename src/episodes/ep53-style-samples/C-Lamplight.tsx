import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Figure} from '../../library/lamplight/props';
import {Embers, Narration, NightBg, SourceNote, StatCorner} from '../../library/lamplight/stage';
import {L} from '../../library/lamplight/theme';
import {F} from './common';

/**
 * 样片 C · 灯火史话风：暖黑夜色 + 火光 + 米白象形小人，左上宋体大字一句句写出来。
 * 语气偏「夜里讲古」，关键词三色（蓝 = 名词、红 = 惩罚、金 = 数量）。这套原本给古代制度用，讲企业史会更有叙事味。
 */
export const LamplightSample: React.FC = () => {
  const f = F;
  return (
    <AbsoluteFill style={{background: L.night}}>
      <NightBg f={f} glow={[22, 76]} horizon={790} floor />

      <Embers f={f} x={250} y={950} n={20} spread={90} rise={320} />
      <Embers f={f} x={760} y={930} n={10} spread={50} rise={200} seed={5} />

      <Narration
        f={f}
        lines={[
          {at: 4, text: '【2019】年 5 月，'},
          {at: 48, text: '第一次断了它的〔粮〕。'},
        ]}
        x={110}
        y={116}
        size={68}
        w={1180}
      />

      <StatCorner f={f} at={88} label="全年销售收入" value={8588} unit="亿元" x={1560} y={596} size={112} />

      <Figure f={f} x={500} y={948} pose="stand" scale={1.3} seed={1} />
      <Figure f={f} x={700} y={948} pose="torch" scale={1.34} seed={2} />
      <Figure f={f} x={900} y={948} pose="point" scale={1.3} seed={3} flip />
      <Figure f={f} x={1100} y={948} pose="stand" scale={1.26} seed={4} />

      <SourceNote f={f} at={20} text="数字据华为 2019 年年度报告；人物与场面均为示意" />
    </AbsoluteFill>
  );
};
