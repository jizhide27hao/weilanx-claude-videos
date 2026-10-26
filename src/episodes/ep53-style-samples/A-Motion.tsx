import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {clamp01} from '../../library/anim';
import {Parchment, RedStamp} from '../../library/gilded/props';
import {BookCite, Dust, GCaption, GildedBg, Grain, Soft, YearHeader} from '../../library/gilded/stage';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';
import type {SfxCue} from '../../library/types';

/**
 * 样片 A · 动态版：取 ep53 真实配音的前 23 秒（cue 1–7），用暗金文献风的「翻年报」语法重排。
 *
 * 和 B（网点档案）的语法差别，就是这一版想验证的东西：
 *   1. 换场不硬切，是**交叉淡化**——前后两页叠在一起溶过去，镜头一直在慢推；
 *   2. 元素一律**柔入**（模糊收拢），没有弹入、没有砸下，唯一的爆点是结尾那枚印章；
 *   3. 一页可以**同时摊开好几件**东西：两个数字并排 + 中缝金线 + 比例注脚 + 文献抬头，
 *      观众自己决定先看哪儿，不需要跟着「弹出顺序」走。
 *
 * 三页对口的句子：
 *   页 1  0–313    cue 1–3  赚 234 亿 / 花 1,213 亿 / 只有五分之一
 *   页 2  297–521  cue 4–5  十年投 1.38 万亿 →（淡化翻页）→ 1987 年本钱 2.1 万
 *   页 3  505–690  cue 6–7  三次差点没过去，每次都换了一条命
 */
export const GILDED_MOTION_FRAMES = 690;

const P1 = 297; // 页 1 开始溶出 / 页 2 开始溶入
const P2 = 505; // 页 2 开始溶出 / 页 3 开始溶入
const FADE = 16; // 交叉淡化的重叠长度

/** 十年研发投入（亿元），2016–2025，取自华为历年年报；合计 13,821 亿 = 1.38 万亿 */
const RD: [number, number][] = [
  [2016, 764],
  [2017, 897],
  [2018, 1015],
  [2019, 1317],
  [2020, 1419],
  [2021, 1427],
  [2022, 1615],
  [2023, 1647],
  [2024, 1797],
  [2025, 1923],
];

/**
 * 交叉淡化容器：from–to 是这页的存活区间（相邻两页故意重叠 FADE 帧），
 * 进和出都是一次模糊收放，外加整页 3% 的慢推——静止画面也在呼吸。
 */
const Page: React.FC<{f: number; from: number; to: number; children: (t: number) => React.ReactNode}> = ({f, from, to, children}) => {
  if (f < from || f >= to) return null;
  const v = Math.min(clamp01((f - from) / FADE), clamp01((to - f) / FADE));
  const push = 1 + 0.03 * clamp01((f - from) / (to - from));
  return (
    <AbsoluteFill style={{opacity: v, filter: v < 1 ? `blur(${(1 - v) * 7}px)` : undefined}}>
      <AbsoluteFill style={{transform: `scale(${push})`}}>{children(f - from)}</AbsoluteFill>
    </AbsoluteFill>
  );
};

/** 竖金线：从中心往两头长出来，两头渐隐，像一条手画的界线 */
const VLine: React.FC<{f: number; at: number; x: number; y0: number; y1: number; dur?: number}> = ({f, at, x, y0, y1, dur = 24}) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  const h = (y1 - y0) * p;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: (y0 + y1) / 2 - h / 2,
        width: 1,
        height: h,
        background: `linear-gradient(180deg, rgba(214,180,106,0) 0%, ${G.goldLine} 16%, ${G.gold} 50%, ${G.goldLine} 84%, rgba(214,180,106,0) 100%)`,
      }}
    />
  );
};

/** 横金线：从左往右画出来，尾巴渐隐 */
const HLine: React.FC<{f: number; at: number; x: number; y: number; w: number; dur?: number}> = ({f, at, x, y, w, dur = 20}) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w * p,
        height: 1,
        background: `linear-gradient(90deg, ${G.gold} 0%, ${G.goldLine} 70%, rgba(214,180,106,0) 100%)`,
      }}
    />
  );
};

/** 通栏表线：**整条淡入**，不像坐标轴那样从左往右画——画到一半会像一道没画完的划痕 */
const RuleFade: React.FC<{f: number; at: number; x: number; y: number; w: number; dur?: number}> = ({f, at, x, y, w, dur = 18}) => {
  const v = clamp01((f - at) / dur);
  if (v <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 1,
        opacity: v,
        background: `linear-gradient(90deg, rgba(214,180,106,0.5) 0%, rgba(214,180,106,0.16) 55%, rgba(214,180,106,0.5) 100%)`,
      }}
    />
  );
};

/** 大数字一块：小标签 + 金色巨型数字 + 单位。
 * 标签可以比数字早出（labelAt），数字那一行用固定高度的盒把**单位对齐到同一条底线**——
 * 两栏字号不一样时，靠自然流排下来「亿元」会一高一低。
 */
const FigureBlock: React.FC<{f: number; at: number; labelAt?: number; x: number; y: number; w: number; label: string; value: string; size: number; unit: string; unitColor?: string}> = ({
  f,
  at,
  labelAt,
  x,
  y,
  w,
  label,
  value,
  size,
  unit,
  unitColor = G.gold,
}) => (
  <>
    <Soft f={f} at={labelAt ?? at} dur={22} style={{left: x, top: y, width: w}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 13, color: G.ivoryDim}}>{label}</div>
    </Soft>
    <Soft f={f} at={at} dur={22} style={{left: x, top: y + 44, width: w}}>
      <div style={{height: size * 1.06, display: 'flex', alignItems: 'flex-end'}}>
        <span style={{fontFamily: GF.num, fontSize: size, lineHeight: 1, letterSpacing: 2, ...goldText(0.75)}}>{value}</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 10, color: unitColor, marginTop: 2}}>{unit}</div>
    </Soft>
  </>
);

/** 十年研发柱：逐根从左往右长出来，最新的那根顶端点一颗亮金 */
const RdBars: React.FC<{f: number; at: number; x: number; base: number; bw: number; gap: number; hMax: number}> = ({f, at, x, base, bw, gap, hMax}) => {
  const max = 1923;
  return (
    <>
      {RD.map(([year, v], i) => {
        const p = clamp01((f - at - i * 4) / 12);
        const h = (v / max) * hMax * p;
        const hot = i === RD.length - 1;
        const left = x + i * (bw + gap);
        return (
          <React.Fragment key={year}>
            <div
              style={{
                position: 'absolute',
                left,
                top: base - h,
                width: bw,
                height: h,
                background: hot ? `linear-gradient(180deg, ${G.goldBright}, ${G.goldDeep})` : `linear-gradient(180deg, ${G.gold}, ${G.goldDeep})`,
                opacity: 0.55 + 0.35 * p,
              }}
            />
            <div style={{position: 'absolute', left, top: base + 10, width: bw, textAlign: 'center', fontFamily: GF.num, fontSize: 17, color: hot ? G.goldBright : G.ivoryFaint, letterSpacing: 1, opacity: p}}>{year}</div>
          </React.Fragment>
        );
      })}
    </>
  );
};

/**
 * 三栏里的一栏。拆成「表头」和「行」两次出场：
 * 三栏的年份、细线、事件在 headAt 一起亮（版面立刻成型，读者先看懂结构），
 * 数字和备注再按 at 依次填进去——这是文档的读法，不是幻灯片的读法。
 */
const Col: React.FC<{f: number; at: number; headAt: number; x: number; year: string; event: string; num: string; detail: string}> = ({f, at, headAt, x, year, event, num, detail}) => (
  <>
    <Soft f={f} at={headAt} dur={20} style={{left: x, top: 548, width: 360}}>
      <div style={{fontFamily: GF.num, fontSize: 62, lineHeight: 1, letterSpacing: 4, ...goldText(0.45)}}>{year}</div>
      <div style={{width: 360, height: 1, margin: '12px 0 14px', background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.15))`}} />
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 5, color: G.ivoryDim}}>{event}</div>
    </Soft>
    <Soft f={f} at={at} dur={22} style={{left: x, top: 700, width: 360}}>
      <div style={{fontFamily: GF.num, fontSize: 96, lineHeight: 1.1, ...goldText(0.6)}}>{num}</div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 8}}>{detail}</div>
    </Soft>
  </>
);

export const GildedMotion: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: G.bg}}>
      {/* 底色、光晕、暗角**不参与**交叉淡化：挂在最底层一直亮着。
          否则两页各降一半不透明度叠在一起，中间那 0.5 秒整幅会明显发暗。 */}
      <GildedBg f={f} tone="warm" glow={[48, 40]} />
      {/* ══ 页 1 · 2026 上半年：赚的 234 / 花的 1,213 / 只有五分之一 ══════════
          这一页要证明的就是「同屏并置」：两个数字、中缝、比例注脚一开始就各就各位，
          观众什么时候看哪边都行，不靠出场顺序牵着走。 */}
      <Page f={f} from={0} to={P1 + FADE}>
        {(t) => (
          <>
            <Dust f={t} n={52} />
            <YearHeader f={t} at={6} year="2026" caption="深圳 · 上半年" rollAt={10} prev="2025" />
            <BookCite
              f={t}
              at={14}
              original="Huawei Investment & Holding — 2026 Interim Report"
              title="华为投资控股 2026 年半年度报告"
              meta="营收 4,678 亿 · 净利 234 亿 · 研发 1,214 亿"
              seal="半年"
            />

            {/* 中缝：一条金线把「赚的」和「花的」分开。它比右边那个数字早 1 秒出现，
                先把版面划成两栏，右边就不是「空着」而是「待填」。 */}
            <VLine f={t} at={56} x={960} y0={232} y1={648} dur={30} />

            <FigureBlock f={t} at={22} x={200} y={252} w={560} label="归 母 净 利 润" value="234" size={300} unit="亿元" />
            <FigureBlock f={t} at={112} labelAt={64} x={1120} y={252} w={560} label="研 发 投 入" value="1,213" size={244} unit="亿元" />

            {/* 比例注脚：落在中缝正下方，是这一页真正想让人记住的那个关系 */}
            <Soft f={t} at={226} dur={24} style={{left: 810, top: 676, width: 300, textAlign: 'center'}}>
              <div style={{fontFamily: GF.num, fontSize: 88, lineHeight: 1, ...goldTextLight(0.3)}}>19.3%</div>
              <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 4, color: G.ivoryFaint, marginTop: 6}}>净利 ÷ 研发</div>
            </Soft>

            <GCaption f={t} at={176} text="赚的，不够研发花的【五分之一】" />

            {/* 表底线：一条通栏细线，把这一页收成一张「账页」，不靠留白硬撑 */}
            <RuleFade f={t} at={150} x={200} y={858} w={1520} dur={18} />
          </>
        )}
      </Page>

      {/* ══ 页 2 · 十年 1.38 万亿 →（淡化翻页）→ 1987 年本钱 2.1 万 ═══════
          同一页里做量级对照：柱状图慢慢长完，然后整页溶成 1987 年的一张出资登记。
          抬头年份在淡化那一刻从 2025 滚到 1987，像翻过一页账。 */}
      <Page f={f} from={P1} to={P2 + FADE}>
        {(t) => (
          <>
            <Dust f={t} n={46} seed={11} />
            {/* 1987 那半边压一层冷光：同一套底子上换「温度」，比换底色稳 */}
            {t >= 118 && (
              <AbsoluteFill style={{background: 'radial-gradient(ellipse 64% 58% at 46% 42%, rgba(40,62,104,0.30) 0%, rgba(20,30,52,0.10) 48%, rgba(0,0,0,0) 76%)'}} />
            )}
            {/* 两枚抬头交叉淡化：不是滚字，是「换了一页」，读起来更像翻账册 */}
            <YearHeader f={t} at={4} out={112} year="2025" caption="深圳 · 十年研发账" />
            <YearHeader f={t} at={122} year="1987" caption="深圳 · 六个人凑的本钱" />

            {t < 132 && (
              <>
                <BookCite
                  f={t}
                  at={6}
                  out={110}
                  original="Huawei Investment & Holding — Annual Report 2025"
                  title="华为投资控股 2025 年年度报告"
                  meta="近十年研发投入累计 13,820 亿元"
                  seal="年报"
                />
                <Soft f={t} at={12} out={104} dur={20} style={{left: 0, right: 0, top: 150, textAlign: 'center'}}>
                  <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 18, color: G.ivoryDim}}>近 十 年 · 研 发 投 入 累 计</div>
                </Soft>
                <Soft f={t} at={20} out={104} dur={24} style={{left: 0, right: 0, top: 230, textAlign: 'center'}}>
                  <span style={{fontFamily: GF.num, fontSize: 214, lineHeight: 1, letterSpacing: 2, ...goldText(0.85)}}>1.38</span>
                  <span style={{fontFamily: GF.cn, fontSize: 52, letterSpacing: 12, color: G.gold, marginLeft: 20}}>万亿</span>
                </Soft>
                <HLine f={t} at={30} x={340} y={806} w={1202} dur={26} />
                <RdBars f={t} at={40} x={340} base={806} bw={86} gap={38} hMax={168} />
                {/* 只给最后一根柱挂一个读数：整排柱子说的是「年年加码」，一句话就够了 */}
                <Soft f={t} at={78} out={104} dur={20} style={{left: 1092, top: 590, width: 450, textAlign: 'right'}}>
                  <div style={{fontFamily: GF.num, fontSize: 26, color: G.goldBright, letterSpacing: 1}}>1,923</div>
                  <div style={{fontFamily: GF.cn, fontSize: 16, color: G.ivoryFaint, letterSpacing: 2}}>2025 单年</div>
                </Soft>
              </>
            )}

            {t >= 118 && (
              <>
                <BookCite
                  f={t}
                  at={124}
                  original="Shenzhen Company Registry, 1987"
                  title="深圳市华为技术有限公司 · 设立登记"
                  meta="注册资本 21,000 元 · 出资人 6 名"
                  seal="登记"
                />
                <Soft f={t} at={126} dur={24} style={{left: 168, top: 430}}>
                  <Parchment
                    title="创 办 出 资"
                    sub="Shenzhen, September 1987"
                    rows={[
                      ['出资人', '6 名'],
                      ['注册资金', '21,000 元'],
                      ['起步业务', '交换机代理'],
                    ]}
                    foot={['1987.09', '深圳']}
                    w={400}
                    rot={-3}
                  />
                </Soft>
                <Soft f={t} at={140} dur={26} style={{left: 0, right: 0, top: 424, textAlign: 'center'}}>
                  <span style={{fontFamily: GF.num, fontSize: 224, lineHeight: 1, letterSpacing: 2, ...goldText(0.85)}}>21,000</span>
                </Soft>
                <Soft f={t} at={158} dur={22} style={{left: 0, right: 0, top: 686, textAlign: 'center'}}>
                  <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 8, color: G.ivory}}>
                    元 · <span style={{...goldTextLight(0.25), letterSpacing: 2}}>六个人凑的</span>
                  </div>
                </Soft>
              </>
            )}

            {t < 132 && <GCaption f={t} at={40} out={104} text="近十年，它往研发里投了【1.38 万亿】" />}
            {t >= 118 && <GCaption f={t} at={118} text="1987 年，它的本钱是【2.1 万块】" />}
          </>
        )}
      </Page>

      {/* ══ 页 3 · 三十九年，三次差点没过去 ═══════════════════════════
          三栏并排摊开，不像 B 那样一张张弹出来——读者可以左右横扫，
          哪一次最狠（−13%）自己判断。结尾盖一枚「活着」。 */}
      <Page f={f} from={P2} to={GILDED_MOTION_FRAMES}>
        {(t) => (
          <>
            <Dust f={t} n={44} seed={19} />
            <YearHeader f={t} at={2} year="2026" caption="三十九年 · 三次生死" />
            <BookCite f={t} at={16} original="Surviving Three Near-Death Years" title="2002 · 2003 · 2019" meta="营业收入 / 诉讼文书 / 出口管制清单" seal="提要" />

            <Soft f={t} at={10} dur={24} style={{left: 152, top: 176}}>
              <div style={{fontFamily: GF.cn, fontSize: 60, letterSpacing: 6, color: G.ivory}}>三十九年里</div>
            </Soft>
            <Soft f={t} at={24} dur={26} style={{left: 146, top: 254}}>
              <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 118, letterSpacing: 8, lineHeight: 1.1, ...goldText(0.9)}}>三次差点没过去</div>
            </Soft>

            <Col f={t} at={40} headAt={34} x={170} year="2002" event="华为的冬天" num="−13%" detail="营收 221 亿 · 史上唯一负增长" />
            <Col f={t} at={62} headAt={34} x={720} year="2003" event="思科起诉" num="21 项" detail="77 页起诉书 · 次年和解" />
            <Col f={t} at={84} headAt={34} x={1270} year="2019" event="进实体清单" num="68 家" detail="5 月 16 日 · 手机海外腰斩" />

            <div style={{position: 'absolute', left: 1652, top: 190}}>
              <RedStamp f={t} at={104} text="活着" size={150} rot={-9} />
            </div>

            <GCaption f={t} at={92} text="三次都走到悬崖边，每次都换了一条命回来" />
            <RuleFade f={t} at={62} x={170} y={876} w={1560} dur={18} />
          </>
        )}
      </Page>

      {/* 页脚：一条细线 + 系列名 + 页码，和前面几张样片保持同一套书面感 */}
      <div style={{position: 'absolute', left: 76, right: 76, bottom: 62, height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0.35), rgba(214,180,106,0.12), rgba(214,180,106,0.35))`}} />
      <div
        style={{
          position: 'absolute',
          left: 76,
          right: 76,
          bottom: 26,
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
        <span>样片 A / 暗金文献</span>
      </div>

      <Grain opacity={0.12} />

      {/* 声音：ep53 的真实配音与配乐（同一段 23 秒）+ 少量音效 */}
      <Audio src={staticFile('audio/ep53-huawei-history/voice.wav')} startFrom={0} endAt={GILDED_MOTION_FRAMES} />
      <Audio src={staticFile('audio/ep53-huawei-history/bgm.wav')} startFrom={0} endAt={GILDED_MOTION_FRAMES} />
      {GILDED_MOTION_SFX.map(([name, from, vol], i) => (
        <Sequence key={i} from={from} durationInFrames={60} layout="none">
          <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/**
 * 音效表 [名字, 全局帧, 音量]。暗金文献风的音量纪律：只在「换页」和「盖章」时出声，
 * 数字落位一律静默——这套风格的重量感来自静，配多了就成综艺了。
 */
export const GILDED_MOTION_SFX: SfxCue[] = [
  ['type', 10, 0.22], // 年份滚字
  ['whoosh', P1, 0.5], // 第一页溶出
  ['paper', P1 + 118, 0.42], // 翻到 1987 那张登记
  ['type', P2 + 8, 0.2], // 年份从 1987 滚到 2026
  ['whoosh', P2, 0.46], // 第二页溶出
  ['stamp', P2 + 104, 0.8], // 活着
];
