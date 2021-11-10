/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

if (typeof window !== 'undefined') ReactDOM.hydrate(<div />, document.getElementById('index'));

export default ReactDOMServer.renderToString(<div />);
