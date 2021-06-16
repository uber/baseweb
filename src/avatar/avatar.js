/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {
  Avatar as StyledAvatar,
  Initials as StyledInitials,
  Root as StyledRoot,
} from './styled-components.js';
import type {PropsT} from './types.js';

function getInitials(name) {
  const words = name.split(' ');
  const initials = words.map(word => word[0]);
  return initials
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({
  initials,
  name = '',
  overrides = {},
  size = 'scale1000',
  src,
}: PropsT) {
  // $FlowFixMe
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  function handleLoad() {
    setImageLoaded(true);
  }

  function handleError() {
    setImageLoaded(false);
  }

  React.useEffect(() => {
    setImageLoaded(false);

    if (imageRef.current) {
      if (typeof src === 'string') {
        imageRef.current.src = src;
        imageRef.current.onload = handleLoad;
        imageRef.current.onerror = handleError;
      }
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.onload = null;
        imageRef.current.onerror = null;
      }
    };
  }, [src]);

  const [Avatar, avatarProps] = getOverrides(overrides.Avatar, StyledAvatar);
  const [Initials, initialsProps] = getOverrides(
    overrides.Initials,
    StyledInitials,
  );
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

  return (
    <Root
      aria-label={imageLoaded ? null : name}
      role={imageLoaded ? null : 'img'}
      $didImageFailToLoad={!imageLoaded}
      $size={size}
      data-baseweb="avatar"
      {...rootProps}
    >
      <Avatar
        ref={imageRef}
        alt={name}
        $imageLoaded={imageLoaded}
        $size={size}
        {...avatarProps}
      />

      {!imageLoaded && (
        <Initials {...initialsProps}>{initials || getInitials(name)}</Initials>
      )}
    </Root>
  );
}
