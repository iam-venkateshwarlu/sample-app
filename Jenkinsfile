pipeline {
  agent {
    docker {
      image 'venkatesh1409/sample-app:v1'
      args '--user root -v /var/run/docker.sock:/var/run/docker.sock' // mount Docker socket to access the host's Docker daemon
    }
  }
  stages {
    stage('Checkout') {
      steps {
        sh 'echo passed'
        git branch: 'main', url: 'https://github.com/iam-venkateshwarlu/sample-app.git'
      }
    }
    stage('Build and Test') {
      steps {
        sh 'ls -ltr'
        // build the project and create a JAR file
        // sh 'cd java-maven-sonar-argocd-helm-k8s/spring-boot-app && mvn clean package'
      }
    }
    
    stage('Build and Push Docker Image') {
      environment {
        DOCKER_IMAGE = "venkatesh1409/sample-app:${BUILD_NUMBER}"
        // DOCKERFILE_LOCATION = "java-maven-sonar-argocd-helm-k8s/spring-boot-app/Dockerfile"
        REGISTRY_CREDENTIALS = credentials('docker-cred')
      }
      steps {
        script {
            sh 'cd sample-app && docker build -t ${DOCKER_IMAGE} .'
            def dockerImage = docker.image("${DOCKER_IMAGE}")
            docker.withRegistry('https://index.docker.io/v1/', "docker-cred") {
                dockerImage.push()
            }
        }
      }
    }
    // stage('Update Deployment File') {
    //     environment {
    //         GIT_REPO_NAME = "sample-app"
    //         GIT_USER_NAME = "iam-venkateshwarlu"
    //     }
    //     steps {
    //         withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
    //             sh '''
    //                 git config user.email "tvenkateshwarlu39@gmail.com"
    //                 git config user.name "iam-venkateshwarlu"
    //                 BUILD_NUMBER=${BUILD_NUMBER}
    //                 sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" java-maven-sonar-argocd-helm-k8s/spring-boot-app-manifests/deployment.yml
    //                 git add java-maven-sonar-argocd-helm-k8s/spring-boot-app-manifests/deployment.yml
    //                 git commit -m "Update deployment image to version ${BUILD_NUMBER}"
    //                 git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
    //             '''
    //         }
    //     }
    // }
  }
}