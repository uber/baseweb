/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';

import type {StylePropsT} from './types.js';

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const StyledTreeItemList = styled<StylePropsT>(
  'ul',
  ({$theme, $isChildNode}) => {
    return {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: $isChildNode ? $theme.sizing.scale800 : 0,
      marginRight: 0,
      overflow: 'auto',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      position: 'relative',
    };
  },
);

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const StyledTreeItem = styled<StylePropsT>('li', ({$theme}) => {
  return {
    cursor: 'pointer',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    minHeight: $theme.sizing.scale800,
    overflow: 'auto',
    paddingTop: $theme.sizing.scale300,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    position: 'relative',
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const StyledItemContent = styled<StylePropsT>('div', ({$theme}) => {
  return {
    ...$theme.typography.font300,
    alignItems: 'center',
    boxSizing: 'border-box',
    color: $theme.colors.primary,
    display: 'flex',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: $theme.sizing.scale1200,
    marginRight: 0,
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const StyledIconContainer = styled<StylePropsT>('div', ({$theme}) => {
  return {
    ...$theme.borders.border600,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    left: $theme.sizing.scale800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: $theme.sizing.scale300,
    position: 'absolute',
  };
});
