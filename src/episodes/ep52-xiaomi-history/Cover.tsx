import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {V, VF} from '../../library/vox/theme';
import {CarSide, MiLogo, PriceTag} from './art';

/** 封面（16:9）：黑卡纸大标题，右边一张「三次探底又冲上去」的命运线 + 1999 价签 + 雷军 */
export const Ep52Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={11} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1060, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        从一碗小米粥开始
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 196, lineHeight: 1.02, color: V.paper}}>
      小米
      <br />
      16 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 700, fontFamily: VF.num, fontSize: 120, color: V.paper, letterSpacing: 4}}>2010–2026</div>
    <div style={{position: 'absolute', left: 130, top: 866, fontFamily: VF.heavy, fontSize: 52, color: V.hiSolid, whiteSpace: 'nowrap'}}>1999 的手机，25 万的车</div>
    <div style={{position: 'absolute', left: 1170, top: 70, width: 690, height: 470, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={690} height={470} style={{overflow: 'visible'}}>
        <HandLine points={[[30, 430], [90, 410], [130, 440], [190, 360], [230, 400], [300, 300], [350, 210], [400, 120], [450, 190], [520, 380], [570, 400], [620, 330], [660, 300]]} p={1} width={12} />
      </svg>
      {[[190, 400], [450, 190], [570, 400]].map(([x, y]) => (
        <div key={x} style={{position: 'absolute', left: x - 26, top: y - 30, width: 52, height: 52, borderRadius: 26, border: `6px solid ${V.ink}`}} />
      ))}
      <div style={{position: 'absolute', left: 30, top: 20}}>
        <Label size={30} bg={V.red}>
          三次被看衰，三次回来
        </Label>
      </div>
      <div style={{position: 'absolute', right: 24, top: 84}}>
        <Label size={26}>1.55 万亿</Label>
      </div>
    </div>
    <div style={{position: 'absolute', left: 1210, top: 580, transform: 'rotate(-5deg) scale(0.86)', transformOrigin: 'left top'}}>
      <PriceTag text="1999" sub="元" />
    </div>
    <div style={{position: 'absolute', left: 1520, top: 640}}>
      <HalftonePhoto w={280} h={336} rot={4} caption="雷军（示意）" dot={7}>
        <Portrait w={280} h={336} hair="short" glasses shirt />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1150, top: 745, transform: 'rotate(-4deg)'}}>
      <MiLogo s={116} />
    </div>
    <div style={{position: 'absolute', left: 1210, top: 890, transform: 'rotate(-2deg)', opacity: 0.95}}>
      <CarSide w={300} h={176} />
    </div>
  </div>
);
