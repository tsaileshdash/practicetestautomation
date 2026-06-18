# Jenkins Setup Guide - Allure Report Integration

This guide explains how to configure a Jenkins job to run Playwright tests and display the Allure report.

## Prerequisites

Before setting up the Jenkins job, ensure the following are installed on your Jenkins server:

1. **Node.js** (v14+)
2. **Allure Commandline** (install via npm globally or configure in pipeline)
3. **Jenkins Plugins**:
   - Pipeline
   - Allure Plugin (https://plugins.jenkins.io/allure-jenkins-plugin/)
   - Git Plugin

## Jenkins Job Setup Steps

### Step 1: Install Allure Plugin on Jenkins
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search for "Allure" 
3. Install **Allure Plugin** by Apache (or any Allure Jenkins Plugin)
4. Restart Jenkins if prompted

### Step 2: Configure Allure in Jenkins
1. Go to **Manage Jenkins** → **Configure System**
2. Find **Allure Commandline** section
3. Click **Add** and configure:
   - **Name**: `Default` (or your preferred name)
   - **Installation directory**: `/opt/allure` (or your preferred path)
   - **Install automatically**: Check this box

### Step 3: Create a Jenkins Pipeline Job
1. Click **New Item**
2. Enter a name for your job (e.g., "Playwright-GoogleAutomate")
3. Select **Pipeline**
4. Click **OK**

### Step 4: Configure Pipeline
1. Under **Pipeline** section, set **Definition** to: **Pipeline script from SCM**
2. Select **Git** as SCM
3. Enter repository URL: `https://github.com/yourusername/your-repo.git`
4. Set **Script Path** to: `Jenkinsfile`
5. Click **Save**

### Step 5: Verify Jenkinsfile
The `Jenkinsfile` in your project includes:
- ✅ Dependency installation (`npm install`)
- ✅ Test execution with Allure reporter (`npm test`)
- ✅ Report generation (`npm run allure:generate`)
- ✅ Allure plugin integration

### Step 6: Run the Job
1. Click **Build Now**
2. Wait for the job to complete
3. Once successful, the Allure report will be available in the job's page

## Viewing the Allure Report in Jenkins

### Option 1: Via Jenkins UI
1. Open your job's build page
2. Look for **Allure Report** link in the left sidebar
3. Click to view the interactive Allure report

### Option 2: Direct Access
After a successful build, access the report at:
```
http://your-jenkins-url/job/job-name/build-number/allure/
```

## What the Report Includes

- **Dashboard**: Overall test statistics and trends
- **Tests**: Individual test results with status and duration
- **Timeline**: Test execution timeline
- **Behaviors**: Tests grouped by feature/behavior
- **History**: Test result trends over builds
- **Graph**: Test statistics visualization

## Troubleshooting

### Report Not Showing?
1. Verify Allure Plugin is installed: **Manage Jenkins** → **Manage Plugins**
2. Check console output for any errors
3. Ensure `allure-results` directory is being generated

### No Test Results?
1. Verify tests are actually running: Check **Console Output**
2. Check if test files exist in `tests/` directory
3. Run tests locally first: `npm test`

### Jenkins Server Issues?
1. Check if Node.js is installed on Jenkins server: `node --version`
2. Verify npm packages can be installed
3. Check Jenkins server logs for errors

## Additional Configuration

### Email Notifications (Optional)
Add to `post` section in Jenkinsfile:
```groovy
emailext(
    subject: 'Test Report: ${JOB_NAME} #${BUILD_NUMBER}',
    body: 'Build ${BUILD_NUMBER} completed. Check Allure report: ${BUILD_URL}allure/',
    to: 'your-email@example.com'
)
```

### Slack Notifications (Optional)
Add to `post` section in Jenkinsfile:
```groovy
slackSend(
    color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
    message: "Test completed for ${JOB_NAME}: ${currentBuild.result}\nReport: ${BUILD_URL}allure/"
)
```

## Local Testing

Before running on Jenkins, test locally:
```bash
npm install
npm test
npm run allure:generate
npm run allure:open
```

## Architecture

```
Jenkins Job
    ↓
1. Install Dependencies (npm install)
    ↓
2. Run Tests (npm test)
    ↓ (generates allure-results)
    ↓
3. Generate Report (npm run allure:generate)
    ↓ (generates allure-report)
    ↓
4. Publish Results (Allure Plugin)
    ↓
Allure Report Available in Jenkins UI
```

## File Structure

- `Jenkinsfile` - Pipeline configuration
- `playwright.config.js` - Playwright configuration with Allure reporter
- `allure-results/` - Raw test results (generated)
- `allure-report/` - Generated HTML report (generated)
- `package.json` - NPM scripts and dependencies

---

For more information, visit:
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [Playwright Documentation](https://playwright.dev/)
- [Jenkins Pipeline Documentation](https://www.jenkins.io/doc/book/pipeline/)
