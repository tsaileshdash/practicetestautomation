const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LoggedInPage = require('../pages/LoggedInPage');
const users = require('../test-data/users.json');

test.describe('Practice Test Login - POM', () => {
  test.beforeEach(async ({ page }) => {
    console.log('🔧 Test setup started');
  });

  test.afterEach(async ({ page }) => {
    console.log('✅ Test cleanup completed');
  });

  for (const user of users) {
    test(`${user.id} - ${user.description}`, async ({ page }) => {
      test.info().annotations.push(
        { type: 'user', description: user.id },
        { type: 'description', description: user.description },
        { type: 'expected', description: user.expected }
      );

      await test.step('Navigate to login page', async () => {
        const login = new LoginPage(page);
        await login.goto();
      });

      const login = new LoginPage(page);
      const loggedIn = new LoggedInPage(page);

      await test.step('Perform login', async () => {
        await login.login(user.username, user.password);
      });

      if (user.expected === 'success') {
        await test.step('Verify successful login', async () => {
          await expect(page).toHaveURL(/.*logged-in-successfully\//, { timeout: 5000 });
          await expect(loggedIn.logoutButton).toBeVisible({ timeout: 5000 });
        });

        await test.step('Perform logout', async () => {
          await loggedIn.logout();
          await expect(page).toHaveURL(login.url, { timeout: 5000 });
        });
      } else {
        await test.step('Verify login failure message', async () => {
          await expect(login.getErrorMessage()).toBeVisible({ timeout: 5000 });
        });
      }
    });
  }
});
