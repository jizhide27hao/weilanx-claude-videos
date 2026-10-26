import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {QQBird, Tag} from './art';

/** 3:4 竖版封面：28 年三次掉崖两次冲顶的命运线 */
export const Ep56CoverTall: React.FC = () => (
  <VoxCoverTall
    index="04"
    kicker="五个人，凑了 50 万"
    title={['腾讯', '28 年']}
    years="1998—2026"
    hook="100 万没人要，14 亿人离不开"
    curve={[[0, 0.42], [0.06, 0.44], [0.12, 0.36], [0.18, 0.48], [0.26, 0.3], [0.32, 0.4], [0.38, 0.24], [0.44, 0.34], [0.52, 0.16], [0.58, 0.3], [0.66, 0.08], [0.72, 0.26], [0.8, 0.12], [0.88, 0.18], [0.96, 0.1], [1, 0.12]]}
    dips={[3, 7, 11]}
    curveLabel="2018 腰斩 · 2022 又腰斩"
    peakLabel="7.35 万亿"
    photo={
      <HalftonePhoto w={280} h={336} rot={0} caption="马化腾（示意）" dot={7}>
        <Portrait w={280} h={336} hair="side" glasses />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-6deg) scale(0.72)', transformOrigin: 'left top', marginTop: 16, marginLeft: 34}}>
        <Tag text="100 万" sub="没人要" />
      </div>
    }
  />
);
