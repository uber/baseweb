/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { isElement, isPortal } from 'react-is';
import { getOverrides } from '../helpers/overrides';
import { Root as StyledRoot } from './styled-components';
import type { StatelessAccordionProps } from './types';

function StatelessAccordion({
  accordion = true,
  children,
  disabled,
  expanded,
  onChange,
  overrides = {},
  renderAll,
}: StatelessAccordionProps) {
  const { Root: RootOverrides, ...PanelOverrides } = overrides;
  const [Root, rootProps] = getOverrides(RootOverrides, StyledRoot);
  return (
    <Root data-baseweb="accordion" {...rootProps}>
      {React.Children.map(children, (child, index) => {
        let normalizedChild =
          isElement(child) || isPortal(child) ? (
            child
          ) : (
            // if primitive value - wrap it in a fragment
            <>{child}</>
          );
        const key = normalizedChild.key || String(index);
        return React.cloneElement(normalizedChild, {
          disabled: normalizedChild.props.disabled || disabled,
          expanded: expanded.includes(key),
          key,
          onChange:
            // Don't bother constructing the wrapper function if no one is listening
            onChange && typeof onChange === 'function'
              ? () => {
                  // @ts-ignore
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
                  // @ts-ignore
                  onChange({ key, expanded: next });
                }
              : onChange,
          overrides: normalizedChild.props.overrides || PanelOverrides,
          renderAll,
        });
      })}
    </Root>
  );
}

export default StatelessAccordion;
