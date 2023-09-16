pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                checkout scm
            }
            // SCM'den kodu çek
        }
   
        stage('Download and Install Node.js and npm') {
            steps {
                sh '''
                    curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
                    sudo apt-get install -y nodejs
                '''
            }
            // Node.js ve npm'i indir ve kur
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
