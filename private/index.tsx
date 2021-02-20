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
    <>
      <h1>Test {id}</h1>
      <Link url="/">⬅️️</Link>
    </>
  );
}

function _1() {
  return (
    <Router>
      <Route url="/">
        <h1>warden.sk</h1>
        <Link url="/test/1">➡️</Link>
      </Route>
      <Route url="/test/:id">
        <_2 />
      </Route>
    </Router>
  );
}

ReactDOM.render(<_1 />, document.getElementById('index'));
