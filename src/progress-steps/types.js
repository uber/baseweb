/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type ProgressStepsOverridesT = {
  Root?: OverrideT<*>,
};

export type ProgressStepsPropsT = {
  overrides?: ProgressStepsOverridesT,
  children?: Node,
  /** Defines the current active step index. */
  current: number,
};

export type StepOverridesT = {
  Root?: OverrideT<*>,
  Icon?: OverrideT<*>,
  InnerIcon?: OverrideT<*>,
  Tail?: OverrideT<*>,
  Content?: OverrideT<*>,
  Title?: OverrideT<*>,
  Description?: OverrideT<*>,
};

export type StepPropsT = {
  /** The title of the Step. */
  title?: Node,
  /** Defines if the step is completed. */
  isCompleted: boolean,
  /** Defines if the step is currently active. */
  isActive: boolean,
  /** Defines if the step is the last item displayed. */
  isLast: boolean,
  overrides?: StepOverridesT,
  children?: Node,
};

export type StyledProgressStepsPropsT = {
  $theme: ThemeT,
};

export type StyledStepPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isCompleted: boolean,
};

export type NumberedStepOverridesT = {
  Root?: OverrideT<*>,
  Icon?: OverrideT<*>,
  InnerIcon?: OverrideT<*>,
  Tail?: OverrideT<*>,
  Content?: OverrideT<*>,
  Title?: OverrideT<*>,
  Description?: OverrideT<*>,
};

export type NumberedStepPropsT = {
  /** The title of the Step. */
  title?: string,
  /** Defines if the step is completed. */
  isCompleted: boolean,
  /** Defines if the step is currently active. */
  isActive: boolean,
  /** Defines if the step is the last item displayed. */
  isLast: boolean,
  overrides?: NumberedStepOverridesT,
  children?: Node,
  /** The number displayed as the step number */
  step?: Node,
};

export type StyledNumberIconPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isCompleted: boolean,
  $disabled: boolean,
};

export type StyledNumberContentTailPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isCompleted: boolean,
  $disabled: boolean,
};

export type StyledNumberStepPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isCompleted: boolean,
  $disabled: boolean,
};
