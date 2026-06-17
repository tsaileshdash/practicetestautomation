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
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = LoggedInPage;
