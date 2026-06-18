const { test, expect } = require('@playwright/test');
const apiData = require('./test-data/api-login.json');

const baseUrl = apiData.baseUrl;
const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  Connection: 'keep-alive',
  Referer: 'https://practicetestautomation.com/practice-test-login/',
};

test.describe.configure({ mode: 'serial' });

test.describe('API Login Tests', () => {
  for (const scenario of apiData.getScenarios) {
    test(`GET ${scenario.id} - ${scenario.description}`, async ({ request }) => {
      const url = new URL(scenario.path, baseUrl).toString();
      const response = await request.get(url, {
        timeout: 30000,
        headers: defaultHeaders
      });

      expect(response.status()).toBe(scenario.expectedStatus);
      const body = await response.text();

      for (const expectedText of scenario.expectedBodyContains) {
        expect(body).toContain(expectedText);
      }
    });
  }

  for (const scenario of apiData.postScenarios) {
    test(`POST ${scenario.id} - ${scenario.description}`, async ({ request }) => {
      const response = await request.post(baseUrl, {
        timeout: 30000,
        form: scenario.data,
        headers: {
          ...defaultHeaders,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      expect(response.status()).toBe(scenario.expectedStatus);
      const body = await response.text();

      for (const expectedText of scenario.expectedBodyContains) {
        expect(body).toContain(expectedText);
      }
    });
  }
});
