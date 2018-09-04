/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledBody, StyledInner, StyledArrow, StyledPadding} from '../index';

describe('Popover styled components', () => {
  test('StyledBody - basic render', () => {
    const component = shallow(
      <StyledBody
        $isOpen={false}
        $isAnimating={false}
        $placement="bottomLeft"
        $arrowOffset={{top: 0, left: 0}}
        $popoverOffset={{top: 0, left: 0}}
        $showArrow
      >
        <div />
      </StyledBody>,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct styles when closed',
    );

    component.setProps({
      $isOpen: true,
      $isAnimating: true,
      $arrowOffset: {top: 0, left: 10},
      $popoverOffset: {top: 100, left: 100},
    });
    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct styles when open and animating',
    );
  });

  test('StyledInner - basic render', () => {
    const component = shallow(
      <StyledInner
        $isOpen
        $isAnimating
        $placement="bottomLeft"
        $arrowOffset={{top: 0, left: 10}}
        $popoverOffset={{top: 100, left: 100}}
        $showArrow
      >
        <div />
      </StyledInner>,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledInner has correct styles',
    );
  });

  test('StyledArrow - basic render', () => {
    const component = shallow(
      <StyledArrow
        $isOpen
        $isAnimating
        $placement="bottomLeft"
        $arrowOffset={{top: 0, left: 10}}
        $popoverOffset={{top: 100, left: 100}}
        $showArrow
      >
        <div />
      </StyledArrow>,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledArrow has correct styles',
    );
  });

  test('StyledPadding - basic render', () => {
    const component = shallow(
      <StyledPadding>
        <div />
      </StyledPadding>,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledPadding has correct styles',
    );
  });

  test('StyledPadding - style override', () => {
    const component = shallow(
      <StyledPadding $style={{padding: '21px', color: 'red'}}>
        <div />
      </StyledPadding>,
    );

    expect(component.instance().getStyles()).toEqual({
      padding: '21px',
      color: 'red',
    });
  });
});
