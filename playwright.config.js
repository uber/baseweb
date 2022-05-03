const { devices } = require('@playwright/test');

const config = {
  forbidOnly: !!process.env.CI,
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
  retries: process.env.CI ? 2 : 0,
  testMatch: ['**/__tests__/*.e2e.js'],
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
};

module.exports = config;
