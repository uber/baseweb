/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {Block} from '../block/index.js';
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import type {NeedlePropsT} from './types.js';

const heights = {
  none: 0,
  short: 4,
  medium: 12,
  tall: 20,
};
const Needle = ({size, background}: NeedlePropsT) => {
  const [css, theme] = useStyletron();
  const {
    lighting: {shadow600},
  } = theme;
  return (
    <Block
      className={css({
        background,
        width: '4px',
        height: heights[size] + 'px',
        boxShadow: shadow600,
      })}
    />
  );
};

export default Needle;
