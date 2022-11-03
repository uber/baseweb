/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as BottomSheetDraggable } from './draggable-bottom-sheet.scenario';
import { Scenario as BottomSheetFixed } from './fixed-bottom-sheet.scenario';
import { Scenario as BottomSheetActionButtons } from './action-buttons-bottom-sheet.scenario';

export const Draggable = () => <BottomSheetDraggable />;
export const Fixed = () => <BottomSheetFixed />;
export const ActionButtons = () => <BottomSheetActionButtons />;
