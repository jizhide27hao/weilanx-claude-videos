import React from 'react';
import type {Sub} from './data';
import {VF} from '../../library/vox/theme';

/** 左上角：风格名 + 一行小注 */
export const Hud: React.FC<{title: string; tag: string; sub?: string; accent: string; paper: string}> = ({title, tag, sub, accent, paper}) => (
  <div style={{position: 'absolute', left: 56, top: 42}}>
    <div style={{fontFamily: VF.heavy, fontSize: 16, letterSpacing: 7, color: accent, opacity: 0.85}}>{tag}</div>
    <div style={{fontFamily: VF.heavy, fontSize: 36, color: paper, letterSpacing: 4, marginTop: 4}}>{title}</div>
    {sub && <div style={{fontFamily: VF.heavy, fontSize: 15, letterSpacing: 2, color: 'rgba(255,255,255,0.34)', marginTop: 6}}>{sub}</div>}
  </div>
);

/** 右上角年份计数器 */
export const YearBox: React.FC<{year: number; from: number; to: number; label: string; accent: string; ink: string; paper: string}> = ({year, from, to, label, accent, ink, paper}) => {
  const y = Math.round(Math.max(from, Math.min(to, year)));
  const p = Math.max(0, Math.min(1, (y - from) / (to - from)));
  return (
    <div style={{position: 'absolute', right: 52, top: 40, background: ink, padding: '10px 20px 14px', width: 336, boxShadow: '0 10px 30px rgba(0,0,0,0.45)'}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: VF.num, fontSize: 72, color: paper, lineHeight: 1}}>{y}</div>
        <div style={{fontFamily: VF.heavy, fontSize: 20, color: accent, whiteSpace: 'nowrap', letterSpacing: 1}}>{label}</div>
      </div>
      <div style={{position: 'relative', height: 12, marginTop: 12}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 5, height: 2, background: 'rgba(255,255,255,0.22)'}} />
        <div style={{position: 'absolute', left: 0, width: `${p * 100}%`, top: 4, height: 4, background: accent}} />
        <div style={{position: 'absolute', left: `calc(${p * 100}% - 6px)`, top: 0, width: 12, height: 12, borderRadius: 6, background: accent}} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: VF.num, fontSize: 16, color: 'rgba(255,255,255,0.42)', marginTop: 5}}>
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  );
};

/** 字幕：一条深色底，关键词染高亮色 */
export const Subs: React.FC<{subs: Sub[]; f: number; accent: string; y?: number}> = ({subs, f, accent, y = 964}) => {
  const c = subs.find((s) => f >= s.from && f < s.to);
  if (!c) return null;
  const idx = c.hit ? c.text.indexOf(c.hit) : -1;
  const parts =
    idx >= 0 && c.hit ? (
      <>
        {c.text.slice(0, idx)}
        <span style={{color: accent}}>{c.hit}</span>
        {c.text.slice(idx + c.hit.length)}
      </>
    ) : (
      c.text
    );
  return (
    <div style={{position: 'absolute', left: 0, width: 1920, top: y, display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: VF.heavy, fontWeight: 800, fontSize: 46, lineHeight: 1.3, color: '#f2efe8', background: 'rgba(10,12,14,0.82)', padding: '10px 30px', borderRadius: 2, whiteSpace: 'nowrap'}}>{parts}</div>
    </div>
  );
};

/** 全屏颗粒（胶片/金属都吃这套），静态 seed，不逐帧抖 */
export const Grain: React.FC<{opacity?: number; seed?: number; freq?: number}> = ({opacity = 0.22, seed = 5, freq = 0.85}) => (
  <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity}}>
    <filter id={`gr${seed}`}>
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={3} seed={seed} />
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
    </filter>
    <rect width={1920} height={1080} filter={`url(#gr${seed})`} />
  </svg>
);
