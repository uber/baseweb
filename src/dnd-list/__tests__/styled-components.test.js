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
  StyledList,
  StyledItem,
  StyledDragHandle,
  StyledCloseHandle,
  StyledLabel,
} from '../index.js';

describe('Component styled components', () => {
  test('StyledRoot - basic render', () => {
    const component = shallow(<StyledRoot />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledRoot has correct styles',
    );
  });
  test('StyledList - basic render', () => {
    const component = shallow(<StyledList />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledList has correct styles',
    );
  });
  test('StyledList - dragging is active', () => {
    const component = shallow(<StyledList $isDragged />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledList has correct styles when dragging is active',
    );
  });
  test('StyledItem - basic render', () => {
    const component = shallow(<StyledItem />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledItem has correct styles',
    );
  });
  test('StyledItem - dragged', () => {
    const component = shallow(<StyledItem $isDragged />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledItem has correct styles when being dragged',
    );
  });
  test('StyledItem - selected', () => {
    const component = shallow(<StyledItem $isSelected />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledItem has correct styles when being selected',
    );
  });
  test('StyledDragHandle - basic render', () => {
    const component = shallow(<StyledDragHandle />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledDragHandle has correct styles',
    );
  });
  test('StyledCloseHandle - basic render', () => {
    const component = shallow(<StyledCloseHandle />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledCloseHandle has correct styles',
    );
  });
  test('StyledLabel - basic render', () => {
    const component = shallow(<StyledLabel />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledLabel has correct styles',
    );
  });
});
