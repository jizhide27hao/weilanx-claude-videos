import React from 'react';
import {V, VF} from '../../library/vox/theme';

/* ============ 灰度示意画（交给 HalftonePhoto 做成网点，明暗反差要大） ============ */

/** 1987 年那间小厂房：两台万用表、一台示波器、一台代理来的交换机 */
export const BenchArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#bdbdbd" />
    <rect x={0} y={0} width={340} height={74} fill="#e6e6e6" />
    <rect x={0} y={168} width={340} height={62} fill="#6a6a6a" />
    <rect x={14} y={140} width={312} height={30} fill="#3a3a3a" />
    {/* 交换机：一排插孔 */}
    <rect x={28} y={92} width={130} height={50} rx={4} fill="#252525" />
    {Array.from({ length: 8 }, (_, i) => (
      <rect key={i} x={36 + i * 15} y={102} width={10} height={14} fill="#8f8f8f" />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <circle key={i} cx={40 + i * 15} cy={130} r={3.4} fill={i % 3 ? '#d8d8d8' : '#f8f8f8'} />
    ))}
    {/* 示波器：屏幕 + 波形 */}
    <rect x={182} y={78} width={126} height={64} rx={5} fill="#1e1e1e" />
    <rect x={192} y={88} width={82} height={44} fill="#9a9a9a" />
    <path d="M196 110 L206 110 L212 96 L220 122 L228 102 L236 110 L248 110 L254 100 L262 118 L270 110" fill="none" stroke="#1a1a1a" strokeWidth={3} />
    <circle cx={290} cy={96} r={6} fill="#cfcfcf" />
    <circle cx={290} cy={116} r={6} fill="#cfcfcf" />
    {/* 万用表 */}
    <rect x={40} y={182} width={54} height={38} rx={3} fill="#4a4a4a" />
    <rect x={46} y={188} width={42} height={12} fill="#e0e0e0" />
    <circle cx={58} cy={210} r={5} fill="#d0d0d0" />
    <rect x={96} y={188} width={62} height={32} rx={3} fill="#5a5a5a" />
    <rect x={102} y={194} width={50} height={10} fill="#e8e8e8" />
    {/* 墙上：一张营业执照 */}
    <rect x={230} y={14} width={86} height={52} fill="#f4f4f4" stroke="#3a3a3a" strokeWidth={3} />
    {[26, 36, 46, 56].map((y) => <rect key={y} x={240} y={y} width={66} height={4} fill="#9a9a9a" />)}
  </svg>
);

/** 五楼会议室窗边：一排人、一扇大窗 */
export const WindowArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#a8a8a8" />
    <rect x={0} y={0} width={340} height={150} fill="#f2f2f2" />
    {[34, 124, 214].map((x) => <rect key={x} x={x} y={10} width={8} height={140} fill="#5a5a5a" />)}
    <rect x={0} y={146} width={340} height={10} fill="#5a5a5a" />
    <rect x={0} y={156} width={340} height={74} fill="#6a6a6a" />
    {/* 站在窗边的一个人：背影 */}
    <circle cx={168} cy={92} r={17} fill="#1c1c1c" />
    <path d="M140 168 Q142 112 168 112 Q194 112 196 168 Z" fill="#1c1c1c" />
    {/* 坐着的听众 */}
    {[40, 84, 240, 288].map((x) => (
      <g key={x}>
        <circle cx={x} cy={140} r={12} fill="#2a2a2a" />
        <rect x={x - 15} y={152} width={30} height={20} rx={5} fill="#2a2a2a" />
      </g>
    ))}
  </svg>
);

/** 机柜：一排通信设备，指示灯亮着 */
export const RackArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#c6c6c6" />
    <rect x={30} y={8} width={280} height={214} fill="#2b2b2b" />
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <rect x={40} y={18 + i * 34} width={260} height={28} fill="#4a4a4a" />
        <rect x={46} y={24 + i * 34} width={60} height={16} fill="#8e8e8e" />
        {Array.from({ length: 10 }, (_, j) => (
          <circle key={j} cx={120 + j * 16} cy={32 + i * 34} r={4} fill={j % 2 ? '#f0f0f0' : '#7a7a7a'} />
        ))}
      </g>
    ))}
    <rect x={300} y={8} width={10} height={214} fill="#1a1a1a" />
  </svg>
);

/** 一台基站的铁塔 */
export const TowerArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#dcdcdc" />
    <rect x={0} y={196} width={340} height={34} fill="#8a8a8a" />
    <path d="M150 196 L166 30 L174 30 L190 196" fill="none" stroke="#3a3a3a" strokeWidth={6} />
    {[60, 96, 132, 168].map((y, i) => (
      <g key={y} stroke="#3a3a3a" strokeWidth={4} fill="none">
        <path d={`M${157 + i * 2} ${y} L${183 - i * 2} ${y}`} />
        <path d={`M${157 + i * 2} ${y} L${181 - i * 2} ${y + 34}`} />
      </g>
    ))}
    {[54, 128, 188].map((y) => (
      <g key={y}>
        <rect x={126} y={y} width={20} height={26} fill="#1e1e1e" />
        <rect x={194} y={y} width={20} height={26} fill="#1e1e1e" />
      </g>
    ))}
    <circle cx={240} cy={44} r={16} fill="#f4f4f4" />
    <path d="M226 96 Q240 56 254 96" fill="none" stroke="#7a7a7a" strokeWidth={4} />
  </svg>
);

/** 一间会议室：长桌 + 一叠文件 + 一排人（基本法 / IBM 顾问那两段） */
export const BoardroomArt: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#b4b4b4" />
    <rect x={0} y={0} width={340} height={60} fill="#e8e8e8" />
    <rect x={0} y={196} width={340} height={34} fill="#5e5e5e" />
    <rect x={26} y={120} width={288} height={76} rx={8} fill="#3a3a3a" />
    <rect x={26} y={120} width={288} height={16} fill="#575757" />
    {[54, 110, 166, 222, 278].map((x, i) => (
      <g key={x}>
        <circle cx={x} cy={64 + (i % 2) * 4} r={14} fill="#1e1e1e" />
        <rect x={x - 18} y={80} width={36} height={30} rx={7} fill="#1e1e1e" />
      </g>
    ))}
    <rect x={124} y={96} width={92} height={26} fill="#f0f0f0" transform="rotate(-3 170 109)" />
    <rect x={130} y={86} width={92} height={26} fill="#fafafa" transform="rotate(2 176 99)" />
  </svg>
);

/** 一叠起诉书（77 页） */
export const SuitStack: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#cfcfcf" />
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={38 + i * 3} y={150 - i * 13} width={210} height={26} fill={i % 2 ? '#f2f2f2' : '#e2e2e2'} stroke="#7a7a7a" strokeWidth={2} />
    ))}
    <rect x={228} y={34} width={74} height={92} fill="#f8f8f8" stroke="#4a4a4a" strokeWidth={3} />
    {[48, 60, 72, 84, 96].map((y) => <rect key={y} x={236} y={y} width={58} height={5} fill="#8a8a8a" />)}
  </svg>
);

/* ============ 彩色贴纸 ============ */

const ink = V.ink;
const red = V.red;
const hwRed = '#cf0a2c'; // 华为红

/** 华为花瓣标（示意，八瓣） */
export const PetalMark: React.FC<{s?: number; mono?: boolean}> = ({s = 130, mono}) => {
  const petal = (rot: number, len: number, wid: number) => (
    <path
      key={rot}
      d={`M50 50 Q${50 - wid} ${50 - len * 0.55} 50 ${50 - len} Q${50 + wid} ${50 - len * 0.55} 50 50 Z`}
      transform={`rotate(${rot} 50 50)`}
      fill={mono ? ink : hwRed}
      opacity={mono ? 0.9 : 1}
    />
  );
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r, i) => petal(r, i % 2 ? 34 : 40, i % 2 ? 11 : 14))}
    </svg>
  );
};

/** 2.1 万元的注册收据 */
export const Receipt: React.FC = () => (
  <div style={{background: '#f6f3ea', border: `3px solid ${ink}`, padding: '12px 20px', transform: 'rotate(-3deg)', filter: 'drop-shadow(3px 5px 5px rgba(23,23,22,0.3))'}}>
    <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft, letterSpacing: 3}}>1987 · 深圳 · 注册资金</div>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
      <div style={{fontFamily: VF.num, fontSize: 78, color: red, lineHeight: 1.05}}>21000</div>
      <div style={{fontFamily: VF.heavy, fontSize: 28, color: ink}}>元</div>
    </div>
    <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 19, color: V.inkSoft}}>六个人凑的</div>
  </div>
);

/** 一台小交换机（代理时代的货） */
export const SwitchBox: React.FC<{s?: number}> = ({s = 210}) => (
  <div style={{width: s, background: '#2a2d31', border: `4px solid ${ink}`, padding: '10px 12px 14px', transform: 'rotate(2deg)', filter: 'drop-shadow(3px 5px 5px rgba(23,23,22,0.32))'}}>
    <div style={{display: 'flex', gap: 4, marginBottom: 6}}>
      {Array.from({length: 8}, (_, i) => <div key={i} style={{width: 7, height: 7, borderRadius: 4, background: i % 3 ? '#6ee07a' : '#e8c33f'}} />)}
    </div>
    <div style={{display: 'flex', gap: 5}}>
      {Array.from({length: 8}, (_, i) => <div key={i} style={{width: 16, height: 22, background: '#0f1113', border: '2px solid #565c63'}} />)}
    </div>
    <div style={{fontFamily: VF.heavy, fontSize: 16, color: '#c9ced4', marginTop: 8, letterSpacing: 1}}>H A X · 用户交换机</div>
  </div>
);

/** 一片雪花（冬天） */
export const SnowFlake: React.FC<{s?: number}> = ({s = 150}) => (
  <svg width={s} height={s} viewBox="0 0 100 100">
    {[0, 60, 120].map((r) => (
      <g key={r} transform={`rotate(${r} 50 50)`} stroke={ink} strokeWidth={4} strokeLinecap="round">
        <path d="M50 8 L50 92" />
        <path d="M50 24 L41 15 M50 24 L59 15 M50 76 L41 85 M50 76 L59 85" />
      </g>
    ))}
    <circle cx={50} cy={50} r={6} fill={red} />
  </svg>
);

/** 一件棉袄（过冬的那个说法） */
export const CoatSticker: React.FC<{s?: number}> = ({s = 170}) => (
  <svg width={s} height={s * 1.1} viewBox="0 0 150 165">
    <path d="M42 26 Q52 14 75 14 Q98 14 108 26 L128 46 L112 66 L102 56 L102 154 L48 154 L48 56 L38 66 L22 46 Z" fill="#8b6a45" stroke={ink} strokeWidth={5} />
    <path d="M75 16 L75 154" stroke={ink} strokeWidth={4} />
    {[54, 74, 94, 114, 134].map((y) => <circle key={y} cx={75} cy={y} r={4} fill={ink} />)}
    <path d="M42 52 Q75 66 108 52" fill="none" stroke={ink} strokeWidth={4} />
  </svg>
);

/** 一份 21 项罪名的起诉书（红章 + 页数） */
export const SuitDoc: React.FC = () => (
  <div style={{position: 'relative', background: '#f6f3ea', border: `3px solid ${ink}`, padding: '16px 22px 18px', width: 400, transform: 'rotate(-2deg)', filter: 'drop-shadow(3px 6px 6px rgba(23,23,22,0.3))'}}>
    <div style={{fontFamily: VF.heavy, fontSize: 22, color: ink, letterSpacing: 1}}>CISCO SYSTEMS v. HUAWEI</div>
    <div style={{fontFamily: VF.serifCn, fontWeight: 700, fontSize: 20, color: V.inkSoft, marginTop: 4}}>2003.1 · 德州东区联邦法院</div>
    <div style={{display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8}}>
      <div style={{fontFamily: VF.num, fontSize: 62, color: red, lineHeight: 1}}>21</div>
      <div style={{fontFamily: VF.heavy, fontSize: 24, color: ink}}>项指控</div>
      <div style={{fontFamily: VF.num, fontSize: 44, color: ink}}>77 页</div>
    </div>
    {Array.from({length: 5}, (_, i) => (
      <div key={i} style={{height: 7, marginTop: 8, background: 'rgba(23,23,22,0.22)', width: `${72 + (i % 3) * 9}%`}} />
    ))}
  </div>
);

/** 一片麒麟芯片 */
export const KirinChip: React.FC<{label?: string; s?: number}> = ({label = 'K I R I N', s = 200}) => (
  <svg width={s} height={s} viewBox="0 0 200 200">
    {Array.from({length: 9}, (_, i) => (
      <g key={i} fill="#c8a83e">
        <rect x={36 + i * 15} y={4} width={7} height={24} />
        <rect x={36 + i * 15} y={172} width={7} height={24} />
        <rect x={4} y={36 + i * 15} width={24} height={7} />
        <rect x={172} y={36 + i * 15} width={24} height={7} />
      </g>
    ))}
    <rect x={26} y={26} width={148} height={148} rx={10} fill="#1d2226" />
    <rect x={44} y={44} width={112} height={112} rx={6} fill="rgba(255,255,255,0.06)" stroke="#8f9aa3" strokeWidth={3} />
    <text x={100} y={106} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={22} fill="#efe9d8">{label}</text>
    <text x={100} y={134} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={15} fill="#9aa3ad">9 0 0 0 S</text>
  </svg>
);

/** 鸿蒙徽标（圆环 + 一个点，示意） */
export const HarmonyMark: React.FC<{s?: number}> = ({s = 160}) => (
  <svg width={s} height={s} viewBox="0 0 120 120">
    <circle cx={60} cy={60} r={42} fill="none" stroke={ink} strokeWidth={7} />
    <path d="M60 18 A42 42 0 0 1 102 60" fill="none" stroke={hwRed} strokeWidth={11} strokeLinecap="round" />
    <circle cx={60} cy={60} r={13} fill={hwRed} />
    <circle cx={60} cy={60} r={5} fill={V.paper} />
  </svg>
);

/** 一台手机（正面，圆环摄像头） */
export const PhoneFront: React.FC<{s?: number; label?: string}> = ({s = 200, label}) => (
  <svg width={s} height={s * 1.85} viewBox="0 0 200 370">
    <rect x={8} y={8} width={184} height={354} rx={26} fill="#1b1d20" stroke={ink} strokeWidth={5} />
    <rect x={18} y={20} width={164} height={330} rx={18} fill="#3a4048" />
    <circle cx={100} cy={92} r={46} fill="#22262b" stroke="#6d757e" strokeWidth={4} />
    <circle cx={100} cy={68} r={17} fill="#0c0e10" stroke="#8d959e" strokeWidth={3} />
    <circle cx={76} cy={104} r={15} fill="#0c0e10" stroke="#8d959e" strokeWidth={3} />
    <circle cx={124} cy={104} r={15} fill="#0c0e10" stroke="#8d959e" strokeWidth={3} />
    <rect x={54} y={168} width={92} height={10} rx={5} fill="#5a626b" />
    <rect x={54} y={192} width={66} height={8} rx={4} fill="#4c535b" />
    {label && <text x={100} y={330} textAnchor="middle" fontFamily="Anton, sans-serif" fontSize={26} fill="#e8e4d6">{label}</text>}
  </svg>
);

/** 一台车的侧影（鸿蒙智行） */
export const SmartCar: React.FC<{w?: number; h?: number}> = ({w = 330, h = 190}) => (
  <svg width={w} height={h} viewBox="0 0 340 200" preserveAspectRatio="xMidYMid meet">
    <path d="M12 150 Q14 124 46 118 L92 96 Q124 70 176 70 Q232 72 258 100 L306 116 Q330 122 330 150 Z" fill="#22262b" />
    <path d="M100 98 Q130 78 174 78 Q218 80 242 102 Z" fill="#cfd6dc" />
    <circle cx={92} cy={150} r={25} fill="#0e1012" />
    <circle cx={92} cy={150} r={10} fill="#7b838b" />
    <circle cx={254} cy={150} r={25} fill="#0e1012" />
    <circle cx={254} cy={150} r={10} fill="#7b838b" />
    <path d="M300 128 L332 128" stroke="#f2f2f2" strokeWidth={6} />
    <rect x={150} y={112} width={54} height={5} rx={2} fill={hwRed} />
  </svg>
);

/** 一叠手机（出货量） */
export const PhoneStack: React.FC<{n?: number}> = ({n = 5}) => (
  <svg width={250} height={230} viewBox="0 0 250 230">
    {Array.from({length: n}, (_, i) => (
      <g key={i} transform={`translate(${i * 12} ${i * 9}) rotate(${(i % 2 ? 1 : -1) * 3} 90 100)`}>
        <rect x={30} y={20} width={92} height={170} rx={12} fill={i % 2 ? '#2e3339' : '#1e2226'} stroke={ink} strokeWidth={4} />
        <rect x={40} y={32} width={72} height={146} rx={8} fill={i % 2 ? '#59616a' : '#48505a'} />
      </g>
    ))}
  </svg>
);

/** 世界地图简笔（海外收入过半） */
export const GlobeArt: React.FC<{s?: number}> = ({s = 200}) => (
  <svg width={s} height={s} viewBox="0 0 120 120">
    <circle cx={60} cy={60} r={50} fill="none" stroke={ink} strokeWidth={5} />
    <ellipse cx={60} cy={60} rx={24} ry={50} fill="none" stroke={ink} strokeWidth={3} />
    <path d="M10 60 L110 60 M16 34 L104 34 M16 86 L104 86" fill="none" stroke={ink} strokeWidth={3} />
    <path d="M46 44 Q60 36 74 46 Q80 58 70 66 Q56 72 48 62 Q42 52 46 44 Z" fill={red} opacity={0.85} />
    <circle cx={88} cy={40} r={7} fill={hwRed} />
  </svg>
);

/** 一枚红色印章样式的「唯一下滑」 */
export const SlumpStamp: React.FC = () => (
  <div style={{transform: 'rotate(-9deg)', border: `6px solid ${red}`, borderRadius: 8, padding: '6px 18px', color: red, fontFamily: VF.heavy, fontSize: 40, lineHeight: 1.15, opacity: 0.9, filter: 'url(#voxRough)'}}>
    唯一下滑
  </div>
);
