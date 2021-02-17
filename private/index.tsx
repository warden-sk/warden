/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@warden-sk/router/components/Route';
import Router from '@warden-sk/router/components/Router';

ReactDOM.render(
  <Router>
    <Route path="/">
      <h1>warden.sk</h1>
      <a href="#/test">➡️</a>
    </Route>
    <Route path="/test">
      <h1>test</h1>
    </Route>
  </Router>,
  document.getElementById('index')
);
