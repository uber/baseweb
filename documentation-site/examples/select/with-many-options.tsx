import React from 'react';
import {withStyle} from 'baseui';
import {Select, StyledDropdownListItem, Value} from 'baseui/select';
import {StyledList} from 'baseui/menu';

import {List, AutoSizer} from 'react-virtualized';

const ListItem = withStyle(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const Container = withStyle(StyledList, {height: '500px'});

const VirtualList = React.forwardRef((props: any, ref) => {
  const children = React.Children.toArray(props.children);
  return (
    <Container ref={ref}>
      <AutoSizer>
        {({width}) => (
          <List
            role={props.role}
            height={500}
            width={width}
            rowCount={props.children.length}
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

const options: {id: number; label: number}[] = [];

for (let i = 0; i < 10000; i += 1) {
  options.push({
    id: i,
    label: i,
  });
}

export default () => {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={options}
      labelKey="id"
      valueKey="label"
      overrides={{Dropdown: {component: VirtualList}}}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
