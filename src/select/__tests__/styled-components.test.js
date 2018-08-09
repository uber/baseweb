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
  StyledInput,
  StyledInputContainer,
  StyledTag,
  StyledSearchIcon,
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

  describe('StyledTag', () => {
    test.each([[''], ['$multiple']])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledTag {...props}>
          <div />
        </StyledTag>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledTag has correct styles when ' + prop,
      );
    });
  });

  describe('StyledSearchIcon', () => {
    test.each([
      [ICON.clearAll],
      [ICON.select],
      [ICON.loop],
      [ICON.clearTag],
      [ICON.selected],
    ])('', $type => {
      const props = {$type};
      const component = shallow(
        <StyledSearchIcon {...props}>
          <div />
        </StyledSearchIcon>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledSearchIcon has correct styles when type is ' + $type,
      );
    });
  });

  describe('StyledDropDown', () => {
    test.each([
      ['', ''],
      ['$rows', 3],
      ['$type', TYPE.select],
      ['$isOpen', true],
    ])('', (prop, value) => {
      const props = {};
      props[prop] = value;
      const component = shallow(
        <StyledDropDown {...props}>
          <div />
        </StyledDropDown>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledDropDown has correct styles when ' + prop + ' is ' + value,
      );
    });
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
