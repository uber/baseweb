/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type FileUploaderLocaleT = {|
  dropFilesToUpload: string,
  or: string,
  browseFiles: string,
  retry: string,
  cancel: string,
|};

const locale = {
  dropFilesToUpload: 'Drop files here to upload',
  or: 'or',
  browseFiles: 'Browse files',
  retry: 'Retry Upload',
  cancel: 'Cancel',
};

export default locale;
