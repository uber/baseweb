/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  render,
  fireEvent,
  getByText,
  queryByText,
} from '@testing-library/react';

import {StatefulTabs, Tab} from '../index.js';
import {STATE_CHANGE_TYPE} from '../constants.js';

describe('StatefulTabs', () => {
  const Component = (props) => (
    <StatefulTabs {...props}>
      <Tab title="Tab Link 1">Tab 1 content</Tab>
      <Tab title="Tab Link 2">Tab 2 content</Tab>
      <Tab title="Tab Link 3">Tab 3 content</Tab>
    </StatefulTabs>
  );

  it('basic render', () => {
    const {container} = render(<Component />);
    getByText(container, 'Tab Link 1');
    getByText(container, 'Tab Link 2');
    getByText(container, 'Tab Link 3');
    getByText(container, 'Tab 1 content');
    expect(queryByText(container, 'Tab 2 content')).toBeNull();
    expect(queryByText(container, 'Tab 3 content')).toBeNull();
  });

  it('basic render w/ SEO', () => {
    const {container} = render(<Component renderAll />);
    getByText(container, 'Tab Link 1');
    getByText(container, 'Tab Link 2');
    getByText(container, 'Tab Link 3');
    getByText(container, 'Tab 1 content');
    getByText(container, 'Tab 2 content');
    getByText(container, 'Tab 3 content');
  });

  it('basic render with initial state', () => {
    const props = {
      initialState: {activeKey: '1'},
    };
    const {container} = render(<Component {...props} />);
    expect(queryByText(container, 'Tab 1 content')).toBeNull();
    getByText(container, 'Tab 2 content');
    expect(queryByText(container, 'Tab 3 content')).toBeNull();
  });

  it('onChange functionality', () => {
    const props = {
      onChange: jest.fn(),
    };
    const {container} = render(<Component {...props} />);
    fireEvent.click(getByText(container, 'Tab Link 2'));
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith({activeKey: '1'});
  });

  it('stateReducer functionality', () => {
    const props = {
      stateReducer: jest.fn((type, newState) => newState),
    };
    const {container} = render(<Component {...props} />);
    fireEvent.click(getByText(container, 'Tab Link 2'));
    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenCalledWith(
      STATE_CHANGE_TYPE.change,
      {activeKey: '1'},
      {activeKey: '0'},
    );
  });
});
