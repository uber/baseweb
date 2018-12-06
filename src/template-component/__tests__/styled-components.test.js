/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot} from '../index.js';

describe('Component styled components', () => {
  test('StyledRoot - basic render', () => {
    const component = shallow(<StyledRoot $prop={false} />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledRoot has correct styles when prop is set to false',
    );
  });
});
