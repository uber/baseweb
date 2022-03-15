import * as React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {LightTheme, DarkTheme} from '../src/themes/index.js';
import BaseProvider from '../src/helpers/base-provider.js';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const engine = new Styletron();

export const decorators = [
  (Story) => (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Story />
      </BaseProvider>
    </StyletronProvider>
  ),
];
