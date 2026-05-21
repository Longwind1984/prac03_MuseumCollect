# Inscription Reader — 铭文释读器 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/inscription-reader.md` (v1)
> Phase B4 · Priority P1 (杀手锏 wow moment 来源)
>
> v3 关键变化:
> - v1 字典 ~20 字 → v3 JINWEN_DICT 扩到 200+ 字
> - v1 无长卷专题 → ★ **v3 何尊长卷专题 (inscription-special.html, "宅兹中或" 杀手锏)**
> - v1 段位单纯按字数 → v3 段位 = (识字数) × (在不同器物上出现次数), 反 Skinner 修正
> - v1 字字 hover 单孤独 → v3 加"跨器物字轨迹" (该字在 7 件器中出现)
> - v3 加 caster mini card 联动 (识"毛公" 二字 → 弹毛公档案)
>
> 配套数据: `data-schema-v3.md §6` · 动机: `motivation-hooks-v3.md §1.5`
> 跨维度: `caster-focus` event bus EMITTER

---

## One-line purpose

把"铭文"从"图像"变成**可读文本**, 再变成**可学习的语言** — 用户每识一字累入段位 (初窥→入门→一段→二段→鉴师→大宗师), 在何尊长卷专题里亲手"摸到"'中国'二字最早的实物出处。**v3 必做: 何尊长卷专题 (inscription-special.html) 作为产品杀手锏 wow moment**。

---

## Visual description

### 主视图: 三栏切换释读器

```
┌── 毛公鼎铭释读器 ──────────────────────────────────────────────────┐
│  铭文 499 字 · 已识 47 / 段位"二段" · 距三段 113 字                  │
│ ─────────────────────────────────────────────────────────────── │
│                                                                      │
│  视图:  [● 拓片+释文]  [○ 拓片+白话]  [○ 三栏并列]  [○ 单拓片盲读] │
│                                                                      │
│  ╔══════════════════════════════════════════════════════════════╗  │
│  ║   ┌────────────────────────────────────────────────────────┐ ║  │
│  ║   │ [拓片层]  做旧黑白宣纸  字字独立可点                    │ ║  │
│  ║   │                                                          │ ║  │
│  ║   │ 王 若 曰 父 [歆] 不 [显] 文 武 受 命 ...                 │ ║  │
│  ║   │ ┊  ▼ hover                                              │ ║  │
│  ║   │ ┊  ╭─────────────────────────────────────╮              │ ║  │
│  ║   │ ┊  │ 若 ruò                               │              │ ║  │
│  ║   │ ┊  │ 金文原形:  𠰷  (SVG 渲染)            │              │ ║  │
│  ║   │ ┊  │  ┌──────────────┐                    │              │ ║  │
│  ║   │ ┊  │  │ 拓片局部放大   │ ← 1.5×            │              │ ║  │
│  ║   │ ┊  │  │   〈古字〉    │                    │              │ ║  │
│  ║   │ ┊  │  └──────────────┘                    │              │ ║  │
│  ║   │ ┊  │ 字义: 顺从 / 如此                     │              │ ║  │
│  ║   │ ┊  │ 本铭中: "王 这样 说道"                │              │ ║  │
│  ║   │ ┊  │ ─────────────────────────────       │              │ ║  │
│  ║   │ ┊  │ 你已识 4 次 (在 3 件器中)             │              │ ║  │
│  ║   │ ┊  │ 跨器轨迹: 毛公鼎/大盂鼎/史墙盘 →      │              │ ║  │
│  ║   │ ┊  ╰─────────────────────────────────────╯              │ ║  │
│  ║   │                                                          │ ║  │
│  ║   ├──[释文层] 衬线楷书 字间距宽 ──────────────────────────┤ ║  │
│  ║   │ 王 若 曰 父 [歆] 不 [显] 文 武 受 命                     │ ║  │
│  ║   │ 已识: 深色  · 未识: 浅灰 + ? 占位                      │ ║  │
│  ║   ├──[白话层] 思源宋体 16px ─────────────────────────────┤ ║  │
│  ║   │ 王 这样 说道: "父亲 (歆), 显赫 的 文 武 受 天命"        │ ║  │
│  ║   └────────────────────────────────────────────────────────┘ ║  │
│  ╚══════════════════════════════════════════════════════════════╝  │
│                                                                      │
│  下方 进度条:                                                        │
│  ███████░░░░░░░░░░░░░░░░░░░░░░░░░ 47/499 (9.4%)                   │
│  集齐: "毛公鼎释读完毕" 成就 (高难度长期目标)                        │
│                                                                      │
│  右栏 段位档案:                                                       │
│  ┌─── 金文识读 ───┐                                                  │
│  │ 累计识字: 187   │                                                 │
│  │ 跨器出现: 412 次│ ← v3 新指标                                     │
│  │ 段位: 二段       │ (印章 SVG)                                     │
│  │ 距三段: 113 字   │                                                │
│  │                  │                                                │
│  │ ➤ 推荐铭文:      │                                                │
│  │   大盂鼎          │ ← 含你未识字 78 个                            │
│  │   (周康王)        │                                                │
│  └──────────────────┘                                                │
└──────────────────────────────────────────────────────────────────────┘
```

### ★ 何尊长卷专题 (inscription-special.html, 杀手锏)

```
┌── 何尊·宅兹中国 长卷 ────────────────────────────────────────────────┐
│                                                                        │
│  全屏横向卷轴, 米黄做旧底, 火光摇曳照明  (slow 缓慢右滑展开)            │
│                                                                        │
│  当 前 进 度:  ▓▓▓░░░░░░░░░░░░░░░░░░  18/122  ← 字 字 reveal           │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                                                                │    │
│  │   王 唯 五 月 既 望  乙 卯 王 在 公 太 室 王                   │    │
│  │   ────────────  ───────  ───────                              │    │
│  │   1   2   3  4   5   6   7   8   9  10  11  12  13  14         │    │
│  │                                                                │    │
│  │   ▼ 到第 13-14 字: 朱砂圆圈框出 "中  或"  (zoom 1.8×)          │    │
│  │                                                                │    │
│  │   "宅 兹 中 或"                                                │    │
│  │              ↓ pinned hover                                    │    │
│  │   ╭────────────────────────────────────────╮                  │    │
│  │   │ "兹" = 这里                              │                  │    │
│  │   │ "中或" = "中央 之 邦"  (或 = 邦, 后加囗) │                  │    │
│  │   │ 释读: 居 于 中央 之 邦                    │                  │    │
│  │   │ ──────────────────────────              │                  │    │
│  │   │ ★ 这 是 '中国' 二字 第一次 落 在 青铜    │                  │    │
│  │   │   时代: 西周成王早期, 距今 约 3050 年    │                  │    │
│  │   ╰────────────────────────────────────────╯                  │    │
│  │                                                                │    │
│  │  [继续 →]   [我读完了]                                          │    │
│  │                                                                │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  完 成 长 卷 后:                                                        │
│   全屏 3s 庆祝 (克制, 不彩带):                                          │
│   "您 刚 读完 西周王朝 直接表达 王权 的 一段 册命 —                      │
│    这 是 '中国' 这个 词 第一次 落 在 青铜 上"                            │
│                                                                        │
│   解锁: 称号 "宅兹中国·见证者"  + "中国"二字壁纸下载                   │
└────────────────────────────────────────────────────────────────────────┘
```

### 段位印章视觉规范

```
段位 6 档 (从小到大成长):

初窥  (0-49 字)        — 铜青小印章, 12×12 px
入门  (50-149 字)      — 青铜方印, 14×14 px
一段  (150-399 字)     — 碧玉方印, 16×16 px
二段  (400-999 字)     — 朱漆方印, 18×18 px
鉴师  (1000-2499 字)   — 金边印章, 20×20 px
大宗师 (2500+ 字)      — 国宝级金印, 22×22 px + 金光晕

印章字体: 篆书 (李斯小篆风格)
印章风格: 篆刻艺术, 不是 emoji, 不是数字
```

---

## Interaction behavior

### 主释读器
- **Hover 字**: 弹释字卡 (金文原形 + 拼音 + 字义 + 本铭中含义 + "你已识 X 次, 在 Y 件器中" + 跨器轨迹)
- **Click 字**: 
  1. "识字 +1" (若该字未点过)
  2. 该字泛淡金光 (CSS keyframe gold-flash 800ms)
  3. 段位累计器悄涨 (右栏数字 +1, 不弹窗)
  4. 弹"跨器轨迹" — 该字在用户已收藏的哪些器物的哪些位置
  5. **如果该字是铸主名** (caster_ref 字段有值) → **★ Emit `caster-focus` event** (跳铸主档案 mini card)
- **Double-click 字**: 跳"金文字典"该字详情页
- **顶部视图切换**: 拓片+释文 / 拓片+白话 / 三栏 / 单纯拓片 (盲读训练硬核模式)
- **段位升级动画** (跨阈值时): 顶部克制升段动画 (印章实体放大 1.2×, 旧印淡出, 新印盖上, 1.5s, 篆刻"叩"音占位) — 不彩带

### 何尊长卷专题 (inscription-special.html)
- **进入**: 用户首次打开何尊详情 → 自动弹邀请 "何尊 全文 122 字, 含 '中国' 二字 最早 出处. 阅读 12 分钟. [开始]"
- **逐字 reveal**: 用户点 [→] 一字浮出 (字字 reveal, 不一次性显示)
- **到第 13-14 字**: 画面停顿, 朱砂圆圈框 "中 或", 放大 1.8× + tooltip 释读 + 学术解读
- **释读 stop**: 强制用户阅读 8 秒 + click 确认 (强制读, 不能 skip, wow moment 设计)
- **完成长卷**: 全屏 3s 庆祝 + 解锁 "宅兹中国·见证者" + 中国二字壁纸下载

### Cross-dim events
- **Emits** `caster-focus` (when user clicks a char that is a caster name):
  ```js
  window.dispatchEvent(new CustomEvent('caster-focus', {
    detail: { caster_ref: '毛公', char: '毛', source: 'inscription.click' }
  }))
  ```
- **Listens** `era-focus` (optional): 当 hover 时代柱 → 释读器中字体的"时代风格" tag 高亮 (商体 / 西周早 / 春秋金文)

---

## Data requirements (v3 fields)

From `data-schema-v3.md §6`:

| Schema 路径 | 用途 |
|-----------|------|
| `inscription.has` | bool 是否有铭文 |
| `inscription.char_count` | 字数 (无铭 0) |
| `inscription.text` / `summary` | 铭文原始 + 摘要 |
| `inscription_detail.original_text` | 原文 (繁体异体) |
| `inscription_detail.modern_text` | 现代汉字隶定 (释文层) |
| `inscription_detail.vernacular` | 白话翻译 (白话层) |
| `inscription_detail.jinwen_stage` | 金文阶段 ("西周早期金文") |
| `inscription_detail.jicheng_id` | 《殷周金文集成》编号 |
| `inscription_detail.rubbing_url` | 拓片图 URL (CC license) |
| `inscription_detail.characters[]` | ★ 字字数据数组 |
| `inscription_detail.characters[].char_zh` | 字形 |
| `inscription_detail.characters[].char_jinwen` | 金文原形 (unicode 或 SVG ref) |
| `inscription_detail.characters[].meaning` | 字义 |
| `inscription_detail.characters[].caster_ref` | ★ 若该字是铸主名, 关联到 caster |
| `inscription_detail.characters[].cross_artifacts[]` | ★ 该字也在其他器中出现 (跨器轨迹) |
| `inscription_detail.academic_consensus` | 主流释读 |
| `inscription_detail.academic_controversies[]` | 学术争议 (司/后 释读) |

**Derived data**:
- `JINWEN_DICT` — 200+ 字字典 (扩自 v1 的 20 字), 每字含: 金文原形 SVG, 楷化, 拼音, 字义, 出现器物列表
- `user.recognized_chars[]` — 已识字
- `user.recognized_char_count` — 段位累计
- `user.cross_artifact_count` — 跨器出现次数 (v3 新指标)
- `user.inscription_rank` — 段位

### 重点 v3 长铭器物 (必做完整释读)
| 器物 | 字数 | jicheng_id | 备注 |
|------|------|------------|------|
| **何尊** | **122** | **06014** | ★ **杀手锏**: "宅兹中或" |
| 大盂鼎 | 291 | 02837 | 周康王 |
| 毛公鼎 | 499 | 02841 | 周宣王, 史诗铭 |
| 史墙盘 | 284 | 10175 | 西周中期 |
| 大克鼎 | 290 | 02836 | 周孝王 |
| 散氏盘 | 357 | 10176 | 西周晚期土地契约 |
| 虢季子白盘 | 111 | 10173 | 西周宣王战功 |

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.5) |
|----------|--------------------------------|
| **Identity ★★** | 段位制 "初窥 → 入门 → 一段 → 二段 → 鉴师 → 大宗师" (围棋传统) |
| **Completion** | 累计识字 / 已知金文总数 (~3700), 长期目标 |
| **Connection** | "若" 字在 7 件器中出现 → 跨器物字轨迹 |
| **Story ★** | 何尊长卷"中国"二字 → 学术 wow moment |
| **Rarity** | 史诗铭 (300+ 字) 金标 |

### v3 段位机制 (反 Skinner)
- 段位计算: `score = char_count × cross_artifact_avg_count`
- 鼓励横向阅读 (同一字在多件器物上见过), 而非快速 hover 刷字数
- 阈值微调:
  - 初窥 (score 0-49)
  - 入门 (50-149)
  - 一段 (150-399)
  - 二段 (400-999)
  - 鉴师 (1000-2499)
  - 大宗师 (2500+)

### 跨铭学习曲线
- 用户在毛公鼎学的字, 在大盂鼎复用 → 第二件读起来比第一件轻松
- "会越来越容易" 体验是核心动机

### "Almost there" callout (单页限 1)
- 仅在用户**刚识完一个字**且离段位升级阈值 ≤ 5 字 → 浮出 "您 当前 可 选择 的 研究 方向: 大盂鼎 (含 您 未识字 78 个)"
- 平静推荐, 非红字紧迫

### 何尊完成 social moment
- 完成何尊长卷 → 全屏 3s 庆祝 + 解锁称号 "宅兹中国·见证者"
- 底部 [告诉 朋友 您 读完了 '中国' 二字 最早 实物 出处] 分享 CTA (天然 social moment)
- 目标分享率 > 20%

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **释读器 layout** | HTML + CSS Grid 三层并列 (拓片 / 释文 / 白话) |
| **字字 span** | `<span class="char" data-id="{char_id}">王</span>` 每字独立 hover/click |
| **拓片图** | `<img src="{rubbing_url}">` overlay with `<canvas>` for 局部放大 |
| **金文原形** | unicode (e.g. 𠰷) 或 inline SVG (`assets/jinwen/char-{id}.svg`, 50 件 stretch) |
| **段位印章** | inline SVG 6 个不同的篆刻风格 |
| **何尊长卷** | 单独 `inscription-special.html`, 全屏 canvas + scrollX |
| **逐字 reveal** | CSS `opacity 0 → 1` + `transform translateX(20px → 0)` 600ms 每字 |
| **朱砂圆圈** | SVG `<circle stroke=#a73a2a stroke-width=2 fill=transparent>` |
| **金光泛** | CSS `@keyframes gold-flash { 0% {} 50% { filter: drop-shadow(0 0 4px gold) } }` |
| **段位升级动画** | framer-motion lazy load, 1.5s, 篆刻音占位 |
| **Mobile** (v4) | 字间距更宽 ≥ 44×44, 释字卡用底部抽屉, 跨器轨迹横向滑动 |

### JINWEN_DICT 字段结构 (扩到 200+)
```js
{
  "若": {
    char_modern: "若",
    char_jinwen: "𠰷",
    char_jinwen_svg: "assets/jinwen/ruo.svg",  // optional, 50 字 stretch
    pinyin: "ruò",
    meaning_short: "顺从 / 如此",
    meaning_in_context: { "毛公鼎": "王 这样 说道" },
    cross_artifacts: ["maogong_ding", "dayu_ding", "shi_qiang_pan"],
    caster_ref: null,
    rarity_in_corpus: "高频"
  },
  "毛": {
    ...
    caster_ref: "maogong"   // ★ 此字是铸主名
  },
  ...
}
```

---

## Cross-component connection

### Emits `caster-focus` event (when user clicks a caster name char):
```js
window.dispatchEvent(new CustomEvent('caster-focus', {
  detail: { caster_ref: 'maogong', char_zh: '毛', source: 'inscription.click' }
}))
```
**Listener**: caster-profile (弹该铸主 mini card)

### Listens `era-focus` (optional):
- 释读器中字体的"时代风格" tag 高亮 (商体 / 西周早 / 春秋金文)
- 推荐铭文自动切到该朝代

### Cross flow (铭文 × 铸主, 联动 C, dimensional-map-v3 §8.3)
```
用户在毛公鼎释读 click "毛" 字
  ↓ inscription emits caster-focus { caster_ref: 'maogong' }
  ↓
caster-profile: 弹毛公 mini card (列传卡缩略)
  · 毛公 (毛伯卫)
  · 西周晚期, 周宣王卿士
  · 传世器: 毛公鼎 (台北故宫) ← 已收藏
            毛公旅鼎 ← 未收藏
  · [查看完整档案 →]
```

### Rarity overlay
- 史诗铭 (300+ 字) 卡片金边 + "国之重器" 红章
- 何尊"中国"二字有专属"中国" 印章

---

## Anti-patterns (Don't do)

1. **不要把段位做成数字等级 (Lv.1 Lv.99)** — 段位用篆刻印章 + 段位词 (入门/一段/.../大宗师), 围棋传统
2. **不要把"识字 +1"做成数字弹窗** — 数字+1 是 XP 农场感, 正确做法是"该字泛金光 + 段位累计器悄涨"
3. **不要把白话译文做过度文学化** — 白话是辅助理解, 过度文学会误导原意
4. **不要让段位升级"中断用户体验"** — 升段动画必须可跳过 < 2 秒, 不能强制全屏庆祝
5. **不要给何尊"中国"二字配现代意识形态解读** ("中国梦"等) — 严格写学界主流释读, 否则掉粉
6. **不要在长卷里让用户能 skip "中国"段** — 该段必须强制 8s + click 确认, wow moment 是设计出来的
7. **anti-Skinner**: 段位 v3 改"识字数 × 跨器次数"; almost-there callout 单页限 1; "您 当前 可 选择 的 研究 方向" 而非 "差 N 字 升段"

---

## Cross-reference

- v1 spec: `docs/component-specs/inscription-reader.md`
- 何尊长卷 spec: `night-plan-d1.md §C` + `dimensional-map-v3.md §5.3`
- 数据: `data-schema-v3.md §6` (含 7 件长铭器物清单)
- 动机: `motivation-hooks-v3.md §1.5`
- 铭文 × 铸主联动: `dimensional-map-v3.md §8.3`
- 事件总线契约: `gamification-mechanics-v3.md §4`
