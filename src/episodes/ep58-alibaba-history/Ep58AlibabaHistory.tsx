import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep58Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP58_W = 1920;
export const EP58_H = 1080;
export const EP58_DURATION = DURATION;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep58-alibaba-history/voice.wav',
  bgm: 'audio/ep58-alibaba-history/bgm.wav',
  w: EP58_W,
  h: EP58_H,
  subY: 965,
  keywords: ['2 万亿', '3.7 万亿', '6.7 万亿', '50 万', '102 年', '38 家', '500 万美元', '2,000 万美元', '2,500 万美元', '非典', '淘宝', 'eBay', '免费', '支付宝', '担保', '雅虎', '13.5 港元', '116 亿', '193%', '3.42 港元', '私有化', '同股不同权', '68 美元', '250 亿美元', '2,300 亿美元', '176 港元', '4 万亿', '309 港元', '蚂蚁', '2.1 万亿', '外滩', '182.28 亿', '48.88%', '60 港元', '芒格', '1+6+N', '蔡崇信', '3,800 亿', '千问', '闪购', '186 港元', '88 港元', '45%', '97.8 港元', '1.95 万亿'],
  // 第一句口播从第 14 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep58Cover, frames: 8},
};

/** 「阿里 26 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep58AlibabaHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
