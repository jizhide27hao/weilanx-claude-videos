#!/usr/bin/env node
/**
 * 暗金文献长片的「分页表」工具。读 cues.json + film-a.tsx 的 CUTS，做四件事：
 *
 *   node .workbuddy/skills/weilanx-creator-gilded-long-video/scripts/pages.mjs map   <期>
 *       打印每页：起止帧 / 秒数 / 覆盖哪几句 / 首句（排完 36 页第一眼该看的就是这张表）
 *
 *   node .../pages.mjs check <期>
 *       校验切页表：单调递增、首页为 0、每页 5–12 秒、每句都被某一页盖住、页数与 PAGES 一致
 *
 *   node .../pages.mjs frames <期> --pages 1,7,24
 *       按页抽关键帧到 out/<期>/抽帧/a-p<NN>.png（默认取页内 72% 处，即数据出齐、还没淡出）
 *
 *   node .../pages.mjs scaffold --cues 1,4,9,14
 *       按 cue 序号生成 CUTS 代码片段，贴进 film-a.tsx 就是一张切页表
 *
 * <期> = src/episodes/ 下的目录名（如 ep53-huawei-history）。
 * film-a.tsx 里 CUTS 可以写字面量，也可以写 cf(n) - 6 —— 本工具会代入 cues.json 求值。
 */

import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const FPS = 30;
const FADE = 16;
const ROOT = process.cwd();

const argv = process.argv.slice(2);
const cmd = argv[0];
const ep = (argv[1] || '').replace(/\/$/, '');
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i > 0 && argv[i + 1] ? argv[i + 1] : dflt;
};

const die = (msg) => {
  console.error(`✗ ${msg}`);
  process.exit(1);
};

const readCues = (epName) => {
  const p = path.join(ROOT, 'src/episodes', epName, 'cues.json');
  if (!fs.existsSync(p)) die(`找不到 ${path.relative(ROOT, p)}（先跑 tts.py 生成字幕时间轴）`);
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!raw.length) die('cues.json 是空的');
  return raw;
};

/** 从 film-a.tsx 里抠出 CUTS 数组：先剥行注释，再按括号配平截取 */
const readCuts = (epName, file) => {
  const f = path.join(ROOT, 'src/episodes', epName, file);
  if (!fs.existsSync(f)) die(`找不到 ${path.relative(ROOT, f)}`);
  const src = fs.readFileSync(f, 'utf8').replace(/\/\/[^\n]*/g, '');
  const at = src.indexOf('const CUTS');
  if (at < 0) die(`${file} 里没有 CUTS`);
  let i = src.indexOf('[', at);
  let depth = 0;
  let end = -1;
  for (; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end < 0) die('CUTS 的方括号没有配平');
  return src.slice(src.indexOf('[', at) + 1, end);
};

const readPageCount = (epName, file) => {
  const f = path.join(ROOT, 'src/episodes', epName, file);
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/const PAGES\s*=\s*\[([\s\S]*?)\]/);
  if (!m) return null;
  return (m[1].match(/P\d+/g) || []).length;
};

const evalCuts = (body, cues) => {
  const cf = (n) => {
    const c = cues[n - 1];
    if (!c) die(`cf(${n}) 越界：cues.json 只有 ${cues.length} 句`);
    return Math.round(c.start * FPS);
  };
  const ce = (n) => Math.round(cues[n - 1].end * FPS);
  try {
    const arr = new Function('cf', 'ce', `return [${body}];`)(cf, ce);
    return arr.map((v) => Math.round(v));
  } catch (e) {
    die(`CUTS 求值失败：${e.message}`);
  }
};

/** 每页覆盖的 cue：以「切点前后」判定，切点落在哪句里，那句就归新页 */
const pageCues = (cues, cuts) => {
  const out = cuts.map(() => []);
  cues.forEach((c, k) => {
    const at = Math.round(c.start * FPS);
    let page = 0;
    for (let i = 0; i < cuts.length; i++) if (at >= cuts[i] - 1) page = i;
    out[page].push(k + 1);
  });
  return out;
};

const span = (list) => {
  if (!list.length) return '—';
  const a = list[0];
  const b = list[list.length - 1];
  return a === b ? `${a}` : `${a}–${b}`;
};

// ─────────────────────────────────────────────────────────────── map
const doMap = () => {
  const cues = readCues(ep);
  const file = flag('file', 'film-a.tsx');
  const cuts = evalCuts(readCuts(ep, file), cues);
  const total = Math.ceil((cues[cues.length - 1].end + 0.9) * FPS);
  const own = pageCues(cues, cuts);
  const n = cuts.length;

  const rows = cuts.map((c, i) => {
    const to = i === n - 1 ? total : cuts[i + 1];
    const sec = (to - c) / FPS;
    const first = cues[(own[i][0] ?? cues.length) - 1];
    return {
      page: `P${String(i + 1).padStart(2, '0')}`,
      cut: c,
      to,
      sec: sec.toFixed(1),
      cues: span(own[i]),
      line: first ? first.text.slice(0, 22) : '（没有对上台词）',
    };
  });

  console.log(`\n${ep} · ${n} 页 · 片长 ${(total / FPS).toFixed(2)}s（${total} 帧）\n`);
  console.log('页     起帧    止帧   秒数   台词      首句');
  console.log('─'.repeat(78));
  for (const r of rows) {
    console.log(`${r.page}  ${String(r.cut).padStart(6)}  ${String(r.to).padStart(6)}  ${r.sec.padStart(5)}  ${r.cues.padStart(8)}   ${r.line}`);
  }

  const secs = rows.map((r) => Number(r.sec));
  const avg = secs.reduce((a, b) => a + b, 0) / secs.length;
  const min = rows[secs.indexOf(Math.min(...secs))];
  const max = rows[secs.indexOf(Math.max(...secs))];
  console.log('─'.repeat(78));
  console.log(`平均 ${avg.toFixed(1)}s／页 · 最短 ${min.sec}s（${min.page}）· 最长 ${max.sec}s（${max.page}）`);
  console.log(`覆盖 ${cues.length} 句，漏掉 ${cues.length - own.flat().length} 句\n`);
  if (avg < 5.5) console.log('⚠ 平均不到 5.5 秒/页，观众读不完——合并相邻页或砍句子\n');
};

// ─────────────────────────────────────────────────────────────── check
const doCheck = () => {
  const cues = readCues(ep);
  const file = flag('file', 'film-a.tsx');
  const cuts = evalCuts(readCuts(ep, file), cues);
  const total = Math.ceil((cues[cues.length - 1].end + 0.9) * FPS);
  const n = cuts.length;
  const own = pageCues(cues, cuts);
  const errs = [];
  const warns = [];

  if (cuts[0] !== 0) errs.push(`CUTS[0] = ${cuts[0]}，第一页必须从第 0 帧起`);
  for (let i = 1; i < n; i++) {
    if (cuts[i] <= cuts[i - 1]) errs.push(`CUTS[${i}] = ${cuts[i]} 没有大于 ${cuts[i - 1]}（${'P' + String(i).padStart(2, '0')} 与下一页重叠/错序）`);
    else if (cuts[i] - cuts[i - 1] < FADE) errs.push(`P${String(i + 1).padStart(2, '0')} 只有 ${cuts[i] - cuts[i - 1]} 帧，比交叉淡化（${FADE} 帧）还短`);
  }
  if (own.some((l) => l.length === 0)) {
    own.forEach((l, i) => l.length || errs.push(`P${String(i + 1).padStart(2, '0')} 一句台词都没分到（切点切在了句间空隙里）`));
  }
  cuts.forEach((c, i) => {
    const to = i === n - 1 ? total : cuts[i + 1];
    const sec = (to - c) / FPS;
    const tag = `P${String(i + 1).padStart(2, '0')}`;
    // 2.5 秒是硬下限（一屏只放一个数字的「一拍页」勉强够，ep53 的 P28「1,028 天」是 2.9 秒）；
    // 2.5–5.5 秒算短拍页，这一屏只许一件东西；
    // 超过 12 秒通常会显空——ep53 的 P27（落差）和 P30（只差 105 亿）都是靠并置撑住的。
    if (sec < 2.5) errs.push(`${tag} 只有 ${sec.toFixed(1)}s，低于 2.5 秒（连一个数字都读不完）`);
    else if (sec < 5.5) warns.push(`${tag} 只有 ${sec.toFixed(1)}s · 短拍页，这一屏只许放一个数字或一句结论`);
    else if (sec > 12) warns.push(`${tag} 有 ${sec.toFixed(1)}s，超过 12 秒容易显空（补一件证据或拆成两页）`);
  });

  const declared = readPageCount(ep, file);
  if (declared !== null && declared !== n) errs.push(`PAGES 里有 ${declared} 个组件，CUTS 有 ${n} 个切点——两者必须相等`);

  const lastCueEnd = Math.round((cues[cues.length - 1].end + 0.22) * FPS);
  if (total < lastCueEnd) errs.push(`片长 ${total} 帧早于最后一句字幕结束（${lastCueEnd} 帧）`);

  const avg = cuts.map((c, i) => ((i === n - 1 ? total : cuts[i + 1]) - c) / FPS).reduce((a, b) => a + b, 0) / n;

  console.log(`\n${ep} · ${n} 页 · 平均 ${avg.toFixed(1)}s／页 · ${cues.length} 句台词`);
  for (const w of warns) console.log(`! ${w}`);
  if (!errs.length) console.log('✓ 切页表通过\n');
  else {
    for (const e of errs) console.log(`✗ ${e}`);
    console.log('');
    process.exit(1);
  }
};

// ─────────────────────────────────────────────────────────────── frames
const doFrames = () => {
  const cues = readCues(ep);
  const file = flag('file', 'film-a.tsx');
  const cuts = evalCuts(readCuts(ep, file), cues);
  const total = Math.ceil((cues[cues.length - 1].end + 0.9) * FPS);
  const comp = flag('comp', `${ep}-gilded`);
  const at = Number(flag('at', '0.72'));
  const want = (flag('pages', '1') || '1')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((x) => Number.isFinite(x));
  const outDir = path.join(ROOT, 'out', ep, '抽帧'); // 按选题归位，不再往全局 out/check/ 堆
  fs.mkdirSync(outDir, {recursive: true});

  for (const p of want) {
    const i = p - 1;
    if (cuts[i] === undefined) die(`没有第 ${p} 页（共 ${cuts.length} 页）`);
    const to = i === cuts.length - 1 ? total : cuts[i + 1];
    const fr = Math.round(cuts[i] + (to - cuts[i]) * at);
    const out = path.join(outDir, `a-p${String(p).padStart(2, '0')}.png`);
    process.stdout.write(`P${String(p).padStart(2, '0')} → 第 ${fr} 帧 … `);
    execFileSync(
      process.execPath,
      ['node_modules/@remotion/cli/remotion-cli.js', 'still', 'src/index.ts', comp, out, `--frame=${fr}`, '--log=error'],
      {stdio: ['ignore', 'ignore', 'inherit'], env: {...process.env, NODE_OPTIONS: '--max-old-space-size=4096'}},
    );
    console.log('ok');
  }
};

// ─────────────────────────────────────────────────────────────── scaffold
const doScaffold = () => {
  const list = (flag('cues', '') || '')
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((x) => Number.isFinite(x));
  if (!list.length) die('用法：scaffold --cues 1,4,9,14（每页第一句的 cue 序号，从 1 开始）');
  const offset = Number(flag('offset', '6'));
  // 第一页永远从第 0 帧起：如果第一项传了 1，直接丢掉，不生成多余切点
  const rest = list[0] === 1 ? list.slice(1) : list;
  const lines = ['export const CUTS = [', '  0, // P01'];
  rest.forEach((c, i) => {
    lines.push(`  cf(${c}) - ${offset}, // P${String(i + 2).padStart(2, '0')}`);
  });
  lines.push('];');
  console.log(lines.join('\n'));
  console.log(`\n// ${rest.length + 1} 页。写完跑 check 校验页长，再用 map 看每页分到哪几句。\n`);
};

// ─────────────────────────────────────────────────────────────── main
if (!cmd || ['-h', '--help'].includes(cmd)) {
  console.log('用法：pages.mjs <map|check|frames|scaffold> <期> [--pages 1,7] [--file film-a.tsx] [--comp <id>] [--cues 1,4,9]');
  process.exit(0);
}
if (cmd === 'scaffold') doScaffold();
else {
  if (!ep) die('缺少 <期>（src/episodes/ 下的目录名）');
  if (cmd === 'map') doMap();
  else if (cmd === 'check') doCheck();
  else if (cmd === 'frames') doFrames();
  else die(`不认识的子命令：${cmd}`);
}
