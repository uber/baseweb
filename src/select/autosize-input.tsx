/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { StyledInput, StyledInputSizer } from './styled-components';
import { getOverrides } from '../helpers/overrides';
import type { AutosizeInputProps, AutosizeInputState } from './types';
import type { ComponentProps } from 'react';

export default class AutosizeInput extends React.Component<
  AutosizeInputProps & Omit<ComponentProps<typeof StyledInput>, keyof AutosizeInputProps>,
  AutosizeInputState
> {
  // @ts-ignore
  mounted: boolean;
  sizer: HTMLElement | undefined | null;

  static defaultProps = {
    inputRef: React.createRef() as {
      current: HTMLInputElement | null;
    },
    value: '',
    overrides: {},
  };
  state = {
    inputWidth: 5,
  };
  componentDidMount() {
    this.mounted = true;
    this.updateInputWidth();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: AutosizeInputProps, prevState: AutosizeInputState) {
    this.updateInputWidth();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  sizerRef = (el?: HTMLElement | null) => {
    this.sizer = el;
  };
  updateInputWidth() {
    if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
      return;
    }
    const newInputWidth = this.sizer.scrollWidth + 2;
    if (
      newInputWidth !== this.state.inputWidth &&
      this.sizer.scrollWidth !== this.state.inputWidth
    ) {
      this.setState({ inputWidth: newInputWidth });
    }
  }
  render() {
    const { overrides = {}, inputRef, ...restProps } = this.props;
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue;
        }
        return currentValue;
      }
    );
    const componentInputProps = {
      ...restProps,
      $width: `${this.state.inputWidth}px`,
    };
    return (
      <React.Fragment>
        <Input {...componentInputProps} ref={inputRef} {...inputProps} />
        {/* a hidden helper element to calculate the size of the input */}
        <StyledInputSizer
          $size={this.props.$size}
          ref={this.sizerRef}
          $style={inputProps.$style ? inputProps.$style : null}
        >
          {sizerValue}
        </StyledInputSizer>
      </React.Fragment>
    );
  }
}
