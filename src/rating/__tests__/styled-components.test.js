/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledStar, StyledEmoticon} from '../styled-components';

describe('StyledComponents', () => {
  describe('StyledRoot', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledRoot />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });
  });

  describe('StyledStar', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledStar />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    it('displays correct styles if $isActive', () => {
      const component = shallow(<StyledStar $isActive />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    it('displays correct styles if $isSelected', () => {
      const component = shallow(<StyledStar $isSelected />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });
  });

  describe('StyledEmoticon', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledEmoticon $index={1} />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    it('displays correct styles if $isActive', () => {
      const component = shallow(<StyledEmoticon $isActive $index={1} />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    it('displays correct styles if $isSelected', () => {
      const component = shallow(<StyledEmoticon $isSelected $index={1} />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    describe('EmoticonStates', () => {
      it('displays correct SVG icon for each $index', () => {
        for (let x = 1; x <= 5; x++) {
          const component = shallow(<StyledEmoticon $index={x} />);
          expect(component.instance().getStyles()).toMatchSnapshot();
        }
      });
    });
  });
});
