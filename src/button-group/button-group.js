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

function getBorderRadii(index, length) {
  if (index === 0) {
    return {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
  }

  if (index === length - 1) {
    return {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    };
  }

  return {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };
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
          isSelected: isSelected(props.selected, index),
          kind: props.kind,
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
          overrides: {
            BaseButton: {style: getBorderRadii(index, props.children.length)},
            ...child.props.overrides,
          },
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
