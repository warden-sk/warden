/*
 * Copyright 2021 Marek Kobida
 */

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

function _1() {
  return (
    <div className="_1">
      <div className="_2 p-2">
        <div className="_3 p-8">
          <h1 className="m-b-4">warden.sk</h1>
          <p className="m-b-4">Čoskoro vám predstavíme stránku v úplne novom kabáte.</p>
          <h2 className="m-b-4">Kontakt</h2>
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

if (typeof window !== 'undefined') {
  ReactDOM.render(<_1 />, document.getElementById('index'));
}

export default <_1 />;
