import {UserSteam} from 'models/user';

import UserModel from '../models/user.model';
import {
  getCSGOMainStat,
  getOwnedGames,
  getSteamLevel
} from '../services/steam.service';

export const findUser = async (filter: object) => {
  const user = await UserModel.findOne(filter);
  return user;
}

export const createOrUpdateUserForSteam = async (profile: UserSteam) => {
  const userGames = await getOwnedGames(profile.id);
  const CSGOGamePreviewStat = userGames?.games && await userGames.games.find((game: any) => game.appid === 730)
  const CSGOGameMainStat = CSGOGamePreviewStat && await getCSGOMainStat(profile.id);
  const steamLevel =  await getSteamLevel(profile.id);

  const CSGOStat = {...CSGOGamePreviewStat, ...CSGOGameMainStat};

  const userUpdateInfo: object = {
    displayName: profile.displayName,
    steam: {lvl: steamLevel, ...profile._json},
    csgoStat: CSGOStat
  }

  let user = await UserModel.findOneAndUpdate({'steam.steamid': profile.id}, userUpdateInfo)

  if (!user) {
    user =  await UserModel.create({
      ...userUpdateInfo,
      scores: 1000,
    });
  }

  return user;
}

export const calculateUserTrustRating = async (user: any) => {

}