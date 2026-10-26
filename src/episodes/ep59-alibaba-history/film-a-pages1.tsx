import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {Col, Figure, HLine, KV, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);

/**
 * ep59 暗金文献版 · 第一幕（P01–P12）
 * 钩子 → 三次上市一次退市 → 跌掉八成 → 湖畔花园 → 一百零二年 → 拒三十八家
 * → 六分钟 → 泡沫破了 → 非典淘宝 → 免费 → eBay 退出 → 担保交易
 */

/* ══ P01 · 现在，不到 2 万亿 ═══════════════════════════════════════ */
export const P01: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="香港 · 九九八八" rollAt={8} prev="2025" />
    <BookCite
      f={t}
      at={10}
      original="Hong Kong Exchanges — Alibaba Group (9988.HK)"
      title="阿里巴巴集团 · 港股市值"
      meta="2026 年 10 月 · 现价 97.80 港元 · 总市值约 1.95 万亿港元"
      seal="行情"
    />

    <Tag f={t} at={20} x={152} y={196} cn="现 在" latin="today" />

    <Soft f={t} at={26} dur={26} style={{left: 146, top: 236}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 236, lineHeight: 1, letterSpacing: 2, ...goldText(0.92)}}>1.95</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 10, color: G.gold, marginBottom: 30}}>万亿</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 512, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>港 元 · 第 三 次 回 到 起 点</div>
    </Soft>

    <VLine f={t} at={70} x={980} y0={232} y1={600} dur={30} />

    <KV
      f={t}
      at={84}
      x={1076}
      y={248}
      w={640}
      gap={54}
      size={26}
      rows={[
        ['一年前', '3.7 万亿'],
        ['五年前', '6.7 万亿'],
        ['最狠时', '跌掉八成'],
      ]}
      hot={[1]}
    />

    <RuleFade f={t} at={136} x={152} y={650} w={1616} dur={18} />
    <Soft f={t} at={148} dur={22} style={{left: 152, top: 678, width: 1180}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        卖东西的公司，自己的估值也上了一回货架——
        <span style={goldTextLight(0.3)}>涨到 6.7 万亿，再跌回 1.95 万亿</span>。
      </div>
    </Soft>
    <Note f={t} at={168} x={1076} y={492} w={620} text="口径：市值按港股 9988.HK 总市值；峰值 6.7 万亿为 2020 年 10 月。" />
  </>
);

/* ══ P02 · 三次上市，一次退市 ═════════════════════════════════════ */
export const P02: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="1999" caption="湖畔花园 · 五十万起家" rollAt={8} prev="2026" />
    <BookCite f={t} at={8} original="Alibaba Group — Listing History" title="阿里巴巴 · 历次上市文件" meta="2007 港交所 · 2012 私有化 · 2014 纽交所 · 2019 回港" seal="沿革" />

    <Tag f={t} at={14} x={152} y={188} cn="上 市 史" latin="listing history" />

    <MiniTable
      f={t}
      at={30}
      x={152}
      y={252}
      w={860}
      head={['时间', '地点', '价格', '结果']}
      colW={[190, 230, 220, 220]}
      rows={[
        ['2007.11', '港交所', '13.5 港元', '募资 116 亿'],
        ['2012.06', '私有化', '13.5 港元', '退市'],
        ['2014.09', '纽交所', '68 美元', '募资 250 亿美元'],
        ['2019.11', '港交所', '176 港元', '募资 1,012 亿'],
      ]}
      size={23}
      rowH={52}
    />

    <VLine f={t} at={79} x={1080} y0={240} y1={620} dur={30} />

    <Soft f={t} at={88} dur={24} style={{left: 1150, top: 250, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>起 家 的 本 钱</div>
    </Soft>
    <Soft f={t} at={94} dur={24} style={{left: 1148, top: 300}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.85)}}>50</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.gold, marginBottom: 20}}>万</span>
      </div>
    </Soft>
    <Soft f={t} at={108} dur={22} style={{left: 1154, top: 490, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 4, lineHeight: 1.7, color: G.ivoryDim}}>
        十八个人凑的，
        <br />
        后来变成 <span style={{...goldTextLight(0.3), fontSize: 30}}>6.7 万亿</span>。
      </div>
    </Soft>

    <RuleFade f={t} at={121} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={129} dur={22} style={{left: 152, top: 728, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        二十六年，它上过三次市，退过一次市。中间那四年，它不在任何一张交易所的牌子上。
      </div>
    </Soft>
  </>
);

/* ══ P03 · 跌掉八成 ═══════════════════════════════════════════════ */
export const P03: React.FC<{t: number}> = ({t}) => (
  <>
    {/* 目录句只给 4.3 秒，做成页顶一行小字 */}
    <Soft f={t} at={7} dur={18} style={{left: 0, right: 0, top: 150, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 8, color: G.ivoryFaint}}>
        得把时间线拉出来看——1999 创立　→　2007 港股　→　2014 纽交所　→　2020 登顶　→　2026 回到起点
      </div>
    </Soft>

    <Soft f={t} at={20} dur={24} style={{left: 0, right: 0, top: 240, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 12, color: G.ivoryDim}}>最 狠 的 时 候</div>
    </Soft>

    <Soft f={t} at={29} dur={26} style={{left: 0, right: 0, top: 300, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 300, lineHeight: 1, letterSpacing: 2, ...goldText(0.95)}}>80%</div>
    </Soft>

    <Soft f={t} at={51} dur={22} style={{left: 0, right: 0, top: 610, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 8, color: G.ivory}}>从 309 港元，跌到 60 港元</div>
    </Soft>

    <RuleFade f={t} at={77} x={560} y={700} w={800} dur={18} />
    <Soft f={t} at={88} dur={22} style={{left: 0, right: 0, top: 728, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 5, color: G.ivoryDim}}>这个数字，比它任何一年的利润都更被人记住。</div>
    </Soft>
  </>
);

/* ══ P04 · 1999.2 湖畔花园 ════════════════════════════════════════ */
export const P04: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="二月 · 杭州湖畔花园" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="阿里巴巴 — 创立十八人名单" title="1999 年 2 月 · 湖畔花园十六栋" meta="十八人 · 五十万元 · 第一次全员会" seal="创业" />

    <Tag f={t} at={18} x={152} y={196} cn="创 立" latin="incorporation" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.88)}}>50</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 22}}>万</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 482, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>十 八 个 人，一 间 民 宅，凑 的</div>
    </Soft>

    <VLine f={t} at={76} x={960} y0={240} y1={620} dur={30} />

    <Soft f={t} at={90} dur={24} style={{left: 1050, top: 256, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        使命是
        <br />
        <span style={{color: G.gold}}>让天下没有难做的生意</span>。
      </div>
    </Soft>
    <Note f={t} at={140} x={1050} y={640} w={700} text="口径：五十万为十八位创始人合计出资；湖畔花园为杭州文一西路民宅，公司注册地为杭州。" />
  </>
);

/* ══ P05 · 一家活一百零二年的公司 ═════════════════════════════════ */
export const P05: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="湖畔花园 · 目标" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="马云 — 1999 年内部讲话" title="活一百零二年的公司" meta="「我们是 102 年的公司」 · 回忆口径" seal="讲话" />

    <Tag f={t} at={18} x={152} y={196} cn="目 标" latin="the 102-year company" />

    <Soft f={t} at={26} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, ...goldText(0.9)}}>102</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 22}}>年</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 490, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>跨 三 个 世 纪，凑 一 个 整 数</div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={240} y1={640} dur={30} />

    <KV
      f={t}
      at={84}
      x={1052}
      y={262}
      w={660}
      gap={52}
      size={26}
      rows={[
        ['最难的月份', '工资发一半'],
        ['蔡崇信加入', '放弃百万年薪'],
        ['当时月薪', '五百元'],
      ]}
      hot={[1]}
    />

    <RuleFade f={t} at={150} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={160} dur={22} style={{left: 152, top: 718, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        一个投行出身的人，跑到民宅里领五百块月薪——他看的是那 102 年。
      </div>
    </Soft>
    <Note f={t} at={176} x={1052} y={648} w={660} text="口径：102 年、工资发一半为创始团队回忆；蔡崇信 1999 年放弃投行职位加入，任 CFO。" />
  </>
);

/* ══ P06 · 拒了三十八家，拿了高盛 ═════════════════════════════════ */
export const P06: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="融资 · 第一轮" rollAt={8} prev="1999" />
    <BookCite f={t} at={9} original="Goldman Sachs — Alibaba Series A" title="高盛领投 · 五百万美元" meta="1999 年 10 月 · 首轮机构融资" seal="融资" />

    <Tag f={t} at={16} x={152} y={188} cn="第 一 轮" latin="series A" />

    <Soft f={t} at={27} dur={24} style={{left: 152, top: 244, width: 640}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, ...goldTextLight(0.4)}}>38</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.ivoryDim, marginBottom: 24}}>家</span>
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim, marginTop: 18}}>见 完 之 后，全 部 拒 掉</div>
    </Soft>

    <Soft f={t} at={53} dur={24} style={{left: 700, top: 330, width: 120}}>
      <div style={{fontFamily: GF.num, fontSize: 60, color: G.goldDeep, textAlign: 'center'}}>→</div>
    </Soft>

    <Soft f={t} at={64} dur={26} style={{left: 880, top: 200, width: 560}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, ...goldText(0.8)}}>500</span>
        <span style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 6, color: G.gold, marginBottom: 24}}>万美元</span>
      </div>
    </Soft>
    <Soft f={t} at={80} dur={22} style={{left: 886, top: 430, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, lineHeight: 1.7, color: G.ivoryDim}}>
        高盛领投。
        <br />
        他不要钱多的人，要<span style={{color: G.gold}}>懂这一行的人</span>。
      </div>
    </Soft>

    <RuleFade f={t} at={110} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={119} dur={22} style={{left: 152, top: 728, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        三十八家出局，一家进来。选投资人这件事，他从第一轮就在挑。
      </div>
    </Soft>
  </>
);

/* ══ P07 · 六分钟，两千万美元 ═════════════════════════════════════ */
export const P07: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2000" caption="一月 · 孙正义" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="SoftBank — Alibaba Investment" title="软银 · 两千万美元" meta="2000 年 1 月 · 会谈时长约六分钟" seal="融资" />

    <Tag f={t} at={18} x={152} y={196} cn="六 分 钟" latin="six minutes" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 224, lineHeight: 1, ...goldText(0.9)}}>6</span>
        <span style={{fontFamily: GF.cn, fontSize: 50, letterSpacing: 8, color: G.gold, marginBottom: 26}}>分钟</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 520, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>孙 正 义 听 完，就 决 定 投</div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={240} y1={620} dur={30} />

    <Soft f={t} at={82} dur={26} style={{left: 1050, top: 258}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.8)}}>2,000</span>
        <span style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 6, color: G.gold, marginBottom: 20}}>万美元</span>
      </div>
    </Soft>
    <Soft f={t} at={102} dur={22} style={{left: 1050, top: 470, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.75, color: G.ivory}}>
        这笔钱，<span style={{color: G.gold}}>后来救了它的命</span>。
      </div>
    </Soft>
    <Note f={t} at={130} x={1050} y={620} w={680} text="口径：软银 2000 年 1 月投资 2,000 万美元；「六分钟」为双方多次访谈中的共同说法。" />
  </>
);

/* ══ P08 · 泡沫破了 ═══════════════════════════════════════════════ */
export const P08: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2000" caption="春天 · 互联网泡沫破裂" rollAt={8} prev="2000" />
    <BookCite f={t} at={8} original="Nasdaq Composite — 2000 年 3 月—2002 年 10 月" title="互联网泡沫破裂" meta="纳斯达克指数自 5,048 点跌至 1,114 点" seal="市场" />

    <Tag f={t} at={15} x={152} y={188} cn="那 一 年" latin="the bust" />

    <Soft f={t} at={25} dur={24} style={{left: 152, top: 244, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.5, color: G.ivoryDim}}>
        别人在<span style={{color: G.red}}>裁员</span>，
        <br />
        在关掉服务器。
      </div>
    </Soft>

    <VLine f={t} at={55} x={900} y0={240} y1={600} dur={30} />

    <Soft f={t} at={67} dur={26} style={{left: 1000, top: 236}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.gold}}>阿 里 的 账 上</div>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 164, lineHeight: 1, ...goldText(0.85)}}>2,500</span>
        <span style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 6, color: G.gold, marginBottom: 22}}>万美元</span>
      </div>
    </Soft>
    <Soft f={t} at={87} dur={22} style={{left: 1004, top: 470, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        熬过这一轮，靠的不是故事，是账上这笔钱。
      </div>
    </Soft>

    <RuleFade f={t} at={117} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={127} dur={22} style={{left: 152, top: 728, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        同一年，它把总部搬到香港，把「活着」当成唯一的目标。
      </div>
    </Soft>
    <Note f={t} at={140} x={1004} y={620} w={700} text="口径：纳斯达克 2000 年 3 月 10 日峰值 5,048.62，2002 年 10 月 9 日低点 1,114.11。" />
  </>
);

/* ══ P09 · 非典，六个人，淘宝 ═════════════════════════════════════ */
export const P09: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2003" caption="非典 · 湖畔花园" rollAt={8} prev="2000" />
    <BookCite f={t} at={10} original="Taobao.com — 上线公告" title="淘宝 · 2003 年 5 月 10 日" meta="六人保密项目 · 上线首日无商品" seal="上线" />

    <Tag f={t} at={18} x={152} y={188} cn="秘 密 项 目" latin="the secret project" />

    <Soft f={t} at={26} dur={22} style={{left: 152, top: 238, width: 500}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        非典来了，
        <br />
        办公室空了。
      </div>
    </Soft>

    <Soft f={t} at={54} dur={22} style={{left: 700, top: 238, width: 500}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        六个人，
        <br />
        签了保密协议。
      </div>
    </Soft>

    <Soft f={t} at={82} dur={22} style={{left: 1250, top: 238, width: 520}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        回到湖畔花园，
        <br />
        <span style={{color: G.gold}}>5 月 10 日上线</span>。
      </div>
    </Soft>

    <HLine f={t} at={70} x={640} y={330} w={44} dur={14} />
    <HLine f={t} at={98} x={1190} y={330} w={44} dur={14} />

    <RuleFade f={t} at={140} x={152} y={640} w={1616} dur={18} />
    <Soft f={t} at={152} dur={22} style={{left: 152, top: 668, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.55, color: G.ivory}}>
        一个多月后它才被外界知道——名字叫淘宝。
      </div>
    </Soft>
    <Note f={t} at={170} x={152} y={760} w={1200} text="口径：淘宝立项六人小组，为对外保密曾以「项目组」名义在湖畔花园封闭开发；5 月 10 日上线。" />
  </>
);

/* ══ P10 · 免费，两个字 ═══════════════════════════════════════════ */
export const P10: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2003" caption="对手 · eBay" rollAt={8} prev="2003" />
    <BookCite f={t} at={10} original="eBay Inc. — 2003 年中国区运营" title="eBay · 全球第一" meta="当时全球最大的在线交易平台，已收购易趣" seal="对手" />

    <Tag f={t} at={18} x={152} y={188} cn="对 手" latin="the incumbent" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivoryDim}}>全球第一的交易平台</div>
      <div style={{fontFamily: GF.num, fontSize: 86, lineHeight: 1.2, marginTop: 16, color: G.ivoryDim, letterSpacing: 2}}>eBay</div>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 2, color: G.ivoryFaint, marginTop: 14, lineHeight: 1.7}}>
        开店要收费，成交要抽佣，<br />
        首页位置明码标价。
      </div>
    </Soft>

    <VLine f={t} at={69} x={880} y0={240} y1={620} dur={30} />

    <Soft f={t} at={83} dur={28} style={{left: 960, top: 300}}>
      <div style={{fontFamily: GF.num, fontSize: 250, lineHeight: 1, letterSpacing: 12, ...goldText(0.95)}}>免费</div>
    </Soft>
    <Soft f={t} at={105} dur={22} style={{left: 966, top: 580, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>开 店 免 费 · 交 易 免 费</div>
    </Soft>

    <RuleFade f={t} at={138} x={152} y={690} w={1616} dur={18} />
    <Soft f={t} at={148} dur={22} style={{left: 152, top: 718, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 31, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        打法只有两个字。对手收钱的地方，它一分不收。
      </div>
    </Soft>
    <Note f={t} at={166} x={152} y={790} w={1300} text="口径：eBay 于 2003 年完成收购易趣；淘宝 2003 年上线即宣布三年免费。" />
  </>
);

/* ══ P11 · 两年，eBay 退出中国 ════════════════════════════════════ */
export const P11: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2005" caption="中国 · 在线交易" rollAt={8} prev="2003" />
    <BookCite f={t} at={8} original="eBay Inc. — 2006 年退出中国区运营" title="eBay 退出中国" meta="2006 年将易趣交予 Tom 在线运营" seal="结局" />

    <Soft f={t} at={20} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, ...goldText(0.85)}}>2</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 22}}>年</span>
      </div>
    </Soft>
    <Soft f={t} at={35} dur={22} style={{left: 154, top: 492, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 4, lineHeight: 1.7, color: G.ivory}}>
        烧钱烧到对手退出中国。
      </div>
    </Soft>

    <Stamp f={t} at={54} text="退出" x={1420} y={300} size={168} rot={-9} />

    <RuleFade f={t} at={76} x={152} y={620} w={1616} dur={18} />
    <Soft f={t} at={86} dur={24} style={{left: 152, top: 650, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        可买卖双方，谁都不敢先付钱。
      </div>
    </Soft>
    <Soft f={t} at={107} dur={22} style={{left: 152, top: 760, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 2, color: G.ivoryDim}}>
        线上交易最大的坎，不是流量，是信任。
      </div>
    </Soft>
  </>
);

/* ══ P12 · 那就先放我这儿 ═════════════════════════════════════════ */
export const P12: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={3} year="2003" caption="十月 · 支付宝" rollAt={8} prev="2005" />
    <BookCite f={t} at={8} original="Alipay — 担保交易上线" title="支付宝 · 2003 年 10 月" meta="担保交易：买家付款先存平台，收货再付卖家" seal="产品" />

    <GQuote f={t} at={19} text="那就先放我这儿，
收到货再给卖家" source="担保交易的原始说法 · 2003 年 · 支付宝" x={152} y={252} w={1240} align="left" />

    <Soft f={t} at={59} dur={24} style={{left: 152, top: 520, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.gold}}>二 〇 〇 三 年 十 月</div>
      <div style={{fontFamily: GF.num, fontSize: 124, lineHeight: 1.1, marginTop: 10, ...goldText(0.8)}}>支付宝</div>
    </Soft>

    <Soft f={t} at={81} dur={22} style={{left: 960, top: 560, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        一句话，把「先付钱还是先发货」的死结解开。
        <br />
        后来这一层，长成了蚂蚁。
      </div>
    </Soft>

    <RuleFade f={t} at={118} x={152} y={760} w={1616} dur={18} />
  </>
);
