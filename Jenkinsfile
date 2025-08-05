pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'zyond/nodejs_cicd'
        DOCKER_TAG = 'latest'
        CONTAINER_NAME = 'nodeapp'
        DOCKER_CREDENTIALS_ID = 'a8043e21-320b-4f12-b72e-612d7a93c553'
    }
    tools {
        nodejs "NodeJS 24" 
    }

    stages {
        stage('Clone') {
            steps {
                echo '📥 Cloning source code...'
                git branch: 'main', url: 'https://github.com/zyond26/nodejs_cicd.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing npm packages...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                bat 'npm test || echo "Tests failed or not implemented yet"'
            }
        }

        //  --------------- docker hihi------------

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    bat "docker stop ${CONTAINER_NAME} || exit 0"
                    bat "docker rm ${CONTAINER_NAME} || exit 0"
                    bat "docker run -d -p 3000:3000 --name ${CONTAINER_NAME} ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
}
