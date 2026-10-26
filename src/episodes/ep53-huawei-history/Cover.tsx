import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {V, VF} from '../../library/vox/theme';
import {KirinChip, PetalMark, PhoneFront} from './art';

/** 封面（16:9）：黑卡纸大标题，右边一张「两次掉头又爬起来」的营收线 + 麒麟芯片 + 一台手机 */
export const Ep53Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={11} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1040, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        被断供两次，还在涨
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 186, lineHeight: 1.02, color: V.paper}}>
      华为
      <br />
      39 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 680, fontFamily: VF.num, fontSize: 112, color: V.paper, letterSpacing: 4}}>1987–2026</div>
    <div style={{position: 'absolute', left: 130, top: 850, fontFamily: VF.heavy, fontSize: 52, color: V.hiSolid, whiteSpace: 'nowrap'}}>2.1 万块起家，8809 亿收尾</div>

    <div style={{position: 'absolute', left: 1150, top: 66, width: 700, height: 450, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={700} height={450} style={{overflow: 'visible'}}>
        <HandLine
          points={[[34, 402], [90, 386], [140, 340], [190, 352], [250, 300], [320, 246], [390, 196], [430, 120], [470, 136], [520, 268], [560, 274], [610, 186], [660, 168]]}
          p={1}
          width={12}
        />
      </svg>
      {[[190, 352], [520, 268]].map(([x, y]) => (
        <div key={x} style={{position: 'absolute', left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, border: `6px solid ${V.ink}`}} />
      ))}
      <div style={{position: 'absolute', left: 28, top: 18}}>
        <Label size={30} bg={V.red}>
          两次掉头
        </Label>
      </div>
      <div style={{position: 'absolute', right: 22, top: 92}}>
        <Label size={26}>8809 亿</Label>
      </div>
    </div>

    <div style={{position: 'absolute', left: 1170, top: 560}}>
      <HalftonePhoto w={250} h={300} rot={-3} caption="任正非（示意）" dot={7}>
        <Portrait w={250} h={300} hair="side" tie shirt />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1490, top: 576}}>
      <KirinChip s={168} />
    </div>
    <div style={{position: 'absolute', left: 1560, top: 750}}>
      <PhoneFront s={120} label="Mate 60" />
    </div>
    <div style={{position: 'absolute', left: 1460, top: 800}}>
      <PetalMark s={110} />
    </div>
  </div>
);
