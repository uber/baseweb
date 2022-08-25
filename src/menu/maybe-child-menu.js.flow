/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import { NestedMenuContext } from './nested-menus.js';
import { Popover } from '../popover/index.js';
import type { OverrideT } from '../helpers/overrides.js';
import { getOverrides, mergeOverrides } from '../helpers/overrides.js';
import type { ItemT } from './types.js';

type PropsT = {
  children: React.Node,
  getChildMenu: ?(item: ItemT) => React.Node,
  isOpen: boolean,
  item: ItemT,
  resetParentMenu: () => void,
  renderAll?: boolean,
  onClick?: (event: MouseEvent) => mixed,
  overrides?: {
    ChildMenuPopover?: OverrideT,
  },
};

export default function MaybeChildMenu(props: PropsT) {
  if (!props.getChildMenu) {
    return props.children;
  }

  const ChildMenu = props.getChildMenu(props.item);
  if (!ChildMenu) {
    return props.children;
  }
  const { overrides = {} } = props;
  const [PopoverOverride, popoverProps] = getOverrides(overrides.ChildMenuPopover, Popover);

  return (
    <NestedMenuContext.Consumer>
      {(ctx) => {
        return (
          <PopoverOverride
            focusLock={false}
            autoFocus={false}
            isOpen={props.isOpen}
            renderAll={props.renderAll}
            content={ChildMenu}
            ignoreBoundary
            mountNode={ctx.mountRef.current ? ctx.mountRef.current : undefined}
            onClick={props.onClick}
            onMouseEnterDelay={30}
            onMouseLeaveDelay={30}
            onEsc={props.resetParentMenu}
            placement="rightTop"
            {...popoverProps}
            overrides={mergeOverrides(
              {
                Body: {
                  props: {
                    // Trap tabbing when focused on a child menu. Popover mounts the element at the end of
                    // the html body by default. If a user was to tab to the next element it would navigate
                    // to elements not within the immediate area surrounding the menu.
                    onKeyDown: (e: KeyboardEvent) => {
                      if (e.keyCode === 9) {
                        e.preventDefault();
                      }
                    },
                  },
                },
              },
              popoverProps.overrides
            )}
          >
            {props.children}
          </PopoverOverride>
        );
      }}
    </NestedMenuContext.Consumer>
  );
}
