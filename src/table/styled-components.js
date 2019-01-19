/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

export const Root = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.borders.border300,
    borderRadius: $theme.borders.radius200,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  };
});

export const Head = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    backgroundColor: $theme.colors.white,
    // TODO: need to add a var in theme for this
    // required so that the shadow does not extend to left/right
    boxShadow: '0 1px 4px -1px hsla(0, 0%, 0%, 0.16)',
    display: 'flex',
    flexGrow: 0,
    position: 'sticky',
    top: 0,
  };
});

export const HeadCell = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.typography.font350,
    ...$theme.borders.border300,
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    paddingTop: $theme.sizing.scale500,
    paddingRight: 0,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
    width: '100%',
    ':last-of-type': {
      borderRight: 'none',
    },
  };
});

export const Body = styled('div', {});

export const Row = styled('div', ({$theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Cell = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.typography.font300,
    display: 'flex',
    flex: 1,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  };
});

export const Loading = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.typography.font300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});
