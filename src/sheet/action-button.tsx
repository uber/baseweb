/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button, KIND, SHAPE, SIZE } from '../button';

export function ActionButton({ children, size, ...restProps }) {
  const iconButtonStyle = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  // compact buttons need a pseudo-element to acheive a 48px tap target
  const compactButtonStyle = {
    position: 'relative',
    ':after': {
      content: '""',
      position: 'absolute',
      height: '48px',
      width: '48px',
    },
  };

  return (
    <Button
      kind={KIND.tertiary}
      shape={SHAPE.square}
      size={size}
      overrides={{
        BaseButton: {
          style: {
            ...(size === SIZE.compact ? compactButtonStyle : {}),
            ...(typeof children !== 'string' ? iconButtonStyle : {}),
          },
        },
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
}
