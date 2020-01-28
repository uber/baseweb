/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';

import {styled} from '../../styles/index.js';
import {HeaderNavigation} from '../index.js';

describe('Stateless header navigation', function() {
  let wrapper, children;
  let allProps: any = {};

  beforeEach(function() {
    children = 'Some tag';
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test('should render component', function() {
    wrapper = mount(
      <HeaderNavigation {...allProps}>{children}</HeaderNavigation>,
    );
    expect(wrapper).toMatchSnapshot('Component has correct render');
  });

  test('should replace overridden root', function() {
    const newRoot = styled('div', {color: 'red'});
    allProps.overrides = {Root: newRoot};
    wrapper = mount(
      <HeaderNavigation {...allProps}>{children}</HeaderNavigation>,
    );
    const renderedRoot = wrapper.find(allProps.overrides.Root);
    expect(renderedRoot).toHaveLength(1);
  });
});
