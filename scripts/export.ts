// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { exec } from 'child_process';
import collections from './collections';

const { MONGO_USER, MONGO_PASS, MONGO_BASE } = process.env;

collections.forEach((collection) => {
  console.log(`Exporting ${collection}`);

  exec(
    `docker exec -i mongo-db-0 /usr/bin/mongoexport --username ${MONGO_USER} --password ${MONGO_PASS} --authenticationDatabase admin --db ${MONGO_BASE} -c ${collection} --jsonArray --pretty --out /export-mongo/${collection}.json`,
    (error) => {
      if (error !== null) {
        console.error(`Error on ${collection}: ${error.message}`);
        return;
      }

      exec(`docker cp mongo-db-0:/export-mongo/${collection}.json ./seeders`);

      console.log(`Collection ${collection} exported`);
    }
  );
});
