pipeline {
    agent { label 'docker' }  // Make sure this node has Docker installed

    environment {
        DOCKER_IMAGE = "iam-venkateshwarlu/sample-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build docker image with tag = build number
                    dockerImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Test') {
            steps {
                // Run your tests inside the docker container
                sh "docker run --rm ${DOCKER_IMAGE}:${DOCKER_TAG} ./run-tests.sh"
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }

        // Uncomment and update if you want to deploy to Kubernetes
        /*
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl config use-context your-cluster
                kubectl set image deployment/sample-app-deployment sample-app=${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
        */
    }
}
