/*
 * Copyright 2021 Marek Kobida
 */

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

if (typeof window !== 'undefined')
  ReactDOM.render(<>{1640991600000 - +new Date()}</>, document.getElementById('index'));

export default ReactDOMServer.renderToString(<div id="index" />);
