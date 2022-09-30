/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ButtonProps, ButtonOverrides } from '../button';
import type { Override } from '../helpers/overrides';

export type ButtonTimedOverrides = ButtonOverrides & {
  TimerContainer?: Override;
};

export type ButtonTimedProps = Omit<
  ButtonProps,
  'kind' | 'shape' | 'size' | 'onClick' | 'overrides'
> & {
  initialTime: number;
  timeRemaining: number;
  onClick: (a?: React.SyntheticEvent<HTMLButtonElement>) => unknown;
  overrides?: ButtonTimedOverrides;
};
