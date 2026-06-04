/**
 * constants.js — Single source of truth for IDs/colors/silhouettes used across
 * pages. Load BEFORE state.js / data-loader.js so they can reference it.
 *
 * Exposes window.MuseumConstants = { COLLECTED_IDS, COLLECTION_META,
 *   ERA_COUNTS, ERA_COLORS, FORM_SILHOUETTE_MAP, getSilhouette(form),
 *   SILHOUETTE_PATH }.
 */

(function() {
  'use strict';

  // 25 canonical IDs. v5 ③ fix: every id below is verified to exist in
  // data/curated/bronze-treasures-v3-segment-*.json (was 35 IDs with 28
  // typos/phantoms in state.js — me.html silently showed ~7 collected
  // because the rest didn't match any real record).
  const COLLECTED_IDS = new Set([
    // 商 (6)
    'houmuwu_ding', 'fuhao_xiaozun', 'siyang_fangzun', 'zilong_ding',
    'sanxingdui_dali_ren_v3', 'sanxingdui_zongmu_mianju_v3',
    // 西周 (10)
    'da_yu_ding', 'he_zun', 'li_gui', 'maogong_ding', 'da_ke_ding',
    'sanshi_pan', 'guoji_zibai_pan', 'jin_hou_su_bianzhong',
    'ban_gui', 'shi_ling_fang_yi',
    // 春秋 (2)
    'lianhe_fanghu', 'yuewang_goujian_jian',
    // 战国 (5)
    'zenghouyi_bianzhong', 'zenghouyi_zunpan', 'shangyang_fangsheng',
    'zhongshan_wang_cuo_ding', 'chu_wang_yanren_ding',
    // 西汉 (2)
    'cuojin_boshanlu_v3', 'changxin_gongdeng_v3',
  ]);

  const COLLECTION_META = {
    'houmuwu_ding':              { dynasty: '商',   form: '方鼎',   date_collected: '2026-01-10', rarity: '国宝' },
    'fuhao_xiaozun':             { dynasty: '商',   form: '鸮尊',   date_collected: '2026-01-15', rarity: '国宝' },
    'siyang_fangzun':            { dynasty: '商',   form: '方尊',   date_collected: '2026-02-01', rarity: '国宝' },
    'he_zun':                    { dynasty: '西周', form: '尊',     date_collected: '2026-02-08', rarity: '国宝' },
    'maogong_ding':              { dynasty: '西周', form: '圆鼎',   date_collected: '2026-02-20', rarity: '国宝' },
    'zenghouyi_bianzhong':       { dynasty: '战国', form: '编钟',   date_collected: '2026-03-05', rarity: '国宝' },
    'yuewang_goujian_jian':      { dynasty: '春秋', form: '剑',     date_collected: '2026-03-12', rarity: '国宝' },
    'changxin_gongdeng_v3':      { dynasty: '西汉', form: '灯',     date_collected: '2026-04-01', rarity: '国宝' },
    'sanxingdui_dali_ren_v3':    { dynasty: '商',   form: '立人像', date_collected: '2026-04-15', rarity: '国宝' },
  };

  // Per-era collected counts, derived from COLLECTED_IDS membership above.
  const ERA_COUNTS = {
    '夏': 0, '商': 6, '西周': 10, '春秋': 2, '战国': 5, '秦': 0, '西汉': 2, '东汉': 0,
  };

  // Era → swatch (cream-page palette). dashboard.html uses its own dark-theme
  // versions inline because they're tuned to the dark bg.
  const ERA_COLORS = {
    '夏':'#6e4a2e', '商':'#4a5a3a', '西周':'#a73a2a',
    '春秋':'#2a2a3a', '战国':'#7a3a2a', '秦':'#1a1a1a', '汉':'#b89046',
  };

  // form_subtype/type → silhouette slug under assets/silhouettes/<slug>.svg
  const FORM_SILHOUETTE_MAP = {
    '方鼎': 'fangding', '圆鼎': 'yuanding', '簋': 'gui',
    '尊': 'fang_zun', '方尊': 'fang_zun', '鸮尊': 'xiao_zun',
    '剑': 'yuewang_jian', '编钟': 'bianzhong',
    '灯': 'changxin_gongdeng', '壶': 'fanghu', '方壶': 'fanghu', '盘': 'pan',
    '人像': 'sanxingdui_dali_ren', '立人像': 'sanxingdui_dali_ren',
    '面具': 'sanxingdui_zongmu', '纵目面具': 'sanxingdui_zongmu',
  };

  const SILHOUETTE_PATH = '../../assets/silhouettes/';

  function getSilhouette(form) {
    return FORM_SILHOUETTE_MAP[form] || 'fangding';
  }

  window.MuseumConstants = {
    COLLECTED_IDS,
    COLLECTION_META,
    ERA_COUNTS,
    ERA_COLORS,
    FORM_SILHOUETTE_MAP,
    SILHOUETTE_PATH,
    getSilhouette,
  };
})();
