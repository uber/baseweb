/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

export function withProps(Component: React.ComponentType<*>, customProps: {}) {
  return function withPropsHOC(props: {}) {
    return <Component {...customProps} {...props} />;
  };
}
