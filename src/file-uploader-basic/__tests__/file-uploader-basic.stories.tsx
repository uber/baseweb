/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as FileUploaderBasicDisabled } from './file-uploader-basic-disabled.scenario';
import { Scenario as FileUploaderBasicError } from './file-uploader-basic-error.scenario';
import { Scenario as FileUploaderBasicPostDrop } from './file-uploader-basic-post-drop.scenario';
import { Scenario as FileUploaderBasicPreDrop } from './file-uploader-basic-pre-drop.scenario';
import { Scenario as FileUploaderBasicProgressBar } from './file-uploader-basic-progress-bar.scenario';
import { Scenario as FileUploaderBasicSpinner } from './file-uploader-basic-spinner.scenario';
import { Scenario as FileUploaderBasicDefault } from './file-uploader-basic.scenario';

export const Disabled = () => <FileUploaderBasicDisabled />;
export const Error = () => <FileUploaderBasicError />;
export const PostDrop = () => <FileUploaderBasicPostDrop />;
export const PreDrop = () => <FileUploaderBasicPreDrop />;
export const ProgressBar = () => <FileUploaderBasicProgressBar />;
export const Spinner = () => <FileUploaderBasicSpinner />;
export const FileUploader = () => <FileUploaderBasicDefault />;
