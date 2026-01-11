pipeline {
  agent any

  environment {
    AWS_DEFAULT_REGION = "eu-west-1"
    S3_BUCKET = "www.squinglish.com"
  }

  stages {
    stage("Install") {
      steps {
        sh "npm ci"
      }
    }

    stage("Build") {
      steps {
        sh "npm run build"
      }
    }

    stage("Deploy to S3") {
      steps {
        withAWS(credentials: 'jenkins', region: "${env.AWS_DEFAULT_REGION}") {
          sh """
            aws s3 sync dist/ s3://$S3_BUCKET \
              --delete \
              --cache-control "public, max-age=31536000, immutable" \
              --acl public-read
          """
        }
      }
    }
  }
}
