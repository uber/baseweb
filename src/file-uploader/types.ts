/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';

import type {
  SyntheticEvent,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  DragEvent,
} from 'react';

export type StyleProps = {
  $afterFileDrop: boolean;
  $isDisabled: boolean;
  $isDragActive: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
  $isFocused: boolean;
};

export type FileUploaderOverrides = {
  Root?: Override;
  FileDragAndDrop?: Override;
  ContentMessage?: Override;
  ContentSeparator?: Override;
  HiddenInput?: Override;
  ProgressMessage?: Override;
  ErrorMessage?: Override;
  ButtonComponent?: Override;
  CancelButtonComponent?: Override;
  RetryButtonComponent?: Override;
  Spinner?: Override;
  ProgressBar?: Override;
};

export type FileUploaderProps = {
  // react-dropzone: https://github.com/react-dropzone/react-dropzone/blob/master/typings/react-dropzone.d.ts
  accept?: string | string[];
  /** Disallow clicking on the dropzone container to open file dialog */
  disableClick?: boolean;
  disabled?: boolean;
  getDataTransferItems?: GetDataTransferItems;
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
  onDrop?: DropFilesEventHandler;
  onDropAccepted?: DropFileEventHandler;
  onDropRejected?: DropFileEventHandler;
  onFileDialogCancel?: () => unknown;
  preventDropOnDocument?: boolean;
  'aria-describedby'?: string;
  // Error message to be displayed
  errorMessage?: string;
  onCancel?: () => unknown;
  onRetry?: () => unknown;
  overrides?: FileUploaderOverrides;
  progressAmount?: number;
  progressMessage?: string;
};

export type DropFilesEventHandler = (
  accepted: File[],
  rejected: File[],
  event: DragEvent<HTMLElement>
) => unknown;

type DropFileEventHandler = (acceptedOrRejected: File[], event: DragEvent<HTMLElement>) => unknown;

type DataTransferEvent =
  | DragEvent<HTMLElement>
  | ChangeEvent<HTMLInputElement> //flowlint-line unclear-type:off
  | DragEvent<any>
  | SyntheticEvent<any>; //flowlint-line unclear-type:off

type GetDataTransferItems = (event: DataTransferEvent) => Promise<Array<File | DataTransferItem>>;
