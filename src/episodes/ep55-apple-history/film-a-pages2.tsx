import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {Figure, KV, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);


/**
 * ep55 暗金文献版 · 第二幕（P14–P25）
 * 破产 90 天 → 买 NeXT → 微软 1.5 亿 → 砍到 4 格 → iMac → iPod → iPhone → App Store
 * → iPad 超微软 → 告别 → 库克接手
 */

/* ══ P14 · 现金只剩 90 天 ═════════════════════════════════════════ */
export const P14: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1997" caption="库比蒂诺 · 现金 90 天" rollAt={8} prev="1996" />
    <BookCite f={t} at={10} original="Apple Computer — Form 10-K, FY1997" title="《苹果电脑 1997 财年年报》" meta="营收 70.98 亿 · 净亏 10.45 亿" seal="年报" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 180, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim}}>账上还剩的钱，只够撑</div>
    </Soft>
    <Soft f={t} at={32} dur={26} style={{left: 148, top: 232}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
        <span style={{fontFamily: GF.num, fontSize: 280, lineHeight: 1, color: G.red, textShadow: '0 0 34px rgba(200,81,60,0.5)'}}>90</span>
        <span style={{fontFamily: GF.cn, fontSize: 60, letterSpacing: 10, color: G.red, marginBottom: 30}}>天</span>
      </div>
    </Soft>

    <VLine f={t} at={64} x={960} y0={232} y1={660} dur={30} />

    <Soft f={t} at={76} dur={22} style={{left: 1046, top: 236, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 5, color: G.ivoryDim}}>两 个 财 年，一 上 一 下</div>
    </Soft>
    <MiniTable
      f={t}
      at={88}
      x={1046}
      y={292}
      w={720}
      head={['', '营收', '净利']}
      colW={[200, 260, 260]}
      rows={[
        ['1996 财年', '98.3 亿', '−8.16 亿'],
        ['1997 财年', '70.98 亿', '−10.45 亿'],
      ]}
      size={24}
      rowH={54}
    />

    <Soft f={t} at={116} dur={22} style={{left: 1046, top: 486, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        营收一年掉掉近三成，
        <br />
        亏损却在扩大。
      </div>
    </Soft>

    <RuleFade f={t} at={142} x={152} y={726} w={1616} dur={18} />
    <Note f={t} at={152} x={152} y={750} w={1080} text="口径：1997 财年营收 70.98 亿美元、净亏 10.45 亿美元；「90 天」为当时按现金消耗速度的常用说法，非审计口径。" />

    <Stamp f={t} at={162} text="只剩 90 天" x={834} y={512} size={104} rot={-6} />
  </>
);

/* ══ P15 · 4.29 亿买下 NeXT，把创始人买回来 ══════════════════════ */
export const P15: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1996" caption="十二月二十日 · 收购" rollAt={8} prev="1997" />
    <BookCite f={t} at={10} original="Apple Computer — Acquisition of NeXT, 1996-12-20" title="《苹果收购 NeXT 公告》" meta="约 4.29 亿美元 · 现金加股票" seal="公告" />

    <Figure f={t} at={26} x={152} y={244} w={560} label="收 购 价" value="4.29" size={196} unit="亿美元" />
    <Soft f={t} at={54} dur={20} style={{left: 152, top: 540, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        4 亿美元现金，加 150 万股苹果股票。
        <br />
        买的是 NeXT 的操作系统——
        <br />
        也把那个被赶走的人买了回来。
      </div>
    </Soft>

    <VLine f={t} at={76} x={800} y0={228} y1={700} dur={30} />

    <Soft f={t} at={88} dur={24} style={{left: 888, top: 232, width: 880}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 78, letterSpacing: 6, lineHeight: 1.35, ...goldText(0.75)}}>
        十二年后，
        <br />
        他以「顾问」的身份
        <br />
        回到了这栋楼
      </div>
    </Soft>
    <Soft f={t} at={128} dur={20} style={{left: 892, top: 546, width: 860}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        1997 年 9 月，他接受了一个新头衔：临时 CEO。
        <br />
        年薪 1 美元。
      </div>
    </Soft>

    <RuleFade f={t} at={150} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={160} x={152} y={804} w={1400} text="口径：1996-12-20 宣布、1997-02 完成；4.29 亿＝4 亿现金＋150 万股。临时 CEO 任命为 1997-09-16。" />
  </>
);

/* ══ P16 · 1.5 亿美元，和大屏幕上那张脸 ══════════════════════════ */
export const P16: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1997" caption="八月 · 波士顿 Macworld" rollAt={8} prev="1996" />
    <BookCite f={t} at={10} original="Apple & Microsoft — Technology Agreement, 1997-08-06" title="《苹果与微软技术合作协议》" meta="微软投资 1.5 亿美元 · 无投票权" seal="协议" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 184, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim}}>回来的第一个电话，打给了微软</div>
    </Soft>
    <Soft f={t} at={32} dur={24} style={{left: 148, top: 234}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.8)}}>1.5</span>
        <span style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 8, color: G.gold, marginBottom: 22}}>亿美元</span>
      </div>
    </Soft>
    <Soft f={t} at={58} dur={20} style={{left: 154, top: 472, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        外加 IE 成为 Mac 的默认浏览器，
        <br />
        和一份五年期的专利交叉授权。
      </div>
    </Soft>

    <VLine f={t} at={86} x={960} y0={300} y1={640} dur={28} />

    <GQuote
      f={t}
      at={96}
      text="大屏幕上他的脸出现，
台下在嘘。"
      source="1997 年 8 月 6 日 · 波士顿 Macworld 现场"
      x={1330}
      y={318}
      w={1040}
      align="left"
    />

    <RuleFade f={t} at={150} x={152} y={736} w={1616} dur={18} />
    <Note f={t} at={160} x={152} y={760} w={1100} text="口径：微软以 1.5 亿美元购入苹果无投票权股份，承诺 Mac 版 Office 继续开发五年。" />
  </>
);

/* ══ P17 · 15 条产品线，砍到 4 个格子 ════════════════════════════ */
const QUAD = ['桌上 · 专业', '桌上 · 消费', '随身 · 专业', '随身 · 消费'];

export const P17: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1997" caption="产品线 · 十五砍到四" rollAt={8} prev="1997" />

    <Soft f={t} at={18} dur={24} style={{left: 152, top: 276, width: 560}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
        <span style={{fontFamily: GF.num, fontSize: 186, lineHeight: 1, ...goldText(0.5)}}>15</span>
        <span style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim}}>条产品线</span>
      </div>
    </Soft>
    <Soft f={t} at={92} dur={22} style={{left: 152, top: 500, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivoryDim}}>只留 4 个格子</div>
    </Soft>

    <VLine f={t} at={110} x={760} y0={228} y1={700} dur={28} />

    <Soft f={t} at={120} dur={20} style={{left: 848, top: 232, width: 300}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 4, color: G.ivoryFaint}}>专 业</div>
    </Soft>
    <Soft f={t} at={120} dur={20} style={{left: 1200, top: 232, width: 300}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 4, color: G.ivoryFaint}}>消 费</div>
    </Soft>
    <Soft f={t} at={126} dur={20} style={{left: 782, top: 282, width: 120}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 4, color: G.ivoryFaint}}>桌上</div>
    </Soft>
    <Soft f={t} at={126} dur={20} style={{left: 782, top: 470, width: 120}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 4, color: G.ivoryFaint}}>随身</div>
    </Soft>

    {QUAD.map((q, i) => {
      const x = 848 + (i % 2) * 352;
      const y = 282 + Math.floor(i / 2) * 188;
      return (
        <Soft key={q} f={t} at={136 + i * 12} dur={20} style={{left: x, top: y, width: 316}}>
          <div style={{width: 316, height: 156, border: `1px solid ${G.goldLine}`, background: 'rgba(214,180,106,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.gold}}>{q}</div>
          </div>
        </Soft>
      );
    })}

    <Soft f={t} at={186} dur={22} style={{left: 152, top: 606, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        砍掉的每一台机器，
        <br />
        都还有人在做、在卖、在亏。
      </div>
    </Soft>

    <Stamp f={t} at={196} text="不做" x={726} y={596} size={92} rot={-8} />
  </>
);

/* ══ P18 · iMac：1,299 美元，半透明 ══════════════════════════════ */
export const P18: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1998" caption="八月 · iMac" rollAt={8} prev="1997" />
    <BookCite f={t} at={10} original="Apple — iMac Introduction, 1998-08-15" title="《iMac 发布资料》" meta="1,299 美元 · 首年 80 万台" seal="发布" />

    <Figure f={t} at={24} x={152} y={244} w={520} label="售 价" value="1,299" size={176} unit="美元" />
    <Soft f={t} at={50} dur={20} style={{left: 152, top: 556, width: 600}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        半透明的一体机。
        <br />
        主机、屏幕、音箱，装在一个壳里。
      </div>
    </Soft>

    <VLine f={t} at={74} x={820} y0={236} y1={680} dur={28} />

    <Soft f={t} at={86} dur={22} style={{left: 906, top: 240, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 5, color: G.ivoryDim}}>第 一 年 卖 出</div>
    </Soft>
    <Soft f={t} at={96} dur={24} style={{left: 902, top: 284, width: 620}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.7)}}>80</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 18}}>万台</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>上市后 139 天内达成</div>
    </Soft>

    {/* 下半幅原先是空的：补上设计者这一层——iMac 的意义一半在壳子是谁画的 */}
    <RuleFade f={t} at={128} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={134} dur={22} style={{left: 152, top: 728, width: 1560}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim}}>
        外形出自乔纳森·艾维，那年他 <span style={goldTextLight(0.25)}>31 岁</span>——此后二十年的苹果产品，外形几乎都经过他的手。
      </div>
    </Soft>

    <Soft f={t} at={124} dur={22} style={{left: 902, top: 500, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.7, color: G.ivoryDim}}>
        这是苹果第一次
        <br />
        靠一台机器的「样子」卖货。
      </div>
    </Soft>

    <Note f={t} at={152} x={152} y={790} w={1400} text="口径：1998-08-15 上市，售价 1,299 美元；首 139 天售出约 80 万台（苹果官方口径）。" />
  </>
);

/* ══ P19 · iPod：1,000 首歌装进口袋 ══════════════════════════════ */
export const P19: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2001" caption="十月二十三日 · iPod" rollAt={8} prev="1998" />
    <BookCite f={t} at={10} original="Apple — iPod Introduction, 2001-10-23" title="《iPod 发布资料》" meta="399 美元 · 5GB · 1,000 首歌" seal="发布" />

    <Soft f={t} at={20} dur={26} style={{left: 148, top: 236}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, ...goldText(0.85)}}>1,000</span>
        <span style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 8, color: G.gold, marginBottom: 22}}>首歌</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 486, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        装进一个可以放进
        <br />
        上衣口袋的盒子里
      </div>
    </Soft>

    {/* 左下空着：把「5 GB = 1,000 首」的算术摊开，口号才有底气 */}
    <RuleFade f={t} at={112} x={152} y={664} w={760} dur={16} />
    <Soft f={t} at={120} dur={20} style={{left: 152, top: 692, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryFaint}}>
        5 GB 分给 1,000 首，平均一首 5 兆——
        <br />
        这个换算，才是那句口号站得住的原因。
      </div>
    </Soft>

    <VLine f={t} at={70} x={940} y0={228} y1={700} dur={28} />

    <KV
      f={t}
      at={80}
      x={1028}
      y={236}
      w={700}
      size={26}
      gap={64}
      rows={[
        ['价格', '399 美元'],
        ['容量', '5 GB'],
        ['转盘', '机械滚轮'],
        ['单曲（2003）', '0.99 美元'],
      ]}
      hot={[0, 3]}
    />
    <Soft f={t} at={132} dur={22} style={{left: 1028, top: 540, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        2003 年 iTunes 商店上线，
        <br />
        卖的不是机器，是歌。
      </div>
    </Soft>

    {/* 原本这里还有一条 754 的横线加口径注脚，和上面的换算叠在一起糊成一团，删掉 */}
  </>
);

/* ══ P20 · 重新发明手机 ══════════════════════════════════════════ */
export const P20: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2007" caption="一月九日 · 旧金山 Moscone" rollAt={8} prev="2001" />
    <BookCite f={t} at={10} original="Apple — iPhone Introduction, Macworld 2007" title="《iPhone 发布演讲》" meta="6 月 29 日开卖 · 499 美元起" seal="演讲" />

    <GQuote
      f={t}
      at={22}
      original="Today Apple is going to reinvent the phone."
      text="今天，苹果要【重新发明】手机。"
      source="史蒂夫·乔布斯 · 2007 年 1 月 9 日"
      x={152}
      y={248}
      w={1100}
      align="left"
    />

    <Soft f={t} at={82} dur={24} style={{left: 152, top: 556, width: 1080}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        没有键盘。
        <br />
        正面只有一整块玻璃。
      </div>
    </Soft>

    <VLine f={t} at={110} x={1330} y0={236} y1={700} dur={28} />

    <Soft f={t} at={120} dur={22} style={{left: 1416, top: 240, width: 380}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 5, color: G.ivoryDim}}>起 售 价</div>
    </Soft>
    <Soft f={t} at={130} dur={24} style={{left: 1412, top: 284, width: 400}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
        <span style={{fontFamily: GF.num, fontSize: 140, lineHeight: 1, ...goldText(0.7)}}>499</span>
        <span style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 4, color: G.gold, marginBottom: 16}}>美元</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 8}}>4GB · 合约机</div>
    </Soft>
    <Soft f={t} at={158} dur={20} style={{left: 1416, top: 500, width: 400}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, lineHeight: 1.7, color: G.ivoryFaint}}>
        6 月 29 日
        <br />
        美国开卖
      </div>
    </Soft>

    <Stamp f={t} at={176} text="重新发明" x={700} y={682} size={100} rot={-7} />
  </>
);

/* ══ P21 · App Store：500 个应用 ═════════════════════════════════ */
export const P21: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2008" caption="七月 · App Store" rollAt={8} prev="2007" />
    <BookCite f={t} at={10} original="Apple — App Store Launch, 2008-07-10" title="《App Store 上线公告》" meta="首发 500 个应用" seal="公告" />

    <Soft f={t} at={20} dur={24} style={{left: 0, right: 0, top: 300, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 22}}>
        <span style={{fontFamily: GF.num, fontSize: 260, lineHeight: 1, ...goldText(0.95)}}>500</span>
        <span style={{fontFamily: GF.cn, fontSize: 64, letterSpacing: 10, color: G.gold, marginBottom: 34}}>个应用</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={22} style={{left: 0, right: 0, top: 586, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim}}>
        上线第一天，只有这么多。
      </div>
    </Soft>
    <Soft f={t} at={54} dur={22} style={{left: 0, right: 0, top: 654, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, color: G.ivory}}>
        它把「卖手机」变成了「<span style={{color: G.gold}}>收租</span>」。
      </div>
    </Soft>
  </>
);

/* ══ P22 · iPad：第三台，也没有先做 ═══════════════════════════════ */
export const P22: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2010" caption="一月二十七日 · 旧金山" rollAt={8} prev="2008" />
    <BookCite f={t} at={10} original="Apple — iPad Introduction, 2010-01-27" title="《iPad 发布资料》" meta="499 美元起 · 四月上市" seal="发布" />

    <Soft f={t} at={20} dur={26} style={{left: 152, top: 268, width: 760}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 96, letterSpacing: 8, lineHeight: 1.3, ...goldText(0.8)}}>
        第三台
        <br />
        它也没有先做
      </div>
    </Soft>
    <Soft f={t} at={52} dur={22} style={{left: 152, top: 560, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        平板电脑早就有人做过。
        <br />
        苹果做的是让它便宜、让它够快、让它有人买。
      </div>
    </Soft>

    <VLine f={t} at={86} x={1000} y0={236} y1={700} dur={28} />

    <Soft f={t} at={96} dur={22} style={{left: 1088, top: 240, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>同 年 五 月 · 市 值 超 微 软</div>
    </Soft>
    <Soft f={t} at={106} dur={24} style={{left: 1084, top: 288}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1, ...goldText(0.7)}}>2,220</span>
        <span style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 4, color: G.gold, marginBottom: 16}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={130} dur={20} style={{left: 1092, top: 470, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        第一次成为全球最大的科技公司。
        <br />
        距离破产那天，十三年。
      </div>
    </Soft>

    <RuleFade f={t} at={128} x={152} y={772} w={1616} dur={18} />
    <Note f={t} at={138} x={152} y={796} w={1080} text="口径：2010-05-26 苹果市值 2,220 亿美元，超过微软，成为全球市值最高的科技公司。" />
  </>
);

/* ══ P23 · 8.24 辞任，库克接手 ═══════════════════════════════════ */
export const P23: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2011" caption="八月二十四日 · 交接" rollAt={8} prev="2010" />

    <Soft f={t} at={18} dur={24} style={{left: 152, top: 210, width: 780}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
        <span style={{fontFamily: GF.num, fontSize: 104, lineHeight: 1.1, ...goldText(0.6)}}>14</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 12}}>年 CEO</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory, marginTop: 16}}>乔布斯辞去 CEO</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 12}}>董事会任命他为董事长</div>
    </Soft>

    <VLine f={t} at={56} x={960} y0={216} y1={604} dur={28} />

    <Soft f={t} at={66} dur={24} style={{left: 1044, top: 214, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 5, color: G.ivoryDim}}>接 任 的 人</div>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 62, letterSpacing: 4, marginTop: 14, ...goldText(0.7)}}>蒂姆·库克</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 12, lineHeight: 1.7}}>
        1998 年从康柏加入，管供应链出身
        <br />
        他把库存周转从几个月压到了几天
      </div>
    </Soft>

    <Soft f={t} at={102} dur={22} style={{left: 1044, top: 466, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 5, color: G.ivoryDim}}>他 接 手 时 的 市 值</div>
    </Soft>
    <Soft f={t} at={112} dur={24} style={{left: 1040, top: 506}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
        <span style={{fontFamily: GF.num, fontSize: 108, lineHeight: 1, ...goldText(0.65)}}>3,500</span>
        <span style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 4, color: G.gold, marginBottom: 14}}>亿美元</span>
      </div>
    </Soft>

    {/* 两条柱子的下半都空着：补一条库克自己的时间线，三个人名的来路才清楚 */}
    <RuleFade f={t} at={92} x={152} y={628} w={1616} dur={18} />
    {[
      {x: 152, y: '1998', t: '从康柏加入苹果，管全球运营'},
      {x: 720, y: '2005', t: '出任 COO，乔布斯两度病休时由他顶班'},
      {x: 1300, y: '2011', t: '8 月 24 日接任 CEO'},
    ].map((r, i) => (
      <Soft key={r.y} f={t} at={98 + i * 8} dur={20} style={{left: r.x, top: 664, width: 520}}>
        <div style={{fontFamily: GF.num, fontSize: 40, letterSpacing: 2, ...goldText(0.4)}}>{r.y}</div>
        <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryDim, marginTop: 10, lineHeight: 1.6}}>{r.t}</div>
      </Soft>
    ))}

    <RuleFade f={t} at={146} x={152} y={812} w={1616} dur={18} />
    <Note f={t} at={156} x={152} y={838} w={1500} text="口径：2011-08-24 乔布斯辞任 CEO，库克接任；当时市值约 3,500 亿美元。库克 1998 年从康柏加入，2005 年出任 COO。" />
  </>
);

/* ══ P24 · 10 月 5 日 ════════════════════════════════════════════ */
export const P24: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2011" caption="十月 · 库比蒂诺" rollAt={8} prev="2011" />

    <Soft f={t} at={16} dur={24} style={{left: 152, top: 200, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim}}>10 月 4 日 · iPhone 4S 发布</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>他没能到现场</div>
    </Soft>

    <Soft f={t} at={44} dur={26} style={{left: 152, top: 300}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 104, letterSpacing: 6, lineHeight: 1.3, ...goldText(0.85)}}>
        第二天
        <br />
        他去世了
      </div>
      <div style={{fontFamily: GF.num, fontSize: 78, color: G.ivory, marginTop: 18, letterSpacing: 2}}>1955 — 2011</div>
    </Soft>

    <VLine f={t} at={96} x={1000} y0={224} y1={700} dur={28} />

    <Soft f={t} at={106} dur={22} style={{left: 1088, top: 228, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>那 一 年 的 营 收</div>
    </Soft>
    <Soft f={t} at={116} dur={24} style={{left: 1084, top: 272}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 158, lineHeight: 1, ...goldText(0.7)}}>1,083</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 16}}>亿</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>美元 · 2011 财年</div>
    </Soft>
    <Soft f={t} at={148} dur={20} style={{left: 1092, top: 500, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        他留下的是一家
        <br />
        年营收过千亿美元的公司。
      </div>
    </Soft>

    <RuleFade f={t} at={172} x={152} y={776} w={1616} dur={18} />
  </>
);

/* ══ P25 · 库克做的不是新产品 ════════════════════════════════════ */
export const P25: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2011" caption="库克时代 · 铺货" rollAt={8} prev="2011" />
    <BookCite f={t} at={10} original="Apple Inc. — Form 10-K, FY2012–FY2025" title="《苹果公司历年财报》" meta="iPhone 销量 · 国家数 · 服务收入" seal="年报" />

    <Soft f={t} at={20} dur={24} style={{left: 152, top: 220, width: 900}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 76, letterSpacing: 6, lineHeight: 1.35, ...goldText(0.75)}}>
        他做的不是新品类
      </div>
    </Soft>
    <Soft f={t} at={44} dur={24} style={{left: 152, top: 320, width: 900}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 76, letterSpacing: 6, lineHeight: 1.35, color: G.ivory}}>
        是把一台机器
        <br />
        铺到每一个国家
      </div>
    </Soft>

    <VLine f={t} at={86} x={1120} y0={228} y1={600} dur={28} />

    <KV
      f={t}
      at={98}
      x={1208}
      y={236}
      w={540}
      size={24}
      gap={60}
      rows={[
        ['iPhone 累计', '逾 23 亿台'],
        ['在售国家', '190+'],
        ['直营店', '530+'],
        ['服务收入', '破 1,000 亿'],
      ]}
      hot={[0, 3]}
    />

    <Soft f={t} at={148} dur={22} style={{left: 1208, top: 530, width: 540}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        同一个产品，
        <br />
        卖到地球上几乎每一个市场。
      </div>
    </Soft>

    {/* 下半幅空着：把十四年的市值跨度摆出来，接回开场那 5 万亿 */}
    <RuleFade f={t} at={116} x={152} y={632} w={1616} dur={18} />
    {[
      {x: 152, label: '2011 · 他接手那天', num: '3,500', unit: '亿美元'},
      {x: 800, label: '2026 · 五万亿那天', num: '5.045', unit: '万亿美元'},
    ].map((r, i) => (
      <Soft key={r.label} f={t} at={122 + i * 8} dur={20} style={{left: r.x, top: 664, width: 600}}>
        <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>{r.label}</div>
        <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 8}}>
          <span style={{fontFamily: GF.num, fontSize: 60, lineHeight: 1, ...goldText(0.55)}}>{r.num}</span>
          <span style={{fontFamily: GF.cn, fontSize: 24, color: G.ivoryDim, marginBottom: 6}}>{r.unit}</span>
        </div>
      </Soft>
    ))}
    <Soft f={t} at={140} dur={22} style={{left: 660, top: 700, width: 100}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, color: G.gold, opacity: 0.75}}>→</div>
    </Soft>
    <Soft f={t} at={146} dur={22} style={{left: 1480, top: 668, width: 300}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>十四年</div>
      <div style={{fontFamily: GF.cn, fontSize: 56, letterSpacing: 2, color: G.gold, marginTop: 4}}>≈14 倍</div>
    </Soft>

    <Note f={t} at={168} x={152} y={838} w={1560} text="口径：iPhone 2011—2025 累计约 23 亿台；「190+ 国家／地区」为苹果官网表述；门店数取 2025 年末。" />
  </>
);
