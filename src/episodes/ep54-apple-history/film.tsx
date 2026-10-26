import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put, RedCheck, RedX} from '../../library/vox/desk';
import {rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, HandLine, IndexCard, Label, RedCircle, TypeOn, Underline} from '../../library/vox/props';
import {DeskLitter, PostIt, Pushpin, Stamp, Sticker} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {
  AirPodsArt,
  AppleMark,
  AppleOne,
  AppleTwoArt,
  Boardroom,
  ChipM,
  EmptyShelf,
  Foldable,
  FourGrid,
  GarageBench,
  Goggles,
  Hammer,
  IMacArt,
  IPhoneArt,
  IPadArt,
  IPodArt,
  MacBox,
  SlideArrow,
  Stage,
  Tag,
  TickerTape,
  WatchArt,
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
  now: yx(2026.9),
  found: yx(1976.25),
  apple2: yx(1977.3),
  ipo: yx(1980.95),
  mac: yx(1984.1),
  leave: yx(1985.7),
  wild: yx(1990.4),
  ret: yx(1997.4),
  cut: yx(1997.95),
  imac: yx(1998.6),
  ipod: yx(2001.8),
  iphone: yx(2007.05),
  ipad: yx(2010.4),
  end: yx(2011.75),
  cook: yx(2014.5),
  t1: yx(2018.6),
  t2: yx(2022.05),
  ai: yx(2024.5),
  peak: yx(2026.25),
  ternus: yx(2026.72),
  final: yx(2027.05),
};

/* ============ 相机路线 ============ */

const CAM: CamKey[] = [
  // 钩子：停在今天
  {f: 0, x: X.now - 420, y: 420, z: 1.3},
  {f: cf(5), x: X.now - 240, y: 460, z: 1.24, ease: 'sine', dur: 34},
  // 「把它这 50 年拉出来看」：沿轴倒着甩回 1976
  {f: cf(7) + 18, x: yx(2010), y: 520, z: 0.34, ease: 'sine', dur: 32},
  {f: cf(8) - 2, x: X.found - 90, y: 470, z: 1.3, ease: 'tail', dur: 28},
  {f: cf(9), x: X.found - 100, y: 480, z: 1.3, ease: 'sine', dur: 20},
  // Apple II
  {f: cf(13) - 4 - 26 - 8, x: X.apple2 - 90, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(15), x: X.apple2 - 100, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 上市
  {f: cf(18) - 4 - 26 - 8, x: X.ipo - 100, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(20), x: X.ipo - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // Mac：两次发布会并排铺开
  {f: cf(22) - 12, x: X.mac - 53, y: 440, z: 1.3, ease: 'tail', dur: 28},
  {f: cf(27), x: X.mac - 50, y: 438, z: 1.29, ease: 'sine', dur: 40},
  // 被赶走
  {f: cf(29) - 4 - 26 - 8, x: X.leave - 90, y: 470, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(31), x: X.leave - 100, y: 470, z: 1.3, ease: 'sine', dur: 20},
  // 十二年
  {f: cf(33) - 4 - 30 - 8, x: X.wild - 110, y: 470, z: 1.26, ease: 'tail', dur: 30},
  {f: cf(36), x: X.wild - 100, y: 470, z: 1.3, ease: 'sine', dur: 22},
  // 回来
  {f: cf(39) - 4 - 26 - 8, x: X.ret - 100, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(42), x: X.ret - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 砍产品
  {f: cf(45) - 4 - 24 - 8, x: X.cut - 90, y: 460, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(47), x: X.cut - 100, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // iMac
  {f: cf(48) - 4 - 24 - 8, x: X.imac - 90, y: 460, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(50), x: X.imac - 100, y: 450, z: 1.3, ease: 'sine', dur: 18},
  // iPod
  {f: cf(51) - 4 - 24 - 8, x: X.ipod - 90, y: 460, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(53), x: X.ipod - 100, y: 450, z: 1.3, ease: 'sine', dur: 18},
  // iPhone
  {f: cf(54) - 4 - 26 - 8, x: X.iphone - 110, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(57), x: X.iphone - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // iPad
  {f: cf(59) - 4 - 24 - 8, x: X.ipad - 90, y: 460, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(61), x: X.ipad - 100, y: 450, z: 1.3, ease: 'sine', dur: 18},
  // 告别
  {f: cf(62) - 4 - 28 - 8, x: X.end - 90, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(65), x: X.end - 100, y: 470, z: 1.3, ease: 'sine', dur: 22},
  // 库克
  {f: cf(66) - 4 - 24 - 8, x: X.cook - 100, y: 460, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(69), x: X.cook - 100, y: 450, z: 1.3, ease: 'sine', dur: 18},
  // 1 万亿
  {f: cf(71) - 4 - 26 - 8, x: X.t1 - 110, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(74), x: X.t1 - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 3 万亿 + 服务
  {f: cf(76) - 4 - 26 - 8, x: X.t2 - 110, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(78), x: X.t2 - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // AI
  {f: cf(80) - 4 - 28 - 8, x: X.ai - 110, y: 470, z: 1.28, ease: 'tail', dur: 28},
  {f: cf(83), x: X.ai - 100, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 4 万亿 / 5 万亿
  {f: cf(85) - 4 - 26 - 8, x: X.peak - 110, y: 460, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(86), x: X.peak - 100, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 换帅
  {f: cf(86) + 22, x: X.ternus - 100, y: 460, z: 1.28, ease: 'tail', dur: 26},
  // 收尾
  {f: cf(90) - 4 - 34 - 8, x: X.final - 160, y: 450, z: 1.22, ease: 'tail', dur: 34},
  {f: cf(93), x: X.final - 100, y: 450, z: 1.26, ease: 'sine', dur: 30},
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

const RULER_YEARS = [1976, 1980, 1985, 1990, 1997, 2001, 2007, 2010, 2014, 2018, 2022, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(1975.6), top: RULER_Y, width: yx(2027.05) - yx(1975.6), height: 6, background: V.ink}} />
    {RULER_YEARS.map((y) => (
      <div key={y} style={{position: 'absolute', left: yx(y) - 60, top: RULER_Y, width: 120, textAlign: 'center'}}>
        <div style={{width: 5, height: 26, background: V.ink, margin: '0 auto'}} />
        <div style={{fontFamily: VF.num, fontSize: 42, color: V.ink, marginTop: 6}}>{y}</div>
      </div>
    ))}
  </>
);

const GRID: [number, string][] = [
  [100, '100 亿'],
  [1000, '1,000 亿'],
  [10000, '1 万亿'],
];

const CapGrid: React.FC = () => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: X.ipo, top: capY(v), width: WORLD_W - X.ipo - 500, borderTop: '3px dashed rgba(23,23,22,0.15)'}} />
        {[X.ipo + 330, X.wild + 330, X.ipod + 330, X.end + 330, X.t2 + 330, X.peak + 330].map((x) => (
          <div key={x} style={{position: 'absolute', left: x + 12, top: capY(v) - 30, fontFamily: VF.heavy, fontSize: 17, color: 'rgba(23,23,22,0.22)', whiteSpace: 'nowrap'}}>
            {t}
          </div>
        ))}
      </React.Fragment>
    ))}
    <div style={{position: 'absolute', left: X.ipo + 160, top: capY(20) + 24, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, whiteSpace: 'nowrap'}}>
      红线：苹果市值（亿美元，对数刻度，示意）
    </div>
  </>
);

const CapLine: React.FC<{x0: number; x1: number}> = ({x0, x1}) => {
  const d = CAP_PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const head = Math.min(x1, CAP_PTS[CAP_PTS.length - 1][0]);
  return (
    <>
      <svg width={WORLD_W} height={WORLD_H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', clipPath: `inset(0 ${WORLD_W - x1}px 0 ${x0}px)`}}>
        <path d={`M${X.found} ${capY(17.8)} L${X.ipo} ${capY(17.8)}`} stroke="rgba(23,23,22,0.32)" strokeWidth={6} strokeDasharray="14 12" fill="none" />
        <path d={d} stroke={V.red} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {head > x0 && head > X.ipo && <div style={{position: 'absolute', left: head - 16, top: capAt(head) - 16, width: 32, height: 32, borderRadius: 16, background: V.red, border: `4px solid ${V.paper}`}} />}
      {x0 <= X.found && x1 > X.found && x1 < X.ipo && (
        <div style={{position: 'absolute', left: X.found + 40, top: capY(17.8) - 46, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, whiteSpace: 'nowrap'}}>还没上市</div>
      )}
    </>
  );
};

const lineSpan = (f: number, camX: number): [number, number] => {
  if (f < cf(7)) return [0, 0];
  if (f < cf(8)) return [0, WORLD_W];
  if (f < cf(90)) return [0, Math.max(X.ipo, camX + 700)];
  return [0, WORLD_W];
};

/* ============ 01 · 钩子：今天 ============ */

const Now: React.FC<{f: number}> = ({f}) => {
  const x = X.now;
  return (
    <>
      <At f={f} at={cf(1)} until={cf(7) + 26}>
        <Put x={x - 1010} y={150}>
          <Label size={30} bg={V.red}>2026.10 · 苹果公司</Label>
        </Put>
        <Put x={x - 1010} y={212}>
          <Big size={132}>{countUp(f, cf(1), 50450, 30)} 亿美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>2026.7.29 盘中峰值 5.045 万亿美元</div>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={cf(7) + 26}>
        <Put x={x - 1010} y={470}>
          <IndexCard w={480} h={190} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 30, color: V.inkSoft, marginTop: -14}}>市值到过 5 万亿的</div>
            <div style={{fontFamily: VF.heavy, fontSize: 46, color: V.ink, marginTop: 4}}>只有两家</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red, marginTop: 4}}>英伟达 5.7 万亿 · 苹果 5.0 万亿</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={cf(7) + 26}>
        <Put x={x + 150} y={190}>
          <Sticker rot={5}><AppleMark s={190} /></Sticker>
        </Put>
        <Note x={x + 160} y={396} size={24} color={V.inkSoft}>示意轮廓，不是官方标识</Note>
      </At>
      <At f={f} at={cf(3)} until={cf(7) + 26}>
        <Put x={x - 460} y={470}>
          <Tag text="1,300" sub="美元" rot={-5} />
        </Put>
        <Note x={x - 470} y={660} size={30}>50 年前的启动资金</Note>
      </At>
      <At f={f} at={cf(4)} until={cf(7) + 26}>
        <Put x={x - 460} y={726}>
          <PostIt w={330} rot={2} color="#e8e2cf" head="一辆车，一台计算器">
            乔布斯卖了大众微巴，沃兹卖了惠普计算器
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(5)} until={cf(7) + 26}>
        <Put x={x + 210} y={230}>
          <Stamp size={50} rot={-7}>两次只剩几个月</Stamp>
        </Put>
        <Note x={x + 200} y={360} size={24} color={V.inkSoft}>1985 被赶走 · 1997 离破产 90 天</Note>
      </At>
      <At f={f} at={cf(7)} until={cf(7) + 26}>
        <Put x={x + 260} y={500}>
          <div style={{fontFamily: VF.num, fontSize: 220, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 02 · 1976 车库 ============ */

const Found: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1976.4.1 · 加州洛斯阿尔托斯</Label>
      </Put>
      <Photo x={x - 700} y={110} w={330} h={220} caption="乔布斯家的车库（示意）" rot={-3}>
        <GarageBench w={330} h={220} />
      </Photo>
      <At f={f} at={cf(9)}>
        <Person x={x + 20} y={150} name="乔布斯" note="21 岁" hair="side" beard w={130} rot={-3} />
        <Person x={x + 240} y={172} name="沃兹尼亚克" note="25 岁" hair="short" glasses beard w={115} rot={3} />
      </At>
      <At f={f} at={cf(10)}>
        <Note x={x + 30} y={438} size={23} color={V.inkSoft}>拉货、谈判　　　设计电路　　　画了合同</Note>
        <Person x={x + 440} y={190} name="罗恩·韦恩" note="41 岁" hair="receding" tie w={105} rot={-2} />
      </At>
      <At f={f} at={cf(11)}>
        <Put x={x - 160} y={470}>
          <PostIt w={340} rot={3} head="11 天后他退出了">
            800 美元，卖掉手里 10% 的股份
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(12)}>
        <Put x={x - 700} y={470}>
          <Doc w={500} h={190} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft}}>那份 10% 的合同</div>
            <div style={{fontFamily: VF.num, fontSize: 52, color: V.red, lineHeight: 1.15, whiteSpace: 'nowrap'}}>后来值几千亿美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.inkSoft, whiteSpace: 'nowrap'}}>按 5 万亿市值粗算，10% 约 5,000 亿</div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 03 · 1977 Apple II ============ */

const AppleII: React.FC<{f: number}> = ({f}) => {
  const x = X.apple2;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1977.4 · 西海岸电脑展</Label>
      </Put>
      <Photo x={x - 700} y={110} w={330} h={220} caption="Apple II（示意）" rot={-2}>
        <AppleTwoArt w={330} h={220} />
      </Photo>
      <At f={f} at={cf(13)}>
        <Put x={x - 360} y={90}>
          <Sticker rot={-4}><AppleOne s={210} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(13) + 16}>
        <Put x={x - 350} y={290}>
          <Tag text="666.66" sub="美元" rot={-3} />
        </Put>
        <Note x={x - 360} y={470} size={24} color={V.inkSoft}>Apple 1：一块板子，机箱键盘自己配</Note>
      </At>
      <At f={f} at={cf(14)}>
        <Put x={x + 40} y={100}>
          <Doc w={520} h={180} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>一共卖了</div>
            <div style={{fontFamily: VF.num, fontSize: 74, color: V.ink, lineHeight: 1.1}}>约 200 台</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>1977 财年营收 77 万美元</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(16)}>
        <Put x={x + 40} y={340}>
          <PostIt w={300} rot={-2} head="Apple II 卖了 16 年">
            苹果第一台真正的现金流产品
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(17)}>
        <Put x={x + 40} y={560}>
          <Note x={0} y={0} size={30} color={V.red}>第一台普通人能搬回家的电脑</Note>
        </Put>
      </At>
    </>
  );
};

/* ============ 04 · 1980 上市 ============ */

const Ipo: React.FC<{f: number}> = ({f}) => {
  const x = X.ipo;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1980.12.12 · 纳斯达克</Label>
      </Put>
      <At f={f} at={cf(18)}>
        <Put x={x - 700} y={120}>
          <Sticker rot={-2}><TickerTape w={340} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(19)}>
        <Put x={x - 700} y={210}>
          <Doc w={560} h={210} rot={0}>
            <div style={{display: 'flex', gap: 40}}>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>发行价</div>
                <div style={{fontFamily: VF.num, fontSize: 66, color: V.ink, lineHeight: 1}}>22</div>
              </div>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>首日收盘</div>
                <div style={{fontFamily: VF.num, fontSize: 66, color: V.red, lineHeight: 1}}>29</div>
              </div>
              <div>
                <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>当天涨幅</div>
                <div style={{fontFamily: VF.num, fontSize: 66, color: V.ink, lineHeight: 1}}>+32%</div>
              </div>
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(20)}>
        <Put x={x + 40} y={110}>
          <Big size={150}>{countUp(f, cf(20), 17.8, 12, 1)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>美元 · 上市首日市值</div>
        </Put>
      </At>
      <At f={f} at={cf(21)}>
        <Put x={x + 40} y={400}>
          <IndexCard w={480} h={200} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -12}}>那天收盘以后</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>4 个亿万富翁</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>40 个百万富翁</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 4}}>自 1956 年福特以来最大的 IPO</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(20) + 30}>
        <Put x={x + 400} y={150}>
          <Sticker rot={6}><AppleMark s={150} /></Sticker>
        </Put>
      </At>
    </>
  );
};

/* ============ 05 · 1983—1984 Lisa 与 Mac ============ */

const Mac: React.FC<{f: number}> = ({f}) => {
  const x = X.mac;
  return (
    <>
      <Put x={x - 690} y={42}>
        <Label size={26}>1983—1984 · 两次发布会</Label>
      </Put>

      {/* 左列 Lisa */}
      <Note x={x - 690} y={100} size={44}>1983 · Lisa</Note>
      <At f={f} at={cf(22) - 2}>
        <Put x={x - 690} y={176}>
          <Tag text="9,995" sub="美元" rot={-4} />
        </Put>
      </At>
      <At f={f} at={cf(22) + 10}>
        <Note x={x - 650} y={306} size={26} color={V.red}>太贵，卖不动</Note>
      </At>
      <At f={f} at={cf(23)}>
        <Put x={x - 660} y={470}>
          <Sticker rot={-6}><Hammer s={124} /></Sticker>
        </Put>
        <Put x={x - 506} y={500}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, width: 290, lineHeight: 1.65}}>
            1 月 22 日，超级碗
            <br />
            一支广告只说了日期
          </div>
        </Put>
      </At>

      {/* 分隔虚线 */}
      <Put x={x - 216} y={92}>
        <div style={{width: 3, height: 700, borderLeft: '3px dashed rgba(23,23,22,0.28)'}} />
      </Put>

      {/* 中列 Macintosh */}
      <Note x={x - 166} y={100} size={44}>1984 · Macintosh</Note>
      <At f={f} at={cf(26)}>
        <Put x={x - 206} y={186}>
          <Sticker rot={3}><MacBox s={222} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(26) + 16}>
        <Put x={x - 156} y={424}>
          <Tag text="2,495" sub="美元" rot={2} />
        </Put>
      </At>

      {/* 右列 */}
      <At f={f} at={cf(27)}>
        <Put x={x + 164} y={168}>
          <IndexCard w={420} h={254} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft, marginTop: -14}}>Macintosh 第一次带来</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 33, lineHeight: 1.5, color: V.ink}}>
              鼠标
              <br />
              图形界面
              <br />
              一台会笑的电脑
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(28)}>
        <Put x={x + 194} y={470}>
          <PostIt w={330} rot={3} color="#f0d7c8" head="但它是这样一台机器">
            128K 内存 · 没有硬盘 · 不能扩展
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 06 · 1985 被赶走 ============ */

const Leave: React.FC<{f: number}> = ({f}) => {
  const x = X.leave;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1985 · 库比蒂诺</Label>
      </Put>
      <Photo x={x - 700} y={110} w={330} h={220} caption="董事会（示意）" rot={-2}>
        <Boardroom w={330} h={220} />
      </Photo>
      <At f={f} at={cf(29)}>
        <Put x={x - 700} y={398}>
          <Note x={0} y={0} size={28} color={V.inkSoft}>1985 年，销量掉下来</Note>
        </Put>
      </At>
      <At f={f} at={cf(30)}>
        <Put x={x - 360} y={110}>
          <Doc w={470} h={190} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft}}>他请来的人</div>
            <div style={{fontFamily: VF.heavy, fontSize: 44, color: V.ink}}>约翰·斯卡利</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>百事可乐总裁，1983 年被挖来</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(31)}>
        <Put x={x - 330} y={324}>
          <Stamp size={42} rot={-8}>5 月收权</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(32)}>
        <Put x={x - 360} y={470}>
          <Doc w={500} h={210} rot={-1}>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.red, lineHeight: 1.1}}>9 月，他辞职</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 8, lineHeight: 1.6}}>
              卖掉手里全部苹果股票
              <br />
              只留一股，为了还能来开股东大会
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(31) + 22}>
        <Put x={x + 240} y={180}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 40, color: V.ink, width: 360, lineHeight: 1.5}}>
            创立的人
            <br />
            被自己请来的 CEO
            <br />
            请出了公司
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 07 · 十二年 ============ */

const Wild: React.FC<{f: number}> = ({f}) => {
  const x = X.wild;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1985—1997 · 没有乔布斯的十二年</Label>
      </Put>
      <Photo x={x - 700} y={110} w={290} h={196} caption="越来越空的货架（示意）" rot={-2}>
        <EmptyShelf w={290} h={196} />
      </Photo>
      <At f={f} at={cf(33)}>
        <Put x={x - 700} y={400}>
          <Big size={120}>3 个 CEO</Big>
        </Put>
      </At>
      <At f={f} at={cf(34)}>
        <Put x={x - 400} y={110}>
          <Doc w={470} h={170} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft}}>为了保住份额</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>Mac 授权给兼容机</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red}}>利润被一点点分掉</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(35)}>
        <Put x={x - 400} y={330}>
          <Sticker rot={-5}><SlideArrow s={110} /></Sticker>
        </Put>
        <Put x={x - 280} y={350}>
          <div style={{fontFamily: VF.num, fontSize: 62, color: V.red, lineHeight: 1.2}}>10% → 3%</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.ink}}>全球 PC 市场份额</div>
        </Put>
      </At>
      <At f={f} at={cf(36)}>
        <Put x={x + 120} y={120}>
          <Doc w={420} h={250} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>账本</div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontFamily: VF.num, fontSize: 30}}>
              <span>FY1996 营收</span>
              <span>98 亿</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: VF.num, fontSize: 30, color: V.red}}>
              <span>FY1997 净利</span>
              <span>−10.45 亿</span>
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 14}}>美元 · 1997 财年</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(38)}>
        <Put x={x + 120} y={410}>
          <Stamp size={46} rot={-6}>离破产 90 天</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 08 · 1996 收购 NeXT / 1997 回来 ============ */

const Return: React.FC<{f: number}> = ({f}) => {
  const x = X.ret;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1996.12 — 1997.8 · 库比蒂诺</Label>
      </Put>
      <At f={f} at={cf(39)}>
        <Put x={x - 700} y={110}>
          <Doc w={490} h={220} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>苹果买下 NeXT</div>
            <div style={{fontFamily: VF.num, fontSize: 70, color: V.red, lineHeight: 1.1}}>4.29 亿美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>1996 年 12 月 20 日</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(40)}>
        <Put x={x - 700} y={370}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 36, color: V.ink, width: 480, lineHeight: 1.5}}>
            被赶走十二年的人
            <br />
            跟着一笔收购回来了
          </div>
        </Put>
      </At>
      <At f={f} at={cf(41)}>
        <Put x={x - 140} y={100}>
          <Big size={84}>临时 CEO</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 6}}>没有薪水，只拿 1 美元</div>
        </Put>
      </At>
      <At f={f} at={cf(43)}>
        <Put x={x - 130} y={250}>
          <Doc w={430} h={120} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 23, color: V.inkSoft}}>1997 年 8 月 · 微软</div>
            <div style={{fontFamily: VF.num, fontSize: 54, color: V.ink, lineHeight: 1.15}}>1.5 亿美元</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(44)}>
        <Put x={x - 130} y={400}>
          <IndexCard w={450} h={180} rot={-3}>
            <div style={{fontFamily: VF.hand, fontSize: 28, color: '#1f3f8a', lineHeight: 1.4, marginTop: -8}}>
              “大屏幕上他的脸出现，
              <br />
              台下在嘘。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.red, marginTop: 8}}>Macworld 1997 · 波士顿</div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 09 · 1997 砍产品线 ============ */

const Cut: React.FC<{f: number}> = ({f}) => {
  const x = X.cut;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1997 · 产品线</Label>
      </Put>
      <At f={f} at={cf(45)}>
        <Put x={x - 700} y={110}>
          <Sticker rot={-3}><FourGrid s={260} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(46)}>
        <Put x={x - 410} y={110}>
          <Big size={100}>15 → 4</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.inkSoft, marginTop: 6}}>十五个产品，砍成四个格子</div>
        </Put>
      </At>
      <At f={f} at={cf(46) + 26}>
        <Put x={x - 400} y={300}>
          <Stamp size={44} rot={-6}>砍掉七成</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(47)}>
        <Put x={x + 40} y={130}>
          <IndexCard w={500} h={240} rot={2}>
            <div style={{fontFamily: VF.hand, fontSize: 40, color: '#1f3f8a', lineHeight: 1.45, marginTop: -16}}>
              “决定不做什么，
              <br />
              和决定做什么
              <br />
              一样重要。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 12}}>乔布斯 · 1997</div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 10 · 1998 iMac ============ */

const Imac: React.FC<{f: number}> = ({f}) => {
  const x = X.imac;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>1998.8 · 库比蒂诺</Label>
      </Put>
      <At f={f} at={cf(48)}>
        <Put x={x - 700} y={100}>
          <Sticker rot={-3}><IMacArt s={230} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(49)}>
        <Put x={x - 470} y={130}>
          <Tag text="1,299" sub="美元" rot={-4} />
        </Put>
        <Note x={x - 510} y={310} size={24} color={V.inkSoft}>半透明一体机，五种颜色</Note>
      </At>
      <At f={f} at={cf(50)}>
        <Put x={x - 300} y={400}>
          <Doc w={480} h={180} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>上市第一年</div>
            <div style={{fontFamily: VF.num, fontSize: 72, color: V.ink, lineHeight: 1.1}}>80 万台</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red}}>1998 财年，苹果重新盈利</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(50) + 34}>
        <Put x={x + 240} y={110}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 44, color: V.ink, width: 380, lineHeight: 1.5}}>
            一台电脑
            <br />
            救回一家公司
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 11 · 2001 iPod ============ */

const IPod: React.FC<{f: number}> = ({f}) => {
  const x = X.ipod;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2001.10.23 · 库比蒂诺</Label>
      </Put>
      <At f={f} at={cf(51)}>
        <Put x={x - 690} y={100}>
          <Sticker rot={-4}><IPodArt s={150} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(52)}>
        <Put x={x - 470} y={120}>
          <Big size={104}>1,000 首</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 6}}>装进一个 399 美元的口袋</div>
        </Put>
      </At>
      <At f={f} at={cf(52) + 26}>
        <Put x={x - 490} y={300}>
          <Tag text="5GB" sub="· 399 美元" rot={-3} />
        </Put>
      </At>
      <At f={f} at={cf(53)}>
        <Put x={x + 120} y={160}>
          <Doc w={450} h={210} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2003 年，iTunes 商店</div>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6}}>
              <span style={{fontFamily: VF.num, fontSize: 70, color: V.red, lineHeight: 1}}>99</span>
              <span style={{fontFamily: VF.heavy, fontSize: 26, color: V.ink}}>美分 / 首</span>
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 8}}>单曲拆开卖，唱片业的规矩被改了</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(53) + 34}>
        <Put x={x + 120} y={400}>
          <PostIt w={320} rot={-2} head="iPod 不是第一台 MP3">
            它不是先做的，它是让人愿意掏钱的
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 12 · 2007 iPhone ============ */

const IPhone: React.FC<{f: number}> = ({f}) => {
  const x = X.iphone;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2007.1.9 · 旧金山 Moscone</Label>
      </Put>
      <At f={f} at={cf(55)}>
        <Put x={x - 700} y={110}>
          <IndexCard w={520} h={210} rot={-1}>
            <div style={{fontFamily: VF.hand, fontSize: 34, color: '#1f3f8a', lineHeight: 1.45, marginTop: -12}}>
              “今天，苹果
              <br />
              重新发明了手机。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 8}}>乔布斯 · 2007.1.9</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(56)}>
        <Put x={x - 690} y={348}>
          <Tag text="499" sub="美元起 · 6.29 开卖" rot={-3} />
        </Put>
      </At>
      <At f={f} at={cf(54)}>
        <Put x={x - 300} y={90}>
          <Photo x={0} y={0} w={280} h={186} caption="发布会（示意）" rot={2}>
            <Stage w={280} h={186} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(54) + 10}>
        <Put x={x + 10} y={96}>
          <Sticker rot={5}><IPhoneArt s={120} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(57)}>
        <Put x={x + 150} y={170}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, width: 300, lineHeight: 1.5}}>
            没有键盘
            <br />
            只有一整块玻璃
          </div>
        </Put>
      </At>
      <At f={f} at={cf(58)}>
        <Put x={x + 150} y={330}>
          <Doc w={380} h={160} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 22, color: V.inkSoft}}>2008 年，App Store</div>
            <div style={{fontFamily: VF.num, fontSize: 58, color: V.ink, lineHeight: 1.15}}>500 个应用</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.red}}>上线第一天</div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 13 · 2010 iPad ============ */

const IPad: React.FC<{f: number}> = ({f}) => {
  const x = X.ipad;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2010.1.27 · 旧金山</Label>
      </Put>
      <At f={f} at={cf(59)}>
        <Put x={x - 690} y={110}>
          <Sticker rot={-3}><IPadArt s={200} /></Sticker>
        </Put>
      </At>
      <At f={f} at={cf(60)}>
        <Put x={x - 430} y={120}>
          <Doc w={520} h={210} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2010 年 5 月 26 日</div>
            <div style={{fontFamily: VF.heavy, fontSize: 42, color: V.ink, lineHeight: 1.35}}>
              市值超过微软
              <br />
              第一次成为全球最大
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 6}}>科技公司 · 2,220 亿美元</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(61) + 20}>
        <Put x={x - 430} y={400}>
          <Stamp size={48} rot={-7}>全球第一</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(59) + 20}>
        <Put x={x + 180} y={140}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, width: 340, lineHeight: 1.6}}>
            第三台
            <br />
            它也没有先做
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 14 · 2011 告别 ============ */

const JobsEnd: React.FC<{f: number}> = ({f}) => {
  const x = X.end;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2011 · 库比蒂诺</Label>
      </Put>
      <At f={f} at={cf(62)}>
        <Person x={x - 690} y={110} name="史蒂夫·乔布斯" note="1955—2011" hair="receding" glasses beard turtleneck w={150} rot={-2} />
      </At>
      <At f={f} at={cf(62) + 14}>
        <Put x={x - 500} y={120}>
          <Doc w={430} h={110} rot={1}>
            <div style={{fontFamily: VF.num, fontSize: 40, color: V.ink, lineHeight: 1.2}}>8.24 辞任 CEO</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>把位置交给库克</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(63)}>
        <Put x={x - 500} y={260}>
          <Doc w={430} h={110} rot={-1}>
            <div style={{fontFamily: VF.num, fontSize: 40, color: V.ink, lineHeight: 1.2}}>10.4 iPhone 4S</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>他最后一次站在台上</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(64)}>
        <Put x={x - 500} y={400}>
          <div style={{fontFamily: VF.num, fontSize: 46, color: V.red, lineHeight: 1.25}}>10.5 · 56 岁</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.ink, marginTop: 18}}>第二天，他去世了</div>
        </Put>
      </At>
      <At f={f} at={cf(65)}>
        <Put x={x + 60} y={140}>
          <Big size={120}>{countUp(f, cf(65), 1083, 14)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>美元 · 2011 财年营收</div>
        </Put>
      </At>
      <At f={f} at={cf(65) + 26}>
        <Put x={x + 60} y={400}>
          <PostIt w={340} rot={-2} color="#e6e0d2" head="他留下的">
            一台 iPod、一部 iPhone、一台 iPad，和一条产品哲学
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 15 · 库克：把 iPhone 铺满世界 ============ */

const Cook: React.FC<{f: number}> = ({f}) => {
  const x = X.cook;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2011—2016 · 库克时代</Label>
      </Put>
      <At f={f} at={cf(66)}>
        <Put x={x - 690} y={120}>
          <Big size={110}>{countUp(f, cf(66), 3500)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft, marginTop: 4}}>接手时的市值（美元）</div>
        </Put>
      </At>
      <At f={f} at={cf(67)}>
        <Put x={x - 690} y={360}>
          <Doc w={500} h={190} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>他做的事，不是做新产品</div>
            <div style={{fontFamily: VF.heavy, fontSize: 38, color: V.ink, lineHeight: 1.45}}>
              是把 iPhone
              <br />
              铺到每一个国家
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(69)}>
        <Put x={x - 160} y={110}>
          <Sticker rot={-4}><WatchArt s={130} /></Sticker>
        </Put>
        <Note x={x - 175} y={318} size={24}>Watch · 2014</Note>
      </At>
      <At f={f} at={cf(70)}>
        <Put x={x + 40} y={110}>
          <Sticker rot={5}><AirPodsArt s={190} /></Sticker>
        </Put>
        <Note x={x + 70} y={318} size={24}>AirPods · 2016</Note>
      </At>
      <At f={f} at={cf(68)}>
        <Put x={x - 160} y={400}>
          <PostIt w={350} rot={2} head="他的强项是供应链">
            库存周转以小时计，全球同时开卖
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 16 · 2018 一万亿 / 2020 两万亿 / M1 ============ */

const T1: React.FC<{f: number}> = ({f}) => {
  const x = X.t1;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2018.8.2 · 纳斯达克</Label>
      </Put>
      <At f={f} at={cf(71)}>
        <Put x={x - 690} y={120}>
          <Big size={150}>{countUp(f, cf(71), 1, 26)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>美元 · 第一家到这里的美国公司</div>
        </Put>
      </At>
      <At f={f} at={cf(72)}>
        <Put x={x - 680} y={330}>
          <Stamp size={50} rot={-5}>美国第一家</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(73)}>
        <Put x={x - 40} y={150}>
          <Doc w={400} h={170} rot={1}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2020 年 8 月</div>
            <div style={{fontFamily: VF.num, fontSize: 74, color: V.ink, lineHeight: 1.1}}>2 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red}}>两年，翻一倍</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(74)}>
        <Put x={x - 40} y={360}>
          <Sticker rot={-4}><ChipM label="M 1" s={130} /></Sticker>
        </Put>
        <Put x={x + 130} y={392}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, width: 300, lineHeight: 1.55}}>
            2020.11
            <br />
            M 1 芯片
          </div>
        </Put>
      </At>
      <At f={f} at={cf(75)}>
        <Put x={x + 180} y={500}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, width: 360, lineHeight: 1.5}}>
            Mac 和英特尔
            <br />
            从此分手
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 17 · 2022 三万亿 + 服务 ============ */

const T2: React.FC<{f: number}> = ({f}) => {
  const x = X.t2;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2022.1.3 · 盘中</Label>
      </Put>
      <At f={f} at={cf(76)}>
        <Put x={x - 690} y={120}>
          <Big size={150}>{countUp(f, cf(76), 3, 26)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>美元 · 全球第一家</div>
        </Put>
      </At>
      <At f={f} at={cf(77)}>
        <Put x={x - 690} y={390}>
          <Doc w={520} h={200} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 23, color: V.inkSoft}}>2025 财年 · 服务收入</div>
            <div style={{fontFamily: VF.num, fontSize: 66, color: V.red, lineHeight: 1.1}}>1,093 亿美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft}}>约占总营收四分之一</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(78)}>
        <Put x={x + 40} y={110}>
          <Doc w={480} h={250} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>毛利率</div>
            {[
              ['服务', 75, V.red],
              ['硬件', 36, V.inkSoft],
            ].map(([name, v, c]) => (
              <div key={String(name)} style={{marginTop: 14}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink}}>
                  <span>{name}</span>
                  <span>{v}%</span>
                </div>
                <div style={{height: 22, background: 'rgba(23,23,22,0.12)', marginTop: 4}}>
                  <div style={{width: `${Number(v) * 4.4}px`, height: 22, background: String(c)}} />
                </div>
              </div>
            ))}
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(79)}>
        <Put x={x + 40} y={400}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 36, color: V.ink, width: 440, lineHeight: 1.5}}>
            这才是库克
            <br />
            真正的作品
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 18 · AI 落后 / Vision Pro ============ */

const Ai: React.FC<{f: number}> = ({f}) => {
  const x = X.ai;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2022—2024 · 大模型来了</Label>
      </Put>
      <At f={f} at={cf(80)}>
        <Put x={x - 690} y={120}>
          <Big size={96}>晚了一步</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: 6}}>所有科技巨头里</div>
        </Put>
      </At>
      <At f={f} at={cf(81)}>
        <Put x={x - 690} y={300}>
          <Doc w={500} h={230} rot={-1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 27, color: V.ink, lineHeight: 1.65}}>
              微软把模型塞进 Office
              <br />
              谷歌把它塞进搜索
              <br />
              苹果先把它塞进手机
            </div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(82)}>
        <Put x={x - 680} y={570}>
          <Stamp size={40} rot={-4}>Siri 升级一推再推</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(83)}>
        <Put x={x + 120} y={100}>
          <Photo x={0} y={0} w={300} h={200} caption="Vision Pro（示意）" rot={2}>
            <Goggles w={300} h={200} />
          </Photo>
        </Put>
        <Put x={x + 130} y={370}>
          <Tag text="3,499" sub="美元" rot={-3} />
        </Put>
      </At>
      <At f={f} at={cf(84)}>
        <Put x={x + 120} y={520}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, width: 420, lineHeight: 1.5}}>
            一台戴在脸上的电脑
            <br />
            没成为下一个 iPhone
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 19 · 4 万亿 → 5 万亿 ============ */

const Peak: React.FC<{f: number}> = ({f}) => {
  const x = X.peak;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2025.10 — 2026.7</Label>
      </Put>
      <At f={f} at={cf(85)}>
        <Put x={x - 700} y={110}>
          <Big size={104}>{countUp(f, cf(85), 4, 18)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 2}}>2025 年 10 月 28 日 · 第三家</div>
        </Put>
      </At>
      <At f={f} at={cf(86)}>
        <Put x={x - 700} y={252}>
          <Big size={104}>{countUp(f, cf(86), 5.045, 12, 3)} 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, marginTop: 2}}>2026 年 7 月 29 日 · 史上第二家</div>
        </Put>
      </At>
      <At f={f} at={cf(86) + 30}>
        <Put x={x + 300} y={250}>
          <Stamp size={50} rot={-7}>5 万亿</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(87)}>
        <Put x={x - 100} y={110}>
          <Doc w={480} h={170} rot={2}>
            <div style={{fontFamily: VF.num, fontSize: 38, color: V.ink, lineHeight: 1.2}}>2026.9.1</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.ink, marginTop: 6}}>
              库克卸任，转任执行董事长
              <br />
              十五年 CEO 时代结束
            </div>
          </Doc>
        </Put>
      </At>
    </>
  );
};

/* ============ 20 · 换帅 / 折叠机 ============ */

const Ternus: React.FC<{f: number}> = ({f}) => {
  const x = X.ternus;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2026.9 · 库比蒂诺</Label>
      </Put>
      <At f={f} at={cf(88)}>
        <Person x={x - 680} y={110} name="约翰·特努斯" note="51 岁 · 硬件工程出身" hair="short" shirt w={130} rot={-3} />
        <Put x={x - 380} y={112}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 52, color: V.ink, width: 470, lineHeight: 1.4}}>
            接任的人
            <br />
            是硬件工程师
          </div>
        </Put>
      </At>
      <At f={f} at={cf(88) + 30}>
        <Put x={x - 380} y={330}>
          <PostIt w={330} rot={2} head="在苹果 25 年">
            参与 iPad、AirPods、Mac 自研芯片
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(88) + 22}>
        <Put x={x + 100} y={110}>
          <Sticker rot={-4}><Foldable w={300} h={200} /></Sticker>
        </Put>
        <Note x={x + 90} y={330} size={26}>2026.9 · 第一台折叠 iPhone</Note>
      </At>
      <At f={f} at={cf(89) + 26}>
        <Put x={x + 100} y={390}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, width: 400, lineHeight: 1.5}}>
            上一次换帅
            <br />
            是 2011 年
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 21 · 收尾 ============ */

const Final: React.FC<{f: number}> = ({f}) => {
  const x = X.final;
  return (
    <>
      <At f={f} at={cf(90)}>
        <Put x={x - 700} y={90}>
          <Big size={104}>50 年</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>从 1,300 美元到 5 万亿</div>
        </Put>
      </At>
      <At f={f} at={cf(91)}>
        <Put x={x - 700} y={330}>
          <Doc w={500} h={190} rot={-1}>
            <div style={{fontFamily: VF.heavy, fontSize: 25, color: V.inkSoft}}>它没发明</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, lineHeight: 1.5}}>
              手机 · 音乐播放器 · 平板
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 6}}>三样都不是它先做的</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(92)}>
        <Put x={x - 190} y={118}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 42, color: V.ink, width: 430, lineHeight: 1.5}}>
            它做的
            <br />
            是把已有的东西
            <br />
            做到让人排队
          </div>
        </Put>
      </At>
      <At f={f} at={cf(93)}>
        <Put x={x - 200} y={402}>
          <Stamp size={48} rot={-6}>规则变了</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(94)}>
        <Put x={x + 236} y={196}>
          <IndexCard w={386} h={236} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, lineHeight: 1.55, marginTop: -10}}>
              先做的人
              <br />
              往往不是赢的人
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.red, marginTop: 10}}>50 年 · 一条规律</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(96)}>
        <Put x={x + 236} y={470}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 38, color: V.red, width: 380, lineHeight: 1.5}}>
            下一个 50 年
            <br />
            靠什么
          </div>
        </Put>
      </At>
    </>
  );
};

/* ============ 年份计数 / 小图 / 收尾卡 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  [cf(8) - 6, 1976],
  [cf(13) - 6, 1977],
  [cf(18) - 6, 1980],
  [cf(22) - 6, 1983],
  [cf(29) - 6, 1985],
  [cf(33) - 6, 1990],
  [cf(39) - 6, 1997],
  [cf(48) - 6, 1998],
  [cf(51) - 6, 2001],
  [cf(54) - 6, 2007],
  [cf(59) - 6, 2010],
  [cf(62) - 6, 2011],
  [cf(66) - 6, 2014],
  [cf(71) - 6, 2018],
  [cf(76) - 6, 2022],
  [cf(80) - 6, 2024],
  [cf(85) - 6, 2025],
  [cf(87) - 6, 2026],
];

const Hud: React.FC<{f: number; camX: number; z: number}> = ({f, camX, z}) => {
  if (f < cf(1) || f >= cf(96) + 30 || z < 0.32) return null;
  const tracking = f >= cf(7) && f < cf(8) - 6;
  const year = tracking ? xy(camX) : rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={1976} to={2026} title="苹果 50 年" bands={[[1985.5, 1997.6], [2022.0, 2023.2]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={19} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={78} seed={31} />
        <CapGrid />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Found f={f} />
        <AppleII f={f} />
        <Ipo f={f} />
        <Mac f={f} />
        <Leave f={f} />
        <Wild f={f} />
        <Return f={f} />
        <Cut f={f} />
        <Imac f={f} />
        <IPod f={f} />
        <IPhone f={f} />
        <IPad f={f} />
        <JobsEnd f={f} />
        <Cook f={f} />
        <T1 f={f} />
        <T2 f={f} />
        <Ai f={f} />
        <Peak f={f} />
        <Ternus f={f} />
        <Final f={f} />
        {[
          [X.found - 620, 100],
          [X.mac + 240, 96],
          [X.iphone + 260, 100],
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
  ['error', cw(6, '两次'), 0.3],
  ['question', cf(7), 0.35],
  ['whoosh', cf(7) + 10, 0.4],
  ['paper', cf(8) - 4, 0.3],
  ['pop', cf(9), 0.3],
  ['click', cf(10), 0.3],
  ['stamp', cf(11), 0.4],
  ['paper', cf(12), 0.3],
  ['whoosh', cf(13) - 26, 0.3],
  ['pop', cf(13), 0.3],
  ['ding', cw(13, '666'), 0.35],
  ['type', cf(16), 0.3],
  ['whoosh', cf(18) - 26, 0.3],
  ['magic', cf(19), 0.35],
  ['ding', cw(19, '29'), 0.4],
  ['paper', cf(20), 0.3],
  ['confetti', cf(21), 0.35],
  ['whoosh', cf(22) - 28, 0.3],
  ['error', cw(22, '9,995'), 0.3],
  ['stamp', cf(23), 0.35],
  ['magic', cf(26), 0.35],
  ['ding', cw(26, '2,495'), 0.35],
  ['paper', cf(27), 0.3],
  ['whoosh', cf(29) - 26, 0.3],
  ['shake', cf(30), 0.35],
  ['stamp', cf(31), 0.45],
  ['error', cf(32), 0.4],
  ['whoosh', cf(33) - 30, 0.3],
  ['error', cf(35), 0.35],
  ['paper', cf(36), 0.3],
  ['error', cf(37), 0.4],
  ['stamp', cf(38), 0.45],
  ['whoosh', cf(39) - 26, 0.3],
  ['paper', cf(39), 0.3],
  ['ding', cf(40), 0.35],
  ['pop', cf(41), 0.3],
  ['stamp', cf(43), 0.4],
  ['whoosh', cf(45) - 24, 0.3],
  ['pop', cf(46), 0.35],
  ['stamp', cf(46) + 26, 0.4],
  ['paper', cf(47), 0.3],
  ['whoosh', cf(48) - 24, 0.3],
  ['magic', cf(49), 0.35],
  ['ding', cw(49, '1,299'), 0.35],
  ['confetti', cf(50), 0.35],
  ['whoosh', cf(51) - 24, 0.3],
  ['pop', cf(51), 0.3],
  ['ding', cw(52, '1,000'), 0.35],
  ['paper', cf(53), 0.3],
  ['whoosh', cf(54) - 26, 0.3],
  ['paper', cf(54), 0.3],
  ['magic', cf(55), 0.4],
  ['ding', cw(56, '499'), 0.35],
  ['pop', cf(57), 0.3],
  ['confetti', cf(58), 0.35],
  ['whoosh', cf(59) - 24, 0.3],
  ['paper', cf(59), 0.3],
  ['magic', cf(60), 0.4],
  ['stamp', cf(61) + 20, 0.4],
  ['whoosh', cf(62) - 28, 0.3],
  ['paper', cf(62), 0.3],
  ['error', cf(64), 0.4],
  ['paper', cf(65), 0.3],
  ['whoosh', cf(66) - 24, 0.3],
  ['ding', cf(66), 0.3],
  ['pop', cf(69), 0.3],
  ['pop', cf(70), 0.3],
  ['whoosh', cf(71) - 26, 0.3],
  ['magic', cf(71), 0.4],
  ['stamp', cf(72), 0.4],
  ['ding', cf(73), 0.35],
  ['whoosh', cf(74) - 20, 0.3],
  ['magic', cf(74), 0.35],
  ['stamp', cf(75), 0.4],
  ['whoosh', cf(76) - 26, 0.3],
  ['magic', cf(76), 0.4],
  ['paper', cf(77), 0.3],
  ['ding', cw(78, '75'), 0.35],
  ['stamp', cf(79), 0.4],
  ['whoosh', cf(80) - 28, 0.32],
  ['error', cf(81), 0.35],
  ['stamp', cf(82), 0.35],
  ['paper', cf(83), 0.3],
  ['error', cf(84), 0.3],
  ['whoosh', cf(85) - 26, 0.3],
  ['magic', cf(85), 0.4],
  ['ding', cw(86, '5 万亿'), 0.4],
  ['stamp', cf(86) + 30, 0.45],
  ['paper', cf(87), 0.3],
  ['whoosh', cf(88) - 26, 0.3],
  ['pop', cf(88), 0.3],
  ['paper', cf(89), 0.3],
  ['stamp', cf(94), 0.4],
  ['paper', cf(96), 0.35],
];
