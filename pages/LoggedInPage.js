class LoggedInPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('text=Log out');
  }

  async isLogoutVisible() {
    return await this.logoutButton.isVisible();
  }

  async logout() {
    await this.logoutButton.click();
    await Promise.all([
      this.page.waitForURL('**/practice-test-login/', { timeout: 60000 }),
      this.page.waitForSelector('input#username, input[name="username"]', { state: 'visible', timeout: 60000 })
    ]);
  }
}

module.exports = LoggedInPage;
