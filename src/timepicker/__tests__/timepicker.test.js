/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import {TimePicker} from '../index.js';
import {secondsToHourMinute} from '../timepicker.js';

describe('Timepicker', () => {
  test('onChange handler from props is called when value prop is set to null', () => {
    const onChange = jest.fn();
    const option = {id: 555};
    const onChangeParams = {
      value: [option],
      option: null,
      type: 'select',
    };
    const wrapper = shallow(
      <TimePicker
        onChange={onChange}
        value={null}
        nullable={true}
        format="12"
        step={900}
      />,
    );
    wrapper.instance().onChange(onChangeParams);
    expect(wrapper).toHaveState('value', option);
    const date = new Date();
    const [hours, minutes] = secondsToHourMinute(option.id);
    date.setHours(hours, minutes, 0);
    expect(onChange).toHaveBeenCalled();
    // $FlowFixMe
    expect(onChange.mock.calls[0][0].getMinutes()).toEqual(date.getMinutes());
    // $FlowFixMe
    expect(onChange.mock.calls[0][0].getHours()).toEqual(date.getHours());
  });
});
