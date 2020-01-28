/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Accordion, Panel} from '../index.js';

import {createTheme, lightThemePrimitives} from '../../index.js';
import {ThemeProvider} from '../../index.js';

const themeWithIcons = createTheme(
  {
    ...lightThemePrimitives,
  },
  {
    icons: {
      // eslint-disable-next-line
      Plus: () => <div>plus-override(theme)</div>,
      // eslint-disable-next-line
      CheckIndeterminate: () => <div>minus-override(theme)</div>,
    },
  },
);

export const name = 'accordion-panel-override';

export const component = () => (
  <ThemeProvider theme={themeWithIcons}>
    <Accordion>
      <Panel
        title="hello"
        overrides={{
          // eslint-disable-next-line
          ToggleIcon: function(props) {
            if (props.$expanded) {
              return <div>collapse(override)</div>;
            }
            return <div>expand(override)</div>;
          },
        }}
      >
        hello puppeteer!
      </Panel>
    </Accordion>
  </ThemeProvider>
);
