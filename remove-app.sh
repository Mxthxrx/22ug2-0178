#!/bin/bash
echo "Removing app..."

docker-compose down --volumes --rmi all
docker network rm bank-network
docker volume rm bank-db-data
