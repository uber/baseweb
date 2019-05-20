/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {StatefulTabs, Tab, StyledTab, StyledTabContent} from '../index.js';
import {STATE_CHANGE_TYPE} from '../constants.js';

describe('StatefulTabs', () => {
  const Component = props => (
    <StatefulTabs {...props}>
      <Tab title="Tab Link 1">Tab 1 content</Tab>
      <Tab title="Tab Link 2">Tab 2 content</Tab>
      <Tab title="Tab Link 3">Tab 3 content</Tab>
    </StatefulTabs>
  );

  test('basic render', () => {
    const component = mount(<Component />);
    expect(component).toMatchSnapshot('Stateful tabs render correctly');
  });

  test('basic render with initial state', () => {
    const props = {
      initialState: {activeKey: '1'},
    };
    const component = mount(<Component {...props} />);
    expect(component).toMatchSnapshot(
      'Stateful tabs render correctly with initial state',
    );

    const tab = component.find(StyledTab).at(1);
    expect(tab).toHaveProp('$active', true);

    const panel = component.find(StyledTabContent).at(1);
    expect(panel).toHaveProp('$active', true);
  });

  test('onChange functionality', () => {
    const props = {
      onChange: jest.fn(),
    };
    const component = mount(<Component {...props} />);

    const tab = component.find(StyledTab).at(1);
    tab.simulate('click');
    const newState = {activeKey: '1'};
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith(newState);
  });

  test('stateReducer functionality', () => {
    const props = {
      stateReducer: jest.fn((type, newState) => newState),
    };
    const component = mount(<Component {...props} />);

    const tab = component.find(StyledTab).at(1);
    tab.simulate('click');
    const oldState = {activeKey: '0'};
    const newState = {activeKey: '1'};
    expect(props.stateReducer).toHaveBeenCalledTimes(1);
    expect(props.stateReducer).toHaveBeenCalledWith(
      STATE_CHANGE_TYPE.change,
      newState,
      oldState,
    );
  });

  test('state changes', () => {
    const component = mount(<Component />);
    expect(component.find(StyledTab).at(0)).toHaveProp('$active', true);

    component
      .find(StyledTab)
      .at(1)
      .simulate('click');
    expect(component.find(StyledTab).at(1)).toHaveProp('$active', true);

    // Click the same tab again
    component
      .find(StyledTab)
      .at(1)
      .simulate('click');
    expect(component.find(StyledTab).at(1)).toHaveProp('$active', true);

    component
      .find(StyledTab)
      .at(0)
      .simulate('click');
    expect(component.find(StyledTab).at(0)).toHaveProp('$active', true);
  });
});
