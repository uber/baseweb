/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ReactNode } from 'react';
import type { Override } from '../helpers/overrides';

export type ProgressStepsOverrides = {
  Root?: Override;
  StepRoot?: Override;
  IconContainer?: Override;
  Icon?: Override;
  InnerIcon?: Override;
  Tail?: Override;
  Content?: Override;
  Title?: Override;
  Description?: Override;
};

export type ProgressStepsProps = {
  overrides?: ProgressStepsOverrides;
  children?: ReactNode;
  /** Defines the current active step index. */
  current?: number;
};

export type StepOverrides = {
  Root?: Override;
  IconContainer?: Override;
  Icon?: Override;
  InnerIcon?: Override;
  Tail?: Override;
  Content?: Override;
  Title?: Override;
  Description?: Override;
};

export type StepProps = {
  /** The title of the Step. */
  title?: ReactNode;
  /** Defines if the step is completed. Overriden by ProgressSteps, if used. */
  isCompleted?: boolean;
  /** Defines if the step is currently active. */
  isActive?: boolean;
  /** Defines if the step is the last item displayed. Overriden by ProgressSteps, if used. */
  isLast?: boolean;
  overrides?: StepOverrides;
  children?: ReactNode;
};

export type NumberedStepOverrides = {
  Root?: Override;
  IconContainer?: Override;
  Icon?: Override;
  InnerIcon?: Override;
  Tail?: Override;
  Content?: Override;
  Title?: Override;
  Description?: Override;
};

export type NumberedStepProps = {
  /** The title of the Step. */
  title?: ReactNode;
  /** Defines if the step is completed. */
  isCompleted?: boolean;
  /** Defines if the step is currently active. */
  isActive?: boolean;
  /** Defines if the step is the last item displayed. */
  isLast?: boolean;
  overrides?: NumberedStepOverrides;
  children?: ReactNode;
  /** The number displayed as the step number */
  step?: ReactNode;
};

export type StyleProps = {
  $isActive?: boolean;
  $isCompleted?: boolean;
  $disabled?: boolean;
};
