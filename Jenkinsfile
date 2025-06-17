pipeline {
    agent any

    // environment {
    //     DOCKER_IMAGE = "venkatesh1409/sample-app"
    //     DOCKER_TAG = "latest ."
    // }

    stages {
        stage('Checkout') {
            steps {
               git branch: 'main', url:'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("iam-venkateshwarlu/sample-app:${env.BUILD_NUMBER}")

                }
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm iam-venkateshwarlu/sample-app:${env.BUILD_NUMBER} ./run-tests.sh'
            }
        }

        stage('Push to DockerHub') {
            steps {
                docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        dockerImage.push()
                }
            }
        }

        // stage('Deploy to Kubernetes') {
        //     steps {
        //         sh '''
        //         kubectl config use-context your-cluster
        //         kubectl set image deployment/sample-app-deployment sample-app=${DOCKER_IMAGE}:latest
        //         '''
        //     }
        // }
    }
}
