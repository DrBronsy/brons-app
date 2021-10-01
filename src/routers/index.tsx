import * as React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import Home from 'screens/Home';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import ErrorPage from 'screens/ErrorPage';
import AntdLayout from 'components/AntdLayout';

export default function Routs(): JSX.Element {
  return (
      <Switch>
        <Route
            path='/'
            exact={true}
            component={() => false ? <Redirect to='/profile/'/> : <AntdLayout><Home/></AntdLayout>}
        />
        <Route
            path='/login/'
            exact={true}
        >
          <Redirect to='/profile/'/>
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