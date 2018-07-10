pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        sh 'docker build -t discord .'
        writeFile(file: 'config.json', text: 'Hello')
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}