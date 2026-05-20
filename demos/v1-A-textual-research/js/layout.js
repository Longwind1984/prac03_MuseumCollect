/**
 * layout.js — Shared header/footer + citation tooltip + utility for Persona A.
 * Drop into every page after data.js.
 */
(function (global) {
  'use strict';

  const NAV_ITEMS = [
    { href: 'index.html',       label: '总目' },
    { href: 'catalog.html',     label: '图鉴' },
    { href: 'time-pillar.html', label: '时空柱' },
    { href: 'ancient-map.html', label: '出土地图' },
    { href: 'pattern-tree.html',label: '纹饰演化' },
    { href: 'me.html',          label: '我的案卷' },
    { href: 'scan.html',        label: '影像录入' },
  ];

  function renderHeader(activeHref) {
    const html = `
    <header class="toc-nav sticky top-0 z-30">
      <div class="max-w-6xl mx-auto px-6 py-3 flex items-baseline justify-between">
        <a href="index.html" class="flex items-baseline gap-3">
          <span class="font-serif-cn text-xl tracking-widest" style="color:var(--ink)">青铜考</span>
          <span class="font-fang text-xs" style="color:var(--ink-faded); letter-spacing:0.3em">考据案卷系统</span>
          <span class="font-mono-num text-[10px]" style="color:var(--ink-faded)">v0.1 · D0-night</span>
        </a>
        <nav class="flex gap-5 text-sm font-fang">
          ${NAV_ITEMS.map(item => `
            <a href="${item.href}" class="${item.href === activeHref ? 'active' : ''}">${item.label}</a>
          `).join('')}
        </nav>
        <div class="text-xs font-fang" style="color:var(--ink-faded)">
          ${MuseumA.user.name} · ${MuseumA.user.affiliation}
        </div>
      </div>
    </header>`;
    return html;
  }

  function renderFooter() {
    return `
    <footer class="scholar-footer mt-16">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div class="section-cap">引用规范</div>
          <p class="font-fang leading-relaxed">本系统每一字段数据,均挂载来源(出处编号 / 报告页码 / 馆藏号),可于条目详情页"档案卡"复制 BibTeX。</p>
        </div>
        <div>
          <div class="section-cap">致 谢</div>
          <p class="font-fang leading-relaxed">数据基础: <a href="#" onclick="event.preventDefault()">bronze-treasures-v1.json</a> · 维基公开数据 + 馆藏官网 + 《集成》《合集》等已开放学术数据库的整理摘要。</p>
        </div>
        <div>
          <div class="section-cap">免责声明</div>
          <p class="font-fang leading-relaxed">所有断代依据、释字、铸主指认,均标注出处与争议。本系统并非孤立结论;请以引用为准,以争议为荣。</p>
        </div>
      </div>
      <div class="max-w-6xl mx-auto px-6 mt-6 pt-4" style="border-top:1px solid var(--rule)">
        <div class="flex justify-between items-center font-mono-num text-xs">
          <span>© 2026 MuseumCollect · 考据派演示版 (Builder A)</span>
          <span>持照编号: ${MuseumA.user.passport_id}</span>
        </div>
      </div>
    </footer>`;
  }

  // === Citation tooltip system ===
  let tooltipEl = null;
  function ensureTooltip() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'cite-tooltip';
    tooltipEl.style.display = 'none';
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }
  function attachCitations(root) {
    root = root || document;
    root.querySelectorAll('.cite-ref[data-cite]').forEach(el => {
      el.addEventListener('mouseenter', e => {
        const t = ensureTooltip();
        t.innerHTML = el.getAttribute('data-cite');
        t.style.display = 'block';
        const r = el.getBoundingClientRect();
        const top = window.scrollY + r.bottom + 6;
        const left = Math.min(window.scrollX + r.left, window.innerWidth - 320);
        t.style.top = top + 'px';
        t.style.left = left + 'px';
      });
      el.addEventListener('mouseleave', () => {
        if (tooltipEl) tooltipEl.style.display = 'none';
      });
    });
  }

  // === Helpers ===
  function citation(label, content) {
    // Returns <sup class="cite-ref">[label]</sup> with embedded tooltip data
    return `<sup class="cite-ref" data-cite="${(content||'').replace(/"/g,'&quot;')}">[${label}]</sup>`;
  }

  function bibCite(a) {
    // Compose a one-liner BibTeX-ish citation from artifact's data_sources
    if (!a.data_sources || !a.data_sources.length) return '无引用';
    return a.data_sources.map((s, i) =>
      `[${i+1}] ${s.field || ''} — ${s.source || ''}${s.url ? ' · ' + s.url : ''}`
    ).join('\n');
  }

  function copyBibTeX(a) {
    // Pretend BibTeX export — log to console + alert
    const id = a.id;
    const title = a.name_zh;
    const sources = (a.data_sources || []).map(s => `${s.source}${s.url ? ' (' + s.url + ')' : ''}`).join('; ');
    const bib = `@artifact{${id},
  title  = {${title}},
  dynasty= {${a.dynasty || ''}·${a.period || ''}},
  site   = {${a.excavation_site || 'unknown'}},
  museum = {${a.current_museum || ''}},
  size   = {h=${(a.size||{}).height_cm||'?'} cm; w=${(a.size||{}).weight_kg||'?'} kg},
  rarity = {${a.rarity_level || ''}},
  refs   = {${sources}},
  note   = {录自 MuseumCollect 考据派演示版 D0-night.}
}`;
    navigator.clipboard && navigator.clipboard.writeText(bib).catch(() => {});
    alert('BibTeX 引用已生成 (并尝试复制到剪贴板):\n\n' + bib);
  }

  function exportNotes() {
    const u = MuseumA.user;
    const lines = [
      `# 个人研究笔记导出 · ${u.name}`,
      `> 系统: MuseumCollect 考据派演示版 (D0-night)`,
      `> 导出时间: 2026-05-20`,
      ``,
      `## 一、收藏总览`,
      ``,
      `- 已录入文物: **${u.collected_ids.length} 件** / 数据池 ${MuseumA.catalog.length} 件`,
      `- 累计识字数: **${u.recognized_char_count} 字** · 段位 **${MuseumA.inscriptionRank().rank}**`,
      `- 笔记累计字数: ${u.notes_chars}`,
      ``,
      `## 二、收藏明细`,
      ``,
      `| 编号 | 名称 | 朝代 · 分期 | 馆藏 | 稀有度 | 备注 |`,
      `| --- | --- | --- | --- | --- | --- |`,
    ];
    for (const id of u.collected_ids) {
      const a = MuseumA.catalogById[id];
      if (!a) continue;
      lines.push(`| \`${a.id}\` | ${a.name_zh} | ${a.dynasty}·${a.period || ''} | ${a.current_museum} | ${a.rarity_level} | — |`);
    }
    lines.push('', '## 三、引用规范', '');
    for (const id of u.collected_ids) {
      const a = MuseumA.catalogById[id];
      if (!a) continue;
      lines.push(`### ${a.name_zh}`);
      lines.push('');
      for (const s of (a.data_sources || [])) {
        lines.push(`- ${s.field || 'general'} — ${s.source}${s.url ? '. ' + s.url : ''}`);
      }
      lines.push('');
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'museumcollect-notes-' + Date.now() + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  global.MuseumLayout = {
    renderHeader, renderFooter, attachCitations, citation, bibCite, copyBibTeX, exportNotes
  };

  // Auto-render on load if header/footer placeholders exist
  document.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    const active = document.body.dataset.page || '';
    if (headerEl) headerEl.outerHTML = renderHeader(active);
    if (footerEl) footerEl.outerHTML = renderFooter();
    attachCitations(document);
  });

})(typeof window !== 'undefined' ? window : globalThis);
