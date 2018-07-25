// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledBody, StyledInner, StyledArrow} from '../index';

describe('Tooltip styled components', () => {
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

  test('StyledInner - override', () => {
    const component = shallow(
      <StyledInner
        $isOpen
        $isAnimating
        $placement="bottomLeft"
        $arrowOffset={{top: 0, left: 10}}
        $popoverOffset={{top: 100, left: 100}}
        $showArrow
        $style={{background: 'aliceblue'}}
      >
        <div />
      </StyledInner>,
    );

    expect(component.instance().getStyles()).toHaveProperty(
      'background',
      'aliceblue',
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
});
