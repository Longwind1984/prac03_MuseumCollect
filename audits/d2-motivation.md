# Audit: motivation — 2026-05-21 (Day 2 / v3)

## Pages reviewed
- `demos/v3-converged/me.html`
- `demos/v3-converged/time-pillar.html`
- `demos/v3-converged/pattern-tree.html`
- `demos/v3-converged/caster-profile.html`
- `demos/v3-converged/inscription-special-hezun.html`
- `demos/v3-converged/js/cross-dim-wiring.js`
- Reference: `audits/d1-motivation.md`

---

## Reviewer stance

2-week veteran. 35/277 collected. I have opened this app enough to stop being impressed by the entry animation. I now ask: is there a reason to open this on Tuesday night after a long day?

---

## Snap impressions by surface

**me.html**
Significantly cleaner than d1's best (v1-A). The header is honest: "您已收藏 35 件 / 277 件 · 主要关注商代与西周 · 偏好方鼎类" — this is *behavior-derived identity*, not aspirational labeling. The three progress bars (35/277 / 85字 / 9/195) are real numbers, not engineered near-100% vanity metrics. The "真实进度（无虚假完成率）" label is confident and the bar widths (12.6%, 57%, 4.6%) are genuinely uninflated. The 时代密度 mini-pillar is the strongest "I want to hover this" element on the page. The inscription rank panel has exactly one "almost there" callout: "您当前可探索的方向：→ 大盂鼎铭文 (含 78 个您尚未识的字)". That is spec-compliant, action-shaped, post-action triggered. The titles section correctly hides locked titles at lower opacity with factual unlock conditions — no red urgency, no countdown. The event-bus debug panel (black card with TEST buttons) is useful for demo evaluation but should not appear in user-facing builds.

**time-pillar.html**
The D3 SVG time pillar is the product's most confidence-inspiring component. True proportional heights mean 商 (554 years) is visibly much taller than 秦 (15 years) — that physical-length-as-time-thickness is exactly the "body can feel the depth" claim. Hover triggers a dynasty detail card with a progress bar + note + artifact list + historical events. The breathing animation on 0-collected dynasties (东汉) is well-executed. The linkage indicator text ("商 · 饕餮纹/夔龙纹高亮 · 地图切至殷墟") appears for 3.5 seconds after hover — this is the cross-dim wow moment. However: the indicator is a text panel *below* the main content, not a simultaneous visual change in other components. On this page alone, the three-component linkage is *announced* but not *shown*.

**pattern-tree.html**
The evolutionary tree is genuinely interesting — the parent-child lines from 饕餮→夔龙→窃曲→蟠螭 tell a real story of aesthetic evolution. The `era-focus` listener correctly maps dynasty hover to specific pattern node highlighting with a gold drop-shadow. The icon-grid below the tree is a good second surface — the 25 greyscale/colored slots create the right Pokédex-style Zeigarnik gap. Key gap: the tree's "identified/not-identified" distinction is currently binary (you've seen it or not). There is no ladder from "identified" to "expert" — no mechanism by which I become better at recognizing 夔龙 vs 饕餮 on an unseen piece.

**caster-profile.html**
The D3 force-directed graph is a real addition over v1-A's static ASCII. Node size ∝ artifact count, gold border ∝ collected — these are meaningful visual encodings. Clicking 妇好 gives a dark-themed hero + biography sections in 列传 style: "历史记载" / "考古发现" / "传世器物". The "传世器物 (您已收藏 1/5)" is clean and invites deeper collection. The 妇好 biography is substantively good —甲骨卜辞800条提及, 1976年殷墟M5妇好墓, 468件铜器 — this is expert-level content a PhD candidate wouldn't dismiss. Weak point: the 关系图谱 currently shows 10 nodes for the full dynasty span (商 through 春秋). The cross-dynasty nodes (曾侯乙, 越王勾践) don't have connecting edges in the LINKS array — they float isolated. This undermines the "graph = connection" promise.

**inscription-special-hezun.html**
This is v3's best new surface, full stop. The dark bronze aesthetic is earned by content, not by decoration. The 122-character scroll-reveal is the right mechanic: each click is a micro-action that advances comprehension, not just a count. The key-char highlighting (中, 或, 宅, 兹, 王, 命) makes the reader's eye stop at meaning. The segmented full-text with modern translation + scholarly note is excellent depth-layering. The payoff at 60%+ reading is generous: "您刚读完了西周王直接表达王权的一段册命" + title unlock "宅兹中国见证者". One significant mechanical problem: the payoff fires when readCount >= 73 characters — but **the click mechanic is individual character by character** with no "read all" button. To reach 60% I need 73 individual clicks. That is cognitively demanding. Most users will abandon after 15-20 clicks. The design intends 12-minute immersion but the interaction model creates fatigue before the payoff.

---

## Six-type hook quality matrix (v3, per dimension)

| Hook type | time-pillar | pattern-tree | caster-profile | inscription (何尊) | me.html overall |
|-----------|-------------|--------------|----------------|-------------------|-----------------|
| **Completion** | 4 — density fill is honest + breathing empties | 3 — identified/unidentified binary, no depth | 3 — collected/uncollected per caster, no synthesis | 4 — 0/122 progress strip is genuine | 4 — 3 progress bars, all real |
| **Connection** | 4 — era-focus bus triggers pattern+geo highlights | 3 — parent-child evolution lines are the product's best content graph | 2 — graph exists but cross-dynasty nodes are isolated | 3 — key chars link to caster-focus, but only 8 chars flagged | 3 — mini-pillar emits era-focus, but linkages don't reflect on this page |
| **Rarity** | 2 — no rarity layer on the pillar | 2 — no rarity distinction between common and rare patterns | 3 — 国宝 flag on artifacts, but no visual glow | 5 — "中国二字最早实物出处" IS the rarity hook | 3 — 国宝 badge on items, honest 9/195 |
| **Story** | 3 — dynasty notes are substantive (554年商朝, 牧野之战 etc.) | 4 — 神权→礼制→世俗 evolution narrative is told through the tree structure | 5 — 列传体 is the strongest identity-forming narrative across all surfaces | 5 — chronological discovery story (1963出土, 1975释读唐兰) is genuine wow | 2 — no narrative; me.html is diagnostic not storytelling |
| **Identity** | 3 — no identity label derived from pillar interaction | 4 — "已识别/未识别" distinction; calling pattern derived titles possible | 4 — "妇好系列收藏家" implied by the 1/5 progress; title derived visibly | 5 — "宅兹中国见证者" is the most defensible identity hook in the product | 4 — titles are data-derived and factual |
| **Spatial/Temporal** | 5 — proportional height IS temporal completion viscerally | 3 — era bands on the tree background are low-contrast (4% opacity) | 3 — dynasty filter on caster list, but no map or timeline integration | 2 — no spatial hook (the discovery location 宝鸡 is mentioned but not linked to geo) | 3 — mini-pillar is spatial/temporal, but geo-system minimap is absent |

**Summary**: time-pillar and inscription-special are the two surfaces where the d1 "A wins connection, B wins story" gap is genuinely closed. caster-profile is unexpectedly strong on story. pattern-tree has the right structure but the content depth ladder is missing.

---

## Critical observations

### 1. The cross-dim linkage is WIRED but NOT CO-PRESENT

The event bus works. Hovering the time pillar emits `era-focus`. The `cross-dim-wiring.js` correctly maps dynasty→patterns and calls `highlightPatterns()`. However, the three reacting components — geo-system, pattern-tree, and shape-pokedex — are on **different pages**. Within `time-pillar.html` itself, the "三联动" is represented by a text banner ("商 · 饕餮纹/夔龙纹高亮 · 地图切至殷墟") that disappears in 3.5 seconds. 

The design spec's claim that "用户第一次看到'我 hover 一下, 三个组件同时活了'" requires all three components to be visible on one screen. They are not. The wow moment is a text description of itself.

**This is P0.** The cross-dim linkage is the single most advertised v3 motivation feature. As shipped, it is a solo performance with an audience of zero co-present components.

### 2. 277 artifacts creates a counting problem, not an exploration problem

At 35/277 the progress bar shows 12.6%. As a 2-week veteran, I see 12.6% and think "I have years of grinding ahead of me." The spec's "今日推荐 / 研究路径 / 集锦" strategy — which would convert the 277 into meaningful 30-50 item sub-goals — is **completely absent from the demo**. 

`me.html` shows my 35 items in a flat grid. There is no "研究路径" suggestion. There is no "集锦订阅." There is no "You've seen 60% of 商代 pieces — here's one more to complete the core set." 

The 277 number is present, visible, and unmediated. At 35 collected, this reads as "you're just getting started" more than "you're building expertise."

### 3. The 何尊 payoff requires 73 individual clicks with no batch mechanism

The inscription-special-hezun.html payoff fires at 60% reading (≥73 clicks). Each character requires one click. There is no "reveal all" or "read sequentially" mode. In a real 12-minute reading session, a user might naturally read at scanning pace — they should not be penalized for not clicking each individual character. The mechanic currently teaches clicking, not reading.

A more defensible mechanic: reveal characters as the user scrolls (IntersectionObserver), with optional click-to-highlight. This preserves the "each character is a micro-attention" intention without requiring 73 individual actions to reach the payoff.

### 4. The titles system has an anti-Skinner violation that is subtle but real

`me.html` titles list shows:
- 5 unlocked titles (colored, checkmark)
- 3 locked titles (greyed, italic basis text)

The 3 locked titles are visible at all times with their unlock conditions:
- "西周礼制研究者 — 西周收藏 8 件，含完整鼎簋组"
- "何尊见证者 — 完成何尊长卷释读"
- "曾侯乙乐工 — 收藏曾侯乙编钟全套"

Per v3 red line: "称号是隐线，不是显线 — 不做成就墙页面." But showing locked titles *with their unlock conditions* **is a soft成就墙** — I can now scan the list and choose my next farming target. "曾侯乙乐工" is at 2/X — I know what to do next.

The violation is subtle: the display is not loud or red, but the **information is complete enough to direct farming behavior**. The fix is to hide all locked titles by default, or replace locked titles with a vague "还有 N 个称号尚未解锁" without naming them.

### 5. The off-ramp is passive-good but not active-kind

The off-ramp in v1-A included "夏 / 商早期史料稀少非用户之过" — a proactive absolution of user guilt. v3's off-ramp for empty dynasties uses breathing animation on 东汉's bar, but there is no text that says "this era is naturally sparse in the museum canon — having nothing here is expected." The breathing animation can *read as pressure* to users who don't know that 东汉 is the terminal era of the bronze age. A user who has been mostly collecting 商 could feel their 东汉 empty bar as personal failure. The spec's "空白段不恶化" is honored (no red), but the positive absolution ("you're right to not have this yet") is missing.

### 6. The 形制 dimension is absent from all reviewed surfaces

The shape-pokedex (形制谱系树 / Pokédex) is one of the 7 core dimensions but does not appear in any of the main motivation surfaces I reviewed. `me.html` shows "偏好方鼎类" in the header description but links nowhere. The cross-dim `ERA_FORMS` mapping in `cross-dim-wiring.js` highlights `[data-form]` elements but no page in the v3 demo appears to use that attribute. The 形制×纹饰 combination B ("方尊 → 饕餮 65%/夔龙 40%") — which the spec calls the strongest connection hook — is unimplemented as a demo trigger. This means one of the seven core pillars is entirely absent from the motivation demo surfaces.

---

## Anti-Skinner v3 compliance

| Red line | Observed in v3 | Verdict |
|----------|----------------|---------|
| ❌ "差 N 件 解锁 X" red text | Not found | ✅ Fixed |
| ❌ "国宝率 100% (行业 4%)" vanity metric | Not found — replaced with "9/195" | ✅ Fixed |
| ❌ XP-shaped HUD | Not found | ✅ Fixed |
| ❌ Stacked "X件解锁 Y" panels (C v1) | Not found | ✅ Fixed |
| ❌ "龙纹光晕 30s 旋转" | Not found | ✅ Fixed |
| ❌ 首件国宝强制 3s 无关闭 | Not verified (scan.html not reviewed) | ? |
| Max 1 "almost there" per page | me.html: 1 instance (inscription callout) | ✅ Compliant |
| 称号是隐线 | Locked titles visible with unlock conditions | ⚠ Partial violation |
| 0 成就墙页面 | No dedicated achievements page | ✅ Compliant |
| Off-ramp: no guilt on return | No "欢迎回来，离开N天" | ✅ Compliant |

**Tally: 7 pass, 1 ⚠, 1 unverified. Significantly better than v1-C's 3 pass, 4 ⚠, 2 ❌.**

---

## The "2-week veteran opens this on Tuesday night" test

**Why would I open this today?**

With v3: probably the time-pillar. My 商晚期 bar has good density; I noticed in my last session that 西周中期 is empty. I want to understand what I'm missing there. I hover 西周中期, read the dynasty note ("275年西周，周礼制度的铜铸记录"), see the what I'm missing. This is a real session goal.

Or: I remember reading about 何尊 last session but didn't finish the 122-character scroll. I go back because "宅兹中国" is genuinely sticky. This is a substantive return hook.

**What is still missing from a 2-week-veteran perspective:**
- I have 35 items but no one has said "you should now branch from 商 into 西周" or suggested a specific next research thread. The "今日推荐" and "研究路径" features are designed for exactly this and are entirely absent.
- The cross-dim wow moment — the thing v3 explicitly prioritized as its main motivation upgrade — requires visiting two pages simultaneously, which I cannot do.

---

## Things missing that I expected

- A "today's suggestion" card on `me.html` or `index.html` — the doc spec says "首页推 3 件" but it's absent
- The 形制 谱系树 / Pokédex — one of 7 core dimensions is unrepresented in any reviewed motivation surface
- A "研究路径" prompt after 10+ pieces (I have 35, should have triggered)
- The geo-system mini-map on `me.html` shows sites as text rows — I expected to see an actual mini-map canvas
- Scroll-based or auto-advance reading in the 何尊 long-form — the click-per-character mechanic creates mechanical fatigue
- The D3 关系图谱 has 3 isolated nodes (曾侯乙, 越王勾践, 周宣王) with no edges to the main cluster — the graph looks sparse

---

## Things present that don't earn their place

- The **event-bus debug panel** on `me.html` (black card with TEST: 商/西周/战国 buttons) — this is a builder/developer tool embedded in the end-user profile page. It should not exist there.
- The `穿越模式 ●` toggle in the nav exists on every page and does toggle linkage, but most pages have nothing to react to when linkage fires (because the other components aren't co-present). The toggle creates a false promise.
- The `me.html` section title "金 铭文段位" has a stray "金" prefix that appears to be a formatting artifact rather than intentional design.

---

## Severity ranking

- **[P0 blocker]** Cross-dim three-component linkage is only a text announcement within each individual page — the "三联动 wow moment" requires three components co-present, which the current page-per-dimension architecture doesn't deliver. This is the v3's lead motivational claim and it does not deliver as described.

- **[P0 blocker]** 今日推荐 / 研究路径 / 集锦 — the three strategies for making 277 artifacts navigable for a 35-piece user — are entirely absent from all demo surfaces. The 277-piece pool currently reads as "too big to finish" not "perfectly sized for long-term expertise."

- **[P1 high]** 何尊 payoff requires 73 individual character clicks with no shortcut. Expected completion rate at this interaction cost is well below the 30% target. The mechanic teaches clicking, not reading.

- **[P1 high]** Locked titles visible with unlock conditions on `me.html` is a soft成就墙 that invites target-specific farming, partially undermining the anti-Skinner intent.

- **[P1 high]** 形制 dimension absent from all motivation surfaces — one of 7 core pillars is invisible to users exploring their identity via me.html or any dimension page.

- **[P2 nice-to-have]** Off-ramp absolution is passive (no red bars) but not active ("this era is canonically sparse — your empty bar here is expected behavior"). 

- **[P2 nice-to-have]** D3 关系图谱 has isolated nodes that float without edges, undermining the "graph = connection" payoff.

- **[P2 nice-to-have]** Developer debug panel embedded in user-facing `me.html`.

---

## Verdict vs. d1

v3 is a genuine upgrade over the best of v1 (v1-A):

**Confirmed fixed (P0s from d1):**
- C's stacked "差 N 件解锁" panels — gone
- vanity "国宝率 100% (行业 4%)" metric — replaced with clean 9/195
- 称号系统label-on-data problem — substantially improved (titles now basis-derived with factual conditions)
- Dimension-specific depth (dynasty notes, pattern evolution, caster biography) — significantly richer

**Still broken:**
- Cross-dim wow moment: the product's biggest v3 bet exists as a text announcement, not a visual experience
- 277-piece density unmediated by any curation strategy
- 何尊 long-form is the right idea with the wrong interaction model

**New in v3, genuine wins:**
- 何尊 inscription-special page is the best single motivation surface the product has shipped — the "中国" 二字 discovery story is compelling enough to bring back a 2-week veteran independently of all other mechanics
- D3 caster graph + 列传体 biography is the product's strongest "I'm becoming an expert" surface
- time-pillar density fill with breathing empties and true proportional heights is excellent

The product has the right skeleton. The central bet — cross-dim simultaneous linkage — needs architectural resolution before the motivation story closes.
