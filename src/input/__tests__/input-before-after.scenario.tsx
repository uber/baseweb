/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StatefulInput } from '../index';
import { Block } from '../../block/index';
import Search from '../../icon/search';

export function Scenario() {
  return (
    <React.Fragment>
      <StatefulInput
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="16px" />
            </Block>
          ),
        }}
        placeholder="Input with a Before component"
      />

      <br />
      <StatefulInput
        overrides={{
          // eslint-disable-next-line react/display-name
          After: () => (
            <Block display="flex" alignItems="center" paddingRight="scale500">
              <Search size="16px" />
            </Block>
          ),
        }}
        placeholder="Input with an After component"
      />
    </React.Fragment>
  );
}
