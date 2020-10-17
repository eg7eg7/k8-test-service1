pipeline {
  environment {
    IMAGE_NAME = 'eg7eg7/k8-test-service1'
  }

  agent any

  stages {
    stage('Build') {
      steps {
        checkout scm
        sh '''
          docker build -t $IMAGE_NAME:$BUILD_ID .
        '''
      }
    }
    stage('Test') {
      steps {
        echo 'TODO: add tests'
      }
    }
    stage('Image Release') {
      when {
        expression { env.BRANCH_NAME == 'master' }
      }

      steps {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
          usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD']]) {
          sh '''
            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
            docker push $IMAGE_NAME:$BUILD_ID
          '''
        }
      }
    }
    stage('Staging Deployment') {
      when {
        expression { env.BRANCH_NAME == 'master' }
      }

      environment {
        RELEASE_NAME = 'eden_test_k8'
        SERVER_HOST = 'staging.seanmeme.k8s.prydoni.us'
      }

      steps {
        sh '''
          . ./helm/helm-init.sh
          helm upgrade --install --namespace staging $RELEASE_NAME ./helm/seanmeme --set image.tag=$BUILD_ID,ingress.host=$SERVER_HOST
        '''
      }
    }
  }
}
