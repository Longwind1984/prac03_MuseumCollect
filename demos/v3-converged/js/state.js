/**
 * state.js — Collection state manager for MuseumCollect v3
 * Mock: 35 of 277 artifacts collected
 */

(function() {
  'use strict';

  const COLLECTED_IDS = new Set([
    'houmuwu_ding', 'simuwu_ding', 'fuhao_owl_zun', 'siyang_fang_zun', 'zilong_ding',
    'da_yu_ding', 'he_zun', 'li_gui', 'mao_gong_ding', 'da_ke_ding',
    'san_shi_pan', 'xu_ji_zi_bai_pan', 'da_sheng_pan', 'guoji_zibo_pan',
    'lian_he_fang_hu', 'yuewang_goujian_jian', 'zeng_houyi_bianzhong', 'zeng_houyi_zunpan',
    'shangguo_fang_sheng', 'shang_yang_fang_sheng',
    'cuo_jin_boshanluo', 'changxin_gonglamp',
    'sanxingdui_bronze_standfigure', 'sanxingdui_zongmu_mask',
    'met_he_ding', 'british_fang_yi',
    'erlitou_tong_jue', 'panlongcheng_fang_ding',
    'zhongshan_wang_ding', 'yuewang_zhouji_jian',
    'chu_wang_ding', 'jin_hou_su_bian',
    'ban_gui', 'ling_fang_yi', 'nangong_hu'
  ]);

  // Collection metadata keyed by id
  const COLLECTION_META = {
    'houmuwu_ding': { dynasty: '商', form: '方鼎', date_collected: '2026-01-10', rarity: '国宝' },
    'fuhao_owl_zun': { dynasty: '商', form: '鸮尊', date_collected: '2026-01-15', rarity: '国宝' },
    'siyang_fang_zun': { dynasty: '商', form: '方尊', date_collected: '2026-02-01', rarity: '国宝' },
    'he_zun': { dynasty: '西周', form: '尊', date_collected: '2026-02-08', rarity: '国宝' },
    'mao_gong_ding': { dynasty: '西周', form: '圆鼎', date_collected: '2026-02-20', rarity: '国宝' },
    'zeng_houyi_bianzhong': { dynasty: '战国', form: '编钟', date_collected: '2026-03-05', rarity: '国宝' },
    'yuewang_goujian_jian': { dynasty: '春秋', form: '剑', date_collected: '2026-03-12', rarity: '国宝' },
    'changxin_gonglamp': { dynasty: '西汉', form: '灯', date_collected: '2026-04-01', rarity: '国宝' },
    'sanxingdui_bronze_standfigure': { dynasty: '商', form: '立人像', date_collected: '2026-04-15', rarity: '国宝' },
  };

  // Per-dynasty collected counts (used before data loads)
  const ERA_COUNTS = {
    '夏': 1, '商': 10, '西周': 8, '春秋': 4, '战国': 5, '秦': 2, '西汉': 3, '东汉': 2
  };

  window.CollectionState = {
    collected: COLLECTED_IDS,
    meta: COLLECTION_META,
    eraCounts: ERA_COUNTS,
    total: COLLECTED_IDS.size,
    maxTotal: 277,

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
