/*
 * Copyright 2021 Marek Kobida
 */

import Link from '@warden-sk/react-router/Link';
import React from 'react';
import ReactDOM from 'react-dom';
import Route from '@warden-sk/react-router/Route';
import Router from '@warden-sk/react-router/Router';
import currentUrlParameters from '@warden-sk/react-router/currentUrlParameters';

function _2() {
  const { id } = currentUrlParameters();

  return (
    <div className="container">
      <div>
        <h1>{id}</h1>
        <Link url="/">späť️️</Link>
      </div>
    </div>
  );
}

function _1() {
  return (
    <Router>
      <Route url="/">
        <div className="container">
          <div>
            <h1>warden.sk</h1>
            <p>Čoskoro vám predstavím stránku v úplne novom kabáte.</p>
          </div>
        </div>
      </Route>
      <Route url="/test/:id">
        <_2 />
      </Route>
    </Router>
  );
}

ReactDOM.render(<_1 />, document.getElementById('index'));
