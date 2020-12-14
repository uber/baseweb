/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import SelectComponent from './select-component.js';
import MultiValue from './multi-value.js';
import SingleValue from './value.js';

function Select(props: React.ElementConfig<typeof SelectComponent>) {
  return (
    <SelectComponent
      {...props}
      valueComponent={props.multi ? MultiValue : SingleValue}
    />
  );
}

export default Select;
