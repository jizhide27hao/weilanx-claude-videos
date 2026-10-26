import {makeCues} from '../../library/cues';
import raw from './cues.json';

export const VOICE_SECONDS = raw[raw.length - 1].end + 0.9;
export const {CUES, DURATION, cf, ce, cw, cueAt} = makeCues(raw, VOICE_SECONDS);
