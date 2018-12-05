/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledSeparator, StyledIcon} from '../styled-components';

describe('StyledComponents', () => {
  describe('StyledRoot', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledRoot />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });
  });

  describe('StyledSeparator', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledSeparator />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });
  });

  describe('StyledIcon', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledIcon />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });
  });
});
