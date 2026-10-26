import React from 'react';
import type {Mix} from '../../library/Show';
import {VoxShow, type VoxShowConfig} from '../../library/vox/VoxShow';
import {cueAt, DURATION} from './cues';
import {Ep52Cover} from './Cover';
import {Film, FILM_SFX} from './film';

export const EP52_W = 1920;
export const EP52_H = 1080;

const CONFIG: VoxShowConfig = {
  Film,
  sfx: FILM_SFX,
  duration: DURATION,
  cueAt,
  voice: 'audio/ep52-xiaomi-history/voice.wav',
  bgm: 'audio/ep52-xiaomi-history/bgm.wav',
  w: EP52_W,
  h: EP52_H,
  subY: 965,
  keywords: ['近 7000 亿', '1.55 万亿', '银谷大厦', '小米粥', 'MIUI', '1999', '红米', '799', '掉到第五', 'MIX', '破发', '造车', 'SU7', 'YU7', '玄戒 O1', '澎程'],
  // 第一句口播从第 13 帧开始，封面占前 8 帧，再用 6 帧淡出
  cover: {C: Ep52Cover, frames: 8},
};

/** 「小米 16 年」Vox 拼贴解说，横屏 16:9，没有主持人 */
export const Ep52XiaomiHistory: React.FC<{mix?: Mix}> = ({mix}) => <VoxShow config={CONFIG} mix={mix} />;
