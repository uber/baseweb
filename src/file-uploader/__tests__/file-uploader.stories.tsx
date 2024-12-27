/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as FileUploaderDefault } from './file-uploader.scenario';
import { Scenario as FileUploaderItemPreview } from './file-uploader-item-preview.scenario';
import { Scenario as FileUploaderLabelHint } from './file-uploader-label-hint.scenario';
import { Scenario as FileUploaderLongLoading } from './file-uploader-long-loading.scenario';
import { Scenario as FileUploaderLongLoadingMultipleFiles } from './file-uploader-long-loading-multiple-files.scenario';
import { Scenario as FileUploaderOverrides } from './file-uploader-overrides.scenario';
import { Scenario as FileUploaderUploadRestrictions } from './file-uploader-upload-restrictions.scenario';

export const FileUploader = () => <FileUploaderDefault />;
export const ItemPreview = () => <FileUploaderItemPreview />;
export const LabelHint = () => <FileUploaderLabelHint />;
export const LongLoading = () => <FileUploaderLongLoading />;
export const LongLoadingMultipleFiles = () => <FileUploaderLongLoadingMultipleFiles />;
export const Overrides = () => <FileUploaderOverrides />;
export const UploadRestrictions = () => <FileUploaderUploadRestrictions />;
