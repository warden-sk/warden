/*
 * Copyright 2021 Marek Kobida
 */

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

function _1() {
  return <div />;
}

typeof window !== 'undefined' && ReactDOM.hydrate(<_1 />, document.getElementById('index'));

export default ReactDOMServer.renderToString(<_1 />);
