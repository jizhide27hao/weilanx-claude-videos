import raw from './cues.json';
import {makeCues} from '../../library/cues';

/** 最后一句收尾 + 结尾留白（和 tts.py 的 TAIL 0.9 一致） */
export const VOICE_SECONDS = raw[raw.length - 1].end + 0.9;

export const {CUES, DURATION, cf, ce, cw, cueAt} = makeCues(raw, VOICE_SECONDS);
