/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import SelectComponent from './select-component.js';
import Value from './value.js';
import type {PropsT} from './types.js';

function MultiSelect(props: $Shape<PropsT>) {
  return <SelectComponent {...props} multi={false} valueComponent={Value} />;
}

export default MultiSelect;
