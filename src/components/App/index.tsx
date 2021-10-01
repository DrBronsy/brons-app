import * as React from 'react';
import {gql, useQuery} from '@apollo/client';

import Routers from '../../routers';

import '../../antd/theme.less';
import './index.scss';


// Preloaded session info for client. Check createApolloClient
const SESSION = gql`
    query Session {
        session {
            user {
                id
                steam {
                    avatarfull
                    profileurl
                    trustRating
                    timecreated
                }
                displayName
            }
            csrf
        }
    }
`;

interface Props {
  ssr?: boolean
}

export default function App({ssr}: Props): JSX.Element {
  const {loading, data} = useQuery(SESSION);
  if (loading) return <div>Loading</div>

  const {session} = data;
  return (
      <div className='app-shell'>
        <Routers user={session.user}/>
      </div>
  );
}
