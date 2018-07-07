pipeline {
  agent {
    docker {
      image 'node'
      args '-p 8001:3000'
    }
  }
  stage('Build') {
    steps {
      sh 'npm install'
    }
  }
}