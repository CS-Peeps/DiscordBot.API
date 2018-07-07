pipeline {
  agent {
    node {
      label 'Start'
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