/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Select, StyledDropdownListItem } from '../index';
import { withStyle } from '../../index';
import { StyledList, StyledEmptyState } from '../../menu/index';
import { FixedSizeList } from 'react-window';

const LIST_ITEM_HEIGHT = 36;
const EMPTY_LIST_HEIGHT = 72;
const MAX_LIST_HEIGHT = 500;
const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const FixedSizeListItem = ({ data, index, style }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { item, overrides, ...restChildProps } = data[index].props;
  return (
    <ListItem
      key={item.id}
      style={{
        boxSizing: 'border-box',
        ...style,
      }}
      {...restChildProps}
    >
      {item.id}
    </ListItem>
  );
};
// eslint-disable-next-line react/display-name,@typescript-eslint/no-explicit-any
const VirtualDropdown = React.forwardRef<HTMLUListElement, any>((props, ref) => {
  const children = React.Children.toArray(props.children);
  // @ts-expect-error todo(flow->ts) type error in react 17
  if (!children[0] || !children[0].props.item) {
    return (
      <StyledList $style={{ height: EMPTY_LIST_HEIGHT + 'px' }} ref={ref}>
        <StyledEmptyState
          {
            // @ts-expect-error todo(flow->ts) type error in react 17
            ...children[0].props
          }
        />
      </StyledList>
    );
  }
  const height = Math.min(MAX_LIST_HEIGHT, children.length * LIST_ITEM_HEIGHT);
  return (
    <StyledList ref={ref}>
      <FixedSizeList
        width="100%"
        height={height}
        itemCount={children.length}
        itemData={children}
        itemKey={(index, data) => data[index].props.item.id}
        itemSize={LIST_ITEM_HEIGHT}
      >
        {FixedSizeListItem}
      </FixedSizeList>
    </StyledList>
  );
});
const options = [];
for (let i = 0; i < 10000; i += 1) {
  options.push({
    id: i,
    label: i,
  });
}

export function Scenario() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = React.useState<any>([]);
  return (
    <Select
      options={options}
      labelKey="id"
      valueKey="label"
      overrides={{ Dropdown: VirtualDropdown }}
      onChange={({ value }) => setValue(value)}
      value={value}
    />
  );
}
