/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TreeViewInteractable from './tree-view-interactable.scenario.js';
import TreeViewRenderAll from './tree-view-render-all.scenario.js';
import TreeViewSingleExpanded from './tree-view-single-expanded.scenario.js';
import TreeViewDefault from './tree-view.scenario.js';

export const Interactable = () => <TreeViewInteractable />;
export const RenderAll = () => <TreeViewRenderAll />;
export const SingleExpanded = () => <TreeViewSingleExpanded />;
export const TreeView = () => <TreeViewDefault />;
