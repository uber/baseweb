/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {
  StartEnhancer,
  EndEnhancer,
  LoadingSpinner,
} from '../styled-components.js';
import Button from '../button.js';

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

  test('onClick called with event', () => {
    const onClick = jest.fn();
    const component = mount(<Button onClick={onClick} />);
    component.simulate('click', {
      target: 'foo',
    });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toMatchObject({
      target: 'foo',
    });
  });

  test('internalOnClick prevents external onClick while loading', () => {
    const props = {
      onClick: jest.fn(),
      isLoading: true,
    };
    const component = mount(<Button {...props} />);
    const button = component.find('button');

    button.simulate('click');
    expect(props.onClick.mock.calls.length).toBe(0);

    component.setProps({isLoading: false});
    button.simulate('click');
    expect(props.onClick.mock.calls.length).toBe(1);
  });
});
