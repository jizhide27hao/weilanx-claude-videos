import React from 'react';
import {AbsoluteFill} from 'remotion';
import {NeonLine} from '../../library/tactical/charts';
import {BigWord, HudFrame, TacBg, TCaption} from '../../library/tactical/stage';
import {T, TF, glow} from '../../library/tactical/theme';
import {F} from './common';

/**
 * 样片 E · 战术屏科普风：深蓝黑 HUD 框 + 发光图表，把「被断供还在涨」当成一场数据对抗。
 * 语气偏硬核科技，数字最有压迫感，但和「历史」的叙事味会弱一些。
 */
export const TacticalSample: React.FC = () => {
  const f = F;
  return (
    <AbsoluteFill style={{background: T.bg}}>
      <TacBg tone="blue" />

      <HudFrame series="科技简史" ep="03" topic="华为 · 39 年" chapter={[3, 9, '第一次断供']} progress={0.42} ticks={[1, 2, 3, 4, 5, 6, 7, 8]} />

      <BigWord f={f} at={18} text="2019 · 第一次断供" size={96} y={266} glowColor={T.red} />

      <div style={{position: 'absolute', left: 172, top: 412}}>
        <div style={{fontFamily: TF.sans, fontSize: 26, color: T.gray, letterSpacing: 4}}>全年销售收入</div>
        <div style={{fontFamily: TF.mono, fontWeight: 700, fontSize: 158, lineHeight: 1.12, letterSpacing: 2, color: T.orange, ...glow(T.orange, 30, 0.55)}}>
          8588
        </div>
        <div style={{fontFamily: TF.sans, fontSize: 40, color: T.white, marginTop: -4}}>
          亿元 <span style={{color: T.green}}>▲ 19.1%</span>
        </div>
      </div>

      <div style={{position: 'absolute', left: 866, top: 436}}>
        <NeonLine f={f} at={52} data={[5216, 7212, 8588, 8914, 6368]} w={900} h={286} yLabel="亿元" xLabel="2016 — 2021" dur={34} />
      </div>

      <TCaption f={f} at={100} text="供应链被切断，这一年还【涨了 19%】" y={912} size={54} />
    </AbsoluteFill>
  );
};
