/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => {
  return {
    alignItems: 'center',
    backgroundColor: $theme.colors.backgroundInverseSecondary,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px',
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)',
    color: $theme.colors.contentInversePrimary,
    display: 'inline-flex',
    flexWrap: 'wrap',
    maxWidth: '540px',
    minWidth: '320px',
    pointerEvents: 'all',
  };
});

export const StyledContent = styled('div', {
  display: 'inline-flex',
  minWidth: '50%',
});

export const StyledStartEnhancer = styled('div', {
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '16px',
});

export const StyledMessage = styled<{$hasSuffix: boolean}>(
  'div',
  // $FlowFixMe - suppressing due to webkit properties
  ({$hasSuffix, $theme}) => {
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

export const StyledAction = styled('div', {
  marginLeft: 'auto',
  marginRight: '4px',
  whiteSpace: 'nowrap',
});
