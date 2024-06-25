/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { DropzoneProps } from 'react-dropzone';
import type { DragEvent } from 'react';
import type { Override } from '../helpers/overrides';

export type StyleProps = {
  $afterFileDrop: boolean;
  $alt: string;
  $color: string;
  $disabled: boolean;
  $isDragActive: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
  $isFocused: boolean;
  $src: string;
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

export type FileUploaderProps = Omit<DropzoneProps, 'accept'> & {
  accept?: string[] | string;
  disableClick?: boolean;
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
