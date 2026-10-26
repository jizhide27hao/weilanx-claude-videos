import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {V, VF} from '../../library/vox/theme';
import {AppleMark, Tag} from './art';

/** 封面（16:9）：黑卡纸大标题，右边一张「50 年一路上升、只有 1997 掉下去」的命运线 */
export const Ep54Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={19} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1060, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 700, top: 738, fontFamily: VF.num, fontSize: 24, color: V.paper, letterSpacing: 4, opacity: 0.62}}>科技简史 · 03</div>
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        从一间车库开始
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 190, lineHeight: 1.02, color: V.paper}}>
      苹果
      <br />
      50 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 700, fontFamily: VF.num, fontSize: 108, color: V.paper, letterSpacing: 2}}>1976—2026</div>
    <div style={{position: 'absolute', left: 130, top: 862, fontFamily: VF.heavy, fontSize: 50, color: V.hiSolid, whiteSpace: 'nowrap'}}>1,300 美元起家，5 万亿收场</div>
    <div style={{position: 'absolute', left: 1170, top: 70, width: 690, height: 470, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={690} height={470} style={{overflow: 'visible'}}>
        <HandLine points={[[30, 330], [80, 322], [130, 316], [190, 300], [240, 318], [280, 350], [320, 290], [370, 210], [410, 240], [460, 170], [520, 186], [570, 120], [620, 72], [665, 40]]} p={1} width={12} />
      </svg>
      {[[280, 350], [410, 240], [620, 72]].map(([x, y]) => (
        <div key={x} style={{position: 'absolute', left: x - 26, top: y - 30, width: 52, height: 52, borderRadius: 26, border: `6px solid ${V.ink}`}} />
      ))}
      <div style={{position: 'absolute', left: 30, top: 20}}>
        <Label size={30} bg={V.red}>
          1997 差点破产
        </Label>
      </div>
      <div style={{position: 'absolute', right: 24, top: 104}}>
        <Label size={26}>5 万亿</Label>
      </div>
      <div style={{position: 'absolute', right: 24, top: 160}}>
        <Label size={24} bg={V.ink}>
          对数刻度 · 示意
        </Label>
      </div>
    </div>
    <div style={{position: 'absolute', left: 1210, top: 580, transform: 'rotate(-5deg) scale(0.9)', transformOrigin: 'left top'}}>
      <Tag text="1,300" sub="美元" />
    </div>
    <div style={{position: 'absolute', left: 1540, top: 610}}>
      <HalftonePhoto w={270} h={324} rot={4} caption="乔布斯（示意）" dot={7}>
        <Portrait w={270} h={324} hair="receding" glasses beard turtleneck />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1190, top: 800, transform: 'rotate(-4deg)'}}>
      <AppleMark s={120} />
    </div>
    <div style={{position: 'absolute', left: 1300, top: 900, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.red, whiteSpace: 'nowrap'}}>
      它没发明手机
    </div>
  </div>
);
