// @ts-ignore
import steamApi from 'api/steam';

interface StatItem {
  name: string
  value: any
}

interface SerializeObj {
  [key : string]: string
}

interface PlayerStats {
  playerstats?: {
    stats?: any
  }
}

export const getCSGOMainStat = async (steamid: any): Promise<any> => {
  const res: PlayerStats = await steamApi('getUserStatsForGame', {steamid, appid: 730});
  const serializeObj: SerializeObj = {};
  res.playerstats.stats.forEach((item: StatItem) => {
    serializeObj[item.name] = item.value;
  })
  return serializeObj;
}


export const getOwnedGames = async (steamid: any): Promise<any> => {
  const res: any = await steamApi('getOwnedGames', {steamid});
  if (res.response?.game_count > 0) {
    return {...res.response};
  } else {
    return null;
  }
}

export const getSchemaForGame = async (): Promise<any> => {
  const res: any = await steamApi('getSchemaForGame', {appid: 730});
  return res;
}

export const getSteamLevel = async (steamid: any) => {
  const res: any = await steamApi('getSteamLevel', {steamid})
  return res.response.player_level;
}

