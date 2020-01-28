/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node} from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type ProgressStepsOverridesT = {
  Root?: OverrideT<*>,
  StepRoot?: OverrideT<*>,
  Icon?: OverrideT<*>,
  InnerIcon?: OverrideT<*>,
  Tail?: OverrideT<*>,
  Content?: OverrideT<*>,
  Title?: OverrideT<*>,
  Description?: OverrideT<*>,
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

export type StylePropsT = {
  $isActive: boolean,
  $isCompleted: boolean,
  $disabled: boolean,
};
