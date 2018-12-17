import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import {themes} from '@storybook/components';
import {withOptions, setOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {checkA11y} from '@storybook/addon-a11y';
import {withKnobs} from '@storybook/addon-knobs';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import loadStories from '../.storybook-base/loadStories.js';
import {ThemeProvider} from '../src/styles';
import {LightThemeMove} from '../src/themes';

withOptions({
  name: 'baseui',
  url: 'https://github.com/uber-web/baseui',
});

setOptions({
  theme: {
    ...themes.normal,
    highlightColor: LightThemeMove.colors.primary,
    successColor: LightThemeMove.colors.positive,
    warningColor: LightThemeMove.colors.warning,
    failColor: LightThemeMove.colors.negative,
  },
});

const engine = new Styletron();

// this should be first decorator to avoid extra code to be parsed here
addDecorator(withInfo);

addDecorator(withKnobs);
addDecorator(checkA11y);

// Add providers for theme and styletron
addDecorator(story => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightThemeMove}>{story()}</ThemeProvider>
    </StyletronProvider>
  );
});

configure(loadStories, module);
