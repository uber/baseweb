/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import {MODE} from './constants.js';
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

type LocaleT = {|locale?: ButtonGroupLocaleT|};
export function ButtonGroupRoot(props: {|...PropsT, ...LocaleT|}) {
  const {overrides = {}, mode = MODE.checkbox} = props;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const isRadio = mode === MODE.radio;

  const numItems = React.Children.count(props.children);
  const refs: {
    // eslint-disable-next-line flowtype/no-weak-types
    current: {[key: number]: React.ElementRef<any>},
  } = React.useRef({});

  return (
    <Root
      aria-label={
        props.ariaLabel || (props.locale ? props.locale.ariaLabel : '')
      }
      data-baseweb="button-group"
      role={isRadio ? 'radiogroup' : 'group'}
      {...rootProps}
    >
      {React.Children.map(props.children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const selected = isSelected(props.selected, index);
        if (isRadio) {
          refs.current[index] = React.createRef<HTMLButtonElement>();
        }
        return React.cloneElement(child, {
          disabled: props.disabled || child.props.disabled,
          isSelected: selected,
          ref: isRadio ? refs.current[index] : undefined,
          tabIndex:
            !isRadio ||
            selected ||
            (isRadio &&
              (!props.selected || props.selected === -1) &&
              index === 0)
              ? 0
              : -1,
          onKeyDown: e => {
            if (!isRadio) return;
            const value = Number(props.selected) ? Number(props.selected) : 0;
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
              e.preventDefault && e.preventDefault();
              const prevIndex = value - 1 < 0 ? numItems - 1 : value - 1;
              props.onClick && props.onClick(e, prevIndex);
              refs.current[prevIndex].current &&
                refs.current[prevIndex].current.focus();
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
              e.preventDefault && e.preventDefault();
              const nextIndex = value + 1 > numItems - 1 ? 0 : value + 1;
              props.onClick && props.onClick(e, nextIndex);
              refs.current[nextIndex].current &&
                refs.current[nextIndex].current.focus();
            }
          },
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
          shape: props.shape,
          size: props.size,
          overrides: {
            BaseButton: {
              style: () => {
                // Even though baseui's buttons have square corners, some applications override to
                // rounded. Maintaining corner radius in this circumstance is ideal to avoid further
                // customization.
                if (props.children.length === 1) {
                  return {};
                }

                // left most button
                if (index === 0) {
                  return {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  };
                }
                // right most button
                if (index === props.children.length - 1) {
                  return {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  };
                }
                // inner button
                return {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                };
              },
              props: {
                'aria-checked': selected,
                role: isRadio ? 'radio' : 'checkbox',
              },
            },

            ...child.props.overrides,
          },
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
  kind: KIND.secondary,
};
