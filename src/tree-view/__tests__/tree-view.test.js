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
import CheckIndeterminate from '../../icon/check-indeterminate.js';

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
  {
    label: 'Node 3',
    children: [
      {
        label: 'Child 3',
        children: [
          {
            label: 'Grandchild 3',
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
    expect(component.find(CheckIndeterminate)).toExist();
  });

  test('TreeLabel override should override default icons as well', () => {
    const CustomTreeLabel = ({
      hasChildren,
      isExpanded,
      label,
      overrides,
      node,
      ...props
    }) => {
      return (
        <div {...props}>
          {hasChildren && <div>{!isExpanded ? '+' : '-'}</div>}
          {typeof label === 'function' ? label(node) : label}
        </div>
      );
    };
    const props = {
      ...getSharedProps(),
      overrides: {
        TreeLabel: {
          component: CustomTreeLabel,
        },
      },
    };
    const component = mount(<TreeView {...props} />);
    expect(component.find(CustomTreeLabel)).toExist();
    expect(component.find(CheckIndeterminate)).not.toExist();
  });
});
