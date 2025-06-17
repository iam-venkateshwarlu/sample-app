pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Test') {
            steps {
                sh 'sudo npm install'
                sh 'npm test'
                // Run your tests inside the docker container
                // sh "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} ./run-tests.sh"
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
