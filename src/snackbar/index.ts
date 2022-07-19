/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type {
  Duration,
  Placement,
  SnackbarElementOverrides,
  SnackbarElementProps,
  SnackbarProviderProps,
} from './types';

export { DURATION, PLACEMENT } from './constants';
export { default as SnackbarElement } from './snackbar-element';
export { default as SnackbarProvider, useSnackbar } from './snackbar-context';
export {
  StyledRoot,
  StyledContent,
  StyledStartEnhancerContainer,
  StyledSpinner,
  StyledMessage,
  StyledWrapActionButtonContainer,
  StyledActionButtonContainer,
  StyledPlacementContainer,
} from './styled-components';
export * from './types';
/** @deprecated use Duration instead. To be removed in future versions.*/
export type DurationT = Duration;
/** @deprecated use Placement instead. To be removed in future versions.*/
export type PlacementT = Placement;
/** @deprecated use SnackbarElementOverrides instead. To be removed in future versions.*/
export type SnackbarElementOverridesT = SnackbarElementOverrides;
/** @deprecated use SnackbarElementProps instead. To be removed in future versions.*/
export type SnackbarElementPropsT = SnackbarElementProps;
/** @deprecated use SnackbarProviderProps instead. To be removed in future versions.*/
export type SnackbarProviderPropsT = SnackbarProviderProps;
