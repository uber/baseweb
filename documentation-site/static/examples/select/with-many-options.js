import React from 'react';
import {styled} from 'baseui';
import {StatefulSelect, StyledDropdownListItem} from 'baseui/select';
import {StyledList} from 'baseui/menu';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const ListItem = styled(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  display: 'flex',
  alignItems: 'center',
});

const Container = styled(StyledList, {height: '500px'});

function VirtualList(props) {
  return (
    <Container $ref={props.$ref}>
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
                  {...props.children[index].props}
                >
                  {props.children[index].props.item.id}
                </ListItem>
              );
            }}
          />
        )}
      </AutoSizer>
    </Container>
  );
}

const options = [];

for (let i = 0; i < 10000; i += 1) {
  options.push({
    id: i,
    label: i,
  });
}

export default () => (
  <StatefulSelect
    options={options}
    labelKey="id"
    valueKey="label"
    overrides={{Dropdown: {component: VirtualList}}}
    onChange={event => console.log(event)}
  />
);
