/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import SingleSelect from '../single-select.js';
import SingleValue from '../value.js';
import SelectComponent from '../select-component.js';

describe('SingleSelect component', function() {
  let wrapper;
  afterEach(function() {
    wrapper && wrapper.unmount();
  });
  test('passes multi value set to false to Select', function() {
    const options = [
      {id: 'id1', label: 'label1'},
      {id: 'id2', label: 'label2'},
      {id: 'id3', label: 'bel3'},
    ];
    const props = {
      options: options,
      onChange: jest.fn(),
    };
    wrapper = mount(<SingleSelect {...props} />);
    const select = wrapper.find(SelectComponent).first();
    expect(select.props().multi).toEqual(false);
    expect(select.props().valueComponent).toEqual(SingleValue);
    expect(select.props().options).toEqual(props.options);
    expect(select.props().onChange).toEqual(props.onChange);
  });
});
