/* ============================================================
   state.js — Shared mock state for Persona C demo
   - Loads bronze-treasures-v1.json
   - Hardcodes "user阿K" mock collection (7 of 25)
   - Computes rank/segments/progress on the fly
   - Provides helpers: rarityTier(), rarityHaloClass(), memeFor(), etc.
   ============================================================ */

window.MC = (function () {
  'use strict';

  // ---- Mock user collection (7 of ~25 — feels like Week 2 阿K) ----
  // Mix: 3 国宝 (含 1 三星堆 + 1 妇好系), 4 less famous to leave many silhouettes
  const COLLECTED_IDS = [
    'houmuwu_ding',          // 国宝 · 商 · 国博 · 方鼎
    'siyang_fangzun',        // 国宝 · 商 · 国博 · 方尊
    'fuhao_xiaozun',         // 国宝 · 商 · 妇好墓 · 鸮形尊
    'sanxingdui_zongmu_mianju', // 国宝 · 商 · 三星堆 · 古蜀
    'lianhe_fanghu',         // 国宝 · 春秋 · 故宫
    'he_zun',                // 国宝 · 西周 · 宝鸡 · 含"中国"二字
    'changxin_gongdeng',     // 国宝 · 西汉 · 河北
  ];

  const COLLECTED_DATES = {
    'houmuwu_ding':            '2026-04-18',
    'siyang_fangzun':          '2026-04-21',
    'fuhao_xiaozun':           '2026-04-29',
    'sanxingdui_zongmu_mianju':'2026-05-03',
    'lianhe_fanghu':           '2026-05-08',
    'he_zun':                  '2026-05-13',
    'changxin_gongdeng':       '2026-05-19',
  };

  // ---- Rarity ----
  function rarityTier(a) {
    const r = (a && a.rarity_level) || '';
    if (r.includes('禁止出境')) return 'treasure';
    if (r.includes('国宝')) return 'treasure';
    if (r.includes('一级')) return 'tier-1';
    if (r.includes('二级')) return 'tier-2';
    if (r.includes('三级')) return 'tier-3';
    return 'common';
  }

  function rarityHaloClass(a) {
    const t = rarityTier(a);
    if (t === 'treasure') return 'rarity-treasure';
    return 'rarity-' + t;
  }

  function rarityDisplayName(a) {
    const t = rarityTier(a);
    return {
      'treasure': '国宝',
      'tier-1':   '一级文物',
      'tier-2':   '二级文物',
      'tier-3':   '三级文物',
      'common':   '普通',
    }[t];
  }

  // ---- Memes for share cards (阿K voice) ----
  const MEMES = {
    'houmuwu_ding':            '我比国博还早 set up 这个 boss',
    'siyang_fangzun':          '这把四只羊角…真·四面玲珑',
    'fuhao_xiaozun':           '商朝的女将军做的鸟兽尊,3000 年前的潮玩',
    'sanxingdui_zongmu_mianju':'凸瞳 16cm,这造型可以直接 cos',
    'lianhe_fanghu':           '春秋的"立鹤方壶",我严重怀疑这是青铜潮玩的祖宗',
    'he_zun':                  '"宅兹中国"四个字最早的爸爸,被废铜站当 30 块卖过',
    'changxin_gongdeng':       '汉代环保灯,腹里贮水溶烟尘 — 真·绿色生活',
    'da_yu_ding':              '291 字铭文 = 商鉴亡国,周天子的小作文',
    'maogong_ding':            '500 字铭文,抵得一篇《尚书》,西周最长 essay',
    'zenghouyi_bianzhong':     '65 件套 4421kg,公元前 5 世纪的 BGM',
    'yuewang_goujian_jian':    '埋 2400 年还能割纸,这是青铜还是 stainless steel?',
    'matafeiyan':              '一只蹄子撑全身,东汉力学教科书',
    'sanxingdui_dali_ren':     '2.62 米,世界最早 cosplay 神巫',
    'sanxingdui_shenshu':      '3.96 米,九鸟二十七果,《山海经》的扶桑实锤',
    'qin_tongchema':           '秦皇的座驾,1/2 真车马,2300kg',
  };

  function memeFor(id, fallback) {
    return MEMES[id] || fallback || '收藏 +1';
  }

  // ---- Excavation sites — map points (古地图) ----
  // Approx positions in our SVG viewBox 1000x700 (China-like simplified)
  const SITES = [
    { key: '殷墟',         x: 588, y: 295, label: '殷墟 (河南安阳)',        culture: '商' },
    { key: '周原',         x: 458, y: 332, label: '周原 (陕西宝鸡)',         culture: '西周' },
    { key: '宝鸡',         x: 458, y: 332, alias: '周原' },
    { key: '丰镐',         x: 478, y: 345, label: '丰镐 (陕西西安)',         culture: '西周' },
    { key: '二里头',       x: 558, y: 325, label: '二里头 (河南洛阳)',       culture: '夏/商' },
    { key: '三星堆',       x: 350, y: 430, label: '三星堆 (四川广汉)',       culture: '古蜀' },
    { key: '殷墟妇好墓',   x: 588, y: 295, alias: '殷墟' },
    { key: '宝鸡贾村塬',   x: 458, y: 332, alias: '周原' },
    { key: '随州',         x: 575, y: 430, label: '曾国 (湖北随州)',          culture: '战国' },
    { key: '江陵',         x: 555, y: 458, label: '楚 (湖北江陵)',            culture: '春秋战国' },
    { key: '满城',         x: 610, y: 235, label: '中山国 (河北满城)',        culture: '西汉' },
    { key: '武威',         x: 295, y: 240, label: '雷台汉墓 (甘肃武威)',      culture: '东汉' },
    { key: '临潼',         x: 478, y: 348, label: '秦始皇陵 (陕西临潼)',      culture: '秦' },
    { key: '宁乡',         x: 540, y: 485, label: '宁乡 (湖南)',              culture: '商' },
    { key: '灵石',         x: 510, y: 275, label: '灵石 (山西)',              culture: '商' },
    { key: '凤翔',         x: 445, y: 340, label: '凤翔 (陕西宝鸡)',          culture: '战国/秦' },
    { key: '辉县',         x: 575, y: 295, label: '辉县 (河南)',              culture: '商' },
    { key: '新郑',         x: 580, y: 310, label: '新郑 (河南)',              culture: '春秋郑' },
    { key: '岐山',         x: 462, y: 330, label: '岐山 (陕西)',              culture: '西周' },
    { key: '扶风',         x: 462, y: 332, label: '扶风 (陕西)',              culture: '西周' },
    { key: '临洁_别', x: 0, y: 0, alias: null },
  ];

  function siteForArtifact(a) {
    const site = (a.excavation_site || '');
    for (const s of SITES) {
      if (s.alias) continue;
      if (site.includes(s.key)) return s;
    }
    return null;
  }

  // ---- Form genealogy tree (hand-curated) ----
  const GENEALOGY = {
    name: '青铜礼器',
    children: [
      {
        name: '食器', kind: 'category',
        children: [
          { name: '鼎', kind: 'type', children: [
            { name: '方鼎', kind: 'subtype', members: ['houmuwu_ding'] },
            { name: '圆鼎', kind: 'subtype', members: ['da_yu_ding', 'da_ke_ding', 'maogong_ding', 'zilong_ding'] },
            { name: '扁足鼎', kind: 'subtype', members: [] },
          ]},
          { name: '簋', kind: 'type', children: [
            { name: '方座簋', kind: 'subtype', members: ['li_gui'] },
            // 注: 簋 还有四耳簋、附耳簋 等常见子型;此 v1 demo 仅收 1 件方座簋
            { name: '四耳簋', kind: 'subtype', members: [] },
            { name: '附耳簋', kind: 'subtype', members: [] },
          ]},
        ],
      },
      {
        name: '酒器', kind: 'category',
        children: [
          { name: '尊', kind: 'type', children: [
            { name: '方尊', kind: 'subtype', members: ['siyang_fangzun'] },
            { name: '鸟兽形尊', kind: 'subtype', members: ['fuhao_xiaozun'] },
            { name: '方腹尊', kind: 'subtype', members: ['he_zun'] },
            // 尊盘组合 = "尊置于盘中" 的复合器(尊作主器,盘作承器)
            // 学术上不是独立器型,这里作为"尊"的复合子型展示
            { name: '尊盘组合(复合器)', kind: 'subtype', composite: true, members: ['zenghouyi_zunpan'], rare: true, note: '尊置于盘中,曾侯乙尊盘为代表;盘亦在水器维度参见' },
          ]},
          { name: '壶', kind: 'type', children: [
            { name: '方壶', kind: 'subtype', members: ['lianhe_fanghu'] },
          ]},
          { name: '瓿', kind: 'type', children: [
            { name: '羊首瓿', kind: 'subtype', members: ['siyangshou_bu'] },
          ]},
          { name: '觥', kind: 'type', children: [
            { name: '龙形觥', kind: 'subtype', members: ['longxing_gong'], rare: true },
          ]},
        ],
      },
      {
        name: '水器', kind: 'category',
        children: [
          { name: '盘', kind: 'type', children: [
            { name: '圆盘', kind: 'subtype', members: ['sanshi_pan'] },
            { name: '长方盘', kind: 'subtype', members: ['guoji_zibai_pan'] },
          ]},
        ],
      },
      {
        name: '乐器', kind: 'category',
        children: [
          { name: '编钟', kind: 'type', children: [
            { name: '甬钟+钮钟+镈钟', kind: 'subtype', members: ['zenghouyi_bianzhong'] },
          ]},
        ],
      },
      {
        name: '兵器', kind: 'category',
        children: [
          { name: '剑', kind: 'type', children: [
            { name: '青铜剑', kind: 'subtype', members: ['yuewang_goujian_jian'] },
          ]},
        ],
      },
      {
        name: '杂器', kind: 'category',
        children: [
          { name: '熏炉', kind: 'type', children: [
            { name: '博山形', kind: 'subtype', members: ['cuojin_boshanlu'] },
          ]},
          { name: '灯', kind: 'type', children: [
            { name: '宫女灯', kind: 'subtype', members: ['changxin_gongdeng'] },
          ]},
          { name: '雕塑', kind: 'type', children: [
            { name: '铜奔马', kind: 'subtype', members: ['matafeiyan'] },
            { name: '立人/面具/神树', kind: 'subtype', members: ['sanxingdui_dali_ren', 'sanxingdui_zongmu_mianju', 'sanxingdui_shenshu'], rare: true },
          ]},
          { name: '车马器', kind: 'type', children: [
            { name: '陪葬车马', kind: 'subtype', members: ['qin_tongchema'] },
          ]},
          { name: '度量衡', kind: 'type', children: [
            { name: '方升', kind: 'subtype', members: ['shangyang_fangsheng'] },
          ]},
        ],
      },
    ],
  };

  // ---- 称号 (titles) — heuristic computed from collection ----
  function computeTitles(state) {
    const titles = [];
    const ids = state.collected_ids;
    const pats = state.catalog.filter(a => ids.includes(a.id));

    // 段位 — 铭文识字 mocked at 47 chars (real 2-段)
    const recognizedChars = 47;
    let rank = '入门';
    if (recognizedChars >= 1000) rank = '大宗师';
    else if (recognizedChars >= 400) rank = '鉴师';
    else if (recognizedChars >= 150) rank = '三段';
    else if (recognizedChars >= 50) rank = '二段';
    else if (recognizedChars >= 10) rank = '一段';
    titles.push({ kind: 'rank', label: '铭文识读·' + rank, seal: '叩', dan: rank });

    // 国宝率
    const treasureCount = pats.filter(a => rarityTier(a) === 'treasure').length;
    const treasureRate = pats.length ? Math.round(treasureCount / pats.length * 100) : 0;
    if (treasureCount >= 5) titles.push({ kind: 'treasure', label: '国宝学徒', seal: '宝' });

    // 三家朝圣者 — collected at least 3 of {殷墟, 三星堆, 周原, 妇好墓...}
    const ancientStates = new Set(pats.map(a => a.ancient_state).filter(Boolean));
    if (ancientStates.has('古蜀(三星堆文化)') && ancientStates.has('商')) {
      titles.push({ kind: 'cross', label: '二重文明见证者', seal: '双', dan: '殷+蜀' });
    }

    // 形制类 — count 鼎 / 尊
    const ding = pats.filter(a => a.form_subtype && a.form_subtype.includes('鼎')).length;
    if (ding >= 1) titles.push({ kind: 'form', label: '鼎类见习', seal: '鼎' });
    const zun = pats.filter(a => a.form_subtype && a.form_subtype.includes('尊')).length;
    if (zun >= 2) titles.push({ kind: 'form', label: '尊器收藏家', seal: '尊' });

    // 纹饰
    const patterns = new Set();
    pats.forEach(a => (a.patterns || []).forEach(p => patterns.add(p)));
    if (patterns.has('饕餮纹') && pats.filter(a => (a.patterns||[]).includes('饕餮纹')).length >= 3) {
      titles.push({ kind: 'pattern', label: '饕餮见习', seal: '饕' });
    }
    if (patterns.has('夔龙纹') && pats.filter(a => (a.patterns||[]).includes('夔龙纹')).length >= 3) {
      titles.push({ kind: 'pattern', label: '夔龙派', seal: '夔' });
    }

    return { titles, recognizedChars, treasureRate };
  }

  // ---- Catalog loader ----
  async function load() {
    if (window.MC._catalog) return window.MC._catalog;
    const candidates = [
      '../data/curated/bronze-treasures-v1.json',
      '../../data/curated/bronze-treasures-v1.json',
      './data/curated/bronze-treasures-v1.json',
      '/data/curated/bronze-treasures-v1.json',
    ];
    let data = null;
    for (const p of candidates) {
      try {
        const r = await fetch(p);
        if (r.ok) { data = await r.json(); break; }
      } catch (e) {}
    }
    if (!data) throw new Error('catalog load failed');
    window.MC._catalog = data;
    window.MC._byId = Object.fromEntries(data.map(a => [a.id, a]));
    return data;
  }

  // Image fallback — use a stylized SVG since wikipedia URLs are CC category pages
  // We use a colored gradient placeholder + 篆書 name. This keeps tone correct.
  function placeholderSvg(a) {
    const t = rarityTier(a);
    const palette = {
      'treasure': ['#d4a857', '#a4732c'],
      'tier-1':   ['#c9a85f', '#947a3d'],
      'tier-2':   ['#a575a5', '#754d75'],
      'tier-3':   ['#7d99b5', '#536b85'],
      'common':   ['#b5b1aa', '#857f74'],
    }[t];
    const txt = (a.name_zh || '').slice(0, 4);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="g_${a.id}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette[0]}" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${palette[1]}" stop-opacity="0.95"/>
        </linearGradient>
        <radialGradient id="lit_${a.id}" cx="0.3" cy="0.25" r="0.7">
          <stop offset="0%" stop-color="rgba(255,255,255,0.7)"/>
          <stop offset="40%" stop-color="rgba(255,255,255,0.1)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.3)"/>
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill="#f2ede3"/>
      <g transform="translate(100,120)">
        <ellipse rx="68" ry="84" fill="url(#g_${a.id})"/>
        <ellipse rx="68" ry="84" fill="url(#lit_${a.id})" opacity="0.8"/>
        <path d="M-50,-60 L50,-60 L40,-55 L-40,-55 Z" fill="${palette[1]}" opacity="0.6"/>
        <path d="M-58,40 Q0,55 58,40 L48,68 Q0,80 -48,68 Z" fill="${palette[1]}" opacity="0.4"/>
      </g>
      <text x="100" y="218" text-anchor="middle" font-family="STKaiti,KaiTi,serif" font-size="20" font-weight="700" fill="#3a2e1a" opacity="0.85">${txt}</text>
    </svg>`;
  }

  function placeholderUrl(a) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(placeholderSvg(a));
  }

  // ---- API ----
  return {
    COLLECTED_IDS,
    COLLECTED_DATES,
    SITES,
    GENEALOGY,
    MEMES,
    load,
    rarityTier,
    rarityHaloClass,
    rarityDisplayName,
    memeFor,
    siteForArtifact,
    computeTitles,
    placeholderUrl,
    placeholderSvg,
    isCollected: (id) => COLLECTED_IDS.includes(id),
    artifact: (id) => (window.MC._byId || {})[id] || null,
    catalog: () => window.MC._catalog || [],
  };
})();
