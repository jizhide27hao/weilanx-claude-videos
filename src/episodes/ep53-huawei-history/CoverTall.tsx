import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {KirinChip, PetalMark} from './art';

/** 3:4 竖版封面：两次掉头的营收线 + 任正非 + 麒麟芯片 */
export const Ep53CoverTall: React.FC = () => (
  <VoxCoverTall
    index="02"
    kicker="2.1 万块起家"
    title={['华为', '39 年']}
    years="1987–2026"
    hook="被断供两次，还在涨"
    curve={[[0, 0.8], [0.09, 0.74], [0.17, 0.6], [0.24, 0.55], [0.3, 0.6], [0.38, 0.46], [0.46, 0.34], [0.56, 0.22], [0.64, 0.14], [0.72, 0.24], [0.82, 0.3], [0.9, 0.2], [1, 0.16]]}
    dips={[4, 10]}
    curveLabel="两次掉头"
    peakLabel="8809 亿"
    photo={
      <HalftonePhoto w={290} h={348} rot={0} caption="任正非（示意）" dot={7}>
        <Portrait w={290} h={348} hair="side" tie shirt />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-6deg) scale(0.62)', transformOrigin: 'left top', marginTop: 14, marginLeft: 30}}>
        <div style={{position: 'relative'}}>
          <KirinChip s={200} />
          <div style={{position: 'absolute', right: -46, bottom: -18}}>
            <PetalMark s={78} />
          </div>
        </div>
      </div>
    }
  />
);
