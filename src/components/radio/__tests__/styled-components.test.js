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
  StyledLabel,
  StyledRadioMark,
  StyledInput,
  StyledRadioGroupRoot,
} from '../index';

describe('RadioGroup styled components', () => {
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

  describe('StyledRadioGroupRoot', function() {
    test('RadioGroupRoot', () => {
      const component = shallow(
        <StyledRadioGroupRoot>
          <div />
        </StyledRadioGroupRoot>,
      );
      ['horizontal', 'vertical'].forEach(align => {
        component.setProps({
          $align: align,
        });
        expect(component.instance().getStyles()).toMatchSnapshot(
          'StyledRadioGroupRoot has correct styles when set to ' + align,
        );
      });
    });
  });

  describe('StyledRadioMark', () => {
    test.each([[''], ['disabled'], ['$isFocused'], ['checked'], ['$isError']])(
      '',
      prop => {
        const props = {};
        props[prop] = true;
        const component = shallow(
          <StyledRadioMark {...props}>
            <div />
          </StyledRadioMark>,
        );
        expect(component.instance().getStyles()).toMatchSnapshot(
          'has correct styles when ' + prop,
        );
      },
    );
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
