/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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
