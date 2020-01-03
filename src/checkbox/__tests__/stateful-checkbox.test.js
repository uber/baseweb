/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';

describe('Stateful checkbox', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
    jest.mock('../checkbox', () => jest.fn(() => <div>test</div>));
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide default styled components to render', function() {
    const {
      StyledRoot,
      StyledLabel,
      StyledCheckmark,
      StyledInput,
      StatefulCheckbox,
    } = require('../index');
    allProps.overrides = {
      Root: StyledRoot,
      Label: StyledLabel,
      Checkmark: StyledCheckmark,
      Input: StyledInput,
    };
    const checkbox: any = require('../checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    const {overrides} = checkbox.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Checkmark: StyledCheckmark,
      Label: StyledLabel,
      Input: StyledInput,
    });
  });

  test('should pass all the other props to stateless checkbox', function() {
    const otherProps = {
      someProp: 'some other prop',
      autoFocus: false,
    };
    allProps = {...allProps, ...otherProps};
    const {StatefulCheckbox} = require('../index');
    const checkbox: any = require('../checkbox');
    wrapper = mount(<StatefulCheckbox {...allProps} />);
    // eslint-disable-next-line no-unused-vars
    const {overrides, ...restProps} = checkbox.mock.calls[1][0];
    expect(restProps).toMatchObject({
      someProp: 'some other prop',
      checked: false,
      autoFocus: false,
      isIndeterminate: false,
    });
  });
});
