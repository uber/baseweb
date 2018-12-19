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
  StyledTabBar,
  StyledTabContent,
  StyledTab,
  ORIENTATION,
} from '../index.js';

const styledComponents = [
  [StyledRoot, 'StyledRoot'],
  [StyledTabBar, 'StyledTabBar'],
  [StyledTabContent, 'StyledTabContent'],
  [StyledTab, 'StyledTab'],
];

describe.each(Object.values(ORIENTATION))(
  'Tabs styled components in %s orientation',
  orientation => {
    test.each(styledComponents)('Basic render', (Component, name) => {
      const component = shallow(<Component $orientation={orientation} />);
      expect(component.instance().getStyles()).toMatchSnapshot(
        `${name} has correct styles in ${orientation} orientation`,
      );
    });

    test.each(styledComponents)(
      'Basic render when disabled',
      (Component, name) => {
        const component = shallow(
          <Component $orientation={orientation} $disabled={true} />,
        );
        expect(component.instance().getStyles()).toMatchSnapshot(
          `${name} has correct styles when disabled is set to true in ${orientation} orientation`,
        );
      },
    );

    test.each([
      [StyledTab, 'StyledTab'],
      [StyledTabContent, 'StyledTabContent'],
    ])('Basic render when active is set to true', (Component, name) => {
      const component = shallow(
        <Component $orientation={orientation} $active={true} />,
      );
      expect(component.instance().getStyles()).toMatchSnapshot(
        `${name} has correct styles when active is set to true in ${orientation} orientation`,
      );
    });
  },
);
