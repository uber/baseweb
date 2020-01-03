/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer as StatefulPopoverContainer} from '../../popover/index.js';
import {Tooltip, StatefulTooltip, PLACEMENT, TRIGGER_TYPE} from '../index.js';
import baseDefaultProps from '../default-props.js';

function withoutChildren(props: any) {
  const shallowCopy = {...props};
  delete shallowCopy.children;
  return shallowCopy;
}

describe('StatefulTooltip', () => {
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
      popperOptions: {},
      showArrow: true,
      stateReducer: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };

    const component = shallow(
      <StatefulTooltip {...props}>
        <span>Hover me</span>
      </StatefulTooltip>,
    );

    // Should first render a stateful tooltip container
    expect(component).toMatchSnapshot('renders <StatefulContainer/>');

    // Should delegate to stateful popover container
    let dive = component.dive();
    expect(dive.type()).toEqual(StatefulPopoverContainer);
    expect(withoutChildren(dive.props())).toEqual({
      ...baseDefaultProps,
      ...props,
      dismissOnClickOutside: true,
      dismissOnEsc: true,
      ignoreBoundary: false,
    });

    // But ultimately render a tooltip
    dive = dive.dive();
    expect(dive.type()).toEqual(Tooltip);
    expect(dive).toMatchSnapshot('renders <Tooltip/>');
  });
});
