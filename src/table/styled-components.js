/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

/**
 * Main component container element
 */
export const Root = styled('div', ({$theme}: SharedStylePropsT) => {
  const {borders} = $theme;
  return {
    ...borders.border300,
    borderRadius: borders.radius200,
  };
});

export const Head = styled('div', ({$theme}: SharedStylePropsT) => {
  const {lighting, borders} = $theme;
  return {
    textAlign: 'left',
    boxShadow: lighting.shadow400,
    // borderTopRightRadius: borders.radius200,
    // borderTopLeftRadius: borders.radius200,
    display: 'flex',
    flexDirection: 'row',
    // ...borders.border400,
  };
});

export const HeadCell = styled('div', ({$theme}: SharedStylePropsT) => {
  const {borders, sizing, typography} = $theme;
  return {
    padding: `${sizing.scale500} ${sizing.scale0} ${sizing.scale500} ${
      sizing.scale600
    }`,
    ...typography.font350,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    ...borders.border400,
    borderLeft: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    // ':last-child': {
    //   border: 'none',
    // },
  };
});
export const Body = styled('tbody', (props: SharedStylePropsT) => {
  return {};
});
export const Row = styled('div', (props: SharedStylePropsT) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };
});
export const Cell = styled('div', ({$theme}: SharedStylePropsT) => {
  const {sizing, typography} = $theme;
  return {
    ...typography.font300,
    padding: `${sizing.scale300} ${sizing.scale600}`,
    boxSizing: 'border-box',
  };
});
