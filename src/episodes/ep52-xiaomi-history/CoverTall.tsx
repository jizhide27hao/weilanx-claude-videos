import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {MiLogo, PriceTag} from './art';

/** 3:4 竖版封面：三次探底又冲上去的命运线 + 雷军 + 1999 价签 */
export const Ep52CoverTall: React.FC = () => (
  <VoxCoverTall
    index="01"
    kicker="从一碗小米粥开始"
    title={['小米', '16 年']}
    years="2010–2026"
    hook="1999 的手机，25 万的车"
    curve={[[0, 0.44], [0.08, 0.4], [0.14, 0.62], [0.26, 0.5], [0.34, 0.72], [0.46, 0.34], [0.56, 0.06], [0.62, 0.2], [0.72, 0.78], [0.8, 0.74], [0.9, 0.56], [1, 0.5]]}
    dips={[4, 6, 8]}
    curveLabel="三次被看衰"
    peakLabel="1.55 万亿"
    photo={
      <HalftonePhoto w={290} h={348} rot={0} caption="雷军（示意）" dot={7}>
        <Portrait w={290} h={348} hair="short" glasses shirt />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-6deg) scale(0.66)', transformOrigin: 'left top', marginTop: 20, marginLeft: 40}}>
        <PriceTag text="1999" sub="元" />
      </div>
    }
  />
);
