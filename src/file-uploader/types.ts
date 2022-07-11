/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { OverrideT } from '../helpers/overrides';

import type {
  SyntheticEvent,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  DragEvent,
} from 'react';

export type StylePropsT = {
  $afterFileDrop: boolean;
  $isDisabled: boolean;
  $isDragActive: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
  $isFocused: boolean;
};

export type OverridesT = {
  Root?: OverrideT;
  FileDragAndDrop?: OverrideT;
  ContentMessage?: OverrideT;
  ContentSeparator?: OverrideT;
  HiddenInput?: OverrideT;
  ProgressMessage?: OverrideT;
  ErrorMessage?: OverrideT;
  ButtonComponent?: OverrideT;
  CancelButtonComponent?: OverrideT;
  RetryButtonComponent?: OverrideT;
  Spinner?: OverrideT;
  ProgressBar?: OverrideT;
};

export type PropsT = {
  // react-dropzone: https://github.com/react-dropzone/react-dropzone/blob/master/typings/react-dropzone.d.ts
  accept?: string | string[];
  /** Disallow clicking on the dropzone container to open file dialog */
  disableClick?: boolean;
  disabled?: boolean;
  getDataTransferItems?: GetDataTransferItemsT;
  maxSize?: number;
  minSize?: number;
  multiple?: boolean;
  name?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => unknown;
  onFocus?: (event: FocusEvent<HTMLElement>) => unknown;
  onBlur?: (event: FocusEvent<HTMLElement>) => unknown;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => unknown;
  onDragStart?: (event: DragEvent<HTMLElement>) => unknown;
  onDragEnter?: (event: DragEvent<HTMLElement>) => unknown;
  onDragOver?: (event: DragEvent<HTMLElement>) => unknown;
  onDragLeave?: (event: DragEvent<HTMLElement>) => unknown;
  onDrop?: DropFilesEventHandlerT;
  onDropAccepted?: DropFileEventHandlerT;
  onDropRejected?: DropFileEventHandlerT;
  onFileDialogCancel?: () => unknown;
  preventDropOnDocument?: boolean;
  'aria-describedby'?: string;
  // Error message to be displayed
  errorMessage?: string;
  onCancel?: () => unknown;
  onRetry?: () => unknown;
  overrides?: OverridesT;
  progressAmount?: number;
  progressMessage?: string;
};

export type DropFilesEventHandlerT = (
  accepted: File[],
  rejected: File[],
  event: DragEvent<HTMLElement>
) => unknown;

type DropFileEventHandlerT = (acceptedOrRejected: File[], event: DragEvent<HTMLElement>) => unknown;

type DataTransferEventT =
  | DragEvent<HTMLElement>
  | ChangeEvent<HTMLInputElement> //flowlint-line unclear-type:off
  | DragEvent<any>
  | SyntheticEvent<any>; //flowlint-line unclear-type:off

type GetDataTransferItemsT = (event: DataTransferEventT) => Promise<Array<File | DataTransferItem>>;
