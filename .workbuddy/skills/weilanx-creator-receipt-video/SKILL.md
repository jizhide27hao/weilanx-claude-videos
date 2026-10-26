---
name: weilanx-creator-receipt-video
description: 「账单纸带风 · 竖屏数据解读短视频」一键成片工作流。用户给一个选题名称或一份文档（研究报告、统计年鉴、行业白皮书、调查报告），就一条龙做完：核数据口径 → 从数据里挖反转叙事点 → 写人话口播稿并编号 → edge-tts 配音反推句级时间轴 → 用 `cf(n)` 把画面钉在每一句上 → 铺一张会「跟着金额长」的热敏纸小票 → 加音效并给配音做闪避 → 渲染竖屏 1080×1920 成片 → 出 3:4 封面、抖音文案、标签、AI 生图提示词。画面全由代码画（冷白纸、深墨绿台面、齿孔、点阵字体、红章、撕纸），没有真实素材也没有主持人。适合「一份报告里的一笔账」这类题材：把总额拆成阶段、拆成类目、做地区和方式对比、讲无法计价的那部分。用户说「按生育成本那期的形式做」「像养孩子要多少钱那样做一个」「把这个报告做成一个视频」「算一笔账做成视频」时都用这个 skill。**横屏公司史/发展史走 `weilanx-creator-timeline-video`，文献翻页长片走 `weilanx-creator-gilded-long-video`，不要混。**
---

# 一份报告 / 一个选题 → 一期竖屏账单风成片（一键到底）

> **目录约定**（沿用工程全局）：下文 `<期>` = 作品 ID（如 `ep60-child-cost`）。
> `src/episodes/<期>/`（代码）、`audio/lines/<期>.py`（文案）、`public/audio/<期>/`（voice.wav + sfx/）、`out/<期>/`（交付物）。
>
> 交付物一律进 `out/<期>/`，按类型分五个子目录，不许平铺在 `out/` 根：
>
> ```
> out/<期>/
> ├── 成片/   <期>-vN.mp4
> ├── 封面/   封面-3x4.png（抖音 / 小红书）· 需要横版时另出 16x9 / 4x3
> ├── 文案/   发布文案.md · 口播稿-v1.md
> ├── 抽帧/   自查帧
> └── 文档/   生图提示词.md · 视觉方案.html
> ```

用户只给一个选题或一份文档 = 授权你从头做到交付，**中途不停不问**。交付物：成片 mp4、封面、抖音标题描述标签、口播稿。

只有两种情况停下来：① 数据口径两种来源互相矛盾且无法判定，且影响全片立意；② 工具连续失败两次（TTS 端点挂了、渲染两次崩溃）。

**样片：`ep60-child-cost`（养一个孩子要多少钱，4:39 / 94 句）**。新一期照着它的代码改，**不要从空白写**：

```
src/episodes/ep60-child-cost/
├── data.ts                 全部数据，一处改全局生效（AGES / LINES / STAGES / BY_CATEGORY / PLAIN_CATEGORY ...）
├── cues.ts / cues.json     SEG 段落边界（由 tts.py 生成 cues.json，不要手写）
├── v2-top.tsx              SceneOpen / SceneTurn / StageScene / OverviewScene
├── v2-bottom.tsx           RegionScene / MethodScene / KidsScene / BackScene / EndScene
├── Ep60FilmV2.tsx          装配 + 字幕 + 音效表 + 配音闪避
└── CoverTall.tsx           3:4 封面（纯静态，still 直接出图）
src/library/receipt/theme.ts  配色 R / 字体 RF / 纸纹常量
src/library/receipt/kit.tsx   Desk / Paper / ReceiptRow / StageHead / StageRow / Caption / Stamp
audio/lines/ep60-child-cost.py  94 句文案
public/audio/ep60-child-cost/   voice.wav + sfx/{paper,type,click,stamp,whoosh,snip,ding}.wav
```

动手前读：工程根 `AGENTS.md` / `CLAUDE.md`、`src/library/receipt/`、本 skill 的三份 `references/`。

## 规格（默认值）

| 项 | 默认 |
|---|---|
| 画面 | **竖屏 1080×1920**、30fps，热敏纸小票从上往下吐出，纵向运动（区别于长卷版的横向漫游） |
| 时长 | 3:30 – 5:00（80–100 句，平均 2.6–3 秒/句） |
| 口播 | **有**，edge-tts `zh-CN-XiaoxiaoNeural` + `rate +25%` + `pitch -2Hz` |
| 字幕 | **内嵌**（竖屏不能外挂），底部烧录，一句一条，直接读 `cueAt` |
| 配乐 | **默认不加**。这套冷风格 + 满屏数字，BGM 只会抢注意力。用户明确要再加 |
| 音效 | 七种：paper / type / click / stamp / whoosh / snip / ding，全部走 EQ 处理过的副本 |
| 封面 | **3:4 必出**（1080×1440）。要发 B 站 / 视频号 / 公众号时另出 16:9 和 4:3，必须重排版，不许裁切 |
| 交付 | `out/<期>/成片/<期>-vN.mp4`、`out/<期>/封面/封面-3x4.png`、`out/<期>/文案/发布文案.md` |

## 依赖

- **配音**：`edge-tts`（免费、无需 key、**需要联网**）。装：`pip install edge-tts`。
- **ffmpeg / ffprobe**：必须在 PATH（音效 EQ、响度检测、抽帧、音轨差分验证）。
- **画面**：全代码 + 一个字体文件 `public/fonts/receipt/VT323-Regular.ttf`（OFL，144KB，已在库里）。

---

## 0. 先判断这个题该不该走这个 skill

**走这里**：一份报告里的**一笔账**，有总额、能拆成阶段、能拆成类目、能做地区或方式对比、还有一部分「算不出来的成本」。典型：养育成本、养老成本、买房成本、考研成本、看病自费、通勤时间账。

**不走这里**：一家公司几十年的起落（→ timeline-video）、一个知识点的文献考证（→ gilded-long-video）、一个概念的解释（→ 其他短片 skill）。

判断一句话：**主角是「一个数字」还是「一条时间线」**。是数字，走这里。

## 1. 定选题、期号、建目录

- **期号必须现场查，禁止凭记忆定**（用户 2026-10-25 明确纠正过）：
  `ls src/episodes/` 和 `ls out/` 取实际最大号 + 1。对话摘要里的「最新是 epNN」一律过期。
- 作品 ID `epNN-英文短名`，**期号目录不带风格后缀**。
- 标题：`<一句话问题>`，例「养一个孩子要多少钱」「买一套房到底付了几次钱」。用问句，不要用陈述句。
- 建目录：`src/episodes/<期>/`、`public/audio/<期>/sfx/`、`out/<期>/{成片,封面,文案,抽帧,文档}`。**现在就建。**

## 2. 读数据：口径是第一位的

见 `references/数据口径.md`。这一步做不扎实，后面每一版都在返工（ep60 因为口径问题返工了 4 次）。

四条硬纪律：

1. **先把总账口径的「年数/月数」算平**。例：月均 2,543.84 × 228 个月 = 579,996 → 是 **−1 岁到 17 岁共 19 个年份**，不是 18 年。观众会自己乘一遍，**乘不平的一定会被评论区抓到**。
2. **金额列一律给累计值**，并在表头写明「累计支出，按全年摊平」。只给「每月」会被问「这 554 块怎么一年到头都一样」。
3. **跨口径的数字绝不能并列比较**。例：58 万是全国分摊口径，28.9 万是核心区净增口径，两个数当面比就是错的。
4. **矩阵比合计行值钱**。报告里的「阶段 × 类目」交叉表是叙事金矿（ep60 从里面挖出「医疗降、教育升，交叉点在 3 岁」这条全片最好的线）。**别只用合计行。**

读到数据后立刻做三件事：

- 列一张「所有要上画面的数字 → 出处页码/表号」的核对表。
- 找出 **2–3 个反直觉的点**，这就是全片结构：① 总额里最大的一笔不是大家以为的那个；② 两条曲线交叉；③ 平均数 vs 中位数差距巨大。
- 确认「算不出来的那部分」（时间、机会、健康）在报告里有没有量化，有就上画面，没有就明确说「报告没算」。

## 3. 写口播稿（先稿子，后代码）

**顺序不能反**。ep60 的教训：先写代码再改稿，等于把排版重做三遍。先交付 `out/<期>/文案/口播稿-v1.md`（分段 + 每段画面设计 + 数据核对表），用户确认后再动代码。

结构模板（七段，可增删）：

| 段 | 作用 | 时长占比 |
|---|---|---|
| 钩子 | 抛总额，立刻说它「有两个问题」 | 5% |
| 总账 | 一屏 8 行两列，从第一段到总额 | 10% |
| **阶段特写**（核心） | 每阶段一屏，8 条类目横条，重点那类描红 | 35% |
| 总览 | 八段堆叠条 + 常驻图例 | 10% |
| 对比 | 地区 / 方式 / 孩次 | 20% |
| 边际 / 背面 | 递减规律、算不出来的成本 | 15% |
| 收尾 | 一句问句把球踢给观众 + 数据来源注脚 | 5% |

写法规则：

- **一句 8–20 字**，最长 26。短句是这套风格的命。
- **说人话，不用统计口径词**。这条被用户明确要求过：
  - 「备孕·胎儿期」→「孕检、婴儿床、住院、月子」
  - 「文教娱乐」→「上学」
  - 「交通通信」→「出行」
  - 「衣着」→「穿」，「饮食」→「吃」，「居住」→「住」
  - 短标签数组固定 `SHORT = ['吃','穿','住','日用','出行','医疗','上学','其他']`（**注意是「医疗」不是「看病」**）
- **数字写阿拉伯数字**，TTS 读不准的用第二字段给汉字版：`("每月 2,543.84", "每月两千五百四十三点八四")`。
- **一句话一件事**，一句里不塞两个因果。
- **段落之间用注释隔开**（`# ---- 阶段：0 岁 ----`），后面排 `SEG` 直接引用句号。
- 结尾留一句问句（「你家养娃，每个月大概花多少？」）+ 片尾**必须**有数据来源注脚（报告名 + 数据年份）。
- 全篇 80–100 句。

## 4. 配音 + 句级时间轴

```sh
# 先干跑：只解析检查，不联网。读音陷阱、句长、破折号警告都在这步看
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep <期> --dry-run

# 警告都处理了再正式合成
python .workbuddy/skills/weilanx-creator-timeline-video/scripts/tts.py --ep <期>
```

输出 `public/audio/<期>/voice.wav` 和 `src/episodes/<期>/cues.json`（每句起止秒）。

**句锚定机制是这套流程的核心，必须理解**：

```ts
// cues.ts
export const VOICE_SECONDS = 279.39;              // 最后一句 end + TAIL
const m = makeCues(raw as Cue[], VOICE_SECONDS);
export const cf = m.cf;      // 第 n 句开始的帧
export const ce = m.ce;      // 第 n 句结束的帧
export const cw = m.cw;      // 第 n 句里某个短语开始的帧（按字符位置插值）
export const cueAt = m.cueAt; // 当前帧正在说的那句

export const SEG = {
  hook:  {from: 0,       to: cf(6)  - 8},
  ledger:{from: cf(6)-8, to: cf(14) - 8},
  ...
};
```

- **所有段落边界用 `cf(n) - 8` 算，绝不手猜帧号**。改了台词重跑 TTS，画面自动跟着走，一行代码不用改。
- **`SEG` 的 `from` 必须是上一段的 `to`**，链要闭合。
- **改 `GAP` / `RATE` / 发音人 → 必须重跑 TTS**。只回退代码不回退音频，studio 里音画会错位。
- **回退配音参数也要重跑 TTS**（v10 覆盖了 voice.wav，回退到 v9 时重跑了一次，279.39s 完全一致 —— edge-tts 是确定性的）。
- **条数不能变**。增删句子会让后面所有 `cf(n)` 整体错位。要改就改文本，不增不减。
- 改完台词 **grep 一遍所有 `cw(n,'词')` 的锚词还在不在新句子里**。

## 5. `data.ts`：数据层

照 `ep60/data.ts` 改。所有数字只在这里出现一次：

```ts
export const AGES: AgeBand[] = [...]              // 8 个阶段：段名 / 月数 / 月均
export const LINES: Line[] = build()              // 展开成逐月（或逐期）明细
export const STAGES: Stage[]                      // 每段 {age, months, monthly, total, cum}
export const TOTAL = LINES[LINES.length - 1].cum
export const BY_CATEGORY: Record<string, number[]> // 阶段 × 类目 矩阵（元/月）
export const PLAIN_CATEGORY                        // 类目名 → 人话解释 + 全程均值
export const STAGE_PLAIN                           // 阶段名 → 人话解释
export const money / money0                        // 千分位格式化
```

要点：

- **`data.ts` 不能 import 任何 `.tsx`**。
- 累计值用 `cum`，画面上标注「累计」。
- 数字格式化统一走 `money()`，别在各场景里手写 `toLocaleString`。
- 报告里的口径说明（比如「−1 岁是建模约定不是统计事实」）写成注释留在数据旁边，写文案时会用到。

## 6. 画面：`library/receipt` 组件 + 场景

见 `references/画面与纸带.md`。

复用组件（`src/library/receipt/kit.tsx`）：

| 组件 | 用途 |
|---|---|
| `Desk` | 深墨绿台面（含顶光渐变） |
| `Paper` | 纸：齿孔 + 52px 横纹 + 顶部柔光 + 可选底部撕口 |
| `ReceiptRow` | 单行：序号 / 年龄 / 说明 / 点线 / 金额，`progress` 控制从左往右打印，`head` 给行尾墨块光标 |
| `StageHead` / `StageRow` | 总账表头和 8 行两列 |
| `Caption` | 底部结论句 |
| `Stamp` | 双线红章，缩放砸下 |

场景组件分成两个文件（`v2-top.tsx` / `v2-bottom.tsx`），一个 `Ep<NN>Film.tsx` 装配。

### 三条必须遵守的画面规律

1. **纸必须「跟着内容长」，不能固定高度**：
   `paperH = max(1180, FIRST_Y + smoothIdx * LINE_H + 190)`
   固定高度会让后半屏一大片空白纸 —— 「纸的长度 = 花掉的钱」这个隐喻就废了。
2. **打印时长必须短于行间隔**：`printLen = gap * 0.85`。否则上一行没打完下一行就来了，两行打架。
3. **分区条件要用「下一段的起点」，不是自己段的终点**：
   ```tsx
   {f < SEG.turn.from ? <SceneOpen /> : null}          // ✅
   {f < SEG.ledger.from ? <SceneOpen /> : null}        // ❌ 会出现整段空白
   ```
   这个 bug 在 ep60 上造成 413–1056 帧全部黑屏，只有抽帧才看得到。

### 镜头动作（六种，够用，别发明新的）

打印 / 滚纸（纵向）/ 盖章 / 撕纸（**上下撕**，下半截坠落出画）/ 划线（红笔）/ 翻面。

## 7. 装配 + 音效 + 闪避

照 `Ep60FilmV2.tsx`。三个部分：

**① 字幕**（内嵌，读 `cueAt`）：

```tsx
const cue = cueAt(f);       // 自动处理句间空隙
// 顶边 y = 1683，所以所有纸底必须 ≤ 1600
```

**② 音效表**（`Sfx` 组件 + `<Sequence>`）：

```tsx
<Sfx at={18}        name="paper"  vol={1} />
<Sfx at={cf(1) - 4} name="type"   vol={1} rate={0.9} />
<Sfx at={cf(3) - 2} name="stamp"  vol={1} rate={1.1} />
{[0..7].map(i => <Sfx at={cf(7) + i * 12} name="type" vol={1} rate={1.05} />)}
{sfx 表.map(s => <Sfx at={s.seg.from + 2} name="whoosh" vol={1} rate={1.2} />)}
```

映射惯例：paper=纸落 / type=打印一行 / click=高亮切换 / stamp=合计与关键数字 / whoosh=每次换场 / snip=撕纸 / ding=收尾。

**③ 配音闪避（不能省）**：

```tsx
<Audio src={staticFile('audio/<期>/voice.wav')}
  volume={(f) => {
    let v = 0.72;   // 配音压到 0.72，音效统一 1.0
    for (const t of [18, cf(13), cf(63), cf(66), cf(69)]) {
      const d = Math.abs(f - t);
      if (d < 16) v *= 0.3 + 0.7 * (d / 16);
    }
    return v;
  }} />
```

**音效必须先做 EQ，否则听不见**。见下节。

## 8. 音效：EQ + 电平

**问题**：配音 RMS ≈ 2500，撕纸音效满音量 RMS 只有 1800，频段还重叠 → 混完了完全听不见（ep60 排查了三轮才发现，差分证明音效确实混进去了，只是被盖住）。

**解法两层**：

```sh
# 1) 生成处理过的音效副本（scripts/sfx-eq.sh）
bash .workbuddy/skills/weilanx-creator-receipt-video/scripts/sfx-eq.sh <期>
# equalizer f=2600 g=5 + equalizer f=5200 g=3 + volume=-6dB
# 把能量往 2.6k/5.2k 推，从配音的中低频里钻出来
```

- **别用 `alimiter`**：`limit=0.88` 时输出仍有 −1.0 样本（attack 瞬态超调）。用纯 `volume` 增益，峰值从 32768 降到 15–25k，clip=0。
- 2) 配音 `volume=0.72`，音效 `volume=1.0`，相对比从 1:0.5 拉到 1:0.83，再叠闪避。

**验证方法**（别靠耳朵猜）：ffmpeg 从成片抽音轨，和 voice.wav 降采样对齐做差分，看静音段/说话段/打字段的残差。残差为 0 = 真没混进去；残差大但听不见 = 被盖住。

## 9. 抽查 → 渲染

```sh
# 抽查关键帧：改画面后先做这个，别直接渲整片
node node_modules/@remotion/cli/remotion-cli.js still src/index.ts <期>-v2 out/<期>/抽帧/chk-<n>.png --frame=<n>
```

**渲染（本机内存只有 ~2.7GB，必须用低并发）**：

```sh
export NODE_OPTIONS=--max-old-space-size=3072
node node_modules/@remotion/cli/remotion-cli.js render src/index.ts <期>-v2 \
  "out/<期>/成片/<期>-v14.mp4" --concurrency=2 --crf=18 --log=error
```

- 默认并发会报 `Chrome ran out of memory or disk space`。8382 帧（4:39）约 14 分钟。
- **别用 `npm run export`**：Windows 上 npm 用 cmd.exe 执行 scripts，`NODE_OPTIONS=...` 这种 bash 前缀语法会直接报错。在 Git Bash 里 `export` 后直接调 cli.js。
- 每次 bundle 在 `%TEMP%` 留一个 618MB 的 `remotion-webpack-bundle-*`，攒多了把 C 盘吃满 → 成片音频合并那步报 "Conversion failed!"（看起来像音轨问题，实际是磁盘满）。C 盘留 8GB 以上。
- 抽帧要覆盖：开场大数字、每个阶段特写至少一帧、撕纸瞬间、片尾注脚。

## 10. 封面 + 抖音文案 + 标签

见 `references/发布与封面.md`。

- **3:4（1080×1440）必出**，写 `CoverTall.tsx`（纯静态，不读 `useCurrentFrame`），注册 `durationInFrames={1}` 的 composition，用 `still` 出图。
- 三层信息：大数字 → 标题（两行）→ 口径小字。**不放视频里的装饰元素**（红线缩到缩略图会糊成一条脏线）。
- 要横版（16:9 / 4:3）时**重排版**，不许裁切 —— 这套是竖屏形式，横版没有现成模板。
- 抖音描述 **≤32 字一句话，必须自带主题词**。见 references 里的完整规则和已踩的坑。
- 标签 **3–5 个**，第一位放最精准的词。
- 用户说封面「效果不好要提示词」时，**他要的是能直接出成品的提示词**，不是「AI 出底图你后期加字」的工艺流程。

## 11. 交付

最后一次交给用户，并说明你替他定了什么：

```
out/<期>/成片/<期>-vN.mp4        竖屏 1080×1920
out/<期>/封面/封面-3x4.png
out/<期>/文案/发布文案.md          抖音描述 + 挂载行 + 标签 + 备选 + 发布备注
out/<期>/文案/口播稿-v1.md        逐句稿 + 分段画面设计
out/<期>/文档/生图提示词.md        AI 封面提示词（可直接出成品）
```

汇报时写清楚：① 数据是哪一年的口径；② 哪些数字是跨口径不能并列；③ 评论区最可能被问的三件事（提前备好答案）。

---

## 踩过的坑

**数据 / 表述**

- 观众会自己乘一遍总额。**月均 × 月数 ≠ 总额**的写法一定被抓。先把年数/月数算平再写稿。
- 「每月固定 554.86」会被质疑 → 金额列改累计，表头标「累计支出，按全年摊平」。
- 两个不同口径的数字并排（58 万 vs 28.9 万）是错的，不能当对比讲。
- 阶段合并会让数据串行：ep60 把 1 岁和 2 岁并成一屏，口播说 1 岁医疗 360（其实是 2 岁的数）。**一屏一个阶段，别合并。**
- 图例的对比线必须**同起点**：两条曲线一个从 0 岁起、一个从孕前起，看着像教育一开始就更高。统一后加注解（「0-2 岁主要是绘本玩具」）。

**画面**

- 纸固定高度 → 后半屏一大片死白。**纸高必须跟着已打印行数增长。**
- 打印时长 ≥ 行间隔 → 两行打架。`printLen = gap * 0.85`。
- 分区条件用自己段的 `to` → 整段黑屏。**用下一段的 `from`。**
- 字幕顶边 y=1683，**纸底必须 ≤1600**，否则「有一小部分会盖住画板，不雅观」。
- 删除线角度 **要么 0–4°、要么 25°+，绝不要 8–15°**。中间区间人眼判为「画歪了」而不是风格。手写感来自**不平行 + 长度不等 + 起点错开**，不是加波浪。路径坐标要对着**字形实际范围**算（132px 字号盒子 158，字形只有约 95）。
- 手机端数字普遍偏小。放大 20–25% 时**必须同步改列宽**，否则溢出（见 references 的对照表）。

**音频**

- 音效混进去了听不见 ≠ 没混进去。用差分验证，然后 EQ + 降配音 + 闪避三件套。
- `alimiter` 会留下 −1.0 样本。用纯 `volume`。
- 改 `GAP` / 回退配音参数，**必须重跑 TTS**，否则音画错位。edge-tts 是确定性的，同文本同参数必然同结果，可以用来验证回退是否干净（`ffmpeg -i old.png -i new.png -lavfi psnr` 得到 `inf` 即逐像素一致）。

**工程**

- 期号凭记忆定会被纠正。**现场 `ls`**。
- Windows 上 `npm run xxx` 会因 `NODE_OPTIONS=` 前缀失败。走 Git Bash + 直接调 cli.js。
- C 盘被 webpack bundle 吃满会伪装成音频合并失败。

**交付物被否掉的两件事（记住用户的判断）**

- 提示词文档写「AI 只出底图、文字后期加」→ 被批「垃圾」。用户要的是**直接生成带中文成品**的提示词。
- 抖音文案只写数字对比不带主题词 → 被批「都没说明这个视频要讲的是什么」。信息流里文案独立成行，观众看不到封面标题。
