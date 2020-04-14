/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';

const SkipToContent = () => {
  const [, theme] = useStyletron();
  return (
    <StyledLink
      href="#docSearch-content"
      $style={{
        top: '-80px',
        left: theme.sizing.scale600,
        position: 'fixed',
        paddingTop: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
        paddingLeft: theme.sizing.scale1000,
        paddingRight: theme.sizing.scale1000,
        backgroundColor: theme.colors.backgroundSecondary,
        ':focus': {
          top: theme.sizing.scale600,
          outlineOffset: '-3px',
          transition: `top ${theme.animation.timing200} ${theme.animation.easeInCurve} 0ms`,
        },
      }}
    >
      Skip to content
    </StyledLink>
  );
};

export default SkipToContent;
