/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env browser */

import * as React from "react";

import ChevronDown from "baseui/icon/chevron-down";
import { StatefulPopover, PLACEMENT as PopoverPlacement } from "baseui/popover";
import { StatefulMenu, NestedMenus } from "baseui/menu";
import { Button, KIND } from "baseui/button";

import pkg from "../../package.json";

const { version } = pkg;

const currentMajor = parseInt(version.split(".")[0], 10);
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
  const handleVersionSelect = async (item) => {
    const versionUrl = `https://${item.label}.baseweb.design`;

    try {
      // Check if the version page exists
      const response = await fetch(versionUrl, { method: 'HEAD' });

      if (response.ok) {
        // Page exists, navigate to it
        window.location.href = versionUrl;
      } else {
        // Page doesn't exist, redirect to main site
        window.location.href = 'https://baseweb.design/';
      }
    } catch (error) {
      // In case of network error, redirect to main site
      window.location.href = 'https://baseweb.design/';
    }
  };

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
              handleVersionSelect(item);
              close();
            }}
            overrides={{
              List: {
                style: {
                  width: "100px",
                },
              },
            }}
          />
        </NestedMenus>
      )}
    >
      <Button
        size="compact"
        kind={KIND.tertiary}
        endEnhancer={() => <ChevronDown size={20} title="" />}
      >
        v{version}
      </Button>
    </StatefulPopover>
  );
};

export default VersionSelector;
