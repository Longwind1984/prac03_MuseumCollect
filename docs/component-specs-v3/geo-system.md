# Geo System — 地理系统 (Dual View) (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/ancient-map.md` + `docs/component-specs/pilgrimage-passport.md` (v1, 双独立组件)
> Phase B1 · Priority P0 (视觉差异最强)
>
> v3 关键变化:
> - v1 把"出土地"和"馆藏地"做成 2 个独立组件 → v3 合并为**一个地理系统 + dual view**
> - v1 手搓 SVG 古地图 → v3 真实地形 GeoJSON (Natural Earth CC0)
> - v1 无古国疆域 → v3 添加 CHGIS 古国 overlay (5 套: 商晚 / 西周早 / 春秋初 / 战国末 / 秦统一)
> - v3 新增 "海外流散" 第三 view (扩展到全球)
> - **★ era-focus event bus PRIMARY LISTENER**
>
> 配套数据: `data-schema-v3.md §2 / §9` · 动机: `motivation-hooks-v3.md §1.3`

---

## One-line purpose

把"地理"从"河南安阳"这种现代行政区, 翻译成**3000 年前的中国版图 + 3000 年后的博物馆世界**: 同一张地图承载"古→今" 双时间叙事, 时代滑块让用户**亲眼见证"中国"这个概念在 3000 年里的疆域变化**。**v3 必做: listen `era-focus` → 古国疆域 + 国名标签平滑过渡到该朝代版图 (800ms transition)**。

---

## Visual description

### 主视图布局 (单页全屏)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 地理系统                                                                  │
│ ─────────────────────────────────────────────────────────────────────  │
│  [● 出土遗址]  [○ 馆藏分布]  [○ 海外流散]            穿越模式 [● on]    │
│                                                                          │
│  时代滑块  ─●─────────────────────────────  (当前: 商晚期)             │
│           夏    商    西周    春秋    战国    秦    汉                   │
│                                                                          │
│  ┌────────────────────────────────────────────────┐  ┌────────────────┐│
│  │                                                  │  │  详情面板        ││
│  │  [真实中国地形 GeoJSON 底图]                    │  │  ───────────  ││
│  │  暖米色纸张感 #f4ebd9                            │  │ 殷墟              ││
│  │  山脉用淡墨晕染                                  │  │ 河南安阳        ││
│  │  河流: 黄河/长江 浅蓝线                          │  │ 商晚期遗址      ││
│  │                                                  │  │ 1928 至今发掘   ││
│  │      ┌─ 商晚期古国疆域 overlay (半透明虚线) ──┐ │  │ ─────────  ││
│  │      │                                          │ │  │ 你已收藏:    ││
│  │      │   ╳ 殷墟 (★★★★ 22 件)                  │ │  │  22 件        ││
│  │      │     [鼎 icon]                            │ │  │  ────────  ││
│  │      │                                          │ │  │ ┌──┬──┬──┐ ││
│  │      │   ◉ 周原 (★★ 12 件)                     │ │  │ │司│妇│鸮│ ││
│  │      │     [簋 icon]                            │ │  │ │母│好│尊│ ││
│  │      │                                          │ │  │ │戊│ │ │ ││
│  │      │   ◉ 三星堆 (★ 3 件 · 古蜀)              │ │  │ └──┴──┴──┘ ││
│  │      │     [纵目面具 icon]                       │ │  │              ││
│  │      │     ⚠ 与商并存的另一文明                  │ │  │  ────────  ││
│  │      │                                          │ │  │ 同坑兄弟 →   ││
│  │      │   ○ 盘龙城 (1 件)                        │ │  │ M5 妇好墓     ││
│  │      │   ○ 江陵 (灰 · 0 件 · 待踏足)           │ │  │  (殷墟 1976) ││
│  │      │                                          │ │  └────────────┘│
│  │      │   ◉ 随州 (★ 3 件 · 曾)                  │ │                  │
│  │      │                                          │ │                  │
│  │      └────────────────────────────────────────┘ │                  │
│  │                                                  │                  │
│  └────────────────────────────────────────────────┘                  │
│                                                                          │
│  ── 海外流散 view 切换后 ────                                            │
│  地图扩展到全球, 中心从中国移到欧美亚 + 日本                              │
│  MET / 大英 / 弗利尔 / 赛努奇 / 京都泉屋  → 流亡 timeline + "本应在家"   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 三 view 各自视觉

**View 1: 出土遗址 (考古地理)**
- 底图: 中国地形 GeoJSON
- 标点: 古都/方国遗址 (殷墟/周原/三星堆/盘龙城/江陵/随州/侯马/凤翔...)
- 古国疆域 overlay: 半透明虚线 + 国名小篆 (按朝代切换)
- 已踏足点: 该遗址代表器物 micro-SVG icon, 该朝代专属色 (e.g. 殷墟商色, 周原周色)
- 未踏足点: 虚线圆圈 + 灰色
- 国宝级遗址 (殷墟/三星堆/曾侯乙墓): 金光晕

**View 2: 馆藏分布 (今地理)**
- 底图: 同一张中国地形 GeoJSON
- 标点: 博物馆位置 (国博/故宫/上博/台北故宫/河南博/陕历博/湖北博/...)
- 已踏足馆: 该馆 logo SVG + 收藏件数
- 未踏足馆: 灰色 + "代收 N 件待补"

**View 3: 海外流散**
- 底图: 全球 GeoJSON (Natural Earth)
- 视觉: 米黄旧纸 + 暗角 + 海风感, 与国内视觉区分
- 标点: 海外馆 (MET 纽约 / 大英 伦敦 / 弗利尔 华盛顿 / 赛努奇 巴黎 / 京都泉屋)
- 每件海外文物配 "流亡史" timeline (圆明园流散 / 八国联军 / 抗战转移 / 私人捐赠)
- 右下角小注 "本应在家" (克制, 不大字)
- 底部 [♡ 我也希望它回家] 社交分享 hook

---

## Interaction behavior

### View 切换
- 顶部三 chip toggle, URL `?view=excavation|museum|overseas`
- 切换有 600ms crossfade

### 时代滑块
- 7 段 (夏/商/西周/春秋/战国/秦/汉)
- 拖动时, 古国疆域 overlay 平滑过渡 (不是硬切)
- CSS transition 800ms ease-in-out for SVG path d-attribute (`d3.interpolate`)
- 国名小篆标签平滑漂移 (e.g. "殷" 在商代出现, 西周时消失; "晋"/"楚"/"齐" 在春秋时出现)

### Hover 遗址点
- **已踏足**: 浮出 mini card "殷墟 · 你 22 件 / 该地 32 件" + 代表器物 3 缩略图
- **未踏足**: 浮出 "召唤" card — "[古蜀] 你尚未踏足. 这里出土 3 件国宝 (三星堆青铜大立人 / 纵目面具 / 青铜神树), 与殷墟同时存在"

### Click 遗址点
- 弹"考古笔记本" — 1976 妇好墓发掘 / 1986 三星堆祭祀坑 / 1978 曾侯乙墓 等故事 + 该地件物列表
- 跳 catalog `?site={excavation_site}` filter

### ★ era-focus listener (核心 cross-dim 行为)
当 time-pillar emit `era-focus` event:
```js
window.addEventListener('era-focus', (e) => {
  const { era, sub_period, year_start, year_end } = e.detail
  // 1. 切换古国疆域 overlay 到该朝代
  loadOverlay(era)  // SVG path interpolation 800ms
  // 2. 切换国名标签 (商: 殷/周/古蜀; 西周: 周/晋/楚; 春秋: 5 霸; ...)
  fadeLabels(era, 800)
  // 3. 高亮该朝代主要遗址点
  highlightSites(era)  // box-shadow pulse 1.5s
  // 4. 灰色化非该朝代遗址点
  desaturateSites(era)
})
```

### Drag/Zoom (D3.js)
- `d3.zoom()` 0.5× ~ 4×
- Drag 整张地图平移
- 在 4× 下显示遗址详细 (考古队/发掘年/重要器)

### 模式开关
- [个人足迹] (只显示用户已收藏件的来源地)
- [全国宝分布] (显示所有 mock 数据点)
- [按朝代过滤] (与时代滑块联动)

### 海外 view 特殊交互
- click 海外馆点 → 弹该馆藏器物 + "流亡 timeline" (e.g. 1860 圆明园 → 1872 私人收藏 → 1942 捐赠 弗利尔)
- 底部 [♡ 我也希望它回家] click → 社交分享 mock (不必真接 API, demo 占位)

---

## Data requirements (v3 fields)

From `data-schema-v3.md`:

| Schema 路径 | 用途 |
|-----------|------|
| `basic.excavation_site` | 出土遗址坐标查询 (need lookup table) |
| `basic.ancient_state` | 古国归属 (商/西周/曾/楚/古蜀...) |
| `basic.current_museum` | 馆藏坐标查询 |
| `basic.dynasty` / `basic.period` | 时代过滤 |
| `basic.rarity_level` | 国宝级遗址金光晕 |
| `excavation_detail.co_excavated_group_id` | 同坑兄弟聚合 (e.g. 妇好墓 M5) |
| `provenance_timeline[]` | 流亡 timeline (海外 view) |
| `image_urls[]` (view=overview) | 详情面板 thumbnail |

**Derived data**:
- `site_coords{site_name: [lon, lat]}` — 60+ 遗址坐标 (hand-curated 或从 CHGIS)
- `museum_coords{museum: [lon, lat]}` — 国内 + 海外 50+ 馆坐标
- `dynasty_overlay_paths{dynasty: GeoJSON_FeatureCollection}` — 5 套古国疆域 (商晚/西周早/春秋初/战国末/秦统一)
- `state_labels{dynasty: [{name, [lon, lat]}]}` — 国名小篆标签位置

### 资源文件 (Phase B1 Builder 准备)
```
/assets/geo/
  china-terrain.geo.json         # Natural Earth CC0 中国地形 + 河流
  world.geo.json                  # Natural Earth CC0 全球 (海外 view)
  ancient-states-shang.geo.json   # 商晚期古国
  ancient-states-zhou.geo.json    # 西周早期
  ancient-states-spring.geo.json  # 春秋初
  ancient-states-warring.geo.json # 战国末
  ancient-states-qin.geo.json     # 秦统一
  site-icons/                     # 遗址代表器 micro-SVG (复用 patterns)
    yinxu-ding.svg
    sanxingdui-mask.svg
    zhouyuan-gui.svg
    ...
```

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.3) |
|----------|--------------------------------|
| **Spatial Completion (出土)** | 全国遗址点 + 海外馆点, 空白点呼唤 |
| **Spatial Completion (馆藏)** | 9 大馆 + 海外馆"印章本" — 用户去过 = 真实到过博物馆 |
| **Identity** | "考古足迹"称号 — "三大文明区朝圣者" (殷墟+周原+三星堆) |
| **Rarity** | 三星堆/盘龙城 独立文明遗址 = 金色徽章 |
| **Story** | 每个遗址有"考古故事" (妇好墓 1976 发掘 / 三星堆 1986 祭祀坑) |
| **Story (海外)** | 流散文物 timeline, 情绪驱动 (本应在家) |
| **Connection** | 同遗址多件文物 → "同坑兄弟"跳转 (使用 `co_excavated_group_id`) |

### 集齐解锁
- 集齐"商三大遗址" (殷墟 + 盘龙城 + 三星堆) → "三家朝圣者"
- 集齐"周原 + 丰镐" → "西周王畿足迹"
- 集齐六国 (晋楚曾齐秦越) → "六国漫游者"
- 9 大馆全打卡 → "九馆朝圣者" (终极)

### Anti-Skinner
- 不大字"本应在家" — 右下角小注, 克制情绪
- 不强推"许愿回归" — 仅海外 view 出现, 不污染主体
- 不做"X 个遗址解锁 Y" 红字面板

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **底图渲染** | D3.js `d3.geoPath()` + `d3.geoMercator()` 投影 |
| **GeoJSON 资源** | Natural Earth (CC0) for terrain + CHGIS public data for 古国 |
| **古国 overlay 过渡** | `d3.interpolate()` for path d-attribute, 800ms ease-in-out |
| **国名标签漂移** | D3 enter/exit selection + transition (fade opacity + translate) |
| **遗址点** | SVG `<circle>` or `<g>` + micro-icon `<image>` |
| **金光晕** | CSS `filter: drop-shadow(0 0 8px gold)` on tier-treasure |
| **时代滑块** | HTML `<input type=range>` + D3.scaleQuantize map to dynasty |
| **Event listener** | `window.addEventListener('era-focus', handler)` |
| **Zoom/Pan** | `d3.zoom()` standard pattern, transform on `<g class="map-root">` |
| **Tooltip** | HTML overlay positioned by D3 projection function |
| **Mobile** (v4) | pinch zoom, hammerjs 或 d3 touch, 不在 v3 范围 |

### 关键 D3 代码骨架
```js
const projection = d3.geoMercator().center([105, 35]).scale(700).translate([w/2, h/2])
const path = d3.geoPath(projection)

// 底图
svg.append('path').attr('d', path(chinaTerrain)).attr('class', 'terrain')

// 古国 overlay (会切换)
const overlay = svg.append('g').attr('class', 'ancient-states')

// listener
window.addEventListener('era-focus', ({ detail }) => {
  const newPath = ancientStatePaths[detail.era]
  overlay.selectAll('path')
    .data(newPath.features)
    .join('path')
    .transition().duration(800).ease(d3.easeCubicInOut)
    .attr('d', path)
    .style('opacity', 0.5)
})
```

---

## Cross-component connection ★ (核心)

### Geo-system 是三联动的 PRIMARY LISTENER

**Listens** `era-focus` event from time-pillar:
- 古国疆域 overlay 切换 (5 套 GeoJSON 平滑 interpolate)
- 国名标签漂移 (商: 殷/周/古蜀; 西周: 周/晋/楚/曾; 春秋: 5 霸; 战国: 7 雄)
- 该朝代遗址点高亮 (box-shadow pulse), 其他朝代点灰化

**Emits** `site-focus` event (when user clicks a site):
```js
window.dispatchEvent(new CustomEvent('site-focus', {
  detail: { site: '殷墟', ancient_state: '商', source: 'geo.click' }
}))
```
listeners: caster-profile (跳"曾国" → "曾侯乙" 档案), purpose-scene (该地用途场景)

### 联动 demo flow (time-pillar primary)
```
用户 hover 时代柱"商晚期"
  ↓ time-pillar emits era-focus { era: '商' }
  ↓
geo-system: 切到商版图, 殷墟+三星堆+盘龙城 同时点亮, 周/晋/楚 国名 fade out
  ↓ 用户 click 殷墟
  ↓ geo emits site-focus
  ↓
caster-profile: 妇好/武丁 档案 mini card 浮出
purpose-scene: "太牢祭祀" 场景中殷墟主题被高亮
```

### Rarity overlay
- 国宝级遗址金光晕 (殷墟/三星堆/曾侯乙墓/周原 各种)
- 海外流散文物列表第一位
- 国宝标签密度热图 (可选 stretch)

---

## Anti-patterns (Don't do)

1. **不要用现代中国地图** — 地图灵魂在"古今对照", 用百度/高德地图皮的瞬间产品就死了
2. **不要做"红色高亮 + 蓝色未亮"的儿童配色** — 颜色语言必须在水墨/青铜的克制范围内
3. **不要把海外馆藏简单灰显** — 流散海外不是"灰", 是"泛黄做旧的另一张纸", 有自己的情感重量
4. **不要硬切朝代** — 古国 overlay 切换必须 transition 800ms, 让"边界漂移"可见
5. **不要把"本应在家"做成大字煽情** — 右下角小注, 克制情绪 = 高级
6. **不要做手搓 SVG 古地图** — 真实 GeoJSON (Natural Earth + CHGIS) 是底线, 手搓必输
7. **anti-Skinner**: 不做"X 个遗址解锁 Y" 红字; 许愿回归 hook 仅海外 view 出现; "你尚未踏足" 而非"快补全!"

---

## Cross-reference

- v1 specs (合并 + 重做): `docs/component-specs/ancient-map.md` + `docs/component-specs/pilgrimage-passport.md`
- 三联动 spec: `dimensional-map-v3.md §3 / §8.1`
- 数据: `data-schema-v3.md §2 / §9`
- 动机: `motivation-hooks-v3.md §1.3`
- GeoJSON 资源: Natural Earth (CC0) + CHGIS (Harvard public data)
- 事件总线契约: `gamification-mechanics-v3.md §4`
