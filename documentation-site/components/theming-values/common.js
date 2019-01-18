/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled} from 'baseui';
import {Block} from 'baseui/block';

export function Header({children}: {children: React.Node}) {
  return (
    <Block font="font700" marginBottom="scale200">
      {children}
    </Block>
  );
}

export const ExampleWrapper = styled('div', () => {
  return {
    display: 'flex',
    flexWrap: 'wrap',
  };
});
