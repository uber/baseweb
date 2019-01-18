import React from 'react';
import {styled} from 'baseui';
import {StatefulInput, StyledInputContainer} from 'baseui/input';

const RootWithStyle = styled(StyledInputContainer, props => {
  const {
    $disabled,
    $error,
    $isFocused,
    $theme: {colors, sizing},
  } = props;
  return {
    borderColor: $disabled
      ? colors.borderAlt
      : $error
        ? colors.borderError
        : $isFocused
          ? 'darkseagreen'
          : colors.border,
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

export default () => (
  <StatefulInput
    overrides={{InputContainer: {component: RootWithStyle}}}
    placeholder="Input with a custom InputContainer override"
  />
);
