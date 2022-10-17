/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { NestedMenuContext } from './nested-menus';
import { Popover } from '../popover';
import type { Override } from '../helpers/overrides';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import type { Item } from './types';

type Props = {
  getChildMenu: ((item: Item) => React.ReactNode) | undefined | null;
  isOpen: boolean;
  item: Item;
  resetParentMenu: () => void;
  renderAll?: boolean;
  onClick?: (event: React.MouseEvent) => unknown;
  overrides?: {
    ChildMenuPopover?: Override;
  };
  children: React.ReactNode;
};

const MaybeChildMenu: React.FC<Props> = (props): React.ReactElement => {
  if (!props.getChildMenu) {
    // @ts-expect-error todo(flow->ts): children should be of type ReactElement or null
    return props.children;
  }

  const ChildMenu = props.getChildMenu(props.item);
  if (!ChildMenu) {
    // @ts-expect-error todo(flow->ts): children should be of type ReactElement or null
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
};
export default MaybeChildMenu;
