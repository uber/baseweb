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
export const Root = styled('table', ({$theme}: SharedStylePropsT) => {
  const {borders} = $theme;
  return {
    ...borders.border400,
    borderCollapse: 'separate',
    borderRadius: borders.radius200,
  };
});

export const Head = styled('thead', ({$theme}: SharedStylePropsT) => {
  const {lighting, borders} = $theme;
  return {
    textAlign: 'left',
    boxShadow: lighting.shadow400,
    borderTopRightRadius: borders.radius200,
    borderTopLeftRadius: borders.radius200,
  };
});

export const HeadCell = styled('th', ({$theme}: SharedStylePropsT) => {
  const {borders, sizing, typography} = $theme;
  return {
    padding: `${sizing.scale550} ${sizing.scale0} ${sizing.scale550} ${
      sizing.scale600
    }`,
    ...typography.font350,
    boxSizing: 'border-box',
    height: sizing.scale1200,
    width: sizing.scale1200,
    ...borders.border300,
    borderLeft: 'none',
    borderTop: 'none',
    borderBottom: 'none',
    ':last-child': {
      border: 'none',
    },
  };
});
export const Body = styled('tbody', (props: SharedStylePropsT) => {
  return {};
});
export const Row = styled('tr', (props: SharedStylePropsT) => {
  return {};
});
export const Cell = styled('td', ({$theme}: SharedStylePropsT) => {
  const {sizing, typography} = $theme;
  return {
    ...typography.font300,
    padding: `${sizing.scale300} ${sizing.scale600}`,
    boxSizing: 'border-box',
  };
});
