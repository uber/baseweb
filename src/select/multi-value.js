/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Tag, VARIANT as TAG_VARIANT} from '../tag/index.js';

// eslint-disable-next-line flowtype/no-weak-types
export default function MultiValue(props: any) {
  const {overrides = {}, removeValue, ...restProps} = props;
  const [MultiValue, multiValueProps] = getOverrides(overrides.MultiValue, Tag);
  return (
    <MultiValue
      variant={TAG_VARIANT.solid}
      overrides={{
        Root: {
          style: ({$theme: {sizing}}) => ({
            marginRight: sizing.scale0,
            marginBottom: sizing.scale0,
            marginLeft: sizing.scale0,
            marginTop: sizing.scale0,
          }),
        },
      }}
      onActionClick={removeValue}
      {...restProps}
      {...multiValueProps}
    >
      {props.children}
    </MultiValue>
  );
}
