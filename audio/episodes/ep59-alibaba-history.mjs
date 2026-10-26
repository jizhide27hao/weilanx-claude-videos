// 第五十九期「阿里 26 年」暗金文献版 BGM（与 ep58 同一条口播，配乐单独排点） → public/audio/ep59-alibaba-history/bgm.wav
//
// 主线是「五十万 → 六点七万亿 → 一点九五万亿」：草创 → 押注 → 淘宝 → 上市 → 崩盘 → 远走
// → 回家登顶 → 蚂蚁叫停 → 坠落 → 重构 → 再战 → 收尾。
//
// 四音动机 D–F–Bb–D'（小三 + 减五 + 八度）：比 ep57 的 D–F–A–D' 更「旧账」一点，
// 那个降六度就是这家公司反复回到起点的那口气。
// 在草创 / 淘宝 / 上市 / 登顶 / 收尾 各出现一次，配器一次比一次满。
//
// 掉下去三次：2008 金融危机、2021 蚂蚁叫停与罚单、2022 跌到 60 —— 都 sink()，抽掉鼓。
// 冲上去三次：2007 首日 +193%、2014 纽交所、2020 六点七万亿。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, writeScore} from '../score.mjs';

const EP = 'ep59-alibaba-history';
/** 只在生成 segs 报告时用到；render 里的 cs 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：D–F–Bb–D' */
const MOTIF = [62, 65, 70, 74];
const motifBox = (M, at, step = 0.44, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs}) {
  setSeed(59);
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

  /* ============ 1. 钩子 0–cs(8)：1.95 万亿、三次上市、跌掉八成 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Dm.map((m) => m - 12), 0, cs(5), 0.4, {atk: 1.8, rel: 0.8, cut: 540});
    tickTock(0.5, cs(6), 0.5, 0.26);

    X(boom(2.4, 72, 30), cs(1), 0.48);
    M(bell(mtof(81), 2.2), cs(1) + 0.1, 0.15);

    M(pluck(mtof(57), 1.2, 0.3), cs(2), 0.22);
    M(pluck(mtof(60), 1.2, 0.3), cs(2) + 0.18, 0.17);
    M(pluck(mtof(58), 1.4, 0.26), cs(3), 0.2);

    motifBox(M, cs(4), 0.5, 0.21);

    [0, 1.7].forEach((d, k) => X(boom(1.8, 68 - k * 8, 32 + k * 6), cs(6) + d, 0.42));
    padSpan(CH.Am.map((m) => m - 12), cs(6), t1 + 0.4, 0.36, {atk: 0.4, rel: 0.6, cut: 880});

    X(swell(t1 - cs(7), {from: 250, to: 5000}), cs(7), 0.32);
  }

  /* ============ 2. 草创 cs(8)–cs(16)：F 大调，朴素、慢 ============ */
  {
    const t0 = cs(8), t1 = cs(16), beat = 0.7, bar = beat * 4;
    bars(t0, t1, bar, [CH.F, CH.C, CH.Dm, CH.Am], (t, c) => padSpan(c, t, t + bar, 0.29, {atk: 0.5, rel: 0.56, cut: 1300}));
    arp(t0, t1, beat / 2, CH.F, [0, 1, 2, 1], 12, 0.08, 0.5);
    motifBox(M, cs(9), 0.46, 0.2);
    [0, 1, 2].forEach((k) => M(pluck(mtof(60 + [0, 5, 9][k]), 1.1, 0.28), cs(9) + 2.2 + k * 0.26, 0.15));
    M(bell(mtof(84), 2.0), cs(11) + 0.3, 0.12);
  }

  /* ============ 3. 押注 cs(16)–cs(21)：鼓轻轻进来 ============ */
  {
    const t0 = cs(16), t1 = cs(21), beat = 0.64, bar = beat * 4;
    bars(t0, t1, bar, [CH.F, CH.Dm, CH.Bb, CH.C], (t, c) => padSpan(c, t, t + bar, 0.31, {atk: 0.3, rel: 0.4, cut: 1700}));
    drums(t0, t1, beat, 0.62);
    arp(t0, t1, bar / 8, CH.F, [0, 2, 1, 3], 12, 0.1, 0.6);
    M(bell(mtof(77), 1.8), cs(17) + 0.2, 0.15);
    M(bell(mtof(82), 2.2), cs(17) + 0.55, 0.12);
    // 泡沫破了：一次下沉
    sink(cs(19) + 0.2, {low: 27, g: 0.5});
    tickTock(cs(19) + 0.5, t1 - 0.6, 0.5, 0.2);
  }

  /* ============ 4. 淘宝 cs(21)–cs(35)：明快，买卖的市井气 ============ */
  {
    const t0 = cs(21), t1 = cs(35), beat = 0.58, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.2, rel: 0.4, cut: 2300}));
    drums(t0, t1, beat, 0.88);
    grid(t0, t1, bar / 8, (t, k) => M(pulse([60, 67, 64, 69][k % 4] + 12, 0.11, {decay: 13}), t, 0.065));
    motifBox(M, cs(23), 0.4, 0.21);
    M(bell(mtof(88), 1.6), cs(25) + 0.3, 0.13);
    // 支付宝那一句：一个干净的钟
    M(bell(mtof(84), 2.2), cs(29) + 0.4, 0.16);
    X(swell(1.4, {from: 300, to: 3400}), cs(30) - 0.2, 0.2);
    // 雅虎
    X(crash(1.8), cs(32), 0.22);
    motifBox(M, cs(33), 0.42, 0.2, 12);
  }

  /* ============ 5. 上市 cs(35)–cs(43)：第一次冲顶，然后崩 ============ */
  {
    const t0 = cs(35), t1 = cs(43), beat = 0.58, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.F, CH.G, CH.C], (t, c) => padSpan(c, t, t + bar, 0.33, {atk: 0.15, rel: 0.3, cut: 2600}));
    drums(t0, t1, beat, 0.95);
    arp(t0, t1, bar / 8, CH.C, [0, 2, 1, 3, 2, 1], 12, 0.11, 0.7);

    motifFull(cs(37), 0.21);
    X(crash(2.4), cs(37), 0.3);
    M(bell(mtof(88), 1.8), cs(37) + 0.5, 0.14);

    // 金融危机
    sink(cs(39) + 0.3, {low: 25, g: 0.62, dur: 2.8});
    padSpan(CH.Dm.map((m) => m - 12), cs(39), cs(42), 0.34, {atk: 1.0, rel: 0.9, cut: 540});
    tickTock(cs(39) + 0.6, cs(42) - 0.4, 0.5, 0.2);
    [0, 1.2].forEach((d) => X(boom(1.8, 62, 30), cs(41) + d, 0.4));
  }

  /* ============ 6. 远走 cs(43)–cs(52)：低、空、只有钟表 ============ */
  {
    const t0 = cs(43), t1 = cs(52);
    padSpan(CH.Bb.map((m) => m - 12), t0, cs(47), 0.32, {atk: 0.8, rel: 0.9, cut: 620});
    tickTock(t0 + 0.4, cs(46), 0.5, 0.2);
    sink(cs(45) + 0.2, {low: 26, g: 0.48}); // 港交所不接受同股不同权

    const beat = 0.6, bar = beat * 4;
    bars(cs(47), t1, bar, [CH.F, CH.C, CH.G, CH.C], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.25, rel: 0.4, cut: 2100}));
    drums(cs(47), t1, beat, 0.8);
    // 纽交所 250 亿
    motifFull(cs(49), 0.2);
    X(crash(2.6), cs(49), 0.3);
    M(bell(mtof(93), 2.2), cs(50) + 0.3, 0.13);
  }

  /* ============ 7. 回家 cs(52)–cs(59)：一路向上到 6.7 万亿 ============ */
  {
    const t0 = cs(52), t1 = cs(59), beat = 0.54, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.16, rel: 0.32, cut: 2700}));
    drums(t0, t1, beat, 0.95);
    grid(t0, t1, bar / 8, (t, k) => M(pulse([64, 71, 67, 72][k % 4] + 12, 0.1, {decay: 15}), t, 0.07));
    motifBox(M, cs(52), 0.4, 0.22, 12);
    X(swell(1.8, {from: 280, to: 4200}), cs(54) - 0.4, 0.26);
    // 6.7 万亿：全片最高点
    X(crash(3.0), cs(58), 0.34);
    motifFull(cs(58) + 0.2, 0.24, 12);
    [0, 0.9, 1.8].forEach((d, k) => M(bell(mtof(84 + k * 3), 2.4), cs(58) + 0.5 + d, 0.13));
  }

  /* ============ 8. 蚂蚁与罚单 cs(59)–cs(67)：紧、断 ============ */
  {
    const t0 = cs(59), t1 = cs(67);
    bars(t0, t1, 1.9, [CH.Am, CH.Dm, CH.Bb, CH.E], (t, c) => padSpan(c, t, t + 2.1, 0.32, {atk: 0.5, rel: 0.7, cut: 900}));
    tickTock(t0 + 0.3, cs(62), 0.42, 0.24);

    // 外滩讲话 → 叫停：一次断掉
    sink(cs(63) + 0.1, {low: 23, g: 0.7, dur: 3.2});
    padSpan(CH.Dm.map((m) => m - 12), cs(63), cs(66), 0.36, {atk: 0.6, rel: 1.0, cut: 480});
    tickTock(cs(63) + 0.8, cs(65) - 0.4, 0.5, 0.18);

    // 罚单
    [0, 1.3].forEach((d) => X(boom(2.0, 58, 28), cs(66) + d, 0.46));
  }

  /* ============ 9. 坠落 cs(67)–cs(73)：只剩低音与钟表 ============ */
  {
    const t0 = cs(67);
    sink(cs(67) + 0.3, {low: 24, g: 0.66, dur: 3.0});
    padSpan(CH.Dm.map((m) => m - 12), t0, cs(73), 0.34, {atk: 1.2, rel: 1.2, cut: 460});
    tickTock(t0 + 0.6, cs(72) - 0.3, 0.5, 0.17);
    M(pluck(mtof(50), 1.6, 0.2), cs(70) + 0.2, 0.18);
    M(pluck(mtof(53), 1.8, 0.22), cs(70) + 1.0, 0.16);
    X(boom(2.2, 56, 30), cs(71) + 0.4, 0.34);
  }

  /* ============ 10. 重构 cs(73)–cs(81)：从低处一点点起 ============ */
  {
    const t0 = cs(73), t1 = cs(81), beat = 0.66, bar = beat * 4;
    bars(t0, cs(77), bar, [CH.Am, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.29, {atk: 0.5, rel: 0.6, cut: 1500}));
    arp(t0, cs(77), beat / 2, CH.Am, [0, 1, 2, 3], 12, 0.08, 0.5);
    motifBox(M, cs(73), 0.46, 0.19);
    M(bell(mtof(79), 2.0), cs(76) + 0.2, 0.14);

    // 押注 AI：鼓回来
    bars(cs(77), t1, 0.58 * 4, [CH.F, CH.C, CH.G, CH.Am], (t, c) => padSpan(c, t, t + 2.32, 0.32, {atk: 0.2, rel: 0.4, cut: 2400}));
    drums(cs(77), t1, 0.58, 0.8);
    motifFull(cs(77) + 0.2, 0.19);
    X(swell(1.6, {from: 300, to: 3800}), cs(78) - 0.3, 0.22);
  }

  /* ============ 11. 再战 cs(81)–cs(87)：再冲一次，再掉一次 ============ */
  {
    const t0 = cs(81), t1 = cs(87), beat = 0.56, bar = beat * 4;
    bars(t0, cs(83), bar, [CH.C, CH.G, CH.F, CH.C], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.2, rel: 0.36, cut: 2400}));
    drums(t0, cs(83), beat, 0.86);
    // 回到 186
    X(crash(1.8), cs(81), 0.24);
    motifBox(M, cs(81), 0.4, 0.21, 12);

    // 又跌回 88
    sink(cs(83) + 0.3, {low: 25, g: 0.6, dur: 2.6});
    padSpan(CH.Bb.map((m) => m - 12), cs(83), cs(85), 0.33, {atk: 0.8, rel: 0.8, cut: 560});
    tickTock(cs(83) + 0.7, cs(85) - 0.3, 0.5, 0.18);

    // 千问进苹果：重新点亮
    bars(cs(85), t1, 0.6 * 4, [CH.F, CH.C], (t, c) => padSpan(c, t, t + 2.4, 0.31, {atk: 0.3, rel: 0.5, cut: 2000}));
    M(bell(mtof(84), 2.2), cs(85) + 0.3, 0.15);
    M(bell(mtof(89), 2.4), cs(86) + 0.2, 0.13);
  }

  /* ============ 12. 收尾 cs(87)–end：慢回 C 大调，动机满编收束 ============ */
  {
    const t0 = cs(87), t1 = cs(88), beat = 0.66, bar = beat * 4;
    bars(t0, t1, bar, [CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.29, {atk: 0.6, rel: 0.7, cut: 1500}));

    padSpan(CH.C, t1, seconds - 1.6, 0.32, {atk: 2.0, rel: 1.4, cut: 820});
    motifFull(cs(88) + 0.2, 0.23);
    M(bell(mtof(88), 2.8), cs(88) + 1.0, 0.14);
    M(bell(mtof(74), 3.0), cs(89) + 0.6, 0.12);

    X(swell(2.2, {from: 200, to: 4000}), cs(88) - 0.4, 0.24);
    M(pluck(mtof(74), 2.4, 0.38), seconds - 4.6, 0.2);
    M(pluck(mtof(62), 2.8, 0.28), seconds - 4.3, 0.22);
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
    [cs(16), '押注'],
    [cs(21), '淘宝'],
    [cs(35), '上市'],
    [cs(43), '远走'],
    [cs(52), '回家'],
    [cs(59), '蚂蚁'],
    [cs(67), '坠落'],
    [cs(73), '重构'],
    [cs(81), '再战'],
    [cs(87), '收尾'],
  ],
});
