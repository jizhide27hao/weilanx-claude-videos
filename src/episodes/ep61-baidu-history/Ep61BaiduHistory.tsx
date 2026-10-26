import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep61Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP61_W = 1920;
export const EP61_H = 1080;
export const EP61_DURATION = DURATION;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep61-baidu-history/voice.wav',
  bgm: 'audio/ep61-baidu-history/bgm.wav',
  w: EP61_W,
  h: EP61_H,
  subY: 965,
  keywords: ['270 亿', '1200 亿', '26 座城', '43%', '120 万美元', '超链分析', '1000 万', '竞价排名', '闪电计划', '27 美元', '122.54', '354%', '39.58 亿', '1340 万美元', '2450 倍', '20 亿', '45 亿', '谷歌', '336 亿', '462 亿', '446 亿', '酒驾', '91 无线', '19 亿美元', '200 亿', '糯米', '血友病吧', '魏则西', '莆田系', '陆奇', '阿波罗', '800 亿', '553 亿', '400 亿', 'BAT', '1000 亿', '1200 亿', '港股', '300 亿', '文心一言', '萝卜快跑', '340 万单', '2000 万单', '2 亿', '昆仑芯', '50 亿美元'],
  // 第一句口播从第 14 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep61Cover, frames: 8},
};

/** 「百度 26 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep61BaiduHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
