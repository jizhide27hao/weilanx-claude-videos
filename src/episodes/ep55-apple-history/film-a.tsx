import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CUES, DURATION, cf} from './cues';
import type {SfxCue} from '../../library/types';
import type {Mix} from '../../library/Show';
import {Dust, GildedBg, Grain} from '../../library/gilded/stage';
import {FADE, GSub, Page} from '../../library/gilded/kit';
import {G, GF} from '../../library/gilded/theme';
import {P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13} from './film-a-pages1';
import {P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25} from './film-a-pages2';
import {P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37} from './film-a-pages3';

/**
 * ep55 · 苹果五十年 · 暗金文献版（翻页）
 *
 * 37 页，页与页之间 16 帧交叉淡化，全片不硬切。
 * 切点取「该页第一句口播开口前 6 帧」——听到新话题时，新版面已经成形。
 *
 * 三条铁律：只溶不切；元素一律柔入；一页同屏 3–6 件，观众自己决定看哪儿。
 */

const PAGES = [P01, P02, P03, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37];

/**
 * 37 个切点（全局帧），全部用 cf(n) 表达——重录口播后自动跟随，不要写成字面量。
 *
 *   第一幕 P01–P13  钩子 → 车库 → 三人 → 韦恩 → Apple 1/2 → 上市 → Lisa/Mac → 1985 → 十二年
 *   第二幕 P14–P25  破产 90 天 → NeXT → 微软 → 砍产品 → iMac → iPod → iPhone → iPad → 告别 → 库克
 *   第三幕 P26–P37  Watch/AirPods → 一万亿 → M1 → 三万亿 → 服务 → 掉队 → Vision Pro → 五万亿 → 换帅 → 收尾
 */
export const CUTS = [
  0, // P01 5.045 万亿
  cf(3) - 6, // P02 1,300 美元
  cf(6) - 6, // P03 两次差点关门
  cf(8) - 6, // P04 21 / 25 / 41
  cf(10) - 6, // P05 11 天 · 800 美元
  cf(13) - 6, // P06 Apple 1 · 666.66
  cf(16) - 6, // P07 Apple 2 才是开始
  cf(18) - 6, // P08 1980 上市
  cf(21) - 6, // P09 4 个亿万富翁
  cf(22) - 6, // P10 Lisa 与超级碗
  cf(26) - 6, // P11 Macintosh 128K
  cf(29) - 6, // P12 1985 被赶走
  cf(33) - 6, // P13 十二年 · 3%
  cf(36) - 6, // P14 现金 90 天
  cf(39) - 6, // P15 4.29 亿买 NeXT
  cf(42) - 6, // P16 微软 1.5 亿
  cf(45) - 6, // P17 15 条砍到 4 格
  cf(48) - 6, // P18 iMac 1,299
  cf(51) - 6, // P19 iPod 1,000 首
  cf(54) - 6, // P20 重新发明手机
  cf(58) - 6, // P21 App Store 500
  cf(59) - 6, // P22 iPad · 超微软
  cf(61) - 6, // P23 8.24 辞任
  cf(63) - 6, // P24 10 月 5 日
  cf(66) - 6, // P25 铺到每个国家
  cf(69) - 6, // P26 Watch / AirPods
  cf(71) - 6, // P27 一万亿
  cf(73) - 6, // P28 两万亿与 M1
  cf(76) - 6, // P29 三万亿
  cf(77) - 6, // P30 服务 1,093 亿
  cf(80) - 6, // P31 最慢的那个
  cf(83) - 6, // P32 Vision Pro
  cf(85) - 6, // P33 四万亿 → 五万亿
  cf(87) - 6, // P34 换帅
  cf(89) - 6, // P35 折叠与五十年
  cf(91) - 6, // P36 它没发明
  cf(94) - 6, // P37 还管用吗
];

export const FILM_A_FRAMES = DURATION;

export const FilmA: React.FC<{mix?: Mix}> = ({mix = 'all'}) => {
  const f = useCurrentFrame();
  const on = (m: Mix) => mix === 'all' || mix === m;

  return (
    <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
      {/* 底色 / 浮尘 / 颗粒挂在 Page 外面：跟着页淡化会让换页中间整幅发灰 */}
      <GildedBg f={f} tone="warm" glow={[48, 40]} />
      <Dust f={f} n={54} seed={11} />

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
      <GSub f={f} cues={CUES} y={948} skip={[21, 41, 44, 55, 88, 91, 92]} />

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
        <span>科技简史 · 03</span>
        <span>苹果 · 1976—2026</span>
        <span>
          {String(Math.min(PAGES.length, CUTS.filter((c) => c <= f).length)).padStart(2, '0')} / {PAGES.length}
        </span>
      </div>

      <Grain opacity={0.12} />

      {on('voice') && <Audio src={staticFile('audio/ep55-apple-history/voice.wav')} />}
      {on('bgm') && <Audio src={staticFile('audio/ep55-apple-history/bgm.wav')} />}
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
 * 只在换章与落结论时出声；数字落位一律静默。
 */
export const GILDED_FILM_SFX: SfxCue[] = [
  ['type', 10, 0.2], // 5.045 万亿抬头
  ['whoosh', CUTS[2], 0.4], // 进「两次差点关门」
  ['whoosh', CUTS[3], 0.36], // 三人
  ['paper', CUTS[4] + 12, 0.3], // 那份合伙企业合同
  ['whoosh', CUTS[7], 0.4], // 上市
  ['ding', CUTS[8] + 34, 0.32], // 4 个亿万富翁
  ['whoosh', CUTS[11], 0.42], // 1985 被赶走
  ['stamp', CUTS[11] + 150, 0.4], // 「请出了公司」
  ['whoosh', CUTS[13], 0.44], // 破产 90 天
  ['error', CUTS[13] + 34, 0.34], // −10.45 亿
  ['whoosh', CUTS[15], 0.4], // 微软 1.5 亿
  ['whoosh', CUTS[16], 0.38], // 砍到 4 格
  ['stamp', CUTS[16] + 196, 0.36], // 「不做」
  ['paper', CUTS[19] + 18, 0.28], // Macworld 讲稿
  ['stamp', CUTS[19] + 176, 0.72], // 「重新发明」
  ['whoosh', CUTS[22], 0.38], // 辞任
  ['whoosh', CUTS[26], 0.42], // 一万亿
  ['whoosh', CUTS[28], 0.4], // 三万亿
  ['whoosh', CUTS[29], 0.4], // 服务
  ['stamp', CUTS[29] + 206, 0.44], // 「真正的作品」
  ['whoosh', CUTS[30], 0.38], // 掉队
  ['whoosh', CUTS[32], 0.4], // 四万亿 → 五万亿
  ['paper', CUTS[33] + 40, 0.3], // 交接公告
  ['stamp', CUTS[35] + 196, 0.7], // 「AI 不等它」
  ['whoosh', CUTS[36], 0.46], // 收尾
];
