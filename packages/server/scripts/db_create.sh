#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

ENV_FILE="$SCRIPT_DIR/../.env"

if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found at $ENV_FILE"
  exit 1
fi

export $(cat "$ENV_FILE" | sed 's/#.*//g' | xargs)

CONTAINER_NAME="cvai_local_${CONTAINER_NAME:-cvai}"
POSTGRES_PASSWORD="${TYPEORM_PASSWORD:-postgres}"
POSTGRES_USER="${TYPEORM_USERNAME:-postgres}"
POSTGRES_DB="${TYPEORM_DATABASE:-cvai}"
HOST_PORT="${TYPEORM_PORT:-5430}"
CONTAINER_PORT="5430"

echo "Removing old docker container..."
(docker stop $CONTAINER_NAME && docker kill $CONTAINER_NAME || :) && (docker rm $CONTAINER_NAME || :)

echo "Creating a new instance..."
docker run \
    --name $CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e PGPASSWORD=$POSTGRES_PASSWORD \
    -p $HOST_PORT:$CONTAINER_PORT \
    -d postgres:14.4

echo "Waiting for the database to start..."
sleep 3

echo "Creating the database..."
echo "CREATE DATABASE $POSTGRES_DB;" | docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER
echo "\l" | docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER
