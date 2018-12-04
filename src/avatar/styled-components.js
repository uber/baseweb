/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles';
import type {StylePropsT} from './types';

function getSize(props: StylePropsT) {
  const {$size, $theme} = props;

  const defaultSize = $theme.sizing.scale1000;
  const size = $size || defaultSize;
  return $theme.sizing[size] || size;
}

export const Avatar = styled('img', (props: StylePropsT) => {
  const themedSize = getSize(props);

  return {
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'block',
    height: themedSize,
    width: themedSize,
  };
});
Avatar.displayName = 'StyledAvatar';

export const Root = styled('div', (props: StylePropsT) => {
  const {$didImageFailToLoad} = props;
  const themedSize = getSize(props);

  return {
    backgroundColor: props.$theme.colors.mono400,
    borderRadius: '50%',
    boxSizing: 'border-box',
    display: 'inline-block',

    // image previously set the root height/width
    // since image is not rendered, set the height/width
    height: $didImageFailToLoad ? themedSize : null,
    width: $didImageFailToLoad ? themedSize : null,
  };
});
Root.displayName = 'StyledRoot';
