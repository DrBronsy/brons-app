import * as React from 'react';
import { ConfigProvider } from 'antd';

import {connect} from 'react-redux';


import {State as StoreTree} from 'store/index';

import {User} from 'models/user';

import Routers from '../../routers';

import '../../antd/theme.less';
import './index.scss';


export interface OwnProps {
  ssr?: boolean
}

export interface Props extends OwnProps {
  csrf: string;
  user: User;
}

export function App(props: Props): JSX.Element {
  return (
      <div className='app-shell'>
        <Routers {...props} />
      </div>
  );
}

export default connect(
    (state: StoreTree, ownProps: OwnProps) => ({
      ...ownProps,
      csrf: state.session.csrf,
      user: state.session.user,
    }),
    (dispatch) => ({}),
)(App);
