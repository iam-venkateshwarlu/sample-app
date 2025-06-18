pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "venkatesh1409/sample-app"
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }
}
