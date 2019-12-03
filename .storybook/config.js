import * as React from 'react';
import {configure, addDecorator, addParameters} from '@storybook/react';
import {initializeRTL} from 'storybook-addon-rtl';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import {BaseProvider} from '../src/index';
import {LightThemeMove, DarkThemeMove} from '../src/themes';

initializeRTL();

// Add providers for theme and styletron
const engine = new Styletron();
addDecorator((story, context) => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider
        theme={context.kind === 'baseui-dark' ? DarkThemeMove : LightThemeMove}
      >
        {story()}
      </BaseProvider>
    </StyletronProvider>
  );
});

addParameters({options: {showAddonPanel: false}});

configure(() => require('./load-stories.js'), module);
