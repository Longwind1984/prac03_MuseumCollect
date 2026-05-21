/**
 * cross-dim-wiring.js — Wires the event bus across all components on every page
 * Uses ../v3-shared/time-pillar/event-bus.js (global fallback)
 *
 * Include AFTER event-bus.js (or after the module that sets window.MuseumBus).
 *
 * Per-dynasty dominant patterns (for pattern-tree linkage)
 */

(function() {
  'use strict';

  // Dynasty → main patterns mapping
  const ERA_PATTERNS = {
    '夏':   ['乳钉纹', '弦纹'],
    '商':   ['饕餮纹', '夔龙纹', '云雷纹', '蝉纹'],
    '西周': ['凤鸟纹', '窃曲纹', '重环纹', '波曲纹'],
    '春秋': ['蟠螭纹', '窃曲纹', '重环纹', '垂鳞纹'],
    '战国': ['蟠虺纹', '几何纹', '宴乐纹', '狩猎纹'],
    '秦':   ['云气纹', '几何纹'],
    '西汉': ['云气纹', '四神纹', '狩猎纹'],
    '东汉': ['四神纹', '狩猎纹'],
  };

  // Dynasty → dominant geo era for overlay
  const ERA_GEO = {
    '夏':   null,
    '商':   'shang',
    '西周': 'xizhou',
    '春秋': 'chunqiu',
    '战国': 'zhanguo',
    '秦':   null,
    '西汉': null,
    '东汉': null,
  };

  // Dynasty → dominant form subtypes
  const ERA_FORMS = {
    '商':   ['方鼎', '圆鼎', '方尊', '觚'],
    '西周': ['圆鼎', '簋', '壶', '盘'],
    '春秋': ['鼎', '壶', '编钟'],
    '战国': ['鼎', '壶', '编钟', '剑'],
  };

  let _linkageEnabled = true;
  let _lastEra = null;

  function onEraFocus(payload) {
    if (!_linkageEnabled) return;
    const { dynasty, triggered_by } = payload;
    if (!dynasty) return;
    _lastEra = dynasty;

    // Highlight pattern icons on page
    highlightPatterns(ERA_PATTERNS[dynasty] || []);

    // Update geo overlay if geo-system present
    if (window.GeoSystemCtrl) {
      const geoEra = ERA_GEO[dynasty];
      if (geoEra) window.GeoSystemCtrl.setEra(dynasty);
    }

    // Highlight form cards
    highlightForms(ERA_FORMS[dynasty] || []);

    // Update any era-display badges
    const eraBadges = document.querySelectorAll('[data-era-highlight]');
    eraBadges.forEach(el => {
      el.classList.toggle('era-active', el.dataset.eraHighlight === dynasty);
    });

    // Dispatch to any vanilla listeners too
    document.dispatchEvent(new CustomEvent('era-focus-wired', { detail: payload }));
  }

  function highlightPatterns(patterns) {
    const allIcons = document.querySelectorAll('[data-pattern]');
    allIcons.forEach(el => {
      const p = el.dataset.pattern;
      const match = patterns.some(pname => p && p.includes(pname.replace('纹','')));
      el.classList.toggle('pattern-era-active', match);
      if (match) {
        el.style.borderColor = 'var(--accent-bronze)';
        el.style.boxShadow = '0 0 6px rgba(164,115,44,.4)';
        el.style.transform = 'scale(1.1)';
      } else {
        el.style.borderColor = '';
        el.style.boxShadow = '';
        el.style.transform = '';
      }
    });
  }

  function highlightForms(forms) {
    const allCards = document.querySelectorAll('[data-form]');
    allCards.forEach(el => {
      const f = el.dataset.form;
      const match = forms.some(fname => f && f.includes(fname));
      el.classList.toggle('form-era-active', match);
    });
  }

  // Linkage toggle UI
  function setupLinkageToggle() {
    document.querySelectorAll('.linkage-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        _linkageEnabled = !_linkageEnabled;
        const dot = btn.querySelector('.linkage-dot');
        const label = btn.querySelector('.linkage-label');
        if (dot) dot.classList.toggle('off', !_linkageEnabled);
        if (label) label.textContent = _linkageEnabled ? '联动 ●' : '联动 ○';
        btn.title = _linkageEnabled ? '穿越模式已开启' : '穿越模式已关闭';
        // Emit toggle event
        document.dispatchEvent(new CustomEvent('linkage-toggle', { detail: { enabled: _linkageEnabled } }));
      });
    });
  }

  // Wait for bus and wire up
  function init() {
    setupLinkageToggle();

    // Listen via MuseumBus if available
    const bus = window.MuseumBus;
    if (bus) {
      bus.on('era-focus', onEraFocus);
      bus.on('linkage-toggle', ({ enabled }) => { _linkageEnabled = enabled; });
    }

    // Also listen via raw CustomEvent (for non-module emitters)
    document.addEventListener('era-focus', (e) => {
      if (e.detail && e.detail.triggered_by !== 'cross-dim-wiring') onEraFocus(e.detail);
    });

    // Expose API
    window.CrossDimWiring = {
      setLinkage: (v) => { _linkageEnabled = v; },
      isEnabled: () => _linkageEnabled,
      emitEra: (dynasty, source = 'external') => {
        if (bus) bus.emit('era-focus', { dynasty, triggered_by: source });
        else document.dispatchEvent(new CustomEvent('era-focus', {
          detail: { dynasty, triggered_by: source }
        }));
      },
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
