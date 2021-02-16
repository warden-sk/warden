/*
 * Copyright 2021 Marek Kobida
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Router from '@warden-sk/router/Router';

const router = new Router<[(element: JSX.Element) => any]>();

router.addRoute('/test').get(({}, writeElement) => writeElement(<h1>test</h1>));

function Index(): JSX.Element {
  const [readElement, writeElement] = useState<JSX.Element>(
    <>
      <h1>warden.sk</h1>
      <a href="?test#/test">test</a>
    </>
  );

  function test() {
    router.test([writeElement], 'GET', location.hash.substring(1));
  }

  useEffect(() => {
    test();

    window.addEventListener('hashchange', test, false);
  }, []);

  return readElement;
}

ReactDOM.render(<Index />, document.getElementById('index'));
