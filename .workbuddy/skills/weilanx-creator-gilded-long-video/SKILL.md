---
name: weilanx-creator-gilded-long-video
description: 「暗金文献风 · 口播长片（翻页版）」一键成片工作流。给一个选题（一家公司、一个行业、一个人的几十年），一条龙做完：查一手资料 → 写 65–95 句短句口播 → edge-tts 配音并反推字幕时间轴 → 按论点把口播切成 30–40 页（每页 6–9 秒）→ 每页用 `src/library/gilded/kit.tsx` 拼成一张「账页」（年份抬头 + 文献引用 + 大数字 + 表线 + 脚注）→ 相邻页 16 帧交叉淡化，不硬切、不弹入 → 程序化配乐 + 人声闪避 → 逐条事实核查 → 抽帧自查 → 渲染 1920×1080 约 4 分半的成片 → **16:9 + 4:3 + 3:4 三套暗金封面** → 抖音标题与描述，所有交付物按选题收进 `out/<期>/`，中途不停下来问用户。用户说「用暗金风做一期 XX 的历史」「做一版暗金文献的长片」「像华为那期暗金版一样做」「不要时间轴桌面，用翻页的那种」「翻页版 / 账页版 / A 版」「有口播的暗金文献风」时都用这个 skill；只要题材是长跨度发展史、又想要「一页一张账、观众自己看」的节奏，就用它。
---

# 一个选题 → 一期暗金文献风口播长片（翻页版，一键到底）

> **目录约定（2026-10-22 起）**：下文 `<期>` = 作品 ID（如 `ep53-huawei-history`）。文件落在五处：
> `src/episodes/<期>/`（代码）、`audio/lines/<期>.py`（文案）、`public/audio/<期>/`（voice.wav / bgm.wav）、`docs/<期>-*`（文稿与核查）、`out/<期>/`（交付物）。
> Studio 归档在 `<Folder name="05-暗金文献风">`。
>
> **交付物一律进 `out/<期>/`，按类型分五个子目录**——不许再把 mp4 / 封面 / 文案平铺在 `out/` 根上：
>
> ```
> out/<期>/
> ├── 成片/   <期>-gilded.mp4
> ├── 封面/   封面-16x9.png（B 站 / YouTube / 视频号）· 封面-4x3.png（抖音横版 / 公众号首图）· 封面-3x4.png（抖音 / 小红书）
> ├── 文案/   发布文案.md
> ├── 抽帧/   按页抽的自查帧（交付后可留可删）
> └── 文档/   口播文稿与事实核查.md
> ```
>
> 路径不用背：`node .workbuddy/skills/weilanx-creator-timeline-video/scripts/out-dir.mjs <期>` 建目录并打印（两套 skill 共用这个脚本），
> 加类别参数只打印一类；旧期散落在 `out/` 根的文件用 `--archive` 看清单、`--apply` 收进去。

用户只给一个选题 = 授权你从头做到交付，**中途不停不问**。交付物：成片 mp4、**16:9 + 4:3 + 3:4 三版封面**、抖音标题与描述、口播文稿与事实核查表。

只有两种情况停下来：① 核心事实两种来源矛盾且影响立意；② 工具连续失败两次（TTS 端点挂了、渲染崩溃）。

**样片：`ep53-huawei-history` 的 A 版**（`ep53-huawei-history-gilded`，36 页 / 265 秒）。新一期照着它改，**不要从空白写**：

```
src/episodes/ep53-huawei-history/
├── film-a-pages1.tsx   P01–P12（第一幕，569 行）
├── film-a-pages2.tsx   P13–P24（第二幕，472 行）
├── film-a-pages3.tsx   P25–P36（第三幕，510 行）
├── film-a.tsx          CUTS（36 切点）+ FilmA + GILDED_FILM_SFX（162 行）
├── cues.ts / cues.json 字幕时间轴
├── CoverTallGilded.tsx 3:4 竖版封面
├── Cover43Gilded.tsx 4:3 横版封面
└── CoverWideGilded.tsx 16:9 横版封面
src/library/gilded/kit.tsx   ← 版面零件库（本 skill 的产物）
```

动手前读工程根 `CLAUDE.md`、`src/library/gilded/`、本 skill 的三份 `references/`。

## 和另外两个 skill 的分工（先确认没走错门）

| skill | 画面语法 | 口播 | 时长 | 一屏几件 |
|---|---|---|---|---|
| `weilanx-creator-timeline-video` | 旧纸桌面长卷，相机一镜到底 | 有 | 3.5–4.5 分 | 3–4 件，跟着镜头走 |
| `weilanx-creator-gilded-video` | 暗金文献，锚词 + 配乐重拍 | **无** | 30–60 秒 | 1–2 件，靠爆点 |
| **本 skill** | **暗金文献，一页一张账，交叉淡化换页** | **有** | 4–5 分 | **6–8 件，同时在场** |

同一段内容三种剪法都做过，力量差别就在「同屏能看几件」。**要「研发 1,213 vs 净利 234」这种并置说话，用本 skill。**

## 规格（默认值）

| 项 | 默认 |
|---|---|
| 画面 | 横屏 1920×1080、30fps，`src/library/gilded/`，**不用相机**，36 页左右 |
| 时长 | 4 分–5 分（90 句口播，平均 7.4 秒／页） |
| 口播 | **有**，edge-tts `zh-CN-XiaoxiaoNeural` + `pitch -3Hz` + `rate +30%` |
| 字幕 | 底部烧录，**直接读 `cues.json`**（不手写），同文处让位 |
| 换页 | 16 帧交叉淡化 + 7px 模糊 + 整页 3% 慢推，**全片不硬切** |
| 配乐 | 程序化总谱（`audio/score.mjs` + `synth.mjs`），人声闪避 depth 0.7 |
| 音效 | 全片 21 声左右，只在换章和落结论时出声 |
| 封面 | **三版都出**：16:9 横版 1920×1080 + 4:3 横版 1440×1080 + 3:4 竖版 1080×1440，暗金账页风（**不要用 Vox 那张网点照**） |

## 依赖

- **配音**：`edge-tts`（免费、需联网），装 `pip install edge-tts`。
- **ffmpeg / ffprobe**：在 PATH 里。
- **配乐 / 画面**：纯代码合成，零外部素材、零版权。
- **python**：用装了 edge-tts 的解释器（本机 `C:/Users/<user>/.workbuddy/binaries/python/envs/default/Scripts/python.exe`）。

---

## 0. 定选题、期号、目录

- **标题**：`<对象> + 时间跨度 + 一句反差`。例：「华为 39 年 · 从 2.1 万到 8,809 亿」。
- **期号**：`ls src/episodes | tail -3` 取最大 + 1，ID `epNN-英文短名`。
- **建目录**：`src/episodes/<期>/`、`public/audio/<期>/`、`docs/`，再跑一次
  `node .workbuddy/skills/weilanx-creator-timeline-video/scripts/out-dir.mjs <期>` 把 `out/<期>/成片·封面·文案·抽帧·文档` 建出来。**现在就建，别等导出时现找地方放。**
- **先想清楚三件事**：① 这一版要靠哪两组数字**并置**说话；② 有几个「页级」的转折；③ 钩子用什么反差。
- **决定这一版和上一版的关系**：同一期已有 Vox 版时，**口播和配乐完全复用**，只重写画面层——省 4 小时。

## 1. 查一手资料

见 `weilanx-creator-timeline-video/references/事实核查.md`。官方大事记 / 年报 / 官方新闻稿优先，机构数据（IDC / Canalys / 交易所）次之，媒体只做交叉核对。**每个要上画面的数字都要有出处**，边查边记。

额外多做一步：**把数字按「能并置成一对」的标准归类**。这套风格的杀伤力全在成对出现——营收 vs 研发、峰值 vs 谷底、进口 vs 自研、数量 vs 时间。

## 2. 写口播（`audio/lines/<期>.py`）

格式、语气、TTS 注意事项与 `weilanx-creator-timeline-video` **完全一致**（一句 8–20 字、一句话一件事、数字写阿拉伯、英文缩写拆开念、开头 7 句钩子、结尾三四句往上抬）。**直接复制那一期的 `LINES` 结构**，只换内容。

本 skill 额外三条：

1. **65–95 句**。少于 60 句撑不满 4 分钟；多于 95 句，页会被压到 5 秒以内，观众读不完。
2. **按 9 组写注释**（`# ---- 断供 ----`），每组 3–5 页。分组决定后面切页和配乐段落。
3. **每 3–5 句里要有一句是「结论句」**（「命门不能攥在别人手里」这种）。结论句是页的落点，也是印章落下的位置。

## 3. 事实核查第一轮（配音前必须做完）

条数不变、改文本可以；改完 `grep` 一遍所有画面里的引用文字。详见 `weilanx-creator-timeline-video/references/事实核查.md`。

**口径错误是这套风格的高发事故**：因为一页里会并置三四个数字，任何一个口径混用（归母 vs 总额、营收 vs 销售收入、全年 vs 上半年）都会被并置放大。ep53 就把「净利 −36%（总额）」和「234 亿（归母）」放在同一段里过，被观众一眼看出，只能重录重渲。**每个数字后面标清口径，脚注写出来。**

## 4. 配音 + 时间轴

```sh
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep <期>
```

产出 `public/audio/<期>/voice.wav` + `src/episodes/<期>/cues.json`（每句起止秒）。脚本自带退避重试 + 节流，**别 Ctrl-C**。

`cues.ts` 三个文件照抄样片（`VOICE_SECONDS` = 最后一句 end + 0.9）。

## 5. 切页（本 skill 的核心工序）

一页 = 一个完整论点 = 2–4 句口播 = 6–9 秒。**切点是「每页第一句开口前 6 帧」**。

```sh
# ① 按 cue 序号生成切页表（第一个 1 会被丢掉，P01 固定从 0 起）
node .workbuddy/skills/weilanx-creator-gilded-long-video/scripts/pages.mjs scaffold --cues 1,4,6,9,13,18,24,31,...

# ② 贴进 film-a.tsx，校验：单调、页长、每句都分到页、页数与 PAGES 一致
node .../pages.mjs check <期>

# ③ 看每页分到哪几句、平均页长、最短最长
node .../pages.mjs map <期>
```

判据与例外（详见 `references/分页与叙事.md`）：

- **按论点边界切，不按句子数均分**。
- 3–5.5 秒的**短拍页**只许放一个数字或一句结论（ep53 有 6 页），它是节奏的呼吸孔。
- 10–13 秒的**长页**必须靠并置撑住（落差、四步流程）。
- 切线不许落在句间空隙，否则 `check` 报「一句都没分到」。

## 6. 排页（`film-a-pages*.tsx`）

见 `references/版面与组件.md`。每页一个 `export const PNN: React.FC<{t: number}>`，**只吃 `t`**（页内帧，0 = 切点）。

从 12 种页型里挑（双数并置 / 十年柱 / 目录页 / 登记文书 / 拆字 / 链条 / 大引文 / 三拍流程 / 落差柱 / 清单打叉 / 环图份额 / 对数命运线），拼之前先定这一页的**视觉锤**是哪个数。

页内节拍三条带：**0–40 帧立结构**（抬头、引用、表头、中缝）→ **40–150 填证据**（每条 `at` 对齐那句口播开口）→ **150 以后只留结论、印章、脚注**，最后 40–60 帧静场。

四条硬纪律：

1. **元素一律柔入**（`Soft`），没有弹入、没有砸下；全片唯一爆点是 `RedStamp`。
2. **一页 ≤ 6 件**，正文下沿 **≤ 880**（字幕在 948）。
3. **画面标题绝不照抄口播**：标题写论点，台词说事实。
4. **自绘图表必须包 `<svg>`**，裸 `<g>` / `<line>` 在 HTML 里不渲染。

## 7. 总装（`film-a.tsx`）

见 `references/装配与交付.md`，有可整段抄的骨架。四件事：

1. `PAGES` + `CUTS`（第 5 步生成）。
2. `Page` 循环：`from = k === 0 ? 0 : CUTS[k] - FADE`、`to = CUTS[k+1] + FADE`、`anchor = CUTS[k]`。
3. `GSub` 读 cues + `skip`（画面已排成大引文的句子让位）。
4. 页脚（系列号 / 时间跨度 / 页码）+ `GILDED_FILM_SFX`。

**底色、浮尘、颗粒挂在 `Page` 外面**，否则两页各降一半不透明度，换页中间整幅发暗。

## 8. 配乐总谱

照 `audio/episodes/ep53-huawei-history.mjs` 改，段边界用 `cs(n)` / `cwT(n,'词')` 表达（改字幕时间轴配乐自动跟随）。跑：

```sh
node audio/episodes/<期>.mjs
```

- 结构跟叙事同构：钩子不协和 + 滴答；上升段加鼓；**崩溃段 `sink()`**；冲顶升调 + 镲；收尾悬着。
- 一个四音动机贯穿全片，每次出现配器更满。
- 配乐读 `voice.wav` 算包络自动闪避（depth 0.7），**换配音必须重跑**。
- 脚本会打印每段闪避前后响度，动态范围 12dB 左右算好。

## 9. 抽帧自查 → 渲染

```sh
# 按页抽帧（默认页内 72% 处：数据出齐、还没淡出）
node .workbuddy/skills/weilanx-creator-gilded-long-video/scripts/pages.mjs frames <期> --pages 1,7,14,24,28,36
```

逐张 Read，看四件事：**元素有没有叠、字有没有出画、字号够不够、该撤的有没有撤**。改完只重渲那一帧。

```sh
export NODE_OPTIONS=--max-old-space-size=4096
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts <期>-gilded out/<期>/成片/<期>-gilded.mp4 \
  --concurrency=4 --crf=24 --log=error
```

约 12 分钟（8000 帧）。渲完 `ffprobe` 验时长/音轨，`volumedetect` 看均值（−22 左右）、峰值（不高于 −3），**再从成片抽 4 帧**核对淡化、字幕让位、页码——Studio 截图看不出这些。抽出来的帧放 `out/<期>/抽帧/`。

## 10. 封面（三版都出）+ 文案 + 交付

**每期固定三张**：16:9 给 B 站 / YouTube / 视频号 / 公众号，4:3 给抖音横版 / 公众号首图，3:4 给抖音 / 小红书。三个组件分开写，不互相缩放、也不裁切：

```sh
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-wide-gilded out/<期>/封面/封面-16x9.png
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-43-gilded out/<期>/封面/封面-4x3.png
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-tall-gilded out/<期>/封面/封面-3x4.png
```

规格见 `references/装配与交付.md` 第六节——**竖版** 1080×1440（两行 214px 金标题 + 对数线 + 朱印，上 2/3 主视觉）；**横版** 1920×1080（左半幅立字、右半幅放对数线，标题降到 152px，右侧留 240px 平台角标区）；**4:3** 1440×1080（横版收窄，标题 134px，数据线 X 748–1288，纵排节奏不变）。
自检：竖版缩到 300px 宽、横版与 4:3 缩到 480px 宽，各看一遍——主标题认得出、钩子读得完、朱印不糊。

抖音标题 / 描述、事实核查表：用 `weilanx-creator-timeline-video` 的 `scripts/doc.py` 与 `references/发布文案.md`，**不要重写**。三处都落到 `out/<期>/文案/` 与 `out/<期>/文档/`。

交付时一次性给齐：成片、**三版封面**、发布文案、文稿与核查表、`voice.wav` / `bgm.wav` / 配乐脚本（全部在 `out/<期>/` 下）。报告要写清：规格与响度、页数与分页逻辑、**这一版和 Vox 版的差别**、核查改了什么、替他定了什么、听感只能他自己听。

---

## 踩过的坑

- **按句子数均分页** → 一半的页只有 4 秒，观众读不完。按**论点边界**切，再用 `check` 校正。
- **切线落在句间空隙** → 这一页一句台词都没有，`check` 会报「一句都没分到」。
- **切点烘焙成字面量** → 重录口播后全片错位。一律写 `cf(n) - 6`。
- **CUTS 数 ≠ PAGES 数** → 渲染时报 undefined，或者最后一页被吞。`check` 会拦。
- **底色跟着页淡化** → 换页中间 0.5 秒整幅发灰。底/尘/颗粒挂 `Page` 外面。
- **字幕与画面大字同文** → 眼睛被扯两次，大引文被降级成旁白。`skip` 让位。
- **字幕句间重叠** → 两句残影糊在底部。`outAt = min(c.end + 0.22, next.start - 0.03)`。
- **`Figure` 用 `unit="%"`** → 「75」和「%」变成上下两截。百分号并进 value。
- **`KV` 用 flex 推右值** → 长值被推出右边界压到竖线上。值绝对定位 `right: 0`。
- **裸 `<g>` / `<line>`** → 落差线、虚线标签根本不渲染。自绘图表包 `<svg>`。
- **36 页每页都 whoosh** → 变综艺。只在换章和落结论出声，其余静默。
- **数字口径混用**（归母 vs 总额、全年 vs 上半年）→ 并置会把错误放大，只能重录重渲。
- **npm scripts 在 Windows 上会崩** → 绕开 `npm run`，直接 `node node_modules/@remotion/cli/remotion-cli.js`。
- **`pages.mjs frames` 一次渲多帧不会并行**，是串行——别粘 20 页一次抽，内存扛得住但时间白等。
- **横版封面直接缩竖版** → 1080 高放不下「标题 / 副题 / 数据线 / 钩子」四层，必挤。横版要重排：左半幅立字、右半幅放线，标题 214 → 152px。
- **横版把钩子放在中段** → 和副题粘在一起、下半页空着。钩子压到画面 86% 高处（竖版 1234/1440 的同一比例），中间留白当呼吸。
- **横版没收边线** → 标题组和钩子之间空 260px，看着像没做完。副题下面补一条 500px 的渐隐金线，把第一组封口。
- **交付物平铺 `out/` 根** → 连着做两期就分不清哪个文件是谁的。一律进 `out/<期>/成片|封面|文案|抽帧|文档`。
