/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {LightTheme} from 'baseui';
import {Property} from './common.js';

export function Breakpoint({
  value,
  media = false,
}: {
  value: string,
  media: boolean,
}) {
  return (
    <Property
      title={value}
      value={LightTheme[media ? 'mediaQuery' : 'breakpoints'][value] + 'px'}
    ></Property>
  );
}
