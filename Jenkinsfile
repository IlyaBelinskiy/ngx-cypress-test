pipeline {

    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the application'
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
                        label 'win10-pc'
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