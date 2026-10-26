// 第六十一期「百度 26 年」Vox 解说 BGM → public/audio/ep61-baidu-history/bgm.wav
//
// 主线是「起—落—起—落」的循环：创立 → 背水一战 → 上市 → 金融危机 → 谷歌退出登顶
// → 错过移动 → 魏则西 → All in AI → 首亏 → 2021 冲顶 → 四年阴跌 → AI 兑现。
//
// 四音动机 D–F–A–D（D 小调），在创立 / 上市 / 登顶 / 2021 冲顶 / AI / 收尾 各出现一次，配器一次比一次满。
// 掉下去四次：2005 底腰斩、2008 金融危机、2016 魏则西、2019 首亏（都 sink()，抽掉鼓，只留低音）。
// 冲上去三次：2005 纳斯达克、2011 登顶、2021 破千亿。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, writeScore} from '../score.mjs';

const EP = 'ep61-baidu-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：D–F–A–D（D 小调） */
const MOTIF = [50, 53, 57, 62];
const motifBox = (M, at, step = 0.46, g = 0.19, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs, cwT}) {
  setSeed(61);
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

  /* ============ 1. 钩子 0–cs(8)：270 亿、1200 亿、拉出来看 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Dm.map((m) => m - 12), 0, cs(4), 0.42, {atk: 2.2, rel: 1.0, cut: 520});
    tickTock(0.6, cs(6), 0.5, 0.24);
    // 「现在 270 亿」落一个大数字
    X(boom(1.6, 62, 30), cs(1), 0.5);
    // 「五年前 1200 亿 / 跌掉八成」：两条下行的钟声
    M(bell(mtof(74), 1.6), cs(2), 0.16);
    M(bell(mtof(67), 1.8), cs(3), 0.16);
    // 「跌掉近八成」
    X(fall(1.2, 420, 90), cs(3), 0.3);
    // 「拉出来看」
    X(swell(1.4, {from: 260, to: 2600}), t1 - 1.6, 0.3);
    padSpan(CH.Dm, cs(4), t1, 0.3, {atk: 1.2, rel: 0.6, cut: 700});
  }

  /* ============ 2. 创立 cs(8)–cs(15)：八个人，120 万美元 ============ */
  {
    const t0 = cs(8), t1 = cs(15);
    motifBox(M, t0 + 0.2, 0.5, 0.16);
    bars(t0, t1, 3.2, [CH.Bb, CH.F, CH.C, CH.Dm], (t, ch) => padSpan(ch, t, t + 3.4, 0.3, {atk: 1.4, rel: 1.0, cut: 900}));
    // 稀疏拨弦：像是在数专利和美元
    arp(t0 + 1.2, t1 - 1.0, 1.6, CH.Dm, [0, 2, 1, 3], 12, 0.1, 0.55);
    // 「120 万美元」
    M(bell(mtof(74), 1.8), cs(12), 0.14);
  }

  /* ============ 3. 背水一战 → 闪电计划 cs(15)–cs(23) ============ */
  {
    const t0 = cs(15), t1 = cs(23);
    bars(t0, t1, 3.0, [CH.Dm, CH.Bb, CH.F, CH.C], (t, ch) => {
      padSpan(ch, t, t + 3.2, 0.28, {atk: 0.8, rel: 0.9, cut: 1100});
      arp(t, t + 3.0, 0.75, ch, [0, 1, 2, 3], 12, 0.075, 0.6);
    });
    drums(t0 + 2.0, t1, 0.9, 0.5);
    // 拍桌子
    X(boom(1.4, 60, 34), cs(18), 0.4);
    // 闪电计划：一阵急促
    grid(cs(21), cs(23), 0.26, (t, k) => D(Sh, t, 0.1));
    // 中文第一
    M(bell(mtof(81), 1.5), cs(22), 0.18);
  }

  /* ============ 4. 纳斯达克 cs(23)–cs(31)：354% ============ */
  {
    const t0 = cs(23), t1 = cs(31);
    motifFull(t0 + 0.1, 0.2, 0);
    bars(t0, t1, 2.0, [CH.Dm, CH.Bb, CH.F, CH.C], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.3, {atk: 0.4, rel: 0.7, cut: 1500});
      sqArp(t, t + 2.0, 0.5, ch, [0, 2, 1, 3], 12, 0.05, {cut: 2200});
    });
    drums(t0 + 0.5, cwT(30, '市盈率'), 0.75, 0.6);
    // 开盘 66 冲 151
    M(bell(mtof(86), 1.4), cs(25), 0.18);
    M(bell(mtof(93), 1.5), cs(26), 0.2);
    // 市盈率 2450 倍：泡沫论，温度降下来
    const dip = cwT(30, '市盈率');
    X(boom(2.0, 56, 24), dip, 0.55);
    X(fall(1.4, 500, 70), dip, 0.3);
    padSpan(CH.Dm, dip, t1, 0.22, {atk: 1.0, rel: 1.0, cut: 520});
  }

  /* ============ 5. 腰斩 → 谷歌退出 cs(31)–cs(37) ============ */
  {
    const t0 = cs(31), t1 = cs(37);
    sink(t0, {g: 0.68, low: 24});
    sink(cs(32), {g: 0.7, low: 22, dur: 2.8});
    padSpan(CH.Bb, t0, cs(33), 0.2, {atk: 1.6, rel: 1.2, cut: 460});
    // 谷歌走了：一记稳的低音 + 一点亮
    X(boom(1.8, 56, 34), cs(33), 0.4);
    M(bell(mtof(77), 1.6), cs(34), 0.16);
    bars(cs(34), t1, 2.4, [CH.F, CH.C], (t, ch) => padSpan(ch, t, t + 2.6, 0.26, {atk: 1.0, rel: 0.9, cut: 950}));
    M(bell(mtof(84), 1.5), cs(36), 0.15);
  }

  /* ============ 6. 2011 登顶 cs(37)–cs(41) ============ */
  {
    const t0 = cs(37), t1 = cs(41);
    motifFull(t0 + 0.1, 0.2, 5);
    bars(t0, t1, 2.0, [CH.Bb, CH.F, CH.C, CH.Dm], (t, ch) => padSpan(ch, t, t + 2.2, 0.3, {atk: 0.4, rel: 0.7, cut: 1500}));
    drums(t0 + 0.4, t1, 0.8, 0.6);
    M(bell(mtof(86), 1.5), cs(37), 0.2);
  }

  /* ============ 7. 酒驾 → 91 无线 → 糯米 cs(41)–cs(51) ============ */
  {
    const t0 = cs(41), t1 = cs(51);
    bars(t0, t1, 2.8, [CH.Dm, CH.Bb, CH.F, CH.A], (t, ch) => {
      padSpan(ch, t, t + 3.0, 0.26, {atk: 0.9, rel: 0.9, cut: 780});
      arp(t, t + 2.8, 0.7, ch, [0, 2, 1, 3], 12, 0.07, 0.5);
    });
    // 酒驾：一记闷的
    X(boom(1.6, 54, 26), cs(43), 0.4);
    // 19 亿美元：一声重锤
    X(boom(2.0, 58, 30), cwT(46, '19 亿美元'), 0.5);
    X(fall(1.2, 420, 90), cs(48), 0.28);
    // 200 亿烧完：抽掉温度
    padSpan(CH.Dm, cs(49), t1, 0.2, {atk: 1.6, rel: 1.4, cut: 440});
  }

  /* ============ 8. 至暗时刻 cs(51)–cs(58)：魏则西 ============ */
  {
    const t0 = cs(51), t1 = cs(58);
    sink(t0, {g: 0.7, low: 22});
    sink(cs(53), {g: 0.74, low: 20, dur: 3.0});
    padSpan(CH.Bb, t0, cs(55), 0.2, {atk: 2.0, rel: 1.4, cut: 420});
    // 整改：一记稳的低音，不是希望，是冷静
    X(boom(2.2, 54, 30), cs(55), 0.42);
    bars(cs(55), t1, 2.6, [CH.Dm, CH.Bb], (t, ch) => padSpan(ch, t, t + 2.8, 0.2, {atk: 1.4, rel: 1.2, cut: 560}));
  }

  /* ============ 9. All in AI → 首亏 cs(58)–cs(67) ============ */
  {
    const t0 = cs(58), t1 = cs(67);
    motifBox(M, t0 + 0.2, 0.46, 0.16, 5);
    bars(t0, cs(62), 2.2, [CH.Dm, CH.F, CH.C, CH.G], (t, ch) => {
      padSpan(ch, t, t + 2.4, 0.26, {atk: 0.6, rel: 0.8, cut: 1300});
      sqArp(t, t + 2.2, 0.55, ch, [0, 2, 1, 3], 12, 0.045, {cut: 2000});
    });
    drums(t0 + 0.5, cs(62), 0.85, 0.5);
    // 阿波罗开源
    M(bell(mtof(84), 1.4), cs(60), 0.16);
    // 陆奇离开 + 首亏：两次下坠
    X(boom(2.0, 56, 24), cs(62), 0.55);
    X(fall(1.4, 500, 70), cs(62), 0.3);
    sink(cs(64), {g: 0.66, low: 24});
    padSpan(CH.Dm, cs(62), t1, 0.2, {atk: 1.4, rel: 1.2, cut: 500});
  }

  /* ============ 10. 2021 冲顶 → 港股 cs(67)–cs(72) ============ */
  {
    const t0 = cs(67), t1 = cs(72);
    motifFull(t0 + 0.2, 0.22, 5);
    bars(t0, t1, 2.0, [CH.Bb, CH.F, CH.C, CH.Dm], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.3, {atk: 0.4, rel: 0.7, cut: 1600});
      sqArp(t, t + 2.0, 0.5, ch, [0, 2, 1, 3], 12, 0.05, {cut: 2200});
    });
    drums(t0 + 0.4, t1, 0.75, 0.65);
    M(bell(mtof(88), 1.4), cs(68), 0.18);
    M(bell(mtof(93), 1.5), cs(69), 0.2);
  }

  /* ============ 11. 四年阴跌 cs(72)–cs(76) ============ */
  {
    const t0 = cs(76);
    X(fall(1.8, 480, 80), cs(72), 0.3);
    padSpan(CH.Dm, cs(72), t0, 0.2, {atk: 1.8, rel: 1.4, cut: 460});
    tickTock(cs(72), t0, 0.6, 0.16);
  }

  /* ============ 12. AI 兑现 cs(76)–cs(87)：回升 ============ */
  {
    const t0 = cs(76), t1 = cs(87);
    motifFull(t0 + 0.2, 0.2, 0);
    bars(t0, cs(83), 2.0, [CH.Dm, CH.Bb, CH.F, CH.C], (t, ch) => {
      padSpan(ch, t, t + 2.2, 0.28, {atk: 0.4, rel: 0.7, cut: 1600});
      sqArp(t, t + 2.0, 0.5, ch, [0, 2, 1, 3], 12, 0.05, {cut: 2200});
    });
    drums(t0 + 0.6, cs(83), 0.8, 0.6);
    // 文心一言
    M(bell(mtof(84), 1.4), cs(77), 0.15);
    // 萝卜快跑爆发：鼓回来
    drums(cs(79), cs(83), 0.8, 0.55);
    X(boom(1.6, 54, 30), cs(80), 0.4);
    // 26 城 / 2 亿：两个亮点
    M(bell(mtof(88), 1.5), cs(82), 0.15);
    M(bell(mtof(93), 1.5), cs(83), 0.15);
    // 43% + 回购：升调的动机
    motifFull(cs(84), 0.2, 5);
    drums(cs(84), t1, 0.8, 0.5);
    padSpan(CH.Cadd9, cs(84), t1, 0.26, {atk: 0.6, rel: 0.9, cut: 1500});
  }

  /* ============ 13. 收尾 cs(87)–end：悬着的 D 小调 ============ */
  {
    const t0 = cs(87);
    motifBox(M, t0 + 0.1, 0.52, 0.2);
    padSpan([38, 45, 50, 57], t0, seconds - 1.2, 0.3, {atk: 1.6, rel: 2.4, cut: 900});
    arp(t0 + 1.4, seconds - 2.0, 1.5, CH.Dm, [0, 2, 1, 3], 12, 0.085, 0.6);
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
    [cs(8), '创立'],
    [cs(15), '背水一战'],
    [cs(23), '纳斯达克'],
    [cs(31), '腰斩谷歌'],
    [cs(37), '登顶'],
    [cs(41), '酒驾91'],
    [cs(51), '至暗'],
    [cs(58), 'AllInAI'],
    [cs(67), '冲顶港股'],
    [cs(72), '阴跌'],
    [cs(76), 'AI兑现'],
    [cs(87), '收尾'],
  ],
});
