import React from 'react';
import {configure, addDecorator} from '@storybook/react';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import {ThemeProvider} from '../src/styles';
import {LightTheme} from '../src/themes';

// Add providers for theme and styletron
const engine = new Styletron();
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
});

configure(() => require('./load-stories.js'), module);
