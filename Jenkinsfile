pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                // SCM'den kodu çek
                checkout scm
            }
        }
    stage('install'){
        sh 'npm install' // Dependency Installation stage
    }
    stage('Scan') {
        snykSecurity organisation: 'rahimeT', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'synk-api', targetFile: 'package.json'
    }
    stage('Build') {
        echo "Build"
    }
    stage('Results') {
        echo "Test Result"
    }
}
}
