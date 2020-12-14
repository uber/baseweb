/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {isFragment} from 'react-is';

export const flattenFragments = (
  children?: React.Node,
  ChildWrapper?: React.ComponentType<*>,
  depth: number = 0,
): React.Node[] =>
  React.Children.toArray(children).reduce(
    (acc: React.Node[], child: React.Node, i: number): React.Node[] => {
      if (isFragment(child)) {
        acc.push(
          // $FlowFixMe
          ...flattenFragments(child.props.children, ChildWrapper, depth + 1),
        );
      } else if (React.isValidElement(child)) {
        if (ChildWrapper) {
          acc.push(<ChildWrapper key={`${depth}.${i}`}>{child}</ChildWrapper>);
        } else {
          acc.push(child);
        }
      }
      return acc;
    },
    [],
  );
