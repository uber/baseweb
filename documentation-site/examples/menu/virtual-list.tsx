import React from 'react';
import {withStyle} from 'baseui';
import {StatefulMenu, OptionList, StyledList} from 'baseui/menu';
import {List, AutoSizer} from 'react-virtualized';
import {GridCoreProps} from 'react-virtualized/dist/es/Grid';

const ITEMS = Array.from({length: 1500}, (_, index) => ({
  label: `item number: ${index + 1}`,
}));

const Container = withStyle(StyledList, {height: '500px'});

type Children =
  | React.ReactElement
  | Exclude<React.ReactFragment, {}>;

interface VirtualListProps extends GridCoreProps {
  children: Children;
}

const VirtualList = React.forwardRef(
  (props: VirtualListProps, ref) => {
    const children = React.Children.toArray(
      props.children,
    ) as Children[];

    return (
      <Container {...props} ref={ref}>
        <AutoSizer>
          {({width}) => (
            <List
              role={props.role}
              height={500}
              rowCount={children.length}
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
  },
);

export default function Example() {
  return (
    <StatefulMenu
      items={ITEMS}
      overrides={{List: {component: VirtualList}}}
    />
  );
}
