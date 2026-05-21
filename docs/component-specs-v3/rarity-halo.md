# Rarity Halo — 稀有度全局视觉层 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/rarity-halo.md` (v1)
> 全局 · 非组件 · 渗透每个组件视图
>
> v3 关键变化 (vs v1):
> - v1 5 档 → v3 4 档 + 国宝特殊 (合并 普通/三级)
> - v1 国宝率 vs 行业平均 (vanity metric) → v3 删除, 只显 clean fact "你的 195 件禁出境进度 12/195"
> - v1 龙纹光晕 30s 旋转 → v3 仅国宝级有明显动画, 其他档静态
> - v1 自动 "首件国宝 3 秒祝贺动画" → v3 保留但加 "[关闭]" 按钮 (不强制中断)
>
> ★ **这不是独立组件, 这是一个全局视觉系统**, 渗透在所有 7 个组件上
>
> 配套数据: `data-schema-v3.md §2 (rarity_level)` · 动机: `motivation-hooks-v3.md §1.8`

---

## One-line purpose

稀有度不是独立维度, 是**叠加在所有 7 个维度视图上的视觉系统**: 时代柱国宝段闪金, 地图国宝出土点金圈, Pokédex 国宝子型节点金边, 演化树国宝纹饰节点金光, 释读器国宝铭文背景泛金, 场景国宝归位金光强化, 铸主国宝档案金边。这是产品的"血液色彩" — 让用户在任何页面都能"瞬间感知 — 这里面有多少金子"。

---

## Visual description

### 4 档 + 1 特殊 (v3 简化版)

```
普通 / 三级文物:
┌─────────────┐
│   ◯          │
│  器物图       │
│             │
└─────────────┘
灰边 #6B6B6B    
无光晕         

二级文物:
┌─────────────┐
│  ◇═══       │
│  器物图     │
│             │
└─────────────┘
紫边 #8A4F8A
无动效

一级文物:
┌─────────────┐
│  ◆     ✦   │
│  器物图     │
│  暗金 1px 影│
└─────────────┘
金边 #C9A85F
box-shadow 微金光 (静态)

国宝级 (禁止出境):
┌────────────────────┐
│  ☆ 国之重器  [印章] │ ← 朱砂红章 (top-right)
│  ✦─────────✦      │
│   器物图           │ ← 周围金边
│  ✦─────────✦      │
│  禁止出境          │ ← 小角标 (bottom-right)
└────────────────────┘
金边 2px #D4A857
box-shadow 12px 金光 (静态)
+ 朱砂红章 (clip-path 印章形状)
+ 微动效: 朱砂章入场 1.2s ease (仅首次进入视图时)
```

### 视觉规范 (CSS)

```css
/* Tier base */
.artifact-card {
  border: 1px solid #6b6b6b;
  background: var(--bg-card);
  position: relative;
}

/* Tier 3 / 普通 */
.tier-3, .tier-common {
  border-color: #6b6b6b;
}

/* Tier 2 / 二级 */
.tier-2 {
  border-color: #8a4f8a;
}

/* Tier 1 / 一级 */
.tier-1 {
  border-color: #c9a85f;
  box-shadow: 0 0 4px rgba(201, 168, 95, 0.4);
}

/* Treasure / 国宝级 (禁出境) */
.tier-treasure {
  border: 2px solid #d4a857;
  box-shadow: 0 0 12px rgba(212, 168, 87, 0.6);
}

.tier-treasure::before {
  /* 朱砂红章 "国之重器" */
  content: "国之重器";
  position: absolute;
  top: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  background: #a73a2a;
  color: #fff7e6;
  font-family: '宋体', serif;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  /* 印章 clip-path (4 字方印) */
  clip-path: polygon(8% 8%, 92% 8%, 92% 92%, 8% 92%);
  transform: rotate(-5deg);
  z-index: 2;
}

.tier-treasure::after {
  /* 小角标 "禁止出境" */
  content: "禁止出境";
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 8px;
  color: #d4a857;
  background: rgba(0, 0, 0, 0.5);
  padding: 1px 4px;
  border-radius: 1px;
}

/* 入场动画 (仅首次显示) */
@keyframes treasure-enter {
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.tier-treasure:first-render {
  animation: treasure-enter 1.2s ease-out;
}
```

### 附加稀有标签 (小印章 12×12 px, 可叠加)

```
[孤]  孤品 (举世仅一)    朱砂方印   stroke #a73a2a
[长]  长铭 (100+ 字)     碧色方印   stroke #4a7a6a
[流]  流散海外           泛黄圆印   fill #b89046
[列]  列鼎完整 (同组全)  青色方印   stroke #4a5a8a
[蜀]  古蜀稀有出土       红边长印   stroke #a02c2c
[战]  战时回归           黄边长印   stroke #b89046
[明]  教科书明星器       金色圆印   fill #d4a857
```

**叠加规则**:
- 在卡片左下角, 横向排列 (最多 4 个)
- 每个 12×12 px, gap 2px
- hover 显示 tooltip 说明

---

## Interaction behavior

### Passive rendering (默认)
- 自动根据 `rarity_level` 字段渲染对应 class
- 附加标签自动判定 (见 §Data §Derived):
  - "长铭" = `inscription.char_count >= 100`
  - "孤品" = 该 `form_subtype` 在 mock 数据池中仅 1 件
  - "流散海外" = `current_museum` 在海外馆列表
  - "古蜀" = `ancient_state` 含"蜀"或 site 含"三星堆/金沙"
  - "禁止出境" = `rarity_level` == "禁止出境"

### Hover 任意带光晕的器物卡
- 浮出 tooltip "国之重器 · 2002 年首批禁止出境 · 编号 K9999"

### Click 国宝级器物
- 进 artifact.html 时, 朱砂红章入场动画 1.2s
- 顶部 banner (可关): "您 正 在 查看 国之重器 — 这 是 国家 不 允许 出境 的 级别"
- [关闭] 按钮 (v3 新加, 不强制中断)

### 首次解锁国宝级
- 全屏 3s 庆祝 (克制, 不彩带):
  - 朱砂红章从天而降盖印
  - 文案: "您 的 第 1 件 禁止出境 国宝 — 这 是 国家 不 允许 出境 的 级别"
  - 底部 [告诉 朋友 您 的 国宝] CTA (天然 social moment, target 分享率 > 30%)
  - [关闭] 按钮 始终可点 (v3 anti-Skinner: 不强制看完)

### v3 anti-Skinner 修正
- v1: "国宝率 100% (行业平均 4%)" → ❌ 删 (vanity metric)
- v3: "您 的 195 件 禁出境 进度 12/195" → ✅ clean fact, 无 comparison

### "首次禁出境祝贺" 后续触发条件
- 仅首件国宝触发全屏庆祝
- 后续每件国宝只显示 "国之重器" 标签入场动画 (1.2s)
- 当用户 5 件、10 件、50 件、100 件国宝时, 出现里程碑 banner (顶部, 5s 自动消失)

---

## Data requirements (v3 fields)

From `data-schema-v3.md §2`:

| Schema 路径 | 用途 |
|-----------|------|
| `basic.rarity_level` | 主分级 ("禁止出境" / "一级文物" / "二级文物" / "三级文物" / "普通馆藏") |
| `inscription.char_count` | 判定"长铭" 标签 |
| `basic.form_subtype` | 判定"孤品" (mock pool 只有 1 件) |
| `basic.current_museum` | 判定"流散海外" |
| `basic.ancient_state` / `basic.excavation_site` | 判定"古蜀" |
| `excavation_detail.co_excavated_group_id` | 判定"列鼎完整" |
| `academic_status.representativeness` | 判定"明星器" |

**Derived data**:
- `rarity_tier{artifact_id: 'treasure'|1|2|3|common}` — 解析后档位
- `rarity_tags{artifact_id: [tags]}` — 附加标签数组
- `museum_overseas[]` — 海外馆列表 (用于"流散海外" 判定)
- `solitary_form_subtypes[]` — 全 mock 池中仅 1 件的 form_subtype (用于"孤品" 判定)

**User state**:
- `user.rarity_distribution{tier: count}` — 用户收藏稀有度分布
- `user.first_treasure_unlocked_date` — 首件国宝解锁日期 (用于"分享" 动画的"已 X 天")
- `user.shared_treasures[]` — 已分享过的国宝
- `user.treasure_progress` — 195 件禁出境进度 (12/195)

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.8) |
|----------|--------------------------------|
| **Rarity ★★** | 全局视觉系统, 渗透所有维度视图 |
| **Identity** | 国宝率 (自我对照, 不做行业 vanity comparison) |
| **Story** | 每件禁出境国宝"国之重器" 叙事 (为何被列入 195 名录) |
| **Connection** | 同稀有度文物的"亲缘视图" — 4 件商代禁出境鼎并排 |

### 首件禁出境后的 7 日 social moment
- 全屏 3s 庆祝触发后, 用户卡片始终标记 "您 的 第 1 件 国宝"
- 解锁称号 "国宝学徒 · 初阶"
- 底部 CTA 持续显示 [告诉 朋友 您 的 国宝]
- 目标分享率 > 30%

### 进阶里程碑 (v3 加, 非强制)
- 5 件国宝 → "国宝学徒"
- 10 件 → "国宝收藏家"
- 50 件 → "国宝学者"
- 100 件 → "国宝鉴师"
- 195 件全集 → "禁出境名录大师" (1-2 年终极目标)

### v3 anti-Skinner
- ❌ "国宝率 100% (行业 4%)" vanity comparison
- ✅ "您 的 195 件 禁出境 进度 12/195" clean fact
- ❌ 龙纹光晕 30s 旋转 (太花哨, B v1 太强)
- ✅ 静态金边 + 朱砂章入场 1.2s (克制)

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Tech** | 纯 CSS + 少量 inline SVG (印章) |
| **Box-shadow** | 静态值, 无 keyframe (除入场动画) |
| **朱砂章** | CSS `::before` + `clip-path: polygon()` (印章形状) + `transform: rotate(-5deg)` |
| **入场动画** | 仅 1.2s 一次, JS 添加 `.tier-treasure-entered` class 后移除 (防重复) |
| **首件祝贺** | localStorage `user.first_treasure_unlocked_date` 检测; 模态 + [关闭] 按钮 |
| **附加标签** | 12×12 SVG inline 套 7 个; CSS flex 左下角排列 |
| **关键 CSS classes** | `.tier-common .tier-3 .tier-2 .tier-1 .tier-treasure .tag-solitary .tag-long-inscription .tag-overseas` |
| **Mobile** (v4) | 不在 v3 范围 |

---

## Cross-component connection ★ (核心)

### Rarity halo 是"渗透层" — 不在某处, 在每处

**应用于全部 7 个维度组件 + 1 全局** (v3 dimensional-map-v3 §8):

| 组件 | 稀有度渗透方式 |
|------|---------------|
| **time-pillar** | 段内国宝缩略图金光晕; 段头"国宝 4/22" 显示 |
| **geo-system** | 国宝出土点金圈; 海外流散文物列表第一位 |
| **shape-pokedex** | 国宝子型节点金边; 卡片整体 `.tier-treasure` class |
| **pattern-tree** | 罕见纹饰 (鸱鸮纹/虎噬人头) 节点金边; 拓片本国宝拓片底色泛黄 |
| **inscription-reader** | 史诗铭 (300+ 字) 卡片金边; 何尊"中国"二字专属"中国"印章 |
| **purpose-scene** | 国宝归位时该位金光强化; 集齐国宝场景金色全景 |
| **caster-profile** | 国宝级铸主 (妇好/曾侯乙) 节点金边; 列传卡金光晕 |
| **artifact.html** | 详情页顶部 "国之重器" banner (可关) |

### Cross flow: 首件国宝
```
用户拍照识别第一件禁出境国宝 (e.g. 后母戊鼎)
  ↓ artifact identified, rarity_level === "禁止出境"
  ↓ 全屏 3s 庆祝 (朱砂红章入框 + 文案 + [关闭])
  ↓
同步效果:
  · time-pillar 商晚期段瞬间金光 + 1 件国宝缩略图入位
  · geo-system 殷墟金圈 + 鼎 icon 入位
  · shape-pokedex 方鼎子型节点金边
  · pattern-tree 饕餮 + 虎噬人头 节点金边
  · inscription-reader "后母戊" 3 字识 +3
  · purpose-scene 太牢"主鼎位" 金光归位
  · caster-profile 妇妌 节点点亮
```

### 不需要 event bus
- Rarity 是 CSS 渲染层, 不参与 event bus
- 直接根据数据字段 `rarity_level` 渲染 class

---

## Anti-patterns (Don't do)

1. **不要用★★★★★ 五星稀有度** — 这是游戏 UI, 博物馆爱好者瞬间删 App (persona A 红线)
2. **不要让光晕过于花哨** — 一级以下无光效, 只国宝级有明显光晕。**"克制 = 高级" 不可动摇**
3. **不要把稀有度做成独立"国宝列表"页** — 那只是查询; 必须在每个组件视图里渗透
4. **不要把"国宝率"做成排行榜竞赛** — 自我对照而非他人比赛 (博物馆爱好者红线)
5. **不要忽略附加标签** — 7 个标签 (孤/长/流/列/蜀/战/明) 是细节深度
6. **不要让首件祝贺动画无法关闭** — v3 必须有 [关闭] 按钮 (anti-Skinner: 不强制中断)
7. **不要做 v1 龙纹光晕 30s 旋转** — 静态金边 + 入场 1.2s 动画 (克制)
8. **anti-Skinner v3**: 不做 vanity comparison "行业平均 X%"; clean fact "12/195" 即可

---

## Cross-reference

- v1 spec: `docs/component-specs/rarity-halo.md` (v1 5 档 → v3 4 档 + 国宝, 简化)
- 数据: `data-schema-v3.md §2 rarity_level`
- 动机: `motivation-hooks-v3.md §1.8`
- 全维度渗透 spec: `dimensional-map-v3.md §★`
- 195 件禁出境名录: 国务院 2002/2012/2013 三批
- Anti-Skinner v3: `gamification-mechanics-v3.md §3`
