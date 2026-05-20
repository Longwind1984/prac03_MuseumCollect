# Next Iteration Brief: motivation — 2026-05-20

## What to keep

- **A's 待补建议 (`me.html` "待 补 · 研究断面建议")**. The strongest return-trip hook in any demo. Three specifically-named knowledge gaps with named candidate artifacts. Keep verbatim as v2's primary returning-user hook.
- **A's 段位制 framing** (围棋 lineage, 入门→大宗师). Identity scaffold that **derives from real activity** (字 累计). Keep the framing; tighten the underlying mechanic (see "What to change").
- **A's "夏 / 商早期史料稀少非用户之过" footnote** on `time-pillar.html`. Off-ramp empathy baked into the data display. **Generalize this pattern**: any empty/sparse area should explain *why* it's empty, not just stay grey.
- **B's 流散篇 / "本应在家" emotional frame** on `ancient-map.html`. The only place across all 3 demos where my heart moved. Carry forward as a core narrative module.
- **B's 礼器归位 / 太牢礼 22-position scene** (`purpose-scene.html`). The only place where filling slots teaches a real fact (列鼎制度). Best concrete instance of the team's "认知能力 = 奖励" thesis in the entire corpus. Keep the mechanic; expand to 燕飨/军礼/葬礼.
- **B's 国宝独白 audio placeholder** on `artifact.html`. Gives the artifact a voice, not a stat sheet. Keep — but make the voice **deepen** with collection (see "What to add").
- **A's 同型对照墙 with 4th-slot 朱砂虚线"待补"** on `artifact.html`. This is the cleanest visual implementation of "空白 > 填满" anywhere in the demos.
- **C's `scan.html` Day-1 multi-dimension reveal**. Three dimensions lighting up after a successful scan is a genuine cognitive aha. **Keep for first 3-5 scans only**; auto-dampen by 5th scan.
- **C's 梗卡片 generator template** — keep the *output format* (1 card, watermark, sharable) for the K-factor / 小红书 hook the persona document genuinely cares about. **Strip** the loud "国宝率 / 称号" emphasis from the card body.

## What to change

- **Strip C's "下一步可解锁" + "即将解锁" + "NEXT MILESTONE" stacking.** Limit the entire app to **1 (one) "almost there" callout per page**, and place it only where the user just took an action — never on first load of `me.html`. This is the team's own `gamification-mechanics.md §5.3` rule and C ships 3+ violations on one screen.
- **Replace C's "国宝率 100% (行业 4%)" prominent number with A's quieter "国宝率 X%" footnote framing.** When the catalog grows to 100+ items the 100% number will deflate to something like 18%, and the user will feel punished for breadth. The metric is more durable as a non-headline reading.
- **Rework C's 段位 to derive from demonstrated skill, not character count.** "47 字 → 三段还差 3 字" mechanic should require the user to **read** characters in context (a small "blind-id" interaction), not just hover-trigger them. Without this change, C's 段位 is grinding.
- **A's `me.html` "headline metrics row" of 5 numbers** should be reframed as "分布图" (a sparkline-style breakdown), not 5 standalone counts. Counts read as XP; distributions read as a research portrait.
- **B's "已得的称号" row should hard-cap at 3 titles displayed** (per `gamification-mechanics.md §6` — 头像角标 最多 3). Currently shows up to 8; this dilutes meaning to participation-badge level.
- **B's 妇好鸮尊 monologue on `me.html` should rotate / deepen** with the user's collection state. After 30 items, the artifact should say something different than on Day 1 — even if mock for now, **demonstrate the relationship deepening** in v2.
- **All three demos: kill any 100% bars on first-screen `me.html`**. A 100% bar on a meter that grows says "you maxed this", which encourages quitting. Replace with active phrasing ("您目前的研究在商代有深度").

## What to add

- **The killer missing motivation hook: long-inscription reading-as-story.** None of the 3 demos implement `motivation-hooks.md §1.8` "毛公鼎 499 字读完后整段故事豁然". This is **the most Skinner-immune, most defensible expert hook in the entire document and it doesn't exist in any demo**. v2 must ship one passage (毛公鼎 or 大盂鼎) as a readable story with progressive character-recognition, where finishing reveals a coherent paragraph the user just decoded.
- **"Your collection profile shifted" weekly diagnostic** (replaces nothing — adds new). Each week, surface a one-line observation: "本周您从 商代 转向了 西周; 7 件中 4 件含 长铭文; 建议补一件 西周 中期 食器以平衡". This is identity-formation through *narration of behavior*, not through label-stamping.
- **跨维度组合 unlock that actually fires.** Right now C has a static "二重文明见证者 · 已达成" callout. v2 should compute this in real time from collected_ids × dimensions, and **only** show the callout when newly triggered (not as a permanent badge on `me.html`).
- **朝代故事卷 unlock per `motivation-hooks.md §1.1`**. Clicking a 朝代 segment on the time-pillar should unlock a short "时代故事卷" — 5-8 of that period's most important artifacts threaded into a narrative. Currently time-pillar segments only show a count + a list.
- **拓片家族 cross-artifact view**. A has 拓片放大镜 per-artifact; v2 needs a "您已收集 6 张含 夔龙纹 的 拓片 — 形成一个家族" cross-cut. This serves the 纹饰 collector identity (motivation-hooks §1.5) and is currently absent.
- **Empty-segment "why it's empty" tooltips**, not just "待踏足". The 时空柱 's empty 夏 段 should hover-explain "夏代 青铜器 存世 极少 (< 30 件) — 二里头 爵 是 标准 器". Generalizes A's good footnote pattern.

## Specific actionable instructions for the next Builder/Designer

1. **`me.html` rebuild rule**: maximum 2 progress bars visible above the fold. No "差 N 件解锁 X" prompts on the first screen at all. Move all "what to do next" suggestions to a single bottom-of-page panel **modeled on A's "待补 · 研究断面建议"**.
2. **Build the missing long-inscription reader**. Pick 大盂鼎 (291 字, accessible) or 何尊 (122 字, has "宅兹中国"). Build a reading flow: char-by-char reveal with hover释义 → at-end story coalescence ("您 现在 读完 了 武王 命令 盂 一段 的 完整 册命 文 — 这 就 是 西周 早期 王 权 直接 表达 的 样 子"). This is the single highest-leverage v2 deliverable.
3. **Rotate B's monologue based on collection state**. Trivial implementation: pick a different opening line from a pool of 3-5 based on `collected_count % 5`. **The effort is small; the signal is huge** — demonstrates "the app grows with you".
4. **Implement live 跨维度 组合 detection**. Compute `collected ∩ {商晚期 × 三星堆}` etc. on page load; only render unlock callout if `last_seen_unlock_ts < now`. Persist `last_seen_unlock_ts` to localStorage.
5. **Cap titles at 3 per `gamification-mechanics §6`**. Sort by priority: 段位 > 跨维度 > 维度专精. Hide the rest behind a "查看全部 N 个" link.
6. **Replace C's 5-stat headline grid with A's "录入 / 朝代 / 古国 / 纹饰 / 识字" framing where each number has a 字段 caption**. The numbers stay; the layout becomes a research dossier, not a video-game HUD.
7. **Anti-Skinner copy review pass**: any string containing "再 X 件 解锁", "即将 解锁", "差 N 字", or "% 完成度" must be either removed or rephrased to action-shape ("您 接下来 可 选择 的 研究 方向").

## What success looks like next round

- **A 2-week veteran user opens v2 and finds 1 (one) specific thing to learn today**, not 5 specific things to grind.
- **The "差 N 件 解锁 X" phrasing no longer appears anywhere on `me.html`.**
- **At least 1 long-inscription is readable**, end-to-end, with a coherent post-reading payoff.
- **The 我的 page narrates the user's behavior** (one sentence: "本周 您 主要 在 西周 中期"), instead of scoring it.
- **Empty/sparse dimensions explain themselves** instead of pleading for completion.
- **Titles are capped at 3 displayed** with a "all" overflow.
- **A first-time visitor cannot tell from `me.html` alone whether the user has 7 or 70 collected** — meaning the page is about *what the user studies*, not *how much they have*.

## Open questions for the user

1. **Long-inscription reading is the single highest-leverage missing piece. Is the v2 timeline long enough to ship one inscription** (大盂鼎 or 何尊) end-to-end? If not, this should be the morning-report's top "scope/cut" question.
2. **The 国宝率 metric is borderline排行榜 behavior even with the "no leaderboard" disclaimer.** Should v2 keep it (as A does, quietly) or kill it entirely? Recommendation: keep as a non-headline number on `me.html` only; remove from any share card.
3. **C's "梗卡片" output format is genuinely good for K-factor, but the implicit user identity is "collector who flexes" rather than "person who learns".** Does the product want the K-factor enough to live with the identity tension? Recommendation: keep 梗卡片 generator but **remove the 称号 watermark line** — the share card should be about the artifact, not about the sharer's rank.
4. **Should v2 explicitly forbid showing more than N progress bars on a single page?** If yes, what's N? Recommendation: N = 2 on `me.html`, N = 1 elsewhere.
5. **The team's "认知能力 = 真实奖励" thesis (gamification-mechanics §9.7) is not visibly tested in any demo.** None of the demos have a "blind ID" challenge or any mechanism where the user demonstrates skill back to the system. Should v2 prototype one? Recommendation: yes — a tiny 3-card "guess the dynasty" flow at the end of a 朝代 collection would close the loop.
