import React from 'react';
import {configure, addDecorator} from '@storybook/react';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import {ThemeProvider} from '../src/styles';
import {LightTheme} from '../src/themes';

// automatically import all files ending in *.stories.js
const req = require.context(
  '../src',
  true,
  /^((?!template-component\/).)*.stories.js$/,
);

export default function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Add providers for theme and styletron
const engine = new Styletron();
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
});

configure(loadStories, module);
