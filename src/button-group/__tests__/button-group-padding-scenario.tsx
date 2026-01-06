/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button } from '../../button';
import { StatefulButtonGroup, MODE, PADDING } from '..';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  const commonOverrides = {
    Root: {
      style: ({ $theme }) => ({
        backgroundColor: $theme.colors.positive,
      }),
    },
  };

  return (
    <React.Fragment>
      <HeadingMedium>Padding variants</HeadingMedium>

      <HeadingXSmall>Padding: default</HeadingXSmall>
      <StatefulButtonGroup
        mode={MODE.radio}
        initialState={{ selected: 0 }}
        padding={PADDING.default}
        overrides={commonOverrides}
      >
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>

      <HeadingXSmall>Padding: none</HeadingXSmall>
      <StatefulButtonGroup
        mode={MODE.radio}
        initialState={{ selected: 0 }}
        padding={PADDING.none}
        overrides={commonOverrides}
      >
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>

      <HeadingXSmall>Padding: custom</HeadingXSmall>
      <StatefulButtonGroup
        mode={MODE.radio}
        initialState={{ selected: 0 }}
        padding={PADDING.custom}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              backgroundColor: $theme.colors.positive,
              paddingLeft: $theme.sizing.scale1000,
              paddingRight: $theme.sizing.scale1000,
            }),
          },
        }}
      >
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
    </React.Fragment>
  );
}
