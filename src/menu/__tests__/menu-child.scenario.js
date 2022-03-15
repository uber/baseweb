/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { StatefulMenu, NestedMenus } from '../index.js';

const OPEN_RECENT = 'Open Recent ->';
const NEW_BREAKPOINT = 'New Breakpoint ->';
const SWITCH_EDITOR = 'Switch Editor ->';
const FILE = [
  { label: 'New File' },
  { label: 'New Window' },
  { label: 'Open...' },
  { label: 'Open Workspace...' },
  { label: OPEN_RECENT },
  { label: 'Add Folder to Workspace...' },
  { label: 'Save' },
  { label: 'Save As...' },
  { label: 'Toggle Breakpoint' },
  { label: NEW_BREAKPOINT },
  { label: 'Close Folder' },
  { label: 'Close Window' },
];

const RECENT_FILES = [
  { label: 'Reopen Closed Editor' },
  { label: '~/workspace/baseui' },
  { label: '~/workspace/styletron' },
  { label: '~/workspace/my-project' },
  { label: 'More...' },
  { label: 'Clear Recently Opened' },
];

const BREAKPOINTS = [
  { label: 'Conditional Breakpoint...' },
  { label: 'Inline Breakpoint' },
  { label: SWITCH_EDITOR },
  { label: 'Function Breakpoint...' },
  { label: 'Logpoint...' },
];

const SWITCH_EDITOR_OPTIONS = [
  { label: 'Next Editor' },
  { label: 'Previous Editor' },
  { label: 'Next Used Editor' },
  { label: 'Previous Used Editor' },
];

const childMenu = (items) => (
  <StatefulMenu
    items={items}
    overrides={{
      List: {
        style: { width: '300px' },
        props: { 'data-e2e': 'child-menu' },
      },

      Option: {
        props: {
          size: 'compact',
          getChildMenu: (item) => {
            if (item.label === SWITCH_EDITOR) {
              return childMenu(SWITCH_EDITOR_OPTIONS);
            }
          },
        },
      },
    }}
  />
);

export function Scenario() {
  const [clickLog, setClickLog] = React.useState([]);

  function handleClick({ item, event }) {
    setClickLog([...clickLog, item.label]);
  }

  return (
    <div style={{ margin: '20px' }}>
      <NestedMenus>
        <StatefulMenu
          items={FILE}
          onItemSelect={handleClick}
          overrides={{
            List: {
              style: { width: '300px', overflow: 'auto' },
              props: { 'data-e2e': 'parent-menu' },
            },

            Option: {
              props: {
                size: 'compact',
                getChildMenu: (item) => {
                  if (item.label === OPEN_RECENT) {
                    return childMenu(RECENT_FILES);
                  }

                  if (item.label === NEW_BREAKPOINT) {
                    return childMenu(BREAKPOINTS);
                  }
                },
              },
            },
          }}
        />
      </NestedMenus>
      <ul id="menu-child-click-log">
        {clickLog.map((entry, i) => {
          return <li key={i}>{entry}</li>;
        })}
      </ul>
    </div>
  );
}
