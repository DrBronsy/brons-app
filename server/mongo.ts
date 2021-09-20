import {MongoClient} from 'mongodb';

import * as CONFIG from '../config/config.secret.json';

export default async () => {
  const client = new MongoClient(`mongodb://${CONFIG.mongodb.host}`);
  await client.connect();
  return client.db(CONFIG.mongodb.database);
}