/**
 * ep53 风格样片：同一段内容（2019 年 · 8,588 亿 · 实体清单）在五种视觉语言下的效果。
 * 只用来挑风格，不参与正片。数字与 docs/ep53-huawei-history-核查.json 一致。
 */

/** 统一取这一帧：所有 at 都 ≤ 130，保证元素全部入场 */
export const F = 160;

export const W = 1920;
export const H = 1080;

/** 2016–2021 销售收入（亿元）。只取核查表里有据可查的年份。 */
export const SERIES: {y: number; v: number}[] = [
  {y: 2016, v: 5216},
  {y: 2018, v: 7212},
  {y: 2019, v: 8588},
  {y: 2020, v: 8914},
  {y: 2021, v: 6368},
];

export const REV_MIN = 5216;
export const REV_MAX = 8914;
