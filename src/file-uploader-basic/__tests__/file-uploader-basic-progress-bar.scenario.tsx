/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { FileUploaderBasic } from '..';

export function Scenario() {
  return <FileUploaderBasic progressAmount={40} progressMessage="Uploading... 8.24 of 45.08MB" />;
}
