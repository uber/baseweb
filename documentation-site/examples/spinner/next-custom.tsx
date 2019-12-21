import * as React from 'react';
import {StyledSpinnerNext} from 'baseui/spinner';
import {Theme} from 'baseui/theme';

export default () => (
  <StyledSpinnerNext
    $style={({$theme}: {$theme: Theme}) => ({
      width: $theme.sizing.scale2400, // 96px
      height: $theme.sizing.scale2400, // 96px
      borderWidth: $theme.sizing.scale500, // 12px
      borderTopColor: $theme.colors.negative,
    })}
  />
);
