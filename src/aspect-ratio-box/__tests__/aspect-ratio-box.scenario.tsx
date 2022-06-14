/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { AspectRatioBox, AspectRatioBoxBody } from '..';

const bodyProps: React.ComponentProps<typeof AspectRatioBoxBody> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overrides: {
    Block: {
      style: {
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftWidth: '2px',
        borderTopWidth: '2px',
        borderRightWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftColor: `grey`,
        borderTopColor: `grey`,
        borderRightColor: `grey`,
        borderBottomColor: `grey`,
      },
    },
  },
};

export function Scenario() {
  return (
    <React.Fragment>
      <AspectRatioBox>
        <AspectRatioBoxBody {...bodyProps}>Square by default</AspectRatioBoxBody>
      </AspectRatioBox>
      <AspectRatioBox aspectRatio={16 / 9}>
        <AspectRatioBoxBody {...bodyProps}>16:9 aspect ratio</AspectRatioBoxBody>
      </AspectRatioBox>
    </React.Fragment>
  );
}
