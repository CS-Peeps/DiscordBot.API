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
        sh 'npm stop'
        sh 'npm start'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}