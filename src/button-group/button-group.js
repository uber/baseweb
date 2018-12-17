/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';

import {StyledRoot} from './styled-components.js';
import type {PropsT} from './types.js';

function isSelected(selected, index) {
  if (!selected) {
    return false;
  }

  if (Array.isArray(selected)) {
    return selected.includes(index);
  }

  return selected === index;
}

export default function ButtonGroup(props: PropsT) {
  const {overrides = {}} = props;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

  return (
    <Root aria-label={props.ariaLabel} {...rootProps}>
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          disabled: props.disabled ? true : child.props.disabled,
          first: index === 0,
          kind: props.kind,
          last: index === props.children.length - 1,
          onClick: event => {
            if (props.disabled) {
              return;
            }

            if (child.props.onClick) {
              child.props.onClick(event);
            }

            if (props.onClick) {
              props.onClick(event, index);
            }
          },
          selected: isSelected(props.selected, index),
          shape: props.shape,
          size: props.size,
        });
      })}
    </Root>
  );
}

ButtonGroup.defaultProps = {
  ariaLabel: 'button group',
  disabled: false,
  kind: KIND.primary,
  onClick: () => {},
  shape: SHAPE.default,
  size: SIZE.default,
};
