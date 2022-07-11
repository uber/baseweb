/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Delete from '../icon/delete';

export function CloseIcon(props: { title: string }) {
  return <Delete size="inherit" color="inherit" title={props.title} />;
}
