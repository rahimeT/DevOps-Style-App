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
                    def dockerImage = docker.build('mysql-database:latest', '-f ./mysql/Dockerfile .') 
                    def dockerImage2 = docker.build('app:latest', '-f Dockerfile .')
                    docker.withRegistry('https://hub.docker.com/', 'dckr_pat_BtAsQVjSsn3cTOzyxpHo11HrC-Y') {
                        dockerImage.push()
                    }
                    docker.withRegistry('https://hub.docker.com/', 'dckr_pat_BtAsQVjSsn3cTOzyxpHo11HrC-Y') {
                        dockerImage2.push()
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
