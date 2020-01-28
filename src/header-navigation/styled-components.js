/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {ALIGN} from './constants.js';

export const Root = styled<{}>('nav', props => {
  const {$theme} = props;
  const {
    sizing: {scale500},
    typography: {font300},
    colors: {border},
  } = $theme;
  return {
    ...font300,
    display: 'flex',
    paddingBottom: scale500,
    paddingTop: scale500,
    borderBottom: `1px solid ${border}`,
    backgroundColor: $theme.colors.headerNavigationFill,
  };
});

export const NavigationItem = styled<{}>('li', props => {
  const {$theme} = props;
  const {
    sizing: {scale800},
  } = $theme;
  return {
    alignSelf: 'center',
    paddingLeft: scale800,
  };
});

export const NavigationList = styled<{$align: $Values<typeof ALIGN>}>(
  'ul',
  props => {
    const {$align, $theme} = props;
    const {
      sizing: {scale800},
    } = $theme;
    return {
      display: 'flex',
      ':first-child': {
        padding: 0,
      },
      ':last-child': {
        padding: 0,
      },
      flex: $align === ALIGN.right || $align === ALIGN.left ? 'none' : 1,
      paddingLeft: scale800,
      paddingRight: scale800,
      justifySelf: $align,
      justifyContent: $align,
      listStyle: 'none',
      marginBottom: 0,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
    };
  },
);
