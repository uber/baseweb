/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { KIND, SIZE } from '../tag';
import { getOverrides } from '../helpers/overrides';

import { StyledRoot } from './styled-components';
import type { TagGroupProps } from './types';

const TagGroup = React.forwardRef<HTMLDivElement, TagGroupProps>((props, ref) => {
  const {
    children,
    wrap = true,
    hierarchy = KIND.primary,
    size = SIZE.small,
    overrides = {},
  } = props;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const styleProps = {
    $wrap: wrap,
  };

  return (
    <Root ref={ref} {...styleProps} {...rootProps}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          hierarchy,
          size,
          // All tags in tag group are display only
          onActionClick: undefined,
          onActionKeyDown: undefined,
          onClick: undefined,
          onKeyDown: undefined,
          closeable: false,
          overrides: {
            Root: {
              style: {
                // Single Tag has default margin, reset it to 0 in TagGroup
                margin: 0,
                ...(wrap ? { maxWidth: '100%' } : {}), // ensure wrapping works correctly even if Tag itself has a custom maxWidth(Tag has a default maxWidth 128px on Text inside)
                ...child.props.overrides?.Root?.style,
              },
              ...child.props.overrides?.Root,
            },
            ...child.props.overrides,
          },
        });
      })}
    </Root>
  );
});

TagGroup.displayName = 'TagGroup';

export default TagGroup;
