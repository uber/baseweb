/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import examples from './examples';

//$FlowFixMe
import PopoverReadme from '../../rfcs/popover-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Popover', module)
    .addDecorator(withReadme(PopoverReadme))
    // $FlowFixMe
    .add(description, example),
);
