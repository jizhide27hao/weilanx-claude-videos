import React from 'react';
import type {Cue} from '../cues';
import {clamp01} from '../anim';
import {G, GF, goldText, goldTextLight} from './theme';

/**
 * 暗金文献风的「版面零件库」：ep53 整片（film-a）由 36 页组成，每页都靠这些件拼。
 *
 * 和样片 A-Motion.tsx 里那套临时组件的区别：
 *   Page / HLine / VLine / RuleFade / Figure / Col 是从样片原样提升过来的（已验证过），
 *   新增 GSub（直接读 cues 出字幕）、KV（账页键值行）、MiniTable（带表头的数据表）、
 *   Spark（对数折线，画 39 年命运线）、Mark（朱红叉/勾）、Frame（描金框）。
 *
 * 全场只有三种动效：柔入（soft）、金线画出（画半截、尾巴渐隐）、交叉淡化换页。
 * 没有弹入、没有砸下——唯一允许的爆点是 RedStamp。
 */

/** 交叉淡化的重叠长度：相邻两页各留 16 帧溶在一起 */
export const FADE = 16;

/**
 * 一页。from–to 是存活区间（相邻页故意重叠 FADE 帧），进和出都是一次模糊收放，
 * 外加整页 3% 的慢推——静止画面也在呼吸。
 *
 * anchor 是这一页的「第 0 帧」（切点），传进 children 的 t 以它为 0：
 * 每页的 at 都从 0 起算，负帧时元素还没出场，正好落在交叉淡化里。
 */
export const Page: React.FC<{f: number; from: number; to: number; anchor?: number; children: (t: number) => React.ReactNode; push?: number}> = ({f, from, to, anchor, children, push = 0.03}) => {
  if (f < from || f >= to) return null;
  const v = Math.min(clamp01((f - from) / FADE), clamp01((to - f) / FADE));
  const s = 1 + push * clamp01((f - from) / Math.max(1, to - from));
  return (
    <div style={{position: 'absolute', inset: 0, opacity: v, filter: v < 1 ? `blur(${(1 - v) * 7}px)` : undefined, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: '50% 46%'}}>{children(f - (anchor ?? from))}</div>
    </div>
  );
};

/** 竖金线：从中心往两头长出来，两头渐隐 */
export const VLine: React.FC<{f: number; at: number; x: number; y0: number; y1: number; dur?: number; out?: number; color?: string}> = ({f, at, x, y0, y1, dur = 24, out, color = G.gold}) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  const o = out === undefined ? 1 : 1 - clamp01((f - out) / 12);
  const h = (y1 - y0) * p;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: (y0 + y1) / 2 - h / 2,
        width: 1,
        height: h,
        opacity: o,
        background: `linear-gradient(180deg, rgba(214,180,106,0) 0%, ${G.goldLine} 16%, ${color} 50%, ${G.goldLine} 84%, rgba(214,180,106,0) 100%)`,
      }}
    />
  );
};

/** 横金线：从左往右画出来，尾巴渐隐 */
export const HLine: React.FC<{f: number; at: number; x: number; y: number; w: number; dur?: number; out?: number}> = ({f, at, x, y, w, dur = 20, out}) => {
  const p = clamp01((f - at) / dur);
  if (p <= 0) return null;
  const o = out === undefined ? 1 : 1 - clamp01((f - out) / 12);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w * p,
        height: 1,
        opacity: o,
        background: `linear-gradient(90deg, ${G.gold} 0%, ${G.goldLine} 70%, rgba(214,180,106,0) 100%)`,
      }}
    />
  );
};

/** 通栏表线：**整条淡入**，不从左往右画——画到一半会像一道没画完的划痕 */
export const RuleFade: React.FC<{f: number; at: number; x: number; y: number; w: number; dur?: number; out?: number; strong?: boolean}> = ({f, at, x, y, w, dur = 18, out, strong}) => {
  const v = clamp01((f - at) / dur) * (out === undefined ? 1 : 1 - clamp01((f - out) / 12));
  if (v <= 0) return null;
  const a = strong ? 0.7 : 0.5;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: 1,
        opacity: v,
        background: `linear-gradient(90deg, rgba(214,180,106,${a}) 0%, rgba(214,180,106,0.16) 55%, rgba(214,180,106,${a}) 100%)`,
      }}
    />
  );
};

/**
 * 大数字一块：小标签 + 金色巨型数字 + 单位。
 * 标签可以比数字早出（labelAt），数字那一行用固定高度的盒把**单位对齐到同一条底线**——
 * 两栏字号不一样时，靠自然流排下来「亿元」会一高一低。
 */
export const Figure: React.FC<{
  f: number;
  at: number;
  labelAt?: number;
  out?: number;
  x: number;
  y: number;
  w: number;
  label?: string;
  value: string;
  size: number;
  unit?: string;
  unitColor?: string;
  align?: 'left' | 'right' | 'center';
}> = ({f, at, labelAt, out, x, y, w, label, value, size, unit, unitColor = G.gold, align = 'left'}) => (
  <>
    {label ? (
      <Soft f={f} at={labelAt ?? at} out={out} dur={22} style={{left: x, top: y, width: w, textAlign: align}}>
        <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 13, color: G.ivoryDim}}>{label}</div>
      </Soft>
    ) : null}
    <Soft f={f} at={at} out={out} dur={22} style={{left: x, top: y + (label ? 44 : 0), width: w, textAlign: align}}>
      <div style={{height: size * 1.06, display: 'flex', alignItems: 'flex-end', justifyContent: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start'}}>
        <span style={{fontFamily: GF.num, fontSize: size, lineHeight: 1, letterSpacing: 2, ...goldText(0.75)}}>{value}</span>
      </div>
      {unit ? <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 10, color: unitColor, marginTop: 2}}>{unit}</div> : null}
    </Soft>
  </>
);

/** 三栏里的一栏：表头（年份 / 细线 / 事件）和数值分两次出场，先立结构再填内容 */
export const Col: React.FC<{f: number; at: number; headAt: number; x: number; y?: number; w?: number; year: string; event: string; num: string; detail: string; red?: boolean; size?: number}> = ({
  f,
  at,
  headAt,
  x,
  y = 548,
  w = 360,
  year,
  event,
  num,
  detail,
  red,
  size = 96,
}) => (
  <>
    <Soft f={f} at={headAt} dur={20} style={{left: x, top: y, width: w}}>
      <div style={{fontFamily: GF.num, fontSize: 62, lineHeight: 1, letterSpacing: 4, ...goldText(0.45)}}>{year}</div>
      <div style={{width: w, height: 1, margin: '12px 0 14px', background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.15))`}} />
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 5, color: G.ivoryDim}}>{event}</div>
    </Soft>
    <Soft f={f} at={at} dur={22} style={{left: x, top: y + 152, width: w}}>
      <div style={{fontFamily: GF.num, fontSize: size, lineHeight: 1.1, ...(red ? {color: G.red, textShadow: `0 0 24px rgba(200,81,60,0.5)`} : goldText(0.6))}}>{num}</div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 8}}>{detail}</div>
    </Soft>
  </>
);

/** 柔入容器：包住任意内容，at 出场、out 退场，带模糊 */
export const Soft: React.FC<{f: number; at: number; out?: number; dur?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({f, at, out, dur = 18, style, children}) => {
  const i = clamp01((f - at) / dur);
  const o = out === undefined ? 1 : 1 - clamp01((f - out) / 12);
  const v = (1 - Math.pow(1 - i, 3)) * o;
  if (v <= 0.001) return null;
  return <div style={{position: 'absolute', ...style, opacity: v, filter: v < 1 ? `blur(${(1 - v) * 9}px)` : undefined}}>{children}</div>;
};

/** 小标签条：一条短金线 + 拉丁小字 + 中文，放在版面左上，标一页的「条目名」 */
export const Tag: React.FC<{f: number; at: number; x: number; y: number; cn: string; latin?: string; out?: number}> = ({f, at, x, y, cn, latin, out}) => (
  <Soft f={f} at={at} out={out} dur={18} style={{left: x, top: y}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <div style={{width: 34, height: 1, background: G.gold}} />
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 8, color: G.gold}}>{cn}</div>
      {latin ? <div style={{fontFamily: GF.latinItalic, fontSize: 15, color: G.ivoryFaint, letterSpacing: 1}}>{latin}</div> : null}
    </div>
  </Soft>
);

/** 账页键值行：左边条目、右边数字，中间点线，逐行淡入。
 *  值用**绝对定位贴右端**，不用 flex 挤——否则长条目会把值推出容器右边界。 */
export const KV: React.FC<{f: number; at: number; x: number; y: number; w: number; rows: [string, string][]; gap?: number; size?: number; hot?: number[]}> = ({f, at, x, y, w, rows, gap = 44, size = 24, hot = []}) => (
  <>
    {rows.map(([k, v], i) => (
      <Soft key={k} f={f} at={at + i * 7} dur={18} style={{left: x, top: y + i * gap, width: w}}>
        <div style={{position: 'relative', height: size * 1.5}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 10, paddingRight: Math.min(w * 0.55, 8 + [...v].length * size * 0.62)}}>
            <span style={{fontFamily: GF.cn, fontSize: size, letterSpacing: 3, color: G.ivoryDim, whiteSpace: 'nowrap'}}>{k}</span>
            <span style={{flex: 1, borderBottom: `1px dotted rgba(214,180,106,0.26)`, transform: 'translateY(-5px)'}} />
          </div>
          <span style={{position: 'absolute', right: 0, top: -2, fontFamily: GF.num, fontSize: size * 1.05, letterSpacing: 1, whiteSpace: 'nowrap', color: hot.includes(i) ? G.goldBright : G.ivory}}>{v}</span>
        </div>
      </Soft>
    ))}
  </>
);

/** 数据表：一行表头 + 若干行，列宽按 colW 分；行依次柔入，最后封一条底线 */
export const MiniTable: React.FC<{
  f: number;
  at: number;
  x: number;
  y: number;
  w: number;
  head: string[];
  rows: string[][];
  colW: number[];
  size?: number;
  rowH?: number;
  rule?: boolean;
}> = ({f, at, x, y, w, head, rows, colW, size = 22, rowH = 46, rule = true}) => (
  <>
    <Soft f={f} at={at} dur={16} style={{left: x, top: y, width: w}}>
      <div style={{display: 'flex'}}>
        {head.map((h, i) => (
          <div key={h} style={{width: colW[i], fontFamily: GF.cn, fontSize: size * 0.78, letterSpacing: 3, color: G.ivoryFaint}}>
            {h}
          </div>
        ))}
      </div>
    </Soft>
    <RuleFade f={f} at={at + 4} x={x} y={y + rowH * 0.78} w={w} />
    {rows.map((r, ri) => (
      <Soft key={ri} f={f} at={at + 8 + ri * 6} dur={16} style={{left: x, top: y + rowH * (ri + 1), width: w}}>
        <div style={{display: 'flex', alignItems: 'baseline'}}>
          {r.map((c, ci) => (
            <div
              key={ci}
              style={{
                width: colW[ci],
                fontFamily: ci === 0 ? GF.cn : GF.num,
                fontSize: ci === 0 ? size : size * 1.02,
                letterSpacing: ci === 0 ? 3 : 1,
                color: ci === 0 ? G.ivoryDim : G.ivory,
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </Soft>
    ))}
    {rule ? <RuleFade f={f} at={at + 10} x={x} y={y + rowH * (rows.length + 1)} w={w} /> : null}
  </>
);

/** 脚注：一条小竖线 + 两行小字，压在一页左下 */
export const Note: React.FC<{f: number; at: number; x: number; y: number; w?: number; text: string; out?: number}> = ({f, at, x, y, w = 560, text, out}) => (
  <Soft f={f} at={at} out={out} dur={20} style={{left: x, top: y, width: w}}>
    <div style={{borderLeft: `1px solid ${G.goldLine}`, paddingLeft: 14}}>
      <div style={{fontFamily: GF.cn, fontSize: 18, lineHeight: 1.7, letterSpacing: 1, color: G.ivoryFaint}}>{text}</div>
    </div>
  </Soft>
);

/** 描金框：细金边 + 四角短角标，用来「装」一张文书或一个型号 */
export const Frame: React.FC<{f: number; at: number; x: number; y: number; w: number; h: number; out?: number; color?: string; children?: React.ReactNode}> = ({f, at, x, y, w, h, out, color = G.goldLine, children}) => {
  const v = clamp01((f - at) / 22) * (out === undefined ? 1 : 1 - clamp01((f - out) / 12));
  if (v <= 0) return null;
  const corner = (sx: number, sy: number, tx: string, ty: string) => ({position: 'absolute' as const, [tx]: -1, [ty]: -1, width: 22, height: 22, borderLeft: tx === 'left' ? `1.5px solid ${color}` : undefined, borderRight: tx === 'right' ? `1.5px solid ${color}` : undefined, borderTop: ty === 'top' ? `1.5px solid ${color}` : undefined, borderBottom: ty === 'bottom' ? `1.5px solid ${color}` : undefined});
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, border: `1px solid ${color}`, opacity: v, background: 'rgba(10,8,5,0.28)'}}>
      <div style={corner(0, 0, 'left', 'top')} />
      <div style={corner(0, 0, 'right', 'top')} />
      <div style={corner(0, 0, 'left', 'bottom')} />
      <div style={corner(0, 0, 'right', 'bottom')} />
      {children}
    </div>
  );
};

/** 朱红叉 / 金勾：at 帧起用 10 帧画出来，两道笔画先后落下 */
export const Mark: React.FC<{f: number; at: number; x: number; y: number; s?: number; kind?: 'x' | 'check'; color?: string}> = ({f, at, x, y, s = 46, kind = 'x', color = G.red}) => {
  const p = clamp01((f - at) / 14);
  if (p <= 0) return null;
  const p1 = clamp01(p * 2);
  const p2 = clamp01(p * 2 - 1);
  const a = kind === 'x' ? [0, 0, s, s] : [0, s * 0.52, s * 0.4, s];
  const b = kind === 'x' ? [s, 0, 0, s] : [s * 0.4, s, s, s * 0.14];
  return (
    <svg width={s} height={s} style={{position: 'absolute', left: x, top: y, overflow: 'visible', filter: `drop-shadow(0 0 8px ${color})`}}>
      <line x1={a[0]} y1={a[1]} x2={a[0] + (a[2] - a[0]) * p1} y2={a[1] + (a[3] - a[1]) * p1} stroke={color} strokeWidth={4} strokeLinecap="square" />
      <line x1={b[0]} y1={b[1]} x2={b[0] + (b[2] - b[0]) * p2} y2={b[1] + (b[3] - b[1]) * p2} stroke={color} strokeWidth={4} strokeLinecap="square" />
    </svg>
  );
};

/** 横条：label + 轨道 + 填充（p 为填充进度），用来比「国内 / 海外」「净利 / 研发」这类比例 */
export const HBand: React.FC<{f: number; at: number; x: number; y: number; w: number; p: number; color?: string; dur?: number; dashed?: boolean}> = ({f, at, x, y, w, p, color = G.gold, dur = 30, dashed}) => {
  const v = clamp01((f - at) / dur);
  if (v <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: 15, background: 'rgba(239,230,210,0.05)', border: `1px solid ${dashed ? G.goldFaint : 'rgba(239,230,210,0.12)'}`}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${w * p * v}px`, background: color, opacity: 0.88, boxShadow: `0 0 14px ${color}`}} />
    </div>
  );
};

/**
 * 竖柱一组：柱高按 v/max 归一，从基线长出来，最新一根点高光。
 * 返回绝对定位的一整块，用 x / base 定位。
 */
export const BarsV: React.FC<{
  f: number;
  at: number;
  x: number;
  base: number;
  data: [string, number][];
  max: number;
  bw: number;
  gap: number;
  hMax: number;
  hot?: number;
  labelSize?: number;
  valueSize?: number;
  vals?: string[];
}> = ({f, at, x, base, data, max, bw, gap, hMax, hot, labelSize = 17, valueSize = 0, vals}) => (
  <>
    {data.map(([lab, v], i) => {
      const p = clamp01((f - at - i * 4) / 12);
      const h = (v / max) * hMax * p;
      const on = i === (hot ?? data.length - 1);
      const left = x + i * (bw + gap);
      return (
        <React.Fragment key={lab}>
          <div style={{position: 'absolute', left, top: base - h, width: bw, height: Math.max(0, h), background: `linear-gradient(180deg, ${on ? G.goldBright : G.gold}, ${G.goldDeep})`, opacity: 0.55 + 0.35 * p}} />
          <div style={{position: 'absolute', left, top: base + 10, width: bw, textAlign: 'center', fontFamily: GF.num, fontSize: labelSize, color: on ? G.goldBright : G.ivoryFaint, letterSpacing: 1, opacity: p}}>{lab}</div>
          {valueSize > 0 && vals?.[i] ? (
            <div style={{position: 'absolute', left: left - 20, top: base - h - valueSize - 12, width: bw + 40, textAlign: 'center', fontFamily: GF.num, fontSize: valueSize, color: on ? G.goldBright : G.ivoryDim, opacity: p, letterSpacing: 0}}>{vals[i]}</div>
          ) : null}
        </React.Fragment>
      );
    })}
  </>
);

/** 一条柔和的横向刻度尺（时间轴骨架）：p 为点亮进度 */
export const Ruler: React.FC<{f: number; at: number; x: number; y: number; w: number; ticks: string[]; p?: number; dur?: number; size?: number}> = ({f, at, x, y, w, ticks, p = 1, dur = 40, size = 16}) => {
  const v = clamp01((f - at) / dur);
  if (v <= 0) return null;
  const n = ticks.length - 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: `${v * p * 100}%`, height: 1, background: `linear-gradient(90deg, ${G.gold} 0%, ${G.goldLine} 88%, rgba(214,180,106,0) 100%)`}} />
      {ticks.map((tk, i) => {
        const on = clamp01(v * n - i + 1);
        return (
          <div key={tk} style={{position: 'absolute', left: (i / n) * w - 3, top: -3, opacity: on}}>
            <div style={{width: 1, height: 7, background: G.goldLine}} />
            <div style={{position: 'absolute', left: -26, top: 12, width: 56, textAlign: 'center', fontFamily: GF.num, fontSize: size, color: G.ivoryFaint, letterSpacing: 1}}>{tk}</div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * 字幕：**直接读 cues**，不再手写文案。
 * 每句按 cue.start 逐字柔入，句尾留 0.22 秒后再淡出；换句时新旧两句不重叠。
 * 数字、年份、金额用金色（口播里观众最需要「看懂」的就是这些数）。
 *
 * skip 里的句子不出字幕——用在「画面已经把这句话排成大引文」的页上：
 * 同一句话在大字和字幕上各来一遍，读者的眼睛会被扯两次。
 */
const SEG = /(\d[\d,]*(?:\.\d+)?\s*(?:万亿|亿|万|辆|%|台|元|项|页|位|家|年|月|日|天|点|分|:)?)/g;

const segs = (text: string): {s: string; hi: boolean}[] => {
  const out: {s: string; hi: boolean}[] = [];
  for (const part of text.split(SEG)) {
    if (!part) continue;
    const hi = /^\d/.test(part);
    if (hi) out.push({s: part, hi: true});
    else for (const ch of part) out.push({s: ch, hi: false});
  }
  return out;
};

export const GSub: React.FC<{f: number; cues: Cue[]; y?: number; fps?: number; skip?: number[]}> = ({f, cues, y = 952, fps = 30, skip = []}) => {
  const nodes: React.ReactNode[] = [];
  for (let k = 0; k < cues.length; k++) {
    const c = cues[k];
    if (skip.includes(c.i)) continue;
    const next = cues[k + 1];
    const inAt = Math.round(c.start * fps);
    // 句尾只多停 0.22 秒，且**必须在下一句开口前淡完**——否则两句会叠成一团残影
    const outAt = Math.round(Math.min(c.end + 0.22, next ? next.start - 0.03 : Infinity) * fps);
    if (f < inAt - 1 || f > outAt + 8) continue;
    const len = [...c.text].length;
    const per = Math.min(1.25, Math.max(0.42, ((c.end - c.start) * fps * 0.6) / Math.max(1, len)));
    const size = len <= 15 ? 46 : len <= 21 ? 42 : len <= 27 ? 38 : 34;
    const fadeOut = 1 - clamp01((f - outAt) / 7);
    const parts = segs(c.text);
    nodes.push(
      <div
        key={c.i}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: y,
          display: 'flex',
          justifyContent: 'center',
          opacity: fadeOut,
          pointerEvents: 'none',
        }}
      >
        <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: size, letterSpacing: 2, lineHeight: 1.3, textAlign: 'center', textShadow: '0 2px 14px rgba(0,0,0,0.95)', maxWidth: 1620}}>
          {parts.map((p, i) => {
            const v = clamp01((f - inAt - i * per) / 9);
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: v,
                  filter: v < 1 ? `blur(${(1 - v) * 5}px)` : undefined,
                  transform: `translateY(${(1 - v) * 7}px)`,
                  ...(p.hi ? goldTextLight(0.28) : {color: G.ivory}),
                  whiteSpace: p.s === ' ' ? 'pre' : undefined,
                }}
              >
                {p.s}
              </span>
            );
          })}
        </div>
      </div>,
    );
  }
  return <>{nodes}</>;
};
