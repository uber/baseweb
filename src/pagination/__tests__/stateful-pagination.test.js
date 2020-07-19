/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {mount} from 'enzyme';
import * as React from 'react';

import Pagination from '../pagination.js';
import StatefulContainer from '../stateful-container.js';
import StatefulPagination from '../stateful-pagination.js';

function getSharedProps() {
  return {
    numPages: 5,
    initialState: {
      currentPage: 2,
    },
    extraProp: 'extra',
  };
}

describe('Pagination StatefulPagination', () => {
  test('renders with props', () => {
    const component = mount(<StatefulPagination {...getSharedProps()} />);
    expect(component.find(StatefulContainer).length).toBe(1);
    expect(component.find(StatefulContainer).prop('initialState')).toEqual({
      currentPage: 2,
    });
    expect(component.find(Pagination).length).toBe(1);
    expect(component.find(Pagination).prop('initialState')).not.toBeDefined();
    expect(component.find(Pagination).prop('extraProp')).toEqual('extra');
  });
});
