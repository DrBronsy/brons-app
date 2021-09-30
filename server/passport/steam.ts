import * as core from 'express-serve-static-core';

import {PassportStatic} from 'passport';

import {
  Strategy as SteamStrategy
} from 'passport-steam';

import * as CONFIG from 'config/config.secret.json';

import {redirect} from 'server/passport';

import {registerUserForSteam} from 'controllers/auth.controller';

export default (APP: core.Express, passport: PassportStatic) => {
  passport.use(
      new SteamStrategy({
        returnURL: `${CONFIG.domain}/login/steam/callback`,
        realm: CONFIG.domain,
        apiKey: CONFIG.steam.clientSecret
      },
      (identifier: any, profile: any, done: any) => {
        registerUserForSteam({...profile})
        .then((user: any) => done(null, user))
        .catch((error) => done(error));
      }
  ));

  APP.get(
      '/login/steam',
      passport.authenticate('steam'),
  );

  APP.get(
      '/login/steam/callback',
      passport.authenticate('steam'),
      redirect
  );
};
