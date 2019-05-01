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
import BaseProvider from '../src/helpers/base-provider.js';

window.E2E_TEST = true;
const engine = new Styletron();
const app = (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>{tests()}</BaseProvider>
  </StyletronProvider>
);

// $FlowFixMe
ReactDOM.render(app, document.getElementById('root'));
