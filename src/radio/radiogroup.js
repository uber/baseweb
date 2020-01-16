/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {RadioGroupRoot as StyledRadioGroupRoot} from './styled-components.js';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types.js';

class StatelessRadioGroup extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    name: '',
    value: '',
    disabled: false,
    autoFocus: false,
    labelPlacement: 'right',
    align: 'vertical',
    isError: false,
    required: false,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
    overrides: {},
  };

  render() {
    const {overrides = {}} = this.props;
    const [RadioGroupRoot, radioGroupRootProps] = getOverrides(
      overrides.RadioGroupRoot,
      StyledRadioGroupRoot,
    );

    if (__DEV__) {
      const overrideKeys = Object.keys(overrides);
      // TODO(v10)
      if (overrideKeys.length && !overrideKeys.includes('RadioGroupRoot')) {
        // eslint-disable-next-line no-console
        console.warn(`All overrides beside 'RadioGroupRoot' will be deprecated in the next major version update.
          Pass other overrides to the 'Radio' children instead.
        `);
      }
    }

    return (
      <RadioGroupRoot
        role="radiogroup"
        aria-label={this.props['aria-label']}
        aria-labelledby={this.props['aria-labelledby']}
        $align={this.props.align}
        $disabled={this.props.disabled}
        $isError={this.props.isError}
        $required={this.props.required}
        {...radioGroupRootProps}
      >
        {React.Children.map(this.props.children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            autoFocus: this.props.autoFocus,
            checked: this.props.value === child.props.value,
            disabled: this.props.disabled || child.props.disabled,
            isError: this.props.isError,
            labelPlacement: this.props.labelPlacement,
            name: this.props.name,
            onBlur: this.props.onBlur,
            onChange: this.props.onChange,
            onFocus: this.props.onFocus,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave,
            // will need to remove overrides pass-through on next major version
            overrides: {...this.props.overrides, ...child.props.overrides},
          });
        })}
      </RadioGroupRoot>
    );
  }
}

export default StatelessRadioGroup;
