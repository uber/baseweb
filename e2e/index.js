// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import tests from './tests';
import document from 'global/document';
import window from 'global/window';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import DEFAULT_THEME from '../src/themes/light-theme';
import {ThemeProvider} from '../src/styles';

const engine = new Styletron();
window.E2E_TEST = true;
const app = (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={DEFAULT_THEME}>{tests()}</ThemeProvider>
  </StyletronProvider>
);

ReactDOM.render(app, document.getElementById('root'));
