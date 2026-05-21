# Time Pillar — 时代柱 (v3)

> Visualization Designer v3 · 2026-05-21 H2 · Night Run D1
> Supersedes `docs/component-specs/time-pillar.md` (v1, 名为"时空柱")
> Phase B3 · Priority P0 (三联动的核心轴)
>
> v3 命名修正: "时空柱"→"时代柱" (v1 名误导用户以为含地理维度)
> 配套数据: `data-schema-v3.md §2` · 动机: `motivation-hooks-v3.md §1.2`
> 跨维度: ★ `era-focus` event bus PRIMARY EMITTER

---

## One-line purpose

把"时代"做成一根**身体能感觉到 3000 年厚度**的垂直柱: 朝代段高度严格正比于时长 (商 554 年 vs 西周 275 年, 视觉上立刻看出商更厚), 朝代专属配色 (夏褐/商青铜/西周朱/...) 让"商"和"周"在视觉上立刻分离, 15+ 历史事件刻度把收藏体验和历史叙事钩在一起, 收藏密度叠加让"我在哪个时代很活跃, 在那个时代是真空" 一眼可见。**v3 必做: hover 朝代段 → emit `era-focus` 触发地理+纹饰同步联动**。

---

## Visual description

### 主柱体 (全屏 100vh, 居中 width 480px)

```
                                                    ┃ 右侧事件刻度
   时间轴 (左侧, BC/AD)        时代柱主体             ┃ (朱砂圆点 12px)
   ──────────────────────────────────────────────────┴────────────────────
                                                                          
   220 AD ─┐                                                              
            │                                                             
            │  ┌─────────────────────┐                                    
            │  │  汉  (汉黄 #b89046)  │  441 yr (秦汉合)                   
            │  │  ░░░░░░░░░░░░░░░    │  你: 5 件 · 12% 饱和             ● 张骞通西域 -138
            │  │  汉武帝中兴 (西汉中) │                                  ● 文景之治 -180
            │  │                      │                                    
            │  │ ╞ 西 ╡ ╞ 东 ╡         │  ← 子分期 (zoom 2× 显示)         
            │  │  ████    ░░           │                                    
   221 BC ─┤   ──────────────────                                          
            │  ┌─────────────────────┐                                    
            │  │  秦  (秦玄 #1a1a1a)   │  15 yr                             ● 统一六国 -221
            │  │  █                    │  你: 2 件 · 100%                  ● 焚书坑儒 -213
            │  └─────────────────────┘                                    
            │  ┌─────────────────────┐                                    
            │  │  战国 (战赭 #7a3a2a) │  255 yr                            
            │  │  █████████████░░░    │  你: 18 件 · 56% 饱和             ● 商鞅变法 -356
            │  │                      │                                  ● 长平之战 -260
            │  │ ╞早╡╞中╡╞晚╡          │                                    
            │  │  ███  ████ █████      │                                  
            │  └─────────────────────┘                                    
   476 BC ─┤  ──────────────────                                          
            │  ┌─────────────────────┐                                    
            │  │  春秋 (春墨 #2a2a3a) │  295 yr                          ● 三家分晋 -453
            │  │  ████░░░░░░░░░░░     │  你: 4 件 · 12% 灰呼吸           ● 平王东迁 -770
            │  └─────────────────────┘                                    
   771 BC ─┤  ──────────────────                                          
            │  ┌─────────────────────┐                                    
            │  │  西周 (周朱 #a73a2a) │  275 yr                          ● 厉王共和 -841
            │  │ ╞早╡╞中╡╞晚╡          │                                  ● 周公东征 -1042
            │  │  ████ ░░░ █████      │  早 12 · 中 0 · 晚 4              ● 武王伐纣 -1046
            │  │                      │  ◄── 中期 0 件: 缓慢呼吸 (诱发)   
            │  └─────────────────────┘                                    
   1046 BC ┤  ──────────────────                                          
            │  ┌─────────────────────┐                                    
            │  │  商  (商青铜 #4a5a3a)│  554 yr (最厚朝代!)               ● 武丁中兴 -1250
            │  │ ╞早╡╞中╡╞晚╡          │                                  ● 妇好征伐 -1230
            │  │  ░░░░░░░ █████████   │  早 0 · 中 0 · 晚 22              ● 盘庚迁殷 -1300
            │  │                      │  ◄── 早+中: "二里岗时期 史料 稀薄"  
            │  │                      │       "您 的 收藏 等待 唤醒"       
            │  └─────────────────────┘                                    
   1600 BC ┤  ──────────────────                                          
            │  ┌─────────────────────┐                                    
            │  │  夏  (夏褐 #6e4a2e)  │  250 yr                          ● 二里头四期 -1500
            │  │  █░░░░░░░░░          │  你: 1 件                          
            │  └─────────────────────┘                                    
   1750 BC ┴  ──────────────────                                          
                                                                          
   ─────────── 缩放 [─][1×][+]  /  穿越模式 [● on]  ──────────             
```

### 关键视觉细节

1. **真比例时长**: 高度 = (朝代时长 / 总跨度 1970 年) × 全柱高 (90vh)
   - 商 554 yr → 25.3vh (最厚)
   - 汉 195 yr → 8.9vh
   - 夏 250 yr → 11.4vh
   
2. **朝代专属配色**:
   - 夏 `#6e4a2e` (夏褐, 土夯色)
   - 商 `#4a5a3a` (商青铜, 锈青色)
   - 西周 `#a73a2a` (周朱, 朱漆色)
   - 春秋 `#2a2a3a` (春墨, 墨色)
   - 战国 `#7a3a2a` (战赭, 赭土色)
   - 秦 `#1a1a1a` (秦玄, 玄色)
   - 汉 `#b89046` (汉黄, 鎏金色)

3. **收藏密度叠加 (饱和度)**:
   - 0 件 → `opacity: 0.4` + 缓慢呼吸 (CSS keyframe `opacity: 0.4 → 0.7 → 0.4`, 5s loop)
   - 1-5 件 → `opacity: 0.6`
   - 6-15 件 → `opacity: 0.8`
   - 16+ 件 → `opacity: 1.0` 满饱和

4. **历史事件刻度 (15+ events)**:
   - 必标: 二里头四期 / 盘庚迁殷 / 武丁中兴 / 妇好征伐 / 武王伐纣 / 周公东征 / 厉王共和 / 平王东迁 / 三家分晋 / 商鞅变法 / 长平之战 / 统一六国 / 焚书坑儒 / 文景之治 / 张骞通西域
   - 视觉: 右侧 12px 朱砂圆点 + 横线引到精确年份位置 + 12px label
   - 点事件 → 弹"该年前后 5 件代表器" mini cards

5. **空白段呼吸**: 0 件的段落持续 `keyframe breath` 动画 (5s loop opacity), 文案: "商早期·二里岗 史料 稀薄, 您 的 收藏 等待 唤醒" — 邀请, 不是负面

---

## Interaction behavior

### Default state
- 柱体 居中 vertical layout, 自动 scroll 到用户收藏最集中的段落 (e.g. 商晚)
- 顶部固定 [─ 1× +] 缩放控制 + [● 穿越模式 on/off] toggle

### Hover 朝代段 ★ (核心交互)
1. 该段 scale 1.02 + box-shadow 内发光
2. 浮出右侧 mini panel (300ms slide-in): "商 · 554 年 · 你 22 件 · 国宝 4 件"
3. **★ Emit `era-focus` event** (核心 cross-dim trigger)
   ```js
   window.dispatchEvent(new CustomEvent('era-focus', {
     detail: {
       era: '商',                      // 朝代 enum
       sub_period: '商晚期',            // 可选子分期 (zoom 2×+ 才有)
       year_start: -1600,
       year_end: -1046,
       source: 'time-pillar.hover'
     }
   }))
   ```

### Click 朝代段
- 该段 expand 显示子分期 (商早/中/晚)
- 再 click 子分期 → 跳 catalog `?period={sub_period}` filter
- emit `era-focus` with `sub_period` field

### Zoom
- 1× 视图: 7 个大朝代
- 2× 视图 (滚轮放大): 显示子分期 (商早/中/晚, 西周早/中/晚, 战国早/中/晚)
- 4× 视图: 显示具体王世 (武丁/武乙/帝乙/帝辛 / 武王/成王/康王/...)
- 在 4× 视图下, 王世点击 emit `caster-focus` event (关联到 caster-profile)

### 缩略图浮出
- 该段已收藏件物以 24×24 px 缩略图 (silhouette) 在段内"沉浮" (按 approx_year 在段内的相对位置)
- 国宝级缩略图带金光晕 (rarity-halo overlay)

### 穿越模式 toggle
- on (默认): hover 触发三联动 (era-focus event)
- off: hover 只在本柱体高亮, 不影响其他组件

### Long-press 空白段
- 弹 "西周中期 (穆王 恭王 懿王 100 年), 您 当前 收藏 0 件. 推荐 起点: 大克鼎 (周孝王, 上海博物馆)"
- 不强推, 平静推荐, 可关闭

---

## Data requirements (v3 fields)

From `data-schema-v3.md`:

| Schema 路径 | 用途 |
|-----------|------|
| `basic.dynasty` | 7 朝代分段 |
| `basic.period` | 子分期细分 (商早/中/晚) |
| `basic.approx_year` | 件物在段内的精确 y 位置 |
| `basic.name_zh` / `basic.id` | 缩略图 + 跳转 |
| `basic.rarity_level` | 段内件物金光晕 (rarity-halo) |
| `academic_status.primary_caster` | 4× zoom 王世关联 |

**Derived data**:
- `dynasty_pool{dynasty: count}` — 该朝代 mock 件数 (分母)
- `dynasty_collected{dynasty: count}` — 已收藏件数 (分子)
- `period_height_ratio{dynasty}` — 朝代时长 / 总跨度
- `events[]` — 15+ 历史事件 hand-curated (year, name, dynasty_ref)
- `dynasty_palette{dynasty: hex}` — 7 色配色表

**User state**: `user.collected_ids[]`, `user.collected_dates{id}`

---

## Game mechanic hook

| Hook 类型 | 机制 (motivation-hooks-v3 §1.2) |
|----------|--------------------------------|
| **Temporal Completion** | 时代柱填充率 + 空白段呼吸诱发 |
| **Completion** | 子分期颗粒度 (商早/中/晚 拆开), 空白更精细 |
| **Identity** | 商代主义者 / 周礼派 / 战国发烧友 (基于主要时代) |
| **Story** | 点朝代段 → 解锁"该时代故事卷" (5-8 件代表器物的串联叙事) |
| **Connection** | 三联动 wow moment (本组件 = 触发器) |

### 集齐解锁
- 任一朝代填充 ≥ 80% → 段头出现"通鉴"印章 (西周通鉴 / 商通鉴), 解锁该朝代"故事卷"
- 全 7 朝代各 ≥ 1 件 → "踏遍三代秦汉" 称号

### "Almost there" callout (单页限 1)
- 仅当用户**刚收藏完一件**且某朝代离 80% 还差 1-2 件 → 段尾浮出 "再 2 件 → 西周通鉴" (淡, 5s 自动消失)
- 语言: 平静的"研究方向", 不是红字紧迫

---

## Implementation hint

| 项 | 选择 |
|----|------|
| **Tech** | SVG (柱体 `<rect>` + clipPath 填充) + D3 zoom + framer-motion 呼吸 |
| **D3 用法** | `d3.scaleLinear()` map (year → y pixel); `d3.zoom()` 1×/2×/4× 切换 |
| **配色** | CSS custom properties `--dynasty-shang: #4a5a3a` 等, segment 用 `fill: var(...)` |
| **呼吸动画** | CSS `@keyframes breath { 0%, 100% { opacity: 0.4 } 50% { opacity: 0.7 } }` 5s infinite |
| **饱和度** | CSS `filter: saturate(40%)` for empty, `saturate(100%)` for full |
| **事件刻度** | SVG `<line>` + `<circle>` + `<text>` foreignObject, hover 弹 mini cards |
| **Event bus** | `window.dispatchEvent(new CustomEvent('era-focus', ...))` (见 cross-component) |
| **Mobile** (v4) | 不在 v3 范围 |

---

## Cross-component connection ★ (核心)

### 时代柱是三联动的 PRIMARY EMITTER

**Event bus contract**: `era-focus` event

| 字段 | 类型 | 含义 |
|------|------|------|
| `detail.era` | string | "夏"/"商"/"西周"/"春秋"/"战国"/"秦"/"汉" |
| `detail.sub_period` | string \| null | "商晚期"/"西周早期"/... 仅 zoom 2×+ 时有 |
| `detail.year_start` | number | 朝代起始年 (BC 为负) |
| `detail.year_end` | number | 朝代终止年 |
| `detail.source` | string | "time-pillar.hover" / "time-pillar.click" |

**Listeners** (相应 re-render):
1. **geo-system** (`geo-system.md`): 切到该朝代古国疆域 overlay (CSS transition 800ms, 国名标签平滑漂移)
2. **pattern-tree** (`pattern-tree.md`): 高亮该朝代主流纹饰节点 (商晚→饕餮/夔龙; 西周中→凤鸟; 春秋→蟠螭; 战国→蟠虺)
3. **shape-pokedex** (可选): scroll 到该朝代主流子型 (商晚→方尊/方鼎)

### 联动 demo flow
```
用户 hover 时代柱"商晚期"
  ↓ time-pillar emits era-focus
  ↓ ↓ ↓
geo-system: 切到商版图, 殷墟+三星堆+盘龙城 同时点亮
pattern-tree: 饕餮/夔龙 节点闪金光, 云雷地纹高亮
shape-pokedex: 高亮"方尊"子型 (该朝代主流)
  ↓
3 个组件 + 时代柱 = 4 个视图同时活了, wow moment 形成
```

### Rarity overlay
- 段内国宝缩略图带金光晕
- 段头国宝数显示 (e.g. "商晚期 · 4/22 件国宝")

---

## Anti-patterns (Don't do)

1. **不要把朝代画成等长方格** — 真比例时长是这个组件的灵魂, 等分立刻沦为装饰 timeline
2. **不要在柱体上加 XP 进度条或星星** — 时代不是关卡, 稀有度光晕已经在做这件事
3. **不要把空白段做成"待开放"灰锁** — 这会让用户觉得是付费墙; 空白段是诱发, 不是禁止, 文案应该是"待踏足"而不是"未解锁"
4. **不要硬切朝代过渡** — CSS transition 必须 ease-out 800ms, 让用户感觉时代是"漂移", 不是"切换"
5. **不要把事件刻度做成 100 个密密麻麻** — 15-20 个最大, 必须有取舍 (选最影响青铜器的事件)
6. **anti-Skinner**: 不堆"X 件解锁朝代通鉴" 红字; almost-there callout 单页限 1 个; "您 的 收藏 等待 唤醒" 而非"快收藏!"
7. **配色不要花哨饱和** — 7 朝代配色来自考古学界对器物色调的总结 (土夯/锈青/朱漆/...), 必须沉稳

---

## Cross-reference

- v1 spec (改名 + 重做): `docs/component-specs/time-pillar.md`
- 三联动 spec: `dimensional-map-v3.md §8.1`
- 配色依据: `dimensional-map-v3.md §2.3`
- 数据: `data-schema-v3.md §2`
- 动机: `motivation-hooks-v3.md §1.2`
- 事件总线契约: `gamification-mechanics-v3.md §4` (Event Bus Protocol)
