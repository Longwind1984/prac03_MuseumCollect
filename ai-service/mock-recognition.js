/**
 * mock-recognition.js — D0 Night Mock Recognition Module
 *
 * Drop-in mock of the future POST /recognize endpoint.
 * Returns the exact shape described in api-contract.md §3.1.
 *
 * Usage in scan.html:
 *   <script src="../../ai-service/mock-recognition.js"></script>
 *   <script>
 *     await mockRecognition.ready;
 *     const result = await mockRecognition.recognize({ demo_seed: 'houmuwu' });
 *     // renderResult(result)
 *   </script>
 *
 * Owner: AI Engineer · Date: 2026-05-20 · Version: 0.1
 */

(function (global) {
  'use strict';

  // ---------- Module state ----------
  const state = {
    catalog: null,           // loaded from bronze-treasures-v1.json
    catalogById: null,       // map: id -> artifact
    catalogPath: null,       // resolved at init
    ready: null,             // promise
    fastMode: false,         // skip latency sim when true
    modelVersion: 'mock-v0.1',
  };

  // Try multiple candidate paths so the script works from different demo dirs.
  // Builders can override by setting `window.mockRecognitionCatalogPath` before loading this script.
  const CATALOG_CANDIDATE_PATHS = [
    global.mockRecognitionCatalogPath,
    '../../data/curated/bronze-treasures-v1.json',
    '../data/curated/bronze-treasures-v1.json',
    './data/curated/bronze-treasures-v1.json',
    '/data/curated/bronze-treasures-v1.json',
  ].filter(Boolean);

  // ---------- Pre-baked demo scenarios ----------
  // Each scenario describes which artifact_ids appear as candidates and at what confidence.
  // confidence_band derived from top candidate's confidence per spec §3.1.
  const SCENARIOS = {
    houmuwu: {
      mode_used: 'object',
      candidates: [
        { id: 'houmuwu_ding', confidence: 0.94, match_method: 'clip_retrieval',
          reasons: ['形制: 方鼎 (高匹配)', '纹饰: 饕餮纹 + 云雷纹 (高匹配)', '尺寸比例: 商代大型方鼎'] },
        { id: 'zilong_ding', confidence: 0.72, match_method: 'clip_retrieval',
          reasons: ['形制: 圆鼎 (中匹配 — 与方鼎差异)', '纹饰: 饕餮纹 (高匹配)'] },
        { id: 'da_yu_ding', confidence: 0.58, match_method: 'clip_retrieval',
          reasons: ['形制: 圆鼎 (中匹配)', '纹饰: 饕餮纹 (高匹配)', '尺寸: 大型鼎'] },
      ],
      ocr_text: null,
    },
    siyang: {
      mode_used: 'object',
      candidates: [
        { id: 'siyang_fangzun', confidence: 0.91, match_method: 'clip_retrieval',
          reasons: ['形制: 方尊 (高匹配)', '装饰: 四羊立体浮雕 (强特征)', '纹饰: 羊角纹 + 夔龙纹'] },
        { id: 'siyangshou_bu', confidence: 0.68, match_method: 'clip_retrieval',
          reasons: ['装饰: 羊首特征 (中匹配)', '湘江流域风格 (高匹配)'] },
        { id: 'fuhao_xiaozun', confidence: 0.41, match_method: 'clip_retrieval',
          reasons: ['形制: 尊类 (中匹配)', '纹饰: 饕餮纹'] },
      ],
      ocr_text: null,
    },
    fuhao: {
      mode_used: 'object',
      candidates: [
        { id: 'fuhao_xiaozun', confidence: 0.78, match_method: 'clip_retrieval',
          reasons: ['形制: 鸟兽形尊 (高匹配)', '纹饰: 蝉纹 + 蟠蛇纹', '尺寸: 中型酒器'] },
        { id: 'longxing_gong', confidence: 0.55, match_method: 'clip_retrieval',
          reasons: ['形制: 动物形酒器 (中匹配)', '纹饰: 兽面纹'] },
        { id: 'lianhe_fanghu', confidence: 0.42, match_method: 'clip_retrieval',
          reasons: ['立体装饰元素 (中匹配)', '春秋风格'] },
      ],
      ocr_text: null,
    },
    lianhe: {
      mode_used: 'object',
      candidates: [
        { id: 'lianhe_fanghu', confidence: 0.81, match_method: 'clip_retrieval',
          reasons: ['形制: 方壶 (高匹配)', '盖顶立鹤 (强特征)', '纹饰: 蟠螭纹 + 莲瓣纹'] },
        { id: 'zenghouyi_zunpan', confidence: 0.61, match_method: 'clip_retrieval',
          reasons: ['工艺: 透空蟠螭 (高匹配)', '战国早期风格'] },
        { id: 'zenghouyi_bianzhong', confidence: 0.38, match_method: 'clip_retrieval',
          reasons: ['同墓出土同期器物 (相关性)'] },
      ],
      ocr_text: null,
    },
    lowconf: {
      mode_used: 'object',
      candidates: [
        { id: 'lianhe_fanghu', confidence: 0.48, match_method: 'clip_retrieval',
          reasons: ['形制: 壶类 (中匹配)', '纹饰难以判别'] },
      ],
      ocr_text: null,
    },
    nomatch: {
      mode_used: 'object',
      candidates: [],
      ocr_text: null,
    },
    ocr_houmuwu: {
      mode_used: 'label',
      candidates: [
        { id: 'houmuwu_ding', confidence: 0.99, match_method: 'ocr_text_match',
          reasons: ['名称完全匹配 "后母戊鼎"', '馆藏地匹配 "中国国家博物馆"', '出土年份匹配 "1939"'] },
      ],
      ocr_text: '后母戊鼎\n商代晚期 约公元前1300-1046年\n1939年河南安阳武官村出土\n中国国家博物馆藏\n国家一级文物 / 禁止出境',
      extracted_fields: {
        name: '后母戊鼎',
        dynasty: '商',
        period_hint: '商代晚期',
        excavation_year: '1939',
        excavation_site: '河南安阳武官村',
        current_museum: '中国国家博物馆',
      },
    },
    inscription_he_zun: {
      mode_used: 'hybrid',
      candidates: [
        { id: 'he_zun', confidence: 0.96, match_method: 'hybrid',
          reasons: ['形制: 方腹尊 (高匹配)', '铭文关键词 "宅兹中国" (强匹配)', '纹饰: 饕餮纹 + 蕉叶纹'] },
        { id: 'siyang_fangzun', confidence: 0.43, match_method: 'clip_retrieval',
          reasons: ['形制: 方尊类 (中匹配)'] },
      ],
      ocr_text: '宅兹中国',
    },
  };

  // ---------- Latency simulation ----------
  // Real CLIP+Qdrant typical: ~500-1500ms; label mode adds 300-600ms.
  function simulatedLatency(modeUsed) {
    if (state.fastMode) return 0;
    const ranges = {
      object: [600, 1300],
      label: [800, 1600],
      hybrid: [900, 1800],
    };
    const [lo, hi] = ranges[modeUsed] || ranges.object;
    return Math.floor(lo + Math.random() * (hi - lo));
  }

  function confidenceBand(topConfidence) {
    if (topConfidence === undefined || topConfidence === null) return 'no_match';
    if (topConfidence >= 0.85) return 'high';
    if (topConfidence >= 0.60) return 'medium';
    if (topConfidence >= 0.40) return 'low';
    return 'no_match';
  }

  function makeRequestId() {
    return 'req_mock_' + Math.random().toString(36).slice(2, 12);
  }

  // ---------- Catalog loading ----------
  async function loadCatalog() {
    let lastError = null;
    for (const path of CATALOG_CANDIDATE_PATHS) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          state.catalog = await res.json();
          state.catalogPath = path;
          state.catalogById = Object.create(null);
          for (const a of state.catalog) state.catalogById[a.id] = a;
          console.info(`[mockRecognition] catalog loaded from ${path} (${state.catalog.length} artifacts)`);
          return;
        }
      } catch (e) {
        lastError = e;
      }
    }
    console.error('[mockRecognition] failed to load catalog from any path', CATALOG_CANDIDATE_PATHS, lastError);
    throw new Error('mockRecognition could not load bronze-treasures-v1.json — set window.mockRecognitionCatalogPath before loading the script.');
  }

  // ---------- Build a candidate object from a scenario row ----------
  function buildCandidate(row) {
    const a = state.catalogById[row.id];
    if (!a) {
      console.warn(`[mockRecognition] scenario references unknown artifact_id: ${row.id}`);
      return null;
    }
    return {
      artifact_id: a.id,
      name_zh: a.name_zh,
      name_pinyin: a.name_pinyin,
      dynasty: a.dynasty,
      current_museum: a.current_museum,
      rarity_level: a.rarity_level,
      thumbnail_url: `https://cdn.museumcollect.cn/thumbs/${a.id}_256.jpg`, // placeholder
      confidence: row.confidence,
      match_method: row.match_method,
      match_reasons: row.reasons,
    };
  }

  // ---------- Public: recognize() ----------
  async function recognize(opts = {}) {
    await state.ready;
    const {
      demo_seed = null,
      mode = 'auto',
      top_k = 5,
      min_confidence = 0.0,
      _customCandidates = null,
      _customBand = null,
    } = opts;

    // Custom escape hatch
    let scenario;
    if (_customCandidates) {
      scenario = {
        mode_used: mode === 'auto' ? 'object' : mode,
        candidates: _customCandidates.map((id, i) => ({
          id, confidence: Math.max(0.4, 0.95 - i * 0.15),
          match_method: 'clip_retrieval',
          reasons: ['custom scenario'],
        })),
        ocr_text: null,
      };
    } else if (demo_seed && SCENARIOS[demo_seed]) {
      scenario = SCENARIOS[demo_seed];
    } else {
      // Default: behave as 'nomatch' — encourage Builders to pass demo_seed explicitly
      scenario = SCENARIOS.nomatch;
    }

    // Build candidates with full catalog data
    const candidates = scenario.candidates
      .map(buildCandidate)
      .filter(Boolean)
      .filter(c => c.confidence >= min_confidence)
      .slice(0, top_k);

    const topConf = candidates.length > 0 ? candidates[0].confidence : null;
    const band = _customBand || confidenceBand(topConf);

    const elapsedMs = simulatedLatency(scenario.mode_used);
    if (elapsedMs > 0) await sleep(elapsedMs);

    const response = {
      request_id: makeRequestId(),
      mode_used: scenario.mode_used,
      confidence_band: band,
      candidates,
      ocr_text: scenario.ocr_text || null,
      elapsed_ms: elapsedMs,
      model_version: state.modelVersion,
    };

    // Add extracted_fields for OCR scenarios (mirrors /ocr response shape)
    if (scenario.extracted_fields) {
      response.extracted_fields = scenario.extracted_fields;
    }

    return response;
  }

  // ---------- Public: search() — catalog text search fallback ----------
  async function search(opts = {}) {
    await state.ready;
    const { q = '', dynasty = null, type = null, museum = null, rarity = null, limit = 20, offset = 0 } = opts;
    const ql = q.toLowerCase().trim();
    if (!ql && !dynasty && !type && !museum && !rarity) {
      return { request_id: makeRequestId(), query: q, total: 0, results: [], elapsed_ms: 5 };
    }

    const matched = [];
    for (const a of state.catalog) {
      // Filters
      if (dynasty && a.dynasty !== dynasty) continue;
      if (type && a.type !== type && !(a.type || '').includes(type)) continue;
      if (museum && !(a.current_museum || '').includes(museum)) continue;
      if (rarity && a.rarity_level !== rarity && !(a.rarity_level || '').startsWith(rarity)) continue;

      // Score
      if (!ql) {
        matched.push({ a, score: 1.0, field: 'filter' });
        continue;
      }
      let bestScore = 0, bestField = null;
      const checks = [
        ['name_zh', a.name_zh],
        ['name_pinyin', a.name_pinyin],
        ...((a.name_alt || []).map((n, i) => [`name_alt_${i}`, n])),
        ['excavation_site', a.excavation_site],
        ['current_museum', a.current_museum],
        ['inscription', (a.inscription && a.inscription.summary) || ''],
        ['story', a.story_brief || ''],
      ];
      for (const [field, text] of checks) {
        if (!text) continue;
        const t = String(text).toLowerCase();
        if (t === ql) { bestScore = Math.max(bestScore, 1.0); bestField = field; }
        else if (t.startsWith(ql)) { bestScore = Math.max(bestScore, 0.85); bestField = bestField || field; }
        else if (t.includes(ql)) { bestScore = Math.max(bestScore, 0.65); bestField = bestField || field; }
      }
      if (bestScore > 0) matched.push({ a, score: bestScore, field: bestField });
    }

    matched.sort((x, y) => y.score - x.score);
    const sliced = matched.slice(offset, offset + limit);

    return {
      request_id: makeRequestId(),
      query: q,
      total: matched.length,
      results: sliced.map(({ a, score, field }) => ({
        artifact_id: a.id,
        name_zh: a.name_zh,
        name_alt: a.name_alt || [],
        dynasty: a.dynasty,
        current_museum: a.current_museum,
        rarity_level: a.rarity_level,
        thumbnail_url: `https://cdn.museumcollect.cn/thumbs/${a.id}_256.jpg`,
        match_score: score,
        match_field: field,
      })),
      elapsed_ms: state.fastMode ? 0 : 10 + Math.floor(Math.random() * 30),
    };
  }

  // ---------- Public: getById() ----------
  function getById(artifactId) {
    if (!state.catalogById) {
      console.warn('[mockRecognition] getById called before ready');
      return null;
    }
    return state.catalogById[artifactId] || null;
  }

  // ---------- Public: listScenarios() ----------
  function listScenarios() {
    return Object.keys(SCENARIOS).map(name => ({
      name,
      mode_used: SCENARIOS[name].mode_used,
      top_artifact_id: SCENARIOS[name].candidates[0] && SCENARIOS[name].candidates[0].id,
      top_confidence: SCENARIOS[name].candidates[0] && SCENARIOS[name].candidates[0].confidence,
      candidate_count: SCENARIOS[name].candidates.length,
    }));
  }

  // ---------- Utility ----------
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ---------- Init ----------
  state.ready = loadCatalog();

  // ---------- Export ----------
  const api = {
    ready: state.ready,
    recognize,
    search,
    getById,
    listScenarios,
    get fastMode() { return state.fastMode; },
    set fastMode(v) { state.fastMode = !!v; },
    get catalogPath() { return state.catalogPath; },
    get modelVersion() { return state.modelVersion; },
  };

  // Browser global
  if (typeof window !== 'undefined') {
    window.mockRecognition = api;
  }
  // CommonJS (for tooling tests)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
