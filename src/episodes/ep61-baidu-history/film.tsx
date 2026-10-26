import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put} from '../../library/vox/desk';
import {hudFade, rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, IndexCard, Label} from '../../library/vox/props';
import {DeskLitter, PostIt, Pushpin, Stamp, Sticker} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {AppShelf, BedPromo, BigCheck, CRTDesk, Crowd8, DrunkWheel, FirstTag, Gong, GuestRoom, IpoBoard, KunlunChip, Robotaxi, SearchBid, SlowDrift, Suitcase} from './art';
import {cf, cw} from './cues';
import {CAP_PTS, capAt, capY, RULER_Y, WORLD_H, WORLD_W, xy, yx} from './timeline';

const W = 1920;
const H = 1080;
const p12 = (f: number, at: number, dur: number) => Math.max(0, Math.min(1, (step12(f) - at) / dur));
const countUp = (f: number, at: number, to: number, dur = 30, dec = 0) => {
  const v = to * (1 - Math.pow(1 - p12(f, at, dur), 3));
  return dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US');
};

/** 每个故事节点在桌面上的横坐标 */
const X = {
  now: yx(2026.75),
  found: yx(2000.05),
  pivot: yx(2001.8),
  flash: yx(2002.6),
  ipo: yx(2005.6),
  dump: yx(2008.9),
  gout: yx(2010.25),
  top: yx(2011.2),
  mobile: yx(2012.45),
  buy91: yx(2013.55),
  o2o: yx(2015.4),
  wzx: yx(2016.3),
  luqi: yx(2017.1),
  low19: yx(2019.5),
  peak: yx(2021.13),
  hk: yx(2021.3),
  drift: yx(2023.2),
  ai: yx(2025.4),
  final: yx(2027.1),
};

/* ============ 相机路线 ============ */

const CAM: CamKey[] = [
  // 钩子：停在今天
  // 钩子这一页内容最宽（x-1010 到 x+520），z 要比别段小一点才不压边
  {f: 0, x: X.now - 430, y: 430, z: 1.19},
  {f: cf(5), x: X.now - 250, y: 470, z: 1.13, ease: 'sine', dur: 34},
  // 「把时间线拉出来看」：沿轴倒着甩回 2000
  {f: cf(7) + 18, x: yx(2012), y: 520, z: 0.34, ease: 'sine', dur: 32},
  {f: cf(8) - 2, x: X.found + 80, y: 420, z: 1.13, ease: 'tail', dur: 28},
  {f: cf(9), x: X.found + 80, y: 420, z: 1.13, ease: 'sine', dur: 20},
  // 背水一战
  {f: cf(15) - 4 - 26 - 8, x: X.pivot - 30, y: 470, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(17), x: X.pivot - 30, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 闪电计划：右移到 flash
  {f: cf(21) - 4 - 24 - 8, x: X.flash - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(22), x: X.flash - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 上市
  {f: cf(23) - 4 - 28 - 8, x: X.ipo - 30, y: 470, z: 1.26, ease: 'tail', dur: 28},
  {f: cf(26), x: X.ipo - 30, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 腰斩与谷歌退出：跨 dump → gout 两站
  {f: cf(31) - 4 - 24 - 8, x: X.dump - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(33) - 4 - 24 - 8, x: X.gout - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(34), x: X.gout - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 登顶
  {f: cf(37) - 4 - 26 - 8, x: X.top - 30, y: 460, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(38), x: X.top - 30, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 酒驾论
  {f: cf(41) - 4 - 24 - 8, x: X.mobile - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(43), x: X.mobile - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 91 无线
  {f: cf(45) - 4 - 24 - 8, x: X.buy91 - 30, y: 470, z: 1.28, ease: 'tail', dur: 24},
  {f: cf(46), x: X.buy91 - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 糯米
  {f: cf(49) - 4 - 22 - 8, x: X.o2o - 30, y: 470, z: 1.3, ease: 'tail', dur: 22},
  {f: cf(50), x: X.o2o - 30, y: 460, z: 1.3, ease: 'sine', dur: 16},
  // 魏则西
  {f: cf(51) - 4 - 26 - 8, x: X.wzx - 30, y: 470, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(54), x: X.wzx - 30, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 陆奇
  {f: cf(58) - 4 - 26 - 8, x: X.luqi - 30, y: 470, z: 1.3, ease: 'tail', dur: 26},
  {f: cf(59), x: X.luqi - 30, y: 460, z: 1.3, ease: 'sine', dur: 20},
  // 2019 首亏
  {f: cf(64) - 4 - 24 - 8, x: X.low19 - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(65), x: X.low19 - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // 冲顶
  {f: cf(67) - 4 - 26 - 8, x: X.peak - 30, y: 460, z: 1.28, ease: 'tail', dur: 26},
  {f: cf(69), x: X.peak - 30, y: 450, z: 1.3, ease: 'sine', dur: 20},
  // 港股
  {f: cf(70) - 4 - 22 - 8, x: X.hk - 30, y: 460, z: 1.3, ease: 'tail', dur: 22},
  {f: cf(71), x: X.hk - 30, y: 450, z: 1.3, ease: 'sine', dur: 16},
  // 阴跌
  {f: cf(72) - 4 - 24 - 8, x: X.drift - 30, y: 470, z: 1.3, ease: 'tail', dur: 24},
  {f: cf(74), x: X.drift - 30, y: 460, z: 1.3, ease: 'sine', dur: 18},
  // AI 兑现
  {f: cf(76) - 4 - 28 - 8, x: X.ai - 30, y: 470, z: 1.26, ease: 'tail', dur: 28},
  {f: cf(79), x: X.ai - 30, y: 460, z: 1.3, ease: 'sine', dur: 22},
  // 收尾：桌面纸到 WORLD_W(29400) 就断了，相机不能越过 29400-960/z，否则右边缘露出纸外
  {f: cf(87) - 4 - 34 - 8, x: X.final - 250, y: 460, z: 1.22, ease: 'tail', dur: 34},
  {f: cf(89), x: X.final - 190, y: 460, z: 1.26, ease: 'sine', dur: 30},
];

/* ============ 通用小件 ============ */

const Person: React.FC<{x: number; y: number; name: string; note?: string; hair?: Hair; glasses?: boolean; tie?: boolean; rot?: number; w?: number}> = ({x, y, name, note, rot = -3, w = 140, ...look}) => (
  <Put x={x} y={y}>
    <HalftonePhoto w={w} h={w * 1.2} rot={rot} dot={5} caption={name}>
      <Portrait w={w} h={w * 1.2} {...look} />
    </HalftonePhoto>
    {note && <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, textAlign: 'center', marginTop: 8, width: w + 28, whiteSpace: 'nowrap'}}>{note}</div>}
  </Put>
);

const Note: React.FC<{x: number; y: number; size?: number; color?: string; children: React.ReactNode}> = ({x, y, size = 26, color = V.ink, children}) => (
  <Put x={x} y={y}>
    <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: size, color, whiteSpace: 'nowrap'}}>{children}</div>
  </Put>
);

/* ============ 桌面底：尺子、市值网格、命运线 ============ */

const RULER_YEARS = [2000, 2004, 2008, 2011, 2014, 2017, 2021, 2024, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(1999.7), top: RULER_Y, width: yx(2027.1) - yx(1999.7), height: 6, background: V.ink}} />
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
  [500, '500 亿'],
  [1200, '1200 亿'],
];

// 灰色刻度 / 图例都是装饰：压到右上角年份计数器就淡出，别在 HUD 底下露半截字
const CapGrid: React.FC<{cam: {x: number; y: number; z: number}}> = ({cam}) => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: X.found, top: capY(v), width: WORLD_W - X.found - 600, borderTop: '3px dashed rgba(23,23,22,0.15)'}} />
        {[X.found + 330, X.ipo + 330, X.top + 330, X.wzx + 330, X.peak + 330, X.ai + 330].map((x) => {
          const op = hudFade(x + 12, capY(v) - 30, 110, 28, cam);
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
        top: capY(20) + 26,
        fontFamily: VF.serifCn,
        fontWeight: 700,
        fontSize: 24,
        color: V.red,
        whiteSpace: 'nowrap',
        opacity: hudFade(X.found + 150, capY(20) + 26, 560, 34, cam),
      }}
    >
      红线：百度市值（亿美元，对数刻度，示意）
    </div>
    <div
      style={{
        position: 'absolute',
        left: yx(2021.13) - 60,
        top: capY(1200) - 66,
        fontFamily: VF.heavy,
        fontSize: 22,
        color: 'rgba(23,23,22,0.45)',
        whiteSpace: 'nowrap',
        opacity: hudFade(yx(2021.13) - 60, capY(1200) - 66, 200, 30, cam),
      }}
    >
      峰值 · 2021.2
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
  if (f < cf(87)) return [0, Math.max(X.found, camX + 700)];
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
          <Label size={30} bg={V.red}>2026.10 · 百度</Label>
        </Put>
        <Put x={x - 1010} y={212}>
          <Big size={132}>{countUp(f, cf(1), 270, 30)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>美元市值 · 2026 年 10 月</div>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={END}>
        <Put x={x - 1010} y={470}>
          <IndexCard w={480} h={236} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -12}}>五年前</div>
            <div style={{fontFamily: VF.num, fontSize: 64, color: V.ink, marginTop: 2}}>1200 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 2}}>2021 年 2 月 · 历史峰值</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(3)} until={END}>
        <Put x={x - 460} y={470}>
          <Stamp size={48} rot={-6}>五年 · 跌掉近八成</Stamp>
        </Put>
        <Note x={x - 470} y={600} size={26} color={V.inkSoft}>跌的是股价，不是故事</Note>
      </At>
      <At f={f} at={cf(4)} until={END}>
        <Put x={x - 30} y={430}>
          <Sticker rot={-2}>
            <Robotaxi s={300} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>累计 2000 万单 · 全球 26 城（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(5)} until={END}>
        <Put x={x + 330} y={180}>
          <IndexCard w={360} h={200} rot={3}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -10}}>四季度 AI 收入</div>
            <div style={{fontFamily: VF.num, fontSize: 72, color: V.ink, lineHeight: 1.1}}>43%</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red}}>2025 年报首次披露</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(6)} until={END}>
        <Put x={x + 360} y={620}>
          <div style={{fontFamily: VF.num, fontSize: 200, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 02 · 2000 创立 ============ */

const Found: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  return (
    <>
      <Put x={x - 700} y={66}>
        <Label size={28}>2000.1 · 中关村</Label>
      </Put>
      <Put x={x - 700} y={112}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Sticker rot={-3}>
            <GuestRoom w={330} h={220} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 6, whiteSpace: 'nowrap'}}>北大资源宾馆两间房（示意）</div>
        </div>
      </Put>
      <At f={f} at={cf(10)}>
        <Person x={x + 20} y={150} name="李彦宏" note="31 岁 · 硅谷工程师" hair="side" tie w={132} rot={-3} />
      </At>
      <At f={f} at={cf(11)}>
        <Put x={x + 260} y={170}>
          <Doc w={400} h={170} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>一项美国专利</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 40, color: V.ink, lineHeight: 1.2}}>超链分析</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>搜索引擎排序的底座</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(12)}>
        <Put x={x - 700} y={430}>
          <IndexCard w={440} h={200} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft, marginTop: -8}}>第一笔风险投资</div>
            <div style={{fontFamily: VF.num, fontSize: 62, color: V.ink, lineHeight: 1.15}}>120 万美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>9 个月后，又追投 1000 万</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(13)}>
        <Put x={x - 300} y={430}>
          <Crowd8 s={380} />
        </Put>
        <Note x={x - 320} y={716} size={22} color={V.inkSoft}>一行八人 · 先给门户网站做搜索（示意）</Note>
      </At>
    </>
  );
};

/* ============ 03 · 2001 背水一战 + 2002 闪电计划 ============ */

const Pivot: React.FC<{f: number}> = ({f}) => {
  const x = X.pivot;
  const xf = X.flash;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2001 · 背水一战</Label>
      </Put>
      <At f={f} at={cf(16)}>
        <Put x={x - 640} y={140}>
          <IndexCard w={420} h={190} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -8}}>要做自己的搜索网站</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 44, color: V.ink, lineHeight: 1.3}}>董事会：反对</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>断了门户订单，收入归零</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(18)}>
        <Put x={x - 140} y={140}>
          <Stamp size={50} rot={-6}>拍了桌子</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(19)}>
        <Put x={x - 600} y={430}>
          <PostIt w={430} rot={-2} color="#e8e2cf" head="投资人最后的话">
            是你的态度打动了我们，
            <br />
            而不是你的论据
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(20)}>
        <Put x={x + 60} y={420}>
          <Sticker rot={2}>
            <SearchBid s={330} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>竞价排名上线（示意）</div>
        </Put>
      </At>
      {/* 闪电计划落在 flash 节点 */}
      <At f={f} at={cf(21)}>
        <Put x={xf - 560} y={90}>
          <Label size={26}>2002 · 闪电计划</Label>
        </Put>
        <Put x={xf - 640} y={150}>
          <Sticker rot={-2}>
            <CRTDesk s={300} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>九个月，技术全面对标（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(22)}>
        <Put x={xf + 40} y={200}>
          <Stamp size={48} rot={4}>中文流量第一</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 04 · 2005 纳斯达克 ============ */

const Ipo: React.FC<{f: number}> = ({f}) => {
  const x = X.ipo;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2005.8.5 · 纳斯达克</Label>
      </Put>
      <At f={f} at={cf(23)}>
        <Put x={x - 640} y={130}>
          <Sticker rot={-2}>
            <IpoBoard w={420} h={256} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>上市首日行情牌（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(25)}>
        <Put x={x + 40} y={140}>
          <Doc w={430} h={210} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>发行价 27 美元</div>
            <div style={{fontFamily: VF.num, fontSize: 58, color: V.ink, lineHeight: 1.15}}>122.54</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>首日 +354% · 五年纪录</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(28)}>
        <Put x={x - 640} y={480}>
          <Big size={86}>{countUp(f, cf(28), 39.58, 26, 2)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>首日收盘市值（美元）</div>
        </Put>
      </At>
      <At f={f} at={cf(29)}>
        <Put x={x + 40} y={430}>
          <IndexCard w={430} h={210} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -8}}>可它上一年的利润</div>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.ink, lineHeight: 1.2}}>1340 万美元</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>市盈率约 2450 倍</div>
          </IndexCard>
        </Put>
      </At>
    </>
  );
};

/* ============ 05 · 2008 低谷 → 2010 谷歌退出 ============ */

const Dump: React.FC<{f: number}> = ({f}) => {
  const x = X.dump;
  const xg = X.gout;
  return (
    <>
      <At f={f} at={cf(31)}>
        <Put x={x - 660} y={66}>
          <Label size={28}>2005 年底 · 市值腰斩</Label>
        </Put>
        <Put x={x - 660} y={140}>
          <Big size={110}>20 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>首日的 39.58 亿，年底剩一半</div>
        </Put>
      </At>
      <At f={f} at={cf(32)}>
        <Put x={x + 20} y={140}>
          <IndexCard w={430} h={230} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -10}}>2008 · 金融危机</div>
            <div style={{fontFamily: VF.num, fontSize: 72, color: V.ink, lineHeight: 1.1}}>45 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>市值一年跌掉三分之二</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(33)}>
        <Put x={xg - 640} y={90}>
          <Label size={28} bg={V.ink}>2010.3 · 谷歌退出中国大陆</Label>
        </Put>
        <Put x={xg - 620} y={160}>
          <Sticker rot={-2}>
            <Suitcase s={290} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>搜索业务转设香港（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(35)}>
        <Put x={xg - 140} y={160}>
          <Stamp size={52} rot={-5}>一家独大</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(36)}>
        <Put x={xg - 100} y={430}>
          <Big size={96}>{countUp(f, cf(36), 336, 26)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>当年底的市值（美元）</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 06 · 2011 登顶 ============ */

const Top: React.FC<{f: number}> = ({f}) => {
  const x = X.top;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2011.3 · 中国互联网</Label>
      </Put>
      <At f={f} at={cf(37)}>
        <Put x={x - 660} y={140}>
          <Big size={110}>{countUp(f, cf(37), 462, 30)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>美元市值 · 第一次压过腾讯</div>
        </Put>
      </At>
      <At f={f} at={cf(38)}>
        <Put x={x + 20} y={140}>
          <IndexCard w={430} h={220} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft, marginTop: -8}}>同一时刻</div>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.ink, lineHeight: 1.2}}>腾讯 446 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>近五年头衔第一次易主</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(39)}>
        <Put x={x - 620} y={470}>
          <Sticker rot={-3}>
            <FirstTag s={250} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(40)}>
        <Put x={x - 220} y={500}>
          <Stamp size={46} rot={5} color={V.ink}>PC 流量之王</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 07 · 2012 酒驾论 ============ */

const Mobile: React.FC<{f: number}> = ({f}) => {
  const x = X.mobile;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28}>2012 · 百度联盟峰会</Label>
      </Put>
      <At f={f} at={cf(41)}>
        <Put x={x - 660} y={130}>
          <Note x={0} y={0} size={30} color={V.ink}>口袋里的屏幕，正在换掉电脑</Note>
        </Put>
      </At>
      <At f={f} at={cf(42)}>
        <Put x={x - 620} y={220}>
          <Sticker rot={-2}>
            <DrunkWheel s={300} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(43)}>
        <Put x={x + 40} y={180}>
          <PostIt w={430} rot={2} color="#f2df7b" head="那年他说的比喻">
            移动互联像酒驾，
            <br />
            很刺激，但很危险
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(44)}>
        <Put x={x + 40} y={500}>
          <Note x={0} y={0} size={26} color={V.inkSoft}>那一年：微信刚上线 · 头条刚创立</Note>
        </Put>
        <Put x={x + 40} y={560}>
          <Stamp size={44} rot={-5}>风口说没就没</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 08 · 2013 91 无线 ============ */

const Buy91: React.FC<{f: number}> = ({f}) => {
  const x = X.buy91;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2013.7 · 最贵的船票</Label>
      </Put>
      <At f={f} at={cf(45)}>
        <Put x={x - 660} y={140}>
          <Big size={110}>{countUp(f, cf(45), 19, 26)} 亿美元</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>买下 91 无线 · 天价并购</div>
        </Put>
      </At>
      <At f={f} at={cf(46)}>
        <Put x={x + 40} y={140}>
          <Sticker rot={2}>
            <AppShelf s={300} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>应用商店货架（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(47)}>
        <Put x={x - 620} y={460}>
          <Stamp size={46} rot={-5}>两年后，被手机厂干掉</Stamp>
        </Put>
      </At>
      <At f={f} at={cf(48)}>
        <Put x={x - 300} y={560}>
          <Note x={0} y={0} size={30} color={V.ink}>买票的手慢了，船也开了</Note>
        </Put>
      </At>
    </>
  );
};

/* ============ 09 · 2015 糯米 200 亿 ============ */

const O2O: React.FC<{f: number}> = ({f}) => {
  const x = X.o2o;
  return (
    <>
      <Put x={x - 560} y={66}>
        <Label size={28}>2015 · O2O 烧钱</Label>
      </Put>
      <At f={f} at={cf(49)}>
        <Put x={x - 620} y={140}>
          <Sticker rot={-2}>
            <BigCheck s={360} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>「先拿 200 亿把糯米做好」（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(50)}>
        <Put x={x - 560} y={470}>
          <Stamp size={48} rot={4}>外卖 · 糯米 · 谢幕</Stamp>
        </Put>
        <Note x={x - 560} y={590} size={26} color={V.inkSoft}>烧完钱，格局没变</Note>
      </At>
    </>
  );
};

/* ============ 10 · 2016 至暗时刻 ============ */

const Wzx: React.FC<{f: number}> = ({f}) => {
  const x = X.wzx;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2016 · 至暗时刻</Label>
      </Put>
      <At f={f} at={cf(51)}>
        <Put x={x - 660} y={130}>
          <PostIt w={400} rot={-2} color="#f2df7b" head="2016 年 1 月">
            血友病吧被卖，
            <br />
            贴吧第一次被骂上头条
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(53)}>
        <Put x={x - 600} y={400}>
          <Sticker rot={-2}>
            <BedPromo s={300} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>魏则西事件（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(54)}>
        <Put x={x + 20} y={240}>
          <Note x={0} y={0} size={28} color={V.ink}>他在百度搜到的医院，是莆田系</Note>
        </Put>
      </At>
      <At f={f} at={cf(55)}>
        <Put x={x + 40} y={280}>
          <Doc w={430} h={190} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.inkSoft}}>联合调查组进驻</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 34, color: V.ink, lineHeight: 1.3}}>竞价排名整改</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>商业推广每页不超三成</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(57)}>
        <Put x={x + 40} y={530}>
          <Big size={92} color={V.red}>-65%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>那一年，净利润</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 11 · 2017 陆奇 → 2019 首亏 ============ */

const Luqi: React.FC<{f: number}> = ({f}) => {
  const x = X.luqi;
  const xl = X.low19;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2017.1 · 陆奇空降</Label>
      </Put>
      <At f={f} at={cf(58)}>
        <Person x={x - 620} y={140} name="陆奇" note="前微软全球执行副总裁" hair="side" glasses rot={-2} w={132} />
      </At>
      <At f={f} at={cf(59)}>
        <Put x={x - 240} y={140}>
          <Stamp size={52} rot={-5}>All in AI</Stamp>
        </Put>
        <Note x={x - 250} y={260} size={26} color={V.inkSoft}>裁医疗部 · 砍游戏</Note>
      </At>
      <At f={f} at={cf(60)}>
        <Put x={x + 120} y={140}>
          <PostIt w={400} rot={2} color="#e8e2cf" head="无人车平台开源">
            起名阿波罗，
            <br />
            把家底摊给全行业
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(61)}>
        <Put x={x - 620} y={500}>
          <Big size={88}>{countUp(f, cf(61), 800, 26)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>市值回升（美元）</div>
        </Put>
      </At>
      <At f={f} at={cf(62)}>
        <Put x={x - 140} y={500}>
          <Label size={26} bg={V.ink}>十六个月后 · 陆奇离开</Label>
        </Put>
      </At>
      {/* 2019 首亏落在 low19 节点 */}
      <At f={f} at={cf(64)}>
        <Put x={xl - 660} y={90}>
          <Label size={28} bg={V.ink}>2019 · 上市后首次季度亏损</Label>
        </Put>
        <Put x={xl - 660} y={160}>
          <Big size={100}>跌破 400 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>市值（美元）· 搜索总裁离职</div>
        </Put>
      </At>
      <At f={f} at={cf(66)}>
        <Put x={xl - 100} y={430}>
          <Stamp size={50} rot={-5}>BAT 只剩 AT</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 12 · 2021 冲顶 + 港股 ============ */

const Peak: React.FC<{f: number}> = ({f}) => {
  const x = X.peak;
  const xh = X.hk;
  return (
    <>
      <At f={f} at={cf(67)}>
        <Put x={x - 660} y={66}>
          <Label size={28}>2020 · 机构重仓 · 无人车翻红</Label>
        </Put>
        <Put x={x - 660} y={140}>
          <Big size={104}>{countUp(f, cf(68), 1000, 30)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>2021 年 2 月 · 市值破千亿（美元）</div>
        </Put>
      </At>
      <At f={f} at={cf(69)}>
        <Put x={x + 40} y={140}>
          <IndexCard w={440} h={230} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 28, color: V.inkSoft, marginTop: -10}}>十天后</div>
            <div style={{fontFamily: VF.num, fontSize: 76, color: V.ink, lineHeight: 1.1}}>1200 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>历史峰值 · 2021.2.19</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(70)}>
        <Put x={xh - 640} y={80}>
          <Label size={26} bg={V.red}>2021.3.23 · 回港二次上市</Label>
        </Put>
        <Put x={xh - 620} y={140}>
          <Sticker rot={-2}>
            <Gong s={260} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(71)}>
        <Put x={xh - 200} y={180}>
          <Stamp size={46} rot={4}>离巅峰最近的时候</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 13 · 四年阴跌 ============ */

const Drift: React.FC<{f: number}> = ({f}) => {
  const x = X.drift;
  return (
    <>
      <Put x={x - 620} y={66}>
        <Label size={28}>2022—2024 · 阴跌</Label>
      </Put>
      <At f={f} at={cf(72)}>
        <Put x={x - 640} y={130}>
          <Sticker rot={-2}>
            <SlowDrift s={310} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(73)}>
        <Put x={x + 40} y={140}>
          <Note x={0} y={0} size={28} color={V.ink}>搜索广告，被短视频一点点切走</Note>
        </Put>
      </At>
      <At f={f} at={cf(74)}>
        <Put x={x + 40} y={280}>
          <Big size={100}>{countUp(f, cf(74), 300, 28)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>2024 年底的市值（美元）</div>
        </Put>
      </At>
      <At f={f} at={cf(75)}>
        <Put x={x - 500} y={500}>
          <Stamp size={48} rot={-5}>不到腾讯的十分之一</Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 14 · AI 兑现 ============ */

const Ai: React.FC<{f: number}> = ({f}) => {
  const x = X.ai;
  return (
    <>
      <Put x={x - 660} y={66}>
        <Label size={28} bg={V.red}>2023—2026 · AI 兑现</Label>
      </Put>
      <At f={f} at={cf(77)}>
        <Put x={x - 660} y={130}>
          <PostIt w={400} rot={-2} color="#f2df7b" head="2023 年 3 月">
            文心一言发布，
            <br />
            中国第一批大模型
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(79)}>
        <Put x={x - 660} y={400}>
          <Sticker rot={-2}>
            <Robotaxi s={320} />
          </Sticker>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 21, color: V.inkSoft, marginTop: 4, whiteSpace: 'nowrap'}}>萝卜快跑 · 第六代车（示意）</div>
        </Put>
      </At>
      <At f={f} at={cf(80)}>
        <Put x={x + 40} y={130}>
          <Doc w={430} h={210} rot={2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft}}>2025 四季度</div>
            <div style={{fontFamily: VF.num, fontSize: 56, color: V.ink, lineHeight: 1.15}}>340 万单</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red}}>同比翻两倍 · 累计 2000 万单</div>
          </Doc>
        </Put>
      </At>
      <At f={f} at={cf(82)}>
        <Put x={x + 40} y={410}>
          <Note x={0} y={0} size={26} color={V.inkSoft}>迪拜 · 阿布扎比开跑，伦敦签约</Note>
        </Put>
        <Put x={x + 40} y={470}>
          <IndexCard w={430} h={190} rot={-2}>
            <div style={{fontFamily: VF.heavy, fontSize: 24, color: V.inkSoft, marginTop: -6}}>文心助手月活</div>
            <div style={{fontFamily: VF.num, fontSize: 58, color: V.ink, lineHeight: 1.15}}>2 亿</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(84)}>
        <Put x={x - 660} y={710}>
          <Big size={64}>AI 收入 43%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 4}}>芯片递表港交所 · 50 亿美元回购</div>
        </Put>
      </At>
      <At f={f} at={cf(85)}>
        <Put x={x + 120} y={660}>
          <Sticker rot={3}>
            <KunlunChip s={150} />
          </Sticker>
        </Put>
      </At>
    </>
  );
};

/* ============ 15 · 收尾 ============ */

const Final: React.FC<{f: number}> = ({f}) => {
  const x = X.final;
  return (
    <>
      <At f={f} at={cf(87)}>
        <Put x={x - 640} y={130}>
          <Label size={30} bg={V.red}>2026 · 百度</Label>
        </Put>
        <Put x={x - 640} y={192}>
          <Big size={110}>{countUp(f, cf(87), 270, 30)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.ink, marginTop: 6}}>故事最强的年份，市值只剩峰值的两成</div>
        </Put>
      </At>
      <At f={f} at={cf(89)}>
        <Put x={x - 640} y={470}>
          <Note x={0} y={0} size={40} color={V.ink}>市场不信故事，只信现金流</Note>
        </Put>
      </At>
      <At f={f} at={cf(90)}>
        <Put x={x - 640} y={580}>
          <Note x={0} y={0} size={44}>搜索的时代，它错过了手机</Note>
        </Put>
        <Put x={x - 640} y={680}>
          <Note x={0} y={0} size={44} color={V.red}>AI 的时代，它还在牌桌上</Note>
        </Put>
      </At>
      <At f={f} at={cf(92)}>
        <Put x={x - 640} y={720}>
          <div style={{fontFamily: VF.num, fontSize: 68, color: 'rgba(23,23,22,0.35)', letterSpacing: 4}}>2000 — 2026</div>
        </Put>
      </At>
      <At f={f} at={cf(93)}>
        <Put x={x + 80} y={620}>
          <Note x={0} y={0} size={40} color={V.inkSoft}>下一段路，才刚开始</Note>
        </Put>
      </At>
    </>
  );
};

/* ============ 年份计数器 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  [cf(8) - 6, 2000],
  [cf(15) - 6, 2001],
  [cf(21) - 6, 2002],
  [cf(23) - 6, 2005],
  [cf(31) - 6, 2005],
  [cf(32) - 6, 2008],
  [cf(33) - 6, 2010],
  [cf(37) - 6, 2011],
  [cf(41) - 6, 2012],
  [cf(45) - 6, 2013],
  [cf(49) - 6, 2015],
  [cf(51) - 6, 2016],
  [cf(58) - 6, 2017],
  [cf(64) - 6, 2019],
  [cf(67) - 6, 2020],
  [cf(68) - 6, 2021],
  [cf(72) - 6, 2022],
  [cf(77) - 6, 2023],
  [cf(79) - 6, 2025],
  [cf(87) - 6, 2026],
];

const Hud: React.FC<{f: number; camX: number; z: number}> = ({f, camX, z}) => {
  if (f < cf(1) || f >= cf(93) + 30 || z < 0.32) return null;
  const tracking = f >= cf(7) && f < cf(8) - 6;
  const year = tracking ? xy(camX) : rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={2000} to={2026} title="百度 26 年" bands={[[2008.6, 2009.2], [2016.0, 2016.9], [2019.3, 2019.9]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={61} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={82} seed={20} />
        <CapGrid cam={cam} />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Found f={f} />
        <Pivot f={f} />
        <Ipo f={f} />
        <Dump f={f} />
        <Top f={f} />
        <Mobile f={f} />
        <Buy91 f={f} />
        <O2O f={f} />
        <Wzx f={f} />
        <Luqi f={f} />
        <Peak f={f} />
        <Drift f={f} />
        <Ai f={f} />
        <Final f={f} />
        {[
          [X.found - 620, 100],
          [X.ipo + 300, 96],
          [X.wzx + 300, 100],
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
  ['stamp', cf(3), 0.35],
  ['pop', cf(4), 0.3],
  ['ding', cf(5), 0.3],
  ['question', cf(6), 0.35],
  ['whoosh', cf(7) + 10, 0.4],
  ['paper', cf(8) - 4, 0.3],
  ['pop', cf(10), 0.3],
  ['magic', cf(11), 0.35],
  ['ding', cw(12, '120 万美元'), 0.4],
  ['paper', cf(13), 0.3],
  ['whoosh', cf(15) - 26, 0.3],
  ['error', cf(16), 0.35],
  ['stamp', cf(18), 0.4],
  ['paper', cf(19), 0.3],
  ['pop', cf(20), 0.3],
  ['whoosh', cf(21) - 24, 0.3],
  ['magic', cf(21), 0.35],
  ['ding', cf(22), 0.35],
  ['whoosh', cf(23) - 28, 0.3],
  ['confetti', cf(23), 0.35],
  ['ding', cf(25), 0.35],
  ['confetti', cf(26), 0.4],
  ['magic', cf(28), 0.35],
  ['stamp', cf(30), 0.4],
  ['error', cf(31), 0.35],
  ['error', cf(32), 0.4],
  ['whoosh', cf(33) - 24, 0.3],
  ['paper', cf(33), 0.3],
  ['ding', cf(35), 0.35],
  ['magic', cf(36), 0.35],
  ['whoosh', cf(37) - 26, 0.3],
  ['magic', cf(37), 0.4],
  ['confetti', cf(39), 0.35],
  ['stamp', cf(40), 0.4],
  ['whoosh', cf(41) - 24, 0.3],
  ['paper', cf(41), 0.3],
  ['shake', cf(43), 0.35],
  ['pop', cf(44), 0.3],
  ['whoosh', cf(45) - 24, 0.3],
  ['error', cf(45), 0.35],
  ['ding', cw(46, '19 亿美元'), 0.4],
  ['error', cf(47), 0.35],
  ['shake', cf(48), 0.3],
  ['whoosh', cf(49) - 22, 0.3],
  ['paper', cf(49), 0.3],
  ['error', cf(50), 0.35],
  ['whoosh', cf(51) - 26, 0.3],
  ['error', cf(51), 0.4],
  ['error', cf(53), 0.4],
  ['shake', cf(54), 0.35],
  ['stamp', cf(55), 0.4],
  ['error', cf(57), 0.4],
  ['whoosh', cf(58) - 26, 0.3],
  ['magic', cf(58), 0.35],
  ['stamp', cf(59), 0.4],
  ['magic', cf(60), 0.35],
  ['ding', cf(61), 0.35],
  ['error', cf(62), 0.35],
  ['error', cf(64), 0.4],
  ['error', cf(65), 0.35],
  ['whoosh', cf(67) - 26, 0.3],
  ['magic', cf(67), 0.35],
  ['ding', cf(68), 0.4],
  ['magic', cf(69), 0.4],
  ['confetti', cf(70), 0.35],
  ['stamp', cf(71), 0.4],
  ['whoosh', cf(72) - 24, 0.3],
  ['error', cf(73), 0.3],
  ['error', cf(74), 0.35],
  ['stamp', cf(75), 0.35],
  ['whoosh', cf(76) - 26, 0.3],
  ['magic', cf(77), 0.35],
  ['whoosh', cf(79) - 24, 0.3],
  ['pop', cf(79), 0.3],
  ['ding', cf(80), 0.35],
  ['magic', cf(82), 0.35],
  ['ding', cf(83), 0.35],
  ['magic', cf(84), 0.4],
  ['stamp', cf(86), 0.4],
  ['whoosh', cf(87) - 28, 0.3],
  ['error', cf(87), 0.35],
  ['error', cf(88), 0.3],
  ['paper', cf(89), 0.3],
  ['paper', cf(90), 0.3],
  ['ding', cf(91), 0.35],
  ['paper', cf(92), 0.3],
  ['ding', cf(93), 0.4],
];
