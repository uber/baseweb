/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Root as StyledRoot} from './styled-components.js';
import type {StatelessAccordionPropsT} from './types.js';

function StatelessAccordion({
  accordion = true,
  children,
  disabled,
  expanded,
  onChange,
  overrides = {},
  renderAll,
}: StatelessAccordionPropsT) {
  const {Root: RootOverrides, ...PanelOverrides} = overrides;
  const [Root, rootProps] = getOverrides(RootOverrides, StyledRoot);
  return (
    <Root data-baseweb="accordion" {...rootProps}>
      {React.Children.map(children, (child, index) => {
        const key = child.key || String(index);
        return React.cloneElement(child, {
          disabled: child.props.disabled || disabled,
          expanded: expanded.includes(key),
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
                  onChange({key, expanded: next});
                }
              : onChange,
          overrides: child.props.overrides || PanelOverrides,
          renderAll,
        });
      })}
    </Root>
  );
}

export default StatelessAccordion;
