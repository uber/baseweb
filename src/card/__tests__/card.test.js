/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Card} from '../index.js';
import {header as headerImg, thumbnail as thumbnailImg} from '../images.js';

test('Card - basic functionality', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    headerImage: headerImg,
    thumbnail: thumbnailImg,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders input, label and caption
  expect(wrapper.find('img')).toHaveLength(2);
});

test('Card - no images', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders input, label and caption
  expect(wrapper.find('img')).toHaveLength(0);
});
