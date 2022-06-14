/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { Svg as StyledSvg } from './styled-components';
import omitDollarPrefixedKeys from './omit-dollar-prefixed-keys';
import type { IconPropsT } from './types';

const Icon: React.FC<IconPropsT> = (props, ref) => {
  const { children, title, size, color, overrides = {}, ...restProps } = props;
  const [Svg, overrideProps] = getOverrides(overrides.Svg, StyledSvg);
  // Determine how/which props are passed based on if the component is a Styletron component.
  // @ts-expect-error __STYLETRON__ not in React.AbstractcomponentStatics
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
};

export default React.forwardRef<SVGSVGElement, IconPropsT>(Icon);
