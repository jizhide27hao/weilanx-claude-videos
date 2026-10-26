import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {Figure, HLine, KV, Mark, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);

/**
 * ep59 暗金文献版 · 第二幕（P13–P24）
 * 雅虎十亿美元 → 2007 港股 → 首日 +193% → 金融危机腰斩 → 退市去美国
 * → 纽交所 250 亿美元 → 首日 2,300 亿 → 2019 回家 → 6.7 万亿登顶 → 蚂蚁 → 叫停 → 罚单
 */

/* ══ P13 · 雅虎送来十亿美元 ═══════════════════════════════════════ */
export const P13: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2005" caption="八月 · 雅虎入股" rollAt={8} prev="2003" />
    <BookCite f={t} at={10} original="Yahoo! Inc. — Alibaba Strategic Investment" title="雅虎 · 十亿美元入股" meta="2005 年 8 月 · 含雅虎中国全部资产" seal="交易" />

    <Tag f={t} at={18} x={152} y={188} cn="那 一 笔 钱" latin="the Yahoo deal" />

    <Soft f={t} at={26} dur={24} style={{left: 152, top: 240, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 5, color: G.ivoryDim}}>淘宝的钱快烧完了，这时——</div>
    </Soft>
    <Soft f={t} at={38} dur={26} style={{left: 148, top: 300}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.82)}}>10</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 22}}>亿美元</span>
      </div>
    </Soft>
    <Soft f={t} at={60} dur={22} style={{left: 154, top: 490, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 4, lineHeight: 1.7, color: G.ivoryDim}}>
        外加雅虎中国全部资产，
        <br />
        一起并进来。
      </div>
    </Soft>

    <VLine f={t} at={86} x={940} y0={240} y1={620} dur={30} />

    <Soft f={t} at={98} dur={26} style={{left: 1030, top: 258}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, ...goldTextLight(0.4)}}>40</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.ivoryDim, marginBottom: 22}}>%</span>
      </div>
    </Soft>
    <Soft f={t} at={118} dur={22} style={{left: 1034, top: 450, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.75, color: G.ivory}}>
        换走四成股份。
        <br />
        <span style={{color: G.gold}}>淘宝活了下来</span>——代价是这家公司第一次有了一个大股东。
      </div>
    </Soft>

    <Note f={t} at={150} x={1034} y={650} w={700} text="口径：2005 年 8 月交易，10 亿美元现金加雅虎中国资产，换约 40% 股份与 35% 投票权。" />
    <RuleFade f={t} at={166} x={152} y={740} w={1616} dur={18} />
  </>
);

/* ══ P14 · 2007.11 港股上市 ═══════════════════════════════════════ */
export const P14: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2007" caption="十一月 · 港交所" rollAt={8} prev="2005" />
    <BookCite f={t} at={10} original="Alibaba.com (1688.HK) — IPO Prospectus" title="阿里巴巴网络 · 香港上市" meta="2007 年 11 月 6 日 · 代码 1688" seal="招股书" />

    <Tag f={t} at={18} x={152} y={196} cn="第 一 次 上 市" latin="first listing" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, ...goldText(0.9)}}>13.5</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 24}}>港元</span>
      </div>
    </Soft>
    <Soft f={t} at={45} dur={20} style={{left: 154, top: 494, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>发 行 价</div>
    </Soft>

    <VLine f={t} at={71} x={960} y0={240} y1={620} dur={30} />

    <KV
      f={t}
      at={82}
      x={1052}
      y={268}
      w={660}
      gap={52}
      size={26}
      rows={[
        ['上市主体', 'B2B 业务'],
        ['募资', '116 亿港元'],
        ['时间', '2007.11.06'],
      ]}
      hot={[1]}
    />

    <RuleFade f={t} at={138} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={147} dur={22} style={{left: 152, top: 718, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        上市的只是一块业务——做批发生意的 B2B。淘宝和支付宝，没进去。
      </div>
    </Soft>
    <Note f={t} at={165} x={1052} y={620} w={660} text="口径：1688.HK 为阿里巴巴网络技术有限公司，主营 B2B 外贸与内贸平台。" />
  </>
);

/* ══ P15 · 首日 +193% ═════════════════════════════════════════════ */
export const P15: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2007" caption="十一月 · 首日收盘" rollAt={8} prev="2007" />
    <BookCite f={t} at={9} original="Alibaba.com (1688.HK) — First Trading Day" title="上市首日 · 涨 193%" meta="收盘 39.5 港元，盘中最高 41.8 港元" seal="行情" />

    <Soft f={t} at={22} dur={26} style={{left: 0, right: 0, top: 226, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 268, lineHeight: 1, letterSpacing: 4, ...goldText(0.95)}}>+193%</div>
    </Soft>

    <Soft f={t} at={57} dur={22} style={{left: 0, right: 0, top: 540, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 6, color: G.ivory}}>市值近 2,000 亿港元</div>
    </Soft>

    <RuleFade f={t} at={86} x={460} y={640} w={1000} dur={18} />
    <Soft f={t} at={98} dur={22} style={{left: 0, right: 0, top: 672, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 33, letterSpacing: 5, color: G.gold}}>全 球 第 五 大 互 联 网 公 司</div>
    </Soft>
    <Soft f={t} at={121} dur={22} style={{left: 0, right: 0, top: 744, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, color: G.ivoryDim}}>那一刻，它是中国市值最高的互联网公司。</div>
    </Soft>
    <Note f={t} at={138} x={152} y={800} w={1100} text="口径：2007 年 11 月 6 日收盘 39.5 港元，较发行价 13.5 港元涨 192.6%；市值约 1,999 亿港元。" />
  </>
);

/* ══ P16 · 第二年，金融危机 ═══════════════════════════════════════ */
export const P16: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2008" caption="十二月 · 金融危机" rollAt={8} prev="2007" />
    <BookCite f={t} at={10} original="1688.HK — 2007 年 11 月—2008 年 12 月" title="一年之内 · 跌掉九成" meta="盘中高点 41.80 → 低点 3.42 港元" seal="行情" />

    <Tag f={t} at={18} x={152} y={188} cn="一 年 之 后" latin="one year later" />

    <Soft f={t} at={30} dur={24} style={{left: 152, top: 244, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>二 〇 〇 七 年 十 一 月</div>
      <div style={{fontFamily: GF.num, fontSize: 128, lineHeight: 1.15, marginTop: 8, color: G.ivoryDim, letterSpacing: 2}}>41.8</div>
    </Soft>

    <Soft f={t} at={66} dur={24} style={{left: 780, top: 330, width: 200}}>
      <div style={{fontFamily: GF.num, fontSize: 54, color: G.goldDeep, textAlign: 'center'}}>↓</div>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.red, textAlign: 'center', marginTop: 6}}>九 成</div>
    </Soft>

    <Soft f={t} at={86} dur={26} style={{left: 1040, top: 240, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>二 〇 〇 八 年 十 二 月</div>
      <div style={{fontFamily: GF.num, fontSize: 172, lineHeight: 1.1, marginTop: 8, ...goldText(0.8)}}>3.42</div>
    </Soft>

    <RuleFade f={t} at={130} x={152} y={600} w={1616} dur={18} />
    <Soft f={t} at={142} dur={24} style={{left: 152, top: 628, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        2012 年，集团用 <span style={{color: G.gold}}>13.5 港元</span>——就是当年的发行价——把它私有化，退了市。
      </div>
    </Soft>

    <Stamp f={t} at={178} text="退市" x={1530} y={300} size={150} rot={-8} />
    <Note f={t} at={192} x={152} y={760} w={1400} text="口径：私有化价格 13.5 港元／股，2012 年 6 月完成，回购金额约 190 亿港元。" />
  </>
);

/* ══ P17 · 退市，是为了整个集团上市 ═══════════════════════════════ */
export const P17: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2013" caption="香港 · 同股不同权" rollAt={8} prev="2012" />
    <BookCite f={t} at={10} original="HKEX — 2013 年上市规则咨询" title="港交所 · 不接受同股不同权" meta="合伙人制度与「一股一票」冲突" seal="规则" />

    <Tag f={t} at={18} x={152} y={188} cn="退 市 之 后" latin="after the delisting" />

    <Soft f={t} at={28} dur={22} style={{left: 152, top: 236, width: 1500}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, color: G.ivory}}>
        退市，是为了把整个集团装进一张股票里。
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={62}
      x={152}
      y={340}
      w={1240}
      head={['时间', '动作', '结果']}
      colW={[260, 520, 460]}
      rows={[
        ['2012.06', '从港交所私有化退市', '集团重新收拢'],
        ['2013.09', '申请回香港上市', '合伙人制度被拒'],
        ['2013.10', '改道美国', '接受双层股权'],
      ]}
      size={26}
      rowH={62}
    />

    <Mark f={t} at={140} x={1310} y={472} s={54} kind="x" />

    <RuleFade f={t} at={160} x={152} y={672} w={1616} dur={18} />
    <Soft f={t} at={172} dur={22} style={{left: 152, top: 700, width: 1440}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        香港不肯让创始团队用少数股份控制公司。它转身去了纽约——这一去，就是五年。
      </div>
    </Soft>
    <Note f={t} at={192} x={152} y={790} w={1400} text="口径：2013 年 9 月阿里巴巴放弃香港上市计划；2014 年选择纽交所，采用合伙人提名董事制度。" />
  </>
);

/* ══ P18 · 纽交所，250 亿美元 ═════════════════════════════════════ */
export const P18: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2014" caption="九月十九日 · 纽交所" rollAt={8} prev="2013" />
    <BookCite f={t} at={10} original="Alibaba Group (BABA.N) — IPO Prospectus" title="阿里巴巴 · 纽交所上市" meta="2014 年 9 月 19 日 · 代码 BABA" seal="招股书" />

    <Tag f={t} at={18} x={152} y={196} cn="第 二 次 上 市" latin="NYSE" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 196, lineHeight: 1, ...goldText(0.9)}}>250</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.gold, marginBottom: 24}}>亿美元</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 480, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 5, color: G.gold}}>美 股 史 上 最 大 的 I P O</div>
    </Soft>

    <VLine f={t} at={76} x={980} y0={240} y1={620} dur={30} />

    <KV
      f={t}
      at={88}
      x={1070}
      y={272}
      w={640}
      gap={54}
      size={26}
      rows={[
        ['发行价', '68 美元'],
        ['首日收盘', '93.89 美元'],
        ['募资总额', '250 亿美元'],
      ]}
      hot={[0]}
    />

    <RuleFade f={t} at={150} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={160} dur={22} style={{left: 152, top: 718, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        那一年，全球资本市场都在等这一单。敲钟的不是马云一个人，是八张陌生的脸。
      </div>
    </Soft>
    <Note f={t} at={180} x={1070} y={630} w={640} text="口径：含超额配售权全额行使，募资总额 250.3 亿美元；发行价 68 美元。" />
  </>
);

/* ══ P19 · 首日 2,300 亿美元 ══════════════════════════════════════ */
export const P19: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2014" caption="九月十九日 · 收盘" rollAt={8} prev="2014" />
    <BookCite f={t} at={10} original="BABA.N — First Trading Day Close" title="首日收盘 · 市值 2,314 亿美元" meta="全球第二大互联网公司，仅次于谷歌" seal="行情" />

    <Soft f={t} at={26} dur={26} style={{left: 0, right: 0, top: 230, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 240, lineHeight: 1, letterSpacing: 2, ...goldText(0.95)}}>2,314</div>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 12, color: G.gold, marginTop: 14}}>亿 美 元</div>
    </Soft>

    <RuleFade f={t} at={80} x={460} y={620} w={1000} dur={18} />
    <Soft f={t} at={92} dur={24} style={{left: 0, right: 0, top: 650, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 6, color: G.ivory}}>全球第二大互联网公司</div>
    </Soft>
    <Soft f={t} at={118} dur={22} style={{left: 0, right: 0, top: 726, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim}}>排在前面的，只有谷歌一家。</div>
    </Soft>
  </>
);

/* ══ P20 · 2019 回家，四万亿 ══════════════════════════════════════ */
export const P20: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2019" caption="十一月二十六日 · 回港" rollAt={8} prev="2014" />
    <BookCite f={t} at={10} original="Alibaba Group (9988.HK) — Secondary Listing" title="阿里巴巴 · 香港第二次上市" meta="2019 年 11 月 26 日 · 发行价 176 港元" seal="招股书" />

    <Tag f={t} at={18} x={152} y={188} cn="回 家" latin="homecoming" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 186, lineHeight: 1, ...goldText(0.88)}}>176</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 8, color: G.gold, marginBottom: 22}}>港元</span>
      </div>
    </Soft>

    <KV
      f={t}
      at={56}
      x={152}
      y={470}
      w={640}
      gap={48}
      size={25}
      rows={[
        ['募资', '1,012 亿港元'],
        ['市值', '4 万亿港元'],
      ]}
      hot={[1]}
    />

    <Soft f={t} at={104} dur={26} style={{left: 960, top: 250, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        五年后，它回到香港。
        <br />
        <span style={{color: G.gold}}>港股市值第一</span>，
        <br />
        压过了腾讯。
      </div>
    </Soft>

    <Stamp f={t} at={150} text="第一" x={1430} y={540} size={176} rot={-9} />
    <RuleFade f={t} at={168} x={152} y={740} w={1616} dur={18} />
    <Note f={t} at={182} x={152} y={770} w={1300} text="口径：含超额配售，募资约 1,012 亿港元；上市首日市值约 4 万亿港元，为当年港股第一。" />
  </>
);

/* ══ P21 · 309 港元，6.7 万亿 ═════════════════════════════════════ */
export const P21: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2020" caption="十月 · 历史高点" rollAt={8} prev="2019" />
    <BookCite f={t} at={10} original="9988.HK — 2020 年 10 月 27 日" title="股价 309 港元 · 市值 6.7 万亿" meta="疫情把所有人赶上网的那一年" seal="行情" />

    <Tag f={t} at={18} x={152} y={196} cn="顶 点" latin="the peak" />

    <Soft f={t} at={26} dur={28} style={{left: 146, top: 236}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 240, lineHeight: 1, letterSpacing: 2, ...goldText(0.95)}}>6.7</span>
        <span style={{fontFamily: GF.cn, fontSize: 52, letterSpacing: 10, color: G.gold, marginBottom: 28}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 512, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 5, color: G.ivoryDim}}>港 元 · 二 〇 二 〇 年 十 月</div>
    </Soft>

    <VLine f={t} at={70} x={980} y0={232} y1={600} dur={30} />

    <Soft f={t} at={82} dur={26} style={{left: 1076, top: 250}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 156, lineHeight: 1, ...goldText(0.75)}}>309</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 22}}>港元</span>
      </div>
    </Soft>
    <Soft f={t} at={104} dur={22} style={{left: 1080, top: 440, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        疫情三年，生意从街边搬到了手机上。
        <br />
        它站在了最高处。
      </div>
    </Soft>

    <Stamp f={t} at={150} text="顶" x={1620} y={230} size={140} rot={-8} />
    <RuleFade f={t} at={168} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={178} dur={22} style={{left: 152, top: 728, width: 1300}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        从 176 到 309，用了十一个月。从 309 回到起点，用了五年。
      </div>
    </Soft>
  </>
);

/* ══ P22 · 同一个月，蚂蚁 ═════════════════════════════════════════ */
export const P22: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2020" caption="十月 · 蚂蚁集团" rollAt={8} prev="2020" />
    <BookCite f={t} at={10} original="Ant Group — 科创板／港交所 招股说明书" title="蚂蚁集团 · 定价 68.8 元" meta="A+H 同步发行 · 合计估值约 2.1 万亿元" seal="招股书" />

    <Tag f={t} at={18} x={152} y={188} cn="同 一 个 月" latin="the other listing" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.9)}}>2.1</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 24}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 480, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>估 值 · 史 上 最 大 的 I P O</div>
    </Soft>

    <VLine f={t} at={76} x={960} y0={240} y1={620} dur={30} />

    <KV
      f={t}
      at={88}
      x={1052}
      y={268}
      w={660}
      gap={52}
      size={26}
      rows={[
        ['发行价', '68.8 元'],
        ['上市地', '科创板 + 港股'],
        ['募资规模', '约 2,300 亿元'],
      ]}
      hot={[0]}
    />

    <RuleFade f={t} at={148} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={158} dur={22} style={{left: 152, top: 718, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        如果它上了，这会是一场把两个交易所同时点着的上市。
      </div>
    </Soft>
    <Note f={t} at={176} x={152} y={790} w={1300} text="口径：A 股定价 68.8 元／股，H 股 80 港元；A+H 合计募资约 2,300 亿元，总估值约 2.1 万亿元。" />
  </>
);

/* ══ P23 · 十一月三日，叫停 ═══════════════════════════════════════ */
export const P23: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2020" caption="十月二十四日—十一月三日" rollAt={8} prev="2020" />
    <BookCite f={t} at={10} original="上海证券交易所 — 暂缓蚂蚁科技集团上市的决定" title="暂缓上市 · 2020 年 11 月 3 日" meta="原定 11 月 5 日 A+H 同步挂牌" seal="公告" />

    <Soft f={t} at={24} dur={22} style={{left: 152, top: 220, width: 1500}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 4, lineHeight: 1.6, color: G.ivoryDim}}>
        10 月 24 日，马云在外滩讲话。　→　11 月 3 日，上市被叫停。
      </div>
    </Soft>

    <Soft f={t} at={62} dur={26} style={{left: 0, right: 0, top: 340, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 230, lineHeight: 1, letterSpacing: 4, ...goldText(0.9)}}>2</div>
      <div style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 12, color: G.gold, marginTop: 10}}>万 亿 的 估 值</div>
    </Soft>

    <Soft f={t} at={104} dur={24} style={{left: 0, right: 0, top: 640, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.ivory}}>停在了纸上</div>
    </Soft>

    <Stamp f={t} at={140} text="叫停" x={1500} y={300} size={180} rot={-11} />
    <RuleFade f={t} at={168} x={560} y={740} w={800} dur={18} />
  </>
);

/* ══ P24 · 182.28 亿 ══════════════════════════════════════════════ */
export const P24: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2021" caption="四月 · 反垄断" rollAt={8} prev="2020" />
    <BookCite f={t} at={7} original="国家市场监督管理总局 — 行政处罚决定书" title="反垄断罚单 · 182.28 亿元" meta="2021 年 4 月 10 日 · 按 2019 年销售额 4% 计" seal="处罚" />

    <Tag f={t} at={12} x={152} y={196} cn="罚 单" latin="the fine" />

    <Soft f={t} at={17} dur={28} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 196, lineHeight: 1, ...goldText(0.85)}}>182.28</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 24}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={32} dur={20} style={{left: 154, top: 486, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>元 · 二 〇 二 一 年 四 月</div>
    </Soft>

    <VLine f={t} at={51} x={980} y0={240} y1={600} dur={30} />

    <KV
      f={t}
      at={59}
      x={1070}
      y={272}
      w={640}
      gap={52}
      size={26}
      rows={[
        ['立案', '2020.12'],
        ['依据', '「二选一」'],
        ['比例', '上年销售额 4%'],
      ]}
      hot={[2]}
    />

    <RuleFade f={t} at={100} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={107} dur={22} style={{left: 152, top: 718, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        中国反垄断史上最大的一张罚单。它认了，当天缴清。
      </div>
    </Soft>
    <Note f={t} at={119} x={1070} y={630} w={640} text="口径：罚款 182.28 亿元，按 2019 年中国境内销售额 4,557.12 亿元的 4% 计算。" />
  </>
);
