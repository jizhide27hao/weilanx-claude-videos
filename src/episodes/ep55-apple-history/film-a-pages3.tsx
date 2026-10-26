import React from 'react';
import {BookCite, YearHeader} from '../../library/gilded/stage';
import {Figure, HBand, KV, Note, RuleFade, Ruler, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);


/**
 * ep55 暗金文献版 · 第三幕（P26–P37）
 * Watch / AirPods → 一万亿 → 两万亿与 M1 → 三万亿 → 服务 → 掉队 → Vision Pro
 * → 五万亿 → 换帅 → 折叠 → 收尾
 */

/* ══ P26 · 两个新品类：Watch 与 AirPods ══════════════════════════ */
export const P26: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2014" caption="两个新品类" rollAt={8} prev="2011" />
    <BookCite f={t} at={10} original="Apple — Watch (2014) / AirPods (2016) Launch" title="《Apple Watch 与 AirPods 发布资料》" meta="2014-09 发布 · 2016-09 发布" seal="发布" />

    <Soft f={t} at={22} dur={22} style={{left: 152, top: 214, width: 640}}>
      <div style={{fontFamily: GF.num, fontSize: 72, lineHeight: 1, ...goldText(0.5)}}>2014</div>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 6, color: G.ivory, marginTop: 16}}>Apple Watch</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 14, lineHeight: 1.7}}>
        腕上的一块屏
        <br />
        从看时间，变成看心跳
      </div>
    </Soft>

    <Soft f={t} at={62} dur={22} style={{left: 152, top: 500, width: 640}}>
      <div style={{fontFamily: GF.num, fontSize: 72, lineHeight: 1, ...goldText(0.5)}}>2016</div>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 6, color: G.ivory, marginTop: 16}}>AirPods</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 14, lineHeight: 1.7}}>
        剪掉那根线
        <br />
        耳机第一次变成「配件生意」
      </div>
    </Soft>

    <VLine f={t} at={88} x={940} y0={228} y1={700} dur={28} />

    <Soft f={t} at={56} dur={20} style={{left: 1028, top: 232, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, color: G.ivoryDim}}>可穿戴 + 家居，做到了一年</div>
    </Soft>
    <Soft f={t} at={64} dur={22} style={{left: 1024, top: 280}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 176, lineHeight: 1, ...goldText(0.75)}}>400</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 18}}>亿美元</span>
      </div>
    </Soft>

    <Soft f={t} at={90} dur={20} style={{left: 1028, top: 490, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        一块表、一副耳机，
        <br />
        后来撑起了苹果的第四大业务。
      </div>
    </Soft>

    <RuleFade f={t} at={114} x={152} y={766} w={1616} dur={18} />
    <Note f={t} at={122} x={152} y={790} w={1080} text="口径：AirPods 2016-09 发布、12 月开卖；可穿戴 / 家居 / 配件 2024 财年收入约 400 亿美元（苹果财报口径）。" />
  </>
);

/* ══ P27 · 一万亿美元：美国第一家 ════════════════════════════════ */
export const P27: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2018" caption="八月二日 · 纳斯达克" rollAt={8} prev="2016" />
    <BookCite f={t} at={10} original="Apple Inc. — 2018-08-02, First $1 Trillion Close" title="《苹果市值破万亿记录》" meta="盘中破万亿 · 收盘 1.0004 万亿" seal="记录" />

    <Soft f={t} at={20} dur={28} style={{left: 0, right: 0, top: 268, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 24}}>
        <span style={{fontFamily: GF.num, fontSize: 300, lineHeight: 1, ...goldText(1)}}>1</span>
        <span style={{fontFamily: GF.cn, fontSize: 72, letterSpacing: 12, color: G.gold, marginBottom: 44}}>万亿美元</span>
      </div>
    </Soft>

    {/* 原来这里是「美国第一家做到这件事的公司」，和字幕同一句；换成时间账，字幕照念 */}
    <Soft f={t} at={60} dur={24} style={{left: 0, right: 0, top: 596, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivoryDim}}>
        从车库到一万亿，<span style={{color: G.gold}}>四十二年</span>；从只剩九十天，<span style={{color: G.gold}}>二十一年</span>
      </div>
    </Soft>

    <Ruler f={t} at={94} x={300} y={742} w={1320} ticks={['1980', '1997', '2007', '2011', '2018']} dur={40} size={18} />
  </>
);

/* ══ P28 · 两万亿与 M1：跟英特尔分手 ═════════════════════════════ */
export const P28: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2020" caption="八月 · 两万亿" rollAt={8} prev="2018" />
    <BookCite f={t} at={10} original="Apple Inc. — Apple silicon (M1) Announcement, 2020-11-10" title="《Apple M1 芯片发布》" meta="2020-08-19 破两万亿 · 2020-11 M1" seal="发布" />

    <Figure f={t} at={24} x={152} y={252} w={520} label="市 值" value="2" size={210} unit="万亿美元" />
    <Soft f={t} at={50} dur={20} style={{left: 154, top: 592, width: 540}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint}}>距离一万亿，两年零半个月</div>
    </Soft>

    <VLine f={t} at={72} x={800} y0={236} y1={700} dur={28} />

    <Soft f={t} at={84} dur={24} style={{left: 888, top: 238, width: 880}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 82, letterSpacing: 6, lineHeight: 1.3, ...goldText(0.8)}}>
        M1：把芯片
        <br />
        自己做回来
      </div>
    </Soft>
    <Soft f={t} at={118} dur={22} style={{left: 892, top: 448, width: 860}}>
      <div style={{fontFamily: GF.cn, fontSize: 27, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        Mac 和英特尔，从此分手。
        <br />
        十五年里第一次，苹果自己决定这台电脑能有多快。
      </div>
    </Soft>

    <Soft f={t} at={150} dur={20} style={{left: 892, top: 606, width: 860}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{width: 46, height: 1, background: G.goldLine}} />
        <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, color: G.ivoryFaint}}>2005 换到英特尔 → 2020 换回自己</div>
      </div>
    </Soft>

    <RuleFade f={t} at={172} x={152} y={772} w={1616} dur={18} />
    <Note f={t} at={182} x={152} y={796} w={1040} text="口径：2020-08-19 市值首破 2 万亿美元；M1 于 2020-11-10 发布，Mac 平台自此转向自研芯片。" />
  </>
);

/* ══ P29 · 三万亿（短拍页） ══════════════════════════════════════ */
export const P29: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2022" caption="一月三日 · 盘中" rollAt={8} prev="2020" />

    <Soft f={t} at={22} dur={28} style={{left: 0, right: 0, top: 330, textAlign: 'center'}}>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 26}}>
        <span style={{fontFamily: GF.num, fontSize: 330, lineHeight: 1, ...goldText(1)}}>3</span>
        <span style={{fontFamily: GF.cn, fontSize: 78, letterSpacing: 12, color: G.gold, marginBottom: 48}}>万亿美元</span>
      </div>
    </Soft>
    <Soft f={t} at={40} dur={24} style={{left: 0, right: 0, top: 660, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 6, color: G.ivoryDim}}>
        距离两万亿，不到一年半。
      </div>
    </Soft>
  </>
);

/* ══ P30 · 服务：75% 与 36% ══════════════════════════════════════ */
export const P30: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2025" caption="财年 · 服务收入" rollAt={8} prev="2022" />
    <BookCite f={t} at={10} original="Apple Inc. — Form 10-K, FY2025" title="《苹果公司 2025 财年年报》" meta="服务收入 1,093 亿美元" seal="年报" />

    <Tag f={t} at={18} x={152} y={188} cn="服 务 收 入" latin="services revenue" />
    <Soft f={t} at={26} dur={26} style={{left: 148, top: 232}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 196, lineHeight: 1, ...goldText(0.85)}}>1,093</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 6, color: G.gold, marginBottom: 20}}>亿</span>
      </div>
    </Soft>

    <VLine f={t} at={62} x={940} y0={224} y1={700} dur={28} />

    <Soft f={t} at={74} dur={22} style={{left: 1026, top: 228, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>毛 利 率 · 服 务</div>
    </Soft>
    <HBand f={t} at={84} x={1026} y={272} w={700} p={0.75} color={G.gold} dur={34} />
    <Soft f={t} at={96} dur={18} style={{left: 1026, top: 296, width: 700}}>
      <div style={{fontFamily: GF.num, fontSize: 36, color: G.gold}}>75%</div>
    </Soft>

    <Soft f={t} at={112} dur={22} style={{left: 1026, top: 366, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>毛 利 率 · 硬 件</div>
    </Soft>
    <HBand f={t} at={122} x={1026} y={410} w={700} p={0.36} color={G.ivoryDim} dur={34} />
    <Soft f={t} at={134} dur={18} style={{left: 1026, top: 434, width: 700}}>
      <div style={{fontFamily: GF.num, fontSize: 36, color: G.ivory}}>36%</div>
    </Soft>

    <Soft f={t} at={158} dur={22} style={{left: 1026, top: 516, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        同样卖一块钱，
        <br />
        服务比硬件多赚一倍还多。
      </div>
    </Soft>

    <RuleFade f={t} at={186} x={152} y={748} w={1616} dur={18} />
    <Note f={t} at={196} x={152} y={772} w={1080} text="口径：2025 财年服务收入 1,093 亿美元，服务毛利率约 75%，产品毛利率约 36%（苹果财报分部口径）。" />

    <Stamp f={t} at={206} text="真正的作品" x={372} y={590} size={100} rot={-7} />
  </>
);

/* ══ P31 · 大模型来了，苹果最慢 ══════════════════════════════════ */
export const P31: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2022" caption="年底 · 大模型" rollAt={8} prev="2022" />

    <Soft f={t} at={22} dur={26} style={{left: 152, top: 260, width: 1100}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 96, letterSpacing: 8, lineHeight: 1.3, ...goldText(0.85)}}>
        这一次，
        <br />
        它成了最慢的那个
      </div>
    </Soft>

    <VLine f={t} at={72} x={1300} y0={232} y1={700} dur={28} />

    <KV
      f={t}
      at={84}
      x={1388}
      y={240}
      w={360}
      size={22}
      gap={56}
      rows={[
        ['2022.11', 'ChatGPT'],
        ['2023', '各家上模型'],
        ['2024', 'Apple 智能'],
        ['2025', 'Siri 重做'],
      ]}
    />

    <Soft f={t} at={140} dur={22} style={{left: 152, top: 596, width: 1040}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        Siri 的升级一推再推。
        <br />
        五十年里第一次，它站在了追赶的那一侧。
      </div>
    </Soft>

    {/* 下半幅空着：把「慢了多少」量出来 */}
    <RuleFade f={t} at={152} x={152} y={754} w={1616} dur={18} />
    <Soft f={t} at={158} dur={20} style={{left: 152, top: 782, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryFaint}}>ChatGPT 2022.11　→　苹果智能 2024.06</div>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 6}}>
        <span style={{fontFamily: GF.num, fontSize: 62, lineHeight: 1, ...goldText(0.5)}}>19</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, color: G.gold, marginBottom: 8}}>个月</span>
        <span style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, color: G.ivoryDim, marginBottom: 10, marginLeft: 10}}>这一段差距，苹果花了十九个月才开口。</span>
      </div>
    </Soft>

    {/* 原本这里的口径注脚和上面那条 19 个月的带子叠在一起，撤掉，口径写进核查表 */}
    <Note f={t} at={186} x={152} y={882} w={1500} text="口径：「2024 Apple 智能」「2025 Siri 重做」取公开发布与推迟时间，非正式上线时间。" />
  </>
);

/* ══ P32 · Vision Pro：3,499 美元 ════════════════════════════════ */
export const P32: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2024" caption="二月 · Vision Pro" rollAt={8} prev="2022" />
    <BookCite f={t} at={10} original="Apple — Vision Pro Availability, 2024-02-02" title="《Vision Pro 上市公告》" meta="3,499 美元起 · 美国首发" seal="上市" />

    <Soft f={t} at={20} dur={26} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 208, lineHeight: 1, ...goldText(0.8)}}>3,499</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 20}}>美元</span>
      </div>
    </Soft>
    {/* 原来这两行和字幕同一句，换成重量——这才是它没排队的原因 */}
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 512, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        整机 600—650 克。
        <br />
        相当于头顶一瓶矿泉水，
        <br />
        看完一整部电影。
      </div>
    </Soft>

    <VLine f={t} at={76} x={940} y0={228} y1={700} dur={28} />

    <Soft f={t} at={88} dur={22} style={{left: 1028, top: 232, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>五 十 年 里 的 三 次 「 下 一 个 」</div>
    </Soft>
    <KV
      f={t}
      at={100}
      x={1028}
      y={284}
      w={720}
      size={24}
      gap={60}
      rows={[
        ['2001 · iPod', '成了'],
        ['2007 · iPhone', '成了'],
        ['2024 · Vision Pro', '还没'],
      ]}
      hot={[2]}
    />

    <RuleFade f={t} at={140} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={148} dur={22} style={{left: 152, top: 730, width: 1560}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivory}}>
        它做对了每一件事——只是这一次，<span style={{color: G.gold}}>没有人排队</span>。
      </div>
    </Soft>
    <Note f={t} at={186} x={152} y={796} w={1040} text="口径：Vision Pro 于 2024-02-02 美国上市，起售价 3,499 美元。" />
  </>
);

/* ══ P33 · 四万亿 → 五万亿：半年一万亿 ═══════════════════════════ */
export const P33: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="十月到七月 · 一万亿" rollAt={8} prev="2025" />
    <BookCite f={t} at={10} original="Nasdaq — Apple Market Cap Records, 2025-10 / 2026-07" title="《苹果市值纪录》" meta="2025-10-28 破四万亿 · 2026-07 破五万亿" seal="记录" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 248, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>2025 年 10 月 · 四万亿</div>
    </Soft>
    <Soft f={t} at={30} dur={24} style={{left: 148, top: 292}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.6)}}>4</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 8, color: G.gold, marginBottom: 18}}>万亿</span>
      </div>
    </Soft>

    <Soft f={t} at={64} dur={22} style={{left: 152, top: 508, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 5, color: G.ivoryDim}}>2026 年 7 月 · 五万亿</div>
    </Soft>
    <Soft f={t} at={74} dur={24} style={{left: 148, top: 552}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.9)}}>5</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 8, color: G.gold, marginBottom: 18}}>万亿</span>
      </div>
    </Soft>

    <VLine f={t} at={100} x={1000} y0={256} y1={760} dur={28} />

    <Soft f={t} at={56} dur={20} style={{left: 1088, top: 268, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 5, color: G.ivoryDim}}>中 间 只 隔 了</div>
    </Soft>
    <Soft f={t} at={66} dur={22} style={{left: 1084, top: 314}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1, ...goldText(0.8)}}>9</span>
        <span style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 6, color: G.gold, marginBottom: 16}}>个月</span>
      </div>
    </Soft>
    <Soft f={t} at={92} dur={20} style={{left: 1088, top: 540, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
        从一万亿到五万亿，
        <br />
        用了八年；而后一万亿，用了九个月。
      </div>
    </Soft>

    <RuleFade f={t} at={126} x={152} y={812} w={1616} dur={18} />
    <Note f={t} at={134} x={152} y={836} w={1560} text="口径：2025-10-28 收盘市值首破 4 万亿美元；2026-07-29 盘中触及 5.045 万亿，收盘回落至 5 万亿下方。" />
  </>
);

/* ══ P34 · 换帅：硬件工程师接任 ══════════════════════════════════ */
export const P34: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="九月一日 · 交接" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="Apple Inc. — Leadership Transition, 2026-09-01" title="《苹果公司 CEO 交接公告》" meta="库克转任执行董事长 · 特努斯接任 CEO" seal="公告" />

    <Soft f={t} at={22} dur={22} style={{left: 152, top: 216, width: 760}}>
      <div style={{fontFamily: GF.num, fontSize: 76, lineHeight: 1.1, ...goldText(0.55)}}>2026.9.1</div>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, color: G.ivory, marginTop: 16}}>库克卸任</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>转任执行董事长 · 在位十五年</div>
    </Soft>

    <Soft f={t} at={62} dur={24} style={{left: 152, top: 430, width: 760}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 74, letterSpacing: 5, lineHeight: 1.32, ...goldText(0.8)}}>
        接任的是
        <br />
        约翰·特努斯
      </div>
      <div style={{fontFamily: GF.cn, fontSize: 23, letterSpacing: 2, color: G.ivoryDim, marginTop: 16}}>
        硬件工程师出身 · 在苹果二十五年
      </div>
    </Soft>

    <VLine f={t} at={104} x={1000} y0={232} y1={700} dur={28} />

    <Soft f={t} at={54} dur={20} style={{left: 1088, top: 236, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>他 之 前 管 的 东 西</div>
    </Soft>
    <KV
      f={t}
      at={62}
      x={1088}
      y={288}
      w={720}
      size={24}
      gap={58}
      rows={[
        ['iPad', '硬件'],
        ['AirPods', '硬件'],
        ['Mac 自研芯片', '硬件'],
        ['iPhone 结构', '硬件'],
      ]}
      hot={[2]}
    />

    <Soft f={t} at={104} dur={20} style={{left: 1088, top: 534, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryFaint}}>
        上一次换帅，是 2011 年。
        <br />
        十五年，一代人。
      </div>
    </Soft>

    <RuleFade f={t} at={144} x={152} y={772} w={1616} dur={18} />
  </>
);

/* ══ P35 · 折叠，与五十年的一笔账 ════════════════════════════════ */
export const P35: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="九月 · 第一台折叠" rollAt={8} prev="2026" />

    <Soft f={t} at={20} dur={22} style={{left: 152, top: 208, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 5, color: G.ivoryDim}}>九月，第一台折叠 iPhone</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryFaint, marginTop: 12}}>
        又是「别人先做，它后来做得更贵」的那条路。
      </div>
    </Soft>

    <Soft f={t} at={58} dur={26} style={{left: 152, top: 322, width: 980}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 26}}>
        <span style={{fontFamily: GF.num, fontSize: 128, lineHeight: 1, ...goldText(0.5)}}>1,300</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, color: G.ivoryDim, marginBottom: 16}}>美元</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, color: G.ivoryFaint, marginBottom: 26, marginLeft: 10}}>→</span>
        <span style={{fontFamily: GF.num, fontSize: 168, lineHeight: 1, ...goldText(0.95)}}>5</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 6, color: G.gold, marginBottom: 20}}>万亿</span>
      </div>
    </Soft>

    <Soft f={t} at={96} dur={24} style={{left: 152, top: 560, width: 980}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 58, letterSpacing: 6, lineHeight: 1.4, color: G.ivory}}>
        五十年，三千八百万倍
      </div>
    </Soft>

    <VLine f={t} at={124} x={1240} y0={232} y1={700} dur={28} />

    <Soft f={t} at={136} dur={22} style={{left: 1328, top: 236, width: 460}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 5, color: G.ivoryDim}}>同 期</div>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryFaint, marginTop: 14}}>
        道琼斯指数 1976 年
        <br />
        约 1,000 点，2026 年
        <br />
        约 5 万点，五十倍。
      </div>
    </Soft>

    <RuleFade f={t} at={142} x={152} y={736} w={1616} dur={18} />
    <Note f={t} at={150} x={152} y={760} w={1040} text="口径：3,800 万倍 = 5 万亿 ÷ 1,300；道指点位取 1976 年初与 2026 年中的近似值，仅供尺度参照。" />

    <Stamp f={t} at={158} text="五十年" x={1136} y={556} size={96} rot={-7} />
  </>
);

/* ══ P36 · 它没发明什么 ══════════════════════════════════════════ */
export const P36: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="它做对的，是另一件事" rollAt={8} prev="2026" />

    <Soft f={t} at={18} dur={22} style={{left: 152, top: 196, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 5, color: G.ivoryDim}}>它没发明</div>
    </Soft>
    <Soft f={t} at={30} dur={26} style={{left: 148, top: 244, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 82, letterSpacing: 6, lineHeight: 1.4, color: G.ivory}}>
        手机 · 音乐播放器 · 平板
      </div>
    </Soft>

    <VLine f={t} at={74} x={1200} y0={232} y1={700} dur={28} />

    <Soft f={t} at={86} dur={24} style={{left: 1288, top: 240, width: 520}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 5, color: G.ivoryDim}}>它 做 的 是</div>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 44, letterSpacing: 4, lineHeight: 1.5, marginTop: 16, ...goldText(0.7)}}>
        把已有的东西
        <br />
        做到让人排队
      </div>
    </Soft>

    <Soft f={t} at={132} dur={24} style={{left: 152, top: 470, width: 980}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryDim}}>
        排队这件事，不是技术问题。
        <br />
        是它知道普通人会在哪一步放弃，然后把那一步去掉。
      </div>
    </Soft>

    <RuleFade f={t} at={176} x={152} y={736} w={1616} dur={18} />
    <Note f={t} at={186} x={152} y={760} w={1040} text="MP3 播放器 1997 年已有；智能手机 1992 年 IBM Simon 起；平板电脑 1991 年 GRiDPad 起。" />

    <Stamp f={t} at={196} text="AI 不等它" x={1158} y={556} size={104} rot={-6} />
  </>
);

/* ══ P37 · 这一次，还管用吗 ══════════════════════════════════════ */
export const P37: React.FC<{t: number}> = ({t}) => (
  <>
    <Soft f={t} at={10} dur={26} style={{left: 152, top: 226, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 6, color: G.ivoryDim}}>五十年的规律</div>
    </Soft>
    <Soft f={t} at={24} dur={28} style={{left: 148, top: 274, width: 1500}}>
      <div style={{fontFamily: GF.cn, fontWeight: 900, fontSize: 92, letterSpacing: 6, lineHeight: 1.35, ...goldText(0.9)}}>
        等别人做完，
        <br />
        再做得让人离不开
      </div>
    </Soft>

    <Soft f={t} at={88} dur={26} style={{left: 152, top: 552, width: 1400}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 4, lineHeight: 1.7, color: G.ivory}}>
        这一次，还管用吗
      </div>
    </Soft>

    <RuleFade f={t} at={130} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={148} dur={24} style={{left: 152, top: 726, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, color: G.ivoryFaint}}>
        答案不在这一期里。它写在接下来的五年。
      </div>
    </Soft>
  </>
);
