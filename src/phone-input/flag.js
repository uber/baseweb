/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {SIZE} from './constants.js';
import * as flagComponents from './flags/index.js';

export default function Flag(props: {size: string, iso2: string}) {
  const FlagComponent = flagComponents['Flag' + props.iso2.toUpperCase()];
  const width = {
    [SIZE.compact]: '22px',
    [SIZE.default]: '30px',
    [SIZE.large]: '37px',
  }[props.size || SIZE.default];
  return <FlagComponent width={width} />;
}
