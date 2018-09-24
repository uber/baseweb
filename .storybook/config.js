import React from 'react';
import {configure, addDecorator, setAddon} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../src/styles';
import DEFAULT_THEME from '../src/themes/light-theme';
import {withInfo} from '@storybook/addon-info';
import {checkA11y} from '@storybook/addon-a11y';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';

setOptions({
  name: 'baseui',
  url: 'https://github.com/uber-web/baseui',
});

const engine = new Styletron();

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /^((?!template-component\/).)*.stories.js$/);
function loadStories() {
  require('../src/welcome.stories.js');
  req.keys().forEach(filename => req(filename));
}

// this should be first decorator to avoid extra code to be parsed here
addDecorator(story => {
  return withInfo()(story)({});
});

addDecorator(withKnobs);
addDecorator(checkA11y);

// Add providers for theme and styletron
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={DEFAULT_THEME}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
});

configure(loadStories, module);
