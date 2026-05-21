/**
 * geo-system.js — Reusable Geographic Map System for MuseumCollect
 *
 * API:
 *   const ctrl = await initGeoSystem(containerEl, opts)
 *   ctrl.setEra(dynasty)    — switches era overlay
 *   ctrl.setView(mode)      — 'excavation' | 'museum' | 'overseas'
 *   ctrl.dispose()          — removes map and event listeners
 *
 * CustomEvents listened:
 *   era-focus (on document) — { dynasty: '商' | '西周' | '春秋' | '战国' | '汉' | '现代' }
 *
 * CustomEvents emitted:
 *   region-focus (on document) — { name, dynasty, type } when user clicks a state
 *   site-focus   (on document) — { name, dynasty, coords } when user clicks a site/museum
 *
 * Dependencies: D3.js v7 (must be loaded before this script)
 */

(function (global) {
  'use strict';

  /* ─── Constants ────────────────────────────────────────────────── */

  const BASE_PATH = (() => {
    // Resolve path relative to this script file
    const scripts = document.querySelectorAll('script[src]');
    for (const s of scripts) {
      if (s.src && s.src.includes('geo-system.js')) {
        return s.src.replace('geo-system.js', '');
      }
    }
    return '../../../assets/geo/';
  })();

  // Derive assets path from script location or fallback
  const ASSETS_PATH = BASE_PATH.includes('geo-system')
    ? BASE_PATH.replace('demos/v3-shared/geo-system/', 'assets/geo/')
    : BASE_PATH;

  const GEO_FILES = {
    terrain:    ASSETS_PATH + 'china-terrain.geojson',
    shang:      ASSETS_PATH + 'ancient-states-shang.geojson',
    xizhou:     ASSETS_PATH + 'ancient-states-xizhou.geojson',
    chunqiu:    ASSETS_PATH + 'ancient-states-chunqiu.geojson',
    zhanguo:    ASSETS_PATH + 'ancient-states-zhanguo.geojson',
    sites:      ASSETS_PATH + 'excavation-sites.geojson',
    museums:    ASSETS_PATH + 'museums.geojson',
  };

  const ERA_MAP = {
    '夏':    null,
    '商':    'shang',
    '西周':  'xizhou',
    '春秋':  'chunqiu',
    '战国':  'zhanguo',
    '汉':    null,
    '现代':  null,
  };

  const DYNASTY_COLORS = {
    '夏':   '#6e4a2e',
    '商':   '#4a5a3a',
    '西周': '#a73a2a',
    '春秋': '#2a2a3a',
    '战国': '#7a3a2a',
    '秦':   '#1a1a1a',
    '汉':   '#b89046',
    '现代': '#3a3a5a',
  };

  const RARITY_CLASSES = {
    'treasure': { ring: '#d4a857', glow: 'drop-shadow(0 0 8px rgba(212,168,87,0.8))', size: 11 },
    'tier1':    { ring: '#c9a85f', glow: 'drop-shadow(0 0 4px rgba(201,168,95,0.5))', size: 8 },
    'tier2':    { ring: '#8a6a9a', glow: 'none', size: 6 },
    'default':  { ring: '#666',   glow: 'none', size: 5 },
  };

  /* ─── Main init function ─────────────────────────────────────────── */

  async function initGeoSystem(containerEl, opts = {}) {
    const options = Object.assign({
      width: containerEl.clientWidth || 900,
      height: containerEl.clientHeight || 580,
      initialEra: '现代',
      initialView: 'excavation',
      showControls: true,
      onSiteClick: null,
      onRegionClick: null,
    }, opts);

    // ── Load all GeoJSON data ───────────────────────────────────────
    const data = {};
    const loadPromises = Object.entries(GEO_FILES).map(async ([key, url]) => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data[key] = await res.json();
      } catch (e) {
        console.warn(`[GeoSystem] Failed to load ${key}: ${e.message}`);
        data[key] = { type: 'FeatureCollection', features: [] };
      }
    });
    await Promise.all(loadPromises);

    // ── State ──────────────────────────────────────────────────────
    let currentEra = options.initialEra;
    let currentView = options.initialView;
    let isDisposed = false;

    // ── Build DOM ──────────────────────────────────────────────────
    containerEl.innerHTML = '';
    containerEl.style.position = 'relative';

    const mapWrapper = document.createElement('div');
    mapWrapper.style.cssText = 'width:100%;height:100%;position:relative;overflow:hidden;';
    containerEl.appendChild(mapWrapper);

    // Tooltip element
    const tooltip = document.createElement('div');
    tooltip.style.cssText = `
      position:absolute; pointer-events:none; z-index:100;
      background:rgba(15,12,8,0.92); color:#e8dcc8;
      border:1px solid rgba(212,168,87,0.5); border-radius:6px;
      padding:10px 14px; font-size:13px; line-height:1.6;
      max-width:260px; display:none; backdrop-filter:blur(4px);
      font-family: 'Noto Serif SC', 'Source Han Serif', serif;
    `;
    containerEl.appendChild(tooltip);

    // Drawer panel for site details
    const drawer = document.createElement('div');
    drawer.style.cssText = `
      position:absolute; right:0; top:0; width:280px; height:100%;
      background:rgba(10,8,5,0.95); border-left:1px solid rgba(212,168,87,0.3);
      transform:translateX(100%); transition:transform 0.3s ease;
      z-index:50; overflow-y:auto; padding:20px;
      font-family: 'Noto Serif SC', 'Source Han Serif', serif;
      color:#e8dcc8;
    `;
    containerEl.appendChild(drawer);

    // ── D3 Setup ───────────────────────────────────────────────────
    const W = options.width;
    const H = options.height;

    // China-centered projection
    const projection = d3.geoMercator()
      .center([107, 35])
      .scale(W * 0.85)
      .translate([W * 0.45, H * 0.5]);

    // World projection for overseas view
    const worldProjection = d3.geoNaturalEarth1()
      .scale(W * 0.16)
      .translate([W * 0.42, H * 0.5]);

    const pathGen = d3.geoPath().projection(projection);
    const worldPathGen = d3.geoPath().projection(worldProjection);

    const svg = d3.select(mapWrapper)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .style('background', '#1a1510');

    // Defs: gradients & filters
    const defs = svg.append('defs');

    // Paper texture gradient
    defs.append('radialGradient')
      .attr('id', 'paperGrad')
      .attr('cx', '50%').attr('cy', '40%')
      .attr('r', '70%')
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#f8f0e0', opacity: 1 },
        { offset: '70%', color: '#e8dcc4', opacity: 1 },
        { offset: '100%', color: '#c8b898', opacity: 1 },
      ])
      .enter().append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)
      .attr('stop-opacity', d => d.opacity);

    // Glow filter for treasure sites
    const glowFilter = defs.append('filter').attr('id', 'glowFilter');
    glowFilter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 3).attr('result', 'blur');
    glowFilter.append('feComposite').attr('in', 'SourceGraphic').attr('in2', 'blur').attr('operator', 'over');

    // ── Layer groups ────────────────────────────────────────────────
    const layerBg    = svg.append('g').attr('class', 'layer-bg');
    const layerTerrain = svg.append('g').attr('class', 'layer-terrain');
    const layerRivers  = svg.append('g').attr('class', 'layer-rivers');
    const layerStates  = svg.append('g').attr('class', 'layer-states');
    const layerLabels  = svg.append('g').attr('class', 'layer-labels');
    const layerPoints  = svg.append('g').attr('class', 'layer-points');

    // Background fill
    layerBg.append('rect')
      .attr('width', W).attr('height', H)
      .attr('fill', '#1a1510');

    // ── Render terrain (country outline + rivers) ───────────────────
    function renderTerrain(proj) {
      const pg = d3.geoPath().projection(proj);
      layerTerrain.selectAll('*').remove();
      layerRivers.selectAll('*').remove();

      if (!data.terrain || !data.terrain.features) return;

      const countryFeature = data.terrain.features.find(f => f.properties.type === 'country');
      const riverFeatures  = data.terrain.features.filter(f => f.properties.type === 'river');
      const mountFeatures  = data.terrain.features.filter(f => f.properties.type === 'mountain');

      if (countryFeature) {
        // Shadow / land base
        layerTerrain.append('path')
          .datum(countryFeature)
          .attr('d', pg)
          .attr('fill', 'url(#paperGrad)')
          .attr('stroke', '#8a7060')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.92);

        // Subtle inner vignette
        layerTerrain.append('path')
          .datum(countryFeature)
          .attr('d', pg)
          .attr('fill', 'none')
          .attr('stroke', '#6a5040')
          .attr('stroke-width', 3)
          .attr('opacity', 0.15);
      }

      // Mountain ranges as dashed lines
      mountFeatures.forEach(f => {
        layerTerrain.append('path')
          .datum(f)
          .attr('d', pg)
          .attr('fill', 'none')
          .attr('stroke', '#9a8070')
          .attr('stroke-width', 1.5)
          .attr('stroke-dasharray', '4,3')
          .attr('opacity', 0.5);
      });

      // Rivers
      riverFeatures.forEach(f => {
        const p = f.properties;
        layerRivers.append('path')
          .datum(f)
          .attr('d', pg)
          .attr('fill', 'none')
          .attr('stroke', p.stroke || '#7ab0d4')
          .attr('stroke-width', p.strokeWidth || 1.5)
          .attr('stroke-linecap', 'round')
          .attr('opacity', 0.7);

        // River labels for major rivers
        if (p.strokeWidth >= 2) {
          const midPt = getMidPoint(f, pg);
          if (midPt) {
            layerRivers.append('text')
              .attr('x', midPt[0]).attr('y', midPt[1])
              .attr('text-anchor', 'middle')
              .attr('font-size', '9px')
              .attr('fill', '#6090b0')
              .attr('opacity', 0.7)
              .attr('font-family', 'serif')
              .text(p.name);
          }
        }
      });
    }

    function getMidPoint(feature, pg) {
      try {
        const centroid = pg.centroid(feature);
        if (isNaN(centroid[0]) || isNaN(centroid[1])) return null;
        return centroid;
      } catch (e) { return null; }
    }

    // ── Render state overlays ────────────────────────────────────────
    function renderStateOverlay(eraKey, pg) {
      layerStates.selectAll('*').remove();
      layerLabels.selectAll('*').remove();

      if (!eraKey || !data[eraKey]) return;

      const features = data[eraKey].features || [];

      features.forEach(f => {
        const p = f.properties;
        const color = p.color || DYNASTY_COLORS[p.dynasty] || '#888';
        const opacity = p.opacity || 0.25;

        // State polygon
        layerStates.append('path')
          .datum(f)
          .attr('d', pg)
          .attr('fill', color)
          .attr('fill-opacity', opacity)
          .attr('stroke', color)
          .attr('stroke-width', 1.2)
          .attr('stroke-opacity', opacity + 0.2)
          .attr('stroke-dasharray', p.type === 'core' ? 'none' : '5,3')
          .style('cursor', 'pointer')
          .on('mouseenter', function (event, d) {
            d3.select(this)
              .attr('fill-opacity', Math.min(opacity + 0.15, 0.6))
              .attr('stroke-opacity', 0.9);
            showTooltip(event, buildStateTooltip(p));
          })
          .on('mousemove', function (event) {
            moveTooltip(event);
          })
          .on('mouseleave', function () {
            d3.select(this)
              .attr('fill-opacity', opacity)
              .attr('stroke-opacity', opacity + 0.2);
            hideTooltip();
          })
          .on('click', function (event, d) {
            event.stopPropagation();
            document.dispatchEvent(new CustomEvent('region-focus', {
              detail: { name: p.name, dynasty: p.dynasty, type: p.type, description: p.description }
            }));
            if (options.onRegionClick) options.onRegionClick(p);
          });

        // State label
        const centroid = pg.centroid(f);
        if (!isNaN(centroid[0]) && !isNaN(centroid[1])) {
          layerLabels.append('text')
            .attr('x', centroid[0])
            .attr('y', centroid[1])
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', p.type === 'core' ? '11px' : '9px')
            .attr('font-weight', p.type === 'core' ? 'bold' : 'normal')
            .attr('fill', p.type === 'core' ? '#fff' : '#f0e8d0')
            .attr('opacity', 0.9)
            .attr('font-family', 'Noto Serif SC, SimSun, serif')
            .style('pointer-events', 'none')
            .text(p.name);
        }
      });

      // Animate in
      layerStates.selectAll('path')
        .attr('opacity', 0)
        .transition().duration(600).ease(d3.easeCubicOut)
        .attr('opacity', 1);
      layerLabels.selectAll('text')
        .attr('opacity', 0)
        .transition().duration(800).delay(200)
        .attr('opacity', 0.9);
    }

    // ── Render point markers (sites or museums) ──────────────────────
    function renderPoints(viewMode, pg) {
      layerPoints.selectAll('*').remove();

      let features = [];
      if (viewMode === 'excavation') {
        features = (data.sites && data.sites.features) || [];
      } else if (viewMode === 'museum') {
        features = (data.museums && data.museums.features) || [];
        // Only domestic
        features = features.filter(f => f.properties.country === '中国' || f.properties.country === '台湾');
      } else if (viewMode === 'overseas') {
        features = (data.museums && data.museums.features) || [];
        // Overseas only
        features = features.filter(f => f.properties.type === 'overseas');
      }

      features.forEach(f => {
        const p = f.properties;
        const coords = f.geometry.coordinates;
        const pt = pg([coords[0], coords[1]]);
        if (!pt || isNaN(pt[0]) || isNaN(pt[1])) return;

        const rarity = RARITY_CLASSES[p.rarity] || RARITY_CLASSES[p.tier === 'top' ? 'treasure' : (p.tier === 'tier1' ? 'tier1' : 'default')];
        const r = rarity.size;
        const hasCollected = (p.user_collected > 0 || p.user_visited);

        const g = layerPoints.append('g')
          .attr('class', 'site-point')
          .attr('transform', `translate(${pt[0]},${pt[1]})`)
          .style('cursor', 'pointer');

        // Glow ring for treasure/top tier
        if (rarity === RARITY_CLASSES['treasure']) {
          g.append('circle')
            .attr('r', r + 5)
            .attr('fill', 'none')
            .attr('stroke', '#d4a857')
            .attr('stroke-width', 1)
            .attr('opacity', 0.4)
            .attr('class', 'glow-ring');

          // Animated pulse
          g.append('circle')
            .attr('r', r + 2)
            .attr('fill', 'rgba(212,168,87,0.15)')
            .attr('stroke', 'none');
        }

        // Main dot
        g.append('circle')
          .attr('r', r)
          .attr('fill', hasCollected ? rarity.ring : (rarity === RARITY_CLASSES['treasure'] ? 'rgba(212,168,87,0.3)' : 'rgba(140,110,80,0.3)'))
          .attr('stroke', rarity.ring)
          .attr('stroke-width', hasCollected ? 2 : 1.5)
          .attr('opacity', hasCollected ? 1 : 0.65);

        // Collected badge
        if (hasCollected && p.user_collected > 0) {
          g.append('text')
            .attr('x', r + 2)
            .attr('y', -r + 2)
            .attr('font-size', '8px')
            .attr('fill', '#d4a857')
            .attr('font-family', 'monospace')
            .text(p.user_collected || '');
        }

        // Label
        const labelText = p.name || p.name_en;
        if (labelText) {
          g.append('text')
            .attr('x', r + 3)
            .attr('y', 4)
            .attr('font-size', viewMode === 'overseas' ? '8px' : '9px')
            .attr('fill', hasCollected ? '#e8d090' : '#c0a880')
            .attr('font-family', 'Noto Serif SC, SimSun, serif')
            .style('pointer-events', 'none')
            .text(labelText.length > 8 ? labelText.slice(0, 8) + '…' : labelText);
        }

        // Events
        g.on('mouseenter', function (event) {
            d3.select(this).select('circle').attr('r', r * 1.4);
            showTooltip(event, buildPointTooltip(p, viewMode));
          })
          .on('mousemove', moveTooltip)
          .on('mouseleave', function () {
            d3.select(this).select('circle').attr('r', r);
            hideTooltip();
          })
          .on('click', function (event) {
            event.stopPropagation();
            showDrawer(p, viewMode);
            document.dispatchEvent(new CustomEvent('site-focus', {
              detail: { name: p.name, dynasty: p.dynasty || p.tier, coords }
            }));
            if (options.onSiteClick) options.onSiteClick(p, viewMode);
          });
      });

      // Staggered appear animation
      layerPoints.selectAll('.site-point')
        .attr('opacity', 0)
        .transition()
        .duration(400)
        .delay((d, i) => i * 15)
        .attr('opacity', 1);
    }

    // ── Tooltip helpers ──────────────────────────────────────────────
    function showTooltip(event, html) {
      tooltip.innerHTML = html;
      tooltip.style.display = 'block';
      moveTooltip(event);
    }

    function moveTooltip(event) {
      const rect = containerEl.getBoundingClientRect();
      let x = event.clientX - rect.left + 12;
      let y = event.clientY - rect.top - 10;
      if (x + 270 > rect.width) x -= 290;
      if (y + 100 > rect.height) y -= 120;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }

    function hideTooltip() {
      tooltip.style.display = 'none';
    }

    function buildStateTooltip(p) {
      const color = DYNASTY_COLORS[p.dynasty] || '#888';
      return `
        <div style="border-bottom:1px solid rgba(212,168,87,0.3);padding-bottom:6px;margin-bottom:8px;">
          <span style="font-size:15px;font-weight:bold;color:#e8d090;">${p.name}</span>
          <span style="font-size:11px;color:#a09070;margin-left:8px;">${p.dynasty}</span>
        </div>
        <div style="font-size:12px;color:#c0a880;margin-bottom:4px;">${p.capital ? '都城：' + p.capital : ''}</div>
        <div style="font-size:11px;color:#a0907a;line-height:1.5;">${p.description || ''}</div>
      `;
    }

    function buildPointTooltip(p, viewMode) {
      const isMuseum = viewMode === 'museum' || viewMode === 'overseas';
      const rarity = p.rarity;
      const rarityBadge = rarity === 'treasure' ? '<span style="background:#a73a2a;color:#fff;padding:1px 5px;border-radius:2px;font-size:9px;margin-left:5px;">国宝</span>' : '';

      if (isMuseum) {
        const count = p.bronze_count_approx ? `约 ${p.bronze_count_approx.toLocaleString()} 件铜器` : '';
        const collected = p.user_collected_here > 0 ? `<span style="color:#d4a857;">已收藏 ${p.user_collected_here} 件</span>` : '';
        return `
          <div style="border-bottom:1px solid rgba(212,168,87,0.3);padding-bottom:6px;margin-bottom:8px;">
            <span style="font-size:14px;font-weight:bold;color:#e8d090;">${p.name}</span>
          </div>
          <div style="font-size:12px;color:#c0a880;">${p.city || ''}${p.country !== '中国' ? ' · ' + p.country : ''}</div>
          <div style="font-size:11px;color:#a0907a;margin-top:4px;">${count}</div>
          ${collected ? '<div style="font-size:11px;margin-top:4px;">' + collected + '</div>' : ''}
          <div style="font-size:10px;color:#806050;margin-top:6px;">点击查看馆藏 →</div>
        `;
      } else {
        return `
          <div style="border-bottom:1px solid rgba(212,168,87,0.3);padding-bottom:6px;margin-bottom:8px;">
            <span style="font-size:14px;font-weight:bold;color:#e8d090;">${p.name}</span>${rarityBadge}
          </div>
          <div style="font-size:12px;color:#c0a880;">${p.dynasty || ''} · ${p.location || ''}</div>
          <div style="font-size:11px;color:#a0907a;margin-top:4px;">${p.brief ? p.brief.slice(0,80) + '…' : ''}</div>
          ${p.user_collected > 0 ? '<div style="font-size:11px;color:#d4a857;margin-top:4px;">已收藏 ' + p.user_collected + ' 件</div>' : ''}
          <div style="font-size:10px;color:#806050;margin-top:6px;">点击查看详情 →</div>
        `;
      }
    }

    // ── Drawer ────────────────────────────────────────────────────────
    function showDrawer(p, viewMode) {
      const isMuseum = viewMode === 'museum' || viewMode === 'overseas';
      const artifacts = isMuseum
        ? (p.key_artifacts || []).map(name => ({ name, collected: (p.user_collected_here || 0) > 0 }))
        : (p.key_artifacts || []).map((name, i) => ({ name, collected: i < (p.user_collected || 0) }));

      const rarityBadge = p.rarity === 'treasure' || p.tier === 'top'
        ? '<span style="background:linear-gradient(90deg,#a73a2a,#d4a857);color:#fff;padding:2px 8px;border-radius:3px;font-size:10px;margin-left:8px;">国宝级</span>'
        : '';

      drawer.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <button onclick="this.closest('[style]').style.transform='translateX(100%)'"
            style="background:none;border:1px solid rgba(212,168,87,0.3);color:#d4a857;padding:4px 10px;cursor:pointer;border-radius:3px;font-size:12px;">
            ← 关闭
          </button>
          <span style="font-size:10px;color:#806050;">${isMuseum ? '馆藏地' : '考古遗址'}</span>
        </div>

        <h3 style="font-size:18px;color:#e8d090;margin-bottom:4px;font-family:'Noto Serif SC',serif;">
          ${p.name}${rarityBadge}
        </h3>
        <div style="font-size:12px;color:#a09070;margin-bottom:12px;">
          ${isMuseum
            ? (p.city + (p.country !== '中国' ? ' · ' + p.country : ''))
            : (p.dynasty || '') + ' · ' + (p.location || '')
          }
        </div>

        ${isMuseum ? `
          <div style="font-size:12px;color:#c0b090;padding:10px;background:rgba(212,168,87,0.05);border-radius:4px;margin-bottom:12px;border:1px solid rgba(212,168,87,0.15);">
            馆藏青铜器：约 <strong style="color:#d4a857;">${(p.bronze_count_approx || 0).toLocaleString()}</strong> 件
            ${p.user_collected_here ? '<br>已收藏：<strong style="color:#d4a857;">' + p.user_collected_here + '</strong> 件' : ''}
          </div>
        ` : `
          <div style="font-size:11px;color:#a09070;line-height:1.6;margin-bottom:12px;padding:8px;border-left:2px solid rgba(212,168,87,0.3);">
            ${p.brief || ''}
          </div>
          ${p.excavation_start ? `<div style="font-size:11px;color:#806050;margin-bottom:8px;">始掘：${p.excavation_start} 年</div>` : ''}
          ${p.approx_year ? `<div style="font-size:11px;color:#806050;margin-bottom:12px;">年代：${p.approx_year}</div>` : ''}
        `}

        <div style="font-size:12px;color:#d4a857;margin-bottom:8px;border-bottom:1px solid rgba(212,168,87,0.2);padding-bottom:6px;">
          ${isMuseum ? '代表馆藏' : '代表器物'}
        </div>

        <div style="display:flex;flex-direction:column;gap:6px;">
          ${artifacts.slice(0, 5).map((a, i) => `
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;
              background:${a.collected ? 'rgba(212,168,87,0.08)' : 'rgba(255,255,255,0.02)'};
              border-radius:4px;border:1px solid ${a.collected ? 'rgba(212,168,87,0.25)' : 'rgba(255,255,255,0.06)'};">
              <span style="font-size:14px;${a.collected ? 'color:#d4a857' : 'color:#504030'}">
                ${a.collected ? '◉' : '◌'}
              </span>
              <span style="font-size:12px;color:${a.collected ? '#e8d090' : '#706050'};">${a.name}</span>
              ${a.collected ? '<span style="margin-left:auto;font-size:10px;color:#d4a857;">已收藏</span>' : ''}
            </div>
          `).join('')}
          ${artifacts.length > 5 ? `<div style="font-size:11px;color:#605040;text-align:center;padding:4px;">+${artifacts.length - 5} 件更多</div>` : ''}
        </div>

        <div style="margin-top:16px;padding:10px;background:rgba(167,58,42,0.08);border:1px solid rgba(167,58,42,0.2);border-radius:4px;font-size:11px;color:#c09070;text-align:center;cursor:pointer;"
          onclick="document.dispatchEvent(new CustomEvent('navigate-artifact', { detail: { source: '${p.name}' } }))">
          浏览此处全部文物 →
        </div>
      `;

      drawer.style.transform = 'translateX(0)';
    }

    // ── Era transition animation ────────────────────────────────────
    function transitionEra(newEra) {
      // Fade out states
      layerStates.selectAll('path')
        .transition().duration(300)
        .attr('opacity', 0)
        .on('end', () => {
          const eraKey = ERA_MAP[newEra];
          // Use China projection for domestic eras, world for overseas view
          renderStateOverlay(eraKey, pathGen);
        });

      layerLabels.selectAll('text')
        .transition().duration(200)
        .attr('opacity', 0)
        .on('end', () => {
          // Labels re-rendered inside renderStateOverlay
        });
    }

    // ── View switch ─────────────────────────────────────────────────
    function switchView(newView) {
      layerPoints.selectAll('*')
        .transition().duration(200)
        .attr('opacity', 0)
        .on('end', function (d, i) {
          if (i === 0) {
            const useWorldProjection = newView === 'overseas';
            const pg = useWorldProjection ? worldPathGen : pathGen;
            renderTerrain(useWorldProjection ? worldProjection : projection);
            renderStateOverlay(ERA_MAP[currentEra], pg);
            renderPoints(newView, pg);
          }
        });
    }

    // ── Initial render ───────────────────────────────────────────────
    renderTerrain(projection);
    renderStateOverlay(ERA_MAP[currentEra], pathGen);
    renderPoints(currentView, pathGen);

    // Click outside drawer to close
    svg.on('click', () => {
      drawer.style.transform = 'translateX(100%)';
    });

    // ── External event listener ─────────────────────────────────────
    function handleEraFocus(event) {
      if (isDisposed) return;
      const { dynasty } = event.detail || {};
      if (dynasty && ERA_MAP.hasOwnProperty(dynasty)) {
        currentEra = dynasty;
        transitionEra(dynasty);
        // Update external controls if present
        const eraButtons = containerEl.querySelectorAll('[data-era]');
        eraButtons.forEach(btn => {
          btn.classList.toggle('active', btn.dataset.era === dynasty);
        });
      }
    }

    document.addEventListener('era-focus', handleEraFocus);

    // ── Expose control API ──────────────────────────────────────────
    const ctrl = {
      setEra(dynasty) {
        if (ERA_MAP.hasOwnProperty(dynasty)) {
          currentEra = dynasty;
          transitionEra(dynasty);
        }
      },
      setView(mode) {
        if (['excavation', 'museum', 'overseas'].includes(mode)) {
          currentView = mode;
          switchView(mode);
        }
      },
      getProjection() { return projection; },
      getSvg() { return svg; },
      dispose() {
        isDisposed = true;
        document.removeEventListener('era-focus', handleEraFocus);
        containerEl.innerHTML = '';
      }
    };

    return ctrl;
  }

  // ── Expose globally ─────────────────────────────────────────────────
  global.initGeoSystem = initGeoSystem;

})(window);
