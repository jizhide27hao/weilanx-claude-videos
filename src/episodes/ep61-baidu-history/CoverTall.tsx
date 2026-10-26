import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {Stamp} from '../../library/vox/stickers';

/** 3:4 竖版封面：26 年从 120 万美元到 1200 亿，再跌回 270 亿 */
export const Ep61CoverTall: React.FC = () => (
  <VoxCoverTall
    index="06"
    kicker="一项专利，120 万美元"
    title={['百度', '26 年']}
    years="2000—2026"
    hook="市值五年跌八成"
    curve={[[0, 0.5], [0.07, 0.44], [0.14, 0.36], [0.2, 0.42], [0.27, 0.3], [0.34, 0.24], [0.4, 0.16], [0.46, 0.1], [0.52, 0.06], [0.58, 0.3], [0.64, 0.24], [0.7, 0.44], [0.76, 0.4], [0.82, 0.58], [0.88, 0.54], [0.94, 0.66], [1, 0.64]]}
    dips={[3, 7, 10]}
    curveLabel="2011 登顶 · 2021 冲顶 · 之后四年阴跌"
    peakLabel="1200 亿"
    photo={
      <HalftonePhoto w={280} h={336} rot={0} caption="李彦宏（示意）" dot={7}>
        <Portrait w={280} h={336} hair="side" />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-5deg) scale(0.82)', transformOrigin: 'left top', marginTop: 14, marginLeft: 24}}>
        <Stamp size={52} rot={-5}>搜索之王</Stamp>
      </div>
    }
  />
);
