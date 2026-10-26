import React from 'react';
import {BookCite, YearHeader} from '../../library/gilded/stage';
import {BarsV, Figure, HLine, KV, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);


/**
 * ep55 暗金文献版 · 第一幕（P01–P13）
 * 5 万亿 → 车库 1,300 美元 → 三人 → 韦恩退出 → Apple 1 / Apple 2 → 上市 → 4 个亿万富翁
 * → Lisa 与 Mac → 1985 被赶走 → 十二年 → 破产 90 天
 *
 * 每页只吃一个 t（页内帧，0 = 切点）。一律柔入，页间靠顶层交叉淡化。
 */

/* ══ P01 · 5.045 万亿：全球第二家 ═════════════════════════════════ */
export const P01: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="七月 · 纳斯达克" rollAt={8} prev="2025" />
    <BookCite f={t} at={10} original="Apple Inc. — Form 10-K / FY2026" title="苹果公司 2026 财年年报" meta="2026-07-29 盘中最高市值 5.045 万亿美元" seal="年报" />

    <Tag f={t} at={20} x={152} y={196} cn="市 值 峰 值" latin="peak market cap" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 248, lineHeight: 1, letterSpacing: 2, ...goldText(0.9)}}>5.045</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 10, color: G.gold, marginBottom: 26}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 520, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>美 元 · 盘 中 触 及</div>
    </Soft>

    <VLine f={t} at={62} x={960} y0={232} y1={640} dur={30} />

    <Soft f={t} at={76} dur={24} style={{left: 1052, top: 250, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, color: G.ivoryDim}}>五万亿美元俱乐部</div>
    </Soft>
    <Soft f={t} at={88} dur={24} style={{left: 1052, top: 300, width: 560}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>英伟达</span>
        <span style={{fontFamily: GF.num, fontSize: 96, letterSpacing: 1, ...goldText(0.5)}}>5.724</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, color: G.ivoryDim}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={104} dur={24} style={{left: 1052, top: 412, width: 560}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>苹　果</span>
        <span style={{fontFamily: GF.num, fontSize: 96, letterSpacing: 1, ...goldTextLight(0.3)}}>5.045</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, color: G.ivoryDim}}>万亿</span>
      </div>
    </Soft>

    <RuleFade f={t} at={120} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={132} dur={22} style={{left: 152, top: 726, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        而这一切的起点，
        <br />
        是<span style={goldTextLight(0.3)}>1,300 美元</span>。
      </div>
    </Soft>
    <Note f={t} at={150} x={1052} y={716} w={720} text="口径：2026-07-29 盘中最高价折合市值 5.045 万亿美元，收盘回落；英伟达 5.724 万亿美元为 2026-06 盘中纪录。" />
  </>
);

/* ══ P02 · 启动资金 1,300 美元 ═════════════════════════════════════ */
export const P02: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1976" caption="四月 · 洛斯阿尔托斯" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="Walter Isaacson — Steve Jobs, ch.5" title="《史蒂夫·乔布斯传》第五章" meta="车库创业 · 卖车与计算器凑出启动资金" seal="传记" />

    <Tag f={t} at={18} x={152} y={188} cn="启 动 资 金" latin="seed money" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 232}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 236, lineHeight: 1, ...goldText(0.85)}}>1,300</span>
        <span style={{fontFamily: GF.cn, fontSize: 50, letterSpacing: 10, color: G.gold, marginBottom: 24}}>美元</span>
      </div>
    </Soft>

    <KV
      f={t}
      at={56}
      x={152}
      y={516}
      w={760}
      size={26}
      gap={58}
      rows={[
        ['一辆旧车', '≈ 1,000'],
        ['一台计算器', '≈ 300'],
      ]}
      hot={[0, 1]}
    />

    <VLine f={t} at={78} x={1010} y0={208} y1={700} dur={30} />

    <Soft f={t} at={92} dur={24} style={{left: 1096, top: 210, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 4, lineHeight: 1.5, color: G.ivory}}>
        乔布斯卖掉他的旧车
        <br />
        沃兹卖掉他的计算器
      </div>
    </Soft>
    <Soft f={t} at={116} dur={24} style={{left: 1096, top: 392, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 2, lineHeight: 1.7, color: G.ivoryDim}}>
        两个人的全部家当，
        <br />
        凑成了这家公司的第一笔钱。
      </div>
    </Soft>

    <RuleFade f={t} at={140} x={152} y={726} w={1616} dur={18} />
    <Note f={t} at={152} x={152} y={752} w={900} text="口径：Isaacson 与苹果官方大事记均记 1,300 美元；车与计算器的具体售价各处记述略有出入，表中为常用估值。" />
  </>
);

/* ══ P03 · 两次离关门只剩几个月（目录页） ═══════════════════════════ */
export const P03: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="五十年 · 两次生死" rollAt={8} />

    <Soft f={t} at={8} dur={24} style={{left: 152, top: 178}}>
      <div style={{fontFamily: GF.cn, fontSize: 56, letterSpacing: 8, color: G.ivory}}>五十年里</div>
    </Soft>
    <Soft f={t} at={20} dur={26} style={{left: 146, top: 248}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 112, letterSpacing: 10, lineHeight: 1.1, ...goldText(0.9)}}>两次差点关门</div>
    </Soft>

    {[
      {x: 170, year: '1985', event: '被自己请来的 CEO 赶走', num: '−11 年', detail: '从创始人到离开，只用了九年', red: true},
      {x: 720, year: '1997', event: '现金只够 90 天', num: '−10.45', detail: '亿 · 1997 财年净亏', red: true},
      {x: 1270, year: '2026', event: '五万亿 · 换帅', num: '5.045', detail: '万亿 · 全球第二家', red: false},
    ].map((c, i) => (
      <React.Fragment key={c.year}>
        <Soft f={t} at={34 + i * 12} dur={20} style={{left: c.x, top: 420, width: 380}}>
          <div style={{fontFamily: GF.num, fontSize: 62, lineHeight: 1, letterSpacing: 4, ...goldText(0.45)}}>{c.year}</div>
          <div style={{width: 380, height: 1, margin: '12px 0 14px', background: `linear-gradient(90deg, ${G.gold}, rgba(214,180,106,0.15))`}} />
          <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, color: G.ivoryDim, lineHeight: 1.4}}>{c.event}</div>
        </Soft>
        <Soft f={t} at={60 + i * 12} dur={22} style={{left: c.x, top: 600, width: 380}}>
          <div style={{fontFamily: GF.num, fontSize: 92, lineHeight: 1.1, ...(c.red ? {color: G.red, textShadow: '0 0 24px rgba(200,81,60,0.5)'} : goldText(0.55))}}>{c.num}</div>
          <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 8}}>{c.detail}</div>
        </Soft>
      </React.Fragment>
    ))}

    {/* 这页只有 5.3 秒，放不下页脚注记——刚淡入就整页淡出，索性只留三列 */}
  </>
);

/* ══ P04 · 1976.4.1：21 / 25 / 41 ═════════════════════════════════ */
export const P04: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1976" caption="四月一日 · 三个人" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="Apple Computer Company — Partnership Agreement" title="《苹果电脑公司合伙协议》" meta="1976-04-01 签署 · 45 / 45 / 10" seal="原件" />

    <Soft f={t} at={22} dur={22} style={{left: 152, top: 176}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 6, color: G.ivoryDim}}>签下这份协议的，是三个人</div>
    </Soft>

    {[
      {x: 170, name: '史蒂夫·乔布斯', age: '21', job: '拉货、谈判', pct: '45%'},
      {x: 720, name: '史蒂夫·沃兹尼亚克', age: '25', job: '设计电路', pct: '45%'},
      {x: 1270, name: '罗恩·韦恩', age: '41', job: '画了合同', pct: '10%'},
    ].map((p, i) => (
      <React.Fragment key={p.name}>
        <Soft f={t} at={36 + i * 14} dur={20} style={{left: p.x, top: 250, width: 380}}>
          <div style={{fontFamily: GF.num, fontSize: 150, lineHeight: 0.95, ...goldText(0.6)}}>{p.age}</div>
          <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 4, color: G.ivory, marginTop: 14}}>{p.name}</div>
          <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 3, color: G.ivoryFaint, marginTop: 10}}>{p.job}</div>
        </Soft>
        <Soft f={t} at={64 + i * 14} dur={18} style={{left: p.x, top: 640, width: 380}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 34, height: 1, background: G.goldLine}} />
            <div style={{fontFamily: GF.num, fontSize: 40, color: G.gold, letterSpacing: 2}}>{p.pct}</div>
          </div>
        </Soft>
      </React.Fragment>
    ))}

    <RuleFade f={t} at={104} x={170} y={742} w={1580} dur={18} />
    <Soft f={t} at={110} dur={22} style={{left: 170, top: 766, width: 1560}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim, lineHeight: 1.7}}>
        两个二十出头的年轻人，加一个四十岁的成年人——股份 45 / 45 / 10，第三个正好当那个打破平局的人。
      </div>
    </Soft>
  </>
);

/* ══ P05 · 11 天，800 美元，10% ═══════════════════════════════════ */
export const P05: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1976" caption="四月 · 十一天" rollAt={8} prev="2026" />

    <Soft f={t} at={14} dur={24} style={{left: 152, top: 174, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, color: G.ivoryDim}}>十一天后，第三个人退出了</div>
    </Soft>

    <Figure f={t} at={30} x={152} y={248} w={520} label="卖 价" value="800" size={212} unit="美元 · 10% 股份" />
    <Soft f={t} at={54} dur={20} style={{left: 152, top: 606, width: 520}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, lineHeight: 1.7}}>
        一年后又补收 1,500 美元，
        <br />
        彻底放弃对这家公司的任何主张。
      </div>
    </Soft>

    <VLine f={t} at={72} x={790} y0={236} y1={700} dur={30} />

    <Soft f={t} at={86} dur={24} style={{left: 880, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 5, color: G.ivoryDim}}>那 10% 今天值多少</div>
    </Soft>
    <Soft f={t} at={100} dur={26} style={{left: 876, top: 296}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 190, lineHeight: 1, ...goldText(0.8)}}>5,000</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 20}}>亿美元</span>
      </div>
    </Soft>
    <Soft f={t} at={124} dur={20} style={{left: 884, top: 526, width: 740}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim, lineHeight: 1.7}}>
        按 5 万亿市值粗算。<br />
        他后来把那份合同以 500 美元卖掉——
        <br />
        2011 年，它在拍卖行拍到 159.4 万美元。
      </div>
    </Soft>

    <RuleFade f={t} at={146} x={152} y={786} w={1616} dur={18} />
    <Note f={t} at={156} x={152} y={810} w={960} text="口径：5,000 亿为「10% × 5 万亿」的静态粗算，未计五十年间的股权稀释；合同拍卖价为佳士得 2011 年成交价。" />
  </>
);

/* ══ P06 · Apple 1：666.66 美元 ══════════════════════════════════ */
export const P06: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1976" caption="七月 · 第一批货" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="Apple I — Retail Price List, 1976" title="《Apple I 报价单》" meta="666.66 美元 · 主板套件" seal="价目" />

    <Tag f={t} at={20} x={152} y={196} cn="售 价" latin="unit price" />
    <Soft f={t} at={28} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 224, lineHeight: 1, ...goldText(0.85)}}>666.66</span>
        <span style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 8, color: G.gold, marginBottom: 22}}>美元</span>
      </div>
    </Soft>
    <Soft f={t} at={52} dur={20} style={{left: 154, top: 500, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, color: G.ivoryDim, lineHeight: 1.7}}>
        一块焊好的电路板。<br />
        机箱、键盘、电源，自己配。
      </div>
    </Soft>

    <VLine f={t} at={70} x={900} y0={210} y1={700} dur={30} />

    <Soft f={t} at={84} dur={22} style={{left: 986, top: 212, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 5, color: G.ivoryDim}}>一共卖了</div>
    </Soft>
    <Soft f={t} at={94} dur={24} style={{left: 982, top: 256, width: 620}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.7)}}>≈200</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 18}}>台</span>
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={112}
      x={986}
      y={470}
      w={700}
      head={['', '数量', '单价', '合计']}
      colW={[230, 110, 150, 210]}
      rows={[
        ['Apple I 套件', '约 200', '666.66', '约 13.3 万'],
        ['其中 · Byte Shop', '50', '500.00', '2.5 万'],
      ]}
      size={22}
      rowH={50}
    />

    <RuleFade f={t} at={148} x={152} y={790} w={1616} dur={18} />
    <Note f={t} at={158} x={152} y={814} w={1000} text="口径：零售价 666.66 美元；首笔订单 50 台以 500 美元／台卖给 Byte Shop。总数约 200 台，各来源统计口径略有差异。" />

    <Stamp f={t} at={168} text="一块板子" x={664} y={640} size={100} rot={-7} />
  </>
);

/* ══ P07 · 1977 Apple II 才是开始 ═════════════════════════════════ */
export const P07: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1977" caption="四月 · 西海岸电脑展" rollAt={8} prev="1976" />
    <BookCite f={t} at={10} original="Apple II — Introduction, West Coast Computer Faire" title="《Apple II 发布资料》" meta="1977-04-16 · 首台量产的整机" seal="发布" />

    <Soft f={t} at={18} dur={26} style={{left: 152, top: 300, width: 980}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 92, letterSpacing: 8, lineHeight: 1.25, ...goldText(0.85)}}>
        Apple II
        <br />
        才是真正的开始
      </div>
    </Soft>

    <Soft f={t} at={40} dur={22} style={{left: 152, top: 604, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, color: G.ivoryDim}}>
        从「自己配」到「插上就用」，中间只隔了一年。
      </div>
    </Soft>

    <VLine f={t} at={66} x={1200} y0={240} y1={720} dur={30} />

    <Soft f={t} at={78} dur={22} style={{left: 1288, top: 246, width: 520}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 4, color: G.ivoryFaint}}>从这一台起</div>
    </Soft>
    <KV
      f={t}
      at={88}
      x={1288}
      y={288}
      w={520}
      size={25}
      gap={62}
      rows={[
        ['整机', '有外壳'],
        ['键盘', '有'],
        ['彩色', '有'],
        ['软件', '可扩展'],
      ]}
      hot={[0, 3]}
    />

    {/* 下半幅：200 台 → 600 万台，一个数量级的落差，比任何形容词都直接 */}
    <RuleFade f={t} at={100} x={152} y={726} w={980} dur={18} />
    <Soft f={t} at={104} dur={20} style={{left: 152, top: 756, width: 340}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>1976 · Apple I</div>
    </Soft>
    <Soft f={t} at={108} dur={20} style={{left: 152, top: 790, width: 340}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 8}}>
        <span style={{fontFamily: GF.num, fontSize: 66, lineHeight: 1, ...goldText(0.4)}}>≈200</span>
        <span style={{fontFamily: GF.cn, fontSize: 24, color: G.ivoryDim, marginBottom: 8}}>台</span>
      </div>
    </Soft>

    <Soft f={t} at={114} dur={18} style={{left: 470, top: 806, width: 80}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, color: G.gold, opacity: 0.7}}>→</div>
    </Soft>

    <Soft f={t} at={116} dur={20} style={{left: 570, top: 756, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>1977—1993 · Apple II 系列</div>
    </Soft>
    <Soft f={t} at={120} dur={20} style={{left: 570, top: 790, width: 560}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
        <span style={{fontFamily: GF.num, fontSize: 66, lineHeight: 1, ...goldText(0.62)}}>≈600</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim, marginBottom: 8}}>万台</span>
      </div>
    </Soft>
  </>
);

/* ══ P08 · 1980.12.12 上市 ═══════════════════════════════════════ */
export const P08: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1980" caption="十二月十二日 · 纳斯达克" rollAt={8} prev="1977" />
    <BookCite f={t} at={10} original="Apple Computer — Initial Public Offering, 1980" title="《苹果电脑 1980 年招股说明书》" meta="发行价 22 美元 · 首日收盘 29 美元" seal="招股" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 182, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim}}>
        发行 460 万股，募资约 <span style={{color: G.gold}}>1.01 亿美元</span>
      </div>
    </Soft>

    <Figure f={t} at={34} x={152} y={252} w={520} label="发 行 价" value="22" size={200} unit="美元" />
    <Figure f={t} at={58} x={740} y={252} w={520} label="首 日 收 盘" value="29" size={200} unit="美元" labelAt={50} />

    <VLine f={t} at={92} x={1350} y0={236} y1={700} dur={30} />

    <Soft f={t} at={104} dur={24} style={{left: 1438, top: 240, width: 380}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 5, color: G.ivoryDim}}>当 日 市 值</div>
    </Soft>
    <Soft f={t} at={114} dur={24} style={{left: 1434, top: 330, width: 400}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
        <span style={{fontFamily: GF.num, fontSize: 132, lineHeight: 1, ...goldText(0.7)}}>17.8</span>
        <span style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, color: G.gold, marginBottom: 16}}>亿美元</span>
      </div>
    </Soft>

    <HLine f={t} at={130} x={152} y={620} w={1180} dur={26} />
    <Soft f={t} at={142} dur={20} style={{left: 152, top: 638, width: 1180}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, lineHeight: 1.7}}>
        四年，从车库里的一千三百美元，到一家上市公司。
      </div>
    </Soft>

    <Note f={t} at={156} x={152} y={782} w={1000} text="口径：发行价 22 美元／股，首日收盘 29 美元；按当日收盘价计的市值约 17.8 亿美元。" />
  </>
);

/* ══ P09 · 那天造出 4 个亿万富翁 ═════════════════════════════════ */
export const P09: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1980" caption="十二月十二日 · 收盘" rollAt={8} prev="1980" />

    <Soft f={t} at={12} dur={20} style={{left: 0, right: 0, top: 250, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 12, color: G.ivoryDim}}>上市那天，苹果造出了</div>
    </Soft>
    <Soft f={t} at={30} dur={28} style={{left: 0, right: 0, top: 316, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 26}}>
        <span style={{fontFamily: GF.num, fontSize: 300, lineHeight: 1, ...goldText(1)}}>4</span>
        <span style={{fontFamily: GF.cn, fontSize: 76, letterSpacing: 10, color: G.gold, marginBottom: 40}}>个亿万富翁</span>
      </div>
    </Soft>

    <RuleFade f={t} at={30} x={400} y={700} w={1120} dur={18} />
    <Soft f={t} at={36} dur={20} style={{left: 400, top: 726, width: 1120, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryFaint}}>
        乔布斯 · 沃兹尼亚克 · 马库拉 · 洛克
      </div>
    </Soft>
  </>
);

/* ══ P10 · 1983 Lisa / 1984 超级碗 ═══════════════════════════════ */
export const P10: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1983" caption="两次发布会 · 一场广告" rollAt={8} prev="1980" />
    <BookCite f={t} at={10} original="Apple — Lisa & Macintosh Launch, 1983–1984" title="《Lisa 与 Macintosh 发布资料》" meta="Lisa 9,995 美元 · Macintosh 2,495 美元" seal="发布" />

    <Soft f={t} at={18} dur={22} style={{left: 152, top: 178, width: 520}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, color: G.ivoryFaint}}>一九八三 · Lisa</div>
      <div style={{fontFamily: GF.num, fontSize: 120, lineHeight: 1.15, marginTop: 6, ...goldText(0.6)}}>9,995</div>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 6}}>
        <div style={{width: 40, height: 1, background: G.red}} />
        <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, color: G.red}}>太贵，卖不动</div>
      </div>
    </Soft>

    {/* 左栏下半空着，补一条三个节点的时间账：两次发布会夹一场广告 */}
    <Soft f={t} at={92} dur={24} style={{left: 152, top: 452, width: 580}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 4, color: G.ivoryFaint, marginBottom: 20}}>一年之间，三次露面</div>
      {[
        ['1983.01.19', 'Lisa 发布', '9,995 美元'],
        ['1984.01.22', '超级碗广告', '60 秒'],
        ['1984.01.24', 'Macintosh 上市', '2,495 美元'],
      ].map((r, i) => (
        <div key={r[0]} style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16}}>
          <div style={{width: 6, height: 6, borderRadius: 3, background: G.gold, flex: '0 0 auto'}} />
          <div style={{fontFamily: GF.num, fontSize: 20, letterSpacing: 0, color: G.gold, width: 168, flex: '0 0 auto'}}>{r[0]}</div>
          <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryDim, width: 150, flex: '0 0 auto'}}>{r[1]}</div>
          <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 1, color: G.ivoryFaint}}>{r[2]}</div>
        </div>
      ))}
    </Soft>

    <VLine f={t} at={52} x={760} y0={200} y1={660} dur={30} />

    <Soft f={t} at={64} dur={22} style={{left: 846, top: 200, width: 940}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, color: G.ivoryDim}}>一九八四 · 一月二十二日 · 超级碗</div>
    </Soft>
    <Soft f={t} at={76} dur={26} style={{left: 842, top: 250, width: 940}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 74, letterSpacing: 4, lineHeight: 1.35, ...goldText(0.75)}}>
        一支六十秒的广告，
        <br />
        只说了一个日期
      </div>
    </Soft>
    <Soft f={t} at={104} dur={22} style={{left: 846, top: 452, width: 940}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.7, color: G.ivoryDim}}>
        没有产品、没有价格、没有公司名字。
        <br />
        结尾只有一行字：1 月 24 日，苹果将推出 Macintosh——你会看到，为什么 1984 不会像《一九八四》。
      </div>
    </Soft>

    <RuleFade f={t} at={132} x={152} y={726} w={1616} dur={18} />
    <Soft f={t} at={144} dur={22} style={{left: 152, top: 752, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivory}}>
        两天后，Macintosh 登场：<span style={goldTextLight(0.3)}>2,495 美元</span>
      </div>
    </Soft>
    <Note f={t} at={156} x={1120} y={748} w={648} text="广告为第 18 届超级碗播出，导演 Ridley Scott；片名《1984》。" />
  </>
);

/* ══ P11 · Macintosh：会笑的电脑，与 128K ════════════════════════ */
export const P11: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1984" caption="一月二十四日 · 库比蒂诺" rollAt={8} prev="1983" />
    <BookCite f={t} at={10} original="Macintosh — Technical Specifications, 1984" title="《Macintosh 技术规格》" meta="128K 内存 · 无硬盘 · 不可扩展" seal="规格" />

    <Soft f={t} at={18} dur={24} style={{left: 152, top: 186, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>它第一次把这三样，放进一台家用机器</div>
    </Soft>
    <KV
      f={t}
      at={34}
      x={152}
      y={250}
      w={820}
      size={30}
      gap={72}
      rows={[
        ['鼠标', '有'],
        ['图形界面', '有'],
        ['会笑的电脑', '有'],
      ]}
      hot={[1]}
    />

    <VLine f={t} at={84} x={1050} y0={214} y1={700} dur={30} />

    <Soft f={t} at={96} dur={22} style={{left: 1136, top: 216, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.red}}>但它是这样一台机器</div>
    </Soft>
    <Soft f={t} at={110} dur={24} style={{left: 1132, top: 268, width: 660}}>
      <div style={{fontFamily: GF.num, fontSize: 130, lineHeight: 1, color: G.red, textShadow: '0 0 26px rgba(200,81,60,0.45)'}}>128K</div>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryDim, marginTop: 10}}>内存 · 没有硬盘 · 不能扩展</div>
    </Soft>

    <Soft f={t} at={140} dur={22} style={{left: 1132, top: 512, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        卖 2,495 美元，却在两年后
        <br />
        被自己的内存卡住。
      </div>
    </Soft>

    <RuleFade f={t} at={158} x={152} y={760} w={1616} dur={18} />
    <Note f={t} at={168} x={152} y={784} w={1000} text="口径：初代 Macintosh 128K，售价 2,495 美元；机器无硬盘、无扩展槽。" />
  </>
);

/* ══ P12 · 1985：九个月，从创始人到离开 ══════════════════════════ */
export const P12: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1985" caption="库比蒂诺 · 九个月" rollAt={8} prev="1984" />
    <BookCite f={t} at={10} original="Apple Computer — Board Minutes, 1985" title="《苹果电脑董事会纪要 1985》" meta="5 月收权 · 9 月辞职" seal="纪要" />

    <Soft f={t} at={18} dur={22} style={{left: 152, top: 178, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim}}>销量掉下来，两个人翻了脸</div>
    </Soft>

    {[
      {y: 246, m: '5 月', t: '董事会收走他的经营权', d: '只保留董事长这个头衔'},
      {y: 396, m: '9 月', t: '他辞职', d: '卖掉手里全部苹果股票'},
      {y: 546, m: '只留', t: '一股', d: '为了还能来开股东大会'},
    ].map((r, i) => (
      <React.Fragment key={r.m}>
        <Soft f={t} at={32 + i * 18} dur={20} style={{left: 152, top: r.y, width: 900}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 26}}>
            <div style={{fontFamily: GF.num, fontSize: 54, letterSpacing: 2, ...goldText(0.4)}}>{r.m}</div>
            <div>
              <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, color: G.ivory}}>{r.t}</div>
              <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 8}}>{r.d}</div>
            </div>
          </div>
        </Soft>
        <RuleFade f={t} at={40 + i * 18} x={152} y={r.y + 116} w={900} dur={16} />
      </React.Fragment>
    ))}

    <VLine f={t} at={92} x={1180} y0={232} y1={700} dur={30} />

    <Soft f={t} at={104} dur={24} style={{left: 1268, top: 236, width: 500}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 5, color: G.ivoryDim}}>他请来的人</div>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 58, letterSpacing: 3, marginTop: 12, ...goldText(0.6)}}>约翰·斯卡利</div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 14, lineHeight: 1.7}}>
        百事可乐总裁
        <br />
        1983 年被乔布斯亲自挖来
      </div>
    </Soft>

    {/* 右栏下半空着，补那句把他请来的话——1983 年挖人时说的 */}
    <Soft f={t} at={122} dur={24} style={{left: 1268, top: 468, width: 500}}>
      <div style={{borderLeft: `2px solid ${G.goldLine}`, paddingLeft: 20}}>
        <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 2, lineHeight: 1.75, color: G.ivory}}>
          「你是想卖一辈子糖水，
          <br />
          还是想改变世界？」
        </div>
        <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 14}}>1983 年，乔布斯挖他时说的话</div>
      </div>
    </Soft>

    <Stamp f={t} at={150} text="出局" x={756} y={556} size={104} rot={-7} />
  </>
);

/* ══ P13 · 十二年：三个 CEO，份额掉到 3% ═════════════════════════ */
export const P13: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1985" caption="接下来的十二年" rollAt={8} prev="1985" />
    <BookCite f={t} at={10} original="Apple Computer — Form 10-K, FY1996 / FY1997" title="《苹果电脑 1996 / 1997 财年年报》" meta="营收 98 亿 · 净亏 10.45 亿" seal="年报" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 176, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim}}>十二年，三个 CEO，一条向下的曲线</div>
    </Soft>

    <Soft f={t} at={34} dur={22} style={{left: 152, top: 240, width: 460}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 3, color: G.ivoryFaint}}>全 球 电 脑 份 额</div>
    </Soft>
    <HLine f={t} at={44} x={152} y={520} w={700} dur={24} />
    <BarsV
      f={t}
      at={52}
      x={172}
      base={520}
      data={[
        ['85', 12],
        ['90', 8],
        ['95', 5],
        ['97', 3],
      ]}
      max={12}
      bw={104}
      gap={54}
      hMax={210}
      hot={3}
      labelSize={19}
      valueSize={30}
      vals={['12%', '8%', '5%', '3%']}
    />

    <VLine f={t} at={88} x={960} y0={222} y1={700} dur={30} />

    <Soft f={t} at={100} dur={22} style={{left: 1046, top: 226, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 4, color: G.ivoryDim}}>三 任 CEO</div>
    </Soft>
    {['斯卡利', '斯平德勒', '阿梅里奥'].map((n, i) => (
      <Soft key={n} f={t} at={110 + i * 14} dur={18} style={{left: 1046, top: 276 + i * 78, width: 720}}>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 18}}>
          <div style={{fontFamily: GF.num, fontSize: 30, color: G.gold}}>{String(i + 1).padStart(2, '0')}</div>
          <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory}}>{n}</div>
        </div>
      </Soft>
    ))}
    <Soft f={t} at={152} dur={20} style={{left: 1046, top: 540, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        1996 财年营收 98 亿美元；
        <br />
        1997 财年净亏 10.45 亿。
      </div>
    </Soft>

    <RuleFade f={t} at={168} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={178} x={152} y={804} w={1040} text="口径：份额为全球 PC 出货量口径的年度估值（IDC／Gartner 系列），1985 年高点约一成出头，1997 年约 3%。" />
  </>
);
