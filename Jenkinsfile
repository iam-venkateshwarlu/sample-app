pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "venkatesh1409/sample-app"
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
                    docker.build("${DOCKER_IMAGE}:latest .")
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
                    script {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl config use-context your-cluster
                kubectl set image deployment/sample-app-deployment sample-app=${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}
