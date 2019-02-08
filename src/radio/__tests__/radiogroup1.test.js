/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';

describe('Stateless radiogroup', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    overrides,
    isError,
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    isError = false;
    events = {
      onChange: mockFn,
      onMouseEnter: mockFn,
      onMouseLeave: mockFn,
      onFocus: mockFn,
      onBlur: mockFn,
    };
    allProps = {
      ...events,
      labelPlacement: 'left',
      isError: isError,
      autoFocus: false,
      disabled: false,
      checked: false,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([['Root'], ['Label'], ['RadioMark'], ['Input']])(
    'should send props to %s',
    subcomponent => {
      const {
        StyledRoot,
        StyledLabel,
        StyledRadioMark,
        StyledInput,
        RadioGroup,
        StyledRadio,
      } = require('../index');
      const mockComp: any = jest.fn(() => <div>{subcomponent}</div>);
      overrides = {
        Root: StyledRoot,
        RadioMark: StyledRadioMark,
        Label: StyledLabel,
        Input: StyledInput,
      };
      overrides[subcomponent] = mockComp;
      allProps.overrides = overrides;
      wrapper = mount(
        <RadioGroup {...allProps}>
          <StyledRadio value="1">First</StyledRadio>
          <StyledRadio value="2">Second</StyledRadio>
          <StyledRadio value="3">Third</StyledRadio>
        </RadioGroup>,
      );
      const sharedProps = {
        $isError: allProps.isError,
        $checked: allProps.checked,
        $disabled: allProps.disabled,
      };
      const actualProps = mockComp.mock.calls[0][0];
      const expectedProps = {
        Root: sharedProps,
        Label: {
          ...sharedProps,
          $labelPlacement: allProps.labelPlacement,
        },
        RadioMark: sharedProps,
        Input: {
          type: 'radio',
          disabled: false,
          ...sharedProps,
        },
      };
      expect(actualProps).toMatchObject(expectedProps[subcomponent]);
    },
  );
});
