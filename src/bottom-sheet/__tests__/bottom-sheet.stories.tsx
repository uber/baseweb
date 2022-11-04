/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as BottomSheetDraggable } from './bottom-sheet-draggable.scenario';
import { Scenario as BottomSheetFixed } from './bottom-sheet-fixed.scenario';
import { Scenario as BottomSheetActionButtons } from './bottom-sheet-action-buttons.scenario';
import { Scenario as BottomSheetEdgeCases } from './bottom-sheet-edge-cases.scenario';
import { Scenario as BottomSheetProgressBar } from './bottom-sheet-progress-bar.scenario';

export const Draggable = () => <BottomSheetDraggable />;
export const Fixed = () => <BottomSheetFixed />;
export const ActionButtons = () => <BottomSheetActionButtons />;
export const EdgeCases = () => <BottomSheetEdgeCases />;
export const ProgressBar = () => <BottomSheetProgressBar />;
