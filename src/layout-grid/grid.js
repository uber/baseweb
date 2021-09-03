/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {STYLE, STYLE_VALUES} from './constants.js';
import {StyledGrid as DefaultStyledGrid} from './styled-components.js';

import type {GridPropsT, SharedGridPropsT} from './types.js';

export const GridContext: React.Context<SharedGridPropsT> = React.createContext(
  {},
);

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
  const [StyledGrid, overrideProps] = getOverrides(
    overrides.Grid,
    DefaultStyledGrid,
  );
  const presetStyleValues = STYLE_VALUES[gridStyle];
  const gridStyleValues = presetStyleValues && {
    $gridGutters: presetStyleValues.gutters,
    $gridMargins: presetStyleValues.margins,
    $gridMaxWidth: presetStyleValues.maxWidth,
    $gridUnit: presetStyleValues.unit,
  };
  const gridContextStyleValues = presetStyleValues && {
    gridColumns: presetStyleValues.columns,
    gridGaps: presetStyleValues.gaps,
    gridGutters: presetStyleValues.gutters,
    gridUnit: presetStyleValues.unit,
  };

  return (
    <StyledGrid
      $align={align}
      $behavior={behavior}
      $gridGutters={gridGutters}
      $gridMargins={gridMargins}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
      {...gridStyleValues}
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
  );
}
