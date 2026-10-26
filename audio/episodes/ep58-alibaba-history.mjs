// 第五十八期「阿里 26 年」Vox 解说 BGM → public/audio/ep58-alibaba-history/bgm.wav
//
// 主线是「起—落—起—落」的循环：湖畔 → 两笔钱 → 淘宝 → 上市 → 崩盘退市 → 纽交所登顶
// → 回港 6.7 万亿 → 蚂蚁叫停 → 跌去八成 → AI 重估。
//
// 四音动机 A–C–E–A（A 小调），在湖畔 / 上市 / 6.7 万亿 / AI / 收尾 各出现一次，配器一次比一次满。
// 掉下去四次：2000 泡沫、2008 崩盘、2021 罚单、2022 跌去八成（都 sink()，抽掉鼓，只留低音）。
// 冲上去三次：2007 港股上市、2014 纽交所、2020 6.7 万亿。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, writeScore} from '../score.mjs';

const EP = 'ep58-alibaba-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：A–C–E–A（A 小调） */
const MOTIF = [57, 60, 64, 69];
const motifBox = (M, at, step = 0.46, g = 0.19, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs, cwT}) {
  setSeed(58);
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
  const sqArp = (t0, t1, step, chord, pat, oct, g, o = {}) => grid(t0, t1, step, (t, k) => M(pulse(chord[pat[k % pat.length]] + oct, 0.14, {decay: 16, ...o}), t, g));
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

  /* ============ 1. 钩子 0–cs(8)：1.95 万亿、6.7 万亿、拉出来看 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Am.map((m) => m - 12), 0, cs(4), 0.42, {atk: 2.2, rel: 1.0, cut: 520});
    tickTock(0.6, cs(6), 0.5, 0.24);
    // 「现在 1.95 万亿」落一个大数字
    X(boom(1.6, 62, 30), cs(1), 0.5);
    // 「一年前 3.7 万亿 / 五年前 6.7 万亿」：两条上行的钟声
    M(bell(mtof(69), 1.6), cs(2), 0.16);
    M(bell(mtof(76), 1.8), cs(3), 0.16);
    // 「跌掉八成」
    X(fall(1.2, 420, 90), cs(6), 0.3);
    // 「拉出来看」
    X(swell(1.4, {from: 260, to: 2600}), t1 - 1.6, 0.3);
    padSpan(CH.Am, cs(4), t1, 0.3, {atk: 1.2, rel: 0.6, cut: 700});
  }

  /* ============ 2. 湖畔花园 cs(8)–cs(14)：十八个人，50 万 ============ */
  {
    const t0 = cs(8), t1 = cs(14);
    motifBox(M, t0 + 0.2, 0.5, 0.16);
    bars(t0, t1, 3.2, [CH.F, CH.C, CH.G, CH.Am], (t, ch) => padSpan(ch, t, t + 3.4, 0.3, {atk: 1.4, rel: 1.0, cut: 900}));
    // 稀疏拨弦：像是在算钱
    arp(t0 + 1.2, t1 - 1.0, 1.6, CH.Am, [0, 2, 1, 3], 12, 0.1, 0.55);
    // 「活 102 年」
    M(bell(mtof(81), 1.8), cs(11), 0.14);
  }

  /* ============ 3. 两笔救命钱 → 泡沫 cs(14)–cs(21) ============ */
  {
    const t0 = cs(14), t1 = cs(21);
    bars(t0, t1, 3.0, [CH.Am, CH.F, CH.C, CH.G], (t, ch) => {
      padSpan(ch, t, t + 3.2, 0.28, {atk: 0.8, rel: 0.9, cut: 1100});
      arp(t, t + 3.0, 0.75, ch, [0, 1, 2, 3], 12, 0.075, 0.6);
    });
    drums(t0 + 2.0, cwT(19, '泡沫'), 0.9, 0.5);
    // 500 万 / 2,000 万：两记钟
    M(bell(mtof(72), 1.5), cs(15), 0.18);
    M(bell(mtof(79), 1.7), cs(17), 0.2);
    // 泡沫破了
    sink(cwT(19, '泡沫'), {g: 0.7, low: 24});
    padSpan(CH.Dm, cwT(19, '泡沫'), t1, 0.24, {atk: 1.6, rel: 1.2, cut: 480});
    // 账上还有 2,500 万：一记稳的低音
    X(boom(1.8, 56, 34), cs(20), 0.36);
  }

  /* ============ 4. 淘宝 / 支付宝 cs(21)–cs(31)：免费、担保 ============ */
  {
    const t0 = cs(21), t1 = cs(31);
    bars(t0, t1, 2.4, [CH.Dm, CH.Bb, CH.F, CH.C], (t, ch) => {
      padSpan(ch, t, t + 2.6, 0.26, {atk: 0.5, rel: 0.7, cut: 1400});
    });
    drums(t0 + 1.0, t1 - 0.6, 0.85, 0.62);
    // 「免费」两个字：一记脆的
    M(bell(mtof(84), 1.2), cs(25), 0.16);
    // 「eBay 退出中国」
    sparkle(t0, t1);
    // 担保交易：两只拨弦一问一答
    arp(cs(28), cs(31), 1.1, CH.Am, [0, 3, 1, 3], 12, 0.1, 0.7);
  }

  function sparkle(t0, t1) {
    M(bell(mtof(88), 1.0), cwT(27, 'eBay'), 0.12);
    X(boom(1.2, 66, 40), cwT(27, 'eBay'), 0.3);
  }

  /* ============ 5. 雅虎 → 港股上市 → 崩盘退市 cs(31)–cs(47) ============ */
  {
    const t0 = cs(31), t1 = cs(47);
    bars(t0, cs(35), 2.6, [CH.F, CH.G], (t, ch) => padSpan(ch, t, t + 2.8, 0.2, {atk: 0.9, rel: 0.8, cut: 1000}));
    M(bell(mtof(74), 1.5), cs(32), 0.1);

    // 上市：动机完整出现 + 镲
    const ipo = cs(35);
    motifFull(ipo, 0.22);
    X(crash(3.2), ipo, 0.34);
    bars(ipo, cwT(40, '3.42'), 2.0, [CH.C, CH.G, CH.Am, CH.F], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.26, {atk: 0.5, rel: 0.7, cut: 1300});
    });
    drums(ipo + 0.6, cwT(40, '3.42'), 0.8, 0.7);

    // 3.42 港元：崩
    const cr = cwT(40, '3.42');
    sink(cr, {g: 0.78, low: 22, dur: 2.8});
    drumStop(cr);
    padSpan(CH.Fm, cr, cs(43), 0.24, {atk: 1.4, rel: 1.4, cut: 420});
    // 「跌掉九成」
    X(fall(1.6, 380, 70), cs(41), 0.28);
    // 私有化退市：一声闷响
    X(boom(1.4, 50, 28), cs(42), 0.4);
    // 想去香港而不得
    M(pulse(mtof(57), 0.3, {decay: 10}), cs(44), 0.1);
    M(pulse(mtof(54), 0.3, {decay: 10}), cs(45), 0.1);
  }

  function drumStop(at) {
    // 收拾一下：sink 之后不再补鼓，这里只留一个极轻的沙锤做过渡
    D(Sh, at + 1.2, 0.05);
  }

  /* ============ 6. 纽交所 → 回港 → 6.7 万亿 cs(47)–cs(59)：全片最满 ============ */
  {
    const t0 = cs(47), t1 = cs(59);
    const nyse = cs(47);
    motifFull(nyse, 0.24, -5);
    X(crash(3.4), nyse, 0.36);
    bars(nyse, cs(52), 2.0, [CH.Am, CH.F, CH.C, CH.G], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.3, {atk: 0.5, rel: 0.7, cut: 1500});
      arp(t, t + 2.0, 0.5, ch, [0, 1, 2, 3, 2, 1], 24, 0.07, 0.65);
    });
    drums(nyse + 0.4, cs(52), 0.8, 0.72);

    // 回港：动机再上一层
    const hk = cs(52);
    motifFull(hk, 0.22, 0);
    X(crash(3.0), hk, 0.3);
    bars(hk, cs(57), 2.0, [CH.F, CH.C, CH.G, CH.Am], (t, ch) => padSpan(ch, t, t + 2.2, 0.3, {atk: 0.4, rel: 0.6, cut: 1600}));
    drums(hk + 0.4, cs(57), 0.8, 0.78);

    // 6.7 万亿：全片最高点
    const peak = cs(57);
    motifFull(peak, 0.26, 5);
    X(crash(4.0), peak, 0.4);
    X(boom(2.2, 48, 26), peak + 0.1, 0.55);
    bars(peak, t1, 1.6, [CH.Am, CH.Am], (t, ch) => {
      padSpan(ch, t, t + 1.8, 0.32, {atk: 0.3, rel: 0.6, cut: 1800});
      arp(t, t + 1.6, 0.4, ch, [0, 2, 3, 2], 24, 0.08, 0.7);
    });
    drums(peak + 0.3, t1, 0.8, 0.72);
  }

  /* ============ 7. 蚂蚁叫停 → 罚单 → 坠落 cs(59)–cs(76) ============ */
  {
    // 蚂蚁：2.1 万亿的期待
    const ant = cs(59);
    padSpan(CH.Bb, ant, cs(63), 0.28, {atk: 1.0, rel: 0.8, cut: 1100});
    M(bell(mtof(82), 1.6), cs(60), 0.16);
    X(swell(1.8, {from: 300, to: 3000}), cs(61), 0.24);

    // 11.3 叫停：断
    const stop = cs(63);
    X(boom(2.6, 60, 22), stop, 0.8);
    X(fall(1.8, 600, 60), stop, 0.4);
    padSpan(CH.Fm, stop, cs(67), 0.22, {atk: 1.2, rel: 1.4, cut: 400});

    // 182.28 亿罚单
    X(boom(2.0, 52, 20), cs(66), 0.62);

    // 坠落：抽掉鼓，只留低音和钟
    const fallAt = cs(67);
    padSpan(CH.Dm.map((m) => m - 12), fallAt, cs(73), 0.26, {atk: 1.6, rel: 1.4, cut: 380});
    tickTock(fallAt, cs(73), 0.62, 0.2);
    X(fall(1.6, 460, 70), cs(69), 0.32);
    X(boom(2.2, 46, 24), cwT(69, '60 港元'), 0.6);
    // 芒格割肉：一声闷的
    X(boom(1.2, 58, 30), cs(71), 0.34);

    // 1+6+N：一记机械的
    M(pulse(mtof(57), 0.34, {decay: 8}), cs(73), 0.14);
    M(pulse(mtof(57), 0.34, {decay: 8}), cs(73) + 0.4, 0.12);
    M(pulse(mtof(55), 0.34, {decay: 8}), cs(73) + 0.8, 0.1);
    // 拆分收回
    X(boom(1.2, 60, 34), cs(74), 0.3);
    padSpan(CH.Am, cs(73), cs(76), 0.22, {atk: 1.0, rel: 1.0, cut: 700});
  }

  /* ============ 8. AI 重估 cs(76)–cs(88)：回升 ============ */
  {
    const t0 = cs(76), t1 = cs(88);
    motifFull(t0 + 0.2, 0.2, 0);
    bars(t0, cs(83), 2.0, [CH.Am, CH.F, CH.C, CH.G], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.28, {atk: 0.4, rel: 0.7, cut: 1600});
      sqArp(t, t + 2.0, 0.5, ch, [0, 2, 1, 3], 12, 0.05, {cut: 2200});
    });
    drums(t0 + 0.6, cs(83), 0.8, 0.6);
    // 3,800 亿
    X(boom(1.6, 54, 30), cs(77), 0.44);
    M(bell(mtof(84), 1.4), cs(78), 0.15);
    // 闪购烧钱：一阵急促
    grid(cs(79), cs(81), 0.26, (t, k) => D(Sh, t, 0.1));
    X(fall(1.0, 380, 90), cs(80), 0.24);
    // 186 港元：回升的动机
    motifFull(cs(81), 0.2, 5);
    // 又跌回 88
    const dip = cs(83);
    X(boom(2.0, 56, 22), dip, 0.6);
    X(fall(1.4, 500, 70), dip, 0.3);
    padSpan(CH.Dm, dip, cs(85), 0.2, {atk: 1.0, rel: 1.0, cut: 500});
    // 千问进苹果：两个亮点
    M(bell(mtof(88), 1.5), cs(85), 0.16);
    M(bell(mtof(93), 1.5), cs(86), 0.13);
    // AI 云 +45%：鼓回来
    drums(cs(85), t1, 0.8, 0.5);
    padSpan(CH.Cadd9, cs(85), t1, 0.26, {atk: 0.6, rel: 0.9, cut: 1500});
  }

  /* ============ 9. 收尾 cs(88)–end：悬着的 A 小调 ============ */
  {
    const t0 = cs(88);
    motifBox(M, t0 + 0.1, 0.52, 0.2);
    padSpan([45, 52, 57, 64], t0, seconds - 1.2, 0.3, {atk: 1.6, rel: 2.4, cut: 900});
    arp(t0 + 1.4, seconds - 2.0, 1.5, CH.Am, [0, 2, 1, 3], 12, 0.085, 0.6);
    // 最后留一个没解决的低音
    X(boom(3.0, 44, 24), seconds - 3.2, 0.4);
  }

  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = mus[i] + drm[i] * 0.5 + fx[i] * 0.6;
  return softClip(out, 1.1);
}

writeScore({
  ep: EP,
  render: renderScore,
  level: 0.071,
  depth: 0.7,
  segs: [
    [0, '钩子'],
    [cs(8), '湖畔花园'],
    [cs(14), '两笔钱'],
    [cs(21), '淘宝'],
    [cs(31), '雅虎'],
    [cs(35), '上市崩盘'],
    [cs(47), '纽交所回港'],
    [cs(59), '蚂蚁罚单'],
    [cs(67), '坠落'],
    [cs(76), 'AI 重估'],
    [cs(88), '收尾'],
  ],
});
