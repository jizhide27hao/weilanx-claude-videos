import React from 'react';
import type {SfxCue} from '../../library/types';
import {Big, Doc, Put, RedX} from '../../library/vox/desk';
import {rollYear, YearCounter} from '../../library/vox/hud';
import {Portrait, type Hair} from '../../library/vox/portrait';
import {At, Desk, HalftonePhoto, HandLine, IndexCard, Label, TypeOn, Underline} from '../../library/vox/props';
import {DeskLitter, PostIt, Pushpin, Stamp, Sticker} from '../../library/vox/stickers';
import {step12, V, VF} from '../../library/vox/theme';
import {camAt, World, type CamKey} from '../../library/vox/VoxShow';
import {BenchArt, BoardroomArt, CoatSticker, GlobeArt, HarmonyMark, KirinChip, PetalMark, PhoneFront, PhoneStack, RackArt, Receipt, SlumpStamp, SmartCar, SnowFlake, SuitDoc, SuitStack, SwitchBox, TowerArt, WindowArt} from './art';
import {cf, cw} from './cues';
import {CAP, CAP_PTS, capAt, capY, RULER_Y, WORLD_H, WORLD_W, yx} from './timeline';

const W = 1920;
const H = 1080;
const p12 = (f: number, at: number, dur: number) => Math.max(0, Math.min(1, (step12(f) - at) / dur));
const countUp = (f: number, at: number, to: number, dur = 30) => Math.round(to * (1 - Math.pow(1 - p12(f, at, dur), 3)));

/* ============ 每个故事节点在桌面上的横坐标 ============ */

const X = {
  now: yx(2026.8),
  found: yx(1987.7),
  bench: yx(1991.5),
  cc08: yx(1993.6),
  law: yx(1996.5),
  winter: yx(2000.3),
  sell: yx(2001.9),
  slump: yx(2002.7),
  cisco: yx(2003.2),
  hisi: yx(2004.7),
  global: yx(2008.2),
  top500: yx(2010.5),
  phone: yx(2012.6),
  mate7: yx(2014.6),
  peak: yx(2018.8),
  sanction: yx(2019.7),
  honor: yx(2020.9),
  crash: yx(2021.7),
  m60: yx(2023.65),
  y2025: yx(2025.9),
  now26: yx(2026.4),
};

/* ============ 相机路线（跟着字幕走） ============ */

const CAM: CamKey[] = [
  // 钩子：现在
  // 这一段从左到右竖着摆了 4 块（4678 亿 / 1213 亿卡 / 1.38 万亿 / 借条），
  // 世界坐标到 y=850，z=1.26 时刚好把最下面一块顶进字幕条里，所以压到 1.12 并把镜头上抬。
  {f: 0, x: X.now - 330, y: 490, z: 1.12},
  {f: cf(5), x: X.now - 200, y: 500, z: 1.04, ease: 'sine', dur: 30},
  // 「把时间线拉出来」：沿轴倒着追回 1987
  {f: cf(7) + 18, x: yx(2006), y: 520, z: 0.36, ease: 'sine', dur: 32},
  {f: cf(9) - 2, x: X.found - 60, y: 470, z: 1.1, ease: 'tail', dur: 30},
  {f: cf(11), x: X.found - 200, y: 480, z: 1.14, ease: 'sine', dur: 20},
  // 自研
  {f: cf(16) - 4, x: X.bench - 80, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(19), x: X.bench + 100, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // C&C08
  {f: cf(22) - 4, x: X.cc08 - 60, y: 460, z: 1.1, ease: 'tail', dur: 26},
  // 基本法 / IBM
  {f: cf(23) - 4, x: X.law - 100, y: 470, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(26), x: X.law + 120, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 2001 冬天
  {f: cf(29) - 4, x: X.winter - 120, y: 470, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(32), x: X.winter + 130, y: 460, z: 1.12, ease: 'sine', dur: 22},
  // 2002 下滑
  {f: cf(35) - 4, x: (X.sell + X.slump) / 2, y: 480, z: 1.06, ease: 'tail', dur: 26},
  // 思科
  {f: cf(36) - 4, x: X.cisco - 100, y: 470, z: 1.08, ease: 'tail', dur: 28},
  {f: cf(41), x: X.cisco + 140, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 海思 / 出海
  {f: cf(43) - 4, x: X.hisi - 100, y: 470, z: 1.08, ease: 'tail', dur: 28},
  {f: cf(45) - 2, x: X.global - 60, y: 470, z: 1.06, ease: 'sine', dur: 26},
  {f: cf(47) - 2, x: X.top500 - 80, y: 470, z: 1.1, ease: 'sine', dur: 24},
  // 手机
  {f: cf(49) - 4, x: X.phone - 120, y: 470, z: 1.08, ease: 'tail', dur: 28},
  // 只推到 +20：推到 +130 时左边那一列（2011 标签 / 3000 万台 / 内部要换人）会贴边被裁掉
  {f: cf(54), x: X.phone + 20, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // Mate 7
  {f: cf(56) - 4, x: X.mate7 - 60, y: 460, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(58), x: X.mate7 + 160, y: 460, z: 1.12, ease: 'sine', dur: 20},
  // 2019 巅峰 + 实体清单
  {f: cf(60) - 4, x: X.peak - 80, y: 470, z: 1.08, ease: 'tail', dur: 26},
  // 这一段所有道具都挂在 X.peak 上，相机不能推到 X.sanction（再往右 880px），
  // 否则整列内容会被甩到画面左边缘贴边裁掉。这里只做一点右移的慢推。
  {f: cf(63), x: X.peak + 60, y: 460, z: 1.12, ease: 'sine', dur: 26},
  // 荣耀 / 腰斩
  {f: cf(64) - 4, x: X.honor - 100, y: 470, z: 1.06, ease: 'tail', dur: 28},
  {f: cf(67), x: X.crash - 40, y: 480, z: 1.06, ease: 'sine', dur: 24},
  {f: cf(70) - 2, x: X.crash + 140, y: 470, z: 1.12, ease: 'sine', dur: 18},
  // 2023 Mate 60
  {f: cf(71) - 4, x: X.m60 - 80, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(74), x: X.m60 + 150, y: 450, z: 1.12, ease: 'sine', dur: 20},
  // 2025
  {f: cf(77) - 4, x: X.y2025 - 80, y: 460, z: 1.1, ease: 'tail', dur: 28},
  {f: cf(80), x: X.y2025 + 160, y: 450, z: 1.12, ease: 'sine', dur: 22},
  // 2026 上半年
  {f: cf(81) - 4, x: X.now26 - 100, y: 460, z: 1.1, ease: 'tail', dur: 26},
  {f: cf(84), x: X.now26 + 130, y: 450, z: 1.12, ease: 'sine', dur: 20},
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

/* ============ 时间尺、营收网格、命运线 ============ */

const RULER_YEARS = [1987, 1990, 1993, 1996, 2000, 2003, 2008, 2012, 2016, 2019, 2021, 2023, 2026];

const Ruler: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: yx(1987.3), top: RULER_Y, width: yx(2026.9) - yx(1987.3), height: 6, background: V.ink}} />
    {RULER_YEARS.map((y) => (
      <div key={y} style={{position: 'absolute', left: yx(y) - 60, top: RULER_Y, width: 120, textAlign: 'center'}}>
        <div style={{width: 5, height: 26, background: V.ink, margin: '0 auto'}} />
        <div style={{fontFamily: VF.num, fontSize: 44, color: V.ink, marginTop: 6}}>{y}</div>
      </div>
    ))}
  </>
);

const GRID: [number, string][] = [
  [10, '10 亿'],
  [100, '100 亿'],
  [1000, '1000 亿'],
  [8000, '8000 亿'],
];

const CapGrid: React.FC = () => (
  <>
    {GRID.map(([v, t]) => (
      <React.Fragment key={v}>
        <div style={{position: 'absolute', left: yx(1990), top: capY(v), width: WORLD_W - yx(1990) - 400, borderTop: '3px dashed rgba(23,23,22,0.16)'}} />
        {/* 刻度标签只标 5 个位置。原来还有一组 X.now26 + 300，2026 段那根「10 亿」正好
            落在研发/净利条形图上，撤掉；这一段已经有 4678 / 20.6% / 234 亿 三个大数字。 */}
        {[X.law, X.cisco + 200, X.top500 + 100, X.mate7 + 200, X.crash + 400].map((x) => (
          <div key={x} style={{position: 'absolute', left: x + 10, top: capY(v) - 30, fontFamily: VF.heavy, fontSize: 22, color: 'rgba(23,23,22,0.38)', whiteSpace: 'nowrap'}}>
            {t}
          </div>
        ))}
      </React.Fragment>
    ))}
    {/* 图例放在 top500 左边：原来挂在 top500+120，一条长句会一直拖进 2012 的镜头里，
        被画面左边缘切掉半句。挂在左边就在相机走到手机段之前先出画。 */}
    <div style={{position: 'absolute', left: X.top500 - 760, top: capY(1000) + 16, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, whiteSpace: 'nowrap'}}>红线：华为历年销售收入（对数刻度，示意）</div>
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
      {head > x0 && <div style={{position: 'absolute', left: head - 16, top: capAt(head) - 16, width: 32, height: 32, borderRadius: 16, background: V.red, border: `4px solid ${V.paper}`}} />}
    </>
  );
};

const lineSpan = (f: number, camX: number): [number, number] => {
  if (f < cf(7)) return [yx(2026), WORLD_W];
  if (f < cf(9)) return [0, WORLD_W];
  if (f < cf(86)) return [0, Math.max(yx(2016), camX + 700)];
  return [0, WORLD_W];
};

/* ============ 钩子：2026.10 ============ */

const Now: React.FC<{f: number}> = ({f}) => {
  const x = X.now;
  const until = cf(9) - 8;
  return (
    <>
      <At f={f} at={cf(1)} until={until}>
        <Put x={x - 980} y={150}>
          <Label size={30} bg={V.red}>
            2026.10 · 华为
          </Label>
        </Put>
        <Put x={x - 980} y={206}>
          <Big size={150}>{countUp(f, cf(1), 4678, 26)} 亿</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 32, color: V.ink, marginTop: 2}}>2026 上半年营业收入</div>
        </Put>
      </At>
      <At f={f} at={cf(2)} until={until}>
        <Put x={x - 980} y={452}>
          <IndexCard w={560} h={216} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: -18}}>同一半年，研发投入</div>
            <div style={{fontFamily: VF.heavy, fontSize: 66, color: V.ink, lineHeight: 1.1}}>1213 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft}}>净利润 234 亿</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cw(3, '五分之一')} until={until}>
        <Put x={x - 360} y={492}>
          <Stamp size={34} rot={-7}>
            研发是净利的 5 倍
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(4)} until={until}>
        <Put x={x - 980} y={690}>
          <Label size={30} bg={V.ink}>
            近十年研发投入
          </Label>
          <Big size={96}>1.38 万亿</Big>
        </Put>
      </At>
      <At f={f} at={cf(5)} until={until}>
        <Put x={x - 300} y={650}>
          <Sticker rot={4}>
            <Receipt />
          </Sticker>
        </Put>
        <Note x={x - 300} y={840} size={28} color={V.inkSoft}>
          1987 年的本钱
        </Note>
      </At>
      <At f={f} at={cf(6)} until={until}>
        <Put x={x + 140} y={170}>
          <Label size={28}>三次差点没过去</Label>
        </Put>
        <Put x={x + 140} y={224}>
          <div style={{display: 'flex', gap: 14}}>
            {['2002', '2003', '2020'].map((y, i) => (
              <div key={y} style={{border: `4px solid ${V.red}`, color: V.red, fontFamily: VF.num, fontSize: 46, padding: '4px 14px', opacity: 0.9, transform: `rotate(${i * 3 - 3}deg)`}}>{y}</div>
            ))}
          </div>
        </Put>
      </At>
      <At f={f} at={cf(7)} until={until}>
        <Put x={x + 260} y={400}>
          <div style={{fontFamily: VF.num, fontSize: 250, color: V.red, lineHeight: 1, transform: 'rotate(8deg)'}}>?</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 1987 深圳 ============ */

const Founding: React.FC<{f: number}> = ({f}) => {
  const x = X.found;
  const until = cf(16) - 8;
  return (
    <>
      <At f={f} at={cf(9) - 6} until={until}>
        <Put x={x - 760} y={40}>
          <Label size={28}>1987.9 · 深圳</Label>
        </Put>
        <Put x={x - 760} y={96}>
          <Photo x={0} y={0} w={330} h={222} caption="两台万用表、一台示波器（示意）" rot={-3}>
            <BenchArt w={330} h={222} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(10)} until={until}>
        <Put x={x - 330} y={110}>
          <Sticker rot={-4}>
            <Receipt />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(11)} until={until}>
        <Put x={x - 760} y={420}>
          <IndexCard w={600} h={200} rot={1}>
            <div style={{fontFamily: VF.hand, fontSize: 46, color: '#1f3f8a', lineHeight: 1.3, marginTop: -12}}>“中华有为”</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red, marginTop: 8}}>墙上的一句标语，成了公司名</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(12)} until={until}>
        <Put x={x + 60} y={120}>
          <Sticker rot={-6}>
            <PetalMark s={160} />
          </Sticker>
        </Put>
        <Note x={x + 50} y={300} size={30}>
          华为
        </Note>
      </At>
      <At f={f} at={cf(13)} until={until}>
        <Put x={x - 60} y={430}>
          <Sticker rot={3}>
            <SwitchBox s={230} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(14)} until={until}>
        <Put x={x + 300} y={430}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, lineHeight: 1.7}}>
            香港买进
            <br />
            <span style={{color: V.red, fontSize: 34}}>↓</span>
            <br />
            县邮电局、乡镇
          </div>
        </Put>
      </At>
      <At f={f} at={cf(15)} until={until}>
        <Put x={x + 300} y={660}>
          <Stamp size={32} rot={-5} color={V.ink}>
            十几个人
          </Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 1991 自研，1993 C&C08 ============ */

const Bench: React.FC<{f: number}> = ({f}) => {
  const x = X.bench;
  const until = cf(23) - 8;
  return (
    <>
      <At f={f} at={cf(16) - 6} until={until}>
        <Put x={x - 700} y={40}>
          <Label size={28}>1990–1991 · 停止代理，自己研制</Label>
        </Put>
        <Put x={x - 700} y={96}>
          <Photo x={0} y={0} w={330} h={222} caption="动员会（示意）" rot={-2}>
            <WindowArt w={330} h={222} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(17)} until={until}>
        <Put x={x - 320} y={120}>
          <PostIt w={310} rot={3} head="代理的账" size={26}>
            货是别人的
            <br />
            价格也是别人的
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(19)} until={until}>
        <Put x={x - 700} y={400}>
          <IndexCard w={620} h={240} rot={-1}>
            <div style={{fontFamily: VF.hand, fontSize: 40, color: '#1f3f8a', lineHeight: 1.35, marginTop: -12}}>
              “研发成功了，我们都有发展；
              <br />
              失败了，我只有从楼上跳下去。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 8}}>1991 年 9 月 · 五楼会议室窗边</div>
          </IndexCard>
        </Put>
      </At>
      {/* C&C08 的机柜挂在 1993 这个锚点上，不能挂在 bench 上：
          1991.5 和 1993.6 相距 1100px，挂在 bench 上会被相机甩出画外。 */}
      <At f={f} at={cf(22)} until={until}>
        <Put x={X.cc08 + 20} y={430}>
          <Sticker rot={2}>
            <RackArt w={300} h={204} />
          </Sticker>
        </Put>
        <Put x={X.cc08 + 20} y={690}>
          <Label size={30} bg={V.red}>
            C&C08 · 1993
          </Label>
        </Put>
      </At>
    </>
  );
};

/* ============ 1995–1998 基本法 / IBM ============ */

const Law: React.FC<{f: number}> = ({f}) => {
  const x = X.law;
  const until = cf(29) - 8;
  return (
    <>
      <At f={f} at={cf(23) - 6} until={until}>
        <Put x={x - 700} y={50}>
          <Label size={28}>1995 · 销售额</Label>
          <Big size={132}>15 亿</Big>
        </Put>
        <Put x={x - 700} y={300}>
          <Photo x={0} y={0} w={300} h={200} caption="会议室（示意）" rot={-3}>
            <BoardroomArt w={300} h={200} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(24)} until={until}>
        <Put x={x - 340} y={310}>
          <Stamp size={36} rot={-6}>
            队伍乱了
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(25)} until={until}>
        <Put x={x - 320} y={100}>
          <IndexCard w={470} h={200} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 25, color: V.inkSoft, marginTop: -16}}>1996 · 市场部</div>
            <div style={{fontFamily: VF.heavy, fontSize: 44, color: V.ink, lineHeight: 1.15}}>集体辞职</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>全部重新竞聘上岗</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(26)} until={until}>
        <Put x={x - 700} y={570}>
          <Sticker rot={-1}>
            <Doc w={300} h={190} rot={-2}>
              <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft, letterSpacing: 4}}>1996–1998</div>
              <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink, lineHeight: 1.2, marginTop: 4}}>华为<br />基本法</div>
            </Doc>
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(27)} until={until}>
        <Put x={x + 150} y={430}>
          <Sticker rot={3}>
            <Doc w={330} h={210} rot={1}>
              <div style={{fontFamily: VF.heavy, fontSize: 26, color: V.ink}}>I B M</div>
              <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft, marginTop: 4}}>七十位顾问 · 一整套流程</div>
              <div style={{fontFamily: VF.num, fontSize: 46, color: V.red, marginTop: 6}}>IPD</div>
            </Doc>
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(28)} until={until}>
        <Put x={x + 150} y={690}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.inkSoft, whiteSpace: 'nowrap'}}>学的是怎么把一个项目管好</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2000–2002 冬天 ============ */

const Winter: React.FC<{f: number}> = ({f}) => {
  const x = X.winter;
  const until = cf(35) - 8;
  return (
    <>
      <At f={f} at={cf(29) - 6} until={until}>
        <Put x={x - 720} y={50}>
          <Label size={28}>2000 · 销售额</Label>
          <Big size={130}>220 亿</Big>
        </Put>
      </At>
      <At f={f} at={cf(30)} until={until}>
        <Put x={x - 720} y={330}>
          <Sticker rot={-2}>
            <Doc w={330} h={210} rot={-2}>
              <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>2000 年底 · 内部文章</div>
              <div style={{fontFamily: VF.heavy, fontSize: 44, color: V.ink, lineHeight: 1.15, marginTop: 6}}>华为<br />的冬天</div>
            </Doc>
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(31)} until={until}>
        <Put x={x - 340} y={120}>
          <Sticker rot={6}>
            <SnowFlake s={150} />
          </Sticker>
        </Put>
        <Note x={x - 350} y={290} size={28} color={V.inkSoft}>
          互联网泡沫破了
        </Note>
      </At>
      <At f={f} at={cf(33)} until={until}>
        <Put x={x - 340} y={400}>
          <Sticker rot={2}>
            <CoatSticker s={160} />
          </Sticker>
        </Put>
        <Put x={x - 330} y={620}>
          <Label size={30} bg={V.red}>
            7.5 亿美元
          </Label>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 6}}>电源业务 · 卖给艾默生</div>
        </Put>
      </At>
      <At f={f} at={cf(34)} until={until}>
        <Put x={x + 60} y={130}>
          <PostIt w={300} rot={-3} head="过冬的棉袄" size={24}>
            2001 年 10 月
            <br />
            卖掉的不是包袱，
            <br />
            是现金流
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(35)} until={until}>
        <Put x={x + 60} y={430}>
          <SlumpStamp />
          <div style={{fontFamily: VF.num, fontSize: 92, color: V.ink, marginTop: 8}}>221 亿</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft}}>比上年少 13%，成立以来唯一一次</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2003 思科 ============ */

const Cisco: React.FC<{f: number}> = ({f}) => {
  const x = X.cisco;
  const until = cf(43) - 8;
  return (
    <>
      <At f={f} at={cf(36) - 6} until={until}>
        <Put x={x - 740} y={50}>
          <Label size={28}>2003.1 · 美国德州</Label>
        </Put>
        <Put x={x - 740} y={106}>
          <Sticker rot={-2}>
            <SuitDoc />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(38)} until={until}>
        <Put x={x - 740} y={430}>
          <Photo x={0} y={0} w={280} h={186} caption="起诉书（示意）" rot={2}>
            <SuitStack w={280} h={186} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(39)} until={until}>
        <Put x={x - 380} y={150}>
          <PostIt w={330} rot={3} head="赔偿方案" size={26}>
            按对方开的价，
            <br />
            要赔上百亿美元
          </PostIt>
        </Put>
        <RedX f={f} at={cf(39) + 10} x={x - 300} y={430} s={46} />
      </At>
      <At f={f} at={cf(40)} until={until}>
        <Put x={x - 340} y={470}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft, whiteSpace: 'nowrap'}}>合作伙伴暂停，订单一单一单停</div>
        </Put>
      </At>
      <At f={f} at={cf(41)} until={until}>
        <Put x={x + 60} y={130}>
          <IndexCard w={430} h={210} rot={1}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -16}}>2003 · 与思科的对手合资</div>
            <div style={{fontFamily: VF.heavy, fontSize: 48, color: V.ink}}>3Com</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>华为三康 · 让对方出面作证</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(42)} until={until}>
        <Put x={x + 60} y={430}>
          <Stamp size={40} rot={-6}>
            2004.7 撤诉
          </Stamp>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 14, width: 420, whiteSpace: 'normal'}}>改了部分源代码，和解收场。命保住了，教训记下了。</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2004 海思 → 2008 海外 → 2010 五百强 ============ */

const Hisi: React.FC<{f: number}> = ({f}) => {
  const x = X.hisi;
  const until = cf(45) - 8;
  return (
    <>
      <At f={f} at={cf(43) - 6} until={until}>
        <Put x={x - 650} y={60}>
          <Label size={28}>2004 · 一次转折</Label>
        </Put>
        <Put x={x - 650} y={120}>
          <PostIt w={380} rot={-2} head="那场官司之后" size={28}>
            命门不能
            <br />
            攥在别人手里
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(44)} until={until}>
        <Put x={x - 230} y={130}>
          <Sticker rot={4}>
            <KirinChip label="H I S I L I C O N" s={210} />
          </Sticker>
        </Put>
        <Put x={x - 230} y={400}>
          <Label size={30} bg={V.ink}>
            海思 · 自己做芯片
          </Label>
        </Put>
      </At>
    </>
  );
};

const Global: React.FC<{f: number}> = ({f}) => {
  const x = X.global;
  const until = cf(47) - 8;
  return (
    <>
      <At f={f} at={cf(45) - 6} until={until}>
        <Put x={x - 620} y={60}>
          <Label size={28}>2005 · 海外收入第一次超过国内</Label>
        </Put>
        <Put x={x - 620} y={130}>
          <Sticker rot={-3}>
            <GlobeArt s={200} />
          </Sticker>
        </Put>
        <Put x={x - 620} y={370}>
          <Photo x={0} y={0} w={280} h={190} caption="基站（示意）" rot={2}>
            <TowerArt w={280} h={190} />
          </Photo>
        </Put>
      </At>
      <At f={f} at={cf(46)} until={until}>
        <Put x={x - 330} y={180}>
          <Big size={150}>{countUp(f, cf(46), 75, 24)}%</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink}}>2008 年海外占比</div>
        </Put>
      </At>
    </>
  );
};

const Top500: React.FC<{f: number}> = ({f}) => {
  const x = X.top500;
  const until = cf(49) - 8;
  return (
    <>
      <At f={f} at={cf(47) - 6} until={until}>
        <Put x={x - 620} y={60}>
          <Label size={28}>2010 · 销售收入</Label>
          <Big size={124}>1852 亿</Big>
        </Put>
      </At>
      <At f={f} at={cf(48)} until={until}>
        <Put x={x - 620} y={330}>
          <IndexCard w={480} h={220} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -16}}>2010 · 第一次进世界 500 强</div>
            <div style={{fontFamily: VF.num, fontSize: 96, color: V.ink, lineHeight: 1.05}}>397</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red}}>位</div>
          </IndexCard>
        </Put>
        <Put x={x - 100} y={360}>
          <Stamp size={36} rot={6} round>
            500 强
          </Stamp>
        </Put>
      </At>
    </>
  );
};

/* ============ 2011–2014 手机 ============ */

const Phone2012: React.FC<{f: number}> = ({f}) => {
  const x = X.phone;
  const until = cf(56) - 8;
  return (
    <>
      <At f={f} at={cf(49) - 6} until={until}>
        <Put x={x - 700} y={60}>
          <Label size={28}>2011 · 终端这条线</Label>
        </Put>
        <Put x={x - 700} y={120}>
          <PostIt w={330} rot={-3} head="当时的手机部门" size={28}>
            主要是给运营商
            <br />
            做贴牌机
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(50)} until={until}>
        <Person x={x - 320} y={100} name="余承东" note="2011 年接手终端" hair="short" glasses={false} shirt w={140} rot={3} />
      </At>
      <At f={f} at={cf(52)} until={until}>
        <Put x={x - 700} y={420}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft, whiteSpace: 'nowrap'}}>砍掉贴牌机，一年少卖</div>
          <Big size={110} color={V.red}>3000 万台</Big>
        </Put>
        <Put x={x - 700} y={700}>
          <Stamp size={32} rot={-5}>
            内部要换人
          </Stamp>
        </Put>
      </At>
      <At f={f} at={cf(53)} until={until}>
        {/* 从 x-320 挪到 x-120：原来正好压在左边「3000 万台」的「台」上 */}
        <Put x={x - 120} y={470}>
          <IndexCard w={520} h={210} rot={1}>
            <div style={{fontFamily: VF.hand, fontSize: 40, color: '#1f3f8a', lineHeight: 1.35, marginTop: -10}}>
              “不支持余承东的工作，
              <br />
              就是不支持我。”
            </div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.red, marginTop: 6}}>任正非 · 内部会上</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(54)} until={until}>
        <Put x={x + 80} y={120}>
          <PostIt w={300} rot={4} head="2012 年的一条微博" size={24}>
            三年超苹果
            <br />
            五年超三星
            <br />
            <span style={{color: V.red}}>要做世界第一</span>
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(56)} until={until}>
        <Put x={x + 60} y={420}>
          <Sticker rot={3}>
            <PhoneFront s={190} label="Mate 7" />
          </Sticker>
        </Put>
        <Put x={x + 280} y={560}>
          <Big size={78}>700 万台</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, whiteSpace: 'nowrap'}}>三千元档</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2018–2019 巅峰 → 实体清单 ============ */

const Peak2019: React.FC<{f: number}> = ({f}) => {
  const x = X.peak;
  const until = cf(64) - 8;
  return (
    <>
      <At f={f} at={cf(57) - 6} until={until}>
        <Put x={x - 760} y={50}>
          <Label size={28}>2018 · 手机出货</Label>
          <Big size={128}>2 亿台</Big>
        </Put>
        <Put x={x - 760} y={310}>
          <Sticker rot={-3}>
            <PhoneStack n={5} />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(58)} until={until}>
        <Put x={x - 350} y={330}>
          <Label size={30} bg={V.red}>
            二季度超过苹果
          </Label>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 8}}>第一次全球第二</div>
        </Put>
      </At>
      <At f={f} at={cf(59)} until={until}>
        <Put x={x - 350} y={110}>
          <IndexCard w={470} h={200} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -14}}>2019 · 全年</div>
            <div style={{fontFamily: VF.heavy, fontSize: 50, color: V.ink}}>2.4 亿台</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.red}}>营收 8588 亿 · 历史第二</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(60)} until={until}>
        {/* y 从 110 下到 205：110 时这张卡的右上角会钻到右上角年份计数器底下 */}
        <Put x={x + 160} y={205}>
          <div style={{background: V.card, padding: '18px 24px', width: 430, boxShadow: '3px 6px 10px rgba(23,23,22,0.35)', transform: 'rotate(-1deg)'}}>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.hiSolid, lineHeight: 1.2}}>实体清单</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.paper, marginTop: 6}}>2019 年 5 月 · 美国商务部</div>
          </div>
        </Put>
      </At>
      <At f={f} at={cf(61)} until={until}>
        <Put x={x + 160} y={395}>
          <div style={{display: 'flex', gap: 12}}>
            {['芯片', '系统', '工具'].map((t, i) => (
              <div key={t} style={{background: V.paper, border: `4px solid ${V.red}`, color: V.red, fontFamily: VF.heavy, fontSize: 34, padding: '6px 14px', transform: `rotate(${i * 2 - 2}deg)`}}>{t}</div>
            ))}
          </div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.ink, marginTop: 14}}>一夜之间，全断</div>
        </Put>
      </At>
      <At f={f} at={cf(62)} until={until}>
        <Put x={x + 160} y={580}>
          <Label size={30} bg={V.ink}>
            备胎全部转正
          </Label>
        </Put>
      </At>
      <At f={f} at={cw(63, '鸿蒙')} until={until}>
        {/* 挂到 +620 而不是 +460：+460 在 z=1.12 时会和上面那排「芯片/系统/工具」压在一起 */}
        <Put x={x + 620} y={430}>
          <Sticker rot={-4}>
            <HarmonyMark s={150} />
          </Sticker>
        </Put>
        <Put x={x + 610} y={600}>
          <Label size={28} bg={V.red}>
            2019.8 鸿蒙
          </Label>
        </Put>
      </At>
    </>
  );
};

/* ============ 2020–2021 荣耀 / 腰斩 / 孟晚舟 ============ */

const Honor: React.FC<{f: number}> = ({f}) => {
  const x = X.honor;
  const until = cf(67) - 8;
  return (
    <>
      <At f={f} at={cf(64) - 6} until={until}>
        <Put x={x - 740} y={60}>
          <Label size={28}>2020.11 · 荣耀整体出售</Label>
        </Put>
        <Put x={x - 740} y={120}>
          <Sticker rot={-2}>
            <Doc w={360} h={220} rot={-1}>
              <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft}}>联合声明</div>
              <div style={{fontFamily: VF.heavy, fontSize: 42, color: V.ink, lineHeight: 1.2}}>荣耀<br />独立</div>
              <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.red, marginTop: 4}}>华为不持股、不参与经营</div>
            </Doc>
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(66)} until={until}>
        <Put x={x - 320} y={130}>
          <Label size={28}>2020 · 历史最高</Label>
          <Big size={116}>8914 亿</Big>
        </Put>
      </At>
      <At f={f} at={cf(65)} until={until}>
        <Put x={x - 320} y={390}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft, whiteSpace: 'nowrap'}}>卖完，华为不持股，不参与经营</div>
        </Put>
      </At>
    </>
  );
};

const Crash: React.FC<{f: number}> = ({f}) => {
  const x = X.crash;
  const until = cf(71) - 8;
  return (
    <>
      <At f={f} at={cf(67) - 6} until={until}>
        <Put x={x - 700} y={50}>
          <Label size={28}>2021 · 销售收入</Label>
          <Big size={124}>6368 亿</Big>
        </Put>
      </At>
      <At f={f} at={cf(68)} until={until}>
        <Put x={x - 700} y={320}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
            <div style={{fontFamily: VF.num, fontSize: 96, color: V.red, lineHeight: 1}}>−2546</div>
            <div style={{fontFamily: VF.heavy, fontSize: 34, color: V.ink}}>亿</div>
          </div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.inkSoft}}>一年掉掉 28.6%</div>
        </Put>
      </At>
      <At f={f} at={cw(69, '3500')} until={until}>
        <Put x={x - 320} y={110}>
          <IndexCard w={470} h={215} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -14}}>手机出货</div>
            <div style={{fontFamily: VF.heavy, fontSize: 40, color: V.ink}}>2.4 亿 → 3500 万</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>全球份额 15% → 3%</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(70)} until={until}>
        <Put x={x + 160} y={400}>
          <PostIt w={320} rot={3} head="2021.9.25" size={26}>
            孟晚舟回国
            <br />
            在加拿大被扣了
            <br />
            1028 天
          </PostIt>
        </Put>
      </At>
    </>
  );
};

/* ============ 2023 Mate 60 ============ */

const Mate60: React.FC<{f: number}> = ({f}) => {
  const x = X.m60;
  const until = cf(77) - 8;
  return (
    <>
      <At f={f} at={cf(71) - 6} until={until}>
        <Put x={x - 680} y={50}>
          <Label size={28} bg={V.red}>
            2023.8.29 · 没有发布会
          </Label>
        </Put>
        <Put x={x - 680} y={120}>
          <div style={{fontFamily: VF.num, fontSize: 150, color: V.ink, lineHeight: 1}}>12:08</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 28, color: V.inkSoft}}>Mate 60 Pro 直接上架</div>
        </Put>
      </At>
      <At f={f} at={cf(73)} until={until}>
        <Put x={x - 680} y={420}>
          <div style={{background: V.paper, border: `3px solid ${V.ink}`, padding: '14px 20px', width: 380, transform: 'rotate(-2deg)', boxShadow: '3px 5px 6px rgba(23,23,22,0.28)'}}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.inkSoft}}>官网参数页 · 2023.8.29</div>
            {[
              ['屏幕', '6.82 英寸'],
              ['电池', '5000 mAh'],
              ['处理器', '—'],
            ].map(([k, v]) => (
              <div key={k} style={{display: 'flex', justifyContent: 'space-between', fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: k === '处理器' ? V.red : V.ink, marginTop: 8, borderBottom: '2px solid rgba(23,23,22,0.15)', paddingBottom: 4}}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </Put>
      </At>
      <At f={f} at={cw(74, '麒麟')} until={until}>
        <Put x={x - 280} y={110}>
          <Sticker rot={4}>
            <KirinChip s={210} />
          </Sticker>
        </Put>
        <Put x={x - 280} y={390}>
          <Label size={30} bg={V.ink}>
            麒麟 9000S
          </Label>
        </Put>
      </At>
      <At f={f} at={cf(75)} until={until}>
        <Put x={x + 60} y={130}>
          <Sticker rot={3}>
            <PhoneFront s={210} label="Mate 60 Pro" />
          </Sticker>
        </Put>
      </At>
      <At f={f} at={cf(76)} until={until}>
        <Put x={x + 60} y={540}>
          <Label size={28}>2023 · 营收</Label>
          <Big size={78}>7042 亿</Big>
        </Put>
      </At>
    </>
  );
};

/* ============ 2025 ============ */

const Y2025: React.FC<{f: number}> = ({f}) => {
  const x = X.y2025;
  const until = cf(81) - 8;
  return (
    <>
      <At f={f} at={cf(77) - 6} until={until}>
        <Put x={x - 680} y={50}>
          <Label size={28}>2025 · 销售收入</Label>
          <Big size={130}>8809 亿</Big>
        </Put>
      </At>
      <At f={f} at={cw(78, '105')} until={until}>
        <Put x={x - 680} y={320}>
          <div style={{fontFamily: VF.num, fontSize: 88, color: V.red, lineHeight: 1}}>105 亿</div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 4}}>距 2020 年的最高点，只差这么多</div>
        </Put>
      </At>
      <At f={f} at={cf(79)} until={until}>
        {/* 原来在 x-300，正好盖住左边「8809 亿」的「亿」；挪到右半边 */}
        <Put x={x + 40} y={110}>
          <IndexCard w={450} h={200} rot={-2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -14}}>智能汽车解决方案</div>
            <div style={{fontFamily: VF.heavy, fontSize: 50, color: V.ink}}>450 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 23, color: V.red}}>同比 +72%，最快的一块</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(80)} until={until}>
        <Put x={x + 200} y={380}>
          <Sticker rot={2}>
            <SmartCar w={330} h={190} />
          </Sticker>
        </Put>
        <Put x={x + 200} y={600}>
          <Big size={70}>58.9 万辆</Big>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft}}>鸿蒙智行 2025 全年交付</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 2026 上半年（回到现在） ============ */

const Now2026: React.FC<{f: number}> = ({f}) => {
  const x = X.now26;
  return (
    <>
      <At f={f} at={cf(81) - 6}>
        <Put x={x - 700} y={50}>
          <Label size={28} bg={V.red}>
            2026 上半年 · 4678 亿
          </Label>
        </Put>
      </At>
      <At f={f} at={cf(82)}>
        <Put x={x - 700} y={120}>
          <PostIt w={330} rot={-2} head="史上最好的上半年" size={26}>
            超过 2020 年同期的
            <br />
            4507 亿
          </PostIt>
        </Put>
      </At>
      <At f={f} at={cf(83)}>
        <Put x={x - 700} y={400}>
          <Label size={30} bg={V.hiSolid} color={V.ink}>
            中国手机市场 第一
          </Label>
        </Put>
      </At>
      <At f={f} at={cw(84, '20.6')}>
        <Put x={x - 700} y={480}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
            <div style={{fontFamily: VF.num, fontSize: 104, color: V.ink, lineHeight: 1}}>20.6%</div>
            <div style={{fontFamily: VF.heavy, fontSize: 36, color: V.ink}}>2760 万台</div>
          </div>
        </Put>
      </At>
      <At f={f} at={cw(85, '37')}>
        <Put x={x - 300} y={120}>
          <IndexCard w={460} h={220} rot={2}>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: -14}}>归母净利润</div>
            {/* 别写成「234 亿 · −37%」：460 宽的卡片放不下，会折成两行把第三行顶出卡片 */}
            <div style={{fontFamily: VF.heavy, fontSize: 58, color: V.red, lineHeight: 1.15}}>234 亿</div>
            <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 22, color: V.ink, marginTop: 2}}>同比 −37% · 净利率 5.0%</div>
          </IndexCard>
        </Put>
      </At>
      <At f={f} at={cf(86)}>
        <Put x={x + 220} y={330}>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, whiteSpace: 'nowrap'}}>研发</div>
          {/* 数字放进条里用 flex 居中，不要用负 marginTop 压上去——负 margin 会把后面几行的流也一起上移，
              而且文字会顶在条的上沿、左边还压着条边。 */}
          <div style={{width: 380, height: 46, background: V.red, marginTop: 4, display: 'flex', alignItems: 'center', paddingLeft: 14, boxSizing: 'border-box'}}>
            <span style={{fontFamily: VF.num, fontSize: 30, color: V.paper, lineHeight: 1}}>1213 亿</span>
          </div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 26, color: V.ink, marginTop: 22}}>净利</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 4}}>
            <div style={{width: 74, height: 46, background: V.ink}} />
            <span style={{fontFamily: VF.num, fontSize: 30, color: V.ink, lineHeight: 1}}>234 亿</span>
          </div>
          <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: V.inkSoft, marginTop: 12}}>一个上半年，五个净利润</div>
        </Put>
      </At>
    </>
  );
};

/* ============ 结尾：一条营收线看完 39 年 ============ */

const MiniChart: React.FC<{f: number}> = ({f}) => {
  if (f < cf(87) || f >= cf(90)) return null;
  const x0 = 300;
  const x1 = 1230;
  const t0 = 1988;
  const t1 = 2025;
  const sx = (y: number) => x0 + ((y - t0) / (t1 - t0)) * (x1 - x0);
  const sy = (v: number) => 720 - (Math.log10(v) - Math.log10(0.05)) * 120;
  const pts = CAP.map(([y, v]) => [sx(y), sy(v)] as [number, number]);
  const p = p12(f, cf(87), 26);
  // 2002 和 2003 在横轴上只差 25px、纵轴只差 19px，默认位置两块牌子会完全叠住，
  // 所以每个标注单独给了 dx/dy：2002 往左下、2003 往右上，错开 45px 以上。
  const dips: [number, number, string, number?, number?][] = [
    [2002, 221, '2002 · 唯一下滑', -120, 52],
    [2003, 317, '2003 · 思科', 34, -52],
    [2021, 6368, '2021 · 断供'],
  ];
  return (
    <div style={{position: 'absolute', left: 120, top: 70, width: 1680, height: 800, background: V.card, boxShadow: '4px 8px 14px rgba(23,23,22,0.4)'}}>
      <div style={{position: 'absolute', left: 60, top: 36, fontFamily: VF.heavy, fontSize: 40, color: V.paper}}>从 2.1 万块，到 8809 亿</div>
      <div style={{position: 'absolute', left: 60, top: 94, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 24, color: 'rgba(238,237,237,0.6)'}}>华为历年销售收入 1988–2025 · 对数刻度，示意</div>
      <svg width={1680} height={800} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
        <path d={`M${x0} 750 L${x1 + 30} 750`} stroke="rgba(238,237,237,0.5)" strokeWidth={3} />
        {[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
          <text key={y} x={sx(y)} y={792} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={26} fill="rgba(238,237,237,0.7)">
            {y}
          </text>
        ))}
        <HandLine points={pts} p={p} width={8} />
      </svg>
      {f >= cf(88) &&
        dips.map(([y, v, t, dx = 0, dy = 0], i) => (
          <div key={t} style={{position: 'absolute', left: sx(y) - 60 + dx, top: sy(v) + 18 + dy, opacity: f >= cf(88) + i * 8 ? 1 : 0}}>
            <Label size={22} bg={V.red}>
              {t}
            </Label>
          </div>
        ))}
      {f >= cf(88) && (
        <div style={{position: 'absolute', left: 1300, top: 220, width: 320, fontFamily: VF.serifCn, fontWeight: 700, fontSize: 31, color: V.paper, lineHeight: 1.5}}>
          它没上市，
          <br />
          没有市值可以讲。
          <br />
          <span style={{color: V.hiSolid}}>钱都换成了</span>
          <br />
          <span style={{color: V.hiSolid}}>专利、产线和人。</span>
        </div>
      )}
    </div>
  );
};

/* ============ 结尾黑卡 ============ */

const EndCard: React.FC<{f: number}> = ({f}) =>
  f < cf(90) ? null : (
    <div style={{position: 'absolute', inset: 0}}>
      <Desk w={W} h={H} seed={12} />
      <div style={{position: 'absolute', left: 90, top: 70, width: W - 180, height: H - 260, background: V.card, boxShadow: '3px 6px 10px rgba(23,23,22,0.28)'}} />
      <div style={{position: 'absolute', left: 200, top: 230, color: V.paper}}>
        <Label size={44} bg={V.red}>
          华为 39 年 · 1987–2026
        </Label>
        <div style={{fontFamily: VF.heavy, fontSize: 112, marginTop: 40}}>
          <TypeOn f={f} at={cf(90)} text="下一段路，才刚开始" cps={10} cursor={false} />
        </div>
      </div>
      <Underline f={f} at={cf(90) + 20} x={200} y={570} w={980} />
      <div style={{position: 'absolute', right: 250, top: 250, transform: 'rotate(6deg)'}}>
        <Sticker>
          <PetalMark s={190} />
        </Sticker>
      </div>
    </div>
  );

/* ============ 年份计数器 ============ */

const YEAR_STOPS: [number, number, number?][] = [
  [0, 2026],
  // 2026 → 1987 的倒带跟相机飞回起点同时发生（cf(7)+18 → cf(9)-6，约 120 帧），
  // 不能等相机落地再滚一次，否则计数会先跳到 2026 再往下滚，闪一下。
  [cf(7) + 18, 1987, cf(9) - 6 - (cf(7) + 18)],
  [cf(16) - 6, 1991],
  [cf(22) - 6, 1993],
  [cf(23) - 6, 1995],
  [cf(29) - 6, 2000],
  [cf(35) - 6, 2002],
  [cf(36) - 6, 2003],
  [cf(43) - 6, 2004],
  [cf(45) - 6, 2005],
  [cf(47) - 6, 2010],
  [cf(49) - 6, 2011],
  [cf(56) - 6, 2014],
  [cf(57) - 6, 2018],
  [cf(60) - 6, 2019],
  [cf(64) - 6, 2020],
  [cf(67) - 6, 2021],
  [cf(71) - 6, 2023],
  [cf(77) - 6, 2025],
  [cf(81) - 6, 2026],
];

const Hud: React.FC<{f: number; z: number}> = ({f, z}) => {
  if (f < cf(1) || f >= cf(87) || z < 0.32) return null;
  // 年份只用 rollYear 推，不再跟相机横坐标走：tracking 结束的瞬间 rollYear 会从自己的
  // 上一个 stop（2026）重新滚一遍，画面上表现为 1987 闪回 2026 再滚下来。
  // 倒带的观感交给 YEAR_STOPS 里那条 120 帧的长 roll。
  const year = rollYear(f, YEAR_STOPS, step12);
  return <YearCounter year={year} from={1987} to={2026} title="华为 39 年" bands={[[2000.9, 2002.9], [2019.3, 2021.9]]} bandColor="rgba(184,67,63,0.75)" />;
};

/* ============ 整片 ============ */

export const Film: React.FC<{f: number}> = ({f}) => {
  const cam = camAt(f, CAM);
  const [l0, l1] = lineSpan(f, cam.x);
  return (
    <>
      <World cam={cam} w={W} h={H}>
        <Desk w={WORLD_W} h={WORLD_H + 400} color={V.oldMap} seed={11} />
        <DeskLitter x0={300} x1={WORLD_W - 300} y0={-40} y1={1000} count={78} seed={31} />
        <CapGrid />
        <Ruler />
        <CapLine x0={l0} x1={l1} />
        <Now f={f} />
        <Founding f={f} />
        <Bench f={f} />
        <Law f={f} />
        <Winter f={f} />
        <Cisco f={f} />
        <Hisi f={f} />
        <Global f={f} />
        <Top500 f={f} />
        <Phone2012 f={f} />
        <Peak2019 f={f} />
        <Honor f={f} />
        <Crash f={f} />
        <Mate60 f={f} />
        <Y2025 f={f} />
        <Now2026 f={f} />
        {[
          [X.found - 600, 92],
          [X.cc08 + 180, 100],
          [X.law - 620, 380],
          [X.peak + 640, 96],
          [X.m60 + 320, 560],
        ].map(([x, y]) => (
          <div key={x} style={{position: 'absolute', left: x - 17, top: y - 17}}>
            <Pushpin />
          </div>
        ))}
      </World>
      <Hud f={f} z={cam.z} />
      <MiniChart f={f} />
      <EndCard f={f} />
    </>
  );
};

/* ============ 音效 ============ */

export const FILM_SFX: SfxCue[] = [
  ['paper', cf(1), 0.3],
  ['ding', cf(2), 0.35],
  ['stamp', cw(3, '五分之一'), 0.35],
  ['magic', cf(4), 0.35],
  ['paper', cf(5), 0.3],
  ['error', cf(6), 0.32],
  ['question', cf(7), 0.35],
  ['whoosh', cf(7) + 10, 0.4],
  ['paper', cf(9) - 4, 0.3],
  ['pop', cf(10), 0.3],
  ['type', cf(11), 0.3],
  ['pop', cf(12), 0.3],
  ['click', cf(13), 0.3],
  ['paper', cf(15), 0.28],
  ['whoosh', cf(16) - 26, 0.3],
  ['paper', cf(16), 0.3],
  ['stamp', cf(17), 0.32],
  ['type', cf(19), 0.3],
  ['ding', cf(22), 0.35],
  ['whoosh', cf(23) - 26, 0.3],
  ['ding', cf(23), 0.32],
  ['stamp', cf(24), 0.3],
  ['paper', cf(25), 0.3],
  ['type', cf(26), 0.3],
  ['paper', cf(27), 0.3],
  ['whoosh', cf(29) - 26, 0.3],
  ['ding', cf(29), 0.32],
  ['type', cf(30), 0.3],
  ['error', cf(31), 0.34],
  ['stamp', cf(33), 0.34],
  ['pop', cf(34), 0.3],
  ['error', cw(35, '221'), 0.38],
  ['shake', cw(35, '221') + 6, 0.32],
  ['whoosh', cf(36) - 26, 0.35],
  ['stamp', cf(36), 0.42],
  ['paper', cf(38), 0.3],
  ['shake', cf(39), 0.34],
  ['stamp', cf(41), 0.36],
  ['ding', cf(42), 0.35],
  ['whoosh', cf(43) - 24, 0.3],
  ['paper', cf(43), 0.3],
  ['magic', cf(44), 0.35],
  ['whoosh', cf(45) - 24, 0.3],
  ['pop', cf(45), 0.3],
  ['ding', cf(46), 0.32],
  ['confetti', cf(47), 0.35],
  ['stamp', cf(48), 0.4],
  ['whoosh', cf(49) - 26, 0.3],
  ['paper', cf(49), 0.3],
  ['click', cf(50), 0.3],
  ['error', cf(52), 0.34],
  ['type', cf(53), 0.3],
  ['pop', cf(54), 0.3],
  ['whoosh', cf(56) - 26, 0.3],
  ['ding', cf(56), 0.36],
  ['whoosh', cf(57) - 26, 0.3],
  ['confetti', cf(57), 0.34],
  ['ding', cf(58), 0.32],
  ['magic', cf(59), 0.35],
  ['error', cf(60), 0.4],
  ['shake', cf(60) + 8, 0.34],
  ['error', cf(61), 0.36],
  ['magic', cf(62), 0.34],
  ['whoosh', cw(63, '鸿蒙') - 10, 0.32],
  ['ding', cw(63, '鸿蒙'), 0.36],
  ['whoosh', cf(64) - 28, 0.32],
  ['paper', cf(64), 0.3],
  ['paper', cf(65), 0.28],
  ['ding', cf(66), 0.34],
  ['error', cf(67), 0.42],
  ['shake', cf(67) + 6, 0.35],
  ['error', cf(68), 0.36],
  ['paper', cw(69, '3500'), 0.3],
  ['ding', cf(70), 0.32],
  ['whoosh', cf(71) - 28, 0.34],
  ['ding', cf(71), 0.34],
  ['type', cf(72), 0.3],
  ['question', cf(73), 0.3],
  ['magic', cw(74, '麒麟'), 0.42],
  ['paper', cf(75), 0.3],
  ['confetti', cf(76), 0.35],
  ['whoosh', cf(77) - 28, 0.3],
  ['ding', cf(77), 0.34],
  ['magic', cw(78, '105'), 0.34],
  ['pop', cf(79), 0.3],
  ['whoosh', cf(80) - 24, 0.3],
  ['pop', cf(80), 0.32],
  ['whoosh', cf(81) - 28, 0.32],
  ['ding', cf(81), 0.34],
  ['paper', cf(82), 0.3],
  ['stamp', cf(83), 0.4],
  ['magic', cw(84, '20.6'), 0.36],
  ['error', cw(85, '37'), 0.36],
  ['type', cf(86), 0.32],
  ['paper', cf(87), 0.35],
  ['ding', cf(88), 0.34],
  ['paper', cf(90), 0.35],
];
