/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {
  StatefulSelect,
  StatefulSelectContainer,
  StyledRoot,
  StyledControlContainer,
  StyledValueContainer,
  StyledPlaceholder,
  StyledSingleValue,
  StyledInputContainer,
  StyledInput,
  StyledInputSizer,
  StyledSelectArrow,
  StyledClearIcon,
  StyledSearchIconContainer,
  StyledOptionContent,
} from '../index.js';
import SearchIconComponent from '../../icon/search.js';
import Select from '../select.js';

jest.mock('../select', () => jest.fn(() => null));

describe('Stateful select', function() {
  let wrapper;

  afterEach(function() {
    wrapper && wrapper.unmount();
  });

  afterAll(function() {
    jest.restoreAllMocks();
  });

  test('should provide default styled components to render', function() {
    const props = {
      overrides: {
        Root: StyledRoot,
        ControlContainer: StyledControlContainer,
        ValueContainer: StyledValueContainer,
        Placeholder: StyledPlaceholder,
        SingleValue: StyledSingleValue,
        MultiValue: function MultiValueComponent({children}) {
          return <div>{children}</div>;
        },
        InputContainer: StyledInputContainer,
        Input: StyledInput,
        InputSizer: StyledInputSizer,
        SelectArrow: StyledSelectArrow,
        ClearIcon: StyledClearIcon,
        SearchIconContainer: StyledSearchIconContainer,
        SearchIcon: SearchIconComponent,
        OptionContent: StyledOptionContent,
      },
    };
    wrapper = mount(<StatefulSelect {...props} />);
    // $FlowFixMe
    const {overrides} = Select.mock.calls[0][0];
    expect(overrides).toEqual(props.overrides);
    expect(Select).toHaveBeenCalled();
  });

  test('should pass value and other props to stateless select', function() {
    const props = {
      initialState: {
        value: [{id: 'id'}],
      },
      onChange: jest.fn(),
      multi: true,
    };
    wrapper = mount(<StatefulSelect {...props} />);
    const renderedContainer = wrapper.find(StatefulSelectContainer).first();
    // $FlowFixMe
    const selectProps = Select.mock.calls[1][0];
    expect(selectProps).toMatchObject({
      value: props.initialState.value,
      multi: props.multi,
      onChange: renderedContainer.instance().onChange,
    });
  });

  test('should call onChange from props', function() {
    const props = {
      onChange: jest.fn(),
    };
    wrapper = mount(<StatefulSelect {...props} />);
    const renderedContainer = wrapper.find(StatefulSelectContainer).first();
    const params = {value: ''};
    // $FlowFixMe
    renderedContainer.instance().onChange(params);
    expect(props.onChange).toHaveBeenCalledWith(params);
  });
});
