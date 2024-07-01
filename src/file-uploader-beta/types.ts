/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import type { FILE_STATUS } from './constants';
import type {
  FileUploaderOverrides,
  FileUploaderProps,
  StyleProps as FileUploaderBasicStyleProps,
} from '../file-uploader/types';

export type StyleProps = FileUploaderBasicStyleProps & {
  $alt: string;
  $color: string;
  $fileCount: number;
  $src: string;
};

export type FileUploaderBetaOverrides = {
  AlertIcon?: Override;
  CircleCheckFilledIcon?: Override;
  FileRow?: Override;
  FileRowColumn?: Override;
  FileRowContent?: Override;
  FileRowFileName?: Override;
  FileRowText?: Override;
  FileRowUploadMessage?: Override;
  FileRowUploadText?: Override;
  FileRows?: Override;
  Hint?: Override;
  ImagePreviewThumbnail?: Override;
  ItemPreviewContainer?: Override;
  Label?: Override;
  PaperclipFilledIcon?: Override;
  ParentRoot?: Override;
  TrashCanFilledIcon?: Override;
  TrashCanFilledIconContainer?: Override;
};

export type FileRow = {
  errorMessage: string | null;
  file: File;
  // fileInfo is the result of the processFileOnDrop function
  // TODO: switch to leverage a generic <T> so applications can define the shape of fileInfo
  fileInfo?: any;
  imagePreviewThumbnail?: any;
  /** Defines the status of a file */
  status: keyof typeof FILE_STATUS;
};

export type FileUploaderBetaProps = Omit<
  FileUploaderProps,
  'onDrop' | 'onDropAccepted' | 'onDropRejected' | 'overrides'
> & {
  fileRows: FileRow[];
  hint?: string;
  itemPreview?: boolean;
  label?: string;
  maxFiles?: number;
  overrides?: FileUploaderOverrides & FileUploaderBetaOverrides;
  /** Function to run on each file, returns "errorMessage: null" on success and "errorMessage: string" for failures */
  processFileOnDrop?: (file: File) => Promise<{ errorMessage: string | null; fileInfo?: any }>;
  setFileRows: (fileRows: FileRow[]) => void;
};
