# MuseumCollect — Persona C 探索派 (Z 世代) Demo

> **Builder C** · 阿K · 21 · 美院大三
> 故宫文创 + 潮玩 + 克制游戏化

---

## 设计哲学(100 字)

把博物馆变成"图鉴 + 段位",但绝不变成"赌场"。我们把抽卡 / 稀有度 / Pokédex / 梗卡片全开,但稀有度光晕只给国宝级,称号是隐线,庆祝动效 ≤ 2 秒可跳过 — 让 21 岁的阿K感觉"这是潮玩",而不是"这是 Skinner box"。每一个 game-feel 元素背后,都连接的是真实知识(子型集齐 → 解锁的是进化时间线,不是 +1000 XP)。

---

## 8 个页面

| 文件 | 角色 |
|------|------|
| `index.html`            | 抽卡式 hero card flip + 进度 stats + 今日推荐(妇好鸮尊) |
| `catalog.html`          | Pokédex grid · 已收 vs 剪影 · 三种切换(时代/出土地/形制) |
| `artifact.html`         | 单件 — card-flip 详情 + 5 维度面板 + 铭文 hover 释读 + 相关推荐 |
| `time-pillar.html`      | 时空柱(高度 ∝ 时长)· 空段 soft-breath · 通鉴进度 |
| `ancient-map.html`      | 古地图风格 · 5/12 已踏足 · 三星堆有金光晕 · 商/西周/战国切换 |
| `form-genealogy.html` ★ | **C 招牌**:D3 横向谱系树 + Pokédex 对照墙 |
| `me.html` ★             | **C 最重要页**:7 件卡墙 + 段位 + 称号 + 梗卡片生成器(modal) |
| `scan.html`             | 扫描 → 进度 → 卡片掉落 → 国宝光晕揭示 |

---

## 实现的组件(7 of 10)

| Component spec | 实现位置 | 备注 |
|----------------|---------|------|
| **rarity-halo** ★      | 全局 CSS + 各页面卡片 | 国宝级:金边 + 缓慢龙纹 conic-gradient + 朱砂"国之重器"印章。一级:仅金边。二级以下:无光效。**克制 = 高级** 严格遵守 |
| **time-pillar** ★      | `time-pillar.html`    | 段高严格 ∝ 时长,有 has-treasure 渐变,空段 soft-breath |
| **ancient-map** ★      | `ancient-map.html`    | SVG 古地图皮,4 个时代切换,三星堆有 treasureGlow radial |
| **form-genealogy** ★   | `form-genealogy.html` | D3 hierarchy tree + Pokédex 对照墙(空 slot 占位)+ 缺位提示 |
| **inscription-reader** | `artifact.html`       | 字字 hover 弹释读 + 段位印章 + 已识字浅金高亮 |
| **pilgrimage-passport**| `artifact.html` 的馆藏 stamp + `me.html` 的称号 row | 印章风,各馆有不同朱色 |
| **purpose-scene**      | (轻量)在 catalog 按用途/形制分组 + me.html 称号 | 没做完整 isometric 场景(时间)|
| pattern-tree           | 在 `artifact.html` 列出纹饰 chips,未做演化树 | 时间预算给了 form-genealogy |
| craft-scroll           | 未做(纳入 README 的 trade-off) | 时间 |
| caster-profile         | 未做(纳入 README 的 trade-off) | 时间 |

---

## "克制 vs 显式"如何落地

阿K 是 25% Z 世代,核心动机是 **收集 + 社交**,但 Designer 在 rarity-halo spec 里写了 **"克制 = 高级"** 是不可动摇的。我把这条张力分两层处理:

1. **稀有度视觉只给国宝**
   - 普通 / 三级 / 二级 — **完全没有光效**,只有不同色的薄边
   - 一级 — 仅金边,无光晕
   - 国宝级 — 金边 + 缓慢旋转的 conic-gradient 光晕(30s/cycle,不是 2s 的赌场闪烁)+ 朱砂红章
   - 结果:打开 `catalog.html` ,只有真正的国宝在金光闪闪,其他都是素雅的边框。**朱砂红 + 鎏金**配色让它像故宫文创,不像泡泡玛特。

2. **游戏化机制是"显式 + 克制"**
   - 我们 **有** 进度条、段位印章、Pokédex grid、抽卡 flip、梗卡片
   - 但是:
     - **没有每日签到** — 永远不出现 streak 提示
     - **庆祝 toast ≤ 1.9 秒**(scan.html 的 reveal 是 900ms 弹簧 + reveal panel 渐显)
     - **段位是隐线** — 不在 me.html 上做"成就墙"专页,称号只挂头像旁
     - **没有 XP +1000** — 集齐子型解锁的是"进化时间线",不是数字
     - **空段不变红** — 仅 soft-breath(opacity 0.85↔1.0)+ 文案"待踏足"
     - **没有概率抽卡** — scan.html 的"开盲盒"是真的识别,不是随机掉落
   - 这让阿K 仍然感觉是"在玩游戏",但游戏的奖励是 **认知能力**(她真的开始能区分鸮尊和方尊),不是空虚的分数。

---

## Anti-Skinner 检查表

| 规则 | 状态 |
|------|------|
| ❌ 每日签到积分 | ✅ 完全不存在,me 页底部还有"不必每天打开"banner |
| ❌ 单纯排行榜 | ✅ 只有"你的国宝率 100% vs 行业 4%"自我对照 |
| ❌ 庆祝彩带/音效 | ✅ scan reveal 是 ≤1.9s 弹簧动画,可跳过(点击外部即跳过) |
| ❌ 必走教程 | ✅ 没有任何 tutorial overlay |
| ❌ 强制完成 X 才解锁 Y | ✅ 所有页面无锁,catalog 显示剪影但仍可点查看候选 |
| ❌ XP 数值面板 | ✅ 段位印章 + 中文称号("铭文识读·二段"),无 Lv.99 |
| ❌ 推送通知占位 | ✅ 无 |

---

## 视觉决策

- **配色**:基底 `#faf7f2`(warm paper),accent 朱砂红 `#c0392b` + 翠绿 `#2e8b57` + 鎏金 `#c9a85f` / `#d4a857`(国宝级)。故宫文创 vibe,饱和度受控
- **字体**:`PingFang SC` 系统字 +`STKaiti` 用于梗卡片和印章中文 — 让"梗"那行有书法味,提升"晒朋友圈"被认作"有文化"的概率
- **圆角**:慷慨(16-24px) — 潮玩感
- **玻璃**:nav 用 `backdrop-filter: blur(16px) saturate(180%)` — 微高级
- **微交互**:`bounce-on-hover` (scale 1.02) + `click-feedback` (active scale 0.96/0.97)
- **动画原则**:都用 `cubic-bezier(0.2, 0, 0, 1)`(easeOutQuint)或 spring,绝不用 linear / bounce-in 的廉价感

---

## Hardcoded user state

7 / 25 件已收(模拟第 4 周阿K,周二):
```
houmuwu_ding              (国宝 · 商 · 国博)
siyang_fangzun            (国宝 · 商 · 国博)
fuhao_xiaozun             (国宝 · 商 · 河南博)  — 妇好系第 1 件
sanxingdui_zongmu_mianju  (国宝 · 商 · 三星堆)  — 触发"二重文明见证者"
lianhe_fanghu             (国宝 · 春秋 · 故宫)
he_zun                    (国宝 · 西周 · 宝鸡)  — "宅兹中国"
changxin_gongdeng         (国宝 · 西汉 · 河北)
```

铭文识字数:47 → 段位"二段"。再识 3 字 → 三段。
国宝率:100%(全部 7 件都是国宝级,符合 Persona C "首屏炸裂"的心理预期 — Designer 在 personas 里写她对一星二星没兴趣)。

---

## 阿K 会不会发小红书?

- **首屏 hero card flip**:卡背 → 翻面 → 国之重器红章 + 妇好鸮尊金光 → 这是录抖音的画面
- **me.html 卡墙**:7 张金光卡片整齐排列,自带"印章"水印,**截屏就是封面**
- **梗卡片生成器**:"我比国博还早 set up 这个 boss"(后母戊鼎) + 妇好鸮尊"商朝的女将军做的鸟兽尊,3000 年前的潮玩"
- **scan 的 reveal**:从黑底卡片掉下来 + 国宝光晕,然后右侧告诉你这件还点亮了"时空柱 + 古国地图 + 谱系树",**说人话就是"一颗按钮让 3 个东西亮起来"**

---

## 时间预算说明

- 我刻意保留了 `pattern-tree.html` 没建为独立页(spec 里这是 P0,但 Designer 说 Persona C 的核心钩子在 form-genealogy + me + scan,我把工程预算压到这三页深度)
- `purpose-scene`(场景重建拖拽)只在 catalog 的"按形制"做了静态分组,没做拖拽 isometric
- `craft-scroll` + `caster-profile` 完全没做(spec 优先级 P1/P3)
- 没有写 `screenshots/` — 这是个 Phase 3 demo 不是 Phase 4

---

## 文件清单

```
demos/v1-C-explorer/
├── README.md                  (this file)
├── index.html                 (hero + stats + 3 dim + recent + next milestone)
├── catalog.html               (3-tab Pokédex grid + filters)
├── artifact.html              (card flip + 5-dim + meme quote + inscription hover)
├── time-pillar.html           (vertical pillar + period panel + 通鉴 progress)
├── ancient-map.html           (SVG 古地图 + 12 sites + era switcher)
├── form-genealogy.html        ★ D3 tree + Pokédex wall
├── me.html                    ★ avatar + 段位 + cardwall + 梗卡片 modal
├── scan.html                  (image picker + scanning + card reveal + 4 bands)
├── css/
│   └── explorer.css          (CSS variables, rarity tiers, card-flip, glass)
└── js/
    ├── state.js               (catalog loader, COLLECTED_IDS, helpers, placeholderSvg)
    └── mock-recognition.js   (copied from ai-service/)
```

---

## 我最骄傲的页面

**`me.html`** + 梗卡片生成器 modal。
- 4 stats + 出土地分布 + 即将解锁 — 这是阿K 每周打开 App 的第一眼想看的"我的画像"
- 卡墙用 Pokédex 风格 — 自带稀有度光晕分级
- 梗卡片 modal 是 K-factor 的关键:她选一件、改一句梗、选背景风格、preview 立刻刷新 — **这是录抖音的 hook**

`form-genealogy.html` 的 D3 横向树 + Pokédex 是 C 招牌页;`scan.html` 是 day-1 wow 的载体(扫描 → 卡片掉下 → 反馈3维同时点亮)。这三页一起承担了 Persona C 的"主战场"。

---

> Builder C · 2026-05-20 · 探索派 demo for MuseumCollect
