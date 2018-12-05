/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import MenuReadme from '../../rfcs/menu-component.md';
import examples from './examples';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Menu', module)
    .addDecorator(withReadme(MenuReadme))
    // $FlowFixMe
    .add(description, example),
);
