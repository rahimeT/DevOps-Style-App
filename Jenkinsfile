pipeline {
    agent any // Jenkins ajanını kullan (boşta beklemesine gerek yok)
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // SonarQube analizini yapmak için SonarScanner'ı kullan
                withSonarQubeEnv('http://35.226.77.45:9000/') {
                    sh 'npm install' // Projede kullanılan bağımlılıkları yükle
                    sh 'npm run sonarqube' // SonarQube analiz komutunu projenizin package.json dosyasına eklemiş olmalısınız
                }
            }
        }
    }
}
