import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {configure, addDecorator} from '@storybook/react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../src/styles';
import DEFAULT_THEME from '../src/themes/light-theme';

const engine = new Styletron();

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

Enzyme.configure({adapter: new Adapter()});

// Add providers for theme and styletron
addDecorator(story => {
  const el = Enzyme.mount(
    <StyletronProvider value={engine}>
      <ThemeProvider theme={DEFAULT_THEME}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
  window.storyEl = el;
  return el.getElement();
});

configure(loadStories, module);
