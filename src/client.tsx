import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';

import App from './App';

hydrate(
  <CacheProvider value={cache}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CacheProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
