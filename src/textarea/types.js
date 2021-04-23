/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import type {BaseInputPropsT, StateReducerT, StateT} from '../input/types.js';
import {ADJOINED, SIZE} from '../input/constants.js';

type SyntheticTextareaEvent = SyntheticEvent<HTMLTextAreaElement>;

export type SizeT = $Keys<typeof SIZE>;

export type SharedStylePropsT = {
  $adjoined: $Keys<typeof ADJOINED>,
  $disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $positive?: boolean,
  $required: boolean,
  $size: SizeT,
};

type BaseTextAreaPropsT = BaseInputPropsT<HTMLTextAreaElement>;

export type TextareaOverridesT = {
  ...$PropertyType<BaseTextAreaPropsT, 'overrides'>,
  Root?: OverrideT,
};

export type TextareaPropsT = {
  ...BaseTextAreaPropsT,
  overrides?: TextareaOverridesT,
  /** Sets the size and number of visible text lines
   of the textarea element. */
  rows?: number,
  maxLength?: number,
};

export type StatefulContainerPropsT = {
  children: (props: *) => React.Node,
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onChange?: (e: SyntheticTextareaEvent) => mixed,
  onKeyDown?: (e: SyntheticTextareaEvent) => mixed,
  onKeyPress?: (e: SyntheticTextareaEvent) => mixed,
  onKeyUp?: (e: SyntheticTextareaEvent) => mixed,
};

type OmitPropsT = {
  children: (props: *) => React.Node,
};

type FullStPropsT = TextareaPropsT & StatefulContainerPropsT;

export type StatefulTextareaPropsT = $Shape<$Diff<FullStPropsT, OmitPropsT>>;
