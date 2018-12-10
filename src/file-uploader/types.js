/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type InputEventT = SyntheticInputEvent<HTMLInputElement>;

export type StylePropsT = {|
  $disabled: boolean,
  $multi: boolean,
  $isDragActive: boolean,
  $isFocused: boolean,
  $error: boolean,
  $theme: ThemeT,
|};

export type OverridesT<T> = {|
  Root: OverrideT<T>,
  ContentContainer: OverrideT<T>,
  FileDragAndDrop: OverrideT<T>,
  FileSelectButton: OverrideT<T>,
  Input: OverrideT<T>,
|};

export type PropsT = {|
  accept?: string,
  disabled?: boolean,
  multi?: boolean,
  onChange?: ({
    acceptedFiles: File[],
    rejectedFiles: File[],
    event: SyntheticEvent<HTMLElement>,
  }) => void,
  onFileRemove?: ({file: File, event: InputEventT}) => void,
  overrides?: OverridesT<StylePropsT>,
|};
