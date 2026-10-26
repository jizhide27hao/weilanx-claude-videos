import React from 'react';
import {V, VF} from '../../library/vox/theme';

/* ============================================================
   灰度示意画（交给 HalftonePhoto 做成网点，明暗反差要大）
   ============================================================ */

/** 一只圆滚滚的企鹅（示意轮廓，不是官方形象） */
export const QQBird: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
    <g transform="translate(100 100)">
      {/* 身体 */}
      <ellipse cx={0} cy={22} rx={64} ry={72} fill="#1e1e1e" />
      {/* 白肚皮 */}
      <ellipse cx={0} cy={40} rx={40} ry={50} fill="#f5f0e6" />
      {/* 头部高光 */}
      <ellipse cx={-16} cy={-30} rx={40} ry={34} fill="#2e2e2e" />
      {/* 眼睛 */}
      <circle cx={-14} cy={-34} r={9} fill="#f5f0e6" />
      <circle cx={16} cy={-34} r={9} fill="#f5f0e6" />
      <circle cx={-12} cy={-32} r={4} fill="#1e1e1e" />
      <circle cx={18} cy={-32} r={4} fill="#1e1e1e" />
      {/* 嘴 */}
      <path d="M-10 -18 L10 -18 L0 -6 Z" fill="#e8a33d" />
      {/* 围巾 */}
      <path d="M-44 -8 Q0 12 44 -8 L44 6 Q0 26 -44 6 Z" fill="#b8433f" />
      <rect x={20} y={0} width={16} height={44} rx={6} fill="#b8433f" transform="rotate(10 28 22)" />
      {/* 翅膀 */}
      <ellipse cx={-62} cy={22} rx={14} ry={40} fill="#161616" transform="rotate(14 -62 22)" />
      <ellipse cx={62} cy={22} rx={14} ry={40} fill="#161616" transform="rotate(-14 62 22)" />
      {/* 脚 */}
      <ellipse cx={-24} cy={92} rx={18} ry={8} fill="#e8a33d" />
      <ellipse cx={24} cy={92} rx={18} ry={8} fill="#e8a33d" />
    </g>
  </svg>
);

/** 一台立式服务器机架：指示灯、盘位、风扇孔 */
export const ServerRack: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#b0b0b0" />
    <rect x={0} y={0} width={340} height={30} fill="#8a8a8a" />
    {/* 机架主体 */}
    <rect x={90} y={30} width={180} height={190} rx={6} fill="#3a3a3a" />
    <rect x={100} y={40} width={160} height={170} fill="#4a4a4a" />
    {/* 六层盘位 */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={108} y={48 + i * 27} width={144} height={20} rx={2} fill="#2a2a2a" />
        <rect x={114} y={53 + i * 27} width={60} height={10} fill="#6a6a6a" />
        <circle cx={218} cy={58 + i * 27} r={4} fill={i % 2 ? '#dcdcdc' : '#777'} />
        <circle cx={234} cy={58 + i * 27} r={4} fill="#c8c8c8" />
      </g>
    ))}
    {/* 侧面散热孔 */}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={262} y={52 + i * 20} width={4} height={12} fill="#2a2a2a" />)}
    {/* 线缆 */}
    <path d="M270 210 C300 200 320 160 306 120" stroke="#1e1e1e" strokeWidth={5} fill="none" />
    <path d="M90 214 C60 206 44 176 52 140" stroke="#1e1e1e" strokeWidth={5} fill="none" />
    {/* 地面阴影 */}
    <ellipse cx={170} cy={224} rx={130} ry={6} fill="#8a8a8a" />
  </svg>
);

/** 一部 2000 年前后的直板手机：屏上是聊天窗口 */
export const PagerPhone: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.18} viewBox="0 0 180 212" style={{overflow: 'visible'}}>
    <rect x={14} y={8} width={152} height={196} rx={18} fill="#2e2e2e" />
    <rect x={26} y={24} width={128} height={96} rx={4} fill="#dcd8c8" />
    {/* 聊天气泡 */}
    <rect x={34} y={34} width={72} height={22} rx={8} fill="#9aa4a0" />
    <rect x={58} y={62} width={86} height={22} rx={8} fill="#5c6e66" />
    <rect x={34} y={90} width={60} height={22} rx={8} fill="#9aa4a0" />
    {/* 键盘 */}
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        {[0, 1, 2].map((c) => (
          <rect key={c} x={36 + c * 40} y={132 + r * 20} width={32} height={14} rx={3} fill="#555" />
        ))}
      </g>
    ))}
    <circle cx={90} cy={204} r={5} fill="#777" />
  </svg>
);

/** 一对聊天气泡：一只白一只灰，一问一答 */
export const ChatBubbles: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.62} viewBox="0 0 260 160" style={{overflow: 'visible'}}>
    <g transform="rotate(-3 130 80)">
      <rect x={10} y={18} width={150} height={58} rx={20} fill="#3a3a3a" />
      <path d="M40 74 L54 88 L58 72 Z" fill="#3a3a3a" />
      <circle cx={44} cy={47} r={6} fill="#dcdcdc" />
      <circle cx={66} cy={47} r={6} fill="#dcdcdc" />
      <circle cx={88} cy={47} r={6} fill="#dcdcdc" />
      <rect x={100} y={92} width={150} height={58} rx={20} fill="#b8b8b0" />
      <path d="M220 92 L206 78 L202 94 Z" fill="#b8b8b0" />
      <circle cx={134} cy={121} r={6} fill="#3a3a3a" />
      <circle cx={156} cy={121} r={6} fill="#3a3a3a" />
      <circle cx={178} cy={121} r={6} fill="#3a3a3a" />
    </g>
  </svg>
);

/** 手机上的二维码（微信支付示意） */
export const PhoneQR: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.9} viewBox="0 0 170 320" style={{overflow: 'visible'}}>
    <rect x={6} y={6} width={158} height={308} rx={26} fill="#2a2a2a" />
    <rect x={14} y={14} width={142} height={292} rx={20} fill="#efeadb" />
    {/* 扫码框 */}
    <rect x={30} y={54} width={110} height={110} rx={8} fill="none" stroke="#3a3a3a" strokeWidth={5} />
    {[
      [40, 64, 30],
      [100, 64, 30],
      [40, 124, 30],
    ].map(([x, y, w]) => (
      <g key={`${x}`}>
        <rect x={x} y={y} width={w} height={w} fill="#3a3a3a" />
        <rect x={x + 7} y={y + 7} width={w - 14} height={w - 14} fill="#efeadb" />
        <rect x={x + 12} y={y + 12} width={w - 24} height={w - 24} fill="#3a3a3a" />
      </g>
    ))}
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={92 + (i % 2) * 20} y={134 + Math.floor(i / 2) * 20} width={14} height={14} fill="#3a3a3a" />
    ))}
    {[0, 1, 2].map((i) => <rect key={i} x={40} y={172 + i * 14} width={70 + i * 10} height={7} fill="#7a7a7a" />)}
    {/* 底部按钮 */}
    <rect x={54} y={290} width={62} height={8} rx={4} fill="#3a3a3a" />
  </svg>
);

/** 一只红包：红底、金封、一个「福」字位 */
export const RedEnvelope: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.35} viewBox="0 0 200 270" style={{overflow: 'visible'}}>
    <g transform="rotate(-4 100 135)">
      <rect x={20} y={16} width={160} height={240} rx={12} fill="#b8433f" />
      {/* 金封 */}
      <path d="M20 130 Q60 156 100 130 Q140 104 180 130 L180 152 Q140 126 100 152 Q60 178 20 152 Z" fill="#d8b25e" />
      <rect x={20} y={128} width={160} height={10} fill="#d8b25e" />
      {/* 福字位 */}
      <circle cx={100} cy={74} r={34} fill="#d8b25e" opacity={0.92} />
      <rect x={82} y={54} width={36} height={40} rx={4} fill="#b8433f" />
      <rect x={88} y={62} width={24} height={8} fill="#d8b25e" />
      <rect x={88} y={74} width={24} height={8} fill="#d8b25e" />
      <rect x={88} y={86} width={24} height={4} fill="#d8b25e" />
      {/* 底纹 */}
      {[0, 1, 2].map((i) => <rect key={i} x={30} y={190 + i * 18} width={140} height={4} fill="#9c3531" />)}
    </g>
  </svg>
);

/** 摇一摇：一部手机加两道弧线 */
export const ShakePhone: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.1} viewBox="0 0 240 260" style={{overflow: 'visible'}}>
    <g transform="rotate(-8 120 130)">
      <rect x={76} y={34} width={88} height={180} rx={14} fill="#2e2e2e" />
      <rect x={84} y={46} width={72} height={148} rx={8} fill="#dcd8c8" />
      <rect x={94} y={60} width={52} height={10} rx={5} fill="#8a8a8a" />
      <rect x={94} y={80} width={40} height={10} rx={5} fill="#8a8a8a" />
      <circle cx={120} cy={150} r={26} fill="none" stroke="#b8433f" strokeWidth={7} />
      <path d="M106 150 L116 160 L136 138" stroke="#b8433f" strokeWidth={7} fill="none" />
    </g>
    {/* 摇动弧线 */}
    <path d="M40 66 Q18 120 42 176" stroke="#3a3a3a" strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="2 16" />
    <path d="M200 66 Q222 120 198 176" stroke="#3a3a3a" strokeWidth={7} fill="none" strokeLinecap="round" strokeDasharray="2 16" />
  </svg>
);

/** 一只游戏手柄 */
export const Gamepad: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.66} viewBox="0 0 260 170" style={{overflow: 'visible'}}>
    <g transform="rotate(-4 130 85)">
      <path d="M40 44 L220 44 Q252 44 246 96 Q240 148 218 148 Q196 148 186 120 L74 120 Q64 148 42 148 Q20 148 14 96 Q8 44 40 44 Z" fill="#333" />
      {/* 十字键 */}
      <rect x={56} y={64} width={18} height={52} rx={3} fill="#b8b8b0" />
      <rect x={39} y={81} width={52} height={18} rx={3} fill="#b8b8b0" />
      {/* 四键 */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i * Math.PI) / 2;
        return <circle key={i} cx={188 + Math.cos(a) * 22} cy={88 + Math.sin(a) * 22} r={10} fill="#b8b8b0" />;
      })}
      {/* 中键 */}
      <rect x={112} y={86} width={14} height={9} rx={2} fill="#777" />
      <rect x={134} y={86} width={14} height={9} rx={2} fill="#777" />
    </g>
  </svg>
);

/** 一枚 Q 币（示意） */
export const CoinStack: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 160 160" style={{overflow: 'visible'}}>
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(0 ${3 - i * 26})`}>
        <ellipse cx={80} cy={110 + i * 26} rx={54} ry={17} fill="#c9c2ae" />
        <ellipse cx={80} cy={104 + i * 26} rx={54} ry={17} fill="#e5ddc4" />
        <ellipse cx={80} cy={104 + i * 26} rx={38} ry={11} fill="none" stroke="#b0a888" strokeWidth={3} />
      </g>
    ))}
    <text x={80} y={98} textAnchor="middle" fontSize={22} fontFamily="serif" fill="#6a6250" fontWeight="700">
      Q
    </text>
  </svg>
);

/** 港交所：一块行情屏 + 一口钟 */
export const ExchangeFloor: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#c4c4c4" />
    {/* 行情屏 */}
    <rect x={18} y={20} width={304} height={120} rx={6} fill="#2a2a2a" />
    {[
      ['0700', '+12%', 46],
      ['00700', 'HKD 3.70', 78],
      ['62', '亿', 110],
    ].map(([a, b, y]) => (
      <g key={y}>
        <text x={40} y={y} fontSize={22} fontFamily="serif" fill="#dcdcdc" fontWeight="700">
          {a}
        </text>
        <text x={200} y={y} fontSize={22} fontFamily="serif" fill="#e8b25e" fontWeight="700">
          {b}
        </text>
      </g>
    ))}
    {/* 钟座 */}
    <rect x={120} y={140} width={100} height={12} fill="#4a4a4a" />
    <rect x={136} y={152} width={12} height={54} fill="#4a4a4a" />
    <rect x={192} y={152} width={12} height={54} fill="#4a4a4a" />
    {/* 钟 */}
    <path d="M150 96 Q170 84 190 96 L196 136 L144 136 Z" fill="#b8975a" />
    <circle cx={170} cy={104} r={5} fill="#6a5230" />
    <rect x={166} y={136} width={8} height={22} fill="#6a5230" />
    {/* 敲钟的锤 */}
    <path d="M218 108 L200 122" stroke="#3a3a3a" strokeWidth={7} strokeLinecap="round" />
    <circle cx={221} cy={105} r={8} fill="#3a3a3a" />
    {/* 地面 */}
    <rect x={0} y={206} width={340} height={24} fill="#9a9a9a" />
  </svg>
);

/** 一座老写字楼立面：一格一格的窗（深圳华强北年代感） */
export const OldOffice: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#a8a8a8" />
    <rect x={30} y={16} width={280} height={198} fill="#8a8a8a" />
    {Array.from({length: 6}, (_, r) =>
      Array.from({length: 8}, (_, c) => (
        <rect key={`${r}-${c}`} x={44 + c * 32} y={28 + r * 30} width={22} height={18} fill={(r + c) % 3 === 0 ? '#3a3a3a' : '#c8c8c8'} />
      )),
    )}
    <rect x={120} y={182} width={100} height={32} fill="#2a2a2a" />
    <rect x={0} y={214} width={340} height={16} fill="#6a6a6a" />
  </svg>
);

/** Q 币时代的小账本：一沓票据、一支笔 */
export const LedgerDesk: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#b4b4ac" />
    <rect x={0} y={0} width={340} height={46} fill="#9a9a94" />
    {/* 票据堆 */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`rotate(${-4 + i * 2} 170 140)`}>
        <rect x={60} y={60 + i * 26} width={210} height={120 - i * 0} fill="#ece7d6" />
        <rect x={60} y={60 + i * 26} width={210} height={18} fill="#c9c2ae" />
        {[0, 1, 2, 3].map((j) => (
          <rect key={j} x={76} y={90 + i * 26 + j * 22} width={i % 2 ? 150 : 120} height={7} fill="#8a8577" />
        ))}
      </g>
    ))}
    {/* 笔 */}
    <rect x={248} y={54} width={9} height={150} rx={4} fill="#2e2e2e" transform="rotate(16 252 130)" />
    {/* 章印 */}
    <circle cx={92} cy={196} r={16} fill="none" stroke="#b8433f" strokeWidth={5} />
  </svg>
);

/** 价签 */
export const Tag: React.FC<{text: string; sub?: string; rot?: number}> = ({text, sub, rot = -4}) => (
  <div style={{transform: `rotate(${rot}deg)`, display: 'inline-block', filter: 'drop-shadow(2px 4px 4px rgba(23,23,22,0.3))'}}>
    <div style={{background: '#f6f3ea', border: '4px solid #1e1e1e', padding: '5px 14px 8px'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 5}}>
        <div style={{fontFamily: VF.num, fontSize: 54, color: '#b8433f', lineHeight: 1}}>{text}</div>
        {sub && <div style={{fontFamily: VF.heavy, fontSize: 22, color: '#1e1e1e'}}>{sub}</div>}
      </div>
    </div>
  </div>
);

/** 一条向下的箭头（下滑） */
export const SlideArrow: React.FC<{s?: number}> = ({s = 110}) => (
  <svg width={s} height={s} viewBox="0 0 110 110">
    <path d="M22 14 L70 54 L22 54 L70 54" stroke="#b8433f" strokeWidth={9} fill="none" strokeLinejoin="round" />
    <path d="M70 14 L70 92" stroke="#b8433f" strokeWidth={9} strokeLinecap="round" />
    <path d="M50 72 L70 96 L90 72" fill="none" stroke="#b8433f" strokeWidth={9} strokeLinejoin="round" />
  </svg>
);

/** 2010 年代办公室：一排显示器亮着聊天窗 */
export const WarRoom: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 230" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={230} fill="#ffffff" />
    <rect x={0} y={0} width={340} height={200} fill="#f2f0ea" />
    {/* 四块屏 */}
    {[26, 108, 190, 272].map((x, i) => (
      <g key={x}>
        <rect x={x} y={54} width={52} height={38} rx={3} fill="#2a2a2a" />
        <rect x={x + 5} y={59} width={42} height={28} fill="#dcdcdc" />
        <rect x={x + 9} y={63 + i * 0} width={26} height={5} fill="#6a6a6a" />
        <rect x={x + 9} y={72} width={18} height={5} fill="#9a9a9a" />
        <rect x={x + 9} y={81} width={30} height={5} fill="#9a9a9a" />
        <rect x={x + 16} y={92} width={20} height={18} fill="#4a4a4a" />
      </g>
    ))}
    {/* 当晚的钟点 */}
    <rect x={0} y={130} width={340} height={70} fill="#3a3a3a" />
    <text x={170} y={172} textAnchor="middle" fontSize={30} fontFamily="serif" fill="#dcdcdc" fontWeight="700">
      11.3
    </text>
  </svg>
);
