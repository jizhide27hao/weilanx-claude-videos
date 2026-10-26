import React from 'react';
import {VoxCoverTall} from '../../library/vox/CoverTall';
import {Portrait} from '../../library/vox/portrait';
import {HalftonePhoto} from '../../library/vox/props';
import {AppleMark, Tag} from './art';

/** 3:4 竖版封面：50 年一路上升的命运线，只有 1997 掉下去 */
export const Ep54CoverTall: React.FC = () => (
  <VoxCoverTall
    index="03"
    kicker="从一间车库开始"
    title={['苹果', '50 年']}
    years="1976—2026"
    hook="1,300 美元起家，5 万亿收场"
    curve={[[0, 0.52], [0.08, 0.5], [0.18, 0.48], [0.26, 0.5], [0.34, 0.42], [0.38, 0.56], [0.44, 0.5], [0.5, 0.36], [0.56, 0.4], [0.62, 0.3], [0.7, 0.34], [0.78, 0.24], [0.84, 0.3], [0.9, 0.14], [0.96, 0.1], [1, 0.06]]}
    dips={[5, 12]}
    curveLabel="1997 离破产 90 天"
    peakLabel="5 万亿"
    photo={
      <HalftonePhoto w={280} h={336} rot={0} caption="乔布斯（示意）" dot={7}>
        <Portrait w={280} h={336} hair="receding" glasses beard turtleneck />
      </HalftonePhoto>
    }
    sticker={
      <div style={{transform: 'rotate(-6deg) scale(0.72)', transformOrigin: 'left top', marginTop: 16, marginLeft: 34}}>
        <Tag text="1,300" sub="美元" />
      </div>
    }
  />
);
