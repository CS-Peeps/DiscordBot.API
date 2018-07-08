pipeline {
  agent {
    docker {
      image 'node'
      args '-p 8001:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''npm install
npm install -g forever'''
      }
    }
    stage('Deploy') {
      steps {
        sh 'forever npm start'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = 'crediential(\'DISCORD_BOT\')'
  }
}