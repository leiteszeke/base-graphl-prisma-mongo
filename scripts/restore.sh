#!/bin/bash

backup_file=./dumps/basedb_${FILE}.tar.gz

tar -xzvf ${backup_file}

docker cp ./dumps mongo-db-0:/restore-mongo

docker exec -i mongo-db-0 /usr/bin/mongorestore --username localuser --password localpass --authenticationDatabase admin --db basedb /restore-mongo/basedb

rm -rf ./dumps/basedb