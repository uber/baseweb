/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow, mount} from 'enzyme';
import {
  StyledRoot,
  StyledNavigationList,
  StyledNavigationItem,
  ALIGN,
} from '../index';

describe('Header Navigation styled components', () => {
  describe('StyledRoot', function() {
    test('Root', () => {
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
  describe('NavigationList', function() {
    test('NavigationList', () => {
      const component = mount(
        <StyledNavigationList>
          <div />
        </StyledNavigationList>,
      );
      Object.values(ALIGN).forEach(align => {
        component.setProps({
          align,
        });
        expect(component.instance().getStyles()).toMatchSnapshot(
          // $FlowFixMe
          `NavigationList has correct styles when set to align ${align}`,
        );
      });
    });
  });
  describe('NavigationItem', function() {
    test('NavigationItem', () => {
      const component = shallow(
        <StyledNavigationItem>
          <div />
        </StyledNavigationItem>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        'NavigationItem has correct styles',
      );
    });
  });
});
