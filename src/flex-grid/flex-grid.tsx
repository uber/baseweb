/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block, BlockPropsT } from '../block/index';
import { flattenFragments } from '../helpers/react-helpers';
import { getOverrides } from '../helpers/overrides';
import type { FlexGridPropsT } from './types';

export const BaseFlexGrid = React.forwardRef<HTMLElement, BlockPropsT>(
  ({ display, flexWrap, ...restProps }, ref) => (
    //$FlowFixMe
    <Block
      display={display || 'flex'}
      flexWrap={flexWrap || flexWrap === false ? flexWrap : true}
      data-baseweb="flex-grid"
      {...restProps}
      ref={ref}
    />
  )
);
BaseFlexGrid.displayName = 'BaseFlexGrid';

const FlexGrid: React.FC<FlexGridPropsT & { forwardedRef: React.Ref<HTMLElement> }> = ({
  forwardedRef,
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  ...restProps
}) => {
  const [FlexGrid, flexGridProps] = getOverrides(overrides && overrides.Block, BaseFlexGrid);
  return (
    <FlexGrid
      // coerced to any because of how react components are typed.
      // cannot guarantee an html element
      // flowlint-next-line unclear-type:off
      ref={forwardedRef}
      as={as}
      {...restProps}
      {...flexGridProps}
    >
      {
        // flatten fragments so FlexGrid correctly iterates over fragments’ children
        flattenFragments(children).map(
          (
            // todo: incorrect component typings - children should be strictly ReactElement[] or implementation below needs to be updated to handle other things that can be in ReactNode
            child: React.ReactElement,
            flexGridItemIndex: number,
            { length: flexGridItemCount }: React.ReactNode[]
          ) => {
            // $FlowFixMe https://github.com/facebook/flow/issues/4864
            return React.cloneElement(child, {
              flexGridColumnCount,
              flexGridColumnGap,
              flexGridRowGap,
              flexGridItemIndex,
              flexGridItemCount,
            });
          }
        )
      }
    </FlexGrid>
  );
};

const FlexGridComponent = React.forwardRef<
  HTMLElement,
  Omit<React.ComponentProps<typeof FlexGrid>, 'forwardedRef'>
>((props: FlexGridPropsT, ref) => <FlexGrid {...props} forwardedRef={ref} />);
FlexGridComponent.displayName = 'FlexGrid';
export default FlexGridComponent;
