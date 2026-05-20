# Comparative Audit — Day 1 — Synthesis of 5 Audit Perspectives

> Comparative Auditor · 2026-05-20 H7.5
> Inputs: 5 audits + 5 next-iteration briefs (UX / Aesthetic / Content / Motivation / PM)
> Method: horizontal cross-reference; flag where Auditors agree (= signal) vs disagree (= meta-lesson).

---

## Executive summary (200 字)

五位 Auditor 同时把 **A (考据派)** 推上了"hire-grade"的位置 —— UX、Motivation、Content 三位明确把 A 排第一,Aesthetic 把 A 排第一(美学纯度),PM 给 A "最贴 niche 用户" 的评价。**C (探索派) 是工程完成度第一名**,但有两个 Auditor (Motivation、Content) 给了它接近不及格的分,因为它把"维度承载"扁平化成了 XP dashboard,违反团队自己的 anti-Skinner 红线。**B (沉浸派) 是高 variance 选手**,提供了 portfolio 里**唯一两个截屏可发布的页面**(purpose-scene、ancient-map 流散篇),但移动端不可用 + image fallback 廉价 + 诗化文案过量,是 P0 级别风险。

三个 demo 看起来像 **"同一份 PRD 在不同用户密度档位下的自然分叉"**,而不是三套互不相容的产品 —— 这是 portfolio 最值钱的故事素材。

**下一步最重要的一步**: 给 25 件器物画一组**真器型 silhouette SVG**(鼎/簋/尊/觚/卣/钟/灯/剑/镜/异形 10 套),这一刀同时解决 3 位 Auditor 各自标注的 P0(Aesthetic 的"B image fallback 渐变方块"、Aesthetic 的"C placeholder 椭圆 blob"、UX 的"未收藏剪影态"),并且是唯一可在 4 小时内交付的"audit→brief→builder 一轮闭环"的具体证据 —— PM Auditor 把 close-loop 能否兑现列为 P0 portfolio-killer。

---

## Cross-Auditor agreement matrix

每个 aspect 的 winner / loser + 一句理由:

| Aspect | Winner | Loser | One-sentence rationale |
|--------|--------|-------|------------------------|
| **UX** | **C** | B | C 顶部 sticky nav + 60 秒触达 wow 点 + 移动端落地最便宜;B 落地页 5 屏才到收藏入口、px-20 写死、移动端基本崩 (UX §"Findability" / §"Mobile readiness") |
| **Aesthetic** | **A** | B (in current state) | A 是"中国学术出版传统翻译到 web"——5 年后还不过气;B 选了最难赛道(电影感 + 一屏一件),但 image fallback 渐变方块和诗化文案叠加把上限 90 分压到了 65 分 (Aesthetic §"Bottom-line ranking") |
| **Content** | **A** | C | A 有 data_sources + JINWEN_DICT + 后母戊/司母戊释读争议 = 三版里**唯一像考据工具的**;C 用 meme + 抽卡视觉把内容压扁,稀有度二分法把禁出境名录抹平 (Content §3) |
| **Motivation** | **A** | C | A 的 "待补建议"是三版里唯一 substantive 的 return-trip hook;C 的 "差 N 件解锁" stack 在 me.html 一屏出现 3 次,直接踩团队自己 gamification-mechanics §5.3 红线 (Motivation §"P0 motivation collapse") |
| **PM (Portfolio)** | **(三版作为一组)** | (单独 C) | PM 关心的是 close-loop 兑现,不是排名;但 C 的"潮玩感"是最容易被 hostile question 戳穿的(为什么没踩 anti-Skinner?),A 是 niche fit 最强 |

**Aggregate:**
- **Most aspect-wins**: A — 拿下 Aesthetic、Content、Motivation,共 3 个一等奖 (UX 第 2,PM 视角是"最有 niche 论据")。
- **Most aspect-losses**: C — 在 Content、Motivation 双线落后,且 Aesthetic 评分里被点名 5% 不齐(logo 渐变方块、🌿 emoji)。但 **UX 第 1 + 移动端可用** 是 C 不可被忽视的硬资产。
- **Widest variance (最高上限 vs 最大缺口)**: **B**。Aesthetic 评其上限 90 / 当前 65;Motivation 评其前 3 周强、第 4 周后塌;UX 评其"P0 mobile 不可用";Content 评其"诗意可,事实底子也算扎实"。**B 是 portfolio 最 cinematic 的资产,也是离 ship-ready 最远的资产**。

---

## Surprising / contradictory findings

### 1) 同一证据,两位 Auditor 给出相反裁决:**C 的 me.html stats grid**

- **UX**: "信息密度恰当", "60 秒理解产品 → 体验核心机制的闭环" — UX 给了 C 第一。
- **Motivation**: "5 个 numeric meter,XP-shaped dashboard","国宝率 100% 是 vanity metric,Week 2 会破" — 直接 P0。

**Meta-lesson**: **UX 在 5 分钟评估里看到的"信息密度好"恰恰是 Motivation 在 2 周后看到的"XP 板"**。这暴露了"5 分钟 first-impression"和"2 周 retention"是两个完全不重叠的优化目标 —— v2 必须明确**为哪一个优化**。我的判断:**优化 retention(Motivation 视角),但保留 UX 的 sticky nav + 信息可达性**。

### 2) 同一证据,两位 Auditor 给出相反裁决:**B 的诗意文案**

- **Aesthetic**: 把"诗化文案叠加"列为 P0 cheap moment("等过三千年/穿过门/不是 App 是长卷三句叠加 = 网易云音乐感动文学")。
- **Motivation**: B 的"流散篇 / 本应在家"叙事是"全 portfolio 唯一让我心动的地方",是 sustained motivation 来源。

**Meta-lesson**: **同样是诗化文案,放在 hero 区(无承载)= cheap;放在"毛公鼎在台北等一张回来的船票"(有具体情感承载)= 杀手锏**。文案不是"是否诗意"的二元判断,是"诗意是否扣到具体事实上"。

### 3) 多位 Auditor 独立抓到的**同一**问题 = 强信号

> 当 5 位 Auditor 各自从不同视角看到同一件事,那就是真的。

#### Signal #1 (5/5 Auditors) — **图像供应链是产品天花板**
- **Aesthetic** [P0]: B image fallback 渐变方块 + C placeholderSvg 同一椭圆 blob
- **UX** [P1]: 三版 mock state 与真实图无法对齐
- **Content** [P0/P1]: 三星堆纵目面具 image_urls 自承图错位
- **Motivation** (隐式): 卡墙若 25 件都是椭圆 blob,梗卡片 K-factor 归零
- **PM** [P1]: "真实图片版权和供应链问题"列为 morning-report Q5

**结论**: **silhouette SVG 套 (10 套器型) 是 v2 最高 ROI 的单点投入** —— 它**同时**修复 4 位 Auditor 的 P0/P1 问题,而且可以在 4-6 小时内交付。

#### Signal #2 (4/5 Auditors) — **三版 mock seed 不统一**
- **UX** [P0 协调层]: "三个 demo 用了不同的段位逻辑(A 二段 187 字 / B 夔龙派初识 / C 二段 47 字)"
- **Aesthetic** [P2]: "mock state 数字过于齐整,资深 PM 一眼看穿"
- **Content**: 不同 demo 的 inscription 字数标注不一致
- **PM** [V1 P0]: "Audit loop 真的跑通"需要 mock 协调一致以证可信

**结论**: 必须先在产品定义层(`docs/dimensional-map.md` 或新建 `docs/v2-progression-spec.md`)确认一套 progression 语言 ——**这是 v2 启动的前置任务**,不是 Builder 任务。

#### Signal #3 (4/5 Auditors) — **Day 1 / 0-state 不存在**
- **UX** [P0 blocker]: "三版都假定我已经收藏 7-9 件,新用户进来直接被预设角色"
- **Aesthetic**: (隐式) "苏念之卷"印章对 0 收藏用户该叫什么?
- **Motivation**: "me.html 卡墙在 0 件时是 25 个 silhouette 全场?"
- **PM**: 不直接抓但 V5 "真实计划"涉及

**结论**: v2 必须给 0-state 一套设计 —— **不是简单 placeholder,是"首次访问引导 → 第一次扫描 → 看到收藏被点亮"的闭环**。

#### Signal #4 (3/5 Auditors) — **"维度联动"只在文档里**
- **UX**: "点'加入收藏' → 视觉上看到 (1) 时空柱 +1 (2) 古国地图点亮 (3) 纹饰树变色 — 三版只在文档里描述了,没真实做出来"
- **Motivation**: "C 的 scan.html DAY-1 WOW · 同时点亮"是 Day-1 hook,但"by scan 30 stops noticing"
- **Content/PM**: 隐式同意

**结论**: 这是 PM 论点 1 "维度 × 形态 × 游戏化三位一体" 的核心可视化,**v2 必须实现一次真的"一击 N 维联动"动效**,否则 case-study 论点 1 是空话。

#### Signal #5 (3/5 Auditors) — **A 的"待补建议"是 v2 唯一应该原样保留的 motivation 机制**
- **Motivation** [明确]: "Keep verbatim as v2's primary returning-user hook"
- **Content**: "v2 应该把这个 pattern 推到其他维度(纹饰断面、铭文人名断面)"
- **UX**: (隐式赞) A 的 hardcore-user 信息密度选对了

**结论**: "待补 · 研究断面建议" 是这次 night-run 最具产品价值的单一组件,应作为 v2 me.html 的核心结构 —— **替换掉 C 的 5-stat headline grid**。

### 4) 一个反直觉发现:**Aesthetic 把 A 列第一,但 PM 不会让 A 单独出去**

- **Aesthetic ranking**: 1st A / 2nd C / 3rd B (理由: 设计师内功)
- **PM 场景**: A 单独作为 portfolio 资产"略 thin"(无 craft-scroll/purpose-scene),"作为'我能服务硬核用户'的代表作够,作为'功能完整 demo'不够"
- **Motivation**: A 是 retention 王者,但"surface 太 austere,可能不让 soft user 过 Day 1"

**Meta-lesson**: A 是 niche depth-first 的设计,但 portfolio 还需要 breadth 来证明"不同用户都被想过"。**三版分别存在,本身就是 PM 想要的 evidence**。结论:**v2 不应只做 A 的扩展版,应该做"基于 A 的纪律 + B 的情绪时刻 + C 的入口"的合并体**。

---

## Top 10 cross-cutting findings (ranked by impact)

> 影响 = (Auditors raising) × (demos affected) × (是否阻塞 portfolio close-loop)

### #1 [Critical] Silhouette SVG 缺失 — 图像供应链是产品天花板
- **Auditors**: Aesthetic [P0-cheap-1, P0-cheap-2] + UX [P1] + Content [P0 三星堆 image 错位] + Motivation (隐式) + PM [Q5]
- **Demos affected**: 全部 3 版
- **Suggested fix**: 4-6 小时内生成 10 套器型 silhouette SVG(鼎/簋/尊/觚/卣/钟/灯/剑/镜/异形),共用同一资产层。B 的 `bronze-placeholder` 直接换 SVG;C 的 `placeholderSvg` 按 `a.type` 切换;A 的 `thumb-box` 暗灰版用于"待录入"。

### #2 [Critical] C 的"差 N 件解锁"堆叠 — 踩了团队自己的 anti-Skinner 红线
- **Auditors**: Motivation [P0 motivation collapse, 3 处 violations] + Aesthetic (隐式, "C 不让我嘶")
- **Demos affected**: C
- **Suggested fix**: 删 me.html "下一步可解锁"整段 + index.html "NEXT MILESTONE" + me.html "即将解锁";替换为 A 风格的"待补建议"(具体器物 + 知识缺口,非进度条)。

### #3 [Critical] Day 1 / 0-state 全三版缺失
- **Auditors**: UX [P0 blocker] + Motivation (隐式) + Aesthetic (隐式)
- **Demos affected**: 全部 3 版
- **Suggested fix**: 建 `demos/v2-merged/onboarding.html`(3 屏 carousel) + 0-state 版的 index/catalog/me。0 件收藏时首页第一屏 = "开始你的第一次扫描 + 3 张明星文物试试卡"。

### #4 [High] B 的移动端不可用 — px-20 + max-w-3xl 写死
- **Auditors**: UX [P0]
- **Demos affected**: B
- **Suggested fix**: 全局 sed `class="px-20"` → `class="px-5 md:px-12 lg:px-20"`,人工 iPhone 13 过一遍。**这是 B 走向 ship-ready 的硬门槛**。

### #5 [High] 三版段位 / 称号 / 国宝率口径不统一 — 产品定义层任务
- **Auditors**: UX [P0 协调层] + Aesthetic [P2 mock 数字过齐] + Content (隐式) + PM [V1]
- **Demos affected**: 全部 3 版
- **Suggested fix**: 在 `docs/v2-progression-spec.md` 里先定义一套:段位以"识字数"为单一变量(初窥→入门→一段...大宗师);称号隐式基于维度覆盖;国宝率作为非 headline 数字,不做对照"行业 4%"。

### #6 [High] B 的诗化文案叠加 — Aesthetic P0 cheap,Motivation 反向赞
- **Auditors**: Aesthetic [P0-cheap-3] vs Motivation (反向: 流散篇是杀手锏)
- **Demos affected**: B
- **Suggested fix**: 区分"无承载诗意" vs "有事实承载诗意"。删 hero 区的"穿过那一道青铜的门 / 不是 App 是长卷";保留 "等过三千年, 你来看我"作 hero 唯一一句,保留 ancient-map 流散篇所有文案。

### #7 [High] 内容学术严谨度断层 — A 已经 7/10,但全 portfolio 没人到 9/10
- **Auditors**: Content [全文]
- **Demos affected**: 全部 3 版,A 最接近
- **Suggested fix**: v2 必须新增 3 个字段到 `bronze-treasures-v1.json`:`jicheng_id` (《集成》编号)、`dating_evidence` (地层/同墓/字体/铭文人名)、`co_excavated_group_id` (同墓器物群)。A 的 artifact.html 加"断代依据"块。

### #8 [Medium-High] "长铭文阅读 = 故事豁然" 这个最强 hook 三版都没实现
- **Auditors**: Motivation [P2 missed upside]
- **Demos affected**: 全部 3 版
- **Suggested fix**: v2 sprint 至少 ship 一篇可读长铭(何尊 122 字 或 大盂鼎 291 字),做字字 reveal + 终末"您刚读完了西周早期王权的直接表达"的 payoff。

### #9 [Medium] 三版没有"撤回收藏 / 编辑 / 搜索"基础流
- **Auditors**: UX [P1]
- **Demos affected**: 全部 3 版
- **Suggested fix**: me.html 卡墙加 `⋯` 菜单;顶部 nav 加搜索框。**这两个不是 wow 点,但是产品健全度的硬门槛**。

### #10 [Medium-cross-aspect] 文案具体错误 — 立刻可修
- **Auditors**: Content [P0/P1] + UX (一些 emoji 指出)
- **Demos affected**: 全部 3 版,具体定位有据可查
- **Suggested fixes**:
  - `demos/v1-B-immersive/js/data.js:60` 利簋独白病句 "我被一位叫'利'的将领的器物" → "我属于一位叫'利'的将领"
  - `demos/v1-C-explorer/js/state.js` GENEALOGY "尊盘"作为顶级器型 → 归入"尊"子型
  - 后母戊鼎 patterns 字段 `["饕餮纹", "夔龙纹", "云雷纹", "虎噬人头纹", "蝉纹"]` → 区分主纹/辅纹/局部纹
  - `bronze-treasures-v1.json` 三星堆纵目面具 image_urls 自承"严格说该具体文件是青铜头像而非纵目面具" → 替换图或删 URL
  - C 的 `📖 🌿` emoji → SVG 印章或纯文字标签

---

## The "Best of each" matrix (for merged-spec)

按 **aspect** + **page** + **component** 三个维度拉清楚 v2 该从哪一版继承什么:

### Aspect-level

| Aspect | Best implementation | From which demo | What to inherit |
|--------|---------------------|-----------------|------------------|
| **UX 导航** | sticky top-nav 5 入口 + "我的"按钮 | **C** (`v1-C-explorer/index.html` 顶部 nav) | active state 高亮 + 玻璃质感 backdrop-filter blur(16px) |
| **UX 信息层级** | artifact.html 5 维度卡片 + 默认折叠 | **C** + A 的密度选项 | 用 C 的 5 维度网格做默认,A 风格的 accordion 做深度展开 |
| **Aesthetic palette** | 三色 accent 朱砂+翠绿+鎏金 50-60% 饱和 | **C** explorer.css | 直接当 v2 design token 基线 |
| **Aesthetic typography** | 4 字体分工(宋/仿宋/楷/Iosevka) | **A** scholar.css | A 的中文学术排版纪律,b 的 calligraphy-title 楷书做"诗意时刻"标题 |
| **Aesthetic restraint** | 稀有度严格分层(99% 不发光,1% 真发光) | **C** rarity system | C 的 conic-gradient + halo-spin 30s + 朱砂章 |
| **Content depth** | data_sources + JINWEN_DICT + 释读争议 | **A** scholar | 引用 + 字典 + 争议三件套作为 v2 标配 |
| **Content voice** | 国宝独白第一人称叙事 (除 li_gui 病句外) | **B** monologues | 文学水准最高,事实承载也准 |
| **Motivation 返场 hook** | "待补 · 研究断面建议" | **A** me.html | verbatim 保留,扩展到其他维度 |
| **Motivation 情感** | 流散篇 "本应在家" + 礼器归位场景 | **B** ancient-map + purpose-scene | 唯一让 Auditor "心动"的内容 |
| **Motivation 退场 (off-ramp)** | "🌿 不必每天打开" banner + "不每日推送催"承诺 | **C** me.html (姿态) + B (诗意自然 chill) | 姿态保留,**视觉层级要和 stats grid 平起平坐**,不能再是 paste-on disclaimer |
| **0-state 处理** | 剪影态 + "待踏足"标签 | **C** catalog.html silhouette-wrapper | 推广到 v2 所有维度的"待"区 |

### Page-level (8 pages × best demo)

| Page | Best implementation | From which demo | What to inherit |
|------|---------------------|-----------------|-----------------|
| **index.html (落地页)** | hero card 自动翻面 + 4 stat 同屏 + sticky nav | **C** | 60 秒内"理解 → 体验 → 决定"闭环;但删 C 的"NEXT MILESTONE" 与"📖"emoji |
| **catalog.html (图鉴)** | sticky nav + 剪影态 + filter chips 清晰可点 | **C** | A 的"三视图切换"语义保留,但视觉用 C 的 pill 风格;B 的"用途之卷"作为第 4 视图选项 |
| **artifact.html (详情页)** | 5 维度卡片网格(默认折叠多组件) + 铭文释读器 + 国宝独白 + 同型对照墙 + 出处与引用 | 跨版合并: **C 5 维度框架 + A 铭文器+引用 + B 独白 + A 同型对照墙** | 这是 v2 的旗舰页,所有 winner 全部塞进同一个 accordion 结构 |
| **me.html (个人页)** | 卡墙稀有度光晕 + 待补建议 + off-ramp banner | 跨版合并: **C 卡墙 + A 待补建议(替换 C 的 stats grid) + C 的 off-ramp 姿态(但提升视觉权重)** | 严格按 motivation §"What to change" 重做 |
| **time-pillar.html** | 1500px 真比例柱 + 朱砂引用边事件 + "夏代史料稀少非用户之过"empathy 文案 | **A** | A 的学术严谨;B 的 sticky pillar + 右侧叙事可作"诗意切换"模式 |
| **ancient-map.html (古国漫游)** | 时代切换 + 流散篇 "本应在家" + 朝圣护照 | **B** ancient-map | 这是 B 唯一不可被替代的页 |
| **scan.html** | 8 个 mock 样张 + confidence band 多档 + 候选回退 + 900ms 弹簧 reveal + 诗意 loading 文案 | 跨版合并: **A 的"诚实做法"逻辑(8 mock seed)+ C 的视觉表演(reveal sequence)+ B 的诗意 loading** | 三版各取一段 |
| **purpose-scene.html (礼器归位)** | 22 位太牢礼场景 + 火苗 SVG `<animate>` + 等级判定 + 列鼎制度教学 | **B** purpose-scene | 这是全 portfolio 唯一"填 slot 教真知识"的组件,B 的杀手锏 |

### Component-level (10 components × best demo)

| Component | Best | From | What to inherit |
|-----------|------|------|-----------------|
| **时空柱 (time-pillar)** | A 的 1500px 真比例 + 右侧事件标注 + empty 状态斜线 + empathy 文案 | **A** | "夏代史料稀少"那种 anti-Skinner footnote 推广到所有 empty 维度 |
| **古国地图 (ancient-map)** | B 的"穿越至商/西周"toggle + 流散篇 | **B** | 文案是 B 的隐藏护城河,3 个字胜过 spec 一万字 |
| **纹路演化树 (pattern-tree)** | A 的拓片放大镜 (`.loupe-disc` 圆形朱砂边) | **A** | "印泥圆形"的视觉语言,而非 macOS 方框 magnifier |
| **形制谱系 (form-genealogy)** | C 的卡墙 + A 的同型对照墙第 4 格朱砂虚线"待补" | **A** + **C** | C 的栅格 + A 的"未来可填"语义 |
| **铭文释读器 (inscription-reader)** | A 的 JINWEN_DICT + 段位 + 三栏切换 + B 的 monologue 包裹 | **A** + **B** | A 的"工具感" + B 的"故事感"放在一个组件不同模式 |
| **稀有度光晕 (rarity-halo)** | C 的 5 级严格分层(普/三/二级无光,一级仅边,国宝 conic-gradient halo-spin 30s) | **C** | C 的 `.guo-bao-stamp` 内白边模拟印泥渗,A 的"色彩本身承载稀有度"作高级 hue 增强 |
| **工艺长卷 (craft-scroll)** | B 的火苗 SVG `<animate>` morph (诚实的 SVG 不是 GIF) | **B** | 唯一存在的 craft-scroll 实作 |
| **场景重建 (purpose-scene / 礼器归位)** | B 的 22 位太牢礼 isometric SVG + 等级判定 | **B** | 整 portfolio **唯一"填 slot 教真知识"的组件**,杀手锏 |
| **朝圣护照 (pilgrimage-passport)** | B 的"流散篇 / 本应在家" 朱印帳风 | **B** | 情感钩子最强;A 占位太弱;C 没做独立 |
| **国宝独白 (monologue)** | B 的第一人称 + 史料嵌入 + drop-cap (`::first-letter` 4em 楷书 + 鎏金) | **B** | 文学水准最高,事实承载也准 (li_gui 病句除外) |

---

## Three demos as portfolio assets — final assessment

### A (考据派 / 青铜考) — 证明什么
**证明**: 候选人懂 niche 用户的反 Skinner 红线;能把"中文学术出版传统翻译到 Web"。
**Keep / refine**:
- ✅ Keep: `scholar.css` token 系统、铭文释读器、出处与引用、待补建议、box-plot 替代雷达、time-pillar 真比例柱
- ⚠️ Refine: hardcoded "陈翊安/北大/甲编 No.00837" 改可改占位;catalog tab 视觉加强;artifact.html 7 组件并列改 accordion;BibTeX 按钮真实现(不是 stub)
- ❌ Drop: 无,A 是 v2 的 spine

**Portfolio framing**: "我能服务硬核用户" 的证据,**case-study 里最有 niche fit 的 demo**。

### B (沉浸派 / 青·铜) — 证明什么
**证明**: 候选人懂"叙事产品的克制美学",敢做 web 默认 grid 不愿做的事(一屏一件 / 大留白)。
**Keep / refine**:
- ✅ Keep: purpose-scene 礼器归位、ancient-map 流散篇、calligraphy-title 楷书大标题、`.seal` 朱砂红章、国宝独白文学水准、火苗 SVG `<animate>`
- ⚠️ Refine: hero 区 4 句诗删到 1 句、image fallback 必须做 silhouette SVG、disabled toggle pill 隐藏、px-20 移动端重做、独白要 ladder(2 周后不能还是同一首诗)
- ❌ Drop: "音频朗诵"占位(没真音频不如不放)、"贵宾印章"和"流散篇"功能重叠的部分合并

**Portfolio framing**: 简历 wow shot 来源(`purpose-scene` 截图)。**case-study 里"我能做 cinematic 产品"的证据**。

### C (探索派 / 青铜图鉴) — 证明什么
**证明**: 候选人懂"潮玩游戏化的克制平衡"(口头上),也证明候选人知道"anti-Skinner 检查表"作为元 artifact 的力量。但**实际 me.html 的"差 N 件解锁"堆叠暴露出实操和声明的撕裂**。
**Keep / refine**:
- ✅ Keep: sticky top-nav、稀有度严格分层视觉、`.guo-bao-stamp` 内白边、scan reveal sequence、fade-up 入场错峰、剪影态 "待踏足"、"🌿 不必每天打开"姿态
- ⚠️ Refine: 替换 me.html stats grid → A 待补建议;删 "NEXT MILESTONE / 即将解锁 / 下一步可解锁"3 个 violation;rarityTier 函数加回 5 级;形制 GENEALOGY taxonomy 重做;logo 渐变方块改朱砂印章;`📖 🌿` emoji 全部替换
- ❌ Drop: 梗卡片的"称号水印"部分(不是梗卡片本身)、5-stat headline grid

**Portfolio framing**: **C 是 v2 工程完成度基线**(sticky nav + mobile + design system),但**产品哲学被 Motivation/Content Auditor 戳穿**。Portfolio 里 C 的角色应该是 "我做了一版,然后 audit 让我意识到它的潮玩感稀释了内容深度,所以 v2 转向 A 的纪律"——这是 reflective practitioner 的故事。

### 三版作为一组 — portfolio framing
**这是 portfolio 最有故事的部分**。PM Auditor 已经识别这是 "做三版而不是一版,证明的不是'我有时间',而是'我懂得产品的多元解'"。但 **必须由 comparative auditor 的 merged-spec 来兑现"非平庸 synthesis"**——如果 v2 只是"A 字体 + B 杀手页 + C 梗卡片"的拼贴,这套故事就破功。

**推荐 case-study §3 写法**:
> "我刻意让 3 个 Builder agent 在同一份 PRD 下 differentiate by user persona,不是为了 A/B/C 选一个,是为了让 audit squad 在 3 个上下文里同时跑——后续的 merged-spec 是这场 differentiation 的合成物,它 derive 出的设计决策(用 A 的待补建议 + B 的礼器归位 + C 的稀有度系统)是任何单一 builder 都不会自然得到的。"

---

## Final ranking (composite)

> 综合 5 个 aspect,按 "近期可用性 × 长期 motivation × portfolio 故事价值" 加权。

### 1st — **A 考据派 (composite 7.8/10)**
- 拿下 Aesthetic + Content + Motivation 三个一等奖
- UX 第 2(信息密度高门槛)
- 移动端结构合理但 artifact.html 7 组件并列需重做
- **A 是 v2 的 spine**:留 A 的纪律,补 A 缺的(scan 表演、流散情感、剪影态)
- 唯一 P0 风险:不够"广",portfolio 单 A 看略 thin

### 2nd — **C 探索派 (composite 6.8/10)**
- UX 第 1,工程完成度第 1,移动端落地最便宜
- Content + Motivation 都给出 P0/P1 警告:稀有度扁平化、 me.html 踩 anti-Skinner 红线
- Aesthetic 中评:技术熟练但视觉创新最少
- **C 是 v2 的工程基线**(top-nav / design system / mobile),但产品哲学需要被 A 的内核替换

### 3rd — **B 沉浸派 (composite 6.2/10)**
- 最高方差 — Aesthetic 上限 90 当前 65;UX P0 移动端崩;Motivation 前 3 周强后 4 周塌
- 拥有 portfolio 唯一两个 截屏可发布 的页:`purpose-scene` + `ancient-map` 流散篇
- **B 不是单独可 ship 的版本,但 B 贡献了 v2 的 wow 资产**

### 决定性的 framing

**这 3 个 demo 不是赛马, 是 portfolio 的三种证据**:
- A 证明 "我会服务硬核用户"
- B 证明 "我会做 cinematic 时刻"
- C 证明 "我会做工程化产品"

任何一个单独 ship 都是"thin portfolio"。v2 的价值 = 用 A 的内核 + B 的两页杀手锏 + C 的工程化外壳 把三个证据合并成一个产品,然后 case-study 里完整 narrate 这个合并过程 —— **这就是 PM Auditor 说的"非平庸 synthesis"**。

---

*Comparative Auditor · 2026-05-20 H7.5*
*合成 5 个 audit 视角 · 总字数约 3800 字*
