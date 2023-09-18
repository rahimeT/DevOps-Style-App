pipeline {
    agent any
    environment {
        GOOGLE_CREDENTIALS = credentials('gke')
        GKE_CLUSTER = 'kubernetes'
        KUBE_NAMESPACE = 'default'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_CREDENTIALS_USR='rahimeturkmennn'
        DOCKERHUB_CREDENTIALS_PSW='Aauth1234'
    }
    
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
          stage('Deploy to GKE') {
            steps {
                // GKE kümesine dağıtım yapın
                script {
                    sh "gcloud auth activate-service-account --key-file=$GOOGLE_CREDENTIALS"
                    sh "gcloud container clusters get-credentials $GKE_CLUSTER --zone your-gke-zone --project your-gcp-project-id"
                    sh "kubectl config set-context your-gke-cluster-name --namespace=$KUBE_NAMESPACE"
                    sh "kubectl apply -f ./k8s/app-deployment.yaml "
                    sh "kubectl apply -f ./k8s/mysql-deployment.yaml "
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
