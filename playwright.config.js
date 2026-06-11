
// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the NOVA e-commerce test framework.
 * Site under test: ./ecommerceTestApp (served via Python http.server)
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 30_000,

  /* Maximum time expect() should wait for a condition. */
  expect: { timeout: 5_000 },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter — HTML for local viewing, list for terminal output, JSON for CI. */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL — tests can use page.goto('/') or page.goto('/checkout.html') */
    baseURL: 'http://localhost:8080',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Screenshot on failure only — keeps test-results/ from ballooning. */
    screenshot: 'only-on-failure',

    /* Video on retry — saves disk space vs. always-on. */
    video: 'retain-on-failure',

    /* Default action timeout — clicks, fills, etc. */
    actionTimeout: 10_000,

    /* Default navigation timeout — page.goto, etc. */
    navigationTimeout: 15_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Auto-start Python's http.server before tests, shut down after. */
  webServer: {
    command: 'python3 -m http.server 8080 --directory ecommerceTestApp',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
