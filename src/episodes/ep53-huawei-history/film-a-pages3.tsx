import React from 'react';
import {YearHeader} from '../../library/gilded/stage';
import {Figure, Frame, KV, Mark, Note, Page, RuleFade, Soft, Tag, VLine, HLine, BarsV} from '../../library/gilded/kit';
import {G, GF, goldText, goldTextLight} from '../../library/gilded/theme';
import {CAP} from './timeline';

/**
 * ep53 暗金文献版 · 第三幕（P25–P36）
 * 断供 → 卖荣耀 → 腰斩 → 孟晚舟 → Mate 60 → 回到 8809 → 收尾
 */

/* ══ P25 · 三样东西，一夜断供 ════════════════════════════════════
   三条清单逐个打叉，然后在叉上盖一条「备胎转正」。叉是朱红，转正是金。 */
const SEVERS: [string, string][] = [
  ['芯 片', '台积电不再代工 · EDA 工具断供'],
  ['系 统', '谷歌 GMS 服务停止授权'],
  ['工 具', '美国元器件与软件许可失效'],
];

export const P25: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2019" caption="5 月之后 · 三样东西同时断" />

    <Soft f={t} at={6} dur={20} style={{left: 200, top: 168, width: 1100}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 6, color: G.ivory}}>芯片、系统、工具，一夜断供</div>
    </Soft>

    {SEVERS.map(([k, v], i) => (
      <React.Fragment key={k}>
        <Soft f={t} at={12 + i * 10} dur={20} style={{left: 210, top: 280 + i * 96, width: 320}}>
          <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.ivory}}>{k}</div>
        </Soft>
        <Soft f={t} at={18 + i * 10} dur={20} style={{left: 570, top: 296 + i * 96, width: 820}}>
          <div style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryDim}}>{v}</div>
        </Soft>
        <Mark f={t} at={40 + i * 12} x={1610} y={280 + i * 96} s={44} kind="x" />
      </React.Fragment>
    ))}

    <RuleFade f={t} at={40} x={200} y={570} w={1520} dur={18} />

    <Soft f={t} at={97} dur={24} style={{left: 210, top: 604, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.gold}}>同 一 个 月</div>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 52, lineHeight: 1.4, color: G.ivory, marginTop: 12}}>
        海思的备胎芯片
        <br />
        <span style={{...goldTextLight(0.34)}}>全部转正</span>
      </div>
    </Soft>

    <Soft f={t} at={179} dur={24} style={{left: 1010, top: 604, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 6, color: G.gold}}>2019 年 8 月</div>
      <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 52, lineHeight: 1.4, color: G.ivory, marginTop: 12}}>
        鸿蒙发布
        <br />
        <span style={{fontSize: 22, fontWeight: 400, color: G.ivoryFaint, letterSpacing: 2}}>一个自己的操作系统，从备选变成主选</span>
      </div>
    </Soft>

    <VLine f={t} at={110} x={940} y0={596} y1={820} dur={22} />
  </>
);

/* ══ P26 · 2020 年 11 月：荣耀被整体出售 ══════════════════════════
   两个方框，一个箭头，一句「不持股、不参与经营」。剥离这件事只讲清边界。 */
export const P26: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2020" caption="11 月 · 卖掉一个品牌" />

    <Soft f={t} at={8} dur={22} style={{left: 200, top: 176, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 5, color: G.ivory}}>为了让荣耀还能买到芯片</div>
    </Soft>

    <Soft f={t} at={20} dur={24} style={{left: 250, top: 330}}>
      <div style={{width: 300, height: 160, border: `1px solid ${G.goldFaint}`, background: 'rgba(10,8,5,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.ivoryDim}}>华为</div>
      <div style={{fontFamily: GF.cn, fontSize: 18, letterSpacing: 4, color: G.ivoryFaint, textAlign: 'center', marginTop: 14}}>出售方</div>
    </Soft>

    <Soft f={t} at={44} dur={24} style={{left: 1110, top: 330}}>
      <div style={{width: 300, height: 160, border: `1px solid ${G.gold}`, background: 'rgba(214,180,106,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: GF.cn, fontSize: 46, letterSpacing: 8, color: G.goldBright}}>荣耀</div>
      <div style={{fontFamily: GF.cn, fontSize: 18, letterSpacing: 4, color: G.ivoryFaint, textAlign: 'center', marginTop: 14}}>独立公司</div>
    </Soft>

    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {(() => {
        const p = Math.min(1, Math.max(0, (t - 66) / 26));
        if (p <= 0) return null;
        const x0 = 576;
        const x1 = 1096;
        const xe = x0 + (x1 - x0) * p;
        return (
          <g>
            <line x1={x0} y1={410} x2={xe} y2={410} stroke={G.gold} strokeWidth={1.4} />
            <path d={`M${xe - 10} 404 L${xe} 410 L${xe - 10} 416`} fill="none" stroke={G.gold} strokeWidth={1.4} />
            <text x={(x0 + x1) / 2} y={392} textAnchor="middle" fontFamily={GF.cn} fontSize={18} letterSpacing={5} fill={G.ivoryFaint} opacity={p}>
              整体出售
            </text>
          </g>
        );
      })()}
    </svg>

    <RuleFade f={t} at={60} x={250} y={600} w={1420} dur={18} />
    <KV f={t} at={103} x={250} y={640} w={1420} gap={58} size={26} rows={[['华为持股', '不持股'], ['华为经营', '不参与经营'], ['股权关系', '与华为无关']]} hot={[0, 1]} />
  </>
);

/* ══ P27 · 8,914 → 6,368：一年少 2,546 亿 ═════════════════════════
   两根柱子，一条落差线。手机那行放在下面，390 帧刚好讲完四句。 */
const CRASH: [string, number][] = [
  ['2020', 8914],
  ['2021', 6368],
];

export const P27: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2021" caption="深圳 · 一年掉下来的高度" />

    <Soft f={t} at={6} dur={20} style={{left: 200, top: 168, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 5, color: G.ivory}}>2020 年 8,914 亿，历史最高</div>
    </Soft>

    <HLine f={t} at={20} x={400} y={660} w={1000} dur={26} />
    <BarsV f={t} at={6} x={430} base={660} data={CRASH} max={9000} bw={220} gap={260} hMax={392} hot={0} labelSize={26} valueSize={30} vals={['8,914', '6,368']} />

    {/* 落差：一条竖标尺 + 数值 */}
    {(() => {
      const p = Math.min(1, Math.max(0, (t - 217) / 26));
      if (p <= 0) return null;
      const top = 660 - 392; // 2020 柱顶
      const bot = 660 - (6368 / 9000) * 392;
      return (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <line x1={900} y1={top} x2={900} y2={top + (bot - top) * p} stroke={G.red} strokeWidth={1.6} />
          <line x1={886} y1={top} x2={914} y2={top} stroke={G.red} strokeWidth={1.4} opacity={p} />
          <line x1={886} y1={bot} x2={914} y2={bot} stroke={G.red} strokeWidth={1.4} opacity={p} />
          <text x={1260} y={top + 30} textAnchor="end" fontFamily={GF.num} fontSize={64} fill={G.red} opacity={p}>−2,546</text>
          <text x={1260} y={top + 66} textAnchor="end" fontFamily={GF.cn} fontSize={21} fill={G.ivoryDim} opacity={p}>亿元 · 一年少掉的</text>
        </svg>
      );
    })()}

    <Soft f={t} at={126} dur={24} style={{left: 200, top: 726, width: 1300}}>
      <div style={{fontFamily: GF.cn, fontSize: 34, letterSpacing: 3, color: G.ivory}}>
        转过一年，掉到 <span style={{...goldTextLight(0.3)}}>6,368 亿</span>
        <span style={{color: G.ivoryFaint, fontSize: 22}}>　—— 降幅 28.6%</span>
      </div>
    </Soft>

    <RuleFade f={t} at={140} x={200} y={806} w={1520} dur={18} />

    <Soft f={t} at={293} dur={24} style={{left: 200, top: 830, width: 1520}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 2, color: G.ivoryDim}}>
        手机从 <span style={{color: G.ivory, fontFamily: GF.num}}>2.4 亿台</span>
        <span style={{color: G.ivoryFaint, margin: '0 8px'}}>→</span>
        <span style={{color: G.red, fontFamily: GF.num}}>3,500 万台</span>
        <span style={{color: G.ivoryFaint, fontSize: 21}}>　一年掉掉八成多</span>
      </div>
    </Soft>
  </>
);

/* ══ P28 · 1,028 天 ══════════════════════════════════════════════
   全片唯一一页不讲钱。88 帧，只放一个天数和一个人名。 */
export const P28: React.FC<{t: number}> = ({t}) => (
  <>
    {/* 全片唯一一页换成冷光：同一套底子上换「温度」，比换底色稳 */}
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 66% 60% at 48% 44%, rgba(40,62,104,0.32) 0%, rgba(20,30,52,0.10) 50%, rgba(0,0,0,0) 78%)', opacity: Math.min(1, Math.max(0, t / 20))}} />
    <YearHeader f={t} at={1} year="2021" caption="9 月 · 回家" />

    <Soft f={t} at={4} dur={24} style={{left: 0, right: 0, top: 300, textAlign: 'center'}}>
      <div style={{fontFamily: GF.num, fontSize: 210, lineHeight: 1, letterSpacing: 4, ...goldText(0.8)}}>1,028</div>
    </Soft>
    <Soft f={t} at={18} dur={20} style={{left: 0, right: 0, top: 524, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 12, color: G.ivoryDim}}>天</div>
    </Soft>
    <Soft f={t} at={28} dur={22} style={{left: 0, right: 0, top: 610, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 8, color: G.ivory}}>孟晚舟回国</div>
    </Soft>
    <Soft f={t} at={44} dur={20} style={{left: 0, right: 0, top: 700, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 3, color: G.ivoryFaint}}>2018 年 12 月 1 日被扣 · 2021 年 9 月 25 日回到深圳</div>
    </Soft>
  </>
);

/* ══ P29 · 2023 年 8 月 29 日 12:08，没有发布会 ═══════════════════
   左边一个时间戳，右边一张参数页——芯片那一栏是空的。 */
export const P29: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2023" caption="8 月 29 日 · 没有发布会" />

    <Soft f={t} at={6} dur={24} style={{left: 200, top: 270}}>
      <div style={{fontFamily: GF.num, fontSize: 220, lineHeight: 1, letterSpacing: 2, ...goldText(0.8)}}>12:08</div>
    </Soft>
    <Soft f={t} at={30} dur={22} style={{left: 206, top: 520, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 6, color: G.ivory}}>直接上架</div>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint, marginTop: 12, lineHeight: 1.9}}>
        没有发布会，没有预热，官网直接开卖。
        <br />
        那一刻，市场还没反应过来。
      </div>
    </Soft>

    <Frame f={t} at={101} x={1010} y={230} w={700} h={470}>
      <div style={{padding: '28px 34px'}}>
        <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
          <div style={{fontFamily: GF.cn, fontSize: 30, fontWeight: 700, color: G.ivory}}>Mate 60 Pro</div>
          <div style={{fontFamily: GF.num, fontSize: 17, color: G.ivoryFaint, letterSpacing: 2}}>SPEC</div>
        </div>
        <div style={{height: 1, margin: '18px 0 8px', background: `linear-gradient(90deg, rgba(214,180,106,0.45), rgba(214,180,106,0))`}} />
        {[
          ['屏幕', '6.82 英寸 OLED'],
          ['影像', '可变光圈主摄'],
          ['卫星通话', '支持'],
          ['芯片', '—'],
        ].map(([k, v], i) => (
          <Soft key={k} f={t} at={110 + i * 10} dur={18} style={{left: 34, top: 96 + i * 74, width: 630}}>
            <div style={{display: 'flex', alignItems: 'baseline', gap: 10}}>
              <span style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 3, color: G.ivoryDim, whiteSpace: 'nowrap'}}>{k}</span>
              <span style={{flex: 1, borderBottom: '1px dotted rgba(214,180,106,0.25)', transform: 'translateY(-4px)'}} />
              <span style={{fontFamily: i === 3 ? GF.num : GF.cn, fontSize: i === 3 ? 30 : 21, color: i === 3 ? 'rgba(239,230,210,0.3)' : G.ivory}}>{v}</span>
            </div>
          </Soft>
        ))}
      </div>
    </Frame>

    <Soft f={t} at={191} dur={20} style={{left: 1010, top: 712, width: 700}}>
      <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryFaint}}>参数页上，芯片那一栏一个字没写。</div>
    </Soft>

    <RuleFade f={t} at={150} x={200} y={792} w={1520} dur={18} />

    <Soft f={t} at={264} dur={24} style={{left: 200, top: 818, width: 1520}}>
      <div style={{fontFamily: GF.cn, fontSize: 32, letterSpacing: 3, color: G.ivory}}>
        拆开之后，<span style={{...goldTextLight(0.32)}}>麒麟回来了</span>
        <span style={{color: G.ivoryFaint, fontSize: 21}}>　（麒麟 9000s，第三方拆机结论）</span>
      </div>
    </Soft>
  </>
);

/* ══ P30 · 7,042 → 8,809，离峰值只差 105 亿 ══════════════════════
   三根柱子往上走，一条虚线横在 2020 年的高度——还差一点点。 */
const RECOVER: [string, number][] = [
  ['2023', 7042],
  ['2024', 8621],
  ['2025', 8809],
];

export const P30: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2025" caption="深圳 · 三年爬回来" />

    <Soft f={t} at={6} dur={20} style={{left: 200, top: 168, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 5, color: G.ivory}}>2023 年 7,042 亿 · 2025 年 8,809 亿</div>
    </Soft>

    <HLine f={t} at={20} x={380} y={700} w={1000} dur={26} />
    <BarsV f={t} at={6} x={420} base={700} data={RECOVER} max={9000} bw={180} gap={130} hMax={372} hot={2} labelSize={26} valueSize={28} vals={['7,042', '8,621', '8,809']} />

    {/* 2020 年的峰值：一条虚线 */}
    {(() => {
      const p = Math.min(1, Math.max(0, (t - 266) / 24));
      if (p <= 0) return null;
      const y = 700 - (8914 / 9000) * 372;
      return (
        <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
          <line x1={380} y1={y} x2={380 + 1040 * p} y2={y} stroke={G.ivoryDim} strokeWidth={1} strokeDasharray="6 7" />
          <text x={1438} y={y - 4} fontFamily={GF.cn} fontSize={18} fill={G.gold}>
            2020 峰值 8,914
          </text>
          <text x={1438} y={y + 22} fontFamily={GF.cn} fontSize={18} fill={G.ivoryDim}>
            只差 105 亿
          </text>
        </svg>
      );
    })()}

    <RuleFade f={t} at={60} x={200} y={780} w={1520} dur={18} />
    <Note f={t} at={172} x={200} y={806} w={980} text="2024 年 8,621 亿、2025 年 8,809 亿；与 2020 年 8,914 亿相差 105 亿元。" />
  </>
);

/* ══ P31 · 汽车：450 亿，涨 72%；交付 58.9 万辆 ════════════════════
   两个数字并排，中间一条线。这一页只是「另一块账」，不解释。 */
export const P31: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2025" caption="汽车 · 另一块账" />

    <Soft f={t} at={6} dur={20} style={{left: 200, top: 172, width: 1200}}>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 5, color: G.ivory}}>手机之外，长出来的一块</div>
    </Soft>

    <Figure f={t} at={14} x={220} y={272} w={600} label="汽 车 业 务 收 入" value="450" size={202} unit="亿元" />
    <Soft f={t} at={44} dur={22} style={{left: 226, top: 600, width: 580}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim}}>
        同比 <span style={{color: G.red, fontFamily: GF.num, fontSize: 32}}>+72%</span>
        <span style={{color: G.ivoryFaint, fontSize: 18}}>　（智能汽车解决方案业务）</span>
      </div>
    </Soft>

    <VLine f={t} at={36} x={960} y0={262} y1={772} dur={26} />

    <Figure f={t} at={118} x={1040} y={272} w={620} label="鸿 蒙 智 行 交 付" value="58.9" size={202} unit="万辆" />
    <Soft f={t} at={148} dur={22} style={{left: 1046, top: 600, width: 600}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 2, color: G.ivoryDim}}>2025 全年<span style={{color: G.ivoryFaint, fontSize: 18}}>　交付量</span></div>
    </Soft>

    <RuleFade f={t} at={80} x={200} y={800} w={1520} dur={18} />
  </>
);

/* ══ P32 · 2026 上半年：4,678 亿，史上最好的上半年 ═════════════════
   一句话一页。前面所有折线到这里收成一个数字。 */
export const P32: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2026" caption="深圳 · 上半年" />

    <Soft f={t} at={6} dur={20} style={{left: 0, right: 0, top: 176, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 16, color: G.ivoryDim}}>营 业 收 入 · 上 半 年</div>
    </Soft>

    <Soft f={t} at={14} dur={26} style={{left: 0, right: 0, top: 260, textAlign: 'center'}}>
      <span style={{fontFamily: GF.num, fontSize: 300, lineHeight: 1, letterSpacing: 2, ...goldText(0.9)}}>4,678</span>
    </Soft>
    <Soft f={t} at={34} dur={22} style={{left: 0, right: 0, top: 596, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 40, letterSpacing: 14, color: G.gold}}>亿元</div>
    </Soft>
    <Soft f={t} at={120} dur={24} style={{left: 0, right: 0, top: 706, textAlign: 'center'}}>
      <div style={{fontFamily: GF.latinItalic, fontSize: 21, letterSpacing: 12, color: G.ivoryFaint}}>HALF-YEAR RECORD</div>
    </Soft>
  </>
);

/* ══ P33 · 20.6%，回到中国第一 ═══════════════════════════════════
   一个环 + 一个出货量。环用 0–100% 的整圈，填的那一小段才是重点。 */
const RING_R = 152;
const RING_C = 2 * Math.PI * RING_R;
const SHARE = 0.206;

export const P33: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2026" caption="中国手机市场 · 回到第一" />

    <Soft f={t} at={8} dur={22} style={{left: 200, top: 172, width: 1100}}>
      <div style={{fontFamily: GF.cn, fontSize: 46, letterSpacing: 5, color: G.ivory}}>中国手机市场，它回到第一</div>
    </Soft>

    <Soft f={t} at={20} dur={24} style={{left: 270, top: 286}}>
      <svg width={400} height={400} style={{overflow: 'visible'}}>
        <circle cx={200} cy={200} r={RING_R} fill="none" stroke="rgba(239,230,210,0.1)" strokeWidth={13} />
        <circle
          cx={200}
          cy={200}
          r={RING_R}
          fill="none"
          stroke={G.gold}
          strokeWidth={13}
          strokeLinecap="butt"
          strokeDasharray={`${RING_C * SHARE * Math.min(1, Math.max(0, (t - 26) / 40))} ${RING_C}`}
          transform="rotate(-90 200 200)"
          style={{filter: `drop-shadow(0 0 12px ${G.gold})`}}
        />
        <text x={200} y={218} textAnchor="middle" fontFamily={GF.num} fontSize={56} fill={G.goldBright}>20.6%</text>
        <text x={200} y={258} textAnchor="middle" fontFamily={GF.cn} fontSize={15} letterSpacing={4} fill={G.ivoryFaint}>市 场 份 额</text>
      </svg>
    </Soft>

    <Soft f={t} at={92} dur={22} style={{left: 300, top: 712, width: 340, textAlign: 'center'}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 4, color: G.ivoryFaint}}>2026 上半年 · 中国</div>
    </Soft>

    <VLine f={t} at={60} x={900} y0={300} y1={740} dur={26} />

    <Figure f={t} at={85} x={980} y={340} w={680} label="出 货 量" value="2,760" size={210} unit="万台" />
    <Soft f={t} at={120} dur={22} style={{left: 986, top: 664, width: 640}}>
      <div style={{fontFamily: GF.cn, fontSize: 22, letterSpacing: 2, color: G.ivoryDim}}>五年之后，重新站在这个位置</div>
    </Soft>
  </>
);

/* ══ P34 · 但净利掉了 37%，只剩 234 亿 ═══════════════════════════
   回到第一页那个 234。同一个数字，第二次出现时它变成了答案。 */
export const P34: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2026" caption="上半年 · 钱的另一面" />

    <Figure f={t} at={6} x={200} y={286} w={620} label="归 母 净 利 润" value="234" size={250} unit="亿元" />

    <VLine f={t} at={26} x={960} y0={300} y1={700} dur={22} color={G.red} />

    <Soft f={t} at={40} dur={24} style={{left: 1030, top: 300, width: 600}}>
      <div style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 6, color: G.ivoryDim}}>同 比</div>
      <div style={{fontFamily: GF.num, fontSize: 150, lineHeight: 1.1, color: G.red, letterSpacing: 2, textShadow: '0 0 34px rgba(200,81,60,0.42)'}}>−37%</div>
    </Soft>

    <RuleFade f={t} at={40} x={200} y={688} w={1520} dur={18} />

    <Soft f={t} at={121} dur={24} style={{left: 200, top: 720, width: 1520}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 20}}>
        <span style={{fontFamily: GF.cn, fontSize: 24, letterSpacing: 4, color: G.ivoryDim}}>上半年研发</span>
        <span style={{fontFamily: GF.num, fontSize: 62, ...goldTextLight(0.28)}}>1,213</span>
        <span style={{fontFamily: GF.cn, fontSize: 26, letterSpacing: 4, color: G.gold}}>亿</span>
        <span style={{fontFamily: GF.cn, fontSize: 21, letterSpacing: 2, color: G.ivoryFaint, marginLeft: 24}}>净利 234 亿 · 差 979 亿</span>
      </div>
    </Soft>
  </>
);

/* ══ P35 · 三十九年，从 2.1 万到 8,809 亿 ═════════════════════════
   全片唯一一张全幅图：对数纵轴，五个数量级压在一张纸上。 */
export const P35: React.FC<{t: number}> = ({t}) => {
  const X0 = 210;
  const X1 = 1700;
  const BASE = 726;
  const TOPY = 250;
  const L0 = Math.log10(0.05);
  const L1 = Math.log10(8914);
  const x = (yr: number) => X0 + ((yr - 1987) / (2026 - 1987)) * (X1 - X0);
  const y = (v: number) => BASE - ((Math.log10(v) - L0) / (L1 - L0)) * (BASE - TOPY);
  const pts = CAP.map(([yr, v]) => [x(yr), y(v)] as const);
  const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  const p = Math.min(1, Math.max(0, (t - 12) / 100));
  const e = 1 - Math.pow(1 - p, 2);

  return (
    <>
      <YearHeader f={t} at={2} year="2026" caption="三十九年 · 一条对数线" />

      <Soft f={t} at={6} dur={20} style={{left: 210, top: 168, width: 1200}}>
        <div style={{fontFamily: GF.cn, fontSize: 44, letterSpacing: 5, color: G.ivory}}>从 2.1 万块，到 8,809 亿</div>
        <div style={{fontFamily: GF.cn, fontSize: 18, letterSpacing: 2, color: G.ivoryFaint, marginTop: 10}}>纵轴为对数刻度：每往上一格，是十倍</div>
      </Soft>

      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {/* 十倍刻度 */}
        {[0.1, 1, 10, 100, 1000].map((v) => (
          <g key={v}>
            <line x1={X0} y1={y(v)} x2={X1} y2={y(v)} stroke="rgba(239,230,210,0.07)" />
            <text x={X0 - 14} y={y(v) + 5} textAnchor="end" fontFamily={GF.num} fontSize={15} fill={G.ivoryFaint}>{v} 亿</text>
          </g>
        ))}
        {[1987, 1995, 2005, 2015, 2026].map((yr) => (
          <text key={yr} x={x(yr)} y={BASE + 30} textAnchor="middle" fontFamily={GF.num} fontSize={16} fill={G.ivoryFaint}>{yr}</text>
        ))}
        <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={G.goldLine} />
        <path d={d} fill="none" stroke={G.gold} strokeWidth={2} pathLength={1} strokeDasharray={`${e} 1`} style={{filter: `drop-shadow(0 0 8px rgba(214,180,106,0.55))`}} />
        {/* 起点与终点 */}
        {e > 0.02 ? <circle cx={pts[0][0]} cy={pts[0][1]} r={4} fill={G.goldBright} opacity={e} /> : null}
        {e > 0.6 ? <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={6} fill={G.goldBright} style={{filter: `drop-shadow(0 0 12px ${G.gold})`}} /> : null}
      </svg>

      <Soft f={t} at={20} dur={22} style={{left: 240, top: 648, width: 460}}>
        <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 3, color: G.ivoryDim}}>1988 · 0.055 亿（550 万）</div>
      </Soft>
      <Soft f={t} at={110} dur={24} style={{left: 1240, top: 232, width: 460, textAlign: 'right'}}>
        <div style={{fontFamily: GF.num, fontSize: 44, ...goldTextLight(0.3), letterSpacing: 1}}>8,809 亿</div>
        <div style={{fontFamily: GF.cn, fontSize: 19, letterSpacing: 2, color: G.ivoryDim, marginTop: 4}}>2025 年营业收入</div>
      </Soft>

      <RuleFade f={t} at={90} x={210} y={790} w={1490} dur={18} />
      <Soft f={t} at={120} dur={24} style={{left: 210, top: 818, width: 1490}}>
        <div style={{fontFamily: GF.cn, fontSize: 30, letterSpacing: 3, color: G.ivory}}>
          没有股价可看，就看这条线
          <span style={{color: G.ivoryFaint, fontSize: 21}}>　—— 三十九年，五个数量级</span>
        </div>
      </Soft>
    </>
  );
};

/* ══ P36 · 钱换成了三样东西 ══════════════════════════════════════
   结尾收在三个名词和一句话上。最后一条线慢慢淡出去，不盖章。 */
export const P36: React.FC<{t: number}> = ({t}) => (
  <>
    <YearHeader f={t} at={2} year="2026" caption="三十九年 · 换回来的东西" />

    {[
      {x: 200, cn: '专 利', latin: 'Patents', note: '写进文件柜里的那部分'},
      {x: 760, cn: '产 线', latin: 'Fabs & Lines', note: '能自己把东西造出来的那部分'},
      {x: 1320, cn: '人', latin: 'People', note: '二十万人，和一套还在转的流程'},
    ].map((c, i) => (
      <React.Fragment key={c.cn}>
        <Soft f={t} at={6 + i * 12} dur={22} style={{left: c.x, top: 300, width: 420}}>
          <div style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 76, letterSpacing: 10, ...goldText(0.6)}}>{c.cn}</div>
          <div style={{fontFamily: GF.latinItalic, fontSize: 20, color: G.ivoryFaint, letterSpacing: 2, marginTop: 6}}>{c.latin}</div>
        </Soft>
        <Soft f={t} at={22 + i * 12} dur={20} style={{left: c.x, top: 440, width: 400}}>
          <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 2, lineHeight: 1.8, color: G.ivoryDim}}>{c.note}</div>
        </Soft>
      </React.Fragment>
    ))}

    <RuleFade f={t} at={48} x={200} y={556} w={1520} dur={20} />

    <Soft f={t} at={93} dur={28} style={{left: 200, top: 612, width: 1520}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 30}}>
        <span style={{fontFamily: GF.cn, fontWeight: 700, fontSize: 96, letterSpacing: 16, ...goldText(0.8)}}>还没结束</span>
        <span style={{fontFamily: GF.latinItalic, fontSize: 22, letterSpacing: 4, color: G.ivoryFaint}}>to be continued</span>
      </div>
    </Soft>

    <Soft f={t} at={126} dur={22} style={{left: 200, top: 744, width: 1520}}>
      <div style={{fontFamily: GF.cn, fontSize: 20, letterSpacing: 4, color: G.ivoryFaint}}>本片所有金额、年份与交易均标注出处；未上市，故无市值口径。</div>
    </Soft>

    <Tag f={t} at={126} x={200} y={800} cn="资料来源" latin="annual reports · public records · press" />
  </>
);
