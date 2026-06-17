const { test, expect } = require('@playwright/test');
const apiData = require('./test-data/api-login.json');

const baseUrl = apiData.baseUrl;

test.describe('API Login Tests', () => {
  for (const scenario of apiData.getScenarios) {
    test(`GET ${scenario.id} - ${scenario.description}`, async ({ request }) => {
      const url = new URL(scenario.path, baseUrl).toString();
      const response = await request.get(url);

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
        form: scenario.data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      expect(response.status()).toBe(scenario.expectedStatus);
      const body = await response.text();

      for (const expectedText of scenario.expectedBodyContains) {
        expect(body).toContain(expectedText);
      }
    });
  }
});
