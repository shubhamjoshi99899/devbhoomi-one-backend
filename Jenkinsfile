pipeline {
  agent any

  environment {
    AWS_REGION = 'ap-south-1'
    ACCOUNT_ID = '223708988189'
    ECR_REPO = 'devbhoomi'
    IMAGE_TAG = "${env.BUILD_NUMBER}"
  }

  parameters {
    string(name: 'SERVICE', defaultValue: 'identity-service', description: 'Service name inside apps/')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'pnpm install --frozen-lockfile'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh """
            docker build -f apps/${SERVICE}/Dockerfile \
              -t ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}/${SERVICE}:${IMAGE_TAG} .
          """
        }
      }
    }

    stage('Login to ECR') {
      steps {
        withAWS(credentials: 'aws-jenkins', region: "${AWS_REGION}") {
          sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
        }
      }
    }

    stage('Push to ECR') {
      steps {
        sh """
          docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}/${SERVICE}:${IMAGE_TAG}
        """
      }
    }

    stage('Deploy to ECS') {
      steps {
        withAWS(credentials: 'aws-jenkins', region: "${AWS_REGION}") {
          sh """
            aws ecs update-service \
              --cluster devbhoomi-cluster \
              --service ${SERVICE} \
              --force-new-deployment \
              --region ${AWS_REGION}
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ ${params.SERVICE} deployed successfully to ECS!"
    }
    failure {
      echo "❌ Deployment failed for ${params.SERVICE}"
    }
  }
}
