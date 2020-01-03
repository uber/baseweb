/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from '../index.js';

describe('StatefulPopover', () => {
  test('basic render', () => {
    function CustomBody() {
      return <span />;
    }

    const props = {
      overrides: {
        Body: CustomBody,
      },
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      placement: PLACEMENT.topLeft,
      showArrow: true,
      stateReducer: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };

    const component = shallow(
      <StatefulPopover {...props}>
        <span>Hover me</span>
      </StatefulPopover>,
    );

    expect(component).toMatchSnapshot('renders <StatefulContainer/>');

    expect(component.dive()).toMatchSnapshot(
      'renders <Popover/> as child to container',
    );
  });
});
