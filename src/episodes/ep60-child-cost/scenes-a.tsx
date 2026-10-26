import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caption, Desk, Paper, StageHead, StageRow} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';
import {money, STAGES, THREE_PRICES, TOTAL} from './data';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** 淡入淡出：在 [a,b] 进场，在 [c,d] 退场 */
const fade = (f: number, a: number, b: number, c?: number, d?: number) => {
  const v = interpolate(f, [a, b], [0, 1], clamp);
  if (c === undefined || d === undefined) return v;
  return v * (1 - interpolate(f, [c, d], [0, 1], clamp));
};

/* ================================================================== */
/* S2 三个价格 —— 是 S1 的续页，不是新的一张纸                          */
/* ================================================================== */

/* 版面与 S1 完全一致，两张纸切换时边缘不跳 */
const PAPER_LEFT = 100;
const PAPER_W = 880;
const PAPER_TOP = -120;
const PAD = 64;
const CONTENT_W = PAPER_W - PAD * 2; // 752
const HEAD_Y = 552;
const FIRST_Y = 610;
const LINE_H = 88;
const KEEP_BOTTOM = 1560;
const S1_PAPER_H = FIRST_Y + STAGES.length * LINE_H + 250; // 1714，与 S1 结束时一致

/* 续页从 S1 的合计行下面接着打 */
const DIV_Y = 1430;
const AMT_Y = 1520;
const NOTE_Y = 1700;
const BAR1_Y = 1770;
const TWO_Y = 1890;
const THREE_Y = 2030;
const TAIL_Y = 2170;
const S2_PAPER_H = TAIL_Y + 250;

const BAR_W = 752;

export const S2Prices: React.FC = () => {
  const f = useCurrentFrame();

  /* 纸从 S1 的长度开始接,一点点长到续页需要的长度,滚动位置才不会跳 */
  const paperH = interpolate(f, [0, 240], [S1_PAPER_H, S2_PAPER_H], clamp);
  const scroll = Math.max(0, PAPER_TOP + paperH - KEEP_BOTTOM);

  const divP = interpolate(f, [40, 110], [0, 1], clamp);
  const qP = fade(f, 70, 120);
  const amtP = interpolate(f, [120, 190], [0, 1], clamp);
  const n1p = fade(f, 200, 250);
  const b1p = interpolate(f, [220, 290], [0, 1], clamp);
  const twoP = fade(f, 300, 350);
  const b2p = interpolate(f, [320, 390], [0, 1], clamp);
  const threeP = fade(f, 420, 470);
  const b3p = interpolate(f, [440, 510], [0, 1], clamp);

  const ratio = (v: number) => (v / THREE_PRICES.allocated.monthly) * BAR_W;

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />

      <div
        style={{
          position: 'absolute',
          left: PAPER_LEFT,
          top: PAPER_TOP,
          transform: `translateY(${-scroll}px)`,
          opacity: 1 - interpolate(f, [742, 780], [0, 1], clamp),
        }}
      >
        <Paper width={PAPER_W} height={paperH}>
          <div style={{position: 'absolute', left: PAD, top: 0, width: CONTENT_W}}>
            {/* 上半页：S1 打好的八行，原样还在纸上 */}
            <div style={{position: 'absolute', left: 0, top: HEAD_Y, width: CONTENT_W}}>
              <StageHead top={0} width={CONTENT_W} />
            </div>
            {STAGES.map((s, i) => (
              <StageRow
                key={s.age}
                idx={s.idx}
                age={s.age}
                name={s.name}
                monthly={money(s.monthly)}
                total={money(s.total)}
                months={s.months}
                progress={1}
                top={FIRST_Y + i * LINE_H}
                width={CONTENT_W}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: FIRST_Y + STAGES.length * LINE_H + 30,
                width: CONTENT_W,
              }}
            >
              <div style={{height: 4, background: R.ink, marginBottom: 16}} />
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <span style={{fontFamily: RF.cn, fontSize: 26, letterSpacing: '0.1em', color: R.ink2}}>
                  18 年，一共
                </span>
                <span style={{fontFamily: RF.dot, fontSize: 54, color: R.red}}>{money(TOTAL)}</span>
              </div>
            </div>

            {/* 下半页：把合计往回拆 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: DIV_Y,
                width: CONTENT_W * divP,
                height: 2,
                background: 'rgba(20,21,15,0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: DIV_Y + 36,
                width: CONTENT_W,
                opacity: qP,
                fontFamily: RF.dot,
                fontSize: 40,
                letterSpacing: '0.06em',
                color: R.ink2,
              }}
            >
              ÷ 228 个月
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: AMT_Y,
                display: 'flex',
                alignItems: 'baseline',
                gap: 22,
                opacity: amtP,
              }}
            >
              <span style={{fontFamily: RF.dot, fontSize: 112, color: R.red, letterSpacing: '0.01em'}}>
                {money(THREE_PRICES.allocated.monthly)}
              </span>
              <span
                style={{
                  fontFamily: RF.cn,
                  fontSize: 38,
                  color: R.red,
                  fontWeight: 600,
                  transform: 'translateY(-10px)',
                }}
              >
                元 / 月
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: NOTE_Y,
                width: CONTENT_W,
                opacity: n1p,
                fontFamily: RF.cn,
                fontSize: 30,
                color: R.ink,
                fontWeight: 600,
              }}
            >
              全家消费摊到孩子头上
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: BAR1_Y,
                width: BAR_W * b1p,
                height: 18,
                background: R.red,
                opacity: 0.92,
              }}
            />

            <div style={{position: 'absolute', left: 0, top: TWO_Y, width: CONTENT_W, opacity: twoP}}>
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <span style={{fontFamily: RF.cn, fontSize: 28, color: R.ink}}>只算非花不可的</span>
                <span style={{fontFamily: RF.dot, fontSize: 44, color: R.indigo}}>
                  {money(THREE_PRICES.necessary.monthly)}
                </span>
              </div>
              <div
                style={{
                  marginTop: 18,
                  width: ratio(THREE_PRICES.necessary.monthly) * b2p,
                  height: 20,
                  background: R.indigo,
                  opacity: 0.92,
                }}
              />
            </div>

            <div style={{position: 'absolute', left: 0, top: THREE_Y, width: CONTENT_W, opacity: threeP}}>
              <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                <span style={{fontFamily: RF.cn, fontSize: 28, color: R.ink}}>只算多出来的</span>
                <span style={{fontFamily: RF.dot, fontSize: 44, color: '#6F7068'}}>
                  {money(THREE_PRICES.marginal.monthly)}
                </span>
              </div>
              <div
                style={{
                  marginTop: 18,
                  width: ratio(THREE_PRICES.marginal.monthly) * b3p,
                  height: 20,
                  background: '#8E8F84',
                  opacity: 0.92,
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                top: TAIL_Y,
                width: CONTENT_W,
                opacity: fade(f, 520, 580),
                fontFamily: RF.cn,
                fontSize: 24,
                color: R.ink3,
                lineHeight: 1.6,
              }}
            >
              三条杠的右端对不齐，差的那些，就是「能省」和「本来就要花」。
            </div>
          </div>
        </Paper>
      </div>

      <Caption text="这个数，是把 18 年的总额摊到每个月。" p={fade(f, 150, 190, 290, 320)} />
      <Caption text="但同一个孩子，还有另外两种算法。" p={fade(f, 330, 370, 470, 500)} />
      <Caption text="三种算法的差别，就是「能省」和「本来就要花」。" p={fade(f, 560, 600)} />
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* S3 撕纸：58 万 → 39.51 → 25.30 → 14.77                              */
/* ================================================================== */

const TEAR_TOP = 200;
const PAPER_H0 = 1360;
const LEVELS = [
  {h: PAPER_H0, v: '58.00', cap: '全家消费摊到孩子头上', note: '占人均 GDP 的 6.06 倍'},
  {h: 926, v: '39.51', cap: '剔掉能省的', note: '改善住房、兴趣班、贵一点的衣物'},
  {h: 593, v: '25.30', cap: '再剔掉本来就要花的', note: '吃穿用度照旧的部分不算'},
  {h: 347, v: '14.77', cap: '一半家庭在这条线以下', note: '中位数，比平均数还低 42%'},
];
const TEAR_AT = [240, 480, 720];

export const S3Tear: React.FC = () => {
  const f = useCurrentFrame();

  const h = interpolate(f, [240, 330, 480, 570, 720, 810], [PAPER_H0, 926, 926, 593, 593, 347], clamp);
  const drop = interpolate(f, [0, 40], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />

      {TEAR_AT.map((t, i) => {
        const p = interpolate(f, [t, t + 90], [0, 1], clamp);
        if (p <= 0) return null;
        const from = LEVELS[i].h;
        const to = LEVELS[i + 1].h;
        return (
          <div
            key={t}
            style={{
              position: 'absolute',
              left: 100,
              top: TEAR_TOP + to,
              width: 880,
              height: from - to,
              backgroundColor: R.paper,
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(20,21,15,0.035) 0 1px, transparent 1px 52px)',
              boxShadow: `0 30px 60px rgba(0,0,0,${0.7 * (1 - p)})`,
              transform: `translate(${p * 90}px, ${p * 420}px) rotate(${p * 9}deg)`,
              opacity: 1 - p * 0.95,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: -24,
                height: 26,
                background: `repeating-linear-gradient(122deg, ${R.paper} 0 11px, transparent 11px 23px)`,
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 100,
          top: TEAR_TOP,
          transform: `translateY(${(1 - drop) * -900}px)`,
        }}
      >
        <Paper width={880} height={h}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 740}}>
            {LEVELS.map((lv, i) => {
              const a = i === 0 ? 40 : TEAR_AT[i - 1] + 70;
              const p = fade(f, a, a + 40, TEAR_AT[i] ?? 1e9, (TEAR_AT[i] ?? 1e9) + 20);
              if (p <= 0) return null;
              return (
                <React.Fragment key={lv.v}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 108,
                      width: 740,
                      fontFamily: RF.cn,
                      fontSize: 30,
                      color: R.ink2,
                      opacity: p,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {lv.cap}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 152,
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 14,
                      opacity: p,
                    }}
                  >
                    <span style={{fontFamily: RF.dot, fontSize: 108, color: R.ink, letterSpacing: '0.01em'}}>
                      {lv.v}
                    </span>
                    <span style={{fontFamily: RF.cn, fontSize: 46, color: R.ink, fontWeight: 600}}>万</span>
                  </div>
                  {i < 3 ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: 300,
                        width: 740,
                        fontFamily: RF.cn,
                        fontSize: 24,
                        color: R.ink3,
                        opacity: p,
                      }}
                    >
                      {lv.note}
                    </div>
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -24,
              height: 26,
              background: `repeating-linear-gradient(122deg, ${R.paper} 0 11px, transparent 11px 23px)`,
            }}
          />
        </Paper>
      </div>

      <Caption text="18 年 58 万，先撕掉能省的——剩 39.51 万。" p={fade(f, 40, 76, 220, 250)} />
      <Caption text="再撕掉本来就要花的。剩 25.30 万。" p={fade(f, 340, 380, 460, 490)} />
      <Caption text="还要再撕一刀：一半家庭在 14.77 万以下。" p={fade(f, 590, 630, 700, 730)} />
      <Caption text="差的那些纸，本来就不是「养孩子」。" p={fade(f, 830, 870)} />
    </AbsoluteFill>
  );
};
