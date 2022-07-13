/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { StatefulInput, SIZE } from '..';
import { Block } from '../../block';
import { Button } from '../../button';

export function Scenario() {
  return (
    <React.Fragment>
      <Block display="flex" marginBottom="8px">
        <StatefulInput
          initialState={{ value: 'Move the world' }}
          size={SIZE.compact}
          overrides={{ Root: { style: { marginRight: '8px' } } }}
        />

        <Button size={SIZE.compact}>Move</Button>
      </Block>
      <Block display="flex" marginBottom="8px">
        <StatefulInput
          initialState={{ value: 'Move the world' }}
          size={SIZE.default}
          overrides={{ Root: { style: { marginRight: '8px' } } }}
        />

        <Button size={SIZE.default}>Move</Button>
      </Block>
      <Block display="flex" marginBottom="8px">
        <StatefulInput
          initialState={{ value: 'Move the world' }}
          size={SIZE.large}
          overrides={{ Root: { style: { marginRight: '8px' } } }}
        />

        <Button size={SIZE.large}>Move</Button>
      </Block>
    </React.Fragment>
  );
}
