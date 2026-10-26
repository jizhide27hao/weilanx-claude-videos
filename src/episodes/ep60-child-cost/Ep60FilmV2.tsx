import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {R, RF} from '../../library/receipt/theme';
import {SEG, DURATION, cueAt, cf, ce} from './cues';
import {SceneOpen, SceneTurn, StageScene, OverviewScene} from './v2-top';
import {RegionScene, MethodScene, KidsScene, BackScene, EndScene} from './v2-bottom';

export const EP60V2_W = 1080;
export const EP60V2_H = 1920;
export const EP60V2_FRAMES = DURATION;

/* ---------------- 音效 ---------------- */
const Sfx: React.FC<{at: number; name: string; vol?: number; rate?: number; len?: number}> = ({
  at,
  name,
  vol = 0.5,
  rate = 1,
  len = 120,
}) => {
  if (at < 0) return null;
  return (
    <Sequence from={at} durationInFrames={len}>
      <Audio src={staticFile(`audio/ep60-child-cost/sfx/${name}.wav`)} volume={vol} playbackRate={rate} />
    </Sequence>
  );
};

/* ---------------- 字幕 ---------------- */
const Subtitle: React.FC<{f: number}> = ({f}) => {
  const cue = cueAt(f);
  if (!cue) return null;
  const a = Math.round(cue.start * 30);
  const b = Math.round(cue.end * 30);
  const inP = Math.min(1, Math.max(0, (f - a) / 6));
  const outP = Math.min(1, Math.max(0, (b + 4 - f) / 6));
  const p = Math.min(inP, outP);
  if (p <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        right: 56,
        bottom: 150,
        opacity: p,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 60,
      }}
    >
      <div
        style={{
          background: 'rgba(9,13,11,0.86)',
          color: '#F2F2EC',
          fontFamily: RF.cn,
          fontSize: 38,
          lineHeight: 1.5,
          padding: '15px 26px',
          letterSpacing: '0.01em',
          textAlign: 'center',
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

/* ---------------- 全片 ---------------- */
export const Ep60FilmV2: React.FC = () => {
  const f = useCurrentFrame();

  const stageList = [
    {band: 0, seg: SEG.fetal, hot: 2, verdict: '钱不是花在医院，是花在「备」上'},
    {band: 1, seg: SEG.born, hot: 5, verdict: '最大的一笔不是奶粉，是医院'},
    {band: 2, seg: SEG.y1, hot: 0, verdict: '医院退了一步，吃顶上来'},
    {band: 3, seg: SEG.y2, hot: 0, verdict: '医院继续降，吃还是第一'},
    {band: 4, seg: SEG.kg, hot: 6, verdict: '3 岁，教育第一次出现'},
    {band: 5, seg: SEG.pri, hot: 6, verdict: '教育超过吃饭，成了第一大开销'},
    {band: 6, seg: SEG.mid, hot: 6, verdict: '义务教育，反而最便宜'},
    {band: 7, seg: SEG.high, hot: 6, verdict: '教育费冲到全周期最高'},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: R.desk, overflow: 'hidden'}}>
      {/* 配音在关键音效点让位，否则撕纸和盖章会被说话声盖死 */}
      <Audio
        src={staticFile('audio/ep60-child-cost/voice.wav')}
        volume={(f) => {
          let v = 0.72;
          for (const t of [18, cf(13), cf(63), cf(66), cf(69)]) {
            const d = Math.abs(f - t);
            if (d < 16) v *= 0.3 + 0.7 * (d / 16);
          }
          return v;
        }}
      />

      {/* ---- 音效：纸 - 打印 - 盖章 ---- */}
      <Sfx at={18} name="paper" vol={1} />
      <Sfx at={cf(1) - 4} name="type" vol={1} rate={0.9} />
      <Sfx at={cf(2) - 4} name="type" vol={1} rate={0.85} />
      <Sfx at={cf(3) - 2} name="stamp" vol={1} rate={1.1} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Sfx key={i} at={cf(7) + i * 12} name="type" vol={1} rate={1.05} />
      ))}
      <Sfx at={cf(8) - 2} name="click" vol={1} />
      <Sfx at={cf(10) - 2} name="click" vol={1} />
      <Sfx at={cf(12) - 2} name="click" vol={1} />
      <Sfx at={cf(13) - 2} name="stamp" vol={1} />

      {/* ---- 音效：场景切换 ---- */}
      {stageList.map((s, i) => (
        <Sfx key={i} at={s.seg.from + 2} name="whoosh" vol={1} rate={1.2} />
      ))}
      <Sfx at={SEG.overview.from + 2} name="whoosh" vol={1} rate={1.1} />
      <Sfx at={SEG.region.from + 2} name="whoosh" vol={1} rate={1.15} />
      <Sfx at={SEG.method.from + 2} name="whoosh" vol={1} rate={1.15} />
      <Sfx at={cf(63)} name="snip" vol={1} rate={1} />
      <Sfx at={cf(66)} name="snip" vol={1} rate={1.05} />
      <Sfx at={cf(69) - 2} name="stamp" vol={1} />
      <Sfx at={SEG.kids.from + 2} name="whoosh" vol={1} rate={0.95} />
      <Sfx at={cf(73) - 2} name="click" vol={1} />
      <Sfx at={cf(74) - 2} name="click" vol={1} />
      <Sfx at={cf(75) - 2} name="click" vol={1} />
      <Sfx at={SEG.back.from + 2} name="whoosh" vol={1} rate={0.9} />
      <Sfx at={SEG.end.from + 2} name="whoosh" vol={1} rate={1.2} />
      <Sfx at={cf(91) - 2} name="ding" vol={1} />
      <Sfx at={cf(92) - 2} name="stamp" vol={1} />

      {/* ---- 画面 ---- */}
      {f < SEG.turn.from ? <SceneOpen /> : null}
      {f >= SEG.turn.from && f < SEG.fetal.from ? <SceneTurn /> : null}
      {stageList.map((s, i) =>
        f >= s.seg.from && f < s.seg.to ? (
          <StageScene key={i} band={s.band} from={s.seg.from} to={s.seg.to} hot={s.hot} verdict={s.verdict} />
        ) : null,
      )}
      {f >= SEG.overview.from && f < SEG.overview.to ? (
        <OverviewScene from={SEG.overview.from} to={SEG.overview.to} />
      ) : null}
      {f >= SEG.region.from && f < SEG.region.to ? (
        <RegionScene from={SEG.region.from} to={SEG.region.to} />
      ) : null}
      {f >= SEG.method.from && f < SEG.method.to ? (
        <MethodScene from={SEG.method.from} to={SEG.method.to} />
      ) : null}
      {f >= SEG.kids.from && f < SEG.kids.to ? <KidsScene from={SEG.kids.from} to={SEG.kids.to} /> : null}
      {f >= SEG.back.from && f < SEG.back.to ? <BackScene from={SEG.back.from} to={SEG.back.to} /> : null}
      {f >= SEG.end.from ? <EndScene from={SEG.end.from} to={SEG.end.to} /> : null}

      <Subtitle f={f} />
    </AbsoluteFill>
  );
};
