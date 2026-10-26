import React from 'react';
import {AbsoluteFill} from 'remotion';
import {PAPER_LINES, PERF_HOLE, R, RF} from './theme';

/* ------------------------------------------------------------------ */
/* 台面：深墨绿漆面 + 一束顶光 + 极细颗粒                               */
/* ------------------------------------------------------------------ */

export const Desk: React.FC = () => (
  <AbsoluteFill style={{background: R.desk}}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 92% 66% at 50% 4%, ${R.deskHi} 0%, ${R.desk} 52%, ${R.deskLo} 100%)`,
      }}
    />
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse 46% 56% at 50% -8%, rgba(226,240,230,0.13), rgba(226,240,230,0.028) 46%, transparent 72%)',
      }}
    />
    <AbsoluteFill
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
        opacity: 0.55,
      }}
    />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 纸：冷白 + 打印压痕 + 齿孔 + 顶部柔光 + 卷边                        */
/* ------------------------------------------------------------------ */

const Perf: React.FC<{side: 'l' | 'r'}> = ({side}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      [side === 'l' ? 'left' : 'right']: 0,
      width: 16,
      backgroundImage: PERF_HOLE,
      backgroundSize: '100% 36px',
      backgroundRepeat: 'repeat-y',
    }}
  />
);

export const Paper: React.FC<{
  width: number;
  height: number;
  style?: React.CSSProperties;
  perf?: boolean;
  /** 底部撕口：锯齿条 */
  tornBottom?: boolean;
  children?: React.ReactNode;
}> = ({width, height, style, perf = true, tornBottom = false, children}) => (
  <div
    style={{
      position: 'absolute',
      width,
      height,
      backgroundColor: R.paper,
      backgroundImage: PAPER_LINES,
      boxShadow: '0 34px 80px rgba(0,0,0,0.62), 0 6px 18px rgba(0,0,0,0.4)',
      ...style,
    }}
  >
    {/* 顶部柔光：纸刚从机器里出来时那一层反光 */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.62), transparent 62%)',
      }}
    />
    {perf ? (
      <>
        <Perf side="l" />
        <Perf side="r" />
      </>
    ) : null}
    {tornBottom ? (
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
    ) : null}
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* 账单行：序号 / 年龄 / 说明 / 点线 / 金额                             */
/* ------------------------------------------------------------------ */

const DotLeader: React.FC = () => (
  <div style={{flex: 1, height: 1, margin: '0 14px 7px', borderBottom: `1.5px dotted rgba(20,21,15,0.4)`}} />
);

export const ReceiptRow: React.FC<{
  n: number;
  age: string;
  name: string;
  amount: string;
  /** 0..1，从左往右打出来 */
  progress: number;
  /** 正在打印：行尾跟一个墨块光标 */
  head?: boolean;
  top: number;
  width: number;
  fs?: number;
  dim?: boolean;
}> = ({n, age, name, amount, progress, head = false, top, width, fs = 40, dim = false}) => {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0) return null;
  const small = Math.round(fs * 0.75);
  const money = Math.round(fs * 1.0);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top,
        width,
        display: 'flex',
        alignItems: 'baseline',
        opacity: dim ? 0.35 : 1,
        clipPath: `inset(-14px ${(1 - p) * 100}% -14px 0)`,
      }}
    >
      <span style={{fontFamily: RF.dot, fontSize: small, color: R.ink3, width: fs * 1.6}}>
        {String(n).padStart(3, '0')}
      </span>
      <span style={{fontFamily: RF.cn, fontSize: fs * 0.95, fontWeight: 600, color: R.ink, width: fs * 3.8}}>
        {age}
      </span>
      <span style={{fontFamily: RF.cn, fontSize: small, color: R.ink2, whiteSpace: 'nowrap'}}>{name}</span>
      <DotLeader />
      <span style={{fontFamily: RF.dot, fontSize: money, color: R.ink, letterSpacing: '0.02em'}}>{amount}</span>
      {head ? (
        <div
          style={{
            position: 'absolute',
            right: `${(1 - p) * 100}%`,
            top: -2,
            width: Math.max(6, fs * 0.18),
            height: fs * 0.92,
            background: R.ink,
            opacity: 0.85,
          }}
        />
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 阶段行：一列每月，一列这一段一共                                      */
/* ------------------------------------------------------------------ */

const COL = {idx: 0.055, age: 0.19, name: 0.245, m: 0.21, t: 0.30};

export const StageHead: React.FC<{top: number; width: number}> = ({top, width}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      top,
      width,
      display: 'flex',
      borderBottom: `1.5px solid rgba(20,21,15,0.34)`,
      paddingBottom: 10,
      fontFamily: RF.cn,
      fontSize: 24,
      color: R.ink3,
      letterSpacing: '0.06em',
    }}
  >
    <span style={{width: width * COL.idx}}> </span>
    <span style={{width: width * COL.age}}>阶段</span>
    <span style={{width: width * COL.name}}>花在哪</span>
    <span style={{width: width * COL.m, textAlign: 'right'}}>这一段每月</span>
    <span style={{width: width * COL.t, textAlign: 'right'}}>这一段一共</span>
  </div>
);

export const StageRow: React.FC<{
  idx: string;
  age: string;
  name: string;
  monthly: string;
  total: string;
  months: number;
  progress: number;
  head?: boolean;
  top: number;
  width: number;
  /** 口播讲到这一行时描红 */
  highlight?: number;
}> = ({idx, age, name, monthly, total, months, progress, head = false, top, width, highlight = 0}) => {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0) return null;
  const h = Math.max(0, Math.min(1, highlight));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top,
        width,
        display: 'flex',
        alignItems: 'baseline',
        clipPath: `inset(-18px ${(1 - p) * 100}% -18px 0)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: -14,
          right: -14,
          top: -10,
          height: 62,
          background: `rgba(192,57,43,${0.1 * h})`,
          borderLeft: `5px solid rgba(192,57,43,${h})`,
        }}
      />
      <span style={{width: width * COL.idx, fontFamily: RF.dot, fontSize: 22, color: R.ink3}}>{idx}</span>
      <span
        style={{
          width: width * COL.age,
          fontFamily: RF.cn,
          fontSize: 33,
          fontWeight: 600,
          color: h > 0.4 ? R.red : R.ink,
        }}
      >
        {age}
      </span>
      <span style={{width: width * COL.name, fontFamily: RF.cn, fontSize: 20, color: R.ink2, lineHeight: 1.4}}>
        {name}
      </span>
      <span
        style={{
          width: width * COL.m,
          textAlign: 'right',
          fontFamily: RF.dot,
          fontSize: 36,
          color: R.ink2,
        }}
      >
        {monthly}
      </span>
      <span
        style={{
          width: width * COL.t,
          textAlign: 'right',
          fontFamily: RF.dot,
          fontSize: 44,
          color: h > 0.4 ? R.red : R.ink,
        }}
      >
        {total}
      </span>
      {head ? (
        <div
          style={{
            position: 'absolute',
            right: `${(1 - p) * 100}%`,
            top: -4,
            width: 8,
            height: 46,
            background: R.ink,
            opacity: 0.85,
          }}
        />
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 字幕：竖屏必须内嵌                                                  */
/* ------------------------------------------------------------------ */

export const Caption: React.FC<{text: string; p: number; bottom?: number}> = ({text, p, bottom = 244}) => {
  if (p <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        right: 56,
        bottom,
        opacity: p,
        transform: `translateY(${(1 - p) * 12}px)`,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 40,
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
        {text}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 红章：双线方框、斜 7 度、印泥不匀                                    */
/* ------------------------------------------------------------------ */

export const Stamp: React.FC<{
  label: string;
  value: string;
  note?: string;
  style?: React.CSSProperties;
  /** 0..1 砸下来的进度 */
  progress?: number;
}> = ({label, value, note, style, progress = 1}) => {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0) return null;
  const scale = 1.28 - 0.28 * p;
  return (
    <div
      style={{
        position: 'absolute',
        border: `6px double ${R.red}`,
        color: R.red,
        textAlign: 'center',
        padding: '26px 22px',
        transform: `rotate(-7deg) scale(${scale})`,
        opacity: p * 0.92,
        mixBlendMode: 'multiply',
        boxShadow: `inset 0 0 0 2px rgba(192,57,43,0.22)`,
        ...style,
      }}
    >
      <div style={{fontFamily: RF.dot, fontSize: 22, letterSpacing: '0.3em'}}>{label}</div>
      <div style={{fontFamily: RF.dot, fontSize: 66, lineHeight: 1.1, letterSpacing: '0.02em'}}>{value}</div>
      {note ? <div style={{fontFamily: RF.dot, fontSize: 22, letterSpacing: '0.14em'}}>{note}</div> : null}
    </div>
  );
};
