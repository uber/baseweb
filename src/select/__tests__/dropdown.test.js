/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledDropDown} from '../index';

describe('Stateless Select Dropdown', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    mockFn;
  let options = [
      {
        id: '1',
        label: 'label for 1',
      },
      {
        id: '2',
        label: 'label for 2',
      },
      {
        id: '3',
        label: 'label for 3',
      },
      {
        id: '4',
        label: 'label for 4',
      },
    ],
    getOptionLabel = jest.fn(() => <div>test label</div>),
    isDropDownOpen = true,
    selectedOptions,
    onChange,
    type,
    rows;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onChange: mockFn,
    };
    allProps = {
      ...events,
      options,
      getOptionLabel,
      isDropDownOpen,
      selectedOptions,
      onChange,
      type,
      rows,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([[options, true], [[], true], [options, false]])(
    'should render component with options %s and drondown open is %s',
    (options, isDropDownOpen) => {
      allProps = Object.assign({}, allProps, {options, isDropDownOpen});
      wrapper = shallow(<StyledDropDown {...allProps} />);
      expect(wrapper).toMatchSnapshot(
        'Component has correct render with options length ' +
          options.length +
          ' and dropdown open is %s ' +
          isDropDownOpen,
      );
    },
  );
});
