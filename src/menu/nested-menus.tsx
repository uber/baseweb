/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import type { NestedMenuRefT, NestedMenuContextT } from './types';

type StateT = {
  nestedMenuHoverIndex: number;
  menus: NestedMenuRefT[];
};

type PropsT = {
  children: React.ReactNode;
};

export const NestedMenuContext: React.Context<NestedMenuContextT> = React.createContext({
  addMenuToNesting: () => {},
  removeMenuFromNesting: () => {},
  getParentMenu: () => {},
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

export default class NestedMenus extends React.Component<PropsT, StateT> {
  state = { menus: [], nestedMenuHoverIndex: -1 };
  mountRef = React.createRef() as {
    current: HTMLElement | null;
  };
  mouseLeaveTimeoueId = null;

  handleMenuMouseLeave = (event: MouseEvent) => {
    this.mouseLeaveTimeoueId = setTimeout(() => {
      this.setState({ nestedMenuHoverIndex: -1 });
    }, 200);
  };

  handleMenuMouseEnter = (event: MouseEvent) => {
    if (__BROWSER__) {
      clearTimeout(this.mouseLeaveTimeoueId);
      const index = this.state.menus.findIndex((m) => {
        return (
          m.current &&
          event.currentTarget instanceof Node &&
          m.current.contains(event.currentTarget)
        );
      });

      this.setState({ nestedMenuHoverIndex: index });
    }
  };

  addMenuToNesting = (ref: NestedMenuRefT) => {
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

  removeMenuFromNesting = (ref: NestedMenuRefT) => {
    this.setState((state) => {
      for (const r of this.state.menus) {
        if (r.current && isSame(r.current, ref.current)) {
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

  findMenuIndexByRef = (ref: NestedMenuRefT) => {
    return this.state.menus.findIndex((r) => isSame(r.current, ref.current));
  };

  getParentMenu = (ref: NestedMenuRefT): NestedMenuRefT | undefined | null => {
    const index = this.findMenuIndexByRef(ref) - 1;
    return this.state.menus[index];
  };

  getChildMenu = (ref: NestedMenuRefT): NestedMenuRefT | undefined | null => {
    const index = this.findMenuIndexByRef(ref) + 1;
    return this.state.menus[index];
  };

  isNestedMenuVisible = (ref: NestedMenuRefT): boolean => {
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
