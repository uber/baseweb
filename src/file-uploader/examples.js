/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/* eslint-disable no-console */

import * as React from 'react';

import {Unstable_FileUploader} from './index.js';
import examples from './examples-list.js';

export default {
  [examples.FILE_UPLOADER_EXAMPLE]: function FileUploaderBasic() {
    return (
      <React.Fragment>
        <Unstable_FileUploader />

        <br />
        <Unstable_FileUploader
          progressAmount={40}
          progressMessage="Uploading... 8.24 of 45.08MB"
          onCancel={() => console.log('cancel')}
          onRetry={() => console.log('retry')}
        />

        <br />
        <Unstable_FileUploader
          progressAmount={40}
          progressMessage="Uploading... 8.24 of 45.08MB"
          errorMessage="Upload failed... connection was lost."
          onCancel={() => console.log('cancel')}
          onRetry={() => console.log('retry')}
        />

        <br />
        <Unstable_FileUploader
          progressMessage="Uploading... hang tight."
          onCancel={() => console.log('cancel')}
          onRetry={() => console.log('retry')}
        />
      </React.Fragment>
    );
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
