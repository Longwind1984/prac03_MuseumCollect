/**
 * data.js — Shared data + user state for Persona A (Textual Researcher).
 * Loads bronze-treasures-v1.json via fetch, attaches helpers.
 *
 * User-state is HARDCODED for demo: user has collected 9 of 25 artifacts,
 * weighted toward 商晚期 + 西周早期 (matches researcher persona's likely focus).
 */
(function (global) {
  'use strict';

  // === Hardcoded user state ===
  // The 9 collected artifact ids represent ~36% completion, heavy on 商晚 + 西周早
  // (consistent with a 商周青铜器 researcher's bias toward the 鼎簋 corpus).
  const COLLECTED_IDS = [
    'houmuwu_ding',         // 商晚 · 国宝
    'fuhao_xiaozun',        // 商晚 · 国宝
    'siyang_fangzun',       // 商晚 · 国宝
    'da_yu_ding',           // 西周早 · 国宝
    'li_gui',               // 西周早 · 国宝
    'he_zun',               // 西周早 · 国宝(禁止出境)
    'maogong_ding',         // 西周晚 · 国宝
    'sanxingdui_zongmu_mianju', // 商晚(古蜀)· 国宝
    'lianhe_fanghu',        // 春秋 · 国宝
  ];

  // Recognized 金文 characters (drives the 段位 system)
  // 187 unique chars: this puts the user at 二段 (50-149 → just into 三段 territory)
  // Per spec: 入门 0-9 / 一段 10-49 / 二段 50-149 / 三段 150-399 / 鉴师 400-999 / 大宗师 1000+
  const RECOGNIZED_CHARS_SAMPLE = [
    '王', '若', '曰', '父', '文', '武', '受', '命', '匍', '有',
    '亖', '方', '畯', '正', '万', '邦', '丕', '显', '在', '下',
    '伯', '克', '盂', '其', '惟', '甲', '子', '朝', '岁', '鼎',
    '克', '昏', '夙', '夕', '召', '我', '一', '人', '雝', '我',
    '邦', '我', '家', '勿', '废', '朕', '令', '亡', '不', '闲',
    '惟', '余', '小', '子', '亡', '康', '昼', '夜', '巠', '雝',
    '光', '亯', '皇', '帝', '宅', '兹', '中', '国', '自', '兹',
    '乂', '民', '诞', '尊', '册', '彝', '亯', '于', '宗', '室',
    '佳', '十', '又', '九', '年', '王', '初', '叚', '于', '成',
    '周', '玟', '德', '禋', '王', '诞', '武', '王', '克', '商'
  ];
  const UNIQUE_RECOGNIZED_CHARS = Array.from(new Set(RECOGNIZED_CHARS_SAMPLE));
  // 187 characters total recognised (pad with synthetic count → 二段)
  const RECOGNIZED_CHAR_COUNT = 187;

  // Curated 金文 mini-dictionary, used for inscription hover (subset).
  // In real product this is hand-curated; here we cover key chars from data
  // sources (毛公鼎 / 大盂鼎 / 何尊 / 利簋 / 散氏盘).
  const JINWEN_DICT = {
    '王': { pinyin: 'wáng', meaning: '君王、天子', original: '玉斧形, 象征王权', appearances: ['毛公鼎', '大盂鼎', '何尊'], source: '《说文》: 三者, 天地人也, 而参通之者王也。' },
    '若': { pinyin: 'ruò', meaning: '顺从、如此', original: '人跪举手梳发形', appearances: ['毛公鼎'], source: '《集成》2841' },
    '曰': { pinyin: 'yuē', meaning: '说道', original: '口出气形', appearances: ['毛公鼎', '大盂鼎'], source: '《说文》: 词也, 从口乙声' },
    '父': { pinyin: 'fù', meaning: '父亲, 此指祖先', original: '手持斧形', appearances: ['毛公鼎', '大盂鼎'], source: '甲骨文已有, 见《合集》6571' },
    '不': { pinyin: 'bù', meaning: '不(否定副词); 或读为"丕"(大)', original: '花蒂下垂形', appearances: ['毛公鼎', '大盂鼎'], source: '于省吾《释丕》' },
    '显': { pinyin: 'xiǎn', meaning: '显赫、光明', original: '日下系丝形', appearances: ['毛公鼎', '何尊'], source: '《集成》2841' },
    '文': { pinyin: 'wén', meaning: '此指文王', original: '人胸有纹身形', appearances: ['毛公鼎', '大盂鼎', '何尊'], source: '《说文》: 错画也, 象交文' },
    '武': { pinyin: 'wǔ', meaning: '此指武王', original: '止戈, 一说"止戈为武"', appearances: ['毛公鼎', '大盂鼎', '何尊'], source: '《左传·宣公十二年》' },
    '宅': { pinyin: 'zhái', meaning: '居住、定都', original: '宀(屋)下乇声', appearances: ['何尊'], source: '《何尊铭文新释》李学勤 1975' },
    '兹': { pinyin: 'zī', meaning: '此、这里', original: '丝形重叠', appearances: ['何尊'], source: '《何尊》122字' },
    '中': { pinyin: 'zhōng', meaning: '中央; 此与"国"连用为"中国"最早出处', original: '旗杆中插象征中央', appearances: ['何尊'], source: '何尊"宅兹中国"·李学勤 1975' },
    '国': { pinyin: 'guó', meaning: '邦国; 此处指"成周(洛邑)"地区', original: '口(疆域)中加戈守卫', appearances: ['何尊'], source: '何尊"宅兹中国"' },
    '甲': { pinyin: 'jiǎ', meaning: '天干第一', original: '十字交叉形', appearances: ['利簋'], source: '利簋"甲子朝"' },
    '子': { pinyin: 'zǐ', meaning: '地支第一; 此为时辰', original: '婴孩形', appearances: ['利簋', '子龙鼎'], source: '甲骨已见' },
    '朝': { pinyin: 'zhāo', meaning: '清晨', original: '日月并出形', appearances: ['利簋'], source: '利簋"甲子朝, 岁鼎"' },
    '岁': { pinyin: 'suì', meaning: '木星(岁星)', original: '斧钺形, 引申为天象周期', appearances: ['利簋'], source: '夏商周断代工程依此定年 BC 1046' },
    '匍': { pinyin: 'pú', meaning: '抚定、安抚', original: '匍匐形声字', appearances: ['毛公鼎'], source: '《毛公鼎》"匍有亖方"' },
    '克': { pinyin: 'kè', meaning: '能、战胜; 大克鼎器主名', original: '人荷重形', appearances: ['大克鼎', '何尊'], source: '《集成》2836' },
    '盂': { pinyin: 'yú', meaning: '大盂鼎器主名(西周早期将领)', original: '盛食器形', appearances: ['大盂鼎'], source: '《集成》2837' },
  };

  // Site coordinates for ancient-map (relative SVG units)
  // Coords are simplified mock — designed for the SVG map proportions used in ancient-map.html
  const SITE_COORDS = {
    '殷墟':       { x: 555, y: 290, name_full: '殷墟 · 河南安阳', state: '商' },
    '周原':       { x: 360, y: 320, name_full: '周原 · 陕西宝鸡岐山', state: '周' },
    '丰镐':       { x: 380, y: 350, name_full: '丰镐 · 陕西西安', state: '周' },
    '二里头':     { x: 510, y: 330, name_full: '二里头 · 河南偃师', state: '夏(?)' },
    '三星堆':     { x: 290, y: 460, name_full: '三星堆 · 四川广汉', state: '古蜀' },
    '盘龙城':     { x: 540, y: 470, name_full: '盘龙城 · 湖北黄陂', state: '商方国' },
    '随州':       { x: 540, y: 460, name_full: '曾国 · 湖北随州', state: '曾(随)' },
    '宁乡':       { x: 510, y: 520, name_full: '宁乡 · 湖南宁乡', state: '商方国(湘江)' },
    '灵石':       { x: 470, y: 290, name_full: '灵石 · 山西灵石', state: '商方国(丙)' },
    '满城':       { x: 580, y: 250, name_full: '满城 · 河北中山国', state: '西汉' },
    '武威':       { x: 200, y: 270, name_full: '雷台 · 甘肃武威', state: '东汉' },
    '临潼':       { x: 395, y: 345, name_full: '临潼 · 陕西', state: '秦' },
    '新郑':       { x: 525, y: 350, name_full: '新郑 · 河南郑国', state: '郑' },
    '江陵':       { x: 510, y: 480, name_full: '江陵 · 湖北楚国', state: '楚' },
  };

  // Map artifact → site key
  const SITE_FOR_ARTIFACT = {
    'houmuwu_ding': '殷墟',
    'fuhao_xiaozun': '殷墟',
    'siyang_fangzun': '宁乡',
    'siyangshou_bu': '宁乡',
    'da_yu_ding': '周原',
    'da_ke_ding': '周原',
    'maogong_ding': '周原',
    'sanshi_pan': '周原',
    'he_zun': '周原',
    'guoji_zibai_pan': '周原',
    'li_gui': '临潼',
    'lianhe_fanghu': '新郑',
    'yuewang_goujian_jian': '江陵',
    'zenghouyi_bianzhong': '随州',
    'zenghouyi_zunpan': '随州',
    'sanxingdui_dali_ren': '三星堆',
    'sanxingdui_zongmu_mianju': '三星堆',
    'sanxingdui_shenshu': '三星堆',
    'zilong_ding': '殷墟',
    'longxing_gong': '灵石',
    'cuojin_boshanlu': '满城',
    'changxin_gongdeng': '满城',
    'matafeiyan': '武威',
    'qin_tongchema': '临潼',
    'shangyang_fangsheng': '周原',
  };

  // Dynasty year ranges (BC negative). Used by time-pillar for proportional heights.
  const DYNASTY_RANGES = [
    { key: '夏',     label: '夏',         start: -1750, end: -1600, periods: ['二里头一期', '二里头二期', '二里头三期', '二里头四期'] },
    { key: '商',     label: '商',         start: -1600, end: -1046, periods: ['商代早期', '商代中期', '商代晚期'] },
    { key: '西周',   label: '西周',       start: -1046, end:  -771, periods: ['西周早期', '西周中期', '西周晚期'] },
    { key: '春秋',   label: '春秋',       start:  -771, end:  -476, periods: ['春秋早期', '春秋中期', '春秋晚期'] },
    { key: '战国',   label: '战国',       start:  -476, end:  -221, periods: ['战国早期', '战国中期', '战国晚期'] },
    { key: '秦',     label: '秦',         start:  -221, end:  -206, periods: ['秦代'] },
    { key: '西汉',   label: '西汉',       start:  -206, end:     9, periods: ['西汉前期', '西汉中期', '西汉后期'] },
    { key: '东汉',   label: '东汉',       start:    25, end:   220, periods: ['东汉早期', '东汉中期', '东汉晚期'] },
  ];

  // Major historical events (for time-pillar right margin)
  const DYNASTY_EVENTS = [
    { year: -1046, label: '牧野之战 · 武王伐纣', source: '利簋"甲子朝, 岁鼎"' },
    { year:  -771, label: '平王东迁', source: '《竹书纪年》' },
    { year:  -476, label: '三家分晋', source: '《史记·赵世家》' },
    { year:  -221, label: '秦统一六国', source: '《史记·秦始皇本纪》' },
    { year:  -206, label: '汉立国', source: '《史记·高祖本纪》' },
  ];

  // Pattern evolution graph (curated, with simplified citations).
  // Each node has (id, label, era, family, refs[]); each edge represents 演化 transition.
  const PATTERN_NODES = [
    // 底纹
    { id: 'xianwen', label: '弦纹', era: -1600, family: '底纹', cite: '马承源 1988', x: 80, y: 540 },
    { id: 'yunlei', label: '云雷纹', era: -1300, family: '底纹', cite: '商周通用底纹', x: 240, y: 540 },
    // 神兽
    { id: 'simple_taotie', label: '简化兽面', era: -1500, family: '神兽', cite: '商早期', x: 130, y: 200 },
    { id: 'taotie', label: '饕餮纹', era: -1300, family: '神兽', cite: '李学勤《商周青铜器纹饰》P.234', x: 290, y: 200 },
    { id: 'kuilong', label: '夔龙纹', era: -1250, family: '神兽', cite: '容庚《商周彝器通考》', x: 290, y: 280 },
    { id: 'guishou_kuilong', label: '顾首夔龙', era: -1000, family: '神兽', cite: '西周早, 大盂鼎', x: 460, y: 240 },
    { id: 'fengniao', label: '凤鸟纹', era: -950, family: '写实', cite: '西周中期主纹', x: 540, y: 130 },
    { id: 'qiequ', label: '窃曲纹', era: -850, family: '抽象', cite: '由夔龙抽象化, 见虢季子白盘', x: 620, y: 280 },
    { id: 'chonghuan', label: '重环纹', era: -800, family: '抽象', cite: '毛公鼎主纹', x: 720, y: 280 },
    { id: 'panchi', label: '蟠螭纹', era: -550, family: '抽象', cite: '春秋战国流行', x: 820, y: 230 },
    { id: 'panhui', label: '蟠虺纹', era: -450, family: '抽象', cite: '战国早期', x: 870, y: 310 },
    // 写实
    { id: 'niaowen', label: '鸟纹', era: -1200, family: '写实', cite: '商晚期', x: 380, y: 100 },
    { id: 'chanwen', label: '蝉纹', era: -1100, family: '写实', cite: '商晚-西周早', x: 460, y: 90 },
    { id: 'huwen', label: '虎噬人头纹', era: -1250, family: '写实', cite: '稀有, 后母戊鼎/虎食人卣', x: 220, y: 340, rare: true },
    { id: 'xiaowen', label: '鸱鸮纹', era: -1250, family: '写实', cite: '稀有, 妇好系', x: 350, y: 360, rare: true },
    { id: 'lianban', label: '莲瓣纹', era: -550, family: '写实', cite: '春秋, 莲鹤方壶', x: 770, y: 130 },
    // 几何
    { id: 'huandai', label: '波曲纹(环带纹)', era: -800, family: '抽象', cite: '大克鼎, 虢季子白盘', x: 720, y: 380 },
    // 战国汉
    { id: 'yunqi', label: '云气纹', era: -200, family: '汉风', cite: '汉, 错金博山炉', x: 920, y: 460 },
  ];

  const PATTERN_EDGES = [
    ['xianwen', 'yunlei'],
    ['simple_taotie', 'taotie'],
    ['taotie', 'kuilong'],
    ['taotie', 'guishou_kuilong'],
    ['kuilong', 'guishou_kuilong'],
    ['guishou_kuilong', 'qiequ'],
    ['qiequ', 'chonghuan'],
    ['chonghuan', 'panchi'],
    ['panchi', 'panhui'],
    ['niaowen', 'fengniao'],
    ['chanwen', 'fengniao'],
    ['qiequ', 'huandai'],
    ['huandai', 'panhui'],
    ['panhui', 'yunqi'],
  ];

  // Form genealogy (vessel taxonomy), used for catalog 形制 view + form-genealogy aside.
  const FORM_TREE = {
    炊器: { 鼎: ['圆鼎', '方鼎', '扁足鼎'], 鬲: [], 甗: [] },
    食器: { 簋: ['簋(有方座)'], 盨: [], 豆: [] },
    酒器: { 尊: ['鸟兽形尊(鸮形)', '方尊', '尊(圆口方腹)', '尊盘组合(尊置盘中)'], 觚: [], 爵: [], 卣: [], 觥: ['觥(龙形,似船型)'], 壶: ['方壶(双莲瓣盖,顶立鹤)'], 瓿: ['瓿(肩部四羊首装饰)'] },
    水器: { 盘: ['盘', '长方形盘'], 匜: [], 鉴: [] },
    乐器: { 钟: ['编钟(钮钟+甬钟+镈钟共65件)'] },
    兵器: { 剑: ['剑(青铜剑)'], 戈: [], 矛: [] },
    杂器: { 灯: ['宫女执灯'], 熏炉: ['博山形熏炉'], 车马: ['铜车马(一号立车 + 二号安车,共两乘)'], 度量衡: ['方升(长方形量器)'], 立人: ['立体铜人立像(连座)'], 面具: ['立体面具(双眼柱状外凸,大耳上扬)'], 神树: ['立体青铜神树(三层九枝,九鸟二十七果,一龙沿干而下)'], 雕塑: ['立体铜奔马雕塑'] },
  };

  // Helpers
  function approxStartYear(approx) {
    if (!approx) return 0;
    const m = String(approx).match(/(\d+)/g);
    if (!m) return 0;
    const n = parseInt(m[0], 10);
    return /BC|前/.test(approx) || /公元前/.test(approx) ? -n : n;
  }

  function isCollected(id) { return COLLECTED_IDS.indexOf(id) >= 0; }

  function rarityTier(level) {
    if (!level) return 'common';
    if (level.indexOf('禁止出境') >= 0) return 'treasure-forbidden';
    if (level.indexOf('国宝') >= 0) return 'treasure';
    if (level.indexOf('一级') >= 0) return 'tier-1';
    if (level.indexOf('二级') >= 0) return 'tier-2';
    if (level.indexOf('三级') >= 0) return 'tier-3';
    return 'common';
  }

  function tierLabel(level) {
    if (!level) return '未定级';
    if (level.indexOf('禁止出境') >= 0) return '禁止出境 · 国宝';
    if (level.indexOf('国宝') >= 0) return '国宝';
    if (level.indexOf('一级') >= 0) return '一级';
    if (level.indexOf('二级') >= 0) return '二级';
    if (level.indexOf('三级') >= 0) return '三级';
    return level;
  }

  function rarityTags(a) {
    const tags = [];
    if (a.rarity_level && a.rarity_level.indexOf('禁止出境') >= 0) tags.push('禁');
    if (a.inscription && a.inscription.char_count >= 100) tags.push('长铭');
    if (a.current_museum && a.current_museum.indexOf('台北') >= 0) tags.push('迁台');
    if (a.ancient_state && a.ancient_state.indexOf('蜀') >= 0) tags.push('蜀');
    return tags;
  }

  // === Catalog state container ===
  const state = {
    catalog: null,
    catalogById: null,
    ready: null,
  };

  const CATALOG_PATHS = [
    '../data/curated/bronze-treasures-v1.json',
    '../../data/curated/bronze-treasures-v1.json',
    'data/curated/bronze-treasures-v1.json',
    '/data/curated/bronze-treasures-v1.json',
  ];

  async function loadCatalog() {
    for (const path of CATALOG_PATHS) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          state.catalog = await res.json();
          state.catalogById = Object.fromEntries(state.catalog.map(a => [a.id, a]));
          return;
        }
      } catch (e) { /* try next */ }
    }
    console.error('[museumA-data] could not load catalog from any candidate path', CATALOG_PATHS);
    throw new Error('catalog load failed');
  }

  state.ready = loadCatalog();

  // === Public API ===
  global.MuseumA = {
    ready: state.ready,
    get catalog() { return state.catalog; },
    get catalogById() { return state.catalogById; },
    user: {
      name: '陈翊安',
      affiliation: '北京大学 考古文博学院',
      passport_id: '甲编 · No.00837',
      collected_ids: COLLECTED_IDS,
      recognized_chars: UNIQUE_RECOGNIZED_CHARS,
      recognized_char_count: RECOGNIZED_CHAR_COUNT,
      notes_chars: 12350,
    },
    DYNASTY_RANGES,
    DYNASTY_EVENTS,
    PATTERN_NODES,
    PATTERN_EDGES,
    JINWEN_DICT,
    SITE_COORDS,
    SITE_FOR_ARTIFACT,
    FORM_TREE,
    isCollected,
    rarityTier,
    tierLabel,
    rarityTags,
    approxStartYear,
    // Derived metrics
    dynastyStats() {
      const out = {};
      for (const d of DYNASTY_RANGES) out[d.key] = { pool: 0, collected: 0, items: [] };
      for (const a of state.catalog) {
        const d = a.dynasty || '';
        if (out[d]) {
          out[d].pool++;
          if (isCollected(a.id)) out[d].collected++;
          out[d].items.push(a);
        }
      }
      return out;
    },
    siteStats() {
      const out = {};
      for (const a of state.catalog) {
        const s = SITE_FOR_ARTIFACT[a.id];
        if (!s) continue;
        if (!out[s]) out[s] = { pool: 0, collected: 0, items: [] };
        out[s].pool++;
        out[s].items.push(a);
        if (isCollected(a.id)) out[s].collected++;
      }
      return out;
    },
    patternStats() {
      // pattern label -> [{artifact, recognized}]
      const out = {};
      for (const a of state.catalog) {
        for (const p of (a.patterns || [])) {
          if (!out[p]) out[p] = { pool: 0, collected: 0, items: [] };
          out[p].pool++;
          out[p].items.push(a);
          if (isCollected(a.id)) out[p].collected++;
        }
      }
      return out;
    },
    inscriptionRank() {
      const c = RECOGNIZED_CHAR_COUNT;
      if (c >= 1000) return { rank: '大宗师', next: null, pct: 100, lower: 1000 };
      if (c >= 400)  return { rank: '鉴师', next: '大宗师', pct: (c-400)/(1000-400)*100, lower: 400, upper: 1000 };
      if (c >= 150)  return { rank: '三段', next: '鉴师', pct: (c-150)/(400-150)*100, lower: 150, upper: 400 };
      if (c >= 50)   return { rank: '二段', next: '三段', pct: (c-50)/(150-50)*100, lower: 50, upper: 150 };
      if (c >= 10)   return { rank: '一段', next: '二段', pct: (c-10)/(50-10)*100, lower: 10, upper: 50 };
      return { rank: '入门', next: '一段', pct: c/10*100, lower: 0, upper: 10 };
    },
  };

})(typeof window !== 'undefined' ? window : globalThis);
