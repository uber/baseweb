/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import {LightTheme, DarkTheme} from '../src/themes/index.js';
import BaseProvider from '../src/helpers/base-provider.js';

window.E2E_TEST = true;
const engine = new Styletron();
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get('theme');
const app = (
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      {tests()}
    </BaseProvider>
  </StyletronProvider>
);

if (theme === 'dark') {
  window.document.body.classList.add('dark');
}

// $FlowFixMe
ReactDOM.render(app, document.getElementById('root'));
