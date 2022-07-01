/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TreeViewIconOverrides } from './tree-view-icon-overrides.scenario';
import { Scenario as TreeViewInteractable } from './tree-view-interactable.scenario';
import { Scenario as TreeViewRenderAll } from './tree-view-render-all.scenario';
import { Scenario as TreeViewSingleExpanded } from './tree-view-single-expanded.scenario';
import { Scenario as TreeViewDefault } from './tree-view.scenario';

export const IconOverrides = () => <TreeViewIconOverrides />;
export const Interactable = () => <TreeViewInteractable />;
export const RenderAll = () => <TreeViewRenderAll />;
export const SingleExpanded = () => <TreeViewSingleExpanded />;
export const TreeView = () => <TreeViewDefault />;
