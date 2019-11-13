// @flow
import * as React from 'react';
import {withStyle} from 'baseui';
import {Select, StyledDropdownListItem} from 'baseui/select';
import {StyledList, StyledEmptyState} from 'baseui/menu';
import type {OptionListPropsT} from 'baseui/menu';

import {FixedSizeList} from 'react-window';

const LIST_ITEM_HEIGHT = 36;
const EMPTY_LIST_HEIGHT = 72;
const MAX_LIST_HEIGHT = 500;

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const FixedSizeListItem = ({
  data,
  index,
  style,
}: {
  data: {props: OptionListPropsT}[],
  index: number,
  style: {},
}) => {
  const {item, overrides, ...restChildProps} = data[index].props;
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

const VirtualDropdown = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);

  if (!children[0] || !children[0].props.item) {
    return (
      <StyledList
        $style={{height: EMPTY_LIST_HEIGHT + 'px'}}
        ref={ref}
      >
        <StyledEmptyState {...children[0].props} />
      </StyledList>
    );
  }

  const height = Math.min(
    MAX_LIST_HEIGHT,
    children.length * LIST_ITEM_HEIGHT,
  );

  return (
    <StyledList $style={{height: height + 'px'}} ref={ref}>
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

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <Select
      options={options}
      labelKey="id"
      valueKey="label"
      overrides={{Dropdown: VirtualDropdown}}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
