// @flow

import * as React from 'react';
import {StyledSpinnerNext} from 'baseui/spinner';

export default () => (
  <StyledSpinnerNext
    $style={({$theme}) => ({
      width: $theme.sizing.scale2400, // 96px
      height: $theme.sizing.scale2400, // 96px
      borderWidth: $theme.sizing.scale500, // 12px
      borderTopColor: $theme.colors.negative,
    })}
  />
);
