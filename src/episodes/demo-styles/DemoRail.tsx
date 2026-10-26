import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {rand} from '../../library/anim';
import {VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {DURATION, gx, NODES, offsetRail, RAIL_SUBS, toPath, TUNNELS, WORLD_W, yAt, type NodeItem} from './data';
import {Grain, Hud, Subs, YearBox} from './ui';

const W = 1920;
const H = 1080;
const GAUGE = 66; // 半个轨距

/* ============ 静态几何：只在模块加载时算一次 ============ */

/** 石砟：轨面下方一片碎斜线 */
const BALLAST = (() => {
  let d = '';
  for (let x = 0; x < WORLD_W; x += 7) {
    const y = yAt(x) + 10 + rand(x * 0.37) * 74;
    const a = (rand(x * 1.7) - 0.5) * 1.3;
    const len = 9 + rand(x * 2.9) * 12;
    d += `M${x.toFixed(1)} ${y.toFixed(1)}l${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}`;
  }
  return d;
})();

/** 枕木：沿轨道法线摆，yOff 用来错出阴影 */
const sleepers = (yOff: number, half: number) => {
  let d = '';
  for (let x = 24; x < WORLD_W; x += 56) {
    const y = yAt(x) + yOff;
    const dy = (yAt(x + 5) - yAt(x - 5)) / 10;
    const L = Math.hypot(1, dy);
    const nx = -dy / L;
    const ny = 1 / L;
    d += `M${(x - nx * half).toFixed(1)} ${(y - ny * half).toFixed(1)}L${(x + nx * half).toFixed(1)} ${(y + ny * half).toFixed(1)}`;
  }
  return d;
};
const SLEEPER = sleepers(0, 94);
const SLEEPER_SHADOW = sleepers(7, 94);

const RAIL_L = toPath(offsetRail(-GAUGE));
const RAIL_R = toPath(offsetRail(GAUGE));

/** 山脊：跟着轨道往上抬 245，再叠两层起伏 */
const ridgeAt = (x: number) => yAt(x) - 272 - 52 * Math.sin(x * 0.0021 + 0.4) - 16 * Math.sin(x * 0.0058 + 1.7);

const baseAt = (x: number) => yAt(x) + 430;

const TUNNELS_G = TUNNELS.map((t) => {
  const x1 = gx(t.from);
  const x2 = gx(t.to);
  const top: string[] = [];
  for (let x = x1 - 250; x <= x2 + 250; x += 18) top.push(`${x.toFixed(0)} ${ridgeAt(x).toFixed(0)}`);
  // 左端斜坡：从地面斜上山脊，不做垂直切面
  const leftWall = `M${x1 - 340} ${baseAt(x1 - 340).toFixed(0)} L${x1 - 300} ${baseAt(x1 - 300).toFixed(0)} L${x1 - 250} ${ridgeAt(x1 - 250).toFixed(0)} `;
  const topLine = top.map((p) => `L${p}`).join(' ');
  const foot: string[] = [];
  for (let x = x2 + 340; x >= x1 - 340; x -= 18) foot.push(`L${x.toFixed(0)} ${baseAt(x).toFixed(0)}`);
  const rightWall = ` L${x2 + 250} ${ridgeAt(x2 + 250).toFixed(0)} L${x2 + 300} ${baseAt(x2 + 300).toFixed(0)} L${x2 + 340} ${baseAt(x2 + 340).toFixed(0)}`;
  const portal = (cx: number) => {
    const y = yAt(cx);
    return `M${cx - 112} ${baseAt(cx).toFixed(0)} L${cx - 112} ${(y - 96).toFixed(0)} A112 112 0 0 1 ${cx + 112} ${(y - 96).toFixed(0)} L${cx + 112} ${baseAt(cx).toFixed(0)} Z`;
  };
  const portals = [portal(x1), portal(x2)];
  // 岩层线：几条跟着轨道走的偏移曲线，只在这座山里
  const strata = [-40, 50, 140, 220].map((d) => toPath(offsetRail(-272 - d, x1 - 170, x2 + 170)));
  return {d: `${leftWall}${topLine}${rightWall} ${foot.join(' ')} Z ${portals.join(' ')}`, x1, x2, strata, portals};
});

/** 电线杆：每 430px 一根，隧道里不放 */
const POLES = (() => {
  const out: number[] = [];
  for (let x = 160; x < WORLD_W; x += 430) {
    if (TUNNELS.some((t) => x > gx(t.from) - 80 && x < gx(t.to) + 80)) continue;
    out.push(x);
  }
  return out;
})();

const poleTop = (x: number) => yAt(x) - Math.min(268, yAt(x) - 60);

/* ============ 站牌 ============ */

const Station: React.FC<{n: NodeItem; idx: number; camX: number}> = ({n, idx, camX}) => {
  const cx = gx(n.year);
  const dx = Math.abs(cx - camX);
  const show = 1 - Math.max(0, Math.min(1, (dx - 560) / 260));
  if (show <= 0.02) return null;
  const up = idx % 2 === 0;
  const y = n.y;
  const poleLen = 186;
  const poleTopY = up ? y - poleLen : y;
  const boardH = 88;
  const boardW = 286;
  const bTop = up ? poleTopY - boardH : poleTopY + poleLen;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, opacity: show}}>
      <div style={{position: 'absolute', left: cx - 2.5, top: poleTopY, width: 5, height: poleLen, background: 'linear-gradient(90deg,#2c3338,#8a949b 40%,#22282d)'}} />
      <div
        style={{
          position: 'absolute',
          left: cx - boardW / 2,
          top: bTop,
          width: boardW,
          height: boardH,
          background: '#eae6dc',
          boxShadow: '0 18px 34px rgba(0,0,0,0.66)',
          borderRadius: 2,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <div style={{width: 7, background: '#b8453c'}} />
        <div style={{padding: '10px 13px', flex: 1}}>
          <div style={{fontFamily: VF.num, fontSize: 29, color: '#b8453c', lineHeight: 1, letterSpacing: 1}}>{Math.floor(n.year)}</div>
          <div style={{fontFamily: VF.heavy, fontSize: 24, color: '#15181b', lineHeight: 1.1, marginTop: 3, whiteSpace: 'nowrap'}}>{n.name}</div>
          <div style={{fontFamily: VF.heavy, fontSize: 13, color: '#6d7379', marginTop: 3, whiteSpace: 'nowrap'}}>{n.note}</div>
        </div>
      </div>
    </div>
  );
};

const Mile: React.FC<{year: number}> = ({year}) => {
  const x = gx(year);
  return (
    <div style={{position: 'absolute', left: x - 26, top: yAt(x) + 82, width: 52}}>
      <div style={{height: 22, width: 2, background: '#394146', margin: '0 auto'}} />
      <div style={{fontFamily: VF.num, fontSize: 15, color: '#79838a', textAlign: 'center', letterSpacing: 1}}>{year}</div>
    </div>
  );
};

/* ============ 相机 ============ */

const CAM: CamKey[] = [
  {f: 0, x: 430, y: 812, z: 1.42},
  {f: 54, x: 560, y: 796, z: 1.28, ease: 'sine', dur: 54},
  {f: 100, x: 1000, y: 766, z: 1.18, ease: 'tail', dur: 36},
  {f: 152, x: 1660, y: 686, z: 1.16, ease: 'tail', dur: 34},
  {f: 198, x: 1930, y: 646, z: 1.12, ease: 'sine', dur: 30},
  {f: 252, x: 3148, y: 552, z: 1.02, ease: 'sine', dur: 50},
  {f: 302, x: 4805, y: 372, z: 1.10, ease: 'tail', dur: 42},
  {f: 328, x: 4850, y: 380, z: 1.18, ease: 'sine', dur: 22},
  {f: 374, x: 5215, y: 404, z: 1.24, ease: 'sine', dur: 44},
  {f: 412, x: 5550, y: 336, z: 1.12, ease: 'sine', dur: 34},
  {f: 436, x: 5590, y: 330, z: 1.14, ease: 'sine', dur: 20},
  {f: 472, x: 5960, y: 496, z: 1.26, ease: 'sine', dur: 34},
  {f: 500, x: 6745, y: 408, z: 1.10, ease: 'tail', dur: 28},
  {f: 540, x: 3300, y: 600, z: 0.285, ease: 'sine', dur: 54},
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
  if (f <= YEAR_KEYS[0][0]) return YEAR_KEYS[0][1];
  for (let i = 1; i < YEAR_KEYS.length; i++) {
    if (f <= YEAR_KEYS[i][0]) {
      const [f0, y0] = YEAR_KEYS[i - 1];
      const [f1, y1] = YEAR_KEYS[i];
      const t = (f - f0) / (f1 - f0 || 1);
      return y0 + (y1 - y0) * t;
    }
  }
  return YEAR_KEYS[YEAR_KEYS.length - 1][1];
};

/** 相机在隧道里的深度 0..1 */
const darkAt = (x: number) => {
  let d = 0;
  for (const t of TUNNELS) {
    const a = gx(t.from) + 60;
    const b = gx(t.to) - 60;
    if (x <= a - 190 || x >= b + 190) continue;
    const v = Math.min((x - (a - 190)) / 190, (b + 190 - x) / 190);
    d = Math.max(d, Math.max(0, Math.min(1, v)));
  }
  return d;
};

/* ============ 整片 ============ */

export const DemoRail: React.FC = () => {
  const f = useCurrentFrame();
  const cam = camAt(f, CAM);
  const year = yearAt(f);
  const dark = darkAt(cam.x);

  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#06080b'}}>
      {/* 天与地：远景不动，轨道动，自然出视差 */}
      <AbsoluteFill style={{background: 'linear-gradient(#05070a 0%, #080c10 26%, #101820 52%, #0a0f13 78%, #050708 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(1600px 520px at 50% 82%, rgba(104,138,162,0.17), transparent 74%)'}} />

      <World cam={cam} w={W} h={H}>
        <svg width={WORLD_W} height={1240} style={{position: 'absolute', left: 0, top: 0}}>
          <defs>
            <linearGradient id="rock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2f3a44" />
              <stop offset="42%" stopColor="#1b232a" />
              <stop offset="100%" stopColor="#090d10" />
            </linearGradient>
          </defs>

          {/* 路基：石砟 */}
          <path d={BALLAST} stroke="#2b333a" strokeWidth={3.6} fill="none" strokeLinecap="round" opacity={0.95} />
          <path d={BALLAST} stroke="#49545c" strokeWidth={1.2} fill="none" strokeLinecap="round" opacity={0.42} />

          {/* 枕木 */}
          <path d={SLEEPER_SHADOW} stroke="#07090b" strokeWidth={13} fill="none" strokeLinecap="round" opacity={0.8} />
          <path d={SLEEPER} stroke="#2b2620" strokeWidth={11} fill="none" strokeLinecap="round" />
          <path d={SLEEPER} stroke="#443b30" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.55} />

          {/* 两条钢轨，每条五层 */}
          {[RAIL_L, RAIL_R].map((d, i) => (
            <g key={i}>
              <path d={d} stroke="#030507" strokeWidth={16} fill="none" opacity={0.7} transform="translate(3,8)" strokeLinecap="round" />
              <path d={d} stroke="#5a636a" strokeWidth={10} fill="none" strokeLinecap="round" />
              <path d={d} stroke="#333c43" strokeWidth={3} fill="none" strokeLinecap="round" transform="translate(0,3.5)" />
              <path d={d} stroke="#cad4db" strokeWidth={3} fill="none" strokeLinecap="round" transform="translate(0,-3)" />
              <path d={d} stroke="#f2f8fb" strokeWidth={1} fill="none" strokeLinecap="round" opacity={0.6} transform="translate(0,-4.6)" />
            </g>
          ))}

          {/* 隧道山体 */}
          {TUNNELS_G.map((t, i) => (
            <g key={`t${i}`}>
              <path d={t.d} fill="url(#rock)" fillRule="evenodd" />
              {t.strata.map((s, j) => (
                <path key={j} d={s} stroke="#5b6b78" strokeWidth={1.6} fill="none" opacity={0.3} />
              ))}
              {t.portals.map((pd, j) => (
                <g key={`p${j}`}>
                  <path d={pd} fill="#040609" opacity={0.84} />
                  <path d={pd} fill="none" stroke="#9db2c2" strokeWidth={11} opacity={0.07} />
                  <path d={pd} fill="none" stroke="#c2d2de" strokeWidth={2.6} opacity={0.22} />
                </g>
              ))}
              <path d={t.d} fill="none" stroke="#56636e" strokeWidth={2.6} fillRule="evenodd" opacity={0.85} />
            </g>
          ))}

          {/* 电线杆与电线 */}
          {POLES.map((x, i) => {
            const ty = poleTop(x);
            const gy = yAt(x);
            return (
              <g key={i} opacity={0.9}>
                <line x1={x} y1={ty} x2={x} y2={gy + 6} stroke="#232a30" strokeWidth={6} />
                <line x1={x} y1={ty} x2={x} y2={gy + 6} stroke="#39434a" strokeWidth={1.6} />
                <line x1={x - 46} y1={ty + 16} x2={x + 46} y2={ty + 16} stroke="#2a3138" strokeWidth={4} />
                <line x1={x - 30} y1={ty + 40} x2={x + 30} y2={ty + 40} stroke="#2a3138" strokeWidth={3.4} />
              </g>
            );
          })}
          {POLES.slice(0, -1).map((x, i) => {
            const nx = POLES[i + 1];
            if (nx - x > 800) return null;
            const y1 = poleTop(x) + 16;
            const y2 = poleTop(nx) + 16;
            const mx = (x + nx) / 2;
            return (
              <g key={`w${i}`}>
                <path d={`M${x} ${y1} Q${mx} ${(y1 + y2) / 2 + 26} ${nx} ${y2}`} stroke="#3d474e" strokeWidth={1.3} fill="none" opacity={0.5} />
                <path d={`M${x} ${y1 - 24} Q${mx} ${(y1 + y2) / 2 + 4} ${nx} ${y2 - 24}`} stroke="#3d474e" strokeWidth={1.1} fill="none" opacity={0.42} />
              </g>
            );
          })}
        </svg>

        {NODES.map((n, i) => (
          <Station key={n.year} n={n} idx={i} camX={cam.x} />
        ))}
        {[2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
          <Mile key={y} year={y} />
        ))}
      </World>

      {/* 进洞：整屏压暗 */}
      {dark > 0.01 && <AbsoluteFill style={{background: '#000', opacity: dark * 0.2}} />}
      {dark > 0.01 && <AbsoluteFill style={{background: `radial-gradient(900px 560px at 50% 52%, rgba(0,0,0,0) 0%, rgba(0,0,0,${dark * 0.32}) 82%)`, opacity: dark}} />}

      <AbsoluteFill style={{boxShadow: 'inset 0 0 240px rgba(0,0,0,0.8)'}} />
      <Grain opacity={0.1} seed={9} freq={0.9} />

      <Hud title="钢轨里程" tag="风格样片 01" sub="轨道坡度 = 市值变化率" accent="#d8a94a" paper="#eef2f5" />
      <YearBox year={year} from={1998} to={2026} label={year < 2018.2 ? '爬坡' : year < 2021.2 ? '进洞' : '下坠'} accent="#d8a94a" ink="#12161a" paper="#eef2f5" />
      <Subs subs={RAIL_SUBS} f={f} accent="#e8bd57" />

      <Audio src={staticFile('audio/ep56-tencent-history/bgm.wav')} volume={0.45} />
      <Sequence from={330} durationInFrames={40} layout="none">
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.45} />
      </Sequence>
      <Sequence from={446} durationInFrames={40} layout="none">
        <Audio src={staticFile('audio/sfx/whoosh.wav')} volume={0.5} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const DEMO_DURATION = DURATION;
