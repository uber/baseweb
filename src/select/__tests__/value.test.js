/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import SingleValue from '../value.js';
import {StyledSingleValue} from '../styled-components.js';

describe('Single Value component', function() {
  test('renders StyledSingleValue', function() {
    const props = {children: 'test'};
    const wrapper = mount(<SingleValue {...props} />);
    const renderedStyledComponent = wrapper.find(StyledSingleValue).first();
    expect(renderedStyledComponent).toExist();
    expect(renderedStyledComponent.props()).toMatchObject({
      'aria-selected': 'true',
      children: 'test',
    });
  });

  test('renders custom SingleValue', function() {
    const mock = jest.fn().mockImplementation(() => <span />);
    const props = {children: 'test', overrides: {SingleValue: mock}};
    mount(<SingleValue {...props} />);
    expect(mock).toHaveBeenCalled();
    const passedProps = mock.mock.calls[0][0];
    expect(passedProps).toMatchObject({
      'aria-selected': 'true',
      children: 'test',
    });
  });
});
