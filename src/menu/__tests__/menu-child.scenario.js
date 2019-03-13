/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulMenu, NestedMenus} from '../index.js';

export const name = 'menu-child';

const OPEN_RECENT = 'Open Recent ->';
const NEW_BREAKPOINT = 'New Breakpoint ->';
const FILE = [
  {label: 'New File'},
  {label: 'New Window'},
  {label: 'Open...'},
  {label: 'Open Workspace...'},
  {label: OPEN_RECENT},
  {label: 'Add Folder to Workspace...'},
  {label: 'Save'},
  {label: 'Save As...'},
  {label: 'Toggle Breakpoint'},
  {label: NEW_BREAKPOINT},
  {label: 'Close Folder'},
  {label: 'Close Window'},
];

const RECENT_FILES = [
  {label: 'Reopen Closed Editor'},
  {label: '~/workspace/baseui'},
  {label: '~/workspace/styletron'},
  {label: '~/workspace/my-project'},
  {label: 'More...'},
  {label: 'Clear Recently Opened'},
];

const BREAKPOINTS = [
  {label: 'Conditional Breakpoint...'},
  {label: 'Inline Breakpoint'},
  {label: 'Function Breakpoint...'},
  {label: 'Logpoint...'},
];

export const component = () => (
  <NestedMenus>
    <StatefulMenu
      items={FILE}
      overrides={{
        List: {style: {width: '350px', overflow: 'auto'}},
        Option: {
          props: {
            size: 'compact',
            getChildMenu: item => {
              if (item.label === OPEN_RECENT) {
                return (
                  <StatefulMenu
                    items={RECENT_FILES}
                    overrides={{
                      List: {style: {width: '200px'}},
                      Option: {props: {size: 'compact'}},
                    }}
                  />
                );
              }

              if (item.label === NEW_BREAKPOINT) {
                return (
                  <StatefulMenu
                    items={BREAKPOINTS}
                    overrides={{
                      List: {style: {width: '200px'}},
                      Option: {props: {size: 'compact'}},
                    }}
                  />
                );
              }
            },
          },
        },
      }}
    />
  </NestedMenus>
);
