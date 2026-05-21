# Purpose Scene — 礼器归位场景 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Inherits `docs/component-specs/purpose-scene.md` (v1 杀手锏)
> Phase B4 · Priority P1 (沿用 v1 B 版杀手锏 + 加 5 套场景 + 等级判定细化)
>
> v3 关键变化:
> - v1 已实现 22 positions 太牢场景 + 等级判定 → v3 沿用, 不改设计风格
> - v3 加 5 套场景 (太牢/燕飨/朝聘/军礼/葬礼) tab 切换
> - v3 等级判定细化为 4 档 (天子九鼎八簋 / 诸侯七六 / 卿大夫五四 / 士三二)
> - v3 banner 等级实时更新 + 距下档距离平静提示
>
> 配套数据: `data-schema-v3.md §7` · 动机: `motivation-hooks-v3.md §1.6`

---

## One-line purpose

把"用途"从"祭祀礼器"文字标签翻译成**用身体记得的礼制系统** — 用户在一张 isometric 宗庙场景图上拖拽自己收藏的器物到该归的位置, 集齐九鼎八簋 → 解锁"天子之礼"。礼制不是知识, 是**动作**。**v3 必做: 5 套场景 (太牢/燕飨/朝聘/军礼/葬礼) tab 切换 + 等级判定 banner 实时更新**。

---

## Visual description

### 主视图 (顶部场景 tab + 中央场景图 + 右侧待归位)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 礼器归位场景                                                                │
│ ─────────────────────────────────────────────────────────────────────  │
│  顶部 5 场景 Tab:                                                         │
│  [● 太牢祭祀]  [○ 燕飨礼]  [○ 朝聘礼]  [○ 军礼]  [○ 葬礼]                  │
│                                                                            │
│  状态 Banner (顶部, 实时更新):                                             │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ 当前 等级: 卿大夫之礼  (5 鼎 4 簋 · 用户配置)                       │ │
│  │ 距 诸侯之礼  (7 鼎 6 簋): 再 2 鼎 2 簋                              │ │
│  │ 距 天子之礼  (9 鼎 8 簋): 再 4 鼎 4 簋                              │ │
│  │ 完成度: ████░░░░░░░░ 47% (8/17 件)                                  │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  ┌────────────────────────────────────────┐ ┌─────────────────────────┐│
│  │  [太牢祭祀场景, isometric 视角]           │ │ 我的收藏 (待归位)        ││
│  │                                            │ │ ──────────────────  ││
│  │       ─── 神主 ───                        │ │  ▣ 后母戊鼎  [食器]    ││
│  │           ╱ ╲                              │ │  ▣ 妇好鸮尊  [酒器]    ││
│  │          ╱ T ╲   ← 主位                    │ │  ▣ 大盂鼎    [食器]    ││
│  │         ─────                              │ │  ▣ 利簋      [食器]    ││
│  │                                            │ │  ▣ 何尊      [酒器]    ││
│  │   北面 鼎位 (9 位):                        │ │  ▣ 莲鹤方壶  [酒器]    ││
│  │   ┌──┬──┬──┬──┬──┐                      │ │  ▣ 司母辛鼎  [食器]    ││
│  │   │▦│▦│▦│?│?│  ← 已归位 3, 待 6           │ │  ▣ 妇好觥    [酒器]    ││
│  │   ├──┼──┼──┼──┼──┤                      │ │  ...                    ││
│  │   │▦│?│?│?│?│                            │ │                          ││
│  │   ├──┼──┼──┼──┼──┤                      │ │                          ││
│  │   │   ▦  (大鼎/主鼎)  │                   │ │ 拖拽 → 场景中             ││
│  │   └────────────────────┘                  │ │                          ││
│  │                                            │ │                          ││
│  │   南面 簋位 (8 位):                        │ │ 提示:                    ││
│  │   ┌──┬──┬──┐                            │ │  此场景需配 9 鼎 8 簋   ││
│  │   │▦│▦│?│                                │ │  集齐后解锁"天子之礼"   ││
│  │   ├──┼──┼──┤                            │ │  特殊全景视图            ││
│  │   │?│?│?│                                │ │                          ││
│  │   ├──┼──┼──┤                            │ │                          ││
│  │   │?│?│                                  │ │                          ││
│  │   └─────────┘                              │ │                          ││
│  │                                            │ │                          ││
│  │   东面 酒器位:        西面 水器位:         │ │                          ││
│  │   ┌──────────┐       ┌──────────┐       │ │                          ││
│  │   │◇ 尊位 ▦│       │◇ 盘位 ?│       │ │                          ││
│  │   │◇ 卣位 ?│       │◇ 匜位 ?│       │ │                          ││
│  │   │◇ 觚爵 ?│       └──────────┘         │ │                          ││
│  │   └──────────┘                            │ │                          ││
│  │                                            │ │                          ││
│  │   背景: 火苗摇曳 (CSS animated flame)     │ │                          ││
│  │         木制礼器架 + 神主 (毛笔风格剪影)  │ │                          ││
│  │         米黄 + 朱砂 + 暗青绿配色            │ │                          ││
│  └────────────────────────────────────────┘ └─────────────────────────┘│
└──────────────────────────────────────────────────────────────────────────┘
```

### 5 套场景视觉差异

| 场景 | 主器 | 视觉氛围 | 等级判定 | 历史依据 |
|------|------|---------|---------|---------|
| **太牢祭祀** | 9 鼎 + 8 簋 + 尊卣觚爵 | 宗庙 / 神主 / 火光摇曳 / 神圣感 | 天子九/诸侯七/卿大夫五/士三 | 《周礼·秋官》《礼记·王制》 |
| **燕飨礼** | 簠盨豆觥 + 酒器 | 殿堂 / 列席 / 灯笼 / 礼乐 | 按席位数分等 | 《仪礼·燕礼》 |
| **朝聘礼** | 大盘 + 大盂 + 圭璧 | 朝堂 / 王侯并立 / 玉璧 | 按朝聘规模分等 | 《周礼·秋官·大行人》 |
| **军礼** | 钺鼓钟铙 + 戈矛剑 | 军营 / 战车 / 旌旗 | 按军规分等 | 《周礼·夏官》 |
| **葬礼** | 列鼎 + 明器 + 车马器 | 墓道 / 陪葬 / 冷暗 | 天子九鼎七鼎降一级 | 《礼记·王制》 |

---

## Interaction behavior

### 场景 Tab 切换
- 顶部 5 个 chip, click 切换场景 (300ms crossfade)
- URL `?scene=taiao|yanxiang|chaopin|junli|zangli`
- 切换时, 用户已归位件物自动重新归位到新场景 (按 form_subtype 判定)

### Drag 收藏件到场景
1. 用户从右栏拖拽件物 (HTML5 drag-and-drop)
2. 拖拽中: 件物图标半透明跟随光标
3. 合规位高亮 (border 朱砂金边)
4. Drop 到合规位: 朱砂虚线 → 实线, 金光闪一下, 位置上"位"字消失变器物名
5. Drop 到不合规位: 提示 "此位需 [西周晚期·圆鼎], 你拖入的是 [商晚期·方鼎], 格不合礼" → 件物回到待归位栏

### Hover 待补位
- 浮出"召唤"卡片: "此位需 [属性] 的器物。以下 3 件 mock 中符合 → [跳搜索]"
- 灰色剪影提示

### Click 已归位件物
- 跳 `artifact.html?id={artifact_id}` 详情页

### 等级判定 Banner 更新
- 实时计算用户配置 → 4 档判定:
  - 9 鼎 8 簋 → 天子之礼
  - 7 鼎 6 簋 → 诸侯之礼
  - 5 鼎 4 簋 → 卿大夫之礼
  - 3 鼎 2 簋 → 士之礼
- 距下档距离平静显示, 无红字

### 完成 100% 动画
- 集齐 9 鼎 8 簋 + 全器位归位 → 全场景金光化 + 摄像机拉远 + 文案 "天子九鼎八簋, 礼制具足"
- 解锁"天子之礼"特殊全景视图 (宗庙全貌, 灯火更亮)

### Cross-dim
- **Listens** `form-select` (from shape-pokedex): click 鼎/簋 → 该位高亮 (box-shadow pulse)
- **Listens** `caster-focus` (from inscription/caster-profile): 集齐妇好系 → 自动切到妇好祭祀场景

---

## Data requirements (v3 fields)

From `data-schema-v3.md §7`:

| Schema 路径 | 用途 |
|-----------|------|
| `usage_history.primary_purpose` | 场景归属 (祭祀/燕飨/朝聘/军礼/葬礼) |
| `usage_history.ritual_scene` | 直接映射 5 套场景 |
| `usage_history.ritual_position` | 在场景中具体位 (鼎位 1 / 主鼎 / 尊位) |
| `usage_history.ritual_grade` | 等级 (天子/诸侯/卿大夫/士) |
| `usage_history.user_class` | 使用者 |
| `basic.form_subtype` | 位约束判定 (鼎位需 ding 子型) |
| `basic.dynasty` / `basic.period` | 断代合规检查 |
| `basic.size.height_cm` | 鼎大小约束 (主鼎 > 副鼎) |
| `basic.rarity_level` | 国宝级金光晕 |

**Derived data**:
- `scene_definitions[]` — 5 套场景结构 (位结构, 约束)
- `scene_completion{scene: %}` — 每场景完成度
- `position_constraints` — 每位约束 (form_subtype, period, size_min, size_max)
- `user.scene_placements{scene: {position_id: artifact_id}}` — 用户拖拽状态 (持久化, 刷新不丢)

### 5 场景位结构示例 (太牢)
```js
{
  scene: 'taiao',
  positions: [
    { id: 'ding_main', constraints: { form_type: '食器', form_subtype: ['圆鼎', '方鼎'], size_min: 50 } },
    { id: 'ding_1', constraints: { form_type: '食器', form_subtype: ['圆鼎', '方鼎'] } },
    { id: 'ding_2', constraints: { form_type: '食器', form_subtype: ['圆鼎', '方鼎'] } },
    // ... 9 鼎位
    { id: 'gui_1', constraints: { form_type: '食器', form_subtype: ['簋'] } },
    // ... 8 簋位
    { id: 'zun', constraints: { form_type: '酒器', form_subtype: ['尊'] } },
    { id: 'you', constraints: { form_type: '酒器', form_subtype: ['卣'] } },
    // ... 酒器/水器位
  ],
  grade_thresholds: [
    { grade: '天子之礼', ding: 9, gui: 8 },
    { grade: '诸侯之礼', ding: 7, gui: 6 },
    { grade: '卿大夫之礼', ding: 5, gui: 4 },
    { grade: '士之礼', ding: 3, gui: 2 }
  ]
}
```

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.6) |
|----------|--------------------------------|
| **Spatial Completion** | 多套场景, 缺位剪影显示在场景中 |
| **Story** | 礼制故事 — 集齐九鼎解锁"周礼·王道篇" |
| **Identity** | "礼器派 / 酒器派 / 乐师 / 武士" 用途专精称号 |
| **Connection** | 场景中器物 → 跳详情, 场景是导航器 |
| **Completion** | 单场景完成度百分比 + 等级判定 (天子/诸侯/卿大夫/士) |

### 等级判定 anti-Skinner
- 等级是平静事实, 不是"差 N 件达成下一档" 红字
- Banner 显示 "距 X 之礼: 再 N 鼎 M 簋", 语义化, 像研究方向

### 多场景解锁顺序 (引导新手)
- 默认: 太牢场景
- 集齐 3 件 → 解锁燕飨场景
- 集齐 5 件 → 解锁朝聘
- 集齐 8 件 → 解锁军礼
- 集齐 12 件 → 解锁葬礼

### "Almost there" callout (单页限 1)
- 等级判定 banner 即此 callout (顶部常驻, 但语言平静, 非红字)

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Scene 渲染** | SVG isometric 网格 + 位锚点 (`<rect>` + `<circle>`) |
| **拖拽** | HTML5 native drag-and-drop (或 interact.js 备选) |
| **拖拽动效** | framer-motion `useDragControls`, 半透明跟随 |
| **合规判定** | JS function `matchConstraints(artifact, position.constraints)` |
| **火苗** | CSS `@keyframes flame { 0% { transform: scaleY(1) } 50% { scaleY(1.1) skewX(2deg) } }` |
| **背景** | 米黄 #f4ebd9 + 朱砂 #a73a2a + 暗青绿 #4a5a3a (复用朝代配色) |
| **Tab 切换** | URL routing or React Router lite |
| **完成动画** | framer-motion, 摄像机拉远 = SVG viewBox transform 1.5s |
| **状态持久化** | localStorage `user.scene_placements` |
| **Mobile** (v4) | long-press 拖拽 + tap-to-place 备选, 不在 v3 范围 |

---

## Cross-component connection

### Listens `form-select` (from shape-pokedex):
- click 鼎/簋 子型 → 场景中该位高亮 (box-shadow pulse)
- e.g. 用户在 Pokédex click "方鼎" → 太牢场景中所有方鼎位高亮

### Listens `caster-focus` (from inscription/caster-profile):
- 集齐妇好系列 (5 件) → 自动切到"妇好祭祀场景" (特殊变体, 妇好墓 M5 复原)
- 集齐曾侯乙系列 → "曾侯乙乐工场" (军礼变体)

### Emits `position-need` event (when user hover empty position):
```js
window.dispatchEvent(new CustomEvent('position-need', {
  detail: { 
    position_id: 'ding_5',
    needs: { form_subtype: '圆鼎', period: '西周早期', size_min: 30 },
    source: 'purpose.hover'
  }
}))
```
**Listener**: shape-pokedex (高亮符合该约束的子型)

### Cross flow (用途 × 形制, dimensional-map-v3 §8.4):
```
用户在太牢场景 hover 待补"鼎位 5"
  ↓ purpose-scene emits position-need
  ↓
shape-pokedex: 高亮"圆鼎"子型, 显示该子型 mock 数据池中合规件物
  ↓ 用户点合规件 → 跳详情 → "收藏并归位" → 自动 drop 到 ding_5
```

### Rarity overlay
- 国宝级件物归位时, 该位金光更强烈 (box-shadow pulse 2× intensity)
- 集齐全国宝场景 → 专属"国之重器·天子之礼"金色全景

---

## Anti-patterns (Don't do)

1. **不要做成"角色装备栏式拖拽"** — 礼器归位是仪式, 不是装备槽; 视觉语言必须根植于宗庙/朝堂
2. **不要把"完成度"做成单纯百分比** — 等级感 (诸侯/大夫/天子) 远比 47% 有意义
3. **不要让场景背景是纯色 / 渐变** — 场景需要叙事感 (灯火、剪影、空间深度), 纯色背景沦为"功能页面"
4. **不要把不合规拖拽做成红色错误提示** — 应该是"格不合礼" 这种有教化感的反馈
5. **不要让 5 场景视觉雷同** — 太牢=宗庙, 燕飨=殿堂, 军礼=军营, 必须各有氛围
6. **不要弹红字"差 N 件解锁天子之礼"** — banner 必须平静 "距 X 之礼: 再 N 件"
7. **anti-Skinner**: 等级判定即 callout, 单页限 1 个; 完成动画 < 3s 可跳过; 不弹彩带

---

## Cross-reference

- v1 spec (沿用 + 扩展): `docs/component-specs/purpose-scene.md`
- v3 扩展: 5 套场景 + 等级判定细化 (`dimensional-map-v3.md §6.3`)
- 数据: `data-schema-v3.md §7`
- 动机: `motivation-hooks-v3.md §1.6`
- 用途 × 形制联动: `dimensional-map-v3.md §6.4`
- 礼制文献引用: 《周礼·秋官》《礼记·王制》《仪礼·燕礼》
- 事件总线契约: `gamification-mechanics-v3.md §4`
