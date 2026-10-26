import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put, RedCheck, RedX} from '../../library/vox/desk';
import {hudFade, rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, IndexCard, Label} from '../../library/vox/props';
import {DeskLitter, PostIt, Pushpin, Stamp, Sticker} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {
  ChatBubbles,
  CoinStack,
  ExchangeFloor,
  Gamepad,
  OldOffice,
  PagerPhone,
  PhoneQR,
  QQBird,
  RedEnvelope,
  ServerRack,
  ShakePhone,
  SlideArrow,
  Tag,
  WarRoom,
} from './art';
import {cf, cw} from './cues';
import {CAP_PTS, capAt, capY, RULER_Y, WORLD_H, WORLD_W, xy, yx} from './timeline';

const W = 1920;
const H = 1080;
const p12 = (f: number, at: number, dur: number) => Math.max(0, Math.min(1, (step12(f) - at) / dur));
const countUp = (f: number, at: number, to: number, dur = 30, dec = 0) => {
  const v = to * (1 - Math.pow(1 - p12(f, at, dur), 3));
  return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
};

/* ============ 每个故事节点在桌面上的横坐标 ============ */

const X = {
  now: yx(2026.6),
  found: yx(1999.0),
  sale: yx(2000.0),
  rescue: yx(2000.4),
  monet: yx(2001.15),
  mih: yx(2001.65),
  ipo: yx(2004.5),
  money: yx(2006.8),
  qwar: yx(2010.85),
  wechat: yx(2011.2),
  redpack: yx(2014.2),
  peak: yx(2017.9),
  winter: yx(2018.75),
  fall: yx(2022.15),
  recover: yx(2025.4),
  final: yx(2027.2),
};

/* ============ 相机路线 ============ */

const CAM: CamKey[] = [
  // 钩子：停在今天
  {f: 0, x: X.now - 420, y: 480, z: 1.14},
  {f: cf(5), x: X.now - 240, y: 480, z: 1.14, ease: 'sine', dur: 34},
  // 「把这 28 年拉出来看」：沿轴倒着甩回 1999
  {f: cf(7) + 18, x: yx(2012), y: 520, z: 0.34, ease: 'sine', dur: 32},
  {f: cf(8) - 2, x: X.found + 10, y: 480, z: 1.14, ease: 'tail', dur: 28},
  {f: cf(9), x: X.found + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 卖不掉
  {f: cf(16) - 4 - 26 - 8, x: X.sale + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(18), x: X.sale + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // IDG / 盈科
  {f: cf(20) - 4 - 24 - 8, x: X.rescue + 10, y: 480, z: 1.14, ease: 'tail', dur: 24},
  {f: cf(22), x: X.rescue + 10, y: 480, z: 1.14, ease: 'sine', dur: 18},
  // 移动梦网
  {f: cf(24) - 4 - 24 - 8, x: X.monet + 10, y: 480, z: 1.14, ease: 'tail', dur: 24},
  {f: cf(25), x: X.monet + 10, y: 480, z: 1.14, ease: 'sine', dur: 18},
  // MIH
  {f: cf(27) - 4 - 26 - 8, x: X.mih + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(29), x: X.mih + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 上市
  {f: cf(32) - 4 - 26 - 8, x: X.ipo + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(34), x: X.ipo + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 变现 2003—2009
  {f: cf(36) - 4 - 28 - 8, x: X.money + 10, y: 480, z: 1.14, ease: 'tail', dur: 28},
  {f: cf(39), x: X.money + 10, y: 480, z: 1.14, ease: 'sine', dur: 22},
  // 3Q 大战
  {f: cf(42) - 4 - 28 - 8, x: X.qwar + 10, y: 480, z: 1.14, ease: 'tail', dur: 28},
  {f: cf(45), x: X.qwar + 10, y: 480, z: 1.14, ease: 'sine', dur: 22},
  // 微信
  {f: cf(49) - 4 - 26 - 8, x: X.wechat + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(52), x: X.wechat + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 红包
  {f: cf(57) - 4 - 26 - 8, x: X.redpack + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(60), x: X.redpack + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 巅峰
  {f: cf(64) - 4 - 26 - 8, x: X.peak + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(66), x: X.peak + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 版号寒冬与 930
  {f: cf(69) - 2, x: X.winter + 10, y: 480, z: 1.14, ease: 'tail', dur: 26},
  {f: cf(72), x: X.winter + 10, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 峰值与坠落
  {f: cf(75) - 4 - 28 - 8, x: X.fall + 10, y: 480, z: 1.14, ease: 'tail', dur: 28},
  {f: cf(78), x: X.fall + 10, y: 480, z: 1.14, ease: 'sine', dur: 22},
  // 复苏
  {f: cf(82) - 4 - 28 - 8, x: X.recover + 10, y: 480, z: 1.14, ease: 'tail', dur: 28},
  {f: cf(85), x: X.recover + 10, y: 480, z: 1.14, ease: 'sine', dur: 22},
  // 收尾
  {f: cf(91) - 4 - 34 - 8, x: X.final - 160, y: 480, z: 1.14, ease: 'tail', dur: 34},
  {f: cf(94), x: X.final + 10, y: 480, z: 1.26, ease: 'sine', dur: 30},
];

/* ============ 通用小件 ============ */

const Person: React.FC<{x: number; y: number; name: string; note?: string; hair?: Hair; glasses?: boolean; beard?: boolean; tie?: boolean; leather?: boolean; shirt?: boolean; turtleneck?: boolean; rot?: number; w?: number; seed?: number}> = ({x, y, name, note, rot = -3, w = 140, ...look}) => (
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

const RULER_YEARS = [1998, 2001, 2004, 2008, 2011, 2014, 2018, 2021, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(1998.6), top: RULER_Y, width: yx(2027.2) - yx(1998.6), height: 6, background: V.ink}} />
    {RULER_YEARS.map((y) => (
      <div key={y} style={{position: 'absolute', left: yx(y) - 60, top: RULER_Y, width: 120, textAlign: 'center'}}>
        <div style={{width: 5, height: 26, background: V.ink, margin: '0 auto'}} />
        <div style={{fontFamily: VF.num, fontSize: 42, color: V.ink, marginTop: 6}}>{y}</div>
      </div>
    ))}
  </>
);

const GRID: [number, string][] = [
  [10, '10 亿'],
  [100, '1,000 亿'],
  [1000, '1 万亿'],
  [10000, '10 万亿'],
];

// 刻度与图例是装饰：压到右上角年份计数器就淡出，别在 HUD 底下露半截
const CapGrid: React.FC<{cam: {x: number; y: number; z: number}}> = ({cam}) => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: X.ipo, top: capY(v), width: WORLD_W - X.ipo - 500, borderTop: '3px dashed rgba(23,23,22,0.15)'}} />
        {[X.found + 330, X.rescue + 330, X.monet + 330, X.money + 330, X.wechat + 330, X.winter + 330, X.recover + 330].map((x) => {
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
        left: X.found + 160,
        top: capY(0.4) + 24,
        fontFamily: VF.serifCn,
        fontWeight: 700,
        fontSize: 24,
        color: V.red,
        whiteSpace: 'nowrap',
        opacity: hudFade(X.found + 160, capY(0.4) + 24, 460, 34, cam),
      }}
    >
      红线：腾讯市值（亿港元，对数刻度，示意）
    </div>
    <div
      style={{
        position: 'absolute',
        left: X.found + 40,
        top: capY(0.05) + 12,
        fontFamily: VF.serifCn,
        fontWeight: 700,
        fontSize: 21,
        color: 'rgba(23,23,22,0.5)',
        whiteSpace: 'nowrap',
        opacity: hudFade(X.found + 40, capY(0.05) + 12, 220, 30, cam),
      }}
    >
      2004 年前为融资估值
    </div>
  </>
);

const CapLine: React.FC<{x0: number; x1: number}> = ({x0, x1}) => {
  const d = CAP_PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const head = Math.min(x1, CAP_PTS[CAP_PTS.length - 1][0]);
  return (
    <>
      <svg width={WORLD_W} height={WORLD_H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', clipPath: `inset(0 ${WORLD_W - x1}px 0 ${x0}px)`}}>
        <path d={d} stroke={V.red} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {head > x0 && head > X.found && <div style={{position: 'absolute', left: head - 16, top: capAt(head) - 16, width: 32, height: 32, borderRadius: 16, background: V.red, border: `4px solid ${V.paper}`}} />}
    </>
  );
};

const lineSpan = (f: number, camX: number): [number, number] => {
  if (f < cf(7)) return [0, 0];
  if (f < cf(8)) return [0, WORLD_W];
  if (f < cf(91)) return [0, Math.max(X.found, camX + 700)];
  return [0, WORLD_W];
};

/* ============ 01 · 钩子：今天 ============ */

const Now: React.FC<{f: number}> = ({f}) => {
  const x = X.now;
  return (
    <>
      <At f={f} at={cf(1)} until={cf(7) + 26}>
        <Put x={x - 1010} y={150}>
          <Label size={30} bg={V.red}>2026.10 · 腾讯控股</Label>
        </Put>
        <Put x={x - 1010} y={212}>
          <Big size={128}>{countUp(f, cf(1), 14.18, 30, 2)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>微信 + WeChat 月活 · 2025 年报</div>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={cf(7) + 26}>
        <Put x={x - 1010} y={470}>
          <IndexCard w={480} h={190} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 30, color: V.inkSoft, marginTop: -14}}>做它的公司</div>
            <div style={{fontFamily: VF.heavy, fontSize: 52, color: V.ink, marginTop: 4}}>叫腾讯</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red, marginTop: 4}}>深圳 · 1998 年 11 月 11 日注册</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={cf(7) + 26}>
        <Put x={x + 150} y={190}>
          <Sticker rot={5}><QQBird s={200} /></Sticker>
        </Put>
        <Note x={x + 160} y={402} size={24} color={V.inkSoft}>企鹅形象为示意，非官方</Note>
      </At>
      <At f={f} at={cf(3)} until={cf(7) + 26}>
        <Put x={x - 460} y={470}>
          <Tag text="100 万" sub="想卖掉公司" rot={-5} />
        </Put>
        <Note x={x - 470} y={660} size={30}>1999 年底，创业第二年</Note>
      </At>
      <At f={f} at={cf(4)} until={cf(7) + 26}>
        <Put x={x - 460} y={640}>
          <PostIt w={340} rot={2} color="#e8e2cf" head="一连谈了四家">
            没有一家给到这个数
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(5)} until={cf(7) + 26}>
        <Put x={x + 210} y={500}>
          <Stamp size={50} rot={-7}>最高只出 60 万</Stamp>
        </Put>
        <Note x={x + 200} y={640} size={24} color={V.inkSoft}>没卖成，只好接着干</Note>
      </At>
      <At f={f} at={cf(7)} until={cf(7) + 26}>
        <Put x={x + 260} y={180}>
          <div style={{fontFamily: VF.num, fontSize: 220, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 02 · 1998—1999 创立 ============ */

const Found: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  return (
    <>
      <At f={f} at={cf(8)} until={cf(16) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>1998.11.11 · 深圳华强北</Label>
        </Put>
      </At>
      <At f={f} at={cf(8)} until={cf(16) - 2}>
          <Photo x={x - 700} y={110} w={330} h={220} caption="赛格科技园（示意）" rot={-3}>
          <OldOffice w={330} h={220} />
        </Photo>
        </At>
      <At f={f} at={cf(9)} until={cf(16) - 2}>
        <Person x={x + 20} y={150} name="马化腾" note="27 岁 · 写代码出身" hair="side" glasses w={130} rot={-3} />
        <Put x={x + 260} y={170}>
          <Doc w={430} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>注册资金 50 万</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.ink, marginTop: 6, lineHeight: 1.6}}>
              张志东 · 曾李青 · 许晨晔 · 陈一丹
              <br />
              五个人一起凑的
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(10)} until={cf(16) - 2}>
        <Put x={x + 40} y={400}>
          <Sticker rot={4}><PagerPhone s={150} /></Sticker>
        </Put>
        <Note x={x + 30} y={600} size={26}>1999.2 · O I C Q 上线</Note>
      </At>
      <At f={f} at={cf(11)} until={cf(16) - 2}>
        <Put x={x - 700} y={440}>
          <PostIt w={330} rot={-2} head="抄的是以色列的 ICQ">
            ICQ 1996 年上线，比它早三年
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(12)} until={cf(16) - 2}>
        <Put x={x - 330} y={96}>
          <Big size={96}>{countUp(f, cf(12), 20, 16)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>上线两个月 · 注册用户</div>
        </Put>
      </At>
      <At f={f} at={cf(13)} until={cf(16) - 2}>
        <Put x={x - 330} y={290}>
          <Big size={96}>{countUp(f, cf(13), 100, 20)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, marginTop: 4}}>到 1999 年底</div>
        </Put>
      </At>
      <At f={f} at={cf(14)} until={cf(16) - 2}>
        <Put x={x - 700} y={660}>
          <Note x={0} y={0} size={28} color={V.inkSoft}>服务器要钱，托管费要钱</Note>
        </Put>
        <Put x={x - 360} y={610}>
          <Sticker rot={-6}><ServerRack w={230} h={154} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(15)} until={cf(16) - 2}>
        <Put x={x - 700} y={730}>
          <Stamp size={42} rot={-4}>一分钱收入都没有</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 03 · 1999 底 卖不掉 ============ */

const Sale: React.FC<{f: number}> = ({f}) => {
  const x = X.sale;
  return (
    <>
      <At f={f} at={cf(16)} until={cf(20) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>1999 年底 · 账上撑不住了</Label>
        </Put>
      </At>
      <At f={f} at={cf(16)} until={cf(20) - 2}>
        <Put x={x - 700} y={120}>
          <Doc w={500} h={190} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft}}>马化腾的决定</div>
            <div style={{fontFamily: VF.num, fontSize: 74, color: V.ink, lineHeight: 1.1}}>100 万</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>人民币 · 连人带公司一起卖</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(17)} until={cf(20) - 2}>
        <Put x={x - 120} y={140}>
          <IndexCard w={440} h={200} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -12}}>一连谈了四家</div>
            {[1, 2, 3, 4].map((k) => (
              <div key={k} style={{display: 'flex', justifyContent: 'space-between', fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.ink, marginTop: 6}}>
                <span>第 {k} 家</span>
                <span style={{color: V.red}}>没谈成</span>
              </div>
            ))}
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(18)} until={cf(20) - 2}>
        <Put x={x - 700} y={370}>
          <Big size={120}>{countUp(f, cf(18), 60, 22)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>四家里最高的出价</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, marginTop: 4}}>对方数了桌椅板凳后给的数</div>
        </Put>
      </At>
      <At f={f} at={cf(19)} until={cf(20) - 2}>
        <Put x={x - 360} y={660}>
          <Stamp size={46} rot={-7}>没卖，接着干</Stamp>
        </Put>
        <Note x={x - 400} y={800} size={24} color={V.inkSoft}>差 40 万，他心有不甘</Note>
      </At>
    </>
  );
};

/* ============ 04 · 2000.4 IDG 与盈科 ============ */

const Rescue: React.FC<{f: number}> = ({f}) => {
  const x = X.rescue;
  return (
    <>
      <At f={f} at={cf(20)} until={cf(24) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2000.4 · 救命的两笔钱</Label>
        </Put>
      </At>
      <At f={f} at={cf(20)} until={cf(24) - 2}>
        <Put x={x - 700} y={110}>
          <Doc w={520} h={200} rot={1}>
            <div style={{display: 'flex', gap: 44}}>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>IDG</div>
                <div style={{fontFamily: VF.num, fontSize: 60, color: V.ink, lineHeight: 1}}>110 万</div>
                <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>美元</div>
              </div>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>盈科数码</div>
                <div style={{fontFamily: VF.num, fontSize: 60, color: V.ink, lineHeight: 1}}>110 万</div>
                <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>美元 · 李泽楷</div>
              </div>
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(21)} until={cf(24) - 2}>
        <Put x={x - 680} y={350}>
          <Tag text="220 万" sub="美元" rot={-3} />
          <Note x={10} y={110} size={25} color={V.ink}>拿走 40%，估值 550 万美元</Note>
        </Put>
      </At>
      <At f={f} at={cf(22)} until={cf(24) - 2}>
        <Put x={x + 60} y={130}>
          <IndexCard w={450} h={180} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 27, color: V.ink, lineHeight: 1.55, marginTop: -10}}>
              I D G 盘问了一夜：
              <br />
              「这东西，怎么赚钱？」
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(23)} until={cf(24) - 2}>
        <Put x={x + 60} y={360}>
          <IndexCard w={450} h={200} rot={3}>
            <div style={{fontFamily: VF.hand, fontSize: 38, color: '#1f3f8a', lineHeight: 1.4, marginTop: -12}}>
              「我也不知道。」
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 10}}>马化腾 · 2000 年</div>
          </IndexCard>
        </Put>
        <Put x={x + 420} y={600}>
          <Stamp size={40} rot={-5}>钱还是烧得快</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 05 · 2000 底 移动梦网 ============ */

const Monet: React.FC<{f: number}> = ({f}) => {
  const x = X.monet;
  return (
    <>
      <At f={f} at={cf(24)} until={cf(27) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2000 年底 · 移动梦网</Label>
        </Put>
      </At>
      <At f={f} at={cf(24)} until={cf(27) - 2}>
        <Put x={x - 700} y={120}>
          <Sticker rot={-4}><ChatBubbles s={300} /></Sticker>
        </Put>
        <Note x={x - 690} y={326} size={25}>中国移动 · 移动梦网上线</Note>
      </At>
      <At f={f} at={cf(25)} until={cf(27) - 2}>
        <Put x={x - 700} y={400}>
          <Doc w={500} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>短信上 Q Q</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, lineHeight: 1.6, marginTop: 6}}>
              话费代扣，运营商分成
              <br />
              中国第一家想通这件事的
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(26)} until={cf(27) - 2}>
        <Put x={x - 130} y={120}>
          <Big size={104}>{countUp(f, cf(26), 1022, 26)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>人民币 · 2001 年底纯利</div>
        </Put>
        <Put x={x - 120} y={360}>
          <Stamp size={46} rot={-6}>第一次盈利</Stamp>
        </Put>
        <Note x={x - 160} y={520} size={23} color={V.inkSoft}>成立第三年，才第一次赚到钱</Note>
      </At>
    </>
  );
};

/* ============ 06 · 2001.6 MIH 入股 ============ */

const Mih: React.FC<{f: number}> = ({f}) => {
  const x = X.mih;
  return (
    <>
      <At f={f} at={cf(27)} until={cf(32) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2001.6 · 一个南非人找上门</Label>
        </Put>
      </At>
      <At f={f} at={cf(27)} until={cf(32) - 2}>
        <Put x={x - 700} y={110}>
          <Doc w={480} h={190} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>M I H · 南非报业</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.ink, marginTop: 6, lineHeight: 1.6}}>
              中国业务副总裁网大为
              <br />
              开着车一家家找
              <br />
              「用户最多」的公司
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(28)} until={cf(32) - 2}>
        <Put x={x - 130} y={110}>
          <Big size={100}>{countUp(f, cf(28), 6000, 24)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>美元 · M I H 给的估值</div>
        </Put>
      </At>
      <At f={f} at={cf(29)} until={cf(32) - 2}>
        <Put x={x - 120} y={350}>
          <Tag text="11 倍" sub="上一轮的" rot={-4} />
        </Put>
        <Note x={x - 160} y={520} size={23} color={V.inkSoft}>IDG 和盈科听完报价，立刻想卖</Note>
      </At>
      <At f={f} at={cf(30)} until={cf(32) - 2}>
        <Put x={x - 700} y={360}>
          <Doc w={540} h={210} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>盈科把手里的 20% 全卖了</div>
            <div style={{fontFamily: VF.num, fontSize: 58, color: V.red, lineHeight: 1.15}}>1,260 万美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>一年前买它只花了 110 万 · 李泽楷觉得赚了</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(31)} until={cf(32) - 2}>
        <Put x={x - 140} y={610}>
          <IndexCard w={470} h={200} rot={-3}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft, marginTop: -12}}>这笔 20% 拿到今天</div>
            <div style={{fontFamily: VF.num, fontSize: 52, color: V.ink, lineHeight: 1.15}}>值 7,000 多亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 6}}>港元 · 按当前市值粗算 · 翻七百多倍</div>
          </IndexCard>
        </Put>
        <Put x={x + 380} y={660}>
          <Stamp size={44} rot={-6}>世纪遗憾</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 07 · 2004.6.16 上市 ============ */

const Ipo: React.FC<{f: number}> = ({f}) => {
  const x = X.ipo;
  return (
    <>
      <At f={f} at={cf(32)} until={cf(36) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2004.6.16 · 港交所主板</Label>
        </Put>
      </At>
      <At f={f} at={cf(32)} until={cf(36) - 2}>
          <Photo x={x - 700} y={110} w={330} h={220} caption="挂牌那天（示意）" rot={-2}>
          <ExchangeFloor w={330} h={220} />
        </Photo>
        </At>
      <At f={f} at={cf(32)} until={cf(36) - 2}>
        <Put x={x - 700} y={398}>
          <Note x={0} y={0} size={27} color={V.inkSoft}>股票代码 0700</Note>
        </Put>
      </At>
      <At f={f} at={cf(33)} until={cf(36) - 2}>
        <Put x={x - 320} y={110}>
          <Doc w={500} h={200} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>港股主板的第一家</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink, lineHeight: 1.45, marginTop: 6}}>
              中国互联网公司
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 6}}>保荐人高盛 · 发行价 3.70 港元</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(34)} until={cf(36) - 2}>
        <Put x={x - 320} y={360}>
          <Big size={110}>{countUp(f, cf(34), 62, 16)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>港元 · 上市当天市值</div>
        </Put>
      </At>
      <At f={f} at={cf(35)} until={cf(36) - 2}>
        <Put x={x + 300} y={252}>
          <IndexCard w={420} h={190} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft, marginTop: -12}}>招股书里的数字</div>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.ink, lineHeight: 1.15}}>2.91 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 4}}>Q Q 注册用户 · 移动增值占营收过半</div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 08 · 2003—2009 变现之路 ============ */

const Money: React.FC<{f: number}> = ({f}) => {
  const x = X.money;
  return (
    <>
      <At f={f} at={cf(36)} until={cf(42) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2003—2009 · 变现之路</Label>
        </Put>
      </At>
      <At f={f} at={cf(36)} until={cf(42) - 2}>
        <Put x={x - 700} y={120}>
          <Sticker rot={-3}><QQBird s={160} /></Sticker>
        </Put>
        <Note x={x - 690} y={316} size={25}>2003.1 · Q Q 秀上线</Note>
      </At>
      <At f={f} at={cf(37)} until={cf(42) - 2}>
        <Put x={x - 440} y={130}>
          <Doc w={470} h={180} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>几块钱一件的虚拟衣服</div>
            <div style={{fontFamily: VF.num, fontSize: 62, color: V.ink, lineHeight: 1.15}}>几百万人买</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>穿上就不想换回去 · 社交是门好生意</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(38)} until={cf(42) - 2}>
        <Put x={x - 700} y={420}>
          <Sticker rot={3}><CoinStack s={150} /></Sticker>
        </Put>
        <Note x={x - 690} y={600} size={25}>Q 币、黄钻、会员，一套一套跟上</Note>
      </At>
      <At f={f} at={cf(39)} until={cf(42) - 2}>
        <Put x={x - 420} y={430}>
          <Sticker rot={-4}><Gamepad s={210} /></Sticker>
        </Put>
        <Note x={x - 410} y={590} size={25}>2003.8 · Q Q 游戏上线</Note>
      </At>
      <At f={f} at={cf(40)} until={cf(42) - 2}>
        <Put x={x + 80} y={130}>
          <Doc w={440} h={210} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2008 年前后</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.55, marginTop: 6}}>
              穿越火线
              <br />
              地下城与勇士
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft, marginTop: 4}}>代理韩国游戏 · 一款接一款</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(41)} until={cf(42) - 2}>
        <Put x={x + 80} y={420}>
          <IndexCard w={440} h={200} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft, marginTop: -12}}>到 2009 年</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink, lineHeight: 1.3}}>中国最大的<br />游戏公司</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 6}}>没人再说它只是个聊天工具</div>
          </IndexCard>
        </Put>
        <RedCheck f={f} at={cf(41) + 20} x={x + 520} y={470} s={70} />
      </At>
    </>
  );
};

/* ============ 09 · 2010 3Q 大战 ============ */

const Qwar: React.FC<{f: number}> = ({f}) => {
  const x = X.qwar;
  return (
    <>
      <At f={f} at={cf(42)} until={cf(49) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2010.9—11 · 3Q 大战</Label>
        </Put>
      </At>
      <At f={f} at={cf(42)} until={cf(49) - 2}>
          <Photo x={x - 700} y={110} w={330} h={220} caption="11 月 3 日深夜（示意）" rot={-2}>
          <WarRoom w={330} h={220} />
        </Photo>
        </At>
      <At f={f} at={cf(42)} until={cf(49) - 2}>
        <Put x={x - 700} y={400}>
          <Doc w={480} h={160} rot={1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, lineHeight: 1.5}}>
              9 月 27 日，360 发布「隐私保护器」
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 6}}>指控 Q Q 偷看用户隐私</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(43)} until={cf(49) - 2}>
        <Put x={x - 130} y={110}>
          <Big size={82}>11.3 出招</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>「致广大 Q Q 用户的一封信」</div>
        </Put>
      </At>
      <At f={f} at={cf(44)} until={cf(49) - 2}>
        <Put x={x - 140} y={330}>
          <PostIt w={340} rot={2} color="#f0d7c8" head="一个决定">
            装了 360 的电脑，停用 Q Q
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(45)} until={cf(49) - 2}>
        <Put x={x - 150} y={560}>
          <Big size={96}>几亿人 二选一</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>两台国民软件，同一天摊牌</div>
        </Put>
      </At>
      <At f={f} at={cf(46)} until={cf(49) - 2}>
        <Put x={x + 320} y={110}>
          <IndexCard w={430} h={190} rot={-2}>
            <div style={{fontFamily: VF.hand, fontSize: 32, color: '#1f3f8a', lineHeight: 1.4, marginTop: -12}}>
              「我们刚刚做出了
              <br />
              一个非常艰难的决定。」
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>信的原文 · 后来被叫作 Q Q 体</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(47)} until={cf(49) - 2}>
        <Put x={x + 320} y={350}>
          <Stamp size={44} rot={-5}>全网都在骂</Stamp>
        </Put>
        <Note x={x + 310} y={490} size={23} color={V.inkSoft}>骂的是：你凭什么替我选</Note>
      </At>
      <At f={f} at={cf(48)} until={cf(49) - 2}>
        <Put x={x + 300} y={570}>
          <IndexCard w={440} h={200} rot={3}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, lineHeight: 1.5, marginTop: -12}}>
              官司赢了
              <br />
              人心输了
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>2014 年最高法判腾讯胜诉 · 舆论早有答案</div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 10 · 2011 微信 ============ */

const Wechat: React.FC<{f: number}> = ({f}) => {
  const x = X.wechat;
  return (
    <>
      <At f={f} at={cf(49)} until={cf(57) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2010—2011 · 微信诞生</Label>
        </Put>
      </At>
      <At f={f} at={cf(49)} until={cf(57) - 2}>
        <Put x={x - 700} y={110}>
          <Doc w={470} h={170} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2010.10 · 国外一款 Kik</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.ink, marginTop: 6, lineHeight: 1.55}}>
              15 天 100 万用户
              <br />
              基于手机通讯录的免费短信
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(50)} until={cf(57) - 2}>
        <Person x={x - 700} y={330} name="张小龙" note="腾讯广州研发部" hair="side" glasses w={135} rot={3} />
      </At>
      <At f={f} at={cf(51)} until={cf(57) - 2}>
        <Put x={x - 480} y={350}>
          <IndexCard w={400} h={170} rot={2}>
            <div style={{fontFamily: VF.hand, fontSize: 28, color: '#1f3f8a', lineHeight: 1.45, marginTop: -12}}>
              半夜一封邮件，
              <br />
              建议立刻立项。
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>发到马化腾的邮箱 · 当晚获批</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(52)} until={cf(57) - 2}>
        <Put x={x - 130} y={110}>
          <Big size={92}>2011.1.21</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>微信 1.0 上线 · iPhone 版</div>
        </Put>
        <Put x={x + 220} y={110}>
          <Sticker rot={5}><PhoneQR s={130} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(53)} until={cf(57) - 2}>
        <Put x={x - 160} y={350}>
          <PostIt w={330} rot={-2} head="比它早一个月的">
            是小米的米聊 · 2010.12 上线
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(55)} until={cf(57) - 2}>
        <Put x={x - 140} y={560}>
          <Big size={120}>{countUp(f, cf(55), 433, 26)} 天</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>从 0 到 1 亿用户 · 2012.3.29</div>
        </Put>
      </At>
      <At f={f} at={cf(56)} until={cf(57) - 2}>
        <Put x={x + 300} y={330}>
          <Stamp size={48} rot={-7}>船票到手</Stamp>
        </Put>
        <Note x={x + 260} y={470} size={23} color={V.inkSoft}>移动互联网这艘船，上去了</Note>
      </At>
    </>
  );
};

/* ============ 11 · 2013—2015 红包 ============ */

const Redpack: React.FC<{f: number}> = ({f}) => {
  const x = X.redpack;
  return (
    <>
      <At f={f} at={cf(57)} until={cf(64) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2013.8 — 2015.2 · 红包奇袭</Label>
        </Put>
      </At>
      <At f={f} at={cf(57)} until={cf(64) - 2}>
        <Put x={x - 700} y={120}>
          <Sticker rot={-4}><PhoneQR s={150} /></Sticker>
        </Put>
        <Note x={x - 690} y={426} size={25}>2013.8 · 微信支付上线</Note>
      </At>
      <At f={f} at={cf(58)} until={cf(64) - 2}>
        <Put x={x - 700} y={500}>
          <PostIt w={330} rot={2} head="但没人绑卡">
            支付宝已经做了快十年
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(59)} until={cf(64) - 2}>
        <Put x={x - 320} y={130}>
          <Sticker rot={6}><RedEnvelope s={190} /></Sticker>
        </Put>
        <Note x={x - 330} y={430} size={25}>2014 除夕 · 红包上线</Note>
      </At>
      <At f={f} at={cf(60)} until={cf(64) - 2}>
        <Put x={x - 320} y={520}>
          <Big size={100}>{countUp(f, cf(60), 482, 22)} 万</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 4}}>人 · 那一夜在微信里抢红包</div>
        </Put>
      </At>
      <At f={f} at={cf(61)} until={cf(64) - 2}>
        <Put x={x + 60} y={130}>
          <Doc w={460} h={180} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>产品的小机关</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.5, marginTop: 6}}>
              想领钱，得先绑卡
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 6}}>一个春节，把支付宝十年的活干完了</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(62)} until={cf(64) - 2}>
        <Put x={x + 60} y={360}>
          <IndexCard w={460} h={190} rot={-2}>
            <div style={{fontFamily: VF.hand, fontSize: 30, color: '#1f3f8a', lineHeight: 1.4, marginTop: -12}}>
              「像被偷袭了珍珠港。」
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>马云 · 2014 年春节</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(63)} until={cf(64) - 2}>
        <Put x={x + 60} y={610}>
          <Doc w={500} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2015 年春晚 · 摇一摇</div>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 4}}>
              <span style={{fontFamily: VF.num, fontSize: 62, color: V.ink, lineHeight: 1}}>10.1 亿次</span>
              <span style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft}}>除夕当天收发</span>
            </div>
          </Doc>
        </Put>
        <Put x={x + 590} y={130}>
          <Sticker rot={-6}><ShakePhone s={150} /></Sticker>
        </Put>
      </At>
    </>
  );
};

/* ============ 12 · 2016—2018.1 巅峰 ============ */

const Peak: React.FC<{f: number}> = ({f}) => {
  const x = X.peak;
  return (
    <>
      <At f={f} at={cf(64)} until={cf(69) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2016.9 — 2018.1 · 巅峰</Label>
        </Put>
      </At>
      <At f={f} at={cf(64)} until={cf(69) - 2}>
        <Put x={x - 700} y={120}>
          <Big size={104}>{countUp(f, cf(64), 2, 20)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>港元 · 2016.9 · 亚洲市值第一</div>
        </Put>
      </At>
      <At f={f} at={cf(65)} until={cf(69) - 2}>
        <Put x={x - 700} y={400}>
          <Doc w={500} h={160} rot={-1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.45}}>
              2017.11 · 市值超过 Facebook
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 4}}>亚洲公司第一次进全球前五</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(66)} until={cf(69) - 2}>
        <Put x={x - 130} y={130}>
          <Big size={104}>{countUp(f, cf(66), 5345, 26)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>美元 · 全球第五</div>
        </Put>
      </At>
      <At f={f} at={cf(67)} until={cf(69) - 2}>
        <Put x={x - 130} y={400}>
          <Sticker rot={3}><Gamepad s={200} /></Sticker>
        </Put>
        <Put x={x + 130} y={430}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, width: 400, lineHeight: 1.5}}>
            「王者荣耀」
            <br />
            成了国民游戏
          </div>
        </Put>
      </At>
      <At f={f} at={cf(68)} until={cf(69) - 2}>
        <Put x={x + 220} y={270}>
          <Big size={104}>{countUp(f, cf(68), 4.5, 14, 1)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.red, marginTop: 4}}>港元 · 2018.1 · 亚洲第一</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 13 · 2018 版号寒冬与 930 ============ */

const Winter: React.FC<{f: number}> = ({f}) => {
  const x = X.winter;
  return (
    <>
      <At f={f} at={cf(69)} until={cf(75) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2018.3 — 9.30 · 寒冬与转身</Label>
        </Put>
      </At>
      <At f={f} at={cf(69)} until={cf(75) - 2}>
        <Put x={x - 700} y={110}>
          <Doc w={470} h={170} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2018.3.29</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>游戏版号，停发</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 4}}>九个月，一款新游戏都没批</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(70)} until={cf(75) - 2}>
        <Put x={x - 700} y={340}>
          <IndexCard w={430} h={190} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft, marginTop: -12}}>为什么这么疼</div>
            <div style={{fontFamily: VF.num, fontSize: 62, color: V.ink, lineHeight: 1.1}}>40%</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4}}>2017 年营收里，游戏占四成</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(71)} until={cf(75) - 2}>
        <Put x={x - 240} y={110}>
          <Big size={84}>475 → 250</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>港元 · 2018 年 1 月到 10 月</div>
        </Put>
        <Put x={x + 260} y={110}>
          <SlideArrow s={120} />
        </Put>
      </At>
      <At f={f} at={cf(72)} until={cf(75) - 2}>
        <Put x={x - 240} y={330}>
          <Doc w={460} h={160} rot={2}>
            <div style={{fontFamily: VF.num, fontSize: 52, color: V.red, lineHeight: 1.15}}>−1.7 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6}}>港元 · 七个月蒸发 · 跌去近一半</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(73)} until={cf(75) - 2}>
        <Put x={x + 60} y={400}>
          <Doc w={500} h={170} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>9.30 · 一封全员信</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, lineHeight: 1.5, marginTop: 6}}>
              七大事业群重组
              <br />
              新设云与智慧产业事业群
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(74)} until={cf(75) - 2}>
        <Put x={x + 80} y={660}>
          <Stamp size={46} rot={-6}>拥抱产业互联网</Stamp>
        </Put>
        <Note x={x + 40} y={800} size={23} color={V.inkSoft}>从一家做 App 的公司，转向也做基础设施</Note>
      </At>
    </>
  );
};

/* ============ 14 · 2021 峰值与坠落 ============ */

const Fall: React.FC<{f: number}> = ({f}) => {
  const x = X.fall;
  return (
    <>
      <At f={f} at={cf(75)} until={cf(82) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2021.1 — 2022.10 · 高点与坠落</Label>
        </Put>
      </At>
      <At f={f} at={cf(75)} until={cf(82) - 2}>
        <Put x={x - 700} y={120}>
          <Big size={100}>{countUp(f, cf(75), 766, 22)} 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>2021.1.25 · 历史最高收盘价</div>
        </Put>
      </At>
      <At f={f} at={cf(76)} until={cf(82) - 2}>
        <Put x={x - 700} y={400}>
          <Doc w={540} h={200} rot={-1}>
            <div style={{fontFamily: VF.num, fontSize: 58, color: V.red, lineHeight: 1.1}}>7.35 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.ink, marginTop: 6}}>港元 · 超过六大国有银行总和</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft, marginTop: 4}}>亚洲公司第一次站这么高</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(77)} until={cf(82) - 2}>
        <Put x={x - 130} y={120}>
          <PostIt w={340} rot={-2} color="#f0d7c8" head="接着，监管来了">
            反垄断 · 未成年人游戏 · 数据安全
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(78)} until={cf(82) - 2}>
        <Put x={x - 140} y={360}>
          <Big size={100}>{countUp(f, cf(78), 198, 20)} 港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>2022.10 · 四年最低</div>
        </Put>
      </At>
      <At f={f} at={cf(79)} until={cf(82) - 2}>
        <Put x={x - 140} y={610}>
          <Stamp size={44} rot={-5}>跌去七成四</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(80)} until={cf(82) - 2}>
        <Put x={x + 260} y={400}>
          <Doc w={440} h={180} rot={2}>
            <div style={{fontFamily: VF.num, fontSize: 50, color: V.red, lineHeight: 1.15}}>−4.4 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6}}>港元 · 从最高点蒸发</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 4}}>跌出全球市值前十</div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 15 · 2023—2026 复苏与 AI ============ */

const Recover: React.FC<{f: number}> = ({f}) => {
  const x = X.recover;
  return (
    <>
      <At f={f} at={cf(82)} until={cf(90) - 2}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2023—2026 · 复苏与 A I</Label>
        </Put>
      </At>
      <At f={f} at={cf(82)} until={cf(90) - 2}>
        <Put x={x - 700} y={110}>
          <Doc w={480} h={160} rot={1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.45}}>
              2023 · 视频号挑大梁
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4}}>直播带货、信息流广告全开了</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(83)} until={cf(90) - 2}>
        <Put x={x - 700} y={330}>
          <IndexCard w={430} h={180} rot={-2}>
            <div style={{fontFamily: VF.hand, fontSize: 30, color: '#1f3f8a', lineHeight: 1.4, marginTop: -12}}>
              「全村的希望。」
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>马化腾这样叫视频号</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(84)} until={cf(90) - 2}>
        <Put x={x - 240} y={130}>
          <Big size={80}>利润回升</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 4}}>广告 + 小游戏 · 一路往上</div>
        </Put>
      </At>
      <At f={f} at={cf(85)} until={cf(90) - 2}>
        <Put x={x - 240} y={350}>
          <Doc w={440} h={160} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2024 年 · 回购</div>
            <div style={{fontFamily: VF.num, fontSize: 54, color: V.ink, lineHeight: 1.15}}>1,120 亿港元</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(86)} until={cf(90) - 2}>
        <Put x={x + 60} y={130}>
          <Big size={100}>{countUp(f, cf(86), 7518, 24)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>人民币 · 2025 年营收</div>
        </Put>
      </At>
      <At f={f} at={cf(87)} until={cf(90) - 2}>
        <Put x={x + 70} y={370}>
          <Doc w={470} h={190} rot={-1}>
            <div style={{display: 'flex', gap: 40}}>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>归母净利</div>
                <div style={{fontFamily: VF.num, fontSize: 50, color: V.ink, lineHeight: 1}}>2,248 亿</div>
              </div>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>净利率</div>
                <div style={{fontFamily: VF.num, fontSize: 50, color: V.red, lineHeight: 1}}>30%</div>
              </div>
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.inkSoft, marginTop: 8}}>成立第 27 年，赚得比哪一年都多</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(88)} until={cf(90) - 2}>
        <Put x={x + 70} y={610}>
          <IndexCard w={470} h={170} rot={2}>
            <div style={{display: 'flex', gap: 40}}>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>微信月活</div>
                <div style={{fontFamily: VF.num, fontSize: 48, color: V.ink, lineHeight: 1}}>14.18 亿</div>
              </div>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>Q Q 月活</div>
                <div style={{fontFamily: VF.num, fontSize: 48, color: V.ink, lineHeight: 1}}>5.08 亿</div>
              </div>
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.inkSoft, marginTop: 8}}>移动端 · 2025 年底</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(89)} until={cf(90) - 2}>
        <Put x={x - 700} y={620}>
          <Stamp size={44} rot={-6}>A I 全线压上</Stamp>
        </Put>
        <Note x={x - 700} y={760} size={23} color={V.inkSoft}>混元大模型 · 元宝 · 一年资本开支 768 亿</Note>
      </At>
    </>
  );
};

/* ============ 16 · 收尾 ============ */

const Final: React.FC<{f: number}> = ({f}) => {
  const x = X.final;
  return (
    <>
      <At f={f} at={cf(90)} until={cf(97) + 130}>
        <Put x={x - 700} y={90}>
          <Big size={104}>{countUp(f, cf(90), 3.5, 16, 1)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>港元 · 今天的市值（2026.10）</div>
        </Put>
      </At>
      <At f={f} at={cf(91)} until={cf(97) + 130}>
        <Put x={x - 700} y={330}>
          <Doc w={500} h={190} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft}}>年初，这个数字是</div>
            <div style={{fontFamily: VF.num, fontSize: 72, color: V.ink, lineHeight: 1.1}}>6 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 6}}>九个月，缩水四成多</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(92)} until={cf(97) + 130}>
        <Put x={x - 190} y={118}>
          <IndexCard w={470} h={200} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft, marginTop: -12}}>28 年，三次悬在崖边</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.6, marginTop: 4}}>
              2000 差点断粮
              <br />
              2018 腰斩 · 2022 又腰斩
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(93)} until={cf(97) + 130}>
        <Put x={x - 200} y={402}>
          <Stamp size={46} rot={-7}>从没人要，到离不开</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(94)} until={cf(97) + 130}>
        <Put x={x + 236} y={196}>
          <Doc w={430} h={200} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft}}>它没发明的</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink, lineHeight: 1.5, marginTop: 6}}>
              Q Q 不是
              <br />
              微信也不是
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 6}}>ICQ · Kik 都走在它前面</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(95)} until={cf(97) + 130}>
        <Put x={x + 236} y={470}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, width: 420, lineHeight: 1.55}}>
            把别人的发明
            <br />
            做到让人离不开
          </div>
        </Put>
      </At>
      <At f={f} at={cf(97)} until={cf(97) + 130}>
        <Put x={x - 700} y={600}>
          <IndexCard w={430} h={170} rot={1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.red, lineHeight: 1.5, marginTop: -10}}>
              下一次掉下去
              <br />
              还爬得起来吗
            </div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 年份计数 / 小图 / 收尾卡 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  [cf(8) - 6, 1998],
  [cf(16) - 6, 1999],
  [cf(20) - 6, 2000],
  [cf(24) - 6, 2000],
  [cf(27) - 6, 2001],
  [cf(32) - 6, 2004],
  [cf(36) - 6, 2003],
  [cf(42) - 6, 2010],
  [cf(49) - 6, 2011],
  [cf(57) - 6, 2013],
  [cf(64) - 6, 2016],
  [cf(69) - 6, 2018],
  [cf(75) - 6, 2021],
  [cf(82) - 6, 2023],
  [cf(90) - 6, 2026],
];

const Hud: React.FC<{f: number; camX: number; z: number}> = ({f, camX, z}) => {
  if (f < cf(1) || f >= cf(97) + 30 || z < 0.32) return null;
  const tracking = f >= cf(7) && f < cf(8) - 6;
  const year = tracking ? xy(camX) : rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={1998} to={2026} title="腾讯 28 年" bands={[[1999.9, 2001.3], [2018.1, 2018.95], [2021.8, 2022.9]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={23} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={78} seed={41} />
        <CapGrid cam={cam} />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Found f={f} />
        <Sale f={f} />
        <Rescue f={f} />
        <Monet f={f} />
        <Mih f={f} />
        <Ipo f={f} />
        <Money f={f} />
        <Qwar f={f} />
        <Wechat f={f} />
        <Redpack f={f} />
        <Peak f={f} />
        <Winter f={f} />
        <Fall f={f} />
        <Recover f={f} />
        <Final f={f} />
        {[
          [X.found - 620, 100],
          [X.qwar + 240, 96],
          [X.wechat + 260, 100],
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
  ['error', cw(4, '100 万'), 0.3],
  ['error', cw(5, '60 万'), 0.35],
  ['question', cf(7), 0.35],
  ['whoosh', cf(7) + 10, 0.4],
  ['paper', cf(8) - 4, 0.3],
  ['pop', cf(9), 0.3],
  ['click', cf(10), 0.3],
  ['pop', cf(12), 0.3],
  ['ding', cw(13, '100 万'), 0.35],
  ['error', cf(15), 0.35],
  ['whoosh', cf(16) - 26, 0.3],
  ['paper', cf(16), 0.3],
  ['shake', cf(17), 0.3],
  ['error', cf(18), 0.35],
  ['stamp', cf(19), 0.4],
  ['whoosh', cf(20) - 24, 0.3],
  ['magic', cf(20), 0.35],
  ['ding', cw(21, '220 万'), 0.35],
  ['question', cf(22), 0.3],
  ['stamp', cf(23), 0.35],
  ['whoosh', cf(24) - 24, 0.3],
  ['pop', cf(24), 0.3],
  ['paper', cf(25), 0.3],
  ['confetti', cf(26), 0.35],
  ['whoosh', cf(27) - 26, 0.3],
  ['paper', cf(27), 0.3],
  ['magic', cf(28), 0.35],
  ['ding', cw(29, '11 倍'), 0.4],
  ['paper', cf(30), 0.3],
  ['stamp', cf(31), 0.45],
  ['whoosh', cf(32) - 26, 0.3],
  ['magic', cf(33), 0.35],
  ['ding', cf(34), 0.35],
  ['confetti', cf(35), 0.3],
  ['whoosh', cf(36) - 28, 0.3],
  ['pop', cf(36), 0.3],
  ['ding', cf(37), 0.3],
  ['pop', cf(39), 0.3],
  ['magic', cf(41), 0.35],
  ['whoosh', cf(42) - 28, 0.3],
  ['error', cf(42), 0.35],
  ['shake', cf(43), 0.35],
  ['error', cf(44), 0.4],
  ['shake', cf(46), 0.4],
  ['shake', cf(47), 0.35],
  ['paper', cf(48), 0.3],
  ['whoosh', cf(49) - 26, 0.3],
  ['pop', cf(50), 0.3],
  ['paper', cf(51), 0.3],
  ['magic', cf(52), 0.4],
  ['ding', cf(52), 0.35],
  ['paper', cf(53), 0.3],
  ['ding', cw(55, '433'), 0.4],
  ['stamp', cf(56), 0.4],
  ['whoosh', cf(57) - 26, 0.3],
  ['pop', cf(57), 0.3],
  ['paper', cf(59), 0.3],
  ['ding', cw(60, '482'), 0.4],
  ['magic', cf(61), 0.35],
  ['paper', cf(62), 0.3],
  ['confetti', cf(63), 0.35],
  ['whoosh', cf(64) - 26, 0.3],
  ['magic', cf(64), 0.4],
  ['stamp', cf(65), 0.4],
  ['ding', cf(66), 0.35],
  ['pop', cf(67), 0.3],
  ['magic', cf(68), 0.4],
  ['whoosh', cf(69) - 26, 0.3],
  ['error', cf(69), 0.4],
  ['paper', cf(70), 0.3],
  ['error', cf(71), 0.35],
  ['error', cf(72), 0.4],
  ['paper', cf(73), 0.3],
  ['stamp', cf(74), 0.4],
  ['whoosh', cf(75) - 28, 0.3],
  ['magic', cf(75), 0.4],
  ['confetti', cf(76), 0.45],
  ['shake', cf(77), 0.35],
  ['error', cf(78), 0.35],
  ['error', cf(80), 0.4],
  ['stamp', cf(81), 0.45],
  ['whoosh', cf(82) - 28, 0.3],
  ['pop', cf(82), 0.3],
  ['paper', cf(83), 0.3],
  ['ding', cf(84), 0.3],
  ['magic', cf(85), 0.35],
  ['ding', cf(86), 0.45],
  ['ding', cf(87), 0.35],
  ['pop', cf(88), 0.3],
  ['stamp', cf(89), 0.4],
  ['whoosh', cf(90) - 26, 0.3],
  ['paper', cf(90), 0.3],
  ['error', cf(91), 0.35],
  ['stamp', cf(93), 0.4],
  ['paper', cf(94), 0.3],
  ['magic', cf(95), 0.35],
  ['stamp', cf(96), 0.4],
  ['question', cf(97), 0.4],
];
