/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {Popover} from '../../popover/index.js';
import {
  Tooltip,
  StyledArrow,
  StyledInner,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from '../index.js';
import baseDefaultProps from '../default-props.js';

describe('Tooltip', () => {
  test('basic render', () => {
    const props = {
      accessibilityType: ACCESSIBILITY_TYPE.none,
      content: jest.fn(),
      id: 'mock-id',
      isOpen: true,
      onBlur: jest.fn(),
      onClick: jest.fn(),
      onEsc: jest.fn(),
      onFocus: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseEnterDelay: 100,
      onMouseLeave: jest.fn(),
      onMouseLeaveDelay: 200,
      overrides: {
        Body: {
          component: function CustomBody(props) {
            // eslint-disable-next-line react/prop-types
            return <div>{props.children}</div>;
          },
          style: {width: '300px'},
        },
      },
      placement: PLACEMENT.topLeft,
      showArrow: true,
      triggerType: TRIGGER_TYPE.hover,
    };
    const button = <button type="button">Hover me</button>;
    const component = shallow(<Tooltip {...props}>{button}</Tooltip>);

    expect(component.type()).toBe(Popover);
    expect(component.props()).toEqual({
      ...baseDefaultProps,
      ...props,
      'data-baseweb': 'tooltip',
      children: button,
      ignoreBoundary: false,
      overrides: {
        Arrow: {
          component: StyledArrow,
        },
        Body: {
          component: props.overrides.Body.component,
          style: {
            width: '300px',
          },
        },
        Inner: {
          component: StyledInner,
        },
      },
    });
  });
});
