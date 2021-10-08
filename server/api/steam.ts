// tslint:disable-next-line:no-var-requires
const SteamAPI = require('steam-web');
import CONFIG from '../../config/app.config';

console.log(CONFIG)
const steamAPI = new SteamAPI(
    {
      apiKey: CONFIG.steam.apiKey,
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