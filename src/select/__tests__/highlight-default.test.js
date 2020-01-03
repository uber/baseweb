/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import SelectDropdown from '../dropdown.js';
import {SIZE, TYPE} from '../constants.js';
import {StatefulMenu} from '../../menu/index.js';

jest.mock('../../menu');

describe('SelectDropdown', function() {
  let wrapper;
  let props = {};
  const options = [
    {id: '1', label: 'label1'},
    {id: '2', label: 'label2'},
    {id: '3', label: 'label3'},
  ];
  const value = [];
  const ref = React.createRef();

  beforeEach(function() {
    props = {
      value,
      valueKey: 'id',
      labelKey: 'label',
      size: SIZE.default,
      options,
      onItemSelect: jest.fn(),
      getOptionLabel: jest.fn(({option}) => <span>option.label</span>),
      maxDropdownHeight: '1000px',
      overrides: {},
      error: false,
      isLoading: false,
      multi: false,
      required: false,
      searchable: true,
      type: TYPE.select,
      width: 100,
    };
    wrapper = mount(<SelectDropdown innerRef={ref} {...props} />);
  });

  afterEach(function() {
    wrapper && wrapper.unmount();
  });

  afterAll(function() {
    jest.restoreAllMocks();
  });

  test('renders StatefulMenu with default highlighted index', function() {
    // $FlowFixMe
    const menuProps = StatefulMenu.mock.calls[0][0];
    expect(StatefulMenu).toHaveBeenCalled();
    expect(menuProps.initialState).toMatchObject({
      isFocused: true,
      highlightedIndex: 0,
    });
  });
});
