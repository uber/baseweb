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
        $arrowStyles={{top: '0px', left: '0px'}}
        $positionStyles={{top: '0px', left: '0px'}}
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
      $arrowStyles: {top: '0px', left: '10px'},
      $positionStyles: {top: '100px', left: '100px'},
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
        $arrowStyles={{top: '0px', left: '10px'}}
        $positionStyles={{top: '100px', left: '100px'}}
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
        $arrowStyles={{top: '0px', left: '10px'}}
        $positionStyles={{top: '100px', left: '100px'}}
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
});
