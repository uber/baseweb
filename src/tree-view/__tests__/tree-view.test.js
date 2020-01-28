/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {StyledTreeItem, StyledItemContent} from '../styled-components.js';
import TreeView from '../tree-view.js';

const mockData = [
  {
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            label: 'Grandchild 1',
          },
        ],
      },
    ],
  },
  {
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            label: 'Grandchild 2',
          },
        ],
      },
    ],
  },
];

function getSharedProps() {
  return {
    data: mockData,
  };
}

describe('TreeView Component', () => {
  test('basic renders', () => {
    const component = mount(<TreeView {...getSharedProps()} />);
    expect(component.find(StyledTreeItem)).toExist();
  });

  test('onToggle invoked', () => {
    const props = {
      ...getSharedProps(),
      onToggle: jest.fn(),
    };
    const component = mount(<TreeView {...props} />);
    component
      .find(StyledItemContent)
      .first()
      .simulate('click');
    expect(props.onToggle).toHaveBeenCalled();
  });
});
