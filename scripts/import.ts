// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { exec } from 'child_process';
import collections from './collections';

const { MONGO_USER, MONGO_PASS, MONGO_BASE, NODE_ENV } = process.env;

if (NODE_ENV === 'production') {
  console.error('Import does not work in production');

  process.exit();
}

console.log(`Copying files`);

exec(`docker cp ./seeders mongo-db-0:/import-mongo`, (err) => {
  if (err !== null) {
    console.error(`Error on copy files`);
    return;
  }

  console.log('Files copied');

  collections.forEach((collection) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const items = require(`../seeders/${collection}.json`);

    if (items.length > 0) {
      console.log(`Importing ${collection}`);

      exec(
        `docker exec -i mongo-db-0 /usr/bin/mongoimport --username ${MONGO_USER} --password ${MONGO_PASS} --authenticationDatabase admin --db ${MONGO_BASE} -c ${collection} --jsonArray /import-mongo/${collection}.json`,

        (error) => {
          if (error !== null) {
            console.error(`Error on ${collection}: ${error.message}`);
            return;
          }

          console.log(`Collection ${collection} imported`);
        }
      );
    } else {
      console.info(`Collection ${collection} empty. Skip import`);
    }
  });
});
