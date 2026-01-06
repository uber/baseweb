/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Button } from '../../button';
import { StatefulButtonGroup, MODE, KIND } from '..';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  return (
    <React.Fragment>
      <HeadingMedium>Kind variants</HeadingMedium>
      <HeadingXSmall>Kind: default(secondary)</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio}>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
      <HeadingXSmall>Kind: tertiary</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} kind={KIND.tertiary}>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
      <HeadingXSmall>Kind: outline</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} kind={KIND.outline}>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </StatefulButtonGroup>
    </React.Fragment>
  );
}
