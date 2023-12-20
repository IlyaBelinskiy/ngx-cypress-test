pipeline {

    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build and start Web application') {
            steps {
                echo 'Build and start the WEB application'
                bat 'npm install --force'
                bat 'npm start'
            }
        }
        stage('cypress parallel tests') {
            parallel {
                stage('tester A') {
                    steps {
                        bat 'npm run cy:run'
                    }
                }

                stage('tester A_1') {
                    steps {
                        bat 'npm run cy:run'
                    }
                }
            
                stage('tester B') {
                    agent {
                        label 'win-pc'
                    }
                    steps {
                        bat 'npm run cy:run'
                    }
                }
            }   
        }
        stage('Deploy') {
            steps {
                echo 'Deploy the WEB application'
            }
        }
    }
}