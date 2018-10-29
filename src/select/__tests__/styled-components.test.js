/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledInput,
  StyledInputContainer,
  StyledSelectComponentIcon,
  StyledDropDown,
  StyledDropDownItem,
  StyledOption,
} from '../index';
import {ICON, TYPE} from '../constants';

describe('Select styled components', () => {
  describe('StyledInput', function() {
    test('Input', () => {
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
  describe('StyledInputContainer', function() {
    test('InputContainer', () => {
      const component = shallow(
        <StyledInputContainer>
          <div />
        </StyledInputContainer>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledInputContainer has correct styles',
      );
    });
  });

  describe('StyledSelectComponentIcon', () => {
    test.each([[ICON.clearAll], [ICON.select], [ICON.loop], [ICON.selected]])(
      '',
      $type => {
        const props = {$type};
        const component = shallow(
          <StyledSelectComponentIcon {...props}>
            <div />
          </StyledSelectComponentIcon>,
        );
        expect(component.instance().getStyles()).toMatchSnapshot(
          'StyledSelectComponentIcon has correct styles when type is ' + $type,
        );
      },
    );
  });

  describe('StyledDropDown', () => {
    test.each([['', ''], ['$type', TYPE.select], ['$isOpen', true]])(
      '',
      (prop, value) => {
        const props = {};
        props[prop] = value;
        const component = shallow(
          <StyledDropDown {...props}>
            <div />
          </StyledDropDown>,
        );
        expect(component.instance().getStyles()).toMatchSnapshot(
          `StyledDropDown has correct styles when ${prop} is ${value}`,
        );
      },
    );
  });

  describe('StyledDropDownItem', function() {
    test('DropDownItem', () => {
      const component = shallow(
        <StyledDropDownItem>
          <div />
        </StyledDropDownItem>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledDropDownItem has correct styles',
      );
    });
  });

  describe('StyledOption', () => {
    test.each([[''], ['disabled'], ['$selected']])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledOption {...props}>
          <div />
        </StyledOption>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledOption has correct styles when ' + prop,
      );
    });
  });
});
