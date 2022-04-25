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

const currentMajor = parseInt(version.split('.')[0], 10);
const majors = [...Array(8).keys()].map((i) => i + currentMajor - 8);
const majorVersions = majors.reverse().map((version) => ({
  label: `v${version}`,
}));

const majorVersionsToDisplay = majorVersions.map((version) => {
  const { label } = version;

  return {
    label,
    originalVersionNumber: label,
  };
});
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
            items={majorVersionsToDisplay}
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
      <Button size="compact" kind={KIND.tertiary} endEnhancer={() => <ChevronDown size={20} />}>
        v{version}
      </Button>
    </StatefulPopover>
  );
};

export default VersionSelector;
