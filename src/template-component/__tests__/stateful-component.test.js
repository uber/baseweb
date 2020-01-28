/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulComponent} from '../index.js';

describe('StatefulComponent', () => {
  test('basic render', () => {
    function CustomRoot() {
      return <span />;
    }

    const props = {
      overrides: {
        Root: CustomRoot,
      },
      initialState: {
        prop: false,
      },
      onClick: jest.fn(),
      stateReducer: jest.fn(),
    };

    const component = shallow(<StatefulComponent {...props} />);

    expect(component.props()).toMatchObject(props);
  });
});
