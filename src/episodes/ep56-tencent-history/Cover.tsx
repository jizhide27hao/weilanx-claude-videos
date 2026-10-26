import React from 'react';
import {Desk, HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {V, VF} from '../../library/vox/theme';
import {QQBird, Tag} from './art';

/** 封面（16:9）：黑卡纸大标题，右边一条「28 年三次掉崖、两次冲顶」的命运线 */
export const Ep56Cover: React.FC<{f?: number}> = () => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1920} h={1080} color={V.oldMap} seed={23} />
    <div style={{position: 'absolute', left: 60, top: 60, width: 1060, height: 960, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 700, top: 738, fontFamily: VF.num, fontSize: 24, color: V.paper, letterSpacing: 4, opacity: 0.62}}>科技简史 · 04</div>
    <div style={{position: 'absolute', left: 130, top: 130}}>
      <Label size={44} bg={V.red}>
        五个人，凑了 50 万
      </Label>
    </div>
    <div style={{position: 'absolute', left: 120, top: 235, fontFamily: VF.heavy, fontSize: 190, lineHeight: 1.02, color: V.paper}}>
      腾讯
      <br />
      28 年
    </div>
    <div style={{position: 'absolute', left: 130, top: 700, fontFamily: VF.num, fontSize: 108, color: V.paper, letterSpacing: 2}}>1998—2026</div>
    <div style={{position: 'absolute', left: 130, top: 862, fontFamily: VF.heavy, fontSize: 50, color: V.hiSolid, whiteSpace: 'nowrap'}}>100 万没人要，14 亿人离不开</div>
    <div style={{position: 'absolute', left: 1170, top: 70, width: 690, height: 470, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
      <svg width={690} height={470} style={{overflow: 'visible'}}>
        <HandLine points={[[30, 400], [80, 394], [130, 326], [185, 372], [230, 250], [280, 268], [330, 210], [380, 260], [430, 150], [470, 190], [520, 60], [560, 160], [620, 110], [665, 90]]} p={1} width={12} />
      </svg>
      {/* 圈的是折点上「向下」的谷底，不是向上的顶点 */}
      {[[185, 372], [470, 190], [560, 160]].map(([x, y]) => (
        <div key={x} style={{position: 'absolute', left: x - 26, top: y - 26, width: 52, height: 52, borderRadius: 26, border: `6px solid ${V.ink}`}} />
      ))}
      <div style={{position: 'absolute', left: 30, top: 20}}>
        <Label size={30} bg={V.red}>
          2000 差点断粮
        </Label>
      </div>
      <div style={{position: 'absolute', right: 24, top: 8}}>
        <Label size={26}>7.35 万亿</Label>
      </div>
      <div style={{position: 'absolute', right: 24, bottom: 20}}>
        <Label size={24} bg={V.ink}>
          对数刻度 · 示意
        </Label>
      </div>
    </div>
    <div style={{position: 'absolute', left: 1210, top: 580, transform: 'rotate(-5deg) scale(0.9)', transformOrigin: 'left top'}}>
      <Tag text="100 万" sub="没人要" />
    </div>
    <div style={{position: 'absolute', left: 1540, top: 610}}>
      <HalftonePhoto w={270} h={324} rot={4} caption="马化腾（示意）" dot={7}>
        <Portrait w={270} h={324} hair="side" glasses />
      </HalftonePhoto>
    </div>
    <div style={{position: 'absolute', left: 1190, top: 800, transform: 'rotate(-4deg)'}}>
      <QQBird s={130} />
    </div>
    <div style={{position: 'absolute', left: 1176, top: 952, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.red, whiteSpace: 'nowrap'}}>
      两次腰斩，都爬了回来
    </div>
  </div>
);
