/*
 * Copyright 2021 Marek Kobida
 */

import Link from '@warden-sk/react-router/Link';
import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@warden-sk/react-router/Route';
import Router from '@warden-sk/react-router/Router';
import urlParameters from '@warden-sk/react-router/urlParameters';

function Test() {
  const { id } = urlParameters();

  return <h1>Test {id}</h1>;
}

ReactDOM.render(
  <Router>
    <Route path="/">
      <h1>warden.sk</h1>
      <Link to="/test/1">➡️</Link>
    </Route>
    <Route path="/test/:id">
      <Test />
    </Route>
  </Router>,
  document.getElementById('index')
);
