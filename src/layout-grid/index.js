/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {StyledGrid, StyledCell} from './styled-components.js';
import Grid from './grid.js';
import Cell from './cell.js';

import DeprecatedHOC from '../utils/deprecated-component.js';

export {StyledGrid, StyledCell, Grid, Cell};
export * from './constants.js';

const componentName = 'Layout Grid (baseui/layout-grid)';
export const Unstable_StyledGrid = DeprecatedHOC(StyledGrid, componentName);
export const Unstable_StyledCell = DeprecatedHOC(StyledCell, componentName);
export const Unstable_Grid = DeprecatedHOC(Grid, componentName);
export const Unstable_Cell = DeprecatedHOC(Cell, componentName);
