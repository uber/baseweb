/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledLabel, StyledCheckmark, StyledInput} from '../index';

describe('Checkbox styled components', () => {
  describe('StyledLabel', () => {
    test.each([[''], ['disabled'], ['$isError']])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledLabel {...props}>
          <div />
        </StyledLabel>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'has correct styles when ' + prop,
      );
    });
  });

  describe('StyledLabel', function() {
    test('Label', () => {
      const component = shallow(
        <StyledLabel>
          <div />
        </StyledLabel>,
      );
      ['left', 'right', 'top', 'bottom'].forEach(labelPlacement => {
        component.setProps({
          $labelPlacement: labelPlacement,
        });
        expect(component.instance().getStyles()).toMatchSnapshot(
          'StyledLabel has correct styles when set to ' + labelPlacement,
        );
      });
    });
  });

  describe('StyledCheckmark', () => {
    test.each([
      [''],
      ['$disabled'],
      ['$disabled', '$checked'],
      ['$isIndeterminate'],
      ['$isFocused'],
      ['$isActive'],
      ['$isHovered'],
      ['$checked'],
      ['$checked', '$isHovered'],
      ['$checked', '$isActive'],
      ['$checked', '$isFocused'],
      ['$isError'],
      ['$isError', '$checked'],
      ['$isError', '$checked', '$isHovered'],
      ['$isError', '$checked', '$isActive'],
      ['$isError', '$checked', '$isFocused'],
      ['$isError', '$isHovered'],
      ['$isError', '$isActive'],
      ['$isError', '$isFocused'],
    ])('', (...props) => {
      const passedProps = {};
      props.map(prop => {
        passedProps[prop] = true;
      });
      const component = shallow(
        <StyledCheckmark {...passedProps}>
          <div />
        </StyledCheckmark>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'has correct styles when ' + props.join(' '),
      );
    });
  });

  describe('StyledInput', function() {
    test('', () => {
      const component = shallow(
        <StyledInput>
          <div />
        </StyledInput>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledInput has correct styles',
      );
    });
  });
  describe('StyledRoot', function() {
    test('', () => {
      const component = shallow(
        <StyledRoot>
          <div />
        </StyledRoot>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledRoot has correct styles',
      );
    });
    test.each([['top'], ['bottom'], ['left'], ['right']])('', prop => {
      const props = {
        $labelPlacement: prop,
      };
      const component = shallow(
        <StyledRoot {...props}>
          <div />
        </StyledRoot>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'has correct styles when label is placed' + prop,
      );
    });
  });
});
