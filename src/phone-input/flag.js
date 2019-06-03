/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import * as flagComponents from './flags/index.js';

export default function Flag(props: {iso2: string, width?: string}) {
  const {iso2, width = '16px', ...restProps} = props;
  const FlagComponent = flagComponents['Flag' + iso2.toUpperCase()];
  return <FlagComponent iso2={iso2} width={width} {...restProps} />;
}
