pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps{

                step('checkout'){
                        checkout scm
                }
            }
                // SCM'den kodu çek
                
            
        }
    stage('install'){
        steps{

                step('checkout'){
                    sh 'npm install' // Dependency Installation stage
                }
            }
        
    }
    stage('Scan') {
        steps{

                step('checkout'){
                    snykSecurity organisation: 'rahimeT', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'synk-api', targetFile: 'package.json'
                }
            }
        
    }
  
}
}
