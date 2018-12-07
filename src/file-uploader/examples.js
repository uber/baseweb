/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled} from '../styles/index.js';

import {FileUploader} from './index.js';
import examples from './examples-list.js';

export default {
  [examples.FILE_UPLOADER_EXAMPLE]: function AvatarStory() {
    return <FileUploader />;
  },

  [examples.FILE_UPLOADER_ACCEPT]: function AvatarStory() {
    return <FileUploader accept=".jpeg" />;
  },
};
