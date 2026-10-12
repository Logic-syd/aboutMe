import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/layout',
  fullyParallel: true,
  workers: 2,
  timeout: 45_000,
  use: {
    baseURL: 'http://127.0.0.1:3090',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
      args: ['--no-sandbox'],
    } : undefined,
  },
  projects: [
    { name: 'desktop-large', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'desktop-laptop', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'desktop-compact', use: { viewport: { width: 1024, height: 600 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'npm run start -- --port 3090',
    url: 'http://127.0.0.1:3090',
    reuseExistingServer: !process.env.CI,
  },
});
