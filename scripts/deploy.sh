#!/bin/bash

set -e
# SET TO THE FIRST ARGUMENT
AWS_REGION=$1

cd packages/server

if ! command -v eb &> /dev/null; then
    echo "Installing AWS EB CLI..."
    pip install awsebcli
fi

if [ ! -d ".elasticbeanstalk" ]; then
  echo "No elastic beanstalk directory found."
  echo "Initializing Elastic Beanstalk..."
  eb init -p docker cvai-environment --region "${AWS_REGION}"
fi

echo "Deploying to Elastic Beanstalk..."
eb deploy cvai-environment
echo "Deployment completed successfully!"