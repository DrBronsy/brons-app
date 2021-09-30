// tslint:disable-next-line:no-var-requires
const SteamAPI = require('steam-web');
import * as CONFIG from '../../config/config.secret.json';
const steamAPI = new SteamAPI(
    {
      apiKey: CONFIG.steam.clientSecret,
      format: 'json'
    }
);

export default (method: string, options: any) => {
  return (new Promise((resolve, reject) => {
    if (method) {
      steamAPI[method]({
        ...options,
        callback: (err: any, data: any) => {
          if (err) reject(err);
          resolve(data);
        }
      });
    }
  }));
};