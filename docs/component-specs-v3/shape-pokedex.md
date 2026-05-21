# Shape Pokédex — 形制图鉴 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/form-genealogy.md` (v1)
> Phase B4 · Priority P1
>
> 配套数据: `data-schema-v3.md §2 / §4` · 动机: `motivation-hooks-v3.md §1.1`
> 跨维度: `era-focus` event bus (listener) · `form-select` event bus (emitter)

---

## One-line purpose

把"形制"做成一本**真正可翻阅的图鉴** — 不是分类树,是 Pokédex 风格的家族对照墙: 同子型 4 件实景照片 / 线稿剪影双视图 + 严格按真实高度排成的"尺寸对照条", 让用户身体感觉"四羊方尊 58cm 比妇好方斝 32cm 大将近一倍"。

---

## Visual description

### 主视图 (两栏 split)

```
┌───────────────────────────────────────────────────────────────────────────┐
│ 形制图鉴                                          [▼ 全部酒器]   [搜索]    │
│ ───────────────────────────────────────────────────────────────────────  │
│                                                                            │
│ 左栏 (35%): 形制谱系侧边                  右栏 (65%): 同型对照墙           │
│                                                                            │
│ ┌──────────────────────────┐  ┌───────────────────────────────────────┐  │
│ │ 食器                       │  │  方尊 · 同型对照墙                       │  │
│ │  ▸ 鼎  (54 件 · 你 12)    │  │  共 4 件已知 · 你已收藏 1 件             │  │
│ │     ◦ 圆鼎  (28 / 6)      │  │ ─────────────────────────────────── │  │
│ │     ◦ 方鼎  (12 / 3)      │  │                                          │  │
│ │     ◦ 扁足鼎(8 / 2)       │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │  │
│ │     ◦ 分裆鼎(6 / 1)       │  │  │      │ │      │ │      │ │ ╳    │ │  │
│ │  ▸ 簋  (32 件 · 你 4)     │  │  │ 四羊 │ │龙虎  │ │ 妇好 │ │ 待补 │ │  │
│ │  ▸ 簠/盨/敦/豆            │  │  │ 方尊 │ │ 方尊 │ │ 方斝 │ │ ???? │ │  │
│ │ 酒器                       │  │  │ 实景 │ │ 线稿 │ │ 线稿 │ │ 朱砂虚│ │  │
│ │  ▾ 尊 (28 件 · 你 6)      │  │  │      │ │ ░░░ │ │ ░░░ │ │ 线边  │ │  │
│ │     ◦ 觚形尊 (5/2)        │  │  │      │ │     │ │     │ │ + ?   │ │  │
│ │     ▸ 方尊  (4/1) ◀── 你 │  │  │ 58cm │ │ 50cm │ │ 32cm │ │ ?cm  │ │  │
│ │     ◦ 鸟兽尊 (12/3)       │  │  │34.5kg│ │ 22kg │ │  8kg │ │  ?  │ │  │
│ │     ◦ 凤鸟尊 (3/0) ░░░    │  │  │ [实景│ │ [实景│ │ [实景│ │      │ │  │
│ │     ◦ 龙形尊 (1/0) [孤]   │  │  │ /线稿│ │ /线稿│ │ /线稿│ │      │ │  │
│ │  ▸ 卣 / 壶 / 罍 / 觥      │  │  └──────┘ └──────┘ └──────┘ └──────┘ │  │
│ │ 水器/乐器/兵器/其他       │  │   工艺章                                  │  │
│ │                            │  │   ↓                                      │  │
│ │ 集齐进度:                  │  │  [范] [范] [范]      ← 工艺小印章        │  │
│ │  鼎  ████░░░░░░ 22%       │  │                                          │  │
│ │  尊  ████░░░░░ 21%        │  │ ─────── 尺寸对照条 ────────────── │  │
│ │  簋  █░░░░░░░░ 12%        │  │ (按真实高度排, 不放缩)                  │  │
│ │  ...                       │  │   58cm ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 四羊       │  │
│ │                            │  │   50cm ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░ 龙虎       │  │
│ │                            │  │   32cm ▓▓▓▓▓▓▓▓░░░░░░░░ 妇好       │  │
│ │                            │  │   ???                       (待补)   │  │
│ │                            │  │                                          │  │
│ │                            │  │ ──────── 进化时间线 (未解锁) ──── │  │
│ │                            │  │   商早 ─ 商晚 ─ 西周早                  │  │
│ │                            │  │   ░░░░░ ░░░░░ ░░░░░  待集齐 3/4         │  │
│ └──────────────────────────┘  └───────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

### 单卡片细节

```
┌──────────────────────────┐
│  四羊方尊                  │ ← 卡片头, 小篆字体 16px
│  ☆ 国之重器               │ ← 朱砂方印 (来自 rarity-halo)
│  ┌────────────────────┐  │
│  │                      │ │
│  │    [实景照片]        │ │ ← 默认显示实景照片 (CC license)
│  │    填满卡片 70% 区域 │ │   ↕
│  │                      │ │   或线稿剪影 (SVG silhouette)
│  └────────────────────┘  │
│  ─────────────────────   │
│  商晚期 · 湖南宁乡         │ ← 元数据: 时代 · 出土地
│  H 58.3cm · 34.5kg       │ ← 尺寸
│                            │
│  ┌──────────┬──────────┐ │
│  │ ● 实景    │ ○ 线稿   │ │ ← 底部 toggle chip
│  └──────────┴──────────┘ │
│                            │
│  右下角小章: [范]          │ ← 工艺小印章 12×12 px
└──────────────────────────┘
```

---

## Interaction behavior

### Browse mode
- **左栏点二级器型 (e.g. "鼎")**: 子型列表展开 (CSS height auto-grow, 250ms)
- **左栏点三级子型 (e.g. "方尊")**: 右栏切换到该子型对照墙 (滑入 200ms ease-out)
- **左栏 hover 节点**: 节点放大 1.02 + 浮出 tooltip "鼎 · 食器主器 · 你 12/54"

### Detail mode
- **卡片底部 [实景/线稿] toggle 点击**: 卡片正面翻转 (CSS perspective + rotateY 600ms), A 面实景, B 面线稿
- **Hover 卡片**: scale 1.03 + 周围铜色微影 (`filter: drop-shadow(0 0 8px rgba(122,90,58,0.4))`)
- **Click 卡片**: 跳 `artifact.html?id={artifact_id}` (单件详情, 含 11 字段)
- **Hover 工艺小章**: tooltip "范铸法 · 28 块陶范分铸"
- **Hover 待补位 (灰色卡)**: tooltip "此位需: 商晚期 · 方尊 · 高度 30-50cm"
- **Click 待补位**: 跳 catalog `?type=方尊&period=商晚期`

### Cross-dim events
- **Listens** `era-focus` — 当 time-pillar emit 某朝代时, 自动 scroll 到对应时代主流子型 (e.g. 商晚 → 方鼎/方尊;西周中 → 鬲/凤鸟尊), 不强切, 而是高亮 (1.5s pulse)
- **Emits** `form-select` — 用户 click 子型时 emit `{form_subtype: "方尊", form_type: "尊"}`
- **Emits** `pattern-cross` — 用户点对照墙中"该子型主流纹饰" link 时 emit pattern reference

### Collect-complete moment
- **集齐子型** (e.g. 方尊 4/4): 全屏 1.5s 庆祝 → "方尊·形制进化时间线 已解锁" → 时间线视图自动展开 (商早 ─ 商晚 ─ 西周早 三阶段对比, 标注关键变化 "纹饰从满布饕餮 → 局部分散")

---

## Data requirements (v3 fields)

From `data-schema-v3.md`:

| Schema 路径 | 用途 |
|-----------|------|
| `basic.type` / `basic.form_subtype` | 谱系树节点 |
| `basic.size.height_cm` | 尺寸对照条 (严格按真实数值, 不放缩) |
| `basic.size.weight_kg` | 卡片重量显示 |
| `basic.name_zh` / `basic.dynasty` / `basic.period` | 卡片元数据 |
| `basic.excavation_site` | 卡片出土地 |
| `basic.rarity_level` | 国宝级金边 (via rarity-halo) |
| `image_urls[]` (view=overview) | 实景照片 |
| `assets/silhouettes/{form_subtype}.svg` | 线稿剪影 |
| `form_detail.craft.method` | 工艺小印章 (范铸/失蜡/复合) |
| `form_detail.distinctive_features[]` | hover 显示卡片特色 |
| `patterns_detail.main[].icon_ref` | 右栏弹出"该子型主流纹饰" top 5 |
| `related_artifacts[]` (relation_type=`same_form_subtype`) | 同子型对照墙数据源 |

**Derived data**:
- `subtype_pool{subtype: [ids]}` — 该子型 mock 数据池
- `subtype_collected{subtype: count}` — 用户收藏件数
- `subtype_complete_threshold{subtype: pool.length}` — 集齐阈值

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.1) |
|----------|--------------------------------|
| **Completion** | 集齐子型 → 解锁"进化时间线" (内容奖励, 非 XP) |
| **Connection** | 尺寸对照条让"四羊 58cm vs 妇好方斝 32cm" 身体可感 |
| **Identity** | 鼎类大师 / 觚的鉴定家 / 尊神 (类别专精称号) |
| **Story** | 集齐进化时间线 = 揭示该子型 3000 年演化故事 |
| **Rarity** | 罕见子型 (龙形尊, 全世仅一) "孤型" 小印章 |

### "Almost there" callout (单页限 1 个)

仅当用户**刚归类完一件**且离集齐还差 1 件 → 右下浮出 "再 1 件方尊 → 解锁 方尊进化时间线" (淡入 0.3s, 5s 后自动消失, 可点关闭, 无红字)。

**不做**: 满版 banner / 红字紧迫 / "差 N 件" 堆栈面板。

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Layout** | CSS Grid + Flex (左 35% / 右 65%) |
| **Card** | HTML + CSS `transform: rotateY` 实景/线稿翻转 |
| **Tree (左栏)** | 不需要 D3, 纯 HTML `<details>` + CSS animation |
| **Size bar** | CSS `flex` 子元素 `width = (height_cm / max_height) * 100%`, **严格按真实高度** |
| **Silhouette source** | `assets/silhouettes/{form_subtype}.svg` (Phase B4 由 Builder 复用 v1 已有 12 个 + 补 13 个新) |
| **Image source** | `basic.image_urls[]` view=`overview`, fallback 线稿 |
| **Animation** | Tailwind `transition-transform duration-300` + framer-motion-lite (10kb) for flip |
| **Event bus** | window 全局 dispatch (见 `gamification-mechanics-v3.md` §4) |
| **Mobile** (v4) | 单栏纵向, swipe 切换子型, 不在 v3 范围 |

---

## Cross-component connection

| 联动 | 协议 |
|------|------|
| **era-focus (listener)** | hover/click time-pillar 朝代 → 自动 highlight 该朝代主流子型 (e.g. 商晚→方鼎, 西周→凤鸟尊, 春秋→蟠螭尊) |
| **form-select (emitter)** | click 子型 → emit `{form_subtype, form_type}` → pattern-tree 显示该子型主流纹饰 top 5 |
| **rarity-halo overlay** | 国宝级子型节点金边, 卡片金光晕 (via CSS class `tier-treasure`) |
| **purpose-scene 联动** | click 鼎/簋 → 跳 purpose-scene 中"鼎位/簋位" 高亮 (`?highlight={form_subtype}`) |
| **caster-profile 联动** | 妇好系列子型卡片右上角浮出"妇好"小头像入口 |

---

## Anti-patterns (Don't do)

1. **不要做成"维基百科分类层级树"** — 节点必须有视觉 (剪影 + 实景), 不只是文字
2. **不要让对照墙变成"商品列表"** — 它是 Pokédex, 每个位置都是"该位需某属性器物"的有意义占位
3. **不要给"集齐"奖励无价值徽章** — 解锁必须本身有价值 (进化时间线对比视图)
4. **不要按等分比例画尺寸条** — 必须严格按真实高度, 让身体感觉差异
5. **不要把实景/线稿 toggle 做成下拉菜单** — 必须是底部 chip 二选一, 一目了然
6. **不要让待补位是纯灰白** — 必须朱砂虚线边 + 具体属性提示 ("待补: 商晚期·方尊·H30-50cm")
7. **anti-Skinner**: 不堆叠"X 件解锁 Y" 面板 (C v1 violation), almost-there callout 最多 1 个

---

## Cross-reference

- v1 spec: `docs/component-specs/form-genealogy.md` (v1 谱系树形态保留为左栏侧边, 但移除"等距视图"; 主体替换为 Pokédex 对照墙)
- 数据: `data-schema-v3.md §2 / §4`
- 动机: `motivation-hooks-v3.md §1.1`
- 维度: `dimensional-map-v3.md §1`
