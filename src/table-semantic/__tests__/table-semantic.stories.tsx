/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TableSemanticBuilder } from './table-semantic-builder.scenario';
import { Scenario as TableSemanticBuilderIconOverrides } from './table-semantic-builder-icon-overrides.scenario';
import { Scenario as TableSemanticCompose } from './table-semantic-compose.scenario';
import { Scenario as TableSemanticDefault } from './table-semantic.scenario';
import { Scenario as TableSemanticDivider } from './table-semantic-divider.scenario';
import { Scenario as TableSemanticSize } from './table-semantic-size.scenario';
import { Scenario as TableSemanticSpaciousSort } from './table-semantic-spacious-sort.scenario';
import { Scenario as TableSemanticBuilderSize } from './table-semantic-builder-size.scenario';
import { Scenario as TableSemanticBuilderDivider } from './table-semantic-builder-divider.scenario';

export const Builder = () => <TableSemanticBuilder />;
export const BuilderIconOverrides = () => <TableSemanticBuilderIconOverrides />;
export const Compose = () => <TableSemanticCompose />;
export const TableSemantic = () => <TableSemanticDefault />;
export const Divider = () => <TableSemanticDivider />;
export const Size = () => <TableSemanticSize />;
export const SpaciousSort = () => <TableSemanticSpaciousSort />;
export const BuilderSize = () => <TableSemanticBuilderSize />;
export const BuilderDivider = () => <TableSemanticBuilderDivider />;
