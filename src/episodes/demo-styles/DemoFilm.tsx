import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {rand} from '../../library/anim';
import {VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {capAt, capNorm, DURATION, FILM_SUBS, gx, NODES, xg, type NodeItem} from './data';
import {Grain, Hud, Subs, YearBox} from './ui';

const W = 1920;
const H = 1080;

const BAND_T = 196; // 片带上沿
const BAND_B = 886; // 片带下沿
const CELL_T = 306;
const CELL_B = 792;
const CELL_W = 396;

const WORLD_X0 = -300;
const WORLD_X1 = 7600;
const WORLD_W = WORLD_X1 - WORLD_X0 + 400;

/* ============ 齿孔 ============ */

const PERFS = (() => {
  const out: React.ReactNode[] = [];
  for (let x = WORLD_X0; x < WORLD_X1; x += 62) {
    out.push(<rect key={x} x={x + 18} y={BAND_T + 12} width={27} height={34} rx={4} fill="#070a0d" />);
    out.push(<rect key={`b${x}`} x={x + 18} y={BAND_B - 46} width={27} height={34} rx={4} fill="#070a0d" />);
  }
  return out;
})();

/** 片边码：上沿一溜小字 */
const EDGE_CODE = (() => {
  const out: React.ReactNode[] = [];
  for (let x = WORLD_X0 + 40; x < WORLD_X1; x += 240) {
    out.push(
      <text key={x} x={x} y={BAND_T + 84} fill="rgba(28,30,32,0.4)" fontSize={13} fontFamily="monospace" letterSpacing={2}>
        {`5219 ▸ ${String(Math.abs(Math.round(x)) % 100).padStart(2, '0')}A`}
      </text>,
    );
  }
  return out;
})();

/** 划痕：贯穿片带的细线，位置固定 */
const SCRATCHES = [640, 1480, 2260, 3020, 4180, 5030, 6320, 6980].map((x, i) => ({
  x: x + (rand(i * 3.7) - 0.5) * 90,
  w: 0.8 + rand(i * 5.1) * 1.4,
  o: 0.05 + rand(i * 2.3) * 0.07,
}));

/* ============ 声轨：市值就是波形的胖瘦 ============ */

const SOUND_MID = 842;
const soundHalf = (x: number) => 6 + 19 * capNorm(capAt(xg(x)));

const SOUND = (() => {
  const up: string[] = [];
  const dn: string[] = [];
  for (let x = WORLD_X0; x < WORLD_X1; x += 6) {
    up.push(`${x.toFixed(0)} ${(SOUND_MID - soundHalf(x)).toFixed(1)}`);
    dn.push(`${x.toFixed(0)} ${(SOUND_MID + soundHalf(x)).toFixed(1)}`);
  }
  return `M${up.join(' L')} L${dn.reverse().join(' L')} Z`;
})();

const SOUND_LINE = (() => {
  const up: string[] = [];
  for (let x = WORLD_X0; x < WORLD_X1; x += 6) up.push(`${x.toFixed(0)} ${(SOUND_MID - soundHalf(x)).toFixed(1)}`);
  return `M${up.join(' L')}`;
})();

/* ============ 一格 ============ */

const Frame: React.FC<{n: NodeItem; prev: number; idx: number; camX: number; camZ: number}> = ({n, prev, idx, camX, camZ}) => {
  const cx = gx(n.year);
  const dx = Math.abs(cx - camX);
  const near = 1010 / Math.max(camZ, 0.05);
  const fade = 340 / Math.max(camZ, 0.05);
  const show = 1 - Math.max(0, Math.min(1, (dx - near) / fade));
  if (show <= 0.02) return null;
  const h = CELL_B - CELL_T;

  // 这一格曝光的是「走到这一年为止的那几年」，所以区间取 [上一个节点, 本年]
  const vals = Array.from({length: 26}, (_, k) => capAt(prev + (n.year - prev) * (k / 25)));
  const lo = Math.log10(Math.min(...vals));
  const hi = Math.log10(Math.max(...vals));
  // 混一半绝对高度（全局对数）、一半本格形状：既看得出在长高，也看得出这一段自己的起伏
  const local = (v: number) => (hi - lo < 0.001 ? 0.5 : (Math.log10(v) - lo) / (hi - lo));
  const norm = (v: number) => 0.34 * capNorm(v) + 0.66 * local(v);
  const sw = CELL_W - 64;
  const sh = 246;
  const line = vals.map((v, k) => `${((k / 25) * sw).toFixed(1)} ${(sh - 18 - norm(v) * (sh - 40)).toFixed(1)}`);
  const area = `M0 ${sh} L${line.join(' L')} L${sw} ${sh} Z`;

  return (
    <div style={{position: 'absolute', left: cx - CELL_W / 2, top: CELL_T, width: CELL_W, height: h, opacity: show}}>
      <div style={{position: 'absolute', inset: 0, background: '#0e1318', boxShadow: 'inset 0 0 0 2px #232b32, 0 8px 22px rgba(0,0,0,0.4)'}} />
      <div style={{position: 'absolute', left: 22, top: 16, width: CELL_W - 44, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: VF.num, fontSize: 46, color: '#c9503f', lineHeight: 1, letterSpacing: 1}}>{Math.floor(n.year)}</div>
        <div style={{fontFamily: 'monospace', fontSize: 13, color: 'rgba(226,220,208,0.3)'}}>{`${String(idx + 1).padStart(2, '0')}A`}</div>
      </div>
      <div style={{position: 'absolute', left: 22, top: 66, width: CELL_W - 36, fontFamily: VF.heavy, fontSize: 25, color: '#eeeadf', letterSpacing: 1, whiteSpace: 'nowrap'}}>{n.name}</div>
      <div style={{position: 'absolute', left: 22, top: 104, fontFamily: VF.heavy, fontSize: 14, color: '#79838c'}}>{n.note}</div>

      <svg width={sw} height={sh} style={{position: 'absolute', left: 32, top: 148}}>
        <defs>
          <linearGradient id={`fa${idx}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6f93a8" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#6f93a8" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#fa${idx})`} />
        <path d={`M${line.join(' L')}`} stroke="#8fb4c8" strokeWidth={2.6} fill="none" strokeLinejoin="round" />
        <circle cx={0} cy={Number(line[0].split(' ')[1])} r={3.2} fill="#586b78" />
        <circle cx={sw} cy={Number(line[25].split(' ')[1])} r={3.6} fill="#c9503f" />
      </svg>

      <div style={{position: 'absolute', left: 22, bottom: 16, fontFamily: VF.heavy, fontSize: 15, color: 'rgba(226,220,208,0.52)'}}>
        <span style={{color: 'rgba(226,220,208,0.26)'}}>市值 </span>
        {n.cap}
      </div>
    </div>
  );
};


/** 两格之间拉得开的地方，补一个不显眼的过渡帧，片带才不像断掉的 */
const GapFrame: React.FC<{a: number; b: number; camX: number; camZ: number}> = ({a, b, camX, camZ}) => {
  if (b - a < 660) return null;
  const cx = (a + b) / 2;
  const near = 1010 / Math.max(camZ, 0.05);
  const fade = 340 / Math.max(camZ, 0.05);
  const show = 1 - Math.max(0, Math.min(1, (Math.abs(cx - camX) - near) / fade));
  if (show <= 0.02) return null;
  return (
    <div style={{position: 'absolute', left: cx - 88, top: CELL_T + 34, width: 176, height: CELL_B - CELL_T - 68, opacity: show * 0.14}}>
      <div style={{position: 'absolute', inset: 0, background: '#161c22', boxShadow: 'inset 0 0 0 1px #2b343c'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: '46%', textAlign: 'center', fontFamily: VF.num, fontSize: 22, color: 'rgba(226,220,208,0.35)'}}>· · ·</div>
    </div>
  );
};

/* ============ 相机 ============ */

const CAM: CamKey[] = [
  {f: 0, x: 520, y: 540, z: 1.02},
  {f: 54, x: 660, y: 540, z: 1.0, ease: 'sine', dur: 54},
  {f: 100, x: 1000, y: 540, z: 1.0, ease: 'tail', dur: 38},
  {f: 152, x: 1660, y: 540, z: 1.0, ease: 'tail', dur: 34},
  {f: 198, x: 1930, y: 538, z: 1.03, ease: 'sine', dur: 30},
  {f: 252, x: 3148, y: 540, z: 0.9, ease: 'sine', dur: 50},
  {f: 302, x: 4805, y: 540, z: 1.0, ease: 'tail', dur: 42},
  {f: 328, x: 4858, y: 542, z: 1.05, ease: 'sine', dur: 22},
  {f: 374, x: 5215, y: 540, z: 1.02, ease: 'sine', dur: 44},
  {f: 412, x: 5552, y: 540, z: 1.0, ease: 'sine', dur: 34},
  {f: 436, x: 5592, y: 542, z: 1.03, ease: 'sine', dur: 20},
  {f: 472, x: 5958, y: 540, z: 1.05, ease: 'sine', dur: 34},
  {f: 500, x: 6745, y: 540, z: 1.0, ease: 'tail', dur: 28},
  {f: 540, x: 3300, y: 556, z: 0.3, ease: 'sine', dur: 54},
];

const YEAR_KEYS: [number, number][] = [
  [0, 1998.9],
  [54, 1998.9],
  [100, 2001.6],
  [152, 2004.5],
  [252, 2010.85],
  [302, 2017.9],
  [374, 2019.8],
  [412, 2021.07],
  [472, 2022.8],
  [500, 2026.15],
  [540, 2026.8],
];

const yearAt = (f: number) => {
  for (let i = 1; i < YEAR_KEYS.length; i++) {
    if (f <= YEAR_KEYS[i][0]) {
      const [f0, y0] = YEAR_KEYS[i - 1];
      const [f1, y1] = YEAR_KEYS[i];
      return y0 + (y1 - y0) * ((f - f0) / (f1 - f0 || 1));
    }
  }
  return YEAR_KEYS[YEAR_KEYS.length - 1][1];
};

/** 断片那条缝：跟着相机走，按屏幕坐标算 */
const CRACK_X = 5748;
const Crack: React.FC<{camX: number; camZ: number}> = ({camX, camZ}) => {
  const sx = (CRACK_X - camX) * camZ + 960;
  if (sx < -240 || sx > 2160) return null;
  const w = Math.max(4, 9 * camZ);
  const top = (BAND_T - 540) * camZ + 540;
  const bot = (BAND_B - 540) * camZ + 540;
  return (
    <div style={{position: 'absolute', left: sx - w / 2, top, width: w, height: bot - top}}>
      <div style={{position: 'absolute', inset: 0, background: '#05070a'}} />
      <div style={{position: 'absolute', left: -1.5, top: 0, bottom: 0, width: 1.5, background: 'rgba(255,255,255,0.45)'}} />
      <div style={{position: 'absolute', right: -1.5, top: 0, bottom: 0, width: 1.5, background: 'rgba(255,255,255,0.3)'}} />
    </div>
  );
};

/* ============ 整片 ============ */

export const DemoFilm: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(f, CAM);
  const year = yearAt(f);

  // 走带：机械抓片的手感，每 6 帧轻顿一下
  const step = Math.floor(f / 6);
  const jitterY = (rand(step * 1.7) - 0.5) * 1.6;
  const flick = 0.02 + 0.02 * Math.abs(Math.sin(f * 0.9));

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#080a0c'}}>
      <AbsoluteFill style={{background: 'linear-gradient(#05070a 0%, #0a0e12 30%, #0b1014 72%, #050708 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(1500px 720px at 50% 44%, rgba(78,96,114,0.2), transparent 72%)'}} />

      <World cam={{...cam, y: cam.y + jitterY}} w={W} h={H}>
        <svg width={WORLD_W} height={1080} viewBox={`${WORLD_X0} 0 ${WORLD_W} 1080`} style={{position: 'absolute', left: WORLD_X0, top: 0}}>
          <defs>
            <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bdb49f" />
              <stop offset="7%" stopColor="#ded4bf" />
              <stop offset="50%" stopColor="#e5dbc6" />
              <stop offset="93%" stopColor="#d6ccb6" />
              <stop offset="100%" stopColor="#b3aa95" />
            </linearGradient>
          </defs>

          {/* 片带 */}
          <rect x={WORLD_X0} y={BAND_T} width={WORLD_W} height={BAND_B - BAND_T} fill="url(#band)" />
          <rect x={WORLD_X0} y={BAND_T} width={WORLD_W} height={14} fill="rgba(60,54,44,0.26)" />
          <rect x={WORLD_X0} y={BAND_B - 14} width={WORLD_W} height={14} fill="rgba(60,54,44,0.26)" />

          {PERFS}

          {/* 声轨 */}
          <rect x={WORLD_X0} y={820} width={WORLD_W} height={44} fill="rgba(210,201,184,0.75)" />
          <path d={SOUND} fill="#141a1f" opacity={0.92} />
          <path d={SOUND_LINE} stroke="#3c464e" strokeWidth={1.1} fill="none" opacity={0.65} />

          {EDGE_CODE}

          {/* 片头 / 片尾 */}
          <rect x={120} y={BAND_T} width={5} height={BAND_B - BAND_T} fill="#b8453c" opacity={0.5} />
          <text x={140} y={BAND_T + 90} fill="rgba(28,30,32,0.45)" fontSize={13} fontFamily="monospace">
            START · 1998
          </text>
          <rect x={7252} y={BAND_T} width={5} height={BAND_B - BAND_T} fill="#b8453c" opacity={0.5} />
          <text x={7272} y={BAND_T + 90} fill="rgba(28,30,32,0.45)" fontSize={13} fontFamily="monospace">
            END · 2026
          </text>

          {/* 划痕 */}
          {SCRATCHES.map((s, i) => (
            <rect key={i} x={s.x} y={BAND_T} width={s.w} height={BAND_B - BAND_T} fill="#ffffff" opacity={s.o} />
          ))}
        </svg>

        {NODES.map((n, i) => (
          <GapFrame key={`g${n.year}`} a={gx(n.year)} b={gx(NODES[i + 1]?.year ?? 2027.2)} camX={cam.x} camZ={cam.z} />
        ))}
        {NODES.map((n, i) => (
          <Frame key={n.year} n={n} prev={NODES[i - 1]?.year ?? 1998.0} idx={i} camX={cam.x} camZ={cam.z} />
        ))}
      </World>

      <Crack camX={cam.x} camZ={cam.z} />

      {/* 放映光斑 + 闪烁 */}
      <AbsoluteFill style={{background: 'radial-gradient(1100px 620px at 50% 44%, rgba(255,236,196,0.07), rgba(0,0,0,0) 70%)'}} />
      <AbsoluteFill style={{background: '#fff', opacity: flick * 0.3}} />
      <AbsoluteFill style={{boxShadow: 'inset 0 0 280px rgba(0,0,0,0.88)'}} />
      <Grain opacity={0.16} seed={4} freq={0.75} />

      <Hud title="胶片走带" tag="风格样片 02" sub="声轨的胖瘦 = 市值高低" accent="#d3705a" paper="#f2ece0" />
      <YearBox year={year} from={1998} to={2026} label={year < 2018.2 ? '曝光中' : year < 2021.2 ? '划片' : '断片'} accent="#d3705a" ink="#11161a" paper="#f2ece0" />
      <Subs subs={FILM_SUBS} f={f} accent="#e08a72" />

      <Audio src={staticFile('audio/ep56-tencent-history/bgm.wav')} volume={0.45} />
      <Sequence from={430} durationInFrames={36} layout="none">
        <Audio src={staticFile('audio/sfx/error.wav')} volume={0.3} />
      </Sequence>
      <Sequence from={20} durationInFrames={28} layout="none">
        <Audio src={staticFile('audio/sfx/paper.wav')} volume={0.35} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const DEMO_DURATION = DURATION;
