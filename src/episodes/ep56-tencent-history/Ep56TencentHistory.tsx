import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep56Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP56_W = 1920;
export const EP56_H = 1080;
export const EP56_DURATION = DURATION;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep56-tencent-history/voice.wav',
  bgm: 'audio/ep56-tencent-history/bgm.wav',
  w: EP56_W,
  h: EP56_H,
  subY: 965,
  keywords: ['14.18 亿', '60 万', '50 万', 'O I C Q', 'ICQ', 'IDG', '盈科', '移动梦网', 'M I H', '1,260 万美元', '上市', '3.7 港元', 'Q Q 秀', '穿越火线', '3Q 大战', '艰难的决定', 'Kik', '张小龙', '微信', '433 天', '红包', '482 万', '珍珠港', 'Facebook', '王者荣耀', '4.5 万亿', '版号', '930', '7.35 万亿', '198 港元', '视频号', '全村的希望', '1,120 亿', '7,518 亿', '2,248 亿', '混元', '元宝', '3.5 万亿'],
  // 第一句口播从第 14 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep56Cover, frames: 8},
};

/** 「腾讯 28 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep56TencentHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
