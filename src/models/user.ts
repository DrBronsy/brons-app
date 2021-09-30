import {ObjectId} from 'mongodb';

export interface User {
  _id?: ObjectId,
  displayName?: string,
  trustRating: number,
  steam: UserSteam,
  csgoStat: CsgoStat,
  vk?: {
    id: string,
    access: string,
    refresh: string,
  };
}

export interface CsgoStat {
  total_time_played: string,
  playtime_forever: string,
  playtime_2weeks: string,
}


export interface UserSearch {
  'steam.steamId'?: User['vk']['id'];
}

export interface UserSteam {
  provider: string,
  id: number,
  displayName: string,
  avatarmedium: string,
  avatarfull: string,
  profileurl: string,
  timecreated: number,
  photos: [
    {
      value: string
    }
  ]
  _json: {
    steamid: string,
    communityvisibilitystate: number,
    profilestate: number,
    personaname: string,
    commentpermission: number,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    avatarhash: string,
    lastlogoff: number,
    personastate: number,
    primaryclanid: string,
    timecreated: number,
    personastateflags: number
  }
}


export type DoneUser = (error: any, user?: User) => void;
export type DoneId = (error: any, id?: string) => void;