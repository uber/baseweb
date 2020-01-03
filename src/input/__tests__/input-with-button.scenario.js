/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput, SIZE} from '../index.js';
import {Block} from '../../block/index.js';
import {Button} from '../../button/index.js';

export const name = 'input-with-button';

export const component = () => (
  <>
    <Block display="flex" marginBottom="8px">
      <StatefulInput
        initialState={{value: 'Move the world'}}
        size={SIZE.compact}
        overrides={{Root: {style: {marginRight: '8px'}}}}
      />
      <Button size={SIZE.compact}>Move</Button>
    </Block>
    <Block display="flex" marginBottom="8px">
      <StatefulInput
        initialState={{value: 'Move the world'}}
        size={SIZE.default}
        overrides={{Root: {style: {marginRight: '8px'}}}}
      />
      <Button size={SIZE.default}>Move</Button>
    </Block>
    <Block display="flex" marginBottom="8px">
      <StatefulInput
        initialState={{value: 'Move the world'}}
        size={SIZE.large}
        overrides={{Root: {style: {marginRight: '8px'}}}}
      />
      <Button size={SIZE.large}>Move</Button>
    </Block>
  </>
);
