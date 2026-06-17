class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://practicetestautomation.com/practice-test-login/';
    this.usernameInput = page.locator('input#username, input[name="username"]');
    this.passwordInput = page.locator('input#password, input[name="password"]');
    this.submitButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Submit")');
    this.errorLocator = page.locator('text=/Your (username|password) is invalid!/');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username ?? '');
    await this.passwordInput.fill(password ?? '');
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  getErrorMessage() {
    return this.errorLocator.first();
  }
}

module.exports = LoginPage;
