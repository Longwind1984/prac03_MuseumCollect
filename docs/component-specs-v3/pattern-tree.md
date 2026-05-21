# Pattern Tree — 纹饰演化树 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/pattern-tree.md` (v1)
> Phase B2 · Priority P0 (v1 最大缺口: 缺独立 SVG icon)
>
> v3 关键变化:
> - v1 节点是灰色圆点 → v3 每个节点是 SVG icon (Phase B2 由 Builder 产 25 个)
> - v1 节点位置静态 → v3 节点按时代轴 x 严格定位
> - v1 无跨维度 → v3 listen `era-focus` 高亮该朝代主流纹饰
> - 拓片放大镜增加: 拖到时代柱 = 自动确认朝代; 拖到地图 = 显示流行地区
>
> 配套数据: `data-schema-v3.md §5` · 动机: `motivation-hooks-v3.md §1.4`
> 跨维度: ★ `era-focus` event bus LISTENER

---

## One-line purpose

把"纹饰"从"装饰"升级为**用户的视觉词汇** — 演化树每个节点是真正可记住的 SVG icon (25 个标准化纹饰图), 用户慢慢能脱口而出"这是窃曲, 这是蟠虺"。三千年纹饰演化 (神权 商→礼制 西周→抽象化 春秋→繁缛 战国) 在一张图上可见。**v3 必做: listen `era-focus` → 高亮该朝代主流纹饰节点 (商晚→饕餮/夔龙, 西周中→凤鸟, 春秋→蟠螭, 战国→蟠虺)**。

---

## Visual description

### 主演化树视图 (横向时代轴布局)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 纹饰演化树                              [拓片本(7)] [搜索]  [穿越模式 ●on]│
│ ──────────────────────────────────────────────────────────────────────  │
│ 时代轴 (x):                                                                │
│   夏    商早   商中   商晚    西周早  西周中  西周晚  春秋早  春秋晚  战国 │
│                       ▼ 当前高亮: 商晚 (来自 era-focus)                   │
│                                                                            │
│ 神兽纹族 (Divine Beast):                                                   │
│ ──────────────────────────────────                                       │
│            [饕] ═════ [饕] ═════ [饕]                                      │
│            饕餮  →    顾首饕餮  → 简化饕餮  → → → → → → → ───────────>   │
│             │           │                                                  │
│             │           [夔] ═══ [夔] ═══ [夔] ═══ [窃] ═══ [重]           │
│             │           夔龙 → 双身夔 → 抽象夔 → 窃曲纹 → 重环纹           │
│             │                                                              │
│ 写实动物族 (Realistic Animal):                                             │
│ ──────────────────────────────────                                       │
│              [鸮]   [蝉]                              [凤]                 │
│              鸱鸮  蝉纹                              凤鸟纹大盛            │
│              (妇好系)                                    │                 │
│                                                          [鸟兽]            │
│                                                                            │
│ 几何纹 (Geometric):                                       [窃][重][鳞][波] │
│ ──────────────────────────────────                                       │
│                                                          西周中后期         │
│                                                                            │
│ 繁缛纹 (Intricate, 战国):                                              [蟠][蟠]│
│ ──────────────────────────────────                                      [螭][虺]│
│                                                                            │
│ 写实场景纹 (Narrative, 战国汉):                                   [宴] [狩] │
│ ──────────────────────────────────                              宴乐 狩猎  │
│                                                                            │
│ 底纹 (Ground):                                                             │
│ ──────────────────────────────────                                       │
│   [弦] ───────────── (商早至春秋, 简朴风格) ─────────────>                  │
│   [雷] ═══════════ [雷] ═══════════ (商周通用底纹) ═══════════>           │
│                                                                            │
│ Legend:                                                                    │
│  [饕] = SVG icon  (深铜色 #7a5a3a 已点亮 / 灰 #999 未点亮)                │
│  ═══ = 主流传承 (粗线)                                                     │
│  ──  = 旁支演化 (细虚线)                                                   │
│ 数字角标: 该纹饰你在 N 件器物上识别                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

### 单 icon 节点细节 (80×80 viewBox SVG)

```
SVG 风格规范:
- viewBox: 0 0 80 80
- stroke 1.5px monochrome
- 铜色 #7a5a3a (linework) on transparent
- 风格: stylized, 取拓片轮廓
- 文件: assets/patterns/{name}.svg

25 个 icon (P0 必做 15 + P1 扩 10):

P0 必做 15:
  taotie     (饕餮)      kuilong   (夔龙)      fengniao  (凤鸟)
  yunlei     (云雷地纹)   panchi    (蟠螭)      panhui    (蟠虺)
  qiequ      (窃曲)      zhonghuan (重环)      lin       (鳞纹)
  chan       (蝉纹)      jiaoye    (焦叶)      xian      (弦纹底)
  rudine     (乳钉)      wo        (涡纹)      geometric (几何)

P1 扩 10:
  chixiao   (鸱鸮)        huishirentou (虎噬人头)  yu        (鱼纹)
  gui       (龟纹)        sanjiao      (三角)      niaoshou  (鸟兽合体)
  boqu      (波曲)        shouquan     (兽体卷曲)  yanle     (宴乐攻战)
  shoulie   (狩猎)
```

### 拓片放大镜 (在 artifact.html 单件详情页)

```
┌──────────────────────────────────────┐
│  器物: 后母戊鼎  腹部纹饰              │
│                                        │
│  ╭─── 圆形放大镜 (CSS clip-path) ─╮   │
│  │ │ ╱╲  ╱╲  ╱╲ │ ← 用户拖框        │
│  │ │/  \/  \/  \│   选中此区        │
│  │ │  饕餮 兽面  │                   │
│  ╰────────────╯                       │
│                                        │
│  识别中... ✓ 这是"饕餮纹" (taotie)    │
│  ➕ 拓片入册 +1 (累计 7 张)            │
│                                        │
│  → 跳: 演化树 高亮 [taotie] 节点      │
└──────────────────────────────────────┘

拓片本视图 (用户的纹饰收藏夹):
┌─── 拓片本 ───────────────────────┐
│                                    │
│  饕餮纹族 (7 张):                  │
│  [▦] [▦] [▦] [▦] [▦] [▦] [▦]    │
│  后母 妇好 龙形 利簋 大盂 ...      │
│                                    │
│  夔龙纹族 (4 张):                  │
│  [▦] [▦] [▦] [▦]                  │
│                                    │
│  窃曲纹族 (0 张):                  │
│  [?]   ← 召唤剪影 + "拓本中尚无"   │
└────────────────────────────────────┘
```

---

## Interaction behavior

### Default state
- 横向卷轴, x = 时代轴 (夏 → 汉), y = 纹饰族 (神兽 / 写实 / 几何 / 繁缛 / 场景 / 底纹)
- 已点亮节点 (用户已识别): 深铜色 #7a5a3a, icon 清晰
- 未点亮节点: 灰 #999, icon 半透明 + 虚线 border
- 节点 size: 标准 60×60, 主流纹饰 (饕餮/夔龙/凤鸟) 80×80

### Hover 节点
- 节点 scale 1.1 + 浮出 tooltip:
  ```
  饕餮纹 (taotie)
  时代: 商晚-西周早 主流
  你在 3 件器上识别 · 累计拓片 7 张
  ─────
  风格: 巨眼瞠目, 双角 C 形向上
  含义: 兽面神权符号
  ─────
  ★ 此纹饰你最熟
  ```

### Click 节点
- 跳"跨器物对照墙" — 你所有有此纹饰的器物 thumb 并列, 纹饰局部放大并排比对
- emit `pattern-focus` event

### ★ era-focus listener (核心 cross-dim 行为)
当 time-pillar emit `era-focus`:
```js
window.addEventListener('era-focus', ({ detail }) => {
  const { era, sub_period } = detail
  // 1. 高亮该朝代主流纹饰
  const dominantPatterns = PATTERN_BY_ERA[era] || []
  // e.g. era=商 → ['taotie', 'kuilong', 'yunlei']
  //     era=西周 + sub=中期 → ['fengniao', 'qiequ']
  //     era=春秋 → ['panchi', 'panhui']
  //     era=战国 → ['panhui', 'yanle', 'shoulie']
  dominantPatterns.forEach(p => {
    nodes.find(n => n.id === p).classed('era-pulse', true)
  })
  // 2. 淡化其他节点
  nodes.filter(n => !dominantPatterns.includes(n.id))
    .style('opacity', 0.3)
  // 3. 1.5s pulse 后保持高亮 (不自动恢复, 直到用户 hover 其他朝代)
})
```

### 拓片放大镜激活 (在 artifact.html)
- 长按器物图 1 秒 → 圆形放大镜浮出, 光标变拖框
- Drag 选区 → 释放后 0.8s mock 识别 (查 `patterns_detail.main[].icon_ref` from data)
- 弹"识别结果 + 拓片入册 +1" + 朱砂签章
- 跳演化树并高亮该节点

### 拓片本视图 (rubbing-book.html, 独立页)
- 同纹饰跨器物聚合 ("饕餮纹族 7 张")
- 拓片可拖到时代柱 → 自动确认拓片所属朝代
- 拖到地图 → 显示该纹饰主要流行地区 (商→中原, 战国→楚)

### Transitions
- 节点点亮 = 墨水晕染 (SVG filter feGaussianBlur from blur=8→0, 800ms)
- 拓片入册 = 纸张飞入 + 朱砂签章

---

## Data requirements (v3 fields)

From `data-schema-v3.md`:

| Schema 路径 | 用途 |
|-----------|------|
| `patterns_detail.main[]` | 主纹列表 (with `icon_ref` 对照 25 套) |
| `patterns_detail.secondary[]` | 副纹 |
| `patterns_detail.ground[]` | 地纹 (云雷/弦纹) |
| `patterns_detail.local[]` | 局部纹 (耳/足/盖) |
| `patterns_detail.{*}[].icon_ref` | ★ 关键: 关联 25 个 SVG icon 文件 |
| `patterns_detail.{*}[].position` | 拓片放大镜识别用 |
| `patterns_detail.{*}[].style` | tooltip 风格描述 |
| `patterns_detail.{*}[].meaning` | tooltip 学术含义 |
| `patterns_detail.{*}[].rarity` | "孤型"/"罕见"/"常见" 视觉标记 |
| `basic.dynasty` / `basic.period` | 时代轴 x 位置定位 |

**Derived data**:
- `pattern_genealogy[]` — hand-curated 演化图 (节点 25 个 + 演化边 ~40 条, 由 Researcher 提供考据)
- `pattern_pool{icon_ref: [artifact_ids]}` — 该纹饰出现的器物池
- `pattern_recognized{icon_ref: count}` — 用户识别次数
- `PATTERN_BY_ERA{dynasty: [icon_refs]}` — 朝代主流纹饰映射 (era-focus 用)

**Pattern by era (hand-curated)**:
```
商早:  yunlei (云雷地纹)
商中:  yunlei, taotie (饕餮初现)
商晚:  taotie, kuilong, yunlei, chixiao (妇好系), huishirentou (孤型)
西周早: taotie (传承), kuilong, fengniao (初露), yunlei
西周中: fengniao (大盛), kuilong (抽象化), qiequ (萌)
西周晚: qiequ, zhonghuan, lin
春秋早: qiequ (传承), zhonghuan, panchi (萌)
春秋晚: panchi, panhui (萌)
战国:   panhui, yanle (宴乐攻战), shoulie (狩猎), boqu, jiaoye
秦:     geometric (简化)
汉:     wo (鎏金涡纹), geometric
```

### 资源文件 (Phase B2 Builder 准备)
```
/assets/patterns/
  taotie.svg        80×80 viewBox, stroke 1.5 #7a5a3a
  kuilong.svg
  fengniao.svg
  yunlei.svg
  panchi.svg
  panhui.svg
  qiequ.svg
  zhonghuan.svg
  lin.svg
  chan.svg
  jiaoye.svg
  xian.svg
  rudine.svg
  wo.svg
  geometric.svg
  -- P1 扩展 --
  chixiao.svg
  huishirentou.svg
  yu.svg
  gui.svg
  sanjiao.svg
  niaoshou.svg
  boqu.svg
  shouquan.svg
  yanle.svg
  shoulie.svg
```

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.4) |
|----------|--------------------------------|
| **Identity ★** | "凤鸟收藏家 / 饕餮鉴定师 / 窃曲修士" — 最响亮的身份感 |
| **Connection** | 拓片本同纹饰跨器物的"纹饰家族" |
| **Story** | 演化树本身就是故事: 神权→礼制→写实→繁缛 |
| **Completion** | 演化树分支末梢 (蟠螭/蟠虺) 需上游节点全点亮才解锁 |
| **Rarity** | 罕见纹饰 (鸱鸮纹·妇好系, 虎噬人头·孤型) 金边 SVG |

### v3 段位机制修正 (motivation-hooks-v3 §1.4 anti-Skinner)
- v1 错误: 单纯按字数 → 段位 → 鼓励快速 hover 刷字数
- v3 正确: 段位 = (识纹饰数) × (在不同器物上出现的次数), 鼓励横向阅读

### 跨器物轨迹
- 用户在第 3 次看到饕餮纹时, 自动弹"您 已 在 3 件 器 见过 饕餮纹 (后母戊 / 妇好鸮尊 / 龙形觥)"

### "Almost there" callout (单页限 1)
- 集齐 5 件含夔龙纹 → 浮出 "您 在 5 件 含 夔龙纹. 再 识 12 种 夔龙变体 → 升级 '夔龙派 大宗'"
- 平静研究方向, 无红字

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Tree layout** | D3.js 自定义 layout (x = 时代 linear scale, y = 族 ordinal scale, 非纯 d3.tree) |
| **Icon rendering** | SVG `<use href="#pattern-taotie">` 引用 `<symbol>` 定义 (assets/patterns 内联或外链) |
| **演化连线** | D3 path + 自定义 curve (`d3.curveBundle`), 粗线主流, 细虚线旁支 |
| **节点点亮动画** | SVG `<filter>` feGaussianBlur (blur 8→0) over 800ms |
| **Era-focus pulse** | CSS `@keyframes pulse { 0% { transform: scale(1) } 50% { transform: scale(1.15) filter: drop-shadow(0 0 6px gold) } }`, 1.5s |
| **拓片本** | CSS Grid layout, 黑白滤镜 `filter: grayscale(1) contrast(1.4)` |
| **拓片放大镜** | Canvas 2D 局部 zoom + 黑白滤镜 + SVG 圆形 mask |
| **Mobile** (v4) | 树改纵向时代轴, touch drag 拓片镜, 不在 v3 范围 |

### 关键 D3 代码骨架
```js
const xScale = d3.scaleLinear()
  .domain([-1750, 220])  // 夏到汉
  .range([padding, width - padding])

const yScale = d3.scaleBand()
  .domain(['divine_beast', 'realistic', 'geometric', 'intricate', 'narrative', 'ground'])
  .range([0, height])

// 节点
svg.selectAll('.pattern-node')
  .data(patternGenealogy.nodes)
  .join('g')
  .attr('transform', d => `translate(${xScale(d.peak_year)},${yScale(d.family)})`)
  .each(function(d) {
    d3.select(this).append('use')
      .attr('href', `#pattern-${d.icon_ref}`)
      .classed('lit', d => userRecognized.includes(d.icon_ref))
  })

// listener
window.addEventListener('era-focus', ({ detail }) => {
  const dominant = PATTERN_BY_ERA[detail.era]
  svg.selectAll('.pattern-node')
    .classed('era-pulse', d => dominant.includes(d.icon_ref))
    .style('opacity', d => dominant.includes(d.icon_ref) ? 1 : 0.3)
})
```

---

## Cross-component connection ★ (核心)

### Pattern-tree 是三联动的 LISTENER (第三组件)

**Listens** `era-focus` event from time-pillar:
- 高亮该朝代主流纹饰节点 (PATTERN_BY_ERA 映射)
- 淡化其他节点 (opacity 0.3)

**Listens** `form-select` event from shape-pokedex:
- 弹"该子型主流纹饰" top 5 panel (e.g. 方尊 → 饕餮 65% / 夔龙 40% / 凤鸟 12%)

**Emits** `pattern-focus` event (when user clicks pattern node):
```js
window.dispatchEvent(new CustomEvent('pattern-focus', {
  detail: { pattern: 'taotie', era_dominant: '商', source: 'pattern.click' }
}))
```
listeners: shape-pokedex (高亮含该纹饰的子型), geo-system (该纹饰主要流行地区)

### 三联动 demo flow (time-pillar primary)
```
用户 hover 时代柱"商晚期"
  ↓ time-pillar emits era-focus { era: '商' }
  ↓ ↓ ↓
geo-system: 切到商版图
pattern-tree: 饕餮/夔龙 节点闪金光 (era-pulse), 云雷地纹高亮
shape-pokedex: 方尊/方鼎 高亮
  ↓ 用户 click 饕餮节点
  ↓ pattern-tree emits pattern-focus
  ↓
shape-pokedex: 含饕餮纹的方尊/方鼎卡片金光
geo-system: 商代版图上含饕餮纹的遗址点亮 (殷墟/盘龙城)
```

### Rarity overlay
- 罕见纹饰 (鸱鸮纹·妇好系, 虎噬人头·孤型) 节点带金边
- 拓片本中国宝拓片底色泛黄

---

## Anti-patterns (Don't do)

1. **不要做无考据的"乱连线"演化树** — 这是产品最学术的组件, 一条错的演化让 A 考据派立刻删 App
2. **不要把拓片做成"截图保存"** — 拓片必须有**黑白做旧的拓印感**, 是组件灵魂
3. **不要在拓片本里放彩色器物图** — 拓片就是拓片, 黑白宣纸, 不混入彩色
4. **不要把称号弹窗做成花哨彩带** — 称号出场必须克制 (类似古书"加印")
5. **不要让 SVG icon 风格不统一** — 25 个 icon 必须同 stroke / 同 viewBox / 同色, 风格漂移即崩
6. **不要让 era-focus 高亮自动消失** — 必须 sticky (用户 hover 其他朝代才换), 否则破坏穿越体验
7. **anti-Skinner**: 不做"识 N 字升段" 红字; almost-there callout 最多 1 个; 段位机制 v3 改"识纹饰数 × 出现器物数"

---

## Cross-reference

- v1 spec: `docs/component-specs/pattern-tree.md` (v1 框架保留, v3 加 25 SVG icon + 横向时代轴 + era-focus listener)
- 三联动 spec: `dimensional-map-v3.md §4 / §8.1`
- 25 SVG 规范: `data-schema-v3.md §5.3`
- 数据: `data-schema-v3.md §5`
- 动机: `motivation-hooks-v3.md §1.4`
- 事件总线契约: `gamification-mechanics-v3.md §4`
