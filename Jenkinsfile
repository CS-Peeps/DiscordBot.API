pipeline {
  agent {
    docker { 
      image 'node:8.11.3'
      args '-p 8001:3000'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Deploy') {
      steps {
        sh 'npm start'
      }
    }
  }
}