/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Svg as StyledSvg} from './styled-components.js';
import type {IconPropsT} from './types.js';

function Icon(props: IconPropsT, ref) {
  const {children, title, overrides = {}, size, color, ...restProps} = props;

  const [Svg, overrideProps] = getOverrides(overrides.Svg, StyledSvg);

  const sharedProps = {
    $size: size,
    $color: color,
  };

  return (
    <Svg
      data-baseweb="icon"
      ref={ref}
      {...restProps}
      {...sharedProps}
      {...overrideProps}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </Svg>
  );
}

export default React.forwardRef<IconPropsT, mixed>(Icon);
