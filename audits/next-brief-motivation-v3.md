# Next Iteration Brief: motivation — 2026-05-21 (v3 → v4)

## What to keep

- The time-pillar with true proportional dynasty heights and breathing empties — ship this as-is
- The `me.html` honest progress bars (12.6% / 57% / 4.6%) — exact display pattern is spec-correct, keep it
- The `inscription-special-hezun.html` dark-bronze aesthetic and segmented full-text with modern translation — strongest single-page motivation surface in the product
- The caster-profile 列传体 biography format (历史记载 / 考古发现 / 传世器物)
- The `cross-dim-wiring.js` dynasty→pattern/form/geo mapping — correct, tested, reuse it
- The "almost there" callout on me.html right column: "您当前可探索的方向 → 大盂鼎铭文 (含 78 个您尚未识的字)" — this is the exact spec-correct language, preserve it as a template

---

## What to change

1. **Remove the developer debug panel from `me.html`** — the black card with TEST: 商/西周/战国 buttons must not appear in user builds. Move to a separate `/debug.html` or behind a `?debug=1` query param.

2. **Change the 何尊 payoff mechanic from click-per-character to scroll-reveal** — implement `IntersectionObserver` so characters reveal as the user scrolls down. Keep the click-to-highlight-key-chars option, but don't require 73 clicks to reach the payoff. Target: payoff fires after natural reading scroll, not after 73 interactions.

3. **Hide locked titles in `me.html` by default** — replace the 3 visible locked titles with a collapsed "还有 N 个称号尚待解锁" link that expands on click. Do not name the locked titles or their conditions in the default view. This removes the soft成就墙 farming hook while keeping the discovery delight when a title unlocks.

4. **Add active absolution text to empty dynasty breathing segments in time-pillar** — when hovering a 0-collected dynasty that is the final era (东汉) or a historically sparse era (夏), the side card note should include one sentence like: "青铜礼器史在汉代终结——此时代收藏稀少是合理的，并非遗漏。" This converts a potential guilt signal into a knowledge payload.

---

## What to add

1. **A co-present cross-dim panel on one demonstration page** — the v3 bet is that hovering the time pillar makes three components react simultaneously. This requires at least one page where pattern-tree icons AND a mini geo-map AND the time pillar are all visible at once. Option A: a dedicated "维度全景" dashboard page with three mini-components stacked. Option B: a side-by-side panel on time-pillar.html that embeds a mini pattern-icon strip and a 150×150 geo mini-map. The mechanic is already wired; what's missing is co-presence.

2. **"研究路径" block on `me.html` for users with ≥10 collected artifacts** — a single card between the time-pillar mini and the collection list. Contents: "您已收藏 35 件，主要集中在商代。以下是当前可选的探索方向：" followed by 2-3 named paths (e.g. "妇好墓 5 件鼎组 — 同墓器物群" / "商周鼎制度演变 — 跨时代纵向" / "三星堆独立文明 — 非中原系"). Each path is a link to a filtered catalog view or a pre-defined series page. This is the primary missing mechanism for making 277 feel navigable at 35/277.

3. **形制 mini-view on `me.html`** — a 3×3 grid of the user's most-collected form subtypes (e.g. 方鼎 ████ 4件 / 圆鼎 ██ 2件 / 尊 ██ 2件) with greyed silhouettes for unrepresented subtypes the user is adjacent to. This makes the 7th core dimension visible in the identity-formation surface and closes the gap where 形制 is completely absent from motivation pages.

4. **"段位进步叙述" on me.html instead of just the progress bar** — below the 85/150 字 bar, add one sentence that is action-shaped, not count-shaped: "您上次读了何尊，认识了'宅兹中国'的来源。大盂鼎铭文包含更早期的王命格式——两件连读可看到周礼册命语言的演变。" This tells me what I know and what is adjacent — not what I am about to unlock.

---

## Specific actionable instructions for the next Builder/Designer

1. Create a `dashboard.html` page (or extend `me.html` with a collapsible "维度全景" section) that places the time-pillar mini-bar, a 100px-tall pattern-icon strip sorted by era, and a 180×180 geo mini-map side by side. Wire the three to the existing `era-focus` event bus. When user hovers a mini-bar dynasty segment, all three react simultaneously. This is the cross-dim wow moment. It does not need to be elaborate — co-presence matters more than polish.

2. In `inscription-special-hezun.html`, replace the `revealChar()` click-only mechanic with an `IntersectionObserver` on each `.char-reveal` element: as the element enters the viewport during scroll, add `.revealed` with a 50ms delay. Keep the click handler for users who want to advance faster. The `payoff` element should trigger on scroll-intersection too (when `#payoff` enters viewport), not on a count threshold. The counting is still a good secondary signal but should not be the primary gating mechanism.

3. Add a `研究路径` card component to `me.html` — a single `<div class="dim-card">` with id `research-path-card` that renders when `MOCK_COLLECTED.length >= 10`. Populate it with 3 hardcoded path objects for the demo (the real implementation would be algorithm-derived). Each path: `{title, description, link, artifact_count, dynasty}`. Display as a list with links.

4. On `me.html` titles list, change the render logic: only render `unlocked:true` titles by default. Add a `<button>` at the bottom: "还有 ${lockedCount} 个称号尚待解锁" that on click appends the locked titles at lower opacity. Remove unlock conditions from the collapsed state.

5. Fix the D3 关系图谱 in `caster-profile.html` — add edges connecting 曾侯乙, 越王勾践, and 周宣王 to the broader network via contextual links (曾国-楚关系 / 勾践-吴关系 / 宣王-西周晚期节点). Even one edge per isolated node prevents the "floating island" visual.

---

## What success looks like next round

- A user on `me.html` at 35/277 can see one "研究路径" suggestion and understand where their 商代 depth should go next — without me.html needing to say "再X件解锁Y"
- The cross-dim linkage produces at least one moment where the user sees pattern-icons AND a mini geo-map simultaneously change when they hover a dynasty bar — this is the v3 motivation claim and it needs to be visible, not described
- The 何尊 inscription page reaches 30%+ completion rate in user testing because the scroll mechanic removes the 73-click barrier
- `me.html` can be shown to a user who has been away for 2 weeks and they immediately understand their collection profile and have at least one obvious next step — without needing to count bars or read completion percentages

---

## Open questions for the user

1. Should the cross-dim dashboard be a dedicated page (e.g. `dimension-overview.html` or `explore.html`) or an in-page collapsible section at the top of `me.html`? The design spec doesn't specify, and the choice affects navigation architecture.

2. The 研究路径 feature is described in the spec but no data model for "paths" exists yet. Should paths be: (a) editorial/curated by the team, (b) algorithm-derived from collection graph, or (c) fixed per-series (妇好墓系列 / 三星堆 / 曾侯乙 are permanent, user subscribes)? The demo can stub any of these but the actual product needs a decision.

3. The 何尊 inscription scroll experience is the product's most identity-forming moment. Should this be gated behind "first collect 何尊" (requires the user to first see it in catalog → collect → then unlock the long-form) or available freely from the inscription dimension page? Current implementation has it directly accessible via navigation. Gating it behind collection creates a stronger discovery moment but risks users never finding it.
