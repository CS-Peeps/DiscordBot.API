pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 8001:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
  }
}
