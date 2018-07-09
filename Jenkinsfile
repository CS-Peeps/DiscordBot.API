pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
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