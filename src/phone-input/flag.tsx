/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import * as flags from './flags';
import { styled } from '../styles';
import { SIZE } from './constants';
import type { CountryIso, Size } from './types';

type SizeStyleProps = {
  $size?: Size;
};

export type FlagProps = {
  $iso: CountryIso;
  // remove `iso` prop in the next major version
  iso?: CountryIso;
  width?: string;
};
export default function Flag(props: FlagProps) {
  const { $iso, iso: oldIsoProp, width = '16px', ...restProps } = props;
  const iso: CountryIso = oldIsoProp || $iso;
  const FlagComponent = flags[`Flag${iso.toUpperCase()}`];
  //$FlowExpectedError[cannot-spread-inexact]
  return <FlagComponent width={width} data-iso={iso} {...restProps} />;
}

export const StyledFlag = styled<typeof Flag, SizeStyleProps>(
  Flag,
  ({ $size = SIZE.default, $theme: { sizing } }) => {
    const sizeToWidth = {
      [SIZE.mini]: sizing.scale700,
      [SIZE.compact]: sizing.scale800,
      [SIZE.default]: sizing.scale900,
      [SIZE.large]: sizing.scale1000,
    };
    return {
      width: sizeToWidth[$size],
    };
  }
);
