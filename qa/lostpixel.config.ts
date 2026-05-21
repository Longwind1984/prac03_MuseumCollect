import { CustomProjectConfig } from 'lost-pixel';

/**
 * Lost Pixel — visual regression baseline.
 * Run `npx lost-pixel update` to (re)generate baseline.
 * Run `npx lost-pixel`         to compare current against baseline.
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
  lostPixelProjectId: 'museum-collect-v3',
  imagePathBaseline: './lost-pixel-baseline',
  imagePathCurrent: './lost-pixel-current',
  imagePathDifference: './lost-pixel-diff',
  shotConcurrency: 2,
  timeouts: { fetchStories: 30_000, loadState: 5_000, networkRequests: 30_000 },
  waitBeforeScreenshot: 1500,
  // Cross-version safety: don't fail the run if dirs already exist.
  generateOnly: false,
};
