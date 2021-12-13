/*
 * Copyright 2021 Marek Kobida
 */

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

const CONTAINER_ID = 'index';

function Anchor() {
  return (
    <a display="block" href="https://discord.com/invite/zH8GKfErWb" textAlign="center">
      Pripojiť k sieti <span className="discord">Discord</span>
    </a>
  );
}

typeof window !== 'undefined' && ReactDOM.hydrate(<Anchor />, document.getElementById(CONTAINER_ID));

export default (
  <div id={CONTAINER_ID}>
    <Anchor />
  </div>
);
