// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from './index';

describe('StatefulPopover', () => {
  test('basic render', () => {
    const props = {
      components: {
        Body: () => <span />,
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
