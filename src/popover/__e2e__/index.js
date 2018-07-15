// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Examples from '../examples';
import document from 'global/document';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import DEFAULT_THEME from '../../themes/light-theme';
import {ThemeProvider} from '../../styles';

const engine = new Styletron();

const app = (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={DEFAULT_THEME}>
      {Examples.map((example, i) => <div key={`example${i}`}>{example}</div>)}
    </ThemeProvider>
  </StyletronProvider>
);

ReactDOM.render(app, document.getElementById('root'));
