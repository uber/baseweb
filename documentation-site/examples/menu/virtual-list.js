// @flow
import React from 'react';
import {withStyle} from 'styletron-react';
import {StatefulMenu, OptionList, StyledList} from 'baseui/menu';
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const ITEMS = Array.from({length: 1500}, (_, index) => ({
  label: `item number: ${index + 1}`,
}));

const Container = withStyle(StyledList, {height: '500px'});

const VirtualList = React.forwardRef((props, ref) => {
  const children = React.Children.toArray(props.children);
  return (
    <Container {...props} ref={ref}>
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
                {...children[index].props}
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
});

export default function Example() {
  return (
    <StatefulMenu
      items={ITEMS}
      overrides={{List: {component: VirtualList}}}
    />
  );
}
