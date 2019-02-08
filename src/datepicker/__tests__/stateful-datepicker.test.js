/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {
  Unstable_Datepicker as Datepicker,
  Unstable_StatefulDatepicker,
} from '../index.js';

describe('StatefulDatepicker', () => {
  test('basic render', () => {
    const props = {
      initialState: {
        value: new Date(),
      },
      onChange: jest.fn(),
    };

    const component = mount(<Unstable_StatefulDatepicker {...props} />);
    const renderedDatepicker = component.find(Datepicker);
    expect(renderedDatepicker).toExist();
  });
});
