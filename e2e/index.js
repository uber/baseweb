// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import PopoverExamples from '../src/components/popover/examples';
import document from 'global/document';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import DEFAULT_THEME from '../src/themes/light-theme';
import {ThemeProvider} from '../src/styles';

const engine = new Styletron();

const app = (
  <StyletronProvider value={engine}>
    <ThemeProvider theme={DEFAULT_THEME}>
      {PopoverExamples.map(({example, description}, i) => (
        <div key={`example${i}`} id={escape(description)}>
          {example()}
        </div>
      ))}
    </ThemeProvider>
  </StyletronProvider>
);

ReactDOM.render(app, document.getElementById('root'));
