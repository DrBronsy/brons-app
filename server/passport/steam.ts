import * as core from 'express-serve-static-core';

import {PassportStatic} from 'passport';

import {
  Strategy as SteamStrategy
} from 'passport-steam';

import {User, DoneUser} from '../../src/models/user';

import * as CONFIG from 'config/config.secret.json';

import {createUserForSteam, redirect} from 'server/passport';

export default (APP: core.Express, passport: PassportStatic) => {
  passport.use(
      new SteamStrategy({
        returnURL: `${CONFIG.domain}/login/steam/callback`,
        realm: CONFIG.domain,
        apiKey: CONFIG.steam.clientSecret
      },
      (identifier: any, profile: any, done: any) => {
        createUserForSteam(profile)
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
