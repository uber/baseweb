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
  StyledAxis,
  StyledTick,
  StyledThumb,
  StyledTickBar,
  StyledAxisRange,
} from '../index';

describe('Slider styled components', () => {
  describe('StyledRoot', function() {
    test('StyledRoot', () => {
      const component = shallow(
        <StyledRoot>
          <div />
        </StyledRoot>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledRoot has correct styles',
      );
    });
  });
  describe('StyledAxis', function() {
    test('StyledAxis', () => {
      const component = shallow(
        <StyledAxis>
          <div />
        </StyledAxis>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledAxis has correct styles',
      );
    });
  });
  describe('StyledTick', function() {
    test('StyledTick', () => {
      const component = shallow(
        <StyledTick>
          <div />
        </StyledTick>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTick has correct styles',
      );
    });
  });
  describe('StyledTickBar', function() {
    test('StyledTickBar', () => {
      const component = shallow(
        <StyledTickBar>
          <div />
        </StyledTickBar>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTickBar has correct styles',
      );
    });
  });
  //$FlowFixMe
  describe.each([
    ['$isStart', 'Start Thumb'],
    ['$isEnd', 'End Thumb'],
    ['', 'Single Thumb'],
  ])('%%For %s thumb type', (thumbType, thumbText) => {
    //$FlowFixMe
    describe.each([
      ['$disabled'],
      ['$isFocused'],
      ['$isError'],
      ['$isHovered'],
    ])('With special state %s', extraState => {
      test.each([
        [[10, 300], [50, 100], 1, 0, 'range'],
        [[80], [50, 100], 0, 0, 'not range'],
        [[10, 300], [50, 100], 1, 1, 'range'],
        [[80], [50, 100], 0, 0, 'not range'],
      ])(
        '%% %% If thumb is in %s',
        ($range, $value, $currentThumb, $index, text) => {
          const props = {
            $value,
            $currentThumb,
            $index,
            $max: $range[1],
            $min: $range[0],
            $isRange: $value.length > 1,
          };
          props[thumbType] = true;
          props[extraState] = true;
          const component = shallow(
            <StyledThumb {...props}>
              <div />
            </StyledThumb>,
          );
          expect(component.instance().getStyles()).toMatchSnapshot(
            'StyledThumb has correct styles when type is ' +
              thumbText +
              ' and it is ' +
              text,
          );
        },
      );
    });
  });

  describe('StyledAxisRange', () => {
    test.each([
      [[10, 300], [50, 100], 'range'],
      [[80], [50, 100], 'not range'],
    ])('%% %% For %s slider', ($range, $value, text) => {
      const props = {
        $value,
        $max: $range[1],
        $min: $range[0],
        $isRange: $value.length > 1,
      };
      const component = shallow(
        <StyledAxisRange {...props}>
          <div />
        </StyledAxisRange>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledAxisRange has correct styles when is ' + text + ' slider',
      );
    });
  });
});
