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
        <p className="_1">Čoskoro vám predstavím stránku v úplne novom kabáte.</p>
        <div className="contact">
          <h2>Kontakt</h2>
          <p>
            Marek Kobida
            <br />
            <a href="#">+421 910 123 678</a>
            <br />
            <a href="#">marek@warden.sk</a>
          </p>
          <h3>Právnik</h3>
          <p>
            <a href="#">lawyer@warden.sk</a>
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<_1 />, document.getElementById('index'));
