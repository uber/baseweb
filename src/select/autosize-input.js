/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {StyledInput, StyledInputSizer} from './styled-components';
import {getOverrides} from '../helpers/overrides';
import type {AutosizeInputPropsT, AutosizeInputStateT} from './types';

export default class AutosizeInput extends React.Component<
  AutosizeInputPropsT,
  AutosizeInputStateT,
> {
  mounted: boolean;
  sizer: ?HTMLElement;

  static defaultProps = {
    inputRef: (React.createRef(): {current: ?HTMLInputElement}),
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
  componentDidUpdate(
    prevProps: AutosizeInputPropsT,
    prevState: AutosizeInputStateT,
  ) {
    this.updateInputWidth();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  sizerRef = (el: ?HTMLElement) => {
    this.sizer = el;
  };
  updateInputWidth() {
    if (
      !this.mounted ||
      !this.sizer ||
      typeof this.sizer.scrollWidth === 'undefined'
    ) {
      return;
    }
    const newInputWidth = this.sizer.scrollWidth + 2;
    if (newInputWidth !== this.state.inputWidth) {
      this.setState({inputWidth: newInputWidth});
    }
  }
  render() {
    const {overrides = {}, inputRef, ...rest} = this.props;
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== undefined) {
          return previousValue;
        }
        return currentValue;
      },
    );
    const componentInputProps = {
      ...rest,
      $width: `${this.state.inputWidth}px`,
    };
    return (
      <React.Fragment>
        <Input {...componentInputProps} $ref={inputRef} {...inputProps} />
        {/* a hidden helper element to calculate the size of the input */}
        <StyledInputSizer $ref={this.sizerRef}>{sizerValue}</StyledInputSizer>
      </React.Fragment>
    );
  }
}
