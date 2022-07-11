/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import SelectComponent from './select-component';
import MultiValue from './multi-value';
import type { PropsT } from './types';

function MultiSelect(props: Partial<PropsT>) {
  return <SelectComponent {...props} multi={true} valueComponent={MultiValue} />;
}

export default MultiSelect;
