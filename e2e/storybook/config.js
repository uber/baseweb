/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-env browser */
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {configure, addDecorator, addParameters} from '@storybook/react';
import {initializeRTL} from 'storybook-addon-rtl';

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';

import {BaseProvider} from '../../src/index.js';
import {LightThemeMove, DarkThemeMove} from '../../src/themes/index.js';

initializeRTL();

// Add providers for theme and styletron

// This file is re-invoked in HMR, preserve engine across re-render
const engineKey = Symbol.for('styletron.engine');
const engine = (window[engineKey] = window[engineKey] || new Styletron());

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
