/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import * as React from 'react';

import ChevronDown from 'baseui/icon/chevron-down';
import { StatefulPopover, PLACEMENT as PopoverPlacement } from 'baseui/popover';
import { StatefulMenu, NestedMenus } from 'baseui/menu';
import { Button, KIND } from 'baseui/button';

import { version } from '../../package.json';

const versions = ['v10', 'v9', 'v8', 'v7', 'v6', 'v5', 'v4', 'v3'].map((v) => ({
  label: v,
  value: v,
}));

const VersionSelector = () => {
  return (
    <StatefulPopover
      placement={PopoverPlacement.bottomLeft}
      focusLock
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      content={({ close }) => (
        <NestedMenus>
          <StatefulMenu
            items={versions}
            onItemSelect={({ item }) => {
              window.open(`https://${item.label}.baseweb.design`);
              close();
            }}
            overrides={{
              List: {
                style: {
                  width: '100px',
                },
              },
            }}
          />
        </NestedMenus>
      )}
    >
      <Button size="compact" kind={KIND.minimal} endEnhancer={() => <ChevronDown size={20} />}>
        v{version}
      </Button>
    </StatefulPopover>
  );
};

export default VersionSelector;
