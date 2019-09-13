// @flow
import React from 'react';
import {withStyle} from 'baseui';
import {Select, StyledDropdownListItem} from 'baseui/select';
import {StyledList, StyledEmptyState} from 'baseui/menu';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const Container = withStyle(StyledList, ({$height}) => ({
  height: $height,
}));

const VirtualList = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);

  if (!children[0] || !children[0].props.item) {
    return (
      <Container $height="72px" ref={ref}>
        <StyledEmptyState {...children[0].props} />
      </Container>
    );
  }

  return (
    <Container $height="500px" ref={ref}>
      <AutoSizer>
        {({width}) => (
          <List
            role={props.role}
            height={500}
            width={width}
            rowCount={children.length}
            rowHeight={36}
            rowRenderer={({index, key, style}) => {
              return (
                <ListItem
                  key={key}
                  style={style}
                  {...children[index].props}
                >
                  {children[index].props.item.id}
                </ListItem>
              );
            }}
          />
        )}
      </AutoSizer>
    </Container>
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
      overrides={{Dropdown: VirtualList}}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
