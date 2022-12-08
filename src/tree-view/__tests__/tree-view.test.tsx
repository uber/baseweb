/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  render,
  fireEvent,
  getAllByTestId,
  getByText,
  queryByTestId,
} from '@testing-library/react';

import TreeView from '../tree-view';

const mockData = [
  {
    id: 1,
    label: 'Node 1',
    isExpanded: true,
    children: [
      {
        id: 2,
        label: 'Child 1',
        isExpanded: true,
        children: [
          {
            id: 3,
            label: 'Grandchild 1',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Node 2',
    isExpanded: true,
    children: [
      {
        id: 5,
        label: 'Child 2',
        isExpanded: true,
        children: [
          {
            id: 6,
            label: 'Grandchild 2',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    label: 'Node 3',
    children: [
      {
        id: 8,
        label: 'Child 3',
        children: [
          {
            id: 9,
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
  it('basic renders', () => {
    const { container } = render(<TreeView {...getSharedProps()} />);
    getByText(container, 'Node 1');
  });

  it('onToggle invoked', () => {
    const props = {
      ...getSharedProps(),
      onToggle: jest.fn(),
    };
    const { container } = render(<TreeView {...props} />);
    fireEvent.click(getByText(container, 'Node 1'));
    expect(props.onToggle).toHaveBeenCalled();
  });

  it('keyboard copy keys still bubble', () => {
    const { getByText } = render(<TreeView {...getSharedProps()} />);
    const node = getByText('Node 1').parentElement;
    const preventDefault = jest.fn();
    // @ts-ignore
    fireEvent.keyDown(node, {
      key: 'C',
      ctrlKey: true,
      bubbles: true,
      preventDefault,
    });
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it('TreeLabel override should override default icons as well', () => {
    const CustomTreeLabel = ({
      // @ts-ignore
      hasChildren,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      isSelected,
      // @ts-ignore
      isExpanded,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      isFocusVisible,
      // @ts-ignore
      label,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // @ts-ignore
      overrides,
      // @ts-ignore
      node,
      ...props
    }) => {
      return (
        <div {...props} data-testid="label">
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
        ExpandIcon: { props: { 'data-testid': 'expand-icon' } },
      },
    };
    const { container } = render(<TreeView {...props} />);
    getAllByTestId(container, 'label');
    expect(queryByTestId(container, 'expand-icon')).toBeNull();
  });
});
