/**
 * ep60《养一个孩子要多少钱》数据表
 *
 * 全部来自《中国生育成本报告 2026 版》（育娲人口）。
 * 口径：2024 年，全国，备孕（−1 岁）至 17 岁，每孩月均分摊生育成本，单位元。
 * 共 228 个月 —— 12 + 12 + 12 + 12 + 36 + 72 + 36 + 36 = 228。
 */

export type AgeBand = {
  key: string;
  /** 屏幕上显示的年龄标签 */
  age: string;
  /** 支出构成说明 */
  name: string;
  /** 该年龄段月数 */
  months: number;
  /** 每孩月均分摊生育成本 */
  monthly: number;
};

/** 表 9：分年龄段的每孩月均分摊生育成本（全国） */
export const AGES: AgeBand[] = [
  {key: 'fetal', age: '−1 岁', name: '孕检、婴儿床', months: 12, monthly: 554.86},
  {key: 'born', age: '0 岁', name: '住院、月子、奶粉', months: 12, monthly: 3176.67},
  {key: 'y1', age: '1 岁', name: '奶粉、纸尿裤、疫苗', months: 12, monthly: 2863.82},
  {key: 'y2', age: '2 岁', name: '托育班、早教课', months: 12, monthly: 2637.57},
  {key: 'kg', age: '3-5 岁', name: '幼儿园、兴趣班', months: 36, monthly: 2723.52},
  {key: 'pri', age: '6-11 岁', name: '小学、兴趣班', months: 72, monthly: 2608.51},
  {key: 'mid', age: '12-14 岁', name: '初中（义务教育）', months: 36, monthly: 2320.17},
  {key: 'high', age: '15-17 岁', name: '高中补课费', months: 36, monthly: 2772.65},
];

export type Line = {
  /** 第几期，1..228 */
  n: number;
  band: number;
  age: string;
  name: string;
  /** 该年龄段内的第几个月 */
  month: number;
  amount: number;
  /** 打印到这一期为止的累计 */
  cum: number;
};

const build = (): Line[] => {
  const out: Line[] = [];
  let cum = 0;
  let n = 0;
  AGES.forEach((b, bi) => {
    for (let m = 1; m <= b.months; m++) {
      n += 1;
      cum += b.monthly;
      out.push({n, band: bi, age: b.age, name: b.name, month: m, amount: b.monthly, cum: Math.round(cum * 100) / 100});
    }
  });
  return out;
};

export const LINES: Line[] = build();

/**
 * 按阶段合并成 8 行。
 * 每个月都一样的数字不该重复打 12 次 —— 一列「每月多少」，一列「这一段一共多少」。
 */
export type Stage = {
  idx: string;
  age: string;
  name: string;
  monthly: number;
  months: number;
  /** 这一段的合计 = monthly × months */
  total: number;
  /** 到这一段为止的累计 */
  cum: number;
};

export const STAGES: Stage[] = (() => {
  let cum = 0;
  return AGES.map((a, i) => {
    const total = Math.round(a.monthly * a.months * 100) / 100;
    cum = Math.round((cum + total) * 100) / 100;
    return {
      idx: String(i + 1).padStart(2, '0'),
      age: a.age,
      name: a.name,
      monthly: a.monthly,
      months: a.months,
      total,
      cum,
    };
  });
})();

/** 228 期合计，579,996 元 —— 报告口径 58.00 万 */
export const TOTAL = LINES[LINES.length - 1].cum;
export const MONTHS = LINES.length;

const num = (v: number) => v.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

export const money = num;
/** 千分位、不带小数，给大字号用 */
export const money0 = (v: number) => Math.round(v).toLocaleString('en-US');

/* ------------------------------------------------------------------ */
/* 表 9 的分类别矩阵（全国，元/月）：饮食 衣着 居住 日用 交通 医疗 文教 其他 */
/* ------------------------------------------------------------------ */

export const CATEGORIES = ['饮食', '衣着', '居住', '日用', '交通通信', '医疗', '文教', '其他'] as const;

export const BY_CATEGORY: Record<string, number[]> = {
  fetal: [37.21, 50.06, 197.54, 82.23, 120.25, 49.76, 5.63, 12.18],
  born: [742.16, 77.35, 773.76, 207.86, 282.15, 928.58, 49.68, 115.15],
  y1: [785.87, 90.81, 675.81, 201.62, 335.17, 592.71, 81.09, 100.74],
  y2: [772.64, 105.55, 593.98, 182.07, 378.41, 359.66, 163.36, 81.9],
  kg: [702.28, 128.88, 484.14, 167.14, 400.33, 205.57, 580.39, 54.79],
  pri: [631.77, 131.54, 483.91, 136.41, 292.53, 166.21, 714.84, 51.3],
  mid: [610.97, 126.06, 521.84, 117.25, 231.02, 183.04, 467.04, 62.95],
  high: [602.99, 149.46, 436.94, 124.04, 298.49, 133.37, 967.28, 60.08],
};

/** −1 至 17 岁整体的分类别月均，合计 2,543.84 */
export const AVG_BY_CATEGORY = [625.12, 122.43, 498.6, 143.03, 297.93, 236.52, 559.63, 60.59];

/**
 * 把统计局的八个大类翻译成观众能对上号的说法。
 * 「文教 559.63」没人有概念，「幼儿园、兴趣班、补课 559」所有人都懂。
 */
export const PLAIN_CATEGORY: {name: string; plain: string; v: number}[] = [
  {name: '饮食', plain: '奶粉、辅食、买菜', v: 625.12},
  {name: '文教', plain: '幼儿园、兴趣班、补课', v: 559.63},
  {name: '居住', plain: '多一间房的房租水电', v: 498.6},
  {name: '交通通信', plain: '接送、打车、话费', v: 297.93},
  {name: '医疗', plain: '孕检、住院、药品、疫苗、体检', v: 236.52},
  {name: '日用', plain: '纸尿裤、洗护、月嫂', v: 143.03},
  {name: '衣着', plain: '衣服、鞋子', v: 122.43},
  {name: '其他', plain: '玩具、杂项', v: 60.59},
];

/** 分段的大头：观众最想问的「这时候主要在花什么钱」 */
export const STAGE_PLAIN: {age: string; v: number; head: string}[] = [
  {age: '孕前一年', v: 554.86, head: '孕检、婴儿床、待产包'},
  {age: '0 岁', v: 3176.67, head: '住院分娩、月子中心、奶粉、纸尿裤'},
  {age: '1 岁', v: 2863.82, head: '奶粉、纸尿裤、疫苗'},
  {age: '2 岁', v: 2637.57, head: '托育班、早教课'},
  {age: '3-5 岁', v: 2723.52, head: '幼儿园学费，教育费从每月 50 涨到 580'},
  {age: '6-11 岁', v: 2608.51, head: '小学学费、兴趣班，教育费 715'},
  {age: '12-14 岁', v: 2320.17, head: '初中，义务教育反而最便宜'},
  {age: '15-17 岁', v: 2772.65, head: '高中补课，教育费 967 最高'},
];

/* ------------------------------------------------------------------ */
/* 三个价格与分布（全片的核心对照）                                    */
/* ------------------------------------------------------------------ */

export const THREE_PRICES = {
  /** 分摊：家庭全部消费按比例摊给孩子的份额 */
  allocated: {monthly: 2543.84, total: 579996, label: '分摊生育成本'},
  /** 必要：剔掉非刚性支出后，低 31.876% */
  necessary: {monthly: 1732.96, total: 395115, label: '必要生育成本'},
  /** 净增：真的因为多了这个人才多花的部分 */
  marginal: {monthly: 1109.63, total: 252996, label: '净增生育成本'},
};

/** 净增生育成本的分位数（全国核心区，元/月） */
export const MARGINAL_PERCENTILES = [
  {p: '10%', v: 176.69},
  {p: '25%', v: 344.27},
  {p: '50%', v: 647.9},
  {p: '75%', v: 1227.71},
  {p: '90%', v: 2259.47},
];

/** 中位数累计：647.90 × 228 = 14.77 万 */
export const MEDIAN_TOTAL = 147721;

/** 分孩次净增（全国核心区，元/月） */
export const BY_CHILD = [
  {n: 1, v: 1269.48, ratio: 1},
  {n: 2, v: 907.69, ratio: 0.715},
  {n: 3, v: 773.75, ratio: 0.6095},
  {n: 4, v: 470.91, ratio: 0.3709},
];

/** 省域极值（分摊，元/月） */
export const PROVINCES = {
  top: [
    {name: '上海', v: 4751.34},
    {name: '北京', v: 4483.36},
    {name: '浙江', v: 4065.08},
  ],
  bottom: [
    {name: '西藏', v: 1710.76},
    {name: '甘肃', v: 1787.0},
    {name: '贵州', v: 1880.91},
  ],
  national: 2543.84,
};

/** 国际比较：至 18 岁成本 / 人均 GDP 的倍数 */
export const INTERNATIONAL = [
  {name: '韩国', v: 7.79},
  {name: '中国', v: 6.05},
  {name: '新西兰', v: 4.55},
  {name: '加拿大', v: 4.34},
  {name: '日本', v: 4.18},
  {name: '美国', v: 4.11},
  {name: '德国', v: 3.64},
  {name: '瑞典', v: 2.91},
  {name: '澳大利亚', v: 2.08},
];

/** 背面：时间 / 机会 / 健康 */
export const BACKSIDE = [
  {k: '时间', v: '−12.6', unit: '小时 / 周', note: '母亲的闲暇（一孩，0-6 岁）'},
  {k: '机会', v: '−40%', unit: '劳动参与', note: '生育当年的女性参与率'},
  {k: '机会', v: '−6~7 年', unit: '一生工时', note: '折合收入损失约 30 万元'},
  {k: '健康', v: '盆底 · 睡眠', unit: '', note: '生理损耗与围产期焦虑'},
];
