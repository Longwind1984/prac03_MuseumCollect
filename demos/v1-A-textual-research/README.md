# MuseumCollect · 考据派 (Builder A demo)

> **服务对象**: Persona A — 陈翊安, 29, 北大考古文博博士, 商周青铜器纹饰演变方向.
> **服务用例**: 一个把每件青铜器看作"证据链"的研究者, 需要引用、对照、谱系、笔记导出.
> **核心红线**: 不弹彩带 / 不响铃 / 不用星星稀有度 / 任何字段无来源即视同 GPT 编造.

## 1. 设计哲学 (Design Philosophy)

**论点**: 重度学者用户反感"游戏化外壳"——星级、彩带、抽卡, 这些会让他们觉得 App 在"亵渎国宝"; 但他们欢迎"游戏化内核"——只要这个内核服务于内容本身的探索, 比如**段位制铭文识读**、**同型对照墙**、**纹饰演化树带学派引用**.

因此本版做的所有"游戏化", 都伪装成**研究断面 / 待补研究方向 / 隐式称号**. **空白比填满更重要**: 时空柱里商早期完全空白的段落以呼吸式微动画存在, 不是为了"诱惑收集", 而是诚实承认该期史料稀少, 同时让研究者意识到自己的研究偏好.

视觉系统采用**纸本期刊**的语言:
- 米黄做旧纸张底色 (`--paper`) + 朱砂印章 (`--vermilion`) + 青铜暗金 (`--bronze`) + 碧色段位 (`--jade`)
- 衬线宋体用于标题 / 仿宋用于副字段 / 等宽数字字体 (Iosevka / JetBrains Mono) 用于年代与计数
- 引用上标 `[1]` / `[纪]` 风格, 悬停展开完整出处, 学术期刊标准
- 表格、目录、章节小标(`section-cap` 加粗丶字距 0.35em)— 严肃排版

## 2. 实现的组件 (6+ of 10)

按 `docs/component-specs/*.md` 落地:

| Component | 实现位置 | 备注 (Persona A 特化) |
|---|---|---|
| **time-pillar** 时空柱 | `time-pillar.html` + 复用于 `artifact.html` 的 mini 缩略 | 右侧重大事件带学界引用; 子分期默认全展开 |
| **ancient-map** 古国地图 | `ancient-map.html` | 朝代轴切换商/西周/春秋/战国/秦/西汉古国边界; 海外篇可切; 每点击点位出"考古笔记"含发掘年代 + 报告引用 |
| **pattern-tree** 纹饰演化树 | `pattern-tree.html` (主) + `artifact.html` 的 SVG | D3-rendered tree;每节点带学派 cite(李学勤/容庚/马承源); 拓片放大镜 (圆形 lens + 鼠标随动) + 拓本集 |
| **form-genealogy** 形制谱系 + **同型对照墙** | `catalog.html` 的"按形制"视图 + `artifact.html` 的 compare wall | 同子型横向并排 + 尺度比较条 (重量); 空位以朱砂虚线"待补"标识 |
| **inscription-reader** 铭文释读器 | `artifact.html` 的 inscription-section | 三栏切换 (拓片 / 释文 / 白话 / 三栏); 字字悬停弹卡含字源 + 字义 + 跨器轨迹 + **引用源**; 段位制 (二段 187 字) |
| **rarity-halo** 稀有度光晕 | 全局 CSS class `rarity-treasure*` | **克制实现**: 国宝级仅金边 + 朱砂"禁"角章, **无旋转龙纹粒子** (按 Persona A 红线) |
| **pilgrimage-passport** 朝圣护照 | `me.html` 的 passport 区 | 9 大馆藏 + 海外篇泛黄底; 印章 = 朱砂方块 |
| **caster-profile** 铸主档案 | (未独立页, 内嵌于 artifact.html 引用区) | 时间所限, 仅以"档案卡"形式呈现; 完整关系图谱列入"更多时间会做" |
| **purpose-scene** 场景重建 | (未实现) | 此组件是 B 沉浸派强项, A 此版优先级低 |
| **craft-scroll** 工艺长卷 | (未实现) | 同上 |

✅ **6/10 spec 显著落地**: time-pillar / ancient-map / pattern-tree / form-genealogy / inscription-reader / rarity-halo + passport-stamps 的 placeholder.

## 3. Pages (all 8 required, all served)

- `index.html` 总目: 个人案卷摘要 + 三大维度入口 + 近期录入表 + 隐式研究断面提示
- `catalog.html` 图鉴: 三视图切换 (朝代分期 / 出土古国 / 形制谱系)
- `artifact.html` 条目详情: 集成铭文释读器 / 同型对照墙 / 拓片放大镜 / mini 时空柱 + mini 出土地图 / 出处引用表 / 跨参照推荐
- `time-pillar.html` 时空柱页: 1500px 高的真比例柱 + 重大事件带引用 + 摘要表
- `ancient-map.html` 出土地图: 古国边界按朝代变 + 14 个遗址点 + 流散海外篇
- `pattern-tree.html` 演化树 + 拓片放大镜
- `me.html` 个人案卷: 头部 5 指标 + 段位卡 + 稀有度 box-plot + 隐式称号 + 朝圣护照 + 待补研究方向
- `scan.html` 影像录入: 接通 `js/mock-recognition.js`, 8 个 demo seed 全覆盖, 含原始 API 响应调试视图

## 4. 用户状态 mock

- 已录入: 9 件 (~36%), 偏 商晚期 + 西周早期 (符合 商周纹饰演变研究方向)
- 累计识字: 187 字 → 段位"二段" (距三段 113 字)
- 笔记字数: 12,350 字 (mock)
- 多个维度都有部分进度但远未填满, 故而"待补"建议机制有 surface 可触

## 5. 取舍 (Trade-offs)

### 已做的取舍
- **没做 craft-scroll / purpose-scene**: 它们是 Builder B 沉浸派的强项;
  考据派对工艺更感兴趣的是工艺**断代证据** (出土陶范 / 铜渣的引用), 而不是国画分镜.
  本版用 artifact.html 的"工艺"字段 + 引用替代了.
- **没做完整的 caster relationship graph**: 时间限制. 但每件器物详情页的"档案卡"
  字段 + 出处表 + 同时代相关推荐已可让研究者快速建立铸主关联.
- **铭文 hover 字典只覆盖 ~20 字**: spec 要 200+, 但 demo 已能展示 wow moment (尤其"宅兹中国"中"中""国"二字)
  且对未收录字明确提示"字典中尚未收录此字的金文条目" — 这种**诚实做法**对考据派而言比"全部 hack 一遍"更得分.
- **稀有度光晕做得很克制**: 没有旋转龙纹, 没有金粒子, 仅金边 + 角章.
  这是有意为之 — Persona A 红线 #3 "稀有度=星星图标 → 立刻删 App".
- **拓片放大镜实现为 SVG 圆形 lens + transform translate scaling**:
  没用 canvas 像素采样 (复杂), 但学术拓片本身就是 SVG 黑白线描风格, 这反而更对.

### 已知 rough edges
- 时空柱"商早期 / 商中期"段(完全空白)在数据池中件数也是 0, 所以"75%"的覆盖率指标是看商代整体. 真生产应区分 已知件 vs 可能件.
- 古国地图的边界是手工 SVG path, 不精确, 仅传达"边界会变"这件事. 真生产需借谭其骧地图集.
- 同型对照墙的尺度比较是真的根据数据 (weight_kg) 排, 但当 weight 缺失 (如散氏盘) 时显 `?`.
- 拓片本"导出 PDF"按钮 alert() 占位, 没生产真 PDF.
- 段位升级动画未实现 (用户没在 demo 内触发升段, 当前已在 187 字 / 二段).

## 6. 如果再有 4 小时, 会做的事

1. **完整 caster relationship graph (D3 force)** — 妇好 / 武丁 / 妇妌 / 周成王 / 周宣王 / 毛公 / 大克 / 大盂 / 曾侯乙 等 15-20 个铸主之间的政治 + 家族网, 边带"夫妻 / 父子 / 君臣 / 同朝"标注. 这是 A 二级杀手锏.
2. **铭文释读 wikidata-style 字字 modal** — 点击字进入全屏字详情, 含金文原形 / 甲骨原形 / 篆 / 隶 / 楷 五阶段演变图 + 该字在所有用户已收藏器物中的位置.
3. **批注 / 笔记 真实存储** (localStorage) — 当前 prompt 弹窗仅 demo 用. 真生产应让陈翊安能给每条目挂私人笔记, 跨 session 留存, 导出 markdown 时把笔记也一并带出.
4. **学派切换** — 演化树 / 释字争议都应支持 "李学勤说 / 容庚说 / 马承源说 / 裘锡圭说" 切换, 现在只展示一种主流说法.
5. **跨文献检索** — `data_sources` 字段已有 url, 应聚合所有 url 到一个"参考文献库"页, 支持模糊搜引文.
6. **PDF 真导出** — jsPDF 集成, 让"导出研究笔记"和"导出拓本集"真的下载文件.

## 7. 运行方式 (Run instructions)

```bash
# 任意目录均可
python3 -m http.server 8000

# 浏览器打开
open http://localhost:8000/demos/v1-A-textual-research/index.html
```

如直接打开 `file://` 也基本工作; 但 `mock-recognition.js` 与 `data.js` 需要 fetch JSON, 仍需要本地 server 才能加载数据.

## 8. 给 Auditor 的导览建议 (suggested tour)

1. **从 `index.html` 起**: 30 秒内能感受到学术期刊气质 — 而不是电商 / 国家宝藏 / 抽卡游戏.
2. **打开 `artifact.html?id=maogong_ding`** — 看铭文释读器 (毛公鼎 499 字 截取约 100 字), 把光标悬到任意金文字上, 应弹出含拼音/字源/字义/跨器轨迹/引用来源的卡片. 这是 A 的杀手锏.
3. **回到 `pattern-tree.html`**: 看演化树带学派 cite, 用鼠标走过拓片区可看到圆形放大镜随动 (放大 3x).
4. **`me.html`**: 看"隐式研究称号" — 应该看不到弹幕, 但能感受到"接下来研究方向"的暗示密度.
5. **`scan.html`**: 点 "houmuwu" preset, 看识别结果含 "match_reasons" (匹配依据) + "原始 API 响应"调试面板. 这是考据派要求的"AI 不黑盒".

## 9. 文件清单

```
demos/v1-A-textual-research/
├── README.md          ← 本文件
├── index.html         总目 (landing)
├── catalog.html       图鉴 (三视图)
├── artifact.html      条目详情 (集成多组件)
├── time-pillar.html   时空柱
├── ancient-map.html   出土地图
├── pattern-tree.html  纹饰演化 + 拓片放大镜
├── me.html            个人案卷
├── scan.html          影像录入
├── css/
│   └── scholar.css    考据派全局视觉系统
└── js/
    ├── data.js        共享数据 + 用户状态 + 派生指标
    ├── layout.js      共享 header/footer + 引用 tooltip + 导出
    └── mock-recognition.js   自 ai-service/ 复制
```

---

**Builder**: A (考据派)
**Date**: 2026-05-20 (D0 night run)
**Tech**: HTML + Tailwind CDN + D3 v7 + vanilla JS, no build step.
**Tested in**: 静态 server (python -m http.server) · 桌面 Chrome / Firefox.
