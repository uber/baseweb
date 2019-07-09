/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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

// this is the only place needed to be updated if a new
// major is cut
const MAJOR_VERSIONS = [
  {label: 'v8'},
  {label: 'v7'},
  {label: 'v6'},
  {label: 'v5'},
  {label: 'v4'},
  {label: 'v3'},
  {label: 'v2'},
  {label: 'v1'},
].map(version => {
  const {label} = version;

  return {
    label: semver.satisfies(semver.coerce(label), '>=8.0.0')
      ? `${label} →`
      : label,
  };
});

const VersionSelector = () => {
  const versionsToShow = versions
    .filter(releaseVersion => {
      // we have "now" deployments since v8.1.0
      return semver.satisfies(releaseVersion.name, '>=8.1.0');
    })
    .map(item => {
      return {
        label: item.name,
        commit: item.target_commitish,
      };
    });

  return (
    <StatefulPopover
      placement={PopoverPlacement.bottomLeft}
      dismissOnClickOutside={false}
      content={({close}) => (
        <NestedMenus>
          <StatefulMenu
            items={MAJOR_VERSIONS}
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
                          items={versionsToShow}
                          onItemSelect={({item}) => {
                            window.open(
                              `https://${item.commit}-baseweb.now.sh`,
                            );
                            close();
                          }}
                          overrides={{
                            List: {style: {width: '100px'}},
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
