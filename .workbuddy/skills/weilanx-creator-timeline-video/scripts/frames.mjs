#!/usr/bin/env node
/**
 * 时间轴长卷风 · 关键帧批量抽查
 *
 * 渲整片要 8–12 分钟，抽查一帧只要 3–5 秒。改完画面先跑这个看排版，
 * 确认没叠、没出画、该撤的撤了，再去渲整片。
 *
 * 用法（工程根目录）：
 *
 *   # 按帧号
 *   node .workbuddy/skills/weilanx-creator-timeline-video/scripts/frames.mjs ep52-xiaomi-history 28 1906 3584
 *
 *   # 按句号（自动从 cues.json 查这句开始的那一帧，+14 帧避开淡入）
 *   node .workbuddy/skills/weilanx-creator-timeline-video/scripts/frames.mjs ep52-xiaomi-history --cues 1,23,43,85
 *
 *   # 指定缩放（默认 0.42）
 *   node .workbuddy/skills/weilanx-creator-timeline-video/scripts/frames.mjs ep52-xiaomi-history --cues 1,23 --scale 0.6
 *
 * 产物：out/chk-<期>-f<帧号>.jpg，并打印文件列表。
 */

import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..', '..');

function usage(msg) {
  if (msg) console.error('错误：' + msg + '\n');
  console.error(
    '用法：node frames.mjs <期> <帧号...>\n' +
    '      node frames.mjs <期> --cues <句号,逗号分隔> [--scale 0.42]'
  );
  process.exit(1);
}

const argv = process.argv.slice(2);
if (!argv.length) usage();

const ep = argv[0];
const flags = {scale: '0.42', cues: null, only: null};
const frames = [];

for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--scale') flags.scale = argv[++i];
  else if (a === '--cues') flags.cues = argv[++i];
  else if (a === '--only') flags.only = argv[++i];
  else if (/^\d+$/.test(a)) frames.push(Number(a));
  else usage('不认识的参数 ' + a);
}

const epDir = path.join(ROOT, 'src', 'episodes', ep);
if (!fs.existsSync(epDir)) usage('没有这个作品：src/episodes/' + ep);

if (flags.cues) {
  const cuesPath = path.join(epDir, 'cues.json');
  if (!fs.existsSync(cuesPath)) usage('缺 cues.json，先跑 tts.py');
  const cues = JSON.parse(fs.readFileSync(cuesPath, 'utf8'));
  for (const raw of flags.cues.split(',')) {
    const n = Number(raw.trim());
    const c = cues.find((x) => x.i === n);
    if (!c) {
      console.error('cues.json 里没有第 ' + n + ' 句，跳过');
      continue;
    }
    frames.push(Math.round(c.start * 30) + 14);
    console.log('第 ' + n + ' 句「' + c.text + '」→ ' + c.start.toFixed(2) + 's → 帧 ' +
      (Math.round(c.start * 30) + 14));
  }
}

if (!frames.length) usage('没给帧号');

const outDir = path.join(ROOT, 'out');
fs.mkdirSync(outDir, {recursive: true});

const cli = path.join(ROOT, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
if (!fs.existsSync(cli)) usage('找不到 Remotion CLI，先在工程根目录 npm install');

const made = [];
for (const f of frames) {
  const out = path.join(outDir, 'chk-' + ep + '-f' + f + '.jpg');
  const args = [
    cli, 'still', 'src/index.ts', ep, out,
    '--frame=' + f, '--scale=' + flags.scale, '--log=error',
  ];
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    stdio: 'inherit',
    env: {...process.env, NODE_OPTIONS: '--max-old-space-size=4096'},
  });
  if (r.status !== 0) {
    console.error('帧 ' + f + ' 渲染失败');
    continue;
  }
  made.push(out);
  console.log('OK  帧 ' + f + ' → ' + path.relative(ROOT, out));
}

console.log('\n共 ' + made.length + '/' + frames.length + ' 帧：');
made.forEach((p) => console.log('  ' + p));
