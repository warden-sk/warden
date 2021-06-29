/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOM from 'react-dom';

function _1() {
  return (
    <div className="container">
      <div>
        <h1>warden.sk</h1>
        <p className="_1">Čoskoro vám predstavíme stránku v úplne novom kabáte.</p>
        <div className="contact">
          <h2>Kontakt</h2>
          <p>
            Marek Kobida
            <br />
            <a href="tel:+421910123678">+421 910 123 678</a>
            <br />
            <a href="mailto:marek@warden.sk">marek@warden.sk</a>
          </p>
          <h3>Právny zástupca</h3>
          <p>
            <a href="mailto:lawyer@warden.sk">lawyer@warden.sk</a>
          </p>
          <a className="discord" href="https://discord.gg/zH8GKfErWb" target="_blank">
            pripojiť sa k sieti Discord
          </a>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<_1 />, document.getElementById('index'));
