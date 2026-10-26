import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {Stamp} from '../../library/vox/stickers';
import {V, VF} from '../../library/vox/theme';
import {PhoneApp} from './art';

/** 封面（16:9）：左半幅黑卡立字，右半幅白纸卡上一条 26 年的命运线 */
export const Ep58Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={58} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1060, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 700, top: 738, fontFamily: VF.num, fontSize: 24, color: V.paper, letterSpacing: 4, opacity: 0.62}}>科技简史 · 05</div>
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        十八个人，凑了 50 万
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 190, lineHeight: 1.02, color: V.paper}}>
      阿里
      <br />
      26 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 700, fontFamily: VF.num, fontSize: 108, color: V.paper, letterSpacing: 2}}>1999—2026</div>
    <div style={{position: 'absolute', left: 130, top: 862, fontFamily: VF.heavy, fontSize: 50, color: V.hiSolid, whiteSpace: 'nowrap'}}>6.7 万亿登顶，1.95 万亿收场</div>

    {/* 右半幅：命运线 */}
    <div style={{position: 'absolute', left: 1170, top: 70, width: 690, height: 470, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={690} height={470} style={{overflow: 'visible'}}>
        {/* 退市断口：两段线 */}
        <HandLine points={[[30, 400], [90, 342], [150, 302], [210, 222], [270, 262], [330, 258]]} p={1} width={11} />
        <HandLine points={[[396, 150], [446, 105], [496, 78], [546, 168], [596, 112], [630, 152], [676, 148]]} p={1} width={11} />
        <circle cx={496} cy={78} r={12} fill={V.red} />
      </svg>
      <div style={{position: 'absolute', left: 34, top: 20}}>
        <Label size={30} bg={V.red}>
          2000 差点断粮
        </Label>
      </div>
      <div style={{position: 'absolute', right: 34, top: 44}}>
        <Label size={26}>6.7 万亿</Label>
      </div>
      <div style={{position: 'absolute', left: 318, top: 300, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: 'rgba(23,23,22,0.5)'}}>退市四年</div>
      <div style={{position: 'absolute', right: 30, top: 210}}>
        <Label size={22} bg={V.ink}>
          对数刻度 · 示意
        </Label>
      </div>
    </div>

    <div style={{position: 'absolute', left: 1210, top: 580, transform: 'rotate(-5deg) scale(0.9)', transformOrigin: 'left top'}}>
      <Stamp size={54} rot={-6}>三次上市 · 退过一次</Stamp>
    </div>
    <div style={{position: 'absolute', left: 1540, top: 610}}>
      <HalftonePhoto w={250} h={300} rot={4} caption="马云（示意）" dot={7}>
        <Portrait w={250} h={300} hair="side" />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1190, top: 810, transform: 'rotate(-4deg)'}}>
      <PhoneApp s={110} />
    </div>
  </div>
);
