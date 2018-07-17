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
        sh '''docker rm -f discord || true
docker run -d -p 8099:80 --name discordbot discord'''
      }
    }
  }
}