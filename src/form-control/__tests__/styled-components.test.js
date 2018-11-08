/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  Label as StyledLabel,
  Caption as StyledCaption,
} from '../styled-components';

describe('FormControl - Label and Caption for controls', () => {
  test('StyledLabel - basic render', () => {
    const component = shallow(<StyledLabel>Label</StyledLabel>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledLabel has correct default styles',
    );
    component.setProps({
      $disabled: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledLabel has correct styles when compact and disabled',
    );
  });

  test('StyledCaption - basic render', () => {
    const component = shallow(<StyledCaption>Caption</StyledCaption>);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct default styles',
    );
    component.setProps({
      $error: true,
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct styles when compact and error is boolean',
    );
    component.setProps({
      $error: 'Error message',
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCaption has correct styles when error is a string',
    );
  });
});
