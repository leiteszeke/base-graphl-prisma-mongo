#!/bin/bash

docker exec -i mongo-db-0 /usr/bin/mongodump --username localuser --password localpass --authenticationDatabase admin --db basedb --out /dumps-mongo

docker cp mongo-db-0:/dumps-mongo/basedb ./dumps

backup_file=basedb_$(date +'%Y-%m-%d_%H-%M-%S')

tar -czvf ${backup_file}.tar.gz ./dumps/basedb

cp ./${backup_file}.tar.gz ./dumps

rm -rf ./dumps/basedb

rm ${backup_file}.tar.gz