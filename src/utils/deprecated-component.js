/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

// eslint-disable-next-line flowtype/no-weak-types
export default function(Component: any, displayName: string) {
  // eslint-disable-next-line flowtype/no-weak-types
  return React.forwardRef<any, any>((props, ref) => {
    if (__DEV__) {
      console.warn(
        `We have stabilized the ${displayName} component, so you can drop the "Unstable_" prefix from your imports. We will remove the "Unstable_" exports soon, so please make these changes as soon as possible!`,
      );
    }
    return <Component {...props} ref={ref} />;
  });
}
