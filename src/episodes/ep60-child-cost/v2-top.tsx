import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Caption, Desk, Paper, StageHead, StageRow} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';
import {AGES, BY_CATEGORY, money, money0, STAGES, TOTAL} from './data';
import {cf, ce} from './cues';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const F = (f: number, a: number, b: number, c?: number, d?: number) => {
  const v = interpolate(f, [a, b], [0, 1], clamp);
  if (c === undefined || d === undefined) return v;
  return v * (1 - interpolate(f, [c, d], [0, 1], clamp));
};

/* 版面 */
const PL = 100;
const PW = 880;
const PTOP = -120;
const PAD = 64;
const CW = PW - PAD * 2;

/* 八个类别的短标签，观众能对上号。
   第 6 项用「医疗」不用「看病」：这一类里包含药品、疫苗、体检，
   这些不是「看病」，说看病就把这一栏讲窄了。 */
export const SHORT = ['吃', '穿', '住', '日用', '出行', '医疗', '上学', '其他'];

/* ================================================================== */
/* 开场 + 总账（0 → 1056）                                              */
/* ================================================================== */

const HEAD_Y = 780;
const FIRST_Y = 838;
const LINE_H = 88;

export const SceneOpen: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  /* 纸落得快一点：原来 1.7 秒才落定，短视频前两秒不能空 */
  const drop = f < 6 ? 0 : spring({frame: f - 6, fps, config: {damping: 200, mass: 0.8}, durationInFrames: 24});
  const paperY = (1 - drop) * -1500;

  const paperH = interpolate(f, [cf(6), cf(6) + 130], [1180, FIRST_Y + 8 * LINE_H + 250], clamp);
  const scroll = Math.max(0, PTOP + paperH - 1560);

  /* 开场顺序跟着第一句走：「先给你一个数」出标题，「五十八万」出数字 */
  const kickerP = F(f, 4, 20);
  const titleP = F(f, 10, 44);
  const subP = F(f, cf(2) + 20, cf(2) + 56);
  const bigP = F(f, cf(1) + 18, cf(1) + 42);
  /* 说到「这个数有两个问题」时，把数字压暗退成背景 */
  const dimP = F(f, cf(3), cf(3) + 26);
  /* 红笔划线：「第一」「第二」各划一道，从左往右写出来 */
  const scr1 = F(f, cf(4), cf(4) + 20);
  const scr2 = F(f, cf(5), cf(5) + 20);
  const headP = F(f, cf(6) + 40, cf(6) + 90);
  const totP = F(f, cf(13), cf(13) + 30);

  const hl = (i: number) => {
    if (i === 5) return F(f, cf(8), cf(8) + 16, ce(9) - 10, ce(9) + 10);
    if (i === 6) return F(f, cf(10), cf(10) + 16, ce(11) - 10, ce(11) + 10);
    if (i === 1) return F(f, cf(12), cf(12) + 16, ce(13));
    return 0;
  };

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div style={{position: 'absolute', left: PL, top: PTOP, transform: `translateY(${paperY - scroll}px)`}}>
        <Paper width={PW} height={paperH}>
          <div style={{position: 'absolute', left: PAD, top: 0, width: CW}}>
            <div
              style={{
                position: 'absolute',
                top: 290,
                width: CW,
                clipPath: `inset(-8px ${(1 - kickerP) * 100}% -8px 0)`,
                fontFamily: RF.dot,
                fontSize: 24,
                letterSpacing: '0.32em',
                color: R.ink3,
              }}
            >
              CHINA · 2026
            </div>
            <div
              style={{
                position: 'absolute',
                top: 336,
                width: CW,
                clipPath: `inset(-12px ${(1 - titleP) * 100}% -12px 0)`,
                fontFamily: RF.heavy,
                fontWeight: 900,
                fontSize: 68,
                lineHeight: 1.24,
                color: R.ink,
              }}
            >
              养一个孩子
              <br />
              要多少钱
            </div>
            <div
              style={{
                position: 'absolute',
                top: 528,
                width: CW,
                opacity: subP,
                fontFamily: RF.cn,
                fontSize: 24,
                color: R.ink2,
                letterSpacing: '0.02em',
              }}
            >
              全国 · 2024 年 · 从怀孕前一年算到 17 岁
            </div>

            <div
              style={{
                position: 'absolute',
                top: 596,
                display: 'flex',
                alignItems: 'baseline',
                gap: 18,
                opacity: bigP * (1 - dimP * 0.62),
                transform: `translateY(${dimP * 5}px)`,
              }}
            >
              <span style={{fontFamily: RF.dot, fontSize: 132, color: R.red, letterSpacing: '0.01em'}}>
                {money0(TOTAL)}
              </span>
              <span style={{fontFamily: RF.cn, fontSize: 38, color: R.red, fontWeight: 600}}>元</span>
            </div>

            {/* 红笔划线：不是打叉，是两道斜杠，像有人拿笔在账单上批了两下 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 520,
                width: CW,
                height: 300,
                pointerEvents: 'none',
              }}
            >
              <div style={{position: 'absolute', inset: 0, clipPath: `inset(-40px ${(1 - scr1) * 100}% -40px 0)`}}>
                <svg width={CW} height={300}>
                  <path
                    d="M 8 144 C 168 138, 340 130, 470 124 S 580 118, 640 114"
                    stroke={R.red}
                    strokeWidth={10}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.94}
                  />
                </svg>
              </div>
              <div style={{position: 'absolute', inset: 0, clipPath: `inset(-40px ${(1 - scr2) * 100}% -40px 0)`}}>
                <svg width={CW} height={300}>
                  <path
                    d="M 96 182 C 240 172, 400 160, 520 152 S 646 144, 712 138"
                    stroke={R.red}
                    strokeWidth={10}
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.94}
                  />
                </svg>
              </div>
            </div>

            <div style={{position: 'absolute', left: 0, top: HEAD_Y, width: CW, opacity: headP}}>
              <StageHead top={0} width={CW} />
            </div>

            {STAGES.map((s, i) => {
              const at = cf(7) + i * 12;
              return (
                <StageRow
                  key={s.age}
                  idx={s.idx}
                  age={s.age}
                  name={s.name}
                  monthly={money(s.monthly)}
                  total={money(s.total)}
                  months={s.months}
                  progress={(f - at) / 10}
                  top={FIRST_Y + i * LINE_H}
                  width={CW}
                  highlight={hl(i)}
                />
              );
            })}

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: FIRST_Y + 8 * LINE_H + 46,
                width: CW,
                opacity: totP,
                clipPath: `inset(-20px ${(1 - totP) * 100}% -20px 0)`,
              }}
            >
              <div style={{height: 4, background: R.ink, marginBottom: 16}} />
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <span style={{fontFamily: RF.cn, fontSize: 26, letterSpacing: '0.1em', color: R.ink2}}>
                  19 年，一共
                </span>
                <span style={{fontFamily: RF.dot, fontSize: 54, color: R.red}}>{money(TOTAL)}</span>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 转折：钱到底花在哪（1064 → 1136）                                    */
/* ================================================================== */

export const SceneTurn: React.FC = () => {
  const f = useCurrentFrame();
  const p = F(f, cf(14), cf(14) + 26);
  const inP = interpolate(f, [0, 18], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 560,
          width: 880,
          height: 700,
          backgroundColor: R.paper,
          backgroundImage: 'repeating-linear-gradient(180deg, rgba(20,21,15,0.035) 0 1px, transparent 1px 52px)',
          boxShadow: '0 34px 80px rgba(0,0,0,0.62)',
          opacity: inP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 230,
            width: 740,
            fontFamily: RF.heavy,
            fontWeight: 900,
            fontSize: 62,
            lineHeight: 1.35,
            color: R.ink,
            opacity: p,
            transform: `translateY(${(1 - p) * 20}px)`,
          }}
        >
          但每一段里
          <br />
          钱到底花在哪
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 单阶段特写：这个阶段的钱怎么花                                        */
/* ================================================================== */

export const StageScene: React.FC<{
  band: number;
  from: number;
  to: number;
  /** 口播重点讲的那一类，红色 */
  hot: number;
  /** 右下角结论 */
  verdict: string;
}> = ({band, from, to, hot, verdict}) => {
  const f = useCurrentFrame();
  const age = AGES[band];
  const rows = BY_CATEGORY[age.key];
  const max = Math.max(...rows);
  const inP = interpolate(f, [from, from + 22], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 20, to], [0, 1], clamp);

  const titleP = F(f, from, from + 26);
  const numP = F(f, from + 10, from + 40);
  const verP = F(f, to - 90, to - 50);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 130,
          width: 880,
          opacity: inP * outP,
          transform: `translateY(${(1 - inP) * 34}px)`,
        }}
      >
        <Paper width={880} height={1470}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 740}}>
            <div
              style={{
                position: 'absolute',
                top: 120,
                width: 740,
                fontFamily: RF.cn,
                fontSize: 26,
                color: R.ink3,
                letterSpacing: '0.2em',
                opacity: titleP,
              }}
            >
              {String(band + 1).padStart(2, '0')} / 08
            </div>
            <div
              style={{
                position: 'absolute',
                top: 158,
                width: 740,
                fontFamily: RF.heavy,
                fontWeight: 900,
                fontSize: 64,
                color: R.ink,
                opacity: titleP,
              }}
            >
              {age.age}
            </div>
            <div
              style={{
                position: 'absolute',
                top: 248,
                width: 740,
                fontFamily: RF.cn,
                fontSize: 26,
                color: R.ink2,
                opacity: titleP,
              }}
            >
              {age.name}
            </div>

            <div
              style={{
                position: 'absolute',
                top: 316,
                width: 740,
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                opacity: numP,
              }}
            >
              <span style={{fontFamily: RF.dot, fontSize: 88, color: R.ink}}>{money(age.monthly)}</span>
              <span style={{fontFamily: RF.cn, fontSize: 30, color: R.ink2}}>元 / 月</span>
              <span style={{flex: 1}} />
              <span style={{fontFamily: RF.cn, fontSize: 28, color: R.ink3}}>这段一共</span>
              <span style={{fontFamily: RF.dot, fontSize: 48, color: R.ink}}>{money0(age.monthly * age.months)}</span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 424,
                width: 740,
                height: 2,
                background: 'rgba(20,21,15,0.3)',
                opacity: numP,
              }}
            />

            {rows.map((v, i) => {
              const at = from + 24 + i * 9;
              const bp = interpolate(f, [at, at + 26], [0, 1], clamp);
              const y = 470 + i * 100;
              const isHot = i === hot;
              const w = (v / max) * 420;
              return (
                <React.Fragment key={i}>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 4,
                      width: 76,
                      fontFamily: RF.cn,
                      fontSize: 26,
                      color: isHot ? R.red : R.ink2,
                      fontWeight: isHot ? 600 : 400,
                      opacity: bp,
                    }}
                  >
                    {SHORT[i]}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 12,
                      left: 86,
                      width: w * bp,
                      height: isHot ? 26 : 18,
                      background: isHot ? R.red : '#B9B8AE',
                      opacity: isHot ? 0.95 : 0.85,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: y,
                      left: 0,
                      width: 660,
                      textAlign: 'right',
                      fontFamily: RF.dot,
                      fontSize: isHot ? 46 : 38,
                      color: isHot ? R.red : R.ink2,
                      opacity: bp,
                    }}
                  >
                    {money0(v)}
                  </div>
                </React.Fragment>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1250,
                width: 740,
                borderTop: `4px solid ${R.red}`,
                paddingTop: 20,
                opacity: verP,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 32, color: R.ink, fontWeight: 600, lineHeight: 1.5}}>
                {verdict}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 八段总览：两条反方向的线                                             */
/* ================================================================== */

const OVER_ROWS = STAGES.map((s, i) => ({
  age: s.age,
  total: s.total,
  cat: BY_CATEGORY[AGES[i].key],
}));
const OVER_MAX = Math.max(...OVER_ROWS.map((r) => r.total));
const BAR_MAX = 640;
const OCAT = [0, 2, 5, 6, 7]; // 吃 / 住 / 医疗 / 上学 / 其他

export const OverviewScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 22], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 20, to], [0, 1], clamp);
  const titleP = F(f, cf(46), cf(46) + 30);
  const lineP = F(f, cf(49), cf(49) + 30);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 120,
          width: 960,
          opacity: inP * outP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <Paper width={960} height={1470}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 820}}>
            <div
              style={{
                position: 'absolute',
                top: 130,
                width: 820,
                opacity: titleP,
                fontFamily: RF.heavy,
                fontWeight: 900,
                fontSize: 54,
                lineHeight: 1.32,
                color: R.ink,
              }}
            >
              八段叠在一起看
              <br />
              有两条反方向的线
            </div>

            {OVER_ROWS.map((r, i) => {
              const y = 330 + i * 118;
              const at = from + 40 + i * 10;
              const bp = interpolate(f, [at, at + 30], [0, 1], clamp);
              const w = (r.total / OVER_MAX) * BAR_MAX;
              let cx = 130;
              return (
                <React.Fragment key={r.age}>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 6,
                      width: 110,
                      fontFamily: RF.cn,
                      fontSize: 24,
                      color: R.ink,
                      opacity: bp,
                    }}
                  >
                    {r.age}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y - 6,
                      left: 0,
                      width: 820,
                      textAlign: 'right',
                      fontFamily: RF.dot,
                      fontSize: 34,
                      color: R.ink3,
                      opacity: bp,
                    }}
                  >
                    {money0(r.total)}
                  </div>
                  {OCAT.map((ci) => {
                    const sw = (w * r.cat[ci]) / r.cat.reduce((a, b) => a + b, 0);
                    const col = ci === 5 ? '#BF3A2B' : ci === 6 ? '#2F7AA8' : ci === 0 ? '#D6D2BE' : ci === 2 ? '#8E8C7A' : '#5E5D52';
                    const seg = (
                      <div
                        key={ci}
                        style={{
                          position: 'absolute',
                          left: cx,
                          top: y + 14,
                          width: Math.max(0, sw * bp),
                          height: 30,
                          background: col,
                        }}
                      />
                    );
                    cx += sw * bp;
                    return seg;
                  })}
                </React.Fragment>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1260,
                width: 820,
                borderTop: `3px solid rgba(20,21,15,0.3)`,
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 26,
                  fontFamily: RF.cn,
                  fontSize: 23,
                  color: R.ink2,
                  flexWrap: 'wrap',
                }}
              >
                {[
                  ['吃', '#D6D2BE'],
                  ['住', '#8E8C7A'],
                  ['医疗', '#BF3A2B'],
                  ['上学', '#2F7AA8'],
                  ['其他', '#5E5D52'],
                ].map(([label, c]) => (
                  <span key={label} style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{width: 16, height: 16, background: c, display: 'inline-block'}} />
                    {label}
                  </span>
                ))}
              </div>
              <div style={{fontFamily: RF.cn, fontSize: 22, color: R.ink3, marginTop: 16, lineHeight: 1.62}}>
                <div>
                  <span style={{color: '#BF3A2B', fontWeight: 600}}>红条 · 医疗</span>
                  <span style={{margin: '0 10px', opacity: 0.45}}>|</span>0 岁 929 → 高中 133
                </div>
                <div>
                  <span style={{color: '#2F7AA8', fontWeight: 600}}>蓝条 · 教育</span>
                  <span style={{margin: '0 10px', opacity: 0.45}}>|</span>0 岁 50 → 高中 967
                </div>
                <div style={{fontSize: 19, color: 'rgba(20,21,15,0.44)', marginTop: 8}}>
                  两条都从 0 岁起算 · 教育 0-2 岁主要是绘本玩具，学费从 3 岁开始
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};
