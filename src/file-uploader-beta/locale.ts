/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type FileUploaderBetaLocale = {
  added: string;
  error: string;
  processed: string;
};

const locale = {
  added: 'Loading...',
  error: 'Upload failed: ',
  processed: 'Upload successful',
};

export default locale;
