import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {CUES, DURATION, cf} from './cues';
import type {SfxCue} from '../../library/types';
import type {Mix} from '../../library/Show';
import {Dust, GildedBg, Grain} from '../../library/gilded/stage';
import {FADE, GSub, Page} from '../../library/gilded/kit';
import {G, GF} from '../../library/gilded/theme';
import {P01, P02, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13} from './film-a-pages1';
import {P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25} from './film-a-pages2';
import {P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37} from './film-a-pages3';

/**
 * ep57 · 腾讯 28 年 · 暗金文献版（翻页）
 *
 * 37 页，页与页之间 16 帧交叉淡化，全片不硬切。
 * 切点取「该页第一句口播开口前 6 帧」——听到新话题时，新版面已经成形。
 *
 * 三条铁律：只溶不切；元素一律柔入；一页同屏 3–6 件，观众自己决定看哪儿。
 */

const PAGES = [P01, P02, P04, P05, P06, P07, P08, P09, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20, P21, P22, P23, P24, P25, P26, P27, P28, P29, P30, P31, P32, P33, P34, P35, P36, P37];

/**
 * 37 个切点（全局帧），全部用 cf(n) 表达——重录口播后自动跟随，不要写成字面量。
 *
 *   第一幕 P01–P12  钩子 → 卖不掉 → 创立 → OICQ → 烧钱 → 四家没谈成 → IDG/盈科 → 移动梦网 → MIH → 盈科卖股 → 上市 → QQ 秀
 *   第二幕 P14–P25  游戏 → 3Q 大战 → 人心 → 微信立项 → 上线 → 破亿 → 支付 → 红包 → 春晚 → 超 FB → 王者荣耀
 *   第三幕 P26–P37  版号 → 腰斩 → 930 → 7.35 万亿 → 监管 → 跌出前十 → 视频号 → 2025 财报 → AI → 3.5 万亿 → 28 年账 → 收尾
 */
export const CUTS = [
  0, // P01 14.18 亿
  cf(3) - 6, // P02 想卖掉 · 100 万
  cf(8) - 6, // P03 目录 + 五个人 50 万
  cf(10) - 6, // P05 OICQ 上线
  cf(14) - 6, // P06 烧钱
  cf(17) - 6, // P07 四家 · 60 万
  cf(20) - 6, // P08 IDG 盈科 220 万
  cf(24) - 6, // P09 移动梦网
  cf(27) - 6, // P10 MIH 6,000 万
  cf(30) - 6, // P11 盈科卖股
  cf(32) - 6, // P12 2004 上市
  cf(35) - 6, // P13 2.91 亿与 QQ 秀
  cf(39) - 6, // P14 最大的游戏公司
  cf(42) - 6, // P15 360 指控
  cf(43) - 6, // P16 艰难的决定
  cf(47) - 6, // P17 官司赢人心输
  cf(49) - 6, // P18 Kik 张小龙
  cf(52) - 6, // P19 微信上线
  cf(54) - 6, // P20 433 天
  cf(57) - 6, // P21 微信支付
  cf(59) - 6, // P22 红包珍珠港
  cf(63) - 6, // P23 春晚与两万亿
  cf(65) - 6, // P24 超 Facebook
  cf(67) - 6, // P25 王者荣耀
  cf(68) - 6, // P26 4.5 万亿与版号
  cf(71) - 6, // P27 475 → 250
  cf(73) - 6, // P28 930 变革
  cf(75) - 6, // P29 7.35 万亿
  cf(77) - 6, // P30 监管
  cf(80) - 6, // P31 蒸发 5.4 万亿
  cf(82) - 6, // P32 视频号
  cf(85) - 6, // P33 2025 财报
  cf(88) - 6, // P34 混元元宝
  cf(90) - 6, // P35 3.5 万亿
  cf(92) - 6, // P36 28 年的账
  cf(94) - 6, // P37 收尾问句
];

export const FILM_A_FRAMES = DURATION;

export const FilmA: React.FC<{mix?: Mix}> = ({mix = 'all'}) => {
  const f = useCurrentFrame();
  const on = (m: Mix) => mix === 'all' || mix === m;

  return (
    <AbsoluteFill style={{background: G.bg, overflow: 'hidden'}}>
      {/* 底色 / 浮尘 / 颗粒挂在 Page 外面：跟着页淡化会让换页中间整幅发灰 */}
      <GildedBg f={f} tone="warm" glow={[48, 40]} />
      <Dust f={f} n={54} seed={57} />

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
      <GSub f={f} cues={CUES} y={948} skip={[6, 22, 23, 46, 55, 62, 67, 76, 83, 94, 95, 96]} />

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
        <span>科技简史 · 04</span>
        <span>腾讯 · 1998—2026</span>
        <span>
          {String(Math.min(PAGES.length, CUTS.filter((c) => c <= f).length)).padStart(2, '0')} / {PAGES.length}
        </span>
      </div>

      <Grain opacity={0.12} />

      {on('voice') && <Audio src={staticFile('audio/ep57-tencent-history/voice.wav')} />}
      {on('bgm') && <Audio src={staticFile('audio/ep57-tencent-history/bgm.wav')} />}
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
  ['type', 10, 0.2], // 14.18 亿抬头
  ['whoosh', CUTS[1], 0.4], // P02 进「想卖掉」
  ['paper', CUTS[1] + 40, 0.28], // P02 报价单
  ['stamp', CUTS[5] + 130, 0.42], // P07 「没卖」
  ['whoosh', CUTS[6], 0.4], // P08 IDG 盈科
  ['ding', CUTS[8] + 40, 0.3], // P10 MIH 6,000 万
  ['whoosh', CUTS[10], 0.42], // P12 上市
  ['ding', CUTS[10] + 44, 0.3], // P12 3.70 港元
  ['whoosh', CUTS[13], 0.42], // P15 3Q 大战
  ['shake', CUTS[14] + 20, 0.34], // P16 艰难的决定
  ['stamp', CUTS[14] + 108, 0.4], // P16 「出招」
  ['whoosh', CUTS[16], 0.4], // P18 Kik
  ['magic', CUTS[17], 0.36], // P19 微信上线
  ['ding', CUTS[18] + 40, 0.32], // P20 433 天
  ['paper', CUTS[20] + 16, 0.28], // P22 红包
  ['stamp', CUTS[20] + 158, 0.66], // P22 「珍珠港」
  ['confetti', CUTS[21], 0.3], // P23 春晚
  ['whoosh', CUTS[24], 0.4], // P26 版号
  ['error', CUTS[25], 0.36], // P27 腰斩
  ['paper', CUTS[26] + 20, 0.3], // P28 930 全员信
  ['confetti', CUTS[27], 0.32], // P29 7.35 万亿
  ['shake', CUTS[28], 0.36], // P30 监管
  ['error', CUTS[29], 0.38], // P31 5.4 万亿
  ['whoosh', CUTS[30], 0.4], // P32 视频号
  ['ding', CUTS[31] + 30, 0.3], // P33 2025 财报
  ['whoosh', CUTS[33], 0.42], // P35 3.5 万亿
  ['paper', CUTS[34] + 30, 0.28], // P36 28 年账
  ['whoosh', CUTS[35], 0.44], // P37 收尾
  ['question', CUTS[35] + 84, 0.34], // P37 问句
];
