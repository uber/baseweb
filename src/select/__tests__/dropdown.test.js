/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import SelectDropdown from '../dropdown.js';
import {SIZE, TYPE} from '../constants.js';
import {StatefulMenu} from '../../menu/index.js';

jest.mock('../../menu');

describe('SelectDropdown', function() {
  let wrapper;
  let props = {};
  const options = [{id: '1', label: 'label1'}, {id: '2', label: 'label2'}];
  const value = [{id: '1', label: 'label1'}];
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

  test('renders StatefulMenu', function() {
    // $FlowFixMe
    const menuProps = StatefulMenu.mock.calls[0][0];
    expect(StatefulMenu).toHaveBeenCalled();
    expect(menuProps).toMatchObject({
      onItemSelect: props.onItemSelect,
      items: props.options,
      size: props.size,
    });
    expect(menuProps.overrides).toMatchSnapshot(
      'Passes correct overrides to the StatefulMenu',
    );
  });

  test('getItemLabel is passed to a menu Option', function() {
    // $FlowFixMe
    const menuProps = StatefulMenu.mock.calls[1][0];
    expect(menuProps.overrides.Option.props.getItemLabel).toEqual(
      wrapper.instance().getItemLabel,
    );
  });

  test('passes correct props to OptionContent', function() {
    const renderedOption = wrapper.instance().getItemLabel(options[1]);
    expect(renderedOption.props.$selected).toEqual(false);
    expect(renderedOption.props).toMatchSnapshot(
      'OptionContent gets correct props when an option is not selected',
    );
  });

  test('passes correct props to OptionContent for a selected item', function() {
    const renderedOption = wrapper.instance().getItemLabel(options[0]);
    expect(renderedOption.props.$selected).toEqual(true);
    expect(renderedOption.props).toMatchSnapshot(
      'OptionContent gets correct props when an option is selected',
    );
  });
});
