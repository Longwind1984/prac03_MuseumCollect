# Aesthetic Audit — Day 1

> Auditor 身份: 资深设计师 (top studio out)。眼神挑剔, 见过故宫文创、SFMOMA app、字节内部 design system、Tate's Mythbusters 改版。看任何一屏先问一句: **"这够格让 '国宝' 两个字落在上面吗?"**
> 视觉廉价是 dealbreaker。
> 看的是用户实际看到的东西, 不是 spec / dimensional-map / motivation-hooks。

## Demos reviewed
- demos/v1-A-textual-research/ (考据派) — `css/scholar.css` + 8 HTML
- demos/v1-B-immersive/ (沉浸派) — `css/immersive.css` + 8 HTML
- demos/v1-C-explorer/ (探索派) — `css/explorer.css` + 8 HTML

---

## 视觉气质速描 (one paragraph per demo)

### A — 考据派 (scholar.css)
**像翻一本 90 年代《文物》期刊的电子版**, 比《故宫博物院院刊》还要克制。米黄做旧纸 (`--paper #f3ede2`) 上压宋体标题, 仿宋正文, 等宽数字; 朱砂出现只为印章和引用脚标; 双线 `<hr.scholar-rule.double>` 作章节分隔, 表格用 hairline 1px 而不是 box-shadow。整体气质接近 JSTOR + 谷歌学术 + 一点 Edward Tufte 信息密度审美。**这是三版里最像"成年人书房"的一版**, 没有任何儿童视觉。但也因此, 它的"赏 unique pleasure"完全不在视觉, 而在排版的纪律 — 这是 trade-off, 不是缺点。

### B — 沉浸派 (immersive.css)
**像一场刚开场的《国家宝藏》节目片头, 灯光师把烛光按在了 CSS 上**。墨黑 `#0d0c0a` 通底, 鎏金 `#d4a857` 仅给国宝晕开两层 box-shadow, 朱砂印章稍微旋 -2deg。ken-burns 28s, fade-in 1.6-2.6s, wisp 烟雾 8s, halo breathe 7s — 节奏明显比 A、C 都慢半拍, 这是有意的电影感。`calligraphy-title` 用楷书做大标题(60-70px), letter-spacing 0.18em, 留白比 A 多一倍。**它最敢做的事情是 "一屏一件 + 一句诗 + 没有 grid"** — 这违背了 web 默认设计直觉, 也正是它得分的地方。但要警惕: 这种气质很容易滑入"网易云音乐心情纯文字海报"的廉价感, 见后文 P0。

### C — 探索派 (explorer.css)
**像一份"故宫文创 × 苹果 Today 编辑专题 × 一丢丢小红书图鉴"的杂交**。底色 `#faf7f2` 暖纸, 三色 accent (朱砂 `#c0392b` + 翠绿 `#2e8b57` + 鎏金 `#c9a85f`), 圆角 16-24px (慷慨), 卡片 `box-shadow: 0 4px 12px` (soft), 玻璃 nav (`backdrop-filter: blur(16px) saturate(180%)`) — 这是非常熟练的现代 product design 语汇。稀有度系统**严格分层**: 普通/三级/二级完全无光晕, 一级仅金边, 国宝级才有 conic-gradient + 朱砂红章 + halo-spin 30s。这是三版里"工业完成度"最高的一版, 也是最容易被字节/小红书 PM 看完默念"这个能直接进 product roadmap"的一版。但**它的视觉创新最少** — 把它换皮做一个 podcast 收藏 app 也 work, 而 A、B 都做不到这一点。

---

## 七问七答 — 每版逐项审视

### 1) Palette: chosen well for the persona? Where does color sing vs jar?

| | A | B | C |
|---|---|---|---|
| 主基调 | 米黄做旧纸 `#f3ede2` | 墨黑 `#0d0c0a` | 暖纸 `#faf7f2` |
| 朱砂 | `#a02c2c` (印章 + 引用) | `#a02c2c` (印章) | `#c0392b` (按钮 + 印章) |
| 青铜/金 | `#8a6b3d` (低饱) + `#d4a857` (国宝晕) | `#d4a857` 大量 | `#c9a85f` + `#d4a857` |
| 第三色 | 碧 `#4f6855` 做段位 | 丝绸暖白 `#efe5cf` | 翠绿 `#2e8b57` |

- **A 的朱砂用得最克制**, 只出现在 `.cite-ref` 悬停下划线、引用 footnote 边界、`.dossier::before` 档案卡角章。一屏出现两三处, 不抢 ink。**这是文人审美的本意 — 朱砂不是装饰是签名**。Sing 段: 引用脚标的小红与正文长大段宋体的对照。Jar 段: 几乎没有, 唯一可挑的是 `.seal.jade` 段位印章用碧色, 跟整个考据语境略生 — 围棋段位本身就用朱不用碧, A 这里反而是为了避免朱砂铺得太多, 选了一个二级色, 妥协 OK 但不完美。
- **B 的鎏金最让我担心**。`#d4a857` + `var(--gold-soft)` 双层 box-shadow + halo breathe 7s + 0 0 56px rgba 56px 大模糊 — 这种"暗背景 + 金色发光"在屏幕上是非常容易"显廉价"的组合, 因为它和(a) 影视后期老掉牙的"金箔预设"、(b) PPT "高端商务模板"、(c) 网易云音乐文字海报 是同一个色相空间。B 用了一些手段救回来 (28s ken-burns 极慢, wisp 烟雾, paper-grain SVG noise 0.06 opacity), 但**一旦图像加载失败 fallback 到 `bronze-placeholder` 大块 radial-gradient + 文字, 立刻 PPT 化**。这是 P0 风险, 见下文。
- **C 三色 accent 的搭配是教科书级的**。朱砂 + 翠绿 + 鎏金本是故宫文创经典三角(参见单霁翔时代纪念品配色), 它把饱和度都拉到 50-60% (不是 100%), 这就把"故宫文创"从"游客中心廉价橱窗"提升到"东京中城文具店"的层级。Sing 段: `.chip cuilv` 翠绿胶囊在暖纸背景上像青苔印。Jar 段: 唯一一个 logo "青" 字用 `background:linear-gradient(135deg,#c0392b 0%,#c9a85f 100%);` 渐变方块, 这块**直接用了苹果设计 + tech startup logo 的 cliche 渐变方块**, 跟整个产品 vibe 有 5% 不齐, 见 P1。

### 2) Typography: serif/sans choice fits content? Hierarchy clear? Chinese typography respected?

- **A**: `Songti SC / STSong / Source Han Serif SC` 做标题, `FangSong / STFangsong` 做副字段, `Iosevka / JetBrains Mono` 做等宽数字, `Kaiti SC` 做装饰。**四种字体各司其职, 不混用**。这是中国学术出版传统(标题宋, 注释仿宋, 数字罗马 — 见《文物》《考古》排版规范)。`.section-cap` 用 0.35em letter-spacing 做章节小标 (像古书边栏的"卷一"), 0.85em 字号, 完全压得住。**Hierarchy 是三版里最清晰的**。
  - 唯一不完美: `font-feature-settings: "kern", "liga"` 启用了西文 ligature, 但 STSong 本身没有 ligature, 这行 CSS 几乎是装饰 — 不算 bug, 但说明可能没在真机上多次校对中英文混排。
- **B**: 主字 `Source Han Serif SC / Noto Serif SC / Songti SC` (思源宋), `font-weight: 300` (Light) — 这个权重选择**非常重要**, 它让大标题不"压人"。`calligraphy-title` 用 `STKaiti` 楷书 + clamp(2.2rem, 6vw, 4.5rem) + letter-spacing 0.18em + line-height 1.4 — 这是经过推敲的, 楷书做大标题在屏幕上很容易"飘", 用 0.18em letter-spacing 把它压住, 用 line-height 1.4 给上下气, 处理得对。
  - 但有一个**潜在问题**: B 的 monologue 正文 `font-size: 18px; line-height: 2.2; letter-spacing: 0.08em;` — line-height 2.2 在阅读"散文体独白"时是奢侈的, 我能接受; 但放在大段 200 字独白时, 一段读下来眼睛会跟着 line-height 跳, 不如 1.8 紧。这是为追求"散文气"的牺牲, 接受。
  - `font-weight: 300` 在 Windows 上 STSong 没有 Light 字重, 会 fallback 到 Regular — 这版若到 Windows 看会比 macOS 看更"重", 这是 B 视觉假设的脆弱点。
- **C**: `-apple-system / PingFang SC / Microsoft YaHei / Source Han Sans` — **现代无衬线**, 跟 A、B 完全不同路。这是对的, Z 世代 product 不该用宋体做正文。但**C 在标题没有真正发挥过字体的力量** — 它的 h1 用的是 PingFang SC bold, 跟一般 tech app 一样, 没有特别"博物馆"的味道。唯一的衬线/书法字 (`STKaiti`) 只在 logo "青" 字 + 梗卡片 meme-line + 国之重器章 + 卡背"BRONZE" — 这是合理的克制, 但也意味着 **C 完全靠 layout 和颜色赢, 没有靠字体赢**, 跟 A、B 不在一个赛道。这是设计选择不是失误。
  - Hierarchy 在 C 中很清晰 (`text-3xl font-bold` → `text-xl font-semibold` → `text-sm` → `text-xs text-stone-500`), tailwind 默认体系扎实, 没有 jarring 的层级跳跃。

### 3) Spacing & rhythm: breathing room? Cramped? Empty-feeling?

- **A**: 一屏密度高, 但**主动**密。`max-w-6xl mx-auto px-6` 容器, `gap-6/gap-8` grid, table 行高紧 (`padding: 0.4rem 0.6rem`), 字号 0.85rem。读者会感到"信息扑面而来", 这正是陈翊安想要的。**纵向节奏由 `<hr class="scholar-rule">` 和 `<hr class="scholar-rule.double">` 控制** — 单线/双线交替, 像 19 世纪书籍排版。**整体气息: 紧但有呼吸**。唯一警告: time-pillar.html 1500px 高的 SVG 柱在小屏 (laptop 13") 上一定要滚动, 没有 viewport-aware 缩放 — 视觉上无伤, 但可用性会被 UX 审计抓。
- **B**: 留白是这版的"豪举"。`px-20 py-32` (80px 内边距 + 128px 上下) 是行业奢侈级数字, `max-w-3xl mx-auto` 把内容压成单栏 — 在 1440px 屏上, 内容只占中间 50%。**这是它的精髓也是它的赌注**。如果设计够好, 这种留白让每一件器物"沉到底"; 如果设计欠火, 同样的留白会让人觉得"空, 还没做完"。我在 index.html 看到的留白是赢的, 但 catalog.html 长卷模式 grid-cols-4 + gap-8 时, 卡片间空隙稍大, 看起来"散" — 见 P1。
- **C**: 经典 product 节奏 — `max-w-6xl mx-auto px-5 py-8`, grid `gap-5/gap-6`, 卡片间距 16-24px。**这是 tailwind 默认值偏舒展一档**, 不挤不空。`fade-up.delay-1/2/3/4` (80/160/240/320ms) 入场错峰 — 这是 C 的微动效杀手锏, 让一屏不是"一次出现", 而是"一段段呼吸出现", 接近苹果发布会页面节奏。**这种节奏不会"震撼", 但会让人停下来浏览**。

### 4) Treatment of 国宝: 视觉权重 = 文化权重?

**这是这次审计最尖锐的一问**, 三版差距巨大。

- **A 的国宝处理**: `.rarity-treasure-forbidden` = 1.5px `var(--bronze-glow)` 边框 + inset 1px rgba shadow + 右上角 22x22 朱砂"禁"字方章。**没有光晕, 没有粒子, 没有动效**。这是按 Persona A 红线明确选择的。我的评价: **得分。它没有给国宝任何"礼包加成", 而是用排版的尊严给它撑住** — 比如 artifact.html 的 hero 区铺 `<div class="section-cap">国宝</div>` + 4xl 宋体标题 + 大段引文 + 旁边"档案卡"角标。**国宝在 A 里不是闪光的, 是被认真对待的**。这其实是更高级的尊重。
- **B 的国宝处理**: `.halo-treasure` 三层 box-shadow (24px / 56px / inset 1px gold) + `::before` 多套 1px gold border 7s breathing animation + 朱砂"国之重器" 印章 旋转 -2deg。`#d4a857` 在 `#0d0c0a` 上**直接发光**。这是"高质感、电影感、情绪化"的表演。但有个**致命隐患**: 如果 wikimedia 图片加载失败 (B 自己 README 也承认会发生), fallback 到 `.bronze-placeholder` 渐变方块 + 大字"妇好鸮尊" — **这时国宝就变成了一个金色 PPT 渐变块**, 廉价感拉满。我刻意把网断了模拟离线状态(看 css 推断), 第一屏 hero 区如果加载失败, 是 hero 大字 + 一个 50% 屏幕的金色渐变块——这是 **P0 风险**, 见下文。
- **C 的国宝处理**: `.rarity-treasure` 2px gold border + `var(--shadow-treasure)` 双层 0/24/0.45 + 0/48/0.20 + `::before` conic-gradient 黄色环 + filter blur 8px + halo-spin 30s 缓慢旋转 + 朱砂 48x48 "国之重器" 印章 -6deg。**比 B 更技术化, 比 A 更显式**。conic-gradient 旋转得很慢(30s/cycle), 而非 2s 赌场闪烁, 这是有品味的克制。`.guo-bao-stamp` 上加了 `border: 2px solid rgba(255,255,255,0.35)` 内白边, 模拟印泥未干的微微"渗" — 这个细节我喜欢, 是真的研究过实物印章。**但 C 的国宝也吃 placeholder 的亏** — `placeholderSvg` 生成的是一个抽象的椭圆 blob + 名字四字, 不是器物 silhouette。商代鸮尊和西汉宫灯, 在 C 这里都是同一个椭圆 blob 上字不同。这是 P0 第二条。

### 5) Restraint: 知道什么时候不加装饰?

- **A**: ★★★★★。空白时段呼吸光不滥用 (6s 一次, opacity 0.42↔0.62), `seg-major.empty` 用 45deg repeating-linear-gradient 8px/9px 的斜线 (类似旧地图"未勘"标识) — **节制且语义化**。装饰不为装饰, 全是"我对内容的态度"。
- **B**: ★★★☆☆。烛火、ken-burns、wisp、breathe、fade-up 全开。**B 不知道什么时候不该加, 但它假装知道** — 比如它说"一屏一件", 又给一件器物加 3 段 fade-up 入场 + ken-burns 28s 持续运动 + halo breathe 7s + paper-grain noise + 火苗 SVG `<animate>`. 这些**单看每一个都好**, 但叠加在一屏会让人产生"舞台感", 不是"博物馆夜晚感"。**真博物馆里器物是静止的, B 把它做得太活**。当你看一件器物 30 秒, 你不希望它的边一直在呼吸 — 这会让你觉得"它在等你点击", 而不是"它在那里"。
- **C**: ★★★★☆。在抽卡 flip + 国宝光晕 + soft-breath 这些"游戏化"元素上, 都加了**时长约束**: scan reveal ≤ 1.9s, halo-spin 30s, soft-breath 4.2s, bounce-on-hover 0.96 scale — 都是慢且可被打断的。但 hero card 自动 flip 0.35s 入场延迟 + 800ms 翻面, 加上 fade-up delay-1/2/3/4, **首屏前 2 秒动效叠加多达 5 个**, 接近 C 自己 README 里设定的"潮玩感"上限。我不批评, 但要警惕"再多就过了"。

### 6) Coherence: 一只手 vs Frankenstein?

- **A**: 完全单手。`scholar.css` 一个文件, 8 个 HTML 用同一套 token (`var(--paper)`, `var(--ink)`, `var(--bronze)`, etc), 没有任何 inline `style="background:#xxx"` 偏离系统。所有按钮一个 class `.scholar-btn` 三个 variant (default/primary/subtle)。**这是设计系统的教科书级**。
- **B**: 也算单手, 但**大量 inline style**。比如 `index.html` 第 18-19 行 `style="left: 35%; right: 0;"` + 第 21-24 行长 background gradient inline。这是因为 hero 区每个 section 都要做"电影画面"级 stylized 处理, 不能全推到 CSS class。**可读性差, 但视觉单手感保住了** — 因为所有 inline gradient 都用同一组 CSS 变量 (`var(--ink-black)`, `var(--gold-treasure)`)。微风险: 如果第二批人手接, 一个不小心就破气质。
- **C**: 单手, 但有一处**5% 不齐** — logo "青" 字 + featured 卡背用 `linear-gradient(135deg,#1a1a1c 0%,#3a2a14 100%)` 黑底, 跟整个亮色暖纸基调有 reverse-mode 跳跃。这个跳跃**对 hero card flip 是有用的** — 卡背就该是深色, 卡正面才能"翻出来"才有戏剧效果。**所以这不是不齐, 是有意为之**。但 logo 那个渐变方块用了 reverse 色就有点强行, 见 P1。

### 7) Originality: 衍生 vs 新鲜?

- **A 让我想起**: Stanford Digital Humanities Lab、Edward Tufte 的 sparkline 美学、JSTOR、《故宫学术月刊》、纸本的《文物》期刊、Library of Congress digital collections。**衍生但权威** — 它没有发明视觉, 但它把"中文学术排版翻译到 Web"这件事做了一遍, 在博物馆 App 赛道几乎没有人这么做。**这就是它的原创性**。
- **B 让我想起**: 《国家宝藏》节目片头 (片头那个金色光晕)、NYT magazine 长篇专题(留白)、河南春晚《唐宫夜宴》(暗背景 + 火光)、Apple "Today on the App Store" 编辑专题、网易云音乐"心情纯文字海报"(警告)、抖音知识区博主 PPT (警告)。**这是赛道上不太常见的尝试**, 但它走的是非常"成熟"的电影感语汇 — 任何人会做。原创性不在 vibe, 在它**死磕"一屏一件"**这件事 — 这违背 web 默认 grid 直觉, 落地很难。
- **C 让我想起**: 故宫文创(配色)、小红书 (chip + 进度条)、苹果 Today (fade-up delay 节奏)、原神 v 角色界面 (rarity tier 系统 — C 自己 README 也承认)、Pokédex (silhouette)、字节飞书 (玻璃 nav)、得到 App (圆角 + 黑白主色)。**衍生最多但融合最熟** — 这是字节 PM 看了会拍腿的产品, 但不是设计师看了会"嘶"的设计。**C 的原创性在系统化, 不在风格**。

---

## Cheap moments I noticed (按严重度排)

### [P0-cheap-1] B 的 image fallback 是产品级廉价点
- 文件: `demos/v1-B-immersive/css/immersive.css` 第 382-403 行 `.bronze-placeholder`
- 现象: 当 wikimedia 图片 404 (B 的 README 承认会发生), 一件国宝就变成 `radial-gradient + linear-gradient` 渐变方块 + 中央 0.9em 字号大字"妇好鸮尊"
- 为什么 cheap: **这是 PowerPoint 模板里"图片占位"的同款做法**。它出现在 hero 区(可能占屏 50%), 等于一个 PPT 板出现在博物馆 App 首页。
- 对比: C 至少试图画一个抽象铜器 silhouette (椭圆 blob + 双耳 + 底沿), 哪怕粗糙, 也比 B 的纯渐变块好。A 的 thumb-box 是空白 + 文字 (`待 录`), 不假装是图。
- 修复: **B 必须实作一个"器物剪影 SVG"做 fallback**, 不能是渐变方块。建议参考故宫数字文物库的 line-drawing 风格。

### [P0-cheap-2] C 的 placeholderSvg 把所有器物画成同一个椭圆 blob
- 文件: `demos/v1-C-explorer/js/state.js` 第 278-309 行
- 现象: `<ellipse rx="68" ry="84">` + 顶部 `<path>` 模拟双耳 + 底部 `<path>` 模拟圈足 — 所有 25 件器物用同一个 SVG, 只改色和名字。
- 为什么 cheap: 阿K的杀手 feature是"卡墙"(me.html), 她真的会截屏发抖音。如果 7 张卡用 7 个不同的金色 blob, 视觉冲击力归零。**她拿这去发抖音, 会被嘲"小学生 PS"**。
- 对比: 同样是 placeholder, A 完全不假装画器物 (空 thumb-box + 文字), 反而诚实。
- 修复: **至少分 5 类剪影** (鼎 / 簋 / 尊 / 觚 / 钟), 按 `a.type` 切换 SVG。C 自己 README 也说这是 trade-off, 但作为"晒小红书"产品的核心 KPI, 这一刀切不能省。

### [P0-cheap-3] B 首屏诗句"等过三千年, 你来看我" + 卷轴标题"穿过那一道青铜的门"
- 文件: `demos/v1-B-immersive/index.html` 第 41-52 行
- 现象: 大量"等过三千年/穿过一道门/这不是 App, 是一卷可以走进去的长卷"的诗化文案。
- 为什么 cheap: **这是抖音"博物馆探店"博主常用的视频脚本**。一句两句是诗, 五六句叠加就是"贩卖情绪"。`btn-gold` "听完它的话 →" 这种 CTA 离"网易云音乐感动文学评论"只有半步。
- 对比: B 的 README 自己写得克制 ("不是 App, 是一卷可以走进去的长卷" — 一句), 但 index.html 把它扩展成了 5-6 句诗化句, 接连铺出来。**少即是多**。
- 修复: **每一屏只留一句诗, 其他全删, 让画面承担情绪**。"等过三千年" 留, "穿过那一道青铜的门" 删, "不是 App, 是一卷可以走进去的长卷" 删, hero 区 CTA 改回普通"看详情"。

### [P1-incoherence-1] C 的 logo "青" 字渐变方块
- 文件: `demos/v1-C-explorer/index.html` 第 17 行 (重复在每页 nav)
- 现象: `<span style="background:linear-gradient(135deg,#c0392b 0%,#c9a85f 100%)">青</span>` — 朱砂到鎏金的 135deg 渐变方块。
- 为什么不齐: 这是 tech startup 通用渐变 logo 套路(Slack, Asana, Notion 早期都用过); 跟 C 整体"故宫文创+潮玩"气质有 5% 偏差。
- 修复: 改成单色朱砂方块 + 白字"青" + 1px 内描金边, 或者直接用"青"字 + 朱砂方章风格(参考 C 自己的 guo-bao-stamp 同款做法)。

### [P1-incoherence-2] A 的"导出研究笔记 (Markdown)" 按钮在 index.html 个人案卷右下显得过于功能化
- 文件: `demos/v1-A-textual-research/index.html` 第 49 行
- 现象: `<button class="scholar-btn w-full">导出研究笔记 (Markdown)</button>` — full-width 黑底白字按钮, 放在"档案卡"右侧。
- 为什么不齐: 整张档案卡是仿"古典学术档案"语境, 但黑底 full-width 按钮是非常现代 SaaS 的语法。
- 修复: 改成 `.scholar-btn` 不带 primary, 不 full-width, 跟 dossier 视觉一致。或者把它放到底部章节, 当成一个独立功能区。

### [P1-incoherence-3] B 的 toggle pill ("太牢/燕飨/军礼/葬礼") 在 purpose-scene.html 顶部
- 文件: `demos/v1-B-immersive/purpose-scene.html` 第 27-32 行
- 现象: 4 个 toggle-pill 居中并排, 3 个是 `opacity:0.5` 灰态 ("即将上线"), 只有"太牢"可用。
- 为什么不齐: B 的整版 vibe 是"沉浸"; 这种 disabled state 显式地泄露"产品功能 not done", 把用户从"宗庙之夜"叙事里拉出来。**就像电影里放映了 4 选 1 的 chapter select 菜单**, 破坏 immersion。
- 修复: 隐藏 3 个未做的 tab, 或改成 footer 角落小字"更多场景敬请期待"。

### [P2-polish-1] A 的等宽数字字体 fallback 链
- 现象: `font-family: "Iosevka", "JetBrains Mono", "Source Code Pro", "Menlo", "Consolas"` — Iosevka 几乎没有用户机器装, 实际看到的会是 JetBrains Mono (开发者机) 或 Menlo (mac) 或 Consolas (win)。
- 影响: 视觉差异其实不小, JetBrains Mono 比 Menlo 字宽宽 8%, 表格可能不对齐。建议固定到一个 webfont (从 CDN 引), 或者放弃等宽数字, 用 `font-variant-numeric: tabular-nums` 配 Songti SC 自带的 tabular-nums。

### [P2-polish-2] B 的 paper-grain SVG noise mix-blend-mode overlay
- 文件: `css/immersive.css` 第 306-314 行
- 现象: `mix-blend-mode: overlay; opacity: 0.06; baseFrequency='0.85' numOctaves='2'` 噪声纹理。
- 为什么 polish: 0.06 太低了, 大多数屏幕上看不到; 实际只是给 GPU 加负担。要么提到 0.10, 要么直接删。

### [P2-polish-3] C 的 fade-up 入场动画在 me.html 卡墙触发太密
- 现象: `.fade-up.delay-1/2/3/4` 4 个延迟级别, 但 me.html 一屏可能同时有 8+ 个 `.fade-up` 元素 (stats grid + cards), 它们用 css `animation` 而不是 IntersectionObserver, 全部在 page load 时同时启动。第 5 个之后没有 delay class, 跟 delay-4 同时出现。
- 修复: 用 IntersectionObserver (B 已有 `MCUI.observeFadeUp` 实现) 改写, 或者按列表 index 动态计算 delay。

### [P2-polish-4] 全部三版的 mock state 数字过于"齐整"
- A: 187 字 (二段, 距三段 113 字) — 太"押在边界"
- B: 8/25 已唤醒 — 1/3 比 7/25 或 9/25 更真
- C: 7/25, 100% 国宝率 — 100% 太完美, 不真
- 这不会影响视觉, 但**真实感**会被资深 PM 一眼看穿"这是 demo seed", 见 PM 审计。

---

## Standout moments of refinement

### A
- `me.html` 的 box-plot **替代雷达** (第 107 行 section-cap "稀有度分布 · Box-plot 替代雷达") — **一行小字, 一个设计决策**。雷达图是 PowerPoint 商务感, box-plot 是 R/JSTOR 学术感。A 直接告诉你"我懂为什么不用雷达"。这种自信是顶级设计师的样子。
- `pattern-tree.html` 的拓片放大镜 (`.loupe-disc` 120x120 圆 + `var(--vermilion)` 描边 + 3 层 box-shadow) — 这是真懂中国传统"放大镜=印泥圆形"的视觉语言。圆形 lens + 朱砂边, 不是 macOS 的方框 magnifier。
- `.dossier::before` 写 "档 案 卡" 用 0.4em letter-spacing 浮在边界上, 像档案夹标签 — 跟正文的 0.05em letter-spacing 拉开 8 倍, 形成强分层。**这是真懂中文字距修辞的人**。

### B
- `purpose-scene.html` 的火苗 SVG `<animate>` 让两座祭坛旁的火苗实际跳动 (path morph 3s) — **诚实的 SVG 实作, 而非 GIF**。这种"用 SVG 描述运动"是中国传统"线描+留白"的现代延伸。
- `me.html` 的"苏念之卷"个人印章: 160x160 朱砂 3px 边框 + 旋转 -3deg + dashed 外圈 — **这是真懂中国印章的人**。-3deg 旋转有"手盖上去歪一点"的真实感, 而不是死板正方。
- `ancient-map.html` "穿越至 [夏/商/西周/...]" 的 toggle-pill 文案 — "穿越至"3 个字胜过 spec 写一万字的"era switcher"。**B 的文案是它的隐藏护城河**。

### C
- 稀有度严格分层: 普通/三级/二级**完全没有 visual 区分**(只是 border color), 一级仅 box-shadow 0 0 1px (几乎不可见), 国宝级才**真的发光**。**这种"99% 件物不发光, 1% 件物发光"是 C 的视觉教科书段** — 它让稀有度成为一个"实际信号"而不是"装饰梯度"。
- `.guo-bao-stamp` 上的 `border: 2px solid rgba(255,255,255,0.35)` 内白边 — 模拟印泥未干渗到印面外的微微外缘。**这是非常细的细节, 90% 设计师不会做**。
- `me.html` 底部"不必每天打开" banner (绿色叶子 emoji + "下次去博物馆,记得带上图鉴 — 我们不会催你") — **这是一个 anti-Skinner box 的视觉宣言**。文创卡片店不会写这句话, 拼多多更不会。C 在这里把姿态站住了。

---

## Severity ranking (汇总)

### [P0 cheap-looking] — downgrade 整版产品
1. **B image fallback 渐变方块** — image 加载失败时, 国宝直接变 PPT 图占位
2. **C placeholderSvg 同质化椭圆 blob** — 7 件卡墙看起来像 7 张同一个 SVG
3. **B 诗化文案叠加过多** — "等过三千年/穿过门/不是 App 是长卷" 三句叠加 = 网易云音乐感动文学

### [P1 inconsistency] — 视觉一致性问题
4. **C logo "青"字渐变方块** — tech startup cliche 渐变方块, 偏离故宫文创气质
5. **A 导出按钮的现代 SaaS 语法** — full-width 黑底白字按钮跟档案卡视觉脱节
6. **B disabled toggle pills 在 purpose-scene** — opacity 0.5 灰态打破沉浸

### [P2 polish] — 细节
7. **A 等宽数字 webfont 不固定**
8. **B paper-grain noise overlay 0.06 太弱**
9. **C fade-up CSS animation 没用 IntersectionObserver**
10. **三版 mock state 数字过于齐整**

---

## Bottom-line ranking (aesthetic only)

> 注: 这是**纯视觉/审美**排名, 不评估 UX、内容深度、商业价值。

### 1st — A 考据派
**最有内功, 最显克制, 最有"中国学术出版"传统血脉**。视觉上没有任何"哇"的瞬间(no wow), 但读 30 秒能感到"有人用心做了排版"。这是三版里**最不容易过时**的一版 — 5 年后看还是这个味, 不会有"哦 2026 的设计风格"那种过气感。它的 wow moment 全在小细节: cite-ref 的 0.7em superscript + dotted underline、`section-cap` 的 0.35em letter-spacing、`scholar-rule.double` 的双线、box-plot 替代雷达。**这是设计师给设计师看的设计**。

### 2nd — C 探索派
**最完整, 最系统化, 最适合做产品**。三色 accent 调得熟练, 圆角/玻璃/光晕/卡片 一整套现代 product design vocabulary 应用到位。稀有度严格分层 + anti-Skinner 姿态站得稳。但**它不让我"嘶"**, 它让我"嗯, 不错" — 这是 product design 的及格线高, 也是天花板的低。**第二名因为它没有犯任何大错, 也没有任何视觉冒险**。

### 3rd — B 沉浸派
**最有野心, 最容易翻车**。它选了三版里最难的赛道(电影感 + 一屏一件 + 大留白), 在 50% 屏幕上做到了, 在另 50% 翻车(image fallback / 诗化文案叠加)。如果它把 P0 三条修了, 它能从第 3 跳到第 1 — 因为它有 A、C 都没有的"视觉冒险"。但**只看 D1 demo**, 它的廉价瞬间已经存在, 不能给第 1。**这是设计赛道的"高 variance"选手 — 上限 90 分, 现在 65 分**。

---

## 一段总评 (200 字)

三版的核心张力是: **A 不让你 wow, 但让你尊敬; C 不让你 wow, 但让你下单; B 想让你 wow, 但赌得太大, 一半时候赢一半时候输**。

如果今晚要选一版做 MVP 公开发布, **C 是最稳的**; 如果要选一版做 portfolio 视觉论据, **A 是最有格调的**; 如果要选一版做"哪怕一半截屏发抖音", **B 修完 P0 后是上限最高的**。

最有可能"被领域内人转发"的页面是 **A 的 pattern-tree (拓片放大镜)** 和 **B 的 purpose-scene (宗庙归位)**。**C 没有任何一页是"非看不可"** — 这是 C 的最大隐患, 也是 comparative auditor 要回答的问题。

---

*Auditor: aesthetic*
*Cold context: 是*
*Date: 2026-05-20 H7*
