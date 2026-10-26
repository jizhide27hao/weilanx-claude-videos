import React from 'react';
import {BookCite, YearHeader} from '../../library/gilded/stage';
import {Parchment} from '../../library/gilded/props';
import {Figure, KV, MiniTable, Note, Page, RuleFade, Soft, Tag, VLine, HLine, Ruler, BarsV} from '../../library/gilded/kit';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/**
 * ep53 暗金文献版 · 第一幕（P01–P12）
 * 刀口 → 三次生死 → 1987 起家 → 代理 → 自研 → 立规矩 → 冬天
 *
 * 每页只吃一个 t（页内帧，0 = 切点）。元素出场一律柔入，换页靠顶层交叉淡化。
 */

/* ══ P01 · 2026 上半年：赚 234 / 花 1,213 / 只有五分之一 ══════════════
   全片的「钱眼」：两个数字、一条中缝、一句比例注脚，一开始就各就各位，
   观众什么时候看哪边都行，不靠出场顺序牵着走。 */
export const P01: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={6} year="2026" caption="深圳 · 上半年" rollAt={10} prev="2025" />
    <BookCite f={t} at={14} original="Huawei Investment & Holding — 2026 Interim Report" title="华为投资控股 2026 年半年度报告" meta="营收 4,678 亿 · 归母净利 234 亿 · 研发 1,213 亿" seal="半年" />

    <VLine f={t} at={56} x={960} y0={232} y1={648} dur={30} />

    <Figure f={t} at={22} x={200} y={252} w={560} label="归 母 净 利 润" value="234" size={300} unit="亿元" />
    <Figure f={t} at={112} labelAt={64} x={1120} y={252} w={560} label="研 发 投 入" value="1,213" size={244} unit="亿元" />

    <Soft f={t} at={226} dur={24} style={{left: 810, top: 676, width: 300, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 88, lineHeight: 1, ...goldTextLight(0.3)}}>19.3%</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 4, color: G.ivoryFaint, marginTop: 6}}>净利 ÷ 研发</div>
    </Soft>

    <RuleFade f={t} at={150} x={200} y={858} w={1520} dur={18} />
    <Note f={t} at={186} x={200} y={880} w={640} text="口径：归母净利润 234.28 亿元，研发费用 1,213 亿元；半年度，未经审计调整。" />
  </>
);

/* ══ P02 · 近十年投了 1.38 万亿 ═══════════════════════════════════
   一排柱子说「年年加码」，只给最后一根挂读数——多给一个数都是噪音。 */
const RD: [string, number][] = [
  ['16', 764],
  ['17', 897],
  ['18', 1015],
  ['19', 1317],
  ['20', 1419],
  ['21', 1427],
  ['22', 1615],
  ['23', 1647],
  ['24', 1797],
  ['25', 1923],
];

export const P02: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2025" caption="深圳 · 十年研发账" />
    <BookCite f={t} at={12} original="Huawei Investment & Holding — Annual Report 2025" title="华为投资控股 2025 年年度报告" meta="近十年研发投入累计 13,820 亿元" seal="年报" />

    <Soft f={t} at={10} dur={20} style={{left: 0, right: 0, top: 150, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 18, color: G.ivoryDim}}>近 十 年 · 研 发 投 入 累 计</div>
    </Soft>
    <Soft f={t} at={18} dur={24} style={{left: 0, right: 0, top: 222, textAlign: 'center'}}>
      <span style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, letterSpacing: 2, ...goldText(0.85)}}>1.38</span>
      <span style={{fontFamily: GF.cn, fontSize: 50, letterSpacing: 12, color: G.gold, marginLeft: 20}}>万亿</span>
    </Soft>

    <HLine f={t} at={30} x={320} y={800} w={1280} dur={26} />
    <BarsV f={t} at={36} x={320} base={800} data={RD} max={1923} bw={96} gap={40} hMax={186} hot={9} labelSize={17} valueSize={26} vals={RD.map(([, v], i) => (i === 9 ? '1,923' : ''))} />

    <Soft f={t} at={70} dur={20} style={{left: 1080, top: 552, width: 520, textAlign: 'right'}}>
      <div style={{fontFamily: GF.cn, fontSize: 17, color: G.ivoryFaint, letterSpacing: 2}}>2025 单年 · 占营收 21.8%</div>
    </Soft>

    <RuleFade f={t} at={52} x={320} y={832} w={1280} dur={18} />
    <Note f={t} at={92} x={320} y={856} w={760} text="按十年 3,653 天折算，日均约 3.8 亿元。柱高为各年研发费用（亿元），坐标自 2016 年起。" />
  </>
);

/* ══ P03 · 三十九年，三次差点没过去（目录页） ═══════════════════════
   三栏只报年份、事件和那个最狠的数；底下一条 39 年的轴已经铺开，
   下一句「把时间线拉出来看」正好落在轴上。 */
export const P03: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="三十九年 · 三次生死" />

    <Soft f={t} at={8} dur={24} style={{left: 152, top: 176}}>
      <div style={{fontFamily: GF.cn, fontSize: 58, letterSpacing: 8, color: G.ivory}}>三十九年里</div>
    </Soft>
    <Soft f={t} at={20} dur={26} style={{left: 146, top: 248}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 116, letterSpacing: 10, lineHeight: 1.1, ...goldText(0.9)}}>三次差点没过去</div>
    </Soft>

    <Soft f={t} at={92} dur={20} style={{left: 1100, top: 226, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        每一次都不是「业绩不好」，
        <br />
        是这家公司差一点就不存在了。
      </div>
    </Soft>

    {/* 三栏：年份 + 事件先立起来（headAt），数字按顺序填 */}
    {[
      {x: 170, year: '2002', event: '华为的冬天', num: '−13%', detail: '营收 221 亿 · 史上唯一负增长', red: true},
      {x: 720, year: '2003', event: '思科起诉', num: '21 项', detail: '77 页起诉书 · 次年和解', red: false},
      {x: 1270, year: '2019', event: '进实体清单', num: '68 家', detail: '5 月 16 日 · 手机海外腰斩', red: false},
    ].map((c, i) => (
      <React.Fragment key={c.year}>
        <Soft f={t} at={34} dur={20} style={{left: c.x, top: 396, width: 380}}>
          <div style={{fontFamily: GF.num, fontSize: 62, lineHeight: 1, letterSpacing: 4, ...goldText(0.45)}}>{c.year}</div>
          <div style={{width: 380, height: 1, margin: '12px 0 14px', background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.15))`}} />
          <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 5, color: G.ivoryDim}}>{c.event}</div>
        </Soft>
        <Soft f={t} at={52 + i * 12} dur={22} style={{left: c.x, top: 548, width: 380}}>
          <div style={{fontFamily: GF.num, fontSize: 92, lineHeight: 1.1, ...(c.red ? {color: G.red, textShadow: '0 0 24px rgba(200,81,60,0.5)'} : goldText(0.6))}}>{c.num}</div>
          <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>{c.detail}</div>
        </Soft>
      </React.Fragment>
    ))}

    <RuleFade f={t} at={60} x={170} y={700} w={1560} dur={18} />
    <Ruler f={t} at={70} x={200} y={782} w={1520} ticks={['1987', '1997', '2007', '2017', '2026']} dur={90} />
  </>
);

/* ══ P04 · 1987 年 9 月，2.1 万元 ═════════════════════════════════
   左边一张设立登记，右边一个数字。文书证明数字，数字替文书说话。 */
export const P04: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1987" caption="深圳 · 六个人凑的本钱" />
    <BookCite f={t} at={12} original="Shenzhen Company Registry, 1987" title="深圳市华为技术有限公司 · 设立登记" meta="注册资本 21,000 元 · 出资人 6 名" seal="登记" />

    <VLine f={t} at={40} x={846} y0={250} y1={762} dur={26} />

    <Soft f={t} at={18} dur={24} style={{left: 200, top: 330}}>
      <Parchment
        title="创 办 出 资"
        sub="Shenzhen, September 1987"
        rows={[
          ['出资人', '6 名'],
          ['注册资金', '21,000 元'],
          ['起步业务', '交换机代理'],
          ['法定代表人', '任正非'],
        ]}
        foot={['1987.09', '深圳']}
        w={460}
        rot={-3}
        fs={19}
      />
    </Soft>

    <Figure f={t} at={54} x={920} y={296} w={800} label="注 册 资 金" value="21,000" size={198} unit="元" />

    <Soft f={t} at={100} dur={22} style={{left: 924, top: 646, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivory}}>
        约 <span style={{...goldTextLight(0.25), letterSpacing: 1}}>2.1 万元</span>
        <span style={{color: G.ivoryFaint, fontSize: 24}}> · 43 岁的任正非凑出来的</span>
      </div>
    </Soft>

    <RuleFade f={t} at={70} x={200} y={790} w={1520} dur={18} />
    <Note f={t} at={118} x={200} y={818} w={720} text="注册资本与出资人数取自公开的工商登记口径；1990 年前的公司名用过「深圳市华为技术有限公司」。" />
  </>
);

/* ══ P05 · 名字取自「中华有为」 ═══════════════════════════════════
   一整页只讲两个字：四个字横排，把「华」和「为」框出来，其余的压暗。 */
const NAMING = ['中', '华', '有', '为'];
const CH = 132;
const GAPC = 34;
const NL = (1920 - (CH * 4 + GAPC * 3)) / 2;

export const P05: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="1987" caption="深圳 · 这家公司叫什么" />

    <Soft f={t} at={6} dur={20} style={{left: 0, right: 0, top: 320, textAlign: 'center'}}>
      <div style={{fontFamily: GF.latinItalic, fontSize: 20, color: G.ivoryFaint, letterSpacing: 8}}>NAMING</div>
    </Soft>

    {NAMING.map((ch, i) => {
      const picked = i === 1 || i === 3;
      return (
        <Soft key={i} f={t} at={8 + i * 8} dur={20} style={{left: NL + i * (CH + GAPC), top: 400}}>
          <div style={{width: CH, textAlign: 'center', fontFamily: GF.cn, fontWeight: 700, fontSize: CH, lineHeight: 1, color: picked ? G.ivory : 'rgba(239,230,210,0.42)'}}>{ch}</div>
        </Soft>
      );
    })}

    {/* 两个框分别落在「华」「为」上，第二笔慢一点，像圈批 */}
    {[1, 3].map((i, k) => {
      const left = NL + i * (CH + GAPC) - 20;
      const at = 46 + k * 26;
      const p = Math.min(1, Math.max(0, (t - at) / 20));
      if (p <= 0) return null;
      return (
        <div key={i} style={{position: 'absolute', left, top: 382, width: CH + 40, height: CH + 40, border: `1.5px solid ${G.gold}`, opacity: p, boxShadow: `0 0 22px rgba(214,180,106,${0.18 * p})`}} />
      );
    })}

    <Soft f={t} at={92} dur={22} style={{left: 0, right: 0, top: 622, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 10, color: G.ivory}}>
        中华有为 <span style={{color: G.ivoryFaint, fontSize: 24, letterSpacing: 4}}>→</span> <span style={{...goldTextLight(0.3), letterSpacing: 6}}>华为</span>
      </div>
    </Soft>

    <Soft f={t} at={110} dur={20} style={{left: 0, right: 0, top: 706, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 3, color: G.ivoryFaint}}>公司全称：深圳市华为技术有限公司</div>
    </Soft>
  </>
);

/* ══ P06 · 从香港买，转手卖给县邮电局 ═════════════════════════════
   一条链三个人：供货、转手、客户。中间那格是华为——一个纯转手的中间商。 */
export const P06: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1988" caption="深圳 · 一间做代理的公司" />

    <Soft f={t} at={8} dur={20} style={{left: 160, top: 176, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 6, color: G.ivory}}>
        从香港买，转手卖给县邮电局
      </div>
    </Soft>

    {/* 三个节点 */}
    {[
      {x: 240, up: '供 货', name: '香 港', sub: '原装交换机', hot: false},
      {x: 830, up: '转 手', name: '华 为', sub: '十几个人', hot: true},
      {x: 1420, up: '客 户', name: '县邮电局', sub: '基层电信采购', hot: false},
    ].map((n, i) => (
      <React.Fragment key={n.name}>
        <Soft f={t} at={26 + i * 12} dur={22} style={{left: n.x, top: 340, width: 260}}>
          <div style={{fontFamily: GF.cn, fontSize: 18, letterSpacing: 8, color: n.hot ? G.gold : G.ivoryFaint, textAlign: 'center'}}>{n.up}</div>
        </Soft>
        <Soft f={t} at={32 + i * 12} dur={24} style={{left: n.x, top: 380, width: 260}}>
          <div
            style={{
              height: 132,
              border: `1px solid ${n.hot ? G.gold : G.goldFaint}`,
              background: n.hot ? 'rgba(214,180,106,0.07)' : 'rgba(10,8,5,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 42, letterSpacing: 6, color: n.hot ? G.goldBright : G.ivory}}>{n.name}</div>
            <div style={{fontFamily: GF.cn, fontSize: 17, letterSpacing: 2, color: G.ivoryFaint}}>{n.sub}</div>
          </div>
        </Soft>
      </React.Fragment>
    ))}

    {/* 两条箭头 */}
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {[
        {x0: 512, x1: 818, at: 56, lab: '买入'},
        {x0: 1102, x1: 1408, at: 74, lab: '卖出'},
      ].map((a) => {
        const p = Math.min(1, Math.max(0, (t - a.at) / 22));
        if (p <= 0) return null;
        return (
          <g key={a.lab} opacity={p}>
            <line x1={a.x0} y1={446} x2={a.x0 + (a.x1 - a.x0) * p} y2={446} stroke={G.gold} strokeWidth={1.4} />
            <path d={`M${a.x0 + (a.x1 - a.x0) * p - 10} 440 L${a.x0 + (a.x1 - a.x0) * p} 446 L${a.x0 + (a.x1 - a.x0) * p - 10} 452`} fill="none" stroke={G.gold} strokeWidth={1.4} />
            <text x={(a.x0 + a.x1) / 2} y={428} textAnchor="middle" fontFamily={GF.cn} fontSize={17} letterSpacing={5} fill={G.ivoryFaint}>
              {a.lab}
            </text>
          </g>
        );
      })}
    </svg>

    <Soft f={t} at={110} dur={22} style={{left: 830, top: 540, width: 260, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.gold}}>差价，就是全部利润</div>
    </Soft>

    <RuleFade f={t} at={96} x={240} y={622} w={1440} dur={18} />
    <KV f={t} at={112} x={240} y={652} w={1440} gap={50} rows={[['自有产品', '无'], ['技术团队', '无'], ['价格话语权', '无'], ['客户关系', '县邮电局']]} hot={[3]} />

    <Note f={t} at={190} x={240} y={846} w={900} text="1988 年起以代理香港产交换机（如 HJD48 一类用户机）为主要收入，1990 年才转向自研。" />
  </>
);

/* ══ P07 · 货是别人的，价格也是别人的 ═════════════════════════════
   全片第一句「引文」。上半句和下半句跟着口播分两次落下。 */
export const P07: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="1989" caption="深圳 · 代理做久了" />

    <Soft f={t} at={10} dur={26} style={{left: 0, right: 0, top: 216, textAlign: 'center'}}>
      <div style={{fontFamily: GF.latinItalic, fontSize: 21, color: G.ivoryFaint, letterSpacing: 6}}>« nothing here is ours »</div>
    </Soft>

    <Soft f={t} at={16} dur={26} style={{left: 0, right: 0, top: 270, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 82, letterSpacing: 6, color: G.ivory}}>货是别人的，</div>
    </Soft>
    <Soft f={t} at={88} dur={26} style={{left: 0, right: 0, top: 380, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 82, letterSpacing: 6, ...goldTextLight(0.3)}}>价格也是别人的</div>
    </Soft>

    <Soft f={t} at={124} dur={24} style={{left: 0, right: 0, top: 500, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 8, color: G.red}}>没有一样是自己的</div>
    </Soft>

    <RuleFade f={t} at={60} x={470} y={592} w={980} dur={18} />
    <KV f={t} at={70} x={480} y={636} w={960} gap={52} size={26} rows={[['货', '从香港买进来'], ['价', '卖方说了算'], ['人', '十几个人，没有产品']]} />
  </>
);

/* ══ P08 · 1990，他站在五楼的窗边 ════════════════════════════════
   全片最重的一页。左半边一栋楼（五层到底），右半边那句原话。
   楼里不画人，只画一层被框住的窗和一条落到地面的虚线。 */
const FLOOR_Y = [640, 520, 400, 280, 160]; // 1F 地面 → 5F 窗台

export const P08: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1990" caption="深圳 · 决定自己研制" />

    {/* 楼剖面 */}
    <Soft f={t} at={26} dur={26} style={{left: 150, top: 150}}>
      <svg width={480} height={540} style={{overflow: 'visible'}}>
        <rect x={2} y={2} width={456} height={498} fill="rgba(10,8,5,0.45)" stroke={G.goldFaint} strokeWidth={1} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={2} y1={100 * (i + 1)} x2={458} y2={100 * (i + 1)} stroke="rgba(214,180,106,0.22)" strokeWidth={1} />
        ))}
        {Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 7 }, (_, c) => (
            <rect key={`${r}-${c}`} x={26 + c * 60} y={100 * r + 26} width={34} height={44} fill="none" stroke="rgba(239,230,210,0.16)" strokeWidth={1} />
          )),
        )}
        {/* 五楼那扇窗 */}
        <rect x={26 + 3 * 60 - 6} y={20} width={46} height={56} fill="rgba(214,180,106,0.14)" stroke={G.gold} strokeWidth={1.6} />
        <circle cx={26 + 3 * 60 + 17} cy={48} r={4} fill={G.red} style={{filter: `drop-shadow(0 0 8px ${G.red})`}} />
        {/* 从五楼落到地面的一条虚线 */}
        <line x1={26 + 3 * 60 + 17} y1={80} x2={26 + 3 * 60 + 17} y2={498} stroke="rgba(200,81,60,0.42)" strokeWidth={1} strokeDasharray="3 7" />
        <line x1={-30} y1={500} x2={488} y2={500} stroke={G.gold} strokeWidth={1.2} />
        <text x={-12} y={92} textAnchor="end" fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>5F</text>
        <text x={-12} y={492} textAnchor="end" fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>1F</text>
      </svg>
    </Soft>

    <Soft f={t} at={112} dur={20} style={{left: 150, top: 706, width: 480, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.ivoryDim}}>五楼 · 动员会</div>
    </Soft>

    <VLine f={t} at={96} x={700} y0={226} y1={806} dur={24} />

    <Soft f={t} at={16} dur={24} style={{left: 750, top: 226, width: 1020}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>1990 年 · 他自己上台讲</div>
    </Soft>

    <Soft f={t} at={100} dur={28} style={{left: 750, top: 300, width: 1020}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 62, lineHeight: 1.5, color: G.ivory}}>研发成了，</div>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 62, lineHeight: 1.5, color: G.ivory}}>大家都有发展</div>
    </Soft>

    <Soft f={t} at={196} dur={28} style={{left: 750, top: 512, width: 1020}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 62, lineHeight: 1.5, color: G.ivory}}>研发败了，</div>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 62, lineHeight: 1.5, ...goldTextLight(0.32)}}>我只有从楼上跳下去</div>
    </Soft>

    <Soft f={t} at={286} dur={22} style={{left: 750, top: 806, width: 1020}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint}}>—— 转述自当事人回忆与多方访谈，字句以流传版本为准</div>
    </Soft>

    <RuleFade f={t} at={150} x={150} y={862} w={1620} dur={18} />
  </>
);

/* ══ P09 · 1993，C&C08；1995，15 亿 ══════════════════════════════
   左边一个型号，右边三年三级。型号是「东西做出来了」，KV 是「钱跟着来了」。 */
export const P09: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1993" caption="深圳 · 第一台自己造的交换机" />

    <Soft f={t} at={8} dur={24} style={{left: 200, top: 268}}>
      <div style={{fontFamily: GF.latinBold, fontSize: 138, letterSpacing: 4, ...goldText(0.7)}}>C&C08</div>
    </Soft>
    <Soft f={t} at={30} dur={22} style={{left: 206, top: 420, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 6, color: G.ivory}}>数字程控交换机</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 12, lineHeight: 1.7}}>
        1992 年立项，1993 年出来。
        <br />
        这是华为第一个自己的产品。
      </div>
    </Soft>

    <VLine f={t} at={44} x={900} y0={266} y1={760} dur={26} />

    <Soft f={t} at={50} dur={22} style={{left: 950, top: 266, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 8, color: G.gold}}>销 售 额 · 亿 元</div>
    </Soft>
    <MiniTable
      f={t}
      at={58}
      x={950}
      y={318}
      w={720}
      head={['年份', '销售额', '相对 1992']}
      rows={[
        ['1992', '1.0', '1×'],
        ['1993', '4.1', '4×'],
        ['1995', '15', '15×'],
      ]}
      colW={[200, 240, 280]}
      size={30}
      rowH={78}
    />

    <Soft f={t} at={98} dur={24} style={{left: 950, top: 620, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, color: G.ivoryDim}}>
        三年，十五倍——
        <span style={{...goldTextLight(0.25)}}>队伍也是从这个数字开始乱的</span>
      </div>
    </Soft>

    <RuleFade f={t} at={70} x={200} y={816} w={1520} dur={18} />
    <Note f={t} at={120} x={200} y={844} w={880} text="1992 年销售额 1 亿元、1993 年 4.1 亿元为公开讲话口径，1995 年 15 亿元为公司口径。" />
  </>
);

/* ══ P10 · 1996：集体辞职，起草基本法 ═════════════════════════════
   两份文书并排。左边是「人怎么动」，右边是「规矩怎么立」。 */
export const P10: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="1996" caption="深圳 · 队伍和规矩" />

    <Soft f={t} at={6} dur={22} style={{left: 0, right: 0, top: 176, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.ivory}}>钱来得快，队伍也乱得快</div>
    </Soft>

    <Soft f={t} at={40} dur={24} style={{left: 200, top: 320}}>
      <Parchment
        title="集 体 辞 职"
        sub="Marketing Dept., 1996"
        rows={[
          ['时间', '1996 年'],
          ['动作', '集体辞职'],
          ['再', '重新竞聘'],
          ['对象', '市场部干部'],
        ]}
        foot={['1996', '深圳']}
        w={440}
        rot={-2.5}
        fs={19}
      />
    </Soft>

    <Soft f={t} at={62} dur={24} style={{left: 1170, top: 320}}>
      <Parchment
        title="华 为 基 本 法"
        sub="Huawei Basic Law"
        rows={[
          ['起草', '1996 年'],
          ['定稿', '1998 年'],
          ['条文', '103 条'],
          ['执笔', '人大教授团队'],
        ]}
        foot={['1996—1998', '深圳']}
        w={440}
        rot={2.5}
        fs={19}
      />
    </Soft>

    <VLine f={t} at={54} x={960} y0={320} y1={700} dur={22} />
    <Soft f={t} at={66} dur={20} style={{left: 900, top: 478, width: 120, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 4, color: G.gold, whiteSpace: 'nowrap'}}>同年</div>
    </Soft>

    <KV f={t} at={100} x={430} y={726} w={400} gap={40} rows={[['干部能上能下', '✔'], ['工资能升能降', '✔']]} size={20} />
    <KV f={t} at={112} x={1080} y={726} w={510} gap={40} rows={[['从「人治」到「法」', '103 条'], ['核心价值观', '写进条文']]} size={20} />

    <RuleFade f={t} at={90} x={232} y={852} w={1456} dur={18} />
  </>
);

/* ══ P11 · 1998：花大钱请 IBM 教怎么管项目 ════════════════════════
   一页只讲「学的不是设备，是流程」。左边给顾问一个体面的位置。 */
export const P11: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="1998" caption="深圳 · 请人教怎么管项目" />

    <Soft f={t} at={10} dur={24} style={{left: 200, top: 300}}>
      <div style={{fontFamily: GF.latinBold, fontSize: 190, lineHeight: 1, letterSpacing: 2, ...goldText(0.7)}}>IBM</div>
    </Soft>
    <Soft f={t} at={36} dur={22} style={{left: 206, top: 526, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 5, color: G.ivory}}>请进来的顾问</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>不是买设备，是买一套做项目的方法</div>
    </Soft>

    <VLine f={t} at={46} x={900} y0={290} y1={770} dur={26} />

    <Soft f={t} at={52} dur={22} style={{left: 950, top: 290, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 8, color: G.gold}}>学 的 是 什 么</div>
    </Soft>
    <KV
      f={t}
      at={64}
      x={950}
      y={344}
      w={720}
      gap={62}
      size={26}
      rows={[
        ['一个项目怎么立项', '评审'],
        ['一个项目怎么分工', '角色'],
        ['一个项目怎么交付', '阶段'],
        ['这套东西后来叫什么', 'IPD'],
      ]}
      hot={[3]}
    />

    <Soft f={t} at={118} dur={24} style={{left: 950, top: 648, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryDim}}>
        华为后来把它改成了自己的流程，
        <br />
        <span style={{...goldTextLight(0.22)}}>但骨架是这次学会的。</span>
      </div>
    </Soft>

    <RuleFade f={t} at={88} x={200} y={828} w={1520} dur={18} />
    <Note f={t} at={128} x={200} y={856} w={900} text="1998 年起与 IBM 合作导入 IPD（集成产品开发）；学费以分期咨询费计，具体金额各方口径不一。" />
  </>
);

/* ══ P12 · 2000：220 亿，和《华为的冬天》 ════════════════════════
   最好的一年，写下最冷的一篇。左边数字、右边文稿，中间一条线。 */
export const P12: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2000" caption="深圳 · 销售额 220 亿" />

    <Figure f={t} at={8} x={200} y={286} w={700} label="销 售 额" value="220" size={210} unit="亿元" />
    <Soft f={t} at={54} dur={22} style={{left: 206, top: 626, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryDim}}>
        这是它当时最好的一年。
        <br />
        <span style={{color: G.ivoryFaint, fontSize: 20}}>也是在这一年，他写了那篇《华为的冬天》。</span>
      </div>
    </Soft>

    <VLine f={t} at={40} x={980} y0={250} y1={790} dur={26} />

    <Soft f={t} at={62} dur={26} style={{left: 1040, top: 268, width: 700}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
        <div style={{fontFamily: GF.cn, fontSize: 25, fontWeight: 700, color: G.gold}}>《华为的冬天》</div>
        <div style={{fontFamily: GF.latinItalic, fontSize: 17, color: G.ivoryFaint}}>2001.03</div>
      </div>
      <div style={{height: 1, marginTop: 14, background: `linear-gradient(90deg, rgba(214,180,106,0.5), rgba(214,180,106,0))`}} />
    </Soft>

    <Soft f={t} at={86} dur={26} style={{left: 1040, top: 366, width: 700}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 54, lineHeight: 1.6, color: G.ivory}}>
        十年来我天天思考的
        <br />
        都是 <span style={{...goldTextLight(0.32)}}>失败</span>
      </div>
    </Soft>

    <Soft f={t} at={120} dur={22} style={{left: 1040, top: 606, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, lineHeight: 1.9}}>
        文章在 2001 年 3 月发于公司内部，
        <br />
        流传的版本比原文更狠。
      </div>
    </Soft>

    <RuleFade f={t} at={70} x={200} y={848} w={1520} dur={18} />
  </>
);
