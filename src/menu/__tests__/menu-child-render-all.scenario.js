/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulMenu, NestedMenus} from '../index.js';

const SSR = 'Rendered ->';
const FILE = [{label: 'Server'}, {label: 'Side'}, {label: SSR}];

const SSR_SUB_MENU = [
  {label: 'Rendered'},
  {label: 'SSR'},
  {label: '(check source!)'},
  {label: 'And'},
  {label: 'When'},
  {label: 'Closed'},
];

const childMenu = items => (
  <StatefulMenu
    renderAll
    items={items}
    overrides={{
      List: {
        style: {width: '300px'},
        props: {'data-e2e': 'child-menu'},
      },

      Option: {
        props: {
          size: 'compact',
        },
      },
    }}
  />
);

export function Scenario() {
  return (
    <NestedMenus>
      <StatefulMenu
        renderAll
        items={FILE}
        overrides={{
          List: {
            style: {width: '300px', overflow: 'auto'},
            props: {'data-e2e': 'parent-menu'},
          },

          Option: {
            props: {
              size: 'compact',
              getChildMenu: item => {
                if (item.label === SSR) {
                  return childMenu(SSR_SUB_MENU);
                }
              },
            },
          },
        }}
      />
    </NestedMenus>
  );
}
