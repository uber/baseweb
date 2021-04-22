/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulInput} from '../index.js';
import {Block} from '../../block/index.js';
import {Search} from '../../icon/index.js';

export default function Scenario() {
  return (
    <>
      <StatefulInput
        initialState={{value: 'Default'}}
        endEnhancer="00"
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="18px" />
            </Block>
          ),
        }}
      />
      <br />
      <StatefulInput
        initialState={{value: 'Active'}}
        endEnhancer="00"
        autoFocus
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="18px" />
            </Block>
          ),
        }}
      />
      <br />
      <StatefulInput
        initialState={{value: 'Positive'}}
        endEnhancer="00"
        positive
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="18px" />
            </Block>
          ),
        }}
      />
      <br />
      <StatefulInput
        initialState={{value: 'Error'}}
        endEnhancer="00"
        error
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="18px" />
            </Block>
          ),
        }}
      />
      <br />
      <StatefulInput
        initialState={{value: 'Disabled'}}
        endEnhancer="00"
        disabled
        overrides={{
          // eslint-disable-next-line react/display-name
          Before: () => (
            <Block display="flex" alignItems="center" paddingLeft="scale500">
              <Search size="18px" />
            </Block>
          ),
        }}
      />
    </>
  );
}
