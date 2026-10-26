import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caption, Desk, Paper} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';
import {
  AVG_BY_CATEGORY,
  BY_CHILD,
  money,
  money0,
  PLAIN_CATEGORY,
  PROVINCES,
  TOTAL,
} from './data';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const fade = (f: number, a: number, b: number, c?: number, d?: number) => {
  const v = interpolate(f, [a, b], [0, 1], clamp);
  if (c === undefined || d === undefined) return v;
  return v * (1 - interpolate(f, [c, d], [0, 1], clamp));
};

/* ================================================================== */
/* S4 钱花在哪：八类拆开                                                */
/* ================================================================== */

const MAX_CAT = Math.max(...AVG_BY_CATEGORY);
const BAR_W = 400;

export const S4Breakdown: React.FC = () => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 26], [0, 1], clamp);
  const titleP = interpolate(f, [10, 60], [0, 1], clamp);
  const sumP = fade(f, 560, 610);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div style={{position: 'absolute', left: 60, top: 120, width: 960, opacity: inP, transform: `translateY(${(1 - inP) * 36}px)`}}>
        <Paper width={960} height={1220}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 820}}>
            <div
              style={{
                position: 'absolute',
                top: 150,
                width: 820,
                fontFamily: RF.heavy,
                fontWeight: 900,
                fontSize: 54,
                lineHeight: 1.3,
                color: R.ink,
                opacity: titleP,
                transform: `translateY(${(1 - titleP) * 16}px)`,
              }}
            >
              每个月 2,544 元
              <br />
              花在这些地方
            </div>

            {PLAIN_CATEGORY.map((c, i) => {
              const y = 420 + i * 112;
              const a = 130 + i * 52;
              const lp = fade(f, a, a + 36);
              const bp = interpolate(f, [a + 26, a + 76], [0, 1], clamp);
              const hot = i < 2;
              const mid = i >= 2 && i < 5;
              const col = hot ? R.red : mid ? R.indigo : '#8E8F84';
              return (
                <React.Fragment key={c.name}>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 6,
                      left: 0,
                      width: 300,
                      fontFamily: RF.cn,
                      fontSize: 25,
                      color: R.ink,
                      opacity: lp,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.plain}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 14,
                      left: 310,
                      width: (c.v / MAX_CAT) * BAR_W * bp,
                      height: 24,
                      background: col,
                      opacity: 0.92,
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: y + 4,
                      left: 0,
                      width: 820,
                      textAlign: 'right',
                      fontFamily: RF.dot,
                      fontSize: 34,
                      color: R.ink,
                      opacity: lp,
                    }}
                  >
                    {money0(c.v)}
                  </div>
                </React.Fragment>
              );
            })}

            <div
              style={{
                position: 'absolute',
                top: 1290,
                width: 820,
                opacity: sumP,
                borderTop: `4px solid ${R.ink}`,
                paddingTop: 20,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 30, color: R.ink, lineHeight: 1.6}}>
                吃和学这两项，加起来占了 <span style={{color: R.red, fontWeight: 600}}>47%</span>。
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <Caption text="上海一个月 4,751，是它的 1.9 倍。" p={fade(f, 600, 650)} />
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* S5 差异：地域 + 孩次                                                 */
/* ================================================================== */

const PROV_ROWS = [
  {name: '上海', v: PROVINCES.top[0].v, col: R.red},
  {name: '全国平均', v: PROVINCES.national, col: '#8E8F84'},
  {name: '西藏', v: PROVINCES.bottom[0].v, col: R.indigo},
];

const CHILD_ROWS = BY_CHILD.map((c, i) => ({
  name: c.n === 4 ? '第 4 个' : `第 ${c.n} 个`,
  v: c.v,
  col: i === 0 ? R.red : i === 1 ? R.indigo : '#8E8F84',
}));

const RowBars: React.FC<{
  rows: {name: string; v: number; col: string}[];
  base: number;
  top: number;
  start: number;
  f: number;
}> = ({rows, base, top, start, f}) => (
  <>
    {rows.map((r, i) => {
      const y = top + i * 190;
      const a = start + i * 60;
      const lp = fade(f, a, a + 40);
      const bp = interpolate(f, [a + 30, a + 90], [0, 1], clamp);
      return (
        <React.Fragment key={r.name}>
          <div
            style={{
              position: 'absolute',
              top: y,
              left: 0,
              width: 400,
              fontFamily: RF.cn,
              fontSize: 34,
              fontWeight: 600,
              color: R.ink,
              opacity: lp,
            }}
          >
            {r.name}
          </div>
          <div
            style={{
              position: 'absolute',
              top: y - 8,
              left: 400,
              width: 400,
              textAlign: 'right',
              fontFamily: RF.dot,
              fontSize: 52,
              color: r.col,
              opacity: lp,
            }}
          >
            {money0(r.v)}
          </div>
          <div
            style={{
              position: 'absolute',
              top: y + 70,
              left: 0,
              width: (r.v / base) * 780 * bp,
              height: 26,
              background: r.col,
              opacity: 0.92,
            }}
          />
        </React.Fragment>
      );
    })}
  </>
);

export const S5Gap: React.FC = () => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 26], [0, 1], clamp);
  const p1 = fade(f, 0, 30, 430, 470);
  const p2 = fade(f, 470, 520);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div style={{position: 'absolute', left: 60, top: 180, width: 960, opacity: inP, transform: `translateY(${(1 - inP) * 36}px)`}}>
        <Paper width={960} height={1220}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 820}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 820, opacity: p1}}>
              <div
                style={{
                  position: 'absolute',
                  top: 130,
                  width: 820,
                  fontFamily: RF.heavy,
                  fontWeight: 900,
                  fontSize: 54,
                  lineHeight: 1.3,
                  color: R.ink,
                }}
              >
                同样是养一个孩子
                <br />
                差了三倍
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 300,
                  width: 820,
                  fontFamily: RF.dot,
                  fontSize: 24,
                  letterSpacing: '0.1em',
                  color: R.ink2,
                }}
              >
                每月分摊生育成本 · 元
              </div>
              <RowBars rows={PROV_ROWS} base={PROVINCES.top[0].v} top={430} start={60} f={f} />
            </div>

            <div style={{position: 'absolute', left: 0, top: 0, width: 820, opacity: p2}}>
              <div
                style={{
                  position: 'absolute',
                  top: 130,
                  width: 820,
                  fontFamily: RF.heavy,
                  fontWeight: 900,
                  fontSize: 54,
                  lineHeight: 1.3,
                  color: R.ink,
                }}
              >
                多生一个
                <br />
                反而更便宜
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 300,
                  width: 820,
                  fontFamily: RF.dot,
                  fontSize: 24,
                  letterSpacing: '0.1em',
                  color: R.ink2,
                }}
              >
                每个孩子每月净增成本 · 元
              </div>
              <RowBars rows={CHILD_ROWS} base={CHILD_ROWS[0].v} top={430} start={520} f={f} />
            </div>
          </div>
        </Paper>
      </div>

      <Caption text="上海一个月 4,751，西藏 1,711。" p={fade(f, 220, 260, 420, 450)} />
      <Caption text="第二个孩子的成本，只有第一个的 72%。" p={fade(f, 640, 680)} />
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* S6 翻面：钱买不到的部分                                              */
/* ================================================================== */

const BACK_ITEMS = [
  {k: '时间', v: '−12.6', unit: '小时 / 周', note: '母亲的闲暇（孩子 0-6 岁），父亲是 −8.8', hot: false},
  {k: '机会', v: '−40%', unit: '', note: '生孩子当年的女性劳动参与率', hot: true},
  {k: '机会', v: '−6~7 年', unit: '', note: '一生的工作时间，折合收入约 30 万', hot: true},
  {k: '健康', v: '盆底 · 睡眠', unit: '', note: '生理损耗与围产期心理压力', hot: false},
];

export const S6Back: React.FC = () => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 26], [0, 1], clamp);
  const glow = interpolate(f, [0, 80], [0, 1], clamp);
  const titleP = interpolate(f, [20, 80], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 66% 46% at 50% 36%, rgba(240,246,240,0.20), transparent 70%)',
          opacity: glow,
        }}
      />
      <div style={{position: 'absolute', left: 70, top: 120, width: 940, opacity: inP, transform: `translateY(${(1 - inP) * 36}px)`}}>
        <Paper width={940} height={1520} style={{backgroundColor: '#EDEBE2'}}>
          <div style={{position: 'absolute', left: 74, top: 0, width: 792}}>
            <div
              style={{
                position: 'absolute',
                top: 150,
                width: 792,
                opacity: titleP,
              }}
            >
              <div
                style={{
                  fontFamily: RF.dot,
                  fontSize: 24,
                  letterSpacing: '0.24em',
                  color: R.ink3,
                  marginBottom: 20,
                }}
              >
                REVERSE / 背面
              </div>
              <div
                style={{
                  fontFamily: RF.heavy,
                  fontWeight: 900,
                  fontSize: 62,
                  lineHeight: 1.3,
                  color: R.ink,
                }}
              >
                这些字印在背面
                <br />
                因为没法计价
              </div>
            </div>

            {BACK_ITEMS.map((it, i) => {
              const a = 200 + i * 210;
              const p = fade(f, a, a + 60);
              const y = 560 + i * 230;
              return (
                <div key={i} style={{position: 'absolute', top: y, left: 0, width: 792, opacity: p}}>
                  <div style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
                    <span
                      style={{
                        fontFamily: RF.cn,
                        fontSize: 24,
                        color: R.ink3,
                        letterSpacing: '0.24em',
                        width: 66,
                        flex: 'none',
                      }}
                    >
                      {it.k}
                    </span>
                    <span
                      style={{
                        fontFamily: it.v.length > 5 ? RF.cn : RF.dot,
                        fontSize: it.v.length > 5 ? 52 : 68,
                        fontWeight: it.v.length > 5 ? 600 : 400,
                        color: it.hot ? R.red : R.ink,
                        letterSpacing: '0.01em',
                      }}
                    >
                      {it.v}
                    </span>
                    {it.unit ? (
                      <span style={{fontFamily: RF.cn, fontSize: 26, color: R.ink2}}>{it.unit}</span>
                    ) : null}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      marginLeft: 86,
                      fontFamily: RF.cn,
                      fontSize: 24,
                      color: R.ink2,
                      lineHeight: 1.6,
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
                top: 1370,
                width: 792,
                borderTop: `4px solid ${R.red}`,
                paddingTop: 20,
                opacity: fade(f, 1050, 1110),
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 30, color: R.ink, lineHeight: 1.6}}>
                这三项，一天也没进过账单。
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <Caption text="把纸翻过来。" p={fade(f, 60, 100, 190, 220)} />
      <Caption text="时间、机会、健康——这三样不在任何一张账单上。" p={fade(f, 1080, 1130)} />
    </AbsoluteFill>
  );
};

/* ================================================================== */
/* S7 收尾                                                             */
/* ================================================================== */

export const S7End: React.FC = () => {
  const f = useCurrentFrame();
  const inP = interpolate(f, [0, 26], [0, 1], clamp);
  const p1 = interpolate(f, [10, 60], [0, 1], clamp);
  const p2 = fade(f, 110, 160);
  const p3 = fade(f, 300, 350);

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />
      <div style={{position: 'absolute', left: 100, top: 300, width: 880, opacity: inP, transform: `translateY(${(1 - inP) * 36}px)`}}>
        <Paper width={880} height={1000}>
          <div style={{position: 'absolute', left: 70, top: 0, width: 740}}>
            <div
              style={{
                position: 'absolute',
                top: 210,
                width: 740,
                fontFamily: RF.cn,
                fontSize: 30,
                color: R.ink3,
                letterSpacing: '0.2em',
                opacity: p1,
                textAlign: 'center',
              }}
            >
              合计
            </div>
            <div
              style={{
                position: 'absolute',
                top: 280,
                width: 740,
                textAlign: 'center',
                fontFamily: RF.dot,
                fontSize: 132,
                color: R.red,
                opacity: p1,
                letterSpacing: '0.01em',
              }}
            >
              {money(TOTAL)}
            </div>
            <div
              style={{
                position: 'absolute',
                top: 470,
                width: 740,
                textAlign: 'center',
                fontFamily: RF.cn,
                fontSize: 28,
                color: R.ink2,
                opacity: p2,
              }}
            >
              ≈ 2024 年人均 GDP 的 6.06 倍
            </div>

            <div
              style={{
                position: 'absolute',
                top: 660,
                left: 60,
                width: 620,
                opacity: p3,
                borderTop: `4px solid ${R.ink}`,
                paddingTop: 34,
              }}
            >
              <div style={{fontFamily: RF.cn, fontSize: 40, lineHeight: 1.75, color: R.ink, fontWeight: 600}}>
                这笔钱是被平均过的。
                <br />
                但纸上的每一个数
                <br />
                都有人真的付了。
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <Caption text="58 万，是平均数。" p={fade(f, 120, 160, 290, 320)} />
    </AbsoluteFill>
  );
};
