// @flow
import React from 'react';
import {withStyle} from 'baseui';
import {Input, StyledRoot} from 'baseui/input';

const RootWithStyle = withStyle(StyledRoot, props => {
  const {
    $disabled,
    $error,
    $isFocused,
    $theme: {colors, sizing},
  } = props;
  const borderColor = $disabled
    ? colors.borderAlt
    : $error
    ? colors.borderError
    : $isFocused
    ? 'darkseagreen'
    : colors.border;
  return {
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    boxShadow: `0 0 ${sizing.scale100} ${
      $disabled
        ? 'transparent'
        : $error
        ? colors.shadowError
        : $isFocused
        ? 'lightseagreen'
        : 'transparent'
    }`,
  };
});

export default function Example() {
  return (
    <Input
      overrides={{Root: {component: RootWithStyle}}}
      placeholder="Input with a custom InputContainer override"
    />
  );
}
