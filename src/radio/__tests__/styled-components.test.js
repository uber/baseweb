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
  StyledLabel,
  StyledRadioMarkInner,
  StyledRadioMarkOuter,
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

  describe('StyledRadioMarkInner', () => {
    test.each([[''], ['disabled'], ['$isFocused'], ['checked'], ['$isError']])(
      '',
      prop => {
        const props = {};
        props[prop] = true;
        const component = shallow(
          <StyledRadioMarkInner {...props}>
            <div />
          </StyledRadioMarkInner>,
        );
        expect(component.instance().getStyles()).toMatchSnapshot(
          'has correct styles when ' + prop,
        );
      },
    );
  });

  describe('StyledRadioMarkOuter', function() {
    test('', () => {
      const component = shallow(
        <StyledRadioMarkOuter>
          <div />
        </StyledRadioMarkOuter>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledRadioMarkOuter has correct styles',
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
