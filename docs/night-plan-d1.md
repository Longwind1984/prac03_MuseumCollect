# Night Plan D1 — v3 Iteration

> 基于 user 反馈的迭代。3 大反馈 → 4 个决策 → v3 plan。

---

## Context (why v3)

User 反馈 3 大问题:

1. **知识库不够** — 25 件 → 不够撑图鉴密度;每件介绍只是一段笼统文字 → 应结构化
2. **视觉/形态没表达出来** — 地图是 HTML 手搓粗糙、纹饰节点缺独立 icon、时空柱粗糙 — 整体视觉需大幅大幅提升
3. **PM 维度反思** — 用户 3 个例子(时空柱/出土地图/纹饰演化)只覆盖了 30% 核心,缺**形制 + 铭文** 两大 ⭐⭐⭐⭐⭐ 必做项

User 4 个决策(via AskUserQuestion):
- ✅ 7+1 一级维度(形制 / 时代 / 地理 / 纹饰 / 铭文 / 用途 / 铸主 + 稀有度全局层)
- ✅ 知识库 300 件全深度顶配(11 字段 + 1-3 张图 + 50 件加 3D/视频)
- ✅ 收敛 1 个 polished demo(A 为 spine + B/C 杀手锏)
- ✅ 一晚跑完

**显式不做**: mobile 适配(留 v4)、Taro 小程序(留 v5)

---

## v3 一级维度集合(7+1)

| # | 维度 | 现有形态 | v3 升级方向 | 备注 |
|---|------|---------|-------------|------|
| 1 | **形制**(鼎簋鬲爵尊壶...) | C 的 Pokédex 谱系树 | Pokédex + 实景照片切换 + 同型尺寸比例对照 | Phase B4 |
| 2 | **时代** | 三版都有(粗糙) | 重做:朝代时长 + 配色 + 历史事件标注 + 收藏密度叠加 + 缩放下钻 | 改名"**时代柱**"(原"时空柱"误导) |
| 3 | **地理**(出土 + 馆藏 双 view) | B 的 6 era 切换(手搓 SVG) | 真实地形 GeoJSON + 古国疆域 overlay + dual mode | Phase B1 — 大改 |
| 4 | **纹饰** | A 的演化树(节点缺 icon) | 演化树 + 15-25 个纹饰 SVG icon | Phase B2 |
| 5 | **铭文/金文** | A 的释读器 + 段位 | 字字交互 + 长卷专题(何尊"中国"二字)+ 段位制 | Phase B4 |
| 6 | **用途/礼制** | B 的礼器归位场景(杀手锏) | 沿用 B 设计 + 加 5 套场景 + 等级判定细化 | Phase B4 |
| 7 | **铸主/主人** | A 的迷你卡 | 列传卡 + 关系图谱(D3 force-directed) | Phase B4 |
| ★ | **稀有度** | 全局光晕层 | 沿用,做 4 档梯度 + 195 件禁止出境特殊章 | 全局,non-blocking |

---

## v3 五阶段(compute ~14-19h, wall-clock ~6-10h with parallelism)

### Phase A — 知识库扩展(估 5h compute, ~1.5h wall-clock)

**广度**: 25 → 300 件

数据池构成:
- 国宝级(禁止出境)青铜器: ~25 件(已有)
- 一级文物级青铜器: ~150 件(各馆镇馆)
- 二级精品 + 高知名度: ~125 件
- 重点 50 件加 3D/视频链接(三星堆 / 曾侯乙 / 妇好墓 / 殷墟系列)

**深度**: 每件 11 字段(替代当前 1 段 story_brief)
1. 基本信息(name/dynasty/period/site/museum/size — 已有)
2. **出土发现**: who/when/where/how/dating method/significance
3. **形制详解**: 主体/附件/比例/distinctive features
4. **纹饰逐层**: 主纹/副纹/地纹/边纹(位置+风格+含义,关联到 v3 纹饰 icon)
5. **铭文释读**: 原文/释文/白话/字数/金文阶段
6. **用途历史**: 仪式场景/使用者/传承
7. **学术地位**: 在品类中的代表性/断代价值
8. **传承流转**: 出土→流转→入馆 timeline
9. **关联文物**: 同墓/同主/同形制/同纹饰/同地区(已有 dimensional links)
10. **照片库**: 1-3 张 CC-licensed(全景/局部纹饰/铭文拓片)
11. **3D/视频**(50 件 stretch): 公开数字化资源 link

**Agents**: 3 个 Data Engineer 并行(各负责 100 件 一级/二级 segment)+ Domain Researcher 校验 schema 一致性 + Content Auditor (Critic loop) 抽样防幻觉

**Risk mitigation**:
- LLM 幻觉:Critic agent 随机抽 30 件交叉验证关键事实
- License:严格 CC0/CC BY/CC BY-SA,Baidu Baike 等仍禁止
- 数据稀疏:无法填的字段标 TODO 不编

### Phase B — 视觉/形态大幅升级(估 4-6h compute, ~2h wall-clock parallel)

**B1 — 真实地理地图系统** (1 Builder)
- 底图: 中国地形 GeoJSON(山川河流 + 大致今行政区划淡化)
- Overlay: 古国疆域(商/西周/春秋/战国 各一版 SVG,可切换)
- 标点:考古遗址(出土) vs 现代博物馆(馆藏) dual mode
- 海外流散单独 view(欧美日 collections)
- 技术: D3.js geoPath + 真实 GeoJSON(不再手搓)
- 资料源:CHGIS(哈佛中国历史地理信息系统)/ Natural Earth / OSM
- 替代:当前 B 的手搓 ancient-map

**B2 — 15-25 个纹饰 SVG icon 套** (1 Builder)
- 必做(按重要性):饕餮/夔龙/凤鸟/云雷/蟠螭/蟠虺/窃曲/重环/鳞/蝉/焦叶/弦/乳钉/涡/三角/几何
- 可选:虎噬人头/兽面/鸟兽合体/兽体卷曲
- 风格:stylized monochrome SVG,bronze 色,viewBox 0 0 80
- 用途:纹饰演化树节点 / artifact patterns 字段 / 收藏成就

**B3 — 时空柱重做 + 跨维度联动** (1 Builder)
- 配色 per 朝代(夏褐/商青铜/西周朱/春秋墨/战国赭/秦玄/汉黄)
- 历史关键事件标注(武丁/武王伐纣/周公东征/三家分晋/商鞅变法/统一六国)
- 收藏密度叠加(收藏件填充段位 + 颜色饱和度)
- 缩放 + 下钻(点击西周 → 武王/成王/康王/...)
- **跨维度联动**:hover 朝代 → 地图古国边界自动切换 → 纹饰演化树高亮该朝代主纹饰

**B4 — 其他 4 维度 spec 重写** (Visualization Designer)
- 形制 Pokédex 升级:silhouette + 实景照片切换 + 尺寸对照
- 铭文释读器:何尊长卷专题(中国/宅兹/中域 字字考据)
- 用途场景:沿用 B 设计 + 加 2 套场景(军礼/葬礼细化)
- 铸主:列传卡 + 关系图谱(D3 force-directed)

**Agents 配置**:
- 1 Visualization Designer 出 v3 spec(并发起 B4)
- 3 Builder 并行 B1 / B2 / B3
- Aesthetic Auditor 中途 spot-check

### Phase C — 单 demo 收敛(估 3-4h compute, ~1.5h wall-clock)

- 选 A v1 (Composite 7.8) 作为信息/视觉骨架
- 集成 B v1 的 purpose-scene(礼器归位)杀手锏
- 集成 C v1 的 sticky nav + Pokédex 结构
- Wire 入 Phase A 的 300 件数据 + Phase B 的视觉升级
- Output: `demos/v3-converged/`
- 8 个核心页面(同 v1)+ 必要时新增 inscription-special.html(何尊长卷)
- ★ 暂不做 mobile(留 v4)
- ★ 暂不做 C anti-Skinner 修复(单独 iteration)

**Agent**: Builder-Converger(single, Sonnet)

### Phase D — Re-audit(估 1-2h compute, ~30 min wall-clock)

6 Auditor 重新评估 v3:
- UX / Aesthetic / Content / Motivation / PM 视角(同前)
- Comparative 视角:**v3 vs v1 改善了什么?哪里仍未达标?**

**Agents**: 6 Auditor 并行 + Comparative 最后

### Phase E — Close-loop(估 1-2h compute)

基于 Phase D audit 的 P0/P1 fix + 触发新 close-loop iterator

---

## Wall-clock 时间线(估 ~7h)

```
H0   plan committed
H0-2 Phase A (3 Data Engineer 并行 + Content Auditor 监督) → 300 件
H2-4 Phase B (Designer + 3 Builder 并行) → 视觉升级
     ↘ overlap: Phase A 一旦完成 100 件就可开始
H4-5.5 Phase C (Builder-Converger) → v3 demo
H5.5-6 Phase D (6 Auditor 并行)
H6-7 Phase E (close-loop + morning-report)
```

---

## Token / Cost 预算

| Phase | Token 估 |
|-------|---------|
| Phase A | 600-800K |
| Phase B | 500-700K |
| Phase C | 300-400K |
| Phase D | 500-700K |
| Phase E | 150-250K |
| **Total** | **~2-2.8M** |

类似 v1 量级。

---

## Risks & Mitigation

| 风险 | Mitigation |
|------|------------|
| 300 件数据 LLM 幻觉 | Content Auditor 30 件随机抽查 + Critic loop |
| 照片 license 拿不到足够 | 优先 Wikimedia Commons,缺图标 TODO 不编 |
| 地理地图 GeoJSON 找不到合适开源 | Fallback: 简化古国轮廓 SVG(but better than 当前手搓) |
| 收敛单 demo 失去 v1 多样性的 portfolio 价值 | Case-study §5 显式 frame: "v1 是探索,v3 是收敛 — 这是 PM 思维的演进" |
| 视觉升级开销超预算 | Phase B 各 Builder 设硬截止,缺的 spec 留 v4 |
| 容器中途回收 | 已强制每 phase 完 commit + push |

---

## Definition of Done

- [ ] `data/curated/bronze-treasures-v3.json` — 300 件,11 字段填充率 ≥ 80%
- [ ] `data/licensing-log-v3.md` — 每张图 license 追溯
- [ ] `docs/dimensional-map-v3.md` — 7+1 维度更新(命名修正 + 形态升级)
- [ ] `docs/component-specs/v3/*.md` — 7 维度新 spec
- [ ] `assets/patterns/*.svg` — 15-25 个纹饰 icon
- [ ] `assets/geo/*.json` + `assets/geo/*.svg` — 地理地图资源
- [ ] `demos/v3-converged/` — 8+ 页面,集成所有升级
- [ ] `audits/d2-*.md` × 6 — re-audit
- [ ] `audits/v3-close-loop.md` — iteration evidence
- [ ] `morning-report-d1.md` — 起床 5 分钟扫完

---

## Launch trigger

User 回 **"启动"** 即开跑。Orchestrator 全自主决策 + decision-log(同 v1 政策)。
