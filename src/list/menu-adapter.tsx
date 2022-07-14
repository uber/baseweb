/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import ListItem from './list-item';
import type { MenuAdapterProps } from './types';
import { mergeOverrides } from '../helpers/overrides';

const MenuAdapter = React.forwardRef<HTMLLIElement, MenuAdapterProps>((props, ref) => {
  return (
    <ListItem
      ref={ref}
      sublist={props.sublist || props.$size === 'compact'}
      aria-label={props['aria-label']}
      aria-selected={props['aria-selected']}
      artwork={props.artwork}
      artworkSize={props.artworkSize}
      endEnhancer={props.endEnhancer}
      id={props.id}
      role={props.role}
      overrides={mergeOverrides(
        {
          Root: {
            props: {
              onMouseEnter: props.onMouseEnter,
              onClick: props.onClick,
            },
            style: ({ $theme }) => ({
              backgroundColor: props.$isHighlighted ? $theme.colors.menuFillHover : null,
              cursor: props.$disabled ? 'not-allowed' : 'pointer',
            }),
          },
        },
        props.overrides
      )}
    >
      {props.children}
    </ListItem>
  );
});
MenuAdapter.displayName = 'MenuAdapter';

export default MenuAdapter;
