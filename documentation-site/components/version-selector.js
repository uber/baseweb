/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import * as React from 'react';
import semver from 'semver';

import ChevronDown from 'baseui/icon/chevron-down';
import {StatefulPopover, PLACEMENT as PopoverPlacement} from 'baseui/popover';
import {StatefulMenu, NestedMenus} from 'baseui/menu';
import {Button, KIND} from 'baseui/button';

import {version} from '../../package.json';
import versions from '../../versions.json';

// list of version for which we don't have a deployed documentation site
// for some reason
const disabledVersions = [
  'v9.29.0',
  'v9.28.1',
  'v9.28.0',
  'v9.27.0',
  'v9.26.0',
  'v9.25.0',
  'v9.24.0',
  'v9.23.1',
  'v9.23.0',
];

const majorVersions = Array.from(
  versions.reduce((set, version) => {
    if (!version || !version.tag_name) {
      return set;
    }
    return set.add(semver.major(semver.coerce(version.tag_name)));
  }, new Set()),
).map(version => ({
  label: `v${version}`,
}));

const majorVersionsToDisplay = majorVersions.map(version => {
  const {label} = version;

  return {
    label: semver.satisfies(semver.coerce(label), '>=8.0.0')
      ? `${label} →`
      : label,
    originalVersionNumber: label,
  };
});

const versionsToShowPerMajor = versions
  .filter(releaseVersion => {
    // we have "now" deployments since v8.1.0
    return semver.satisfies(releaseVersion.name, '>=8.1.0');
  })
  .reduce((acc, version) => {
    const key = `v${semver.major(version.tag_name)}`;
    acc[key] = acc[key] || [];

    acc[key].push({
      label: version.tag_name,
      disabled: disabledVersions.includes(version.tag_name),
    });

    return acc;
  }, {});

const VersionSelector = () => {
  return (
    <StatefulPopover
      placement={PopoverPlacement.bottomLeft}
      dismissOnClickOutside={false}
      content={({close}) => (
        <NestedMenus>
          <StatefulMenu
            items={majorVersionsToDisplay}
            onItemSelect={({item}) => {
              window.open(`https://${item.label}.baseweb.design`);
              close();
            }}
            overrides={{
              List: {
                style: {
                  width: '100px',
                },
              },
              Option: {
                props: {
                  size: 'compact',
                  getChildMenu: item => {
                    if (
                      semver.satisfies(semver.coerce(item.label), '>=8.0.0')
                    ) {
                      return (
                        <StatefulMenu
                          size="compact"
                          items={
                            versionsToShowPerMajor[item.originalVersionNumber]
                          }
                          onItemSelect={({item}) => {
                            window.open(
                              `https://${item.label.replace(
                                /\./gi,
                                '-',
                              )}.baseweb.design`,
                            );
                            close();
                          }}
                          overrides={{
                            // using 315px to make sure an option is cut in half
                            // so the user has a clue that it's scrollable
                            List: {style: {width: '100px', maxHeight: '315px'}},
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
      )}
    >
      <Button
        size="compact"
        kind={KIND.minimal}
        endEnhancer={() => <ChevronDown size={20} />}
      >
        v{version}
      </Button>
    </StatefulPopover>
  );
};

export default VersionSelector;
