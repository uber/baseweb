/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledRoot} from '../styled-components';
import {KIND} from '../constants';

describe('StyledComponents', () => {
  describe('StyledRoot', () => {
    it.each([[KIND.primary], [KIND.warning], [KIND.success], [KIND.error]])(
      'displays correct styles for %s notification',
      kind => {
        const component = shallow(<StyledRoot $kind={kind} />);
        expect(component.instance().getStyles()).toMatchSnapshot();
      },
    );
  });
});
