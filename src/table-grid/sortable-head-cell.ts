/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SortableHeadCellFactory } from '../table';
import { StyledHeadCell } from './styled-components';

// @ts-expect-error todo(flow->ts) this assignment is not correct title property is declared as ReactNode but then it is used on div element… which is not correct
export const SortableHeadCell = SortableHeadCellFactory(StyledHeadCell);
