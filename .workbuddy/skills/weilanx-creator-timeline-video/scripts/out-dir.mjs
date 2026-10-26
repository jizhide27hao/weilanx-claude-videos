#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────
 * out-dir.mjs —— 一期一个文件夹，里面按类型再分
 *
 *   node out-dir.mjs <期>               建好并打印 5 个分类目录
 *   node out-dir.mjs <期> 封面          只打印某一类（成片/封面/文案/抽帧/文档）
 *   node out-dir.mjs <期> --archive     扫 out/ 根目录，列出这一期散落文件 → 预定去向（只看不动）
 *   node out-dir.mjs <期> --apply       真的移进去
 *
 * 目录长这样：
 *   out/<期>/
 *   ├── 成片/    <期>.mp4（+ 竖版变体）
 *   ├── 封面/    封面-16x9.png / 封面-4x3.png / 封面-3x4.png
 *   ├── 文案/    发布文案.md
 *   ├── 抽帧/    chk-*、v-*、按页抽的自查帧（交付后可以留，也可以删）
 *   └── 文档/    口播文稿与事实核查.md
 *
 * 为什么要它：2026-10 之前所有产物都平铺在 out/ 根目录（out/<期>-gilded.mp4、
 * out/cover-3x4.jpg、out/发布文案.md、out/check/*.png），一期一清还好，连着做
 * 两期就分不清哪个文件是谁的。现在按选题建文件夹，路径可推导、不用记。
 * ───────────────────────────────────────────────────────────── */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'out');

const KINDS = ['成片', '封面', '文案', '抽帧', '文档'];

const args = process.argv.slice(2);
const ep = args.find((a) => !a.startsWith('-') && !KINDS.includes(a));
const kind = args.find((a) => KINDS.includes(a));
const archive = args.includes('--archive') || args.includes('--apply'); // --apply 自带 --archive，少敲一次
const apply = args.includes('--apply');

if (!ep) {
  console.error('用法：node out-dir.mjs <期> [成片|封面|文案|抽帧|文档] [--archive|--apply]');
  process.exit(1);
}

const EP_DIR = path.join(OUT, ep);

/* ── 建目录 ──────────────────────────────────────────────── */
const ensure = () => {
  for (const k of KINDS) fs.mkdirSync(path.join(EP_DIR, k), {recursive: true});
};

/* ── 打印 ────────────────────────────────────────────────── */
const print = () => {
  ensure();
  const lines = [`${ep}/`];
  for (const k of KINDS) {
    const files = fs.readdirSync(path.join(EP_DIR, k)).filter((f) => !f.startsWith('.'));
    lines.push(`├── ${k}/${files.length ? '' : '   （空）'}`);
    for (const f of files) {
      const size = fs.statSync(path.join(EP_DIR, k, f)).size;
      lines.push(`│   └── ${f}  ${(size / 1024 / 1024).toFixed(1)}MB`);
    }
  }
  console.log(lines.join('\n'));

  const stray = outRootStragglers();
  if (stray.length) {
    console.log(`\n! out/ 根目录还有 ${stray.length} 个散落文件（属于这一期）：`);
    for (const s of stray) console.log(`    ${s.file}  →  ${path.relative(ROOT, s.to)}`);
    console.log('  跑 --apply 收进去。');
  }
};

/* ── 认领散落文件 ─────────────────────────────────────────── */
/** 归到哪一类。只按「文件名里带期号」认领，认不出来的一律不动。 */
const classify = (file) => {
  const n = file.toLowerCase();
  const at = n.indexOf(ep.toLowerCase());
  if (at < 0) return null; // 和这一期无关，不碰
  // 期号后面紧跟数字说明是另一期（ep5 不该认领 ep53-xxx）
  if (/^\d/.test(n.slice(at + ep.length, at + ep.length + 1))) return null;
  if (n.endsWith('.mp4')) return '成片';
  if (n.includes('cover') || n.includes('封面')) return '封面';
  if (n.includes('文案')) return '文案';
  if (n.includes('核查') || n.includes('文稿')) return '文档';
  if (n.startsWith('chk') || n.startsWith('v-') || n.includes('frame')) return '抽帧';
  return null;
};

const outRootStragglers = () => {
  if (!fs.existsSync(OUT)) return [];
  const hits = [];
  for (const entry of fs.readdirSync(OUT, {withFileTypes: true})) {
    if (!entry.isFile()) continue; // 只看根目录的文件，不进 check/ 等子目录
    const kind = classify(entry.name);
    if (!kind) continue;
    hits.push({file: entry.name, from: path.join(OUT, entry.name), to: path.join(EP_DIR, kind, entry.name), kind});
  }
  return hits;
};

/* ── 执行 ────────────────────────────────────────────────── */
if (kind) {
  ensure();
  console.log(path.join(EP_DIR, kind));
} else if (archive) {
  ensure();
  const hits = outRootStragglers();
  if (!hits.length) {
    console.log('out/ 根目录没有这一期的散落文件，干净。');
  } else {
    for (const h of hits) {
      if (!apply) {
        console.log(`[看] ${h.file} → ${h.kind}/`);
        continue;
      }
      // 同名不覆盖：重名就加 -2
      let dest = h.to;
      let i = 2;
      while (fs.existsSync(dest)) {
        const ext = path.extname(h.to);
        dest = h.to.replace(new RegExp(`${ext}$`), `-${i++}${ext}`);
      }
      fs.renameSync(h.from, dest);
      console.log(`[移] ${h.file} → ${path.relative(EP_DIR, dest)}`);
    }
    if (!apply) console.log('\n加 --apply 才真移。');
  }
} else {
  print();
}
