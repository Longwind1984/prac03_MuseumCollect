# Project State (Event Log)

> Append-only. Orchestrator owns this file.
> Format: `[ISO timestamp] [event type] [agent] [content]`

---

## Executive Summary (2026-06-05 · for cold readers)

**5 sprints, 17 天 elapsed, 1 个项目主理人 + ~32 subagent invocations**:

| Sprint | 日期 | 核心交付 | 关键 emergent |
|---|---|---|---|
| **v1** (D0) | 2026-05-20 night | 3 differentiated demo (考据/沉浸/探索 personas) + 6 audit + 1 close-loop iteration | 5/5 auditor 独立收敛到图像供应链 → 12 silhouette SVG ship |
| **v3** (D1) | 2026-05-21 night | 7+1 维度收敛 + 1 converged demo (12 页 + event bus) + 277 件 11 字段 + 25 pattern SVG | 何尊"中国"二字长卷 → Aesthetic 评设计峰值;BUG-001 silent fallback 暴露 audit-as-read 局限 |
| **v4.5** | 2026-05-22 | Runtime Auditor 加入(第 7 视角)+ 8-item mandatory checklist + Playwright/axe-core 接入 + BUG-002/003/004 fix | "audit squad audited itself" — case-study §5.7 二阶闭环成立 |
| **v4.6** | 2026-05-22 | 真实 GeoJSON (d3.geoConicEqualArea) + mobile retrofit (12 页 375px true mobile) + 28/28 Playwright green | "defer 是 PM 工具箱里最危险的动词" — §5.8 reframing |
| **v5** | 2026-05-22→ | Tailwind CDN removal (13 页) + a11y contrast + data-loader 并行化 + GeoJSON 项目 docs reconciliation | 性能 + 实诚 docs |

**量化产出**: ~32 subagent invocations / ~4.5M tokens / 估 $40-50 USD / 总 wall-clock 横跨多 night-run。277/300 国宝(92%) · 11 audit reports · 2 闭环 iteration · **2 轮 portfolio cold-audit(coverage + credibility)** · 28/28 Playwright tests green · case-study v0.9 ~10600 汉字 7 节 · 6 商业 PM 文档(含 assumptions-register)· 12 silhouette SVG + 25 pattern SVG + 7 GeoJSON。

**如何读懂这个项目的 narrative**:本文件是 append-only event-sourced log,适合追溯**任何决策的因果链**(grep 任意 ID 即可)。但读 narrative 请看 `docs/case-study.md`(v0.9,§0-§7 完整,§7 是 round-2 双标修复)+ `docs/assumptions-register.md`(每个数字 [M]/[B]/[A] 打标)+ `morning-report.md`(D0 5 分钟 TL;DR)。读决策因果链请看 `state/decision-log.md`。

---

## Status

- **Current Phase**: setup (pre-night-run)
- **Active Agents**: none
- **Next Scheduled**: night-run d0 (awaiting "启动" trigger)
- **Latest Checkpoint**: C0 — pre-launch

## Constants

- Project root: `/home/user/prac03_MuseumCollect`
- Branch: `claude/museum-photo-sharing-8qJiz`
- Vertical: 青铜器 (single)
- Demo count tonight: 3 (differentiated personas: 考据派 / 沉浸派 / 探索派)
- Tech: HTML + Tailwind CDN + vanilla JS + D3.js
- Autonomy: full self-decision + decision-log

## Event Log

[setup] orchestrator-template-created
[setup] night-plan-d0.md written
[setup] 8 agent definitions to be written
[setup] awaiting user "启动" trigger

---

## Night Run D0 Events

[2026-05-20 H0] [orchestrator] night-run-started; reading night-plan-d0.md
[2026-05-20 H0] [orchestrator] Phase 1 launching: domain-researcher + product-owner + data-engineer (parallel, background)
[2026-05-20 H1] [product-owner] DONE — prd-demo-night.md + personas-for-builders.md (+ case-study.md skeleton)
[2026-05-20 H1] [domain-researcher] DONE — dimensional-map.md (10 dimensions) + motivation-hooks.md (6 hook types + 5 cross-dim combos)
[2026-05-20 H1] [data-engineer] DONE — bronze-treasures-v1.json (24/25 fully filled) + licensing-log.md

[2026-05-20 H2] [orchestrator] Phase 1 complete (3/3 agents done). Launching Phase 2: visualization-designer (background)
[2026-05-20 H2.1] [orchestrator] also launching ai-engineer in parallel (independent of designer, light scope)
[2026-05-20 H3] [ai-engineer] DONE — api-contract + mock-server-readme + ai-roadmap + mock-recognition.js
[2026-05-20 H3] [visualization-designer] DONE — 10 component specs + gamification-mechanics.md
[2026-05-20 H3] [orchestrator] Phase 2 complete (designer + ai-engineer). Launching Phase 3: 3 Builders parallel (A/B/C personas)
[2026-05-20 H3.5] [orchestrator] Phase 3 launched: 3 Builders parallel
  - builder-A (考据派): demos/v1-A-textual-research/
  - builder-B (沉浸派): demos/v1-B-immersive/
  - builder-C (探索派): demos/v1-C-explorer/
[2026-05-20 H6] [builder-C] DONE — demos/v1-C-explorer/ (8 pages, 7 components: rarity-halo / time-pillar / ancient-map / form-genealogy / inscription-reader / pilgrimage-passport / purpose-scene[light])
[2026-05-20 H6] [builder-A] DONE — demos/v1-A-textual-research/ (8 pages, 6 components: time-pillar / ancient-map / pattern-tree[+rubbing loupe] / form-genealogy[+compare wall] / inscription-reader[段位制+三栏切换] / rarity-halo[克制无动效] + pilgrimage-passport placeholder)
[2026-05-20 H6] [builder-B] DONE — demos/v1-B-immersive/ (8 pages, 7 components: 古国地图穿越切换 / 礼器归位场景 / 工艺长卷 / 朝圣护照流散篇 / 时空柱诗意时间 / 稀有度光晕 / 国宝独白 [inscription-reader 沉浸变体])

[2026-05-20 H6] [builder-B] DONE — demos/v1-B-immersive/ (8 pages, 7 components: ancient-map[era switching] / purpose-scene[杀手锏 22 positions, 等级判定] / craft-scroll / pilgrimage-passport / time-pillar / rarity-halo / 国宝独白). Playwright 8/8 pages 0 JS errors.

[2026-05-20 H6.5] [orchestrator] Phase 3 complete (3/3 Builders). Launching Phase 4: 5 Auditor squad parallel (UX/Aesthetic/Content/Motivation/PM) + Comparative after.
[2026-05-20 H6.5] [orchestrator] 5 Auditors launched in parallel (UX/Aesthetic/Content/Motivation/PM). Comparative will spawn after they complete.
[2026-05-20 H7] [auditor-motivation] DONE — d1-motivation.md + next-brief-motivation.md
[2026-05-20 H7] [auditor-ux] DONE — d1-ux.md + next-brief-ux.md
[2026-05-20 H7] [auditor-pm] DONE — d1-pm.md + next-brief-pm.md
[2026-05-20 H7] [auditor-content] DONE — d1-content.md + next-brief-content.md
[2026-05-20 H7] [auditor-aesthetic] DONE — d1-aesthetic.md + next-brief-aesthetic.md
[2026-05-20 H7] [orchestrator] Comparative Auditor launched (synthesize 5 audits + merged-spec for v2). Decide on close-loop iteration after notification.
[2026-05-20 H7.5] [auditor-comparative] DONE — d1-comparative.md + merged-spec.md

[2026-05-20 H7.5] [orchestrator] DECISION: triggering v2 close-loop iteration per Comparative Auditor + PM Auditor recommendation. Scope: 4 P0 content fixes + 6-8 high-impact silhouette SVG + wire into B/C demos. Single builder-iterator agent.

[2026-05-20 H10] [builder-iterator-v2] DONE — iteration-1-changes.md (12 SVG generated, 5 content fixes [4 P0 + 1 related-B-image], 2 demos wired [C state.js + B data/ui/css]). v1-C catalog now shows 12 differentiated器型 silhouettes (was 7 identical椭圆 blob); v1-B image fallback uses silhouette (was gradient方块). Playwright verified zero new pageerror; 25/25 B me.html placeholders have correct silhouette; 22/22 C catalog cards render. ~120 min total.

[2026-05-20 H10] [orchestrator] NIGHT RUN COMPLETE
  - All 5 phases done
  - 15 subagent invocations, ~2.4M tokens
  - Morning report finalized at /home/user/prac03_MuseumCollect/morning-report.md
  - Awaiting user wake-up; container will remain idle until next user input

## D1 Planning (post-user-feedback)

[2026-05-21 D1-plan] [orchestrator] User feedback received: knowledge base too thin, visuals too crude, PM dimensions need re-examination
[2026-05-21 D1-plan] [orchestrator] PM reflection complete. 7+1 first-class dimensions defined (形制/时代/地理/纹饰/铭文/用途/铸主 + 稀有度全局层)
[2026-05-21 D1-plan] [orchestrator] User confirmed 4 decisions via AskUserQuestion:
  - 7+1 dimensions
  - 300 artifacts full-depth
  - converge to 1 polished demo
  - v3 night run one-shot
[2026-05-21 D1-plan] [orchestrator] night-plan-d1.md committed. Awaiting "启动" trigger to launch.

## Night Run D1 (v3) Events

[2026-05-21 H0] [orchestrator] v3 night-run-started
[2026-05-21 H0] [orchestrator] Phase A launching: domain-researcher v3 + 5 data-engineer parallel
  - DE-1: 商代 (5 v1 upgrade + 55 new)
  - DE-2: 西周 (7 v1 upgrade + 55 new)
  - DE-3: 东周 春秋战国 (6 v1 upgrade + 55 new)
  - DE-4: 秦汉 + 三星堆 (7 v1 upgrade + 55 new)
  - DE-5: 边远文化 + 海外馆藏 (55 new)
  - Total: 25 v1 upgrade + 275 new = 300 件

[2026-05-21 H1] [domain-researcher-v3] DONE — dimensional-map-v3.md + motivation-hooks-v3.md + data-schema-v3.md
[2026-05-21 H1.5] [orchestrator] Phase B launched (4 agents parallel, joining 5 DE still running):
  - visualization-designer-v3: 7 component-specs-v3/*.md
  - builder-geo-b1: assets/geo/*.geojson + reusable module
  - builder-patterns-b2: 25 pattern SVG icons + index.json
  - builder-timepillar-b3: time-pillar + event-bus + dynasties.json
Total active background agents: 9 (5 DE + 4 Phase B)

[2026-05-21 H2-3] [data-engineer-v3-shang] DONE — segment-1 (60/60 records; ~48 fully filled, 12 with TODO marks on sparse/uncertain fields; 5 v1 upgraded + 55 new; licensing-log-v3.md Shang section appended)
  - Output: data/curated/bronze-treasures-v3-segment-1-shang.json (60 records)
  - TODO fields: mostly size/excavation_year on 传世 pieces and 3 sparse 湖南博物院 artifacts — not hallucinated, genuinely unknown
  - NOTE: linggui_gong supersedes v1 longxing_gong (same artifact, upgraded ID); siyangshou_bu kept from v1, duplicate removed from batch merge

[2026-05-21 H2-3] [data-engineer-v3-dongzhou] DONE — segment-3 (52/61 fully filled, 9 TODO: all excavation_year on 传世 pieces — not hallucinated, genuinely unknown)

[2026-05-21 H4] [builder-timepillar-b3] DONE — time-pillar v3 + event-bus + dynasties.json

[2026-05-21 H2-3] [data-engineer-v3-frontier] DONE — segment-5 (55/55, 12 TODO fields for sparse frontier data)

[2026-05-21 H4] [builder-geo-b1] DONE — geo-system v3 (terrain + 4 era overlays + sites + museums + reusable module)

[2026-05-21 H4] [builder-patterns-b2] DONE — 25 pattern SVG icons + index.json + gallery
  - 25 SVG files: /home/user/prac03_MuseumCollect/assets/patterns/*.svg
  - index.json: /home/user/prac03_MuseumCollect/assets/patterns/index.json
  - gallery: /home/user/prac03_MuseumCollect/demos/v3-shared/pattern-gallery/index.html

[2026-05-21 H2] [visualization-designer-v3] DONE — 7 v3 component specs + rarity-halo + gamification-v3
  - docs/component-specs-v3/shape-pokedex.md (Pokédex + 实景/线稿 toggle + 真比例尺寸条)
  - docs/component-specs-v3/time-pillar.md (renamed from 时空柱, primary era-focus EMITTER)
  - docs/component-specs-v3/geo-system.md (dual view + 真实 GeoJSON + 古国 overlay, primary era-focus LISTENER)
  - docs/component-specs-v3/pattern-tree.md (25 SVG icons + era-focus LISTENER + 拓片本)
  - docs/component-specs-v3/inscription-reader.md (★ 何尊长卷专题 + caster-focus EMITTER + v3 段位机制)
  - docs/component-specs-v3/purpose-scene.md (5 套场景 + 4 档等级判定 + form-select LISTENER)
  - docs/component-specs-v3/caster-profile.md (★ D3 force-directed graph + caster-focus LISTENER)
  - docs/component-specs-v3/rarity-halo.md (4 档 + 国宝特殊, v3 anti-Skinner 修正: 删 vanity, 加 [关闭])
  - docs/gamification-mechanics-v3.md (含 §4 事件总线协议 + Day1→Year1 300 件旅程)
  - 6 events defined: era-focus (★ primary) / form-select / pattern-focus / caster-focus / site-focus / position-need
[2026-05-21 H4] [orchestrator] DE-4 (秦汉+三星堆) hit 32K output max in first attempt. Retrying with mitigations: incremental file writes, scope reduced 55→45 new, final return strictly <200 words.

[2026-05-21 H2-3] [data-engineer-v3-xizhou] DONE — segment-2 (62/62 records, 59 key-fields fully filled, 3 TODO) | 7 upgraded + 55 new Western Zhou artifacts | output: data/curated/bronze-treasures-v3-segment-2-xizhou.json | licensing: appended to data/licensing-log-v3.md

[2026-05-21 H3] [data-engineer-DE4-RETRY] DONE — segment-4 秦汉+三星堆 | 39 records (32 new + 7 v1 upgrades via _upgrade records) | 0 TODO | Valid JSON | output: data/curated/bronze-treasures-v3-segment-4-qinhan-sanxingdui.json | licensing: appended to data/licensing-log-v3.md

[2026-05-21 H5] [orchestrator] Phase A complete (5/5 DE). Total 277 records (60+62+61+39+55).
[2026-05-21 H5] [orchestrator] Phase B complete (Designer + B1 Geo + B2 Patterns + B3 TimePillar).
[2026-05-21 H5] [orchestrator] Launching Phase C: Builder-Converger (single agent, integrates everything)
[2026-05-21 H7] [orchestrator] Phase C complete. v3-converged: 12 pages + 4 JS modules + 1 CSS. era-focus event present in 7 pages. 穿越模式 toggle on 11 nav pages. Honest trade-offs (B1 GeoJSON → D3 polygon due CORS, etc).
[2026-05-21 H7.5] [orchestrator] Launching Phase D: 5 Auditor squad parallel (UX/Aesthetic/Content/Motivation/PM), Comparative after.
[2026-05-21 H8] [auditor-ux-v3] DONE — audits/d2-ux.md + audits/next-brief-ux-v3.md; 3 P0: (1)跨页联动不可用=same-document CustomEvent无法跨tab (2)Day-0/0-state依然缺失-第3轮 (3)me.html调试面板对用户可见; v3 UX > v1-C (+30%); 已修复: 统一nav/搜索框/段位口径; verdict: 穿越模式wow点仅在同页面生效，核心叙事失实
[2026-05-21 H7.5] [auditor-content-v3] DONE (Orchestrator manual-saved audit files due to Auditor instruction misinterpretation)

[2026-05-21 H8.5] [auditor-comparative-v3] DONE — audits/d2-comparative.md + audits/merged-spec-v3.md
  - Cross-Auditor P0 convergence: 4/5 Auditors independently flagged cross-dim linkage as non-functional (same-document CustomEvent cannot cross pages)
  - v3 vs v1 composite delta: +0.7 (6.5→7.2/10); Aesthetic slight regression (-0.5) due to emoji icons + debug panel; all other aspects improved
  - Top v4 action: dashboard.html single-screen wow demo (3 components co-present) OR BroadcastChannel — this is the only unfulfilled v3 core claim
  - PM ceiling-block: case-study §3-§5 still TBD; hire signal stuck at 7.8/10; potential 9.0/10 if written
  - 3 content P0s: 大克鼎 period (西周晚→中), 唐兰 citation (1986→1976), FULL_TEXT truncation
  - v4 plan: 3 parallel tracks — Track A: Product Owner writes case-study §3-§5 (2-3h); Track B: Builder fixes content P0 + debug + emoji + Day-0 (1.5h); Track C: Builder builds dashboard.html wow page (2h)
  - Recommend: launch v4 close-loop tonight

[2026-05-22 H1] [product-owner-v4] DONE — case-study.md §3-§5 written (~6500 字 added; §3 ~2500 / §4 ~1800 / §5 ~2000). Cold-context Product Owner read 11 artifacts (state.md, agent-team-design.md, iteration-1-changes.md, dimensional-map-v3.md, motivation-hooks-v3.md, gamification-mechanics-v3.md, d1-pm.md, d2-pm.md, d1-comparative.md, d2-comparative.md, cost-report.md). Core thesis articulated: "AI PM 不是用 AI 写代码,是把 AI 的约束——bounded role/cold context/filesystem state——当作产品设计原则." Closed the v3 ceiling-block per Comparative Auditor d2 (case-study completeness 4/10 → expected 8/10 post-this-write).

[2026-05-22 H2.5] [builder-iterator-v4-track-b] DONE — 10 fixes shipped, 0 skipped. Fixed: da_ke_ding period 西周晚期→中期; 何尊 citation 1986→1976; FULL_TEXT padded to exactly 122 chars; 莲鹤方壶 失蜡法 qualifier removed; 史墙盘 "第一部史诗"→"最早金文史学文献"; 8 emoji nav icons replaced with inline SVGs; me.html debug panel hidden behind ?debug=1; 三星堆 silhouette mapping added to catalog.html+artifact.html; locked titles hidden (show unlocked only + count summary); Day-0 onboarding overlay added to index.html (localStorage mc_v3_visited + ?firstvisit=1).

[2026-05-22 H2.5] [builder-iterator-v4-track-c] DONE — dashboard.html shipped (3 components co-present, era-focus wired). Single-file at demos/v3-converged/dashboard.html: time-pillar (D3 inline, 240px left col, 8 dynasty bands with density fill + breathing animation) + geo mini-map (D3 inline SVG, china outline + rivers + era polygon overlays + site dots) + pattern-strip (25 icon nodes, dominant highlighted gold) + bottom era panel (artifact cards + rarity halos). All 3 components listen same era-focus event bus; hover/click 商 band → map swaps to shang polygons + 殷墟/三星堆 sites light up + 饕餮/夔龙 pattern icons glow gold + bottom panel shows 8 商代 artifact cards. Auto-focuses 商 on load for wow demo. index.html nav updated with ★ 三联动 gold link.

[2026-05-22 H4] [data-engineer-photo-fetcher] DONE — 144/277 photos fetched (direct_url), demo render patched
  - 144 Wikimedia Category URL records updated with direct_url (upload.wikimedia.org 1200px thumbs)
  - 95 non-Wikimedia records skipped (museum sites, no CC license available)
  - License dist: CC BY-SA 4.0 (74), CC BY-SA 3.0 (61), CC BY 2.0 (9)
  - local_path=null (upload.wikimedia.org blocked by server allowlist; direct_url loads in browser)
  - artifact.html: photo-first render, 实景 button default-active, switchView updated
  - catalog.html: data-loader.js added, getPhotoUrl() call, re-render on museum-data-ready
  - dashboard.html: data-loader.js added, artifact-card-mini photo-first
  - me.html: data-loader.js added, collection-item thumbnail photo-first
  - data-loader.js: getPhotoUrl(id, basePath) helper added to MuseumData API
  - Files: data/photo-fetch-report.md, data/licensing-log-v3.md (144 entries appended)

[2026-05-21 H5] [research-qa-audit-best-practices] DONE — wrote docs/qa-audit-best-practices-research.md (~4800 字). Inward eval: 8 specific gaps in auditor.md v1 system prompt (no stress-input, no runtime layer, no console-error check, no claim-vs-reality table, etc.). Root cause of BUG-001: 5 Auditors all read-and-look, none click-and-verify. Outward research (14 web searches): Playwright MCP is 2026 industry standard for vibe-coded app QA; Lost Pixel CLI = best open-source visual regression; LLM Vision (Claude 4.7 / Gemini 3.1) is complementary to pixel-diff not replacement. Recommended: (1) auditor.md v4.5 prompt patch with 8 mandatory items (stress 5 random IDs, claim-vs-reality table, console errors, mobile viewport, interaction-flow walk); (2) new 7th persona "Runtime Auditor" (Sonnet, Playwright MCP mandatory, JSON+md output); (3) optional 8th "Visual Diff Auditor" (Claude Vision + Lost Pixel anchor). Tier 1 tools to add this week: Playwright MCP / Lost Pixel / axe-core (4-8h setup). Closes BUG-001 process-improvement TODO.

[2026-05-22 H6] [auditor-rewriter] DONE — auditor.md v4.5 + auditor-runtime.md + 8-item mandatory checklist

[2026-05-22 H7] [tools-integrator] DONE — qa/ scaffold (Playwright 1.56 + axe-core 4.11 + lost-pixel 3.22), 6 specs / 16 cases written, 14 passed / 2 skipped (D3 CDN), visual baseline 12/12 via fallback (lost-pixel CLI's --headless=old broken with modern Chromium). BUG-001 confirmed fixed via 3 routing tests. Real findings: (P1) d3 jsdelivr CDN is SPOF — 5 pages render empty shell offline; (P2) catalog.html has 3 stale ids not in data; (P2) color-contrast WCAG fails on 92 nodes across 5 pages. Reports: audits/d3-runtime.md + audits/d3-runtime.json. ~90 min.

[2026-05-22 H8] [main-thread] DONE — v4.5 polish + v4.6 GeoJSON & mobile retrofit (8 commits)
  - `a1bda2b`: vendor d3.v7.9.0 to assets/vendor/ (274K) + rewire 6 v3 pages from jsdelivr/d3js.org → local. Fixed P1 SPOF.
  - `a1bda2b` (same): catalog.html stops hardcoding 33 mock items (3 invalid) → derives from window.MuseumData.artifacts (277) via buildCatalogItemsFromMuseumData() on museum-data-ready. data-loader.js MOCK_COLLECTED_IDS cleaned too. BUG-002/003/004 fixed (caster-profile zhoukangwang dangling LINK; dashboard click-lock .active class missing; dashboard scrollable-region-focusable a11y).
  - `01aaffb`: case-study v0.3 → v0.4 — added §5.7 "audit squad audited itself" (v4.5 二阶闭环 narrative). audits/d3-runtime.json is "last evidence piece" for §3-§5 thesis.
  - `499cb12`: dashboard real GeoJSON. _mapProjection: linear → d3.geoConicEqualArea(parallels=[25,47], rotate=[-105,0]). loadRealGeoData() fetches china-terrain + 4 ancient-states. 39 regions render with real geography (Shang 8 features incl 鬼方/羌方/古蜀/盘龙城).
  - `2f346b7`: geo-system real GeoJSON (matching dashboard pattern). 30 excavation sites + 24 museums real lon/lat. China terrain 197 points (was 24). DEFERRED-001 FULLY CLOSED.
  - `dec08f2`: mobile retrofit via converged.css @media (max-width: 768px). Root cause was top-nav 11 links overflowing → viewport scaled up to 855. Fixed with nav-links horizontal-scroll + html/body overflow-x:hidden + max-width:100vw guard. 12 pages now report 375px true mobile width.
  - `ebe4408`: 12-case mobile-viewport.spec.ts Playwright regression test.
  - `573afd4`: catalog 2-col 小红书 grid + [style*="grid-template-columns"]:not(...) override for inline grids across 13 pages.
  - `ab56205`: svg[width] max-width 100% scale-to-fit for SVG-heavy pages (time-pillar / caster-profile / pattern-tree / inscription-hezun).
  - `3cdc539`: case-study v0.5 — §5.8 "defer 是 PM 工具箱里最危险的动词" reflection on the user-prompted "立马开始" reversal.
  - Tests: 28/28 green (16 original + 12 mobile-viewport).
  - DEFERRED-001: FULLY CLOSED. DEFERRED-002: PARTIALLY CLOSED (pragmatic retrofit done; true mobile-first rebuild still v5).
  - Files: assets/vendor/d3.v7.min.js, audits/bug-log.md (updated), docs/case-study.md (v0.5), qa/tests/mobile-viewport.spec.ts, converged.css (+125 lines mobile block).

[2026-06-05 P1] [portfolio-cold-audit-round-1] DONE — coverage audit (PM artifact 存不存在). Cold agent 假装 senior PM 面试官扫前 5 节,verdict: "strong on process+AI eng, but commercial PM artifacts 0-2/3 across board." Ship 5 docs (north-star NSM tree / competitive-landscape 8 竞品 / one-pager 投资人格式 / product-policy-and-risks 8 risk / analytics-event-taxonomy 11 events) + case-study §6. Commits 05c25e8, 466c3e2.

[2026-06-06 P2] [portfolio-cold-audit-round-2] DONE — credibility audit (artifact 可不可信). Cold agent 假装已读完文档的面试官,抓到核心双标:"refused to fabricate 1 AI metric (§5.9), then fabricated 9 load-bearing business metrics with zero citations same week — honesty is selective performance not discipline." 指控成立。修复(非忏悔,是 diff):
  - NEW docs/assumptions-register.md: 24 个 load-bearing 数字打 [M](6)/[B](6)/[A](12) 标。铁律: [A] 不许裸奔成事实。
  - 去 web 抓真锚点: activation 30% → 真实中位25%/均值34%(Business of Apps/Plotline);CAC ¥12 → 全球 CPI iOS$3.6/Android$1.22;小红书 → MAU 3.5亿+广东省博物馆话题9134万(替换编造的"100M+/+47%");故宫"MAU~150k"承认是猜的并降级。
  - 修 6 处跨文档矛盾(register §4): C1 维度数 5→7+1(投资文档原在卖我最自豪砍掉的旧 schema 工艺!) / C2 WAC 月周算错 / C3 activation 既知又未知 / C4 两套成本模型 / C5 P@5 0.60vs0.55 / C6 pHash 当 CLIP 卖。
  - pHash 降级: 承认 0.333=6里命中2、三星堆0/2、自绘SVG、n=6 与批判的 CLIP n=25 同样弱。从 headline 拼图 → "几乎不构成 retrieval evidence 的 toy"。
  - case-study §7 (~2300字): 直面双标,真正 lesson = "我只有'在熟悉领域不造假'的习惯,纪律的考验在不擅长且没人会立刻 check 的地方"。
  - case-study v0.8 → v0.9 (~10600 汉字 7 节). index/README/state 同步.
