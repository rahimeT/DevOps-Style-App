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
               
                    withDockerRegistry(credentialsId: 'dockerhub') {
                        sh 'docker build -t rahimeturkmennn/app:${BUILD_ID} -f Dockerfile . '
                        sh 'docker build -t rahimeturkmennn/mysql-database:${BUILD_ID} -f ./mysql/Dockerfile . '
                        sh 'docker push rahimeturkmennn/app:${BUILD_ID}'
                        sh 'docker push rahimeturkmennn/mysql-database:${BUILD_ID}'
                    }

                  
                    sh "grype  mysql-database:latest"
                    sh "grype  app:latest"
            }
                    
        }
          }
          stage('Deploy to test cluster') {
            steps {
                // GKE kümesine dağıtım yapın
                script {
                    
                    sh 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" '
                   
                    sh "gcloud auth activate-service-account --key-file=jenkins-sa.json"
                    sh "gcloud container clusters get-credentials cluster-1 --zone us-central1-a --project kubernetes-395008"
                    sh 'sed -i "s/latest/${BUILD_NUMBER}/g" ./k8s/app-deployment.yaml'
                    sh 'sed -i "s/latest/${BUILD_NUMBER}/g" ./k8s/mysql-deployment.yaml'
                    sh 'kubectl apply -f ./k8s/app-deployment.yaml'
                    sh 'kubectl apply -f ./k8s/mysql-deployment.yaml'
                    
                }
            }
        }
    
         stage('Test') {
            steps {
                sh 'npm start'
                sh 'sudo node selenium.js' // Selenium testini çalıştırın
            }
        }
        stage('Deploy to prod cluster') {
            steps {
                sh 'echo başarılı'
            }
        }
        
    }
}
