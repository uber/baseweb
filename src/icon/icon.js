/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Svg as StyledSvg } from './styled-components.js';
import omitDollarPrefixedKeys from './omit-dollar-prefixed-keys.js';
import type { IconPropsT } from './types.js';

function Icon(props: IconPropsT, ref) {
  const { children, title, size, color, overrides = {}, ...restProps } = props;
  const [Svg, overrideProps] = getOverrides(overrides.Svg, StyledSvg);
  // Determine how/which props are passed based on if the component is a Styletron component.
  // $FlowFixMe: __STYLETRON__ not in React.AbstractcomponentStatics
  const passThroughProps = Svg.__STYLETRON__
    ? {
        title,
        $color: color,
        $size: size,
        ...restProps,
        ...overrideProps,
      }
    : {
        title,
        color,
        size,
        ...omitDollarPrefixedKeys(restProps),
        ...omitDollarPrefixedKeys(overrideProps),
      };
  return (
    <Svg data-baseweb="icon" ref={ref} {...passThroughProps}>
      {title ? <title>{title}</title> : null}
      {children}
    </Svg>
  );
}

export default React.forwardRef<IconPropsT, mixed>(Icon);
