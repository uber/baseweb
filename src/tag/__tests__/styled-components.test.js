/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledAction} from '../index.js';

describe('Tag styled components', () => {
  describe('StyledRoot', () => {
    test.each([
      [''],
      ['$disabled'],
      ['$isFocused'],
      ['$isActive'],
      ['$closable'],
    ])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledRoot {...props}>
          <div />
        </StyledRoot>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledRoot has correct styles when ' + prop,
      );
    });
  });

  describe('StyledAction', () => {
    test.each([['$disabled'], ['']])('', prop => {
      const props = {};
      props[prop] = true;
      const component = shallow(
        <StyledAction {...props}>
          <div />
        </StyledAction>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'StyledAction has correct styles when ' + prop,
      );
    });
  });
});
