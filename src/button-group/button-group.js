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

function isSelected(selected, index) {
  if (!Array.isArray(selected) && typeof selected !== 'number') {
    return false;
  }

  if (Array.isArray(selected)) {
    return selected.includes(index);
  }

  return selected === index;
}

export default class ButtonGroup extends React.Component<PropsT> {
  childRefs: // eslint-disable-next-line flowtype/no-weak-types
  {[key: number]: React.ElementRef<any>} = {};
  static defaultProps = {
    disabled: false,
    onClick: () => {},
    shape: SHAPE.default,
    size: SIZE.default,
    kind: KIND.secondary,
  };
  render() {
    const {
      overrides = {},
      mode = MODE.checkbox,
      children,
      ariaLabel,
      selected,
      disabled,
      onClick,
      kind,
      shape,
      size,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const isRadio = mode === MODE.radio;

    const numItems = React.Children.count(children);

    return (
      <LocaleContext.Consumer>
        {locale => (
          <Root
            aria-label={ariaLabel || locale.buttongroup.ariaLabel}
            data-baseweb="button-group"
            role={isRadio ? 'radiogroup' : 'group'}
            {...rootProps}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) {
                return null;
              }
              if (isRadio) {
                this.childRefs[index] = React.createRef<HTMLButtonElement>();
              }
              return React.cloneElement(child, {
                disabled: disabled || child.props.disabled,
                isSelected: isSelected(selected, index),
                ref: isRadio ? this.childRefs[index] : undefined,
                tabIndex:
                  !isRadio ||
                  isSelected(selected, index) ||
                  (isRadio && (!selected || selected === -1) && index === 0)
                    ? 0
                    : -1,
                onKeyDown: e => {
                  if (!isRadio) return;
                  const value = Number(selected) ? Number(selected) : 0;
                  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault && e.preventDefault();
                    const prevIndex = value - 1 < 0 ? numItems - 1 : value - 1;
                    onClick && onClick(e, prevIndex);
                    this.childRefs[prevIndex].current &&
                      this.childRefs[prevIndex].current.focus();
                  }
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault && e.preventDefault();
                    const nextIndex = value + 1 > numItems - 1 ? 0 : value + 1;
                    onClick && onClick(e, nextIndex);
                    this.childRefs[nextIndex].current &&
                      this.childRefs[nextIndex].current.focus();
                  }
                },
                kind,
                onClick: event => {
                  if (disabled) {
                    return;
                  }

                  if (child.props.onClick) {
                    child.props.onClick(event);
                  }

                  if (onClick) {
                    onClick(event, index);
                  }
                },
                shape,
                size,
                overrides: {
                  BaseButton: {
                    style: ({$theme}) => {
                      // Even though baseui's buttons have square corners, some applications override to
                      // rounded. Maintaining corner radius in this circumstance is ideal to avoid further
                      // customization.
                      if (children.length === 1) {
                        return {};
                      }

                      if (shape !== SHAPE.default) {
                        if (index === 0) {
                          return {};
                        }
                        return {
                          marginLeft: $theme.sizing.scale300,
                        };
                      }

                      // left most button
                      if (index === 0) {
                        return {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        };
                      }
                      // right most button
                      if (index === children.length - 1) {
                        return {
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                          marginLeft: '1px',
                        };
                      }
                      // inner button(s)
                      return {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        marginLeft: '1px',
                      };
                    },
                    props: {
                      'aria-checked': isSelected(selected, index),
                      role: isRadio ? 'radio' : 'checkbox',
                    },
                  },

                  ...child.props.overrides,
                },
              });
            })}
          </Root>
        )}
      </LocaleContext.Consumer>
    );
  }
}
