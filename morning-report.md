# Morning Report — Night Run D0 (2026-05-20)

> 早安。8 小时夜跑总结。先扫这页 (5 分钟),再决定深入哪里。

---

## TL;DR

✅ **3 个高保真 demo 完成 + 完整 audit 闭环 + v2 close-loop 完成**

- 15 个 sub-agent 跑完,~2.4M token (~$20-25)
- 3 personas (陈翊安 / 苏念 / 阿K) → 3 个差异化 demo (A 考据派 / B 沉浸派 / C 探索派)
- 6 视角 audit (UX / Aesthetic / Content / Motivation / PM / Comparative) — Composite ranking **A 7.8 > C 6.8 > B 6.2**
- v2 close-loop iteration **已 ship**:12 silhouette SVG + 4 content fixes + B/C 接入 + Playwright 验证 — 这是 PM Auditor 强调的 portfolio-killer "audit-as-trigger 实证"已经成立

**核心洞察**:5/5 Auditor 独立 flag **图像供应链** = 最强信号(没真实文物 silhouette 永远过不了"配得上国宝"这一关)

---

## 你早晨建议的 30 分钟

1. **15 min**: 浏览 3 个 demo
   - `file:///home/user/prac03_MuseumCollect/demos/v1-A-textual-research/index.html`
   - `file:///home/user/prac03_MuseumCollect/demos/v1-B-immersive/index.html`
   - `file:///home/user/prac03_MuseumCollect/demos/v1-C-explorer/index.html`
2. **10 min**: 读 `audits/merged-spec.md`(v2 综合 spec)
3. **5 min**: 看 `audits/iteration-1-changes.md`(v2 close-loop 实证)+ `cost/cost-report.md`

然后回到本文档,回答下方 open questions。

---

## 各 Phase 产出

### Phase 1 — Foundation
- **Product Owner**: PRD + 3 personas(陈翊安/苏念/阿K)+ case-study skeleton(Problem + Insight 1500 字)
- **Domain Researcher**: 10 维度 + 6 动机类型 + 5 跨维度组合(35K + 13K 字)
- **Data Engineer**: 24/25 国宝结构化(严守 CC-license)

### Phase 2 — Design
- **Visualization Designer**: 10 component spec (时空柱/古国地图/朝圣护照/形制谱系/纹饰演化/礼器归位/工艺长卷/铭文释读/稀有度光晕/铸主档案)+ gamification mechanics 系统 + 4 个 Researcher pushback
- **AI Engineer**: API contract (confidence_band 驱动 4 种 UX 状态) + JS mock(8 预设场景)+ 4-phase AI roadmap

### Phase 3 — 3 Builders 并行
| 版本 | persona | 杀手锏 | 自评 |
|---|---|---|---|
| **A 考据派** | 陈翊安 (北大考古博士) | artifact.html 一屏集成 6 维度形态 + BibTeX 导出 + 段位篆刻印章 | "学术期刊电子版" |
| **B 沉浸派** | 苏念 (内容运营) | purpose-scene 等距宗庙 + 22 位置 + 士→天子等级判定 + 国宝独白 | "App 不是图录,是可走进去的长卷" |
| **C 探索派** | 阿K (Z 世代) | me 页梗卡片 modal + Pokédex 风形制谱系 + anti-Skinner "不必每天打开" banner | "图鉴+段位,但不变赌场" |

### Phase 4 — Auditor Squad 6 视角

| Aspect | Winner | Loser | Key insight |
|---|---|---|---|
| UX | **C** | B (5 屏找不到 collection) | Day-1 / 0-state 设计 3 版都缺 |
| Aesthetic | **A** | (B 上限最高/C 视觉冒险最少) | 图像供应链是 P0 root cause |
| Content | **A** | C (meme 压扁了内容) | 缺断代依据/同墓器物群/集成号 |
| Motivation | **A** | C (3 个 "差 N 件解锁" 自我违反) | A 的 "待补建议" 是唯一该 verbatim 保留的 pattern |
| PM | hire signal 7.0/10 | — | audit-as-trigger 需 close-loop 证据 |
| Comparative | **A 7.8 > C 6.8 > B 6.2** | — | 3 demos as a set 才是真 portfolio asset |

### Phase 5 — v2 close-loop iteration ✅

总时 ~120 min,在 2h 预算内,by 单一 builder-iterator agent。详见 `audits/iteration-1-changes.md`。

**4/4 P0 content fixes shipped**:
1. B 利簋独白病句 ("我被一位叫'利'的将领的器物" → "我属于一位叫'利'的将领")
2. C 尊盘 taxonomy (top-level vessel type → composite subtype under 尊)
3. 后母戊鼎 patterns 分层 (饕餮 main / 夔龙·虎噬人头 secondary / 云雷 local)
4. 三星堆纵目面具 错位 image URL → null + TODO

**12 silhouette SVGs** (超出 8 个目标):
fangding · yuanding · xiao_zun · fang_zun · sanxingdui_zongmu · sanxingdui_dali_ren · yuewang_jian · changxin_gongdeng · gui · bianzhong · pan · fanghu
— 单色青铜色 `#a4732c`,viewBox 0 0 100,可识别造型,带来源 comment

**Wiring**:
- C `state.js`: SILHOUETTE_BY_ID 映射 25 件 + per-rarity tinting,28 page call-sites 接入
- B `data.js` + `ui.js`: silhouette 下垫层在 wiki img 之下,on-error 自动 fallback
- A: 故意跳过(保留考据派 "待补" 空格美学)

**Playwright 验证(关键!)**:
- B `me.html`:12 个收藏 placeholder 解析为 12 unique silhouette,**回应 Aesthetic Auditor 的"7 identical 椭圆 blob" P0**
- C `catalog.html`:22 placeholder 卡 fangding path inline 渲染
- 零 page errors

**为什么这个 iteration 重要**:
> Audit (5/5 Auditor 独立 flag 图像供应链) → Comparative merged-spec (推荐 silhouette) → v2 iterator (实现) → diff verifiable
> **"audit-as-iteration-trigger" 不再是 PPT claim,是 demonstrated fact**

这是 PM Auditor 强调的 portfolio-killer fix。✓

---

## Top 5 critical findings(跨 audit 共识)

1. ★ **图像供应链(5/5 Auditor 独立 flag)** — 强信号,v2 已经开始解决
2. **0-state 设计缺失** — 3 demo 都假设了 7-9 件预收藏 + 硬编码 persona 名
3. **维度联动 payoff 没在任何 demo 可视化** — 单一收藏同时点亮 time-pillar + map + tree 是 next iteration 最大缺失 hook
4. **C 的 anti-Skinner 自我违反** — me.html 3 个 "差 N 件解锁 X" 同屏,反 disclaimer 反而暴露了 designer-knew-but-shipped
5. **缺失硬核学术维度** — 断代依据 / 同墓器物群 / 集成号 — 从科普 App → 学术工具的关键

---

## 待你决策的 open questions

### Q1: v2 persona strategy(最大决策)
3 选 1:
- (a) 选 **A persona** 单一打磨到 portfolio-grade
- (b) 建 **unified demo with persona-switcher** (best of A/B/C in one product)
- (c) 保留 **3 demos** + converge to shared design system

Comparative Auditor 推荐: **短期 (a),长期 (b)**。但你的偏好?

### Q2: 是否引入新学术维度
Content Auditor 强烈推荐 v2 加入 **断代依据 / 同墓器物群 / 集成号** —— 从科普到学术工具的关键。

但这意味着 Data Engineer 需要 re-ingest(集成号要查 殷周金文集成 学术资源)。是否要在 D2 触发?

### Q3: silhouette 套规模
v2 iterator 在做 8 个高优先级 silhouette。是否需要补完整 ~20 个?(每个 ~30 min 投入)

### Q4: case-study §3-§5
PM Auditor 强调:case-study.md 当前只有 §1-§2 (Problem + Insight)。§3 Approach / §4 Outcomes / §5 Reflection 必须补,否则 portfolio 是 IOU 状态。建议下次跑 PM agent 来填。

### Q5: 图像供应链长期解
是否在 D2 主动联系一家中国博物馆(三星堆已有数字化基础)开始 license 合作谈判?这是 v3 之后的事但 D2 启动 lead time 长。

---

## Artifact 导航

| 类别 | 路径 |
|---|---|
| **Agent team 设计文档**(作品集核心) | `docs/agent-team-design.md` |
| **案例研究**(portfolio narrative) | `docs/case-study.md` |
| **PRD** | `docs/prd-demo-night.md` |
| **3 personas** | `docs/personas-for-builders.md` |
| **10 维度分析** | `docs/dimensional-map.md` |
| **6 动机系统** | `docs/motivation-hooks.md` |
| **10 component specs** | `docs/component-specs/*.md` |
| **gamification 系统** | `docs/gamification-mechanics.md` |
| **AI roadmap** | `docs/ai-roadmap.md` |
| **3 demos** | `demos/v1-{A,B,C}-*/index.html` |
| **6 audits + merged-spec** | `audits/*.md` |
| **v2 iteration evidence** | `audits/iteration-1-changes.md` |
| **决策日志** | `state/decision-log.md` |
| **事件日志** | `state/state.md` |
| **token 使用** | `cost/cost-report.md` |
| **8 agent 定义** | `.claude/agents/*.md` |

---

## Orchestrator 自主决策回顾

夜跑期间 Orchestrator 做了 N 次自主决策(详见 `state/decision-log.md`)。重大决策:

1. **D0-006**: Phase 2 期间并行 launch AI Engineer(原 plan 未明确 phase,Orchestrator 决定与 Designer 并行,节省 ~20 min)
2. **D0-007**: Phase 3 不用 worktree isolation(3 Builder 共享 worktree 写不同子目录,简化文件合并,实际无冲突)
3. **D0-008**: Trigger v2 close-loop iteration(综合 Comparative Auditor + PM Auditor 推荐,这是 portfolio-killer)
4. **D0-009**: v2 scope = silhouette SVG 8 个 + 4 content fixes(取 Comparative 主推荐 + fallback 合并)

如有不同意,起床后可 rollback 任何决策。

---

## 下一步建议(D1+)

短期(本周):
- 用户 review + 决策 Q1-Q5
- D2: 基于 Q1 选择,定 v2 完整 scope;PM agent 补 case-study §3-§5
- D2-D3: v2 iteration build(若 Q1=a 则深耕 A,若 Q1=b 则做 unified)
- D5 (C3): AI 服务真 CLIP PoC 上线

中期(D7-D14):
- AI Phase 1 (CLIP retrieval) → Phase 2 (DINOv2 ensemble + OCR)
- 数据扩展到 200-500 件
- 与三星堆/数字故宫等做 license 探索沟通
- v2 demo 转 Taro 小程序

长期(D30+):
- LoRA fine-tune
- 真用户测试(开始邀请文博爱好者朋友试用)
- 案例研究完整版

---

夜跑完成。早安 ☕(等待 v2 iterator 完成后会再次更新本文档)
