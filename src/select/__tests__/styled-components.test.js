/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
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
  StyledSearchIcon,
  StyledOptionContent,
} from '../index.js';
import {TYPE, SIZE} from '../constants.js';

const styledComponents = [
  [StyledRoot, 'StyledRoot'],
  [StyledControlContainer, 'StyledControlContainer'],
  [StyledValueContainer, 'StyledValueContainer'],
  [StyledPlaceholder, 'StyledPlaceholder'],
  [StyledSingleValue, 'StyledSingleValue'],
  [StyledInputContainer, 'StyledInputContainer'],
  [StyledInput, 'StyledInput'],
  [StyledInputSizer, 'StyledInputSizer'],
  [StyledSelectArrow, 'StyledSelectArrow'],
  [StyledClearIcon, 'StyledClearIcon'],
  [StyledSearchIcon, 'StyledSearchIcon'],
  [StyledOptionContent, 'StyledOptionContent'],
];

describe('Select styled components', () => {
  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct default styles`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $size={SIZE.compact} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles for the SIZE.compact`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $type={TYPE.search} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles for the TYPE.search`,
    );
  });

  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component $disabled={true} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles for the disabled state`,
    );
  });

  test('StyledOptionContent styles', () => {
    const component = shallow(<StyledOptionContent $selected={true} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledOptionContent has correct styles when selected',
    );
  });
});
