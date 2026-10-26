import React from 'react';

/**
 * 阿里巴巴 26 年 · 本期原创道具（纯 SVG）。
 * 全部为示意图：不对应真实照片，不画第三方 logo。
 */

const RED = '#b8433f';
const INK = '#232320';

/** 湖畔花园那样的六层民宅：白墙、窗、空调外机、晾衣杆 */
export const LakeHouse: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 340 240" preserveAspectRatio="xMidYMid slice">
    <rect width={340} height={240} fill="#c9c6b8" />
    <rect x={0} y={0} width={340} height={26} fill="#a8a497" />
    {/* 楼体 */}
    <rect x={64} y={26} width={212} height={200} fill="#ded9c8" />
    <rect x={64} y={26} width={212} height={10} fill="#c2bdad" />
    {/* 六层窗，每层两扇 */}
    {[0, 1, 2, 3, 4].map((r) =>
      [0, 1, 2].map((c) => (
        <g key={`${r}-${c}`}>
          <rect x={82 + c * 66} y={44 + r * 36} width={44} height={26} fill={r === 1 && c === 1 ? '#f0e6c8' : '#6f7b76'} />
          <rect x={82 + c * 66} y={44 + r * 36} width={44} height={26} fill="none" stroke="#b9b4a4" strokeWidth={2} />
          <line x1={104 + c * 66} y1={44 + r * 36} x2={104 + c * 66} y2={70 + r * 36} stroke="#b9b4a4" strokeWidth={2} />
        </g>
      )),
    )}
    {/* 阳台 */}
    <rect x={64} y={150} width={212} height={8} fill="#c2bdad" />
    <rect x={64} y={186} width={212} height={8} fill="#c2bdad" />
    {/* 晾衣杆 */}
    <line x1={70} y1={196} x2={272} y2={196} stroke="#8a8578" strokeWidth={3} />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={86 + i * 44} y={196} width={22} height={30} fill={i % 2 ? '#d8d2c0' : '#c7c0aa'} />
    ))}
    {/* 空调外机 */}
    <rect x={244} y={100} width={28} height={20} fill="#b0aca0" />
    <circle cx={258} cy={110} r={6} fill="#8e8a7e" />
    {/* 门洞 */}
    <rect x={150} y={196} width={40} height={30} fill="#5b5f58" />
    {/* 树 */}
    <ellipse cx={302} cy={120} rx={26} ry={46} fill="#8f9a83" />
    <rect x={298} y={150} width={8} height={90} fill="#7b7466" />
  </svg>
);

/** 十八个人围坐开会：俯视一桌人（示意，不是肖像） */
export const Crowd18: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.72} viewBox="0 0 380 274" style={{overflow: 'visible'}}>
    {/* 桌子 */}
    <rect x={70} y={86} width={240} height={104} rx={8} fill="#cfc7b0" stroke="#a89f88" strokeWidth={3} />
    <rect x={96} y={104} width={188} height={68} fill="#e2dac4" />
    {/* 桌上：笔记本、纸、茶杯 */}
    <rect x={110} y={116} width={54} height={36} fill="#f1ece0" stroke="#b3ab96" strokeWidth={2} />
    <rect x={186} y={122} width={62} height={42} fill="#f1ece0" stroke="#b3ab96" strokeWidth={2} />
    <circle cx={268} cy={140} r={9} fill="#f1ece0" stroke="#b3ab96" strokeWidth={2} />
    {/* 一圈人：上排 7、左右各 3、下排 5 */}
    {Array.from({length: 7}, (_, i) => (
      <g key={`t${i}`}>
        <circle cx={94 + i * 32} cy={62} r={15} fill={i === 3 ? '#3d3d38' : '#5f5f58'} />
        <path d={`M${79 + i * 32} 86 q15 -16 30 0`} fill={i === 3 ? '#3d3d38' : '#5f5f58'} />
      </g>
    ))}
    {Array.from({length: 3}, (_, i) => (
      <g key={`l${i}`}>
        <circle cx={40} cy={110 + i * 32} r={15} fill="#5f5f58" />
        <path d={`M${56} ${95 + i * 32} q16 15 0 30`} fill="#5f5f58" />
        <circle cx={340} cy={110 + i * 32} r={15} fill={i === 1 ? RED : '#5f5f58'} />
        <path d={`M${324} ${95 + i * 32} q-16 15 0 30`} fill={i === 1 ? RED : '#5f5f58'} />
      </g>
    ))}
    {Array.from({length: 5}, (_, i) => (
      <g key={`b${i}`}>
        <circle cx={110 + i * 40} cy={216} r={15} fill="#5f5f58" />
        <path d={`M${95 + i * 40} 192 q15 16 30 0`} fill="#5f5f58" />
      </g>
    ))}
  </svg>
);

/** 一台 2000 年前后的机架服务器：B2B 时代的家底 */
export const Rack: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 260 250" preserveAspectRatio="xMidYMid slice">
    <rect width={260} height={250} fill="#b6b2a6" />
    <rect x={54} y={16} width={152} height={220} rx={5} fill="#3c3c38" />
    <rect x={64} y={26} width={132} height={200} fill="#4b4b45" />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <rect x={70} y={32 + i * 28} width={120} height={21} rx={2} fill="#2c2c28" />
        <rect x={76} y={37 + i * 28} width={52} height={11} fill="#77746a" />
        <circle cx={168} cy={42 + i * 28} r={4} fill={i % 3 === 0 ? '#e8e2cf' : '#8b877c'} />
        <circle cx={182} cy={42 + i * 28} r={4} fill="#8b877c" />
      </g>
    ))}
    <path d="M206 232 C230 220 244 186 232 150" stroke="#262622" strokeWidth={4} fill="none" />
    <ellipse cx={130} cy={242} rx={104} ry={5} fill="#918d82" />
  </svg>
);

/** 一只淘宝包裹：纸箱、胶带、面单 */
export const Parcel: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.86} viewBox="0 0 300 258" style={{overflow: 'visible'}}>
    {/* 顶面 */}
    <path d="M40 78 L150 42 L260 78 L150 116 Z" fill="#d9c9a8" />
    <path d="M40 78 L40 190 L150 228 L150 116 Z" fill="#c9b795" />
    <path d="M260 78 L260 190 L150 228 L150 116 Z" fill="#b8a686" />
    {/* 胶带 */}
    <path d="M150 42 L150 116" stroke="#a8946f" strokeWidth={13} />
    <path d="M40 78 L150 116 L260 78" stroke="#a8946f" strokeWidth={4} fill="none" />
    {/* 面单 */}
    <path d="M62 116 L124 136 L124 186 L62 166 Z" fill="#f4f0e4" />
    <rect x={70} y={126} width={40} height={4} fill="#8d8a80" transform="rotate(18 70 126)" />
    <rect x={70} y={140} width={30} height={4} fill="#8d8a80" transform="rotate(18 70 140)" />
    <rect x={70} y={154} width={34} height={4} fill="#8d8a80" transform="rotate(18 70 154)" />
    {/* 封箱红线 */}
    <path d="M150 116 L150 228" stroke="#cbb997" strokeWidth={3} />
  </svg>
);

/** 担保交易：钱先进中间那只盾，确认收货再给卖家 */
export const Escrow: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.66} viewBox="0 0 380 250" style={{overflow: 'visible'}}>
    {/* 买家 */}
    <circle cx={44} cy={92} r={20} fill={INK} />
    <path d="M18 132 q26 -28 52 0 v40 h-52 z" fill={INK} />
    {/* 卖家 */}
    <circle cx={336} cy={92} r={20} fill={INK} />
    <path d="M310 132 q26 -28 52 0 v40 h-52 z" fill={INK} />
    {/* 盾 */}
    <path d="M190 34 L258 58 V128 Q258 186 190 214 Q122 186 122 128 V58 Z" fill="#f4f0e4" stroke={RED} strokeWidth={8} />
    <path d="M190 62 L232 78 V126 Q232 166 190 184 Q148 166 148 126 V78 Z" fill={RED} opacity={0.16} />
    <text x={190} y={140} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={38} fill={RED}>
      ¥
    </text>
    {/* 两条箭头 */}
    <path d="M68 96 L112 108" stroke={INK} strokeWidth={5} fill="none" />
    <path d="M112 108 l-14 -10 l3 14 z" fill={INK} />
    <path d="M268 108 L312 96" stroke={RED} strokeWidth={5} fill="none" />
    <path d="M312 96 l-14 3 l10 10 z" fill={RED} />
    <text x={190} y={240} textAnchor="middle" fontFamily="serif" fontSize={17} fill="#5b5b54">
      收到货，才放款
    </text>
  </svg>
);

/** 一面开市铜锣：交易所挂牌 */
export const Gong: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.9} viewBox="0 0 300 270" style={{overflow: 'visible'}}>
    <rect width={300} height={270} fill="#ddd7c5" />
    {/* 架 */}
    <rect x={28} y={30} width={12} height={200} fill="#6d5b45" />
    <rect x={260} y={30} width={12} height={200} fill="#6d5b45" />
    <rect x={20} y={26} width={260} height={12} fill="#6d5b45" />
    <rect x={10} y={222} width={280} height={12} rx={4} fill="#6d5b45" />
    {/* 锣 */}
    <circle cx={150} cy={128} r={74} fill="#b08b4a" />
    <circle cx={150} cy={128} r={74} fill="none" stroke="#8a6a34" strokeWidth={7} />
    <circle cx={150} cy={128} r={46} fill="#c49b55" />
    <circle cx={150} cy={128} r={20} fill="#d4ae68" />
    {/* 挂绳 */}
    <path d="M150 54 L150 32" stroke="#5b4a36" strokeWidth={6} />
    {/* 锤 */}
    <g transform="rotate(24 236 120)">
      <rect x={228} y={88} width={12} height={68} rx={5} fill="#5b4a36" />
      <rect x={212} y={150} width={44} height={26} rx={8} fill="#8e2f2c" />
    </g>
    {/* 声波 */}
    <path d="M60 60 q-18 22 0 44" stroke={RED} strokeWidth={4} fill="none" />
    <path d="M40 48 q-26 32 0 64" stroke={RED} strokeWidth={3} fill="none" opacity={0.6} />
  </svg>
);

/** 一块交易所行情大屏：红绿格子里一串数字 */
export const TickerWall: React.FC<{w: number; h: number}> = ({w, h}) => (
  <svg width={w} height={h} viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice">
    <rect width={360} height={220} fill="#1e1e1c" />
    <rect x={14} y={14} width={332} height={192} fill="#111110" stroke="#3a3a36" strokeWidth={2} />
    {Array.from({length: 6}, (_, r) =>
      Array.from({length: 9}, (_, c) => {
        const up = (r * 9 + c) % 5 !== 0;
        return (
          <g key={`${r}-${c}`}>
            <rect x={22 + c * 36} y={22 + r * 30} width={30} height={22} fill={up ? '#3e2b2a' : '#22302a'} />
            <rect x={25 + c * 36} y={30 + r * 30} width={up ? 18 : 12} height={5} fill={up ? RED : '#5e8f74'} />
          </g>
        );
      }),
    )}
    <rect x={22} y={202} width={316} height={0} fill="none" />
  </svg>
);

/** 一部手机，屏上是应用宫格（示意） */
export const PhoneApp: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 1.94} viewBox="0 0 160 310" style={{overflow: 'visible'}}>
    <rect x={6} y={4} width={148} height={302} rx={22} fill="#2b2b28" />
    <rect x={14} y={16} width={132} height={278} rx={12} fill="#f2ede0" />
    <rect x={14} y={16} width={132} height={34} fill="#e6dfcd" />
    <text x={80} y={39} textAnchor="middle" fontFamily="serif" fontWeight={700} fontSize={15} fill="#3a3a34">
      淘宝
    </text>
    {Array.from({length: 12}, (_, i) => {
      const r = Math.floor(i / 4);
      const c = i % 4;
      return <rect key={i} x={26 + c * 30} y={64 + r * 34} width={22} height={22} rx={6} fill={i === 0 ? RED : ['#8f9a83', '#b8a686', '#6f7b76', '#a8a497'][i % 4]} />;
    })}
    <rect x={26} y={190} width={108} height={54} rx={6} fill="#e2dac4" />
    <rect x={34} y={200} width={60} height={6} fill="#a89f88" />
    <rect x={34} y={214} width={84} height={6} fill="#c2bda9" />
    <rect x={34} y={228} width={44} height={6} fill="#c2bda9" />
    <rect x={40} y={262} width={80} height={16} rx={8} fill={RED} />
  </svg>
);

/** 一辆送外卖的电动车，后座一只保温箱 */
export const Scooter: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s * 0.66} viewBox="0 0 340 224" style={{overflow: 'visible'}}>
    {/* 箱 */}
    <rect x={40} y={38} width={86} height={76} rx={6} fill="#d9c9a8" stroke="#a8946f" strokeWidth={3} />
    <rect x={54} y={56} width={58} height={8} fill="#a8946f" />
    <rect x={54} y={72} width={40} height={8} fill="#c9b795" />
    <rect x={54} y={88} width={50} height={8} fill="#c9b795" />
    {/* 车身 */}
    <path d="M120 150 L210 150 L246 96" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M132 150 L150 112 L206 112" stroke={INK} strokeWidth={9} fill="none" strokeLinecap="round" />
    {/* 座 */}
    <rect x={124} y={100} width={52} height={14} rx={6} fill="#3a3a34" />
    {/* 车头 */}
    <path d="M246 96 L266 56" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <path d="M254 56 L286 56" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    {/* 轮 */}
    <circle cx={134} cy={166} r={34} fill="#2b2b28" />
    <circle cx={134} cy={166} r={16} fill="#b6b2a6" />
    <circle cx={258} cy={166} r={34} fill="#2b2b28" />
    <circle cx={258} cy={166} r={16} fill="#b6b2a6" />
    {/* 速度线 */}
    <path d="M20 110 L56 110" stroke={RED} strokeWidth={4} />
    <path d="M12 130 L44 130" stroke={RED} strokeWidth={4} opacity={0.6} />
    <path d="M24 150 L52 150" stroke={RED} strokeWidth={4} opacity={0.35} />
  </svg>
);

/** 一枚 AI 芯片：晶圆底座、引脚、核心光点 */
export const Chip: React.FC<{s: number}> = ({s}) => (
  <svg width={s} height={s} viewBox="0 0 260 260" style={{overflow: 'visible'}}>
    <rect x={34} y={34} width={192} height={192} rx={12} fill="#2b2b28" />
    {/* 引脚 */}
    {Array.from({length: 8}, (_, i) => (
      <React.Fragment key={i}>
        <rect x={44 + i * 22} y={18} width={9} height={18} fill="#9a968a" />
        <rect x={44 + i * 22} y={224} width={9} height={18} fill="#9a968a" />
        <rect x={18} y={44 + i * 22} width={18} height={9} fill="#9a968a" />
        <rect x={224} y={44 + i * 22} width={18} height={9} fill="#9a968a" />
      </React.Fragment>
    ))}
    {/* 核心 */}
    <rect x={78} y={78} width={104} height={104} rx={6} fill="#3a3a35" stroke="#5f5f58" strokeWidth={3} />
    <rect x={98} y={98} width={64} height={64} rx={4} fill={RED} opacity={0.9} />
    <rect x={114} y={114} width={32} height={32} fill="#f0d9a8" opacity={0.85} />
    {/* 走线 */}
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
