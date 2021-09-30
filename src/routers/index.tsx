import * as React from 'react';
import {connect} from 'react-redux';

import {Switch, Route, Redirect} from 'react-router-dom';

import {State as StoreTree} from 'store/index';

import {User} from 'models/user';

import Home from 'screens/Home';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import ErrorPage from 'screens/ErrorPage';
import AntdLayout from 'components/AntdLayout';

interface OwnProps {
  children?: React.ReactNode
  page?: string
  className?: string
}

interface Props extends OwnProps {
  ssr?: boolean
  csrf: string
  user: User
}

function Routs(props: Props): JSX.Element {
  return (
      <Switch>
        <Route
            path='/'
            exact={true}
            component={() => true ? <Redirect to='/profile/'/> : <AntdLayout><Home/></AntdLayout>}
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
            component={() => <AntdLayout><Profile/></AntdLayout>}
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