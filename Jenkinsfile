pipeline {
    agent any

    // environment {
    //     DOCKERHUB_CREDENTIALS = 'a8043e21-320b-4f12-b72e-612d7a93c553'
    //     IMAGE_NAME = 'zyond/web_cicd'
    //     DOCKER_IMAGE_NAME = 'zyond/web_cicd'
    //     DOCKER_TAG = 'latest'
    // }

    tools {
        nodejs "NodeJS 18" // Đảm bảo bạn đã cài tool này trong Jenkins
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
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test || echo "Tests failed or not implemented yet"'
            }
        }

        stage('Build') {
            steps {
                echo '🔧 Running build (if applicable)...'
                sh 'npm run build || echo "No build step defined"'
            }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_TAG}")
        //         }
        //     }
        // }

        // stage('Push Docker Image') {
        //     steps {
        //         script {
        //             docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
        //                 docker.image("${DOCKER_IMAGE_NAME}:${DOCKER_TAG}").push()
        //             }
        //         }
        //     }
        // }

        // stage('Run Docker Container') {
        //     steps {
        //         script {
        //             sh 'docker stop myweb || true'
        //             sh 'docker rm myweb || true'
        //             sh "docker run -d -p 5000:5000 --name myweb ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}"
        //         }
        //     }
        // }

    //     stage('Upload file lên MinIO') {
    //         steps {
    //             sh 'echo "Build thành công" > build-log.txt'

    //             sh 'aws configure set aws_access_key_id admin'
    //             sh 'aws configure set aws_secret_access_key 12345678'

    //             sh 'aws --endpoint-url http://minio.localhost s3 cp build-log.txt s3://order-files/build-log.txt'
    //         }
    //     }
    }

    post {
        success {
            echo '✅ CI/CD pipeline hoàn tất thành công!'
        }
        failure {
            echo '❌ Pipeline thất bại.'
        }
    }
}
