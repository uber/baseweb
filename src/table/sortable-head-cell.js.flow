/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { getOverrides } from '../helpers/overrides.js';
import TriangleUp from '../icon/triangle-up.js';
import TriangleDown from '../icon/triangle-down.js';

import { SORT_DIRECTION } from './constants.js';
import { StyledHeadCell, StyledSortableLabel } from './styled-components.js';
import type { SortDirectionT, HeadCellPropsT } from './types.js';

function SortDirectionIcon({ direction }: { direction: SortDirectionT }) {
  switch (direction) {
    case SORT_DIRECTION.ASC:
      return <TriangleUp title="Sort ascending" />;
    case SORT_DIRECTION.DESC:
      return <TriangleDown title="Sort descending" />;
    default:
      return null;
  }
}
export const SortableHeadCellFactory = (
  CustomHeadCell: React.ComponentType<HeadCellPropsT> = StyledHeadCell
) => {
  return function SortableHeadCell(props: HeadCellPropsT) {
    const { overrides = {}, fillClickTarget, disabled } = props;

    const [HeadCell, headCellProps] = getOverrides(overrides.HeadCell, CustomHeadCell);

    const [SortableLabel, sortableLabelProps] = getOverrides(
      overrides.SortableLabel,
      StyledSortableLabel
    );

    const onClick = () => {
      props.onSort && props.onSort();
    };
    const enableHeadClick = fillClickTarget && !disabled;

    let ariaLabel = props['aria-label'] || props.ariaLabel;
    if (!ariaLabel) {
      if (typeof props.title === 'string') {
        ariaLabel = `sorts table by ${props.title} column`;
      } else {
        ariaLabel = 'sort table by column';
      }
    }

    return (
      <HeadCell
        role="columnheader"
        {...headCellProps}
        $cursor={enableHeadClick ? 'pointer' : undefined}
        onClick={enableHeadClick ? onClick : undefined}
      >
        <SortableLabel
          aria-label={ariaLabel}
          disabled={disabled}
          onClick={!fillClickTarget ? onClick : undefined}
          {...sortableLabelProps}
        >
          <SortDirectionIcon direction={props.direction} />
          {props.title}
        </SortableLabel>
        {props.children}
      </HeadCell>
    );
  };
};

export default SortableHeadCellFactory();
