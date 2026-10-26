import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {BarsV, Figure, KV, MiniTable, Note, Ruler, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);

/**
 * ep57 暗金文献版 · 第三幕（P26–P37）
 * 版号 → 股价腰斩 → 930 变革 → 7.35 万亿 → 监管坠落 → 跌出前十 → 视频号 → 2025 财报 → 用户与 AI → 3.5 万亿 → 28 年账 → 收尾
 */

/* ══ P26 · 4.5 万亿与版号 ═════════════════════════════════════════ */
export const P26: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2018" caption="一月 · 巅峰前夜" rollAt={8} prev="2017" />
    <BookCite f={t} at={10} original="原国家新闻出版广电总局 — 2018 版号暂停通知" title="游戏版号审批暂停" meta="2018-03 起 · 游戏收入约占四成的腾讯首当其冲" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="转 折 点" latin="the freeze" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 244}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 160, lineHeight: 1, ...goldText(0.8)}}>4.5</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 14}}>万亿港元</span>
      </div>
    </Soft>
    <Soft f={t} at={48} dur={20} style={{left: 154, top: 440, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, lineHeight: 1.7, color: G.ivoryDim}}>
        2018 年 1 月的市值——
        <br />
        然后三个月后，版号停发。
      </div>
    </Soft>

    <VLine f={t} at={72} x={940} y0={232} y1={660} dur={28} />

    <Soft f={t} at={86} dur={22} style={{left: 1032, top: 258, width: 660}}>
      <MiniTable
        f={t}
        at={90}
        x={1032}
        y={280}
        w={660}
        head={['变化', '内容']}
        colW={[240, 400]}
        rows={[
          ['版号', '2018-03 起暂停审批'],
          ['收入结构', '游戏占约四成'],
          ['结果', '新品无法上线变现'],
        ]}
      />
    </Soft>
    <Soft f={t} at={124} dur={22} style={{left: 1032, top: 520, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        最赚钱的业务，被按了暂停键。
      </div>
    </Soft>

    <RuleFade f={t} at={150} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={160} x={152} y={804} w={1400} text="口径：2018-03 原广电总局暂停游戏版号审批、2018-12 恢复；「游戏占四成」按 2017 年年报网络游戏收入占比约 41%。" />
  </>
);

/* ══ P27 · 475 → 250 ══════════════════════════════════════════════ */
export const P27: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2018" caption="十月 · 股价腰斩" rollAt={8} prev="2018" />
    <BookCite f={t} at={10} original="港交所行情 · 0700.HK 2018" title="股价从 475 港元跌至 250 港元" meta="十个月近乎腰斩 · 市值蒸发约 1.7 万亿港元" seal="行情" />

    <Tag f={t} at={18} x={152} y={188} cn="第 一 次 腰 斩" latin="halved" />

    <BarsV f={t} at={30} x={152} base={590} max={500} bw={220} gap={90} hMax={340} data={[['2018.01', 475], ['2018.10', 250]]} vals={['475 港元', '250 港元']} valueSize={30} />

    <VLine f={t} at={72} x={980} y0={240} y1={660} dur={28} />

    <Soft f={t} at={86} dur={22} style={{left: 1072, top: 280, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        股价从 475，跌到 250。
      </div>
    </Soft>
    <Soft f={t} at={108} dur={22} style={{left: 1072, top: 380, width: 640}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 120, lineHeight: 1, ...goldText(0.6)}}>1.7</span>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim, marginBottom: 14}}>万亿港元蒸发</span>
      </div>
    </Soft>
    <Soft f={t} at={132} dur={22} style={{left: 1072, top: 560, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        没有人知道，这只是第一次。
      </div>
    </Soft>

    <RuleFade f={t} at={154} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={164} x={152} y={804} w={1300} text="口径：2018-01 股价高点约 475 港元、2018-10 低点约 250 港元，区间市值缩水约 1.7 万亿港元（按当日收盘计算）。" />
  </>
);

/* ══ P28 · 930 变革 ═══════════════════════════════════════════════ */
export const P28: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2018" caption="九月三十日 · 全员信" rollAt={8} prev="2018" />
    <BookCite f={t} at={10} original="腾讯 — 930 组织架构调整全员信" title="「930 变革」· 2018-09-30" meta="七大事业群重组为六个 · 转向产业互联网" seal="原件" />

    <Tag f={t} at={18} x={152} y={188} cn="自 我 手 术" latin="reorg" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        9 月 30 日，一封全员信：
        <br />
        <span style={{color: G.gold}}>转向产业互联网。</span>
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={64}
      x={152}
      y={440}
      w={760}
      head={['重组前', '重组后']}
      colW={[360, 380]}
      rows={[
        ['七大事业群（BG）', '六个'],
        ['各自为战的 To C', '成立云与智慧产业事业群'],
        ['消费互联网', '＋产业互联网 双轮'],
      ]}
    />

    <VLine f={t} at={100} x={1030} y0={240} y1={660} dur={28} />

    <GQuote
      f={t}
      at={114}
      x={1122}
      y={270}
      w={600}
      text="在互联网上半场，腾讯的使命是做好连接；下半场，是做好助手。"
      source="930 全员信 · 2018-09-30"
    />

    <RuleFade f={t} at={148} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={158} x={152} y={804} w={1300} text="口径：2018-09-30 宣布架构调整，2018-10-01 生效；引文摘自全员公开信。" />
  </>
);

/* ══ P29 · 766 港元 · 7.35 万亿 ═══════════════════════════════════ */
export const P29: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2021" caption="一月二十五日 · 历史新高" rollAt={8} prev="2018" />
    <BookCite f={t} at={10} original="港交所行情 · 0700.HK 2021-01-25" title="766 港元 · 历史最高价" meta="市值 7.35 万亿港元 · 超过六大国有银行总和" seal="行情" />

    <Tag f={t} at={18} x={152} y={188} cn="登 顶" latin="all-time high" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 248, lineHeight: 1, letterSpacing: 2, ...goldText(0.9)}}>7.35</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 10, color: G.gold, marginBottom: 26}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={52} dur={20} style={{left: 154, top: 520, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>港 元 · 七 百 六 十 六 的 单 价</div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={232} y1={640} dur={30} />

    <Soft f={t} at={84} dur={22} style={{left: 1052, top: 258, width: 660}}>
      <KV
        f={t}
        at={88}
        x={1052}
        y={278}
        w={660}
        size={26}
        gap={52}
        rows={[
          ['对比六大行', '超过总和'],
          ['两年半前', '4.5 万亿'],
          ['三年半前', '刚腰斩过'],
        ]}
        hot={[0]}
      />
    </Soft>
    <Soft f={t} at={124} dur={22} style={{left: 1052, top: 500, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        那时候没人想到——
        <br />
        顶，已经到了。
      </div>
    </Soft>

    <RuleFade f={t} at={152} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={162} x={152} y={724} w={1400} text="口径：2021-01-25 收盘 766 港元、市值约 7.35 万亿港元；「超六大行总和」为当日媒体按工农中建交邮储市值合计的对比。" />
    <Stamp f={t} at={172} text="顶" x={1560} y={560} size={120} rot={-8} />
  </>
);

/* ══ P30 · 监管来了 ═══════════════════════════════════════════════ */
export const P30: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2022" caption="十月 · 198 港元" rollAt={8} prev="2021" />
    <BookCite f={t} at={10} original="港交所行情 · 0700.HK 2022-10" title="股价 198 港元 · 跌去近六成" meta="反垄断、未成年人保护、金融合规多线并进" seal="行情" />

    <Tag f={t} at={18} x={152} y={188} cn="第 二 次 腰 斩" latin="again" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        接着，<span style={{color: G.gold}}>监管来了</span>。
        <br />
        从最高点，跌去近六成。
      </div>
    </Soft>

    <BarsV f={t} at={64} x={152} base={740} max={800} bw={220} gap={90} hMax={300} data={[['2021.01', 766], ['2022.10', 198]]} vals={['766 港元', '198 港元']} valueSize={30} />

    <VLine f={t} at={96} x={980} y0={240} y1={660} dur={28} />

    <Soft f={t} at={110} dur={22} style={{left: 1072, top: 280, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.85, color: G.ivoryDim}}>
        反垄断罚单、未成年人限玩、
        <br />
        金融业务整改——
        <br />
        三条线同时收紧。
      </div>
    </Soft>
    <Soft f={t} at={138} dur={22} style={{left: 1072, top: 540, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        大股东开始减持，公司开始回购自己的股票。
      </div>
    </Soft>

    <RuleFade f={t} at={162} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={172} x={152} y={804} w={1400} text="口径：2022-10 股价低点 198 港元、较 2021-01 高点 766 跌约 74%（即七成四）；市值缩水与股价口径一致。" />
  </>
);

/* ══ P31 · 蒸发 5.4 万亿 · 跌出前十 ═══════════════════════════════ */
export const P31: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2022" caption="两年 · 5.4 万亿" rollAt={8} prev="2022" />
    <BookCite f={t} at={10} original="全球市值排行 · 2021→2022" title="从全球前十跌出" meta="市值蒸发约 5.4 万亿港元" seal="行情" />

    <Soft f={t} at={20} dur={24} style={{left: 152, top: 260}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.7)}}>5.4</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 18}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 158, top: 500, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, lineHeight: 1.7, color: G.ivoryDim}}>
        港 元，两 年 蒸 发
      </div>
    </Soft>

    <VLine f={t} at={64} x={940} y0={240} y1={660} dur={28} />

    <Soft f={t} at={78} dur={22} style={{left: 1032, top: 280, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.75, color: G.ivory}}>
        跌出全球市值<span style={{color: G.red}}>前十</span>。
      </div>
    </Soft>
    <Soft f={t} at={100} dur={22} style={{left: 1032, top: 430, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        二十多年里第一次，
        <br />
        有人认真讨论「腾讯是不是不行了」。
      </div>
    </Soft>

    <RuleFade f={t} at={128} x={152} y={740} w={1616} dur={18} />
    <Note f={t} at={138} x={152} y={764} w={1400} text="口径：2021-01 约 7.35 万亿 → 2022-10 约 1.9 万亿港元，区间缩水约 5.4 万亿（按收盘价计算）；「跌出前十」按 2022-10 全球市值榜。" />
    <Stamp f={t} at={148} text="十年最低" x={1340} y={480} size={104} rot={-7} />
  </>
);

/* ══ P32 · 视频号：全村的希望 ═════════════════════════════════════ */
export const P32: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2023" caption="视频号 · 挑大梁" rollAt={8} prev="2022" />
    <BookCite f={t} at={10} original="腾讯年报 · 2023 年网络广告分部" title="视频号带动广告与生态收入" meta="马化腾：视频号是「全村的希望」" seal="年报" />

    <Tag f={t} at={18} x={152} y={188} cn="翻 期 待" latin="short video" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 800}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        2023 年，视频号挑大梁，
        <br />
        广告、小游戏，利润一路回升。
      </div>
    </Soft>

    <GQuote
      f={t}
      at={64}
      x={152}
      y={440}
      w={820}
      text="视频号是全村的希望。"
      source="马化腾 · 2022 年底内部员工大会"
    />

    <VLine f={t} at={92} x={1030} y0={240} y1={660} dur={28} />

    <Soft f={t} at={106} dur={22} style={{left: 1122, top: 280, width: 580}}>
      <MiniTable
        f={t}
        at={110}
        x={1122}
        y={300}
        w={580}
        head={['修复项', '状态']}
        colW={[240, 320]}
        rows={[
          ['视频号广告', '加载率稳步提升'],
          ['小游戏', '收入高增长'],
          ['游戏版号', '恢复常态化发放'],
        ]}
      />
    </Soft>
    <Soft f={t} at={138} dur={22} style={{left: 1122, top: 540, width: 580}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryFaint}}>
        增长的故事，换了一个引擎继续讲。
      </div>
    </Soft>

    <RuleFade f={t} at={162} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={172} x={152} y={804} w={1300} text="口径：「全村的希望」出自 2022 年底员工大会报道；2023 年广告收入回升与视频号带动为年报口径。" />
  </>
);

/* ══ P33 · 2025 财报 ═══════════════════════════════════════════════ */
export const P33: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2025" caption="全年业绩" rollAt={8} prev="2023" />
    <BookCite f={t} at={10} original="Tencent Holdings — 2025 Annual Results" title="腾讯控股 2025 年全年业绩" meta="营收 7,518 亿元 · 归母净利 2,248 亿元" seal="年报" />

    <Tag f={t} at={18} x={152} y={188} cn="三 十 一 岁 的 腾 讯" latin="FY2025" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 244}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 170, lineHeight: 1, ...goldText(0.85)}}>7,518</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 16}}>亿元</span>
      </div>
    </Soft>
    <Soft f={t} at={48} dur={20} style={{left: 154, top: 446, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>全 年 营 收</div>
    </Soft>

    <Soft f={t} at={66} dur={24} style={{left: 154, top: 520, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        净利 <span style={{color: G.gold}}>2,248 亿</span>，净利率约三成。
      </div>
    </Soft>

    <VLine f={t} at={86} x={940} y0={232} y1={660} dur={28} />

    <Soft f={t} at={100} dur={22} style={{left: 1032, top: 258, width: 660}}>
      <KV
        f={t}
        at={104}
        x={1032}
        y={278}
        w={660}
        size={26}
        gap={50}
        rows={[
          ['微信月活', '14.18 亿'],
          ['Q Q 移动端', '约 5 亿'],
        ]}
        hot={[0]}
      />
    </Soft>
    <Soft f={t} at={132} dur={22} style={{left: 1032, top: 470, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        一个 28 年的产品还活着，
        <br />
        一个 15 年的产品还在涨。
      </div>
    </Soft>

    <RuleFade f={t} at={158} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={168} x={152} y={804} w={1400} text="口径：营收 7,518 亿、归母净利 2,248 亿为 2025 年报数字；QQ 移动终端月活约 5 亿（年报口径）。" />
  </>
);

/* ══ P34 · 混元与元宝 ═════════════════════════════════════════════ */
export const P34: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2025" caption="AI · 全线压上" rollAt={8} prev="2025" />
    <BookCite f={t} at={10} original="腾讯 — 混元大模型 / 元宝 App" title="混元大模型 · 元宝 · AI 全线布局" meta="模型＋入口＋场景三线并进" seal="档案" />

    <Tag f={t} at={18} x={152} y={188} cn="新 一 场 竞 速" latin="AI" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 800}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        混元、元宝，
        <br />
        <span style={{color: G.gold}}>A I 全线压上。</span>
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={62}
      x={152}
      y={430}
      w={780}
      head={['布局', '角色']}
      colW={[280, 480]}
      rows={[
        ['混元大模型', '自研底座模型'],
        ['元宝 App', 'C 端入口'],
        ['微信生态', 'AI 搜索、AI 助手落点'],
      ]}
    />

    <VLine f={t} at={98} x={1040} y0={240} y1={660} dur={28} />

    <Soft f={t} at={112} dur={22} style={{left: 1132, top: 280, width: 570}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.85, color: G.ivoryDim}}>
        这一次它起步不算早——
        <br />
        但它的办法从来不是先跑，
      </div>
    </Soft>
    <Soft f={t} at={140} dur={22} style={{left: 1132, top: 480, width: 570}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        是<span style={{color: G.gold}}>跟着跑，然后超过去</span>。
      </div>
    </Soft>

    <RuleFade f={t} at={164} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={174} x={152} y={804} w={1300} text="口径：混元大模型 2023-09 公布、元宝 App 2024-05 上线；「全线压上」为公司公开表态的概括。" />
  </>
);

/* ══ P35 · 3.5 万亿 · 年初是 6 万亿 ═══════════════════════════════ */
export const P35: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="今天 · 港股" rollAt={8} prev="2025" />
    <BookCite f={t} at={10} original="港交所行情 · 0700.HK 2026-10" title="今天，它市值 3.5 万亿港元" meta="年初曾达约 6 万亿 · 年内回落四成" seal="行情" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 250}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.85)}}>3.5</span>
        <span style={{fontFamily: GF.cn, fontSize: 48, letterSpacing: 8, color: G.gold, marginBottom: 18}}>万亿港元</span>
      </div>
    </Soft>
    <Soft f={t} at={52} dur={20} style={{left: 154, top: 490, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>今 天 的 市 值</div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={232} y1={660} dur={30} />

    <Soft f={t} at={84} dur={22} style={{left: 1052, top: 262, width: 660}}>
      <MiniTable
        f={t}
        at={88}
        x={1052}
        y={282}
        w={660}
        head={['时点', '市值']}
        colW={[300, 340]}
        rows={[
          ['2026 年初', '约 6 万亿港元'],
          ['今天', '约 3.5 万亿港元'],
        ]}
      />
    </Soft>
    <Soft f={t} at={118} dur={22} style={{left: 1052, top: 480, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        一年之内，第三次坐上过山车。
      </div>
    </Soft>

    <RuleFade f={t} at={144} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={154} x={152} y={804} w={1300} text="口径：2026 年初约 6 万亿、当前约 3.5 万亿港元（按写作日行情粗算，发布前请以最新收盘复核）。" />
  </>
);

/* ══ P36 · 28 年的账 ═══════════════════════════════════════════════ */
export const P36: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="回 看 28 年" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="按本文时间轴汇总" title="28 年 · 三次坠落两次登顶" meta="时间账，不是成绩单" seal="汇总" />

    <Soft f={t} at={24} dur={24} style={{left: 152, top: 240, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        28 年，
        <span style={{color: G.gold}}>两次腰斩</span>，
        <br />
        一次差点断粮。
      </div>
    </Soft>

    <Ruler f={t} at={64} x={152} y={500} w={1360} ticks={['1998', '2004', '2011', '2021', '2026']} dur={36} size={17} />

    <RuleFade f={t} at={104} x={152} y={600} w={1616} dur={18} />
    <Soft f={t} at={116} dur={22} style={{left: 152, top: 630, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        从没人要，到 14 亿人离不开。
      </div>
    </Soft>
    <Note f={t} at={136} x={152} y={730} w={1400} text="口径：坠落按 1999 出售失败、2018 版号、2021—2022 回撤计；登顶按 2016 亚洲第一、2021 全球前十计。" />
  </>
);

/* ══ P37 · 收尾：下一次爬得起来吗 ═════════════════════════════════ */
export const P37: React.FC<{t: number}> = ({t}) => (
  <>
    <Soft f={t} at={8} dur={24} style={{left: 0, right: 0, top: 230, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 5, lineHeight: 1.9, color: G.ivoryDim}}>
        Q Q 不是它发明的，微信也不是——
        <br />
        把别人的发明，做到让人离不开。
      </div>
    </Soft>

    <RuleFade f={t} at={52} x={560} y={420} w={800} dur={16} />

    <Soft f={t} at={64} dur={24} style={{left: 0, right: 0, top: 460, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, lineHeight: 1.7, color: G.ivory}}>
        这是它 28 年，攒下的<span style={{color: G.gold}}>本事</span>。
      </div>
    </Soft>

    <Soft f={t} at={92} dur={26} style={{left: 0, right: 0, top: 570, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 52, letterSpacing: 6, lineHeight: 1.6, color: G.ivory}}>
        下一次掉下去，
        <br />
        <span style={{color: G.gold}}>还爬得起来吗？</span>
      </div>
    </Soft>
    <Note f={t} at={124} x={480} y={810} w={960} text="收尾问题不设答案；本片全部数据口径见配套核查表。" />
  </>
);
