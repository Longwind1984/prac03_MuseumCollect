/**
 * time-pillar.js — Reusable D3-based Dynasty Time Pillar (v3)
 *
 * Renders a vertical pillar where height ∝ dynasty actual duration.
 * Emits `era-focus` CustomEvents via the shared event-bus.
 *
 * Usage:
 *   import { TimePillar } from './time-pillar.js';
 *   import { bus } from './event-bus.js';
 *
 *   const pillar = new TimePillar({
 *     container: '#pillar-root',   // CSS selector or DOM element
 *     dynasties: [...],            // dynasties.json data
 *     bus: bus,                    // event-bus instance
 *     userCollection: { '商': 8, '西周': 6, ... },  // optional mock data
 *     onDynastyClick: (dynasty) => { ... }           // optional callback
 *   });
 *   pillar.render();
 *
 * Drop-in replacement for v1 time-pillar.
 * Future Converger imports this as-is with zero modification.
 */

import { bus as defaultBus, EVENTS, linkageState } from './event-bus.js';

// ── Constants ─────────────────────────────────────────────────────────

const PILLAR_WIDTH = 220;     // px, the main band
const EVENTS_WIDTH = 260;     // px, right events column
const AXIS_WIDTH = 70;        // px, left year axis
const PX_PER_YEAR = 1.5;      // scale: 1 year → 1.5px (configurable)
const MIN_DYNASTY_HEIGHT = 28; // even 秦 (15yr) gets at least 28px for label

// Dynasty color palette (from dimensional-map-v3 §2.3, authoritative)
export const DYNASTY_COLORS = {
  '夏':   '#6e4a2e',  // 夏褐·土夯色
  '商':   '#4a5a3a',  // 商青铜·锈青色
  '西周': '#a73a2a',  // 周朱·朱漆色
  '春秋': '#2a2a3a',  // 春墨·墨色
  '战国': '#7a3a2a',  // 战赭·赭土色
  '秦':   '#1a1a1a',  // 秦玄·玄色
  '西汉': '#b89046',  // 汉黄·鎏金色
  '东汉': '#9a7838',  // 汉黄变·黄褐色
};

// ── TimePillar class ──────────────────────────────────────────────────

export class TimePillar {
  constructor(opts = {}) {
    this.container =
      typeof opts.container === 'string'
        ? document.querySelector(opts.container)
        : opts.container;
    this.dynasties = opts.dynasties || [];
    this.bus = opts.bus || defaultBus;
    this.onDynastyClick = opts.onDynastyClick || null;
    this.onEventMarkerClick = opts.onEventMarkerClick || null;
    this.pxPerYear = opts.pxPerYear || PX_PER_YEAR;
    this.userCollection = opts.userCollection || {};
    this._activeDynasty = null;
    this._zoomLevel = 1; // 1 = overview, 2 = sub-periods, 4 = king-era
    this._svg = null;
    this._tooltip = null;
    this._sideCard = null;
  }

  // ── Public API ──────────────────────────────────────────────────────

  render() {
    if (!this.container) {
      console.error('[TimePillar] container not found');
      return;
    }
    this._buildTooltip();
    this._buildSideCard();
    this._buildSVG();
    this._renderPillar();
    this._listenExternalEvents();
  }

  /** Programmatically highlight a dynasty (e.g. from external era-focus event) */
  focusDynasty(dynastyName, source = 'external') {
    if (!this._svg) return;
    this._activeDynasty = dynastyName;
    this._updateHighlight(dynastyName);
    // Only re-emit if we were triggered from outside (avoid loops)
    if (source !== 'self') return;
    this.bus.emit(EVENTS.ERA_FOCUS, {
      dynasty: dynastyName,
      triggered_by: 'time-pillar',
    });
  }

  /** Clear all highlights */
  clearFocus() {
    this._activeDynasty = null;
    if (this._svg) {
      this._svg.selectAll('.dynasty-band').classed('band-active', false);
      this._tooltip && this._hideTooltip();
    }
  }

  /** Returns current user collection counts per dynasty */
  getUserCounts() {
    return { ...this.userCollection };
  }

  // ── Build helpers ────────────────────────────────────────────────────

  _buildTooltip() {
    const tip = document.createElement('div');
    tip.className = 'tp-tooltip';
    tip.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      max-width: 280px; padding: 12px 16px;
      background: #1a1208; border: 1px solid #6e4a2e; border-radius: 4px;
      color: #e8dcc8; font-family: 'Noto Serif SC', 'STSong', serif;
      font-size: 13px; line-height: 1.7; opacity: 0;
      transition: opacity 0.15s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(tip);
    this._tooltip = tip;
  }

  _buildSideCard() {
    const card = document.createElement('div');
    card.className = 'tp-side-card';
    card.style.cssText = `
      position: absolute; right: -300px; top: 0;
      width: 270px; padding: 16px;
      background: #1a1208; border: 1px solid #6e4a2e; border-radius: 4px;
      color: #e8dcc8; font-family: 'Noto Serif SC', 'STSong', serif;
      font-size: 13px; line-height: 1.7;
      transition: right 0.3s ease; box-shadow: -4px 0 20px rgba(0,0,0,0.3);
      pointer-events: none; z-index: 100;
    `;
    if (this.container.style.position !== 'absolute') {
      this.container.style.position = 'relative';
    }
    this.container.appendChild(card);
    this._sideCard = card;
  }

  _buildSVG() {
    // Calculate total height
    const totalYears = this.dynasties.reduce((sum, d) => sum + d.duration_years, 0);
    const totalHeight = Math.max(totalYears * this.pxPerYear, 600);
    const totalWidth = AXIS_WIDTH + PILLAR_WIDTH + EVENTS_WIDTH + 40;

    // Clear any previous SVG
    this.container.querySelectorAll('svg.tp-svg').forEach(el => el.remove());

    const svg = d3.select(this.container)
      .append('svg')
      .attr('class', 'tp-svg')
      .attr('width', '100%')
      .attr('height', totalHeight + 60)
      .attr('viewBox', `0 0 ${totalWidth} ${totalHeight + 60}`);

    // Definitions: gradients, patterns
    const defs = svg.append('defs');
    this._buildDefs(defs);

    this._svg = svg;
    this._totalHeight = totalHeight;
    this._totalWidth = totalWidth;
  }

  _buildDefs(defs) {
    // Breathing animation gradient for empty segments
    const breathGrad = defs.append('linearGradient')
      .attr('id', 'grad-breath')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');
    breathGrad.append('stop').attr('offset', '0%')
      .attr('stop-color', '#3a3a3a').attr('stop-opacity', '0.3');
    breathGrad.append('stop').attr('offset', '100%')
      .attr('stop-color', '#3a3a3a').attr('stop-opacity', '0.1');

    // Gold glow filter for national treasures
    const glow = defs.append('filter').attr('id', 'glow-gold');
    glow.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    const merge = glow.append('feMerge');
    merge.append('feMergeNode').attr('in', 'blur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');
  }

  _renderPillar() {
    const svg = this._svg;
    const H = this._totalHeight;

    // Groups
    const axisG = svg.append('g').attr('class', 'tp-axis-group')
      .attr('transform', `translate(0, 30)`);
    const pillarG = svg.append('g').attr('class', 'tp-pillar-group')
      .attr('transform', `translate(${AXIS_WIDTH + 10}, 30)`);
    const eventsG = svg.append('g').attr('class', 'tp-events-group')
      .attr('transform', `translate(${AXIS_WIDTH + PILLAR_WIDTH + 20}, 30)`);

    // Compute per-dynasty top offsets
    let yOffset = 0;
    const dynastyLayouts = this.dynasties.map(d => {
      const h = Math.max(d.duration_years * this.pxPerYear, MIN_DYNASTY_HEIGHT);
      const layout = { ...d, y: yOffset, h };
      yOffset += h;
      return layout;
    });

    // ── Year axis (left) ──
    this._renderAxis(axisG, dynastyLayouts, H);

    // ── Dynasty bands ──
    dynastyLayouts.forEach(d => this._renderDynastyBand(pillarG, d));

    // ── Event markers (right) ──
    dynastyLayouts.forEach(d => this._renderEventMarkers(eventsG, d));

    // ── Title labels at top ──
    svg.append('text')
      .attr('x', AXIS_WIDTH + PILLAR_WIDTH / 2 + 10)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#a08060')
      .attr('font-size', '11')
      .attr('font-family', 'Noto Serif SC, STSong, serif')
      .attr('letter-spacing', '3')
      .text('时代柱 · Dynasty Time Pillar');
  }

  _renderAxis(g, layouts, H) {
    // Year labels at dynasty boundaries
    layouts.forEach(d => {
      // Top edge = start year
      const startY = d.y;
      const yearLabel = d.start < 0 ? `前${Math.abs(d.start)}` : `${d.start}`;

      g.append('line')
        .attr('x1', AXIS_WIDTH - 8).attr('x2', AXIS_WIDTH - 2)
        .attr('y1', startY).attr('y2', startY)
        .attr('stroke', '#6e5a3a').attr('stroke-width', 0.5);

      g.append('text')
        .attr('x', AXIS_WIDTH - 10)
        .attr('y', startY + 4)
        .attr('text-anchor', 'end')
        .attr('fill', '#9a8060')
        .attr('font-size', '9')
        .attr('font-family', 'monospace')
        .text(yearLabel);
    });

    // Bottom edge (end of last dynasty)
    const last = layouts[layouts.length - 1];
    const endY = last.y + last.h;
    const endYear = last.end < 0 ? `前${Math.abs(last.end)}` : `${last.end}年`;

    g.append('line')
      .attr('x1', AXIS_WIDTH - 8).attr('x2', AXIS_WIDTH - 2)
      .attr('y1', endY).attr('y2', endY)
      .attr('stroke', '#6e5a3a').attr('stroke-width', 0.5);

    g.append('text')
      .attr('x', AXIS_WIDTH - 10)
      .attr('y', endY + 4)
      .attr('text-anchor', 'end')
      .attr('fill', '#9a8060')
      .attr('font-size', '9')
      .attr('font-family', 'monospace')
      .text(endYear);

    // Vertical axis line
    g.append('line')
      .attr('x1', AXIS_WIDTH - 2).attr('x2', AXIS_WIDTH - 2)
      .attr('y1', 0).attr('y2', endY)
      .attr('stroke', '#4a3a2a').attr('stroke-width', 1);
  }

  _renderDynastyBand(g, d) {
    const collectedCount = this.userCollection[d.name] || d.user_collected || 0;
    const totalPool = d.artifact_count_pool || 1;
    const density = Math.min(collectedCount / totalPool, 1);
    const isEmpty = collectedCount === 0;

    // Lighten color based on collection density (0 density → dark/desaturated, full → vivid)
    const baseColor = d.color || '#4a4a4a';
    const fillOpacity = isEmpty ? 0.25 : 0.35 + density * 0.65;

    // Band group
    const bandG = g.append('g')
      .attr('class', `dynasty-band dynasty-${d.name}`)
      .attr('data-dynasty', d.name)
      .style('cursor', 'pointer');

    // Main rectangle
    const rect = bandG.append('rect')
      .attr('x', 0).attr('y', d.y)
      .attr('width', PILLAR_WIDTH).attr('height', d.h)
      .attr('fill', baseColor)
      .attr('fill-opacity', fillOpacity)
      .attr('stroke', baseColor)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1);

    // Collection density bar (left edge fill)
    if (!isEmpty) {
      bandG.append('rect')
        .attr('x', 0).attr('y', d.y + d.h * (1 - density))
        .attr('width', 6)
        .attr('height', d.h * density)
        .attr('fill', baseColor)
        .attr('fill-opacity', 0.9)
        .attr('rx', 1);
    }

    // Sub-period bands (thin horizontal dividers)
    if (d.sub_periods && d.h > 60) {
      d.sub_periods.forEach((sp, i) => {
        if (i === 0) return; // skip first (top edge = dynasty start)
        const spDuration = sp.start - d.start;
        const spY = d.y + (spDuration / d.duration_years) * d.h;
        bandG.append('line')
          .attr('x1', 0).attr('x2', PILLAR_WIDTH)
          .attr('y1', spY).attr('y2', spY)
          .attr('stroke', baseColor)
          .attr('stroke-opacity', 0.4)
          .attr('stroke-width', 0.5)
          .attr('stroke-dasharray', '3,3');

        // Sub-period label if band is tall enough
        if (d.h > 80) {
          const spH_fraction = (i + 1 < d.sub_periods.length)
            ? ((d.sub_periods[i + 1].start - sp.start) / d.duration_years) * d.h
            : ((d.end - sp.start) / d.duration_years) * d.h;

          if (spH_fraction > 18) {
            bandG.append('text')
              .attr('x', PILLAR_WIDTH - 8)
              .attr('y', spY + Math.min(spH_fraction / 2, 20))
              .attr('text-anchor', 'end')
              .attr('fill', baseColor)
              .attr('fill-opacity', 0.7)
              .attr('font-size', '9')
              .attr('font-family', 'Noto Serif SC, STSong, serif')
              .text(sp.name);
          }
        }
      });
    }

    // Dynasty name label
    const labelSize = d.h > 60 ? 15 : d.h > 30 ? 12 : 10;
    bandG.append('text')
      .attr('class', 'dynasty-label')
      .attr('x', 14)
      .attr('y', d.y + Math.min(d.h / 2, 28))
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#e8d8b8')
      .attr('fill-opacity', 0.95)
      .attr('font-size', labelSize)
      .attr('font-family', 'Noto Serif SC, STSong, serif')
      .attr('letter-spacing', '1')
      .text(d.name);

    // Duration label
    if (d.h > 40) {
      bandG.append('text')
        .attr('x', 14)
        .attr('y', d.y + Math.min(d.h / 2 + 16, 44))
        .attr('dominant-baseline', 'middle')
        .attr('fill', baseColor)
        .attr('fill-opacity', 0.7)
        .attr('font-size', '9')
        .attr('font-family', 'monospace')
        .text(`${d.duration_years}yr`);
    }

    // Collection count badge
    if (d.h > 30) {
      const badgeText = `${collectedCount}/${totalPool}`;
      bandG.append('text')
        .attr('x', PILLAR_WIDTH - 8)
        .attr('y', d.y + 14)
        .attr('text-anchor', 'end')
        .attr('fill', isEmpty ? '#5a4a3a' : '#c8a860')
        .attr('font-size', '9')
        .attr('font-family', 'monospace')
        .text(badgeText);
    }

    // Breathing animation class for empty bands
    if (isEmpty) {
      bandG.append('rect')
        .attr('class', 'breath-overlay')
        .attr('x', 0).attr('y', d.y)
        .attr('width', PILLAR_WIDTH).attr('height', d.h)
        .attr('fill', 'url(#grad-breath)')
        .attr('rx', 0);

      if (d.h > 50) {
        bandG.append('text')
          .attr('x', PILLAR_WIDTH / 2)
          .attr('y', d.y + d.h / 2 + 14)
          .attr('text-anchor', 'middle')
          .attr('fill', baseColor)
          .attr('fill-opacity', 0.5)
          .attr('font-size', '9')
          .attr('font-family', 'Noto Serif SC, STSong, serif')
          .text('等待唤醒');
      }
    }

    // Dominant patterns (shown as small text on wider view)
    if (d.h > 80 && d.dominant_patterns) {
      const patternsText = d.dominant_patterns.slice(0, 2).join(' · ');
      bandG.append('text')
        .attr('x', 14)
        .attr('y', d.y + d.h - 10)
        .attr('fill', baseColor)
        .attr('fill-opacity', 0.55)
        .attr('font-size', '8')
        .attr('font-family', 'Noto Serif SC, STSong, serif')
        .text(patternsText);
    }

    // Hover / click events
    bandG
      .on('mouseenter', (event) => this._onDynastyHover(event, d))
      .on('mouseleave', () => this._onDynastyLeave())
      .on('click', (event) => this._onDynastyClick(event, d));

    // Hover highlight rect (invisible until hover)
    bandG.append('rect')
      .attr('class', 'band-highlight-rect')
      .attr('x', 0).attr('y', d.y)
      .attr('width', PILLAR_WIDTH).attr('height', d.h)
      .attr('fill', 'none')
      .attr('stroke', '#e8d8b8')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .style('pointer-events', 'none');
  }

  _renderEventMarkers(g, d) {
    if (!d.events) return;

    d.events.forEach(ev => {
      // Map year to y position within the dynasty band
      const clampedYear = Math.max(d.start, Math.min(d.end, ev.year));
      const frac = (clampedYear - d.start) / d.duration_years;
      const evY = d.y + frac * d.h;

      // Connector line from pillar edge to dot
      g.append('line')
        .attr('x1', 0).attr('x2', 12)
        .attr('y1', evY).attr('y2', evY)
        .attr('stroke', d.color)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 0.8);

      // Dot marker
      const dot = g.append('circle')
        .attr('class', 'event-marker')
        .attr('cx', 6).attr('cy', evY)
        .attr('r', 4)
        .attr('fill', '#c04030')
        .attr('stroke', '#e8d8b8')
        .attr('stroke-width', 0.5)
        .style('cursor', 'pointer');

      // Year label
      g.append('text')
        .attr('x', 16)
        .attr('y', evY + 3)
        .attr('fill', '#9a8060')
        .attr('font-size', '8')
        .attr('font-family', 'monospace')
        .text(ev.year < 0 ? `前${Math.abs(ev.year)}` : `${ev.year}`);

      // Event name label
      g.append('text')
        .attr('x', 52)
        .attr('y', evY + 3)
        .attr('fill', '#c8b890')
        .attr('font-size', '10')
        .attr('font-family', 'Noto Serif SC, STSong, serif')
        .text(ev.name);

      // Event marker interactions
      dot
        .on('mouseenter', (event) => this._showEventTooltip(event, ev, d))
        .on('mouseleave', () => this._hideTooltip())
        .on('click', (event) => {
          event.stopPropagation();
          this._onEventMarkerClick(ev, d);
        });
    });
  }

  // ── Interaction handlers ─────────────────────────────────────────────

  _onDynastyHover(event, d) {
    this._updateHighlight(d.name);
    this._showDynastyTooltip(event, d);

    // Emit era-focus via event bus
    const collectedCount = this.userCollection[d.name] || d.user_collected || 0;
    this.bus.emit(EVENTS.ERA_FOCUS, {
      dynasty: d.name,
      sub_period: null,
      year: Math.round((d.start + d.end) / 2),
      triggered_by: 'time-pillar',
      user_collected: collectedCount,
      dominant_patterns: d.dominant_patterns,
    });
  }

  _onDynastyLeave() {
    // Keep highlight if a dynasty is "clicked-locked"
    if (!this._lockedDynasty) {
      this._clearHighlight();
    }
    this._hideTooltip();
  }

  _onDynastyClick(event, d) {
    this._lockedDynasty = (this._lockedDynasty === d.name) ? null : d.name;
    this._activeDynasty = this._lockedDynasty || d.name;
    this._showSideCard(d);

    // Emit with click signal
    this.bus.emit(EVENTS.ERA_FOCUS, {
      dynasty: d.name,
      triggered_by: 'time-pillar',
      interaction: 'click',
      dominant_patterns: d.dominant_patterns,
    });

    if (this.onDynastyClick) this.onDynastyClick(d);
  }

  _onEventMarkerClick(ev, d) {
    this._showEventSideCard(ev, d);
    if (this.onEventMarkerClick) this.onEventMarkerClick(ev, d);
  }

  // ── Tooltip & side card ───────────────────────────────────────────────

  _showDynastyTooltip(event, d) {
    const collectedCount = this.userCollection[d.name] || d.user_collected || 0;
    const totalPool = d.artifact_count_pool || '?';
    const density = Math.round((collectedCount / (d.artifact_count_pool || 1)) * 100);

    const startLabel = d.start < 0 ? `前${Math.abs(d.start)}年` : `${d.start}年`;
    const endLabel = d.end < 0 ? `前${Math.abs(d.end)}年` : `${d.end}年`;

    this._tooltip.innerHTML = `
      <div style="font-size:16px; font-weight:bold; color:${d.color}; margin-bottom:6px;">
        ${d.name}（${d.name_en}）
      </div>
      <div style="color:#9a8060; font-size:11px; margin-bottom:8px;">
        ${startLabel} — ${endLabel} · ${d.duration_years} 年
      </div>
      <div style="margin-bottom:6px;">
        收藏进度：<span style="color:#c8a860">${collectedCount}</span>
        <span style="color:#6a5a3a"> / ${totalPool} 件</span>
        <span style="color:#9a8060; margin-left:8px;">(${density}%)</span>
      </div>
      ${d.dominant_patterns ? `<div style="color:#7a9060; font-size:10px;">主流纹饰：${d.dominant_patterns.slice(0, 3).join(' · ')}</div>` : ''}
      <div style="color:#6a5a3a; font-size:10px; margin-top:6px;">
        点击查看详情 · 悬停触发三维联动
      </div>
    `;
    this._showTooltip(event);
  }

  _showEventTooltip(event, ev, d) {
    const yearLabel = ev.year < 0 ? `前 ${Math.abs(ev.year)} 年` : `公元 ${ev.year} 年`;
    this._tooltip.innerHTML = `
      <div style="font-size:14px; font-weight:bold; color:#c04030; margin-bottom:6px;">
        ${ev.name}
      </div>
      <div style="color:#9a8060; font-size:11px; margin-bottom:8px;">${yearLabel} · ${d.name}</div>
      <div style="font-size:12px; color:#c8b890; line-height:1.7;">
        ${ev.desc || ''}
      </div>
    `;
    this._showTooltip(event);
  }

  _showTooltip(event) {
    const tip = this._tooltip;
    const x = event.clientX + 14;
    const y = event.clientY - 10;
    // Keep in viewport
    const vw = window.innerWidth;
    const left = x + 300 > vw ? event.clientX - 310 : x;
    tip.style.left = left + 'px';
    tip.style.top = y + 'px';
    tip.style.opacity = '1';
  }

  _hideTooltip() {
    if (this._tooltip) this._tooltip.style.opacity = '0';
  }

  _showSideCard(d) {
    const collectedCount = this.userCollection[d.name] || d.user_collected || 0;
    const totalPool = d.artifact_count_pool || '?';
    const startLabel = d.start < 0 ? `前${Math.abs(d.start)}` : `${d.start}`;
    const endLabel = d.end < 0 ? `前${Math.abs(d.end)}` : `${d.end}`;

    const subPeriodsList = (d.sub_periods || []).map(sp =>
      `<li style="color:#8a7860">${sp.name}（${sp.start < 0 ? '前' + Math.abs(sp.start) : sp.start}—${sp.end < 0 ? '前' + Math.abs(sp.end) : sp.end}）</li>`
    ).join('');

    const eventsList = (d.events || []).slice(0, 4).map(ev =>
      `<li><span style="color:#c04030">${ev.year < 0 ? '前' + Math.abs(ev.year) : ev.year}年</span>
       <span style="color:#c8b890"> ${ev.name}</span></li>`
    ).join('');

    const repArtifacts = (d.representative_artifacts || []).map(a =>
      `<li style="color:#a08040">· ${a}</li>`
    ).join('');

    this._sideCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:18px; font-weight:bold; color:${d.color};">${d.name}</span>
        <span style="font-size:10px; color:#6a5a3a; cursor:pointer;" onclick="this.parentElement.parentElement.style.right='-300px'">✕ 关闭</span>
      </div>
      <div style="color:#9a8060; font-size:11px; margin-bottom:10px;">
        ${startLabel} — ${endLabel} BC/AD · ${d.duration_years} 年
      </div>
      <div style="margin-bottom:10px;">
        <span style="color:#7a8060; font-size:10px;">收藏：</span>
        <span style="color:#c8a860; font-size:14px;">${collectedCount}</span>
        <span style="color:#4a3a2a"> / ${totalPool}</span>
      </div>
      ${subPeriodsList ? `<div style="margin-bottom:10px;"><div style="color:#7a6a4a; font-size:10px; margin-bottom:4px;">子分期</div><ul style="list-style:none; padding:0; font-size:11px;">${subPeriodsList}</ul></div>` : ''}
      ${eventsList ? `<div style="margin-bottom:10px;"><div style="color:#7a6a4a; font-size:10px; margin-bottom:4px;">大事</div><ul style="list-style:none; padding:0; font-size:11px;">${eventsList}</ul></div>` : ''}
      ${d.dominant_patterns ? `<div style="margin-bottom:10px;"><div style="color:#7a6a4a; font-size:10px; margin-bottom:4px;">主流纹饰</div><div style="color:#7a9060; font-size:11px;">${d.dominant_patterns.join(' · ')}</div></div>` : ''}
      ${repArtifacts ? `<div><div style="color:#7a6a4a; font-size:10px; margin-bottom:4px;">代表器物</div><ul style="list-style:none; padding:0; font-size:11px;">${repArtifacts}</ul></div>` : ''}
    `;
    this._sideCard.style.right = '0px';
    this._sideCard.style.pointerEvents = 'all';
  }

  _showEventSideCard(ev, d) {
    const yearLabel = ev.year < 0 ? `前 ${Math.abs(ev.year)} 年` : `公元 ${ev.year} 年`;
    this._sideCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:15px; font-weight:bold; color:#c04030;">${ev.name}</span>
        <span style="font-size:10px; color:#6a5a3a; cursor:pointer;" onclick="this.parentElement.parentElement.style.right='-300px'">✕</span>
      </div>
      <div style="color:#9a8060; font-size:11px; margin-bottom:10px;">
        ${yearLabel} · <span style="color:${d.color}">${d.name}</span>
      </div>
      <div style="color:#c8b890; font-size:13px; line-height:1.8;">${ev.desc || '详细记载待补充。'}</div>
    `;
    this._sideCard.style.right = '0px';
    this._sideCard.style.pointerEvents = 'all';
  }

  // ── Highlight helpers ─────────────────────────────────────────────────

  _updateHighlight(dynastyName) {
    if (!this._svg) return;
    this._svg.selectAll('.dynasty-band').each(function (d) {
      const name = this.getAttribute('data-dynasty');
      const highlightRect = d3.select(this).select('.band-highlight-rect');
      if (name === dynastyName) {
        highlightRect.attr('opacity', 1);
        d3.select(this).raise();
      } else {
        highlightRect.attr('opacity', 0);
      }
    });
  }

  _clearHighlight() {
    if (!this._svg) return;
    this._svg.selectAll('.band-highlight-rect').attr('opacity', 0);
  }

  // ── External event listener ───────────────────────────────────────────

  _listenExternalEvents() {
    // Listen for era-focus from OTHER components (geo, pattern)
    // Avoid loops: only react if triggered_by is not 'time-pillar'
    this._offEraFocus = this.bus.on(EVENTS.ERA_FOCUS, (payload) => {
      if (payload.triggered_by === 'time-pillar') return;
      if (!linkageState.isEnabled()) return;
      this.focusDynasty(payload.dynasty, 'external');
    });

    // Listen for region-focus: if geo sends a dynasty hint, we highlight
    this._offRegionFocus = this.bus.on(EVENTS.REGION_FOCUS, (payload) => {
      if (!linkageState.isEnabled()) return;
      if (payload.dynasty) this.focusDynasty(payload.dynasty, 'external');
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      if (this._offEraFocus) this._offEraFocus();
      if (this._offRegionFocus) this._offRegionFocus();
    });
  }

  /** Destroy: remove DOM elements and event listeners */
  destroy() {
    if (this._offEraFocus) this._offEraFocus();
    if (this._offRegionFocus) this._offRegionFocus();
    if (this._tooltip) this._tooltip.remove();
    if (this._sideCard) this._sideCard.remove();
    if (this.container) this.container.querySelectorAll('svg.tp-svg').forEach(e => e.remove());
  }
}

// ── Convenience factory ───────────────────────────────────────────────

/**
 * Quick-mount function for non-class usage.
 * Returns the TimePillar instance.
 */
export function mountTimePillar(container, dynasties, opts = {}) {
  const pillar = new TimePillar({ container, dynasties, ...opts });
  pillar.render();
  return pillar;
}
