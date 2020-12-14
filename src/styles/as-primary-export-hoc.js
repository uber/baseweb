/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

// transforms props for native styled components adding $ symbol to avoid to supported warning
export default function asPrimaryExport(
  StyledComponent: React.ComponentType<*>,
  propsTransformNames: Array<string>,
) {
  return function withStyledPropsHOC(props: {}) {
    const styledProps = Object.keys(props).reduce((acc, key) => {
      if (key[0] === '$' || propsTransformNames.indexOf(key) < 0) {
        acc[key] = props[key];
      } else if (propsTransformNames.indexOf(key) >= 0) {
        acc['$' + key] = props[key];
      }
      return acc;
    }, {});
    return <StyledComponent {...styledProps} />;
  };
}
