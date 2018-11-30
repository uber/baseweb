/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import * as StyledComponents from '../styled-components.js';

function makeTest({
  title,
  component: Component,
  props = {},
  children = null,
  snapshotName = 'correct styles',
}: {
  title: string,
  component: React.ComponentType<*>,
  props?: {},
  children?: *,
  snapshotName?: string,
}) {
  test(title, () => {
    const shallowed = shallow(<Component {...props}>{children}</Component>);
    expect(shallowed.instance().getStyles()).toMatchSnapshot(snapshotName);
  });
}

describe('Pagination Styled Components', () => {
  Object.keys(StyledComponents).forEach(componentName => {
    makeTest({
      title: `${componentName} - basic renders`,
      component: StyledComponents[componentName],
    });
  });
});
