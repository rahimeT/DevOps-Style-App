pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps{

                        checkout scm
                
            }
                // SCM'den kodu çek
                
            
        }
   
    stage('Scan') {
        steps{
                    snykSecurity organisation: 'rahimeT', projectName: 'DevOps-Style-App', severity: 'medium', snykInstallation: 'Snyk', snykTokenId: 'synk-api', targetFile: 'package.json'

            }
        
    }
  
}
}
