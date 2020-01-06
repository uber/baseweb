/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import MultiValue from '../multi-value.js';
import {Tag} from '../../tag/index.js';

describe('Multi Value component', function() {
  test('renders Tag by default', function() {
    const props = {children: 'test'};
    const wrapper = mount(<MultiValue {...props} />);
    const renderedTag = wrapper.find(Tag).first();
    expect(renderedTag).toExist();
  });

  test('renders MultiValue', function() {
    const mock = jest.fn().mockImplementation(() => <span />);
    const props = {
      children: 'test',
      removeValue: jest.fn(),
      overrides: {MultiValue: mock},
    };
    mount(<MultiValue {...props} />);
    expect(mock).toHaveBeenCalled();
    const passedProps = mock.mock.calls[0][0];
    expect(passedProps.onActionClick).toEqual(props.removeValue);
    expect(passedProps).toMatchSnapshot(
      'passes correct props to an underlying component',
    );
  });
});
