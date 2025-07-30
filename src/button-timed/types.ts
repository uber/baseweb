/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { BaseButtonProps, ButtonOverrides } from '../button';
import type { Override } from '../helpers/overrides';

export type ButtonTimedOverrides = ButtonOverrides & {
  TimerContainer?: Override;
};

export type ButtonTimedProps = Omit<BaseButtonProps, 'shape' | 'size' | 'onClick' | 'overrides'> & {
  initialTime: number; // in seconds
  paused?: boolean;
  onClick: (a?: React.SyntheticEvent<HTMLButtonElement>) => unknown;
  overrides?: ButtonTimedOverrides;
};
