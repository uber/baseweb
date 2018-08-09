// @flow
/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import tests from './tests';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import DEFAULT_THEME from '../src/themes/light-theme';
import {ThemeProvider} from '../src/styles';

window.E2E_TEST = true;
const engine = new Styletron();
const app = (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={DEFAULT_THEME}>{tests()}</ThemeProvider>
  </StyletronProvider>
);

// $FlowFixMe
ReactDOM.render(app, document.getElementById('root'));
