import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {BigNumeral, EvidenceCard, RubberStamp} from '../../library/halftone/props';
import {CaptionBar, CaseHeader, DateChip, DotWipe, Flash, Halftone, Headline, NightBg, PaperBg, Pop, PrintGrain} from '../../library/halftone/stage';
import {H, HF, chunky, shake} from '../../library/halftone/theme';
import type {SfxCue} from '../../library/types';

/**
 * 样片 B · 动态版：取 ep53 真实配音的前 22 秒（cue 1–7），用网点档案风的「案卷」语法重排。
 *
 * 第二版节奏（第一版切太碎，4 秒一卷塞 6 个元素，观众读不完）：
 *   一卷只讲一件事，同屏不超过 3 组元素；元素一律**跟着口播的句子**出现，不提前预告；
 *   每卷末尾留 1.5–2 秒静止，让人把数字读完再切。
 *
 * 卷边界对口的句子：
 *   卷 1  0–297   cue 1–3  赚 234 亿 / 研发 1213 亿 / 不够五分之一
 *   卷 2  297–505 cue 4–5  十年投 1.38 万亿 →（白闪翻页）→ 1987 年本钱 2.1 万
 *   卷 3  505–660 cue 6–7  三次差点没过去，每次都换了一条命
 */
export const HALFTONE_MOTION_FRAMES = 690;

const V1 = 297; // 卷 1 结束（cue 3 说完）
const V2 = 505; // 卷 2 结束（cue 5 说完）
const FLIP = 108; // 卷 2 内部的翻页点（相对卷 2 开头），对齐 cue 5 开口

const Scene: React.FC<{f: number; from: number; to: number; children: (t: number) => React.ReactNode}> = ({f, from, to, children}) => {
  if (f < from || f >= to) return null;
  return <AbsoluteFill>{children(f - from)}</AbsoluteFill>;
};

/** 印章落定瞬间整场抖一下 */
const Shake: React.FC<{t: number; at: number; children: React.ReactNode}> = ({t, at, children}) => {
  const {x, y} = shake(t, at, 12, 9);
  return <AbsoluteFill style={{transform: `translate(${x}px, ${y}px)`}}>{children}</AbsoluteFill>;
};

/** 大数字 + 下面一行说明，作为一组一起弹，读者不用等第二件东西 */
const Figure: React.FC<{t: number; at: number; x: number; y: number; text: string; size: number; dot: string; id: string; caption: React.ReactNode; capY: number}> = ({t, at, x, y, text, size, dot, id, caption, capY}) => (
  <>
    <Pop f={t} at={at} x={x} y={y} from={0.45} origin="left bottom">
      <BigNumeral text={text} size={size} dot={dot} base={H.paperLight} id={id} />
    </Pop>
    <Pop f={t} at={at + 6} x={x + 24} y={capY} from={0.6} origin="left center">
      <div style={{fontFamily: HF.sans, fontSize: 40, color: H.ink, whiteSpace: 'nowrap'}}>{caption}</div>
    </Pop>
  </>
);

/** 案卷分卷标签：竖排小字，贴在画面右缘（深底要换纸色，否则灰字看不见） */
const Volume: React.FC<{no: string; dark?: boolean}> = ({no, dark}) => (
  <div style={{position: 'absolute', right: 28, top: 520, writingMode: 'vertical-rl', fontFamily: HF.mono, fontWeight: 700, fontSize: 20, letterSpacing: 6, color: dark ? H.paperDark : H.inkSoft}}>
    卷 {no} / 03
  </div>
);

export const HalftoneMotion: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: H.paper, fontFamily: HF.sans, overflow: 'hidden'}}>
      {/* ══ 卷 1 · 赚 234 亿，花 1213 亿，不够五分之一 ═════════════
          一卷讲完一个完整对照，不切。234 在 cue 1 出来，1213 等 cue 2 开口，
          印章等 cue 3 说到「五分之一」。 */}
      <Scene f={f} from={0} to={V1}>
        {(t) => (
          <Shake t={t} at={206}>
            <PaperBg />
            <Halftone color={H.yellow} cx={1830} cy={70} radius={400} step={24} f={t} breathe={0.03} />
            <Halftone color={H.blue} cx={1920} cy={1090} radius={420} step={22} />
            <CaseHeader f={t} at={0} no="2026-H1" tag={['账目', '上半年']} />
            <DateChip f={t} text="2026.06" />
            <Volume no="01" />

            {/* 中缝：一条虚线把「赚的」和「花的」分开 */}
            <div style={{position: 'absolute', left: 952, top: 214, width: 4, height: 396, background: `repeating-linear-gradient(to bottom, ${H.rule} 0 14px, transparent 14px 30px)`}} />

            <Figure
              t={t}
              at={40}
              x={100}
              y={252}
              text="234"
              size={300}
              dot={H.blue}
              id="hm-a"
              capY={566}
              caption={
                <>
                  亿元 · <span style={{color: H.pink}}>归母净利润</span>
                </>
              }
            />

            {/* 1213 比 234 晚 2.9 秒出来：等 cue 2 说到「花在研发上」 */}
            <Figure
              t={t}
              at={128}
              x={1012}
              y={268}
              text="1213"
              size={250}
              dot={H.pink}
              id="hm-b"
              capY={540}
              caption={
                <>
                  亿元 · <span style={{color: H.pink}}>研发投入</span>
                </>
              }
            />

            {/* 印章比 cue 3 早半秒砸下：它要留 2.9 秒给人看清，砸在句末就等于没停 */}
            <div style={{position: 'absolute', left: 688, top: 636}}>
              <RubberStamp f={t} at={206} text="五分之一" size={118} rot={-11} seed={3} />
            </div>
            <CaptionBar f={t} at={200} text="赚的，不够研发花的【五分之一】" />
          </Shake>
        )}
      </Scene>

      {/* ══ 卷 2 · 十年 1.38 万亿 → 翻页 → 1987 年本钱 2.1 万 ═══════
          同一卷里做「量级对照」：前半夜色讲十年投入，白闪翻到纸面讲起家本钱。
          翻页点卡在 cue 5 开口前一帧，听感上像翻过一页账。 */}
      <Scene f={f} from={V1} to={V2}>
        {(t) => {
          const second = t >= FLIP;
          return (
            <>
              {second ? <PaperBg /> : <NightBg f={t} stars={70} />}

              {!second && (
                <>
                  <Halftone color="#2b3778" cx={1080} cy={520} radius={[1180, 760]} mode="in" inner={0.34} step={24} />
                  <CaseHeader f={t} at={0} no="R&D-CUM" tag={['账目', '十年累计']} dark />
                  <DateChip f={t} text="2016–2026" dark />
                  <Volume no="02" dark />
                  <Headline f={t} at={8} text="近十年投进研发" x={130} y={206} size={62} color={H.paper} shadow="#0b1029" d={4} />
                  <Headline f={t} at={22} text="1.38 万亿" x={114} y={296} size={196} color={H.yellow} shadow={H.ink} d={9} />
                  <CaptionBar f={t} at={40} text="近十年，它往研发里投了【1.38 万亿】" dark />
                </>
              )}

              {second && (
                <>
                  {/* 网点往中间靠：这一卷只有一组元素，网点留在角落会让右半幅空成白板；但要避开「21000」的最后一个 0 */}
                  <Halftone color={H.yellow} cx={1800} cy={900} radius={460} step={24} f={t} breathe={0.03} />
                  <Halftone color={H.blue} cx={60} cy={1090} radius={360} step={22} />
                  <CaseHeader f={t} at={4} no="1987-09" tag={['起家', '深圳']} />
                  <DateChip f={t} text="1987.09" />
                  <Volume no="02" />
                  <Headline f={t} at={10} text="三十九年前的本钱" x={126} y={192} size={56} shadow="none" />
                  <Figure t={t} at={26} x={90} y={272} text="21000" size={290} dot={H.orangeDeep} id="hm-c" capY={588} caption={<>
                    元 · <span style={{color: H.pink}}>六个人凑的</span>
                  </>} />
                  <CaptionBar f={t} at={8} text="1987 年，它的本钱是【2.1 万块】" />
                </>
              )}

              {/* 翻页：快门白闪盖住底色切换 */}
              <Flash f={t} at={FLIP} len={6} max={0.92} />
            </>
          );
        }}
      </Scene>

      {/* ══ 卷 3 · 三次差点没过去 ═════════════════════════════════
          三张证据卡间隔 36 帧（1.2 秒），每张卡只看一个年份 + 一个数字。 */}
      <Scene f={f} from={V2} to={HALFTONE_MOTION_FRAMES}>
        {(t) => (
          <Shake t={t} at={118}>
            <PaperBg fold={false} />
            <Halftone color={H.blue} cx={1935} cy={1078} radius={520} step={24} f={t} breathe={0.03} />
            <CaseHeader f={t} at={0} no="1987—2026" tag={['提要', '三次生死']} />
            <Volume no="03" />

            <Headline f={t} at={6} text="三十九年里" x={130} y={156} size={74} shadow="none" />
            <Headline f={t} at={18} text="三次差点没过去" x={120} y={250} size={142} />

            <div style={{position: 'absolute', left: 300, top: 538}}>
              <EvidenceCard f={t} at={44} color={H.yellow} label="2002 · 冬天" rot={-6} w={330}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                  <div style={{fontFamily: HF.round, fontSize: 80, lineHeight: 1, ...chunky(H.ink, 4)}}>−13%</div>
                  <div style={{fontFamily: HF.sans, fontSize: 24, color: H.ink, marginTop: 6, whiteSpace: 'nowrap'}}>唯一一次下滑</div>
                </div>
              </EvidenceCard>
            </div>
            <div style={{position: 'absolute', left: 780, top: 518}}>
              <EvidenceCard f={t} at={78} color={H.blue} label="2003 · 思科" rot={3} w={330}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                  <div style={{fontFamily: HF.serif, fontSize: 70, fontWeight: 700, lineHeight: 1, color: H.ink}}>21 项</div>
                  <div style={{fontFamily: HF.sans, fontSize: 24, color: H.ink, marginTop: 6, whiteSpace: 'nowrap'}}>起诉罪名</div>
                </div>
              </EvidenceCard>
            </div>
            <div style={{position: 'absolute', left: 1260, top: 548}}>
              <EvidenceCard f={t} at={110} color={H.pink} label="2019 · 断供" rot={-3} w={330}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                  <div style={{fontFamily: HF.serif, fontSize: 70, fontWeight: 700, lineHeight: 1, color: H.ink}}>68 家</div>
                  <div style={{fontFamily: HF.sans, fontSize: 24, color: H.ink, marginTop: 6, whiteSpace: 'nowrap'}}>进实体清单</div>
                </div>
              </EvidenceCard>
            </div>

            <div style={{position: 'absolute', left: 1430, top: 186}}>
              <RubberStamp f={t} at={124} text="还活着" size={112} rot={-9} color={H.red} seed={6} />
            </div>
            <CaptionBar f={t} at={100} text="三次都走到悬崖边，〖每次都换了一条命回来〗" />
          </Shake>
        )}
      </Scene>

      {/* 卷与卷之间：网点淹没（2 处，不再是 4 处） */}
      <DotWipe f={f} at={V1 - 8} color={H.yellow} from="tl" hold={4} />
      <DotWipe f={f} at={V2 - 8} color={H.blue} from="br" hold={4} />

      <PrintGrain f={f} />

      {/* 声音：ep53 的真实配音与配乐（截前 22 秒）+ 共享音效 */}
      <Audio src={staticFile('audio/ep53-huawei-history/voice.wav')} startFrom={0} endAt={HALFTONE_MOTION_FRAMES} />
      <Audio src={staticFile('audio/ep53-huawei-history/bgm.wav')} startFrom={0} endAt={HALFTONE_MOTION_FRAMES} />
      {HALFTONE_MOTION_SFX.map(([name, from, vol], i) => (
        <Sequence key={i} from={from} durationInFrames={60} layout="none">
          <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/**
 * 音效表 [名字, 全局帧, 音量]：只保留「大动作」的声音——数字落位、印章砸下、翻页、换场。
 * 上一版每个小元素都配一声，22 秒响了 17 次，比画面还吵；这版压到 9 次。
 */
export const HALFTONE_MOTION_SFX: SfxCue[] = [
  // 卷 1：234 落位 → 1213 落位 → 印章
  ['pop', 40, 0.66],
  ['pop', 128, 0.66],
  ['stamp', 206, 1.0],
  // 卷 2：大字落位 → 翻页 → 21000 落位
  ['pop', V1 + 22, 0.72],
  ['whoosh', V1 + FLIP, 0.82],
  ['pop', V1 + FLIP + 26, 0.66],
  // 卷 3：三张卡落下（轻）→ 印章
  ['paper', V2 + 44, 0.56],
  ['paper', V2 + 78, 0.56],
  ['paper', V2 + 110, 0.56],
  ['stamp', V2 + 124, 1.0],
  // 换场
  ...[V1 - 8, V2 - 8].map((p): SfxCue => ['whoosh', p, 0.78]),
];
