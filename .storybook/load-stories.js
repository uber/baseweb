/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-disable flowtype/require-valid-file-annotation */

import {storiesOf} from '@storybook/react';

import scenarios from '../src/**/*.scenario.js';

scenarios.reduce(
  (stories, scenario) => stories.add(scenario.name, scenario.component),
  storiesOf('baseui', module),
);

scenarios.reduce(
  (stories, scenario) => stories.add(scenario.name, scenario.component),
  storiesOf('baseui-dark', module),
);
