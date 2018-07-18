pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''docker build \\
--build-arg discord_bot=${DISCORD_BOT} \\
 -t discord .'''
      }
    }
    stage('Deploy') {
      steps {
        sh '''docker rm -f discordbot || true
docker run -d -p 8099:3000 --name discordbot discord'''
      }
    }
  }
  environment {
    DISCORD_BOT = credentials('DISCORD_BOT')
  }
}