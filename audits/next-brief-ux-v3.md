# Next Iteration Brief: UX — v3 → v4 (2026-05-21)

## What to keep

- 统一 sticky nav（9 个 link 是问题，但有 nav 这件事本身是对的）
- catalog.html 的搜索框 + 形制谱系折叠树（比 v1 任何版本都好用）
- scan.html 的 5 步识别动画 + 7 维点亮列表（视觉完成度高）
- me.html 的诚实进度（无假完成率）+ 称号隐式推导
- artifact.html 的编号序列（①-⑪）+ details 折叠
- 穿越模式 toggle 的设计意图（仅修复实现与文案）

## What to change

1. **穿越模式按钮**：统一标签词为"联动 ●/○"（不要"穿越模式"和"联动"混用）；默认显示为开启状态且有更强视觉差异（例：开启时按钮背景浅金色，关闭时灰色）
2. **me.html 事件总线调试面板**：移除或改为 `display:none`，只在 URL 加 `?debug=1` 时显示
3. **catalog 的"+244件"占位卡**：改为文字说明"演示版收录 33 件代表器物；完整版包含 277 件"；或实现基础分页（每页 33 件，4 页）
4. **顶部导航精简**：从 9 链接减为 5 核心入口：图鉴 / 时代柱 / 地理 / 铭文 / 我的图鉴。礼制场景/铸主/纹饰树 改为 artifact.html 内的维度卡入口 + catalog 的 filter 入口
5. **toggleCollect 补全 uncollect 分支**：state.js collect() 方法加 action='uncollect'；artifact.html 按钮状态双向切换

## What to add

1. **Day-0 onboarding 最简版**：首次访问（localStorage 标记）时，显示 3 步卡片叠层：① "选一个称呼"（可跳过）→ ② "扫描你在博物馆看到的第一件青铜器"→ ③ "看到它在七个维度点亮"。最小实现：在 index.html 加一个 `#onboarding-overlay` div，localStorage 标记控制显隐
2. **scan.html 识别结果的维度链接**：7 维点亮列表每行加可点击链接（时代柱→time-pillar.html?era=X、地理→geo-system.html?era=X、纹饰→pattern-tree.html 等），把发现 wow 点的摩擦降到最低
3. **穿越模式的同页演示**：在 index.html 底部 "era-progress-mini" 区域做一个内嵌演示：hover 小柱子→同页面出现纹饰缩略图变化。这样无需跨页也能让用户感受联动效果
4. **artifact.html breadcrumb**：在 hero 区上方加一行 `图鉴 / 商 / 后母戊鼎`，点击可回 catalog（支持 era/form 参数保留）

## Specific actionable instructions for the next Builder

1. **me.html 调试面板隐藏（15 分钟）**：找到 me.html 中 id="bus-debug-panel" 所在的整个 `.dim-card`，将其 style 改为 `display:none`。同时修改 cross-dim-wiring.js 或在页面 script 末尾加 `if (!new URLSearchParams(location.search).has('debug')) document.querySelector('.dim-card:last-child').style.display='none'`
2. **穿越模式按钮统一（20 分钟）**：修改 cross-dim-wiring.js 第 111 行，将两个 textContent 都改为以"穿越模式"为词根：`'穿越 ●'` / `'穿越 ○'`；同时将所有 HTML 文件的初始标签统一为 `穿越 ●`
3. **scan.html 7 维链接（30 分钟）**：在 showResult() 函数的 dims 数组每个对象加一个 href 字段，模板里把整行改为 `<a href="${d.href}" style="...">`；href 示例：时代柱→`time-pillar.html?era=${artifact.dynasty}`，铭文→`inscription-reader.html?id=${artifact_id}`
4. **Day-0 状态最简实现（45 分钟）**：在 index.html DOMContentLoaded 里加：`if (!localStorage.getItem('mc_v3_visited')) { showOnboarding(); } else { document.getElementById('onboarding-overlay').style.display='none'; }`；onboarding overlay 做成 3 屏全屏叠层，最后一屏有"跳过"和"去扫描"两个出口

## What success looks like next round

- 新用户打开 index.html，看到的是自己的 0/277，而不是别人的 35/277
- 在 scan.html 完成一次识别后，我能一键跳到时代柱或铭文释读器
- 穿越模式按钮状态清晰（金色=开，灰色=关），hover 时代柱后同页面有可见反馈
- me.html 干净，没有调试代码
- 顶部 nav 不超过 6 个 link

## Open questions for the user

1. **跨页联动是否是核心 demo 场景**？如果是，需要 BroadcastChannel 或 localStorage 监听实现；如果 demo 定义为"单页内多维度展示"，则需要重新设计展示入口（把多个维度 widget 嵌入同一页面）。这个选择影响整个架构。
2. **移动端时间表**：README 说 mobile 推迟到 v4，但核心场景是"博物馆现场扫码"。v4 是否必须上移动端优化？否则 demo 的使用场景叙事是破损的。
3. **277 件数据的真实展示**：catalog 只展示 33 件。用户第一次看到"277 件"标题然后只见到 33 件，信任损耗很大。是否在 v4 用虚拟滚动展示全部，或者索性改 demo 文案为"收录 33 件精选，完整版 277 件"？
