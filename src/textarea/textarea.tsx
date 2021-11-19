/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { TextareaPropsT } from './types';
import { mergeOverrides, getOverrides } from '../helpers/overrides';
import { BaseInput, SIZE, CUSTOM_INPUT_TYPE } from '../input';
import { StyledTextAreaRoot, StyledTextarea, StyledTextareaContainer } from './styled-components';

import type { FocusEvent } from 'react';

class Textarea extends React.Component<
  TextareaPropsT,
  {
    isFocused: boolean;
  }
> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    readOnly: false,
    error: false,
    name: '',
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    overrides: {},
    placeholder: '',
    required: false,
    rows: 3,
    size: SIZE.default,
  };

  state = {
    isFocused: (this.props.autoFocus && !this.props.readOnly) || false,
  };

  onFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!this.props.readOnly) {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
    }
  };

  onBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!this.props.readOnly) {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
    }
  };

  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledTextAreaRoot);
    const inputOverrides = mergeOverrides(
      {
        Input: { component: StyledTextarea },
        InputContainer: { component: StyledTextareaContainer },
      },
      overrides
    );

    return (
      <Root
        data-baseweb="textarea"
        $isFocused={this.state.isFocused}
        $isReadOnly={this.props.readOnly}
        $disabled={this.props.disabled}
        $error={this.props.error}
        $positive={this.props.positive}
        $required={this.props.required}
        {...rootProps}
      >
        {/* $FlowFixMe */}
        <BaseInput
          {...this.props}
          type={CUSTOM_INPUT_TYPE.textarea}
          // $FlowFixMe[incompatible-indexer]
          overrides={inputOverrides}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </Root>
    );
  }
}

export default Textarea;
