/*
 * Copyright 2021 Marek Kobida
 */

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Router from '@warden-sk/router/Router';

const router = new Router<[(element: JSX.Element) => any]>();

router.addRoute('/').get(({}, writeElement) =>
  writeElement(
    <>
      <h1>warden.sk</h1>
      <a href="#/test">test</a>
    </>
  )
);

router.addRoute('/test').get(({}, writeElement) => writeElement(<h1>test</h1>));

function Index(): JSX.Element {
  const [readElement, writeElement] = useState<JSX.Element>(<h1 />);

  function test(event?: HashChangeEvent): any {
    const url = location.hash.substring(1) || '/';

    router.test([writeElement], 'GET', url);
  }

  useEffect(() => {
    test();

    window.addEventListener('hashchange', test, false);
  }, []);

  return readElement;
}

ReactDOM.render(<Index />, document.getElementById('index'));
