/**
 * state.js — Collection state manager for MuseumCollect v3
 * Mock: 25 of 275 artifacts collected. IDs/meta sourced from MuseumConstants.
 */

(function() {
  'use strict';

  if (!window.MuseumConstants) {
    console.error('[state.js] requires constants.js to be loaded first');
    return;
  }
  const { COLLECTED_IDS, COLLECTION_META, ERA_COUNTS } = window.MuseumConstants;

  window.CollectionState = {
    collected: COLLECTED_IDS,
    meta: COLLECTION_META,
    eraCounts: ERA_COUNTS,
    total: COLLECTED_IDS.size,
    maxTotal: 275,

    isCollected(id) { return COLLECTED_IDS.has(id); },

    collect(id, meta = {}) {
      COLLECTED_IDS.add(id);
      COLLECTION_META[id] = { date_collected: new Date().toISOString().slice(0,10), ...meta };
      const dynasty = meta.dynasty || '未知';
      if (ERA_COUNTS[dynasty]) ERA_COUNTS[dynasty]++;
      // Emit event
      document.dispatchEvent(new CustomEvent('artifact-collect', {
        detail: { artifact_id: id, dynasty, action: 'collect', triggered_by: 'state' }
      }));
      this.total = COLLECTED_IDS.size;
    },

    getEraProgress() {
      return Object.entries(ERA_COUNTS).map(([era, count]) => ({
        era, collected: count,
      }));
    },

    // Most collected form type
    dominantForm() {
      const counts = {};
      for (const [id, m] of Object.entries(COLLECTION_META)) {
        if (m.form) counts[m.form] = (counts[m.form] || 0) + 1;
      }
      return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0] || ['未知', 0];
    },

    // Implicit title derived from collection
    derivedTitle() {
      const [form, count] = this.dominantForm();
      if (count >= 5) return `${form}专家`;
      if (ERA_COUNTS['商'] >= 8) return '殷商考据者';
      if (ERA_COUNTS['西周'] >= 6) return '西周礼制研究者';
      return '青铜器初探者';
    },

    // Inscription rank
    inscriptionRank() {
      const chars = 85; // mock recognized character count
      if (chars < 50) return { label: '初窥', next: '入门', progress: chars/50 };
      if (chars < 150) return { label: '入门', next: '一段', progress: (chars-50)/100 };
      if (chars < 400) return { label: '一段', next: '二段', progress: (chars-150)/250 };
      return { label: '二段', next: '鉴师', progress: (chars-400)/600 };
    },
  };

  window.MuseumState = window.CollectionState; // alias
})();
