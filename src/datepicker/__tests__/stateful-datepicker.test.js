/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Datepicker, StatefulDatepicker} from '../index.js';

describe('StatefulDatepicker', () => {
  test('basic render', () => {
    const props = {
      initialState: {
        value: new Date(),
      },
      onChange: jest.fn(),
    };

    const component = mount(<StatefulDatepicker {...props} />);
    const renderedDatepicker = component.find(Datepicker);
    expect(renderedDatepicker).toExist();
  });
});
