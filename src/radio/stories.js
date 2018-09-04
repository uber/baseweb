/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import RadioGroupReadme from '../../rfcs/radiogroup-component.md';
import examples from './examples';

//$FlowFixMe

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('RadioGroup', module)
    .addDecorator(withReadme(RadioGroupReadme))
    // $FlowFixMe
    .add(description, example),
);
