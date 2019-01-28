/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type StylePropsT = {|
  $afterFileDrop: boolean,
  $isDisabled: boolean,
  $isDragActive: boolean,
  $isDragAccept: boolean,
  $isDragReject: boolean,
  $isFocused: boolean,
  $theme: ThemeT,
|};

export type OverridesT<T> = {|
  Root?: OverrideT<T>,
  FileDragAndDrop?: OverrideT<T>,
  ContentMessage?: OverrideT<T>,
  ContentSeparator?: OverrideT<T>,
  HiddenInput?: OverrideT<T>,
  ProgressMessage?: OverrideT<T>,
  ErrorMessage?: OverrideT<T>,
|};

export type PropsT = {|
  // react-dropzone: https://github.com/react-dropzone/react-dropzone/blob/master/typings/react-dropzone.d.ts
  accept?: string | string[],
  disableClick?: boolean,
  disabled?: boolean,
  getDataTransferItems?: GetDataTransferItemsT,
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

  // baseui
  errorMessage?: string,
  onCancel?: () => mixed,
  onRetry?: () => mixed,
  overrides?: OverridesT<StylePropsT>,
  progressAmount?: number,
  progressMessage?: string,
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

type DataTransferEventT =
  | SyntheticDragEvent<HTMLElement>
  | SyntheticInputEvent<HTMLInputElement>
  | SyntheticDragEvent<*>
  | SyntheticEvent<*>;
type GetDataTransferItemsT = (
  event: DataTransferEventT,
) => Promise<Array<File | DataTransferItem>>;
