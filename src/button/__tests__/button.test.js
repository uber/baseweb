/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {StartEnhancer, EndEnhancer, LoadingSpinner} from '../styled-components';
import Button from '../button';

describe('Button Component', () => {
  test('basic render', () => {
    const component = mount(<Button />);

    expect(component.find(StartEnhancer)).not.toExist();
    expect(component.find(EndEnhancer)).not.toExist();

    component.setProps({
      startEnhancer: 'start',
      endEnhancer: 'end',
    });

    expect(component.find(StartEnhancer)).toExist();
    expect(component.find(EndEnhancer)).toExist();
  });

  test('onClick gets called with {event}', () => {
    const onClick = jest.fn();
    const component = mount(<Button onClick={onClick} />);

    component.simulate('click');
    expect(onClick.mock.calls[0][0]).toHaveProperty('event');
  });

  test('renders with components overrides', () => {
    const NewStartEnhancer = () => <div />;

    const props = {
      startEnhancer: () => null,
      overrides: {
        StartEnhancer: NewStartEnhancer,
      },
    };

    const component = mount(<Button {...props} />);

    expect(component.find(StartEnhancer)).not.toExist();
    expect(component.find(NewStartEnhancer)).toExist();
  });

  test('renders with loading spinner', () => {
    const component = mount(<Button />);

    expect(component.find(LoadingSpinner)).not.toExist();
    component.setProps({isLoading: true});
    expect(component.find(LoadingSpinner)).toExist();
  });

  test('internalOnClick prevents external onClick while loading', () => {
    const props = {
      onClick: jest.fn(),
      isLoading: true,
    };
    const component = mount(<Button {...props} />);

    component.instance().internalOnClick();
    expect(props.onClick.mock.calls.length).toBe(0);

    component.setProps({isLoading: false});
    component.instance().internalOnClick();
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
