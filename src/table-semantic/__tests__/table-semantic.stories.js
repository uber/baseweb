/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as TableSemanticBuilder } from './table-semantic-builder.scenario.js';
import { Scenario as TableSemanticCompose } from './table-semantic-compose.scenario.js';
import { Scenario as TableSemanticDefault } from './table-semantic.scenario.js';
import { Scenario as TableSemanticDivider } from './table-semantic-divider.scenario.js';
import { Scenario as TableSemanticSize } from './table-semantic-size.scenario.js';
import { Scenario as TableSemanticBuilderSize } from './table-semantic-builder-size.scenario.js';
import { Scenario as TableSemanticBuilderDivider } from './table-semantic-builder-divider.scenario.js';

export const Builder = () => <TableSemanticBuilder />;
export const Compose = () => <TableSemanticCompose />;
export const TableSemantic = () => <TableSemanticDefault />;
export const Divider = () => <TableSemanticDivider />;
export const Size = () => <TableSemanticSize />;
export const BuilderSize = () => <TableSemanticBuilderSize />;
export const BuilderDivider = () => <TableSemanticBuilderDivider />;
