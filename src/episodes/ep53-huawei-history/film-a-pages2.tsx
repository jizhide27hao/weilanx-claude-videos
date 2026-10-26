import React from 'react';
import {BookCite, YearHeader} from '../../library/gilded/stage';
import {Figure, Frame, HBand, KV, MiniTable, Note, Page, RuleFade, Soft, VLine, HLine, BarsV} from '../../library/gilded/kit';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/**
 * ep53 暗金文献版 · 第二幕（P13–P24）
 * 泡沫破了 → 唯一一次下滑 → 思科 → 海思 → 出海 → 五百强 → 终端翻身 → 顶点那天
 */

/* ══ P13 · 2001：泡沫破了，把电源业务卖了 7.5 亿美元 ════════════════
   上半页一条断崖线（行业的钱停了），下半页一张交易单（华为换到了棉袄）。 */
export const P13: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2001" caption="全球 · 电信投资急刹车" />

    <Soft f={t} at={8} dur={24} style={{left: 200, top: 158, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 72, letterSpacing: 6, color: G.ivory}}>互联网泡沫破了</div>
    </Soft>
    <Soft f={t} at={26} dur={22} style={{left: 204, top: 258, width: 960}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint}}>全世界的运营商同时停止采购，设备商的账一起变冷。</div>
    </Soft>

    {/* 一条断崖：从平稳到垂直落下 */}
    <Soft f={t} at={44} dur={40} style={{left: 200, top: 310}}>
      <svg width={940} height={210} style={{overflow: 'visible'}}>
        <defs>
          <linearGradient id="pa-cliff" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={G.goldLine} />
            <stop offset="0.42" stopColor={G.gold} />
            <stop offset="1" stopColor={G.red} />
          </linearGradient>
        </defs>
        <path d="M0 46 L400 34 L452 182 L560 196 L920 202" fill="none" stroke="url(#pa-cliff)" strokeWidth={2.2} pathLength={1} strokeDasharray={`${Math.min(1, Math.max(0, (t - 44) / 46))} 1`} style={{filter: 'drop-shadow(0 0 8px rgba(214,180,106,0.4))'}} />
        <line x1={0} y1={206} x2={920} y2={206} stroke={G.goldFaint} />
        <text x={0} y={228} fontFamily={GF.cn} fontSize={16} letterSpacing={3} fill={G.ivoryFaint}>
          全球电信资本开支 · 示意曲线，非精确数值
        </text>
        <text x={486} y={158} fontFamily={GF.cn} fontSize={17} fill={G.red} opacity={Math.min(1, Math.max(0, (t - 70) / 20))}>2000 下半年起</text>
      </svg>
    </Soft>

    <KV
      f={t}
      at={92}
      x={200}
      y={586}
      w={740}
      gap={56}
      size={25}
      rows={[
        ['卖方', '华为'],
        ['标的', '电源业务（安圣电气）'],
        ['买方', '艾默生（Emerson）'],
        ['价格', '7.5 亿美元'],
      ]}
      hot={[3]}
    />

    <VLine f={t} at={110} x={1010} y0={520} y1={800} dur={26} />

    <Figure f={t} at={176} x={1070} y={472} w={680} label="交 易 金 额" value="7.5" size={186} unit="亿美元" />
    <Soft f={t} at={230} dur={22} style={{left: 1074, top: 786, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryDim}}>这笔钱被叫作「过冬的棉袄」</div>
    </Soft>

    <RuleFade f={t} at={140} x={200} y={858} w={1520} dur={18} />
  </>
);

/* ══ P14 · 2002：221 亿，唯一一次负增长 ═══════════════════════════
   一页只有一个数和一个减号。前面所有的金光到这里全部收成朱红。 */
export const P14: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2002" caption="深圳 · 成立以来唯一一次下滑" />

    <Figure f={t} at={6} x={200} y={300} w={780} label="销 售 额" value="221" size={290} unit="亿元" />

    <VLine f={t} at={26} x={1060} y0={310} y1={700} dur={22} color={G.red} />

    <Soft f={t} at={40} dur={24} style={{left: 1120, top: 320, width: 640}}>
      <div style={{fontFamily: GF.num, fontSize: 148, lineHeight: 1, color: G.red, letterSpacing: 2, textShadow: `0 0 34px rgba(200,81,60,0.45)`}}>−13%</div>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 4, color: G.ivoryDim, marginTop: 18}}>营业收入同比</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>39 年里唯一的一次</div>
    </Soft>

    <Soft f={t} at={76} dur={22} style={{left: 200, top: 720, width: 1520}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>
        2000 年 220 亿，2002 年 <span style={{color: G.red}}>221 亿</span>
        <span style={{color: G.ivoryFaint, fontSize: 22}}>　—— 两年几乎没长，中间还掉了一截</span>
      </div>
    </Soft>
  </>
);

/* ══ P15 · 2003 年 1 月：21 项罪名，77 页起诉书 ════════════════════
   左边两个数字，右边一份起诉书的形状。不列罪名——列了就成了法律意见。 */
export const P15: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2003" caption="美国 · 一纸起诉书" />
    <BookCite f={t} at={10} original="Cisco Systems, Inc. v. Huawei Technologies Co., Ltd." title="美国得州东区联邦法院 · 起诉书" meta="原告思科 · 被告华为及两家关联公司" seal="诉讼" />

    <Soft f={t} at={8} dur={24} style={{left: 200, top: 186, width: 1100}}>
      <div style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 6, color: G.ivory}}>2003 年 1 月，思科在美国起诉</div>
    </Soft>

    <Figure f={t} at={84} x={200} y={310} w={420} label="指 控 罪 名" value="21" size={240} unit="项" />
    <Figure f={t} at={176} x={700} y={310} w={420} label="起 诉 书" value="77" size={240} unit="页" />

    {/* 起诉书的形状：一叠横线，不写内容 */}
    <Soft f={t} at={120} dur={26} style={{left: 1300, top: 250}}>
      <svg width={420} height={520} style={{overflow: 'visible'}}>
        <rect x={1} y={1} width={400} height={500} fill="rgba(10,8,5,0.5)" stroke={G.goldFaint} />
        <text x={28} y={48} fontFamily={GF.latin} fontSize={20} letterSpacing={4} fill={G.ivoryDim}>COMPLAINT</text>
        <line x1={28} y1={64} x2={372} y2={64} stroke={G.goldLine} />
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={28} y1={96 + i * 24} x2={i % 4 === 3 ? 240 : 372} y2={96 + i * 24} stroke="rgba(239,230,210,0.13)" strokeWidth={3} />
        ))}
        <text x={28} y={470} fontFamily={GF.num} fontSize={17} fill={G.ivoryFaint}>77 pages</text>
      </svg>
    </Soft>

    <Soft f={t} at={240} dur={24} style={{left: 200, top: 700, width: 1060}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        按对方开的价，华为要<span style={{color: G.red}}>破产</span>。
      </div>
    </Soft>

    <RuleFade f={t} at={150} x={200} y={802} w={1520} dur={18} />
    <Note f={t} at={272} x={200} y={830} w={960} text="21 项指控涉及专利、版权、商业秘密等；起诉书正文 77 页，2003 年 1 月 22 日提交。" />
  </>
);

/* ══ P16 · 观望 → 找对手 → 撤诉 ═══════════════════════════════════
   一条横线三个刻度，最后落到一句结论上。整页只有这一个图形。 */
const STEPS = [
  {x: 260, when: '2003 初', what: '订单停住', how: '合作伙伴开始观望'},
  {x: 800, when: '2003 年', what: '转身找对手', how: '与 3Com 合资'},
  {x: 1340, when: '2004.07', what: '思科撤诉', how: '18 个月后'},
];

export const P16: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2004" caption="美国 · 官司打了 18 个月" />

    <Soft f={t} at={10} dur={22} style={{left: 200, top: 176, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 5, color: G.ivory}}>打不赢的官司，先别硬打</div>
    </Soft>

    <RuleFade f={t} at={24} x={200} y={470} w={1520} dur={34} />

    {STEPS.map((s, i) => (
      <React.Fragment key={s.when}>
        <Soft f={t} at={40 + i * 26} dur={20} style={{left: s.x - 4, top: 470}}>
          <div style={{width: 9, height: 9, borderRadius: '50%', background: G.goldBright, boxShadow: `0 0 12px ${G.gold}`, marginTop: -4}} />
        </Soft>
        <Soft f={t} at={46 + i * 26} dur={22} style={{left: s.x - 60, top: 320, width: 220}}>
          <div style={{fontFamily: GF.num, fontSize: 34, color: G.gold, letterSpacing: 1}}>{s.when}</div>
        </Soft>
        <Soft f={t} at={52 + i * 26} dur={22} style={{left: s.x - 60, top: 372, width: 240}}>
          <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, color: G.ivory}}>{s.what}</div>
        </Soft>
        <Soft f={t} at={58 + i * 26} dur={22} style={{left: s.x - 60, top: 502, width: 240}}>
          <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint}}>{s.how}</div>
        </Soft>
      </React.Fragment>
    ))}

    <RuleFade f={t} at={150} x={200} y={620} w={1520} dur={18} />

    <Soft f={t} at={200} dur={28} style={{left: 200, top: 668, width: 1520}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 28}}>
        <span style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 8, color: G.gold}}>教训</span>
        <span style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 64, letterSpacing: 6, ...goldTextLight(0.34)}}>一次官司，换来一条底线</span>
      </div>
    </Soft>

    <Soft f={t} at={248} dur={22} style={{left: 206, top: 762, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint}}>于是有了下一件事：自己造芯片。</div>
    </Soft>
  </>
);

/* ══ P17 · 2004：海思成立 ════════════════════════════════════════
   全片最短的一页，只放两个字。它后面要背 20 年的账。 */
export const P17: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2004" caption="深圳 · 一家新公司" />

    <Soft f={t} at={6} dur={24} style={{left: 0, right: 0, top: 300, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 180, letterSpacing: 34, ...goldText(0.9)}}>海思</div>
    </Soft>
    <Soft f={t} at={26} dur={22} style={{left: 0, right: 0, top: 512, textAlign: 'center'}}>
      <div style={{fontFamily: GF.latinItalic, fontSize: 30, letterSpacing: 10, color: G.ivoryDim}}>HiSilicon</div>
    </Soft>
    <Soft f={t} at={44} dur={22} style={{left: 0, right: 0, top: 606, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 8, color: G.ivory}}>自己做芯片</div>
    </Soft>
    <Soft f={t} at={66} dur={22} style={{left: 0, right: 0, top: 690, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>从这一年起，芯片被放进公司自己的账本里</div>
    </Soft>
  </>
);

/* ══ P18 · 2005 海外首超国内；2008 到 75% ════════════════════════
   左边两条账，右边一个比例条。75% 是这页唯一的大字。 */
export const P18: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2008" caption="全球 · 收入结构换了主人" />

    <Soft f={t} at={8} dur={22} style={{left: 200, top: 176, width: 800}}>
      <div style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 5, color: G.ivory}}>生意做到了别人的家门口</div>
    </Soft>

    <KV
      f={t}
      at={16}
      x={200}
      y={330}
      w={620}
      gap={68}
      size={26}
      rows={[
        ['2005 年', '海外收入首次超过国内'],
        ['2008 年', '海外占比 75%'],
        ['卖的是什么', '运营商网络设备'],
      ]}
      hot={[1]}
    />

    <VLine f={t} at={40} x={1010} y0={280} y1={780} dur={26} />

    <Figure f={t} at={110} x={1080} y={286} w={680} label="海 外 收 入 占 比" value="75%" size={212} />

    <Soft f={t} at={140} dur={24} style={{left: 1080, top: 616, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 18, letterSpacing: 4, color: G.ivoryFaint, marginBottom: 10}}>0 ————————— 50% ————————— 100%</div>
      <HBand f={t} at={146} x={0} y={38} w={680} p={0.75} dur={34} />
    </Soft>

    <RuleFade f={t} at={80} x={200} y={822} w={1520} dur={18} />
    <Note f={t} at={150} x={200} y={850} w={900} text="海外收入占比按公司年报口径；2005 年为海外首次超过国内，具体比例各年不同。" />
  </>
);

/* ══ P19 · 2010：1852 亿，世界 500 强第 397 位 ════════════════════
   一根竖轴从第 1 名排到第 500 名，397 落在下半段——第一次上榜的位置。 */
export const P19: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2010" caption="深圳 · 第一次上那张榜" />

    <Figure f={t} at={6} x={200} y={290} w={700} label="营 业 收 入" value="1,852" size={200} unit="亿元" />
    <Soft f={t} at={60} dur={22} style={{left: 206, top: 610, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim}}>
        第一次进《财富》世界 500 强，
        <br />
        <span style={{...goldTextLight(0.25)}}>排在最后四分之一。</span>
      </div>
    </Soft>

    <VLine f={t} at={40} x={980} y0={230} y1={800} dur={26} />

    {/* 竖轴：1 → 500 */}
    <Soft f={t} at={70} dur={24} style={{left: 1180, top: 210}}>
      <svg width={520} height={620} style={{overflow: 'visible'}}>
        <line x1={60} y1={0} x2={60} y2={560} stroke="rgba(214,180,106,0.62)" strokeWidth={1.6} />
        {[1, 100, 200, 300, 400, 500].map((r) => {
          const y = ((r - 1) / 499) * 560;
          return (
            <g key={r}>
              <line x1={54} y1={y} x2={66} y2={y} stroke={G.goldLine} />
              <text x={44} y={y + 5} textAnchor="end" fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>{r}</text>
            </g>
          );
        })}
        {/* 397 */}
        <line x1={60} y1={444} x2={330} y2={444} stroke={G.goldBright} strokeWidth={1.4} opacity={Math.min(1, Math.max(0, (t - 100) / 20))} />
        <circle cx={60} cy={444} r={6} fill={G.goldBright} opacity={Math.min(1, Math.max(0, (t - 96) / 14))} style={{filter: `drop-shadow(0 0 10px ${G.gold})`}} />
        <text x={344} y={438} fontFamily={GF.cn} fontSize={20} fill={G.gold} opacity={Math.min(1, Math.max(0, (t - 104) / 18))}>第 397 位</text>
        <text x={344} y={464} fontFamily={GF.cn} fontSize={15} fill={G.ivoryFaint} opacity={Math.min(1, Math.max(0, (t - 112) / 18))}>2010 年首次上榜</text>
      </svg>
    </Soft>

    <RuleFade f={t} at={86} x={200} y={784} w={1520} dur={18} />
  </>
);

/* ══ P20 · 2011–2012：砍掉贴牌机，一年少卖三千万台 ═════════════════
   左边「谁接手、干了什么」，右边一个朱红的负数。 */
export const P20: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2011" caption="深圳 · 终端部门" />

    <Soft f={t} at={6} dur={24} style={{left: 200, top: 178, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 50, letterSpacing: 5, color: G.ivory}}>那时手机部门，还是个包袱</div>
    </Soft>

    <KV
      f={t}
      at={78}
      x={200}
      y={330}
      w={660}
      gap={62}
      size={25}
      rows={[
        ['2011 年', '余承东接手终端'],
        ['第一件事', '砍掉贴牌机'],
      ]}
    />

    <Soft f={t} at={150} dur={22} style={{left: 204, top: 590, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 2, lineHeight: 1.9, color: G.ivoryFaint}}>
        贴牌机不赚钱，但走量。<br />
        砍掉它，等于自己先把报表打下来。
      </div>
    </Soft>

    <VLine f={t} at={40} x={990} y0={260} y1={740} dur={26} color={G.red} />

    <Soft f={t} at={238} dur={26} style={{left: 1060, top: 300, width: 640}}>
      <div style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, color: G.red, letterSpacing: 0, textShadow: `0 0 36px rgba(200,81,60,0.4)`}}>−3,000</div>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 8, color: G.ivoryDim, marginTop: 14}}>万台 / 年</div>
    </Soft>

    <Soft f={t} at={272} dur={22} style={{left: 1064, top: 610, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, color: G.ivory}}>内部开始要换掉他</div>
    </Soft>

    <RuleFade f={t} at={110} x={200} y={802} w={1520} dur={18} />
  </>
);

/* ══ P21 · 「不支持他就是不支持我」 ═══════════════════════════════
   一句话保一个人。右边那张卡是「2012 年的微博」。 */
export const P21: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2012" caption="深圳 · 一句话保下来" />

    <Soft f={t} at={10} dur={26} style={{left: 180, top: 250, width: 820}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 66, lineHeight: 1.55, color: G.ivory}}>
        不支持他，
        <br />
        就是<span style={{...goldTextLight(0.34)}}>不支持我</span>
      </div>
    </Soft>

    <Soft f={t} at={40} dur={22} style={{left: 184, top: 470, width: 800}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 2, color: G.ivoryFaint, lineHeight: 1.9}}>
        任正非在内部会上给余承东兜底。
        <br />
        这句话之后，终端部门再没人提换人。
      </div>
    </Soft>

    <VLine f={t} at={60} x={1050} y0={250} y1={780} dur={26} />

    <Frame f={t} at={100} x={1120} y={262} w={620} h={430}>
      <div style={{padding: '30px 34px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{width: 34, height: 34, borderRadius: '50%', border: `1px solid ${G.goldLine}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: GF.cn, fontSize: 15, color: G.gold}}>余</div>
          <div style={{fontFamily: GF.cn, fontSize: 18, color: G.ivoryDim}}>余承东 · 微博</div>
          <div style={{fontFamily: GF.num, fontSize: 16, color: G.ivoryFaint, marginLeft: 'auto'}}>2012</div>
        </div>
        <div style={{height: 1, margin: '18px 0', background: `linear-gradient(90deg, rgba(214,180,106,0.4), rgba(214,180,106,0))`}} />
        <div style={{fontFamily: GF.cn, fontSize: 33, lineHeight: 1.7, color: G.ivory}}>
          华为手机，
          <br />
          要做<span style={{...goldTextLight(0.3)}}>世界第一</span>
        </div>
        <div style={{fontFamily: GF.cn, fontSize: 15, color: G.ivoryFaint, marginTop: 26, letterSpacing: 1}}>转述自当时的公开发言，原句以微博原文为准</div>
      </div>
    </Frame>

    <RuleFade f={t} at={86} x={180} y={810} w={1560} dur={18} />
  </>
);

/* ══ P22 · 2014 年 9 月，Mate 7 ═══════════════════════════════════
   一个型号 + 一个数字。三千元档第一次卖爆，是这页唯一的判断。 */
export const P22: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2014" caption="9 月 · 一款手机" />

    <Soft f={t} at={6} dur={24} style={{left: 200, top: 300}}>
      <div style={{fontFamily: GF.latinBold, fontSize: 170, lineHeight: 1, letterSpacing: 2, ...goldText(0.75)}}>Mate 7</div>
    </Soft>
    <Soft f={t} at={24} dur={22} style={{left: 206, top: 500, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 6, color: G.ivory}}>三千元档</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>这个价位，在此之前没人卖爆过</div>
    </Soft>

    <VLine f={t} at={36} x={920} y0={280} y1={780} dur={26} />

    <Figure f={t} at={80} x={990} y={300} w={660} label="销 量" value="700" size={230} unit="万台" />
    <Soft f={t} at={116} dur={22} style={{left: 994, top: 636, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, color: G.ivoryDim}}>一款机型，把华为手机从「运营商定制」拖进了零售市场</div>
    </Soft>

    <RuleFade f={t} at={70} x={200} y={806} w={1520} dur={18} />
  </>
);

/* ══ P23 · 2018：两亿台，第一次全球第二 ═══════════════════════════
   左边 700 万（2014），右边 2 亿（2018），中间一道 28 倍的跨度。 */
export const P23: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2018" caption="全球 · 手机出货" />

    <Soft f={t} at={8} dur={22} style={{left: 200, top: 178, width: 1100}}>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 5, color: G.ivory}}>四年，从一个爆款到一个亿级生意</div>
    </Soft>

    <Figure f={t} at={20} x={220} y={320} w={440} label="2014 · Mate 7" value="700" size={170} unit="万台" />
    <Figure f={t} at={88} x={1180} y={320} w={520} label="2018 · 全年" value="2" size={240} unit="亿台" />

    {/* 中间的跨度 */}
    <Soft f={t} at={110} dur={24} style={{left: 760, top: 470, width: 360, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.ivoryFaint}}>四 年</div>
      <div style={{fontFamily: GF.num, fontSize: 84, lineHeight: 1.2, ...goldTextLight(0.28)}}>×28</div>
      <div style={{width: '100%', height: 1, background: `linear-gradient(90deg, rgba(214,180,106,0), ${G.goldLine}, rgba(214,180,106,0))`, marginTop: 8}} />
    </Soft>

    <Soft f={t} at={120} dur={24} style={{left: 200, top: 686, width: 1520}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, color: G.ivory}}>
        二季度出货超过苹果，<span style={{...goldTextLight(0.3)}}>第一次全球第二</span>
        <span style={{color: G.ivoryFaint, fontSize: 22}}>（IDC 口径）</span>
      </div>
    </Soft>

    <RuleFade f={t} at={90} x={200} y={806} w={1520} dur={18} />
  </>
);

/* ══ P24 · 2019：最好的数字，和最坏的一天 ═════════════════════════
   前半页是顶点（8,588 亿 / 2.4 亿台），后半页整片压暗，落一条朱红横杠。
   这是全片唯一一次「同页反转」，所以动效要最省：只压一层黑，只推一条杠。 */
export const P24: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2019" caption="深圳 · 顶点" />

    <Figure f={t} at={8} x={200} y={270} w={620} label="营 业 收 入" value="8,588" size={196} unit="亿元" />
    <Figure f={t} at={30} x={1100} y={270} w={620} label="手 机 出 货" value="2.4" size={196} unit="亿台" />
    <VLine f={t} at={20} x={960} y0={262} y1={632} dur={24} />

    <Soft f={t} at={44} dur={22} style={{left: 200, top: 618, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, color: G.ivoryDim}}>手机业务第一次成为公司最大的现金来源。</div>
    </Soft>

    {/* 压暗 */}
    <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', opacity: Math.min(1, Math.max(0, (t - 140) / 16))}} />

    {/* 朱红横杠 */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 700,
        width: 1920,
        height: 92,
        background: 'linear-gradient(90deg, rgba(143,47,34,0) 0%, rgba(143,47,34,0.92) 18%, rgba(143,47,34,0.92) 82%, rgba(143,47,34,0) 100%)',
        transform: `scaleX(${Math.min(1, Math.max(0, (t - 144) / 22))})`,
      }}
    />
    <Soft f={t} at={152} dur={20} style={{left: 0, right: 0, top: 726, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 46, letterSpacing: 10, color: '#f7dfd4'}}>2019 年 5 月 16 日 · 实体清单</div>
    </Soft>

    <Soft f={t} at={166} dur={22} style={{left: 0, right: 0, top: 826, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 6, color: G.ivoryDim}}>就在营收最高的一年，供应链被从中间切断</div>
    </Soft>
  </>
);
