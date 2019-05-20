import * as React from 'react';
import {styled} from 'baseui';
import {StatefulMenu, OptionList, StyledList} from 'baseui/menu';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const ITEMS = [...new Array(1500)].map((_, index) => ({
  label: `item number: ${index + 1}`,
}));

const Container = styled(StyledList, {height: '500px'});

const VirtualList = props => (
  <Container {...props} $ref={props.$ref}>
    <AutoSizer>
      {({width}) => (
        <List
          role={props.role}
          height={500}
          rowCount={props.children.length}
          rowHeight={36}
          rowRenderer={({index, key, style}) => (
            <OptionList
              key={key}
              style={style}
              {...props.children[index].props}
              overrides={{
                ListItem: {
                  style: {
                    paddingTop: 0,
                    paddingBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                  },
                },
              }}
            />
          )}
          width={width}
        />
      )}
    </AutoSizer>
  </Container>
);

export default () => (
  <StatefulMenu items={ITEMS} overrides={{List: {component: VirtualList}}} />
);
