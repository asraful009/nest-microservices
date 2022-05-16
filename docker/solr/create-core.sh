#!/bin/sh
echo "Core Name :"
read core
docker exec -it microservice-solr bin/solr create_core -c $core