pipeline {

    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build and start Web application') {
            steps {
                echo 'Start the WEB application'
                bat "npm install --force && npm run start"
            }
        }
        stage('cypress parallel tests') {
        
            parallel {
                stage('tester A') {
                    steps {
                        bat "npm run cy:run"
                    }
                }
            
                stage('tester B') {
                    agent {
                        label 'win-pc'
                }
                    steps {
                        bat "npm run cy:run"
                   }
            }
           }   
        }
        stage('Deploy') {
            steps {
                echo 'Deploy the application'
            }
        }
    }
}