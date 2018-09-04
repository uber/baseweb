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
import CheckboxReadme from '../../rfcs/checkbox-component.md';
import examples from './examples';
import examplesToggle from './examples-toggle';

//$FlowFixMe

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Checkbox', module)
    .addDecorator(withReadme(CheckboxReadme))
    // $FlowFixMe
    .add(description, example),
);

Object.entries(examplesToggle).forEach(([description, example]) =>
  storiesOf('Toggle', module)
    .addDecorator(withReadme(CheckboxReadme))
    // $FlowFixMe
    .add(description, example),
);
