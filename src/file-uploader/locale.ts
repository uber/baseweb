/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type FileUploaderLocale = {
  added: string;
  buttonText: string;
  contentMessage: string;
  error: string;
  processed: string;
};

const locale = {
  added: 'Description',
  buttonText: 'Browse files',
  contentMessage: 'or drop to upload',
  error: 'Upload failed: ',
  processed: 'Upload successful',
};

export default locale;
