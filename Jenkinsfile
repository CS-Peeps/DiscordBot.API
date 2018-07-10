pipeline {
  agent any
  stages {
    stage('Deploy') {
      steps {
        writeFile(file: 'config.json', text: 'Hello')
        sh 'docker build -t discord .'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}