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

import type { GridProps, SharedGridProps } from './types';

export const GridContext: React.Context<SharedGridProps> = React.createContext({});

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
}: GridProps) {
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
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <StyledGridWrapper
      $behavior={behavior}
      $gridMargins={gridMargins != null ? gridMargins : gridStyleValues.$gridMargins}
      $gridMaxWidth={gridMaxWidth != null ? gridMaxWidth : gridStyleValues.$gridMaxWidth}
      $gridUnit={gridUnit != null ? gridUnit : gridStyleValues.$gridUnit}
      {...wrapperProps}
    >
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
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
            // @ts-ignore
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
