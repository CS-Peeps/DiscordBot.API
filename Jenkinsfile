pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t discord .'
      }
    }
    stage('Deploy') {
      steps {
        sh '''docker rm -f discordbot || true
docker run -d -p 8099:3000 --name discordbot discord'''
      }
    }
  }
}