import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config — v4.5 Tier 1 QA tooling
 *
 * Local-only: spawns a python http.server rooted at /home/user/prac03_MuseumCollect.
 * Tests load demo pages via http://localhost:8765/demos/v3-converged/<page>.html
 *
 * Note: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers must be set for chromium to launch
 * in this container (the matching browser is chromium-1194; playwright pinned to 1.56.0).
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  workers: 2,
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['html', { open: 'never', outputFolder: 'test-results/html' }],
  ],
  use: {
    baseURL: 'http://localhost:8765',
    viewport: { width: 1280, height: 800 },
    actionTimeout: 8_000,
    navigationTimeout: 15_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 8765 --directory /home/user/prac03_MuseumCollect',
    url: 'http://localhost:8765/demos/v3-converged/index.html',
    timeout: 15_000,
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
