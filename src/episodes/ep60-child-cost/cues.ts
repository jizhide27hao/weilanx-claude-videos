import raw from './cues.json';
import {makeCues, type Cue} from '../../library/cues';

export const VOICE_SECONDS = 279.39;

const m = makeCues(raw as Cue[], VOICE_SECONDS);

export const CUES = m.CUES;
export const DURATION = m.DURATION;
export const cf = m.cf;
export const ce = m.ce;
export const cw = m.cw;
export const cueAt = m.cueAt;

/* ---- 段落边界：按句子锚定，不手猜 ---- */
export const SEG = {
  hook: {from: 0, to: cf(6) - 8},
  ledger: {from: cf(6) - 8, to: cf(14) - 8},
  turn: {from: cf(14) - 8, to: cf(15) - 8},
  fetal: {from: cf(15) - 8, to: cf(22) - 8},
  born: {from: cf(22) - 8, to: cf(29) - 8},
  y1: {from: cf(29) - 8, to: cf(32) - 8},
  y2: {from: cf(32) - 8, to: cf(35) - 8},
  kg: {from: cf(35) - 8, to: cf(39) - 8},
  pri: {from: cf(39) - 8, to: cf(41) - 8},
  mid: {from: cf(41) - 8, to: cf(44) - 8},
  high: {from: cf(44) - 8, to: cf(46) - 8},
  overview: {from: cf(46) - 8, to: cf(52) - 8},
  region: {from: cf(52) - 8, to: cf(59) - 8},
  method: {from: cf(59) - 8, to: cf(72) - 8},
  kids: {from: cf(72) - 8, to: cf(77) - 8},
  back: {from: cf(77) - 8, to: cf(91) - 8},
  end: {from: cf(91) - 8, to: DURATION},
};
