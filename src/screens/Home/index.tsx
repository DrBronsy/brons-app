import * as React from 'react';

import {block as bem} from 'bem-cn';

import {Link} from 'react-router-dom';

import {gql, useQuery} from '@apollo/client';

const block = bem('home');

import './index.scss';

const EXCHANGE_RATES = gql`
    query User {
        users {
            id
            displayName
            _json {
                steamid
                timecreated
                personaname
            }
        }
    }
`;

function Test() {
  const {loading, error, data} = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.users.map(({id, displayName}: any, index: number) => (
      <div key={index}>
        <p>
          {id}: {displayName}
        </p>
      </div>
  ));
}

export default () => {
  return (
    <div className={block()}>
      <Test />
      <Link to='/profile'>Profile</Link>
    </div>
  );
}