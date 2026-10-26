/**
 * 两个风格样片共用的一份料：腾讯 28 年的节点、轨道剖面、市值序列。
 *
 * 样片只用来比「长得像不像那回事」，所以只挑 14 个节点，
 * 但节点之间的事件密度、坡度、隧道位置都按真实年份比例排。
 */

export interface NodeItem {
  year: number;
  /** 世界坐标高度（y 向下）：轨道在这个高度经过 */
  y: number;
  name: string;
  note: string;
  cap: string;
}

export const NODES: NodeItem[] = [
  {year: 1998.9, y: 900, name: '创立', note: '深圳赛格 · 五个人', cap: '50 万'},
  {year: 2000.4, y: 830, name: '找不到买家', note: '开价 300 万没人接', cap: '4,300 万'},
  {year: 2001.6, y: 780, name: 'MIH 进来', note: '拿走 46.5%', cap: '4.7 亿'},
  {year: 2004.5, y: 660, name: '香港上市', note: '发行价 3.7 港元', cap: '62 亿'},
  {year: 2007.5, y: 540, name: '游戏变现', note: 'Q 币 · 穿越火线', cap: '800 亿'},
  {year: 2008.8, y: 610, name: '金融危机', note: '一年跌掉一半', cap: '380 亿'},
  {year: 2010.85, y: 500, name: '3Q 大战', note: '一个艰难的决定', cap: '3,100 亿'},
  {year: 2013.7, y: 420, name: '微信起来', note: '四亿人在用', cap: '7,800 亿'},
  {year: 2017.9, y: 300, name: '巅峰', note: '全球前十', cap: '4.2 万亿'},
  {year: 2018.8, y: 400, name: '版号寒冬', note: '股价砍掉四成', cap: '2.37 万亿'},
  {year: 2021.07, y: 285, name: '7.35 万亿', note: '历史最高', cap: '7.35 万亿'},
  {year: 2022.8, y: 520, name: '坠落', note: '跌回 1.81 万亿', cap: '1.81 万亿'},
  {year: 2024.5, y: 470, name: '复苏', note: '视频号接棒', cap: '3.6 万亿'},
  {year: 2026.15, y: 380, name: '今天', note: '混元 · 元宝', cap: '6 万亿'},
];

/** 隧道：轨道从这里钻进山里。arch 是山顶比轨面高多少 */
export const TUNNELS = [
  // 只保留「坠落」这一个洞：全片最惨的一段才值得穿山，版号寒冬用陡坡表达
  {from: 2021.45, to: 2022.95, arch: 290, label: '坠落'},
];

const Y0 = 1998.9;
const Y1 = 2026.8;
const X0 = 340;
const X1 = 6900;

/** 年份 → 世界横坐标 */
export const gx = (year: number) => X0 + ((year - Y0) / (Y1 - Y0)) * (X1 - X0);

/** 世界横坐标 → 年份 */
export const xg = (x: number) => Y0 + ((x - X0) / (X1 - X0)) * (Y1 - Y0);

export const WORLD_W = 7400;
export const WORLD_H = 1120;

/* ============ 轨道中线 ============ */

const RAW: [number, number][] = [
  [X0 - 420, 900],
  [X0 - 140, 900],
  ...NODES.map((n) => [gx(n.year), n.y] as [number, number]),
  [gx(2027.3), 420],
  [gx(2028.2), 430],
];

/** Catmull-Rom 采样：节点处切线连续，铁轨才不会有折角 */
const crSample = (pts: [number, number][], step: number): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const len = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const n = Math.max(2, Math.round(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};

/** 轨道中线：每 5px 一个点 */
export const RAIL = crSample(RAW, 5);

/** 某横坐标处的轨面高度 */
export const yAt = (x: number): number => {
  if (x <= RAIL[0][0]) return RAIL[0][1];
  for (let i = 1; i < RAIL.length; i++) {
    if (x <= RAIL[i][0]) {
      const [x0, y0] = RAIL[i - 1];
      const [x1, y1] = RAIL[i];
      return y0 + ((x - x0) / (x1 - x0 || 1)) * (y1 - y0);
    }
  }
  return RAIL[RAIL.length - 1][1];
};

/** 沿轨面法线偏移 d（正数朝屏幕下方），返回折线 */
export const offsetRail = (d: number, from = 0, to = WORLD_W): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 1; i < RAIL.length; i++) {
    const [x, y] = RAIL[i];
    if (x < from || x > to) continue;
    const [px, py] = RAIL[i - 1];
    const dx = x - px;
    const dy = y - py;
    const len = Math.hypot(dx, dy) || 1;
    out.push([x + (dy / len) * d, y - (dx / len) * d]);
  }
  return out;
};

export const toPath = (pts: [number, number][], close = false): string =>
  pts.length ? `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}${close ? ' Z' : ''}` : '';

/* ============ 市值（示意） ============ */

export const CAP: [number, number][] = [
  [1998.0, 0.05],
  [2000.3, 0.43],
  [2001.6, 4.7],
  [2003.3, 8],
  [2004.5, 62],
  [2005.5, 100],
  [2007.5, 800],
  [2008.8, 380],
  [2010.85, 3100],
  [2011.15, 3200],
  [2013.7, 7800],
  [2015.3, 15500],
  [2016.7, 19900],
  [2017.9, 42000],
  [2018.05, 45100],
  [2018.8, 23700],
  [2020.9, 54200],
  [2021.07, 73500],
  [2021.9, 45000],
  [2022.8, 18100],
  [2023.7, 40000],
  [2024.5, 36000],
  [2025.5, 49000],
  [2026.15, 60000],
  [2026.8, 35000],
];

const LOG_LO = Math.log10(0.05);
const LOG_HI = Math.log10(73500);

/** 市值（亿港元）→ 0..1 的对数位置 */
export const capNorm = (v: number) => Math.max(0, Math.min(1, (Math.log10(Math.max(v, 0.05)) - LOG_LO) / (LOG_HI - LOG_LO)));

export const capAt = (year: number): number => {
  if (year <= CAP[0][0]) return CAP[0][1];
  for (let i = 1; i < CAP.length; i++) {
    if (year <= CAP[i][0]) {
      const [y0, v0] = CAP[i - 1];
      const [y1, v1] = CAP[i];
      return v0 * Math.pow(v1 / v0, (year - y0) / (y1 - y0 || 1));
    }
  }
  return CAP[CAP.length - 1][1];
};

/* ============ 字幕 ============ */

export interface Sub {
  from: number;
  to: number;
  text: string;
  hit?: string;
}

export const DURATION = 540;

export const RAIL_SUBS: Sub[] = [
  {from: 6, to: 96, text: '1998 年，深圳，五个人，一间小屋。', hit: '1998 年'},
  {from: 104, to: 196, text: '2004 年香港上市，市值六十二亿。', hit: '六十二亿'},
  {from: 204, to: 300, text: '2018 年版号停发，股价砍掉四成。', hit: '砍掉四成'},
  {from: 308, to: 424, text: '2021 年 7.35 万亿，两年后剩 1.8 万亿。', hit: '1.8 万亿'},
  {from: 432, to: 536, text: '28 年，一条轨，没有第二条。', hit: '没有第二条'},
];

export const FILM_SUBS: Sub[] = [
  {from: 6, to: 96, text: '同一段历史，换一种装裱。', hit: '装裱'},
  {from: 104, to: 196, text: '每一格，是几年的曝光。', hit: '曝光'},
  {from: 204, to: 300, text: '2018 年这一格，划了一道口子。', hit: '口子'},
  {from: 308, to: 424, text: '2021 到 2022，两格之间断过一次。', hit: '断过一次'},
  {from: 432, to: 536, text: '28 年，一格都不能剪。', hit: '一格都不能剪'},
];
