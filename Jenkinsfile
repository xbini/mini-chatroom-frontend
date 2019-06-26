pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Start building'
                sh '/home/luobin/.nvm/versions/node/v10.16.0/bin/yarn install'
                sh '/home/luobin/.nvm/versions/node/v10.16.0/bin/yarn lint'
                sh '/home/luobin/.nvm/versions/node/v10.16.0/bin/yarn build'
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
                sh 'cd dist/'
                sh 'tar -zcvf dist.tar.gz .'
                sh 'cp dist.tar.gz /var/website/vue-start'
                sh 'cd /var/website/vue-start'
                sh 'tar -zxvf dist.tar.gz'
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
