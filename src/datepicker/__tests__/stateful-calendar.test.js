/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {StatefulCalendar, Calendar} from '../index.js';

describe('StatefulCalendar', () => {
  test('basic render', () => {
    const props = {
      initialState: {
        highlightedDate: new Date(),
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };

    const component = mount(<StatefulCalendar {...props} />);
    const renderedCalendar = component.find(Calendar);
    expect(renderedCalendar).toExist();
  });
});
