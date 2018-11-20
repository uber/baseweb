/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
import {ALIGN} from './index';

export const Root = styled('div', props => {
  const {$theme} = props;
  const {
    sizing: {scale500},
    typography: {font400},
    colors: {mono500},
  } = $theme;
  return {
    ...font400,
    display: 'flex',
    paddingBottom: scale500,
    paddingTop: scale500,
    borderBottom: `1px solid ${mono500}`,
  };
});

export const NavigationItem = styled('div', props => {
  const {$theme} = props;
  const {
    sizing: {scale800},
  } = $theme;
  return {
    alignSelf: 'center',
    paddingLeft: scale800,
  };
});

export const NavigationList = styled('div', props => {
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
    flex: $align === ALIGN.right || $align === ALIGN.left ? 'none' : '1',
    paddingLeft: scale800,
    paddingRight: scale800,
    justifySelf: $align,
    justifyContent: $align,
  };
});
