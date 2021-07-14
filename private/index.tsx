/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOM from 'react-dom';

function _1() {
  return (
    <div className="_1">
      <div className="_2 p-2">
        <div className="_3 p-8">
          <h1 className="m-b-4">warden.sk</h1>
          <p className="m-b-4">Čoskoro vám predstavíme stránku v úplne novom kabáte.</p>
          <h2>Kontakt</h2>
          <p className="m-b-4">
            Marek Kobida
            <br />
            <a href="tel:+421910123678">+421 910 123 678</a>
            <br />
            <a href="mailto:marek@warden.sk">marek@warden.sk</a>
          </p>
          <h3>Právny zástupca</h3>
          <p className="m-b-4">
            <a href="mailto:lawyer@warden.sk">lawyer@warden.sk</a>
          </p>
          <h3>Bankové údaje</h3>
          <p>
            Slovenská sporiteľňa, a. s.
            <br />
            IBAN:{' '}
            <span contentEditable onKeyDown={e => (e.metaKey ? true : e.preventDefault())}>
              SK51 0900 0000 0050 7145 4547
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<_1 />, document.getElementById('index'));
