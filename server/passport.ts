import * as core from 'express-serve-static-core';
import * as passport from 'passport';

import PassportVK from './passport/vk';
import PassportSteam from './passport/steam';

import * as CONFIG from '../config/config.secret.json';

import {ObjectId} from 'mongodb';

import {User, UserSteam, DoneUser, DoneId} from '../src/models/user';

import {findUser} from '../server/services/user.service';

export function redirect(req: core.Request, res: core.Response) {
  if (req.user) {
    res.redirect((req.session as any).returnTo || '/');
    delete (req.session as any).returnTo;
  } else {
    res.redirect('/login');
  }
}

async function serializeUser(user: User) {
  return user._id.toString();
}

async function deserializeUser(id: string) {
  return findUser({_id: new ObjectId(id)});
}

passport.serializeUser((user: User, done: DoneId) => {
  serializeUser(user)
  .then((id) => done(null, id))
  .catch((error) => done(error));
});

passport.deserializeUser((id: string, done: DoneUser) => {
  deserializeUser(id)
  .then((user: any) => done(null, user))
  .catch((error) => done(error));
});

export default (APP: core.Express) => {
  APP.use(passport.initialize());
  APP.use(passport.session());

  // if (CONFIG.vk.clientID && CONFIG.vk.clientSecret) {
  //   PassportVK(APP, passport);
  // }

  if (CONFIG.steam.clientSecret) {
    PassportSteam(APP, passport);
  }

  APP.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};



// async function create(search: UserSearch, insert: User): Promise<User> {
//   const db = await DB();
//   const users = db.collection('users');
//
//   const user = await users.findOne(search);
//
//   if (user) {
//     return user;
//   } else {
//     const {acknowledged, insertedId} = await users.insertOne(insert);
//
//     if (acknowledged) {
//       return users.findOne(insertedId);
//     } else {
//       return null;
//     }
//   }
// }

// async function merge(loginUser?: User, sessionUser?: User): Promise<User> {
//   if (!sessionUser && !loginUser) {
//     return null;
//   } else if (!sessionUser && loginUser) {
//     return loginUser;
//   } else if (sessionUser && !loginUser) {
//     return sessionUser;
//   } else if (sessionUser?._id.toString() === loginUser?._id.toString()) {
//     return sessionUser;
//   } else {
//     const db = await DB();
//     const users = db.collection('users');
//
//     const mergedUser = {
//       displayName: sessionUser.displayName || loginUser.displayName || '',
//       ...Object.fromEntries(Object.entries({
//         vk: sessionUser.vk || loginUser.vk || null,
//       }).filter(([_, value]) => value != null))
//     };
//
//     await users.deleteMany({_id: {$in: [sessionUser._id, loginUser._id]}});
//
//     const {acknowledged, insertedId} = await users.insertOne(mergedUser);
//
//     if (acknowledged) {
//       return users.findOne(insertedId);
//     } else {
//       return null;
//     }
//   }
// }
//
// export async function createUser(req: core.Request, search: UserSearch, insert: User) {
//   return merge(await create(search, insert), req.user);
// }