import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {Stamp} from '../../library/vox/stickers';
import {V, VF} from '../../library/vox/theme';
import {Robotaxi} from './art';

/** 封面（16:9）：左半幅黑卡立字，右半幅白纸卡上一条 26 年的命运线 */
export const Ep61Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={61} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1060, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 700, top: 738, fontFamily: VF.num, fontSize: 24, color: V.paper, letterSpacing: 4, opacity: 0.62}}>科技简史 · 06</div>
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        一项专利，120 万美元
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 190, lineHeight: 1.02, color: V.paper}}>
      百度
      <br />
      26 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 700, fontFamily: VF.num, fontSize: 108, color: V.paper, letterSpacing: 2}}>2000—2026</div>
    <div style={{position: 'absolute', left: 130, top: 862, fontFamily: VF.heavy, fontSize: 50, color: V.hiSolid, whiteSpace: 'nowrap'}}>市值五年跌八成</div>

    {/* 右半幅：命运线 */}
    <div style={{position: 'absolute', left: 1170, top: 70, width: 690, height: 470, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={690} height={470} style={{overflow: 'visible'}}>
        {/* 一涨再涨、两次腰斩、冲顶再阴跌：两段线（2018-2019 谷段故意断开做旧） */}
        <HandLine points={[[30, 408], [70, 350], [110, 258], [150, 300], [196, 224], [240, 238], [282, 168], [330, 128]]} p={1} width={11} />
        <HandLine points={[[392, 132], [430, 92], [462, 74], [500, 190], [536, 168], [568, 210], [620, 262], [676, 258]]} p={1} width={11} />
        <circle cx={462} cy={74} r={12} fill={V.red} />
      </svg>
      <div style={{position: 'absolute', left: 34, top: 20}}>
        <Label size={30} bg={V.red}>
          2011 · 中国第一
        </Label>
      </div>
      <div style={{position: 'absolute', right: 34, top: 44}}>
        <Label size={26}>峰值 1200 亿</Label>
      </div>
      <div style={{position: 'absolute', left: 322, top: 296, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: 'rgba(23,23,22,0.5)'}}>魏则西 · 至暗</div>
      <div style={{position: 'absolute', right: 30, top: 296}}>
        <Label size={22} bg={V.ink}>
          对数刻度 · 示意
        </Label>
      </div>
    </div>

    <div style={{position: 'absolute', left: 1210, top: 580, transform: 'rotate(-5deg) scale(0.9)', transformOrigin: 'left top'}}>
      <Stamp size={54} rot={-6}>搜索之王 · 掉出 BAT</Stamp>
    </div>
    <div style={{position: 'absolute', left: 1540, top: 610}}>
      <HalftonePhoto w={250} h={300} rot={4} caption="李彦宏（示意）" dot={7}>
        <Portrait w={250} h={300} hair="side" />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1190, top: 810, transform: 'rotate(-4deg)'}}>
      <Robotaxi s={180} />
    </div>
  </div>
);
