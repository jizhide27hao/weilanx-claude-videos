import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {R} from '../../library/receipt/theme';
import {Ep60Receipt, EP60_DURATION} from './Ep60Receipt';
import {S2Prices, S3Tear} from './scenes-a';
import {S4Breakdown, S5Gap, S6Back, S7End} from './scenes-b';

/**
 * 全片装配。竖屏 1080×1920 · 30fps。
 *
 * ① 开场 + 八行总账   24s
 * ② 三个价格          22s
 * ③ 撕纸四级          38s
 * ④ 钱花在哪          27s
 * ⑤ 地域与孩次        30s
 * ⑥ 翻面              40s
 * ⑦ 收尾              19s
 */
const SEG = [
  {dur: EP60_DURATION},
  {dur: 780},
  {dur: 1140},
  {dur: 810},
  {dur: 900},
  {dur: 1200},
  {dur: 570},
];

const AT = SEG.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SEG[i - 1].dur);
  return acc;
}, []);

export const EP60_FILM_FRAMES = SEG.reduce((a, s) => a + s.dur, 0);
export const EP60_FILM_W = 1080;
export const EP60_FILM_H = 1920;

export const Ep60Film: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: R.desk}}>
    <Sequence from={AT[0]} durationInFrames={SEG[0].dur} name="01 总账">
      <Ep60Receipt />
    </Sequence>
    <Sequence from={AT[1]} durationInFrames={SEG[1].dur} name="02 三个价格">
      <S2Prices />
    </Sequence>
    <Sequence from={AT[2]} durationInFrames={SEG[2].dur} name="03 撕纸">
      <S3Tear />
    </Sequence>
    <Sequence from={AT[3]} durationInFrames={SEG[3].dur} name="04 钱花在哪">
      <S4Breakdown />
    </Sequence>
    <Sequence from={AT[4]} durationInFrames={SEG[4].dur} name="05 差异">
      <S5Gap />
    </Sequence>
    <Sequence from={AT[5]} durationInFrames={SEG[5].dur} name="06 翻面">
      <S6Back />
    </Sequence>
    <Sequence from={AT[6]} durationInFrames={SEG[6].dur} name="07 收尾">
      <S7End />
    </Sequence>
  </AbsoluteFill>
);
