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

  // Renders title, header image, thumbnail and action
  expect(wrapper.find('img')).toHaveLength(2);
});

test('Card - header image object', () => {
  const alt = 'Card Alt Desc';
  const srcSet = `${thumbnailImg}, ${headerImg} 1.5x`;
  const props = {
    headerImage: {src: headerImg, srcSet, alt},
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders title, header image with object props
  const imgEl = wrapper.find('img');
  expect(imgEl).toHaveLength(1);
  expect(imgEl.prop('src')).toEqual(headerImg);
  expect(imgEl.prop('alt')).toEqual(alt);
  expect(imgEl.prop('srcSet')).toEqual(srcSet);
});

test('Card - no images', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    title: 'Card title',
  };

  const wrapper = mount(<Card {...props}>Card body</Card>);

  // Renders title and action without images
  expect(wrapper.find('img')).toHaveLength(0);
});
