/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Unstable_FileUploader} from './index.js';
import examples from './examples-list.js';

export default {
  [examples.FILE_UPLOADER_EXAMPLE]: function FileUploaderBasic() {
    return <Unstable_FileUploader />;
  },

  [examples.FILE_UPLOADER_ACCEPT]: function FileUploaderAccept() {
    return <Unstable_FileUploader accept=".jpeg" />;
  },

  [examples.FILE_UPLOADER_DISABLED]: function FileUploaderDisabled() {
    return <Unstable_FileUploader disabled />;
  },

  [examples.FILE_UPLOADER_OVERRIDES]: function FileUploaderOverrides() {
    return (
      <Unstable_FileUploader
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
