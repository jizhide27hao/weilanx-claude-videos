// 第五十七期「腾讯 28 年」暗金文献版 BGM（与 ep56 同一条口播，配乐单独排点） → public/audio/ep57-tencent-history/bgm.wav
//
// 主线是「从没人要，到 14 亿人离不开」：草创 → 烧钱 → 救场 → 上市 → 3Q → 微信 → 登顶 → 两次腰斩 → 回升。
//
// 贯穿全片的四音动机 D–F–A–D（上行小三 + 八度），比 ep54/55 的 A–C–E–A 更沉一点：
// 在草创 / 上市 / 微信破亿 / 7.35 万亿 / 收尾 各出现一次，配器一次比一次满。
//
// 掉下去两次：2018 版号腰斩、2021–2022 监管坠落（都 sink()，抽掉鼓，只留低音和钟表）。
// 冲上去三次：2004 上市、2014 红包、2021 登顶。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, up, writeScore} from '../score.mjs';

const EP = 'ep57-tencent-history';
/** 只在生成 segs 报告时用到；render 里的 cs 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：D–F–A–D' */
const MOTIF = [62, 65, 69, 74];
const motifBox = (M, at, step = 0.44, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs}) {
  setSeed(57);
  const n = Math.ceil(seconds * SR);
  const mus = new Float32Array(n);
  const drm = new Float32Array(n);
  const fx = new Float32Array(n);
  const M = (buf, at, g) => mixInto(mus, buf, at, g);
  const D = (buf, at, g) => mixInto(drm, buf, at, g);
  const X = (buf, at, g) => mixInto(fx, buf, at, g);

  const K = kick(), S = snap(), Hc = hat(), Ho = hat(true), Sh = shaker();
  const padSpan = (chord, t0, t1, g, o) => M(pad(chord, Math.max(0.2, t1 - t0), o), t0, g);
  const bars = (t0, t1, bar, prog, fn) => grid(t0, t1, bar, (t, b) => fn(t, prog[b % prog.length], b));
  const arp = (t0, t1, step, chord, pat, oct, g, bright = 0.5) => grid(t0, t1, step, (t, k) => M(pluck(mtof(chord[pat[k % pat.length]] + oct), 0.7, bright), t, g));
  const drums = (t0, t1, beat, g = 1) =>
    grid(t0, t1, beat, (t, k) => {
      D(K, t, 0.55 * g);
      if (k % 2) D(S, t, 0.36 * g);
      D(Hc, t, 0.08 * g);
      D(k % 2 ? Ho : Hc, t + beat / 2, 0.07 * g);
    });
  const tickTock = (t0, t1, step, g) => grid(t0, t1, step, (t, b) => D(tick(b % 2 === 0), t, g));
  const sink = (at, {low = 26, g = 0.65, dur = 2.4} = {}) => {
    X(fall(1.5, 520, 70), at, 0.34);
    X(boom(dur, 58, low), at + 0.12, g);
  };
  const motifFull = (at, g = 0.2, lift = 0) => {
    MOTIF.forEach((m, k) => {
      M(pluck(mtof(m + lift), 1.6, 0.75), at + k * 0.2, g);
      M(bell(mtof(m + lift + 12), 1.4), at + k * 0.2 + 0.04, g * 0.5);
    });
  };

  /* ============ 1. 钩子 0–cs(8)：14.18 亿、开价一百万、最高六十万 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Dm.map((m) => m - 12), 0, cs(5), 0.4, {atk: 1.8, rel: 0.8, cut: 560});
    tickTock(0.5, cs(6), 0.5, 0.26);

    X(boom(2.4, 74, 30), cs(1), 0.5);
    M(bell(mtof(81), 2.2), cs(1) + 0.1, 0.16);

    M(pluck(mtof(57), 1.2, 0.3), cs(2), 0.22);
    M(pluck(mtof(60), 1.2, 0.3), cs(2) + 0.18, 0.18);

    motifBox(M, cs(3), 0.5, 0.22);

    M(pluck(mtof(45), 1.0, 0.16), cs(4), 0.28);
    M(pluck(mtof(52), 0.8, 0.14), cs(4) + 0.22, 0.18);

    [0, 1.7].forEach((d, k) => X(boom(1.8, 70 - k * 8, 32 + k * 6), cs(6) + d, 0.44));
    padSpan(CH.Am.map((m) => m - 12), cs(6), t1 + 0.4, 0.38, {atk: 0.4, rel: 0.6, cut: 900});

    X(swell(t1 - cs(7), {from: 260, to: 5200}), cs(7), 0.34);
  }

  /* ============ 2. 草创 cs(8)–cs(20)：C 大调，朴素、慢 → 渐起 ============ */
  {
    const t0 = cs(8), t1 = cs(20), beat = 0.68, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.4, rel: 0.5, cut: 1400}));
    arp(t0, t1, beat / 2, CH.C, [0, 1, 2, 1], 12, 0.09, 0.55);
    motifBox(M, cs(9), 0.46, 0.2);
    [0, 1, 2].forEach((k) => M(pluck(mtof(60 + [0, 4, 7][k]), 1.1, 0.3), cs(9) + 2.1 + k * 0.24, 0.16));
  }

  /* ============ 3. 救场与上市 cs(20)–cs(35)：鼓进来，第一次冲顶 ============ */
  {
    const t0 = cs(20), t1 = cs(35), beat = 0.62, bar = beat * 4;
    bars(t0, t1, bar, [CH.F, CH.C, CH.G, CH.C], (t, c, b) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 2600}));
    drums(t0, t1, beat, 0.9);
    arp(t0, t1, bar / 8, CH.C, [0, 2, 1, 3, 2, 1], 12, 0.12, 0.7);
    motifFull(cs(32), 0.2);
    X(crash(2.4), cs(32), 0.3);

    M(bell(mtof(76), 1.6), cs(34) + 0.2, 0.16);
    M(bell(mtof(81), 2.0), cs(34) + 0.5, 0.14);
  }

  /* ============ 4. 3Q 大战 cs(35)–cs(49)：低音挤压、铃表 ============ */
  {
    const t0 = cs(35), t1 = cs(49);
    padSpan(CH.Dm.map((m) => m - 12), t0, t1, 0.34, {atk: 0.6, rel: 0.8, cut: 700});
    tickTock(t0 + 0.4, t1 - 1.2, 0.5, 0.22);
    [0, 2.2].forEach((d, k) => X(boom(2.2, 66 - k * 6, 30), cs(43) + d, 0.4));
    sink(cs(46) + 0.3, {low: 28, g: 0.5});

    M(pluck(mtof(50), 1.4, 0.2), cs(48) + 0.2, 0.2);
    M(pluck(mtof(57), 1.6, 0.24), cs(48) + 0.8, 0.22);
  }

  /* ============ 5. 微信 cs(49)–cs(68)：明亮方波 + 裂变感 ============ */
  {
    const t0 = cs(49), t1 = cs(68), beat = 0.56, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.2, rel: 0.4, cut: 2400}));
    drums(t0, t1, beat, 0.85);
    grid(t0, t1, bar / 8, (t, k) => M(pulse([60, 67, 64, 69][k % 4] + 12, 0.12, {decay: 14}), t, 0.07));

    motifBox(M, cs(52), 0.4, 0.22, 12);
    M(bell(mtof(93), 1.8), cs(55) + 0.15, 0.14);

    [0, 1.4].forEach((d) => X(swell(1.6, {from: 300, to: 3600}), cs(59) + d, 0.24));
    motifFull(cs(59) + 0.4, 0.18, 12);
    X(crash(2.0), cs(59), 0.26);
  }

  /* ============ 6. 登顶与两次坠落 cs(68)–cs(90) ============ */
  {
    const t0 = cs(68), beat = 0.6, bar = beat * 4;
    bars(t0, cs(75), bar, [CH.C, CH.F, CH.G, CH.C], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.2, rel: 0.4, cut: 2200}));
    drums(t0, cs(75), beat, 0.8);
    motifFull(cs(75), 0.22);
    X(crash(2.6), cs(75), 0.32);
    [0, 0.9, 1.8].forEach((d, k) => M(bell(mtof(81 + k * 4), 2.0), cs(75) + 0.4 + d, 0.13));

    sink(cs(71) + 0.2, {low: 26, g: 0.6});
    tickTock(cs(71) + 0.6, cs(73), 0.5, 0.2);

    sink(cs(77) + 0.4, {low: 24, g: 0.68, dur: 3.0});
    padSpan(CH.Dm.map((m) => m - 12), cs(77), cs(82), 0.36, {atk: 1.2, rel: 1.0, cut: 520});
    tickTock(cs(77) + 0.8, cs(81) - 0.5, 0.5, 0.18);

    [0, 1.2].forEach((d) => X(boom(2.0, 60, 30), cs(80) + d, 0.42));
  }

  /* ============ 7. 回升与收尾 cs(90)–end：慢回 C 大调，动机满编收束 ============ */
  {
    const t0 = cs(90), t1 = cs(94), beat = 0.64, bar = beat * 4;
    bars(t0, t1, bar, [CH.Am, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.5, rel: 0.6, cut: 1600}));
    arp(t0, t1, beat / 2, CH.C, [0, 1, 2, 3], 12, 0.08, 0.5);

    padSpan(CH.C, t1, seconds - 1.6, 0.32, {atk: 2.0, rel: 1.4, cut: 900});
    motifFull(cs(96), 0.24);
    M(bell(mtof(88), 2.6), cs(96) + 0.9, 0.15);

    X(swell(2.2, {from: 200, to: 4200}), cs(94) + 0.2, 0.26);
    M(pluck(mtof(74), 2.2, 0.4), seconds - 4.4, 0.2);
    M(pluck(mtof(62), 2.6, 0.3), seconds - 4.15, 0.22);
  }

  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = mus[i] + drm[i] * 0.5 + fx[i] * 0.6;
  return softClip(out, 1.1);
}

writeScore({
  ep: EP,
  render: renderScore,
  segs: [
    [0, '钩子'],
    [cs(8), '草创'],
    [cs(20), '救场'],
    [cs(32), '上市'],
    [cs(35), '3Q'],
    [cs(49), '微信'],
    [cs(59), '红包'],
    [cs(68), '版号'],
    [cs(75), '登顶'],
    [cs(77), '坠落'],
    [cs(82), '回升'],
    [cs(94), '收尾'],
  ],
});
