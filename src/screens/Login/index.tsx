declare const CONFIG: any;

import * as React from 'react';

import {block as bem} from 'bem-cn';

import {Metadata} from 'models/metadata';

import {Props} from 'routers/index';

import App from 'components/App';
import SteamLoginPulseButton from 'components/SteamLoginPulseButton';

const Context = React.createContext({
  title: 'Pet project from Casual Chat video.',
  h1: 'Login'
});

const block = bem('login');

import './index.scss';

export default ({ssr}: Props) => {
  return (
      <Context.Consumer>
        {(metadata: Metadata) => (
            <App ssr={ssr} metadata={{...metadata, h1: null}} page={block()} className={block()}>
              <SteamLoginPulseButton />
            </App>
        )}
      </Context.Consumer>
  );
}