pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        PATH = "/opt/node-v18.0.0/bin:/usr/local/bin:${PATH}"
        CI = 'true'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    echo 'Cleaning previous test results...'
                    sh '''
                        rm -rf allure-results allure-report test-results
                        mkdir -p allure-results
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing project dependencies...'
                    sh '''
                        npm install --prefer-offline
                        npx playwright install
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Running Playwright tests with Allure reporter...'
                    sh '''
                        npx playwright test --workers=1 --timeout=60000 --reporter=list
                    '''
                }
            }
            post {
                always {
                    script {
                        echo 'Tests execution completed.'
                        sh '''
                            echo "=== Checking allure-results directory ==="
                            ls -la allure-results/ || echo "No allure-results directory found"
                            echo "=== Result files ==="
                            find allure-results -type f | head -20 || echo "No result files found"
                        '''
                    }
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    echo 'Generating Allure report...'
                    sh '''
                        if [ -d "allure-results" ] && [ "$(ls -A allure-results)" ]; then
                            echo "Found test results. Generating report..."
                            npx allure generate allure-results -o allure-report --clean
                            echo "Report generated successfully"
                        else
                            echo "WARNING: No test results found in allure-results directory"
                            mkdir -p allure-report
                        fi
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Archiving test artifacts...'
                archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                
                echo 'Publishing Allure report...'
                allure results: [[path: 'allure-results']]
            }
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check test results for details.'
            sh '''
                echo "=== Test Results Debug Info ==="
                pwd
                ls -la
                echo "=== Allure Results Content ==="
                find allure-results -type f 2>/dev/null | head -10 || echo "No allure-results"
            '''
        }
    }
}
