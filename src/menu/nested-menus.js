/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import type {NestedMenuRefT, NestedMenuContextT} from './types.js';

type StateT = {
  menus: NestedMenuRefT[],
};
type PropsT = {
  children: React.Node,
};

export const NestedMenuContext: React.Context<NestedMenuContextT> = React.createContext(
  {
    addMenuToNesting: () => {},
    removeMenuFromNesting: () => {},
    getParentMenu: () => {},
    getChildMenu: () => {},
    mountRef: {current: null},
  },
);

function isSame(a: ?HTMLElement, b: ?HTMLElement) {
  if (!a || !b) {
    return false;
  }

  return a.isSameNode(b);
}

export default class NestedMenus extends React.Component<PropsT, StateT> {
  state = {menus: []};
  mountRef = (React.createRef(): {current: HTMLElement | null});

  addMenuToNesting = (ref: NestedMenuRefT) => {
    // check offsetHeight to determine if component is visible in the dom (0 means hidden)
    // we need to do this so that when we renderAll, the hidden seo-only child-menus don't
    // register themselves which would break the nesting logic
    if (ref.current && ref.current.offsetHeight) {
      this.setState(state => {
        return {menus: [...state.menus, ref]};
      });
    }
  };

  removeMenuFromNesting = (ref: NestedMenuRefT) => {
    this.setState(state => {
      const nextMenus = state.menus
        .filter(r => r.current)
        .filter(r => !isSame(r.current, ref.current));
      return {menus: nextMenus};
    });
  };

  findMenuIndexByRef = (ref: NestedMenuRefT) => {
    return this.state.menus.findIndex(r => isSame(r.current, ref.current));
  };

  getParentMenu = (ref: NestedMenuRefT): ?NestedMenuRefT => {
    const index = this.findMenuIndexByRef(ref) - 1;
    return this.state.menus[index];
  };

  getChildMenu = (ref: NestedMenuRefT): ?NestedMenuRefT => {
    const index = this.findMenuIndexByRef(ref) + 1;
    return this.state.menus[index];
  };

  render() {
    return (
      <NestedMenuContext.Provider
        value={{
          addMenuToNesting: this.addMenuToNesting,
          removeMenuFromNesting: this.removeMenuFromNesting,
          getParentMenu: this.getParentMenu,
          getChildMenu: this.getChildMenu,
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
