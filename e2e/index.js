/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import tests from './tests.js';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {LightTheme} from '../src/themes/index.js';
import {ThemeProvider} from '../src/styles/index.js';

window.E2E_TEST = true;
const engine = new Styletron();
const app = (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={LightTheme}>{tests()}</ThemeProvider>
  </StyletronProvider>
);

// $FlowFixMe
ReactDOM.render(app, document.getElementById('root'));
