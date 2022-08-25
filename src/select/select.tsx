/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import SelectComponent from './select-component';
import MultiValue from './multi-value';
import SingleValue from './value';

function Select(props: React.ComponentProps<typeof SelectComponent>) {
  return <SelectComponent {...props} valueComponent={props.multi ? MultiValue : SingleValue} />;
}

export default Select;
