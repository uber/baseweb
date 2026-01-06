/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { KIND, SIZE, SHAPE } from '../button';
import { MODE, PADDING } from './constants';
import { getOverrides } from '../helpers/overrides';
import { LocaleContext } from '../locale';

import { StyledRoot } from './styled-components';
import type { ButtonGroupProps } from './types';

// @ts-ignore
function isIndexSelected(selected, index) {
  if (!Array.isArray(selected) && typeof selected !== 'number') {
    return false;
  }

  if (Array.isArray(selected)) {
    return selected.includes(index);
  }

  return selected === index;
}

export default class ButtonGroup extends React.Component<ButtonGroupProps> {
  childRefs: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: number]: React.RefObject<any>;
  } = {};
  static defaultProps = {
    disabled: false,
    onClick: () => {},
    shape: SHAPE.default,
    size: SIZE.default,
    kind: KIND.secondary,
    padding: PADDING.none,
  };
  render() {
    const {
      overrides = {},
      mode,
      children,
      selected,
      disabled,
      onClick,
      kind,
      shape,
      size,
      wrap,
      padding,
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const ariaLabel = this.props['aria-label'] || this.props.ariaLabel;
    const isRadio = mode === MODE.radio;
    const isSimpleClickableBtnGroup =
      (!mode || Object.values(MODE).every((val) => val !== mode)) &&
      typeof selected === 'undefined'; // button group for simple clickable buttons(not checkbox or radio buttons)

    const numItems = React.Children.count(children);

    return (
      <LocaleContext.Consumer>
        {(locale) => (
          <Root
            aria-label={ariaLabel || locale.buttongroup.ariaLabel}
            aria-labelledby={this.props['aria-labelledby']}
            aria-describedby={this.props['aria-describedby']}
            data-baseweb="button-group"
            role={isRadio ? 'radiogroup' : 'group'}
            $size={size}
            $padding={padding}
            $wrap={wrap}
            {...rootProps}
          >
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) {
                return null;
              }

              const isSelected = child.props.isSelected
                ? child.props.isSelected
                : isSimpleClickableBtnGroup
                ? undefined // avoid adding aria-pressed to buttons in actionable button group
                : isIndexSelected(selected, index);

              if (isRadio) {
                this.childRefs[index] = React.createRef<HTMLButtonElement>();
              }
              return React.cloneElement(child as React.ReactElement, {
                disabled: disabled || child.props.disabled,
                isSelected,
                ref: isRadio ? this.childRefs[index] : undefined,
                tabIndex:
                  !isRadio ||
                  isSelected ||
                  (isRadio &&
                    (!selected ||
                      selected === -1 ||
                      (Array.isArray(selected) && selected.length === 0)) &&
                    index === 0)
                    ? 0
                    : -1,
                onKeyDown: (e) => {
                  if (!isRadio) return;
                  const value = Number(selected) ? Number(selected) : 0;
                  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault && e.preventDefault();
                    const prevIndex = value - 1 < 0 ? numItems - 1 : value - 1;
                    onClick && onClick(e, prevIndex);
                    this.childRefs[prevIndex].current && this.childRefs[prevIndex].current.focus();
                  }
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault && e.preventDefault();
                    const nextIndex = value + 1 > numItems - 1 ? 0 : value + 1;
                    onClick && onClick(e, nextIndex);
                    this.childRefs[nextIndex].current && this.childRefs[nextIndex].current.focus();
                  }
                },
                kind,
                onClick: (event) => {
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
                    props: {
                      ...(typeof child.props['aria-checked'] === 'boolean'
                        ? {
                            'aria-checked': child.props['aria-checked'],
                          }
                        : isSimpleClickableBtnGroup
                        ? {}
                        : { 'aria-checked': isSelected }),
                      role:
                        child.props.role || isRadio
                          ? 'radio'
                          : !isSimpleClickableBtnGroup
                          ? 'checkbox'
                          : undefined,
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
