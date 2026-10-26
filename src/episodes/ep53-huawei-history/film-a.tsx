import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CUES, DURATION} from './cues';
import type {SfxCue} from '../../library/types';
import type {Mix} from '../../library/Show';
import {Dust, GildedBg, Grain} from '../../library/gilded/stage';
import {FADE, GSub, Page} from '../../library/gilded/kit';
import {G, GF} from '../../library/gilded/theme';
import {P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12} from './film-a-pages1';
import {P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24} from './film-a-pages2';
import {P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36} from './film-a-pages3';

/**
 * ep53 · 暗金文献版（A 路线）整片总装。
 *
 * 全片 36 页，页与页之间不硬切：相邻两页有 16 帧叠在一起做交叉淡化，
 * 所以切点（CUTS）都取了「下一句口播开口之前 6 帧」——观众听到新话题时，新版面已经成形。
 *
 * 三个铁律（和样片 A-Motion 一致）：
 *   1. 换场只溶不切；2. 元素一律柔入，没有弹入弹下；3. 一页同屏摊 3–6 件，观众自己决定看哪儿。
 */

const PAGES = [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36];

/**
 * 36 个切点（全局帧）。取每段口播第一句的前 6 帧：
 *   1 组钩子（P01–P03）  2 创业与自研（P04–P09）  3 立规矩（P10–P12）
 *   4 冬天与思科（P13–P16）  5 出海（P17–P19）  6 终端（P20–P23）
 *   7 断供与腰斩（P24–P27）  8 回来（P28–P31）  9 收尾（P32–P36）
 */
export const CUTS = [
  0, // P01 钩子：赚 234 / 花 1,213
  298, // P02 十年 1.38 万亿
  503, // P03 三次差点没过去
  733, // P04 1987.09 · 2.1 万
  903, // P05 中华有为
  1036, // P06 代理香港交换机
  1280, // P07 货是别人的
  1442, // P08 1990 五楼窗边
  1783, // P09 C&C08 / 15 亿
  1948, // P10 1996 辞职与基本法
  2210, // P11 1998 IBM
  2394, // P12 2000 220 亿与冬天
  2559, // P13 泡沫破 · 7.5 亿美元
  2887, // P14 2002 221 亿
  2997, // P15 思科 21 项 77 页
  3311, // P16 观望 → 撤诉
  3621, // P17 海思
  3724, // P18 海外 75%
  3924, // P19 2010 五百强 397
  4123, // P20 砍贴牌机 −3000 万
  4451, // P21 不支持他就是不支持我
  4651, // P22 Mate 7
  4815, // P23 2 亿台 / 全球第二
  4991, // P24 顶点 + 实体清单
  5202, // P25 三样东西断供
  5454, // P26 荣耀出售
  5642, // P27 8914 → 6368
  6034, // P28 1,028 天
  6122, // P29 12:08 Mate 60
  6456, // P30 7042 → 8809
  6822, // P31 汽车 450 亿
  7031, // P32 2026H1 4,678 亿
  7216, // P33 份额 20.6%
  7409, // P34 净利 −37%
  7597, // P35 2.1 万 → 8809 亿
  7788, // P36 下一段路
];

export const FILM_A_FRAMES = DURATION;

export const FilmA: React.FC<{mix?: Mix}> = ({mix = 'all'}) => {
  const f = useCurrentFrame();
  const on = (m: Mix) => mix === 'all' || mix === m;

  return (
    <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
      {/* 底色不参与交叉淡化，挂在最底层一直亮着——否则两页各降一半透明度叠在一起，中间会明显发暗 */}
      <GildedBg f={f} tone="warm" glow={[48, 40]} />
      <Dust f={f} n={54} seed={7} />

      {PAGES.map((P, k) => {
        const a = CUTS[k];
        const from = k === 0 ? 0 : a - FADE;
        const to = k === PAGES.length - 1 ? FILM_A_FRAMES : CUTS[k + 1] + FADE;
        return (
          <Page key={k} f={f} from={from} to={to} anchor={a}>
            {(t) => <P t={t} />}
          </Page>
        );
      })}

      {/* 字幕直接读 cues，逐字柔入，不复用 Vox 那条荧光字。
          cue 17 / 20 / 21 让位：这三句在画面上已经是整块大引文（P07 的「货是别人的」、P08 的五楼那段），
          字幕再念一遍会把视线从大字上拽走。 */}
      <GSub f={f} cues={CUES} y={948} skip={[17, 20, 21]} />

      {/* 页脚：一条细线 + 系列名 + 页码 */}
      <div style={{position: 'absolute', left: 76, right: 76, bottom: 58, height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0.32), rgba(214,180,106,0.1), rgba(214,180,106,0.32))`}} />
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          bottom: 22,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: GF.cn,
          fontSize: 15,
          letterSpacing: 3,
          color: G.ivoryFaint,
        }}
      >
        <span>科技简史 · 02</span>
        <span>华为 · 1987—2026</span>
        <span>
          {String(Math.min(PAGES.length, CUTS.filter((c) => c <= f).length)).padStart(2, '0')} / {PAGES.length}
        </span>
      </div>

      <Grain opacity={0.12} />

      {on('voice') && <Audio src={staticFile('audio/ep53-huawei-history/voice.wav')} />}
      {on('bgm') && <Audio src={staticFile('audio/ep53-huawei-history/bgm.wav')} />}
      {on('sfx') &&
        GILDED_FILM_SFX.map(([name, at, vol], i) => (
          <Sequence key={i} from={Math.max(0, at)} durationInFrames={54} layout="none">
            <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={vol} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};

/**
 * 音效表 [名字, 全局帧, 音量]。
 * 暗金文献的音量纪律：只在**换章**和**落结论**时出声，数字落位一律静默。
 * 36 页如果每页都 whoosh，就成综艺了——所以整片只给 9 次换页声。
 */
export const GILDED_FILM_SFX: SfxCue[] = [
  ['type', 8, 0.2], // 2026 抬头滚字
  ['whoosh', CUTS[1], 0.42], // 进「十年研发账」
  ['paper', CUTS[3] + 12, 0.34], // 1987 那张设立登记翻开
  ['whoosh', CUTS[7], 0.4], // 进「五楼窗边」
  ['paper', CUTS[9] + 30, 0.3], // 两份文书并置
  ['whoosh', CUTS[12], 0.42], // 进「泡沫破了」
  ['error', CUTS[13] + 34, 0.34], // 2002 的 −13%
  ['whoosh', CUTS[14], 0.4], // 思科起诉
  ['stamp', CUTS[15] + 244, 0.4], // 「命门不能攥在别人手里」落下
  ['whoosh', CUTS[16], 0.34], // 海思
  ['paper', CUTS[20] + 96, 0.28], // 微博卡
  ['stamp', CUTS[23] + 150, 0.7], // 实体清单压下来
  ['whoosh', CUTS[24], 0.44], // 断供
  ['whoosh', CUTS[26], 0.46], // 8914 → 6368
  ['error', CUTS[26] + 214, 0.38], // −2,546
  ['whoosh', CUTS[28], 0.4], // 12:08
  ['ding', CUTS[31] + 12, 0.34], // 4,678 亿
  ['whoosh', CUTS[33], 0.36], // 净利 −37%
  ['error', CUTS[33] + 38, 0.3],
  ['ding', CUTS[34] + 108, 0.32], // 8,809 亿落点
  ['whoosh', CUTS[35], 0.44], // 收尾
];
