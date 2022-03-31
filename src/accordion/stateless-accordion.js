/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import { getOverrides } from '../helpers/overrides.js';
import { Root as StyledRoot } from './styled-components.js';
import type { StatelessAccordionPropsT } from './types.js';

function StatelessAccordion({
  accordion = true,
  children,
  disabled,
  expanded,
  onChange,
  overrides = {},
  renderAll,
  renderPanelContent,
}: StatelessAccordionPropsT) {
  const { Root: RootOverrides, ...PanelOverrides } = overrides;
  const [Root, rootProps] = getOverrides(RootOverrides, StyledRoot);
  const itemRefs = React.useRef([]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) {
      return;
    }

    const HOME = 36;
    const END = 35;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;

    if (e.keyCode === HOME) {
      e.preventDefault();
      const firstItem = itemRefs.current[0];
      firstItem?.focus();
    }
    if (e.keyCode === END) {
      e.preventDefault();
      const lastItem = itemRefs.current[itemRefs.current.length - 1];
      lastItem?.focus();
    }
    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      const activeItemIdx = itemRefs.current.findIndex((item) => item === document.activeElement);
      if (activeItemIdx > 0) {
        const prevItem = itemRefs.current[activeItemIdx - 1];
        prevItem?.focus();
      }
    }
    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      const activeItemIdx = itemRefs.current.findIndex((item) => item === document.activeElement);
      if (activeItemIdx < itemRefs.current.length - 1) {
        const nextItem = itemRefs.current[activeItemIdx + 1];
        nextItem?.focus();
      }
    }
  };

  return (
    <Root data-baseweb="accordion" onKeyDown={handleKeyDown} {...rootProps}>
      {React.Children.map(children, (child, index) => {
        const key = child.key || String(index);
        return React.cloneElement(child, {
          disabled: child.props.disabled || disabled,
          expanded: expanded.includes(key),
          ref: (element) => itemRefs.current.push(element),
          key,
          onChange:
            // Don't bother constructing the wrapper function if no one is listening
            onChange && typeof onChange === 'function'
              ? () => {
                  let next;
                  if (accordion) {
                    if (expanded.includes(key)) {
                      next = [];
                    } else {
                      next = [key];
                    }
                  } else {
                    if (expanded.includes(key)) {
                      next = expanded.filter((k) => k !== key);
                    } else {
                      next = [...expanded, key];
                    }
                  }
                  onChange({ key, expanded: next });
                }
              : onChange,
          overrides: child.props.overrides || PanelOverrides,
          renderAll,
          renderPanelContent,
        });
      })}
    </Root>
  );
}

export default StatelessAccordion;
