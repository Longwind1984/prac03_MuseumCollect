/**
 * data-loader.js — Unified data API for MuseumCollect v3 converged
 * Loads all 5 segment JSONs and provides window.MuseumData
 *
 * window.MuseumData = {
 *   artifacts: [...277 records...],
 *   byEra, bySite, byMuseum, byForm, byPattern,
 *   get(id), collected: Set
 * }
 */

(function() {
  'use strict';

  // Single source of truth: MuseumConstants.COLLECTED_IDS (loaded by constants.js).
  // Previously this file kept its own MOCK_COLLECTED_IDS (30 IDs, also full of
  // typos). v5 ③ unified the two lists onto real-data IDs.
  const MOCK_COLLECTED_IDS = (window.MuseumConstants && window.MuseumConstants.COLLECTED_IDS)
    || new Set();
  if (!window.MuseumConstants) {
    console.error('[data-loader.js] requires constants.js to be loaded first');
  }

  // Segment file paths (relative to html pages in demos/v3-converged/)
  const SEGMENT_PATHS = [
    '../../data/curated/bronze-treasures-v3-segment-1-shang.json',
    '../../data/curated/bronze-treasures-v3-segment-2-xizhou.json',
    '../../data/curated/bronze-treasures-v3-segment-3-dongzhou.json',
    '../../data/curated/bronze-treasures-v3-segment-4-qinhan-sanxingdui.json',
    '../../data/curated/bronze-treasures-v3-segment-5-frontier-overseas.json',
  ];

  function groupBy(arr, keyFn) {
    const map = {};
    for (const item of arr) {
      const k = keyFn(item);
      if (!map[k]) map[k] = [];
      map[k].push(item);
    }
    return map;
  }

  function extractPatterns(artifact) {
    const p = artifact.patterns_structured;
    if (!p) return [];
    return [
      ...(p.main || []),
      ...(p.secondary || []),
      ...(p.ground || []),
      ...(p.rim || []),
    ].map(s => s.split(' ')[0].replace(/纹$/, '纹'));
  }

  async function loadAll() {
    let all = [];
    for (const path of SEGMENT_PATHS) {
      try {
        const r = await fetch(path);
        if (r.ok) {
          const data = await r.json();
          all = all.concat(Array.isArray(data) ? data : [data]);
        }
      } catch(e) {
        console.warn('[data-loader] Could not load', path, e.message);
      }
    }

    if (all.length === 0) {
      console.warn('[data-loader] No data loaded; using empty stub');
    }

    const byEra     = groupBy(all, a => a.dynasty || '未知');
    const bySite    = groupBy(all, a => (a.excavation && a.excavation.site) ? a.excavation.site.replace(/省.+/, '').replace(/市.+/, '').slice(-6) : '未知');
    const byMuseum  = groupBy(all, a => a.current_museum || '未知');
    const byForm    = groupBy(all, a => a.form_subtype || a.type || '未知');
    const byPattern = {};
    for (const a of all) {
      for (const pat of extractPatterns(a)) {
        if (!byPattern[pat]) byPattern[pat] = [];
        byPattern[pat].push(a);
      }
    }

    window.MuseumData = {
      artifacts: all,
      byEra,
      bySite,
      byMuseum,
      byForm,
      byPattern,
      get(id) { return all.find(a => a.id === id) || null; },
      collected: MOCK_COLLECTED_IDS,
      isCollected(id) { return MOCK_COLLECTED_IDS.has(id); },
      /**
       * getPhotoUrl(id) — returns the best available image URL for an artifact.
       * Priority: direct_url (Wikimedia thumb) > local_path > null.
       * Pass basePath (e.g. '../../') when resolving local_path relatively.
       */
      getPhotoUrl(id, basePath) {
        const rec = this.get(id);
        if (!rec) return null;
        const img = rec.image_urls && rec.image_urls[0];
        if (!img) return null;
        if (img.direct_url) return img.direct_url;
        if (img.local_path) return (basePath || '') + img.local_path;
        return null;
      },
      eraStats() {
        return Object.entries(byEra).map(([era, arts]) => ({
          era,
          total: arts.length,
          collected: arts.filter(a => MOCK_COLLECTED_IDS.has(a.id)).length,
        }));
      },
    };

    // Fire ready event
    document.dispatchEvent(new CustomEvent('museum-data-ready', { detail: { count: all.length } }));
    console.log(`[MuseumData] Loaded ${all.length} artifacts`);
    return window.MuseumData;
  }

  // Auto-load on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAll);
  } else {
    loadAll();
  }

})();
