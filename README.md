# Playwright POM Login Tests

This project contains Playwright tests using a simple Page Object Model for the login page at https://practicetestautomation.com/practice-test-login/.

Quick commands:

Install dependencies (already runs browsers via postinstall):

```bash
npm install
```

Run tests:

```bash
npm test
```

Generate Allure report (after tests run):

```bash
npm run allure:generate
npm run allure:open
```

Files:

- pages/LoginPage.js - Page object with locators and common methods
- tests/login.spec.js - Tests (positive & negative) driven by test-data/users.json
- test-data/users.json - Test data for multiple users
- playwright.config.js - Playwright configuration with Allure reporter
