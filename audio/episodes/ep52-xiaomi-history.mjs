// 第五十二期「小米 16 年」Vox 解说 BGM → public/audio/ep52-xiaomi-history/bgm.wav
//
// 逐段写总谱。主线是「两种评价」：1999 元的手机和 25 万的车是同一家公司。
//
// 贯穿全片的是一个四音动机 C–E–G–C（「小米加步枪」往上走一小步），
// 在 银谷大厦 / MIUI 开机画面 / 1999 图腾 / MIX / 1.55 万亿 / 收尾 各出现一次，
// 配器一次比一次满：八音盒 → 拨弦 → 方波 → 铺底 + 钟琴 → 全停只留八音盒。
//
// 三次掉下去：2016 跌出前五、2018 破发、2026 腰斩（每次都抽掉鼓、只留低音和钟表）；
// 两次冲上去：1999 元（第一波）和 2025 顶点（全片最高，128 BPM + 两次升调）；
// 造车是中间那个大赌注，SU7 上市是第二高潮。
import {bass, bell, filterBuf, hat, kick, mixInto, mtof, pluck, reverb, rnd, setSeed, shaker, snap, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, up, wind, writeScore} from '../score.mjs';

const EP = 'ep52-xiaomi-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音动机：C–E–G–C */
const MOTIF = [72, 76, 79, 84];
/** 动机的八音盒版本，step 控制音与音的间隔 */
const motifBox = (M, at, step = 0.42, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs, cwT}) {
  setSeed(52);
  const n = Math.ceil(seconds * SR);
  const mus = new Float32Array(n);
  const drm = new Float32Array(n);
  const fx = new Float32Array(n);
  const M = (buf, at, g) => mixInto(mus, buf, at, g);
  const D = (buf, at, g) => mixInto(drm, buf, at, g);
  const X = (buf, at, g) => mixInto(fx, buf, at, g);

  const K = kick(), S = snap(), Hc = hat(), Ho = hat(true), Sh = shaker();
  const padSpan = (chord, t0, t1, g, o) => M(pad(chord, Math.max(0.2, t1 - t0), o), t0, g);
  /** 按小节走和弦：每小节 fn(起点秒, 和弦, 第几小节) */
  const bars = (t0, t1, bar, prog, fn) => grid(t0, t1, bar, (t, b) => fn(t, prog[b % prog.length], b));
  /** 拨弦琶音 */
  const arp = (t0, t1, step, chord, pat, oct, g, bright = 0.5) => grid(t0, t1, step, (t, k) => M(pluck(mtof(chord[pat[k % pat.length]] + oct), 0.7, bright), t, g));
  /** 方波琶音：机器、软件、发布会 */
  const sqArp = (t0, t1, step, chord, pat, oct, g, o = {}) => grid(t0, t1, step, (t, k) => M(pulse(chord[pat[k % pat.length]] + oct, 0.14, {decay: 16, ...o}), t, g));
  /** 标准鼓：四拍底鼓、二四拍军鼓、八分踩镲 */
  const drums = (t0, t1, beat, g = 1) =>
    grid(t0, t1, beat, (t, k) => {
      D(K, t, 0.55 * g);
      if (k % 2) D(S, t, 0.36 * g);
      D(Hc, t, 0.08 * g);
      D(k % 2 ? Ho : Hc, t + beat / 2, 0.07 * g);
    });
  const tickTock = (t0, t1, step, g) => grid(t0, t1, step, (t, b) => D(tick(b % 2 === 0), t, g));
  /** 掉下去的标准动作：下坠 + 闷响 + 只剩低音 */
  const sink = (at, {low = 26, g = 0.65, dur = 2.4} = {}) => {
    X(fall(1.5, 520, 70), at, 0.34);
    X(boom(dur, 58, low), at + 0.12, g);
  };

  /* ================= 1. 钩子 0–22.5s：6614 亿 vs 1.55 万亿，砍掉一半和月卖 4 万台是同一家 ================= */
  {
    const t1 = cs(8);
    // 冷静的 A 小调铺底 + 钟表：像在翻一份财报
    padSpan(CH.Am.map((m) => m - 12), 0, cs(6), 0.4, {atk: 1.6, rel: 0.6, cut: 620});
    tickTock(0.5, cs(7), 0.5, 0.28);
    grid(cs(1), cs(6), 0.5, (t, k) => {
      M(pulse([45, 45, 48, 45][k % 4], 0.22, {decay: 9, cut: 900}), t, 0.11);
      if (k % 2 === 0) {
        D(K, t, 0.32);
        D(K, t + 0.18, 0.2);
      }
    });
    // 「一年前 1.55 万亿」：一个往上爬的方波序列，越爬越高
    grid(cs(2), cwT(2, '1.55'), 0.14, (t, k) => M(pulse(57 + Math.floor(k / 5) * 2, 0.12, {decay: 20, cut: 1500 + k * 90}), t, 0.05 + k * 0.004));
    X(swell(cwT(2, '1.55') - cs(2)), cs(2), 0.3);
    X(boom(1.8, 78, 36), cwT(2, '1.55'), 0.5);
    // 「一半没了」：直接掉下去
    sink(cwT(3, '一半'), {low: 24, g: 0.7, dur: 2});
    // 「月交付破 4 万台」：一个突兀的亮音，跟上一句形成对比
    [84, 88].forEach((m, k) => M(bell(mtof(m), 1.4), cs(4) + k * 0.18, 0.11));
    M(pluck(mtof(72), 1.2, 0.7), cs(4), 0.16);
    // 「同一家」：不协和的二度，悬着
    X(boom(1.6, 74, 40), cwT(5, '同一家'), 0.5);
    M(pad([45, 46, 52, 57], 1.6, {atk: 0.05, rel: 0.5, cut: 1400}), cwT(5, '同一家'), 0.2);
    // 「16 年里两种评价」：换成 D 小调，留一个问题
    padSpan(CH.Dm, cs(6), t1 + 0.3, 0.42, {atk: 0.4, rel: 0.5, cut: 1200});
    [[0, 74], [1.4, 72], [2.8, 69]].forEach(([d, m]) => M(pluck(mtof(m), 1.8, 0.3), cs(6) + 0.3 + d, 0.14));
    // 「把时间线拉出来看」：倒卷回 2010
    X(swell(t1 - cs(7), {from: 260, to: 5000}), cs(7), 0.36);
    X(fall(1.5, 900, 220), t1 - 0.5, 0.1);
  }

  /* ================= 2. 2010 银谷大厦 22.5–43.3s：C 大调 100 BPM，暖、朴素、有点土 ================= */
  {
    const t0 = cs(8), t1 = cs(15), beat = 0.6, bar = beat * 4;
    const apple = cs(13); // 「那年苹果已经定义了什么叫好手机」：从这里暗一点
    X(boom(1.4, 68, 40), t0, 0.4);
    bars(t0, t1, bar, [CH.C, CH.Am, CH.F, CH.G], (t, c, b) => {
      const dark = t >= apple - 0.01;
      const ch = dark ? [CH.Am, CH.F, CH.C, CH.G][b % 4] : c;
      M(pad(ch, bar + 0.3, {atk: 0.3, rel: 0.3, cut: dark ? 800 : 1000}), t, 0.2);
      arp(t, Math.min(t + bar, t1), beat / 2, ch, [0, 2, 1, 3, 2, 1, 3, 2], 12, dark ? 0.13 : 0.21, 0.6);
      M(bass(mtof(ch[0] - 12), 0.5), t, 0.36);
      M(bass(mtof(ch[0] - 12), 0.4), t + 2 * beat, 0.28);
      if (!dark) grid(t, t + bar, beat / 2, (tt, k) => D(Sh, tt, k % 2 ? 0.06 : 0.1));
    });
    // 「十四个人，一锅小米粥」：三个暖的铃音
    [76, 79, 84].forEach((m, k) => M(bell(mtof(m), 1.6), cs(9) + k * 0.22, 0.1));
    // 「雷军 40 岁，刚离开金山」：一下低音落地
    X(boom(1.2, 62, 40), cs(10), 0.32);
    // 「办一家世界级的公司」：往上
    arp(cs(11), cs(12), 0.12, CH.F, [0, 1, 2, 3, 2, 1], 24, 0.12, 0.8);
    // 「名字取自一句老话：小米加步枪」：四音动机第一次出现，八音盒
    motifBox(M, cs(12), 0.44, 0.26);
    padSpan(CH.C, cs(12), cs(13) + 0.4, 0.3, {atk: 0.3, rel: 0.4, cut: 1500});
    // 「国产机还在山寨」：一句落回去，鼓没了
    padSpan(CH.Am.map((m) => m - 12), cs(14), t1 + 0.2, 0.34, {atk: 0.3, rel: 0.3, cut: 560});
    [[0, 57], [1.2, 55], [2.4, 52]].forEach(([d, m]) => M(pluck(mtof(m), 1.4, 0.2), cs(14) + 0.2 + d, 0.22));
  }

  /* ================= 3. MIUI 43.3–60.5s：极简，只有一点点声音——「一件不花什么钱的事」 ================= */
  {
    const t0 = cs(15), t1 = cs(21);
    padSpan(CH.C, t0, cs(19), 0.24, {atk: 1, rel: 0.5, cut: 900});
    // 每两秒一个单音，留白
    grid(t0, cs(19), 2, (t, k) => M(pluck(mtof([72, 74, 76, 79][k % 4]), 1.8, 0.4), t, 0.2));
    // 「不花什么钱的事」：一声很低的重音
    X(boom(1.4, 60, 34), t0, 0.3);
    // 「MIUI，一个改过的安卓」：软件感，稀疏方波
    sqArp(cs(16), cs(17), 0.2, CH.C, [0, 2, 1, 3], 12, 0.07, {cut: 2200, decay: 14});
    // 「第一批用户，只有 100 个人」：孤零零一个铃音
    M(bell(mtof(84), 2.2), cs(17), 0.18);
    // 「雷军把名字做进了开机画面」：四音动机第二次，拨弦版，比第一次亮
    MOTIF.forEach((m, k) => M(pluck(mtof(m + 12), 1.4, 0.7), cs(18) + k * 0.18, 0.2));
    // 「先有用户，后有产品」：Cadd9 打开
    padSpan(CH.Cadd9, cs(19), cs(20) + 0.4, 0.34, {atk: 0.2, rel: 0.4, cut: 1800});
    [79, 84, 88].forEach((m, k) => M(bell(mtof(m), 1.6), cs(19) + k * 0.3, 0.1));
    // 「这个顺序，是后来所有争议的起点」：不解决的和弦 + 钟表
    M(pad([45, 52, 57, 58], t1 - cs(20) + 0.5, {atk: 0.1, rel: 0.6, cut: 1300}), cs(20), 0.26);
    tickTock(cs(20), t1, 0.5, 0.2);
  }

  /* ================= 4. 2011/1999 年 60.5–80.5s：第一波高潮，C 大调 120 BPM ================= */
  {
    const t0 = cs(21), t1 = cs(28), beat = 0.5, bar = 2;
    X(crash(2.4), t0, 0.3);
    X(boom(2, 82, 32), t0, 0.7);
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => {
      M(pad(c, bar + 0.2, {atk: 0.05, rel: 0.3, cut: 2300}), t, 0.28);
      sqArp(t, Math.min(t + bar, t1), beat / 4, c, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.08, {cut: 3400, decay: 20});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(c[0] - 12 + (k % 2 ? 12 : 0)), 0.2), tt, 0.3));
      [[0, 2], [1.5, 3], [2, 2], [3, 1]].forEach(([bb, i]) => M(bell(mtof(c[i] + 24), 1), t + bb * beat, 0.06));
    });
    drums(t0, t1, beat);
    // 「雷军穿着黑 T 恤上台」：一下脚步式的低音
    X(boom(1, 66, 42), cs(22), 0.32);
    // 「1999 元」：一句话的重击 + 一串往下走的铃音
    const y99 = cwT(23, '1999');
    X(boom(2.2, 84, 34), y99, 0.75);
    for (let k = 0; k < 8; k++) M(bell(mtof(96 - k * 2), 0.9), y99 + k * 0.1, 0.05);
    // 「同配置国际品牌要 4000 以上」：往上顶一下
    arp(cs(24), cs(25), 0.125, CH.G, [0, 1, 2, 3, 2, 3], 24, 0.1, 0.8);
    // 「台下当场就炸了」
    X(crash(2), cwT(25, '炸'), 0.34);
    X(boom(1.6, 82, 36), cwT(25, '炸'), 0.55);
    // 「30 万台，5 分钟抢完」：一串急促的铃声往上冲
    for (let k = 0; k < 14; k++) M(bell(mtof(76 + (k % 5) * 3), 0.7), cs(26) + k * 0.075, 0.06 + k * 0.003);
    // 「1999 成了小米的图腾」：动机第三次，这里换成方波 + 铃音，最亮的一次
    const totem = cs(27);
    MOTIF.forEach((m, k) => {
      M(pulse(m + 12, 0.5, {width: 0.3, cut: 4000, decay: 8}), totem + k * 0.16, 0.16);
      M(bell(mtof(m + 24), 1.4), totem + k * 0.16, 0.09);
    });
    X(boom(2, 80, 34), totem, 0.5);
  }

  /* ================= 5. 红米 / 生态链 80.5–95.8s：还在往上，但更轻、更快 ================= */
  {
    const t0 = cs(28), t1 = cs(33), beat = 0.5, bar = 2;
    bars(t0, t1, bar, [CH.F, CH.C, CH.G, CH.Am], (t, c) => {
      M(pad(c, bar + 0.2, {atk: 0.08, rel: 0.3, cut: 1900}), t, 0.24);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3, 2, 1, 3, 2], 12, 0.19, 0.7);
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(c[0] - 12), 0.18), tt, 0.24));
      D(K, t, 0.5);
      D(K, t + 2 * beat, 0.42);
      if (t > cs(29)) grid(t, t + bar, beat / 2, (tt, k) => D(k % 2 ? Ho : Hc, tt, 0.07));
    });
    // 「红米 799 元」：一声重击，比 1999 那下轻一档
    X(boom(1.6, 80, 36), cwT(28, '799'), 0.55);
    // 「砸到千元以下」：一个硬的下切
    X(fall(0.7, 300, 120), cs(29), 0.14);
    // 「电视、电源、手环，一个接一个」：一个个加进来的短促音
    grid(cs(30), cs(31), 0.3, (t, k) => {
      M(pluck(mtof([72, 76, 79, 84][k % 4]), 0.6, 0.8), t, 0.1 + k * 0.012);
      M(pulse([48, 55, 60][k % 3], 0.16, {decay: 14, cut: 2200}), t, 0.08);
    });
    // 「手机少赚钱，用别的赚钱」：走动低音
    grid(cs(32), t1, 0.25, (t, k) => M(bass(mtof(41 + [0, 7, 12, 7][k % 4]), 0.22), t, 0.28));
    M(pad(CH.C, t1 - cs(32) + 0.4, {atk: 0.2, rel: 0.5, cut: 1500}), cs(32), 0.2);
  }

  /* ================= 6. 2014 巅峰 95.8–114.5s：第二次高潮，116 BPM 满编 ================= */
  {
    const t0 = cs(33), t1 = cs(39), beat = 60 / 116, bar = beat * 4;
    X(crash(2.2), t0, 0.3);
    X(boom(2, 84, 32), t0, 0.65);
    bars(t0, t1, bar, [CH.C, CH.F, CH.G, CH.Am], (t, c, b) => {
      const q = t >= cs(36); // 「质疑也来了」转暗
      const ch = q ? [CH.Am, CH.Fm, CH.Am, CH.E][b % 4] : c;
      M(pad(ch, bar + 0.2, {atk: 0.06, rel: 0.3, cut: q ? 900 : 2100}), t, q ? 0.3 : 0.26);
      if (!q) sqArp(t, Math.min(t + bar, t1), beat / 4, ch, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.085, {cut: 3400, decay: 20});
      else grid(t, Math.min(t + bar, t1), beat / 2, (tt, k) => M(pulse([45, 45, 48, 45][k % 4], 0.3, {decay: 8, cut: 800}), tt, 0.1));
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(ch[0] - 12), 0.2), tt, 0.28));
    });
    drums(t0, cs(36), beat);
    // 「6112 万台」+「估值 450 亿美元」：两下重击，中间撒一串铃音
    X(boom(1.8, 82, 34), cwT(34, '6112'), 0.6);
    X(boom(1.6, 84, 36), cwT(34, '450'), 0.55);
    for (let k = 0; k < 12; k++) M(bell(mtof([79, 83, 86, 91][k % 4]), 1.1), cs(34) + 0.5 + k * 0.09, 0.055);
    // 「全世界最贵的创业公司之一」：长音撑住
    padSpan(up(CH.C, 12), cs(35), cs(36), 0.22, {atk: 0.3, rel: 0.5, cut: 2400});
    // 「质疑也来了」之后：鼓抽掉，只剩钟表
    tickTock(cs(36), cs(38), 0.5, 0.26);
    X(boom(1.4, 62, 38), cs(36), 0.34);
    // 「真的是产能不够」：低音落回去
    padSpan(CH.Am.map((m) => m - 12), cs(37), t1 + 0.2, 0.36, {atk: 0.2, rel: 0.3, cut: 540});
    grid(cs(37), t1, 0.5, (t, k) => D(K, t, k % 2 ? 0.2 : 0.34));
  }

  /* ================= 7. 2016 危机 114.5–128.6s：第一次掉下去，跌出中国前五 ================= */
  {
    const t0 = cs(38) + 1, t1 = cs(44);
    sink(cs(39), {low: 22, g: 0.8, dur: 2.8});
    padSpan(CH.Am.map((m) => m - 24), cs(39), cs(42), 0.42, {atk: 0.6, rel: 0.6, cut: 420});
    X(wind(t1 - cs(39) + 1), cs(39), 0.16);
    tickTock(cs(39), cs(42), 0.6, 0.3);
    // 「第一次没完成目标」：一下很轻的落空
    X(boom(1, 56, 34), t0, 0.24);
    // 「供应链也出了大问题」：第二次下坠
    sink(cs(41), {low: 20, g: 0.55, dur: 1.8});
    // 「雷军自己接管手机部」：心跳一样的脉冲
    grid(cs(42), cs(43), 0.55, (t) => {
      D(K, t, 0.38);
      D(K, t + 0.2, 0.24);
    });
    M(pad([45, 52, 57], cs(43) - cs(42) + 0.4, {atk: 0.3, rel: 0.4, cut: 900}), cs(42), 0.22);
    // 「那一年，他们说：我们生病了」：最暗的一下，只剩一个远的重音
    X(boom(2.6, 62, 24), cs(43), 0.6);
    padSpan([33, 45, 52], cs(43), t1 + 0.6, 0.34, {atk: 0.5, rel: 0.8, cut: 500});
    // 为 MIX 留一个渐强
    X(swell(1.6, {from: 240, to: 4200}), t1 - 1.6, 0.3);
  }

  /* ================= 8. MIX / 小米之家 128.6–141s：转机，F 大调亮起来 ================= */
  {
    const t0 = cs(44), t1 = cs(48), beat = 0.6, bar = beat * 4;
    M(pad(CH.F, t1 - t0 + 0.4, {atk: 0.4, rel: 0.6, cut: 1500}), t0, 0.34);
    // 「小米 MIX」：动机第四次，铺底 + 钟琴，第一次有分量
    motifBox(M, t0 + 0.2, 0.4, 0.3);
    MOTIF.forEach((m, k) => M(bell(mtof(m + 12), 2.2), t0 + 0.2 + k * 0.4, 0.12));
    X(boom(1.8, 74, 38), t0, 0.45);
    // 「屏占比 91%，全面屏」：一片很亮的铃声铺开
    for (let k = 0; k < 10; k++) M(bell(mtof([84, 88, 91, 96, 100][k % 5]), 2), cs(45) + k * 0.1, 0.06);
    // 「把便宜两个字撕开一点」：一个干脆的切音
    X(fall(0.9, 700, 240), cs(46), 0.16);
    arp(cs(46), cs(47), 0.15, CH.F, [0, 2, 3, 2, 1, 2], 24, 0.11, 0.85);
    // 「小米之家开始一家家开」：拨弦一个个往上，像店一家家亮灯
    grid(cs(47), t1, 0.32, (t, k) => {
      const m = [65, 69, 72, 77, 81, 84][Math.min(5, Math.floor(k / 2))];
      M(pluck(mtof(m), 1.2, 0.75), t, 0.14 + k * 0.006);
      if (k % 2 === 0) M(bass(mtof(41), 0.3), t, 0.26);
    });
    bars(cs(47), t1, bar, [CH.F, CH.G], (t, c) => {
      M(pad(c, bar + 0.2, {atk: 0.2, rel: 0.3, cut: 1800}), t, 0.16);
      D(K, t, 0.36);
      D(K, t + 2 * beat, 0.3);
    });
  }

  /* ================= 9. 2017 反弹 141–152.2s：124 BPM，稳稳地往上 ================= */
  {
    const t0 = cs(48), t1 = cs(52), beat = 60 / 124, bar = beat * 4;
    X(boom(1.8, 82, 34), t0, 0.55);
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c, b) => {
      M(pad(c, bar + 0.2, {atk: 0.06, rel: 0.3, cut: 2000 + b * 150}), t, 0.27);
      sqArp(t, Math.min(t + bar, t1), beat / 4, c, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.08, {cut: 3300, decay: 20});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(c[0] - 12 + (k % 2 ? 12 : 0)), 0.2), tt, 0.3));
    });
    drums(t0, t1, beat);
    // 「印度市场份额第一」：一声镲
    X(crash(2), cs(49), 0.3);
    X(boom(1.4, 80, 38), cs(49), 0.45);
    // 「全年出货 9240 万台」：重击 + 一串铃声
    X(boom(1.8, 84, 34), cwT(50, '9240'), 0.6);
    for (let k = 0; k < 10; k++) M(bell(mtof([79, 84, 88, 91][k % 4]), 0.9), cs(50) + 0.4 + k * 0.08, 0.05);
    // 「从悬崖边回到牌桌」：一个拉长的上行
    X(swell(1.2), cs(51) - 1.2, 0.3);
    padSpan(CH.C, cs(51), t1 + 0.2, 0.3, {atk: 0.1, rel: 0.4, cut: 2200});
  }

  /* ================= 10. 港交所 152.2–166.8s：满怀期待 → 开盘破发，全片最狠的一次转折 ================= */
  {
    const t0 = cs(52), beat = 60 / 116, bar = beat * 4;
    const open = cwT(55, '破发');
    // 期待段：116 BPM 往上推
    X(crash(2.2), t0, 0.3);
    X(boom(2, 84, 34), t0, 0.65);
    bars(t0, open, bar, [CH.C, CH.F, CH.G, CH.Am], (t, c, b) => {
      const lift = t >= cs(54); // 「赚一倍」：再往上一个调
      const ch = lift ? up(c, 2) : c;
      M(pad(ch, bar + 0.2, {atk: 0.05, rel: 0.3, cut: 2200}), t, 0.28);
      sqArp(t, Math.min(t + bar, open), beat / 4, ch, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.09, {cut: 3600, decay: 20});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(ch[0] - 12 + (k % 2 ? 12 : 0)), 0.2), tt, 0.32));
      D(K, t, 0.55);
      D(K, t + 2 * beat, 0.45);
    });
    drums(t0, open, beat);
    // 「发行价 17 港元」
    X(boom(1.6, 80, 36), cs(53), 0.5);
    // 「开盘，破发」：鼓全部停，两个人声之外什么都不剩 —— 一个很空的下坠
    X(fall(1.8, 560, 60), open, 0.4);
    X(boom(2.8, 56, 22), open + 0.1, 0.85);
    padSpan(CH.Am.map((m) => m - 24), open, cs(58), 0.4, {atk: 0.2, rel: 0.6, cut: 430});
    // 「他站在外面说：大势不好」：只剩风
    X(wind(cs(57) - cs(56) + 1.2), cs(56), 0.2);
    tickTock(cs(56), cs(57), 0.7, 0.2);
    // 「最低跌到 8 港元」：沉到底
    X(boom(2.4, 50, 20), cs(57), 0.55);
    [[0, 45], [1.4, 43], [2.8, 40]].forEach(([d, m]) => M(pluck(mtof(m), 2.2, 0.12), cs(57) + 0.2 + d, 0.22));
  }

  /* ================= 11. 2019 世界 500 强 / 小米 10 178s 之前的回升 166.8–178.9s ================= */
  {
    const t0 = cs(58), t1 = cs(62), beat = 0.55, bar = beat * 4;
    X(swell(1.4, {from: 260, to: 3800}), t0 - 1.4, 0.28);
    bars(t0, t1, bar, [CH.G, CH.C, CH.Am, CH.F], (t, c, b) => {
      M(pad(c, bar + 0.3, {atk: 0.2, rel: 0.4, cut: 1200 + b * 200}), t, 0.24);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3, 2, 1, 3, 2], 12, 0.16 + b * 0.01, 0.65);
      M(bass(mtof(c[0] - 12), 0.5), t, 0.34);
      D(K, t, 0.4);
      D(K, t + 2 * beat, 0.32);
      if (b >= 2) grid(t, t + bar, beat / 2, (tt, k) => D(Sh, tt, k % 2 ? 0.05 : 0.09));
    });
    // 「进了世界 500 强」：一下
    X(boom(1.6, 76, 38), cs(58), 0.45);
    // 「用了 9 年」：一串往上数的音
    [72, 74, 76, 79, 81, 84, 86, 88, 91].forEach((m, k) => M(pluck(mtof(m), 0.8, 0.7), cs(59) + k * 0.12, 0.09));
    // 「小米 10，第一次做高端」：升一个调，弦乐铺开
    padSpan(up(CH.C, 2), cs(60), cs(61) + 0.3, 0.3, {atk: 0.3, rel: 0.5, cut: 2000});
    X(boom(1.4, 78, 40), cs(60), 0.4);
    // 「全球第二」
    X(crash(2), cs(61), 0.28);
    X(boom(1.8, 82, 36), cs(61), 0.55);
  }

  /* ================= 12. 造车 178.9–196.8s：最大的赌注，从低音慢慢堆起来 ================= */
  {
    const t0 = cs(62), beat = 60 / 104, bar = beat * 4;
    const last = cs(64);  // 「最后一次重大创业」：悬一下
    const su7 = cs(65);   // SU7 上市：第二高潮
    X(boom(2.6, 60, 26), t0, 0.8);
    // 从 D 小调的低音开始，一层一层加
    bars(t0, last, bar, [CH.Dm, CH.Bb, CH.F, CH.C], (t, c, b) => {
      M(pad(c, bar + 0.3, {atk: 0.3, rel: 0.4, cut: 700 + b * 400}), t, 0.3);
      if (b >= 1) grid(t, t + bar, beat, (tt, k) => M(bass(mtof(c[0] - 12), 0.7), tt, 0.3));
      if (b >= 2) arp(t, Math.min(t + bar, last), beat / 2, c, [0, 1, 2, 3, 2, 1], 12, 0.13, 0.6);
      if (b >= 2) {
        D(K, t, 0.45);
        D(K, t + 2 * beat, 0.36);
      }
    });
    // 「首期 100 亿，十年 100 亿美元」：两下递进的重击
    X(boom(1.6, 78, 38), cwT(63, '100 亿'), 0.5);
    X(boom(2, 86, 32), cwT(63, '十年'), 0.6);
    // 「这是最后一次重大创业」：鼓抽掉，只剩低音和一个悬着的和弦
    padSpan([50, 57, 62, 63], last, su7 + 0.4, 0.3, {atk: 0.2, rel: 0.5, cut: 1100});
    grid(last, su7, 1, (t) => D(K, t, 0.3));
    X(swell(su7 - last - 0.8), last + 0.4, 0.3);
    // SU7 上市：crash + boom + 满编
    X(crash(2.6), su7, 0.34);
    X(boom(2.4, 86, 32), su7, 0.8);
    bars(su7, cs(67), bar, [CH.F, CH.C, CH.G, CH.Am], (t, c) => {
      M(pad(c, bar + 0.2, {atk: 0.05, rel: 0.3, cut: 2300}), t, 0.3);
      sqArp(t, Math.min(t + bar, cs(67)), beat / 4, c, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.09, {cut: 3500, decay: 20});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(c[0] - 12), 0.2), tt, 0.32));
    });
    drums(su7, cs(67), beat);
    // 「27 分钟，大定 5 万台」：一串往上冲的铃声
    for (let k = 0; k < 16; k++) M(bell(mtof(76 + (k % 6) * 3), 0.8), cwT(66, '27') + k * 0.07, 0.06);
    X(boom(1.6, 80, 36), cs(66) + 0.3, 0.5);
    // 「全年交付 13.7 万台」
    X(boom(1.6, 82, 36), cs(67), 0.5);
    padSpan(CH.C, cs(67), cs(68) + 0.2, 0.26, {atk: 0.1, rel: 0.4, cut: 2200});
  }

  /* ================= 13. 2025 顶点 196.8–213.9s：全片最高，128 BPM + 两次升调 ================= */
  {
    const t0 = cs(68), t1 = cs(74), beat = 60 / 128, bar = beat * 4;
    const up1 = cs(71); // 「61.45 港元，历史最高」：升一个调
    const up2 = cs(72); // 「1.55 万亿」：再升一个调
    const key = (t) => (t >= up2 ? 4 : t >= up1 ? 2 : 0);
    X(crash(2.6), t0, 0.34);
    X(boom(2.2, 86, 30), t0, 0.8);
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c) => {
      const ch = up(c, key(t));
      M(pad(ch, bar + 0.2, {atk: 0.05, rel: 0.3, cut: 2500}), t, 0.3);
      sqArp(t, Math.min(t + bar, t1), beat / 4, ch, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.09, {cut: 3800, decay: 20});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(ch[0] - 12 + (k % 2 ? 12 : 0)), 0.2), tt, 0.33));
      [[0, 2], [1.5, 3], [2, 2], [3, 1]].forEach(([bb, i]) => M(bell(mtof(ch[i] + 24), 0.9), t + bb * beat, 0.07));
    });
    drums(t0, t1, beat);
    // 「玄戒 O1，3 纳米」
    X(crash(2), cs(68), 0.28);
    X(boom(1.8, 82, 34), cs(68) + 0.2, 0.55);
    // 「YU7 上市」
    X(crash(2), cs(69), 0.28);
    X(boom(1.8, 84, 34), cs(69) + 0.2, 0.55);
    // 「3 分钟，大定 20 万台」：一段密到发慌的铃声
    for (let k = 0; k < 22; k++) M(bell(mtof(79 + (k % 7) * 3), 0.7), cwT(70, '3 分钟') + k * 0.055, 0.055);
    X(boom(1.8, 86, 34), cwT(70, '3 分钟'), 0.6);
    // 「次日股价 61.45 港元，历史最高」：第一次升调
    X(crash(2.2), up1, 0.32);
    X(boom(2, 88, 34), up1, 0.7);
    // 「市值 1.55 万亿」：第二次升调，全片最高的那一下
    X(crash(2.6), up2, 0.36);
    X(boom(2.6, 92, 30), up2, 0.85);
    // 「从一碗粥到这里，15 年」：鼓全停，动机第五次 —— 全片最响之后突然只剩八音盒
    const hush = cs(73);
    padSpan(up(CH.C, 4), hush, t1 + 0.4, 0.3, {atk: 0.2, rel: 0.8, cut: 1800});
    motifBox(M, hush + 0.1, 0.46, 0.3, 4);
    X(fall(1.4, 900, 300), hush - 0.1, 0.08);
  }

  /* ================= 14. 2026 回撤 213.9–225.3s：第三次掉下去，腰斩 ================= */
  {
    const t0 = cs(74), t1 = cs(78);
    sink(t0, {low: 20, g: 0.62, dur: 3});
    padSpan(CH.Am.map((m) => m - 24), t0, t1 + 0.4, 0.28, {atk: 0.5, rel: 0.8, cut: 400});
    X(wind(t1 - t0 + 1), t0, 0.15);
    tickTock(t0, cs(77), 0.62, 0.26);
    // 「一年前还是 1.55 万亿」的那种落差：用一段往下走的低音
    grid(t0, cs(76), 0.45, (t, k) => M(bass(mtof(45 - Math.min(12, Math.floor(k / 3) * 2)), 0.4), t, 0.2));
    // 「最低 20 港元附近」：沉到底
    X(boom(2.6, 54, 20), cs(75), 0.5);
    // 「老订单交完，新订单没来」：空
    X(wind(cs(77) - cs(76) + 0.8), cs(76), 0.12);
    // 「汽车单季经营亏损 26 亿」：一声闷响
    X(boom(2.2, 56, 22), cs(77), 0.5);
    X(fall(1, 420, 90), cs(77), 0.2);
  }

  /* ================= 15. 现在的回升 225.3–234.6s：微弱的光，不铺满 ================= */
  {
    const t0 = cs(78), t1 = cs(81), beat = 0.6, bar = beat * 4;
    X(swell(1.4, {from: 240, to: 3600}), t0 - 1.4, 0.26);
    bars(t0, t1, bar, [CH.G, CH.C, CH.Am, CH.F], (t, c) => {
      M(pad(c, bar + 0.4, {atk: 0.5, rel: 0.6, cut: 1100}), t, 0.18);
      M(pluck(mtof(c[0] + 12), 1.4, 0.6), t, 0.16);
      M(pluck(mtof(c[2] + 12), 1.2, 0.55), t + 1.2, 0.12);
      M(bass(mtof(c[0] - 12), 0.6), t, 0.26);
      D(K, t, 0.28);
      D(K, t + 2 * beat, 0.22);
    });
    // 「澎程上市，4 分钟锁单 1 万台」：几下轻的
    [77, 79, 81, 84].forEach((m, k) => M(pluck(mtof(m), 1, 0.65), cs(78) + k * 0.14, 0.11));
    X(boom(1.4, 72, 40), cs(78) + 0.3, 0.35);
    // 「当月交付 4 万台，历史最高」：一个温和的亮音，不是重击
    M(bell(mtof(88), 2), cs(79), 0.13);
    M(bell(mtof(91), 1.6), cs(79) + 0.2, 0.1);
    arp(cs(79), cs(80), 0.24, CH.C, [0, 1, 2, 3], 24, 0.08, 0.7);
    // 「累计交付超过 80 万辆」
    X(boom(1.2, 72, 42), cs(80), 0.3);
  }

  /* ================= 16. 收尾 234.6s–：动机回到起点，停在开放的和弦上 ================= */
  {
    const t0 = cs(81), t1 = cs(85), end = seconds;
    // 「16 年，从一碗粥到手机、家电、汽车」：C 大调铺开，是这一期唯一一次真正的"落地"
    padSpan([36, 48, 55, 60, 64], t0, cs(83), 0.4, {atk: 0.8, rel: 1, cut: 1500});
    X(boom(2.4, 70, 32), t0, 0.45);
    [[0, 72], [1.2, 76], [2.4, 79], [3.6, 84]].forEach(([d, m]) => M(pluck(mtof(m), 2, 0.7), t0 + 0.3 + d * 0.5, 0.16));
    // 「从性价比的故事，变成重资产的故事」：低音压下来，分量
    padSpan([36, 48, 55, 60], cs(82), cs(83), 0.42, {atk: 0.3, rel: 0.5, cut: 900});
    grid(cs(82), cs(83), 0.8, (t, k) => M(bass(mtof(36 + (k % 2 ? 7 : 0)), 0.7), t, 0.4));
    X(boom(2, 64, 26), cs(82), 0.5);
    // 「1999 的手机，可以靠一代人记住」：动机最后一次，慢下来，只剩八音盒
    motifBox(M, cs(83), 0.56, 0.32);
    padSpan(CH.C, cs(83), cs(84) + 0.4, 0.26, {atk: 0.3, rel: 0.6, cut: 1500});
    // 「25 万的车，得靠每一辆重新证明」：一个低音承重，钟表回来
    X(boom(2.2, 58, 24), cs(84), 0.55);
    M(bass(mtof(36), 1.8), cs(84) + 0.1, 0.34);
    tickTock(cs(84) + 0.4, t1, 0.55, 0.24);
    // 「下一段路，才刚开始」：停在 Cadd9 上，往上开着口，最后一个动机音悬在半空
    padSpan(CH.Cadd9, t1, end, 0.4, {atk: 0.4, rel: 2.4, cut: 1600});
    MOTIF.forEach((m, k) => M(mbox(m + 12, 2.4), t1 + 0.2 + k * 0.5, 0.2));
    X(boom(2.6, 62, 30), t1, 0.4);
    M(bell(mtof(96), 3), t1 + 0.9, 0.1);
  }

  /* ---------- 混音 ---------- */
  filterBuf(mus, 'lp', 7200);
  const wm = reverb(mus, 0.3);
  const wd = reverb(drm, 0.1);
  const wf = reverb(fx, 0.22);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = wm[i] + wd[i] * 0.5 + wf[i] * 0.6;
  return softClip(out, 1.1);
}

writeScore({
  ep: EP,
  render: renderScore,
  segs: [
    [0, '钩子'],
    [cs(8), '2010 银谷大厦'],
    [cs(15), 'MIUI'],
    [cs(21), '1999'],
    [cs(28), '红米/生态'],
    [cs(33), '2014 巅峰'],
    [cs(39), '2016 危机'],
    [cs(44), 'MIX/之家'],
    [cs(48), '2017 反弹'],
    [cs(52), 'IPO'],
    [cs(58), '500 强/高端'],
    [cs(62), '造车'],
    [cs(68), '2025 顶点'],
    [cs(74), '2026 回撤'],
    [cs(78), '现在'],
    [cs(81), '收尾'],
  ],
});
