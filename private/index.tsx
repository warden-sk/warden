/*
 * Copyright 2021 Marek Kobida
 */

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

if (typeof window !== 'undefined')
  ReactDOM.render(<>{1640991600000 - +new Date()}</>, document.getElementById('index'));

export default '<div id="index"></div>';
