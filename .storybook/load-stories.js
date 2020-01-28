/*
Copyright (c) 2018-2020 Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {storiesOf} from '@storybook/react';

import scenarios from '../src/**/*.scenario.js';

const light = storiesOf('baseui', module);
const dark = storiesOf('baseui-dark', module).addDecorator(storyFn => (
  <div
    style={{
      boxSizing: 'border-box',
      width: 'calc(100vw - 10px)',
      height: 'calc(100vh - 17px)',
      overflow: 'scroll',
      padding: '32px',
      backgroundColor: 'black',
    }}
  >
    {storyFn()}
  </div>
));

scenarios.forEach(scenario => {
  const Component = scenario.component;
  light.add(scenario.name, () => <Component />);
  dark.add(scenario.name, () => <Component />);
});
