/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { type FileRow, FileUploader } from '..';

export function Scenario() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);
  return <FileUploader fileRows={fileRows} setFileRows={setFileRows} />;
}
