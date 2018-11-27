/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import {Block} from '../../../../src/block';
import {styled} from '../../../../src/styles';

export function Header({children}) {
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
