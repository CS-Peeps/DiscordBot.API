pipeline {
  agent {
    docker { 
      image 'node:lts'
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