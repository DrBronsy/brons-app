import * as React from 'react';

import App from 'components/App';

import {gql, useQuery} from '@apollo/client';
// Preloaded session info for client. Check createApolloClient
const SESSION = gql`
    query Session {
        session {
            user {
                id
                displayName
                steam {
                    avatarfull
                    profileurl
                    trustRating
                    timecreated
                }
                csgoStat {
                    playtime_forever
                    total_time_played
                    playtime_2weeks
                }
                timecreated
            }
            csrf
        }
    }
`;
export default () => {
  const {data} = useQuery(SESSION);
  return <App ssr={true}/>;
}