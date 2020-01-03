/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulList} from '../index.js';

describe('StatefulList', () => {
  test('basic render', () => {
    function CustomRoot() {
      return <span />;
    }
    const props = {
      overrides: {
        Root: CustomRoot,
      },
      initialState: {
        items: ['Item 1', 'Item 2'],
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
    };
    const component = shallow(<StatefulList {...props} />);
    expect(component.props()).toMatchObject(props);
  });
});
