#!/bin/bash
echo "Preparing app..."

docker network create bank-network
docker volume create bank-db-data

docker-compose build

echo "Preparation complete."
