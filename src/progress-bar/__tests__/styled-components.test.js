/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot, StyledBar, StyledBarProgress, StyledLabel} from '../index';

describe('ProgressBar styled components', () => {
  // $FlowFixMe
  describe.each([
    [StyledRoot, 'StyledRoot'],
    [StyledBar, 'StyledBar'],
    [StyledBarProgress, 'StyledBarProgress'],
    [StyledLabel, 'StyledLabel'],
  ])('Test %% %s', (Component, compName) => {
    test(compName, () => {
      const props = {
        $value: 40,
        $successValue: 100,
      };
      const component = shallow(
        <Component {...props}>
          <div />
        </Component>,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        `${compName} has correct styles`,
      );
    });
  });
});
