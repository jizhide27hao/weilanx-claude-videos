import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep53Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP53_W = 1920;
export const EP53_H = 1080;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep53-huawei-history/voice.wav',
  bgm: 'audio/ep53-huawei-history/bgm.wav',
  w: EP53_W,
  h: EP53_H,
  subY: 965,
  keywords: ['4678 亿', '1213 亿', '2.1 万', '华为的冬天', '7.5 亿美元', 'C&C08', '21 项', '麒麟', '实体清单', '鸿蒙', '荣耀', '6368 亿', '3500 万', '12 点 08 分', '8809 亿', '58.9 万辆', '20.6%'],
  // 第一句口播从第 13 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep53Cover, frames: 8},
};

/** 「华为 39 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep53HuaweiHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
