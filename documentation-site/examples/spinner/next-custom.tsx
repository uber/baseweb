import * as React from 'react';
import {withStyle} from 'baseui';
import {StyledSpinnerNext} from 'baseui/spinner';

const ExtraLargeSpinner = withStyle(
  StyledSpinnerNext,
  ({$theme}) => ({
    width: $theme.sizing.scale2400, // 96px
    height: $theme.sizing.scale2400, // 96px
    borderWidth: $theme.sizing.scale500, // 12px
    borderTopColor: $theme.colors.negative,
  }),
);

export default () => <ExtraLargeSpinner />;
