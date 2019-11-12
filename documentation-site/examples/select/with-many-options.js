// @flow
import React from 'react';
import {withStyle} from 'baseui';
import {Select, StyledDropdownListItem} from 'baseui/select';
import {StyledList, StyledEmptyState} from 'baseui/menu';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const LIST_ITEM_HEIGHT = 36;
const EMPTY_LIST_HEIGHT = 72;
const MAX_LIST_HEIGHT = 500;

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const VirtualDropdown = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);

  if (!children[0] || !children[0].props.item) {
    return (
      <StyledList $style={{height: EMPTY_LIST_HEIGHT + 'px'}} ref={ref}>
        <StyledEmptyState {...children[0].props} />
      </StyledList>
    );
  }

  const height = Math.min(MAX_LIST_HEIGHT, children.length * LIST_ITEM_HEIGHT);

  return (
    <StyledList $style={{height: height + 'px'}} ref={ref}>
      <AutoSizer>
        {({width}) => (
          <List
            role={props.role}
            height={height}
            width={width}
            rowCount={children.length}
            rowHeight={LIST_ITEM_HEIGHT}
            rowRenderer={({index, key, style}) => {
              const {item, overrides, ...restChildProps} = children[
                index
              ].props;
              return (
                <ListItem
                  key={key}
                  style={{
                    boxSizing: 'border-box',
                    ...style,
                  }}
                  {...restChildProps}
                >
                  {item.id}
                </ListItem>
              );
            }}
          />
        )}
      </AutoSizer>
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
