import * as React from 'react';

import {connect} from 'react-redux';

import {State as StoreTree} from 'store/index';

import {User} from 'models/user';

import Routers from '../../routers';

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
      <Routers {...props} />
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
