/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {BaseInputPropsT, StateReducerT, StateT} from '../input/types.js';
import {SIZE} from '../input/constants.js';
import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/types.js';

type SyntheticTextareaEvent = SyntheticEvent<HTMLTextAreaElement>;

export type SizeT = $Keys<typeof SIZE>;

export type SharedStylePropsT = {
  $theme: ThemeT,
};

export type TextareaComponentsT = {
  InputContainer?: OverrideT<SharedStylePropsT>,
  Input?: OverrideT<SharedStylePropsT>,
};

export type TextareaPropsT = {
  ...BaseInputPropsT<HTMLTextAreaElement>,
  components?: TextareaComponentsT,
  rows?: number,
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

export type StatefulTextareaPropsT = $Diff<FullStPropsT, OmitPropsT>;
