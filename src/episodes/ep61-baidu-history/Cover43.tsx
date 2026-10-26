import React from 'react';
import {VoxCover43} from '../../library/vox/Cover43';
import {HalftonePhoto, HandLine, Label} from '../../library/vox/props';
import {Portrait} from '../../library/vox/portrait';
import {Stamp} from '../../library/vox/stickers';
import {V, VF} from '../../library/vox/theme';
import {Robotaxi} from './art';

/** 封面（4:3, 1440×1080）：左半幅黑卡立字，右半幅命运线 + 峰值 + 人物 */
export const Ep61Cover43: React.FC<{f?: number}> = () => (
  <VoxCover43
    index="06"
    kicker="一项专利，120 万美元"
    title={['百度', '26 年']}
    years="2000—2026"
    hook="市值五年跌八成"
    visual={
      <>
        {/* 命运线纸卡 */}
        <div style={{position: 'absolute', left: 792, top: 56, width: 570, height: 400, background: V.paper, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}}>
          <svg width={570} height={400} style={{overflow: 'visible'}}>
            <HandLine
              points={[[25, 352], [58, 302], [92, 226], [126, 262], [162, 196], [200, 208], [236, 148], [278, 116], [312, 92], [344, 72], [386, 172], [416, 152], [448, 196], [494, 240], [542, 236]]}
              p={1}
              width={11}
            />
          </svg>
          {/* 圈的是折点上「向下」的谷底，不是向上的顶点：2016 至暗与 2022 后的阴跌谷 */}
          {[[126, 262], [386, 172], [494, 240]].map(([x, y]) => (
            <div key={x} style={{position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 22, border: `5px solid ${V.ink}`}} />
          ))}
          <div style={{position: 'absolute', left: 24, top: 16}}>
            <Label size={26} bg={V.red}>
              2011 · 中国第一
            </Label>
          </div>
          <div style={{position: 'absolute', right: 18, top: 6}}>
            <Label size={24}>峰值 1200 亿</Label>
          </div>
          <div style={{position: 'absolute', right: 18, bottom: 16}}>
            <Label size={21} bg={V.ink}>
              对数刻度 · 示意
            </Label>
          </div>
        </div>

        {/* 印章 */}
        <div style={{position: 'absolute', left: 806, top: 496, transform: 'rotate(-5deg) scale(0.74)', transformOrigin: 'left top'}}>
          <Stamp size={54} rot={-6}>搜索之王 · 掉出 BAT</Stamp>
        </div>

        {/* 人物网点照 */}
        <div style={{position: 'absolute', left: 1142, top: 548}}>
          <HalftonePhoto w={228} h={274} rot={4} caption="李彦宏（示意）" dot={7}>
            <Portrait w={228} h={274} hair="side" />
          </HalftonePhoto>
        </div>

        <div style={{position: 'absolute', left: 812, top: 830, transform: 'rotate(-4deg)'}}>
          <Robotaxi s={150} />
        </div>
        <div style={{position: 'absolute', left: 1042, top: 934, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red, whiteSpace: 'nowrap'}}>
          AI 的时代，还在牌桌上
        </div>
      </>
    }
  />
);
