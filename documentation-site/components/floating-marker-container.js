/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { useStyletron } from 'baseui';

const FloatingMarkerContainer = ({ children }: { children: React.Node }) => {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        height: `${128}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: `${16}px`,
      })}
    >
      {children}
    </div>
  );
};
export default FloatingMarkerContainer;
