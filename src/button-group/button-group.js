/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';

import {StyledRoot} from './styled-components.js';
import type {PropsT} from './types.js';
import type {ButtonGroupLocaleT} from './locale.js';

function isSelected(selected, index) {
  if (!Array.isArray(selected) && typeof selected !== 'number') {
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

type LocaleT = {|locale?: ButtonGroupLocaleT|};
export function ButtonGroupRoot(props: {|...PropsT, ...LocaleT|}) {
  const {overrides = {}} = props;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

  return (
    <Root
      aria-label={
        props.ariaLabel || (props.locale ? props.locale.ariaLabel : '')
      }
      data-baseweb="button-group"
      {...rootProps}
    >
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          disabled: props.disabled || child.props.disabled,
          isSelected: isSelected(props.selected, index),
          kind: KIND.tertiary,
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
            BaseButton: {
              style: getBorderRadii(index, props.children.length),
            },
            ...child.props.overrides,
          },
          shape: props.shape,
          size: props.size,
        });
      })}
    </Root>
  );
}

// The wrapper component below was created to continue to support enzyme tests for the ButtonGroup
// component. Enzyme at the moment does not support React context @ 16.3. To get around the limitation
// in enzyme, we create a wrapper around the core ButtonGroup and pass context as a prop. In our tests,
// only ButtonGroupRoot will be tested.
// https://github.com/airbnb/enzyme/issues/1908#issuecomment-439747826
export default function ButtonGroup(props: PropsT) {
  return (
    <LocaleContext.Consumer>
      {locale => <ButtonGroupRoot {...props} locale={locale.buttongroup} />}
    </LocaleContext.Consumer>
  );
}

ButtonGroup.defaultProps = {
  disabled: false,
  onClick: () => {},
  shape: SHAPE.default,
  size: SIZE.default,
};
