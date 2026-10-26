import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';

export const AudioTest: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: '#000'}}>
    {/* 10 帧起：撕纸，不带 playbackRate */}
    <Sequence from={10} durationInFrames={120}>
      <Audio src={staticFile('audio/sfx/snip.wav')} volume={1} />
    </Sequence>
    {/* 60 帧起：打字，带 playbackRate */}
    <Sequence from={60} durationInFrames={120}>
      <Audio src={staticFile('audio/sfx/type.wav')} volume={1} playbackRate={1.05} />
    </Sequence>
  </AbsoluteFill>
);
