pipeline {
  agent {
    docker {
      image 'node:8.11'
      args '-p 8001:3000'
    }

  }
  stages {
    stage('Deploy') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}