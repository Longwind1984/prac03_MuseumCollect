/**
 * nav.js — Canonical top nav for v3-converged.
 *
 * Usage: each page has <body data-page="catalog"> and an empty
 * <nav id="top-nav-placeholder" class="top-nav"></nav>. This script reads
 * data-page, renders the canonical 10-link nav, and marks the active link.
 *
 * Special pages (inscription-special-hezun) keep their own dark inline nav —
 * they should NOT include this script.
 */

(function() {
  'use strict';

  const LINKS = [
    { href: 'catalog.html',            page: 'catalog',            label: '图鉴' },
    { href: 'time-pillar.html',        page: 'time-pillar',        label: '时代柱' },
    { href: 'geo-system.html',         page: 'geo-system',         label: '地理' },
    { href: 'pattern-tree.html',       page: 'pattern-tree',       label: '纹饰树' },
    { href: 'inscription-reader.html', page: 'inscription-reader', label: '铭文' },
    { href: 'purpose-scene.html',      page: 'purpose-scene',      label: '礼制场景' },
    { href: 'caster-profile.html',     page: 'caster-profile',     label: '铸主' },
    { href: 'me.html',                 page: 'me',                 label: '我的图鉴' },
    { href: 'scan.html',               page: 'scan',               label: '识别' },
  ];

  // Featured (highlighted) entry — kept separate so its accent styling stays
  // consistent. Was inlined in index.html previously.
  const FEATURED = {
    href: 'dashboard.html', page: 'dashboard', label: '★ 三联动',
    style: 'color:#d4a857;font-weight:600;border-bottom:2px solid #d4a857;padding-left:20px;'
  };

  function render(activePage) {
    const placeholder = document.getElementById('top-nav-placeholder');
    if (!placeholder) return;

    const linkHtml = LINKS.map(l => {
      const active = l.page === activePage ? ' active' : '';
      return `<a href="${l.href}" class="nav-link${active}">${l.label}</a>`;
    }).join('\n    ');

    const featuredActive = FEATURED.page === activePage ? ' active' : '';
    const featuredHtml = `<a href="${FEATURED.href}" class="nav-link${featuredActive}" style="${FEATURED.style}">${FEATURED.label}</a>`;

    placeholder.innerHTML = `
  <a href="index.html" class="nav-logo">器·<span>集</span></a>
  <div class="nav-links">
    ${linkHtml}
    ${featuredHtml}
  </div>
  <button class="linkage-toggle" title="穿越模式：开启后各维度组件联动响应">
    <div class="linkage-dot"></div>
    <span class="linkage-label">穿越模式 ●</span>
  </button>
`;
  }

  // Auto-render: read data-page from <body>, render synchronously.
  function autoRender() {
    const page = document.body && document.body.dataset && document.body.dataset.page;
    render(page || '');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoRender);
  } else {
    autoRender();
  }

  window.MuseumNav = { render, LINKS, FEATURED };
})();
