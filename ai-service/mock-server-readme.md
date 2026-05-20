# Mock Recognition — Builder Integration Guide (D0 Night)

> **TL;DR**: Tonight's demos are static HTML. There is NO server. Builders import `mock-recognition.js` and call `mockRecognize()`. It returns the exact shape future `POST /recognize` will return. Wire it up in 10 minutes.

---

## 0. Why JS mock, not a Python server tonight?

| Approach | Pro | Con | Verdict |
|----------|-----|-----|---------|
| Real FastAPI server | Most realistic | Each Builder needs to run it; cross-origin pain; +30 min setup | ❌ Tonight |
| Python http.server + static JSON | Simple | Still needs server running; no logic | ❌ Tonight |
| **JS mock module (chosen)** | Zero infra; works from `file://`; deterministic | Not a real network call | ✅ Tonight |
| Real backend | The endgame | D5+ scope | ✅ Post-MVP |

Builder A/B/C tonight = pure static HTML opened in browser. The mock is just a vanilla JS file you `<script src>`.

---

## 1. 30-second integration

In your `scan.html`:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <title>拍照识别 — MuseumCollect</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- ... your scan UI ... -->

  <!-- Mock module — relative path from your demo dir to ai-service/ -->
  <script src="../../ai-service/mock-recognition.js"></script>
  <script>
    // 1. Wait for catalog to load (mock fetches bronze-treasures-v1.json on init)
    await mockRecognition.ready;

    // 2. Call mockRecognize when user clicks a preset image
    document.querySelectorAll('[data-demo-seed]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const seed = e.currentTarget.dataset.demoSeed;
        showLoading();
        const result = await mockRecognition.recognize({ demo_seed: seed });
        renderResult(result);
      });
    });
  </script>
</body>
</html>
```

That's it. `result` has the shape from `api-contract.md` §3.1. Render it.

---

## 2. The mock API (one function, exact contract match)

```js
const result = await mockRecognition.recognize({
  image: null,            // optional File/Blob — ignored by mock, but accepted for forward compat
  mode: 'auto',           // 'object' | 'label' | 'auto'
  top_k: 5,
  demo_seed: 'houmuwu',   // REQUIRED for mock — picks scenario
  min_confidence: 0.0,
});

// Returned shape (matches POST /recognize spec exactly):
// {
//   request_id, mode_used, confidence_band, candidates: [...],
//   ocr_text, elapsed_ms, model_version
// }
```

There are also two side helpers:

```js
// Text search fallback (for "都不对?搜一下"). Matches GET /catalog/search.
const searchResults = await mockRecognition.search({
  q: '后母戊',
  dynasty: '商',
  limit: 10
});

// Detail lookup. Matches GET /catalog/{id}.
const detail = mockRecognition.getById('houmuwu_ding');
```

---

## 3. Pre-baked demo scenarios

These are the `demo_seed` values that work out-of-box. Use them as your preset image buttons in `scan.html`.

| `demo_seed` | Scenario | Confidence band | What user sees |
|-------------|----------|-----------------|----------------|
| `houmuwu` | **High-conf match** | `high` | "这是 后母戊鼎" big card, 2 secondary candidates |
| `siyang` | **High-conf match** | `high` | "这是 四羊方尊" + 四羊首铜瓿 as similar |
| `fuhao` | **Medium-conf ambiguous** | `medium` | "可能是这几件之一" — 3 candidates equal weight |
| `lianhe` | **Medium-conf** | `medium` | 莲鹤方壶 + 曾侯乙尊盘 |
| `lowconf` | **Low-conf hesitation** | `low` | "有点像 [X],但不太确定" + 搜索 link |
| `nomatch` | **No match fallback** | `no_match` | "没找到匹配 — 试试这些办法" + search UI |
| `ocr_houmuwu` | **OCR label path** | `high` | Returns with `ocr_text` populated + extracted_fields |
| `inscription_he_zun` | **Inscription-driven** | `high` | 何尊 via "中国" inscription match |

### Recommended 4-demo flow for `scan.html`

Pick 4 of these as your preset cards. Strong recommendation:

1. **`houmuwu`** (happy path / high confidence)
2. **`fuhao`** (ambiguity — multiple candidates, lets you show off the "top-K with reasons" UI)
3. **`ocr_houmuwu`** (label-only flow — shows the OCR is a parallel path)
4. **`nomatch`** (the failure fallback — shows search is the safety net)

This 4-scenario set hits all the storytelling points: "AI works", "AI is honest about uncertainty", "Multiple paths", "Never a dead end".

---

## 4. Recommended UI states (Builder reference)

For each `confidence_band`, here's a rendering recipe. Adapt to your persona (考据派 vs 沉浸派 vs 探索派).

### `high`
```
┌──────────────────────────────────────┐
│  [thumbnail 200x200]                 │
│                                      │
│  后母戊鼎          [国宝光晕]       │
│  商 · 中国国家博物馆                 │
│  置信度 94%                          │
│                                      │
│  [ + 加入我的图鉴 ]   [ 查看详情 ]   │
└──────────────────────────────────────┘
你也可能在看:
[ 子龙鼎 72% ]   [ ... ]
```

### `medium`
```
看起来可能是这几件之一:
┌────────┬────────┬────────┐
│  78%   │  55%   │  42%   │
│ 妇好鸮尊│ 龙形觥 │ 莲鹤方壶│
└────────┴────────┴────────┘
点击你看到的那件,或 [都不像?搜一下]
```

### `low`
```
┌──────────────────────────┐
│ 有点像 莲鹤方壶 (48%)   │
│ 但不太确定 — 你能确认吗?│
└──────────────────────────┘
[ 就是它 ]   [ 不是,搜一下 ]
```

### `no_match`
```
没找到匹配的国宝 :(

你可以试试:
- [ 重新拍一张(光线好/正面/无遮挡) ]
- [ 直接搜索 (输入名字、朝代...) ]
- [ 扫展签上的文字 (OCR模式) ]
```

---

## 5. Putting it in `scan.html`: full minimal example

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <title>拍照识别</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-stone-900 text-stone-100 p-8">
  <h1 class="text-3xl font-serif mb-6">拍照识别国宝</h1>

  <!-- Step 1: Preset image picker (since we have no real camera) -->
  <div class="grid grid-cols-4 gap-4 mb-8" id="presets">
    <button data-demo-seed="houmuwu" class="aspect-square bg-stone-800 rounded-lg p-2 hover:ring-2 ring-amber-400">
      <div class="aspect-square bg-gradient-to-br from-amber-800 to-stone-700 rounded"></div>
      <div class="text-sm mt-2">高清正面照</div>
    </button>
    <button data-demo-seed="fuhao" class="aspect-square bg-stone-800 rounded-lg p-2 hover:ring-2 ring-amber-400">
      <div class="aspect-square bg-gradient-to-br from-amber-700 to-stone-600 rounded"></div>
      <div class="text-sm mt-2">侧光模糊照</div>
    </button>
    <button data-demo-seed="ocr_houmuwu" class="aspect-square bg-stone-800 rounded-lg p-2 hover:ring-2 ring-amber-400">
      <div class="aspect-square bg-gradient-to-br from-stone-600 to-stone-700 rounded"></div>
      <div class="text-sm mt-2">仅展签照</div>
    </button>
    <button data-demo-seed="nomatch" class="aspect-square bg-stone-800 rounded-lg p-2 hover:ring-2 ring-amber-400">
      <div class="aspect-square bg-gradient-to-br from-emerald-800 to-stone-700 rounded"></div>
      <div class="text-sm mt-2">非青铜器</div>
    </button>
  </div>

  <!-- Step 2: Loading state -->
  <div id="loading" class="hidden text-center py-12">
    <div class="inline-block w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
    <div class="mt-4 text-stone-400">正在识别...</div>
  </div>

  <!-- Step 3: Result area -->
  <div id="result"></div>

  <!-- Mock -->
  <script src="../../ai-service/mock-recognition.js"></script>
  <script>
    const $ = (s) => document.querySelector(s);

    async function init() {
      await mockRecognition.ready;
      document.querySelectorAll('[data-demo-seed]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const seed = e.currentTarget.dataset.demoSeed;
          $('#loading').classList.remove('hidden');
          $('#result').innerHTML = '';
          const result = await mockRecognition.recognize({ demo_seed: seed });
          $('#loading').classList.add('hidden');
          renderResult(result);
        });
      });
    }

    function renderResult(r) {
      const band = r.confidence_band;
      const top = r.candidates[0];

      if (band === 'high') {
        $('#result').innerHTML = `
          <div class="bg-stone-800 rounded-xl p-6 border-2 border-amber-500">
            <div class="text-amber-400 text-sm">置信度 ${(top.confidence*100).toFixed(0)}% · ${top.match_method}</div>
            <h2 class="text-2xl font-serif mt-2">${top.name_zh}</h2>
            <div class="text-stone-400">${top.dynasty} · ${top.current_museum} · ${top.rarity_level}</div>
            <ul class="mt-3 text-sm text-stone-300">
              ${top.match_reasons.map(reason => `<li>· ${reason}</li>`).join('')}
            </ul>
            <button class="mt-4 px-4 py-2 bg-amber-600 rounded">+ 加入我的图鉴</button>
          </div>
          ${r.candidates.length > 1 ? `
            <div class="mt-4 text-stone-400 text-sm">你也可能在看:</div>
            <div class="flex gap-2 mt-2">
              ${r.candidates.slice(1).map(c => `
                <div class="bg-stone-800 rounded p-2 text-sm">
                  ${c.name_zh} <span class="text-stone-500">${(c.confidence*100).toFixed(0)}%</span>
                </div>
              `).join('')}
            </div>` : ''}
        `;
      } else if (band === 'medium') {
        $('#result').innerHTML = `
          <div class="text-stone-300 mb-3">看起来可能是这几件之一,请选择:</div>
          <div class="grid grid-cols-3 gap-4">
            ${r.candidates.map(c => `
              <div class="bg-stone-800 rounded-lg p-4 hover:ring-2 ring-amber-400 cursor-pointer">
                <div class="text-amber-400">${(c.confidence*100).toFixed(0)}%</div>
                <div class="font-serif text-lg">${c.name_zh}</div>
                <div class="text-stone-500 text-xs">${c.dynasty} · ${c.current_museum}</div>
              </div>
            `).join('')}
          </div>
        `;
      } else if (band === 'low') {
        $('#result').innerHTML = `
          <div class="bg-stone-800 rounded-xl p-6 border border-stone-700">
            <div class="text-stone-400">有点像 (${(top.confidence*100).toFixed(0)}%):</div>
            <h2 class="text-xl font-serif mt-1">${top.name_zh}</h2>
            <div class="text-stone-500 text-sm mt-2">但不太确定 — 你能帮我们确认吗?</div>
            <div class="flex gap-2 mt-4">
              <button class="px-4 py-2 bg-amber-600 rounded">就是它</button>
              <button class="px-4 py-2 bg-stone-700 rounded">不是,搜一下</button>
            </div>
          </div>
        `;
      } else if (band === 'no_match') {
        $('#result').innerHTML = `
          <div class="bg-stone-800 rounded-xl p-6 border border-stone-700">
            <h2 class="text-xl font-serif">没找到匹配的国宝</h2>
            <div class="text-stone-400 mt-2">你可以试试:</div>
            <ul class="mt-3 space-y-2 text-stone-300">
              <li><button class="text-amber-400 hover:underline">→ 重新拍一张</button></li>
              <li><button class="text-amber-400 hover:underline">→ 直接搜索</button></li>
              <li><button class="text-amber-400 hover:underline">→ 扫展签上的文字</button></li>
            </ul>
          </div>
        `;
      }

      if (r.ocr_text) {
        $('#result').innerHTML += `
          <div class="mt-4 bg-stone-800/50 rounded p-4 text-stone-400 text-sm">
            <div class="text-xs mb-2">展签 OCR:</div>
            <pre class="whitespace-pre-wrap font-mono">${r.ocr_text}</pre>
          </div>
        `;
      }
    }

    init();
  </script>
</body>
</html>
```

Total Builder time to wire up: ~10 minutes if you're Builder C; ~20 if you want polish.

---

## 6. What if I want different mock data?

The mock reads `data/curated/bronze-treasures-v1.json` on init. If you want to mock a custom scenario, just call:

```js
mockRecognition.recognize({
  demo_seed: '_custom',
  _customCandidates: ['lianhe_fanghu', 'zenghouyi_zunpan'],
  _customBand: 'medium'
});
```

(Underscore prefix = mock-only escape hatch; not in real API.)

---

## 7. Latency simulation

The mock sleeps for 600-1400ms (random within band) to simulate realistic network + inference. Set `mockRecognition.fastMode = true` to skip the sleep when debugging UX flow.

---

## 8. When does this turn into a real server?

Per `docs/ai-roadmap.md`:
- **D0-D4** (now): JS mock (this file)
- **D5** (C3 checkpoint): FastAPI service with real CLIP, served at `https://api-staging.museumcollect.cn`. Same contract.
- **D8** (C4): Production endpoint with cached embeddings, OCR via Tencent Cloud OCR.

When the swap happens, Builders change exactly ONE line:

```js
// Before (mock):
const result = await mockRecognition.recognize({...});

// After (real):
const result = await fetch('https://api.museumcollect.cn/v1/recognize', {
  method: 'POST',
  body: formData
}).then(r => r.json());
```

Same shape. Same UX. Mock is forward-compatible.

---

## 9. Troubleshooting

| Problem | Fix |
|---------|-----|
| `mockRecognition is not defined` | Did you `<script src="../../ai-service/mock-recognition.js">`? Check relative path. |
| `mockRecognition.ready` never resolves | Mock fetches `data/curated/bronze-treasures-v1.json`. Path must be reachable from your HTML. Adjust `mockRecognition.catalogPath` if needed. |
| CORS error on `file://` | Open with `python3 -m http.server 8000` in repo root, browse to `http://localhost:8000/demos/v1-A/scan.html`. |
| Result has empty candidates always | You used an unknown `demo_seed`. Use one from §3 table. |
| Same result every time | That's the point — it's deterministic by seed. Use different seeds. |

---

## 10. Where to get help

- `api-contract.md` — full endpoint spec
- `mock-recognition.js` — read the code, it's ~150 lines
- Open question? Write to `state/state.md` with `[builder-X]` tag, AI Engineer will respond on next wake.

---

**Author**: AI Engineer · **Date**: 2026-05-20 · **Version**: 0.1
