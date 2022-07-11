/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ReactNode } from 'react';
import type { OverrideT } from '../helpers/overrides';

export type ProgressStepsOverridesT = {
  Root?: OverrideT;
  StepRoot?: OverrideT;
  IconContainer?: OverrideT;
  Icon?: OverrideT;
  InnerIcon?: OverrideT;
  Tail?: OverrideT;
  Content?: OverrideT;
  Title?: OverrideT;
  Description?: OverrideT;
};

export type ProgressStepsPropsT = {
  overrides?: ProgressStepsOverridesT;
  children?: ReactNode;
  /** Defines the current active step index. */
  current: number;
};

export type StepOverridesT = {
  Root?: OverrideT;
  IconContainer?: OverrideT;
  Icon?: OverrideT;
  InnerIcon?: OverrideT;
  Tail?: OverrideT;
  Content?: OverrideT;
  Title?: OverrideT;
  Description?: OverrideT;
};

export type StepPropsT = {
  /** The title of the Step. */
  title?: ReactNode;
  /** Defines if the step is completed. Overriden by ProgressSteps, if used. */
  isCompleted: boolean;
  /** Defines if the step is currently active. */
  isActive?: boolean;
  /** Defines if the step is the last item displayed. Overriden by ProgressSteps, if used. */
  isLast: boolean;
  overrides?: StepOverridesT;
  children?: ReactNode;
};

export type NumberedStepOverridesT = {
  Root?: OverrideT;
  IconContainer?: OverrideT;
  Icon?: OverrideT;
  InnerIcon?: OverrideT;
  Tail?: OverrideT;
  Content?: OverrideT;
  Title?: OverrideT;
  Description?: OverrideT;
};

export type NumberedStepPropsT = {
  /** The title of the Step. */
  title?: string;
  /** Defines if the step is completed. */
  isCompleted: boolean;
  /** Defines if the step is currently active. */
  isActive?: boolean;
  /** Defines if the step is the last item displayed. */
  isLast: boolean;
  overrides?: NumberedStepOverridesT;
  children?: ReactNode;
  /** The number displayed as the step number */
  step?: ReactNode;
};

export type StylePropsT = {
  $isActive: boolean;
  $isCompleted: boolean;
  $disabled: boolean;
};
