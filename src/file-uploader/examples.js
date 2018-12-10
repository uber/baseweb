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
  [examples.FILE_UPLOADER_EXAMPLE]: function FileUploaderBasic() {
    return <FileUploader />;
  },

  [examples.FILE_UPLOADER_ACCEPT]: function FileUploaderAccept() {
    return <FileUploader accept=".jpeg" />;
  },

  [examples.FILE_UPLOADER_DISABLED]: function FileUploaderDisabled() {
    return <FileUploader disabled />;
  },

  [examples.FILE_UPLOADER_OVERRIDES]: function FileUploaderOverrides() {
    return (
      <FileUploader
        overrides={{
          FileDragAndDrop: {
            style: props => ({
              borderColor: props.$isDragActive
                ? props.$theme.colors.positive
                : props.$theme.colors.warning,
            }),
          },
          ContentMessage: {
            style: props => ({
              color: props.$theme.colors.warning,
            }),
          },
          ContentSeparator: {
            style: props => ({
              color: props.$theme.colors.warning,
            }),
          },
        }}
      />
    );
  },
};
