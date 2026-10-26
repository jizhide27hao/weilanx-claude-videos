import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {Stamp} from '../../library/vox/stickers';

/** 3:4 竖版封面：26 年从 50 万爬到 6.7 万亿，再跌回 1.95 万亿 */
export const Ep58CoverTall: React.FC = () => (
  <VoxCoverTall
    index="05"
    kicker="十八个人，凑了 50 万"
    title={['阿里', '26 年']}
    years="1999—2026"
    hook="6.7 万亿登顶，1.95 万亿收场"
    curve={[[0, 0.46], [0.08, 0.44], [0.16, 0.4], [0.24, 0.34], [0.32, 0.37], [0.4, 0.3], [0.48, 0.24], [0.56, 0.14], [0.62, 0.06], [0.7, 0.32], [0.76, 0.54], [0.82, 0.36], [0.9, 0.5], [0.96, 0.48], [1, 0.49]]}
    dips={[10, 12]}
    curveLabel="2022 腰斩 · 2026 又腰斩"
    peakLabel="6.7 万亿"
    photo={
      <HalftonePhoto w={280} h={336} rot={0} caption="马云（示意）" dot={7}>
        <Portrait w={280} h={336} hair="side" />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-5deg) scale(0.82)', transformOrigin: 'left top', marginTop: 14, marginLeft: 24}}>
        <Stamp size={52} rot={-5}>三次上市</Stamp>
      </div>
    }
  />
);
