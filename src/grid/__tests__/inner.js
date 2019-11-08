/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

export default function Inner({style, ...props}) {
  return (
    <div
      style={{
        border: 'solid 1px black',
        padding: '8px',
        ...style,
      }}
      {...props}
    />
  );
}
