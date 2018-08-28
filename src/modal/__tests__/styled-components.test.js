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
import {
  StyledRoot,
  StyledBackdrop,
  StyledDialogContainer,
  StyledDialog,
  StyledClose,
  ModalHeader,
  ModalFooter,
  ModalBody,
  SIZE,
} from '../index';

describe('Modal styled components', () => {
  // Basic tests with static styles first
  [
    ['StyledDialogContainer', StyledDialogContainer],
    ['StyledClose', StyledClose],
    ['ModalHeader', ModalHeader],
    ['ModalBody', ModalBody],
    ['ModalFooter', ModalFooter],
  ].forEach(testCase => {
    test(`${testCase[0]} - basic render`, () => {
      const TestCaseClass = testCase[1];
      const component = shallow(<TestCaseClass />);
      expect(component.instance().getStyles()).toMatchSnapshot(
        `${testCase[0]} has correct styles`,
      );
    });
  });

  test('StyledRoot - basic render', () => {
    const component = shallow(<StyledRoot $isOpen={false} />);

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct styles when closed',
    );

    // Should have pointer-events none when closed
    component.setProps({
      $isOpen: false,
    });
    expect(component.instance().getStyles().pointerEvents).toBe('none');
  });

  test('StyledBackdrop - basic render', () => {
    const component = shallow(
      <StyledBackdrop $isOpen={false} $isVisible={false} />,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledBody has correct styles when closed',
    );

    component.setProps({$isOpen: true});
    expect(component.instance().getStyles().opacity).toBe(0);

    component.setProps({$isVisible: true});
    expect(component.instance().getStyles().opacity).toBe(1);

    component.setProps({$isOpen: false});
    expect(component.instance().getStyles().opacity).toBe(0);

    component.setProps({$animate: false});
    expect(component.instance().getStyles().transitionProperty).toBeUndefined();
  });

  test('StyledDialog - basic render', () => {
    const component = shallow(
      <StyledDialog $isOpen={true} $isVisible={true} />,
    );

    expect(component.instance().getStyles()).toMatchSnapshot(
      'StyledDialog has correct styles',
    );
  });

  test('StyledDialog - full width', () => {
    const component = shallow(
      <StyledDialog $isOpen={true} $isVisible={true} $size={SIZE.full} />,
    );

    const styles = component.instance().getStyles();
    expect(styles.maxWidth).toBe('100%');
    expect(styles.width).toBe('100%');
    expect(styles.alignSelf).toBe('stretch');
  });

  test('StyledDialog - auto width', () => {
    const component = shallow(
      <StyledDialog $isOpen={true} $isVisible={true} $size={SIZE.auto} />,
    );

    const styles = component.instance().getStyles();
    expect(styles.maxWidth).toBe('100%');
    expect(styles.width).toBe('auto');
    expect(styles.alignSelf).toBeUndefined();
  });

  test('StyledDialog - custom width', () => {
    const component = shallow(
      <StyledDialog $isOpen={true} $isVisible={true} $size="800px" />,
    );

    const styles = component.instance().getStyles();
    expect(styles.maxWidth).toBe('100%');
    expect(styles.width).toBe('800px');
    expect(styles.alignSelf).toBeUndefined();
  });
});
