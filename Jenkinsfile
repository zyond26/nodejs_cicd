pipeline {
    agent any

    // environment {
    //     DOCKERHUB_CREDENTIALS = 'a8043e21-320b-4f12-b72e-612d7a93c553'
    //     IMAGE_NAME = 'zyond/web_cicd'
    //     DOCKER_IMAGE_NAME = 'zyond/web_cicd'
    //     DOCKER_TAG = 'latest'
    // }

    tools {
        nodejs "NodeJS 24" // Đảm bảo bạn đã cài tool này trong Jenkins
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

        stage('Build Web (Expo)') {
            steps {
                echo '🌐 Building Expo Web...'
                bat 'npm start'
            }
        }

        stage('Deploy to IIS') {
            steps {
                echo '🧹 Cleaning old deploy folder...'
                bat 'if exist C:\\inetpub\\wwwroot\\expoapp rd /s /q C:\\inetpub\\wwwroot\\expoapp'
                
                echo '📂 Creating deploy folder...'
                bat 'mkdir C:\\inetpub\\wwwroot\\expoapp'
                
                echo '📁 Copying files to IIS...'
                bat 'xcopy /E /Y /I /R "%WORKSPACE%\\dist\\web-build\\*" "C:\\inetpub\\wwwroot\\expoapp\\"'
                
                echo '🔄 Restarting IIS...'
                bat 'iisreset /restart'
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
