/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled} from 'baseui';
import {H2} from '../markdown-elements';

export function Header({children}: {children: React.Node}) {
  return <H2>{children}</H2>;
}

export const ExampleWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});
