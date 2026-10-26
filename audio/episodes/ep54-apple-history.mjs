// 第五十四期「苹果 50 年」Vox 解说 BGM → public/audio/ep54-apple-history/bgm.wav
//
// 主线是「不是先做，是做到让人排队」：车库 → 上市 → 被赶走 → 十二年 → 回来 → 手机 → 万亿。
//
// 贯穿全片的四音动机 A–C–E–A（一个很干净的上行大三和弦 + 八度），
// 在车库 / Apple II / 回来 / iPhone / 5 万亿 / 收尾 各出现一次，配器一次比一次满：
// 八音盒 → 拨弦 → 方波 + 铺底 → 满编 + 铃。
//
// 掉下去两次：1985 被赶走、1997 离破产 90 天（都 sink()，抽掉鼓，只留低音和钟表）。
// 冲上去三次：1980 上市、2007 iPhone、2025–2026 四万亿到五万亿。
import {bell, hat, kick, mixInto, mtof, pluck, setSeed, snap, shaker, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, up, writeScore} from '../score.mjs';

const EP = 'ep54-apple-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：A–C–E–A */
const MOTIF = [69, 72, 76, 81];
const motifBox = (M, at, step = 0.44, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs}) {
  setSeed(54);
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

  /* ============ 1. 钩子 0–cs(8)：五万亿、只有两家、两次只剩几个月 ============ */
  {
    const t1 = cs(8);
    padSpan(CH.Dm.map((m) => m - 12), 0, cs(5), 0.4, {atk: 1.8, rel: 0.8, cut: 560});
    tickTock(0.5, cs(6), 0.5, 0.26);
    // 「一度到 5 万亿美元」：一个大数字落下来
    X(boom(2.4, 74, 30), cs(1), 0.5);
    M(bell(mtof(81), 2.2), cs(1) + 0.1, 0.16);
    // 「只有两家」
    M(pluck(mtof(57), 1.2, 0.3), cs(2), 0.22);
    M(pluck(mtof(60), 1.2, 0.3), cs(2) + 0.18, 0.18);
    // 「50 年前，一间车库」：动机第一次，八音盒，很远
    motifBox(M, cs(3), 0.5, 0.22);
    // 「1,300 美元，一辆旧车一台计算器」：干、薄、有点土
    M(pluck(mtof(45), 1.0, 0.16), cs(4), 0.28);
    M(pluck(mtof(52), 0.8, 0.14), cs(4) + 0.22, 0.18);
    // 「两次离关门只剩几个月」：两下闷响
    [0, 1.7].forEach((d, k) => X(boom(1.8, 70 - k * 8, 32 + k * 6), cs(6) + d, 0.44));
    padSpan(CH.Am.map((m) => m - 12), cs(6), t1 + 0.4, 0.38, {atk: 0.4, rel: 0.6, cut: 900});
    // 「把它这 50 年拉出来看」：倒卷
    X(swell(t1 - cs(7), {from: 260, to: 5200}), cs(7), 0.34);
  }

  /* ============ 2. 车库 1976 cs(8)–cs(13)：C 大调，朴素、慢 ============ */
  {
    const t0 = cs(8), t1 = cs(13), beat = 0.68, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar + 0.2, 0.3, {atk: 0.5, rel: 0.6, cut: 1400}));
    arp(t0 + 0.4, t1, bar / 4, CH.C, [0, 2, 1, 3], 0, 0.14, 0.4);
    // 「1976 年 4 月 1 日」
    X(boom(1.2, 62, 40), t0 + 0.1, 0.3);
    // 「三个人」：三个上行的短音
    [0, 0.5, 1.0].forEach((d, k) => M(pluck(mtof(60 + k * 4), 0.9, 0.3), t0 + 1.6 + d, 0.18));
    // 「韦恩 11 天后退出」：一个下行的拨弦，走掉
    [[0, 64], [0.5, 60], [1.0, 55]].forEach(([d, m]) => M(pluck(mtof(m), 1.0, 0.25), cs(11) + 0.2 + d, 0.2));
  }

  /* ============ 3. Apple II / 上市 cs(13)–cs(22)：轻快 → 鼓进来 ============ */
  {
    const t0 = cs(13), t1 = cs(18), beat = 0.62, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.26, {atk: 0.3, rel: 0.4, cut: 1800}));
    sqArp(t0, t1, beat / 2, CH.C, [0, 1, 2, 3], 12, 0.1);
    drums(t0 + beat, t1, beat, 0.55);
    // 「Apple 二才是真正的开始」
    motifBox(M, cs(16), 0.42, 0.24);
    // 上市：鼓加倍，铃声，动机第二次
    const t2 = cs(18);
    bars(t2, cs(22), bar, [CH.F, CH.C, CH.G, CH.C], (t, c, b) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 2600}));
    drums(t2, cs(22), beat, 0.95);
    arp(t2, cs(22), bar / 8, CH.C, [0, 2, 1, 3, 2, 1], 12, 0.12, 0.7);
    motifFull(cs(19), 0.2);
    X(crash(2.4), cs(19), 0.3);
    // 「17.8 亿」「4 个亿万富翁」
    X(boom(2, 78, 34), cs(20), 0.46);
    [79, 84, 88].forEach((m, k) => M(bell(mtof(m), 1.8), cs(21) + k * 0.18, 0.14));
  }

  /* ============ 4. Mac 1984 cs(22)–cs(29)：明亮方波 + 希望 ============ */
  {
    const t0 = cs(22), t1 = cs(29), beat = 0.6, bar = beat * 4;
    // Lisa 太贵：一个落空的和弦
    padSpan(CH.Bb, t0, cs(23) + 0.3, 0.26, {atk: 0.2, rel: 0.5, cut: 900});
    M(pluck(mtof(46), 1.4, 0.18), t0 + 0.2, 0.26);
    bars(cs(23), t1, bar, [CH.Cadd9, CH.G, CH.F, CH.Cadd9], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.2, rel: 0.4, cut: 2400}));
    drums(cs(23), t1, beat, 0.7);
    sqArp(cs(23), t1, beat / 2, CH.Cadd9, [0, 1, 2, 1], 12, 0.11, {cut: 2200});
    // 「2,495 美元」：一下亮的铃声
    M(bell(mtof(84), 2.2), cs(26), 0.2);
    X(boom(1.4, 74, 38), cs(26), 0.3);
    // 「128K 内存，没有硬盘，不能扩展」：鼓抽掉，只剩两个短音
    grid(cs(28), cs(29), 0.5, (t, k) => M(pluck(mtof([57, 55][k % 2]), 0.9, 0.2), t, 0.2));
  }

  /* ============ 5. 1985 被赶走 cs(29)–cs(33)：全片第一次掉下去 ============ */
  {
    const t0 = cs(29), t1 = cs(33);
    padSpan(CH.Dm, t0, t1 + 0.6, 0.3, {atk: 0.6, rel: 0.8, cut: 600});
    // 销量掉下来
    X(fall(2.2, 420, 90), t0 + 0.1, 0.3);
    // 「董事会收走他的经营权」：一下闷响，鼓从此消失
    sink(cs(31), {low: 24, g: 0.7, dur: 2.6});
    tickTock(cs(31), t1, 0.62, 0.24);
    // 「只留一股」：一个孤零零的高音
    M(bell(mtof(76), 3.2), cs(32) + 1.4, 0.16);
  }

  /* ============ 6. 十二年 cs(33)–cs(39)：长音、钟表、缓慢下沉 ============ */
  {
    const t0 = cs(33), t1 = cs(39);
    padSpan(CH.Am.map((m) => m - 12), t0, cs(35) + 0.4, 0.32, {atk: 1.2, rel: 1.0, cut: 520});
    padSpan(CH.Fm.map((m) => m - 12), cs(35), cs(38), 0.3, {atk: 1.0, rel: 1.0, cut: 480});
    tickTock(t0, cs(38), 0.66, 0.22);
    // 一条缓慢下行的低音，十二年
    [[0, 45], [2.2, 44], [4.4, 43], [6.6, 41]].forEach(([d, m]) => M(pluck(mtof(m), 3.2, 0.12), t0 + d, 0.26));
    // 「离破产只剩 90 天」
    sink(cs(38), {low: 22, g: 0.8, dur: 3.0});
    padSpan(CH.Fm.map((m) => m - 12), cs(38), t1 + 0.4, 0.34, {atk: 0.4, rel: 0.8, cut: 440});
  }

  /* ============ 7. 回来 cs(39)–cs(45)：从最低点往上爬 ============ */
  {
    const t0 = cs(39), t1 = cs(45), beat = 0.58, bar = beat * 4;
    // 4.29 亿美元买下 NeXT：一个转折的和弦
    padSpan(CH.Fm, t0, cs(41), 0.3, {atk: 0.4, rel: 0.6, cut: 800});
    X(boom(1.8, 66, 34), t0, 0.4);
    bars(cs(41), t1, bar, [CH.Bb, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.3, rel: 0.5, cut: 1600}));
    drums(cs(41), t1, beat, 0.75);
    arp(cs(41), t1, bar / 4, CH.F, [0, 1, 2, 3], 0, 0.13, 0.55);
    // 「临时 CEO」：动机回来，八音盒
    motifBox(M, cs(41), 0.4, 0.26);
    // 「微软投了 1.5 亿美元」：一下亮的落点
    M(bell(mtof(79), 2.0), cs(43), 0.18);
    X(boom(1.4, 72, 38), cs(43), 0.32);
    // 「台下在嘘」：一个不协和的短音，收住
    M(pulse(58, 0.5, {cut: 1200}), cs(44) + 0.9, 0.12);
  }

  /* ============ 8. 砍产品线 / iMac cs(45)–cs(51)：断奏 → 清亮 ============ */
  {
    const t0 = cs(45), t1 = cs(48), beat = 0.52;
    // 15 条砍到 4 格：干脆的断奏，留白
    padSpan(CH.C, t0, t1, 0.24, {atk: 0.15, rel: 0.3, cut: 1500});
    grid(t0, t1, beat / 2, (t, k) => {
      D(k % 4 === 0 ? K : Sh, t, 0.3);
      if (k % 2 === 0) M(pulse(CH.C[(k / 2) % 4], 0.12, {cut: 1800}), t, 0.09);
    });
    // 「决定不做什么，和做什么一样重要」：一句留白
    M(pluck(mtof(60), 2.4, 0.3), cs(47) + 1.2, 0.2);
    // iMac：清亮，重新开始
    const t2 = cs(48), t3 = cs(51), bar2 = 0.58 * 4;
    bars(t2, t3, bar2, [CH.Cadd9, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar2, 0.3, {atk: 0.2, rel: 0.4, cut: 2600}));
    drums(t2, t3, 0.58, 0.72);
    arp(t2, t3, bar2 / 8, CH.Cadd9, [0, 2, 1, 3], 12, 0.12, 0.75);
    motifBox(M, cs(49), 0.4, 0.22);
    X(boom(1.4, 76, 40), cs(50), 0.3);
  }

  /* ============ 9. iPod / iPhone cs(51)–cs(59)：律动 → 爆发 ============ */
  {
    const t0 = cs(51), t1 = cs(54), beat = 0.54, bar = beat * 4;
    bars(t0, t1, bar, [CH.Am, CH.F, CH.C, CH.G], (t, c) => padSpan(c, t, t + bar, 0.28, {atk: 0.2, rel: 0.4, cut: 2000}));
    drums(t0, t1, beat, 0.8);
    sqArp(t0, t1, beat / 2, CH.Am, [0, 1, 2, 1], 12, 0.1, {cut: 1900});
    // 「1,000 首歌」：一串快速的铃
    for (let k = 0; k < 8; k++) M(bell(mtof(72 + (k % 4) * 3), 0.7), cs(52) + k * 0.09, 0.07);
    // iPhone：蓄力 → 爆发
    const t2 = cs(54), t3 = cs(59);
    padSpan(CH.F, t2, cs(55) + 0.2, 0.28, {atk: 0.6, rel: 0.4, cut: 900});
    X(swell(cs(55) - t2, {from: 300, to: 6400}), t2, 0.34);
    X(boom(2.6, 80, 34), cs(55), 0.52);
    X(crash(2.6), cs(55), 0.32);
    motifFull(cs(55), 0.22);
    drums(cs(55), t3, 0.56, 1.0);
    bars(cs(55), t3, 0.56 * 4, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + 2.24, 0.34, {atk: 0.15, rel: 0.3, cut: 3000}));
    sqArp(cs(55), t3, 0.28, CH.C, [0, 2, 1, 3], 12, 0.09, {cut: 2600});
    // App Store 500 个应用
    [84, 88, 91].forEach((m, k) => M(bell(mtof(m), 1.4), cs(58) + k * 0.12, 0.1));
  }

  /* ============ 10. iPad / 告别 cs(59)–cs(66)：开阔 → 全停 ============ */
  {
    const t0 = cs(59), t1 = cs(62), beat = 0.6, bar = beat * 4;
    bars(t0, t1, bar, [CH.Cadd9, CH.G, CH.F, CH.C], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.3, rel: 0.5, cut: 2400}));
    drums(t0, t1, beat, 0.62);
    arp(t0, t1, bar / 4, CH.Cadd9, [0, 1, 2, 3], 0, 0.11, 0.6);
    // 市值超过微软
    X(boom(1.6, 78, 36), cs(60), 0.38);
    // 告别：抽掉一切，只剩一个和弦和动机的最后两个音
    const t2 = cs(62);
    padSpan(CH.Am.map((m) => m - 12), t2, cs(66) + 0.6, 0.34, {atk: 1.2, rel: 1.4, cut: 520});
    [69, 72].forEach((m, k) => M(bell(mtof(m), 3.4), t2 + 1.2 + k * 0.5, 0.14));
    tickTock(t2 + 2, cs(64), 0.9, 0.18);
    X(fall(2.4, 380, 80), cs(64), 0.26);
    X(boom(3, 56, 26), cs(64) + 0.2, 0.5);
    // 「营收 1,083 亿美元」：一个远处的铃，不庆祝
    M(bell(mtof(81), 3.2), cs(65), 0.13);
  }

  /* ============ 11. 库克 cs(66)–cs(71)：稳、企业感 ============ */
  {
    const t0 = cs(66), t1 = cs(71), beat = 0.56, bar = beat * 4;
    bars(t0, t1, bar, [CH.F, CH.C, CH.G, CH.Am], (t, c) => padSpan(c, t, t + bar, 0.3, {atk: 0.2, rel: 0.4, cut: 1800}));
    drums(t0, t1, beat, 0.85);
    arp(t0, t1, bar / 8, CH.F, [0, 2, 1, 3], 0, 0.1, 0.5);
    // 「3,500 亿」接手
    X(boom(1.4, 70, 38), t0 + 0.1, 0.32);
    // Watch / AirPods：两个干净的响指
    D(S, cs(69), 0.3);
    D(S, cs(70), 0.3);
  }

  /* ============ 12. 一万亿到三万亿 cs(71)–cs(80)：层层加满 ============ */
  {
    const t0 = cs(71), t1 = cs(76), beat = 0.52, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.32, {atk: 0.15, rel: 0.3, cut: 2800}));
    drums(t0, t1, beat, 0.95);
    arp(t0, t1, bar / 8, CH.C, [0, 1, 2, 3, 2, 1], 12, 0.12, 0.7);
    // 一万亿：动机满编 + 镲
    motifFull(cs(71), 0.24);
    X(crash(2.8), cs(71), 0.34);
    X(boom(2.4, 80, 34), cs(71), 0.5);
    // M1：一个短短的机器音
    grid(cs(74), cs(75), 0.14, (t, k) => M(pulse(60 + (k % 3) * 2, 0.1, {cut: 2400}), t, 0.05));
    // 三万亿 + 服务：高频铃叠上来，代表毛利
    const t2 = cs(76), t3 = cs(80);
    bars(t2, t3, bar, [CH.F, CH.C, CH.G, CH.C], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.15, rel: 0.3, cut: 3400}));
    drums(t2, t3, beat, 1.0);
    for (let k = 0; k < 24; k++) M(bell(mtof([84, 88, 91, 96][k % 4]), 1.0), cs(78) + k * 0.22, 0.055);
    motifFull(cs(76), 0.22, 12);
    X(crash(3), cs(76), 0.3);
  }

  /* ============ 13. AI 落后 cs(80)–cs(85)：不协和、迟疑 ============ */
  {
    const t0 = cs(80), t1 = cs(85);
    // 一个悬着的、没有解决的和弦
    padSpan([48, 54, 55, 60], t0, cs(83), 0.3, {atk: 0.5, rel: 0.8, cut: 700});
    // 迟疑的、不规律的脉冲
    [0, 0.42, 1.3, 1.62, 2.4].forEach((d, k) => M(pulse([55, 55, 56, 55, 54][k], 0.2, {cut: 900}), t0 + 0.4 + d, 0.11));
    tickTock(t0, cs(83), 0.74, 0.2);
    // Vision Pro：一个昂贵、空洞的铃声
    M(bell(mtof(88), 3.2), cs(83), 0.16);
    X(boom(2, 58, 30), cs(83), 0.34);
    padSpan(CH.Fm.map((m) => m - 12), cs(83), t1 + 0.4, 0.3, {atk: 0.4, rel: 0.8, cut: 520});
    // 「没成为下一个 iPhone」：往下一沉
    X(fall(2, 320, 80), cs(84), 0.24);
  }

  /* ============ 14. 四万亿 → 五万亿 cs(85)–cs(90)：全片最满 ============ */
  {
    const t0 = cs(85), t1 = cs(90), beat = 0.5, bar = beat * 4;
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(up(c, 12), t, t + bar, 0.3, {atk: 0.1, rel: 0.25, cut: 3600}));
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => padSpan(c, t, t + bar, 0.34, {atk: 0.1, rel: 0.25, cut: 2400}));
    drums(t0, t1, beat, 1.1);
    arp(t0, t1, bar / 8, CH.C, [0, 1, 2, 3, 2, 3], 12, 0.14, 0.8);
    // 四万亿
    X(crash(3), cs(85), 0.36);
    X(boom(2.6, 82, 34), cs(85), 0.52);
    motifFull(cs(85), 0.26);
    // 五万亿：再叠一层高八度 + 镲
    X(crash(3.4), cs(86), 0.4);
    X(boom(3, 86, 32), cs(86), 0.56);
    motifFull(cs(86), 0.24, 12);
    // 换帅：一个稳的低音，收住热闹
    padSpan(CH.F, cs(88), cs(90), 0.28, {atk: 0.3, rel: 0.6, cut: 1200});
    X(boom(1.6, 66, 40), cs(88), 0.3);
  }

  /* ============ 15. 收尾 cs(90)–end：悬着，不解决 ============ */
  {
    const t0 = cs(90);
    padSpan(CH.Am, t0, seconds - 1.2, 0.34, {atk: 1.0, rel: 1.6, cut: 900});
    padSpan(CH.F, cs(93), seconds - 1.2, 0.28, {atk: 0.8, rel: 1.6, cut: 700});
    arp(t0, cs(96), 1.1, CH.Am, [0, 1, 2, 3], 0, 0.1, 0.45);
    // 动机最后一次，只给三个音，最后一个不落
    [69, 72, 76].forEach((m, k) => M(bell(mtof(m), 3.6), t0 + 0.6 + k * 0.62, 0.15));
    // 「这一次，还管用吗」：一个向上的滑音，悬在半空
    X(swell(3.2, {from: 240, to: 1400}), cs(96) - 0.4, 0.24);
    M(pluck(mtof(57), 3.2, 0.2), cs(96) + 0.3, 0.18);
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
    [cs(8), '车库'],
    [cs(13), 'Apple II'],
    [cs(18), '上市'],
    [cs(22), 'Mac'],
    [cs(29), '被赶走'],
    [cs(33), '十二年'],
    [cs(39), '回来'],
    [cs(45), '砍产品线'],
    [cs(48), 'iMac'],
    [cs(51), 'iPod'],
    [cs(54), 'iPhone'],
    [cs(59), 'iPad'],
    [cs(62), '告别'],
    [cs(66), '库克'],
    [cs(71), '一万亿'],
    [cs(76), '三万亿'],
    [cs(80), 'AI 落后'],
    [cs(85), '五万亿'],
    [cs(90), '收尾'],
  ],
});
