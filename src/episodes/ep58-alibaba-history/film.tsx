import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put, RedCheck, RedX} from '../../library/vox/desk';
import {hudFade, rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, IndexCard, Label} from '../../library/vox/props';
import {DeskLitter, PostIt, Pushpin, Stamp, Sticker} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {Chip, Crowd18, Escrow, Gong, LakeHouse, Parcel, PhoneApp, Rack, Scooter, TickerWall} from './art';
import {cf, cw} from './cues';
import {CAP_PTS, capAt, capY, GAP_X, RULER_Y, WORLD_H, WORLD_W, xy, yx} from './timeline';

const W = 1920;
const H = 1080;
const p12 = (f: number, at: number, dur: number) => Math.max(0, Math.min(1, (step12(f) - at) / dur));
const countUp = (f: number, at: number, to: number, dur = 30, dec = 0) => {
  const v = to * (1 - Math.pow(1 - p12(f, at, dur), 3));
  return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
};

/** 每个故事节点在桌面上的横坐标 */
const X = {
  now: yx(2026.85),
  found: yx(1999.15),
  seed: yx(2000.05),
  bubble: yx(2000.6),
  tao: yx(2003.35),
  pay: yx(2004.2),
  yahoo: yx(2005.6),
  ipo1: yx(2007.85),
  crash: yx(2008.8),
  back: yx(2012.4),
  nyse: yx(2014.7),
  hk: yx(2019.9),
  peak: yx(2020.8),
  ant: yx(2020.9),
  fine: yx(2021.3),
  fall: yx(2022.8),
  org: yx(2023.75),
  ai: yx(2025.1),
  war: yx(2025.8),
  today: yx(2026.5),
  final: yx(2027.2),
};

/* ============ 相机路线 ============ */

const CAM: CamKey[] = [
  // 每页的 x 偏移不是统一值：各节点元素的横向分布不同（有的全挂在 x-660，有的挂在 x+100），
  // 统一用 X-30 会让一部分页左贴边、另一部分页右边空一大片。
  // 这里的偏移是按「该页内容包围盒的中点」逐页量出来的（探测帧 1920×1080 实测左右留白）。
  // 钩子：停在今天
  // 钩子这一页内容最宽（x-1010 到 x+520，1530 世界像素），z 要比别段小一点才不压边
  {f: 0, x: X.now - 430, y: 430, z: 1.19},
  {f: cf(5), x: X.now - 250, y: 470, z: 1.13, ease: 'sine', dur: 34},
  // 「把时间线拉出来看」：沿轴倒着甩回 1999
  {f: cf(7) + 18, x: yx(2012), y: 520, z: 0.34, ease: 'sine', dur: 32},
  {f: cf(8) - 2, x: X.found - 45, y: 470, z: 1.3, ease: 'tail', dur: 28},
  {f: cf(9), x: X.found - 45, y: 480, z: 1.3, ease: 'sine', dur: 20},
  // 两笔救命钱
  {f: cf(14) - 4 - 26 - 8, x: X.seed - 30, y: 470, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(16), x: X.seed - 30, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 泡沫
  {f: cf(19) - 4 - 24 - 8, x: X.bubble - 40, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(20), x: X.bubble - 40, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 淘宝
  {f: cf(21) - 4 - 28 - 8, x: X.tao - 100, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(24), x: X.tao - 100, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 支付宝
  {f: cf(28) - 4 - 24 - 8, x: X.pay - 95, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(29), x: X.pay - 95, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 雅虎：c31—c33 右侧留白是刻意的（c34 的「活了下来」补位），不居中，否则 c34 会把右下角顶出画
  {f: cf(31) - 4 - 24 - 8, x: X.yahoo - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(32), x: X.yahoo - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 首次上市
  {f: cf(35) - 4 - 26 - 8, x: X.ipo1 - 125, y: 470, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(37), x: X.ipo1 - 125, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 崩盘与退市
  {f: cf(40) - 4 - 26 - 8, x: X.crash - 30, y: 480, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(42), x: X.crash - 30, y: 470, z: 1.3, ease: 'sine', dur: 20},
  // 想去香港而不得
  {f: cf(43) - 4 - 24 - 8, x: X.back - 65, y: 480, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(45), x: X.back - 65, y: 470, z: 1.3, ease: 'sine', dur: 18},
  // 纽交所
  {f: cf(47) - 4 - 28 - 8, x: X.nyse - 190, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(49), x: X.nyse - 190, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 回港
  {f: cf(52) - 4 - 28 - 8, x: X.hk - 140, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(54), x: X.hk - 140, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 6.7 万亿：只剩两个大数字，居中放，别贴着左边
  {f: cf(57) - 4 - 26 - 8, x: X.peak + 45, y: 460, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(58), x: X.peak + 45, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 蚂蚁
  {f: cf(59) - 4 - 26 - 8, x: X.ant - 70, y: 470, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(61), x: X.ant - 70, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 罚单：内容整体右移到 xf-230（见组件里注释），相机保持 -30
  {f: cf(65) - 4 - 24 - 8, x: X.fine - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(66), x: X.fine - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 坠落：这一页宽 1390 世界像素，z=1.3 时左右各只剩 56px，收到 1.27
  {f: cf(67) - 4 - 28 - 8, x: X.fall + 75, y: 480, z: 1.27, ease: 'tail', dur: 28},
  {f: cf(70), x: X.fall + 75, y: 470, z: 1.27, ease: 'sine', dur: 22},
  // 组织变革
  {f: cf(73) - 4 - 26 - 8, x: X.org - 125, y: 480, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(75), x: X.org - 125, y: 470, z: 1.3, ease: 'sine', dur: 20},
  // AI 重估
  {f: cf(76) - 4 - 28 - 8, x: X.ai - 100, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(78), x: X.ai - 100, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 闪购大战
  {f: cf(79) - 4 - 24 - 8, x: X.war - 85, y: 480, z: 1.28, ease: 'tail', dur: 24},
  {f: cf(81), x: X.war - 85, y: 470, z: 1.3, ease: 'sine', dur: 20},
  // 今天
  {f: cf(83) - 4 - 26 - 8, x: X.today - 30, y: 480, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(86), x: X.today - 30, y: 470, z: 1.3, ease: 'sine', dur: 20},
  // 收尾：桌面纸到 WORLD_W(28200) 就断了，相机不能越过 28200-960/z，否则右边缘会露出纸外
  {f: cf(88) - 4 - 34 - 8, x: X.final - 250, y: 460, z: 1.22, ease: 'tail', dur: 34},
  {f: cf(90), x: X.final - 190, y: 460, z: 1.26, ease: 'sine', dur: 30},
];


/* ============ 通用小件 ============ */

const Person: React.FC<{x: number; y: number; name: string; note?: string; hair?: Hair; glasses?: boolean; beard?: boolean; tie?: boolean; leather?: boolean; shirt?: boolean; turtleneck?: boolean; rot?: number; w?: number}> = ({x, y, name, note, rot = -3, w = 140, ...look}) => (
  <Put x={x} y={y}>
    <HalftonePhoto w={w} h={w * 1.2} rot={rot} dot={5} caption={name}>
      <Portrait w={w} h={w * 1.2} {...look} />
    </HalftonePhoto>
    {note && <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, textAlign: 'center', marginTop: 8, width: w + 28, whiteSpace: 'nowrap'}}>{note}</div>}
  </Put>
);

const Photo: React.FC<{x: number; y: number; w: number; h: number; caption: string; rot?: number; children: React.ReactNode}> = ({x, y, w, h, caption, rot = -2, children}) => (
  <Put x={x} y={y}>
    <HalftonePhoto w={w} h={h} rot={rot} dot={6} caption={caption}>
      {children}
    </HalftonePhoto>
  </Put>
);

const Note: React.FC<{x: number; y: number; size?: number; color?: string; children: React.ReactNode}> = ({x, y, size = 26, color = V.ink, children}) => (
  <Put x={x} y={y}>
    <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: size, color, whiteSpace: 'nowrap'}}>{children}</div>
  </Put>
);

/* ============ 桌面底：尺子、市值网格、命运线 ============ */

const RULER_YEARS = [1999, 2003, 2007, 2012, 2016, 2020, 2024, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(1998.9), top: RULER_Y, width: yx(2027.2) - yx(1998.9), height: 6, background: V.ink}} />
    {RULER_YEARS.map((y) => (
      <div key={y} style={{position: 'absolute', left: yx(y) - 60, top: RULER_Y, width: 120, textAlign: 'center'}}>
        <div style={{width: 5, height: 26, background: V.ink, margin: '0 auto'}} />
        <div style={{fontFamily: VF.num, fontSize: 42, color: V.ink, marginTop: 6}}>{y}</div>
      </div>
    ))}
  </>
);

const GRID: [number, string][] = [
  [1, '1 亿'],
  [100, '100 亿'],
  [10000, '1 万亿'],
];

// 灰色刻度 / 图例都是装饰：压到右上角年份计数器就淡出，别在 HUD 底下露半截字
const CapGrid: React.FC<{cam: {x: number; y: number; z: number}}> = ({cam}) => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: X.found, top: capY(v), width: WORLD_W - X.found - 600, borderTop: '3px dashed rgba(23,23,22,0.15)'}} />
        {[X.found + 330, X.seed + 330, X.tao + 330, X.crash + 330, X.nyse + 330, X.ant + 330, X.fall + 330, X.ai + 330].map((x) => {
          const op = hudFade(x + 12, capY(v) - 30, 96, 28, cam);
          if (op <= 0.01) return null;
          return (
            <div key={x} style={{position: 'absolute', left: x + 12, top: capY(v) - 30, fontFamily: VF.heavy, fontSize: 17, color: 'rgba(23,23,22,0.22)', whiteSpace: 'nowrap', opacity: op}}>
              {t}
            </div>
          );
        })}
      </React.Fragment>
    ))}
    <div
      style={{
        position: 'absolute',
        left: X.found + 150,
        top: capY(0.01) + 26,
        fontFamily: VF.serifCn,
        fontWeight: 700,
        fontSize: 24,
        color: V.red,
        whiteSpace: 'nowrap',
        opacity: hudFade(X.found + 150, capY(0.01) + 26, 540, 34, cam),
      }}
    >
      红线：阿里巴巴市值（亿港元，对数刻度，示意）
    </div>
    <div
      style={{
        position: 'absolute',
        left: yx(2012.4) - 40,
        top: capY(400) - 76,
        fontFamily: VF.heavy,
        fontSize: 19,
        color: 'rgba(23,23,22,0.42)',
        whiteSpace: 'nowrap',
        opacity: hudFade(yx(2012.4) - 40, capY(400) - 76, 200, 28, cam),
      }}
    >
      退市四年 · 线断了
    </div>
  </>
);

const CapLine: React.FC<{x0: number; x1: number}> = ({x0, x1}) => {
  const seg = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const d1 = seg(CAP_PTS.filter(([x]) => x <= GAP_X[0]));
  const d2 = seg(CAP_PTS.filter(([x]) => x >= GAP_X[1]));
  const head = Math.min(x1, CAP_PTS[CAP_PTS.length - 1][0]);
  return (
    <>
      <svg width={WORLD_W} height={WORLD_H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', clipPath: `inset(0 ${WORLD_W - x1}px 0 ${x0}px)`}}>
        <path d={d1} stroke={V.red} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <path d={d2} stroke={V.red} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {head > x0 && head > X.found && <div style={{position: 'absolute', left: head - 16, top: capAt(head) - 16, width: 32, height: 32, borderRadius: 16, background: V.red, border: `4px solid ${V.paper}`}} />}
    </>
  );
};

const lineSpan = (f: number, camX: number): [number, number] => {
  if (f < cf(7)) return [0, 0];
  if (f < cf(8)) return [0, WORLD_W];
  if (f < cf(88)) return [0, Math.max(X.found, camX + 700)];
  return [0, WORLD_W];
};

/* ============ 01 · 钩子：今天 ============ */

const Now: React.FC<{f: number}> = ({f}) => {
  const x = X.now;
  const END = cf(8);
  return (
    <>
      <At f={f} at={cf(1)} until={END}>
        <Put x={x - 1010} y={150}>
          <Label size={30} bg={V.red}>2026.10 · 阿里巴巴</Label>
        </Put>
        <Put x={x - 1010} y={212}>
          <Big size={132}>{countUp(f, cf(1), 1.95, 30, 2)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>港元市值 · 2026 年 10 月 23 日收盘</div>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={END}>
        <Put x={x - 1010} y={470}>
          <IndexCard w={500} h={236} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -12}}>一年前</div>
            <div style={{fontFamily: VF.num, fontSize: 64, color: V.ink, marginTop: 2}}>3.7 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 2}}>2025 年 10 月 · 186 港元</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(3)} until={END}>
        <Put x={x - 470} y={470}>
          <IndexCard w={420} h={236} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -12}}>五年前</div>
            <div style={{fontFamily: VF.num, fontSize: 64, color: V.ink, marginTop: 2}}>6.7 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 2}}>2020 年 10 月 · 309 港元</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(4)} until={END}>
        <Put x={x - 30} y={470}>
          <Stamp size={48} rot={-6}>三次上市 · 退过一次</Stamp>
        </Put>
        <Note x={x - 40} y={600} size={26} color={V.inkSoft}>2007 香港 · 2014 纽约 · 2019 回家</Note>
      </At>
      <At f={f} at={cf(5)} until={END}>
        <Put x={x - 1010} y={710}>
          <Big size={64}>50 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>1999 年 · 18 个人凑的注册资金</div>
        </Put>
      </At>
      <At f={f} at={cf(6)} until={END}>
        <Put x={x - 460} y={726}>
          <Stamp size={46} rot={5} color={V.ink}>最狠跌掉八成</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(6)} until={END}>
        <Put x={x + 330} y={180}>
          <Sticker rot={6}>
            <PhoneApp s={190} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(7)} until={END}>
        <Put x={x + 360} y={620}>
          <div style={{fontFamily: VF.num, fontSize: 200, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 02 · 1999 湖畔花园 ============ */

const Found: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1999.2.21 · 杭州湖畔花园</Label>
      </Put>
      <Put x={x - 700} y={112}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Sticker rot={-3}>
            <LakeHouse w={330} h={220} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>湖畔花园民宅（示意）</div>
        </div>
      </Put>
      <At f={f} at={cf(9)}>
        <Person x={x + 10} y={150} name="马云" note="35 岁 · 英语老师出身" hair="side" w={132} rot={-3} />
        <Put x={x + 250} y={170}>
          <Doc w={420} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>注册资金</div>
            <div style={{fontFamily: VF.num, fontSize: 62, color: V.ink, lineHeight: 1.1}}>50 万</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>18 个人，一间民宅</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(9)}>
        <Put x={x - 320} y={430}>
          <Crowd18 s={400} />
        </Put>
        <Note x={x - 330} y={742} size={22} color={V.inkSoft}>十八罗汉围坐开会 · 示意</Note>
      </At>
      <At f={f} at={cf(10)}>
        <Put x={x + 120} y={430}>
          <PostIt w={330} rot={3} color="#e8e2cf" head="使命">
            让天下没有难做的生意
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(11)} until={cf(15)}>
        <Put x={x + 330} y={700}>
          <Stamp size={44} rot={-7}>活 102 年</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(12)} until={cf(14)}>
        <Put x={x + 120} y={640}>
          <Label size={24} bg={V.ink}>最难时工资发一半</Label>
        </Put>
      </At>
      <At f={f} at={cf(13)} until={cf(15)}>
        <Person x={x + 520} y={600} name="蔡崇信" note="放弃百万年薪" hair="side" glasses tie w={120} rot={4} />
      </At>
    </>
  );
};

/* ============ 03 · 两笔救命钱 ============ */

const Seed: React.FC<{f: number}> = ({f}) => {
  const x = X.seed;
  const xb = X.bubble;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28}>1999.10 — 2000.1 · 两笔钱</Label>
      </Put>
      <At f={f} at={cf(14)}>
        <Put x={x - 660} y={140}>
          <IndexCard w={400} h={150} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -8}}>前后拒绝</div>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.ink, lineHeight: 1.15}}>38 家</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>投资机构</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(15)}>
        <Put x={x - 660} y={350}>
          <Big size={88}>500 万美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: 6}}>1999.10 · 高盛领投</div>
        </Put>
      </At>
      <At f={f} at={cf(16)}>
        <Put x={x - 660} y={540}>
          <Big size={100} color={V.red}>2,000 万美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>2000.1 · 孙正义 · 谈了六分钟</div>
        </Put>
      </At>
      <At f={f} at={cf(16)}>
        <Put x={x + 60} y={130}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Sticker rot={3}>
              <Rack w={230} h={270} />
            </Sticker>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>机架服务器（示意）</div>
          </div>
        </Put>
      </At>
      {/* 印章原本在 x+420 y180，右边缘被画框切掉一截（页宽 1365 世界像素，z1.3 已经顶满）。
          挪到右下这片空白里，既不出画也补掉下半页的空 */}
      <At f={f} at={cf(18)} until={cf(19) - 18}>
        <Put x={x + 300} y={690}>
          <Stamp size={46} rot={-5}>这笔钱救了命</Stamp>
        </Put>
      </At>
      {/* 泡沫这一页相机已经推到 X.bubble，便利贴和账上余额必须挂到 bubble 上 */}
      <At f={f} at={cf(19)}>
        <Put x={xb - 560} y={250}>
          <PostIt w={320} rot={-3} head="2000 年 3 月">
            互联网泡沫破了
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(20)}>
        <Put x={xb + 60} y={560}>
          <Doc w={420} h={150} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>账上还剩</div>
            <div style={{fontFamily: VF.num, fontSize: 54, color: V.ink, lineHeight: 1.15}}>2,500 万美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red}}>别人在裁员</div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 04 · 淘宝 ============ */

const Tao: React.FC<{f: number}> = ({f}) => {
  const x = X.tao;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2003 · 非典</Label>
      </Put>
      <At f={f} at={cf(22)}>
        <Put x={x - 660} y={150}>
          <PostIt w={330} rot={-2} head="六个人">
            签了保密协议
            <br />
            回湖畔花园
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(23)}>
        <Put x={x - 300} y={140}>
          <Sticker rot={-4}>
            <PhoneApp s={200} />
          </Sticker>
        </Put>
        <Note x={x - 310} y={590} size={24}>2003.5.10 淘宝上线</Note>
      </At>
      <At f={f} at={cf(24)}>
        <Put x={x + 60} y={210}>
          <Doc w={380} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>对手</div>
            <div style={{fontFamily: VF.num, fontSize: 40, color: V.ink, lineHeight: 1.2}}>eBay</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>当时全球第一</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(25)}>
        <Put x={x + 60} y={380}>
          <Big size={160} color={V.red}>免费</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>开店免费 · 交易免费</div>
        </Put>
      </At>
      <At f={f} at={cf(27)}>
        <Put x={x + 100} y={700}>
          <Stamp size={44} rot={-6}>eBay 退出中国</Stamp>
        </Put>
      </At>
      <RedCheck f={f} at={cf(27)} x={x + 106} y={730} s={34} />
    </>
  );
};

/* ============ 05 · 支付宝 ============ */

const Pay: React.FC<{f: number}> = ({f}) => {
  const x = X.pay;
  return (
    <>
      <Put x={x - 620} y={66}>
        <Label size={28}>2003.10 · 担保交易</Label>
      </Put>
      <At f={f} at={cf(28)}>
        <Put x={x - 620} y={170}>
          <Doc w={400} h={160} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>卡在哪</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, lineHeight: 1.4}}>谁都不敢先付钱</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(29)}>
        <Put x={x - 610} y={330}>
          <Escrow s={400} />
        </Put>
      </At>
      <At f={f} at={cf(30)}>
        <Put x={x + 40} y={170}>
          <Big size={78} color={V.red}>支付宝</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>2003.10 上线 · 2004.12 独立成公司</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 06 · 雅虎 ============ */

const Yahoo: React.FC<{f: number}> = ({f}) => {
  const x = X.yahoo;
  return (
    <>
      <Put x={x - 600} y={66}>
        <Label size={28}>2005.8.11</Label>
      </Put>
      <At f={f} at={cf(31)}>
        <Put x={x - 600} y={150}>
          <PostIt w={320} rot={-3} head="2004—2005">
            淘宝和 eBay 烧钱
            <br />
            快撑不住了
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(32)}>
        <Put x={x - 600} y={290}>
          <Big size={110} color={V.red}>10 亿美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 6}}>雅虎投进来的</div>
        </Put>
      </At>
      <At f={f} at={cf(33)}>
        <Put x={x - 590} y={600}>
          <Stamp size={42} rot={-5}>外加雅虎中国 · 换 40%</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(34)} until={cf(37)}>
        <Put x={x + 200} y={240}>
          <Big size={92}>活了下来</Big>
        </Put>
      </At>
    </>
  );
};

/* ============ 07 · 2007 港股上市与崩盘 ============ */

const Ipo1: React.FC<{f: number}> = ({f}) => {
  const x = X.ipo1;
  const xc = X.crash;
  return (
    <>
      <Put x={x - 680} y={66}>
        <Label size={28} bg={V.red}>2007.11.6 · 港交所</Label>
      </Put>
      <At f={f} at={cf(35)}>
        <Put x={x - 680} y={140}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: 240}}>
            <Sticker rot={-2}>
              <Gong s={236} />
            </Sticker>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>开市铜锣（示意）</div>
          </div>
        </Put>
      </At>
      <At f={f} at={cf(36)}>
        <Put x={x - 390} y={150}>
          <Big size={104}>13.5 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>发行价 · 募资 116 亿</div>
        </Put>
      </At>
      <At f={f} at={cf(37)}>
        <Put x={x - 390} y={350}>
          <Big size={70} color={V.red}>+193%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>首日收盘</div>
        </Put>
      </At>
      <At f={f} at={cf(38)}>
        <Put x={x - 390} y={520}>
          <Doc w={430} h={150} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 23, color: V.inkSoft}}>市值近 2,000 亿港元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>全球第五大互联网公司</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(39)}>
        <Put x={x + 90} y={140}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Sticker rot={3}>
              <TickerWall w={330} h={200} />
            </Sticker>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>行情墙（示意）</div>
          </div>
        </Put>
      </At>
      {/* 崩盘这一页相机已经推到 X.crash，三个元素必须挂在 crash 上。
          以前挂在 X.ipo1（差 1200 世界像素），整页被推到屏幕外左边。 */}
      <At f={f} at={cf(40)}>
        <Put x={xc - 300} y={430}>
          <Big size={96} color={V.red}>3.42 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 4}}>2008 年 10 月</div>
        </Put>
      </At>
      <At f={f} at={cf(41)}>
        <Put x={xc - 300} y={640}>
          <Stamp size={46} rot={-6}>从最高点跌掉九成</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(42)}>
        <RedX f={f} at={cf(42)} x={xc + 150} y={560} s={44} />
      </At>
    </>
  );
};

/* ============ 08 · 退市与美股 ============ */

const Nyse: React.FC<{f: number}> = ({f}) => {
  const x = X.nyse;
  return (
    <>
      {/* 退市那张卡挂在 X.back 上。cf(43)-58 是相机开始横移的那两帧：
          卡从右边跟着镜头滑进画面，看着是「翻页」，而不是先在本页右边露出半张再被推过来。
          挂 cf(42) 会在静止画面上贴右边切一条（右边被遮挡的那种）。
          「13.5 私有化」那枚印章属于 c42 的口播，挪到崩盘页去和 3.42 对照，见下面。 */}
      <At f={f} at={cf(43) - 58} until={cf(47)}>
        <Put x={X.back - 640} y={66}>
          <Label size={26}>2012.6 — 2014.9</Label>
        </Put>
        <Put x={X.back - 640} y={160}>
          <IndexCard w={520} h={260} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, lineHeight: 1.7}}>
              ① 13.5 港元私有化，退市
              <br />
              ② 2013 年想回香港
              <br />
              ③ 同股不同权，不批
              <br />
              ④ 只能去美国
            </div>
          </IndexCard>
        </Put>
      </At>
      {/* 这枚印章是这一页唯一的右侧配重，去掉就成「左边一张卡、右边全空」了 */}
      <At f={f} at={cf(43) - 58} until={cf(47)}>
        <Put x={X.back + 100} y={200}>
          <Stamp size={46} rot={5}>13.5 港元私有化</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(47)}>
        <Put x={x - 660} y={66}>
          <Label size={28} bg={V.red}>2014.9.19 · 纽交所</Label>
        </Put>
      </At>
      <At f={f} at={cf(47)}>
        <Put x={x - 660} y={140}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Sticker rot={-2}>
              <TickerWall w={340} h={205} />
            </Sticker>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>行情墙（示意）</div>
          </div>
        </Put>
      </At>
      <At f={f} at={cf(48)}>
        <Put x={x - 660} y={400}>
          <Big size={104}>68 美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>发行价</div>
        </Put>
      </At>
      <At f={f} at={cf(49)}>
        <Put x={x - 240} y={150}>
          <Doc w={400} h={160} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>募资</div>
            <div style={{fontFamily: VF.num, fontSize: 50, color: V.ink, lineHeight: 1.2}}>250 亿美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>美股史上最大 IPO</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(50)}>
        <Put x={x - 240} y={430}>
          <Big size={82}>2,300 亿美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>首日收盘市值</div>
        </Put>
      </At>
      <At f={f} at={cf(51)}>
        <Put x={x - 230} y={560}>
          <Stamp size={44} rot={-5}>全球第二 · 仅次于谷歌</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 09 · 回港 4 万亿 → 6.7 万亿 ============ */

const Return: React.FC<{f: number}> = ({f}) => {
  const x = X.hk;
  const xp = X.peak;
  return (
    <>
      <Put x={x - 640} y={66}>
        <Label size={28} bg={V.red}>2019.11.26 · 回家</Label>
      </Put>
      <At f={f} at={cf(52)}>
        <Put x={x - 640} y={150}>
          <Big size={100}>176 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>发行价 · 募资 1,012 亿</div>
        </Put>
      </At>
      <At f={f} at={cf(54)}>
        <Put x={x - 640} y={430}>
          <Big size={112} color={V.red}>4 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>港元市值 · 港股第一</div>
        </Put>
      </At>
      <At f={f} at={cf(55)}>
        <Put x={x + 120} y={520}>
          <Stamp size={48} rot={-6}>超过腾讯</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(56)}>
        <Put x={x - 200} y={610}>
          <PostIt w={320} rot={2} head="2020">
            疫情把所有人赶上网
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(57)}>
        <Put x={xp - 240} y={150}>
          <Big size={100}>309 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 6}}>2020 年 10 月，历史最高</div>
        </Put>
      </At>
      <At f={f} at={cf(58)}>
        <Put x={xp - 240} y={450}>
          <Big size={150} color={V.red}>{countUp(f, cf(58), 6.7, 28, 1)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>港元市值 · 这辈子最高</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 10 · 蚂蚁与罚单 ============ */

const Ant: React.FC<{f: number}> = ({f}) => {
  const x = X.ant;
  const xf = X.fine;
  return (
    <>
      <Put x={x - 600} y={66}>
        <Label size={28}>2020.10 — 2021.4</Label>
      </Put>
      <At f={f} at={cf(59)}>
        <Put x={x - 600} y={130}>
          <Note x={0} y={0} size={34}>同一个月，蚂蚁要上市了</Note>
        </Put>
      </At>
      <At f={f} at={cf(60)}>
        <Put x={x - 600} y={192}>
          <Big size={110}>2.1 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>68.8 元定价 · 估值</div>
        </Put>
      </At>
      <At f={f} at={cf(61)}>
        <Put x={x + 60} y={170}>
          <Doc w={370} h={150} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 23, color: V.inkSoft}}>按融资规模</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>史上最大 IPO</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(62)}>
        <Put x={x - 600} y={470}>
          <PostIt w={330} rot={-2} head="10 月 24 日">
            马云在外滩讲话
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(63)}>
        <Put x={x - 200} y={470}>
          <Stamp size={58} rot={-7}>11.3 叫停</Stamp>
        </Put>
        <RedX f={f} at={cf(63)} x={x - 60} y={430} s={40} />
      </At>
      <At f={f} at={cf(64)}>
        <Put x={x + 70} y={470}>
          <Note x={0} y={0} size={30} color={V.inkSoft}>两万亿的估值，停在纸上</Note>
        </Put>
      </At>
      {/* 这一页只有两个元素，原来全挂在 xf-560，整页贴着左边（左 271 / 右 930）。
          相机不能往左挪——挪了会把蚂蚁页的残留（「按融资规模」「两万亿的估值，停在纸上」）
          拉进画框左边缘切成半截。所以改成把内容整体右移 330 去就相机。 */}
      <At f={f} at={cf(65)}>
        <Put x={xf - 230} y={180}>
          <Label size={26} bg={V.ink}>2020.12 · 反垄断立案</Label>
        </Put>
      </At>
      <At f={f} at={cf(66)}>
        <Put x={xf - 230} y={420}>
          <Big size={118} color={V.red}>{countUp(f, cf(66), 182.28, 30, 2)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 6}}>2021.4.10 · 2019 年境内销售额的 4%</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 11 · 坠落与 1+6+N ============ */

const Fall: React.FC<{f: number}> = ({f}) => {
  const x = X.fall;
  const xo = X.org;
  return (
    <>
      {/* 这个牌子挂在 X.fall-620，离上一页（罚单）的相机只有 680 世界像素，
          不包 At 就会在罚单页的右上角露一条被切的边 */}
      <At f={f} at={cf(67) - 56}>
        <Put x={x - 620} y={66}>
          <Label size={28} bg={V.red}>2021 — 2023</Label>
        </Put>
      </At>
      <At f={f} at={cf(67)}>
        <Put x={x - 620} y={150}>
          <Big size={110} color={V.red}>−48.88%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>2021 年全年</div>
        </Put>
      </At>
      <At f={f} at={cf(68)}>
        <Put x={x - 620} y={360}>
          <Note x={0} y={0} size={30}>蒸发 1.92 万亿</Note>
        </Put>
      </At>
      <At f={f} at={cf(69)}>
        <Put x={x - 620} y={500}>
          <Big size={104}>60 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>2022 年 10 月</div>
        </Put>
      </At>
      <At f={f} at={cf(70)}>
        <Put x={x + 40} y={200}>
          <Stamp size={52} rot={-6}>跌去八成</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(71)}>
        <Put x={x + 40} y={560}>
          <PostIt w={330} rot={3} head="芒格抄底">
            亏 40% 割肉
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(72)}>
        <Put x={x + 60} y={720}>
          <Note x={0} y={0} size={28} color={V.inkSoft}>「它就是一门零售生意」</Note>
        </Put>
      </At>
      <At f={f} at={cf(73)}>
        <Put x={xo - 560} y={170}>
          <Big size={92}>1 + 6 + N</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>2023.3.28 · 24 年最重要的一次变革</div>
        </Put>
      </At>
      <At f={f} at={cf(74)}>
        <Put x={xo - 560} y={470}>
          <Stamp size={46} rot={-5}>八个月，拆分收回</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(75)}>
        <Put x={xo - 90} y={170}>
          <Doc w={400} h={180} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>2023.9 交班</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink, lineHeight: 1.5}}>
              蔡崇信 · 吴泳铭
            </div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 12 · AI 重估 ============ */

const Ai: React.FC<{f: number}> = ({f}) => {
  const x = X.ai;
  const xw = X.war;
  const xt = X.today;
  return (
    <>
      <Put x={x - 640} y={66}>
        <Label size={28}>2025 — 2026</Label>
      </Put>
      <At f={f} at={cf(76)}>
        <Put x={x - 640} y={140}>
          <Note x={0} y={0} size={36}>用户为先，AI 驱动</Note>
        </Put>
      </At>
      <At f={f} at={cf(77)}>
        <Put x={x - 640} y={230}>
          <Big size={110} color={V.red}>3,800 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 6}}>三年 · 云和 AI 基础设施</div>
        </Put>
      </At>
      <At f={f} at={cf(78)}>
        <Put x={x + 40} y={130}>
          <Photo x={0} y={0} w={190} h={190} caption="AI 芯片（示意）" rot={-3}>
            <Chip s={200} />
          </Photo>
        </Put>
        <Note x={x + 30} y={470} size={24} color={V.inkSoft}>千问 · 全球最大开源模型家族</Note>
      </At>
      <At f={f} at={cf(79)}>
        <Put x={xw - 560} y={120}>
          <Photo x={0} y={0} w={300} h={200} caption="即时零售（示意）" rot={2}>
            <Scooter s={300} />
          </Photo>
        </Put>
        <Note x={xw - 570} y={430} size={25}>2025.7 淘宝闪购开打</Note>
      </At>
      <At f={f} at={cf(80)}>
        <Put x={xw - 560} y={500}>
          <Big size={86} color={V.red}>亏掉 900 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 6}}>外卖大战一年 · 媒体测算</div>
        </Put>
      </At>
      <At f={f} at={cf(81)}>
        <Put x={xw + 60} y={170}>
          <Big size={92}>186 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>2025 年 10 月</div>
        </Put>
      </At>
      <At f={f} at={cf(82)}>
        <Put x={xw + 60} y={330}>
          <Note x={0} y={0} size={32}>市值 3.7 万亿</Note>
        </Put>
      </At>
      <At f={f} at={cf(83)}>
        <Put x={xt - 600} y={150}>
          <Big size={96}>88 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>2026 年 6 月</div>
        </Put>
      </At>
      <At f={f} at={cf(84)}>
        <Put x={xt - 600} y={492}>
          <Stamp size={44} rot={-5}>八个月蒸发 1.8 万亿</Stamp>
        </Put>
        <Put x={xt - 220} y={300}>
          <Note x={0} y={0} size={28} color={V.inkSoft}>从 309 到 88，五年八个月</Note>
        </Put>
      </At>
      <At f={f} at={cf(85)}>
        <Put x={xt - 200} y={420}>
          <PostIt w={340} rot={2} head="2026.7">
            千问进了苹果的系统
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(86)}>
        <Put x={xt + 190} y={420}>
          <Big size={72} color={V.red}>AI 云 +45%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>22 个季度新高</div>
        </Put>
      </At>
      <At f={f} at={cf(87)}>
        <Put x={xt - 600} y={620}>
          <Note x={0} y={0} size={30}>今天：97.8 港元，1.95 万亿</Note>
        </Put>
      </At>
    </>
  );
};

/* ============ 13 · 收尾 ============ */

const Final: React.FC<{f: number}> = ({f}) => {
  const x = X.final;
  return (
    <>
      <At f={f} at={cf(88)}>
        <Put x={x - 660} y={100}>
          <Big size={124}>三次上市</Big>
          <Big size={124} color={V.red}>两次差点倒下</Big>
        </Put>
      </At>
      <At f={f} at={cf(89)}>
        <Put x={x - 640} y={440}>
          <Note x={0} y={0} size={34} color={V.inkSoft}>每一次，它都换了一套活法</Note>
        </Put>
      </At>
      <At f={f} at={cf(90)}>
        <Put x={x - 640} y={560}>
          <Note x={0} y={0} size={44}>下一段路，才刚开始</Note>
        </Put>
        <Put x={x - 640} y={680}>
          <div style={{fontFamily: VF.num, fontSize: 76, color: 'rgba(23,23,22,0.35)', letterSpacing: 4}}>1999 — 2026</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 年份计数器 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  [cf(8) - 6, 1999],
  [cf(14) - 6, 1999],
  [cf(21) - 6, 2003],
  [cf(31) - 6, 2005],
  [cf(35) - 6, 2007],
  [cf(40) - 6, 2008],
  [cf(42) - 6, 2012],
  [cf(47) - 6, 2014],
  [cf(52) - 6, 2019],
  [cf(59) - 6, 2020],
  [cf(63) - 6, 2021],
  [cf(67) - 6, 2021],
  [cf(69) - 6, 2022],
  [cf(73) - 6, 2023],
  [cf(76) - 6, 2025],
  [cf(79) - 6, 2025],
  [cf(83) - 6, 2026],
  [cf(87) - 6, 2026],
  [cf(88) - 6, 2026],
];

const Hud: React.FC<{f: number; camX: number; z: number}> = ({f, camX, z}) => {
  if (f < cf(1) || f >= cf(90) + 30 || z < 0.32) return null;
  const tracking = f >= cf(7) && f < cf(8) - 6;
  const year = tracking ? xy(camX) : rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={1999} to={2026} title="阿里巴巴 26 年" bands={[[2008.3, 2009.1], [2021.8, 2022.9], [2026.2, 2026.7]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={58} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={82} seed={19} />
        <CapGrid cam={cam} />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Found f={f} />
        <Seed f={f} />
        <Tao f={f} />
        <Pay f={f} />
        <Yahoo f={f} />
        <Ipo1 f={f} />
        <Nyse f={f} />
        <Return f={f} />
        <Ant f={f} />
        <Fall f={f} />
        <Ai f={f} />
        <Final f={f} />
        {[
          [X.found - 620, 100],
          [X.tao + 260, 96],
          [X.nyse + 300, 100],
          [X.final + 320, 400],
        ].map(([x, y]) => (
          <div key={x} style={{position: 'absolute', left: x - 17, top: y - 17}}>
            <Pushpin />
          </div>
        ))}
      </World>
      <Hud f={f} camX={cam.x} z={cam.z} />
    </>
  );
};

/* ============ 音效 ============ */

export const FILM_SFX: SfxCue[] = [
  ['paper', cf(1), 0.3],
  ['ding', cf(2), 0.3],
  ['pop', cf(3), 0.3],
  ['stamp', cf(4), 0.35],
  ['paper', cf(5), 0.3],
  ['stamp', cf(6), 0.35],
  ['question', cf(7), 0.35],
  ['whoosh', cf(7) + 10, 0.4],
  ['paper', cf(8) - 4, 0.3],
  ['pop', cf(9), 0.3],
  ['paper', cf(10), 0.3],
  ['stamp', cf(11), 0.35],
  ['whoosh', cf(14) - 26, 0.3],
  ['paper', cf(14), 0.3],
  ['ding', cw(15, '500 万美元'), 0.35],
  ['ding', cw(17, '2000 万美元'), 0.4],
  ['whoosh', cf(19) - 24, 0.3],
  ['error', cf(19), 0.35],
  ['paper', cf(20), 0.3],
  ['whoosh', cf(21) - 28, 0.3],
  ['pop', cf(23), 0.3],
  ['magic', cf(25), 0.35],
  ['stamp', cf(27), 0.4],
  ['whoosh', cf(28) - 24, 0.3],
  ['paper', cf(28), 0.3],
  ['magic', cf(29), 0.35],
  ['ding', cf(30), 0.35],
  ['whoosh', cf(31) - 24, 0.3],
  ['paper', cf(31), 0.3],
  ['magic', cf(32), 0.4],
  ['ding', cf(33), 0.35],
  ['stamp', cf(34), 0.35],
  ['whoosh', cf(35) - 26, 0.3],
  ['magic', cf(35), 0.35],
  ['ding', cf(36), 0.35],
  ['confetti', cf(37), 0.35],
  ['pop', cf(38), 0.3],
  ['whoosh', cf(40) - 26, 0.3],
  ['error', cf(40), 0.4],
  ['shake', cf(41), 0.35],
  ['paper', cf(42), 0.3],
  ['whoosh', cf(47) - 28, 0.3],
  ['magic', cf(47), 0.35],
  ['ding', cf(48), 0.35],
  ['confetti', cf(49), 0.4],
  ['pop', cf(50), 0.3],
  ['stamp', cf(51), 0.35],
  ['whoosh', cf(52) - 28, 0.3],
  ['confetti', cf(52), 0.35],
  ['ding', cf(53), 0.35],
  ['magic', cf(54), 0.4],
  ['stamp', cf(55), 0.4],
  ['whoosh', cf(57) - 26, 0.3],
  ['magic', cf(57), 0.4],
  ['ding', cf(58), 0.45],
  ['paper', cf(59), 0.3],
  ['magic', cf(60), 0.4],
  ['paper', cf(61), 0.3],
  ['paper', cf(62), 0.3],
  ['error', cf(63), 0.5],
  ['shake', cf(63), 0.4],
  ['whoosh', cf(65) - 24, 0.3],
  ['paper', cf(65), 0.3],
  ['stamp', cf(66), 0.45],
  ['whoosh', cf(67) - 28, 0.3],
  ['error', cf(67), 0.4],
  ['error', cf(68), 0.35],
  ['error', cf(69), 0.4],
  ['stamp', cf(70), 0.4],
  ['paper', cf(71), 0.3],
  ['paper', cf(73), 0.3],
  ['stamp', cf(74), 0.4],
  ['whoosh', cf(76) - 28, 0.3],
  ['magic', cf(76), 0.35],
  ['ding', cf(77), 0.4],
  ['magic', cf(78), 0.35],
  ['whoosh', cf(79) - 24, 0.3],
  ['pop', cf(79), 0.3],
  ['error', cf(80), 0.35],
  ['magic', cf(81), 0.4],
  ['confetti', cf(82), 0.35],
  ['whoosh', cf(83) - 26, 0.3],
  ['error', cf(83), 0.38],
  ['stamp', cf(84), 0.4],
  ['magic', cf(85), 0.35],
  ['ding', cf(86), 0.4],
  ['paper', cf(87), 0.3],
  ['whoosh', cf(88) - 34, 0.3],
  ['stamp', cf(88), 0.42],
  ['paper', cf(89), 0.3],
  ['question', cf(90), 0.4],
];
