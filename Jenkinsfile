pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                //git branch: 'main', url: 'https://github.com/iam-venkateshwarlu/sample-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run start'
            }
        }
    }
}
