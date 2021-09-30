'use strict';

import * as FS from 'fs';
import * as PATH from 'path';
import {minify as MINIFY_HTML} from 'html-minifier';
import fetch from 'cross-fetch';

import {User} from '../src/models/user';

// Get static path
const STATIC = PATH.resolve(__dirname + '/../build');

const HTML = getFile(PATH.resolve(STATIC, 'static/index.html'));
const INLINE_STYLE = getFile(PATH.resolve(STATIC, 'static/inline.css'));
const INLINE_SCRIPT = getFile(PATH.resolve(STATIC, 'static/inline.js'));
const SVG = getFile(PATH.resolve(STATIC, 'static/sprite.svg'));

require.extensions['.gif'] = () => '';
require.extensions['.png'] = () => '';
require.extensions['.jpg'] = () => '';
require.extensions['.jpeg'] = () => '';
require.extensions['.scss'] = () => '';
require.extensions['.less'] = () => '';

import * as CONFIG from '../config/config.secret.json';

(global as any).CONFIG = CONFIG;

import {default as App} from '../src/server';
import {initialState} from '../src/store';

// Get json serialize
import * as serialize from 'serialize-javascript';

// Import react decencies
import {createElement as h} from 'react';
// @ts-ignore
import {renderToStringAsync} from 'react-async-ssr';
import {StaticRouter} from 'react-router-dom';
import {createStore, Store} from 'redux';
import {Provider} from 'react-redux';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { makeExecutableSchema } from 'graphql-tools';
import * as core from 'express-serve-static-core';
import {StaticRouterContext} from 'react-router';
import {gql} from "apollo-server-express";
import UserModel from "./models/user.model";

const MetadataExtractorRegExp = /<code.*?data-extract=['"]true['"].*?>(?<metadata>.*?)<\/code>/ig;

function getFile(path: string): string {
  return FS.existsSync(path) ? FS.readFileSync(path, 'utf8') : '';
}

async function render(
    {
      url,
      csrf,
      user,
      header
    }: {
      url: string,
      csrf: string,
      user: User,
      header: any
    }
): Promise<{
  result: string,
  store: Store,
  context: StaticRouterContext,
  client: ApolloClient<any>;
}> {
  const context = {};

  const store = createStore((state) => JSON.parse(JSON.stringify(state)), {
    ...initialState,
    session: {
      ...initialState.session,
      csrf,
      user,
      location: url,
      modified: (new Date()).toISOString(),
    }
  });

  const typeDefs = gql`
      type User {
          id: ID!
          displayName: String,
          steam: Steam
      }

      type Steam {
          lvl: String,
          steamid: String,
      }

      type Query {
          users: [User]
          user: User!
      }
  `;

  const resolvers = {
    Query: {
      async users() {
        const res: any = await UserModel.find({});
        return res.map((u: any) => ({
          id: u._id.toString(),
          displayName: u.displayName,
          steam: u.steam
        }));
      }
    },
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true,
  });

  const client = new ApolloClient({
    ssrMode: true,
    // @ts-ignore
    link: new SchemaLink({ schema }),
    // link: createHttpLink({
    //   uri: '/graphql',
    //   credentials: 'same-origin',
    //   fetch,
    // }),
    cache: new InMemoryCache(),
  });

  const result = await renderToStringWithData(
      h(ApolloProvider,
          // @ts-ignore
          {client},
        h(
            Provider,
            {store},
            h(
                StaticRouter,
                {location: url, context},
                h(App)
            )
        )
      )
  );

  console.log(client.extract())

  return {
    result: result.replace(MetadataExtractorRegExp, ''),
    store,
    context,
    client
  };
}

// Export express subroutines
export default (APP: core.Express) => {
  // Use server side rendering as fallback for all routs
  APP.get('*', async (req, res) => {
    try {
      // Server side render
      const {result, store, context, client} = await render({
        csrf: req.csrfToken(),
        url: req.url.replace('index.html', ''),
        user: req.user as User,
        header: req.header
      });
      if (context.url) {
        // If context contains redirect, go ot it
        res.redirect(302, context.url);
      } else {
        // Render html
        const html = MINIFY_HTML(
            HTML
            .replace(/%INLINE_STYLE%/ig, INLINE_STYLE)
            .replace(/%PRELOADED_STATE%/ig, serialize(store.getState()))
            .replace(/%PRELOADED_APOLLO_STATE%/ig, serialize(client.extract()))
            .replace(/%INLINE_SCRIPT%/ig, INLINE_SCRIPT)
            .replace(/%SVG_SPRITE%/ig, SVG)
            .replace(/%APP%/ig, result),
            {
              removeComments: true,
              collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeAttributeQuotes: true,
              removeEmptyAttributes: true,
              minifyJS: true
            }
        );

        // Response rendered html
        res.set('content-type', 'text/html');
        res.send(html);
      }
    } catch (e) {
      console.log(e)
      res.writeHead(500);
      res.end();
    }
  });
};