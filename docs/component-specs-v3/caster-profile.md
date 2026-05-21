# Caster Profile — 铸主档案 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/caster-profile.md` (v1)
> Phase B4 · Priority P2 (实现复杂, v1 仅 ASCII spec)
>
> v3 关键变化:
> - v1 关系图谱仅 ASCII 静态 → **★ v3 D3.js force-directed graph 实现**
> - v1 列传卡 12 字段 → v3 17 字段 (扩到 100+ 铸主, 含商 20/西周 30/春秋 20/战国 20/秦汉 10)
> - v3 加 mini card (在 inscription-reader / artifact 详情页弹出, 渗透效应)
> - v3 listen `caster-focus` event (来自 inscription-reader)
> - v3 emit `era-focus` (点周王 → 时代柱该王世段高亮)
>
> 配套数据: `data-schema-v3.md §8` · 动机: `motivation-hooks-v3.md §1.7`

---

## One-line purpose

青铜器的灵魂不是金属, 是**那个把它铸出来献给祖先的人**。把"铸主"维度做成列传卡 (《史记·列传》体例) + D3 关系图谱 (force-directed graph), 让用户从"我收藏了什么物"变成"我了解了哪些人"。妇好不是名字, 是个有 400+ 件铜器陪葬的女将。**v3 必做: D3 force-directed graph 替代 v1 静态 ASCII**。

---

## Visual description

### 视图 1: 关系图谱 (全屏 D3 force-directed graph)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 铸主关系图谱                                  [筛选: ▼全朝代] [搜索]      │
│ ───────────────────────────────────────────────────────────────────  │
│                                                                          │
│  D3 force-directed graph, 力导布局:                                      │
│                                                                          │
│      商王朝 ──────────────────────────────                              │
│                                                                          │
│         ●武丁───●(夫妻边)─────●妇好                                      │
│           │\                      │                                     │
│           │ \                     │                                     │
│           │  \父子边               │女将边                                │
│           ▼   ▼                   │                                     │
│         ●祖庚 ●祖甲                │                                     │
│           │                       │                                     │
│           ●(子)                    ●(关联器: 鸮尊/方斝/觥)               │
│                                                                          │
│         ●(后母戊) ━━ 妇妌  ━━ 武丁 ━━(同朝)                              │
│         (主)                                                            │
│                                                                          │
│      ─── 西周王朝 ──────────────────────────                            │
│                                                                          │
│         ●周武王 ━━●周成王 ━━●周康王 ─...─ ●周宣王                        │
│              │       │          │            │                          │
│              利簋   何尊       大盂鼎       毛公鼎                       │
│              (利)   (何)        (盂)        (毛公)                       │
│              │       │          │            │                          │
│              ●       ●          ●            ●                          │
│              │       │                                                   │
│         作器者     作器者                                                 │
│                                                                          │
│      ─── 列国 ──────────────────────────                                │
│                                                                          │
│         ●曾侯乙 (随州)                                                    │
│           │                                                              │
│           编钟 / 尊盘 / 鉴缶 (15000+ 件)                                 │
│                                                                          │
│         ●越王勾践 ━━●吴王夫差 (敌国边)                                    │
│                                                                          │
│  视觉规范:                                                                │
│  ● 大节点 (radius 24-32) = 重要铸主 (50+ 件关联或国宝级)                 │
│  ● 中节点 (radius 16-24) = 一般铸主 (5-50 件)                            │
│  ● 小节点 (radius 8-16)  = 普通铸主 (< 5 件)                             │
│  ● 节点颜色 = 该铸主所属朝代色 (商青铜/周朱/...)                          │
│  ● 节点点亮 = 用户已收藏其作品 (饱和色), 否则灰                          │
│  ● 边类型:  ━ 夫妻 ┄ 父子 ─ 君臣 ═ 同代 ╳ 敌国                          │
│  ● 国宝级铸主节点带金边                                                   │
│                                                                          │
│  右下角 mini panel:                                                       │
│  ┌────────────────────────────────┐                                     │
│  │ 你已涉及 14 位铸主 (60+ 件)      │                                    │
│  │ ★ 重点: 妇好 6/12  毛公 1/4       │                                   │
│  │ 推荐: 曾侯乙 (15000 件 全集挑战)  │                                   │
│  └────────────────────────────────┘                                     │
└─────────────────────────────────────────────────────────────────────────┘
```

### 视图 2: 列传卡 (单铸主详情, 翻牌过渡)

```
┌──────────── 妇好 (Fu Hao) ──────────────────────────────────────┐
│  殷王武丁王后 · 商代第一位有名女将                                  │
│  生卒: 约 1250-1200 BC                                            │
│                                                                    │
│  ┌──────────┐                                                     │
│  │          │                                                     │
│  │ 头像剪影  │   ▲ 历史记载:                                       │
│  │ (毛笔速写  │     · 甲骨卜辞 800+ 条提及, 主持祭祀                │
│  │  +鸮+戈) │      · 率军征讨土方/羌方, 兵众 1.3 万               │
│  │          │     · 武丁为之作"商王武丁的祭妻卜辞"                 │
│  └──────────┘                                                     │
│                                                                    │
│  ▲ 考古发现:                                                       │
│    · 1976 河南安阳殷墟 M5 妇好墓                                    │
│    · 随葬 468 件铜器                                                │
│    · 唯一未被盗扰的商王室成员墓                                      │
│                                                                    │
│  ─────────────────────────                                       │
│  ▲ 您 已 收藏 (3/12):                                              │
│    ┌─────┬─────┬─────┬─────┐                                      │
│    │ ▦   │ ▦   │ ▦   │ ?   │                                      │
│    │ 妇好  │ 司母 │ 妇好│ 剪影│                                     │
│    │ 鸮尊  │ 辛鼎 │ 觥  │     │                                     │
│    │ ★国宝│ ★国宝│      │      │                                    │
│    └─────┴─────┴─────┴─────┘                                      │
│    ...                                                              │
│                                                                    │
│  ─────────────────────────                                       │
│  ▲ 关系网:                                                         │
│    武丁 (夫) ━━━━━━━━ ●                                            │
│    祖庚 (子) ━━━━━━━━ ●                                            │
│    祖甲 (子) ━━━━━━━━ ●                                            │
│    妇妌 (姊妹) ━━━━━━ ●                                            │
│                                                                    │
│  ─────────────────────────                                       │
│  ▲ 学术地位:                                                       │
│    · 中国历史最早有名女性                                            │
│    · 商王室祭祀主持人                                                │
│    · 关键学者: 郑振香 (1976 发掘领队)                                │
│                                                                    │
│  [查看相关铭文]  [跳转到关系图谱]  [分享档案]                       │
└──────────────────────────────────────────────────────────────────┘
```

### 视图 3: Mini Card (在其他组件 inline 浮出, 渗透层)

```
当用户在 inscription-reader 点 "毛" 字时:
┌──────────────────────┐
│ 毛公 (毛伯卫)        │
│ 西周晚期, 周宣王卿士  │
│ ─────────────────    │
│ 传世器:               │
│  · 毛公鼎 (台北故宫)  │  ← 用户已收藏 ★
│  · 毛公旅鼎          │  ← 未收藏
│ ─────────────────    │
│ 你已识 1/2 件         │
│ [查看完整档案 →]      │
└──────────────────────┘
```

---

## Interaction behavior

### 关系图谱 (D3 force-directed graph)
- **Default**: 力导布局自动平衡 (alpha tick), 7 朝代分簇显示
- **Drag 节点**: 节点可拖动重排 (d3.drag), 释放后回归 force layout
- **Hover 节点**: 浮出 mini card "含 X 件已知作品 / 你已收藏 Y 件"
- **Click 节点**: 翻牌过渡 (CSS perspective + rotateY 600ms) → 列传卡视图
- **Wheel zoom**: 0.5× ~ 3×
- **筛选 panel**: 按朝代/已收藏/国宝级 过滤节点
- **Search**: 输入"妇好" → 节点高亮 + zoom 到该节点

### 列传卡视图
- **Click 关联国宝缩略图**: 跳 `artifact.html?id={artifact_id}` 详情
- **Click 关系网中其他人物**: 翻牌到该人物列传卡
- **Click [查看相关铭文]**: 跳 inscription-reader 中该铸主的所有铭文器
- **Click [跳转到关系图谱]**: 翻牌回图谱, 该节点中央高亮
- **Long-press 列传卡**: "导出为分享卡片"

### Mini Card (在其他组件渗透)
- **Triggered by `caster-focus` event** (from inscription-reader / artifact-detail):
  ```js
  window.addEventListener('caster-focus', ({ detail }) => {
    showCasterMiniCard(detail.caster_ref)
    // mini card 弹出 anchored to event source position
  })
  ```
- **Hover mini card**: hover 5s 后稳定显示, 不消失
- **Click [查看完整档案 →]**: 跳 `caster.html?id={caster_ref}` 列传卡视图

### Cross-dim events
- **Listens** `caster-focus` (from inscription-reader): 弹该铸主 mini card
- **Listens** `site-focus` (from geo-system): 点"曾国" 遗址 → 自动弹"曾侯乙"档案
- **Emits** `era-focus` (when click 王世 node in graph):
  ```js
  // 用户在图谱中点"周宣王" → time-pillar zoom 到该王世段
  window.dispatchEvent(new CustomEvent('era-focus', {
    detail: { era: '西周', sub_period: '西周晚期', source: 'caster.click' }
  }))
  ```

---

## Data requirements (v3 fields)

From `data-schema-v3.md §8`:

| Schema 路径 | 用途 |
|-----------|------|
| `academic_status.primary_caster` | 主铸主 (从铭文或学术推定) |
| `academic_status.primary_caster_ref` | 铸主 ID (关联表) |
| `academic_status.related_casters[]` | 相关人物 |
| `academic_status.key_scholars[]` | 关键学者 |
| `academic_status.key_papers[]` | 关键论文 (≤ 3) |
| `inscription_detail.characters[].caster_ref` | 字字 → 铸主映射 (跳转触发) |
| `excavation_detail.co_excavated_group_id` | 同墓铸主关联 (妇好墓 M5) |

**Derived data**:
- `caster_index{caster_ref: [artifact_ids]}` — 铸主-器物索引
- `caster_meta{caster_ref: { name, role, era, gravesite, story, image_silhouette }}` — 100+ 铸主元数据
- `caster_relations[]` — 边数组 (`{ source, target, relation_type, evidence }`) ~150 条

### 100+ 铸主分布
| 朝代 | 数量 | 重点 |
|------|------|------|
| 商 | 20 | 妇好/妇妌/武丁/祖庚/祖甲... |
| 西周 | 30 | 武王/成王/康王/穆王/孝王/宣王/利/盂/毛公/克/史墙... |
| 春秋 | 20 | 越王勾践/吴王夫差/楚共王/晋平公... |
| 战国 | 20 | 曾侯乙/中山王厝/秦商鞅... |
| 秦汉 | 10 | 秦始皇/汉武帝/中山靖王... |

### caster_meta 结构示例
```js
{
  "fuhao": {
    name_zh: "妇好",
    name_alt: ["妇好", "妇好夫人"],
    role: "殷王武丁王后",
    era: "商晚期",
    year_range: "约 -1250 ~ -1200",
    gravesite: "河南安阳殷墟妇好墓 (M5)",
    silhouette_svg: "assets/casters/fuhao.svg",  // 毛笔速写剪影
    rarity: "国宝级铸主",
    artifact_count_known: 12,
    biography: "妇好, 殷王武丁之妻...",
    relations: [
      { target: "wuding", type: "夫妻", evidence: "甲骨卜辞" },
      { target: "zugeng", type: "父子", evidence: "甲骨卜辞" },
      { target: "zujia", type: "父子", evidence: "甲骨卜辞" }
    ],
    historical_records: ["甲骨卜辞 800+ 条", "1976 殷墟妇好墓 发掘报告"],
    key_scholars: [
      { name: "郑振香", contribution: "1976 妇好墓 发掘领队" }
    ]
  }
}
```

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.7) |
|----------|--------------------------------|
| **Story ★** | 每位铸主背后的人物故事 (《史记·列传》体例) |
| **Completion** | 同铸主作品收藏率 — 妇好 12 件全集是高难度长期目标 |
| **Connection** | 关系图谱 — 器物收藏延伸到人物收藏 |
| **Identity** | "妇好系列收藏家 / 周王作器人 / 曾侯乙乐工" |

### 集齐解锁
- 妇好 12 件全集 → "妇好女将传人" + 解锁妇好祭祀场景
- 周王作器全集 (8 件: 利簋/何尊/大盂/大克/毛公/...) → "周王作器人"
- 集齐 武丁/妇好/祖庚/祖甲 → "殷王武丁家族"专属档案集

### 关系网络扩张
- 用户收藏 1 件妇好器 → 妇好节点点亮
- 用户在铭文中识"武丁" 字 → 武丁节点点亮 (虚)
- 双重点亮 (收藏其器 + 识其名) → 节点金边强化

### "Almost there" callout (单页限 1)
- 关系图谱右下角 mini panel: "您 当前 可 选择 的 研究 方向: 妇好系列 (已 3/12, 推荐 妇好觥 国博 待补)"
- 平静推荐, 无红字

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Force graph** | D3.js `d3.forceSimulation()` + `d3.forceLink()` + `d3.forceCharge()` + `d3.forceCenter()` |
| **节点 render** | `<g class="node">` + `<circle>` + `<image href={silhouette_svg}>` (头像剪影) |
| **边 render** | `<line class="link {relation_type}">`, CSS 区分 stroke-dasharray (实线/虚线) |
| **节点 size** | `radius = sqrt(artifact_count) * 4` (8-32 px) |
| **节点 color** | dynasty palette (复用 `var(--dynasty-shang)` 等) |
| **列传卡过渡** | CSS perspective 1000px + rotateY 180deg, 600ms |
| **Mini card** | absolute positioned overlay, 锚定 event source |
| **Mobile** (v4) | 力导改"按朝代分组列表", 节点变 chip, 不在 v3 范围 |

### 关键 D3 代码骨架
```js
const simulation = d3.forceSimulation(nodes)
  .force('link', d3.forceLink(links).id(d => d.id).distance(80))
  .force('charge', d3.forceManyBody().strength(-200))
  .force('center', d3.forceCenter(width/2, height/2))
  .force('collide', d3.forceCollide(d => d.radius + 5))
  .force('cluster', forceCluster())  // 按朝代分簇

simulation.on('tick', () => {
  link.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x).attr('y2', d => d.target.y)
  node.attr('transform', d => `translate(${d.x},${d.y})`)
})

// Hover handler
node.on('mouseover', (event, d) => {
  showMiniCard(d, event.x, event.y)
})

// Listener
window.addEventListener('caster-focus', ({ detail }) => {
  const targetNode = nodes.find(n => n.id === detail.caster_ref)
  if (targetNode) {
    // 居中聚焦
    centerOnNode(targetNode)
    showCasterCard(targetNode)
  }
})
```

---

## Cross-component connection

### 铸主维度是"渗透层" + 独立页双形态

**渗透形态 (mini card)**:
- 在 inscription-reader: 识铸主名字时弹 mini card
- 在 artifact.html: 详情页右侧自动浮 mini card
- 在 geo-system: 点遗址 (e.g. 殷墟 → 妇好) 时弹 mini card

**独立页形态**:
- `caster.html?id={caster_ref}` 列传卡
- `caster-graph.html` 全图谱

### Listens events:
- `caster-focus` (from inscription-reader / artifact): 弹 mini card
- `site-focus` (from geo-system): 弹该遗址主铸主 (殷墟→妇好/武丁, 三星堆→无名, 曾侯乙墓→曾侯乙)

### Emits events:
- `era-focus` (when click 王世 node): time-pillar zoom 到该王世段
- `artifact-focus` (when click 关联国宝): 跳详情 (其他组件不必监听, 直接路由)

### Cross flow (铸主 × 铭文, 联动 C):
```
用户在毛公鼎释读 click "毛" 字
  ↓ inscription-reader emits caster-focus { caster_ref: '毛公' }
  ↓
caster-profile: 弹毛公 mini card
  · 毛公 (毛伯卫)
  · 西周晚期, 周宣王卿士
  · [查看完整档案 →]
  ↓ 用户 click [查看完整档案]
  ↓ 跳 caster.html?id=maogong → 翻牌到列传卡
  ↓ 用户 click 周宣王 (关系网中)
  ↓ caster-profile emits era-focus { era: '西周', sub_period: '西周晚期' }
  ↓
time-pillar: zoom 到西周晚期段, 高亮宣王在位时段
geo-system: 切到西周晚期版图
pattern-tree: 高亮窃曲/重环纹 (西周晚主流)
  → 完整的"字 → 人 → 时代 → 地理 → 纹饰" 五连联动
```

### Rarity overlay
- 国宝级铸主 (妇好/曾侯乙/周宣王) 节点带金边
- 列传卡金光晕 (rarity-halo overlay)

---

## Anti-patterns (Don't do)

1. **不要乱给历史人物画"复原图"** — 头像必须是毛笔速写剪影, 绝不能 AI 生成"妇好真实容貌", 否则 A 考据派立刻删 App
2. **不要把关系图做成纯游戏式技能树** — 它是"族谱 + 政治网络", 视觉根植于家谱传统而非游戏 UI
3. **不要在生平叙事里加情感倾向性强的政治判断** — 商鞅变法功过可两派观点, 不单边
4. **不要把"集齐 X 系" 做成主要 KPI** — 容易陷入收集疲劳; 铸主维度核心是"了解", 不是"集齐"
5. **不要让 force layout 持续震荡** — alpha decay 必须收敛 (1-2s 内稳定), 否则用户晕
6. **不要让 mini card 自动消失** — hover 5s 后稳定显示, 用户主动关
7. **anti-Skinner**: 不做"X 件解锁妇好女将传人" 红字; almost-there callout 单页限 1; "你 已 涉及 14 位 铸主" 平静叙述

---

## Cross-reference

- v1 spec: `docs/component-specs/caster-profile.md` (v1 ASCII → v3 D3 实现)
- 数据: `data-schema-v3.md §8`
- 100+ 铸主清单: `dimensional-map-v3.md §7.1`
- 动机: `motivation-hooks-v3.md §1.7`
- 铸主 × 铭文联动: `dimensional-map-v3.md §8.3`
- 事件总线契约: `gamification-mechanics-v3.md §4`
