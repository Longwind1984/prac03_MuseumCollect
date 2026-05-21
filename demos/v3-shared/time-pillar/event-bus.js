/**
 * event-bus.js — Shared cross-dimensional event bus for MuseumCollect v3
 *
 * This module is the single source of truth for the 3-way linkage:
 *   time-pillar <-> geo-system <-> pattern-tree
 *
 * All three v3 modules (B1 geo, B2 pattern, B3 time-pillar) import from this file.
 * The Converger page imports it too, so it handles all cross-component binding.
 *
 * CONTRACT (registered events):
 * ─────────────────────────────────────────────────────────────────────
 * era-focus
 *   Emitted by: time-pillar (B3)
 *   Listened by: geo-system (B1), pattern-tree (B2), artifact gallery
 *   Payload: { dynasty: string, sub_period?: string, year?: number, triggered_by: string }
 *   Example: { dynasty: '商', sub_period: '商晚期·殷墟期', year: -1200, triggered_by: 'time-pillar' }
 *
 * region-focus
 *   Emitted by: geo-system (B1)
 *   Listened by: time-pillar (B3), pattern-tree (B2)
 *   Payload: { site: string, region: string, dynasty?: string, triggered_by: string }
 *   Example: { site: '殷墟', region: '中原核心区', dynasty: '商', triggered_by: 'geo-system' }
 *
 * pattern-focus
 *   Emitted by: pattern-tree (B2)
 *   Listened by: time-pillar (B3), geo-system (B1), artifact gallery
 *   Payload: { pattern: string, dynasty?: string, triggered_by: string }
 *   Example: { pattern: '饕餮纹', dynasty: '商', triggered_by: 'pattern-tree' }
 *
 * artifact-collect
 *   Emitted by: any component (artifact card, catalog, scan)
 *   Listened by: time-pillar (updates density), geo-system (updates site dots), me-page
 *   Payload: { artifact_id: string, dynasty: string, action: 'collect' | 'uncollect', triggered_by: string }
 *   Example: { artifact_id: 'houmuwu_ding', dynasty: '商', action: 'collect', triggered_by: 'catalog' }
 *
 * artifact-focus
 *   Emitted by: any component when a single artifact is highlighted
 *   Listened by: all panels that show artifact context
 *   Payload: { artifact_id: string, triggered_by: string }
 *
 * linkage-toggle
 *   Emitted by: user toggling the "联动模式" switch
 *   Listened by: all cross-dim components
 *   Payload: { enabled: boolean }
 * ─────────────────────────────────────────────────────────────────────
 *
 * Usage (ESM):
 *   import { bus } from './event-bus.js';
 *   bus.emit('era-focus', { dynasty: '商', triggered_by: 'time-pillar' });
 *   const off = bus.on('era-focus', ({ dynasty }) => console.log(dynasty));
 *   off(); // unsubscribe
 *
 * Usage (global fallback for non-module scripts):
 *   window.MuseumBus.emit('era-focus', { dynasty: '商', triggered_by: 'external' });
 */

// ── Core bus ──────────────────────────────────────────────────────────

export const bus = {
  /**
   * Emit a named event with payload.
   * @param {string} eventName - One of the documented event names above
   * @param {object} payload   - Structured payload per event contract
   */
  emit(eventName, payload) {
    const event = new CustomEvent(eventName, {
      detail: payload,
      bubbles: false,
      cancelable: false,
    });
    document.dispatchEvent(event);
    // Also log to debug panel if present
    _debugLog('emit', eventName, payload);
  },

  /**
   * Listen for a named event.
   * @param {string}   eventName - Event name to listen for
   * @param {function} handler   - Called with (payload) — NOT the raw event
   * @returns {function} Unsubscribe function — call it to remove the listener
   */
  on(eventName, handler) {
    const wrapper = (e) => handler(e.detail);
    document.addEventListener(eventName, wrapper);
    _debugLog('on', eventName, null);
    return () => {
      document.removeEventListener(eventName, wrapper);
      _debugLog('off', eventName, null);
    };
  },

  /**
   * Listen for an event exactly once, then auto-remove.
   */
  once(eventName, handler) {
    const off = this.on(eventName, (payload) => {
      handler(payload);
      off();
    });
    return off;
  },
};

// ── Linkage state (shared across components) ──────────────────────────

export const linkageState = {
  enabled: true,

  /** Toggle cross-dim linkage on/off */
  toggle(val) {
    this.enabled = typeof val === 'boolean' ? val : !this.enabled;
    bus.emit('linkage-toggle', { enabled: this.enabled });
    return this.enabled;
  },

  /** Components should check this before reacting to cross-dim events */
  isEnabled() {
    return this.enabled;
  },
};

// ── Debug panel integration ───────────────────────────────────────────

const _eventLog = [];

function _debugLog(action, eventName, payload) {
  const entry = { ts: Date.now(), action, eventName, payload };
  _eventLog.push(entry);
  if (_eventLog.length > 100) _eventLog.shift(); // cap log

  // Push to DOM debug panel if present
  const panel = document.getElementById('bus-debug-panel');
  if (!panel) return;
  const item = document.createElement('div');
  item.className = 'bus-log-item bus-log-' + action;
  const time = new Date(entry.ts).toLocaleTimeString('zh-CN', { hour12: false });
  item.innerHTML =
    `<span class="bus-log-time">${time}</span>` +
    `<span class="bus-log-action">${action.toUpperCase()}</span>` +
    `<span class="bus-log-name">${eventName}</span>` +
    (payload ? `<span class="bus-log-payload">${JSON.stringify(payload)}</span>` : '');
  panel.prepend(item);
  // Keep last 20 visible
  while (panel.children.length > 20) panel.lastChild.remove();
}

/** Expose event log for inspection */
export function getEventLog() {
  return [..._eventLog];
}

// ── Global fallback (non-module pages) ───────────────────────────────

if (typeof window !== 'undefined') {
  window.MuseumBus = bus;
  window.MuseumLinkage = linkageState;
}

// ── Documented event name constants ──────────────────────────────────

export const EVENTS = {
  ERA_FOCUS: 'era-focus',
  REGION_FOCUS: 'region-focus',
  PATTERN_FOCUS: 'pattern-focus',
  ARTIFACT_COLLECT: 'artifact-collect',
  ARTIFACT_FOCUS: 'artifact-focus',
  LINKAGE_TOGGLE: 'linkage-toggle',
};
