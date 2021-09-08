/*
 * Copyright 2021 Marek Kobida
 */

import '@warden-sk/design/public/index.css';

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

function _1() {
  return (
    <div className="_1">
      <div alignItems="center" className="_2" justifyContent="center" p="2">
        <div className="_3" p="8">
          <h1 mB="4">warden.sk</h1>
          <p mB="4">Čoskoro vám predstavíme stránku v úplne novom kabáte.</p>
          <h2 mB="4">Kontakt</h2>
          <p>
            Marek Kobida
            <br />
            <a href="tel:+421910123678">+421 910 123 678</a>
            <br />
            <a href="mailto:marek@warden.sk">marek@warden.sk</a>
          </p>
        </div>
      </div>
    </div>
  );
}

typeof window !== 'undefined' && ReactDOM.render(<_1 />, document.getElementById('index'));

export default ReactDOMServer.renderToString(<_1 />);
