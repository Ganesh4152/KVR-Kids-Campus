pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-kvr'
        DOCKERHUB_USERNAME = 'gani4152'

        BACKEND_IMAGE = 'gani4152/kvr-kids-campus-backend'
        FRONTEND_IMAGE = 'gani4152/kvr-kids-campus-frontend'

        DEPLOY_DIR = '/home/ubuntu/DevOpsProjects/KVR-Kids-Campus'
    }

    stages {

        stage('Checkout') {
            steps {
                deleteDir()

                sshagent(credentials: ['github-kvr-ssh']) {
                    sh '''
                        set -e

                        git clone git@github.com:Ganesh4152/KVR-Kids-Campus.git .
                        git checkout main

                        echo "=== COMMIT ==="
                        git log -1 --oneline
                    '''
                }
            }
        }

        stage('Validate') {
            steps {
                sh '''
                    set -e

                    echo "=== DOCKER ==="
                    docker --version

                    echo
                    echo "=== DOCKER COMPOSE ==="
                    docker compose version

                    echo
                    echo "=== PROJECT FILES ==="
                    test -f backend/Dockerfile
                    test -f frontend/Dockerfile
                    test -f frontend/nginx.conf
                    test -f docker-compose.yml

                    echo
                    echo "Validation successful."
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    set -e

                    echo "=== BUILD BACKEND ==="
                    docker build \
                        -t ${BACKEND_IMAGE}:${BUILD_NUMBER} \
                        -t ${BACKEND_IMAGE}:latest \
                        ./backend

                    echo
                    echo "=== BUILD FRONTEND ==="
                    docker build \
                        -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} \
                        -t ${FRONTEND_IMAGE}:latest \
                        ./frontend
                '''
            }
        }

        stage('Push and Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "${DOCKERHUB_CREDENTIALS}",
                        usernameVariable: 'DH_USER',
                        passwordVariable: 'DH_TOKEN'
                    )
                ]) {
                    sh '''
                        set -eu

                        echo "=== LOGIN TO DOCKER HUB ==="

                        printf '%s' "$DH_TOKEN" | \
                            docker login \
                            --username "$DH_USER" \
                            --password-stdin

                        echo
                        echo "=== PUSH BACKEND ==="

                        docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${BACKEND_IMAGE}:latest

                        echo
                        echo "=== PUSH FRONTEND ==="

                        docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${FRONTEND_IMAGE}:latest

                        echo
                        echo "=== DEPLOYING TO KVR EC2 ==="

                        cd "$DEPLOY_DIR"

                        export KVR_BACKEND_IMAGE="${BACKEND_IMAGE}:${BUILD_NUMBER}"
                        export KVR_FRONTEND_IMAGE="${FRONTEND_IMAGE}:${BUILD_NUMBER}"

                        echo
                        echo "=== DEPLOYMENT IMAGES ==="
                        echo "Backend : $KVR_BACKEND_IMAGE"
                        echo "Frontend: $KVR_FRONTEND_IMAGE"

                        echo
                        echo "=== PULL BACKEND IMAGE ==="
                        docker pull "$KVR_BACKEND_IMAGE"

                        echo
                        echo "=== PULL FRONTEND IMAGE ==="
                        docker pull "$KVR_FRONTEND_IMAGE"

                        echo
                        echo "=== CURRENT STACK ==="
                        docker compose ps

                        echo
                        echo "=== DEPLOY BACKEND ==="
                        docker compose up -d --no-deps backend

                        echo
                        echo "=== DEPLOY FRONTEND ==="
                        docker compose up -d --no-deps frontend

                        echo
                        echo "=== STACK AFTER DEPLOYMENT ==="
                        docker compose ps

                        echo
                        echo "=== LOGOUT ==="
                        docker logout
                    '''
                }
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    set -eu

                    echo "=== CONTAINER STATUS ==="

                    for container in kvr-mysql kvr-backend kvr-frontend; do
                        status=$(docker inspect --format '{{.State.Status}}' "$container")
                        echo "$container: $status"
                        test "$status" = "running"
                    done

                    echo
                    echo "=== MYSQL HEALTH ==="

                    MYSQL_STATUS=$(docker inspect                         --format '{{.State.Health.Status}}'                         kvr-mysql)

                    echo "MySQL health: $MYSQL_STATUS"
                    test "$MYSQL_STATUS" = "healthy"

                    echo
                    echo "=== FRONTEND / NGINX TEST ==="

                    docker exec kvr-frontend                         wget -q -O /tmp/kvr-home.html                         http://localhost/

                    docker exec kvr-frontend                         sh -c 'test -s /tmp/kvr-home.html'

                    echo "Frontend/Nginx is responding."

                    echo
                    echo "=== BACKEND API READINESS TEST ==="

                    BACKEND_READY=false

                    for attempt in 1 2 3 4 5 6 7 8 9 10; do
                        echo "Backend readiness check: attempt $attempt/10"

                        if docker exec kvr-frontend                             wget -q -O /tmp/kvr-students.json                             http://backend:8080/api/students; then

                            BACKEND_READY=true
                            break
                        fi

                        sleep 3
                    done

                    test "$BACKEND_READY" = "true"

                    docker exec kvr-frontend                         sh -c 'test -s /tmp/kvr-students.json'

                    echo "Backend API is responding."

                    echo
                    echo "KVR smoke test successful."
                '''
            }
        }
    }

    post {
        success {
            echo 'KVR CI/CD pipeline completed successfully.'
        }

        failure {
            echo 'KVR CI/CD pipeline failed. Check the stage logs above.'
        }

        always {
            sh '''
                docker logout >/dev/null 2>&1 || true
            '''
        }
    }
}
