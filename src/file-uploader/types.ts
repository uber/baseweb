/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';
import type { FILE_STATUS } from './constants';
import type {
  FileUploaderBasicOverrides,
  FileUploaderBasicProps,
  StyleProps as FileUploaderBasicStyleProps,
} from '../file-uploader-basic/types';

export type StyleProps = FileUploaderBasicStyleProps & {
  $alt: string;
  $color: string;
  $fileCount: number;
  $src: string;
};

export type FileUploaderOverrides = {
  CircleCheckFilledIcon?: Override;
  CircleExclamationPointFilledIcon?: Override;
  DeleteButtonComponent?: Override;
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
};

export type FileRow = {
  errorMessage: string | null;
  file: File;
  id: string;
  // fileInfo is the result of the processFileOnDrop function
  // TODO: switch to leverage a generic <T> so applications can define the shape of fileInfo
  fileInfo?: any;
  imagePreviewThumbnail?: any;
  /** Defines the status of a file */
  status: keyof typeof FILE_STATUS;
};

export type FileUploaderProps = Omit<
  FileUploaderBasicProps,
  'onDrop' | 'onDropAccepted' | 'onDropRejected' | 'overrides'
> & {
  fileRows: FileRow[];
  hint?: string;
  itemPreview?: boolean;
  label?: string;
  maxFiles?: number;
  overrides?: FileUploaderBasicOverrides & FileUploaderOverrides;
  /** Function to run on each file, returns "errorMessage: null" on success and "errorMessage: string" for failures */
  processFileOnDrop?: (file: File) => Promise<{ errorMessage: string | null; fileInfo?: any }>;
  setFileRows: (fileRows: FileRow[]) => void;
};
