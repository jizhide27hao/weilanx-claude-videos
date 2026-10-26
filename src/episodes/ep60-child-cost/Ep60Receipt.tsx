import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Desk, Paper, StageHead, StageRow} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';
import {money, STAGES, TOTAL} from './data';

export const EP60_W = 1080;
export const EP60_H = 1920;
export const EP60_DURATION = 720; // 24 秒 · 30fps

/* 版面 */
const PAPER_LEFT = 100;
const PAPER_W = 880;
const PAPER_TOP = -120;
const PAD = 64;
const CONTENT_W = PAPER_W - PAD * 2;
const TITLE_Y = 300;
const HEAD_Y = 552;
const FIRST_Y = 610;
const LINE_H = 88;
const KEEP_BOTTOM = 1560;
const ROWS = STAGES.length;

/* 节奏：一行一个阶段，34 帧一行 */
const startOf = (i: number) => 165 + i * 62;
const printLen = 36;

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const Ep60Receipt: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  /* 纸从出纸口落下来 */
  const drop = frame < 26 ? 0 : spring({frame: frame - 26, fps, config: {damping: 200, mass: 0.8}, durationInFrames: 34});
  const paperY = (1 - drop) * -1600;

  /* 已打印到第几行（浮点，让纸连续变长） */
  let printed = 0;
  while (printed < ROWS && startOf(printed) <= frame) printed += 1;
  const last = Math.max(0, printed - 1);
  const t = printed === 0 ? 0 : Math.min(1, (frame - startOf(last)) / 62);
  const smoothIdx = printed === 0 ? 0 : last + t;

  /* 纸的长度跟着打印长度长 —— 纸有多长，就是花了多少钱 */
  const paperH = Math.max(1180, FIRST_Y + smoothIdx * LINE_H + 250);
  const scroll = Math.max(0, PAPER_TOP + paperH - KEEP_BOTTOM);

  /* 标题逐字打出来 */
  const kickerP = interpolate(frame, [55, 85], [0, 1], clamp);
  const titleP = interpolate(frame, [78, 162], [0, 1], clamp);
  const noP = interpolate(frame, [132, 162], [0, 1], clamp);
  const ruleP = interpolate(frame, [148, 188], [0, 1], clamp);
  const headP = interpolate(frame, [142, 178], [0, 1], clamp);
  const totalP = interpolate(frame, [642, 692], [0, 1], clamp);

  /* 两句字幕 */
  const sub1P =
    interpolate(frame, [178, 202], [0, 1], clamp) * (1 - interpolate(frame, [258, 276], [0, 1], clamp));
  const sub2P =
    interpolate(frame, [282, 308], [0, 1], clamp) * (1 - interpolate(frame, [408, 426], [0, 1], clamp));
  const sub3P = interpolate(frame, [432, 462], [0, 1], clamp);

  const jitter = Math.sin(frame * 1.9) * 0.4 + Math.sin(frame * 4.3) * 0.25;

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      <Desk />

      <div
        style={{
          position: 'absolute',
          left: PAPER_LEFT,
          top: PAPER_TOP,
          transform: `translateY(${paperY - scroll + jitter}px)`,
        }}
      >
        <Paper width={PAPER_W} height={paperH}>
          <div style={{position: 'absolute', left: PAD, top: 0, width: CONTENT_W}}>
            {/* 抬头 */}
            <div
              style={{
                position: 'absolute',
                top: TITLE_Y,
                left: 0,
                width: CONTENT_W,
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
                top: TITLE_Y + 44,
                left: 0,
                width: CONTENT_W,
                clipPath: `inset(-12px ${(1 - titleP) * 100}% -12px 0)`,
                fontFamily: RF.heavy,
                fontWeight: 900,
                fontSize: 68,
                letterSpacing: '0.02em',
                lineHeight: 1.24,
                color: R.ink,
              }}
            >
              养一个孩子要多少钱
            </div>

            <div
              style={{
                position: 'absolute',
                top: TITLE_Y + 146,
                left: 0,
                width: CONTENT_W,
                clipPath: `inset(-8px ${(1 - noP) * 100}% -8px 0)`,
                fontFamily: RF.dot,
                fontSize: 24,
                letterSpacing: '0.1em',
                color: R.ink2,
              }}
            >
              全国 · 2024 年 · 从怀孕前一年到 17 岁
            </div>

            <div
              style={{
                position: 'absolute',
                top: TITLE_Y + 204,
                left: 0,
                width: CONTENT_W * ruleP,
                height: 2,
                background: 'rgba(20,21,15,0.42)',
              }}
            />

            {/* 列头 */}
            <div style={{position: 'absolute', left: 0, top: HEAD_Y, width: CONTENT_W, opacity: headP}}>
              <StageHead top={0} width={CONTENT_W} />
            </div>

            {/* 八个阶段 */}
            {STAGES.map((s, i) => {
              const st = startOf(i);
              return (
                <StageRow
                  key={s.age}
                  idx={s.idx}
                  age={s.age}
                  name={s.name}
                  monthly={money(s.monthly)}
                  total={money(s.total)}
                  months={s.months}
                  progress={(frame - st) / printLen}
                  head={frame >= st && frame < st + printLen}
                  top={FIRST_Y + i * LINE_H}
                  width={CONTENT_W}
                />
              );
            })}

            {/* 合计 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: FIRST_Y + ROWS * LINE_H + 30,
                width: CONTENT_W,
                opacity: totalP,
                clipPath: `inset(-20px ${(1 - totalP) * 100}% -20px 0)`,
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
        {/* 纸在漆面台桌上的倒影 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: paperH - 4,
            width: PAPER_W,
            height: 92,
            background: 'linear-gradient(180deg, rgba(244,243,238,0.12), rgba(244,243,238,0))',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 出纸口：收银机的一角，纸从这里被吐出来 */}
      <div
        style={{
          position: 'absolute',
          left: PAPER_LEFT - 72,
          top: -44,
          width: PAPER_W + 144,
          height: 142,
          background: 'linear-gradient(180deg, #080C0A 0%, #0C120F 54%, #151F1A 86%, #1E2A24 100%)',
          boxShadow: '0 34px 64px rgba(0,0,0,0.94), inset 0 -1px 0 rgba(226,240,230,0.11)',
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: PAPER_LEFT - 16,
          top: 78,
          width: PAPER_W + 32,
          height: 20,
          background: 'linear-gradient(180deg, #000000 0%, #040706 58%, #0C120F 100%)',
          boxShadow: 'inset 0 2px 0 rgba(226,240,230,0.16)',
          zIndex: 11,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: PAPER_LEFT + PAPER_W + 22,
          top: 24,
          width: 18,
          height: 18,
          borderRadius: 9,
          background: '#8E2A20',
          boxShadow: '0 0 16px rgba(190,66,48,0.85)',
          zIndex: 12,
        }}
      />

      {/* 字幕：竖屏必须内嵌 */}
      <div style={{position: 'absolute', left: 56, right: 56, bottom: 244}}>
        {[
          {p: sub1P, text: '账单从打算要孩子那天开始打。'},
          {p: sub2P, text: '生下来那年最贵——住院、月子、奶粉全堆在一起。'},
          {p: sub3P, text: '最贵的一段不是高中，是小学那六年。'},
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? 'relative' : 'absolute',
              left: 0,
              right: 0,
              bottom: i === 0 ? undefined : 0,
              opacity: s.p,
              transform: `translateY(${(1 - s.p) * 12}px)`,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(9,13,11,0.86)',
                color: '#F2F2EC',
                fontFamily: RF.cn,
                fontSize: 38,
                lineHeight: 1.5,
                padding: '16px 28px',
                letterSpacing: '0.01em',
                textAlign: 'center',
              }}
            >
              {s.text}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
