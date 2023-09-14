pipeline {
    agent any
    
    stages {
        stage('SCM Checkout') {
            steps {
                // SCM'den kodu çek
                checkout scm
            }
        }
        
        stage('Build and Test') {
            steps {
                // Node.js projenizin kurulumunu yapın
                // Gerekli bağımlılıkları yükleyin (örneğin, npm install)
                // Projenizi derleyin veya test edin (örneğin, npm run build veya npm test)
            }
        }
        
        stage('SonarQube Analysis') {
            environment {
                // SonarQube sunucu bilgilerinizi belirtin
                SONARQUBE_URL = 'http://35.226.77.45:9000/'
                SONARQUBE_TOKEN = credentials('sonar') // Jenkins credentials ile token'i gizli bir şekilde alabilirsiniz
            }
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'; // Jenkins içinde yapılandırılmış SonarScanner aracı
                    withSonarQubeEnv('SonarQube Server') {
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=rahimeturkmen \
                        -Dsonar.projectName='devops-style-app' \
                        -Dsonar.sources=. \
                        -Dsonar.login=${SONARQUBE_TOKEN} \
                        -Dsonar.host.url=${SONARQUBE_URL}
                        """
                    }
                }
            }
        }
    }
}
