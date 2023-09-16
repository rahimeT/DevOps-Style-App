pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                checkout scm
            }
            // SCM'den kodu çek
        }
        
        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
            // NPM bağımlılıklarını yükle
        }
        
        stage('Scan') {
            steps {
                snykSecurity organisation: 'rahimeT', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'snyk-api', targetFile: 'package.json'
            }
            // Güvenlik taraması yap
        }
    }
}
