import React from 'react';
import {V, VF} from '../../library/vox/theme';

/* ============================================================
   灰度示意画（交给 HalftonePhoto 做成网点，明暗反差要大）
   ============================================================ */

/** 1976 车库：一张木工作台、示波器、散落的板子 */
export const GarageBench: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#b8b8b8" />
    <rect x={0} y={0} width={340} height={70} fill="#dcdcdc" />
    {[30, 96, 244, 310].map((x) => <rect key={x} x={x} y={6} width={14} height={64} fill="#5a5a5a" />)}
    {/* 货架 */}
    <rect x={16} y={78} width={308} height={8} fill="#3a3a3a" />
    {[28, 74, 120].map((x) => <rect key={x} x={x} y={58} width={34} height={20} fill="#6a6a6a" />)}
    {/* 工作台 */}
    <rect x={0} y={148} width={340} height={16} fill="#2a2a2a" />
    <rect x={20} y={164} width={16} height={66} fill="#4a4a4a" />
    <rect x={304} y={164} width={16} height={66} fill="#4a4a4a" />
    {/* 示波器 */}
    <rect x={40} y={104} width={92} height={44} rx={4} fill="#3a3a3a" />
    <rect x={50} y={112} width={54} height={28} fill="#d8d8d8" />
    <path d="M52 128 L62 118 L70 132 L80 120 L92 130 L100 122" stroke="#2a2a2a" strokeWidth={2} fill="none" />
    <circle cx={116} cy={120} r={5} fill="#8a8a8a" />
    <circle cx={116} cy={134} r={5} fill="#8a8a8a" />
    {/* 桌上电路板 */}
    <rect x={162} y={132} width={88} height={16} fill="#6a6a6a" />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={170 + i * 16} y={136} width={8} height={8} fill="#2a2a2a" />)}
    <rect x={266} y={126} width={48} height={22} rx={3} fill="#4a4a4a" />
    {/* 三个人 */}
    {[196, 250, 302].map((x, i) => (
      <g key={x}>
        <circle cx={x} cy={186} r={13 - i * 2} fill="#1c1c1c" />
        <rect x={x - 15} y={200} width={30} height={24 - i * 3} rx={7} fill="#1c1c1c" />
      </g>
    ))}
  </svg>
);

/** Apple II：主机 + 显示器 + 键盘 */
export const AppleTwoArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#c4c4c4" />
    <rect x={0} y={0} width={340} height={230} fill="#c4c4c4" />
    {/* 显示器 */}
    <rect x={78} y={26} width={184} height={132} rx={8} fill="#3a3a3a" />
    <rect x={92} y={40} width={156} height={104} rx={4} fill="#d8d8d8" />
    <rect x={104} y={52} width={132} height={8} fill="#8a8a8a" />
    <rect x={104} y={68} width={92} height={7} fill="#9a9a9a" />
    <rect x={104} y={82} width={112} height={7} fill="#9a9a9a" />
    <rect x={104} y={96} width={64} height={7} fill="#9a9a9a" />
    <rect x={104} y={112} width={40} height={10} fill="#6a6a6a" />
    {/* 主机 */}
    <rect x={104} y={162} width={132} height={30} rx={4} fill="#4a4a4a" />
    <rect x={118} y={170} width={46} height={12} fill="#2a2a2a" />
    <circle cx={214} cy={176} r={6} fill="#8a8a8a" />
    {/* 键盘 */}
    <path d="M64 196 L276 196 L292 220 L48 220 Z" fill="#5a5a5a" />
    {Array.from({ length: 11 }, (_, i) => (
      <rect key={i} x={64 + i * 18} y={202} width={13} height={8} fill="#8a8a8a" />
    ))}
    <rect x={84} y={212} width={150} height={5} fill="#8a8a8a" />
  </svg>
);

/** 1985 董事会：一张长桌、几把椅子、一扇百叶窗（高反差，过网点后仍是剪影） */
export const Boardroom: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#ffffff" />
    {/* 后墙与百叶窗 */}
    <rect x={0} y={0} width={340} height={104} fill="#f0f0f0" />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={196} y={10 + i * 13} width={128} height={7} fill="#111111" />)}
    <rect x={0} y={104} width={340} height={10} fill="#111111" />
    {/* 长桌（透视）+ 桌面高光 */}
    <path d="M28 170 L312 170 L340 226 L0 226 Z" fill="#111111" />
    <path d="M28 170 L312 170 L318 182 L22 182 Z" fill="#8a8a8a" />
    {/* 纸 */}
    {[56, 126, 196, 266].map((x) => (
      <g key={x}>
        <rect x={x} y={186} width={44} height={30} fill="#ffffff" transform={`rotate(-6 ${x + 22} 201)`} />
      </g>
    ))}
    {/* 椅背与人头剪影 */}
    {[40, 114, 188, 262].map((x) => (
      <g key={x} fill="#111111">
        <circle cx={x + 24} cy={124} r={17} />
        <path d={`M${x} 176 Q${x + 2} 140 ${x + 24} 140 Q${x + 46} 140 ${x + 48} 176 Z`} />
      </g>
    ))}
  </svg>
);

/** 十二年的下滑：一排关掉的店、落灰的货架 */
export const EmptyShelf: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#9e9e9e" />
    <rect x={0} y={0} width={340} height={46} fill="#3a3a3a" />
    <rect x={0} y={196} width={340} height={34} fill="#6a6a6a" />
    {[54, 122, 190].map((y) => (
      <g key={y}>
        <rect x={18} y={y} width={304} height={7} fill="#4a4a4a" />
        {[30, 78, 126, 268].map((x, i) => (
          <rect key={x} x={x} y={y - 30 + (i % 2) * 8} width={34} height={26} fill="#c8c8c8" opacity={0.7} />
        ))}
      </g>
    ))}
    {/* 一把倒下的椅子 */}
    <path d="M236 150 L292 150 L292 162 L236 162 Z" fill="#2a2a2a" />
    <rect x={240} y={120} width={10} height={34} fill="#2a2a2a" />
    {/* 灰 */}
    <circle cx={68} cy={100} r={2} fill="#e8e8e8" />
    <circle cx={168} cy={164} r={2} fill="#e8e8e8" />
    <circle cx={292} cy={88} r={2} fill="#e8e8e8" />
  </svg>
);

/** 2007 发布会：一块大屏 + 一个上台的人影 */
export const Stage: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#2a2a2a" />
    <rect x={0} y={0} width={340} height={150} fill="#151515" />
    <rect x={54} y={18} width={232} height={124} fill="#e6e6e6" />
    <rect x={112} y={40} width={46} height={82} rx={7} fill="#1a1a1a" />
    <rect x={120} y={50} width={30} height={62} fill="#8a8a8a" />
    <rect x={186} y={58} width={78} height={8} fill="#9a9a9a" />
    <rect x={186} y={76} width={58} height={8} fill="#9a9a9a" />
    <rect x={186} y={94} width={68} height={8} fill="#9a9a9a" />
    {/* 舞台地面 */}
    <rect x={0} y={150} width={340} height={80} fill="#3a3a3a" />
    {/* 人影 */}
    <g fill="#0c0c0c">
      <circle cx={170} cy={160} r={11} />
      <path d="M152 214 Q154 176 170 176 Q186 176 188 214 Z" />
      <rect x={186} y={180} width={7} height={22} />
    </g>
    {/* 观众头影 */}
    {[24, 62, 100, 240, 278, 316].map((x) => <circle key={x} cx={x} cy={222} r={16} fill="#111" />)}
  </svg>
);

/** Vision Pro 侧影：一块包住眼睛的弧形玻璃 */
export const Goggles: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#cfcfcf" />
    <path d="M48 96 Q52 66 96 62 Q170 54 244 62 Q288 66 292 96 Q296 140 250 150 Q170 162 90 150 Q44 140 48 96 Z" fill="#1e1e1e" />
    <path d="M62 100 Q66 78 104 75 Q170 68 236 75 Q274 78 278 100 Q280 128 244 134 Q170 144 96 134 Q60 128 62 100 Z" fill="#4a4a4a" />
    <ellipse cx={120} cy={104} rx={42} ry={24} fill="#8a8a8a" />
    <ellipse cx={220} cy={104} rx={42} ry={24} fill="#8a8a8a" />
    <rect x={150} y={148} width={40} height={10} rx={4} fill="#3a3a3a" />
    <path d="M170 158 Q170 190 140 206 M170 158 Q170 190 200 206" stroke="#5a5a5a" strokeWidth={8} fill="none" />
  </svg>
);

/** 折叠机：合起来一半的机身 */
export const Foldable: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#cfcfcf" />
    <rect x={92} y={30} width={78} height={168} rx={8} fill="#1c1c1c" />
    <rect x={100} y={38} width={62} height={152} fill="#9a9a9a" />
    <rect x={168} y={30} width={82} height={168} rx={8} fill="#2a2a2a" transform="skewY(2)" />
    <rect x={172} y={38} width={68} height={152} fill="#8a8a8a" transform="skewY(2)" />
    <path d="M168 30 L168 198" stroke="#0a0a0a" strokeWidth={5} />
  </svg>
);

/* ============================================================
   彩色贴纸
   ============================================================ */

const ink = V.ink;
const red = V.red;

/** 苹果剪影（几何化示意，不是官方标识） */
export const AppleMark: React.FC<{s?: number; mono?: boolean}> = ({s = 120, mono}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <path
      d="M50 30 Q42 18 30 19 Q16 21 14 39 Q12 58 24 74 Q32 86 40 84 Q46 82 50 84 Q54 82 60 84 Q68 86 76 74 Q88 58 86 39 Q84 21 70 19 Q58 18 50 30 Z"
      fill={mono ? '#2a2a2a' : ink}
    />
    <path d="M50 29 Q51 16 60 10 Q61 20 50 29 Z" fill={mono ? '#2a2a2a' : ink} />
    {!mono && (
      <g opacity={0.85}>
        {['#c0392b', '#d9822b', '#c9b03a', '#4a8f3c', '#2f6fb0', '#6a4a9a'].map((c, i) => (
          <rect key={c} x={22} y={38 + i * 6} width={56} height={4} fill={c} opacity={0.28} />
        ))}
      </g>
    )}
  </svg>
);

/** Apple I 电路板 */
export const AppleOne: React.FC<{s?: number}> = ({s = 150}) => (
  <svg width={s} height={s * 0.72} viewBox="0 0 200 144">
    <rect x={4} y={8} width={192} height={128} rx={3} fill="#2f4a2c" stroke={ink} strokeWidth={4} />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={18 + i * 18} y={18} width={9} height={26} fill="#1a1a1a" />)}
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={18 + i * 18} y={100} width={9} height={26} fill="#1a1a1a" />)}
    {[0, 1, 2, 3].map((i) => <rect key={i} x={36 + i * 34} y={58} width={22} height={30} rx={2} fill="#121212" />)}
    <path d="M16 92 L184 92 M16 52 L184 52" stroke="#c9b04a" strokeWidth={2} />
    <text x={100} y={132} textAnchor="middle" fontFamily={VF.heavy} fontSize={11} fill="#d8d4c0">APPLE 1</text>
  </svg>
);

/** 1984 的方盒子 Macintosh */
export const MacBox: React.FC<{s?: number}> = ({s = 150}) => (
  <svg width={s} height={s * 0.9} viewBox="0 0 200 180">
    <rect x={26} y={10} width={148} height={124} rx={8} fill="#c9c4b8" stroke={ink} strokeWidth={4} />
    <rect x={42} y={26} width={116} height={84} rx={3} fill="#2a2a2a" />
    <rect x={48} y={32} width={104} height={72} fill="#9aa08f" />
    <path d="M58 92 L76 68 L88 84 L104 58 L124 92 Z" fill="#5a6050" />
    <circle cx={140} cy={122} r={5} fill="#8a8478" />
    <rect x={56} y={134} width={88} height={34} rx={3} fill="#b5b0a4" stroke={ink} strokeWidth={3} />
    {Array.from({ length: 7 }, (_, i) => <rect key={i} x={62 + i * 11} y={142} width={8} height={6} fill="#8a8478" />)}
    <rect x={62} y={154} width={70} height={6} fill="#8a8478" />
    <text x={100} y={178} textAnchor="middle" fontFamily={VF.heavy} fontSize={9} fill={ink}>1984</text>
  </svg>
);

/** iMac 半透明一体机 */
export const IMacArt: React.FC<{s?: number}> = ({s = 150}) => (
  <svg width={s} height={s * 0.95} viewBox="0 0 200 190">
    <path d="M30 18 Q30 10 40 10 L160 10 Q170 10 170 18 L170 128 Q170 136 160 136 L40 136 Q30 136 30 128 Z" fill="#7fb8c9" opacity={0.9} stroke={ink} strokeWidth={4} />
    <rect x={44} y={26} width={112} height={86} rx={4} fill="#e8eef0" />
    <rect x={52} y={34} width={96} height={70} fill="#b8d4dc" />
    <circle cx={100} cy={122} r={7} fill="#4a7c8a" />
    <path d="M88 136 L84 168 L116 168 L112 136 Z" fill="#9fcfda" stroke={ink} strokeWidth={4} />
    <rect x={64} y={168} width={72} height={12} rx={5} fill="#7fb8c9" stroke={ink} strokeWidth={3} />
    <text x={100} y={186} textAnchor="middle" fontFamily={VF.heavy} fontSize={9} fill={ink}>iMAC</text>
  </svg>
);

/** iPod：转盘 + 小屏 */
export const IPodArt: React.FC<{s?: number}> = ({s = 110}) => (
  <svg width={s} height={s * 1.6} viewBox="0 0 100 160">
    <rect x={8} y={6} width={84} height={148} rx={12} fill="#dcdcd8" stroke={ink} strokeWidth={4} />
    <rect x={18} y={18} width={64} height={48} rx={3} fill="#8a9a8a" />
    <rect x={22} y={22} width={56} height={10} fill="#c9d8c9" />
    <rect x={22} y={36} width={38} height={5} fill="#6a7a6a" />
    <circle cx={50} cy={112} r={30} fill="#efefeb" stroke={ink} strokeWidth={3} />
    <circle cx={50} cy={112} r={12} fill="#dcdcd8" stroke={ink} strokeWidth={2} />
    <text x={50} y={94} textAnchor="middle" fontFamily={VF.heavy} fontSize={9} fill="#7a7a72">MENU</text>
  </svg>
);

/** iPhone：一整块玻璃 */
export const IPhoneArt: React.FC<{s?: number; fold?: boolean}> = ({s = 100, fold}) => (
  <svg width={s} height={s * 1.9} viewBox="0 0 100 190">
    <rect x={6} y={4} width={88} height={182} rx={12} fill="#1a1a1a" stroke={ink} strokeWidth={3} />
    <rect x={11} y={12} width={78} height={166} rx={7} fill={fold ? '#7a7a86' : '#3d4a5a'} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={18} y={30 + i * 22} width={26} height={18} rx={3} fill={i % 2 ? '#5a6a7e' : '#6c7d92'} />
    ))}
    <rect x={50} y={74} width={34} height={10} fill="#c9b04a" />
    <rect x={50} y={90} width={22} height={8} fill="#8a9aae" />
    <rect x={38} y={20} width={24} height={5} rx={2} fill="#0a0a0a" />
    <circle cx={50} cy={174} r={4} fill="#4a4a52" />
  </svg>
);

/** iPad */
export const IPadArt: React.FC<{s?: number}> = ({s = 120}) => (
  <svg width={s} height={s * 1.35} viewBox="0 0 120 162">
    <rect x={4} y={4} width={112} height={154} rx={8} fill="#1a1a1a" stroke={ink} strokeWidth={3} />
    <rect x={10} y={12} width={100} height={138} fill="#4a5a6a" />
    {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
      <rect key={`${r}-${c}`} x={18 + c * 23} y={26 + r * 32} width={17} height={22} rx={3} fill={r === 0 ? '#7a8a9a' : '#5f7183'} />
    )))}
    <rect x={18} y={126} width={84} height={6} fill="#7a8a9a" />
  </svg>
);

/** Apple Watch */
export const WatchArt: React.FC<{s?: number}> = ({s = 84}) => (
  <svg width={s} height={s * 1.4} viewBox="0 0 80 112">
    <rect x={26} y={0} width={28} height={30} rx={5} fill="#8a8a86" />
    <rect x={26} y={82} width={28} height={30} rx={5} fill="#8a8a86" />
    <rect x={10} y={28} width={60} height={56} rx={14} fill="#c9c9c4" stroke={ink} strokeWidth={3} />
    <rect x={17} y={35} width={46} height={42} rx={9} fill="#1a1a1a" />
    <circle cx={40} cy={50} r={8} fill="none" stroke="#c9b04a" strokeWidth={3} />
    <rect x={30} y={62} width={20} height={4} rx={2} fill="#6a7a8a" />
    <rect x={70} y={44} width={6} height={10} rx={3} fill="#8a8a86" />
  </svg>
);

/** AirPods：充电盒 + 两只耳机 */
export const AirPodsArt: React.FC<{s?: number}> = ({s = 110}) => (
  <svg width={s} height={s * 0.8} viewBox="0 0 140 112">
    <rect x={12} y={30} width={54} height={62} rx={10} fill="#efefeb" stroke={ink} strokeWidth={3} />
    <path d="M12 52 L66 52" stroke="#b8b8b0" strokeWidth={2} />
    <rect x={30} y={86} width={18} height={3} rx={2} fill="#b8b8b0" />
    {[86, 112].map((x, i) => (
      <g key={x}>
        <ellipse cx={x} cy={38} rx={11} ry={13} fill="#efefeb" stroke={ink} strokeWidth={3} />
        <rect x={x - 4} y={48} width={8} height={44} rx={4} fill="#efefeb" stroke={ink} strokeWidth={3} />
        {i === 0 && <circle cx={x} cy={34} r={3} fill="#8a8a86" />}
      </g>
    ))}
  </svg>
);

/** M 系列芯片 */
export const ChipM: React.FC<{label?: string; s?: number}> = ({label = 'M 1', s = 150}) => (
  <svg width={s} height={s} viewBox="0 0 160 160">
    {Array.from({ length: 8 }, (_, i) => (
      <g key={i} fill="#b9a24a">
        <rect x={26 + i * 14} y={2} width={6} height={20} />
        <rect x={26 + i * 14} y={138} width={6} height={20} />
        <rect x={2} y={26 + i * 14} width={20} height={6} />
        <rect x={138} y={26 + i * 14} width={20} height={6} />
      </g>
    ))}
    <rect x={20} y={20} width={120} height={120} rx={8} fill="#24282c" stroke="#4a5058" strokeWidth={3} />
    <rect x={36} y={36} width={88} height={88} rx={4} fill="rgba(255,255,255,0.06)" stroke="#9aa3ad" strokeWidth={2} />
    <text x={80} y={92} textAnchor="middle" fontFamily={VF.heavy} fontSize={34} fill="#e9e6d8">{label}</text>
  </svg>
);

/** 1997 的 2×2 产品格子 */
export const FourGrid: React.FC<{s?: number}> = ({s = 210}) => (
  <svg width={s} height={s * 0.75} viewBox="0 0 210 158">
    <rect x={2} y={2} width={206} height={154} fill="none" stroke={ink} strokeWidth={3} />
    <path d="M105 2 L105 156 M2 79 L208 79" stroke={ink} strokeWidth={2} />
    {[
      ['消费', '台式', 20, 22],
      ['消费', '便携', 120, 22],
      ['专业', '台式', 20, 96],
      ['专业', '便携', 120, 96],
    ].map(([a, b, x, y]) => (
      <g key={`${a}${b}`}>
        <text x={Number(x) + 4} y={Number(y) + 18} fontFamily={VF.serifCn} fontWeight={700} fontSize={15} fill={ink}>{a}</text>
        <text x={Number(x) + 4} y={Number(y) + 38} fontFamily={VF.serifCn} fontWeight={700} fontSize={15} fill={ink}>{b}</text>
      </g>
    ))}
  </svg>
);

/** 1984 广告里那把锤子（示意） */
export const Hammer: React.FC<{s?: number}> = ({s = 130}) => (
  <svg width={s} height={s} viewBox="0 0 120 120">
    <rect x={52} y={40} width={10} height={72} rx={4} fill="#8a5a2a" transform="rotate(-18 57 76)" />
    <path d="M22 30 L64 18 L74 48 L32 60 Z" fill="#5a5a5a" stroke={ink} strokeWidth={4} />
    <path d="M18 34 L30 31 L38 55 L26 58 Z" fill="#3a3a3a" />
  </svg>
);

/** 小价签 */
export const Tag: React.FC<{text: string; sub?: string; rot?: number}> = ({text, sub, rot = -4}) => (
  <div style={{transform: `rotate(${rot}deg)`, display: 'inline-block', filter: 'drop-shadow(2px 4px 4px rgba(23,23,22,0.3))'}}>
    <div style={{background: '#f6f3ea', border: `4px solid ${ink}`, padding: '5px 14px 8px'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 5}}>
        <div style={{fontFamily: VF.num, fontSize: 54, color: red, lineHeight: 1}}>{text}</div>
        {sub && <div style={{fontFamily: VF.heavy, fontSize: 22, color: ink}}>{sub}</div>}
      </div>
    </div>
  </div>
);

/** 一条向下的箭头（十二年） */
export const SlideArrow: React.FC<{s?: number}> = ({s = 110}) => (
  <svg width={s} height={s} viewBox="0 0 110 110">
    <path d="M22 14 L70 54 L22 54 L70 54" stroke={red} strokeWidth={9} fill="none" strokeLinejoin="round" />
    <path d="M70 14 L70 92" stroke={red} strokeWidth={9} strokeLinecap="round" />
    <path d="M50 72 L70 96 L90 72" fill="none" stroke={red} strokeWidth={9} strokeLinejoin="round" />
  </svg>
);

/** 交易所的行情纸带 */
export const TickerTape: React.FC<{w?: number}> = ({w = 260}) => (
  <svg width={w} height={40} viewBox="0 0 260 40">
    <rect width={260} height={40} fill="#f2efe4" stroke={ink} strokeWidth={2} />
    <text x={8} y={16} fontFamily={VF.num} fontSize={13} fill={ink}>AAPL  22.00 → 29.00</text>
    <text x={8} y={32} fontFamily={VF.num} fontSize={13} fill={red}>+31.8%  DEC 12 1980</text>
  </svg>
);
