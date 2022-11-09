# Apollo GraphQL + Prisma + MongoDB

```bash

chmod data/file.key

docker-compose exec mongo-db-0 ./scripts/setup.sh
```

## Scripts

```bash
# Create user
docker-compose exec mongo-db-0 ./scripts/setup.sh

# Dump db
docker exec -i mongo-db-0 /usr/bin/mongodump --username localuser --password localpass --authenticationDatabase admin --db basedb --out /mongo-dumps

# Copy from container to server
docker cp mongo-db-0:/mongo-dumps/basedb ./dumps

# Compress dumps
backup_file=basedb_$(date +'%m-%d-%Y')
tar -czvf ${backup_file}.tar.gz ./dumps/basedb
cp ./${backup_file}.tar.gz ./dumps

# Copy from server to container
docker cp ./dumps mongo-db-0:/dump

# Restore db
docker exec -i mongo-db-0 /usr/bin/mongorestore --username localuser --password localpass --authenticationDatabase admin --db basedb /dump/basedb

# Dump script
./scripts/dump.sh

# Restore script
FILE=2022-09-04_10-06-41 ./scripts/restore.sh
```
