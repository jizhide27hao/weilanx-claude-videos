import React from 'react';
import {VoxCover43} from '../../library/vox/Cover43';
import {HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {V, VF} from '../../library/vox/theme';
import {QQBird, Tag} from './art';

/** 封面（4:3, 1440×1080）：左半幅黑卡立字，右半幅命运线 + 价签 + 人物 */
export const Ep56Cover43: React.FC<{f?: number}> = () => (
  <VoxCover43
    index="04"
    kicker="五个人，凑了 50 万"
    title={['腾讯', '28 年']}
    years="1998—2026"
    hook="100 万没人要，14 亿人离不开"
    visual={
      <>
        {/* 命运线纸卡 */}
        <div style={{position: 'absolute', left: 792, top: 56, width: 570, height: 400, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
          <svg width={570} height={400} style={{overflow: 'visible'}}>
            <HandLine
              points={[[25, 340], [66, 334], [107, 277], [153, 317], [190, 213], [231, 228], [273, 179], [314, 221], [355, 128], [388, 162], [430, 51], [463, 136], [512, 94], [549, 77]]}
              p={1}
              width={11}
            />
          </svg>
          {/* 圈的是折点上「向下」的谷底，不是向上的顶点 */}
          {[[153, 317], [388, 162], [463, 136]].map(([x, y]) => (
            <div key={x} style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, border: `5px solid ${V.ink}`}} />
          ))}
          <div style={{position: 'absolute', left: 24, top: 16}}>
            <Label size={26} bg={V.red}>
              2000 差点断粮
            </Label>
          </div>
          <div style={{position: 'absolute', right: 18, top: 6}}>
            <Label size={24}>7.35 万亿</Label>
          </div>
          <div style={{position: 'absolute', right: 18, bottom: 16}}>
            <Label size={21} bg={V.ink}>
              对数刻度 · 示意
            </Label>
          </div>
        </div>

        {/* 价签贴纸 */}
        <div style={{position: 'absolute', left: 806, top: 492, transform: 'rotate(-5deg) scale(0.78)', transformOrigin: 'left top'}}>
          <Tag text="100 万" sub="没人要" />
        </div>

        {/* 人物网点照 */}
        <div style={{position: 'absolute', left: 1142, top: 548}}>
          <HalftonePhoto w={228} h={274} rot={4} caption="马化腾（示意）" dot={7}>
            <Portrait w={228} h={274} hair="side" glasses />
          </HalftonePhoto>
        </div>

        <div style={{position: 'absolute', left: 812, top: 792, transform: 'rotate(-4deg)'}}>
          <QQBird s={112} />
        </div>
        <div style={{position: 'absolute', left: 1042, top: 934, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red, whiteSpace: 'nowrap'}}>
          两次腰斩，都爬了回来
        </div>
      </>
    }
  />
);
