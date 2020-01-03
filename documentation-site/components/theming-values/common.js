/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {H3} from '../markdown-elements';
import {themedStyled} from '../../pages/_app';

export function Header({children}: {children: React.Node}) {
  return <H3>{children}</H3>;
}

export const ExampleWrapper = themedStyled('div', {
  display: 'flex',
  flexWrap: 'wrap',
});
