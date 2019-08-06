import React from 'react';
import {Input} from 'baseui/input';

export default () => (
  <Input
    overrides={{
      InputContainer: {
        style: props => {
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
        },
      },
    }}
    placeholder="Input with a custom InputContainer override"
  />
);
