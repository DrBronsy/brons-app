import * as React from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from 'react-router-dom';

import {State as StoreTree} from 'store/index';

import {User} from 'models/user';

import Home from 'screens/Home';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import ErrorPage from 'screens/ErrorPage';

interface OwnProps {
  children?: React.ReactNode;
  page?: string;
  className?: string;
}

interface Props extends OwnProps {
  ssr?: boolean
  csrf: string;
  user: User;
}

function Routs(props: Props): JSX.Element {
  return (
      <Switch>
        <Route
            path='/'
            exact={true}
            component={() => <Home/>}
        />
        <Route
            path='/login/'
            exact={true}
        >
          {props.user ? <Redirect to='/profile/'/> : <Login/>}
        </Route>
        <Route
            path='/profile/'
            exact={true}
            component={() => <Profile/>}
        />
        <Route
            component={() => <ErrorPage/>}
        />
      </Switch>
  );
}

export default connect(
    (state: StoreTree, ownProps: OwnProps) => ({
      ...ownProps,
      csrf: state.session.csrf,
      user: state.session.user,
    }),
)(Routs);