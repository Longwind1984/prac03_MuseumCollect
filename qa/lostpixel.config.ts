import type { CustomProjectConfig } from 'lost-pixel';

/**
 * Lost Pixel — visual regression baseline (OSS / generateOnly mode).
 *
 * Run `npx lost-pixel update` to (re)generate baseline.
 * Run `npx lost-pixel`         to compare current against baseline.
 *
 * NOTE: this config does NOT include `lostPixelProjectId` — including it
 * switches Lost Pixel to its Platform (paid SaaS) mode and requires apiKey
 * + CI vars. OSS mode keeps everything local.
 */
export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: '/demos/v3-converged/index.html',                  name: 'index' },
      { path: '/demos/v3-converged/catalog.html',                name: 'catalog' },
      { path: '/demos/v3-converged/artifact.html?id=he_zun',     name: 'artifact-he-zun' },
      { path: '/demos/v3-converged/artifact.html?id=houmuwu_ding', name: 'artifact-houmuwu' },
      { path: '/demos/v3-converged/dashboard.html',              name: 'dashboard' },
      { path: '/demos/v3-converged/me.html',                     name: 'me' },
      { path: '/demos/v3-converged/time-pillar.html',            name: 'time-pillar' },
      { path: '/demos/v3-converged/geo-system.html',             name: 'geo-system' },
      { path: '/demos/v3-converged/pattern-tree.html',           name: 'pattern-tree' },
      { path: '/demos/v3-converged/inscription-reader.html',     name: 'inscription-reader' },
      { path: '/demos/v3-converged/caster-profile.html',         name: 'caster-profile' },
      { path: '/demos/v3-converged/purpose-scene.html',          name: 'purpose-scene' },
    ],
    baseUrl: 'http://localhost:8765',
  },
  imagePathBaseline: './lost-pixel-baseline',
  imagePathCurrent: './lost-pixel-current',
  imagePathDifference: './lost-pixel-diff',
  shotConcurrency: 2,
  timeouts: { fetchStories: 30_000, loadState: 5_000, networkRequests: 30_000 },
  waitBeforeScreenshot: 1500,
  failOnDifference: false,
  // Override Chromium launch (lost-pixel's default --headless=old is removed from modern Chromium)
  browserLaunchOptions: {
    chromium: { headless: true, channel: 'chromium' as any },
  } as any,
};
