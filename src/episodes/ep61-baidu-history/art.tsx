import React from 'react';

/**
 * 百度 26 年 · 本期原创道具（纯 SVG）。
 * 全部为示意图：不对应真实照片，不画第三方 logo，不画真实人物。
 */

const RED = '#b8433f';
const INK = '#232320';

/** 2000 年的宾馆客房：两张床、一台台式机、窗帘（北大资源宾馆示意） */
export const GuestRoom: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 240" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={240} fill="#c9c2ae" />
    {/* 墙裙与地板 */}
    <rect x={0} y={0} width={340} height={150} fill="#d5ceba" />
    <rect x={0} y={150} width={340} height={90} fill="#a89a80" />
    {/* 窗 + 窗帘 */}
    <rect x={128} y={26} width={84} height={62} fill="#8f9a92" stroke="#b3ab96" strokeWidth={3} />
    <path d="M128 26 L128 88 M156 26 L156 88 M184 26 L184 88" stroke="#b3ab96" strokeWidth={2} />
    <rect x={118} y={20} width={16} height={78} fill="#c2b28e" />
    <rect x={206} y={20} width={16} height={78} fill="#c2b28e" />
    {/* 床一张 */}
    <rect x={22} y={120} width={86} height={104} rx={6} fill="#e0dac8" stroke="#b3ab96" strokeWidth={3} />
    <rect x={22} y={120} width={86} height={30} rx={6} fill="#c9b795" />
    <rect x={34} y={156} width={62} height={40} rx={4} fill="#f1ece0" />
    {/* 另一张床改成办公桌 */}
    <rect x={216} y={126} width={104} height={64} rx={4} fill="#c2a678" stroke="#8a744f" strokeWidth={3} />
    {/* 台式机 */}
    <rect x={244} y={72} width={52} height={44} rx={3} fill="#d8d2c0" stroke="#8e8a7e" strokeWidth={3} />
    <rect x={250} y={78} width={40} height={32} fill="#4b5a52" />
    <rect x={262} y={116} width={16} height={10} fill="#b0aca0" />
    <rect x={238} y={126} width={64} height={8} fill="#a89f88" />
    {/* 纸箱（还没 unpack 的行李） */}
    <rect x={128} y={128} width={44} height={40} fill="#d9c9a8" stroke="#a8946f" strokeWidth={3} />
    <path d="M128 144 L172 144" stroke="#a8946f" strokeWidth={3} />
    {/* 电话线绕到门缝 */}
    <path d="M296 150 q20 30 -6 56" stroke="#6d6a60" strokeWidth={3} fill="none" />
  </svg>
);

/** 八个人围一张桌开会（俯视示意，不是肖像） */
export const Crowd8: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.72} viewBox="0 0 380 274" style={{overflow: 'visible'}}>
    <rect x={84} y={92} width={212} height={96} rx={8} fill="#cfc7b0" stroke="#a89f88" strokeWidth={3} />
    <rect x={106} y={108} width={168} height={64} fill="#e2dac4" />
    {/* 桌上：一台老显示器、纸、茶杯 */}
    <rect x={118} y={112} width={44} height={30} fill="#3c3c38" />
    <rect x={124} y={116} width={32} height={22} fill="#7f9a8c" />
    <rect x={186} y={122} width={48} height={34} fill="#f1ece0" stroke="#b3ab96" strokeWidth={2} />
    <circle cx={262} cy={140} r={9} fill="#f1ece0" stroke="#b3ab96" strokeWidth={2} />
    {/* 上排 4 人 */}
    {Array.from({length: 4}, (_, i) => (
      <g key={`t${i}`}>
        <circle cx={116 + i * 44} cy={64} r={15} fill={i === 0 ? '#3d3d38' : '#5f5f58'} />
        <path d={`M${101 + i * 44} 88 q15 -16 30 0`} fill={i === 0 ? '#3d3d38' : '#5f5f58'} />
      </g>
    ))}
    {/* 左右各 2 人 */}
    {[0, 1].map((i) => (
      <g key={`s${i}`}>
        <circle cx={44} cy={118 + i * 44} r={15} fill="#5f5f58" />
        <path d={`M60 ${103 + i * 44} q16 15 0 30`} fill="#5f5f58" />
        <circle cx={336} cy={118 + i * 44} r={15} fill={i === 0 ? RED : '#5f5f58'} />
        <path d={`M320 ${103 + i * 44} q-16 15 0 30`} fill={i === 0 ? RED : '#5f5f58'} />
      </g>
    ))}
  </svg>
);

/** 2001 年的搜索结果页：第一格是「推广」标签（竞价排名示意） */
export const SearchBid: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.82} viewBox="0 0 320 262" style={{overflow: 'visible'}}>
    <rect x={8} y={8} width={304} height={246} rx={8} fill="#f6f2e6" stroke="#b3ab96" strokeWidth={3} />
    {/* 搜索框 */}
    <rect x={26} y={24} width={214} height={30} rx={4} fill="#fff" stroke={INK} strokeWidth={3} />
    <rect x={248} y={24} width={64} height={30} rx={4} fill={RED} />
    <text x={280} y={45} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={16} fill="#f6f2e6">
      搜索
    </text>
    {/* 第一条：推广 */}
    <rect x={26} y={70} width={284} height={52} fill={RED} opacity={0.08} />
    <rect x={26} y={70} width={34} height={16} fill={RED} />
    <text x={43} y={82} textAnchor="middle" fontFamily="serif" fontSize={11} fill="#fff">
      推广
    </text>
    <rect x={70} y={74} width={150} height={10} fill={INK} />
    <rect x={26} y={98} width={230} height={7} fill="#8d8a80" />
    <rect x={26} y={110} width={180} height={7} fill="#c2bda9" />
    {/* 后两条自然结果 */}
    {[140, 196].map((y, i) => (
      <g key={y}>
        <rect x={26} y={y} width={120 + i * 30} height={10} fill="#5b6b8a" />
        <rect x={26} y={y + 22} width={210} height={7} fill="#8d8a80" />
        <rect x={26} y={y + 34} width={160} height={7} fill="#c2bda9" />
      </g>
    ))}
  </svg>
);

/** 一台 2002 年的台式电脑：屏幕上是搜索框（闪电计划示意） */
export const CRTDesk: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.86} viewBox="0 0 300 258" style={{overflow: 'visible'}}>
    {/* 显示器 */}
    <rect x={40} y={18} width={180} height={140} rx={14} fill="#d8d2c0" stroke="#8e8a7e" strokeWidth={4} />
    <rect x={56} y={34} width={148} height={104} fill="#42564c" />
    <rect x={72} y={52} width={116} height={22} rx={3} fill="#f2ede0" />
    <circle cx={182} cy={63} r={8} fill={RED} />
    <text x={130} y={122} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={17} fill="#e8e2cf">
      搜得更准
    </text>
    <rect x={112} y={158} width={36} height={22} fill="#b0aca0" />
    <rect x={88} y={180} width={84} height={8} rx={3} fill="#9a968a" />
    {/* 主机 */}
    <rect x={196} y={150} width={78} height={86} rx={4} fill="#3c3c38" />
    <rect x={204} y={160} width={62} height={8} rx={2} fill="#2c2c28" />
    <circle cx={252} cy={186} r={4} fill="#e8e2cf" />
    <circle cx={252} cy={200} r={4} fill="#8b877c" />
    {/* 键盘 */}
    <rect x={44} y={206} width={120} height={30} rx={4} fill="#d8d2c0" stroke="#8e8a7e" strokeWidth={3} />
    {Array.from({length: 5}, (_, i) => (
      <rect key={i} x={52 + i * 22} y={214} width={16} height={6} fill="#a8a497" />
    ))}
    {/* 速度线 */}
    <path d="M244 44 L272 44" stroke={RED} strokeWidth={4} />
    <path d="M252 60 L276 60" stroke={RED} strokeWidth={4} opacity={0.6} />
  </svg>
);

/** 纳斯达克行情牌：BIDU +354%（示意大屏） */
export const IpoBoard: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice">
    <rect width={360} height={220} fill="#1e1e1c" />
    <rect x={14} y={14} width={332} height={192} fill="#111110" stroke="#3a3a36" strokeWidth={2} />
    <text x={34} y={70} fontFamily="monospace" fontSize={44} fontWeight={700} fill="#e8e2cf">
      BIDU
    </text>
    <text x={34} y={128} fontFamily="monospace" fontSize={54} fontWeight={700} fill={RED}>
      +354%
    </text>
    <text x={34} y={176} fontFamily="monospace" fontSize={22} fill="#8d8a80">
      27.00 → 122.54
    </text>
    {/* 涨的柱 */}
    {[26, 40, 34, 58, 74, 96, 120].map((v, i) => (
      <rect key={i} x={210 + i * 18} y={190 - v} width={12} height={v} fill={i > 2 ? RED : '#6b4a48'} />
    ))}
  </svg>
);

/** 一只行李箱和登机牌：谷歌离开（示意） */
export const Suitcase: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.9} viewBox="0 0 300 270" style={{overflow: 'visible'}}>
    <rect width={300} height={270} fill="#ddd7c5" />
    {/* 箱体 */}
    <rect x={62} y={70} width={150} height={176} rx={12} fill="#8a5f4a" stroke="#6d4a38" strokeWidth={5} />
    <rect x={62} y={132} width={150} height={10} fill="#6d4a38" />
    <rect x={92} y={54} width={90} height={16} rx={7} fill="none" stroke="#6d4a38" strokeWidth={8} />
    {/* 登机牌 */}
    <g transform="rotate(-8 216 96)">
      <rect x={162} y={56} width={104} height={64} rx={6} fill="#f4f0e4" stroke="#b3ab96" strokeWidth={3} />
      <path d="M162 88 L266 88" stroke="#c2bda9" strokeWidth={2} strokeDasharray="6 5" />
      <rect x={172} y={66} width={40} height={9} fill={INK} />
      <rect x={172} y={96} width={54} height={7} fill="#8d8a80" />
      <path d="M214 118 L238 112 M238 112 l-8 -6 m8 6 l-9 4" stroke={RED} strokeWidth={4} fill="none" />
    </g>
    {/* 走的脚印 */}
    {[0, 1, 2].map((i) => (
      <ellipse key={i} cx={44 + i * 16} cy={250 - (i % 2) * 10} rx={7} ry={4} fill="#8a8578" opacity={0.7 - i * 0.18} />
    ))}
  </svg>
);

/** 「市值第一」的薄木奖牌：2011（示意） */
export const FirstTag: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.94} viewBox="0 0 280 262" style={{overflow: 'visible'}}>
    {/* 挂绳 */}
    <path d="M60 16 L96 96 M220 16 L184 96" stroke={RED} strokeWidth={7} />
    {/* 牌 */}
    <rect x={44} y={92} width={192} height={140} rx={10} fill="#c2a678" stroke="#8a744f" strokeWidth={5} />
    <rect x={60} y={108} width={160} height={108} rx={6} fill="none" stroke="#8a744f" strokeWidth={2} />
    <text x={140} y={156} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={30} fill={INK}>
      市值第一
    </text>
    <text x={140} y={192} textAnchor="middle" fontFamily="serif" fontSize={18} fill="#6d5b3a">
      462 vs 446
    </text>
    {/* 缎带结 */}
    <circle cx={140} cy={96} r={12} fill={RED} />
  </svg>
);

/** 酒驾：方向盘 + 酒瓶（2012 的那句比喻） */
export const DrunkWheel: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.8} viewBox="0 0 320 256" style={{overflow: 'visible'}}>
    {/* 方向盘 */}
    <circle cx={140} cy={128} r={92} fill="none" stroke={INK} strokeWidth={16} />
    <circle cx={140} cy={128} r={30} fill={INK} />
    <path d="M140 36 L140 98 M48 128 L110 128 M232 128 L170 128" stroke={INK} strokeWidth={14} strokeLinecap="round" />
    {/* 酒瓶 */}
    <g transform="rotate(18 252 90)">
      <rect x={242} y={72} width={20} height={22} fill="#4a5a4e" />
      <path d="M234 94 L270 94 L276 210 L228 210 Z" fill="#5b6b5e" />
      <rect x={236} y={140} width={34} height={44} fill="#f4f0e4" opacity={0.9} />
      <text x={253} y={168} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={17} fill={RED}>
        酒
      </text>
    </g>
    {/* 警示 */}
    <path d="M40 214 L96 214" stroke={RED} strokeWidth={5} />
    <path d="M52 232 L108 232" stroke={RED} strokeWidth={5} opacity={0.5} />
  </svg>
);

/** 一排应用货架，被贴上「无人问津」（91 无线示意） */
export const AppShelf: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.84} viewBox="0 0 320 268" style={{overflow: 'visible'}}>
    <rect x={20} y={16} width={280} height={220} rx={8} fill="#b6b2a6" />
    {/* 三层货架 */}
    {[0, 1, 2].map((r) => (
      <g key={r}>
        <rect x={34} y={54 + r * 62} width={252} height={9} fill="#7a766a" />
        {[0, 1, 2, 3].map((c) => (
          <rect key={c} x={44 + c * 62} y={22 + r * 62} width={38} height={32} rx={6} fill={r === 2 && c > 1 ? '#8a8578' : ['#8f9a83', '#b8a686', '#6f7b76', '#a8a497'][(r + c) % 4]} />
        ))}
      </g>
    ))}
    {/* 蛛网 */}
    <path d="M244 208 q18 10 40 4 M252 216 q14 8 30 6 M258 224 q10 6 22 6" stroke="#8a8578" strokeWidth={2.5} fill="none" />
    {/* 价签 */}
    <g transform="rotate(-6 96 238)">
      <rect x={44} y={222} width={104} height={28} rx={4} fill={RED} />
      <text x={96} y={241} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={16} fill="#f6f2e6">
        最贵的一张船票
      </text>
    </g>
  </svg>
);

/** 一张 200 亿的支票（糯米 O2O 示意） */
export const BigCheck: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.56} viewBox="0 0 360 202" style={{overflow: 'visible'}}>
    <rect x={10} y={14} width={340} height={174} rx={8} fill="#f6f2e6" stroke={INK} strokeWidth={4} />
    <path d="M30 26 L330 26 M30 176 L330 176" stroke="#c2bda9" strokeWidth={2} />
    <text x={30} y={58} fontFamily="serif" fontSize={20} fill="#5b5b54">
      专项投入
    </text>
    <text x={120} y={116} fontFamily="serif" fontWeight={700} fontSize={54} fill={RED}>
      ¥ 200 亿
    </text>
    <text x={30} y={156} fontFamily="serif" fontSize={18} fill="#8d8a80">
      三年，砸向本地生活
    </text>
    <path d="M262 132 q26 -18 54 2 q-10 20 -54 -2" fill="none" stroke={INK} strokeWidth={3} />
  </svg>
);

/** 病床边贴着「推广」标签的搜索卡（魏则西段示意，不画人物） */
export const BedPromo: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.78} viewBox="0 0 320 250" style={{overflow: 'visible'}}>
    {/* 病床 */}
    <rect x={22} y={140} width={190} height={54} rx={6} fill="#e0dac8" stroke="#b3ab96" strokeWidth={4} />
    <rect x={22} y={140} width={190} height={18} fill="#c9b795" />
    <rect x={34} y={90} width={14} height={104} fill="#8a8578" />
    <rect x={196} y={90} width={14} height={104} fill="#8a8578" />
    {/* 输液架 */}
    <path d="M244 60 L244 194" stroke="#6d6a60" strokeWidth={5} />
    <rect x={228} y={44} width={32} height={22} rx={4} fill="#d5e2dc" stroke="#8f9a92" strokeWidth={3} />
    {/* 搜索卡 */}
    <g transform="rotate(-3 150 62)">
      <rect x={62} y={24} width={176} height={62} rx={6} fill="#f6f2e6" stroke={RED} strokeWidth={4} />
      <rect x={74} y={36} width={30} height={14} fill={RED} />
      <text x={89} y={47} textAnchor="middle" fontFamily="serif" fontSize={10} fill="#fff">
        推广
      </text>
      <rect x={114} y={38} width={96} height={9} fill={INK} />
      <rect x={74} y={62} width={140} height={7} fill="#8d8a80" />
    </g>
    {/* 问号 */}
    <text x={282} y={120} fontFamily="serif" fontWeight={700} fontSize={44} fill={RED} opacity={0.85}>
      ?
    </text>
  </svg>
);

/** 萝卜快跑的无人车：方正车身、顶置激光雷达（示意，不画品牌 logo） */
export const Robotaxi: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.62} viewBox="0 0 360 224" style={{overflow: 'visible'}}>
    {/* 车身 */}
    <path d="M40 158 L52 108 Q56 92 76 90 L262 90 Q286 92 296 116 L316 152 Q320 166 306 168 L48 168 Q34 168 40 158 Z" fill="#e8e2cf" stroke={INK} strokeWidth={5} />
    {/* 挡风窗 */}
    <path d="M84 100 L236 100 Q262 102 274 122 L280 134 L74 134 Z" fill="#6f7b76" />
    <rect x={150} y={104} width={70} height={10} rx={5} fill="#5b6b5e" opacity={0.6} />
    {/* 顶置雷达 */}
    <rect x={148} y={64} width={44} height={24} rx={10} fill="#2b2b28" />
    <rect x={156} y={70} width={28} height={12} rx={6} fill="#5e8f74" />
    <path d="M170 52 a26 10 0 0 1 26 10" stroke={RED} strokeWidth={3} fill="none" opacity={0.7} />
    <path d="M170 46 a38 14 0 0 1 38 14" stroke={RED} strokeWidth={3} fill="none" opacity={0.45} />
    {/* 轮 */}
    <circle cx={104} cy={176} r={34} fill="#2b2b28" />
    <circle cx={104} cy={176} r={15} fill="#b6b2a6" />
    <circle cx={258} cy={176} r={34} fill="#2b2b28" />
    <circle cx={258} cy={176} r={15} fill="#b6b2a6" />
    {/* 萝卜小旗 */}
    <path d="M320 96 L320 52" stroke={INK} strokeWidth={4} />
    <path d="M320 52 L354 62 L320 74 Z" fill={RED} />
  </svg>
);

/** 一枚 AI 芯片：昆仑芯示意（晶圆底座、引脚、核心光点） */
export const KunlunChip: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 260 260" style={{overflow: 'visible'}}>
    <rect x={34} y={34} width={192} height={192} rx={12} fill="#2b2b28" />
    {Array.from({length: 8}, (_, i) => (
      <React.Fragment key={i}>
        <rect x={44 + i * 22} y={18} width={9} height={18} fill="#9a968a" />
        <rect x={44 + i * 22} y={224} width={9} height={18} fill="#9a968a" />
        <rect x={18} y={44 + i * 22} width={18} height={9} fill="#9a968a" />
        <rect x={224} y={44 + i * 22} width={18} height={9} fill="#9a968a" />
      </React.Fragment>
    ))}
    <rect x={78} y={78} width={104} height={104} rx={6} fill="#3a3a35" stroke="#5f5f58" strokeWidth={3} />
    <text x={130} y={122} textAnchor="middle" fontFamily="monospace" fontWeight={700} fontSize={22} fill="#e8e2cf">
      XPU
    </text>
    <rect x={106} y={138} width={48} height={10} rx={4} fill={RED} opacity={0.9} />
    <rect x={98} y={156} width={64} height={8} rx={4} fill="#f0d9a8" opacity={0.7} />
    {[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        <path d={`M${88 + i * 26} 78 V46`} stroke="#7a766a" strokeWidth={3} />
        <path d={`M${88 + i * 26} 182 V214`} stroke="#7a766a" strokeWidth={3} />
        <path d={`M78 ${88 + i * 26} H46`} stroke="#7a766a" strokeWidth={3} />
        <path d={`M182 ${88 + i * 26} H214`} stroke="#7a766a" strokeWidth={3} />
      </React.Fragment>
    ))}
  </svg>
);

/** 一口上市铜锣（港股二次上市示意） */
export const Gong: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.9} viewBox="0 0 300 270" style={{overflow: 'visible'}}>
    <rect width={300} height={270} fill="#ddd7c5" />
    <rect x={28} y={30} width={12} height={200} fill="#6d5b45" />
    <rect x={260} y={30} width={12} height={200} fill="#6d5b45" />
    <rect x={20} y={26} width={260} height={12} fill="#6d5b45" />
    <rect x={10} y={222} width={280} height={12} rx={4} fill="#6d5b45" />
    <circle cx={150} cy={128} r={74} fill="#b08b4a" />
    <circle cx={150} cy={128} r={74} fill="none" stroke="#8a6a34" strokeWidth={7} />
    <circle cx={150} cy={128} r={46} fill="#c49b55" />
    <circle cx={150} cy={128} r={20} fill="#d4ae68" />
    <path d="M150 54 L150 32" stroke="#5b4a36" strokeWidth={6} />
    <g transform="rotate(24 236 120)">
      <rect x={228} y={88} width={12} height={68} rx={5} fill="#5b4a36" />
      <rect x={212} y={150} width={44} height={26} rx={8} fill="#8e2f2c" />
    </g>
    <path d="M60 60 q-18 22 0 44" stroke={RED} strokeWidth={4} fill="none" />
    <path d="M40 48 q-26 32 0 64" stroke={RED} strokeWidth={3} fill="none" opacity={0.6} />
  </svg>
);

/** 一个下跌四年的股价曲线小卡（阴跌段示意） */
export const SlowDrift: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.72} viewBox="0 0 300 216" style={{overflow: 'visible'}}>
    <rect x={10} y={10} width={280} height={196} rx={8} fill="#f6f2e6" stroke="#b3ab96" strokeWidth={3} />
    <path d="M30 42 L66 58 L98 50 L132 86 L166 78 L198 118 L232 110 L266 156" stroke={RED} strokeWidth={6} fill="none" strokeLinecap="round" />
    {[30, 66, 98, 132, 166, 198, 232, 266].map((x, i) => (
      <circle key={x} cx={x} cy={[42, 58, 50, 86, 78, 118, 110, 156][i]} r={6} fill={i > 4 ? RED : '#6b4a48'} />
    ))}
    <text x={150} y={190} textAnchor="middle" fontFamily="serif" fontSize={16} fill="#8d8a80">
      四年，一步一台阶
    </text>
  </svg>
);
