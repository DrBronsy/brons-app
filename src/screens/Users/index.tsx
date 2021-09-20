import * as React from 'react';

import {block as bem} from 'bem-cn';

import {Metadata} from 'models/metadata';
import {User} from 'models/user';

import {Props} from 'routers/index';

import App from 'components/App';

const Context = React.createContext({
  title: 'Pet project from Casual Chat video.',
  h1: 'Users'
});

const block = bem('users');

import './index.scss';

export default ({ssr, csrf}: Props) => {
  const [users, setUsers] = React.useState<User[]>([]);

  return (
      <Context.Consumer>
        {(metadata: Metadata) => (
            <App ssr={ssr} metadata={{...metadata, h1: null}} page={block()} className={block()}>
              <div className={block('form')}>
                <h1 className={block('title')}>{metadata.h1}</h1>
                <div>
                  {users.map((user: User) => (
                      <div key={user.id}>
                        <p>{user.displayName}</p>
                      </div>
                  ))}
                </div>
              </div>
            </App>
        )}
      </Context.Consumer>
  );
}