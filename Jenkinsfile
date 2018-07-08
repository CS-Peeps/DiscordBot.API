pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
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
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = 'crediential(\'DISCORD_BOT\')'
  }
}