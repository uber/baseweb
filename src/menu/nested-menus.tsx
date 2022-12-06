/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import type { NestedMenuRef, NestedMenuContextProps } from './types';

export type NestedMenuState = {
  nestedMenuHoverIndex: number;
  menus: NestedMenuRef[];
};

export type NestedMenuProps = {
  children: React.ReactNode;
};

export const NestedMenuContext = React.createContext<NestedMenuContextProps>({
  addMenuToNesting: () => {},
  removeMenuFromNesting: () => {},
  // @ts-expect-error todo(flow->ts): incorrect default value
  getParentMenu: () => {},
  // @ts-expect-error todo(flow->ts): incorrect default value
  getChildMenu: () => {},
  nestedMenuHoverIndex: -1,
  isNestedMenuVisible: () => false,
  mountRef: { current: null },
});

function isSame(a?: HTMLElement | null, b?: HTMLElement | null) {
  if (!a || !b) {
    return false;
  }

  return a.isSameNode(b);
}

export default class NestedMenus extends React.Component<NestedMenuProps, NestedMenuState> {
  // @ts-ignore
  state = { menus: [], nestedMenuHoverIndex: -1 };
  mountRef = React.createRef() as {
    current: HTMLElement | null;
  };
  // @ts-ignore
  mouseLeaveTimeoueId = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMenuMouseLeave = (event: MouseEvent) => {
    // @ts-ignore
    this.mouseLeaveTimeoueId = setTimeout(() => {
      this.setState({ nestedMenuHoverIndex: -1 });
    }, 200);
  };

  handleMenuMouseEnter = (event: MouseEvent) => {
    if (__BROWSER__) {
      // @ts-ignore
      clearTimeout(this.mouseLeaveTimeoueId);
      const index = this.state.menus.findIndex((m) => {
        return (
          // @ts-ignore
          m.current &&
          event.currentTarget instanceof Node &&
          // @ts-ignore
          m.current.contains(event.currentTarget)
        );
      });

      this.setState({ nestedMenuHoverIndex: index });
    }
  };

  addMenuToNesting = (ref: NestedMenuRef) => {
    // check offsetHeight to determine if component is visible in the dom (0 means hidden)
    // we need to do this so that when we renderAll, the hidden seo-only child-menus don't
    // register themselves which would break the nesting logic
    const element = ref.current;
    if (element && element.offsetHeight) {
      element.addEventListener('mouseenter', this.handleMenuMouseEnter);
      element.addEventListener('mouseleave', this.handleMenuMouseLeave);

      this.setState((state) => {
        return { menus: [...state.menus, ref] };
      });
    }
  };

  removeMenuFromNesting = (ref: NestedMenuRef) => {
    this.setState((state) => {
      for (const r of this.state.menus) {
        // @ts-ignore
        if (r.current && isSame(r.current, ref.current)) {
          // @ts-ignore
          const element = r.current;
          element.removeEventListener('mouseenter', this.handleMenuMouseEnter);
          element.removeEventListener('mouseleave', this.handleMenuMouseLeave);
        }
      }

      const nextMenus = state.menus.filter((r) => {
        return r.current && !isSame(r.current, ref.current);
      });

      return { menus: nextMenus };
    });
  };

  findMenuIndexByRef = (ref: NestedMenuRef) => {
    // @ts-ignore
    return this.state.menus.findIndex((r) => isSame(r.current, ref.current));
  };

  getParentMenu = (ref: NestedMenuRef): NestedMenuRef | undefined | null => {
    const index = this.findMenuIndexByRef(ref) - 1;
    return this.state.menus[index];
  };

  getChildMenu = (ref: NestedMenuRef): NestedMenuRef | undefined | null => {
    const index = this.findMenuIndexByRef(ref) + 1;
    return this.state.menus[index];
  };

  isNestedMenuVisible = (ref: NestedMenuRef): boolean => {
    const index = this.findMenuIndexByRef(ref);
    return index <= this.state.nestedMenuHoverIndex;
  };

  render() {
    return (
      <NestedMenuContext.Provider
        value={{
          addMenuToNesting: this.addMenuToNesting,
          removeMenuFromNesting: this.removeMenuFromNesting,
          getParentMenu: this.getParentMenu,
          getChildMenu: this.getChildMenu,
          isNestedMenuVisible: this.isNestedMenuVisible,
          nestedMenuHoverIndex: this.state.nestedMenuHoverIndex,
          mountRef: this.mountRef,
        }}
      >
        <React.Fragment>
          {this.props.children}
          <span ref={this.mountRef} />
        </React.Fragment>
      </NestedMenuContext.Provider>
    );
  }
}
