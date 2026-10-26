import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Desk, Paper} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';
import {money, money0, PROVINCES, THREE_PRICES, TOTAL} from './data';
import {cf, ce} from './cues';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const F = (f: number, a: number, b: number, c?: number, d?: number) => {
  const v = interpolate(f, [a, b], [0, 1], clamp);
  if (c === undefined || d === undefined) return v;
  return v * (1 - interpolate(f, [c, d], [0, 1], clamp));
};

/* ================================================================== */
/* 地区与城乡（4279 → 4905）                                           */
/* ================================================================== */

const REG = [
  {name: '上海', v: PROVINCES.top[0].v, col: R.red},
  {name: '北京', v: PROVINCES.top[1].v, col: R.red},
  {name: '浙江', v: PROVINCES.top[2].v, col: R.red},
  {name: '广东', v: 3227.94, col: R.red},
  {name: '全国', v: PROVINCES.national, col: '#8E8F84'},
  {name: '甘肃', v: PROVINCES.bottom[1].v, col: R.indigo},
  {name: '西藏', v: PROVINCES.bottom[0].v, col: R.indigo},
];

const URBAN = [
  {name: '城镇', v: 3127.24, col: R.red},
  {name: '乡村', v: 1719.34, col: R.indigo},
];

export const RegionScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 22], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 20, to], [0, 1], clamp);
  const titleP = F(f, cf(52), cf(52) + 34);
  const urbanP = F(f, cf(56), cf(56) + 30);

  const max = PROVINCES.top[0].v;

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 140,
          width: 960,
          opacity: inP * outP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <Paper width={960} height={1440}>
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
              地方不一样
              <br />
              价格差 2.8 倍
            </div>
            <div
              style={{
                position: 'absolute',
                top: 296,
                width: 820,
                opacity: titleP,
                fontFamily: RF.dot,
                fontSize: 24,
                letterSpacing: '0.1em',
                color: R.ink3,
              }}
            >
              每孩每月 · 元
            </div>

            {REG.map((r, i) => {
              const at = from + 34 + i * 8;
              const bp = interpolate(f, [at, at + 26], [0, 1], clamp);
              const y = 352 + i * 118;
              const w = (r.v / max) * 520;
              return (
                <React.Fragment key={r.name}>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 20,
                      width: 128,
                      fontFamily: RF.cn,
                      fontSize: 27,
                      color: R.ink,
                      opacity: bp,
                    }}
                  >
                    {r.name}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 12,
                      left: 136,
                      width: w * bp,
                      height: 24,
                      background: r.col,
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 6,
                      left: 648,
                      width: 176,
                      textAlign: 'right',
                      fontFamily: RF.dot,
                      fontSize: 38,
                      color: r.col,
                      opacity: bp,
                    }}
                  >
                    {money0(r.v)}
                  </div>
                </React.Fragment>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1216,
                width: 820,
                opacity: urbanP,
                borderTop: `3px solid rgba(20,21,15,0.3)`,
                paddingTop: 26,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {URBAN.map((u) => (
                <div key={u.name}>
                  <div style={{fontFamily: RF.cn, fontSize: 24, color: R.ink2}}>{u.name}</div>
                  <div style={{fontFamily: RF.dot, fontSize: 44, color: u.col, marginTop: 6}}>{money0(u.v)}</div>
                </div>
              ))}
              <div style={{textAlign: 'right'}}>
                <div style={{fontFamily: RF.cn, fontSize: 24, color: R.ink2}}>城镇贵</div>
                <div style={{fontFamily: RF.dot, fontSize: 44, color: R.ink, marginTop: 6}}>82%</div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 三种算法：撕纸（4905 → 6124）                                       */
/* ================================================================== */

const TEAR_TOP = 220;
const LEVELS = [
  {h: 1280, v: '58.00', m: '2,543.84', cap: '全家消费摊到孩子头上', sub: '所有开销都算进去'},
  {h: 872, v: '39.51', m: '1,732.96', cap: '只算非花不可的', sub: '改善住房、兴趣班、贵衣服全剔掉'},
  {h: 558, v: '25.30', m: '1,109.63', cap: '只算多出来的', sub: '家里照旧，只算因为这个人才多花的'},
];
const T1 = cf(63);
const T2 = cf(66);

export const MethodScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 24], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 24, to], [0, 1], clamp);

  const h = interpolate(f, [T1, T1 + 80, T2, T2 + 80], [1280, 872, 872, 558], clamp);

  const sumP = F(f, cf(69), cf(69) + 34);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />

      {[0, 1].map((i) => {
        const t = [T1, T2][i];
        const p = interpolate(f, [t, t + 76], [0, 1], clamp);
        if (p <= 0) return null;
        const fromH = LEVELS[i].h;
        const toH = LEVELS[i + 1].h;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 100,
              top: TEAR_TOP + toH,
              width: 880,
              height: fromH - toH,
              backgroundColor: R.paper,
              backgroundImage:
                'repeating-linear-gradient(180deg, rgba(20,21,15,0.035) 0 1px, transparent 1px 52px)',
              boxShadow: `0 30px 60px rgba(0,0,0,${0.7 * (1 - p)})`,
              transform: `translate(${p * 80}px, ${p * 380}px) rotate(${p * 8}deg)`,
              opacity: (1 - p * 0.95) * inP,
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
          opacity: inP * outP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <Paper width={880} height={h}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 740}}>
            {LEVELS.map((lv, i) => {
              const a = i === 0 ? cf(59) : [T1, T2][i - 1] + 60;
              const c = i < 2 ? [T1, T2][i] : 1e9;
              const p = F(f, a, a + 40, c, c + 18);
              if (p <= 0) return null;
              return (
                <React.Fragment key={lv.v}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 96,
                      width: 740,
                      fontFamily: RF.cn,
                      fontSize: 30,
                      color: R.ink2,
                      opacity: p,
                    }}
                  >
                    {lv.cap}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 140,
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 12,
                      opacity: p,
                    }}
                  >
                    <span style={{fontFamily: RF.dot, fontSize: 104, color: R.ink}}>{lv.v}</span>
                    <span style={{fontFamily: RF.cn, fontSize: 44, color: R.ink, fontWeight: 600}}>万</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 262,
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 10,
                      opacity: p,
                    }}
                  >
                    <span style={{fontFamily: RF.cn, fontSize: 25, color: R.ink2}}>折合每月</span>
                    <span style={{fontFamily: RF.dot, fontSize: 52, color: R.ink}}>{lv.m}</span>
                    <span style={{fontFamily: RF.cn, fontSize: 25, color: R.ink2}}>元</span>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 334,
                      width: 740,
                      fontFamily: RF.cn,
                      fontSize: 24,
                      color: R.ink3,
                      opacity: p,
                    }}
                  >
                    {lv.sub}
                  </div>
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

      {/* 三个数并排收口 */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          right: 100,
          bottom: 300,
          opacity: sumP,
          transform: `translateY(${(1 - sumP) * 20}px)`,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {[
          {v: '58.0', c: R.red},
          {v: '39.5', c: R.indigo},
          {v: '25.3', c: '#C9C8BE'},
        ].map((it, i) => (
          <div key={i} style={{textAlign: 'center'}}>
            <div style={{fontFamily: RF.dot, fontSize: 72, color: it.c}}>{it.v}</div>
            <div style={{fontFamily: RF.cn, fontSize: 22, color: 'rgba(244,243,238,0.55)', marginTop: 4}}>万元</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 边际成本：第几个孩子                                                  */
/* ================================================================== */

/* 表 14（P45-46）全国核心区，备孕至 18 岁前每孩月均净增成本 */
const KIDS = [
  {n: '第一个', m: '1,269.48', y: '28.9', w: 1},
  {n: '第二个', m: '907.69', y: '20.7', w: 0.715},
  {n: '第三个', m: '773.75', y: '17.6', w: 0.61},
  {n: '第四个', m: '470.91', y: '10.7', w: 0.371},
];
const KBAR = 300;

export const KidsScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 24], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 24, to], [0, 1], clamp);
  const titleP = F(f, cf(72), cf(72) + 30);
  const avgP = F(f, cf(72) + 24, cf(72) + 60);
  const tailP = F(f, cf(76), cf(76) + 30);

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
        <Paper width={880} height={1300}>
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
              同一个孩子 · 按孩次拆开
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
              第几个，差多少
            </div>

            {/* 承接上一段：25.3 万是怎么来的 */}
            <div
              style={{
                position: 'absolute',
                top: 336,
                width: 740,
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                opacity: avgP,
              }}
            >
              <span style={{fontFamily: RF.cn, fontSize: 26, color: R.ink2}}>所有孩子平均</span>
              <span style={{fontFamily: RF.dot, fontSize: 56, color: '#8E8C7A'}}>1,109.63</span>
              <span style={{fontFamily: RF.cn, fontSize: 24, color: R.ink3}}>元 / 月 = 25.3 万</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 420,
                width: 740,
                height: 2,
                background: 'rgba(20,21,15,0.3)',
                opacity: avgP,
              }}
            />

            {KIDS.map((k, i) => {
              const at = i === 0 ? cf(73) : i === 1 ? cf(74) : i === 2 ? cf(74) + 50 : cf(75);
              const p = F(f, at, at + 26);
              const y = 470 + i * 168;
              const hot = i === 0;
              return (
                <React.Fragment key={k.n}>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 10,
                      width: 100,
                      fontFamily: RF.cn,
                      fontSize: 30,
                      fontWeight: hot ? 600 : 400,
                      color: hot ? R.red : R.ink,
                      opacity: p,
                    }}
                  >
                    {k.n}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y,
                      left: 104,
                      width: 146,
                      textAlign: 'right',
                      fontFamily: RF.dot,
                      fontSize: 44,
                      color: hot ? R.red : R.ink2,
                      opacity: p,
                    }}
                  >
                    {k.m}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 20,
                      left: 262,
                      width: KBAR * k.w * p,
                      height: 22,
                      background: hot ? R.red : '#B9B8AE',
                      opacity: hot ? 0.95 : 0.8,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 2,
                      left: 572,
                      width: 168,
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'flex-end',
                      gap: 6,
                      opacity: p,
                    }}
                  >
                    <span style={{fontFamily: RF.dot, fontSize: 44, color: R.ink}}>{k.y}</span>
                    <span style={{fontFamily: RF.cn, fontSize: 20, color: R.ink3}}>万</span>
                  </div>
                </React.Fragment>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1120,
                width: 740,
                borderTop: `4px solid ${R.red}`,
                paddingTop: 20,
                opacity: tailP,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 31, color: R.ink, fontWeight: 600, lineHeight: 1.5}}>
                越往后越便宜，东西能传下来
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 翻面（6124 → 7281）                                                 */
/* ================================================================== */

const BACK = [
  {k: '时间', cue: cf(79), v: '−12.6', unit: '小时 / 周', note: '妈妈的闲暇，孩子 0-6 岁' + '\n' + '爸爸是 −8.8'},
  {k: '机会', cue: cf(82), v: '−40%', unit: '', note: '生孩子那年的女性劳动参与率'},
  {k: '机会', cue: cf(85), v: '−6~7 年', unit: '', note: '一生的工作时间，折合约 30 万'},
  {k: '健康', cue: cf(88), v: '盆底 · 睡眠', unit: '', note: '围产期焦虑，没有价格但有代价'},
];

export const BackScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 30], [0, 1], clamp);
  const outP = 1 - interpolate(f, [to - 24, to], [0, 1], clamp);
  const glow = interpolate(f, [from, from + 60], [0, 1], clamp);
  const titleP = F(f, cf(77), cf(77) + 40);
  const tailP = F(f, cf(90), cf(90) + 30);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 66% 46% at 50% 36%, rgba(240,246,240,0.18), transparent 70%)',
          opacity: glow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 70,
          top: 120,
          width: 940,
          opacity: inP * outP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <Paper width={940} height={1470} style={{backgroundColor: '#EDEBE2'}}>
          <div style={{position: 'absolute', left: 74, top: 0, width: 792}}>
            <div style={{position: 'absolute', top: 140, width: 792, opacity: titleP}}>
              <div style={{fontFamily: RF.dot, fontSize: 24, letterSpacing: '0.24em', color: R.ink3, marginBottom: 18}}>
                REVERSE / 背面
              </div>
              <div style={{fontFamily: RF.heavy, fontWeight: 900, fontSize: 60, lineHeight: 1.3, color: R.ink}}>
                这些字印在背面
                <br />
                因为没法计价
              </div>
            </div>

            {BACK.map((it, i) => {
              const p = F(f, it.cue, it.cue + 40);
              const y = 560 + i * 220;
              const big = it.v.length <= 5;
              return (
                <div key={i} style={{position: 'absolute', top: y, left: 0, width: 792, opacity: p}}>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
                    <span
                      style={{
                        fontFamily: RF.cn,
                        fontSize: 24,
                        color: R.ink3,
                        letterSpacing: '0.22em',
                        width: 66,
                        flex: 'none',
                      }}
                    >
                      {it.k}
                    </span>
                    <span
                      style={{
                        fontFamily: big ? RF.dot : RF.cn,
                        fontSize: big ? 66 : 44,
                        fontWeight: big ? 400 : 600,
                        color: i === 1 || i === 2 ? R.red : R.ink,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {it.v}
                    </span>
                    {it.unit ? (
                      <span style={{fontFamily: RF.cn, fontSize: 24, color: R.ink2, whiteSpace: 'nowrap'}}>
                        {it.unit}
                      </span>
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      marginLeft: 84,
                      fontFamily: RF.cn,
                      fontSize: 23,
                      color: R.ink2,
                      lineHeight: 1.55,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {it.note}
                  </div>
                </div>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1345,
                width: 792,
                opacity: tailP,
                borderTop: `4px solid ${R.red}`,
                paddingTop: 18,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 30, color: R.ink, fontWeight: 600}}>
                这三样，一天也没进过账单。
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* 收尾（7281 → 结束）                                                 */
/* ================================================================== */

export const EndScene: React.FC<{from: number; to: number}> = ({from, to}) => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [from, from + 24], [0, 1], clamp);
  const p1 = F(f, cf(91), cf(91) + 34);
  const p2 = F(f, cf(92), cf(92) + 34);
  const p3 = F(f, cf(93), cf(93) + 40);
  const p4 = F(f, cf(94), cf(94) + 34);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 300,
          width: 880,
          opacity: inP,
          transform: `translateY(${(1 - inP) * 30}px)`,
        }}
      >
        <Paper width={880} height={1180}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 740}}>
            <div
              style={{
                position: 'absolute',
                top: 190,
                width: 740,
                textAlign: 'center',
                fontFamily: RF.cn,
                fontSize: 28,
                color: R.ink3,
                letterSpacing: '0.2em',
                opacity: p1,
              }}
            >
              19 年，一共
            </div>
            <div
              style={{
                position: 'absolute',
                top: 246,
                width: 740,
                textAlign: 'center',
                fontFamily: RF.dot,
                fontSize: 116,
                color: R.ink,
                opacity: p1,
              }}
            >
              {money(TOTAL)}
            </div>

            <div
              style={{
                position: 'absolute',
                top: 430,
                width: 740,
                textAlign: 'center',
                fontFamily: RF.cn,
                fontSize: 26,
                color: R.ink2,
                opacity: p2,
              }}
            >
              但这是平均数
            </div>
            <div
              style={{
                position: 'absolute',
                top: 480,
                width: 740,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: 14,
                opacity: p2,
              }}
            >
              <span style={{fontFamily: RF.cn, fontSize: 30, color: R.ink2}}>一半家庭在</span>
              <span style={{fontFamily: RF.dot, fontSize: 76, color: R.red}}>147,721</span>
              <span style={{fontFamily: RF.cn, fontSize: 26, color: R.ink2}}>以下</span>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 690,
                left: 60,
                width: 620,
                opacity: p3,
                borderTop: `4px solid ${R.ink}`,
                paddingTop: 32,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 38, lineHeight: 1.7, color: R.ink, fontWeight: 600}}>
                但纸上的每一个数
                <br />
                都有人真的付了
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 900,
                width: 740,
                textAlign: 'center',
                opacity: p4,
                transform: `translateY(${(1 - p4) * 16}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: RF.heavy,
                  fontWeight: 900,
                  fontSize: 48,
                  lineHeight: 1.45,
                  color: R.red,
                }}
              >
                你家养娃
                <br />
                每个月大概花多少钱？
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 1560,
          width: 880,
          opacity: p1,
          borderTop: '2px solid rgba(242,242,236,0.18)',
          paddingTop: 16,
          fontFamily: RF.cn,
          fontSize: 19,
          lineHeight: 1.66,
          color: 'rgba(242,242,236,0.46)',
        }}
      >
        数据来源：中国生育成本报告 2026 版 · CFPS 2016-2024 五轮面板
        <br />
        国家统计局《中国住户调查年鉴》2016-2024 · 2024 年价格
      </div>
    </AbsoluteFill>
  );
};
