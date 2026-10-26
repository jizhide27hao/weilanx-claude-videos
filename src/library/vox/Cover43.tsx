import React from 'react';
import {Desk, Label} from './props';
import {V, VF} from './theme';

/**
 * Vox 系列的 4:3 横版封面（1440×1080）。抖音横版、部分公众号首图的裁切比例，比 16:9 窄。
 *
 * 结构和 16:9 一样是「左黑卡立字 + 右栏主视觉」，但 1440 的宽度放不下 1060 卡 + 690 图，
 * 所以左卡收到 700、主标题 168、年份 94、钩子 42。右栏内容由 visual 传入（按 1440×1080 画布坐标绝对定位），
 * 各期自己画图表 / 照片 / 贴纸。
 */
export interface VoxCover43Props {
  /** 钩子标签（红底），如「五个人，凑了 50 万」 */
  kicker: string;
  /** 主标题两行，如 ['腾讯', '28 年'] */
  title: [string, string];
  /** 时间跨度，如 '1998—2026' */
  years: string;
  /** 底部荧光黄钩子，一句话 */
  hook: string;
  /** 系列号，如 '04'；不传就不画右下角那行小字 */
  index?: string;
  /** 右栏主视觉 */
  visual?: React.ReactNode;
  titleSize?: number;
  yearsSize?: number;
  hookSize?: number;
  deskSeed?: number;
}

export const VoxCover43: React.FC<VoxCover43Props> = ({
  kicker,
  title,
  years,
  hook,
  index,
  visual,
  titleSize = 168,
  yearsSize = 94,
  hookSize = 42,
  deskSeed = 23,
}) => (
  <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <Desk w={1440} h={1080} color={V.oldMap} seed={deskSeed} />

    {/* 黑卡 */}
    <div style={{position: 'absolute', left: 44, top: 50, width: 700, height: 980, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
    <div style={{position: 'absolute', left: 92, top: 106}}>
      <Label size={38} bg={V.red}>
        {kicker}
      </Label>
    </div>
    <div style={{position: 'absolute', left: 86, top: 182, fontFamily: VF.heavy, fontSize: titleSize, lineHeight: 1.02, color: V.paper, whiteSpace: 'nowrap'}}>
      {title[0]}
      <br />
      {title[1]}
    </div>
    <div style={{position: 'absolute', left: 94, top: 660, fontFamily: VF.num, fontSize: yearsSize, color: V.paper, letterSpacing: 2, whiteSpace: 'nowrap'}}>{years}</div>
    <div style={{position: 'absolute', left: 94, top: 862, fontFamily: VF.heavy, fontSize: hookSize, color: V.hiSolid, whiteSpace: 'nowrap'}}>{hook}</div>
    {index && <div style={{position: 'absolute', left: 96, top: 944, fontFamily: VF.num, fontSize: 22, color: V.paper, letterSpacing: 4, opacity: 0.5}}>科技简史 · {index}</div>}

    {/* 右栏 */}
    {visual}
  </div>
);
