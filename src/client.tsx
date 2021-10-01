declare const mode: string;

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';

import {ApolloProvider} from '@apollo/client';

import {createApolloClient} from 'apollo/index';

import App from 'components/App';

const apolloClient = createApolloClient((window as any).__APOLLO_STATE__);

import './scss/index.scss';

ReactDOM.hydrate(
    (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter basename='/'>
          <App/>
        </BrowserRouter>
      </ApolloProvider>
    ),
    document.getElementById('root'),
);