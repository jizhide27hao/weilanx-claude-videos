import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Desk, Paper} from '../../library/receipt/kit';
import {R, RF} from '../../library/receipt/theme';

export const COVER_TALL_W = 1080;
export const COVER_TALL_H = 1440;

/* 抖音 / 小红书封面 3:4
   缩略图很小，所以只放三层信息：一个数、一句话、一句限定。
   不要加红笔划线——缩到 200px 宽就糊成一条脏线。 */
export const Ep60CoverTall: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
    <Desk />
    <div style={{position: 'absolute', left: 90, top: 120, width: 900}}>
      <Paper width={900} height={1200}>
        <div style={{position: 'absolute', left: 60, top: 0, width: 780}}>
          <div
            style={{
              position: 'absolute',
              top: 220,
              width: 780,
              fontFamily: RF.dot,
              fontSize: 26,
              letterSpacing: '0.3em',
              color: R.ink3,
            }}
          >
            CHINA · 2024
          </div>

          <div
            style={{
              position: 'absolute',
              top: 300,
              width: 780,
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
            }}
          >
            <span style={{fontFamily: RF.dot, fontSize: 178, color: R.red, letterSpacing: '0.01em'}}>
              579,996
            </span>
            <span style={{fontFamily: RF.cn, fontSize: 40, color: R.red, fontWeight: 600}}>元</span>
          </div>

          <div style={{position: 'absolute', top: 550, width: 780, height: 5, background: R.ink}} />

          <div
            style={{
              position: 'absolute',
              top: 610,
              width: 780,
              fontFamily: RF.heavy,
              fontWeight: 900,
              fontSize: 82,
              lineHeight: 1.26,
              color: R.ink,
            }}
          >
            养一个孩子
            <br />
            要多少钱
          </div>

          <div
            style={{
              position: 'absolute',
              top: 880,
              width: 780,
              fontFamily: RF.cn,
              fontSize: 26,
              lineHeight: 1.72,
              color: R.ink2,
            }}
          >
            从怀孕前一年，到 17 岁
            <br />
            全国平均 · 一共 19 年
          </div>

          <div
            style={{
              position: 'absolute',
              top: 1060,
              width: 780,
              paddingTop: 16,
              borderTop: '2px solid rgba(20,21,15,0.22)',
              fontFamily: RF.cn,
              fontSize: 20,
              color: 'rgba(20,21,15,0.45)',
            }}
          >
            中国生育成本报告 2026 版 · 2024 年价格
          </div>
        </div>
      </Paper>
    </div>
  </AbsoluteFill>
);
