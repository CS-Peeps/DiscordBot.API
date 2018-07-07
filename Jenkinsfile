pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 8001:3000'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    NODE_ENV = 'production'
    DISCORD_BOT = 'NDU0MzQ5NTE0ODU0MTA1MDg5.DfsJgg.Ce0gLS1AxcWXjFXKxrdcGVivgtE'
  }
}