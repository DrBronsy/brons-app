import * as mongoose from 'mongoose';
import * as CONFIG from '../config/config.secret.json';

const urlDev = `mongodb://${CONFIG.mongodb.host}`;

export default async (cb: VoidFunction) => {
  await mongoose.connect(urlDev, {
    dbName: CONFIG.mongodb.database
  })
  console.info('Connected to MongoDB');
  cb()
}

// const urlProd = `
//     mongodb://%s:%s@%s/?replicaSet=%s&authSource=%s&ssl=true
//     ${CONFIG.mongodb.username}
//     ${CONFIG.mongodb.password}
//     ${['rc1c-m6ugedvxfud9d0i5.mdb.yandexcloud.net:27018'].join(',')}
//     ${CONFIG.mongodb.database}`
