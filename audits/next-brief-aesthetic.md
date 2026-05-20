# Next Iteration Brief: aesthetic — 2026-05-20

> 给下一轮 Builder / Designer 的视觉迭代清单。不重复 UX 审计的内容, 只谈"看起来值不值得用'国宝'两个字"。

---

## What to keep (这些视觉资产是这次迭代的 crown jewels, 进 v2 必须保留)

### 来自 A 考据派
1. **scholar.css 的整套 token 系统**: `--paper / --ink / --bronze / --vermilion / --jade / --indigo / --rule-dark` — 这是三版里唯一一个可以**直接当生产 design system 用的 CSS 变量集**, 命名清晰、值经过推敲。
2. **`section-cap` 章节小标** (0.75rem 字号 + 0.35em letter-spacing + `border-bottom: 1px solid var(--rule)`) — 这是 v2 的"中文学术分节"语言, 在任何场景都好用。
3. **`.cite-ref` superscript + dotted underline + hover tooltip** — 引用系统应作为 v2 内容详情页的标配, 不只是考据派专享。所有"事实陈述"都该可挂引用, 这是产品诚实度的视觉表达。
4. **`.dossier::before` 浮于边界的"档 案 卡"标签** — 这种"边栏标签"的修辞可以扩展到 v2 其他卡片(如"今日推荐""即将解锁")。
5. **box-plot 替代雷达**: me.html 的稀有度可视化用 box-plot 而非 radar chart — 视觉上更冷静, 更"研究"。v2 个人页应延续。
6. **time-pillar 1500px 真比例柱 + 朱砂引用边事件**: 这是 A 在 spec 上把"形态承载意义"做到位的一例, **本身就是 portfolio piece**, 直接抄进 v2 即可(可缩到 1200px 适配 laptop)。

### 来自 B 沉浸派
7. **`calligraphy-title` 楷书做大标题 + clamp(2.2rem, 6vw, 4.5rem) + 0.18em letter-spacing**: 这是 v2 在"诗意时刻"必须保留的视觉重器。建议作为"特殊时刻"标题样式, 而非通用。
8. **`.seal` 朱砂红章 -2deg 旋转 + dashed 外圈**: 这个细节(印章歪一点 + 外圈虚线模拟印泥渗) 是 B 视觉最有功夫的一点, 应进 v2 design system。
9. **purpose-scene 的 isometric 宗庙 SVG + 火苗 `<animate>` morph**: 这是整个 night run 唯一一个"看完会发抖音"的页面。v2 必须保留这个组件, 并扩展到其他场景 (燕飨 / 葬礼 / 军礼)。
10. **monologue 第一人称独白 + drop-cap (`::first-letter` 4em 楷书 + 鎏金)**: 文人审美 + 现代杂志感的杂交, 是 v2 文物详情页应有的"叙事区"标配。

### 来自 C 探索派
11. **稀有度严格分层** (普通/三级/二级 = 无光晕, 一级 = box-shadow only, 国宝级 = conic-gradient halo-spin 30s + 朱砂章): 三版里**最高级的稀有度表达**, v2 直接抄。
12. **`.guo-bao-stamp` 内白边 `border: 2px solid rgba(255,255,255,0.35)`**: 印泥渗到印面外的微外缘细节, 进 v2 design system。
13. **`me.html` 底部"不必每天打开" anti-Skinner banner**: 视觉 + 文案 + 姿态三位一体的杰作。**v2 必须保留这一段**, 不能为了"留存率"删掉。这是产品 dignity 的视觉宣言。
14. **fade-up.delay-1/2/3/4 入场错峰 (80/160/240/320ms)**: Apple Today 编辑专题级节奏。v2 主入口页应延续。
15. **三色 accent (朱砂 + 翠绿 + 鎏金) 饱和度 50-60% 的调色**: 这是故宫文创经典三角的现代版本, 进 v2 design system。

---

## What to change (这些视觉决策必须修)

### Critical (must fix for v2)

#### C-1. **B 的 image fallback 不能是渐变方块** [P0]
- 文件: `demos/v1-B-immersive/css/immersive.css` `.bronze-placeholder`
- 当前: `radial-gradient` + 大字"妇好鸮尊"
- 改成: **每件器物预生成一个 SVG line-drawing silhouette**, 风格参考故宫数字文物库的拓片线描。规格: 单色 (1.5px stroke), 形态识别度高, **不假装是图片**, 而是诚实地说"这是它的影子"。
- 实施成本: 25 件 × 30 分钟 SVG = 12 小时人工。可外包给设计实习生或用 PS path 抓图后转 SVG。

#### C-2. **C 的 placeholderSvg 不能用同一个椭圆 blob** [P0]
- 文件: `demos/v1-C-explorer/js/state.js` `placeholderSvg`
- 当前: 所有器物用一个 ellipse + 两个 path
- 改成: **按 `a.type` 切换 5-8 个剪影模板** (鼎 / 簋 / 尊 / 觚 / 钟 / 编钟 / 灯 / 剑), 每个模板特征明显 (鼎有三足 / 簋有圈足两耳 / 尊广肩 / 觚高细颈)。
- 注: 这个跟 C-1 应该**共用同一套 silhouette SVG 资产** — 不要让 B、C 各自做一套。统一资产做完, A 的 thumb-box 也可以用 (作为"待录入"的暗灰版)。

#### C-3. **B 的 hero 区诗化文案叠加要减半** [P0]
- 文件: `demos/v1-B-immersive/index.html` 第 39-66 行
- 当前: 4 行诗 + CTA + 状态 — 一屏太密
- 改成: 只保留 **1 行诗 ("等过三千年, 你来看我")** + h1 标题 + 1 个 CTA + 1 行状态。删除"穿过那一道青铜的门"、"不是 App, 是一卷可以走进去的长卷"、"听完它的话 →" 等堆叠的诗化句。**让画面承担情绪, 不让文字代劳**。

### Important (should fix for v2)

#### C-4. **C 的 logo "青" 字渐变方块要换** [P1]
- 文件: `demos/v1-C-explorer/index.html` 第 17 行 (重复 8 次)
- 当前: `linear-gradient(135deg,#c0392b 0%,#c9a85f 100%)` 圆角方块
- 改成: 单色朱砂方块 (`#c0392b`) + 白字"青" + 朱砂印章风格(参考 `.guo-bao-stamp` 同款做法), 与全站故宫文创气质对齐。

#### C-5. **A 的"导出研究笔记"按钮要去 SaaS 化** [P1]
- 文件: `demos/v1-A-textual-research/index.html` 第 49 行
- 当前: full-width 黑底白字按钮
- 改成: `.scholar-btn` 不带 primary, max-width 12rem, 跟 dossier 视觉一致; 或迁到底部章节当独立功能区。

#### C-6. **B 的 purpose-scene disabled toggle pills 要隐藏** [P1]
- 文件: `demos/v1-B-immersive/purpose-scene.html` 第 28-31 行
- 当前: 3 个 `opacity:0.5` disabled tabs ("燕飨/军礼/葬礼")
- 改成: 直接删, 或挪到 footer 角落小字"更多场景待上线"。不要在沉浸场景里泄露产品 backlog。

#### C-7. **B 的呼吸动效叠加要做减法** [P1]
- 当前: 一件器物的卡片同时有 ken-burns 28s + halo breathe 7s + sleeping glow 6s + paper-grain noise + fade-up 1.2s
- 改成: 选 1-2 个保留 (建议保留 halo breathe + 极慢 ken-burns 任选其一), 其余删。**博物馆里的器物是静止的, 不该一直呼吸**。

### Nice-to-have

#### C-8. **A 的等宽数字字体固定**
- 加载一个 webfont (建议 JetBrains Mono Web CDN), 不依赖系统 fallback。

#### C-9. **C 的 fade-up 改用 IntersectionObserver**
- 抄 B 的 `MCUI.observeFadeUp` 实现, 避免 5+ 个 fade-up 同时启动失序。

#### C-10. **mock state 数字反"齐整"化**
- A: 187 → 184 字 (二段, 距三段 116 字), 12,350 → 11,840 字笔记
- B: 8/25 → 9/25, "夔龙派初识" → "夔龙派初识(第3周)" — 加时间戳显真实
- C: 100% 国宝率 → 7/8 (88%) 国宝率, 其余 1 件是一级 — 显示阿K**也有"中等卡"**, 不是 perfect cherrypick

---

## What to add (这些视觉资产 v2 必须新增)

### 视觉资产层
1. **统一的器物 silhouette SVG 套 (10 套)**: 鼎 / 簋 / 尊 / 觚 / 卣 / 钟 / 编钟 / 灯 / 剑 / 异形(三星堆面具)。**这一套资产同时服务 A 的 thumb-box、B 的 fallback、C 的 placeholder**, 不要让三版各做一套。
2. **细节图 (拓片局部 / 纹饰局部) SVG 套**: 给 A 的 pattern-tree、B 的 monologue drop-cap、C 的 form-genealogy 树节点共用。**纹饰拓片线描风格**, 不用全件图。
3. **印章风格 SVG 章**: 国之重器 / 禁止出境 / 流转海外 / 上博特藏 / 故宫珍品 — 至少 5 款, 朱砂底, 楷书 / 篆书字, -2~-6deg 微旋转, 共用同一组 `clip-path` 模拟印面磨损。

### 组件层
4. **统一的"段位印章" 组件**: A 用 `.seal.jade`, B 用大字 + 红框, C 用 `.rank-badge` — **三套不同实作, 视觉风格也不同**。v2 应统一为一个组件, 三种 size variant (小 18x18 / 中 30x30 / 大 60x60), 单色 + 朱砂 / 碧 / 鎏金 三种 hue。
5. **统一的"待 录"/"未 唤 醒"/"待踏足" 留白态组件**: A 用 `<after>` 文字 + 灰度滤镜, B 用 dark overlay + 楷书"未 唤 醒", C 用 silhouette + "?" — **三种文案三种视觉**, 应统一为一个组件 + 三种 persona variant。语义统一: 是"待"而不是"锁"。
6. **统一的"引用脚注" 组件**: A 已实现 `.cite-ref`。B、C 完全没有引用系统。v2 必须把它推到所有文物 metadata。

### 字体层
7. **加载真正的 Source Han Serif SC web font**: 不要依赖系统 fallback。三版都假设了 Source Han Serif, 实际 Windows 用户多数会 fallback 到 SimSun (一种很"老"很"民国"的字), 视觉一致性会破裂。
8. **STKaiti web font fallback 链增强**: 大量使用楷书做诗句, 但 Windows 没有 STKaiti, 会 fallback 到 KaiTi 或 SimSun。建议从 webfont 加载 `霞鹜文楷` 或类似免费楷书 webfont, 三版统一。

### 色彩层
9. **明确"国宝鎏金" 与 "一级鎏金" 的不同 hue**: 当前 A 用 `#d4a857` (国宝) + `#b9905a` (一级), B 用 `#d4a857` (国宝) + `#c9a85f` (一般), C 用 `#d4a857` + `#c9a85f`。**v2 应统一为 3 个 hue**: `gold-treasure #d4a857` (国宝, 明亮) / `gold-formal #c9a85f` (一级, 中) / `gold-aged #8a6b3d` (普通铸件, 暗哑) — 这样**色彩本身就承担稀有度信号**, 不用全靠 box-shadow。

---

## Specific actionable instructions for the next Builder/Designer

按优先级排序, 每条都可独立做(不互相 block):

1. **【Day 2 上半 - 4 小时】生成 silhouette SVG 套**: 找 25 件器物的官方/wikimedia line-drawing, 转 SVG, 单色 1.5px stroke 标准化。**这一项做完, P0-1 和 P0-2 都解决**。
2. **【Day 2 上半 - 2 小时】B index.html 文案削减**: 4 句诗 → 1 句。**这一项做完, P0-3 解决**, 风险归零。
3. **【Day 2 下半 - 3 小时】统一 design token 跨三版**: 把 A 的 `scholar.css` 命名规范作为基准, B、C 的颜色/间距 token 全部映射上去。重命名 CSS 变量, 但**保持 hue 不变** — 这是基础工程, 让 v2 不再是"三个 css 文件"。
4. **【Day 2 下半 - 2 小时】统一"印章组件"和"留白态组件"**: 写两个 component, 三种 persona variant 通过 prop 切换。
5. **【Day 2 整天 - 6 小时】写"v2 design system" markdown 文档**: 用 A、B、C 三版的精华汇总成一个 design system spec, 不分 persona, 而是分**场景** (情绪时刻 / 数据时刻 / 卡片时刻 / 印章时刻)。每个场景给视觉规则。
6. **【Day 3+】重新做 hero 区文案**: A 已写得克制, B 太多, C 一般。**统一一个文案原则: hero 区一句诗 / 一个标题 / 一个 CTA, 不能超过 3 行文字**。

---

## What success looks like next round

v2 demo 应该满足以下 5 条:
1. **任何屏幕加载失败时, 没有 PowerPoint 渐变方块的廉价感** — silhouette SVG 永远兜底。
2. **同一件器物在 A/B/C 三版里, 不会"长得不一样" — 视觉资产共用, 风格变换**。
3. **国宝出现时, 视觉权重 = 文化权重** — 不是闪光, 是排版的尊严 + 印章的认证 + 留白的呼吸。
4. **三版视觉差异不应在色彩, 而应在排版节奏** — 同一组色 + token, 不同的间距、密度、节奏。
5. **没有任何一屏让资深设计师觉得"这像 Adobe Illustrator 模板"** — 这是审美底线。

具体能否做到:
- 任何一屏不显示"宋体 + 中央大字 + 渐变背景"的"PPT 占位"组合
- 任何 CTA 不写"听完它的话 →" "查看完整 →" 这种**夹带情绪的功能按钮**, 改回"详情""下一件"等纯功能词
- mock state 数字至少有一个"不齐"的细节(如 7/25 中有 1 件是 6 月 1 日加的, 显示出"用户在 4 周里某一天突然加了一件然后停了一阵")

---

## Open questions for the user (升给 morning-report)

1. **三版是要合并到一版 v2, 还是保留三版分发不同入口?**
   - 如果合并: 我建议 **A 的排版纪律 + B 的情绪时刻 + C 的稀有度系统**, 但要重新做交互逻辑。
   - 如果分版: 各自针对 P0/P1 修, 但**共享同一组 silhouette + token + 印章组件**, 视觉资产层统一。

2. **是否值得请插画师做一组"博物馆夜灯下的器物" 真实摄影感插画 (5-10 张) 给 B 的 hero 区?**
   - 当前 B 的视觉天花板被 wikimedia 图片质量卡死, 也被 fallback 廉价方块拖累。如果有一组专门定制的插画(像 Apple Today 那种), B 可以从 65 分跳到 90 分。但成本高 (~5,000 元/张 × 8 张)。
   - 用户 budget 与时间窗口能否支持?

3. **"国宝"两字的滥用阈值**: 当前 demo 里 25 件全是国宝, 100% 国宝率。这是有意的(spec 要求"高比例震撼")。但**真实产品里, 国宝率会下降到 10-20%**。v2 是否要做一版"真实比例"的样本(如 100 件库存 + 25 件国宝), 让稀有度梯度真的发挥作用?
   - 这影响 me.html 的所有视觉决策。

4. **是否做"暗黑模式"?**
   - B 已经是暗模式; A 是纸本米黄; C 是亮纸。**三版"色域基底"完全不同**, v2 若合并就必须选一个或做主题切换。我倾向**留白纸 + 暗黑两种主题**, 暗黑用于"情绪时刻"(hero / monologue / scene), 纸本用于"研究/卡片/列表时刻"。

5. **真实图片版权和供应链问题**: 25 件文物的高清官方图, 来源是哪里? 故宫数字文物库要审批, wikimedia 良莠不齐, 国家文物局开放数据有限。**这是图像层最大的供应链风险**, 比设计风险大得多。v2 启动前必须确认图源, 否则 silhouette SVG 永远兜底, 产品视觉上限就在"线描风"。

---

*Auditor: aesthetic*
*Brief delivered: 2026-05-20 H7*
