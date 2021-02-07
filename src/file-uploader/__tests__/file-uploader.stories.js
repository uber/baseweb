/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import FileUploaderDisabled from './file-uploader-disabled.scenario.js';
import FileUploaderError from './file-uploader-error.scenario.js';
import FileUploaderPostDrop from './file-uploader-post-drop.scenario.js';
import FileUploaderPreDrop from './file-uploader-pre-drop.scenario.js';
import FileUploaderProgressBar from './file-uploader-progress-bar.scenario.js';
import FileUploaderSpinner from './file-uploader-spinner.scenario.js';
import FileUploaderDefault from './file-uploader.scenario.js';

export const Disabled = () => <FileUploaderDisabled />;
export const Error = () => <FileUploaderError />;
export const PostDrop = () => <FileUploaderPostDrop />;
export const PreDrop = () => <FileUploaderPreDrop />;
export const ProgressBar = () => <FileUploaderProgressBar />;
export const Spinner = () => <FileUploaderSpinner />;
export const FileUploader = () => <FileUploaderDefault />;
