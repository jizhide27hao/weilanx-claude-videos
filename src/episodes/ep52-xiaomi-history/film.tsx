import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put, RedCheck, RedX} from '../../library/vox/desk';
import {rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, HandLine, Highlight, IndexCard, Label, RedCircle, TypeOn, Underline} from '../../library/vox/props';
import {DeskLitter, People, PostIt, Pushpin, Stamp, Sticker, Trend} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {Bell, CarFactory, CarSide, ChipO1, DropArrow, GongArt, MiLogo, OrderStack, PhoneArt, PorridgePot, PorridgeSticker, PriceTag, Queue, StoreArt, SuvArt, UpdateBadge} from './art';
import {cf, cw} from './cues';
import {CAP, CAP_PTS, capAt, capY, RULER_Y, WORLD_H, WORLD_W, xy, yx} from './timeline';

const W = 1920;
const H = 1080;
const p12 = (f: number, at: number, dur: number) => Math.max(0, Math.min(1, (step12(f) - at) / dur));
const countUp = (f: number, at: number, to: number, dur = 30) => Math.round(to * (1 - Math.pow(1 - p12(f, at, dur), 3)));

/* ============ 每个故事节点在桌面上的横坐标 ============ */

const X = {
  now: yx(2026.8),
  found: yx(2010.3),
  miui: yx(2010.75),
  mi1: yx(2011.65),
  redmi: yx(2013.55),
  peak14: yx(2014.6),
  crisis: yx(2016.1),
  takeover: yx(2016.4),
  mix: yx(2016.85),
  rebound: yx(2017.4),
  ipo: yx(2018.55),
  mid: yx(2019.5),
  car: yx(2021.2),
  su7: yx(2024.25),
  chip: yx(2025.12),
  yu7: yx(2025.5),
  fall: yx(2026.2),
  low: yx(2026.5),
  now2: yx(2026.72),
};

/* ============ 相机路线（跟着字幕走） ============ */

const CAM: CamKey[] = [
  // 钩子：现在
  {f: 0, x: X.now - 330, y: 430, z: 1.28},
  {f: cf(5), x: X.now - 180, y: 470, z: 1.05, ease: 'sine', dur: 30},
  // 「把时间线拉出来」：沿轴倒着追回 2010
  {f: cf(7) + 20, x: yx(2018), y: 520, z: 0.4, ease: 'sine', dur: 30},
  {f: cf(8) - 2, x: X.found - 80, y: 470, z: 1.1, ease: 'tail', dur: 30},
  {f: cf(10), x: X.found - 200, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // MIUI
  {f: cf(15) - 4, x: X.miui - 80, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(18), x: X.miui + 120, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 小米 1
  {f: cf(21) - 4, x: X.mi1 - 100, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(25), x: X.mi1 + 100, y: 450, z: 1.12, ease: 'sine', dur: 20},
  // 红米 / 生态链
  {f: cf(28) - 4, x: X.redmi - 100, y: 470, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(31), x: X.redmi + 160, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 2014 巅峰
  {f: cf(33) - 4, x: X.peak14 - 120, y: 460, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(36), x: X.peak14 + 120, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 2016 危机
  {f: cf(38) - 4, x: X.crisis - 100, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(41), x: X.takeover - 80, y: 460, z: 1.1, ease: 'sine', dur: 24},
  // MIX
  {f: cf(44) - 4, x: X.mix - 80, y: 450, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(47), x: X.mix + 200, y: 450, z: 1.12, ease: 'sine', dur: 20},
  // 2017 反弹
  {f: cf(48) - 4, x: X.rebound - 100, y: 450, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(50), x: X.rebound + 120, y: 440, z: 1.12, ease: 'sine', dur: 20},
  // 2018 上市
  {f: cf(52) - 4, x: X.ipo - 120, y: 450, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(55), x: X.ipo + 120, y: 450, z: 1.12, ease: 'sine', dur: 22},
  // 2019–2021
  {f: cf(58) - 4, x: X.mid - 100, y: 460, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(61), x: X.mid + 140, y: 450, z: 1.12, ease: 'sine', dur: 20},
  // 造车
  {f: cf(62) - 4, x: X.car - 120, y: 460, z: 1.1, ease: 'tail', dur: 26},
  // SU7
  {f: cf(65) - 4, x: X.su7 - 100, y: 450, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(67), x: X.su7 + 160, y: 450, z: 1.12, ease: 'sine', dur: 20},
  // 2025 顶点
  {f: cf(68) - 4, x: X.chip - 100, y: 450, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(69) - 2, x: X.yu7 - 160, y: 470, z: 1.1, ease: 'sine', dur: 24},
  {f: cf(71) - 2, x: X.yu7 + 120, y: 450, z: 1.12, ease: 'sine', dur: 18},
  // 2026 回撤
  {f: cf(74) - 4, x: (X.fall + X.low) / 2 - 60, y: 480, z: 1.02, ease: 'tail', dur: 30},
  {f: cf(77), x: X.low + 120, y: 470, z: 1.1, ease: 'sine', dur: 20},
  // 现在
  {f: cf(78) - 4, x: X.now2 - 100, y: 460, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(80), x: X.now2 + 140, y: 450, z: 1.12, ease: 'sine', dur: 22},
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

/** 桌面上的一个小产品卡（生态链那一屏用） */
const Product: React.FC<{label: string; icon: React.ReactNode}> = ({label, icon}) => (
  <div style={{width: 132, background: '#fff', padding: '12px 10px 8px', boxShadow: '2px 4px 6px rgba(23,23,22,0.22)', textAlign: 'center'}}>
    <div style={{height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
    <div style={{fontFamily: VF.heavy, fontSize: 19, color: V.ink, marginTop: 4, whiteSpace: 'nowrap'}}>{label}</div>
  </div>
);

/* ============ 时间尺、市值网格、命运线 ============ */

const RULER_YEARS = [2010, 2011, 2013, 2014, 2016, 2017, 2018, 2019, 2021, 2024, 2025, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(2009.6), top: RULER_Y, width: yx(2027.2) - yx(2009.6), height: 6, background: V.ink}} />
    {RULER_YEARS.map((y) => (
      <div key={y} style={{position: 'absolute', left: yx(y) - 60, top: RULER_Y, width: 120, textAlign: 'center'}}>
        <div style={{width: 5, height: 26, background: V.ink, margin: '0 auto'}} />
        <div style={{fontFamily: VF.num, fontSize: 44, color: V.ink, marginTop: 6}}>{y}</div>
      </div>
    ))}
  </>
);

const GRID: [number, string][] = [
  [2000, '2000 亿'],
  [5000, '5000 亿'],
  [10000, '1 万亿'],
  [15000, '1.5 万亿'],
];

const CapGrid: React.FC = () => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: X.ipo, top: capY(v), width: WORLD_W - X.ipo - 600, borderTop: '3px dashed rgba(23,23,22,0.16)'}} />
        {[X.ipo, X.mid + 600, X.su7 + 650, X.yu7 + 600, X.now2 + 400].map((x) => (
          <div key={x} style={{position: 'absolute', left: x + 10, top: capY(v) - 30, fontFamily: VF.heavy, fontSize: 22, color: 'rgba(23,23,22,0.38)', whiteSpace: 'nowrap'}}>
            {t}
          </div>
        ))}
      </React.Fragment>
    ))}
    <div style={{position: 'absolute', left: X.ipo + 150, top: capY(4300) + 18, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, whiteSpace: 'nowrap'}}>红线：小米集团市值（对数刻度，大致走势，示意）</div>
  </>
);

const CapLine: React.FC<{x0: number; x1: number}> = ({x0, x1}) => {
  const d = CAP_PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const head = Math.min(x1, CAP_PTS[CAP_PTS.length - 1][0]);
  return (
    <>
      <svg width={WORLD_W} height={WORLD_H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', clipPath: `inset(0 ${WORLD_W - x1}px 0 ${x0}px)`}}>
        <path d={`M${X.found} ${capY(4300)} L${X.ipo} ${capY(4300)}`} stroke="rgba(23,23,22,0.35)" strokeWidth={6} strokeDasharray="14 12" fill="none" />
        <path d={d} stroke={V.red} strokeWidth={10} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {head > x0 && head > X.ipo && <div style={{position: 'absolute', left: head - 16, top: capAt(head) - 16, width: 32, height: 32, borderRadius: 16, background: V.red, border: `4px solid ${V.paper}`}} />}
      {x0 <= X.found && x1 > X.found && x1 < X.ipo && (
        <div style={{position: 'absolute', left: X.found + 40, top: capY(4300) - 46, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, whiteSpace: 'nowrap'}}>还没上市</div>
      )}
    </>
  );
};

const lineSpan = (f: number, camX: number): [number, number] => {
  if (f < cf(7)) return [yx(2026), WORLD_W];
  if (f < cf(8)) return [0, WORLD_W];
  if (f < cf(81)) return [0, Math.max(X.ipo, camX + 650)];
  return [0, WORLD_W];
};

/* ============ 现在：钩子（结尾回来） ============ */

const Now: React.FC<{f: number}> = ({f}) => {
  const x = X.now;
  return (
    <>
      <At f={f} at={cf(1)} until={cf(7) + 26}>
        <Put x={x - 980} y={190}>
          <Label size={30} bg={V.red}>
            2026.10 · 小米集团
          </Label>
        </Put>
        <Put x={x - 980} y={250}>
          <Big size={130}>{countUp(f, cf(1), 6967, 26)} 亿港元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink, marginTop: 4}}>股价 27 港元附近</div>
        </Put>
      </At>
      {f < cf(7) + 26 && <RedCircle f={f} at={cw(1, '7000')} cx={x - 700} cy={330} rx={370} ry={80} seed={31} width={6} />}
      <At f={f} at={cf(2)} until={cf(7) + 26}>
        <Put x={x - 980} y={520}>
          <IndexCard w={470} h={210} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: -18}}>2025.6 的历史最高</div>
            <div style={{fontFamily: VF.heavy, fontSize: 56, color: V.ink, marginTop: 6}}>1.55 万亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft}}>股价 61.45 港元</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cw(3, '一半')} until={cf(7) + 26}>
        <Put x={x - 430} y={560}>
          <Sticker rot={-8}>
            <DropArrow s={150} />
          </Sticker>
        </Put>
        <Note x={x - 450} y={740} size={32} color={V.red}>
          跌掉 57%
        </Note>
      </At>
      <At f={f} at={cf(4)} until={cf(7) + 26}>
        <Put x={x + 60} y={520}>
          <Sticker rot={3}>
            <CarSide w={330} h={194} />
          </Sticker>
        </Put>
        <Put x={x + 40} y={740}>
          <Label size={30} bg={V.red}>
            9 月交付 4 万台 · 历史最高
          </Label>
        </Put>
      </At>
      <At f={f} at={cf(5)} until={cf(7) + 26}>
        <Put x={x - 160} y={180}>
          <Label size={28}>小米集团 01810.HK</Label>
        </Put>
        <Put x={x + 60} y={230}>
          <Sticker rot={-5}>
            <MiLogo s={150} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(6)} until={cf(7) + 26}>
        <Person x={x + 260} y={150} name="雷军" note="小米创始人、CEO" hair="short" glasses shirt w={150} rot={3} />
      </At>
      <At f={f} at={cf(7)} until={cf(7) + 26}>
        <Put x={x + 470} y={200}>
          <div style={{fontFamily: VF.num, fontSize: 230, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2010 银谷大厦：一锅小米粥 ============ */

const Founding: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  return (
    <>
      <Put x={x - 780} y={50}>
        <Label size={28}>2010.4.6 · 北京银谷大厦</Label>
      </Put>
      <Photo x={x - 780} y={100} w={330} h={220} caption="银谷大厦那间办公室（示意）" rot={-3}>
        <PorridgePot w={330} h={220} />
      </Photo>
      <At f={f} at={cf(9)}>
        <Put x={x - 380} y={110}>
          <Sticker rot={-4}>
            <PorridgeSticker />
          </Sticker>
        </Put>
        <Note x={x - 380} y={330} size={30}>
          十四个人，一锅粥
        </Note>
      </At>
      <At f={f} at={cf(10)}>
        <Person x={x + 60} y={80} name="雷军" note="40 岁 · 刚离开金山" hair="short" glasses shirt w={140} rot={-3} />
        <Person x={x + 220} y={95} name="林斌" note="谷歌中国工程研究院" hair="side" glasses shirt w={115} rot={3} />
        <Person x={x + 350} y={90} name="黎万强" note="金山老同事" hair="short" shirt w={115} rot={-2} />
      </At>
      <At f={f} at={cf(11)}>
        <Put x={x - 760} y={380}>
          <IndexCard w={620} h={230} rot={1}>
            <div style={{fontFamily: VF.hand, fontSize: 44, color: '#1f3f8a', lineHeight: 1.3, marginTop: -14}}>
              “要做一家世界级的公司。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, marginTop: 10}}>2010 年 · 雷军对媒体说的话</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(12)}>
        <Put x={x - 760} y={650}>
          <Label size={30} bg={V.red}>
            小米 + 步枪
          </Label>
        </Put>
        <Note x={x - 750} y={720} size={26} color={V.inkSoft}>
          一句老话，后来被念了 16 年
        </Note>
      </At>
      <At f={f} at={cf(13) + 10}>
        <Put x={x - 60} y={380}>
          <Photo x={0} y={0} w={260} h={190} caption="当年的 iPhone（示意）" rot={2}>
            <PhoneArt w={260} h={190} home={false} teeth />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(14)}>
        <Put x={x + 350} y={390}>
          <Sticker rot={4}>
            <PriceTag text="4000+" sub="元" />
          </Sticker>
        </Put>
        <Put x={x - 40} y={640}>
          <PostIt w={330} rot={3} head="国产手机当时">
            一边是山寨，一边是低端合约机
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 2010 MIUI：先有用户，后有产品 ============ */

const Miui: React.FC<{f: number}> = ({f}) => {
  const x = X.miui;
  return (
    <>
      <At f={f} at={cf(15) - 6}>
        <Put x={x - 760} y={50}>
          <Label size={28} bg={V.red}>
            2010.8 · MIUI 第一版
          </Label>
        </Put>
        <Put x={x - 760} y={110}>
          <Photo x={0} y={0} w={230} h={330} caption="MIUI 内测版（示意）" rot={-2}>
            <PhoneArt w={230} h={330} home label="MIUI" />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(16)}>
        <Put x={x - 440} y={110}>
          <Sticker rot={-5}>
            <UpdateBadge />
          </Sticker>
        </Put>
        <Note x={x - 450} y={250} size={28}>
          一个改过的安卓，每周更新
        </Note>
      </At>
      <At f={f} at={cf(17)}>
        <Put x={x - 440} y={320}>
          <Sticker rot={2}>
            <div style={{background: '#fff', padding: '14px 16px'}}>
              <People n={10} size={34} lit={Math.min(10, Math.floor(p12(f, cf(17), 24) * 10) + 1)} />
              <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.ink, marginTop: 6}}>第一批内测用户</div>
            </div>
          </Sticker>
        </Put>
        <Put x={x - 400} y={500}>
          <Big size={120}>100 人</Big>
        </Put>
      </At>
      <At f={f} at={cf(18)}>
        <Put x={x - 60} y={110}>
          <Doc w={560} h={280} color="#f3efe6" rot={1}>
            <div style={{fontFamily: VF.body, fontSize: 20, letterSpacing: 3, color: V.inkSoft}}>开机画面 · 特别感谢</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, lineHeight: 1.5, marginTop: 12, color: V.ink}}>
              <TypeOn f={f} at={cf(18)} cps={14} cursor={false} text="阿黎 老郭 小马 阿哲 麦克 飞飞 大熊 阿凯 小飞 老张 阿良 小北 阿伟 阿旭 老李 阿龙 三里 小夏 ……" />
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 10}}>100 个名字，一个都没删</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(19)}>
        <Put x={x - 40} y={450}>
          <Label size={34}>先有用户，后有产品</Label>
        </Put>
      </At>
      <At f={f} at={cf(20)} until={cf(21)}>
        <Put x={x + 420} y={230}>
          <Stamp size={48} rot={-8}>
            顺序是反的
          </Stamp>
        </Put>
        <Put x={x + 380} y={340}>
          <PostIt w={290} rot={4} head="后来所有争议">
            抢购、缺货、饥饿营销，根都在这里
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 2011 小米手机 1：1999 ============ */

const MiOne: React.FC<{f: number}> = ({f}) => {
  const x = X.mi1;
  return (
    <>
      <At f={f} at={cf(21) - 6}>
        <Put x={x - 760} y={50}>
          <Label size={28}>2011.8.16 · 北京 798</Label>
        </Put>
        <Put x={x - 760} y={100}>
          <Photo x={0} y={0} w={300} h={210} caption="发布会现场（示意）" rot={-2}>
            <svg width={300} height={210} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
              <rect width={340} height={230} fill="#b8b8b8" />
              <rect x={0} y={0} width={340} height={70} fill="#2a2a2a" />
              <rect x={40} y={20} width={260} height={34} fill="#e8e8e8" />
              <text x={170} y={46} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={24} fill="#2a2a2a">XIAOMI 1</text>
              <rect x={120} y={74} width={100} height={80} fill="#1a1a1a" />
              {Array.from({ length: 9 }, (_, i) => (
                <g key={i} fill="#6a6a6a">
                  <circle cx={26 + i * 36} cy={188} r={13} />
                  <rect x={10 + i * 36} y={202} width={32} height={28} rx={8} />
                </g>
              ))}
            </svg>
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(22)}>
        <Person x={x - 380} y={80} name="雷军" note="黑 T 恤 + 牛仔裤" hair="short" glasses shirt w={140} rot={3} />
      </At>
      <At f={f} at={cf(23)}>
        <Put x={x - 180} y={110}>
          <Photo x={0} y={0} w={210} h={300} caption="小米手机 1 代（示意）" rot={-2}>
            <PhoneArt w={210} h={300} home />
          </Photo>
        </Put>
        <Put x={x + 90} y={130}>
          <Sticker rot={-4}>
            <PriceTag text="1999" sub="元" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(24)}>
        <Put x={x + 90} y={330}>
          <IndexCard w={440} h={200} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              双核 1.5G · 1G 内存
              <br />
              4 英寸屏 · 1930mAh
              <br />
              <span style={{color: V.red}}>同配置国际品牌：4000 以上</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(25)}>
        <Put x={x + 560} y={110}>
          <Stamp size={44} rot={-10}>
            台下炸了
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(26)}>
        <Put x={x - 700} y={380}>
          <Big size={110}>{countUp(f, cf(26), 30, 24)} 万台</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>开放预订 · 两天 30 万台</div>
        </Put>
        <Put x={x - 360} y={560}>
          <Sticker rot={-3}>
            <Trend up label="1999 元 · 当时的价格屠夫" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(27)}>
        <Put x={x + 80} y={600}>
          <Label size={30} bg={V.red}>
            1999 成了小米的图腾
          </Label>
        </Put>
      </At>
    </>
  );
};

/* ============ 2013 红米 799 + 生态链 ============ */

const Redmi: React.FC<{f: number}> = ({f}) => {
  const x = X.redmi;
  return (
    <>
      <At f={f} at={cf(28) - 6}>
        <Put x={x - 760} y={50}>
          <Label size={28}>2013.7 · 红米手机</Label>
        </Put>
        <Put x={x - 760} y={110}>
          <Photo x={0} y={0} w={220} h={300} caption="红米（示意）" rot={2}>
            <PhoneArt w={220} h={300} home label="HONGMI" />
          </Photo>
        </Put>
        <Put x={x - 480} y={130}>
          <Sticker rot={-3}>
            <PriceTag text="799" sub="元" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(29)}>
        <Put x={x - 480} y={340}>
          <Big size={92}>千元以下</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>同一个价位，第一次能买到这个配置</div>
        </Put>
      </At>
      <At f={f} at={cf(30)}>
        {[
          {label: '小米电视', icon: <svg width={84} height={60} viewBox="0 0 84 60"><rect x={2} y={2} width={80} height={48} rx={3} fill="#1e1e1e" /><rect x={30} y={52} width={24} height={6} fill="#3a3a3a" /></svg>},
          {label: '移动电源', icon: <svg width={40} height={70} viewBox="0 0 40 70"><rect x={2} y={2} width={36} height={66} rx={5} fill="#d8d4cb" stroke="#8a8a8a" strokeWidth={2} /><rect x={10} y={12} width={20} height={8} fill="#e8621c" /></svg>},
          {label: '手环', icon: <svg width={44} height={70} viewBox="0 0 44 70"><rect x={12} y={2} width={20} height={66} rx={8} fill="#2a2a2a" /><rect x={14} y={24} width={16} height={22} rx={4} fill="#8fa8b8" /></svg>},
          {label: '空气净化器', icon: <svg width={62} height={72} viewBox="0 0 62 72"><rect x={2} y={2} width={58} height={68} rx={4} fill="#f2f0ea" stroke="#9a9a9a" strokeWidth={2} /><circle cx={31} cy={30} r={17} fill="none" stroke="#bdbdbd" strokeWidth={4} /></svg>},
        ].map((p, i) => (
          <Put key={p.label} x={x + 60 + i * 150} y={80 + (i % 2) * 40}>
            <Sticker rot={i % 2 ? 3 : -3}>
              <Product label={p.label} icon={p.icon} />
            </Sticker>
          </Put>
        ))}
      </At>
      <At f={f} at={cf(31)}>
        <Put x={x + 80} y={330}>
          <PostIt w={330} rot={-2} head="小米生态链">
            投一批小公司，给钱给渠道，不控股
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(32)}>
        <Put x={x + 470} y={330}>
          <IndexCard w={400} h={190} rot={3}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              手机少赚钱，
              <br />
              <span style={{color: V.red}}>用别的东西赚钱</span>
            </div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 2014 中国第一 ============ */

const Peak2014: React.FC<{f: number}> = ({f}) => {
  const x = X.peak14;
  return (
    <>
      <At f={f} at={cf(33) - 6}>
        <Put x={x - 760} y={50}>
          <Label size={28} bg={V.red}>
            2014 · 中国市场第一
          </Label>
        </Put>
        <Put x={x - 760} y={110}>
          <Big size={116}>{countUp(f, cf(33), 6112, 26)} 万台</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>一年出货，同比翻了两倍多</div>
        </Put>
      </At>
      <At f={f} at={cf(34)}>
        <Put x={x - 740} y={360}>
          <IndexCard w={430} h={200} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: -16}}>2014.12 一轮融资后</div>
            <div style={{fontFamily: VF.heavy, fontSize: 62, color: V.ink, marginTop: 4}}>450 亿美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>全球最贵的未上市科技公司之一</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(36)}>
        <Put x={x - 260} y={110}>
          <Sticker rot={-2}>
            <div style={{background: '#fff', padding: '12px 16px'}}>
              <Queue n={9} size={30} />
              <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.ink, marginTop: 4}}>抢购页面：已售罄</div>
            </div>
          </Sticker>
        </Put>
        <Put x={x - 240} y={330}>
          <Stamp size={46} rot={-9}>
            饥饿营销？
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(37)}>
        <Put x={x + 340} y={110}>
          <Sticker rot={4}>
            <OrderStack />
          </Sticker>
        </Put>
        <Note x={x + 330} y={340} size={30} color={V.red}>
          小米的回答：真的是产能不够
        </Note>
      </At>
    </>
  );
};

/* ============ 2015–2016：掉到第五 ============ */

const Crisis2016: React.FC<{f: number}> = ({f}) => {
  const x = X.crisis;
  const xt = X.takeover;
  return (
    <>
      <At f={f} at={cf(38) - 6}>
        <Put x={x - 760} y={50}>
          <Label size={28}>2015 · 第一次没完成目标</Label>
        </Put>
        <Put x={x - 760} y={110}>
          <Sticker rot={-4}>
            <Trend label="出货量，第一次往下走（示意）" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(39) + 12}>
        <Put x={x - 260} y={560}>
          <PostIt w={300} rot={2} head="2016 上半年">
            出货量同比掉了三成多，门店还没铺开
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(39)}>
        <Put x={x - 740} y={350}>
          <Big size={126} color={V.red}>
            掉到第五
          </Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>2016 年，中国智能手机市场</div>
        </Put>
      </At>
      <At f={f} at={cf(40)}>
        <Put x={x - 260} y={90}>
          <Photo x={0} y={0} w={300} h={200} caption="线下门店，是别人的地盘（示意）" rot={2}>
            <StoreArt w={300} h={200} orange={false} />
          </Photo>
        </Put>
        <Put x={x - 250} y={320}>
          <PostIt w={310} rot={-3} head="线上红利见顶">
            OPPO、vivo 把店开到了县城
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(41)}>
        <Put x={xt - 220} y={90}>
          <Stamp size={44} rot={-8}>
            供应链出问题
          </Stamp>
        </Put>
        <Put x={xt - 250} y={200}>
          <Sticker rot={3}>
            <div style={{background: '#fff', padding: '12px 16px'}}>
              <People n={10} size={34} lit={3} />
              <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.red, marginTop: 4}}>核心供应商掉链子</div>
            </div>
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(42)}>
        <Person x={xt + 120} y={70} name="雷军" note="亲自接管手机部" hair="short" glasses shirt w={130} rot={-3} />
        <Put x={xt + 100} y={330}>
          <PostIt w={280} rot={3} head="那段时间">
            一天开十几个会，直接管到产品线
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(43)}>
        <Put x={xt + 430} y={120}>
          <Stamp size={50} rot={-10} color={V.redDark}>
            我有点迷茫
          </Stamp>
        </Put>
        <Note x={xt + 420} y={250} size={26} color={V.inkSoft}>
          雷军 · 回忆 2016 年
        </Note>
      </At>
    </>
  );
};

/* ============ 2016.10 小米 MIX ============ */

const Mix: React.FC<{f: number}> = ({f}) => {
  const x = X.mix;
  return (
    <>
      <At f={f} at={cf(44) - 6}>
        <Put x={x - 740} y={50}>
          <Label size={28} bg={V.red}>
            2016.10.25 · 小米 MIX
          </Label>
        </Put>
        <Put x={x - 740} y={110}>
          <Photo x={0} y={0} w={250} h={340} caption="全面屏概念机（示意）" rot={-2}>
            <PhoneArt w={250} h={340} home={false} label="MIX" />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cw(45, '91')}>
        <Put x={x - 400} y={140}>
          <Big size={150}>{countUp(f, cw(45, '91'), 91, 22)}%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>屏占比，2016 年</div>
        </Put>
      </At>
      <At f={f} at={cf(44) + 24}>
        <Put x={x - 400} y={520}>
          <IndexCard w={440} h={180} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              陶瓷机身 · 无刘海 · 无听筒
              <br />
              <span style={{color: V.red}}>2016 年，这三点都不便宜</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(46)}>
        <Put x={x - 390} y={420}>
          <IndexCard w={420} h={210} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 27, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              一款不打算卖多少台的概念机
              <br />
              <span style={{color: V.red}}>把「便宜」两个字撕掉一点</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(47)}>
        <Put x={x + 130} y={110}>
          <Photo x={0} y={0} w={320} h={210} caption="小米之家（示意）" rot={3}>
            <StoreArt w={320} h={210} />
          </Photo>
        </Put>
        <Put x={x + 120} y={350}>
          <Label size={28}>同一年，小米之家开始一家一家开</Label>
        </Put>
      </At>
    </>
  );
};

/* ============ 2017 反弹 ============ */

const Rebound: React.FC<{f: number}> = ({f}) => {
  const x = X.rebound;
  return (
    <>
      <At f={f} at={cf(48) - 6}>
        <Put x={x - 740} y={50}>
          <Label size={28} bg={V.red}>
            2017 · 反弹
          </Label>
        </Put>
        <Put x={x - 740} y={110}>
          <Big size={120}>{countUp(f, cf(50), 9240, 26)} 万台</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>全年出货，回到历史最高</div>
        </Put>
      </At>
      <At f={f} at={cf(49)}>
        <Put x={x - 720} y={370}>
          <Sticker rot={-3}>
            <Trend up label="印度市场份额第一" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(51)}>
        <Put x={x - 420} y={380}>
          <IndexCard w={430} h={190} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              从悬崖边回到牌桌上，
              <br />
              <span style={{color: V.red}}>只用了一年</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(49) + 20}>
        <Put x={x + 160} y={110}>
          <Photo x={0} y={0} w={320} h={220} caption="印度发布会（示意）" rot={2}>
            <svg width={320} height={220} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
              <rect width={340} height={230} fill="#c0c0c0" />
              <rect x={0} y={0} width={340} height={60} fill="#2a2a2a" />
              <text x={170} y={40} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={26} fill="#efefef">MI INDIA</text>
              <rect x={90} y={80} width={160} height={110} fill="#1a1a1a" />
              <rect x={110} y={96} width={120} height={78} fill="#6a6a6a" />
              {Array.from({ length: 11 }, (_, i) => (
                <g key={i} fill="#5a5a5a">
                  <circle cx={20 + i * 30} cy={196} r={9} />
                  <rect x={8 + i * 30} y={206} width={24} height={22} rx={6} />
                </g>
              ))}
            </svg>
          </Photo>
        </Put>
      </At>
    </>
  );
};

/* ============ 2018 港交所：破发 ============ */

const Ipo2018: React.FC<{f: number}> = ({f}) => {
  const x = X.ipo;
  return (
    <>
      <At f={f} at={cf(52) - 6}>
        <Put x={x - 750} y={50}>
          <Label size={28}>2018.7.9 · 香港交易所</Label>
        </Put>
        <Put x={x - 750} y={100}>
          <Photo x={0} y={0} w={320} h={210} caption="上市敲锣（示意）" rot={-2}>
            <GongArt w={320} h={210} />
          </Photo>
        </Put>
        <Put x={x - 400} y={120}>
          <Sticker rot={2}>
            <Bell s={150} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(53)}>
        <Put x={x - 400} y={290}>
          <div style={{width: 430, padding: 12, background: '#e9efe2', border: '10px double #4f7a52', boxShadow: '3px 6px 8px rgba(23,23,22,0.3)'}}>
            <div style={{fontFamily: VF.head, fontSize: 34, textAlign: 'center', color: '#2f4f32'}}>XIAOMI CORPORATION</div>
            <div style={{fontFamily: VF.body, fontSize: 20, textAlign: 'center', color: '#2f4f32', letterSpacing: 3}}>1810.HK · 同股不同权</div>
            <div style={{fontFamily: VF.num, fontSize: 66, textAlign: 'center', color: '#2f4f32', marginTop: 4}}>HK$17</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, textAlign: 'center', color: '#2f4f32'}}>每股发行价</div>
          </div>
        </Put>
      </At>
      <At f={f} at={cf(54)}>
        <Put x={x + 120} y={110}>
          <Doc w={440} h={190} color="#f3efe6" rot={2}>
            <div style={{fontFamily: VF.hand, fontSize: 40, color: '#1f3f8a', lineHeight: 1.2}}>“要让首日买入的投资者赚一倍。”</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, marginTop: 8}}>雷军 · 上市前的公开信</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(55)}>
        <Put x={x + 160} y={340}>
          <Stamp size={70} rot={-12}>
            开盘破发
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(56)}>
        <Put x={x + 440} y={110}>
          <Sticker rot={4}>
            <DropArrow s={130} />
          </Sticker>
        </Put>
        <Note x={x + 430} y={270} size={27} color={V.red}>
          “大势不好”
        </Note>
      </At>
      <At f={f} at={cf(57)}>
        <Put x={x + 160} y={510}>
          <Label size={30} bg={V.red}>
            之后一路往下，最低 8 港元
          </Label>
        </Put>
      </At>
    </>
  );
};

/* ============ 2019–2021 中段 ============ */

const Middle: React.FC<{f: number}> = ({f}) => {
  const x = X.mid;
  return (
    <>
      <At f={f} at={cf(58) - 6}>
        <Put x={x - 750} y={60}>
          <Label size={28}>2019 · 首次进入世界 500 强</Label>
        </Put>
        <Put x={x - 750} y={120}>
          <IndexCard w={480} h={200} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: -16}}>从创立到上榜</div>
            <div style={{fontFamily: VF.heavy, fontSize: 74, color: V.ink, marginTop: 2}}>9 年</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>当时最快纪录</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(60)}>
        <Put x={x - 220} y={100}>
          <Photo x={0} y={0} w={220} h={310} caption="小米 10（示意）" rot={2}>
            <PhoneArt w={220} h={310} home={false} teeth label="MI 10" />
          </Photo>
        </Put>
        <Put x={x + 20} y={140}>
          <Label size={28}>2020 · 第一次认真做高端</Label>
        </Put>
        <Put x={x + 20} y={200}>
          <Big size={92}>3999 起</Big>
        </Put>
      </At>
      <At f={f} at={cf(61)}>
        <Put x={x + 30} y={380}>
          <IndexCard w={430} h={190} rot={3}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              2021 年第二季度
              <br />
              <span style={{color: V.red}}>手机销量，全球第二</span>
            </div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 2021 造车 ============ */

const Car2021: React.FC<{f: number}> = ({f}) => {
  const x = X.car;
  return (
    <>
      <At f={f} at={cf(62) - 6}>
        <Put x={x - 750} y={50}>
          <Label size={28} bg={V.red}>
            2021.3.30 · 宣布造车
          </Label>
        </Put>
        <Put x={x - 750} y={110}>
          <Photo x={0} y={0} w={340} h={200} caption="那晚发布会上的 PPT（示意）" rot={-2}>
            <CarSide w={340} h={200} />
          </Photo>
        </Put>
        <Put x={x - 750} y={350}>
          <IndexCard w={400} h={200} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -16}}>投入</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>首期 100 亿</div>
            <div style={{fontFamily: VF.heavy, fontSize: 36, color: V.red}}>十年 100 亿美元</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(64)}>
        <Put x={x - 300} y={110}>
          <Doc w={600} h={230} color="#f3efe6" rot={1}>
            <div style={{fontFamily: VF.hand, fontSize: 42, color: '#1f3f8a', lineHeight: 1.25}}>
              “这是我人生最后一次重大的创业项目，
              <br />
              我愿意押上我人生全部的声誉。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, marginTop: 8}}>雷军 · 2021.3.30 发布会</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(64) + 30}>
        <Put x={x - 280} y={400}>
          <Stamp size={50} rot={-7}>
            押上全部声誉
          </Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 2024 SU7 ============ */

const Su7: React.FC<{f: number}> = ({f}) => {
  const x = X.su7;
  return (
    <>
      <At f={f} at={cf(65) - 6}>
        <Put x={x - 750} y={50}>
          <Label size={28} bg={V.red}>
            2024.3.28 · 小米 SU7
          </Label>
        </Put>
        <Put x={x - 750} y={100}>
          <Photo x={0} y={0} w={360} h={210} caption="SU7（示意）" rot={-2}>
            <CarSide w={360} h={210} />
          </Photo>
        </Put>
        <Put x={x - 750} y={340}>
          <Sticker rot={3}>
            <PriceTag text="21.59" sub="万起" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cw(66, '27 分钟')}>
        <Put x={x - 350} y={110}>
          <Big size={120}>27 分钟</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>大定 5 万台</div>
        </Put>
      </At>
      <At f={f} at={cf(67)}>
        <Put x={x - 330} y={380}>
          <Photo x={0} y={0} w={300} h={190} caption="亦庄工厂（示意）" rot={2}>
            <CarFactory w={300} h={190} />
          </Photo>
        </Put>
        <Put x={x + 20} y={400}>
          <Big size={96}>{countUp(f, cw(67, '13.7'), 137, 26) / 10} 万台</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>2024 年全年交付</div>
        </Put>
      </At>
      <At f={f} at={cf(65) + 20}>
        <Put x={x + 180} y={90}>
          <Sticker rot={-4}>
            <MiLogo s={120} />
          </Sticker>
        </Put>
      </At>
    </>
  );
};

/* ============ 2025：玄戒 O1 + YU7 + 1.55 万亿 ============ */

const Peak2025: React.FC<{f: number}> = ({f}) => {
  const xc = X.chip;
  const xy7 = X.yu7;
  return (
    <>
      <At f={f} at={cf(68) - 6}>
        <Put x={xc - 740} y={50}>
          <Label size={28} bg={V.red}>
            2025.5.22 · 玄戒 O1
          </Label>
        </Put>
        <Put x={xc - 740} y={110}>
          <Sticker rot={-4}>
            <ChipO1 label="XRING O1" />
          </Sticker>
        </Put>
        <Put x={xc - 500} y={130}>
          <IndexCard w={420} h={230} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              3 纳米工艺
              <br />
              190 亿晶体管
              <br />
              <span style={{color: V.red}}>小米自研的第一颗旗舰 SoC</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(69) - 4}>
        <Put x={xy7 - 720} y={400}>
          <Label size={28}>2025.6.26 · 小米 YU7</Label>
        </Put>
        <Put x={xy7 - 720} y={460}>
          <Photo x={0} y={0} w={340} h={200} caption="YU7（示意）" rot={2}>
            <SuvArt w={340} h={200} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cw(70, '20 万台')}>
        <Put x={xy7 - 320} y={110}>
          <Big size={120}>3 分钟</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 30, color: V.ink}}>大定 20 万台</div>
        </Put>
      </At>
      <At f={f} at={cw(71, '61.45')}>
        <Put x={xy7 + 40} y={420}>
          <Label size={30} bg={V.red}>
            61.45 港元 · 历史最高
          </Label>
        </Put>
      </At>
      <At f={f} at={cw(72, '1.55 万亿')}>
        <Put x={xy7 + 40} y={120}>
          <Big size={128}>1.55 万亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>港元 · 2025.6.27 盘中最高</div>
        </Put>
      </At>
      <RedCircle f={f} at={cw(72, '1.55 万亿')} cx={xy7} cy={capAt(xy7)} rx={120} ry={52} seed={43} width={6} />
      <At f={f} at={cf(73)}>
        <Put x={xy7 + 400} y={430}>
          <PostIt w={280} rot={-3} head="从一碗粥算起">
            到 1.55 万亿，走了 15 年
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 2026 回撤 ============ */

const Fall2026: React.FC<{f: number}> = ({f}) => {
  const xf = X.fall;
  const xl = X.low;
  if (f >= cf(78) - 8) return null;
  return (
    <>
      <At f={f} at={cf(74)}>
        <Put x={xf - 560} y={110}>
          <Big size={132} color={V.red}>
            −57%
          </Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>从历史最高到 2026 年 6 月</div>
        </Put>
      </At>
      <RedCircle f={f} at={cf(74) + 10} cx={xl} cy={capAt(xl)} rx={150} ry={60} seed={45} width={6} />
      <At f={f} at={cf(75)}>
        <Put x={xl - 240} y={130}>
          <Sticker rot={-6}>
            <DropArrow s={150} />
          </Sticker>
        </Put>
        <Put x={xl - 250} y={330}>
          <Label size={30} bg={V.red}>
            21 港元出头
          </Label>
        </Put>
      </At>
      <At f={f} at={cf(76)}>
        <Put x={xf - 520} y={400}>
          <IndexCard w={470} h={210} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, lineHeight: 1.6, color: V.ink, marginTop: -14}}>
              老订单交完了，
              <br />
              <span style={{color: V.red}}>新订单还没来</span>
            </div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(77)}>
        <Put x={xl + 140} y={380}>
          <Label size={28}>2026 Q2 · 智能电动汽车业务</Label>
          <Big size={100}>−26 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink}}>单季经营亏损</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2026.9 澎程 ============ */

const Now2026: React.FC<{f: number}> = ({f}) => {
  const x = X.now2;
  return (
    <>
      <At f={f} at={cf(78) - 6} until={cf(81) - 6}>
        <Put x={x - 720} y={50}>
          <Label size={28} bg={V.red}>
            2026.9.7 · 澎程 N70 / N90
          </Label>
        </Put>
        <Put x={x - 720} y={110}>
          <Photo x={0} y={0} w={340} h={200} caption="增程 SUV（示意）" rot={-2}>
            <SuvArt w={340} h={200} />
          </Photo>
        </Put>
        <Put x={x - 340} y={130}>
          <Big size={92}>4 分钟</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>锁单 1 万台</div>
        </Put>
      </At>
      <At f={f} at={cf(78) + 30} until={cf(81) - 6}>
        <Put x={x - 700} y={420}>
          <IndexCard w={430} h={190} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -16}}>昆仑架构 · 增程</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>N70 / N90</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>20.99 万起 · 五座到七座</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(79)} until={cf(81) - 6}>
        <Put x={x - 320} y={360}>
          <IndexCard w={440} h={200} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -16}}>2026 年 9 月</div>
            <div style={{fontFamily: VF.heavy, fontSize: 46, color: V.ink, marginTop: 2}}>交付 4 万台</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>品牌历史最高，纯电 + 增程双线</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(80)} until={cf(81) - 6}>
        <Put x={x + 180} y={400}>
          <Big size={104}>{countUp(f, cf(80), 80, 26)} 万辆</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink}}>累计交付 · 用了两年半</div>
        </Put>
        <Put x={x + 180} y={110}>
          <Sticker rot={4}>
            <CarSide w={300} h={176} />
          </Sticker>
        </Put>
      </At>
    </>
  );
};

/* ============ 结尾：一张小图看完 16 年 ============ */

const MiniChart: React.FC<{f: number}> = ({f}) => {
  if (f < cf(81) || f >= cf(85)) return null;
  const x0 = 300;
  const x1 = 1260;
  const t0 = 2018.5;
  const t1 = 2026.8;
  const sx = (y: number) => x0 + ((y - t0) / (t1 - t0)) * (x1 - x0);
  const sy = (v: number) => 700 - (Math.log10(v) - Math.log10(2000)) * 240;
  const pts = CAP.map(([y, v]) => [sx(y), sy(v)] as [number, number]);
  const p = p12(f, cf(81), 26);
  const dips: [number, number, string][] = [
    [2019.6, 2100, '2019 · 破发之后'],
    [2022.6, 2400, '2022 · 杀估值'],
    [2026.5, 5000, '2026 · 订单见底'],
  ];
  const bets: [number, string, number][] = [
    [2011.6, '押 1999', 6100],
    [2021.2, '押造车', 3000],
    [2025.1, '押芯片', 15000],
  ];
  return (
    <div style={{position: 'absolute', left: 120, top: 80, width: 1680, height: 780, background: V.card, boxShadow: '4px 8px 14px rgba(23,23,22,0.4)'}}>
      <div style={{position: 'absolute', left: 60, top: 36, fontFamily: VF.heavy, fontSize: 40, color: V.paper}}>从一碗小米粥，到 1.55 万亿</div>
      <div style={{position: 'absolute', left: 60, top: 94, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: 'rgba(238,237,237,0.6)'}}>小米集团市值 2018–2026 · 对数刻度，大致走势，示意</div>
      <svg width={1680} height={780} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d={`M${x0} 730 L${x1 + 30} 730`} stroke="rgba(238,237,237,0.5)" strokeWidth={3} />
        {[2019, 2021, 2023, 2025, 2026].map((y) => (
          <text key={y} x={sx(y)} y={770} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={28} fill="rgba(238,237,237,0.75)">
            {y}
          </text>
        ))}
        <HandLine points={pts} p={p} width={8} />
      </svg>
      {f >= cf(82) &&
        dips.map(([y, v, t]) => (
          <div key={t} style={{position: 'absolute', left: sx(y) - 100, top: sy(v) + 20}}>
            <Label size={22} bg={V.red}>
              {t}
            </Label>
          </div>
        ))}
      {f >= cf(83) &&
        bets.map(([y, t, v], i) => (
          <div key={t} style={{position: 'absolute', left: sx(y) - 40, top: sy(v) - 90, opacity: f >= cf(83) + i * 8 ? 1 : 0}}>
            <Label size={26} bg={V.hiSolid} color={V.ink}>
              {t}
            </Label>
          </div>
        ))}
      {f >= cf(84) && (
        <div style={{position: 'absolute', left: 1320, top: 200, width: 300, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.paper, lineHeight: 1.45}}>
          1999 元的手机，
          <br />
          可以靠一代人记住。
          <br />
          25 万的车，
          <br />
          得靠每一辆重新证明。
        </div>
      )}
    </div>
  );
};

/* ============ 结尾黑卡 ============ */

const EndCard: React.FC<{f: number}> = ({f}) =>
  f < cf(85) ? null : (
    <div style={{position: 'absolute', inset: 0}}>
      <Desk w={W} h={H} seed={12} />
      <div style={{position: 'absolute', left: 90, top: 70, width: W - 180, height: H - 260, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
      <div style={{position: 'absolute', left: 200, top: 230, color: V.paper}}>
        <Label size={44} bg={V.red}>
          小米 16 年 · 2010–2026
        </Label>
        <div style={{fontFamily: VF.heavy, fontSize: 112, marginTop: 40}}>
          <TypeOn f={f} at={cf(85)} text="我们下期再见" cps={10} cursor={false} />
        </div>
      </div>
      <Underline f={f} at={cf(85) + 20} x={200} y={570} w={760} />
      <div style={{position: 'absolute', right: 250, top: 250, transform: 'rotate(6deg)'}}>
        <Sticker>
          <MiLogo s={180} />
        </Sticker>
      </div>
    </div>
  );

/* ============ 年份计数器 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  [cf(8) - 6, 2010],
  [cf(15) - 6, 2010],
  [cf(21) - 6, 2011],
  [cf(28) - 6, 2013],
  [cf(33) - 6, 2014],
  [cf(38) - 6, 2015],
  [cf(44) - 6, 2016],
  [cf(48) - 6, 2017],
  [cf(52) - 6, 2018],
  [cf(58) - 6, 2019],
  [cf(60) - 6, 2020],
  [cf(62) - 6, 2021],
  [cf(65) - 6, 2024],
  [cf(68) - 6, 2025],
  [cf(74) - 4, 2026],
];

const Hud: React.FC<{f: number; camX: number; z: number}> = ({f, camX, z}) => {
  if (f < cf(1) || f >= cf(81) || z < 0.4) return null;
  const tracking = f >= cf(7) && f < cf(8) - 6;
  const year = tracking ? xy(camX) : rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={2010} to={2026} title="小米 16 年" bands={[[2015.9, 2017], [2018.5, 2019.9], [2026.1, 2026.7]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={11} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={72} seed={27} />
        <CapGrid />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Founding f={f} />
        <Miui f={f} />
        <MiOne f={f} />
        <Redmi f={f} />
        <Peak2014 f={f} />
        <Crisis2016 f={f} />
        <Mix f={f} />
        <Rebound f={f} />
        <Ipo2018 f={f} />
        <Middle f={f} />
        <Car2021 f={f} />
        <Su7 f={f} />
        <Peak2025 f={f} />
        <Fall2026 f={f} />
        <Now2026 f={f} />
        {[
          [X.found - 620, 92],
          [X.miui + 40, 100],
          [X.su7 + 220, 92],
          [X.now2 + 300, 580],
        ].map(([x, y]) => (
          <div key={x} style={{position: 'absolute', left: x - 17, top: y - 17}}>
            <Pushpin />
          </div>
        ))}
      </World>
      <Hud f={f} camX={cam.x} z={cam.z} />
      <MiniChart f={f} />
      <EndCard f={f} />
    </>
  );
};

/* ============ 音效 ============ */

export const FILM_SFX: SfxCue[] = [
  ['paper', cf(1), 0.3],
  ['ding', cf(2), 0.3],
  ['error', cw(3, '一半'), 0.3],
  ['pop', cf(4), 0.3],
  ['paper', cf(5), 0.3],
  ['pop', cf(6), 0.3],
  ['question', cf(7), 0.35],
  ['whoosh', cf(7) + 8, 0.4],
  ['paper', cf(8) - 4, 0.3],
  ['pop', cf(9), 0.3],
  ['click', cf(10), 0.3],
  ['type', cf(11), 0.3],
  ['stamp', cf(12), 0.4],
  ['whoosh', cf(15) - 28, 0.3],
  ['paper', cf(15), 0.3],
  ['pop', cf(16), 0.3],
  ['magic', cf(17), 0.3],
  ['type', cf(18), 0.3],
  ['ding', cf(19), 0.3],
  ['stamp', cf(20), 0.4],
  ['whoosh', cf(21) - 28, 0.3],
  ['paper', cf(21), 0.3],
  ['pop', cf(22), 0.3],
  ['ding', cw(23, '1999'), 0.4],
  ['paper', cf(24), 0.3],
  ['confetti', cf(25), 0.35],
  ['magic', cf(26), 0.35],
  ['stamp', cf(27), 0.4],
  ['whoosh', cf(28) - 28, 0.3],
  ['ding', cw(28, '799'), 0.4],
  ['pop', cf(29), 0.3],
  ['pop', cf(30), 0.25],
  ['paper', cf(31), 0.3],
  ['ding', cf(32), 0.3],
  ['whoosh', cf(33) - 28, 0.3],
  ['magic', cf(34), 0.35],
  ['pop', cf(36), 0.3],
  ['stamp', cf(36) + 10, 0.4],
  ['paper', cf(37), 0.3],
  ['whoosh', cf(38) - 28, 0.3],
  ['error', cf(38), 0.35],
  ['shake', cf(39), 0.35],
  ['paper', cf(40), 0.3],
  ['stamp', cf(41), 0.4],
  ['pop', cf(42), 0.3],
  ['stamp', cf(43), 0.45],
  ['whoosh', cf(44) - 28, 0.3],
  ['magic', cf(44), 0.35],
  ['ding', cw(45, '91'), 0.35],
  ['paper', cf(46), 0.3],
  ['pop', cf(47), 0.3],
  ['whoosh', cf(48) - 28, 0.3],
  ['ding', cf(49), 0.3],
  ['magic', cf(50), 0.35],
  ['paper', cf(51), 0.3],
  ['whoosh', cf(52) - 28, 0.3],
  ['ding', cf(53), 0.35],
  ['type', cf(54), 0.3],
  ['error', cf(55), 0.4],
  ['shake', cf(55) + 6, 0.35],
  ['question', cf(56), 0.3],
  ['error', cf(57), 0.35],
  ['whoosh', cf(58) - 28, 0.3],
  ['ding', cf(59), 0.35],
  ['pop', cf(60), 0.3],
  ['magic', cf(61), 0.35],
  ['whoosh', cf(62) - 30, 0.35],
  ['paper', cf(62), 0.3],
  ['ding', cf(63), 0.35],
  ['type', cf(64), 0.3],
  ['stamp', cf(64) + 30, 0.4],
  ['whoosh', cf(65) - 30, 0.35],
  ['paper', cf(65), 0.3],
  ['confetti', cw(66, '27 分钟'), 0.35],
  ['pop', cf(67), 0.3],
  ['whoosh', cf(68) - 28, 0.3],
  ['magic', cf(68), 0.35],
  ['whoosh', cf(69) - 26, 0.3],
  ['paper', cf(69), 0.3],
  ['confetti', cw(70, '20 万台'), 0.4],
  ['ding', cw(71, '61.45'), 0.35],
  ['magic', cw(72, '1.55 万亿'), 0.4],
  ['paper', cf(73), 0.3],
  ['whoosh', cf(74) - 30, 0.35],
  ['error', cf(74), 0.4],
  ['shake', cf(75), 0.35],
  ['paper', cf(76), 0.3],
  ['error', cf(77), 0.35],
  ['whoosh', cf(78) - 28, 0.3],
  ['pop', cf(78), 0.3],
  ['ding', cf(79), 0.35],
  ['magic', cf(80), 0.4],
  ['paper', cf(81), 0.35],
  ['error', cf(82), 0.3],
  ['pop', cf(83), 0.3],
  ['stamp', cf(84), 0.4],
  ['paper', cf(85), 0.35],
  ['type', cf(85), 0.3],
];
