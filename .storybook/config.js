import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../src/styles';
import DEFAULT_THEME from '../src/themes/light-theme';
import {
  withInfo,
  setDefaults as infoAddonSetDefaults,
} from '@storybook/addon-info';
import {checkA11y} from '@storybook/addon-a11y';
import {withKnobs} from '@storybook/addon-knobs';

// we are using 3.x for addon-info
// docs for that version can be found here
// https://github.com/storybooks/storybook/tree/cf1a984f9eb23c58bdbed6860ff24d3d1534572b/addons/info

infoAddonSetDefaults({
  inline: true,
  source: false,
  header: false,
});

setOptions({
  name: 'baseui',
  url: 'https://github.com/uber-web/baseui',
});

const engine = new Styletron();

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  require('../src/welcome.stories.js');
  req.keys().forEach(filename => req(filename));
}

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
