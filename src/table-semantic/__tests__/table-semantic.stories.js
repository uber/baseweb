/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TableSemanticBuilder from './table-semantic-builder.scenario.js';
import TableSemanticCompose from './table-semantic-compose.scenario.js';
import TableSemanticDefault from './table-semantic.scenario.js';
import TableSemanticDivider from './table-semantic-divider.scenario.js';
import TableSemanticSize from './table-semantic-size.scenario.js';
import TableSemanticBuilderSize from './table-semantic-builder-size.scenario.js';
import TableSemanticBuilderDivider from './table-semantic-builder-divider.scenario.js';

export const Builder = () => <TableSemanticBuilder />;
export const Compose = () => <TableSemanticCompose />;
export const TableSemantic = () => <TableSemanticDefault />;
export const Divider = () => <TableSemanticDivider />;
export const Size = () => <TableSemanticSize />;
export const BuilderSize = () => <TableSemanticBuilderSize />;
export const BuilderDivider = () => <TableSemanticBuilderDivider />;
