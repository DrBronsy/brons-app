'use strict';

import * as FS from 'fs';
import * as PATH from 'path';
import * as core from 'express-serve-static-core';
import {minify as MINIFY_HTML} from 'html-minifier';

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

// Get json serialize
import * as serialize from 'serialize-javascript';

// Import react decencies
import {createElement as h} from 'react';
import {StaticRouter} from 'react-router-dom';


// Apollo
import {
  ApolloClient,
  ApolloProvider
} from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { makeExecutableSchema } from 'graphql-tools';
import {StaticRouterContext} from 'react-router';
import typeDefs from '../server/graphql/schema'
import resolvers from '../server/graphql/resolvers'
import cache from '../server/graphql/cache'

function getFile(path: string): string {
  return FS.existsSync(path) ? FS.readFileSync(path, 'utf8') : '';
}

async function render(
    {
      url,
      csrf,
      user
    }: {
      url: string,
      csrf: string,
      user: User
    }
): Promise<{
  result: string,
  context: StaticRouterContext,
  client: ApolloClient<any>;
}> {
  const context = {};

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true,
  });

  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({schema}),
    cache: cache({url, csrf, user})
  });

  client.cache.restore({...{url, csrf, user} });

  const result = await renderToStringWithData(
      h(ApolloProvider,
          {client},
          h(
              StaticRouter,
              {location: url, context},
              h(App)
          )
      )
  );

  return {
    result,
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
      const {result, context, client} = await render({
        csrf: req.csrfToken(),
        url: req.url.replace('index.html', ''),
        user: req.user as User
      });
      if (context.url) {
        // If context contains redirect, go ot it
        res.redirect(302, context.url);
      } else {
        // Render html
        const html = MINIFY_HTML(
            HTML
            .replace(/%INLINE_STYLE%/ig, INLINE_STYLE)
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