import React from 'react';
import {styled} from 'baseui';
import {Button} from 'baseui/button';

const BaseButton = styled('button', ({$theme, $disabled}) => {
  return {
    background: $disabled
      ? $theme.colors.negative400
      : $theme.colors.warning400,
    color: $theme.colors.background,
  };
});

export default () => (
  <Button
    disabled
    overrides={{
      BaseButton,
    }}
  >
    this is a BaseButton
  </Button>
);
