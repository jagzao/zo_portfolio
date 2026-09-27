pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Install') {
      steps {
        dir('apps/portfolio') {
          sh 'npm install --no-audit --no-fund'
        }
      }
    }

    stage('Deterministic Quality Gates') {
      parallel {
        stage('Typecheck') {
          steps { dir('apps/portfolio') { sh 'npm run typecheck' } }
        }
        stage('Lint') {
          steps { dir('apps/portfolio') { sh 'npm run lint' } }
        }
        stage('Unit') {
          steps { dir('apps/portfolio') { sh 'npm run test' } }
        }
      }
    }

    stage('Build') {
      steps { dir('apps/portfolio') { sh 'npm run build' } }
    }

    stage('SonarQube (optional)') {
      when {
        expression { return env.SONAR_HOST_URL?.trim() }
      }
      steps {
        sh 'sonar-scanner'
      }
    }

    stage('Playwright Chromium') {
      steps {
        dir('apps/portfolio') {
          sh 'npx playwright install --with-deps chromium'
          sh 'npm run e2e -- --project=chromium'
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'apps/portfolio/playwright-report/**,apps/portfolio/test-results/**', allowEmptyArchive: true
    }
  }
}
