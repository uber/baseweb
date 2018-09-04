/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateful checkbox', function() {
  let allProps: any, wrapper;

  beforeEach(function() {
    allProps = {};
    jest.mock('../select', () => jest.fn(() => <div>test</div>));
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should provide default styled components to render', function() {
    const {
      StyledRoot,
      StyledInput,
      StyledInputContainer,
      StyledTag,
      StyledSearchIcon,
      StyledDropDown,
      StyledOption,
      StyledDropDownItem,
      StatefulSelect,
    } = require('../index');
    allProps.overrides = {
      Root: StyledRoot,
      Input: StyledInput,
      InputContainer: StyledInputContainer,
      Tag: StyledTag,
      SearchIcon: StyledSearchIcon,
      DropDown: StyledDropDown,
      Option: StyledOption,
      DropDownItem: StyledDropDownItem,
    };
    const checkbox: any = require('../select');
    wrapper = mount(<StatefulSelect {...allProps} />);
    const {overrides} = checkbox.mock.calls[0][0];
    expect(overrides).toEqual({
      Root: StyledRoot,
      Input: StyledInput,
      InputContainer: StyledInputContainer,
      Tag: StyledTag,
      SearchIcon: StyledSearchIcon,
      DropDown: StyledDropDown,
      Option: StyledOption,
      DropDownItem: StyledDropDownItem,
    });
  });

  test('should pass all the other props to stateless select', function() {
    const otherProps = {
      someProp: 'some other props',
      autoFocus: false,
    };
    allProps = {...allProps, ...otherProps};
    const {StatefulSelect} = require('../index');
    const select: any = require('../select');
    wrapper = mount(<StatefulSelect {...allProps} />);
    // eslint-disable-next-line no-unused-vars
    const {overrides, ...rest} = select.mock.calls[1][0];
    expect(rest).toMatchObject({
      someProp: 'some other props',
      selectedOptions: [],
      autoFocus: false,
    });
  });
});
