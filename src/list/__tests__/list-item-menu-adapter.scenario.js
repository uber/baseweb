/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import ChevronRight from '../../icon/chevron-right.js';
import Search from '../../icon/search.js';
import {StatefulMenu} from '../../menu/index.js';
import {ListItemLabel, MenuAdapter, ARTWORK_SIZES} from '../index.js';

const ITEMS = [...new Array(10)].map(() => ({
  title: 'Jane Smith',
  subtitle: 'Senior Engineering Manager',
  icon: Search,
}));

export default function Scenario() {
  return (
    <StatefulMenu
      items={ITEMS}
      onItemSelect={() => console.log('select')}
      overrides={{
        List: {
          style: {
            height: '300px',
            width: '450px',
          },
        },
        Option: {
          props: {
            overrides: {
              ListItem: {
                component: React.forwardRef((props, ref) => (
                  <MenuAdapter
                    {...props}
                    ref={ref}
                    artwork={props.item.icon}
                    artworkSize={ARTWORK_SIZES.LARGE}
                    endEnhancer={() => <ChevronRight />}
                  >
                    <ListItemLabel description={props.item.subtitle}>
                      {props.item.title}
                    </ListItemLabel>
                  </MenuAdapter>
                )),
              },
            },
          },
        },
      }}
    />
  );
}
