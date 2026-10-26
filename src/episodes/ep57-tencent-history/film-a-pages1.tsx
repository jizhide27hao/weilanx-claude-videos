import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
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
 * ep57 暗金文献版 · 第一幕（P01–P13）
 * 钩子 → 卖不掉 → 目录 → 创立 → OICQ → 烧钱 → 四家没谈成 → IDG/盈科 → 移动梦网 → MIH → 盈科卖股 → 上市 → QQ 秀
 */

/* ══ P01 · 14.18 亿月活 ═══════════════════════════════════════════ */
export const P01: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2026" caption="微信 · 月活跃账户" rollAt={8} prev="2025" />
    <BookCite f={t} at={10} original="Tencent Holdings — 2025 Annual Results" title="腾讯控股 2025 年全年业绩公告" meta="微信及 WeChat 合并月活跃账户 14.18 亿" seal="年报" />

    <Tag f={t} at={20} x={152} y={196} cn="月 活 账 户" latin="monthly active users" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 248, lineHeight: 1, letterSpacing: 2, ...goldText(0.9)}}>14.18</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 10, color: G.gold, marginBottom: 26}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 520, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>每 十 个 中 国 人，有 一 个 是 它 的 用 户</div>
    </Soft>

    <VLine f={t} at={62} x={960} y0={232} y1={640} dur={30} />

    <Soft f={t} at={76} dur={24} style={{left: 1052, top: 250, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, lineHeight: 1.7, color: G.ivoryDim}}>
        做它的公司，叫<span style={{color: G.gold}}>腾讯</span>。
        <br />
        创业第二年，它想把公司卖掉——
      </div>
    </Soft>
    <Soft f={t} at={96} dur={24} style={{left: 1052, top: 380, width: 640}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>开价</span>
        <span style={{fontFamily: GF.num, fontSize: 96, letterSpacing: 1, ...goldTextLight(0.3)}}>100</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, color: G.ivoryDim}}>万</span>
      </div>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 18}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>最高只出</span>
        <span style={{fontFamily: GF.num, fontSize: 96, letterSpacing: 1, ...goldText(0.5)}}>60</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, color: G.ivoryDim}}>万</span>
      </div>
    </Soft>

    <RuleFade f={t} at={130} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={142} dur={22} style={{left: 152, top: 726, width: 900}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.5, color: G.ivory}}>
        从没人要，到<span style={goldTextLight(0.3)}>14 亿人离不开</span>，用了 28 年。
      </div>
    </Soft>
    <Note f={t} at={160} x={1052} y={640} w={720} text="口径：14.18 亿为腾讯 2025 年报口径；1999 年出售谈判金额按多方访谈综合，为流传口径，非公司披露。" />
  </>
);

/* ══ P02 · 创业第二年，想卖掉 ═════════════════════════════════════ */
export const P02: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="深圳 · 赛格科技园" rollAt={8} prev="2026" />
    <BookCite f={t} at={10} original="《腾讯传》吴晓波 · 2016" title="《腾讯传 1998—2016》" meta="出售谈判按多方回忆整理，无公司披露口径" seal="传记" />

    <Tag f={t} at={18} x={152} y={188} cn="那 一 年" latin="1999" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 4, lineHeight: 1.5, color: G.ivory}}>
        创业第二年，
        <br />
        它想把公司<span style={{color: G.gold}}>卖掉</span>。
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={54}
      x={152}
      y={430}
      w={700}
      head={['买家', '出价', '结果']}
      colW={[280, 200, 180]}
      rows={[
        ['第一家', '——', '没谈成'],
        ['第二家', '——', '没谈成'],
        ['第三家', '——', '没谈成'],
        ['第四家', '最高', '还是不够'],
      ]}
    />

    <VLine f={t} at={90} x={960} y0={240} y1={640} dur={30} />

    <Soft f={t} at={104} dur={24} style={{left: 1052, top: 260, width: 640}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>开价</span>
        <span style={{fontFamily: GF.num, fontSize: 110, lineHeight: 1, ...goldTextLight(0.35)}}>100</span>
        <span style={{fontFamily: GF.cn, fontSize: 30, color: G.ivoryDim, marginBottom: 10}}>万</span>
      </div>
    </Soft>
    <Soft f={t} at={122} dur={24} style={{left: 1052, top: 420, width: 640}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>最高</span>
        <span style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1, ...goldText(0.7)}}>60</span>
        <span style={{fontFamily: GF.cn, fontSize: 30, color: G.ivoryDim, marginBottom: 14}}>万</span>
      </div>
    </Soft>

    <RuleFade f={t} at={150} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={162} dur={22} style={{left: 152, top: 726, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.5, color: G.ivoryDim}}>
        差 40 万，这笔买卖没有成交。今天回头看，那是腾讯最贵的一个整数。
      </div>
    </Soft>
    <Stamp f={t} at={176} text="没卖" x={1420} y={640} size={110} rot={-8} />
  </>
);

/* ══ P04 · 目录 + 1998.11.11 深圳创立 ═════════════════════════════ */
export const P04: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1998" caption="十一月 · 深圳华强北" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="深圳市腾讯计算机系统有限公司 — 注册登记" title="公司注册登记 · 1998-11-11" meta="注册资本 50 万元 · 五位创始人" seal="工商" />

    {/* 目录句：第 7 句口播只给 2.3 秒，做成页顶一行小字 */}
    <Soft f={t} at={14} dur={18} style={{left: 0, right: 0, top: 118, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 8, color: G.ivoryFaint}}>
        得把这 28 年拉出来看——1998 创立　→　2004 上市　→　2011 微信　→　2021 登顶
      </div>
    </Soft>

    <Tag f={t} at={18} x={152} y={188} cn="创 立" latin="incorporation" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 200, lineHeight: 1, ...goldText(0.85)}}>50</span>
        <span style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.gold, marginBottom: 20}}>万</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 480, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>五 个 年 轻 人，凑 的</div>
    </Soft>

    <VLine f={t} at={60} x={960} y0={232} y1={640} dur={30} />

    <Soft f={t} at={74} dur={22} style={{left: 1052, top: 244, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 4, color: G.ivoryFaint, marginBottom: 16}}>五 位 创 始 人</div>
      <KV
        f={t}
        at={82}
        x={1052}
        y={300}
        w={640}
        size={25}
        gap={40}
        rows={[
          ['马化腾', 'CEO'],
          ['张志东', '研发'],
          ['曾李青', '市场'],
          ['许晨晔', '技术'],
          ['陈一丹', '行政'],
        ]}
        hot={[0]}
      />
    </Soft>

    <RuleFade f={t} at={120} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={130} x={152} y={724} w={1500} text="口径：1998-11-11 注册，注册资本 50 万元；分工按《腾讯传》与公开访谈，股份结构此轮未披露。" />
  </>
);

/* ══ P05 · OICQ 上线与用户 ════════════════════════════════════════ */
export const P05: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="二月 · OICQ 上线" rollAt={8} prev="1998" />
    <BookCite f={t} at={10} original="腾讯历史产品档案 · OICQ 1999-02-10" title="OICQ（QQ 前身）上线" meta="参照以色列 ICQ · 三个月后再改名" seal="档案" />

    <Tag f={t} at={18} x={152} y={188} cn="第 一 个 产 品" latin="OICQ" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        抄的是以色列的 ICQ，
        <br />
        但第一次让它<span style={{color: G.gold}}>说中文</span>。
      </div>
    </Soft>

    <BarsV f={t} at={66} x={152} base={750} max={100} bw={220} gap={90} hMax={280} data={[['两个月', 20], ['年底', 100]]} vals={['20 万', '100 万']} valueSize={34} />

    <VLine f={t} at={100} x={1000} y0={240} y1={660} dur={28} />

    <Soft f={t} at={114} dur={22} style={{left: 1092, top: 262, width: 620}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1, ...goldText(0.7)}}>5</span>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivoryDim, marginBottom: 16}}>位 一 组 的 Q Q 号</span>
      </div>
    </Soft>
    <Soft f={t} at={136} dur={22} style={{left: 1092, top: 460, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        用户从来不是它拉的——
        <br />
        是网吧里，一个一个口口相传。
      </div>
    </Soft>

    <RuleFade f={t} at={168} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={178} x={152} y={804} w={1400} text="口径：OICQ 1999-02-10 上线；「两个月 20 万」与「年底 100 万」取自《腾讯传》与早期报道，为流传口径。" />
  </>
);

/* ══ P06 · 烧钱：一分钱收入都没有 ═════════════════════════════════ */
export const P06: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="年底 · 账上见底" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="《腾讯传》吴晓波 · 第 7 章" title="《腾讯传》· 现金流危机" meta="服务器与托管费持续支出 · 无任何收入" seal="传记" />

    <Tag f={t} at={18} x={152} y={188} cn="烧 钱" latin="burning cash" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.65, color: G.ivory}}>
        服务器要钱，托管费要钱，
        <br />
        <span style={{color: G.gold}}>一分钱收入都没有。</span>
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={64}
      x={152}
      y={430}
      w={720}
      head={['支出', '去向']}
      colW={[260, 440]}
      rows={[
        ['服务器', '用户涨太快，一直在加'],
        ['托管费', '按月付给电信机房'],
        ['收入', '0'],
      ]}
    />

    <VLine f={t} at={100} x={1000} y0={240} y1={660} dur={28} />

    <Soft f={t} at={114} dur={22} style={{left: 1092, top: 280, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        用户越多，
        <br />
        赔得越狠。
      </div>
    </Soft>
    <Soft f={t} at={136} dur={22} style={{left: 1092, top: 440, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        这是当年所有免费聊天工具的死法——
        <br />
        腾讯离它只差几个月。
      </div>
    </Soft>

    <RuleFade f={t} at={166} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={176} x={152} y={804} w={1200} text="口径：亏损结构为定性描述，公司未披露 1999 年具体财务数据。" />
  </>
);

/* ══ P07 · 四家，最高 60 万，没卖 ══════════════════════════════════ */
export const P07: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="1999" caption="年底 · 出售谈判" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="《腾讯传》吴晓波 · 第 7 章" title="《腾讯传》· 出售谈判" meta="多家意向买家 · 最高出价 60 万元" seal="传记" />

    <Tag f={t} at={18} x={152} y={188} cn="谈 判 桌" latin="negotiation" />

    <Figure f={t} at={26} x={152} y={238} w={560} label="开 价" value="100" size={130} unit="万" />

    <Soft f={t} at={56} dur={22} style={{left: 152, top: 520, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryDim}}>
        一连谈了四家，
        <br />
        没有一家给到这个数。
      </div>
    </Soft>

    <VLine f={t} at={80} x={860} y0={240} y1={640} dur={28} />

    <Soft f={t} at={94} dur={22} style={{left: 952, top: 262, width: 720}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 4, color: G.ivory}}>最高出价</span>
        <span style={{fontFamily: GF.num, fontSize: 160, lineHeight: 1, ...goldText(0.75)}}>60</span>
        <span style={{fontFamily: GF.cn, fontSize: 30, color: G.ivoryDim, marginBottom: 16}}>万</span>
      </div>
    </Soft>
    <Soft f={t} at={118} dur={22} style={{left: 952, top: 480, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        他没卖，接着干。
      </div>
    </Soft>

    <RuleFade f={t} at={140} x={152} y={700} w={1616} dur={18} />
    <Soft f={t} at={152} dur={22} style={{left: 152, top: 726, width: 1000}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.6, color: G.ivoryFaint}}>
        不是有远见——是没人接盘，只好自己做下去。
      </div>
    </Soft>
    <Stamp f={t} at={162} text="没卖" x={1520} y={560} size={120} rot={-9} />
  </>
);

/* ══ P08 · IDG 与盈科：220 万美元 ═════════════════════════════════ */
export const P08: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2000" caption="四月 · 第一笔风投" rollAt={8} prev="1999" />
    <BookCite f={t} at={10} original="融资协议 · 2000-04" title="IDG 资本 与 盈科数码 合投" meta="220 万美元 · 合计约 40% 股权" seal="协议" />

    <Tag f={t} at={18} x={152} y={188} cn="第 一 轮 融 资" latin="series A" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 170, lineHeight: 1, ...goldText(0.85)}}>220</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 6, color: G.gold, marginBottom: 18}}>万美元</span>
      </div>
    </Soft>
    <Soft f={t} at={46} dur={20} style={{left: 154, top: 450, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, color: G.ivoryDim}}>IDG 与 盈 科，合 计 约 40%</div>
    </Soft>

    <VLine f={t} at={62} x={960} y0={232} y1={640} dur={30} />

    <GQuote
      f={t}
      at={78}
      x={1052}
      y={240}
      w={660}
      text="IDG 问：这东西怎么赚钱？"
      source="投资方的原话，按多方回忆整理"
    />
    <Soft f={t} at={104} dur={22} style={{left: 1052, top: 470, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.6, color: G.ivory}}>
        马化腾说：<span style={{color: G.gold}}>我也不知道。</span>
      </div>
    </Soft>

    <RuleFade f={t} at={126} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={136} x={152} y={724} w={1500} text="口径：2000-04 交割，IDG 与盈科各投 110 万美元、各占 20%；「不知道」一语出自多方回忆录，为流传口径。" />
  </>
);

/* ══ P09 · 移动梦网救场 ═══════════════════════════════════════════ */
export const P09: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2000" caption="年底 · 中国移动梦网" rollAt={8} prev="2000" />
    <BookCite f={t} at={10} original="中国移动 — 移动梦网计划 2000-11" title="移动梦网 · 短信增值分成" meta="短信注册 QQ，话费里分成" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="第 一 笔 收 入" latin="mobile monetization" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.65, color: G.ivory}}>
        短信上 Q Q，
        <br />
        <span style={{color: G.gold}}>话费里分成。</span>
      </div>
    </Soft>

    <Figure f={t} at={62} x={152} y={440} w={600} label="2001 年底 · 首次盈利" value="1,022" size={130} unit="万" />

    <VLine f={t} at={96} x={880} y0={240} y1={660} dur={28} />

    <Soft f={t} at={110} dur={22} style={{left: 972, top: 280, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        撑住腾讯的不是产品灵感，
        <br />
        是运营商的一纸分成协议。
      </div>
    </Soft>
    <Soft f={t} at={136} dur={22} style={{left: 972, top: 470, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        「移动 QQ」成为之后几年最大的单一收入来源——直到它自己把它革掉。
      </div>
    </Soft>

    <RuleFade f={t} at={164} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={174} x={152} y={804} w={1200} text="口径：2001 年底首次实现正经营性现金流、盈利 1,022 万元，取自腾讯上市文件与年报回溯。" />
  </>
);

/* ══ P10 · MIH：6,000 万美元估值 ══════════════════════════════════ */
export const P10: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2001" caption="南非 MIH 入股" rollAt={8} prev="2000" />
    <BookCite f={t} at={10} original="Naspers / MIH — 股权收购公告 2001" title="MIH 从盈科与 IDG 手中收购腾讯股权" meta="整体估值 6,000 万美元" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="估 值" latin="valuation" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        一个南非人找上门，
        <br />
        给出的估值是上一轮的
        <span style={{color: G.gold}}> 11 倍</span>。
      </div>
    </Soft>

    <Soft f={t} at={68} dur={26} style={{left: 152, top: 440}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 180, lineHeight: 1, ...goldText(0.85)}}>6,000</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 16}}>万美元</span>
      </div>
    </Soft>

    <VLine f={t} at={100} x={1050} y0={240} y1={660} dur={28} />

    <Soft f={t} at={114} dur={22} style={{left: 1142, top: 280, width: 560}}>
      <MiniTable
        f={t}
        at={118}
        x={1142}
        y={300}
        w={560}
        head={['轮次', '估值']}
        colW={[260, 260]}
        rows={[
          ['2000 · 风投', '≈550 万美元'],
          ['2001 · MIH', '6,000 万美元'],
        ]}
      />
    </Soft>
    <Soft f={t} at={140} dur={22} style={{left: 1142, top: 540, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, lineHeight: 1.7, color: G.ivoryFaint}}>
        一年后再看，这仍是史上最便宜的一笔。
      </div>
    </Soft>

    <RuleFade f={t} at={162} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={172} x={152} y={804} w={1400} text="口径：MIH 2001-06 完成收购，取得 46.5% 股权、对应估值 6,000 万美元；「上一轮的 11 倍」按 220 万美元购得 40% 折算。" />
  </>
);

/* ══ P11 · 盈科卖股：1,260 万美元 ═════════════════════════════════ */
export const P11: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2001" caption="盈科全部退出" rollAt={8} prev="2001" />
    <BookCite f={t} at={10} original="盈科数码 — 股份出售 2001" title="盈科把 20% 全部卖给了 MIH" meta="套现 1,260 万美元 · 一年翻 5 倍离场" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="最 贵 的 卖 单" latin="the costliest exit" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        盈科把 20% 全卖了，
        <br />
        拿回 <span style={{color: G.gold}}>1,260 万美元</span>。
      </div>
    </Soft>

    <MiniTable
      f={t}
      at={64}
      x={152}
      y={440}
      w={760}
      head={['时点', '动作', '金额']}
      colW={[240, 280, 240]}
      rows={[
        ['2000 · 投入', '合计出资', '220 万美元'],
        ['2001 · 退出', '卖 20% 给 MIH', '1,260 万美元'],
        ['2026 · 同一份股权', '若未卖出（粗算）', '七千多亿港元'],
      ]}
    />

    <VLine f={t} at={104} x={1060} y0={240} y1={660} dur={28} />

    <Soft f={t} at={118} dur={22} style={{left: 1152, top: 290, width: 560}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.8, color: G.ivory}}>
        赚了五倍离场——
        <br />
        是本世纪最贵的一次
        <span style={{color: G.gold}}>「及时止损」</span>。
      </div>
    </Soft>

    <RuleFade f={t} at={146} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={156} x={152} y={804} w={1400} text="口径：盈科 2001 年以 1,260 万美元转让 20%；「七千多亿」按 MIH 存续股权折算至 2026 年市值的粗算，画面已标「粗算」。" />
    <Stamp f={t} at={166} text="粗算" x={1520} y={620} size={100} rot={-7} />
  </>
);

/* ══ P12 · 2004 · 香港上市 ════════════════════════════════════════ */
export const P12: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2004" caption="六月十六日 · 香港联交所" rollAt={8} prev="2001" />
    <BookCite f={t} at={10} original="腾讯控股 0700.HK — 招股与上市文件" title="腾讯控股 · 香港主板上市" meta="发行价 3.70 港元 · 上市市值约 62 亿港元" seal="招股书" />

    <Tag f={t} at={18} x={152} y={188} cn="上 市" latin="IPO" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        第一家在港股主板上市的
        <br />
        中国互联网公司。
      </div>
    </Soft>

    <Soft f={t} at={62} dur={26} style={{left: 152, top: 430}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 190, lineHeight: 1, ...goldText(0.85)}}>3.70</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 6, color: G.gold, marginBottom: 18}}>港元</span>
      </div>
    </Soft>

    <VLine f={t} at={98} x={1000} y0={240} y1={660} dur={28} />

    <Soft f={t} at={112} dur={22} style={{left: 1092, top: 262, width: 620}}>
      <KV
        f={t}
        at={118}
        x={1092}
        y={282}
        w={620}
        size={26}
        gap={48}
        rows={[
          ['上市市值', '约 62 亿港元'],
          ['今天回看', '翻了约 560 倍'],
        ]}
        hot={[0]}
      />
    </Soft>
    <Soft f={t} at={140} dur={22} style={{left: 1092, top: 470, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        招股书里风险提示写的是——
        <br />
        「用户增长可能放缓」。
      </div>
    </Soft>

    <RuleFade f={t} at={166} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={176} x={152} y={804} w={1300} text="口径：2004-06-16 上市，发行价 3.70 港元、市值约 62 亿港元；「约 560 倍」按 2026 年初约 6 万亿市值粗算，画面已标粗算。" />
  </>
);

/* ══ P13 · 2.91 亿用户与 QQ 秀 ════════════════════════════════════ */
export const P13: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2003" caption="Q Q 秀 上 线" rollAt={8} prev="2004" />
    <BookCite f={t} at={10} original="腾讯 — QQ 秀产品档案 2003" title="QQ 秀 · 虚拟形象" meta="几块钱一件的虚拟衣服 · 上市时 QQ 用户 2.91 亿" seal="档案" />

    <Tag f={t} at={18} x={152} y={188} cn="变 现 的 开 始" latin="QQ Show" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 240}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 170, lineHeight: 1, ...goldText(0.8)}}>2.91</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 16}}>亿</span>
      </div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 154, top: 440, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 5, color: G.ivoryDim}}>上 市 那 天 的 Q Q 用 户</div>
    </Soft>

    <VLine f={t} at={62} x={940} y0={232} y1={660} dur={30} />

    <Soft f={t} at={76} dur={22} style={{left: 1032, top: 250, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        几块钱一件的虚拟衣服，
        <br />
        <span style={{color: G.gold}}>几百万人买。</span>
      </div>
    </Soft>
    <Soft f={t} at={104} dur={22} style={{left: 1032, top: 440, width: 660}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        Q 币、黄钻、会员，一套一套跟上——
        <br />
        没人再说它只是个聊天工具。
      </div>
    </Soft>

    <RuleFade f={t} at={136} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={146} x={152} y={724} w={1400} text="口径：注册用户 2.91 亿为招股书披露口径（2004-03）；QQ 秀 2003-01 上线，定价几元到十几元。" />
  </>
);
