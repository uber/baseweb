/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {Popover} from '../../popover';
import {
  Tooltip,
  StyledArrow,
  StyledInner,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from '../index';
import baseDefaultProps from '../default-props';

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
      children: button,
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
