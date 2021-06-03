import React from 'react';
import {Input} from 'baseui/input';

export default function Example() {
  return (
    <Input
      overrides={{
        Root: {
          style: props => {
            const {
              $disabled,
              $error,
              $isFocused,
              $theme: {colors, sizing},
            } = props;
            const border = $disabled
              ? colors.borderAlt
              : $error
              ? colors.borderError
              : $isFocused
              ? 'darkseagreen'
              : colors.border;
            return {
              borderLeftColor: border,
              borderRightColor: border,
              borderTopColor: border,
              borderBottomColor: border,
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
          },
        },
      }}
      placeholder="Input with a custom InputContainer override"
    />
  );
}
