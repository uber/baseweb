/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ReactNode } from 'react';
import type { Override } from '../helpers/overrides';
import type { ORIENTATION } from './constants';

export type Orientation = keyof typeof ORIENTATION;

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
  /** when true, the description of a step will continue to be displayed even after the step is completed. */
  alwaysShowDescription?: boolean;
  orientation?: Orientation;
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
  isCurrent?: boolean;
  isRightBeforeActive?: boolean;
  /** Defines if the step is the last item displayed. Overriden by ProgressSteps, if used. */
  isLast?: boolean;
  /** when true, the step's description will continue to be displayed even after the step is completed. */
  alwaysShowDescription?: boolean;
  overrides?: StepOverrides;
  children?: ReactNode;
  orientation?: Orientation;
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
  /** Defines if the step is the next one to be completed. */
  isCurrent?: boolean;
  /** Defines if the step is currently active. */
  isActive?: boolean;
  /** Defines if the step immediately precedes the active step. */
  isRightBeforeActive?: boolean;
  /** Defines if the step is the last item displayed. */
  isLast?: boolean;
  /** when true, the step's description will continue to be displayed even after the step is completed. */
  alwaysShowDescription?: boolean;
  overrides?: NumberedStepOverrides;
  children?: ReactNode;
  /** The number displayed as the step number */
  step?: ReactNode;
  orientation?: Orientation;
};

export type StyleProps = {
  $isActive?: boolean;
  $isRightBeforeActive?: boolean;
  $isCurrent?: boolean;
  $isCompleted?: boolean;
  $disabled?: boolean;
  $orientation?: Orientation;
};
