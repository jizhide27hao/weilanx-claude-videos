import React from 'react';
import {V, VF} from '../../library/vox/theme';

/* ============ 灰度示意画（交给 HalftonePhoto 做成网点，明暗反差要大） ============ */

/** 银谷大厦那间办公室：一张桌子、一口锅、十几个人的椅子 */
export const PorridgePot: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#c8c8c8" />
    <rect x={0} y={0} width={340} height={86} fill="#e8e8e8" />
    {[24, 104, 224, 300].map((x) => <rect key={x} x={x} y={14} width={16} height={60} fill="#4a4a4a" />)}
    <rect x={0} y={150} width={340} height={80} fill="#6a6a6a" />
    <rect x={30} y={120} width={280} height={26} fill="#3a3a3a" />
    <ellipse cx={170} cy={112} rx={62} ry={20} fill="#2a2a2a" />
    <path d="M108 112 L122 74 L218 74 L232 112 Z" fill="#8a8a8a" />
    <ellipse cx={170} cy={112} rx={62} ry={20} fill="none" stroke="#1a1a1a" strokeWidth={5} />
    <path d="M150 66 Q140 44 154 26 M170 62 Q160 36 174 16 M192 66 Q182 46 196 28" stroke="#f4f4f4" strokeWidth={5} fill="none" />
    {[36, 84, 244, 292].map((x) => (
      <g key={x}>
        <circle cx={x} cy={96} r={13} fill="#1c1c1c" />
        <rect x={x - 16} y={110} width={32} height={16} rx={6} fill="#1c1c1c" />
      </g>
    ))}
  </svg>
);

/** 一台竖屏手机（正面），label 用不同代际区分 */
export const PhoneArt: React.FC<{w: number; h: number; label?: string; home?: boolean; teeth?: boolean}> = ({w, h, label, home = true, teeth}) => (
  <svg width={w} height={h} viewBox="0 0 200 330" preserveAspectRatio="xMidYMid slice">
    <rect width={200} height={330} fill="#d8d8d8" />
    <rect x={44} y={16} width={112} height={298} rx={home ? 14 : 18} fill="#161616" />
    <rect x={52} y={34} width={96} height={250} rx={4} fill="#b9b9b9" />
    <rect x={60} y={44} width={80} height={12} fill="#7a7a7a" />
    <rect x={60} y={64} width={80} height={56} fill="#8d8d8d" />
    <rect x={60} y={128} width={48} height={36} fill="#9d9d9d" />
    <rect x={114} y={128} width={26} height={36} fill="#8d8d8d" />
    {[176, 192, 208, 224].map((y, i) => <rect key={y} x={60} y={y} width={80 - i * 6} height={7} fill="#8a8a8a" />)}
    {home && <circle cx={100} cy={300} r={10} fill="none" stroke="#8a8a8a" strokeWidth={3} />}
    {!home && <rect x={74} y={290} width={52} height={6} rx={3} fill="#8a8a8a" />}
    {teeth && <rect x={44} y={16} width={112} height={10} fill="#050505" />}
    {label && <text x={100} y={252} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={26} fill="#3a3a3a">{label}</text>}
  </svg>
);

/** 港交所那面铜锣 */
export const GongArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#d0d0d0" />
    <rect x={0} y={0} width={340} height={40} fill="#2a2a2a" />
    {Array.from({ length: 26 }, (_, i) => <rect key={i} x={6 + i * 13} y={44} width={7} height={22} fill="#b9b9b9" />)}
    <path d="M40 96 L300 96" stroke="#4a4a4a" strokeWidth={8} />
    <circle cx={170} cy={150} r={62} fill="#8a8a8a" stroke="#2a2a2a" strokeWidth={6} />
    <circle cx={170} cy={150} r={42} fill="none" stroke="#6a6a6a" strokeWidth={4} />
    <circle cx={170} cy={150} r={12} fill="#3a3a3a" />
    <path d="M170 96 L170 62" stroke="#2a2a2a" strokeWidth={7} />
    {[52, 122, 218, 288].map((x) => (
      <g key={x}>
        <circle cx={x} cy={186} r={14} fill="#1c1c1c" />
        <rect x={x - 18} y={202} width={36} height={28} rx={8} fill="#1c1c1c" />
      </g>
    ))}
  </svg>
);

/** 亦庄的汽车工厂：一排机械臂 + 车身 */
export const CarFactory: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#c4c4c4" />
    <rect x={0} y={0} width={340} height={54} fill="#3a3a3a" />
    {Array.from({ length: 14 }, (_, i) => <rect key={i} x={10 + i * 24} y={8} width={14} height={10} fill="#efefef" />)}
    {[40, 150, 260].map((x) => (
      <g key={x}>
        <rect x={x} y={110} width={16} height={96} fill="#5a5a5a" />
        <rect x={x - 22} y={70} width={60} height={18} fill="#4a4a4a" />
        <path d={`M${x + 8} 74 L${x + 8} 120 L${x + 56} 104`} stroke="#5a5a5a" strokeWidth={14} fill="none" strokeLinecap="round" />
      </g>
    ))}
    <path d="M96 176 Q110 146 150 142 L214 142 Q246 148 250 176 Z" fill="#1f1f1f" />
    <circle cx={128} cy={180} r={16} fill="#0d0d0d" />
    <circle cx={222} cy={180} r={16} fill="#0d0d0d" />
    <rect x={0} y={196} width={340} height={34} fill="#9a9a9a" />
  </svg>
);

/** 门店（小米之家）：一整面玻璃 + 橙色门头 */
export const StoreArt: React.FC<{w: number; h: number; orange?: boolean}> = ({w, h, orange = true}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#9e9e9e" />
    <rect x={0} y={0} width={340} height={42} fill={orange ? '#e07a1a' : '#4a4a4a'} />
    <text x={20} y={32} fontFamily="Anton, sans-serif" fontSize={24} fill="#fff">MI STORE</text>
    <rect x={16} y={52} width={308} height={170} fill="#dedede" />
    {[0, 1, 2].map((i) => <rect key={i} x={30 + i * 100} y={70} width={76} height={100} fill="#f2f2f2" stroke="#7a7a7a" strokeWidth={3} />)}
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={48 + i * 100} y={92} width={28} height={52} rx={4} fill="#3a3a3a" />
        <rect x={82 + i * 100} y={110} width={16} height={30} rx={3} fill="#4a4a4a" />
      </g>
    ))}
    <rect x={16} y={190} width={308} height={8} fill="#6a6a6a" />
  </svg>
);

/** 轿车侧面（SU7 那种低趴溜背） */
export const CarSide: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 200" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={200} fill="#cfcfcf" />
    <rect x={0} y={160} width={340} height={40} fill="#8a8a8a" />
    <path d="M12 150 Q14 128 44 124 L96 108 Q128 78 178 78 Q232 80 258 110 L306 124 Q328 130 328 150 Z" fill="#1e1e1e" />
    <path d="M104 110 Q134 86 176 86 Q220 88 244 112 Z" fill="#dcdcdc" />
    <path d="M62 120 L104 108 L108 96 L58 104 Z" fill="#8a8a8a" />
    <circle cx={92} cy={150} r={26} fill="#0e0e0e" />
    <circle cx={92} cy={150} r={12} fill="#6a6a6a" />
    <circle cx={256} cy={150} r={26} fill="#0e0e0e" />
    <circle cx={256} cy={150} r={12} fill="#6a6a6a" />
    <path d="M300 132 L330 132" stroke="#f0f0f0" strokeWidth={6} />
  </svg>
);

/** SUV 侧面（YU7 / 澎程那种高车身） */
export const SuvArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 200" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={200} fill="#cfcfcf" />
    <rect x={0} y={160} width={340} height={40} fill="#8a8a8a" />
    <path d="M12 150 Q14 118 48 112 L86 62 Q140 48 202 56 Q242 62 268 100 L308 112 Q328 120 328 150 Z" fill="#1e1e1e" />
    <path d="M98 70 Q142 58 196 66 Q226 72 244 100 L94 100 Z" fill="#dcdcdc" />
    <circle cx={90} cy={150} r={28} fill="#0e0e0e" />
    <circle cx={90} cy={150} r={13} fill="#6a6a6a" />
    <circle cx={258} cy={150} r={28} fill="#0e0e0e" />
    <circle cx={258} cy={150} r={13} fill="#6a6a6a" />
    <path d="M20 120 L46 120" stroke="#f0f0f0" strokeWidth={6} />
  </svg>
);

/* ============ 彩色贴纸 ============ */

const ink = V.ink;
const red = V.red;
const orange = '#e8621c'; // 小米橙

/** 小米的橙色方块 logo */
export const MiLogo: React.FC<{s?: number; off?: boolean}> = ({s = 130, off}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    <rect x={2} y={2} width={96} height={96} rx={22} fill={off ? '#c9c4bb' : orange} />
    <text x={50} y={72} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={54} fill="#fff">MI</text>
  </svg>
);

/** 1999 元的价签 */
export const PriceTag: React.FC<{text?: string; sub?: string}> = ({text = '1999', sub = '元起'}) => (
  <div style={{position: 'relative', filter: 'drop-shadow(2px 4px 4px rgba(23,23,22,0.3))'}}>
    <div style={{background: '#f6f3ea', border: `4px solid ${ink}`, padding: '6px 18px 10px', display: 'inline-block', transform: 'rotate(-4deg)'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 6}}>
        <div style={{fontFamily: VF.num, fontSize: 86, color: red, lineHeight: 1}}>{text}</div>
        <div style={{fontFamily: VF.heavy, fontSize: 30, color: ink}}>{sub}</div>
      </div>
    </div>
    <svg width={30} height={54} style={{position: 'absolute', left: -16, top: 16}}>
      <path d="M14 6 L4 26 L14 46" stroke={ink} strokeWidth={3} fill="none" />
    </svg>
  </div>
);

/** 铜锣（敲钟） */
export const Bell: React.FC<{s?: number}> = ({s = 160}) => (
  <svg width={s} height={s} viewBox="0 0 120 120">
    <path d="M60 8 L60 22" stroke={ink} strokeWidth={6} />
    <circle cx={60} cy={68} r={44} fill="#d9a52b" stroke={ink} strokeWidth={5} />
    <circle cx={60} cy={68} r={26} fill="none" stroke="#a97e14" strokeWidth={4} />
    <circle cx={60} cy={68} r={8} fill={ink} />
    <path d="M60 112 L60 118" stroke={ink} strokeWidth={5} />
  </svg>
);

/** 一颗自研芯片 */
export const ChipO1: React.FC<{label?: string; s?: number; color?: string}> = ({label = 'X R I N G', s = 190, color = '#24282c'}) => (
  <svg width={s} height={s} viewBox="0 0 190 190">
    {Array.from({length: 8}, (_, i) => (
      <g key={i} fill="#c9b04a">
        <rect x={34 + i * 16} y={4} width={7} height={22} />
        <rect x={34 + i * 16} y={164} width={7} height={22} />
        <rect x={4} y={34 + i * 16} width={22} height={7} />
        <rect x={164} y={34 + i * 16} width={22} height={7} />
      </g>
    ))}
    <rect x={24} y={24} width={142} height={142} rx={10} fill={color} />
    <rect x={44} y={44} width={102} height={102} rx={6} fill="rgba(255,255,255,0.07)" stroke="#9aa3ad" strokeWidth={3} />
    <text x={95} y={104} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={label.length > 6 ? 17 : 26} fill="#e9e6d8">{label}</text>
  </svg>
);

/** 一锅小米粥（彩色，钩子和开头用） */
export const PorridgeSticker: React.FC = () => (
  <svg width={230} height={200} viewBox="0 0 230 200">
    <path d="M52 96 Q40 62 58 38 M100 90 Q90 54 108 26 M150 96 Q140 64 158 40" stroke="#bdb5a6" strokeWidth={7} fill="none" strokeLinecap="round" />
    <path d="M26 100 L204 100 L186 176 L44 176 Z" fill="#f6f3ea" stroke={ink} strokeWidth={5} />
    <ellipse cx={115} cy={100} rx={89} ry={26} fill="#e2c96a" stroke={ink} strokeWidth={5} />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <circle key={i} cx={62 + i * 18} cy={96 + (i % 3) * 6} r={5} fill="#c9a83f" />
    ))}
    <path d="M186 128 Q214 132 208 158 Q203 176 182 172" fill="none" stroke={ink} strokeWidth={7} />
    <rect x={96} y={146} width={38} height={16} rx={3} fill={red} />
  </svg>
);

/** 一摞订单 / 购物车里的排队 */
export const OrderStack: React.FC = () => (
  <svg width={220} height={190} viewBox="0 0 220 190">
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${i * 6} ${i * 24})`}>
        <rect x={10} y={20} width={150} height={100} fill="#f6f3ea" stroke={ink} strokeWidth={4} />
        <rect x={24} y={38} width={80} height={9} fill="#b7b0a2" />
        <rect x={24} y={56} width={110} height={9} fill="#b7b0a2" />
        <rect x={24} y={74} width={60} height={9} fill="#b7b0a2" />
        <rect x={112} y={90} width={36} height={14} fill={red} />
      </g>
    ))}
  </svg>
);

/** 一只箭头向下（跌破发行价） */
export const DropArrow: React.FC<{s?: number}> = ({s = 120}) => (
  <svg width={s} height={s} viewBox="0 0 120 120">
    <path d="M20 18 L60 62 L100 18" fill="none" stroke={red} strokeWidth={10} strokeLinejoin="round" />
    <path d="M60 62 L60 104" stroke={red} strokeWidth={10} strokeLinecap="round" />
    <path d="M38 84 L60 108 L82 84" fill="none" stroke={red} strokeWidth={10} strokeLinejoin="round" />
  </svg>
);

/** 手机里的 MIUI 更新徽标 */
export const UpdateBadge: React.FC = () => (
  <div style={{background: orange, color: '#fff', fontFamily: VF.heavy, padding: '10px 18px', display: 'inline-block', boxShadow: '2px 4px 6px rgba(23,23,22,0.28)'}}>
    <div style={{fontSize: 22, letterSpacing: 2}}>每周五</div>
    <div style={{fontSize: 40, lineHeight: 1.1}}>更新</div>
  </div>
);

/** 一堆排队的小人 + 一台手机（抢购） */
export const Queue: React.FC<{n?: number; size?: number}> = ({n = 8, size = 30}) => (
  <svg width={n * size * 0.8} height={size * 2.2} viewBox={`0 0 ${n * 32} 70`}>
    {Array.from({length: n}, (_, i) => (
      <g key={i} transform={`translate(${i * 32} 0)`} fill={i % 3 ? '#2a2a2a' : '#6a6a6a'}>
        <circle cx={14} cy={14} r={9} />
        <path d="M2 70 Q3 30 14 30 Q25 30 26 70 Z" />
        <rect x={24} y={40} width={6} height={14} fill="#8a8a8a" />
      </g>
    ))}
  </svg>
);
