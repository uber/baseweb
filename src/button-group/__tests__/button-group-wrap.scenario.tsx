/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button';
import { StatefulButtonGroup, MODE, SIZE } from '..';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  return (
    <React.Fragment>
      <HeadingMedium>Wrap variants</HeadingMedium>
      <HeadingXSmall>Wrap not passed</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }}>
        {new Array(10).fill(0).map((_, index) => (
          <Button key={index}>Label</Button>
        ))}
      </StatefulButtonGroup>

      <HeadingXSmall>Wrap: false</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }} wrap={false}>
        {new Array(10).fill(0).map((_, index) => (
          <Button key={index}>Label</Button>
        ))}
      </StatefulButtonGroup>

      <HeadingXSmall>Wrap: false(constrained container width 300px)</HeadingXSmall>
      <div style={{ width: '300px' }}>
        <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }} wrap={false}>
          {new Array(10).fill(0).map((_, index) => (
            <Button key={index}>Label</Button>
          ))}
        </StatefulButtonGroup>
      </div>

      <HeadingXSmall>Wrap: true</HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }} wrap={true}>
        {new Array(10).fill(0).map((_, index) => (
          <Button key={index}>Label</Button>
        ))}
      </StatefulButtonGroup>

      <HeadingXSmall>Wrap: true(xSmall button group has larger vertical gap)</HeadingXSmall>
      <StatefulButtonGroup
        mode={MODE.radio}
        initialState={{ selected: 0 }}
        wrap={true}
        size={SIZE.xSmall}
      >
        {new Array(20).fill(0).map((_, index) => (
          <Button key={index}>Label</Button>
        ))}
      </StatefulButtonGroup>

      <HeadingXSmall>Wrap: true(constrained container width 300px)</HeadingXSmall>
      <div style={{ width: '300px' }}>
        <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: 0 }} wrap={true}>
          {new Array(10).fill(0).map((_, index) => (
            <Button key={index}>Label</Button>
          ))}
        </StatefulButtonGroup>
      </div>
    </React.Fragment>
  );
}
