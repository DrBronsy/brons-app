import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

interface Session {
  secret: string
}

interface MongoDB {
  host: string,
  username: string,
  password: string,
  database: string
}

interface Config {
  port: string
  domain: string
  session: Session
  mongodb: MongoDB
  vk: {
    clientID: string,
    clientSecret: string
  }
  steam: {
    apiKey: string
  }
}

export const config: Config = {
  port: process.env.APP_PORT,
  domain: process.env.APP_DOMAIN,
  session: {
    secret: process.env.APP_SESSION_SECRET
  },
  mongodb: {
    host: process.env.APP_MONGODB_HOST,
    username: process.env.APP_MONGODB_USER,
    password: process.env.APP_MONGODB_PASS,
    database: process.env.APP_MONGODB_DB
  },
  vk: {
    clientID: process.env.APP_VK_CLIENT_ID,
    clientSecret: process.env.APP_VK_CLIENT_SECRET
  },
  steam: {
    apiKey: process.env.APP_STEAM_API_KEY
  }
};

export default config;