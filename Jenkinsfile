pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
    }

  }
  stages {
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