import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BigNumeral, RubberStamp} from '../../library/halftone/props';
import {CaptionBar, CaseHeader, DateChip, Headline, PaperBg, PrintGrain} from '../../library/halftone/stage';
import {H, HF} from '../../library/halftone/theme';
import {F} from './common';

const ROWS: [string, string, boolean?][] = [
  ['成立', '1987 · 深圳'],
  ['当年身份', '全球第二大手机厂商'],
  ['遭遇', '5 月 16 日列入实体清单', true],
  ['结果', '全年营收仍涨 19.1%'],
];

/**
 * 样片 B · 网点档案风：米白旧纸 + 渐变网点 + 粗宋错版大字，把事件当案卷来审。
 * 语气偏「调查报告」，适合断供、起诉、调查这类有卷宗感的内容。
 */
export const HalftoneSample: React.FC = () => {
  const f = F;
  return (
    <AbsoluteFill style={{background: H.paper}}>
      <PaperBg color={H.paper} />
      <PrintGrain f={f} />

      <CaseHeader f={f} at={6} no="2019-05" tag={['实体清单', '断供']} />
      <DateChip f={f} text="2019.05.16" />

      <Headline f={f} at={14} text="第一次被断供" x={116} y={186} size={122} />

      <div style={{position: 'absolute', left: 92, top: 404}}>
        <BigNumeral text="8588" size={300} dot={H.blue} base={H.paperLight} id="halftone-a" />
      </div>
      <div style={{position: 'absolute', left: 118, top: 716, fontFamily: HF.sans, fontSize: 40, color: H.ink}}>亿元 · 全年销售收入</div>

      {/* 档案行：标签定宽，值单列，不再挤成一团 */}
      <div style={{position: 'absolute', left: 1002, top: 356, width: 800}}>
        <div style={{fontFamily: HF.sans, fontSize: 23, color: H.pink, letterSpacing: 2}}>SUBJECT / 涉案主体</div>
        <div style={{fontFamily: HF.latinSerif, fontSize: 62, color: H.ink, lineHeight: 1.18, marginTop: 2}}>华 为 · HUAWEI</div>
        <div style={{marginTop: 22}}>
          {ROWS.map(([k, v, hl], i) => (
            <div key={i} style={{display: 'flex', alignItems: 'baseline', gap: 26, fontFamily: HF.sans, fontSize: 31, lineHeight: 1.66, color: H.ink, whiteSpace: 'nowrap'}}>
              <div style={{width: 160, color: H.inkSoft}}>{k}</div>
              <div style={{color: hl ? H.pink : H.ink}}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: 'absolute', left: 580, top: 700}}>
        <RubberStamp f={f} at={72} text="断供" size={132} rot={-13} />
      </div>

      <CaptionBar f={f} at={110} text="被切断供应链，这一年反而【涨了 19%】" />
    </AbsoluteFill>
  );
};
