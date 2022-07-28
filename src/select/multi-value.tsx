/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Tag, VARIANT as TAG_VARIANT } from '../tag';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MultiValue(props: any) {
  const { overrides = {}, removeValue, ...restProps } = props;
  // todo(v11): remove the MultiValue override in favor of Tag
  const [MultiValue, tagProps] = getOverrides(overrides.Tag || overrides.MultiValue, Tag);
  return (
    <MultiValue
      variant={TAG_VARIANT.solid}
      overrides={{
        Root: {
          style: ({ $theme: { sizing } }) => ({
            marginRight: sizing.scale0,
            marginBottom: sizing.scale0,
            marginLeft: sizing.scale0,
            marginTop: sizing.scale0,
          }),
        },
      }}
      onActionClick={removeValue}
      {...restProps}
      {...tagProps}
    >
      {props.children}
    </MultiValue>
  );
}
