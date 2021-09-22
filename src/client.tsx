declare const mode: string;

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {ApolloProvider} from '@apollo/client';

import {createStore} from 'store/index';
import {createApolloClient} from 'apollo/index';

import App from 'components/App';

const store = createStore((window as any).__PRELOADED_STATE__);
const apolloClient = createApolloClient((window as any).__APOLLO_STATE__, (window as any).__PRELOADED_STATE__.session.csrf);

import './scss/index.scss';

ReactDOM.hydrate(
    (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <BrowserRouter basename='/'>
            <App/>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    ),
    document.getElementById('root'),
);