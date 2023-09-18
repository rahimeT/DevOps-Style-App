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
                sh 'npm install selenium-webdriver'
            }
            // NPM bağımlılıklarını yükle
        }
        
        stage('Code Scan') {
            steps {
                snykSecurity organisation: 'rahimet', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'synk-api', targetFile: 'package.json'
            }
            // Güvenlik taraması yap
        }
        stage('Image Scan') {
             steps {
                script {
                    // MySQL Dockerfile'ını kullanarak MySQL görüntüsünü oluştur
                    docker.build('mysql-database:latest', '-f ./mysql/Dockerfile .') 
            
                    // Node.js uygulamasının Dockerfile'ını kullanarak uygulama görüntüsünü oluştur
                    docker.build('app:latest', '-f Dockerfile .')
                    sh "grype --no-progress mysql-database:latest"
                    sh "grype --no-progress app:latest"
            }
                    
        }
          }
        
            
         stage('Test') {
            steps {
                sh 'npm start'
                sh 'node selenium.js' // Selenium testini çalıştırın
            }
        }
        
    }
}
