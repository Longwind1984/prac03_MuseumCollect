# Night Plan D0 — 23:30 → 07:30 (8 小时无人值守)

> Day 0 → Day 1 早晨的具体执行计划。Orchestrator 是夜跑的主线,所有 spawn / wait / 续跑都由它驱动。
> 项目主仓: `/home/user/prac03_MuseumCollect`

---

## Goal of Tonight

产出 **3 版高保真 demo**(HTML 静态),围绕 20-30 件国宝级青铜器,展示**维度拆解 × 形态承载 × 游戏化机制**的产品创新。早晨 7:30 你 review,选优 / 合并 / 触发下一轮。

### 成功标准 (Definition of Done for Night Run)

- [ ] `docs/dimensional-map.md` — 青铜器 8-10 个维度 + 每个维度的形态承载 + 动机 hook
- [ ] `docs/component-specs/*.md` — 至少 8 个定制化组件 spec(时空柱、古国地图、纹路树、形制谱系、用途场景、工艺长卷、铭文卷、稀有度光晕)
- [ ] `docs/gamification-mechanics.md` — 游戏化机制体系
- [ ] `data/curated/bronze-treasures-v1.json` — 20-30 件国宝结构化数据
- [ ] `content/artifacts/*.md` — 20-30 件国宝的详细信息(各维度填充)
- [ ] `demos/v1-A-textual-research/index.html` — Builder A 完整 demo,可浏览器打开
- [ ] `demos/v1-B-immersive/index.html` — Builder B 完整 demo
- [ ] `demos/v1-C-explorer/index.html` — Builder C 完整 demo
- [ ] `audits/d1-morning/` — 6 份审计报告 + `next-iteration-brief.md` + `merged-spec.md`
- [ ] `morning-report.md` — 一页总览,你 7:30 起床看的就是它

---

## Phase 时间线

```
H0-1  (23:30-00:30) │ Phase 1 — Foundation (3 agent 并行)
                    │ - Domain Researcher → dimensional-map.md + motivation-hooks.md
                    │ - Product Owner → prd-demo-night.md (聚焦今晚 scope)
                    │ - Data Engineer → bronze-treasures-v1.json (20-30 件)
                    │
H1-3  (00:30-02:30) │ Phase 2 — Form Design (1 agent + Researcher review)
                    │ - Visualization Designer → component-specs/*.md × 8
                    │ - Visualization Designer → gamification-mechanics.md
                    │ - Researcher review designer 产出 → 一轮 revise (有界)
                    │
H3-3.5 (02:30-03:00)│ Phase 2.5 — Content Fill (Data Engineer 续跑)
                    │ - Data Engineer 把 20-30 件填到每个维度
                    │ - 产出 content/artifacts/{id}.md × 20-30
                    │
H3-7  (03:00-06:30) │ Phase 3 — Multi-Builder Parallel (worktree × 3)
                    │ - Builder A (考据派) → demos/v1-A-textual-research/
                    │ - Builder B (沉浸派) → demos/v1-B-immersive/
                    │ - Builder C (探索派) → demos/v1-C-explorer/
                    │ 三人都实现:
                    │   - index.html (首页 + 三维度入口)
                    │   - catalog.html (图鉴三维度切换)
                    │   - artifact.html (单件详情,聚合所有定制组件)
                    │   - time-pillar.html (时空柱页)
                    │   - ancient-map.html (古国地图页)
                    │   - pattern-tree.html (纹路树页)
                    │   - me.html (个人图鉴 + 收藏成就 + 游戏化展示)
                    │   - scan.html (拍照识别 UI,mock 数据)
                    │
H7-7.5 (06:30-07:00)│ Phase 4 — Audit Squad (6 个并行)
                    │ - UX Auditor → audits/d1-ux.md + next-brief-ux.md
                    │ - Aesthetic Auditor → audits/d1-aesthetic.md + next-brief
                    │ - Content Auditor → audits/d1-content.md + next-brief
                    │ - Motivation Auditor → audits/d1-motivation.md + next-brief
                    │ - PM Auditor → audits/d1-pm.md + next-brief
                    │ - Comparative Auditor → audits/d1-comparative.md + merged-spec.md
                    │
H7.5-8 (07:00-07:30)│ Phase 5 — Morning Report
                    │ - Orchestrator 整合 → morning-report.md
                    │   - 3 个 demo 的入口链接 + 截图(若有截图工具)
                    │   - 6 个 audit 核心结论
                    │   - 横向比对表
                    │   - merged-spec(综合最优方案)
                    │   - 待你决策的 3-5 个开放问题
```

---

## Phase 详细 brief

### Phase 1 — Foundation (3 agent 并行)

#### Domain Researcher (Opus)
- **任务**: 拆解青铜器领域,产出维度地图 + 动机 hook
- **输出**:
  - `docs/dimensional-map.md`:
    - 至少 8 个维度: 时代 / 出土地 / 馆藏地 / 形制 / 纹路 / 用途 / 工艺 / 铭文 / 稀有度 / 主人(可选)
    - 每个维度: 子分类体系 + **推荐的产品形态** + **承载该形态的视觉/交互范式参考**
  - `docs/motivation-hooks.md`:
    - 每个维度可以怎么变成"诱发收集"的 hook
    - 完成感 / 关联感 / 稀有感 / 故事感 / 创造者身份感 等
- **质量要求**: 不要给抽象方案,要给具体形态(比如"时空柱"不是"timeline component",而是"垂直滚动的朝代柱,商周/春秋/战国/秦汉为区段,用户收藏件填充对应区段,空白区段诱发收集")
- **资源约束**: 3 万-5 万 token,1 次 LLM 调用 + 必要 web search

#### Product Owner (Opus)  
- **任务**: 写今晚 scope 的 mini-PRD
- **输出**: `docs/prd-demo-night.md`,聚焦:
  - 用户画像 (重申: 硬核博物馆爱好者)
  - 三种 differentiated persona 给 Builder
  - 必须出现在 demo 中的 7 个核心页面
  - 验收标准
- **资源约束**: 2 万 token

#### Data Engineer (Sonnet)
- **任务**: 准备 20-30 件国宝级青铜器结构化数据
- **必收清单**:
  ```
  1. 后母戊鼎 (商,中国国家博物馆)
  2. 四羊方尊 (商,中国国家博物馆) 
  3. 妇好鸮尊 (商,河南博物院)
  4. 大盂鼎 (西周,中国国家博物馆)
  5. 大克鼎 (西周,上海博物馆)
  6. 毛公鼎 (西周,台北故宫)
  7. 散氏盘 (西周,台北故宫)
  8. 何尊 (西周,宝鸡青铜器博物院)
  9. 利簋 (西周,中国国家博物馆)
  10. 虢季子白盘 (西周,中国国家博物馆)
  11. 莲鹤方壶 (春秋,故宫/河南博物院双子壶)
  12. 越王勾践剑 (春秋,湖北省博物馆)
  13. 曾侯乙编钟 (战国,湖北省博物馆)
  14. 曾侯乙尊盘 (战国,湖北省博物馆)
  15. 错金博山炉 (西汉,河北博物院)
  16. 长信宫灯 (西汉,河北博物院)
  17. 马踏飞燕/铜奔马 (东汉,甘肃省博物馆)
  18. 三星堆青铜大立人 (商晚期,三星堆博物馆)
  19. 三星堆纵目面具 (商晚期,三星堆博物馆)
  20. 三星堆青铜神树 (商晚期,三星堆博物馆)
  21. 子龙鼎 (商,中国国家博物馆)
  22. 四羊首铜瓿(商,湖南博物院)
  23. 龙形觥 (商,山西博物院)
  24. 铜车马 (秦,秦始皇陵博物院)
  25. 商鞅方升 (战国,上海博物馆)
  ```
  - 每件最少字段: name / dynasty / period / excavation_year / excavation_site / current_museum / size / weight / type (品类) / form_subtype (形制子型) / patterns (纹饰) / inscription_summary / purpose / craft / rarity_level (国宝/一级/二级/三级) / story_brief (1 段简介) / official_image_url (来源标注)
- **输出**: 
  - `data/curated/bronze-treasures-v1.json`
  - `data/raw/sources.md` (每件数据的来源标注)
- **数据来源**: MET API + 维基百科 (中英文) + 各馆官网开放部分 + 殷周金文集成(若可获取)
- **资源约束**: 严格只用开放或合理引用的数据,版权风险标到 `licensing-log.md`

### Phase 2 — Form Design

#### Visualization Designer (Opus)
- **任务**: 基于 Researcher 的 dimensional-map,设计每个维度的具体产品组件 + 游戏化机制
- **必须开放性思考**:
  - 不要把游戏化做成"积分+徽章+排行榜",而是和维度本身融合
  - 例:时空柱本身就是收集进度;古国地图本身就是漫游成就;纹路树本身就是鉴别等级
- **输出**:
  - `docs/component-specs/time-pillar.md` (时空柱)
  - `docs/component-specs/ancient-map.md` (古国地图)
  - `docs/component-specs/pattern-tree.md` (纹路演化树)
  - `docs/component-specs/form-genealogy.md` (形制谱系)
  - `docs/component-specs/purpose-scene.md` (用途场景重建)
  - `docs/component-specs/craft-scroll.md` (工艺工序长卷)
  - `docs/component-specs/inscription-reader.md` (铭文交互)
  - `docs/component-specs/rarity-halo.md` (稀有度视觉)
  - `docs/gamification-mechanics.md` (整体游戏化体系)
- 每个 spec 包含:
  - 视觉描述(可以画 ASCII 草图)
  - 交互行为
  - 数据需求
  - 游戏化 hook
  - 实现建议(D3.js / Canvas / SVG / 纯 CSS)

### Phase 3 — Multi-Builder Parallel

3 个 Builder 在 isolation: worktree 中并行运行,各自完整实现 demo。

#### 共同要求
- 技术: HTML + Tailwind CDN + vanilla JS + D3.js (按需)
- 单页或多页都行,可浏览器直接打开
- 必须包含所有 8 个定制组件中至少 6 个
- 必须包含游戏化机制的可见表达(用户能"感受到为什么要收集")
- 用 mock 数据(从 data/curated/bronze-treasures-v1.json 读)

#### Builder A — 考据派
- 目标用户: 青铜器研究生 / 资深爱好者
- 信息架构偏: 资料丰富、引用来源、多维度对照
- 交互偏: 高效检索、详尽筛选、可导出
- 视觉自由发挥

#### Builder B — 沉浸派
- 目标用户: 文化爱好者,看完《国家宝藏》会被打动的人
- 信息架构偏: 故事线、场景重建、情绪牵引
- 交互偏: 沉浸式翻页、动效、配乐(可静态模拟)
- 视觉自由发挥

#### Builder C — 探索派
- 目标用户: Z 世代,把博物馆当游戏厅
- 信息架构偏: 游戏化最重、社交分享、轻量学习
- 交互偏: 拖拽、卡片翻转、解锁动效
- 视觉自由发挥

### Phase 4 — Audit Squad (6 个并行)

每个 Auditor 在 cold context 下加载 3 个 demo + dimensional-map + component-specs,然后写 audit。

每个 audit 包含:
- 3 个 demo 各自的优缺点(简短)
- 用本视角给出最关键的 3-5 个观察
- **`next-iteration-brief.md`**: 下一轮要做什么(具体 actionable)

Comparative Auditor 是 squad 的总编,负责:
- 横向比对表
- 综合最优方案 `merged-spec.md`

### Phase 5 — Morning Report

Orchestrator 整合,产出 `morning-report.md`:
- 一页综述
- 3 个 demo 的访问入口 + 关键截图链接
- 6 个 audit 核心结论(一句话)
- 横向比对矩阵
- merged-spec 核心要点
- 待你 review 的 3-5 个开放问题
- cost-report 摘要(夜跑总成本)

---

## Orchestrator 的自主决策协议

夜跑期间 Orchestrator 会遇到 ambiguity。处理原则:

| Ambiguity 类型 | 处理方式 |
|---------------|---------|
| 实施细节(用 Tailwind 还是 vanilla CSS) | Orchestrator 自决,记 decision-log |
| 维度选择(是否包含"主人/铸造者"维度) | Orchestrator 自决偏向"包含",记 log |
| 数据缺失(某件没有完整 metadata) | Orchestrator 让 Data Engineer 标 TODO,跳过继续 |
| Builder 间风格冲突 | 不干预,差异本身就是 Comparative Audit 的素材 |
| Auditor 提出根本性问题(比如方向错了) | 写入 morning-report 高优问题,不擅自重做 |
| 数据版权风险(某来源不确定可用) | 立刻停用该来源,记 licensing-log |
| Token 严重超预算 | 启用降级:Builder C 用更轻的实现,暂停 inscription-reader 等组件 |

每一条自主决策都写到 `state/decision-log.md`,你 7:30 可以扫一遍 rollback。

---

## Token / Cost Budget(粗估)

| Phase | Token 估算 | 模型 |
|-------|-----------|------|
| Phase 1 | 200K | Opus × 2 + Sonnet × 1 |
| Phase 2 | 300K | Opus × 1 |
| Phase 2.5 | 100K | Sonnet × 1 |
| Phase 3 | 600K | Sonnet × 3 worktree |
| Phase 4 | 400K | Opus × 1 + Sonnet × 5 |
| Phase 5 | 100K | Opus × 1 |
| 缓冲 (revise loop) | 300K | mixed |
| **总计** | **~2M token** | |

`cost/cost-report.md` 实时更新,作品集亮点之一。

---

## Failure Modes & Recovery

| 失败模式 | 应对 |
|---------|------|
| Builder 卡住超过 60 min | Orchestrator kill 该 builder,记 log,继续其他两个 |
| Data Engineer 拿不到某来源数据 | 标 TODO,用维基百科 fallback,记 licensing 风险 |
| 某 Auditor 报告异常短/空 | Orchestrator 重启该 Auditor 一次,仍失败则跳过 |
| Researcher / Designer 跑偏 | 由 PM Auditor 提早发现,直接 escalate Orchestrator |
| 整个 phase 时间超额 | 缩短下游 phase,优先保证 3 个 demo 出来 |

---

## 启动指令

你睡前发: **"启动"** (或 "go" / "begin night run")

Orchestrator 启动后会:
1. 读取本 plan
2. 写一次 `state/state.md` 初始化
3. 并行 spawn Phase 1 的 3 个 agent (background)
4. 进入 wait-and-coordinate 循环
5. 直到 morning-report 完成,end-of-night-run
