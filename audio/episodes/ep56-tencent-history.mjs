// 第五十六期「腾讯 28 年」Vox 解说 BGM → public/audio/ep56-tencent-history/bgm.wav
//
// 主线是「从没人要，到离不开」：创立 → 卖不掉 → 两轮救场 → 上市 → 变现 → 3Q → 微信 → 红包 → 巅峰 → 坠落 → 复苏。
//
// 贯穿全片的四音动机 D–F#–A–D（上行大三和弦 + 八度），
// 在创立 / 上市 / 微信上线 / 7.35 万亿 / 收尾 各出现一次，配器一次比一次满。
//
// 掉下去三次：2000 卖不掉、2018 腰斩、2022 又腰斩（都 sink()，抽掉鼓，只留低音和钟表）。
// 冲上去三次：2004 上市、2014 红包、2017 超 Facebook。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, up, writeScore} from '../score.mjs';

const EP = 'ep56-tencent-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：D–F#–A–D */
const MOTIF = [62, 66, 69, 74];
const motifBox = (M, at, step = 0.44, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs}) {
  setSeed(56);
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

  /* ============ 1. 钩子 0–cs(8)：14.18 亿、60 万没人要、拉出来看 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Dm.map((m) => m - 12), 0, cs(5), 0.4, {atk: 1.8, rel: 0.8, cut: 560});
    tickTock(0.5, cs(6), 0.5, 0.26);
    // 「微信月活 14.18 亿」：一个大数字落下来
    X(boom(2.4, 74, 30), cs(1), 0.5);
    M(bell(mtof(74), 2.2), cs(1) + 0.1, 0.16);
    // 「叫腾讯」
    M(pluck(mtof(57), 1.2, 0.3), cs(2), 0.22);
    M(pluck(mtof(62), 1.2, 0.3), cs(2) + 0.18, 0.18);
    // 「创业第二年，想把公司卖掉」：动机第一次，八音盒，很远
    motifBox(M, cs(3), 0.5, 0.22);
    // 「100 万 / 60 万」：两下闷响
    X(boom(1.8, 70, 32), cs(4), 0.42);
    X(boom(1.8, 62, 36), cs(5), 0.44);
    // 「从没人要到离不开」：动机移高一层
    motifBox(M, cs(6), 0.42, 0.22, 12);
    padSpan(CH.Am.map((m) => m - 12), cs(6), t1 + 0.4, 0.38, {atk: 0.4, rel: 0.6, cut: 900});
    // 「把这 28 年拉出来看」：倒卷
    X(swell(t1 - cs(7), {from: 260, to: 5200}), cs(7), 0.34);
  }

  /* ============ 2. 创立 cs(8)–cs(16)：C 大调，朴素、慢 ============ */
  {
    const t0 = cs(8), t1 = cs(16), beat = 0.68, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar + 0.2, 0.3, {atk: 0.5, rel: 0.6, cut: 1400}));
    arp(t0 + 0.4, t1, bar / 4, CH.C, [0, 2, 1, 3], 0, 0.14, 0.4);
    // 「1998 年 11 月 11 日」
    X(boom(1.2, 62, 40), t0 + 0.1, 0.3);
    // 「五个人」：五个上行的短音
    [0, 0.36, 0.72, 1.08, 1.44].forEach((d, k) => M(pluck(mtof(60 + k * 3), 0.8, 0.3), t0 + 1.6 + d, 0.16));
    // 「越火越亏」：低音往下走
    [[0, 48], [0.8, 46], [1.6, 43]].forEach(([d, m]) => M(pluck(mtof(m), 1.4, 0.2), cs(15) + d, 0.22));
  }

  /* ============ 3. 卖不掉 cs(16)–cs(20)：第一次掉下去 ============ */
  {
    const t0 = cs(16), t1 = cs(20);
    padSpan(CH.Dm, t0, t1 + 0.6, 0.32, {atk: 0.5, rel: 0.8, cut: 560});
    tickTock(t0, t1, 0.62, 0.24);
    // 「开价 100 万」：一个悬着的音
    M(bell(mtof(69), 3.0), t0 + 0.2, 0.14);
    // 「最高只出 60 万」：闷响
    X(boom(1.8, 58, 30), cs(18), 0.46);
    // 「没卖，接着干」：一个很轻的动机头两个音
    M(pluck(mtof(62), 1.6, 0.3), cs(19) + 0.2, 0.18);
    M(pluck(mtof(66), 1.6, 0.3), cs(19) + 0.55, 0.16);
  }

  /* ============ 4. 融资 cs(20)–cs(24)：低音爬升 ============ */
  {
    const t0 = cs(20), t1 = cs(24), beat = 0.6, bar = beat * 4;
    bars(t0, t1, bar, [CH.F, CH.C, CH.G, CH.D], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.3, rel: 0.5, cut: 1600}));
    // 「220 万美元」：两个音叠上
    M(bell(mtof(66), 1.8), t0 + 0.2, 0.16);
    M(bell(mtof(74), 1.8), t0 + 0.4, 0.13);
    // 「怎么赚钱 / 我也不知道」：一个不协和的短音，悬住
    M(pulse(58, 0.5, {cut: 1100}), cs(23) + 0.8, 0.12);
  }

  /* ============ 5. 盈利与 MIH cs(24)–cs(32)：鼓进来，一路往上 ============ */
  {
    const t0 = cs(24), t1 = cs(32), beat = 0.58, bar = beat * 4;
    bars(t0, cs(28), bar, [CH.F, CH.C, CH.G, CH.F], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.2, rel: 0.4, cut: 1800}));
    drums(t0 + beat, cs(28), beat, 0.6);
    // 「首次盈利 1,022 万」：亮铃
    M(bell(mtof(78), 2.0), cs(26), 0.18);
    X(boom(1.4, 72, 38), cs(26), 0.3);
    // MIH：动机第二次 + 铃成串往上（11 倍）
    bars(cs(28), t1, bar, [CH.G, CH.D, CH.G, CH.A], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 2600}));
    drums(cs(28), t1, beat, 0.85);
    motifFull(cs(28), 0.2);
    X(crash(2.4), cs(28), 0.3);
    [66, 69, 74, 78].forEach((m, k) => M(bell(mtof(m), 1.6), cs(29) + k * 0.16, 0.12));
    // 「今天值七千多亿」：一个长的悬留
    padSpan(CH.G, cs(30), t1 + 0.4, 0.3, {atk: 0.4, rel: 0.8, cut: 1000});
    M(bell(mtof(86), 3.2), cs(31), 0.13);
  }

  /* ============ 6. 上市 cs(32)–cs(36)：第一次冲顶 ============ */
  {
    const t0 = cs(32), t1 = cs(36), beat = 0.52, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.F, CH.C], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 3000}));
    drums(t0, t1, beat, 0.95);
    arp(t0, t1, bar / 8, CH.C, [0, 2, 1, 3, 2, 1], 12, 0.12, 0.7);
    motifFull(cs(33), 0.22);
    X(crash(2.6), cs(33), 0.32);
    // 「62 亿」
    X(boom(2, 78, 34), cs(34), 0.46);
    [74, 78, 81].forEach((m, k) => M(bell(mtof(m), 1.8), cs(35) + k * 0.18, 0.14));
  }

  /* ============ 7. 变现 cs(36)–cs(42)：俏皮的拨弦 ============ */
  {
    const t0 = cs(36), t1 = cs(42), beat = 0.56, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.28, {atk: 0.2, rel: 0.4, cut: 2200}));
    grid(t0, t1, beat / 2, (t, k) => {
      D(k % 4 === 0 ? K : Sh, t, 0.26);
      if (k % 2) M(pluck(mtof([62, 66, 69, 74][Math.floor(k / 2) % 4]), 0.6, 0.35), t, 0.11);
    });
    // 「几百万人买」：一串小铃
    for (let k = 0; k < 6; k++) M(bell(mtof(74 + (k % 3) * 3), 0.6), cs(37) + k * 0.1, 0.06);
    // 「中国最大的游戏公司」：动机八音盒
    motifBox(M, cs(41), 0.42, 0.24);
    X(boom(1.4, 76, 40), cs(41), 0.3);
  }

  /* ============ 8. 3Q 大战 cs(42)–cs(49)：不协和、紧 ============ */
  {
    const t0 = cs(42), t1 = cs(49);
    // 悬着的和弦 + 心跳
    padSpan([48, 54, 55, 60], t0, cs(44), 0.3, {atk: 0.4, rel: 0.7, cut: 700});
    tickTock(t0, cs(44), 0.55, 0.26);
    [0, 0.42, 1.3, 1.62, 2.4].forEach((d, k) => M(pulse([55, 55, 56, 55, 54][k], 0.2, {cut: 900}), t0 + 0.4 + d, 0.11));
    // 「停用 Q Q」：全片第一个 sink
    sink(cs(44), {low: 24, g: 0.7, dur: 2.6});
    padSpan(CH.Dm.map((m) => m - 12), cs(44), t1 + 0.4, 0.32, {atk: 0.5, rel: 0.9, cut: 520});
    tickTock(cs(44), t1, 0.7, 0.2);
    // 「全网都在骂」：高音的一点毛刺
    M(pulse(70, 0.24, {cut: 2600}), cs(47) + 0.6, 0.1);
    // 「官司赢了，人心输了」：一个孤零零的高音
    M(bell(mtof(76), 3.2), cs(48) + 1.2, 0.15);
  }

  /* ============ 9. 微信 cs(49)–cs(57)：蓄力 → 爆发 ============ */
  {
    const t0 = cs(49), t1 = cs(52), t2 = cs(52), t3 = cs(57), beat = 0.54, bar = beat * 4;
    bars(t0, t1, bar, [CH.Am, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.28, {atk: 0.3, rel: 0.5, cut: 1600}));
    arp(t0, t1, bar / 4, CH.Am, [0, 1, 2, 3], 0, 0.12, 0.5);
    // 「微信上线」：蓄力 → 爆发
    padSpan(CH.G, t2, cs(52) + 0.4, 0.28, {atk: 0.5, rel: 0.4, cut: 900});
    X(swell(cs(52) - t2, {from: 300, to: 6400}), t2, 0.34);
    X(boom(2.6, 80, 34), cs(52), 0.52);
    X(crash(2.6), cs(52), 0.32);
    motifFull(cs(52), 0.22);
    drums(cs(52), t3, beat, 1.0);
    bars(cs(52), t3, bar, [CH.D, CH.G, CH.A, CH.D], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 3000}));
    sqArp(cs(52), t3, beat / 2, CH.D, [0, 2, 1, 3], 12, 0.09, {cut: 2600});
    // 「433 天破亿」：一串上行铃
    for (let k = 0; k < 8; k++) M(bell(mtof(66 + (k % 4) * 3), 0.7), cs(55) + k * 0.09, 0.07);
    // 「船票到手」：一个稳的落点
    X(boom(1.6, 74, 40), cs(56), 0.34);
  }

  /* ============ 10. 红包 cs(57)–cs(64)：欢腾 ============ */
  {
    const t0 = cs(57), t1 = cs(64), beat = 0.52, bar = beat * 4;
    bars(t0, t1, bar, [CH.G, CH.D, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.15, rel: 0.3, cut: 2800}));
    drums(t0, t1, beat, 0.9);
    arp(t0, t1, bar / 8, CH.G, [0, 1, 2, 3, 2, 1], 12, 0.12, 0.7);
    // 「482 万人在抢」：密集小铃
    for (let k = 0; k < 10; k++) M(bell(mtof([78, 81, 83, 86][k % 4]), 0.6), cs(60) + k * 0.08, 0.055);
    // 「珍珠港」：一个不协和但轻的音
    M(pulse(59, 0.3, {cut: 1200}), cs(62) + 0.7, 0.1);
    // 「春晚 10.1 亿次」：动机移高 + 镲
    motifFull(cs(63), 0.22, 12);
    X(crash(2.8), cs(63), 0.3);
    X(boom(2.2, 82, 34), cs(63), 0.46);
  }

  /* ============ 11. 巅峰 cs(64)–cs(69)：全片第一次满编 ============ */
  {
    const t0 = cs(64), t1 = cs(69), beat = 0.5, bar = beat * 4;
    bars(t0, t1, bar, [CH.D, CH.G, CH.A, CH.D], (t, c) => padSpan(up(c, 12), t, t + bar, 0.28, {atk: 0.1, rel: 0.25, cut: 3600}));
    bars(t0, t1, bar, [CH.D, CH.G, CH.A, CH.D], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.1, rel: 0.25, cut: 2400}));
    drums(t0, t1, beat, 1.05);
    arp(t0, t1, bar / 8, CH.D, [0, 1, 2, 3, 2, 3], 12, 0.14, 0.8);
    // 亚洲第一
    motifFull(cs(64), 0.24);
    X(crash(3), cs(64), 0.36);
    X(boom(2.6, 82, 34), cs(64), 0.52);
    // 超 Facebook
    M(bell(mtof(86), 2.4), cs(65), 0.18);
    X(boom(1.6, 78, 38), cs(65), 0.34);
    // 「4.5 万亿」
    X(boom(2.2, 84, 32), cs(68), 0.5);
    motifFull(cs(68), 0.24, 12);
  }

  /* ============ 12. 寒冬 cs(69)–cs(75)：第二次掉下去 ============ */
  {
    const t0 = cs(69), t1 = cs(75);
    padSpan(CH.Bm.map((m) => m - 12), t0, cs(70) + 0.4, 0.32, {atk: 1.0, rel: 1.0, cut: 520});
    tickTock(t0, cs(71), 0.66, 0.22);
    // 「版号停发」：sink
    sink(cs(69), {low: 24, g: 0.7, dur: 2.6});
    // 「475 → 250」：下滑
    X(fall(2.2, 420, 90), cs(71) + 0.1, 0.3);
    // 「蒸发 1.7 万亿」：重击
    X(boom(2.8, 52, 24), cs(72) + 0.2, 0.55);
    padSpan(CH.Bm.map((m) => m - 12), cs(72), t1 + 0.4, 0.34, {atk: 0.4, rel: 0.8, cut: 440});
    // 「930 全员信」：一个稳住的四音，收住
    [62, 66, 69, 74].forEach((m, k) => M(bell(mtof(m - 12), 2.6), cs(73) + k * 0.24, 0.12));
    // 「拥抱产业互联网」：一点点亮起来
    padSpan(CH.G, cs(74), t1 + 0.5, 0.26, {atk: 0.8, rel: 1.0, cut: 700});
  }

  /* ============ 13. 坠落 cs(75)–cs(82)：最高点 → 第三次掉下去 ============ */
  {
    const t0 = cs(75), t1 = cs(82), beat = 0.5, bar = beat * 4;
    // 766 港元：满编的最后辉煌
    bars(t0, cs(76), bar, [CH.D, CH.G, CH.A, CH.D], (t, c) => padSpan(c, t, t + bar, 0.36, {atk: 0.1, rel: 0.2, cut: 3400}));
    drums(t0, cs(76), beat, 1.1);
    X(boom(2.6, 84, 32), cs(75), 0.52);
    X(crash(3.4), cs(75), 0.38);
    motifFull(cs(75), 0.26);
    // 7.35 万亿 超六大行：全片最响的一下
    X(boom(3.0, 86, 30), cs(76), 0.58);
    X(crash(3.6), cs(76), 0.4);
    for (let k = 0; k < 12; k++) M(bell(mtof([78, 81, 86, 90][k % 4]), 1.2), cs(76) + k * 0.14, 0.05);
    // 「监管来了」：抽掉一切
    sink(cs(77), {low: 22, g: 0.78, dur: 3.0});
    padSpan(CH.Dm.map((m) => m - 12), cs(77), t1 + 0.4, 0.34, {atk: 0.5, rel: 1.0, cut: 480});
    tickTock(cs(77), t1, 0.8, 0.22);
    // 「198 港元」：孤音
    M(bell(mtof(62), 3.4), cs(78) + 1.2, 0.14);
    // 「跌出前十」：一点毛刺
    M(pulse(58, 0.3, {cut: 1300}), cs(81) + 0.5, 0.1);
  }

  /* ============ 14. 复苏 cs(82)–cs(90)：从底往上重建 ============ */
  {
    const t0 = cs(82), t1 = cs(90), beat = 0.54, bar = beat * 4;
    bars(t0, t1, bar, [CH.G, CH.D, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.3, rel: 0.4, cut: 1800}));
    drums(t0 + bar, t1, beat, 0.85);
    arp(t0, t1, bar / 4, CH.G, [0, 2, 1, 3], 0, 0.12, 0.6);
    // 「全村的希望」：一个轻的引文铃
    M(bell(mtof(79), 2.2), cs(83), 0.14);
    // 「回购 1,120 亿」：稳低音
    X(boom(1.6, 70, 40), cs(85), 0.32);
    // 「营收 7,518 亿」：动机回来
    motifBox(M, cs(86), 0.4, 0.24);
    // 「净利三成」
    M(bell(mtof(81), 2.0), cs(87), 0.15);
    // 「14.18 亿」：铃成串
    [78, 81, 83, 86, 90].forEach((m, k) => M(bell(mtof(m), 1.6), cs(88) + k * 0.14, 0.1));
    // 「AI 全线压上」：一点机器脉冲
    grid(cs(89), cs(90), 0.14, (t, k) => M(pulse(62 + (k % 3) * 2, 0.1, {cut: 2400}), t, 0.05));
  }

  /* ============ 15. 收尾 cs(90)–end：悬着，不解决 ============ */
  {
    const t0 = cs(90);
    padSpan(CH.Am, t0, seconds - 1.2, 0.34, {atk: 1.0, rel: 1.6, cut: 900});
    padSpan(CH.G, cs(93), seconds - 1.2, 0.26, {atk: 0.8, rel: 1.6, cut: 700});
    arp(t0, cs(97), 1.1, CH.Am, [0, 1, 2, 3], 0, 0.1, 0.45);
    // 动机最后一次，只给三个音，最后一个不落
    [62, 66, 69].forEach((m, k) => M(bell(mtof(m), 3.6), t0 + 0.6 + k * 0.62, 0.15));
    // 「还爬得起来吗」：一个向上的滑音，悬在半空
    X(swell(3.2, {from: 240, to: 1400}), cs(97) - 0.4, 0.24);
    M(pluck(mtof(57), 3.2, 0.2), cs(97) + 0.3, 0.18);
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
    [cs(8), '创立'],
    [cs(16), '卖不掉'],
    [cs(20), '融资救场'],
    [cs(24), '盈利与 MIH'],
    [cs(32), '上市'],
    [cs(36), '变现'],
    [cs(42), '3Q 大战'],
    [cs(49), '微信'],
    [cs(57), '红包'],
    [cs(64), '巅峰'],
    [cs(69), '寒冬'],
    [cs(75), '坠落'],
    [cs(82), '复苏'],
    [cs(90), '收尾'],
  ],
});
