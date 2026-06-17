const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const LoggedInPage = require('../pages/LoggedInPage');
const users = require('../test-data/users.json');

test.describe('Practice Test Login - POM', () => {
  for (const user of users) {
    test(`${user.id} - ${user.description}`, async ({ page }) => {
      const login = new LoginPage(page);
      const loggedIn = new LoggedInPage(page);

      await login.goto();
      await login.login(user.username, user.password);

      if (user.expected === 'success') {
        await expect(page).toHaveURL(/.*logged-in-successfully\//, { timeout: 5000 });
        await expect(loggedIn.logoutButton).toBeVisible({ timeout: 5000 });
        await loggedIn.logout();
        await expect(page).toHaveURL(login.url, { timeout: 5000 });
      } else {
        await expect(login.getErrorMessage()).toBeVisible({ timeout: 5000 });
      }
    });
  }
});
