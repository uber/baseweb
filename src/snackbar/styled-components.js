/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => {
  return {
    backgroundColor: $theme.colors.backgroundInverseSecondary,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px',
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)',
    color: $theme.colors.contentInversePrimary,
    display: 'inline-block',
    maxWidth: '540px',
    minWidth: '320px',
  };
});

export const StyledContent = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
});

export const StyledStartEnhancerContainer = styled('span', {
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '16px',
});

export const StyledMessage = styled<{$hasSuffix: boolean}>(
  'p',
  // $FlowFixMe - suppressing due to webkit properties
  ({$theme, $hasSuffix}) => {
    return {
      ...$theme.typography.ParagraphMedium,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      display: '-webkit-box',
      marginTop: '16px',
      marginBottom: '16px',
      overflow: 'hidden',
      paddingRight: $hasSuffix ? '8px' : '16px',
      paddingLeft: '16px',
    };
  },
);

export const StyledWrapActionButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row-reverse',
});

export const StyledActionButtonContainer = styled('div', {});
