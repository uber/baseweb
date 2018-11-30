/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledStar, StyledEmoticon} from '../styled-components.js';

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

    it.each([['$isActive'], ['$isSelected']])(
      'displays correct styling with state %s',
      stateProp => {
        const props = {[`${stateProp}`]: true};
        const component = shallow(<StyledStar {...props} />);
        expect(component.instance().getStyles()).toMatchSnapshot();
      },
    );
  });

  describe('StyledEmoticon', () => {
    it('displays correct styles by default', () => {
      const component = shallow(<StyledEmoticon $index={1} />);
      expect(component.instance().getStyles()).toMatchSnapshot();
    });

    it.each([['$isActive'], ['$isSelected']])(
      'displays correct styling with state %s',
      stateProp => {
        const props = {[`${stateProp}`]: true, $index: 1};
        const component = shallow(<StyledEmoticon {...props} />);
        expect(component.instance().getStyles()).toMatchSnapshot();
      },
    );

    describe('EmoticonStates', () => {
      it.each([[1], [2], [3], [4], [5]])(
        'displays correct SVG icon with $index=%d',
        $index => {
          const component = shallow(<StyledEmoticon $index={$index} />);
          expect(component.instance().getStyles()).toMatchSnapshot();
        },
      );
    });
  });
});
