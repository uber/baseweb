/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
const FloatingMarkerContainer = ({children}: {children: React.Node}) => {
  return (
    <div
      style={{
        height: 128,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      {children}
    </div>
  );
};
export default FloatingMarkerContainer;
