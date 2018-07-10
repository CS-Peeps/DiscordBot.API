pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        sh 'docker build -t discord .'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}