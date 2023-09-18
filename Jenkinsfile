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
                snykSecurity organisation: 'rahimet', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'synk-api', targetFile: 'Code Analysis'
            }
            // Güvenlik taraması yap
        }
        stage('Image Scan') {
             steps {
                script {
                    // MySQL Dockerfile'ını kullanarak MySQL görüntüsünü oluştur
                    docker.build('mysql-database:latest', '-f /mysql/Dockerfile .') 
            
                    // Node.js uygulamasının Dockerfile'ını kullanarak uygulama görüntüsünü oluştur
                    docker.build('app:latest', '-f Dockerfile .')
                
            
                    snykDockerScan(
                        targetImage: 'mysql-database:latest',
                        orgId: '10763819-2628-4c1d-8b13-ca64db1f5426',
                        snykToken: credentials('synk-api')
                    )
            }
                    snykDockerScan(
                        targetImage: 'app:latest',
                        orgId: '10763819-2628-4c1d-8b13-ca64db1f5426',
                        snykToken: credentials('synk-api')
                    )
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
