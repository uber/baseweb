/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import Select from '../select.js';
import SelectComponent from '../select-component.js';
import {STATE_CHANGE_TYPE, TYPE} from '../constants.js';

describe('Select component', function() {
  let wrapper;
  let props: any = {};
  const item = {id: 'id1', label: 'label1'};
  const options = [
    item,
    {id: 'id2', label: 'label2'},
    {id: 'id3', label: 'bel3'},
  ];

  beforeEach(function() {
    props = {
      options: options,
      onChange: jest.fn(),
      onInputChange: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
    };
  });

  afterEach(function() {
    wrapper && wrapper.unmount();
  });

  test.each([
    [TYPE.select, false],
    [TYPE.select, true],
    [TYPE.search, false],
    [TYPE.search, true],
  ])(
    'renders component in %s mode and %s for multiple choice',
    (type, multiple) => {
      props.type = type;
      props.multiple = multiple;
      wrapper = mount(<Select {...props} />);
      expect(wrapper).toMatchSnapshot(
        'Component has correct render in ' +
          type +
          ' mode and multiple choice equals ' +
          multiple,
      );
    },
  );
  test('calls onInputChange when input value changes', function() {
    wrapper = mount(<Select {...props} />);
    const select = wrapper.find(SelectComponent).first();
    const e = {target: {value: 'test'}};
    // $FlowFixMe
    select.instance().handleInputChange(e);
    expect(props.onInputChange).toHaveBeenCalledWith(e);
  });

  test('removes selected tag on clear', function() {
    wrapper = mount(<Select {...props} value={[item]} />);
    const select = wrapper.find(SelectComponent).first();
    const e = {type: 'click', button: 0, preventDefault: jest.fn()};
    // $FlowFixMe
    select.instance().clearValue(e);
    expect(props.onChange).toHaveBeenCalled();
    expect(props.onChange.mock.calls[0][0]).toEqual({
      type: STATE_CHANGE_TYPE.clear,
      option: null,
      value: [],
    });
  });
  test('select flow allows custom keys in options objects', function() {
    wrapper = mount(
      <Select
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
        ]}
        closeOnSelect={false}
        onChange={({option}) => {
          /* eslint-disable no-console */
          // $FlowFixMe
          console.info(option.color);
          if (option !== null && option !== undefined && option.color) {
            console.info(option.color);
          }
          /* eslint-enable no-console */
        }}
        labelKey="id"
        multi
        valueKey="color"
      />,
    );
  });
});
