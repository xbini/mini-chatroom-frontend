Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'node:10.13.0' }
    stages {
        stage('Build') {
            steps {
                echo 'Start building'
                sh 'yarn install'
                sh 'yarn lint'
                sh 'yarn build'
            }
        }
        stage('Test') {
            steps{
                echo 'Start testing'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Start deploying'
            }
        }
    }

    post {
        failure {
            mail to: 'xluobin@163.com',
                 subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                 body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}
