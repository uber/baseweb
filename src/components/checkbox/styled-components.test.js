// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledLabel, StyledCheckmark, StyledInput} from './index';

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
      ['disabled'],
      ['$isIndeterminate'],
      ['$isFocused'],
      ['checked'],
      ['$isError'],
    ])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledCheckmark {...props}>
          <div />
        </StyledCheckmark>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'has correct styles when ' + prop,
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
