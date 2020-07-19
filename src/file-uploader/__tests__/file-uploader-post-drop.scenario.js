/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {FileUploader} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <p id="fileupload">upload</p>
      <FileUploader progressMessage="uploading..." progressAmount={40} />
    </React.Fragment>
  );
}
