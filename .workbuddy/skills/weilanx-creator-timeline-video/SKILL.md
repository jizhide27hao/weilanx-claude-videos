---
name: weilanx-creator-timeline-video
description: 「时间轴长卷风」公司史 / 发展史长视频一键成片工作流。用户只给一个选题（一家公司、一个行业、一个人的几十年），就一条龙做完：查一手资料 → 写 65–90 句短句口播 → edge-tts 配音并反推字幕时间轴 → 铺一条 26500px 的旧纸桌面时间轴、把故事节点按年份钉上去 → 相机沿桌面横移一镜到底 → 写程序化配乐总谱并做人声闪避 → **逐条事实核查并修正** → 抽查关键帧 → 渲染成片 → 代码渲染 **16:9 + 4:3 + 3:4 三套封面** → 抖音标题与描述，所有交付物按选题收进 `out/<期>/`。成片横屏 16:9、约 4 分钟、有口播和配乐，画面全由代码画（旧纸桌面、网点人像、命运曲线、印章便签），没有真实素材也没有主持人。用户说「做一期 XX 的历史」「用时间轴做一期 XX 发展史」「像英伟达那期 / 小米那期一样做」「做一个公司史视频」「这次做 XX 的时间线」时都用这个 skill；只要是把一条时间跨度长的线索讲成横屏长视频、需要按年份铺桌面的题材，就用它。
---

# 一个选题 → 一期时间轴长卷风成片（一键到底）

> **目录约定（2026-10-22 起）**：下文 `<期>` = 作品 ID（如 `ep53-huawei-history`）。这一期相关文件固定落在五处：
> `src/episodes/<期>/`（代码）、`audio/lines/<期>.py`（文案）、`public/audio/<期>/`（voice.wav / bgm.wav）、`docs/<期>-*`（文稿与核查）、`out/<期>/`（交付物）。
> Studio 里归档在 `<Folder name="04-Vox科普">`（ep18/19/20/52 都在这个 Folder 下）。
>
> **交付物一律进 `out/<期>/`，按类型分五个子目录**——不许再把 mp4 / 封面 / 文案平铺在 `out/` 根上：
>
> ```
> out/<期>/
> ├── 成片/   <期>.mp4
> ├── 封面/   封面-16x9.png（B 站 / YouTube / 视频号）· 封面-4x3.png（抖音横版 / 公众号首图）· 封面-3x4.png（抖音 / 小红书）
> ├── 文案/   发布文案.md
> ├── 抽帧/   自查帧（chk-*.jpg，交付后可留可删）
> └── 文档/   口播文稿与事实核查.md
> ```
>
> 路径不用背：`node .workbuddy/skills/weilanx-creator-timeline-video/scripts/out-dir.mjs <期>` 建目录并打印，
> 加类别参数只打印一类（`... out-dir.mjs <期> 封面`）。旧期散落在 `out/` 根的文件用 `--archive` 看清单、`--apply` 收进去。

用户只给一个选题 = 授权你从头做到交付，**中途不停不问**。交付物是：成片 mp4、**16:9 + 4:3 + 3:4 三版封面**、抖音标题与描述、口播文稿与事实核查表。最后一次性交给用户，并说明你替他定了什么。

只有两种情况才停下来：① 选题的核心事实两种来源互相矛盾且无法判定，且影响全片立意；② 工具连续失败两次（TTS 端点挂了、渲染崩溃）。

**样片：`ep52-xiaomi-history`（小米 16 年：一碗粥到 7000 亿）**。新一期照着它的代码改，**不要从空白写**：

```
src/episodes/ep52-xiaomi-history/
├── timeline.ts              年份 ↔ 桌面坐标、命运线数据、ANCHORS
├── art.tsx                  本期原创道具（纯 SVG）
├── film.tsx                 相机路线 + 16 个桌面节点 + 抽帧组件 + 音效表
├── cues.ts / cues.json      字幕时间轴（由 tts.py 生成，不要手写）
├── Ep52XiaomiHistory.tsx    VoxShow 配置
├── Cover.tsx                16:9 横版封面（也是片子首帧，同一个组件）
├── Cover43.tsx              4:3 横版封面（套 library/vox/Cover43.tsx 模板）
└── CoverTall.tsx            3:4 竖版封面
audio/lines/ep52-xiaomi-history.py    文案（85 句）
audio/episodes/ep52-xiaomi-history.mjs 配乐总谱
docs/ep52-xiaomi-history-核查.json     事实核查配置
```

动手前读：工程根 `CLAUDE.md`、`src/library/vox/`、本 skill 的三份 `references/`。

## 规格（默认值）

| 项 | 默认 |
|---|---|
| 画面 | 横屏 1920×1080、30fps，`VoxShow` + 旧纸桌面长卷（26500 × 1080），一镜到底无切镜 |
| 时长 | 约 3 分 50 秒 – 4 分 30 秒（65–90 句，平均 2.5–3 秒/句） |
| 口播 | **有**，edge-tts `zh-CN-XiaoxiaoNeural`（晓晓）+ `pitch -3Hz` + `rate +30%` |
| 字幕 | 底部烧录，一句一条，直接读 `cues.json` |
| 配乐 | 程序化合成总谱（`audio/score.mjs` + `synth.mjs`），按段落写和弦与鼓，自动做人声闪避（depth 0.7） |
| 命运线 | 数值曲线（市值 / 营收 / 用户数）贯穿全片，对数刻度，标「示意」 |
| 封面 | **三版都出**：16:9 横版 1920×1080（首帧同款）+ 4:3 横版 1440×1080 + 3:4 竖版 1080×1440 |
| 交付 | `out/<期>/成片/<期>.mp4`、`out/<期>/封面/封面-16x9.png` + `封面-4x3.png` + `封面-3x4.png`、`out/<期>/文案/发布文案.md`、文稿核查表 |

## 依赖

- **配音**：`edge-tts`（免费、无需 key、**需要联网**）。装：`pip install edge-tts`。
- **ffmpeg / ffprobe**：必须在 PATH 里（配音拼接、响度检测、抽段都用）。
- **配乐**：纯合成，零外部素材、零版权。
- **画面**：全代码，不用任何外部图片或视频素材。

---

## 0. 定选题、期号、建目录

- **标题**：`<公司/主题> + 时间跨度 + 一句反差副题`。例：「小米 16 年 · 一碗粥到 7000 亿」「英伟达 33 年 · 离倒闭只剩 30 天」。
- **期号**：`ls src/episodes | tail -3` 取最大号 + 1，作品 ID `epNN-英文短名`。撞号就顺延。
- **建目录**：`src/episodes/<期>/`、`public/audio/<期>/`、`audio/lines/`（已存在就复用）、`docs/`，再跑一次
  `node .workbuddy/skills/weilanx-creator-timeline-video/scripts/out-dir.mjs <期>` 把交付目录建出来（`out/<期>/成片 · 封面 · 文案 · 抽帧 · 文档`）。**现在就建，别等到导出时现找地方放。**
- **先想清楚三件事**，它们决定全片结构：
  1. **主线是什么**（一条命运线画什么数值：市值 / 出货量 / 用户数）
  2. **有几次起落**（3 次崩溃 + 2 次冲顶是最舒服的节奏）
  3. **钩子用什么反差**（现在的数字 vs 一年前的数字，中间发生了什么）

## 1. 查一手资料（不能跳过）

见 `references/事实核查.md`。这一步和下笔写文案之间**不要隔太久**，因为写文案时会不自觉地把印象当事实。

- 官方大事记 / 投资者关系页 / 年报 / 官方新闻稿优先，权威机构（IDC / Canalys / 财报 / 交易所）次之，媒体只做交叉核对。
- 每个准备上画面的数字都要有出处，边查边记，别指望写完了再回去找。
- **要一条时间轴**：把关键事件按年月排出来，标出哪 2 段值得在桌面上拉宽（故事最密的年份）。

## 2. 写文案（`audio/lines/<期>.py`）

```python
VOICE = "zh-CN-XiaoxiaoNeural"
RATE  = "+30%"
PITCH = "-3Hz"
LINES = [
    # ---- 钩子 ----
    ("现在，小米市值近 7000 亿港元", None),
    ("去年夏天，这个数字是 1.55 万亿", None),
    # ---- 2010 银谷大厦 ----
    ("2010 年春天，北京银谷大厦", None),
    ("十四个人，一锅小米粥", None),
    ("小米 1 代，1999 元", "小米一代，一千九百九十九元"),
]
```

写法规则：

- **一句 8–20 字**，最长不超过 26（`tts.py` 会警告）。Vox 式的力量在短句，长句会让画面跟不上。
- **一句话一件事**。不要把「2016 年跌出前五，原因是线上见顶和供应链出问题」写成一句。
- **数字写阿拉伯数字**（字幕看得清），但 TTS 读不准的给它一个汉字版本写进第二个字段：`("小米 1 代，1999 元", "小米一代，一千九百九十九元")`。
- **英文缩写拆开念，但中间不要加空格**：写 `MIUI`、`SU7`、`AI` 直接过，TTS 按字母读没问题；**不要写成 `M I U I`、`A I`**——空格会在字母之间塞进一顿（ep61 用户实测「全力押注 A I」读得断，去掉空格立刻顺）。只有 TTS 确实念成单词的才需要处理（`B2B` → `B to B`）。
- **品牌里的数字按口语写**：`91 无线` 要写「九幺无线」而不是「九十一无线」（ep61 用户实测）；`1 代` 写「一代」。
- **读音陷阱第二字段兜底，词典兜漏**：`B2B` 要写「B to B」、`第五大` 要整词连写防停顿——已踩过的坑全收在 `scripts/readings.py`，`tts.py` 合成前自动扫描，命中且没写第二字段（或第二字段里原词还在）就打警告。**看到警告必须处理，别忽略**；踩了新坑回头把词条补进词典。
- **不用破折号、少用括号**，TTS 的停顿会怪。
- **开头 7 句做钩子**：现在的数字 → 反差 → 一句「得把它的时间线拉出来看」引出全片。
- **段落之间用注释隔开**（`# ---- 2016 危机 ----`），后面排 `segs` 和画面节点都用得上。
- **结尾三到四句往上抬**，最后一句要短、能单独成立（「下一段路，才刚开始」）。
- 全篇 65–90 句。少于 60 句撑不满 4 分钟，多于 95 句节奏会散。

## 3. 事实核查第一轮（渲染前必须做完）

见 `references/事实核查.md`。**这一步放在配音之前**，因为核查改文案后要重新配音；反过来做就要重渲整片，白等十几分钟。

按六类硬信息逐条核：数字、日期、引语、名次/首次、因果、绝对说法。查出的问题直接在 `LINES` 里改，并记进 `docs/<期>-核查.json` 的 `checks`。

三条纪律：

1. **条数不变**（改文本可以，增删句子会让后面所有 `cf(n)` 错位）。
2. 改完 **grep 一遍所有 `cw(n,'词')` 的锚词还在不在新句子里**。
3. 画面文字也要同步改（等第 6 步写画面时直接写准确的版本）。

## 4. 配音 + 时间轴

```sh
# 先干跑一遍：只解析和检查，不联网。读音陷阱、句长、破折号的警告都在这一步看
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep <期> --dry-run

# 没警告（或确认警告都处理了）再正式合成
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep <期>
```

输出 `public/audio/<期>/voice.wav`（48kHz 立体声）和 `src/episodes/<期>/cues.json`（每句起止秒）。

- 脚本会逐句合成、实测时长、按 LEAD 0.45 / GAP 0.22 / TAIL 0.9 拼成整轨，并反推每句的起止。**画面只要跟着 `cf(n)` 写，就一定和声音对齐**，不用手猜。
- 一次连发几十条会被微软端点 503 限流，脚本已带退避重试（7 次）+ 句间 0.25 秒节流。**别中途 Ctrl-C**，重跑要 4 分钟。
- 想换音色：`--voice zh-CN-XiaoyiNeural`（晓伊）/ `--pitch -6Hz`（更低）/ `--rate +22%`（更慢）。**换发音人一定改变总时长**，后面的时间轴会自动跟随，但配乐必须重跑。
- 跑完记住 `VOICE_SECONDS = 最后一句 end + TAIL`，第 7 步要用。

## 5. `timeline.ts`：坐标系和命运线

照 `ep52/timeline.ts` 改。只有四块：

```ts
export const WORLD_W = 26500;          // 桌面总宽，按节点数量定：16 节点约 26000
export const RULER_Y = 930;
const ANCHORS: [number, number][] = [  // 年份 → x，非线性
  [2010, 0], [2016.2, 5200], [2018.6, 9000], [2025.5, 20000], [2026.8, 26500],
];
export const yx = (year: number) => lerp(ANCHORS, year, 0);
export const xy = (x: number) => lerp(ANCHORS, x, 1);
export const CAP: [number, number][] = [...];   // [年份, 数值]
export const capY = (v: number) => 820 - 340 * (Math.log10(v) - Math.log10(CAP_FLOOR));
```

要点：

- **`ANCHORS` 决定桌面疏密**。故事密度高的年份拉宽（这一期把 2016 危机和 2025.6–2026.8 拉得很宽），其余按年份线性。
- **所有节点的 x 都写 `yx(年份)`**，绝不手写数字，否则改 `ANCHORS` 后全部错位。
- **命运线的数值要真实、要标「示意」**。对数刻度让早期和晚期都能看清。
- **`timeline.ts` 不能 import 任何 `.ts` / `.tsx`**（会被 Node 直接加载）。

## 6. `art.tsx` + `film.tsx`：道具和画面

见 `references/画面与桌面.md`。

**`art.tsx`（本期原创道具）**：每个题材都要有自己的东西。这一期是小米粥锅、手机、logo、车侧影、芯片、订单堆、奶茶杯。纯 SVG，随 `s` 缩放。

**`film.tsx`（画面主体）**，结构固定：

```tsx
const X = {found: yx(2010.3), mi1: yx(2011.65), /* ... */};   // 节点横坐标表
const CAM: CamKey[] = [                                        // 相机路线
  {f: 0, x: X.now - 330, y: 430, z: 1.28},
  {f: cf(8) - 2, x: X.found - 80, y: 470, z: 1.1, ease: 'tail', dur: 30},
];
const Founding: React.FC<{f: number}> = ({f}) => ( /* 一个节点 4–8 个元素 */ );
export const Film: React.FC<{f: number}> = ({f}) => (
  <World cam={camAt(f, CAM)} w={W} h={H}>
    <Desk ... /><DeskLitter /><CapGrid /><Ruler /><CapLine />
    <Now f={f} /><Founding f={f} />{/* ...每个节点一个 */}<Now2 f={f} />
  </World>
);
export const FILM_SFX: SfxCue[] = [...];
```

硬规则：

- **`<At f at until>`** 控制出现，`at` 用 `cf(n)` 或 `cw(n,'词')`。
- **钩子和开场场景的元素必须写 `until`**（收到下一节点前），否则会一直留在桌面上，播到结尾还挤在画面里。这是这一期踩过的坑。
- **跨段的便签 / 印章 / 索引卡也要 `until`**，不然会压住下一个节点的大字。
- 相机每个节点两个关键帧：`cf(段首)-4` 用 `tail` 摆位，`cf(段中)` 用 `sine` 微推。
- 动画是帧号纯函数，随机只用 `seed` 参数。
- 不画真实肖像（用 `Portrait` 网点人像）、不画第三方 logo、示意都标「示意」。
- **右上角让给年份计数器**：HUD 实测占屏幕 `x 1518–1884 / y 28–178`（禁区取 `x ≥ 1490 / y ≤ 210`），它压在世界层上面，撞进去的内容只会露出半截字。叙事元素排布时用 `screenX = (worldX-cam.x)*z+960`、`screenY = (worldY-cam.y)*z+540` 代一遍，落在禁区的下移；灰色刻度、图例这类装饰用 `hudFade(wx, wy, w, h, cam)` 乘到 `opacity` 上自动淡出。细则见 `references/画面与桌面.md` 第八节第 3 条。

## 7. 装配

四个小文件，全是模板，照抄改名：

1. **`cues.ts`**
   ```ts
   export const VOICE_SECONDS = raw[raw.length - 1].end + 0.9;   // 和第 4 步的 TAIL 一致
   export const {CUES, DURATION, cf, ce, cw, cueAt} = makeCues(raw, VOICE_SECONDS);
   ```
2. **`Ep<NN>Xxx.tsx`**：`VoxShow` 配置（`Film`、`FILM_SFX`、`duration`、`cueAt`、`voice`、`bgm`、`w/h`、`subY: 965`、`keywords`、`cover: {C, frames: 8}`）。
3. **`Cover.tsx`**（16:9 首帧）+ **`CoverTall.tsx`**（3:4）。
4. **`src/Root.tsx`**：在 `<Folder name="04-Vox科普">` 里最近一期后面注册
   ```tsx
   <Composition id="<期>" component={...} durationInFrames={...} fps={FPS} width={1920} height={1080} defaultProps={mix} />
   <Still id="<期>-cover-tall" component={...} width={1080} height={1440} />
   ```

然后 `tsc --noEmit` 必须过（这一期改了 `VoxShow` 让 `voice`/`bgm` 可选，可以没配乐）。

## 8. 配乐总谱

照 `audio/episodes/ep52-xiaomi-history.mjs` 改，跑：

```sh
node audio/episodes/<期>.mjs
```

- **一段一个情绪**，段边界全部用 `cs(n)` / `cwT(n,'词')` 表达，这样改字幕时间轴配乐自动跟随。
- 结构跟叙事同构：钩子用不协和 + 钟表滴答；上升段加鼓；**崩溃段用 `sink()`（下坠音 + 低沉 boom + 抽掉鼓）**；冲顶段升调 + 镲 + 重击；收尾停在悬着的和弦。
- **一个四音动机贯穿全片**，每次出现配器更满（这一期是 C–E–G–C）。
- 配乐会读 `voice.wav` 算人声包络自动闪避（depth 0.7），所以**换配音后必须重跑**。
- 脚本会打印每段闪避前后的响度，看动态范围是否合理（这一期最响 −19 dB、最轻 −31 dB，差 12 dB 算好）。

## 9. 抽查 → 渲染

```sh
# 抽查关键帧（改画面后先做这个，别直接渲整片）
node .workbuddy/skills/weilanx-creator-timeline-video/scripts/frames.mjs <期> --cues 1,8,23,43,85
```

逐张 Read，看五件事：**元素有没有叠、字有没有出画、命运线和年份计数器是否同步、该撤的有没有撤、右上角有没有被 HUD 切掉半截**。改完只重渲那一帧。

```sh
# 整片（先取一次交付目录：D=$(node .../out-dir.mjs <期>)）
export NODE_OPTIONS=--max-old-space-size=4096
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts <期> out/<期>/成片/<期>.mp4 --concurrency=4 --log=error
```

约 8–12 分钟（7000 帧）。渲完 `ffprobe` 看时长 / 帧数 / 音轨，`volumedetect` 看均值（−22 左右）和峰值（不高于 −3 dB）。

**出片前最后一遍核查**：股价、市值、交付量这类会变的数字，**在渲染前重新查一次**。改了就要重跑第 4 步（配音会变）→ 第 8 步（配乐）→ 渲染。所以这一步尽量压到渲染前一刻。

## 10. 封面（三版都出）+ 抖音文案

**每期固定出三张，不是三选一**：16:9 给 B 站 / YouTube / 视频号 / 公众号，4:3 给抖音横版 / 公众号首图，3:4 给抖音 / 小红书。
三个比例构图差太远，修一张改不了另一张，所以三套组件都要写：

| 用途 | 组件 | Root 注册 | 尺寸 | 输出 |
|---|---|---|---|---|
| 16:9（也是片子第 0 帧） | `Cover.tsx` 的 `Ep<NN>Cover` | `<Still id="<期>-cover-wide" component={Ep<NN>Cover} width={1920} height={1080} />` | 1920×1080 | `封面/封面-16x9.png` |
| 4:3 | `Cover43.tsx` 的 `Ep<NN>Cover43` | `<Still id="<期>-cover-43" component={Ep<NN>Cover43} width={1440} height={1080} />` | 1440×1080 | `封面/封面-4x3.png` |
| 3:4 | `CoverTall.tsx` 的 `Ep<NN>CoverTall` | `<Still id="<期>-cover-tall" component={Ep<NN>CoverTall} width={1080} height={1440} />` | 1080×1440 | `封面/封面-3x4.png` |

```sh
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-wide out/<期>/封面/封面-16x9.png
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-43 out/<期>/封面/封面-4x3.png
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-cover-tall out/<期>/封面/封面-3x4.png
```

`Ep<NN>Cover` 的 props 写成 **`{f?: number}`**。声明成 `{f: number}` 时 `Still` 不传参会报 TS2552/TS2741，整个 Root 编不过。

**4:3（1440×1080）**：左黑卡的字全部走 `library/vox/Cover43.tsx` 的 `VoxCover43` 模板（`kicker` / `title` / `years` / `hook` / `index` 五个 props），右栏主视觉用 `visual` 按 1440×1080 坐标自己画。**不要拿 16:9 裁一刀**——1440 放不下 1060 卡 + 690 图纸，裁完会把照片和贴纸切掉。具体坐标差异与版式禁区见 `references/发布文案.md` 第二节。

**竖版（1080×1440）**：上 2/3 主视觉、下 1/3 标题，主标题 ≤ 14 字，最多 3 个视觉元素，留白 ≥ 60px。**任何道具都不能压到标题区域**（ep52 那期的车压住了副题）。

**横版（1920×1080）**——和竖版差别很大，别把竖版直接缩放：

- **左半幅立字、右半幅放主视觉**。1080 高放不下竖版那四层（标题 / 副题 / 主视觉 / 钩子），上下堆一定挤。
- 标题字号约为竖版的 **70%**（竖版 186 → 横版 130–150），再大就压到右边。
- **右侧留 240–260px 平台角标区**（时长、UP 头像），主体信息不许进去。
- 钩子压在画面 **86% 高处**（竖版是 1234/1440，同一个比例），中间大片留白是呼吸，不是没做完；但第一组（标题 + 副题 + 主视觉）要有一条线收边，否则看着像半成品。
- 横版是信息流里的第一个画面，**只留一个数**。竖版能塞「起家 → 收尾」两个，横版塞三个就没人读了。

自检：横版缩到 480px 宽、竖版缩到 300px 宽，各看一遍——**主标题认得出、钩子读得完**。

- **抖音标题**：一个主推 + 两个备选，≤ 25 字，前 8 字必须有信息，不用「震惊/必看」，数字必须和片里一致。
- **抖音描述**：**一句话，≤ 32 字**。只补标题没说出口的那半句——不重复标题、不写 `→` 时间节点流水账。下面挂一行「数据截至 … · 不构成投资建议」（合规，不能省）+ 5–8 个话题标签。写长是小红书正文的事。
- 存 `out/<期>/文案/发布文案.md`。

## 11. 文稿核查表 + 交付

```sh
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/doc.py --ep <期>
```

前提是 `docs/<期>-核查.json` 已经写好（`segs` 连续覆盖全部句子，`checks` 每条带具体来源）。产出 `docs/<期>-口播文稿与事实核查.md`，**复制一份到 `out/<期>/文档/`**。

交付时**一次性给齐**（全部在 `out/<期>/` 下，不许散在 `out/` 根）：

| 文件 | 说明 |
|---|---|
| `out/<期>/成片/<期>.mp4` | 成片 1920×1080 / 30fps / H.264 + AAC |
| `out/<期>/封面/封面-16x9.png` | 1920×1080 横版封面（B 站 / YouTube / 视频号） |
| `out/<期>/封面/封面-4x3.png` | 1440×1080 横版封面（抖音横版 / 公众号首图） |
| `out/<期>/封面/封面-3x4.png` | 1080×1440 竖版封面（抖音 / 小红书） |
| `out/<期>/文案/发布文案.md` | 抖音标题 3 个（标推荐）+ 描述 + 话题 |
| `out/<期>/文档/<期>-口播文稿与事实核查.md` | 文稿 + 逐条核查 + 修正记录 |
| `out/<期>/抽帧/` | 自查帧，交付后可留可删 |
| `audio/<期>/voice.wav` | 人声（要换真人录音时覆盖它） |
| `audio/episodes/<期>.mjs` | 配乐总谱 |

交付报告要说清楚：

1. 成片规格、时长、响度、Studio 地址 `http://localhost:3000/<期>`。
2. 选题和结构：几次起落、几个桌面节点、命运线画的是什么。
3. **核查结果**：改了哪几条（原话 vs 实际）、哪几条存疑需要他自己拍板、哪些数字有保鲜期。
4. 替他定了什么（标题、期号、音色、封面主标题）。
5. 抽查发现并修掉的问题、还剩什么小瑕疵。
6. **听感只能他自己听**，你只报数字。

---

## 踩过的坑

- **钩子场景不写 `until` 会一直留在桌上**，播到结尾还在画面里挤着。所有非本段元素都要给 `until`。
- **跨段便签压大字**：MIUI 段的「后来所有争议」便签留到了 798 那一拍，把「30 万台」压住。改完必须抽帧看。
- **换发音人会改总时长**：云健 254.79s → 晓晓 237.39s，差 17 秒。`cues.json` 会自动重算、`cf(n)` 全部跟随，`film.tsx` 一行不用改 —— **但配乐必须重跑**（它读 voice.wav 算包络）。
- **npm scripts 在 Windows 上会崩**：`package.json` 里 `NODE_OPTIONS=xxx remotion studio` 这种 bash 语法在 cmd.exe 下报「不是内部或外部命令」。**绕开 `npm run`**，直接 `export NODE_OPTIONS=... && node node_modules/@remotion/cli/remotion-cli.js ...`。
- **改文案时条数不能变**：增删句子会让后面所有 `cf(n)` 错位。真要多写，写完把所有 `cf` 重排一遍。
- **`cw(n,'词')` 的词必须还在那句里**，否则渲染时报「cue n 里没有某词」。
- **画面硬编码文字必须跟着口播改**：口播说「掉到第五」，画面印章还写「跌出前五」，观众一截图就挂出来。
- **股价类数字有保鲜期**：9 月的数据用到 10 月底就错了。出片当天重取，或者用「近 7000 亿」这种留余量的说法。
- **edge-tts 会 503 限流**：一次连发 85 条几乎必被拦，重试是必需的。
- `tts.py` 和 `doc.py` 用 `python` 跑；如果系统 `python` 是 3.8，用装了 edge-tts 的那个解释器（`python -m venv` 建的环境里的 `Scripts/python.exe`）。
- **横版封面直接缩竖版** → 1080 高放不下四层，一定挤。横版要重新排：左半幅字、右半幅图，标题降到竖版的 70%。
- **16:9 裁成 4:3** → 裁完右栏的照片、贴纸、企鹅全被切掉。4:3 用 `VoxCover43` 重排：左卡 1060→700、图纸 690×470→570×400，标签一律贴图纸四角，别放中段压曲线。
- **`Ep<NN>Cover` 声明成 `{f: number}`** → 注册成 `Still` 时 `Still` 不传 `f`，整个 Root 编不过。改成 `{f?: number}`。
- **交付物平铺 `out/` 根** → 连着做两期就分不清哪个文件是谁的。一律进 `out/<期>/成片|封面|文案|抽帧|文档`。
