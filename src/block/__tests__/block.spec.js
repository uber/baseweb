/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import Block from '../block';

describe('Block', () => {
  it('renders correctly', () => {
    expect(mount(<Block color="primary200">test</Block>)).toMatchSnapshot();
  });

  it('applies other props if provided', () => {
    const onClickMock = jest.fn();
    const example = mount(<Block onClick={onClickMock}>test</Block>);
    example.simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });
});
