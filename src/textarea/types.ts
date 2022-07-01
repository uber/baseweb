/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { OverrideT } from '../helpers/overrides';
import type { BaseInputPropsT, StateReducerT, StateT } from '../input/types';
import { ADJOINED, SIZE } from '../input/constants';

import type { SyntheticEvent } from 'react';

type SyntheticTextareaEvent = SyntheticEvent<HTMLTextAreaElement>;

export type SizeT = keyof typeof SIZE;

export type SharedStylePropsT = {
  $adjoined: keyof typeof ADJOINED;
  $disabled: boolean;
  $error: boolean;
  $isFocused: boolean;
  $isReadOnly: boolean;
  $positive?: boolean;
  $required: boolean;
  $size: SizeT;
};

type BaseTextAreaPropsT = BaseInputPropsT<HTMLTextAreaElement>;

export type TextareaOverridesT = {
  Root?: OverrideT;
} & BaseTextAreaPropsT['overrides'];

export type TextareaPropsT = {
  overrides?: TextareaOverridesT;
  /** Sets the size and number of visible text lines
   of the textarea element. */
  rows?: number;
  maxLength?: number;
} & BaseTextAreaPropsT;

export type StatefulContainerPropsT = {
  // flowlint-next-line unclear-type:off
  children: (props: any) => React.ReactNode;
  initialState?: StateT;
  stateReducer?: StateReducerT;
  onChange?: (e: SyntheticTextareaEvent) => unknown;
  onKeyDown?: (e: SyntheticTextareaEvent) => unknown;
  onKeyPress?: (e: SyntheticTextareaEvent) => unknown;
  onKeyUp?: (e: SyntheticTextareaEvent) => unknown;
};

type OmitPropsT = {
  // flowlint-next-line unclear-type:off
  children: (props: any) => React.ReactNode;
};

type FullStPropsT = TextareaPropsT & StatefulContainerPropsT;

export type StatefulTextareaPropsT = Partial<Omit<FullStPropsT, keyof OmitPropsT>>;
