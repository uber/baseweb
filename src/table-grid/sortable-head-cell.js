/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {SortableHeadCellFactory} from '../table/index.js';
import {StyledHeadCell} from './styled-components.js';

export const SortableHeadCell = SortableHeadCellFactory(StyledHeadCell);
