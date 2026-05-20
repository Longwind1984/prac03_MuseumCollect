# Next Iteration Brief: UX

> 这份 brief 不是"我的喜好",是从一个第一次见这三个 demo 的硬核用户视角,**哪些东西应该被下一轮 Builder/Designer 直接拿走、改、补**。
> 优先级按"如果只有 4 小时能改什么"排序。

---

## What to keep (across versions)

| 保留点 | 哪个 demo 做得最好 | 为什么 |
|---|---|---|
| **顶部 sticky nav,5 个固定入口 + "我的"按钮** | **C** (`v1-C-explorer` 所有页面顶部 `top-nav`) | 任何时刻知道自己在哪、能去哪。A 的 footer-injected header 看不到,B 完全没 sticky nav。 |
| **`me.html` 卡墙的稀有度光晕** | **C** (`v1-C-explorer/me.html` 第 117-125 行的 cardWall) | 真国宝才发光,二级以下完全无光效 —— "克制 = 高级"落到位。这是"晒朋友圈截图"的正确做法。 |
| **铭文释读器 hover 字典 + 段位制** | **A** (`v1-A-textual-research/artifact.html` 第 64-95 行的 inscription-section) | 这是整个产品**唯一的真深度功能**。三栏切换(拓片/释文/白话/三栏)对学者好用,对新手"白话"够用。 |
| **未收藏文物的剪影态 + "待踏足"标签** | **C** (`v1-C-explorer/catalog.html` 第 82-89 行 silhouette-wrapper) | 比 A 的"未录入虚化"、B 的"sleeping 滤镜"更清晰传达"未来可填"。 |
| **`scan.html` confidence band 多档 + 候选回退** | **A** (8 个 mock 样张 + 含原始 API 响应) **+ C 的视觉表演**(900ms 弹簧 reveal) | A 的"诚实做法"逻辑 + C 的"开盲盒"动效 = 合并后是最强 scan 体验。 |
| **诗意 placeholder + 错误兜底文案** | **B** (`scan.html` 的"它埋了三千年,这一两秒值得等") | loading / nomatch 这种 dead 时刻被填得有质感,这是产品差异化锚点。 |
| **真实历史时长比例的时空柱** | **A 和 B 都做得对**(高度严格 ∝ 年数) | C 的时空柱在 PRD 数字上一致,但视觉上是统一段高 + 高度比例,**A 的 1500px stage + 真实事件标注最学术严谨,B 的 sticky pillar + 右侧叙事最易读**。 |
| **catalog 的三视图切换(时代/出土地/形制/用途)** | **A 和 C** 都做了,B 做的"用途之卷"是独特角度 | 三个维度切换是 PRD 的硬需求,A 的"按形制谱系"和 B 的"按用途"是不同切片,**值得合并**。 |

---

## What to change

| 痛点 | 当前在哪 | 提议的修改 |
|---|---|---|
| **三版都没有 Day 1 / 0-state** | 三版的 index/catalog/me 都假定已有 7-9 件收藏 | **建一个 `onboarding.html` + 0-state 版的 index/catalog/me**:0 件收藏时,首页第一屏应该是"开始你的第一次扫描"+ 三张明星文物预览(后母戊鼎/妇好鸮尊/三星堆面具)的"试试看"卡。 |
| **B 版整体 padding 是 `px-20` 写死** | `v1-B-immersive` 几乎所有页面 | 改成 `px-5 md:px-12 lg:px-20`,装饰性内容(`max-w-3xl`)在窄屏改 `max-w-full`。**否则 B 在手机上根本看不了**。 |
| **B 版 5 屏才到核心功能入口** | `v1-B-immersive/index.html` 落地页 | 把 "今日国宝" 缩到 1 屏内、"三道入口"上移、"已唤醒"做成 sticky 小条挂在 hero 区底部。把诗意收尾保留作为脚注。 |
| **A 版 catalog tab 看不出来是 tab** | `v1-A-textual-research/catalog.html` 第 36-39 行 | 给 active tab 加背景色块(类似 C 的 `bg-amber-100 text-amber-900`),而不是只用底部 1px 朱砂线。 |
| **A 版 index 右上角直接显示"陈翊安 / 北大 / 护照号"** | `v1-A-textual-research/index.html` 第 38-42 行 | 把"持照人 / 单位"做成可改,默认值改为 placeholder。否则**所有非陈翊安的用户都被劝退**。 |
| **C 版 emoji(`📖 🌿`)与"克制"调性冲突** | `v1-C-explorer/artifact.html` 第 99 行;`me.html` 第 169 行 | 用 SVG icon 或纯文字标签替换。Persona C 强调"故宫文创",故宫从来不用 emoji。 |
| **三版的"加入收藏"action 视觉反馈不一致** | A 是按钮、B 是 CTA 区、C 是 `+ 加入图鉴` 按钮 | 统一为 **"+ 收入图鉴" 主按钮 + 一个 1 秒的微动效(印章盖下)+ toast 显示"+1 到时空柱、+1 到古国地图、+0/+1 到纹饰树"** —— **让用户感受到"这一件文物在 N 个维度同时被点亮"**(C 的 README 里其实暗示了这个想法,但没实现成单一统一动效)。 |
| **`artifact.html` 多组件并列默认全展开** | A 最严重(7 个 section)、B 最稀疏(滚 12 屏)、C 最克制(5 维度卡片) | 默认折叠 + 用户主动展开。第一屏只展示 Hero + 5 个维度卡片(用 C 的样式),底下"铭文释读 / 同型对照 / 工艺长卷 / 国宝独白" 4 个可展开 accordion。**新手轻量、学者深度,共用一套页面**。 |
| **段位 / 称号 / 国宝率口径不统一** | 三版 README 各定义一套 | 必须先在产品层定义一套规则:**段位**(初窥→入门→一段→...→大宗师,以"识字数"为单一变量)+ **称号**(隐式,基于维度覆盖,如"夔龙派初识"=识 3 种夔龙变体)+ **国宝率**(自我对照,绝不排行)。这是产品定义层任务,UX 层只能等。 |

---

## What to add

1. **`onboarding.html` 首次访问引导**(3 屏,可跳过):
   - 屏 1:你不是收藏家,你是图鉴的主人。
   - 屏 2:逛博物馆 → 扫一下 → 一件文物会在 5 个维度同时被点亮。
   - 屏 3:从一件你拍过的文物开始。
2. **顶部全局搜索**:输入"毛公鼎"直接跳 artifact;输入"妇好"列出所有妇好系文物。三版都缺。
3. **撤回 / 编辑收藏**:在 `me.html` 卡墙每张卡的右上角加一个 `⋯` 菜单(改备注、撤回、隐藏)。
4. **手机版第一稿**:B 版必须重做。建议**移动端模式 = C 的布局 + B 的视觉氛围**(深色烛火、ken-burns、诗意文案,但用 `max-w-full px-5` 的容器策略)。
5. **空状态文案标准库**:`scan` 无匹配、`me.html` 0 收藏、`time-pillar` 某朝代 0 件 —— 全部需要文案,A 和 C 这块基本空白。
6. **维度联动反馈**:点"加入收藏" → 视觉上看到 (1) 时空柱该朝代填充 +1 (2) 古国地图该地点亮 (3) 纹饰树该节点变色。**这是产品价值的核心可视化,三版都只在文档里描述了,没有真实做出来**。

---

## Specific actionable instructions for next Builder/Designer

> 这部分是给"下一个 Builder 拿到这份 brief 后能直接干"的指令清单。每条都点到文件路径和具体做法。

1. **建 `demos/v2-merged/onboarding.html`** —— 3 屏 carousel,可跳过。复用 C 的视觉(`v1-C-explorer/css/explorer.css` 的色板)+ B 的氛围词("等过三千年")。最后一屏给"从一张你拍的图开始"按钮直跳 `scan.html`。
2. **改 `v1-A-textual-research/index.html` 第 38-42 行**,把 hardcoded `陈翊安 / 北大 / 甲编 No.00837` 改成 `data.js: USER` 里的字段(实际 `data.js` 里**应该**已经支持,但 index 把字段绑死了 —— 看下面 README 第 4 节"用户状态 mock"是 hardcoded)。让"持照人"可改 = 关键解锁。
3. **改 `v1-A-textual-research/catalog.html` 第 10-11 行的 `.view-tab` CSS**,active 状态加 `background: var(--paper-soft); padding-bottom: 0.55rem;`,让 tab 视觉上 dominant。
4. **改 `v1-B-immersive/*.html` 所有 `class="px-20"` → `class="px-5 md:px-12 lg:px-20"`**(全局 sed 替换 + 人工检查)。然后用 Chrome devtool 模拟 iPhone 13 重新过一遍每页。**这是 B 版上线的硬门槛**。
5. **在 `v1-C-explorer/artifact.html` 第 99 行删 `📖`**,改为 `<span class="text-xs text-stone-500 tracking-widest">STORY</span>`;同样 `me.html` 第 169 行的 `🌿` 改为印章 SVG。
6. **建一个 `_partials/artifact-detail.html`(伪)模板**,统一所有"加入收藏"按钮的反馈:点击后 (a) 按钮变印章动画 (b) 顶部 toast 显示"+1 时空柱 · +1 古国地图 · +1 纹饰树"(c) 用 `localStorage` 持久化避免刷新丢。**这个组件是统一三版"维度联动"反馈的关键载体**。
7. **在 `me.html`(任一版本)右上角加一个"复制我的图鉴 URL"按钮,实际复制 `https://museumcollect.cn/u/{hash}`**(mock 即可)。这是 K-factor 的最基础动作,三版都缺。
8. **统一 `scan.html` 的预设样张**:三版 mock seed 不完全重叠(A 有 `lianhe / siyang / lowconf`,B 只有 4 种,C 只有 4 种)。**统一成 6 种 mock seed**:houmuwu(高置信)/ fuhao(中置信,3 候选)/ ocr_houmuwu(展签 OCR)/ inscription_he_zun(铭文识别)/ lowconf(模型不确定)/ nomatch(非青铜)。

---

## What success looks like next round

- 一个**没用过这产品的硬核博物馆爱好者**,Day 1 打开:
  - 30 秒内理解"这是图鉴 + 个人履历 + 多维度认知"
  - 60 秒内完成一次扫描 + 看到收藏被点亮
  - 5 分钟内决定"要在下次去博物馆时打开它"
  - **不会被预设的"陈翊安 / 苏念 / 阿K"角色挡住**
- 在手机上(iPhone 13 / Pixel 6)所有核心流程可走完。
- 当一个用户从 catalog 跳到 me 又跳到 scan 又跳回 catalog 时,**他不会迷路**(顶部 nav 始终在、breadcrumb 清晰、back 按钮符合预期)。

---

## Open questions for the user

> 这些问题**产品决策权在你**,UX 没法替你决定。建议在 morning-report 里讨论。

1. **MVP 主战场是桌面还是手机?** PRD 写"看展前/中/后",看展中肯定手机;但今晚 3 版都是桌面优先。**如果手机优先,B 版基本要全重做**。
2. **要不要"陈翊安 / 苏念 / 阿K"这种预设角色?** 我的强烈建议是:**不要**。让用户自己起名 + 选偏好,产品根据偏好动态调整密度。三版可以做成"密度档位"开关,而不是"三个分支版本"。
3. **收藏一件文物的入口究竟是什么?** 现在三版都默认"已经在数据池里的就能收藏"。真实场景里,**用户拍的照片必须先识别成功**才能加入图鉴 —— 也就是说"扫描" 应该是收藏的**唯一入口**,不是"看到喜欢的就点 +"。如果是这样,catalog 里那个"+ 加入图鉴"按钮在产品逻辑上就是错的。
4. **段位 / 国宝率 / 称号的真实算法**?现在三版都用了 mock 数字,没人定义"国宝率 100% 是怎么计算的"。如果是"我收的 7 件 / 我收的总数 = 7/7 = 100%",那只要我专挑国宝收就永远 100% —— **这个指标有什么意义?** 产品定义需要先想清楚。
5. **"维度联动"是一次点击点亮 N 个维度,还是 N 次行为分别填充?** 比如收藏后母戊鼎,是 (a) 一键点亮商代 + 殷墟 + 饕餮纹 + 食器 + 礼器,还是 (b) 我必须先确认"它是商代"才填充商代?**前者更爽,后者更教育**。这是产品哲学题。
6. **B 版的"国宝独白"如果做成真音频(TTS),版权和声音定型怎么处理?** 一个错误的声音会毁掉整版的氛围。是否在 MVP 不上音频,只保留文字独白?
