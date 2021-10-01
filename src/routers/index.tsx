import * as React from 'react';

import {Switch, Route, Redirect} from 'react-router-dom';

import {User} from 'models/user';

import Home from 'screens/Home';
import Login from 'screens/Login';
import Profile from 'screens/Profile';
import ErrorPage from 'screens/ErrorPage';
import AntdLayout from 'components/AntdLayout';


export default function Routs({user}: any): JSX.Element {
  return (
      <Switch>
        <Route
            path='/'
            exact={true}
            component={() => <AntdLayout><Home/></AntdLayout>}
        />
        <Route
            path='/login/'
            exact={true}
        >
          {!user ? <Login/> : <Redirect to='/profile'/>}
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