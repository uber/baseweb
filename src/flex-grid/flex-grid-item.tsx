/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block, type StyledBlockPropsT } from '../block';
import { mergeOverrides } from '../helpers/overrides';
import { getMediaQueries, getMediaQuery } from '../helpers/responsive-helpers';
import type { FlexGridItemPropsT } from './types';
import type { ResponsiveT, ScaleT } from '../block';
import type { StyleOverrideT } from '../helpers/overrides';
import type { ThemeT } from '../styles';

export const flexGridItemMediaQueryStyle = ({
  $theme,
  flexGridColumnCount: colCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex: itemIndex,
  flexGridItemCount: itemCount,
}: {
  $theme: ThemeT;
  flexGridColumnCount: number;
  flexGridColumnGap: ScaleT;
  flexGridRowGap: ScaleT;
  flexGridItemIndex: number;
  flexGridItemCount: number;
}) => {
  // 0px needed for calc() to behave properly
  const colGap = $theme.sizing[flexGridColumnGap] || flexGridColumnGap || '0px';
  const colGapQuantity = parseFloat(colGap);
  const colGapUnit = colGap.match(/[a-zA-Z]+/)[0];
  const rowGap = $theme.sizing[flexGridRowGap] || flexGridRowGap || '0px';
  const rowGapQuantity = parseFloat(rowGap);
  const widthCalc = `(100% - ${(colCount - 1) * colGapQuantity}${colGapUnit}) / ${colCount}`;
  const marginDirection: string = $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
  return Object.freeze({
    // Subtract .5px to avoid rounding issues on IE/Edge
    // See https://github.com/uber/baseweb/pull/1748
    width: `calc(${widthCalc} - .5px)`,
    // Add colGap except at end of row
    [marginDirection]:
      colGapQuantity && //flowlint-line sketchy-number-and:off
      ((itemIndex + 1) % colCount !== 0 ? colGap : 0),
    // Add rowGap except at end of column
    marginBottom:
      rowGapQuantity && //flowlint-line sketchy-number-and:off
      (~~(itemIndex / colCount) !== ~~((itemCount - 1) / colCount) ? rowGap : 0),
    // Add space to make up for missing columns if last row ends early
    ...(itemIndex === itemCount - 1 && (itemIndex + 1) % colCount !== 0
      ? {
          [marginDirection]: `calc(${
            colCount - (itemIndex % colCount) - 1
          } * (${colGap} + ${widthCalc}))`,
        }
      : {}),
  });
};

export const getResponsiveValue = <T extends any>(
  responsive: ResponsiveT<T> | undefined | null,
  i: number
): T | undefined | null => {
  if (!responsive) {
    return null;
  }
  if (!Array.isArray(responsive)) {
    return responsive;
  }
  return responsive[i] || responsive[responsive.length - 1];
};

export const flexGridItemStyle = ({
  $flexGridColumnCount,
  $flexGridColumnGap,
  $flexGridRowGap,
  $flexGridItemIndex,
  $flexGridItemCount,
  $theme,
}: {
  $flexGridColumnCount?: ResponsiveT<number>;
  $flexGridColumnGap?: ResponsiveT<ScaleT>;
  $flexGridRowGap?: ResponsiveT<ScaleT>;
  $flexGridItemIndex?: number;
  $flexGridItemCount?: number;
  $theme: ThemeT;
}): StyleOverrideT => {
  const baseFlexGridItemStyle = { flexGrow: 1 };
  const mediaQueries = getMediaQueries($theme.breakpoints);

  // Get the length of the longest responsive array
  const maxResponsiveLength = Math.max(
    ...[$flexGridColumnCount, $flexGridColumnGap, $flexGridRowGap].map((r) =>
      Array.isArray(r) ? r.length : 0
    )
  );

  // No media queries for non-responsive FlexGrids
  if (maxResponsiveLength < 2) {
    return {
      ...baseFlexGridItemStyle,
      ...flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: getResponsiveValue($flexGridColumnCount, 0) || 1,
        flexGridColumnGap: getResponsiveValue($flexGridColumnGap, 0) || 0,
        flexGridRowGap: getResponsiveValue($flexGridRowGap, 0) || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1,
      }),
    };
  }

  // Generate style by iterating up to maxResponsiveLength for each responsive
  // breakpoint. Will end up with styles for one of the following media queries
  // depending on maxResponsiveLength:
  // - {mobile, small}
  // - {mobile, small, medium}
  // - {mobile, small, medium, large}
  return [...Array(maxResponsiveLength).keys()].reduce((acc, i) => {
    const flexGridColumnCountValue = getResponsiveValue($flexGridColumnCount, i);
    const flexGridColumnGapValue = getResponsiveValue($flexGridColumnGap, i);
    const flexGridRowGapValue = getResponsiveValue($flexGridRowGap, i);
    const mediaQuery =
      i === 0
        ? // Custom media query needed so :nth-child styles don't conflict
          getMediaQuery(0)
        : mediaQueries[i - 1];
    if (mediaQuery) {
      acc[mediaQuery] = flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: flexGridColumnCountValue || 1,
        flexGridColumnGap: flexGridColumnGapValue || 0,
        flexGridRowGap: flexGridRowGapValue || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1,
      });
    }
    return acc;
  }, baseFlexGridItemStyle);
};

const FlexGridItem: React.FC<FlexGridItemPropsT & { forwardedRef: React.Ref<HTMLElement> }> = ({
  forwardedRef,
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex,
  flexGridItemCount,
  ...restProps
}) => {
  const flexGridItemOverrides = {
    Block: {
      style: flexGridItemStyle,
    },
  };
  const blockOverrides = overrides
    ? mergeOverrides(flexGridItemOverrides, overrides)
    : flexGridItemOverrides;
  return (
    <Block
      // coerced to any because of how react components are typed.
      // cannot guarantee an html element
      ref={forwardedRef as any}
      as={as}
      overrides={blockOverrides}
      $flexGridColumnCount={flexGridColumnCount}
      $flexGridColumnGap={flexGridColumnGap}
      $flexGridRowGap={flexGridRowGap}
      $flexGridItemIndex={flexGridItemIndex}
      $flexGridItemCount={flexGridItemCount}
      data-baseweb="flex-grid-item"
      {...restProps}
    >
      {children}
    </Block>
  );
};
interface FlexGridItemComponentType<D extends React.ElementType> {
  <C extends React.ElementType = D>(
    props: FlexGridItemPropsT<C> &
      (React.ComponentProps<C> extends { ref?: infer R } ? { ref?: R } : {}) &
      Omit<StyledBlockPropsT & React.ComponentProps<C>, keyof FlexGridItemPropsT>
  ): JSX.Element;
  displayName?: string;
}
const FlexGridItemComponent = React.forwardRef<HTMLElement, FlexGridItemPropsT>(
  (props: FlexGridItemPropsT, ref) => <FlexGridItem {...props} forwardedRef={ref} />
) as FlexGridItemComponentType<'div'>;
FlexGridItemComponent.displayName = 'FlexGridItem';
export default FlexGridItemComponent;
