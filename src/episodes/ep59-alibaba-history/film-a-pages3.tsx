import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {KV, Mark, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);

/**
 * ep59 暗金文献版 · 第三幕（P25–P36）
 * 二〇二一年跌 48.88% → 60 港元 → 芒格割肉 → 1+6+N → 六个字 → 3,800 亿
 * → 闪购 → 回到 186 → 又跌回 88 → 千问进苹果 → 今天 → 收尾
 */

/* ══ P25 · 一年跌掉 48.88% ════════════════════════════════════════ */
export const P25: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2021" caption="全年 · 港股回撤" rollAt={8} prev="2021" />
    <BookCite f={t} at={7} original="9988.HK — 2021 年度表现" title="一年 · 跌 48.88%" meta="市值蒸发约 1.92 万亿港元" seal="行情" />

    <Tag f={t} at={12} x={152} y={188} cn="这 一 年" latin="the year" />

    <Soft f={t} at={19} dur={26} style={{left: 148, top: 236}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 196, lineHeight: 1, color: G.red, textShadow: '0 0 30px rgba(200,81,60,0.42)'}}>−48.88</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.red, marginBottom: 24}}>%</span>
      </div>
    </Soft>

    <VLine f={t} at={51} x={980} y0={240} y1={600} dur={30} />

    <Soft f={t} at={59} dur={26} style={{left: 1070, top: 258}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1, color: G.ivory, letterSpacing: 2}}>1.92</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 22}}>万亿</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 4, color: G.ivoryDim, marginTop: 16}}>港 元 · 一 年 蒸 发</div>
    </Soft>

    <RuleFade f={t} at={97} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={104} dur={22} style={{left: 152, top: 718, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        一年里，它从一个「不可战胜」的故事，变成一个需要解释的标的。
      </div>
    </Soft>
    <Note f={t} at={116} x={152} y={790} w={1300} text="口径：2021 年 9988.HK 全年跌幅 48.88%（前复权）；市值蒸发按年末与年初总市值差计。" />
  </>
);

/* ══ P26 · 六十港元 ═══════════════════════════════════════════════ */
export const P26: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2022" caption="十月 · 最低点" rollAt={8} prev="2021" />
    <BookCite f={t} at={7} original="9988.HK — 2022 年 10 月" title="股价 60 港元" meta="较 2020 年 10 月高点 309 港元回撤约八成" seal="行情" />

    <Tag f={t} at={12} x={152} y={196} cn="最 低 点" latin="the bottom" />

    <Soft f={t} at={17} dur={28} style={{left: 146, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 232, lineHeight: 1, ...goldText(0.85)}}>60</span>
        <span style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 10, color: G.gold, marginBottom: 26}}>港元</span>
      </div>
    </Soft>
    <Soft f={t} at={30} dur={20} style={{left: 154, top: 512, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>二 〇 二 二 年 十 月</div>
    </Soft>

    <VLine f={t} at={47} x={960} y0={240} y1={600} dur={30} />

    <Soft f={t} at={55} dur={24} style={{left: 1052, top: 260, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        309 → 60，
        <br />
        从最高点跌去 <span style={{...goldTextLight(0.3), fontSize: 40}}>八成</span>。
      </div>
    </Soft>
    <Soft f={t} at={73} dur={22} style={{left: 1052, top: 470, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivory}}>
        两年时间，四万亿市值不见了。
      </div>
    </Soft>

    <RuleFade f={t} at={94} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={101} dur={22} style={{left: 152, top: 728, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.5, color: G.ivoryDim}}>
        那年冬天，市场上流传一句话：阿里已经变成一家「传统零售公司」。
      </div>
    </Soft>
  </>
);

/* ══ P27 · 芒格抄底，亏四成 ═══════════════════════════════════════ */
export const P27: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2022" caption="Daily Journal · 芒格" rollAt={8} prev="2022" />
    <BookCite f={t} at={6} original="Daily Journal Corp. — 13F Filings 2021—2022" title="芒格的阿里持仓" meta="2021 年建仓，2022 年一季度减仓过半" seal="持仓" />

    <Tag f={t} at={11} x={152} y={188} cn="一 个 抄 底 的 人" latin="the value investor" />

    <Soft f={t} at={18} dur={24} style={{left: 152, top: 240, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        芒格也买了。
        <br />
        然后亏了<span style={{color: G.red}}>四成</span>，割掉一半。
      </div>
    </Soft>

    <Soft f={t} at={48} dur={24} style={{left: 1040, top: 250, width: 720}}>
      <div style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, color: G.red, textShadow: '0 0 28px rgba(200,81,60,0.4)'}}>−40%</div>
    </Soft>

    <Mark f={t} at={69} x={1500} y={470} s={70} kind="x" />

    <RuleFade f={t} at={81} x={152} y={620} w={1616} dur={18} />
    <Soft f={t} at={89} dur={24} style={{left: 152, top: 650, width: 1300}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.6, color: G.ivoryDim}}>
        他后来承认，自己看错了：这是一门零售生意，不是一门互联网生意。
      </div>
    </Soft>
    <Note f={t} at={105} x={152} y={760} w={1400} text="口径：Daily Journal 2021 年一季度建仓，2022 年一季度减持约一半；芒格在 2023 年 Daily Journal 年会上称阿里是「我犯过的最严重错误之一」。" />
  </>
);

/* ══ P28 · 1+6+N，八个月收回 ══════════════════════════════════════ */
export const P28: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2023" caption="三月 · 一加六加 N" rollAt={8} prev="2023" />
    <BookCite f={t} at={10} original="阿里巴巴集团 — 全员信 2023 年 3 月 28 日" title="1+6+N 组织变革" meta="集团拆为六大业务集团与多家业务公司" seal="全员信" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 196}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
        <span style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, ...goldText(0.9)}}>1+6+N</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 386, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, color: G.ivoryDim}}>一 个 集 团 · 六 大 业 务 · 多 家 公 司</div>
    </Soft>

    <VLine f={t} at={69} x={980} y0={200} y1={560} dur={30} />

    <KV
      f={t}
      at={81}
      x={1070}
      y={222}
      w={640}
      gap={50}
      size={26}
      rows={[
        ['2023.03', '宣布拆分'],
        ['2023.11', '拆分开始收回'],
        ['2023.09', '蔡崇信接任主席'],
      ]}
      hot={[1]}
    />

    <RuleFade f={t} at={135} x={152} y={610} w={1616} dur={18} />
    <Soft f={t} at={146} dur={24} style={{left: 152, top: 638, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        八个月，从「拆开上市」改回「握成一个拳头」。
      </div>
    </Soft>

    <Stamp f={t} at={176} text="收回" x={1470} y={470} size={150} rot={-8} />
    <Note f={t} at={190} x={152} y={760} w={1400} text="口径：2023 年 3 月宣布 1+6+N；同年 11 月盒马暂缓 IPO、阿里云不再分拆，拆分计划实质收回。" />
  </>
);

/* ══ P29 · 用户为先，AI 驱动 ══════════════════════════════════════ */
export const P29: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2023" caption="九月 · 新班子" rollAt={8} prev="2023" />
    <BookCite f={t} at={6} original="阿里巴巴集团 — 2023 年 9 月全员信" title="用户为先 · AI 驱动" meta="蔡崇信任董事会主席，吴泳铭任 CEO" seal="全员信" />

    <GQuote
      f={t}
      at={12}
      text="【用户为先】，【AI 驱动】"
      source="阿里巴巴集团 · 2023 年 9 月 · 新战略六字"
      x={960}
      y={286}
      w={1600}
      align="center"
    />

    <RuleFade f={t} at={33} x={560} y={548} w={800} dur={16} />
    <Soft f={t} at={40} dur={22} style={{left: 0, right: 0, top: 578, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 5, color: G.ivoryDim}}>
        一家二十六年的公司，把战略压回了六个字
      </div>
    </Soft>

    <Soft f={t} at={52} dur={22} style={{left: 0, right: 0, top: 690, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 42, letterSpacing: 10, color: G.ivoryFaint}}>1999 — 2026</div>
    </Soft>
  </>
);

/* ══ P30 · 三年，三千八百亿 ═══════════════════════════════════════ */
export const P30: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2025" caption="二月 · AI 投入" rollAt={8} prev="2023" />
    <BookCite f={t} at={9} original="Alibaba Group — 2025 年 2 月业绩会" title="三年 · 3,800 亿元" meta="投向云与 AI 基础设施，后追加至 4,600 亿元" seal="业绩会" />

    <Tag f={t} at={16} x={152} y={188} cn="押 注" latin="the bet" />

    <Soft f={t} at={23} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 196, lineHeight: 1, ...goldText(0.9)}}>3,800</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 24}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={41} dur={20} style={{left: 154, top: 480, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>元 · 三 年 · 云 和 A I</div>
    </Soft>

    <VLine f={t} at={67} x={960} y0={240} y1={600} dur={30} />

    <Soft f={t} at={78} dur={26} style={{left: 1052, top: 258, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        通义千问，
        <br />
        <span style={{color: G.gold}}>全球最大的开源模型家族</span>。
      </div>
    </Soft>
    <Soft f={t} at={103} dur={22} style={{left: 1052, top: 470, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        衍生模型数量全球第一，
        <br />
        下载量压过同期的 Llama。
      </div>
    </Soft>

    <RuleFade f={t} at={133} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={142} dur={22} style={{left: 152, top: 728, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        它选了一条和对手不同的路：不藏模型，把模型送出去。
      </div>
    </Soft>
    <Note f={t} at={158} x={1052} y={640} w={700} text="口径：2025 年 2 月宣布三年投入 3,800 亿元；2025 年 9 月云栖大会追加至 4,600 亿元。" />
  </>
);

/* ══ P31 · 闪购，一年亏九百亿 ═════════════════════════════════════ */
export const P31: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2025" caption="七月 · 淘宝闪购" rollAt={8} prev="2025" />
    <BookCite f={t} at={6} original="Alibaba Group — 2026 财年季度业绩" title="即时零售 · 一年投入约 900 亿" meta="淘宝闪购 2025 年 7 月上线，补贴战全面开打" seal="业绩" />

    <Tag f={t} at={12} x={152} y={188} cn="又 一 场 仗" latin="the subsidy war" />

    <Soft f={t} at={18} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 204, lineHeight: 1, color: G.red, textShadow: '0 0 30px rgba(200,81,60,0.38)'}}>900</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.red, marginBottom: 24}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={31} dur={20} style={{left: 154, top: 490, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>元 · 外 卖 大 战 一 年 的 亏 损</div>
    </Soft>

    <VLine f={t} at={49} x={960} y0={240} y1={600} dur={30} />

    <Soft f={t} at={57} dur={26} style={{left: 1052, top: 258, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        用 AI 的利润，
        <br />
        <span style={{color: G.gold}}>去打一场外卖仗</span>。
      </div>
    </Soft>
    <Soft f={t} at={75} dur={22} style={{left: 1052, top: 470, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        2025 年 7 月闪购上线，补贴一路打到年底。
      </div>
    </Soft>

    <RuleFade f={t} at={97} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={103} dur={22} style={{left: 152, top: 728, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        二十年前它是用免费打赢别人，二十年后它是用补贴抢回流量。
      </div>
    </Soft>
    <Note f={t} at={115} x={1052} y={640} w={700} text="口径：900 亿为媒体与券商按季度财报估算的一年累计投入，非公司披露的单独科目。" />
  </>
);

/* ══ P32 · 回到 186，3.7 万亿 ═════════════════════════════════════ */
export const P32: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2025" caption="十月 · 重估" rollAt={8} prev="2025" />
    <BookCite f={t} at={8} original="9988.HK — 2025 年 10 月" title="股价 186 港元 · 市值 3.7 万亿" meta="AI 叙事重估，年内最高区间" seal="行情" />

    <Tag f={t} at={14} x={152} y={196} cn="重 估" latin="the re-rating" />

    <Soft f={t} at={20} dur={28} style={{left: 146, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 224, lineHeight: 1, ...goldText(0.9)}}>186</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 26}}>港元</span>
      </div>
    </Soft>

    <VLine f={t} at={50} x={960} y0={240} y1={580} dur={30} />

    <Soft f={t} at={59} dur={26} style={{left: 1052, top: 258}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 156, lineHeight: 1, ...goldText(0.78)}}>3.7</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 22}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={76} dur={22} style={{left: 1054, top: 450, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        从 60 涨回 186，靠的不是电商，是「中国版 OpenAI」这个说法。
      </div>
    </Soft>

    <RuleFade f={t} at={106} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={114} dur={22} style={{left: 152, top: 718, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        市场用三个月，把它从零售公司重新定价成 AI 公司。
      </div>
    </Soft>
  </>
);

/* ══ P33 · 又跌回 88 ══════════════════════════════════════════════ */
export const P33: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2026" caption="六月 · 再度回撤" rollAt={8} prev="2025" />
    <BookCite f={t} at={7} original="9988.HK — 2026 年 6 月" title="股价 88 港元" meta="八个月，市值蒸发约 1.8 万亿港元" seal="行情" />

    <Tag f={t} at={12} x={152} y={188} cn="八 个 月 后" latin="eight months later" />

    <Soft f={t} at={19} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 214, lineHeight: 1, ...goldText(0.85)}}>88</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.gold, marginBottom: 24}}>港元</span>
      </div>
    </Soft>

    <VLine f={t} at={45} x={960} y0={240} y1={580} dur={30} />

    <Soft f={t} at={53} dur={26} style={{left: 1052, top: 258}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 156, lineHeight: 1, ...goldText(0.7)}}>1.8</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 22}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={68} dur={22} style={{left: 1054, top: 450, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        186 → 88，
        <br />
        八个月，又回去了一半。
      </div>
    </Soft>

    <Stamp f={t} at={93} text="又一半" x={1430} y={470} size={156} rot={-7} />
    <RuleFade f={t} at={109} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={116} dur={22} style={{left: 152, top: 728, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        一个靠叙事涨起来的东西，也会跟着叙事掉下去。
      </div>
    </Soft>
  </>
);

/* ══ P34 · 千问进了苹果 ═══════════════════════════════════════════ */
export const P34: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2026" caption="七月 · 端侧入口" rollAt={8} prev="2026" />
    <BookCite f={t} at={8} original="Alibaba Group — 2026 年 7 月合作公告" title="千问 · 接入苹果中国区系统" meta="为中国大陆 iPhone 提供生成式 AI 服务" seal="合作" />

    <Soft f={t} at={19} dur={24} style={{left: 152, top: 210, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        千问进了苹果的系统。
        <br />
        <span style={{color: G.gold}}>十几亿台设备</span>的入口，
        <br />
        换了一家公司来做。
      </div>
    </Soft>

    <VLine f={t} at={54} x={1080} y0={200} y1={560} dur={30} />

    <Soft f={t} at={64} dur={26} style={{left: 1160, top: 208}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.85)}}>45</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 22}}>%</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 4, color: G.ivoryDim, marginTop: 14}}>A I 云 收 入 增 速</div>
    </Soft>
    <Soft f={t} at={87} dur={22} style={{left: 1160, top: 470, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        二十二个季度新高。
      </div>
    </Soft>

    <RuleFade f={t} at={115} x={152} y={640} w={1616} dur={18} />
    <Soft f={t} at={123} dur={22} style={{left: 152, top: 668, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        电商的增长回到个位数，云和 AI 重新变成了这艘船的马达。
      </div>
    </Soft>
    <Note f={t} at={137} x={152} y={770} w={1350} text="口径：2026 财年四季度阿里云收入同比 +45%，为 22 个季度以来最高；苹果中国区 AI 服务由阿里提供。" />
  </>
);

/* ══ P35 · 今天，九十七点八 ═══════════════════════════════════════ */
export const P35: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="十月 · 今天" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="9988.HK — 2026 年 10 月" title="97.8 港元 · 1.95 万亿" meta="二十六年的第三次回到同一个位置" seal="行情" />

    <Soft f={t} at={26} dur={28} style={{left: 0, right: 0, top: 250, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 232, lineHeight: 1, letterSpacing: 2, ...goldText(0.95)}}>97.8</div>
      <div style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 12, color: G.gold, marginTop: 14}}>港 元 · 1.95 万 亿</div>
    </Soft>

    <RuleFade f={t} at={40} x={460} y={600} w={1000} dur={16} />
    <Soft f={t} at={48} dur={22} style={{left: 0, right: 0, top: 630, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 6, color: G.ivoryDim}}>
        和 1999 年那五十万相比，它长大了两百万倍
      </div>
    </Soft>
  </>
);

/* ══ P36 · 收尾 ═══════════════════════════════════════════════════ */
export const P36: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="回 看 二 十 六 年" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="按本文时间轴汇总" title="26 年 · 三次上市两次差点倒下" meta="时间账，不是成绩单" seal="汇总" />

    <Soft f={t} at={26} dur={24} style={{left: 152, top: 216, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        26 年，
        <span style={{color: G.gold}}>三次上市</span>，
        <br />
        两次差点倒下。
      </div>
    </Soft>

    {/* 自绘时间轴：Ruler 的刻度色太淡，收尾页要看得清 */}
    <Soft f={t} at={64} dur={24} style={{left: 152, top: 452}}>
      <svg width={1400} height={74} style={{overflow: 'visible'}}>
        <line x1={0} y1={18} x2={1400} y2={18} stroke={G.goldLine} />
        {[0, 414, 778, 1037, 1400].map((cx, i) => (
          <g key={i}>
            <line x1={cx} y1={11} x2={cx} y2={25} stroke={G.gold} strokeWidth={1.4} />
            <text x={cx} y={56} textAnchor="middle" fontFamily={GF.num} fontSize={23} fill={G.gold} letterSpacing={2}>
              {['1999', '2007', '2014', '2019', '2026'][i]}
            </text>
          </g>
        ))}
        <circle cx={778} cy={18} r={3.5} fill={G.goldBright} />
      </svg>
    </Soft>

    <RuleFade f={t} at={104} x={152} y={580} w={1616} dur={18} />
    <Soft f={t} at={116} dur={24} style={{left: 152, top: 608, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 4, lineHeight: 1.55, color: G.ivory}}>
        每一次，它都换了一套活法。
      </div>
    </Soft>
    <Soft f={t} at={142} dur={26} style={{left: 152, top: 700, width: 1420}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 5, ...goldText(0.65)}}>
        下一段路，才刚开始。
      </div>
    </Soft>
    <Note f={t} at={170} x={152} y={800} w={1400} text="口径：三次上市指 2007 港交所、2014 纽交所、2019 港股二次上市；两次险境指 2000 年泡沫与 2021—2022 年监管回撤。" />
  </>
);
