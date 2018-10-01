/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module */
import {storiesOf} from '@storybook/react';

// Styled elements
import examples from './examples';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import SliderReadme from '../../rfcs/slider-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Slider', module)
    .addDecorator(withReadme(SliderReadme))
    // $FlowFixMe
    .add(description, example),
);
