/* =========================================================
   ui.js — Persona B 沉浸派
   Shared header / footer / helpers
   ========================================================= */

(function () {
  'use strict';

  // ----- Nav, always discreet, top of every page -----
  function renderHeader(active) {
    const links = [
      { id: 'index', label: '入·门', href: 'index.html' },
      { id: 'catalog', label: '图·鉴', href: 'catalog.html' },
      { id: 'time-pillar', label: '时·柱', href: 'time-pillar.html' },
      { id: 'ancient-map', label: '古·国', href: 'ancient-map.html' },
      { id: 'purpose-scene', label: '归·位', href: 'purpose-scene.html' },
      { id: 'me', label: '我·的', href: 'me.html' },
      { id: 'scan', label: '唤·醒', href: 'scan.html' },
    ];
    const navHtml = `
      <header class="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex items-center justify-between"
              style="background: linear-gradient(180deg, rgba(13,12,10,0.92), rgba(13,12,10,0.55) 70%, transparent); backdrop-filter: blur(8px);">
        <a href="index.html" class="flex items-center gap-3 group">
          <span style="font-family: var(--font-serif); font-size: 1.05rem; letter-spacing: 0.35em; color: var(--gold-treasure);">青·铜</span>
          <span style="color: var(--bronze-mid); font-size: 11px; letter-spacing: 0.4em;">MUSEUM · COLLECT</span>
        </a>
        <nav class="flex items-center gap-7">
          ${links.map(l => `
            <a href="${l.href}" class="nav-link ${l.id === active ? 'active' : ''}">${l.label}</a>
          `).join('')}
        </nav>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHtml);
  }

  function renderFooter() {
    const html = `
      <footer class="mt-32 px-12 pb-12 pt-16 flex justify-between items-center"
              style="border-top: 1px solid rgba(212, 168, 87, 0.12);">
        <div style="color: var(--bronze-mid); font-size: 11px; letter-spacing: 0.3em;">
          青·铜 · 图鉴 · 履历 · 时空
        </div>
        <div class="poem-line" style="font-size: 12px; opacity: 0.6;">
          一屏一件,极致留白
        </div>
        <div style="color: var(--bronze-mid); font-size: 11px; letter-spacing: 0.3em;">
          MUSEUM · COLLECT · v0.1
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }

  // ----- Image with fallback (uses SVG bronze-placeholder when image fails) -----
  function imageOrPlaceholder(artifact, opts = {}) {
    const cls = opts.cls || "";
    const style = opts.style || "";
    const name = artifact.name_zh;
    const url = MCData.imageUrlFor(artifact);
    if (!url) {
      return `<div class="bronze-placeholder ${cls}" data-name="${name}" style="${style}"></div>`;
    }
    const safeName = name.replace(/"/g, '&quot;');
    return `
      <div class="bronze-placeholder ${cls}" data-name="${safeName}" style="${style} position: relative;">
        <img src="${url}" alt="${safeName}" class="absolute inset-0 w-full h-full object-cover"
             style="opacity:0; filter: brightness(0.85) contrast(1.05) saturate(0.85);"
             onload="this.style.opacity='1'; this.parentElement.removeAttribute('data-name');"
             onerror="this.style.display='none';"/>
      </div>
    `;
  }

  // ----- Brush divider with optional caption -----
  function brushDivider(text) {
    if (!text) {
      return `<div class="brush-divider my-12"></div>`;
    }
    return `
      <div class="flex items-center gap-6 my-12">
        <div class="brush-divider flex-1"></div>
        <div class="poem-line" style="font-size: 13px; letter-spacing: 0.4em; opacity: 0.7;">${text}</div>
        <div class="brush-divider flex-1"></div>
      </div>
    `;
  }

  // ----- Hover poem tooltip helper -----
  function attachPoemTip(el, poem) {
    if (!poem) return;
    let tip;
    el.addEventListener('mouseenter', (e) => {
      tip = document.createElement('div');
      tip.className = 'poem-tooltip';
      tip.textContent = poem;
      document.body.appendChild(tip);
      const r = el.getBoundingClientRect();
      tip.style.left = (r.left + r.width / 2 - 160) + 'px';
      tip.style.top = (r.top + window.scrollY - 60) + 'px';
      requestAnimationFrame(() => tip.classList.add('show'));
    });
    el.addEventListener('mouseleave', () => {
      if (tip) tip.remove();
    });
  }

  // ----- Fade up observer -----
  function observeFadeUp() {
    const els = document.querySelectorAll('.fade-up');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  // ----- Public API -----
  window.MCUI = {
    renderHeader,
    renderFooter,
    imageOrPlaceholder,
    brushDivider,
    attachPoemTip,
    observeFadeUp,
  };
})();
