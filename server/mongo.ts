import * as mongoose from 'mongoose';
import CONFIG from '../config/app.config';

const urlDev = CONFIG.mongodb.host;

export default async (cb: VoidFunction) => {
  await mongoose.connect(urlDev, {
    dbName: CONFIG.mongodb.database
  })
  console.info('Connected to MongoDB');
  cb()
}