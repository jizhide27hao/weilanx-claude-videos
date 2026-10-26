import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CUES, DURATION, cf} from './cues';
import type {SfxCue} from '../../library/types';
import type {Mix} from '../../library/Show';
import {Dust, GildedBg, Grain} from '../../library/gilded/stage';
import {FADE, GSub, Page} from '../../library/gilded/kit';
import {G, GF} from '../../library/gilded/theme';
import {P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12} from './film-a-pages1';
import {P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24} from './film-a-pages2';
import {P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36} from './film-a-pages3';

/**
 * ep59 · 阿里 26 年 · 暗金文献版（翻页）
 *
 * 36 页，页与页之间 16 帧交叉淡化，全片不硬切。
 * 切点取「该页第一句口播开口前 6 帧」——听到新话题时，新版面已经成形。
 *
 * 三条铁律：只溶不切；元素一律柔入；一页同屏 3–6 件，观众自己决定看哪儿。
 */

const PAGES = [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36];

/**
 * 36 个切点（全局帧），全部用 cf(n) 表达——重录口播后自动跟随，不要写成字面量。
 *
 *   第一幕 P01–P12  钩子 → 三次上市一次退市 → 跌掉八成 → 湖畔花园 → 一百零二年 → 拒三十八家
 *                   → 六分钟 → 泡沫破了 → 非典淘宝 → 免费 → eBay 退出 → 担保交易
 *   第二幕 P13–P24  雅虎十亿 → 2007 港股 → 首日 +193% → 跌掉九成 → 退市去美国
 *                   → 纽交所 250 亿 → 首日 2,300 亿 → 2019 回家 → 6.7 万亿 → 蚂蚁 → 叫停 → 罚单
 *   第三幕 P25–P36  跌 48.88% → 60 港元 → 芒格割肉 → 1+6+N → 六个字 → 3,800 亿
 *                   → 闪购 → 回到 186 → 又跌回 88 → 千问进苹果 → 今天 → 收尾
 */
export const CUTS = [
  0, // P01 1.95 万亿
  cf(4) - 6, // P02 三次上市，一次退市
  cf(6) - 6, // P03 跌掉八成
  cf(8) - 6, // P04 1999 湖畔花园
  cf(11) - 6, // P05 活 102 年
  cf(14) - 6, // P06 拒三十八家 · 高盛
  cf(16) - 6, // P07 六分钟 · 2,000 万
  cf(19) - 6, // P08 泡沫破了
  cf(21) - 6, // P09 非典 · 淘宝
  cf(24) - 6, // P10 免费
  cf(27) - 6, // P11 eBay 退出
  cf(29) - 6, // P12 先放我这儿
  cf(31) - 6, // P13 雅虎十亿
  cf(35) - 6, // P14 2007 港股
  cf(37) - 6, // P15 首日 +193%
  cf(39) - 6, // P16 金融危机
  cf(43) - 6, // P17 退市去美国
  cf(47) - 6, // P18 纽交所 250 亿
  cf(50) - 6, // P19 首日 2,300 亿
  cf(52) - 6, // P20 2019 回家
  cf(56) - 6, // P21 6.7 万亿
  cf(59) - 6, // P22 蚂蚁 2.1 万亿
  cf(62) - 6, // P23 叫停
  cf(65) - 6, // P24 182.28 亿
  cf(67) - 6, // P25 −48.88%
  cf(69) - 6, // P26 60 港元
  cf(71) - 6, // P27 芒格割肉
  cf(73) - 6, // P28 1+6+N
  cf(76) - 6, // P29 用户为先，AI 驱动
  cf(77) - 6, // P30 3,800 亿
  cf(79) - 6, // P31 闪购
  cf(81) - 6, // P32 回到 186
  cf(83) - 6, // P33 又跌回 88
  cf(85) - 6, // P34 千问进苹果
  cf(87) - 6, // P35 今天
  cf(88) - 6, // P36 收尾
];

export const FILM_A_FRAMES = DURATION;

export const FilmA: React.FC<{mix?: Mix}> = ({mix = 'all'}) => {
  const f = useCurrentFrame();
  const on = (m: Mix) => mix === 'all' || mix === m;

  return (
    <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
      {/* 底色 / 浮尘 / 颗粒挂在 Page 外面：跟着页淡化会让换页中间整幅发灰 */}
      <GildedBg f={f} tone="warm" glow={[46, 42]} />
      <Dust f={f} n={52} seed={59} />

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

      {/* 字幕读 cues；把已经被排成大引文 / 大字的那几句让出来 */}
      <GSub f={f} cues={CUES} y={948} skip={[1, 6, 7, 9, 29, 37, 50, 58, 63, 64, 69, 76, 81, 83, 87]} />

      <div style={{position: 'absolute', left: 76, right: 76, bottom: 58, height: 1, background: 'linear-gradient(90deg, rgba(214,180,106,0.32), rgba(214,180,106,0.1), rgba(214,180,106,0.32))'}} />
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
        <span>科技简史 · 05</span>
        <span>阿里巴巴 · 1999—2026</span>
        <span>
          {String(Math.min(PAGES.length, CUTS.filter((c) => c <= f).length)).padStart(2, '0')} / {PAGES.length}
        </span>
      </div>

      <Grain opacity={0.12} />

      {on('voice') && <Audio src={staticFile('audio/ep59-alibaba-history/voice.wav')} />}
      {on('bgm') && <Audio src={staticFile('audio/ep59-alibaba-history/bgm.wav')} />}
      {on('sfx') &&
        GILDED_FILM_SFX.filter(([, at]) => Number.isFinite(at)).map(([name, at, vol], i) => (
          <Sequence key={i} from={Math.max(0, at)} durationInFrames={54} layout="none">
            <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={vol} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};

/**
 * 音效表 [名字, 全局帧, 音量]。
 * 只在换章与落结论时出声；数字落位一律静默。
 */
export const GILDED_FILM_SFX: SfxCue[] = [
  ['type', 10, 0.2], // P01 1.95 万亿抬头
  ['whoosh', CUTS[1], 0.4], // P02 上市史
  ['paper', CUTS[1] + 40, 0.26], // P02 表格
  ['whoosh', CUTS[3], 0.36], // P04 湖畔花园
  ['whoosh', CUTS[9], 0.34], // P10 免费
  ['stamp', CUTS[10] + 70, 0.42], // P11 「退出」
  ['whoosh', CUTS[12], 0.4], // P13 雅虎
  ['ding', CUTS[13] + 26, 0.3], // P14 13.5 港元
  ['confetti', CUTS[14], 0.3], // P15 首日 +193%
  ['error', CUTS[15], 0.36], // P16 金融危机
  ['stamp', CUTS[15] + 178, 0.4], // P16 「退市」
  ['whoosh', CUTS[16], 0.4], // P17 退市去美国
  ['ding', CUTS[17] + 26, 0.3], // P18 250 亿美元
  ['whoosh', CUTS[19], 0.4], // P20 回家
  ['stamp', CUTS[19] + 150, 0.62], // P20 「超过腾讯」
  ['stamp', CUTS[20] + 150, 0.56], // P21 「顶」
  ['paper', CUTS[21] + 10, 0.26], // P22 招股书
  ['shake', CUTS[22] + 140, 0.36], // P23 「叫停」
  ['error', CUTS[23], 0.38], // P24 罚单
  ['error', CUTS[24], 0.36], // P25 跌 48.88%
  ['whoosh', CUTS[27], 0.38], // P28 1+6+N
  ['stamp', CUTS[27] + 178, 0.44], // P28 「收回」
  ['whoosh', CUTS[30], 0.36], // P31 闪购
  ['error', CUTS[32], 0.34], // P33 又回撤
  ['stamp', CUTS[32] + 136, 0.4], // P33 「又一半」
  ['whoosh', CUTS[34], 0.42], // P35 今天
  ['whoosh', CUTS[35], 0.42], // P36 收尾
  ['question', CUTS[35] + 130, 0.32], // P36 收尾句
];
