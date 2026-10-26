import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep54Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP54_W = 1920;
export const EP54_H = 1080;
export const EP54_DURATION = DURATION;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep54-apple-history/voice.wav',
  bgm: 'audio/ep54-apple-history/bgm.wav',
  w: EP54_W,
  h: EP54_H,
  subY: 965,
  keywords: ['5 万亿美元', '1,300 美元', '车库', '韦恩', 'Apple 2', '上市', 'Macintosh', '斯卡利', 'NeXT', '90 天', '砍到 4 个格子', 'iMac', 'iPod', 'iPhone', 'App Store', 'iPad', '库克', 'M 1', '1 万亿', '3 万亿', '服务', '75%', 'Siri', 'Vision Pro', '4 万亿', '5 万亿', '特努斯'],
  // 第一句口播从第 14 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep54Cover, frames: 8},
};

/** 「苹果 50 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep54AppleHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
