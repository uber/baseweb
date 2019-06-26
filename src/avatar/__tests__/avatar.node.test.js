/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render} from 'enzyme';

import {Avatar} from '../index.js';

describe('Avatar', () => {
  it('applies expected accessibility attributes to img element', () => {
    const name = 'user name';
    const image = render(<Avatar name={name} src="valid-img-src.png" />);
    expect(image).toMatchSnapshot('SSR Avatar');
  });
});
