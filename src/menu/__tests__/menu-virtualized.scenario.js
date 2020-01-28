/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// this vrt was created to ensure that changes to the menu component do not cause the
// virualized example to regress. while this is not an explicit part of baseui's api,
// pushing a change that would break applications using this example would be quite painful
import React from 'react';
import {withStyle} from 'styletron-react';
import {StatefulMenu, OptionList, StyledList} from '../index.js';
// eslint-disable-next-line import/extensions
import List from 'react-virtualized/dist/commonjs/List';
// eslint-disable-next-line import/extensions
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

const ITEMS = [...new Array(1500)].map((_, index) => ({
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

export const name = 'menu-virtualized';
export const component = () => (
  <StatefulMenu items={ITEMS} overrides={{List: {component: VirtualList}}} />
);
