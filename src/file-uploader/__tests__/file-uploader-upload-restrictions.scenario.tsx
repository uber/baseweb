/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { type FileRow, FileUploader } from '..';

export function Scenario() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);
  return (
    <FileUploader
      accept={['image/png', 'application/pdf']}
      fileRows={fileRows}
      hint={
        'Try uploading files that break these conditions: 1. accept set to ["image/png", "application/pdf"], 2. minSize set to 20000 bytes (20 KB), 3. maxSize set to 100000 bytes (100 KB), 4. maxFiles set to 3'
      }
      maxFiles={3}
      maxSize={100000}
      minSize={20000}
      setFileRows={setFileRows}
    />
  );
}
