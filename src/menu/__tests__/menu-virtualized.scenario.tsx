/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// this vrt was created to ensure that changes to the menu component do not cause the
// virtualized example to regress. while this is not an explicit part of baseui's api,
// pushing a change that would break applications using this example would be quite painful
import React from 'react';
import { withStyle } from 'styletron-react';
import { StatefulMenu, OptionList, StyledList } from '..';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

const ITEMS = [...new Array(1500)].map((_, index) => ({
  label: `item number: ${index + 1}`,
}));

const Container = withStyle(StyledList, { height: '500px' });

// eslint-disable-next-line react/display-name,@typescript-eslint/no-explicit-any
const VirtualList = React.forwardRef<HTMLUListElement, any>((props, ref) => {
  const children = React.Children.toArray(props.children);
  return (
    <Container {...props} ref={ref}>
      <AutoSizer>
        {({ width }) => (
          <List
            role={props.role}
            height={500}
            width={width}
            itemCount={props.children.length}
            itemSize={36}
          >
            {({ index, style }) => (
              <OptionList
                key={index}
                style={style}
                // @ts-expect-error todo(flow->ts) type error in react 17
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
          </List>
        )}
      </AutoSizer>
    </Container>
  );
});

export function Scenario() {
  return <StatefulMenu items={ITEMS} overrides={{ List: { component: VirtualList } }} />;
}
