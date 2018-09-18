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

// $FlowFixMe
import IconReadme from '../../rfcs/icon-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Icon', module)
    .addDecorator(withReadme(IconReadme))
    // $FlowFixMe
    .add(description, example),
);
