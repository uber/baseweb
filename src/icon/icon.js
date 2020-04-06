/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Override} from '../helpers/override.js';
import {Svg as StyledSvg} from './styled-components.js';
import type {IconPropsT, StyledComponentArgsT} from './types.js';

const Svg = Override<StyledComponentArgsT>(StyledSvg);

function Icon(props: IconPropsT, ref) {
  const {children, title, overrides = {}, size, color, ...restProps} = props;

  // maintains props from overrides applying to the size/color values
  const SvgOverrideProps =
    overrides.Svg && overrides.Svg.props ? overrides.Svg.props : {};
  const sizeOverride =
    typeof SvgOverrideProps.size === 'string' ||
    typeof SvgOverrideProps.size === 'number'
      ? SvgOverrideProps.size
      : undefined;
  const colorOverride =
    typeof SvgOverrideProps.color === 'string'
      ? SvgOverrideProps.color
      : undefined;

  return (
    <Svg
      data-baseweb="icon"
      {...restProps}
      $size={sizeOverride || size}
      $color={colorOverride || color}
      override={overrides.Svg}
      ref={ref}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </Svg>
  );
}

export default React.forwardRef<IconPropsT, mixed>(Icon);
