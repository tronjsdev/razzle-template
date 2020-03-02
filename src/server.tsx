import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { extractCritical } from '@emotion/server';
import { CacheProvider, Global } from '@emotion/react';
import { cache } from '@emotion/css';

import App from './App';

let assets: any;

const syncLoadAssets = () => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const context: any = {};
    const { css, html: markup, ids } = extractCritical(
      renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      )
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
            <html lang="">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charSet='utf-8' />
                <title>Razzle TypeScript</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style data-emotion-css=${ids.join(' ')}>${css}</style>
                ${
                  assets.client.css
                    ? `<link rel="stylesheet" href="${assets.client.css}">`
                    : ''
                }
                  ${
                    process.env.NODE_ENV === 'production'
                      ? `<script src="${assets.client.js}" defer></script>`
                      : `<script src="${assets.client.js}" defer crossorigin></script>`
                  }
            </head>
            <body>
                <div id="root">${markup}</div>
            </body>
        </html>`
      );
    }
  });

export default server;
