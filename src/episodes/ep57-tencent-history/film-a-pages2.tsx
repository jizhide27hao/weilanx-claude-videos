import React from 'react';
import {BookCite, GQuote, YearHeader} from '../../library/gilded/stage';
import {BarsV, Figure, KV, MiniTable, Note, RuleFade, Soft, Tag, VLine} from '../../library/gilded/kit';
import {RedStamp} from '../../library/gilded/props';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';

/** 朱印要自己定位：RedStamp 本身不带坐标 */
const Stamp: React.FC<{f: number; at: number; text: string; x: number; y: number; size?: number; rot?: number}> = ({f, at, text, x, y, size, rot}) => (
  <div style={{position: 'absolute', left: x, top: y}}>
    <RedStamp f={f} at={at} text={text} size={size} rot={rot} />
  </div>
);

/**
 * ep57 暗金文献版 · 第二幕（P14–P25）
 * 游戏 → 360 指控 → 艰难的决定 → 人心 → Kik 与张小龙 → 微信上线 → 433 天 → 支付 → 红包 → 春晚上市 → 超 FB → 王者荣耀
 */

/* ══ P14 · 2009 · 最大的游戏公司 ══════════════════════════════════ */
export const P14: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2003" caption="游戏 · 从代理到自研" rollAt={8} prev="2003" />
    <BookCite f={t} at={10} original="腾讯年报 · 游戏业务分部" title="QQ 游戏与自研代理并进" meta="《穿越火线》《地下城与勇士》2008 年起接连上线" seal="年报" />

    <Tag f={t} at={18} x={152} y={188} cn="第 二 曲 线" latin="games" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        同一年，Q Q 游戏上线，
        <br />
        穿越火线、地下城，一款接一款。
      </div>
    </Soft>

    <Figure f={t} at={66} x={152} y={440} w={620} label="2009 年 · 中国最大的游戏公司" value="第 一" size={110} />

    <VLine f={t} at={96} x={880} y0={240} y1={660} dur={28} />

    <Soft f={t} at={110} dur={22} style={{left: 972, top: 290, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        没人再说它只是个聊天工具——
        <br />
        但「抄袭」的骂名，也是从这几年开始的。
      </div>
    </Soft>
    <Soft f={t} at={136} dur={22} style={{left: 972, top: 470, width: 720}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        赚到钱的腾讯没有停下来，三年后，它会被逼着做一生中最艰难的决定。
      </div>
    </Soft>

    <RuleFade f={t} at={162} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={172} x={152} y={804} w={1300} text="口径：「中国最大的游戏公司」为 2009 年第二季度起各第三方收入口径；《穿越火线》《地下城与勇士》均为 2008 年商用。" />
  </>
);

/* ══ P15 · 360 指控 ═══════════════════════════════════════════════ */
export const P15: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2010" caption="九月二十七日" rollAt={8} prev="2003" />
    <BookCite f={t} at={10} original="360 — 「隐私保护器」发布 2010-09-27" title="360 发布「隐私保护器」" meta="指控 QQ 偷看用户隐私 · 3Q 大战揭幕" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="3 Q 大 战 · 起" latin="the war begins" />

    <Soft f={t} at={28} dur={22} style={{left: 152, top: 250, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 4, lineHeight: 1.6, color: G.ivory}}>
        360 指控 Q Q
        <span style={{color: G.gold}}>偷窥隐私</span>。
      </div>
    </Soft>

    <Soft f={t} at={54} dur={22} style={{left: 152, top: 400, width: 820}}>
      <div style={{borderLeft: '2px solid rgba(214,180,106,0.5)', paddingLeft: 24}}>
        <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, lineHeight: 1.75, color: G.ivoryDim}}>
          那年国庆前后，双方隔空对轰，
          <br />
          弹窗、公告、澄清，一天一个版本。
        </div>
      </div>
    </Soft>

    <Soft f={t} at={84} dur={22} style={{left: 1060, top: 260, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryFaint}}>
        一家做安全软件的，
        <br />
        一家做聊天的，
        <br />
        都说自己在保护用户。
      </div>
    </Soft>
    <Stamp f={t} at={100} text="开战" x={1240} y={520} size={120} rot={-8} />

    <RuleFade f={t} at={118} x={152} y={760} w={1616} dur={18} />
    <Note f={t} at={128} x={152} y={784} w={1400} text="口径：2010-09-27 360 发布「隐私保护器」；后续「扣扣保镖」10-29 上线，11-03 冲突升级，时间线取自双方公开公告。" />
  </>
);

/* ══ P16 · 艰难的决定 ═════════════════════════════════════════════ */
export const P16: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2010" caption="十一月三日 · 深夜" rollAt={8} prev="2010" />
    <BookCite f={t} at={10} original="《致广大 QQ 用户的一封信》2010-11-03" title="腾讯公开信 · 2010-11-03" meta="装 360 的电脑停止登录 QQ · 二选一" seal="原件" />

    <GQuote
      f={t}
      at={16}
      x={152}
      y={180}
      w={1620}
      align="center"
      text="这是一个非常艰难的决定"
      source="《致广大 Q Q 用户的一封信》· 2010-11-03"
    />

    <RuleFade f={t} at={54} x={152} y={470} w={1616} dur={18} />

    <Soft f={t} at={66} dur={22} style={{left: 152, top: 506, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        装了 360 的电脑，
        <br />
        停用 Q Q。
      </div>
    </Soft>
    <Soft f={t} at={90} dur={22} style={{left: 152, top: 662, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        几亿网民，被迫二选一。
      </div>
    </Soft>

    <VLine f={t} at={78} x={1000} y0={490} y1={700} dur={26} />

    <Soft f={t} at={100} dur={22} style={{left: 1092, top: 506, width: 620}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12}}>
        <span style={{fontFamily: GF.num, fontSize: 120, lineHeight: 1, ...goldText(0.6)}}>2</span>
        <span style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 4, color: G.ivoryDim, marginBottom: 14}}>选 1</span>
      </div>
    </Soft>
    <Stamp f={t} at={118} text="出招" x={1420} y={560} size={110} rot={-7} />
  </>
);

/* ══ P17 · 官司赢了，人心输了 ═════════════════════════════════════ */
export const P17: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2010" caption="战后 · 舆论与判决" rollAt={8} prev="2010" />
    <BookCite f={t} at={10} original="广东省高级人民法院 — 3Q 案判决 2014" title="3Q 大战 · 终审判决" meta="腾讯诉 360 不正当竞争胜诉 · 索赔 1.25 亿判赔 500 万" seal="判决" />

    <Soft f={t} at={20} dur={24} style={{left: 152, top: 280, width: 820}}>
      <div style={{fontFamily: GF.cn, fontSize: 52, letterSpacing: 4, lineHeight: 1.6, color: G.ivory}}>
        官司<span style={{color: G.gold}}>赢了</span>，
        <br />
        人心<span style={{color: G.red}}>输了</span>。
      </div>
    </Soft>

    <VLine f={t} at={44} x={1000} y0={250} y1={660} dur={28} />

    <Soft f={t} at={58} dur={22} style={{left: 1092, top: 280, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 3, lineHeight: 1.85, color: G.ivoryDim}}>
        舆论一边倒，全网都在骂——
        <br />
        骂的不是二选一本身，
        <br />
        是「你敢替我做决定」。
      </div>
    </Soft>

    <RuleFade f={t} at={92} x={152} y={740} w={1616} dur={18} />
    <Note f={t} at={102} x={152} y={764} w={1500} text="口径：3Q 案 2014-04 终审维持不正当竞争认定、判赔 500 万元；「舆论一边倒」为当时媒体与舆情综合描述。" />
  </>
);

/* ══ P18 · Kik 与张小龙 ═══════════════════════════════════════════ */
export const P18: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2010" caption="广州 · 研发部深夜" rollAt={8} prev="2010" />
    <BookCite f={t} at={10} original="《腾讯传》吴晓波 · 第 14 章" title="《腾讯传》· 微信立项" meta="Kik 上线 15 天用户破百万 · 张小龙深夜致信马化腾" seal="传记" />

    <Tag f={t} at={18} x={152} y={188} cn="危 机 感" latin="Kik" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        打仗那一年，
        <br />
        国外冒出一款 <span style={{color: G.gold}}>Kik</span>。
      </div>
    </Soft>

    <Soft f={t} at={60} dur={22} style={{left: 152, top: 430, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        纯流量、不要钱、三个星期百万用户——
        <br />
        这东西要是进来，Q Q 就是下一个 MSN。
      </div>
    </Soft>

    <VLine f={t} at={88} x={1000} y0={240} y1={660} dur={28} />

    <Soft f={t} at={102} dur={22} style={{left: 1092, top: 262, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.8, color: G.ivory}}>
        广州的张小龙，
        <br />
        <span style={{color: G.gold}}>坐不住了。</span>
      </div>
    </Soft>
    <Soft f={t} at={128} dur={22} style={{left: 1092, top: 470, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        半夜给马化腾写信，建议立项。
      </div>
    </Soft>

    <RuleFade f={t} at={156} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={166} x={152} y={804} w={1300} text="口径：Kik 2010-10 上线、15 天百万用户；张小龙深夜邮件立项出自《腾讯传》，细节按回忆录整理。" />
  </>
);

/* ══ P19 · 微信上线 ═══════════════════════════════════════════════ */
export const P19: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2011" caption="一月二十一日 · 微信" rollAt={8} prev="2010" />
    <BookCite f={t} at={10} original="微信 1.0 — App Store 上架记录 2011-01-21" title="微信 1.0 测试版上线" meta="比米聊晚一个月 · 广州研发部出品" seal="档案" />

    <Tag f={t} at={18} x={152} y={188} cn="微 信" latin="WeChat" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 250}}>
      <div style={{fontFamily: GF.cn, fontSize: 120, lineHeight: 1.1, letterSpacing: 10, color: G.ivory}}>
        微信<span style={{color: G.gold}}>上线</span>。
      </div>
    </Soft>
    <Soft f={t} at={52} dur={20} style={{left: 154, top: 420, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, lineHeight: 1.75, color: G.ivoryDim}}>
        2011-01-21 · 免费短信 · 照片分享
        <br />
        第一版，安静得像没有人用。
      </div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={240} y1={660} dur={28} />

    <Soft f={t} at={84} dur={22} style={{left: 1052, top: 280, width: 640}}>
      <MiniTable
        f={t}
        at={88}
        x={1052}
        y={300}
        w={640}
        head={['产品', '时间', '身位']}
        colW={[220, 220, 180]}
        rows={[
          ['Talkbox', '2011-01', '先发'],
          ['米聊', '2010-12', '早一个月'],
          ['微信', '2011-01-21', '第三个'],
        ]}
      />
    </Soft>
    <Soft f={t} at={116} dur={22} style={{left: 1052, top: 540, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryDim}}>
        又不是它先做的——这句话，往后三十年它要听很多遍。
      </div>
    </Soft>

    <RuleFade f={t} at={144} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={154} x={152} y={804} w={1300} text="口径：微信 1.0 于 2011-01-21 上线；米聊 2010-12 发布、早约一个月；Talkbox 早于两者。" />
  </>
);

/* ══ P20 · 433 天破亿 ═════════════════════════════════════════════ */
export const P20: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2012" caption="三月 · 用户破亿" rollAt={8} prev="2011" />
    <BookCite f={t} at={10} original="腾讯 — 微信用户数据 2012-03" title="微信注册用户破一亿" meta="上线后第 433 天 · 语音与摇一摇助推" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="船 票" latin="the ticket" />

    <Soft f={t} at={28} dur={26} style={{left: 148, top: 238}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 248, lineHeight: 1, letterSpacing: 2, ...goldText(0.9)}}>433</span>
        <span style={{fontFamily: GF.cn, fontSize: 54, letterSpacing: 10, color: G.gold, marginBottom: 26}}>天</span>
      </div>
    </Soft>
    <Soft f={t} at={52} dur={20} style={{left: 154, top: 520, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>用 户 破 一 亿</div>
    </Soft>

    <VLine f={t} at={70} x={960} y0={232} y1={640} dur={30} />

    <Soft f={t} at={84} dur={22} style={{left: 1052, top: 258, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        语音、摇一摇，功能一路加——
        <br />
        每一次更新，都是一次裂变。
      </div>
    </Soft>
    <Soft f={t} at={112} dur={22} style={{left: 1052, top: 430, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        移动互联网的<span style={{color: G.gold}}>船票</span>，
        <br />
        到手了。
      </div>
    </Soft>

    <RuleFade f={t} at={146} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={156} x={152} y={724} w={1300} text="口径：2012-03-29 微信注册用户破一亿（上线第 433 天），腾讯官方口径。" />
  </>
);

/* ══ P21 · 微信支付：绑卡的人不多 ═════════════════════════════════ */
export const P21: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2013" caption="八月 · 微信支付" rollAt={8} prev="2012" />
    <BookCite f={t} at={10} original="微信 5.0 — 2013-08-05 发布" title="微信支付上线" meta="绑定银行卡 · 但早期绑卡率一直不高" seal="档案" />

    <Tag f={t} at={18} x={152} y={188} cn="新 战 场" latin="WeChat Pay" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 38, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        微信支付上线，
        <br />
        但绑卡的人，<span style={{color: G.gold}}>一直不多。</span>
      </div>
    </Soft>

    <Soft f={t} at={64} dur={22} style={{left: 152, top: 440, width: 760}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        输卡号、验证、设置密码——
        <br />
        在 2013 年，每一步都在劝退。
      </div>
    </Soft>

    <VLine f={t} at={92} x={1000} y0={240} y1={660} dur={28} />

    <Soft f={t} at={106} dur={22} style={{left: 1092, top: 280, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, lineHeight: 1.8, color: G.ivory}}>
        支付宝的护城河看着推不动，
        <br />
        直到第二年除夕。
      </div>
    </Soft>

    <RuleFade f={t} at={136} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={146} x={152} y={724} w={1300} text="口径：微信支付 2013-08-05 随微信 5.0 上线；早期绑卡率无官方披露，为业界共识性描述。" />
  </>
);

/* ══ P22 · 红包与珍珠港 ═══════════════════════════════════════════ */
export const P22: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2014" caption="除夕 · 微信红包" rollAt={8} prev="2013" />
    <BookCite f={t} at={10} original="腾讯 — 2014 春节数据披露" title="微信红包 · 2014 除夕" meta="一夜 482 万人参与 · 绑卡难题一夜解开" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="偷 袭" latin="red packet" />

    <Soft f={t} at={28} dur={24} style={{left: 148, top: 244}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 190, lineHeight: 1, ...goldText(0.85)}}>482</span>
        <span style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.gold, marginBottom: 18}}>万人</span>
      </div>
    </Soft>
    <Soft f={t} at={50} dur={20} style={{left: 154, top: 470, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 25, letterSpacing: 5, lineHeight: 1.7, color: G.ivoryDim}}>
        一 夜 之 间 在 抢 红 包
      </div>
    </Soft>

    <VLine f={t} at={68} x={940} y0={232} y1={660} dur={30} />

    <Soft f={t} at={82} dur={22} style={{left: 1032, top: 256, width: 680}}>
      <div style={{fontFamily: GF.cn, fontSize: 28, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        想领钱，得先绑卡——
        <br />
        微信支付两年的难题，一个红包解开了。
      </div>
    </Soft>

    <GQuote
      f={t}
      at={112}
      x={1032}
      y={420}
      w={680}
      text="像被偷袭了珍珠港。"
      source="马云 · 2014 年除夕夜"
    />

    <RuleFade f={t} at={150} x={152} y={700} w={1616} dur={18} />
    <Note f={t} at={160} x={152} y={724} w={1400} text="口径：2014 除夕参与红包人数 482 万；马云原话见其个人发言与当日多家媒体报道。" />
    <Stamp f={t} at={170} text="珍珠港" x={560} y={560} size={116} rot={-8} />
  </>
);

/* ══ P23 · 春晚 110 亿次与两万亿 ═════════════════════════════════ */
export const P23: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2015" caption="央视春晚 · 摇一摇" rollAt={8} prev="2014" />
    <BookCite f={t} at={10} original="微信 — 2015 春晚摇一摇数据" title="春晚摇一摇互动 110 亿次" meta="除夕当晚摇动 110 亿次 · 峰值每分钟 8.1 亿次" seal="公告" />

    <Tag f={t} at={18} x={152} y={188} cn="国 民 级 时 刻" latin="CCTV gala" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 36, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        2015 年春晚，摇出
        <span style={{color: G.gold}}> 110 亿次</span>。
      </div>
    </Soft>

    <Soft f={t} at={62} dur={22} style={{left: 152, top: 420, width: 780}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 3, lineHeight: 1.8, color: G.ivoryDim}}>
        红包从「偷袭」变成了「传统」——
        <br />
        绑卡这件事，再也没人提了。
      </div>
    </Soft>

    <VLine f={t} at={90} x={1010} y0={240} y1={660} dur={28} />

    <Soft f={t} at={104} dur={22} style={{left: 1102, top: 270, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, color: G.ivoryFaint}}>2016 年 9 月 · 市值</div>
    </Soft>
    <Soft f={t} at={116} dur={24} style={{left: 1098, top: 320}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 14}}>
        <span style={{fontFamily: GF.num, fontSize: 170, lineHeight: 1, ...goldText(0.8)}}>2</span>
        <span style={{fontFamily: GF.cn, fontSize: 42, letterSpacing: 6, color: G.gold, marginBottom: 16}}>万亿港元</span>
      </div>
    </Soft>
    <Soft f={t} at={140} dur={22} style={{left: 1102, top: 530, width: 620}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, color: G.ivoryDim}}>亚洲市值第一</div>
    </Soft>

    <RuleFade f={t} at={162} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={172} x={152} y={804} w={1300} text="口径：2015 除夕摇一摇总量 110 亿次、峰值 8.1 亿次/分钟（微信官方）；2016-09 市值超 2 万亿港元、居亚洲上市公司首位（按当日收盘）。" />
  </>
);

/* ══ P24 · 超过 Facebook ═══════════════════════════════════════════ */
export const P24: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2017" caption="十一月 · 全球前五" rollAt={8} prev="2015" />
    <BookCite f={t} at={10} original="各交易所收盘数据 · 2017-11-21" title="腾讯市值超越 Facebook" meta="5,345 亿美元 · 全球上市公司前五" seal="行情" />

    <Tag f={t} at={18} x={152} y={188} cn="里 程 碑" latin="top five" />

    <Soft f={t} at={28} dur={24} style={{left: 152, top: 240, width: 800}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 3, lineHeight: 1.7, color: G.ivory}}>
        超过 <span style={{color: G.gold}}>Facebook</span>，
        <br />
        全球前五。
      </div>
    </Soft>

    <Soft f={t} at={64} dur={26} style={{left: 152, top: 440}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 16}}>
        <span style={{fontFamily: GF.num, fontSize: 180, lineHeight: 1, ...goldText(0.85)}}>5,345</span>
        <span style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 6, color: G.gold, marginBottom: 16}}>亿美元</span>
      </div>
    </Soft>

    <VLine f={t} at={100} x={1050} y0={240} y1={660} dur={28} />

    <Soft f={t} at={114} dur={22} style={{left: 1142, top: 290, width: 580}}>
      <div style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 3, lineHeight: 1.85, color: G.ivoryDim}}>
        一款《王者荣耀》，成了国民游戏——
        <br />
        但这也是巅峰前的最后一步。
      </div>
    </Soft>
    <Soft f={t} at={140} dur={22} style={{left: 1142, top: 480, width: 580}}>
      <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 3, lineHeight: 1.75, color: G.ivoryFaint}}>
        此后一年，市值先冲 4.5 万亿，然后掉头向下。
      </div>
    </Soft>

    <RuleFade f={t} at={160} x={152} y={780} w={1616} dur={18} />
    <Note f={t} at={170} x={152} y={804} w={1300} text="口径：2017-11-21 收盘市值约 5,345 亿美元、超越 FB（各行情终端口径略异）；《王者荣耀》2015-11 公测。" />
  </>
);

/* ══ P25 · 王者荣耀（单句页） ═════════════════════════════════════ */
export const P25: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={4} year="2017" caption="国 民 游 戏" rollAt={8} prev="2017" />
    <BookCite f={t} at={10} original="腾讯 —《王者荣耀》运营数据" title="《王者荣耀》· 国民游戏" meta="日活跃用户峰值过亿 · 手游时代的答案" seal="档案" />

    <Soft f={t} at={6} dur={24} style={{left: 0, right: 0, top: 360, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 96, letterSpacing: 10, lineHeight: 1.3, color: G.ivory}}>
        一款<span style={{color: G.gold}}>《王者荣耀》</span>，
      </div>
    </Soft>
    <Soft f={t} at={24} dur={22} style={{left: 0, right: 0, top: 520, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 60, letterSpacing: 8, color: G.ivoryDim}}>成了国民游戏。</div>
    </Soft>
    <Note f={t} at={44} x={480} y={700} w={960} text="口径：2017 年《王者荣耀》注册用户超 2 亿、日活峰值 8,000 万以上（第三方与公司披露综合）。「国民游戏」为媒体通行说法。" />
  </>
);
