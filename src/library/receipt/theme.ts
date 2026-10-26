import {continueRender, delayRender, staticFile} from 'remotion';
import '../vox/theme';

/**
 * 账单纸带风（Receipt Roll）。
 *
 * 整套只三种材质：冷白纸、碳带黑、印泥红。
 * 刻意避开工程里已有的全部暖色系（旧纸米、暗金、火光、暖纸桌面）。
 */
export const R = {
  desk: '#0E1512', // 台面：深墨绿近黑
  deskHi: '#23322A', // 顶光落到台面的亮部
  deskLo: '#050806',
  paper: '#F4F3EE', // 纸：极冷白，不是米黄
  paperShade: '#E4E3DB', // 纸背 / 折痕
  ink: '#14150F', // 碳带黑
  ink2: '#6B6C63',
  ink3: '#A3A398',
  rule: 'rgba(20,21,15,0.16)', // 账单上的点线
  red: '#C0392B', // 印泥红：只给合计、警告、转折
  redDeep: '#8E2A20',
  indigo: '#2E5266', // 蓝黑墨水：次要数据
  indigoLight: '#4A7690',
};

export const RF = {
  /** 点阵等宽，模拟 9 针打印机的锯齿边。给所有数字和金额 */
  dot: `'Receipt Dot', 'Consolas', 'Cascadia Mono', monospace`,
  /** 中文正文 */
  cn: `'PingFang SC', 'Microsoft YaHei UI', 'Microsoft YaHei', sans-serif`,
  /** 中文标题 */
  heavy: `'Vox Heavy', 'PingFang SC', 'Microsoft YaHei', sans-serif`,
};

if (typeof document !== 'undefined') {
  const handle = delayRender('load receipt dot font');
  const face = new FontFace('Receipt Dot', `url(${staticFile('fonts/receipt/VT323-Regular.ttf')})`);
  face
    .load()
    .then((loaded) => {
      document.fonts.add(loaded);
      continueRender(handle);
    })
    .catch((err) => {
      console.error('receipt font failed', err);
      continueRender(handle);
    });
}

/** 纸面的横向打印压痕：52px 一道，比纸色深一丝 */
export const PAPER_LINES = `repeating-linear-gradient(180deg, rgba(20,21,15,0.035) 0 1px, transparent 1px 52px)`;

/** 齿孔：每 26px 一个小圆，圆心穿透到台面色 */
export const PERF_HOLE = `radial-gradient(circle 4.5px at 50% 50%, rgba(14,21,18,0.82) 97%, transparent 100%)`;
