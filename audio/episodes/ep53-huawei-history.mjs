// 第五十三期「华为 39 年」Vox 解说 BGM → public/audio/ep53-huawei-history/bgm.wav
//
// 逐段写总谱。主线是「每次被掐住，就换一条命」：
// 代理 → 自研，国内 → 海外，运营商 → 终端，安卓 → 鸿蒙，外购芯片 → 海思。
//
// 贯穿全片的是一个四音号角动机 G–B–D–G（军号式上行，任正非是军人出身），
// 在 1987 创立 / C&C08 / 海思 / 2019 巅峰 / Mate 60 回归 / 收尾 各出现一次，
// 配器一次比一次满：八音盒 → 拨弦 → 方波 → 铺底 + 铜管感 → 全停只剩动机 → 满编。
//
// 三次掉下去：2002 唯一下滑、2003 思科诉讼、2021 断供腰斩（每次 sink()，抽掉鼓、只留低音和钟表）；
// 两次冲上去：2019 的 2.4 亿台、2023 的麒麟回来。
import {bass, bell, filterBuf, hat, kick, mixInto, mtof, pluck, reverb, rnd, setSeed, shaker, snap, softClip, SR} from '../synth.mjs';
import {boom, CH, crash, fall, grid, loadCues, mbox, pad, pulse, swell, tick, up, wind, writeScore} from '../score.mjs';

const EP = 'ep53-huawei-history';
/** 只在生成 segs 报告时用到；render 里的 cs/cwT 由 writeScore 传进来 */
const {cs} = loadCues(EP);

/** 四音号角动机：G–B–D–G */
const MOTIF = [67, 71, 74, 79];
/** 动机的八音盒版本，step 控制音与音的间隔 */
const motifBox = (M, at, step = 0.42, g = 0.2, lift = 0) => MOTIF.forEach((m, k) => M(mbox(m + lift, 2), at + k * step, g));

function renderScore(seconds, {cs, cwT}) {
  setSeed(53);
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
  /** 军号动机的满编版：铺底 + 拨弦 + 铃声叠在一起 */
  const motifFull = (at, g = 0.2, lift = 0) => {
    MOTIF.forEach((m, k) => {
      M(pluck(mtof(m + lift), 1.6, 0.75), at + k * 0.2, g);
      M(bell(mtof(m + lift + 12), 1.4), at + k * 0.2 + 0.04, g * 0.5);
    });
  };

  /* ================= 1. 钩子 0–cs(9)：134 亿净利 vs 1213 亿研发，翻财报 ================= */
  {
    const t1 = cs(9);
    padSpan(CH.Am.map((m) => m - 12), 0, cs(7), 0.4, {atk: 1.6, rel: 0.6, cut: 620});
    tickTock(0.5, cs(7), 0.5, 0.28);
    grid(cs(1), cs(7), 0.5, (t, k) => {
      M(pulse([45, 45, 48, 45][k % 4], 0.22, {decay: 9, cut: 900}), t, 0.11);
      if (k % 2 === 0) {
        D(K, t, 0.32);
        D(K, t + 0.18, 0.2);
      }
    });
    // 「花在研发上 1213 亿」：往上爬的方波，越爬越高，跟净利形成落差
    grid(cs(2), cwT(2, '1213'), 0.14, (t, k) => M(pulse(57 + Math.floor(k / 5) * 2, 0.12, {decay: 20, cut: 1500 + k * 90}), t, 0.05 + k * 0.004));
    X(swell(cwT(2, '1213') - cs(2)), cs(2), 0.3);
    X(boom(1.8, 78, 36), cwT(2, '1213'), 0.5);
    // 「不够五分之一」：一个突兀的短促下坠，不是长崩溃
    X(fall(0.8, 420, 120), cwT(3, '五分之一'), 0.26);
    X(boom(1.2, 60, 28), cwT(3, '五分之一'), 0.4);
    // 「近十年 1.38 万亿」：低音铺一层，重量
    padSpan([36, 43, 48, 55], cwT(4, '1.38'), cs(5) + 0.2, 0.32, {atk: 0.3, rel: 0.5, cut: 800});
    X(boom(2, 70, 30), cwT(4, '1.38'), 0.5);
    // 「本钱是 2.1 万块」：一声干瘪的、很土的拨弦，跟刚才的重量形成反差
    M(pluck(mtof(50), 0.9, 0.2), cs(5), 0.3);
    M(pluck(mtof(57), 0.7, 0.2), cs(5) + 0.16, 0.2);
    // 「三次差点没过去」：三下闷响，间隔拉开
    [0, 1.5, 3].forEach((d, k) => X(boom(1.6, 72 - k * 6, 34 + k * 4), cs(6) + d, 0.42));
    // 「每次换一条命回来」：动机先漏两个音，悬着
    [67, 71].forEach((m, k) => M(pluck(mtof(m), 1.6, 0.6), cs(7) + k * 0.24, 0.18));
    padSpan(CH.Dm, cs(7), t1 + 0.3, 0.4, {atk: 0.4, rel: 0.5, cut: 1100});
    // 「把时间线拉出来看」：倒卷回 1987
    X(swell(t1 - cs(8), {from: 260, to: 5000}), cs(8), 0.36);
    X(fall(1.5, 900, 220), t1 - 0.5, 0.1);
  }

  /* ================= 2. 1987 深圳 cs(9)–cs(16)：C 大调，朴素、慢、有点土 ================= */
  {
    const t0 = cs(9), t1 = cs(16), beat = 0.66, bar = beat * 4;
    X(boom(1.4, 68, 40), t0, 0.4);
    bars(t0, t1, bar, [CH.C, CH.Am, CH.F, CH.G], (t, c, b) => {
      M(pad(c, bar + 0.3, {atk: 0.3, rel: 0.3, cut: 1000}), t, 0.2);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3, 2, 1, 3, 2], 12, 0.2, 0.6);
      M(bass(mtof(c[0] - 12), 0.5), t, 0.34);
      M(bass(mtof(c[0] - 12), 0.4), t + 2 * beat, 0.26);
      grid(t, t + bar, beat / 2, (tt, k) => D(Sh, tt, k % 2 ? 0.06 : 0.1));
    });
    // 「43 岁的任正非，凑了 2.1 万元」：一下低音落地
    X(boom(1.2, 62, 40), cs(10), 0.32);
    // 「名字取自中华有为」：四音动机第一次，八音盒，很轻
    motifBox(M, cs(11), 0.44, 0.26);
    padSpan(CH.C, cs(11), cs(12) + 0.4, 0.28, {atk: 0.3, rel: 0.4, cut: 1500});
    // 「这家公司叫华为」
    [79, 84].forEach((m, k) => M(bell(mtof(m), 1.8), cs(12) + k * 0.2, 0.12));
    // 「从香港买，转手卖给县邮电局」：两个来回的低音，像倒手
    [[0, 43], [0.9, 48]].forEach(([d, m]) => M(pluck(mtof(m), 0.9, 0.35), cs(13) + d, 0.22));
    // 「十几个人，没有自己的产品」：一句落回去，鼓没了
    padSpan(CH.Am.map((m) => m - 12), cs(14), t1 + 0.2, 0.34, {atk: 0.3, rel: 0.3, cut: 560});
    [[0, 57], [1.2, 55], [2.4, 52]].forEach(([d, m]) => M(pluck(mtof(m), 1.4, 0.2), cs(14) + 0.2 + d, 0.22));
  }

  /* ================= 3. 1991 自研 → 1993 C&C08 cs(16)–cs(23)：G 大调，110 ================= */
  {
    const t0 = cs(16), t1 = cs(23), beat = 0.55, bar = beat * 4;
    X(boom(1.6, 66, 36), t0, 0.45);
    bars(t0, t1, bar, [CH.G, CH.C, CH.Am, CH.D], (t, c) => {
      M(pad(c, bar + 0.3, {atk: 0.2, rel: 0.3, cut: 1500}), t, 0.24);
      sqArp(t, Math.min(t + bar, t1), beat / 2, c, [0, 1, 2, 3, 2, 1], 12, 0.06, {cut: 1800, decay: 14});
      M(bass(mtof(c[0] - 12), 0.42), t, 0.36);
      D(K, t, 0.4);
      D(K, t + 2 * beat, 0.3);
      grid(t, t + bar, beat, (tt, k) => D(k % 2 ? Ho : Hc, tt, 0.06));
    });
    // 「货是别人的，价格也是别人的」：一个重复的、机械的短音
    grid(cs(17), cs(18), 0.28, (t, k) => M(pulse(50 + (k % 2) * 2, 0.1, {decay: 22, cut: 1200}), t, 0.07));
    // 「他站在五楼的窗边」：停一拍，只留低频
    M(pad([43, 50, 55], 1.6, {atk: 0.2, rel: 0.6, cut: 700}), cs(19), 0.3);
    X(boom(2, 54, 26), cs(19), 0.5);
    // 「研发败了，我只有从楼上跳下去」：一个往下掉的音
    X(fall(1.4, 700, 180), cwT(21, '跳下去'), 0.24);
    // 「1993 年，C&C08 出来了」：动机第二次，拨弦版，比第一次亮
    motifFull(cwT(22, 'C&C08'), 0.2);
    X(crash(2), cwT(22, 'C&C08'), 0.24);
    X(boom(1.8, 74, 32), cwT(22, 'C&C08'), 0.5);
  }

  /* ================= 4. 1995–1998 基本法 / IBM cs(23)–cs(29)：C 大调，120，规整 ================= */
  {
    const t0 = cs(23), t1 = cs(29), beat = 0.5, bar = 2;
    bars(t0, t1, bar, [CH.C, CH.G, CH.F, CH.G], (t, c) => {
      M(pad(c, bar + 0.2, {atk: 0.05, rel: 0.3, cut: 2100}), t, 0.24);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.16, 0.6);
      M(bass(mtof(c[0] - 12), 0.3), t, 0.34);
      D(K, t, 0.45);
      D(S, t + beat, 0.28);
      D(Hc, t + beat / 2, 0.07);
    });
    // 「钱来得快，队伍也乱得快」：一下乱的军鼓
    [0, 0.14, 0.28, 0.42].forEach((d) => D(S, cs(24) + d, 0.2));
    // 「市场部集体辞职重新竞聘」：一排下行的方波，像一队人走出去
    grid(cs(25), cs(26), 0.16, (t, k) => M(pulse(64 - k * 2, 0.08, {decay: 18, cut: 1400}), t, 0.06));
    // 「《华为基本法》」：四个厚重的和弦，像盖章
    [0, 1, 2, 3].forEach((k) => X(boom(0.9, 70 - k * 4, 40), cs(26) + k * 0.5, 0.32));
    // 「请 IBM 七十位顾问」：机械的节拍器
    grid(cs(27), cs(28), 0.25, (t, k) => D(tick(k % 2 === 0), t, 0.16));
    // 「学的是怎么把一个项目管好」：收干净，只剩低音
    padSpan([48, 52, 55], cs(28), t1, 0.24, {atk: 0.2, rel: 0.5, cut: 900});
    M(bass(mtof(36), 1.2), cs(28), 0.3);
  }

  /* ================= 5. 2000–2002 冬天 cs(29)–cs(36)：D 小调，慢，抽掉鼓 ================= */
  {
    const t0 = cs(29), t1 = cs(36);
    X(boom(2, 64, 30), t0, 0.4);
    padSpan(CH.Dm.map((m) => m - 12), t0, cs(31), 0.34, {atk: 1.2, rel: 0.8, cut: 620});
    // 「220 亿」：一根孤独的低音线，一步一步往下
    grid(t0, cs(34), 1.1, (t, k) => M(bass(mtof(38 - Math.min(7, k) * 2), 0.9), t, 0.26));
    // 「《华为的冬天》」：钟表进来，冷
    tickTock(cs(30), cs(35), 0.55, 0.26);
    // 「互联网泡沫破了」：风，掉下去
    X(wind(3.4), cs(31), 0.16);
    sink(cs(31), {low: 24, g: 0.5, dur: 2.4});
    // 「7.5 亿美元，买方是艾默生」：一声暖的铃，全段唯一的亮色（棉袄）
    M(bell(mtof(79), 2.4), cs(33), 0.16);
    M(bell(mtof(84), 2), cs(33) + 0.16, 0.1);
    M(pluck(mtof(62), 1.8, 0.5), cs(33), 0.2);
    // 「过冬的棉袄」：铺一层暖的 C 大三
    padSpan(CH.C, cs(34), cs(35), 0.28, {atk: 0.4, rel: 0.5, cut: 1200});
    // 「2002 年，营收 221 亿，唯一下滑」：第二次掉下去，这次更深
    sink(cwT(35, '221'), {low: 20, g: 0.62, dur: 2.8});
    padSpan(CH.Dm.map((m) => m - 24), cwT(35, '221'), t1 + 0.3, 0.26, {atk: 0.2, rel: 0.8, cut: 380});
    M(bass(mtof(26), 1.6), cwT(35, '221') + 0.2, 0.32);
  }

  /* ================= 6. 2003 思科 cs(36)–cs(43)：E 大调做紧张，132，心跳 ================= */
  {
    const t0 = cs(36), t1 = cs(43), beat = 0.45, bar = beat * 4;
    // 低频 pedal，全段不解决
    padSpan([40, 47, 52], t0, cs(41), 0.34, {atk: 0.6, rel: 0.6, cut: 700});
    grid(t0, cs(41), beat, (t, k) => {
      D(K, t, 0.5);
      D(K, t + 0.14, 0.3);
      if (k % 4 === 2) D(S, t, 0.3);
      D(Ho, t + beat / 2, 0.06);
    });
    // 「21 项罪名 / 77 页」：一叠纸的声音 + 尖锐的高频
    X(boom(1.2, 88, 44), cs(36), 0.5);
    X(fall(1.2, 1200, 300), cs(36), 0.14);
    grid(cs(37), cs(39), 0.12, (t, k) => X(tick(k % 2 === 0), t, 0.05));
    // 「按对方开的价，要破产」：最重的一下
    X(boom(2.6, 62, 20), cwT(39, '破产'), 0.6);
    X(crash(2.4), cwT(39, '破产'), 0.3);
    // 「合作伙伴开始观望」：抽空，只剩心跳和低音
    padSpan([40, 45, 47], cs(40), cs(41), 0.26, {atk: 0.3, rel: 0.6, cut: 500});
    tickTock(cs(40), cs(41), 0.65, 0.24);
    // 「华为转身去找思科的对手」：一个转折的动机碎片
    [67, 74].forEach((m, k) => M(pluck(mtof(m), 1.4, 0.7), cs(41) + k * 0.3, 0.2));
    // 「2004 年 7 月，思科撤诉」：第一次解决，C 大三铺开
    M(pad(CH.C, 2.6, {atk: 0.2, rel: 1, cut: 1800}), cs(42), 0.36);
    [72, 76, 79, 84].forEach((m, k) => M(bell(mtof(m), 2), cs(42) + k * 0.16, 0.11));
    X(boom(2, 70, 34), cs(42), 0.42);
    X(swell(1.2, {from: 500, to: 3000}), cs(42) - 1.2, 0.2);
  }

  /* ================= 7. 海思 → 出海 → 500 强 cs(43)–cs(50)：Am → C，118 ================= */
  {
    const t0 = cs(43), t1 = cs(50), beat = 0.52, bar = beat * 4;
    X(boom(1.6, 66, 32), t0, 0.42);
    bars(t0, t1, bar, [CH.Am, CH.F, CH.C, CH.G], (t, c, b) => {
      M(pad(c, bar + 0.3, {atk: 0.2, rel: 0.3, cut: 1400}), t, 0.22);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3], 12, 0.16, 0.55);
      M(bass(mtof(c[0] - 12), 0.4), t, 0.34);
      D(K, t, 0.42);
      if (b % 2) D(S, t + 2 * beat, 0.26);
      grid(t, t + bar, beat / 2, (tt, k) => D(Sh, tt, 0.05));
    });
    // 「命门不能攥在别人手里」：一下闷响，然后是动机的碎片
    X(boom(2, 58, 24), cs(43), 0.5);
    [67].forEach((m) => M(mbox(mtof(m), 2), cs(44), 0.22));
    // 「海思成立，自己做芯片」：方波，机器感
    sqArp(cs(45), cs(46), 0.13, CH.Am, [0, 1, 2, 3], 24, 0.06, {cut: 2600, decay: 18});
    X(boom(1.4, 76, 40), cs(45), 0.42);
    // 「海外收入第一次超过国内」：一个往上走的琶音，像地图展开
    arp(cs(46), cs(47), 0.1, CH.C, [3, 2, 1, 0, 1, 2, 3, 2], 24, 0.09, 0.75);
    X(swell(1.4, {from: 300, to: 5000}), cs(46) - 1.4, 0.24);
    // 「75%」：一个亮音，不重
    M(bell(mtof(88), 2), cs(47), 0.12);
    // 「2010 年，1852 亿」：低音垫一下
    X(boom(1.6, 72, 36), cs(48), 0.4);
    // 「第一次进世界 500 强，第 397 位」：动机第三次，全编，第一波小高潮
    motifFull(cs(49), 0.2);
    X(crash(2.2), cs(49), 0.28);
    X(boom(1.8, 78, 30), cs(49), 0.5);
    padSpan(CH.C, cs(49), t1 + 0.2, 0.3, {atk: 0.2, rel: 0.5, cut: 2000});
  }

  /* ================= 8. 2011–2014 手机 cs(50)–cs(57)：G 大调，126 ================= */
  {
    const t0 = cs(50), t1 = cs(57), beat = 0.48, bar = beat * 4;
    bars(t0, t1, bar, [CH.G, CH.D, CH.Am, CH.C], (t, c, b) => {
      M(pad(c, bar + 0.2, {atk: 0.1, rel: 0.3, cut: 1800}), t, 0.24);
      sqArp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3, 2, 3, 1, 2], 12, 0.065, {cut: 2400, decay: 15});
      M(bass(mtof(c[0] - 12), 0.3), t, 0.36);
      D(K, t, 0.5);
      D(S, t + 2 * beat, 0.34);
      grid(t, t + bar, beat / 2, (tt, k) => D(k % 2 ? Ho : Hc, tt, 0.06));
    });
    // 「那时手机部门，还是个包袱」：一个闷的低音
    X(boom(1.4, 60, 30), cs(50), 0.36);
    // 「余承东接手终端」：两下清脆的敲击
    [0, 0.22].forEach((d) => D(S, cs(51) + d, 0.26));
    // 「一上来就砍贴牌机」：一刀切下去
    X(fall(0.7, 900, 200), cs(52), 0.22);
    // 「一年少卖三千万台」：掉下去
    sink(cs(53), {low: 28, g: 0.55, dur: 2});
    // 「不支持他就是不支持我」：全停，一句话
    grid(cs(54), cs(54) + 2.2, 1000, () => {});
    padSpan([43, 50, 55], cs(54), cs(54) + 2.4, 0.3, {atk: 0.1, rel: 0.8, cut: 900});
    X(boom(2.2, 58, 26), cs(54), 0.55);
    // 「2012 年，他发微博说要做世界第一」：一个上行的方波，很冲
    grid(cs(55), cs(56), 0.14, (t, k) => M(pulse(55 + k * 2, 0.1, {decay: 20, cut: 2600}), t, 0.07));
    X(swell(cs(56) - cs(55), {from: 400, to: 6000}), cs(55), 0.24);
    // 「2014 年 9 月，Mate 7」：动机第四次，拨弦 + 铃
    motifFull(cs(57), 0.18, 12);
    X(crash(1.8), cs(57), 0.22);
    // 「700 万台」：一个温和的亮音，不是重击
    M(bell(mtof(91), 2.2), cwT(56, '700 万'), 0.13);
    X(boom(1.4, 74, 38), cwT(56, '700 万'), 0.4);
  }

  /* ================= 9. 2018–2019 巅峰 cs(57)–cs(60)：D 大调，136，全片第一个大高潮 ================= */
  {
    const t0 = cs(57), t1 = cs(60), beat = 0.44, bar = beat * 4;
    X(crash(2.6), t0, 0.32);
    X(boom(2.2, 84, 30), t0, 0.72);
    bars(t0, t1, bar, [CH.D, CH.A, CH.Bm, CH.G], (t, c, b) => {
      M(pad(c, bar + 0.2, {atk: 0.03, rel: 0.25, cut: 2800}), t, 0.3);
      sqArp(t, Math.min(t + bar, t1), beat / 4, c, [0, 1, 2, 3, 2, 1, 2, 3], 12, 0.075, {cut: 3600, decay: 18});
      grid(t, t + bar, beat / 2, (tt, k) => M(bass(mtof(c[0] - 12 + (k % 2 ? 12 : 0)), 0.2), tt, 0.3));
      [[0, 2], [1.5, 3], [2, 2], [3, 1]].forEach(([bb, i]) => M(bell(mtof(c[i] + 24), 1), t + bb * beat, 0.06));
      D(K, t, 0.6);
      D(K, t + beat * 1.5, 0.4);
      D(S, t + beat, 0.42);
      D(S, t + beat * 3, 0.42);
      grid(t, t + bar, beat / 4, (tt, k) => D(k % 2 ? Ho : Hc, tt, 0.055));
      if (b === 1) grid(t, t + bar, beat / 2, (tt) => D(Sh, tt, 0.09));
    });
    // 「二季度超过苹果」：一个升调的重击
    X(boom(1.8, 88, 34), cs(58), 0.6);
    [84, 88, 91].forEach((m, k) => M(bell(mtof(m), 1.6), cs(58) + k * 0.12, 0.12));
    // 「2019 年，2.4 亿台，营收 8588 亿」：全片最响的一段，第二次升调
    X(boom(2.4, 92, 26), cs(59), 0.75);
    X(crash(2.8), cs(59), 0.34);
    motifFull(cs(59) + 0.2, 0.24);
    padSpan(up(CH.D, 12), cs(59), cs(60), 0.26, {atk: 0.05, rel: 0.4, cut: 4000});
  }

  /* ================= 10. 2019.5 实体清单 cs(60)–cs(64)：突然全停 ================= */
  {
    const t0 = cs(60), t1 = cs(64);
    // 一刀切：鼓全部消失，只剩一个很低的 pedal 和一声闷响
    X(boom(3.2, 56, 18), t0, 0.7);
    X(fall(1.6, 600, 60), t0, 0.36);
    padSpan([38, 45, 50], t0, cs(62), 0.34, {atk: 0.4, rel: 0.8, cut: 460});
    tickTock(t0 + 0.3, cs(63), 0.62, 0.26);
    // 「芯片、系统、工具，一夜断供」：三下短促的、被掐断的脉冲
    [0, 0.5, 1.0].forEach((d) => {
      M(pulse(45, 0.1, {decay: 30, cut: 900}), cs(61) + d, 0.12);
      X(boom(0.6, 64, 30), cs(61) + d, 0.3);
    });
    // 「备胎全部转正」：一个往上顶的低音，憋着的
    grid(cs(62), cs(63), 0.4, (t, k) => M(bass(mtof(33 + k * 2), 0.36), t, 0.28));
    X(swell(cs(63) - cs(62), {from: 200, to: 2600}), cs(62), 0.28);
    // 「鸿蒙发布」：不解决的和弦 + 一个亮音
    M(pad([45, 52, 57, 60], 2.4, {atk: 0.1, rel: 0.8, cut: 1400}), cwT(63, '鸿蒙'), 0.3);
    [81, 84].forEach((m, k) => M(bell(mtof(m), 1.8), cwT(63, '鸿蒙') + k * 0.2, 0.12));
  }

  /* ================= 11. 2020–2021 荣耀 / 腰斩 cs(64)–cs(71)：Fm，最暗 ================= */
  {
    const t0 = cs(64), t1 = cs(71);
    X(boom(2.4, 60, 24), t0, 0.5);
    padSpan(CH.Fm.map((m) => m - 12), t0, cs(66), 0.32, {atk: 1, rel: 0.8, cut: 520});
    grid(t0, cs(66), 1.2, (t, k) => M(bass(mtof(41 - (k % 2) * 2), 1), t, 0.24));
    // 「荣耀被整体出售」：一刀，然后是空的
    X(fall(1.4, 500, 80), cwT(65, '不持股'), 0.3);
    // 「2020 年营收 8914 亿，历史最高」：最后一次亮，一个 C 大三
    M(pad(CH.C, 2.6, {atk: 0.3, rel: 1, cut: 1600}), cs(66), 0.32);
    [72, 79, 84].forEach((m, k) => M(bell(mtof(m), 2.2), cs(66) + k * 0.2, 0.11));
    // 「2021 年，掉到 6368 亿」：第三次掉下去，这次最深
    sink(cs(67), {low: 18, g: 0.78, dur: 3.2});
    padSpan(CH.Fm.map((m) => m - 24), cs(67), cs(70), 0.3, {atk: 0.4, rel: 0.8, cut: 340});
    X(wind(cs(69) - cs(67) + 1), cs(67), 0.16);
    tickTock(cs(67) + 0.4, cs(70), 0.66, 0.26);
    // 「一年少了 2546 亿」：往下走的低音
    grid(cs(68), cs(69), 0.5, (t, k) => M(bass(mtof(41 - Math.min(12, k * 2)), 0.44), t, 0.22));
    // 「手机从 2.4 亿台，掉到 3500 万」：一个断崖
    X(fall(1.6, 700, 100), cwT(69, '3500'), 0.3);
    X(boom(2.2, 56, 22), cwT(69, '3500'), 0.5);
    // 「孟晚舟回国」：一线光，A 大三 + 一个高铃
    M(pad(CH.A, 2.8, {atk: 0.3, rel: 1.2, cut: 1500}), cs(70), 0.3);
    M(bell(mtof(93), 2.6), cs(70) + 0.2, 0.13);
    M(pluck(mtof(69), 1.8, 0.7), cs(70) + 0.5, 0.16);
  }

  /* ================= 12. 2023 Mate 60 cs(71)–cs(77)：Am → C，从谷底往上 ================= */
  {
    const t0 = cs(71), t1 = cs(77), beat = 0.54, bar = beat * 4;
    // 「没有发布会」：只有钟表和一个低音
    tickTock(t0, cs(72), 0.5, 0.26);
    padSpan(CH.Am.map((m) => m - 12), t0, cs(72), 0.28, {atk: 0.4, rel: 0.6, cut: 620});
    // 「12 点 08 分，直接上架」：一声准点的钟
    M(bell(mtof(88), 1.8), cs(72), 0.14);
    D(tick(true), cs(72), 0.3);
    bars(cs(73), t1, bar, [CH.Am, CH.F, CH.C, CH.G], (t, c, b) => {
      const rising = b >= 1;
      M(pad(c, bar + 0.3, {atk: 0.2, rel: 0.3, cut: rising ? 1600 : 1000}), t, 0.24);
      M(bass(mtof(c[0] - 12), 0.4), t, 0.32);
      if (rising) {
        arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 1, 2, 3], 12, 0.14, 0.6);
        D(K, t, 0.38);
        D(S, t + 2 * beat, 0.26);
      }
    });
    // 「芯片那一栏，一个字没写」：一个空拍，一声鼠标
    D(tick(false), cs(73), 0.18);
    // 「拆机的人发现，麒麟回来了」：动机第五次，全停之后突然全上（第二高潮）
    X(swell(1.2, {from: 300, to: 7000}), cwT(74, '麒麟') - 1.2, 0.32);
    X(boom(2.6, 90, 26), cwT(74, '麒麟'), 0.78);
    X(crash(2.6), cwT(74, '麒麟'), 0.34);
    motifFull(cwT(74, '麒麟'), 0.24);
    padSpan(CH.C, cwT(74, '麒麟'), cs(75) + 0.4, 0.3, {atk: 0.05, rel: 0.6, cut: 3000});
    // 「那一年，营收 7042 亿」：稳稳的两下
    X(boom(1.6, 74, 34), cs(75), 0.42);
    D(K, cs(75), 0.4);
    // 「隔了三年，它又有自己的芯片」：一句话，停
    padSpan([48, 55, 60, 64], cs(76), t1 + 0.2, 0.28, {atk: 0.4, rel: 0.8, cut: 1500});
  }

  /* ================= 13. 2025 cs(77)–cs(81)：F 大调，暖、中速 ================= */
  {
    const t0 = cs(77), t1 = cs(81), beat = 0.56, bar = beat * 4;
    X(boom(1.8, 72, 34), t0, 0.42);
    bars(t0, t1, bar, [CH.F, CH.C, CH.Dm, CH.Bb], (t, c) => {
      M(pad(c, bar + 0.35, {atk: 0.3, rel: 0.5, cut: 1200}), t, 0.26);
      arp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3], 12, 0.14, 0.55);
      M(bass(mtof(c[0] - 12), 0.5), t, 0.32);
      D(K, t, 0.36);
      D(K, t + 2 * beat, 0.26);
    });
    // 「8809 亿」：一个厚重的和弦
    M(pad(CH.F, 2.4, {atk: 0.2, rel: 0.8, cut: 1700}), cs(77) + 0.2, 0.3);
    [77, 81, 84].forEach((m, k) => M(bell(mtof(m), 2), cs(77) + 0.4 + k * 0.18, 0.1));
    // 「只差 105 亿」，一下几乎追上的音：两个相邻音，差一点点
    [79, 80].forEach((m, k) => M(pluck(mtof(m), 1.6, 0.6), cwT(78, '105') + k * 0.26, 0.2));
    // 「汽车业务 450 亿，涨了 72%」：一个上行的短琶音
    arp(cs(79), cs(79) + 1.8, 0.1, CH.C, [0, 1, 2, 3, 2], 24, 0.1, 0.8);
    X(boom(1.4, 76, 40), cs(79), 0.38);
    // 「58.9 万辆」：几下轻的拨弦
    [77, 79, 81, 84].forEach((m, k) => M(pluck(mtof(m), 1, 0.65), cs(80) + k * 0.14, 0.11));
    X(boom(1.2, 74, 42), cs(80), 0.3);
  }

  /* ================= 14. 2026 上半年 cs(81)–cs(87)：C 大调，回到当下 ================= */
  {
    const t0 = cs(81), t1 = cs(87), beat = 0.5, bar = beat * 4;
    X(swell(1.2, {from: 300, to: 4000}), t0 - 1.2, 0.26);
    X(boom(1.8, 78, 34), t0, 0.5);
    bars(t0, t1, bar, [CH.C, CH.G, CH.Am, CH.F], (t, c, b) => {
      M(pad(c, bar + 0.25, {atk: 0.1, rel: 0.35, cut: 1900}), t, 0.26);
      M(bass(mtof(c[0] - 12), 0.4), t, 0.34);
      D(K, t, 0.44);
      D(S, t + 2 * beat, 0.28);
      grid(t, t + bar, beat / 2, (tt, k) => D(Sh, tt, 0.05));
      if (b < 2) sqArp(t, Math.min(t + bar, t1), beat / 2, c, [0, 2, 1, 3], 12, 0.05, {cut: 2200, decay: 16});
    });
    // 「这是它历史上最好的上半年」：一个向上的动机碎片
    [67, 71, 74].forEach((m, k) => M(pluck(mtof(m), 1.4, 0.7), cs(82) + k * 0.2, 0.16));
    // 「中国手机市场，它回到第一」：一下重的，带镲
    X(boom(1.8, 86, 30), cs(83), 0.6);
    X(crash(1.8), cs(83), 0.24);
    // 「份额 20.6%，出货 2760 万台」：两个清楚的音
    [84, 88].forEach((m, k) => M(bell(mtof(m), 1.6), cwT(84, '20.6') + k * 0.2, 0.12));
    // 「但净利掉了 36%」：抽掉鼓，一个不协和的二度
    M(pad([48, 49, 55, 60], 2.2, {atk: 0.06, rel: 0.8, cut: 1400}), cwT(85, '37'), 0.3);
    X(fall(1.2, 500, 90), cwT(85, '37'), 0.24);
    X(boom(2, 58, 24), cwT(85, '37'), 0.46);
    // 「钱去哪了，看研发就明白」：低音往上顶，接收尾
    grid(cs(86), t1, 0.4, (t, k) => M(bass(mtof(36 + k * 2), 0.36), t, 0.26));
    X(swell(t1 - cs(86), {from: 300, to: 5000}), cs(86), 0.3);
  }

  /* ================= 15. 收尾 cs(87)–：动机最强，然后停在 Cadd9 ================= */
  {
    const t0 = cs(87), t1 = cs(90), end = seconds;
    // 「39 年，从 2.1 万到 8809 亿」：C 大调铺开，是这一期唯一一次真正的"落地"
    padSpan([36, 48, 55, 60, 64], t0, cs(88), 0.42, {atk: 0.8, rel: 1, cut: 1500});
    X(boom(2.4, 70, 32), t0, 0.5);
    X(crash(2), t0, 0.2);
    MOTIF.forEach((m, k) => M(pluck(mtof(m + 12), 2, 0.7), t0 + 0.3 + k * 0.34, 0.16));
    // 「它没上市，没有市值可以讲」：低音承重，钟表回来
    padSpan([36, 48, 55], cs(88), cs(90), 0.38, {atk: 0.3, rel: 0.6, cut: 900});
    grid(cs(88), cs(90), 0.7, (t, k) => M(bass(mtof(36 + (k % 2 ? 7 : 0)), 0.6), t, 0.38));
    X(boom(2, 60, 24), cs(88), 0.5);
    tickTock(cs(88) + 0.3, cs(90), 0.6, 0.22);
    // 「它把钱换成了专利、产线和人」：动机最后一次，满编但慢
    motifFull(cs(90) - 0.2, 0.2, 12);
    // 「下一段路，才刚开始」：停在 Cadd9，往上开着口
    padSpan(CH.Cadd9, t1, end, 0.42, {atk: 0.4, rel: 2.4, cut: 1600});
    MOTIF.forEach((m, k) => M(mbox(m + 12, 2.4), t1 + 0.2 + k * 0.5, 0.2));
    X(boom(2.6, 62, 30), t1, 0.42);
    M(bell(mtof(93), 3), t1 + 0.9, 0.1);
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
    [cs(9), '1987 深圳'],
    [cs(16), '1991 自研'],
    [cs(23), '基本法/IBM'],
    [cs(29), '2000 冬天'],
    [cs(36), '2003 思科'],
    [cs(43), '海思/出海'],
    [cs(50), '手机'],
    [cs(57), '2019 巅峰'],
    [cs(60), '实体清单'],
    [cs(64), '荣耀/腰斩'],
    [cs(71), 'Mate 60'],
    [cs(77), '2025'],
    [cs(81), '2026 上半年'],
    [cs(87), '收尾'],
  ],
});
