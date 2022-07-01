/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { STYLE, STYLE_VALUES } from './constants';
import {
  StyledGrid as DefaultStyledGrid,
  StyledGridWrapper as DefaultStyledGridWrapper,
} from './styled-components';

import type { GridPropsT, SharedGridPropsT } from './types';

export const GridContext: React.Context<SharedGridPropsT> = React.createContext({});

export default function Grid({
  align,
  behavior,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridMargins,
  gridMaxWidth,
  gridStyle = STYLE.default,
  gridUnit,
  overrides = {},
}: GridPropsT) {
  const [StyledGrid, overrideProps] = getOverrides(overrides.Grid, DefaultStyledGrid);
  const [StyledGridWrapper, wrapperProps] = getOverrides(
    overrides.GridWrapper,
    DefaultStyledGridWrapper
  );
  const presetStyleValues = STYLE_VALUES[gridStyle];
  const gridStyleValues = presetStyleValues
    ? {
        $gridGutters: presetStyleValues.gutters,
        $gridMargins: presetStyleValues.margins,
        $gridMaxWidth: presetStyleValues.maxWidth,
        $gridUnit: presetStyleValues.unit,
      }
    : {};
  const gridContextStyleValues = presetStyleValues && {
    gridColumns: presetStyleValues.columns,
    gridGaps: presetStyleValues.gaps,
    gridGutters: presetStyleValues.gutters,
    gridUnit: presetStyleValues.unit,
  };

  return (
    <StyledGridWrapper
      $behavior={behavior}
      $gridMargins={gridMargins != null ? gridMargins : gridStyleValues.$gridMargins}
      $gridMaxWidth={gridMaxWidth != null ? gridMaxWidth : gridStyleValues.$gridMaxWidth}
      $gridUnit={gridUnit != null ? gridUnit : gridStyleValues.$gridUnit}
      {...wrapperProps}
    >
      <StyledGrid
        $align={align}
        $behavior={behavior}
        $gridGutters={gridGutters != null ? gridGutters : gridStyleValues.$gridGutters}
        $gridMargins={gridMargins != null ? gridMargins : gridStyleValues.$gridMargins}
        $gridMaxWidth={gridMaxWidth != null ? gridMaxWidth : gridStyleValues.$gridMaxWidth}
        $gridUnit={gridUnit != null ? gridUnit : gridStyleValues.$gridUnit}
        {...overrideProps}
      >
        <GridContext.Provider
          value={{
            gridColumns,
            gridGaps,
            gridGutters,
            gridUnit,
            ...gridContextStyleValues,
          }}
        >
          {children}
        </GridContext.Provider>
      </StyledGrid>
    </StyledGridWrapper>
  );
}
