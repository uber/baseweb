/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as TreeViewInteractable} from './tree-view-interactable.scenario.js';
import {Scenario as TreeViewRenderAll} from './tree-view-render-all.scenario.js';
import {Scenario as TreeViewSingleExpanded} from './tree-view-single-expanded.scenario.js';
import {Scenario as TreeViewDefault} from './tree-view.scenario.js';

export const Interactable = () => <TreeViewInteractable />;
export const RenderAll = () => <TreeViewRenderAll />;
export const SingleExpanded = () => <TreeViewSingleExpanded />;
export const TreeView = () => <TreeViewDefault />;
