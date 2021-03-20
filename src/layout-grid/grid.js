/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {StyledGrid as DefaultStyledGrid} from './styled-components.js';

import type {GridPropsT, SharedGridPropsT} from './types.js';

export const GridContext: React.Context<SharedGridPropsT> = React.createContext(
  {},
);

function Grid({
  align,
  behavior,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridMargins,
  gridMaxWidth,
  gridUnit,
  overrides = {},
}: GridPropsT) {
  const [StyledGrid, overrideProps] = getOverrides(
    overrides.Grid,
    DefaultStyledGrid,
  );
  return (
    <StyledGrid
      $align={align}
      $behavior={behavior}
      $gridGutters={gridGutters}
      $gridMargins={gridMargins}
      $gridMaxWidth={gridMaxWidth}
      $gridUnit={gridUnit}
      {...overrideProps}
    >
      <GridContext.Provider
        value={{gridColumns, gridGaps, gridGutters, gridUnit}}
      >
        {children}
      </GridContext.Provider>
    </StyledGrid>
  );
}

export default withOverrides(Grid, 'Grid');
