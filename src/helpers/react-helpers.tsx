/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { isFragment } from 'react-is';

export const flattenFragments = (
  children?: React.ReactNode,
  ChildWrapper?: React.ComponentType<React.PropsWithChildren<{}>>,
  depth = 0
): React.ReactNode[] =>
  // @ts-ignore
  React.Children.toArray(children).reduce(
    (acc: React.ReactNode[], child: React.ReactNode, i: number): React.ReactNode[] => {
      if (isFragment(child)) {
        acc.push(...flattenFragments(child.props.children, ChildWrapper, depth + 1));
      } else if (React.isValidElement(child)) {
        if (ChildWrapper) {
          acc.push(<ChildWrapper key={`${depth}.${i}`}>{child}</ChildWrapper>);
        } else {
          acc.push(child);
        }
      }
      return acc;
    },
    []
  );
