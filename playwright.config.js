/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: 'tests',
  timeout: 60000,
  retries: 1,
  fullyParallel: false,
  workers: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
    baseURL: 'https://practicetestautomation.com',
    ignoreHTTPSErrors: true,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      disableWebdriverSteps: false,
      useLegacyStepReporting: false,
      suiteTitle: true,
      categories: [
        {
          name: 'Uncategorized Failures',
          matchedStatuses: ['failed']
        }
      ]
    }]
  ]
};
