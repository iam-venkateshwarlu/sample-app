pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                //git branch: 'main', url: 'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Test') {
            steps {
                sh 'sudo apt update && sudo apt install -y npm'
                sh 'npm test'
                // Run your tests inside the docker container
                // sh "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} ./run-tests.sh"
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
