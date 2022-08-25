/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Card } from '..';
import { header as headerImg, thumbnail as thumbnailImg } from './images';

test('Card - basic functionality', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    headerImage: headerImg,
    thumbnail: thumbnailImg,
    title: 'Card title',
  };

  const { container } = render(<Card {...props}>Card body</Card>);
  expect(container.querySelectorAll('img')).toHaveLength(2);
});

test('Card - header image object', () => {
  const alt = 'Card Alt Desc';
  const srcSet = `${thumbnailImg}, ${headerImg} 1.5x`;
  const props = {
    headerImage: { src: headerImg, srcSet, alt },
    title: 'Card title',
  };

  const { container } = render(<Card {...props}>Card body</Card>);

  const img = container.querySelector('img');
  expect(img?.getAttribute('src')).toBe(headerImg);
  expect(img?.getAttribute('alt')).toBe(alt);
  expect(img?.getAttribute('srcSet')).toEqual(srcSet);
});

test('Card - no images', () => {
  const props = {
    action: <a href="#test">Link to a Place&nbsp;&nbsp;&nbsp;&gt;</a>,
    title: 'Card title',
  };

  const { container } = render(<Card {...props}>Card body</Card>);
  expect(container.querySelectorAll('img')).toHaveLength(0);
});
