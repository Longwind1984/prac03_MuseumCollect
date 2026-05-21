# Next Iteration Brief: content-v3 — 2026-05-21

## What to keep

- `patterns_structured` with main/secondary/ground/rim hierarchy — correct and far better than v1.
- Co-excavation linkage on 妇好墓 cluster — the `related_artifacts` lists are accurate.
- 何尊长卷专题 interactive mechanic — strongest piece of content. Fix the FULL_TEXT and the citation year and it becomes the show piece.
- 中山王三器 铭文字数 accuracy — all three records (469/450/181 characters) are correct.
- 曾侯乙尊盘 as earliest confirmed large-scale 失蜡法 — properly characterized.

## What to change

1. **大克鼎 period**: `"西周晚期(孝王时期)"` → `"西周中期(孝王时期)"`. One-line fix. High impact on time pillar.
2. **莲鹤方壶 craft**: remove "疑用失蜡法早期工艺", add "对失蜡法使用有争议但多数学者持否定立场".
3. **史墙盘 characterization**: "史诗" → "最早双叙事结构铭文史学著作".
4. **何尊长卷 唐兰 citation**: 1986 → 1976 (《文物》1976年第1期).
5. **FULL_TEXT in hezun.html**: pad to actual 122 chars or adjust counter to actual length.
6. **何尊 approx_year**: append "(依夏商周断代工程; 另说 BC 1040-1036)".
7. **Hide `_todo` null fields** in artifact.html render via conditional.

## What to add

- **`jicheng_id` (《殷周金文集成》编号)** for top 15 inscribed vessels: 毛公鼎/大盂鼎/大克鼎/散氏盘/何尊/利簋/虢季子白盘/史墙盘/逨盘/曾侯乙编钟/班簋/宜侯夨簋/司母辛鼎/多友鼎/颂簋. Highest-ROI content addition.
- **`dating_rationale` micro-field** (2-3 sentences): why this artifact dates to this period.
- **散氏盘 "矢/夨" note** in inscription.summary explaining the scholarly debate.

## Specific actionable instructions

1. `bronze-treasures-v3-segment-2-xizhou.json`: find `da_ke_ding`, change `"period"` to `"西周中期(孝王时期)"`.
2. `bronze-treasures-v3-segment-3-dongzhou.json`: find `lianhe_fanghu`, edit craft field.
3. `bronze-treasures-v3-segment-2-xizhou.json`: find `shi_qiang_pan`, fix "中国第一部史诗" wording.
4. `inscription-special-hezun.html` line 141: 1986 → 1976; update citation text.
5. `inscription-special-hezun.html`: complete FULL_TEXT or fix counter.
6. `artifact.html`: add null/_todo check before rendering.

## What success looks like next round

- 大克鼎 correctly appears in 西周中期 band of time pillar.
- 何尊长卷 shows 122 characters precisely; citation reads 1976.
- 莲鹤方壶 no longer implies unconfirmed 失蜡法.
- PhD-level user can find 集成号 for 15 core inscription vessels.
- Zero `_todo` strings visible in rendered artifact pages.

## Open questions for the user (escalate to morning report)

- **失蜡法 timeline decision**: Should app take a position on first appearance of 失蜡法 in China (王子午鼎 vs 曾侯乙尊盘), or remain neutral?
- **集成号 scope**: 殷周金文集成 + 商周青铜器铭文暨图像集成 are scholarly standards. Want content team to look up these for v4, or out of scope?
- **史墙盘 popular vs academic terminology**: "中国第一部史诗" is CCTV/museum label terminology. Use popular phrasing for accessibility or precise academic language? Two goals in tension.
