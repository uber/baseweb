/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { FileUploader } from '../index.js';

export function Scenario() {
  return (
    <React.Fragment>
      <FileUploader progressMessage="uploading..." progressAmount={40} />
    </React.Fragment>
  );
}
