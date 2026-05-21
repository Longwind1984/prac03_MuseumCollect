# Gamification Mechanics v3 — 系统级游戏化机制

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/gamification-mechanics.md` (v1)
> 配套: 7+1 v3 component specs (`docs/component-specs-v3/`)
>
> v3 核心变化:
> 1. 10 维 → **7+1 维** (形制/时代/地理/纹饰/铭文/用途/铸主 + 稀有度全局层)
> 2. 25 件知识库 → **300 件知识库** (Day1 / Week1 / Month1-3-6 / Year1 旅程重设)
> 3. v1 跨维度仅文档描述 → **v3 必做"时代×地理×纹饰" 三联动 demo trigger**
> 4. 引入 ★ **`era-focus` 事件总线协议** (核心 cross-dim 机制)
> 5. anti-Skinner 红线扩充: 加 v3 新规 "不堆叠'X 件解锁 Y' 面板" (C v1 violation)
> 6. 300 件密度引入"今日推荐 / 研究路径 / 集锦" 策略
>
> **论点 (3 句话)**:
> 1. **形态 = 进度条**: 时代柱本身就是收藏进度, 地图本身就是漫游成就, 演化树本身就是鉴别等级
> 2. **空白 > 填满**: 维度组件的核心信息不是"用户已收藏什么", 是"用户还没看见什么"
> 3. **认知能力 = 奖励**: 用户得到的是"你现在能区分饕餮和窃曲了", 不是"+1000 XP"

---

## 0. 目录

1. 用户旅程 (Day1 / Week1 / Month1-3-6 / Year1) — 300 件规模
2. 7+1 维度的动机 hook (已在 motivation-hooks-v3 §1 详述, 此处仅 anchor)
3. 跨维度组合 hooks (5 组 — A/B/C 必做 D/E 部分实现)
4. ★ **事件总线协议 (Event Bus Protocol)** — v3 新增, 跨组件联动核心契约
5. 反 Skinner 设计纪律 v3 (含 C v1 violation fix)
6. 300 件密度下的产品策略 (今日推荐/研究路径/集锦)
7. 称号系统 (隐线, 30+ 称号)
8. 反馈循环梯度 (Hot / Short / Mid / Cold / Long / Year)
9. 失败模式 off-ramp
10. KPIs v3

---

## 1. 用户旅程: Day1 / Week1 / Month1-3-6 / Year1 (300 件规模)

### 1.1 Day 1 (0 → 1 件) — 多维同时点亮

**Trigger**: 用户拍照识别第一件器物, 或从"明星器物"试选 1 件

**多维同时点亮的视觉爆发** (1 秒内, 7 个维度组件 + 1 稀有度层同步):
```
扫描成功! 1 秒内:
  ▸ time-pillar:    该朝代段 +1 像素填充, 颜色饱和度 +20%
  ▸ geo-system:     该出土点亮起 (该朝代色 + 微 pulse)
  ▸ shape-pokedex:  该子型新分支 +1
  ▸ pattern-tree:   该件含的纹饰节点 +1 (e.g. 饕餮 / 夔龙 / 云雷)
  ▸ inscription:    若有铭文, 字字累入字典
  ▸ purpose-scene:  该礼器位入位 (若属太牢)
  ▸ caster-profile: 该铸主 +1 件
  ▸ rarity-halo:    若是国宝, 卡片金光 + "国之重器" 红章入框 3s 全屏祝贺

全屏 2s 庆祝 (克制, 不彩带):
"一件 器物, 7 个 维度 同时 被 点亮.
 您 已 开始 您 的 青铜 之 路."

称号: "踏上青铜之路" (唯一保证 Day 1 解锁)
```

**心理冲击**: 用户原以为是"我把一件东西放进收藏夹", 结果是**"一件器物在 7 个维度里同时改写了我的认知地图"**

**让他回来明天的钩**:
- 多维点亮后, 某个维度的"邻近空白"自动浮出小提示
- 比如 time-pillar"商晚期"亮起后, 旁边"商中期"段开始呼吸: "商中期 (盘庚迁殷前) 您 尚未 踏足, 妇好 之前 还有 200 年 的 商王朝"
- 不发推送通知; 不做每日签到 — 让用户**因为求知欲回来**, 不是因为系统提醒

**Day 1 → Day 2 转化目标**: > 60% (motivation-hooks-v3 §8.3)

---

### 1.2 Week 1 (1 → 5 件) — 形成"收藏画像"

**进度**: 每个维度都有部分进度, 用户开始看到自己的"收藏画像"

**关键 hook**:
- time-pillar: 用户收藏开始形成"密度" (e.g. 商晚期 3 件 + 西周 1 件 + 1 件其他)
- 称号 "初识三代" (覆盖 3 个朝代)
- 出现首个 "派系"倾向标签 (e.g. "商代派 萌芽")

**Session goal** (用户每次打开 App 想达成的隐性目标):
- "把 time-pillar 某个朝代段填到 50%"
- "去三星堆点亮"
- "解锁第一条工艺长卷 (sub-feature, B4)"
- 看自己的收藏画像

**"几乎到了"的钩 (单页限 1, 平静推荐)**:
- shape-pokedex 对照墙: "方尊集 3/4, 再 1 件 解锁 方尊进化时间线" — 第 4 件方尊剪影诱发
- inscription 段位: 累计 47 字, 距下一段位 3 字 (悄涨, 非红字)

**Week 1 (Day 7) 留存目标**: > 50%

---

### 1.3 Month 1 (5 → 30 件) — 跨维度组合开始触发

**进度**: 第一波 time-pillar + geo-system 覆盖, 跨维度组合开始触发

**关键 hook**:
- time-pillar: 接近覆盖 5+ 朝代
- geo: 三大文明区 (殷墟+周原+三星堆) 中至少 2 个点亮
- shape: 至少 2-3 个子型出现"集齐 N/4" 提示
- pattern: 拓片本 5-10 张, 首个纹饰称号 ("夔龙派 一初")
- **跨维度组合**: 首次触发"二重文明 见证者" (商晚期 + 三星堆 各 1 件)

**称号**: "三代见习 / 二重文明见证者 / 派系初步"

**Mid loop (本期重点)**:
- 用户首次 hover time-pillar 商晚期 → **三联动触发** → 其他 3 组件同时活了 → wow moment
- 用户开始 use 维度页面而非只看 catalog
- 周活 90% (一周打开 ≥ 4 次)

**Month 1 (Week 4) 留存目标**: > 35%

---

### 1.4 Month 3 (30 → 80 件) — mastery 萌芽

**进度**: 多维度进阶称号开始集齐, 铭文段位起飞

**关键 hook**:
- 多称号集齐: 饕餮鉴定师 + 鼎类大师 + 妇好系列 + ...
- 铭文段位 "入门 → 一段" (识字 100+)
- ★ **何尊长卷已完成** (首个长卷 wow moment)
- time-pillar 覆盖率 70%+
- 解锁"卿大夫之礼" 级别 (集齐 5 鼎 4 簋)

**称号**: "国宝学徒 / 金文一段 / 派系大宗 / 宅兹中国·见证者"

**Mastery 萌芽**:
- 用户开始**主动选择**下一件要收藏, 不是被推荐
- 在路上看到一件没见过的青铜器, **用户能主动猜断代和形制**

**Month 3 月活目标**: > 80%

---

### 1.5 Month 6 (80 → 150 件) — 全集目标 + 海外关注

**进度**: 进阶到产品的"深水区", 用户开始有"全集" 目标

**关键 hook**:
- 妇好 12 件全集进度 6/12 (60%)
- 曾侯乙 8 件全集 5/8
- 195 件禁出境进度 30/195 (15%)
- 铭文段位 "二段" (识字 400+)
- **geo-system 海外流散 view 开始使用** (用户开始关注海外文物)

**称号**: "青铜行者 / 金文二段 / 妇好半集"

**Month 6 月活目标**: > 70%, 用户开始计划线下博物馆朝圣

---

### 1.6 Year 1 (150 → 300 件) — 重度爱好者

**进度**: 接近覆盖 195 件禁出境名录, 达到"重度爱好者"层级

**关键 hook**:
- 195 件禁出境进度 100/195 (51%)
- 铭文段位 "鉴师" (识字 1000+)
- 毛公鼎/史墙盘等史诗铭已通读
- 9 馆朝圣印章全集
- 所有 5 个用途场景达到"卿大夫之礼"
- 跨维度组合全部触发过至少 1 次

**称号**: "青铜大宗师 / 金文鉴师 / 商周朝圣者 / 三代鉴师"

**Year 1 月活目标**: > 60%, 重度用户 (收藏 > 100) 占比 > 5%

**终极反馈**: 不是 App 内通关动画, 是用户在真实生活中的认知地位 — 同事问他"这是什么鼎", 他能答上来。**这才是产品的最终回报**。

---

## 2. 7+1 维度的动机 Hook (anchor)

各维度详细 hook 见 `motivation-hooks-v3.md §1`:

| 维度 | 主 hook | spec 链接 |
|------|--------|-----------|
| 1. 形制 | Completion + Connection (尺寸对照身体感) | `component-specs-v3/shape-pokedex.md` |
| 2. 时代 | Temporal Completion + 三联动触发 | `component-specs-v3/time-pillar.md` |
| 3. 地理 | Spatial Completion + Story (海外流散情绪) | `component-specs-v3/geo-system.md` |
| 4. 纹饰 | Identity★ ("饕餮鉴定师") + Story (神→礼→写实) | `component-specs-v3/pattern-tree.md` |
| 5. 铭文 | Identity★★ (段位制) + Story★ (何尊"中国") | `component-specs-v3/inscription-reader.md` |
| 6. 用途 | Spatial Completion + Story (周礼·王道) | `component-specs-v3/purpose-scene.md` |
| 7. 铸主 | Story★ (列传) + Connection (关系图谱) | `component-specs-v3/caster-profile.md` |
| ★ 稀有度 | Rarity★★ (全局视觉乘数) + Identity | `component-specs-v3/rarity-halo.md` |

---

## 3. 跨维度组合 Hooks (5 组)

### 3.1 组合 A: 时代 × 地理 × 纹饰 — 三联动 ★★ (v3 必做)

**Hook 类型**: Connection × Spatial × Temporal (三类叠加)

**触发**: 用户 hover time-pillar 某朝代段

**响应** (同时, 通过 `era-focus` event bus):
1. time-pillar 该段高亮 + 弹出 mini cards (用户收藏件 thumb)
2. geo-system 自动平滑过渡到该朝代古国疆域 overlay (CSS transition 800ms)
3. pattern-tree 高亮该朝代主流纹饰节点 (商晚→饕餮/夔龙, 西周中→凤鸟, 春秋→蟠螭, 战国→蟠虺)

**Hook 强度**: 用户第一次看到"我 hover 一下, 三个组件同时活了" → **wow moment**

**称号**: 同时收藏 "商晚期 + 三星堆" 任意 1 件 → "二重文明 见证者"

详见 §4 事件总线协议

---

### 3.2 组合 B: 形制 × 纹饰 — "这型主流是什么纹"

**Hook 类型**: Connection × Story

**触发**: 用户在 shape-pokedex 点子型 (如"方尊")

**响应**:
- shape-pokedex emit `form-select` event
- pattern-tree listen, 弹"该子型主流纹饰" top 5
- 每个纹饰 SVG icon + 出现频次 (e.g. "饕餮 65% · 夔龙 40% · 凤鸟 12%")
- 点纹饰 icon → 跳 pattern-tree 高亮 + 含该纹饰的方尊器物对照

**Hook 强度**: 用户理解"形制不只是形状, 它和纹饰是搭配出现的"

**称号**: 收藏 5 件方尊 (含全部 3 种主流纹饰) → "方尊纹饰鉴别师"

---

### 3.3 组合 C: 铸主 × 铭文 — "字→人→物" 全链

**Hook 类型**: Connection × Identity

**触发**: 用户在 inscription-reader 中 click 某字 (该字 `caster_ref` 字段有值)

**响应**:
- inscription-reader emit `caster-focus` event
- caster-profile listen, 弹该铸主 mini card (列传卡缩略)
- 显示该铸主其他传世器 (已收藏/未收藏 区分)
- 点"查看完整档案 →" 跳 caster.html

**Hook 强度**: 一个字, 从图像→文字→人物→关联器, 全链打通

**称号**: 在铭文中识别 5 位不同铸主 → "金文铸者档案家"

---

### 3.4 组合 D: 用途 × 形制 — 礼制完整性引擎 (沿用 v1)

**Hook 类型**: Completion × Story 双重

**触发**: 在 purpose-scene 太牢场景归位 9 鼎 8 簋

**响应**:
- purpose-scene 等级判定 banner 自动升 "天子之礼"
- shape-pokedex 同步点亮所有归位的子型
- 解锁"天子之礼" 特殊场景 (宗庙全景)

**称号**: "天子之礼·礼器派"

---

### 3.5 组合 E: 稀有度 × 全维度 — 全局光晕 (v1 巩固)

**Hook 类型**: Rarity 全局乘数

**机制**: 稀有度不是独立组件, 而是叠加层 (见 `component-specs-v3/rarity-halo.md`)

**渗透到全部 7 个组件 + artifact.html**

---

## 4. ★ 事件总线协议 (Event Bus Protocol) — v3 新增

### 4.1 总览

v3 引入全局 `window.dispatchEvent` 总线作为跨组件联动协议。所有组件按统一契约 emit / listen, **无需中心 router 或 state store**。

### 4.2 事件清单

| Event Name | Emitter | Listeners | Payload | 触发场景 |
|-----------|---------|-----------|---------|----------|
| **`era-focus`** | time-pillar (primary), caster-profile (王世 click), pattern-tree (optional) | geo-system, pattern-tree, shape-pokedex, time-pillar (self-highlight) | `{ era, sub_period?, year_start, year_end, source }` | hover 时代柱 → 三联动 |
| **`form-select`** | shape-pokedex | pattern-tree, purpose-scene | `{ form_subtype, form_type, source }` | click 子型 → 显示主流纹饰 / 高亮场景位 |
| **`pattern-focus`** | pattern-tree | shape-pokedex, geo-system | `{ pattern, era_dominant, source }` | click 纹饰节点 → 含该纹的子型/遗址 |
| **`caster-focus`** | inscription-reader (click 铸主名字), geo-system (click 遗址 → 主铸主) | caster-profile (弹 mini card) | `{ caster_ref, char?, source }` | "字→人" 联动核心 |
| **`site-focus`** | geo-system | caster-profile, purpose-scene | `{ site, ancient_state, source }` | 点遗址 → 关联铸主 / 礼制场景 |
| **`position-need`** | purpose-scene (hover 待补位) | shape-pokedex | `{ position_id, needs: {form_subtype, period, size_min}, source }` | 待补位 → 推荐合规子型 |

### 4.3 ★ 核心契约: `era-focus` event

```js
// PAYLOAD SCHEMA
{
  detail: {
    era: '商' | '西周' | '春秋' | '战国' | '秦' | '汉' | '夏',  // 朝代 enum (required)
    sub_period: '商晚期' | '西周早期' | ... | null,              // 子分期 (optional, zoom 2×+ 时有)
    year_start: -1600,   // 朝代起始年 (BC 为负) (required)
    year_end: -1046,     // 朝代终止年 (required)
    source: 'time-pillar.hover' | 'time-pillar.click' | 'caster.click'  // 来源 (required)
  }
}

// EMIT example (time-pillar)
window.dispatchEvent(new CustomEvent('era-focus', {
  detail: {
    era: '商',
    sub_period: '商晚期',
    year_start: -1600,
    year_end: -1046,
    source: 'time-pillar.hover'
  }
}))

// LISTEN example (geo-system)
window.addEventListener('era-focus', ({ detail }) => {
  const { era, sub_period } = detail
  // 1. 切换古国疆域 overlay (CSS transition 800ms)
  loadOverlay(era)
  // 2. 国名标签平滑漂移
  fadeLabels(era, 800)
  // 3. 高亮该朝代主要遗址点 + 灰化其他
  highlightSites(era)
})
```

### 4.4 实现要求

**Builder 实现规则**:
1. **所有 emitter 必须在事件 detail 中 include `source` 字段** — 用于 debug / 防循环 / 用户偏好
2. **所有 listener 必须 idempotent** — 同样的 event 多次发, 状态不应漂移
3. **不能反向触发** — listen 后不可直接 emit 同样的 event (防循环)
4. **`era-focus` 切换有 throttle** — debounce 100ms, 避免快速 hover 时连续触发

### 4.5 用户偏好开关

每个组件页面顶部有 "穿越模式 [● on / ○ off]" toggle:
- on (默认): listen events, re-render 联动
- off: 忽略 events, 组件孤立 (适合需要静态对比的高阶用户)

### 4.6 demo flow (Phase B/C 必做)

```
用户 hover time-pillar"商晚期"
  ↓ time-pillar emits era-focus { era: '商', sub_period: '商晚期', source: 'time-pillar.hover' }
  ↓ (debounce 100ms)
  ↓ ↓ ↓
geo-system  listener: 切到商版图, 殷墟+三星堆+盘龙城 同时点亮, 周/晋/楚 国名 fade out
pattern-tree listener: 饕餮/夔龙 节点闪金光 (era-pulse), 云雷地纹高亮
shape-pokedex listener: 高亮"方尊/方鼎" (该朝代主流子型)
  ↓
4 个组件同时活了 = wow moment 形成
```

---

## 5. 反 Skinner 设计纪律 v3 (含 C v1 violation fix)

### 5.1 v3 红线 (扩自 v1)

| 不做 | 替代 |
|------|------|
| ❌ 每日签到积分 | ✅ "金文鉴读" 挑战 (识 5 字累入段位, 0 字也不失) |
| ❌ "差 N 件 解锁 X" 红字紧迫感 | ✅ "您 当前 可 选择 的 研究 方向 →" 平静推荐 |
| ❌ 单纯排行榜 | ✅ "您 的 收藏 风格 分析" 自我对照 |
| ❌ "国宝率 100% (行业 4%)" vanity metric | ✅ "您 的 195 件 禁出境 进度 12/195" clean fact |
| ❌ XP-shaped HUD 头条数字栏 | ✅ "本周 您 主要 关注 西周 中期" 行为叙述 |
| ❌ 体力/疲劳值/广告 | ✅ 0 营销机制, 纯内容驱动 |
| ❌ 抽卡机 | ✅ 必须基于真实收藏 (拍照识别/馆内确认/学术录入) |
| ❌ **v3 新增**: **"X 件解锁 Y" 堆叠面板** (C v1 violation) | ✅ 单页最多 1 个"almost there" callout |
| ❌ **v3 新增**: 龙纹光晕 30s 旋转 (B v1 太花哨) | ✅ 静态金边 + 入场 1.2s (克制) |
| ❌ **v3 新增**: 首件国宝强制 3s 庆祝无法关闭 | ✅ 必须有 [关闭] 按钮 |

### 5.2 "Almost there" Callout 规则 (v3 强化)

- **单页最多 1 个** "almost there" callout
- 必须在 "用户 刚 做了 action 之后" 触发 (不在 first load)
- 语言: "您 当前 可 选择 的 研究 方向 → 大盂鼎 (西周早期, 含 您 未识字 78 个)"
- ❌ 不允许: "再 3 件 解锁 X" / "差 N 字 升段"
- ❌ **v3 新增 anti-pattern**: 不允许"X 件解锁 Y" 多层堆叠 panel (C v1 catalog 页面有此问题)
- ✅ callout 应自动 5s 后淡出, 可手动 [关闭]

### 5.3 称号系统是隐线, 不是显线

- ❌ 不做"成就墙"页面
- ✅ 称号出现在: 用户头像旁角标 (最多 3 个) / 分享卡片水印 / 收藏列表元数据
- ✅ 用户主动想看才看到全部称号 (折叠在个人页"我的称号" tab)

### 5.4 核心信念

**博物馆爱好者反感"游戏化外壳", 欢迎"游戏化内核"。** 差别在于游戏化机制是否服务于内容本身的探索。

---

## 6. 300 件密度下的产品策略 ★ (v3 新增)

### 6.1 知识密度 → 动机密度

300 件 = 中国青铜器学界教学基础范围。在这个规模下:
- 用户**不可能短期全集** (单件 30 分钟阅读, 300 件 = 150 小时)
- 但每件深度内容 (11 字段 + 1-3 张图) 足够支撑"长期游走"
- 关键: 用户每次打开, 都有"今天看哪一件" 的好奇心

### 6.2 三大策略

1. **"今日推荐"** (轻策展)
   - 首页推 3 件: 1 件已收藏的"再读" + 1 件相邻"新探索" + 1 件本周"明星"
   - 推荐算法基于用户收藏画像 (主时代/主形制/主纹饰)
   - 不做"必须打开" 推送, 只在首页柔性显示

2. **"研究路径"** (引导深入)
   - 当用户收藏 ≥ 10 件 → 系统提示"研究路径"
   - 例如: 您 已 收藏 5 件 商晚期 鼎. 探索 路径 →
     - 妇好墓 5 件鼎组 (同墓器物群)
     - 商周鼎制度演变 (跨时代纵向)
     - 司母戊鼎 vs 司母辛鼎 (同主对照)
   - 用户主动选路径, 不强推

3. **"集锦"** (主题策展)
   - 系统编辑"主题集锦": 妇好墓系列 / 三星堆 / 曾侯乙编钟组 / 海外流散十珍
   - 用户可"订阅" 某主题, 该主题相关器物推荐到首页
   - 把 300 件密度变成"多个 30-50 件子集" 的策略

### 6.3 反"密度疲劳"

300 件可能信息过载。v3 应对:
- 默认隐藏"全集" 进度数字 (避免 vanity)
- 主页只显示 "您 主要 在 XXX" 一行行为叙述
- "我的收藏" 默认按时间倒序, 不按完成率
- 每件文物默认折叠 (Hero + 5 维度卡片), 用户主动展开 accordion

### 6.4 "留白态" 提示

用户收藏 100 件后, 看到 "您 已 覆盖 商代 60%, 西周 40%, 春秋 战国 各 20%"
- 提示: 是否要在某朝代深耕, 还是横向覆盖?
- 不强迫, 只提供视角

---

## 7. 称号系统 (隐线, 30+ 称号)

### 7.1 称号分类

**维度类**:
- 朝代: 夏商主义者 / 周礼派 / 战国发烧友 / 秦汉粉
- 形制: 鼎类大师 / 觚的鉴定家 / 尊神 / 簋之友
- 纹饰: 饕餮鉴定师 / 凤鸟收藏家 / 窃曲修士 / 夔龙派
- 用途: 礼器派 / 酒器派 / 乐师 / 兵家

**段位类 (铭文专属)**:
- 初窥 → 入门 → 一段 → 二段 → 鉴师 → 大宗师

**朝圣类**:
- 国博常客 / 三家朝圣者 (殷墟 + 盘龙城 + 三星堆) / 九馆朝圣者

**跨维度类**:
- 二重文明见证者 / 纹饰史学家 / 铭文索引人 / 时空漫游者 / 宅兹中国·见证者

**铸主类**:
- 妇好系列收藏家 / 周王作器人 / 曾侯乙乐工

**稀有度类**:
- 国宝学徒 (10 件) / 国宝收藏家 (50 件) / 国宝学者 (100 件) / 禁出境名录大师 (195 件全)

### 7.2 称号呈现

- 头像旁角标 (最多 3 个, 优先级: 段位 > 跨维度 > 维度专精)
- 分享卡片水印 (用户分享时称号自动印在卡片角落)
- ❌ 不做"成就墙" 页面
- ❌ 不弹彩带 / 不响音 / 不全屏遮挡 — 解锁时只是头像旁悄悄加印章

---

## 8. 反馈循环梯度

| 反馈层 | 时间尺度 | 例子 | 留存目标 |
|--------|---------|------|---------|
| **Hot Loop** | 秒级 | 扫码识别 → 7 维度同时点亮 | day-1 hook |
| **Short Loop** | 分钟级 | 字字悬停 → 识字 +1 / 拓片框选 → 即时入册 | 单次会话内的微正反馈 |
| **Mid Loop** | 分钟-小时级 | hover time-pillar → 三联动 wow / 浏览谱系树看进度 / 切到铸主档案看关联 | 单次会话长度 |
| **Day Loop** | 日级 | 段位累计 / 一周内新发现 X 件 | weekly engagement |
| **Cold Loop** | 周-月级 | 称号解锁 (饕餮鉴定师等) / 特殊视图 (进化时间线/天子之礼/何尊长卷) | monthly retention |
| **Long Loop** | 年级 | 195 件禁出境全集 / 大宗师段位 / 9 馆朝圣印章 | year-1 identity |

**梯度设计原则**: **每一层都有反馈, 缺一不可**. 短反馈支撑日活, 中反馈支撑周活, 长反馈支撑年留存.

**v3 强调**: Mid Loop (跨维度组合) 是 v1 最缺的, v3 必须补足 — 通过 `era-focus` event bus 实现.

---

## 9. 失败模式 off-ramp

### 9.1 收 5 件就停的用户
- **不发推送通知** (不做留存挽回)
- **App 内静态保留** — 用户的 5 件依然在, time-pillar 显示其进度
- **空白段不"恶化"** — 不要因为用户离开就让空白段变红 / 加紧迫
- **重新打开时, 不显示"欢迎回来, 已离开 N 天"** — 像古书, 不嫌读者读得慢

### 9.2 收 100 件后"集齐疲劳"
- **不强求"100% 完成"** — 不在 me 页突出"完成度 87%"
- 引导**横向拓展**: "您 商代鼎 已多, 推荐 试试 西周早期 食器"
- 解锁"研究者模式" — 用户可加私人笔记/写论文/导出研究材料

### 9.3 "为称号而收藏" 的异化
- 称号是隐线 — 不在 UI 主位显示"还差 X 件解锁"
- 称号解锁也不弹大量奖励, 只是头像旁悄悄加小印章
- 用户连续 7 天只追同一称号 → 不做任何引导 — 让用户自己感觉无聊
- 永远不在 UI 上有"还有 3 件就达成" 红字

---

## 10. KPIs v3 (motivation 层)

### 10.1 各维度

| 维度 | 指标 | 目标 |
|------|------|------|
| 形制 | 对照墙 → catalog filter 转化 | > 25% |
| 时代 | time-pillar 平均停留 | > 8s |
| 时代 | 空白段点击转化 | > 15% |
| 地理 | 月活 | > 60% |
| 地理 | "希望它回家" 分享率 | > 5% |
| 纹饰 | 称号系统解锁率 | > 40% |
| 纹饰 | 拓片本访问频次 | > 3 次/月 |
| 铭文 | **何尊长卷完成率** | > 30% |
| 铭文 | 重度用户 (识字 > 100) 月活率 | > 80% |
| 用途 | 场景完成度 ≥ 50% 用户次月留存 | > 70% |
| 铸主 | 档案二次访问率 | > 50% |
| 稀有度 | 首件禁出境后 7 日分享率 | > 30% |

### 10.2 跨维度

| 指标 | 目标 |
|------|------|
| **跨维度组合 unlock 触发率 (周活用户)** | > 25% |
| **跨维度组合 unlock 后"分享/截图" 率** | > 15% |
| **era-focus event 月触发数 (重度用户)** | > 50 次 |

### 10.3 用户旅程

| 阶段 | 指标 | 目标 |
|------|------|------|
| Day 1 | 首件 → 第 2 件转化 | > 60% |
| Week 1 | Day 7 留存 | > 50% |
| Month 1 | Week 4 留存 | > 35% |
| Month 3 | 月活 | > 80% |
| Month 6 | 月活 | > 70% |
| Year 1 | 月活 | > 60% |
| Year 1 | 重度用户 (收藏 > 100) 占比 | > 5% |

---

## 11. 关键论点重申 (给 Builder / Auditor / PM 都看)

1. **形态承载意义, 不装饰意义** — time-pillar 不是装饰的 timeline, 是身体能感觉到的时间厚度
2. **空白比填满更重要** — 给用户看到自己的空白, 是诱发的本源
3. **稀有度是渗透的, 不是独立的** — 不做国宝列表页, 让金光在每个组件视图里闪
4. **称号是隐线, 不是显线** — 不做成就墙; 称号出现在头像角标和分享卡水印
5. **进度可视化优先于数字** — "商代 60%" 不如直接看 time-pillar 填了 60%
6. **跨维度组合比单视图重要** — v3 必有"时代×地理×纹饰" 三联动 demo 触发
7. **认知能力 = 真实奖励** — 用户得到的是鉴别力的提升, 不是 XP
8. **★ v3 新增**: 事件总线协议 (`era-focus` etc.) 是跨组件联动的契约层

---

## 12. v3 vs v1 关键差异

| 维度 | v1 | v3 |
|------|----|----|
| 维度数量 | 10 | 7+1 |
| 知识库规模 | 25 件 | 300 件 |
| 段位机制 | 单纯字数 | 字数 × 跨器出现次数 |
| 国宝率显示 | "国宝率 100% (行业 4%)" | "195 件 禁出境 进度 12/195" |
| "差 N 件 解锁" 文案 | C v1 有 (violation) | 全部删除, 1 个 "almost there" / 页 |
| 跨维度联动 | 仅文档描述 | era-focus event bus 必做 |
| 300 件密度策略 | 未考虑 | 今日推荐 + 研究路径 + 集锦 |
| 何尊长卷 | 未提 | 杀手锏 wow moment (inscription-special.html) |
| 用户旅程 | 笼统 5 阶段 | Day1 → Year1 显式时序 (300 件规模) |
| 稀有度光晕 | 5 档 + 龙纹 30s 旋转 | 4 档 + 国宝静态金边 + 入场 1.2s |
| 首件国宝祝贺 | 强制全屏 3s 无 [关闭] | 加 [关闭] 按钮 (anti-Skinner) |
| 铸主关系图谱 | 静态 ASCII | D3 force-directed graph |
| 地理 | 出土 + 馆藏 两独立组件 | 1 组件 + dual view + 海外第三 view |
| 纹饰 | 节点是灰色圆点 | 25 个标准 SVG icon (P0 必做 15) |

---

> 完. v3 游戏化系统设计完毕.
> 
> 7 个 v3 组件 spec + 1 全局稀有度层 + 1 跨组件事件总线协议 (`era-focus`).
> 
> 所有产出基于核心论点:
> **博物馆爱好者反感游戏化外壳, 欢迎游戏化内核. 差别在于机制是否服务于内容本身的探索.**
> 
> Builder 现在拥有:
> 1. 7 个 v3 组件 spec (`docs/component-specs-v3/`)
> 2. 1 个全局稀有度层 spec
> 3. 跨组件事件总线协议 (§4)
> 4. 反 Skinner 设计纪律 v3 (含 C v1 violation fix)
> 5. 300 件密度下的产品策略 (今日推荐/研究路径/集锦)
> 6. 反馈循环梯度 + 失败模式 off-ramp
> 7. 用户旅程 (Day1 → Year1) 显式时序
> 8. KPIs v3
