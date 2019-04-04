import React from 'react';
import {configure, addDecorator} from '@storybook/react';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import {LayersManager} from '../src/layer';
import {ThemeProvider} from '../src/styles';
import {LightThemeMove, DarkThemeMove} from '../src/themes';

// Add providers for theme and styletron
const engine = new Styletron();
addDecorator((story, context) => {
  return (
    <StyletronProvider value={engine}>
      <LayersManager>
        <ThemeProvider
          theme={
            context.kind === 'baseui-dark' ? DarkThemeMove : LightThemeMove
          }
        >
          {story()}
        </ThemeProvider>
      </LayersManager>
    </StyletronProvider>
  );
});

configure(() => require('./load-stories.js'), module);
