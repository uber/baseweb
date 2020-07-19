/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {mount} from 'enzyme';
import * as React from 'react';

import {Panel, StatefulPanel, StatefulPanelContainer} from '../index.js';

describe('StatefulPanel', () => {
  test('basic render', () => {
    function PanelContainer() {
      return <div />;
    }
    const props = {
      overrides: {
        PanelContainer,
      },
      onChange: jest.fn(),
      stateReducer: jest.fn(),
      children: 'Content',
    };
    const component = mount(<StatefulPanel {...props} />);
    const renderedPanel = component.find(Panel);
    expect(component.find(StatefulPanelContainer).length).toBe(1);
    expect(renderedPanel.length).toBe(1);
    expect(renderedPanel.first().props().overrides).toEqual(props.overrides);
    expect(renderedPanel.first().props().children).toEqual(props.children);
  });
});
