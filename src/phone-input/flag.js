/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import * as flags from './flags/index.js';
import type {CountryIsoT} from './types.js';

export default function Flag(props: {iso: CountryIsoT, width?: string}) {
  const {iso, width = '16px', ...restProps} = props;
  const FlagComponent = flags[`Flag${props.iso.toUpperCase()}`];
  return (
    <FlagComponent
      width={width}
      data-e2e="country-flag"
      data-iso={iso}
      {...restProps}
    />
  );
}
