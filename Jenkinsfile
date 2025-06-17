pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'venkatesh1409/sample-app'
        DOCKER_TAG = 'latest'
        DOCKER_CREDENTIALS_ID = 'Docker-hub'
    }

    stages {
        stage('Debug Docker Access') {
            steps {
                sh 'echo "PATH: $PATH"'
                sh 'which docker || echo "Docker not found"'
                sh 'docker --version || echo "Docker not available"'
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID,
                                                 usernameVariable: 'DOCKER_USER',
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker logout
                    '''
                }
            }
        }
    }
}
