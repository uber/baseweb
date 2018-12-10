/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type StylePropsT = {|
  $isDisabled: boolean,
  $isDragActive: boolean,
  $isDragAccept: boolean,
  $isDragReject: boolean,
  $isFocused: boolean,
  $theme: ThemeT,
|};

export type OverridesT<T> = {|
  FileDragAndDrop: OverrideT<T>,
|};

type DropFilesEventHandlerT = (
  accepted: File[],
  rejected: File[],
  event: SyntheticDragEvent<HTMLElement>,
) => mixed;

type DropFileEventHandlerT = (
  acceptedOrRejected: File[],
  event: SyntheticDragEvent<HTMLElement>,
) => mixed;

export type PropsT = {|
  accept?: string | string[],
  disableClick?: boolean,
  disabled?: boolean,
  getDataTransferItems?: (
    event:
      | SyntheticDragEvent<HTMLElement>
      | SyntheticInputEvent<HTMLInputElement>
      | SyntheticDragEvent<*>
      | SyntheticEvent<*>,
  ) => Promise<Array<File | DataTransferItem>>,
  maxSize?: number,
  minSize?: number,
  multiple?: boolean,
  name?: string,
  onClick?: (event: SyntheticMouseEvent<HTMLElement>) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  onBlur?: (event: SyntheticFocusEvent<HTMLElement>) => mixed,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLElement>) => mixed,
  onDragStart?: (event: SyntheticDragEvent<HTMLElement>) => mixed,
  onDragEnter?: (event: SyntheticDragEvent<HTMLElement>) => mixed,
  onDragOver?: (event: SyntheticDragEvent<HTMLElement>) => mixed,
  onDragLeave?: (event: SyntheticDragEvent<HTMLElement>) => mixed,
  onDrop?: DropFilesEventHandlerT,
  onDropAccepted?: DropFileEventHandlerT,
  onDropRejected?: DropFileEventHandlerT,
  onFileDialogCancel?: () => mixed,
  preventDropOnDocument?: boolean,
|};
