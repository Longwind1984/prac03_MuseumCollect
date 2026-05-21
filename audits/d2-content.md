# Audit: content — 2026-05-21 (v3)

## Files reviewed
- `data/curated/bronze-treasures-v3-segment-{1-5}.json` (277 records across 5 files)
- `docs/dimensional-map-v3.md` (7+1 architecture)
- `demos/v3-converged/artifact.html` (content rendering)
- `demos/v3-converged/inscription-special-hezun.html` (何尊长卷专题)
- `audits/d1-content.md` (prior audit reference)

---

## Snap impressions

**Segment 1 (商):** Densely populated — 妇好墓 cluster gives excellent co-excavation coherence. `patterns_structured` split into main/secondary/ground/rim is a genuine step up from v1. The `_todo` flags (象尊 inscription, 四羊首铜瓿 dimensions) are honest but should be hidden from end users. 后母戊鼎 v3 record is markedly better structured than v1.

**Segment 2 (西周):** The best-curated segment. 颂器四件完整组合、中山王三器铭文字数都准确。大克鼎 period assignment is suspicious (孝王 = "周孝王" is actually a西周中期王, not 西周晚期 — the record's own `period` field says 晚期 but this is wrong; the consensus is 西周中期 or 孝王 is placed between懿王和夷王, making it周中期). 散氏盘 retains the unresolved "矢" character without any note of 夨/夂 alternative readings, which v1 flagged as a P2 issue still unresolved.

**Segment 3 (东周):** 曾侯乙尊盘 craft description is correct and improved from v1. 莲鹤方壶 still contains the "疑用失蜡法早期工艺" qualifier but should be "学界主流否认" — that residue from v1 P1 error has not been fully corrected. 王子午鼎 claims 失蜡法 for the 攀龙; this is broadly accepted by current scholarship so acceptable. 中山王三器铭文字数(469/450/181) consistent with Wikipedia EN King Cuo of Zhongshan.

**何尊长卷专题 (inscription-special-hezun.html):** Strong execution. The 逐字释读 mechanic is genuine and the segment notes are accurate. One factual issue: the page credits 唐兰 with recognizing "宅兹中国" in the HTML comment section, then in the JS cites "唐兰，《西周青铜器铭文分代史征》，1986" — but the actual identification was published in 唐兰 1976 (《文物》1976年第1期《西周时代最早的一件铜器铭文——何尊》), not 1986.

**Dimensional map v3 (7+1):** Academically defensible overall. The demotion of 工艺 and merger of 出土地/馆藏地 are reasonable PM decisions. But two issues remain.

---

## Critical observations (content viewpoint)

**1. 大克鼎 period error — 孝王 is 西周中期, not 西周晚期**

The record assigns `"period": "西周晚期(孝王时期)"`. 孝王 is universally placed in 西周中期 (between 懿王 and 夷王, ca. 10th century BC). 西周晚期 begins with 夷王 or厉王. This is a factual error that will confuse any user who looks at the time pillar and sees 大克鼎 in the wrong century band. The `approx_year` says "约公元前10世纪中期" which contradicts the period label.

**2. 史墙盘 "中国第一部史诗" claim is misleading**

v3 data says 史墙盘 "被誉为'中国第一部史诗'" (story_brief and inscription.summary). The academic nickname is "中国最早有意识的史学铭文" or sometimes colloquially "第一部史诗" — but using "史诗 (epic poem)" is imprecise. 史墙盘 is a bronze inscription, not a poem with metre or narrative arc.

**3. 莲鹤方壶 失蜡法 qualifier not corrected from v1**

v1 P1 error: the craft field said "可能含失蜡法早期工艺". v3 retains: `"craft": "复合工艺:分铸 + 圆雕 + 浮雕 + 焊接;盖顶莲瓣与螭龙疑用失蜡法早期工艺"`. The academic consensus (Wang Youde 1983; Bagley 1990) is that 莲鹤方壶 is range-cast with split-mould and welding. The 失蜡法 claim is rejected by virtually all specialist literature.

**4. 何尊长卷 — 唐兰 citation date is wrong: 1986 should be 1976**

`inscription-special-hezun.html` line 141 cites: "唐兰，《西周青铜器铭文分代史征》，1986". The article recognizing "宅兹中国" is 唐兰《西周时代最早的一件铜器铭文——何尊》,《文物》1976年第1期. The 1986 book is a posthumous collected edition. Citing 1986 instead of 1976 misrepresents when the discovery was made.

**5. 大克鼎 approx_year vs period internal contradiction**

`"period": "西周晚期(孝王时期)"` but `"approx_year": "约公元前10世纪中期"`. The 10th century middle is squarely 西周中期.

**6. 散氏盘 "矢国/夨国" ambiguity still unresolved**

v3 keeps `"name_alt": ["散盘", "矢人盘"]` and `"ancient_state": "周(矢国与散国)"` — no note about the character debate.

**7. 何尊 "成王五年 = 1038 BC" — valid but should note scholarly variation**

The 1038 BC date is the Xia-Shang-Zhou Chronology Project figure. Edward Shaughnessy's reconstruction gives different numbers. Should note "依夏商周断代工程".

**8. 王子午鼎 失蜡法 attribution — acceptable but should note "generally accepted"**

The current wording presents it as settled fact. A hedge ("学界主流认为") would be more accurate.

**9. 何尊 inscription FULL_TEXT in hezun.html is abbreviated**

The `FULL_TEXT` constant in inscription-special-hezun.html contains only ~98 characters, not 122. The displayed grid will show fewer than the stated 122 characters. The `totalChars` variable will report a smaller number, undermining the stated "0/122" counter.

---

## v1 P0 errors — status in v3

| v1 P0 error | v3 status |
|---|---|
| 后母戊 纹饰 — 虎噬人头纹平级于饕餮 | **FIXED** — `patterns_structured.rim` for 虎纹 |
| C state.js 尊盘 taxonomy error | **FIXED** — `form_subtype: "尊盘组合(尊置盘中)"` |
| 三星堆 image wrong | **N/A** — no sanxingdui record found in sampled segments |
| 利簋病句 | **FIXED** — story_brief has correct sentence |

---

## Things missing that I expected (as PhD candidate)

- **断代依据 still absent**: Not a single record explains *why* the artifact is assigned to its period. The `dating_method` field exists but with no elaboration.
- **集成号 (殷周金文集成 accession numbers)**: Zero records reference 《集成》编号. The single most important scholarly cross-reference for bronze inscriptions. Without it, the data is not useful for serious research.
- **同墓器物群 as a browsable concept**: The 妇好 cluster links, but no concept of "墓葬出土组合" as a navigable unit.
- **拓片 / rubbings**: No actual rubbings are linked. For 金文 research, facsimiles are primary sources.

---

## Things present that don't earn their place

- **Multiple `_todo` flags in production data**: 象尊 inscription, 妇好三联甗 height null — will render as blank or error states.
- **`weight_kg` 4421.48 kg for 曾侯乙编钟**: False precision; v1 flagged this, v3 keeps the same number.

---

## Severity ranking

### P0 — Factual errors must fix
- **大克鼎 period 西周晚期 → 西周中期**(self-contradicting with approx_year)
- **何尊长卷 唐兰 citation 1986 → 1976**
- **何尊 FULL_TEXT < 122 characters** (counter mismatch)

### P1 — Misleading
- **莲鹤方壶 "疑用失蜡法早期工艺"** — v1 P1 not fixed
- **史墙盘 "中国第一部史诗"** — wrong term (should be "最早双叙事铭文史学")
- **何尊 1038 BC lacks Chronology Project qualifier**
- **散氏盘 矢国/夨/夂 dispute unflagged**
- **Multiple `_todo` null fields rendered as production data**

### P2 — Peer notice
- 大盂鼎 approx_year range 1020-996 BC vs story 998 BC inconsistency
- 曾侯乙编钟 4421.48 kg false precision
- 王子午鼎 失蜡法 should hedge
- `jicheng_id` field exists but null everywhere
- 散氏盘 has approx_year but 史墙盘 has null — asymmetric
