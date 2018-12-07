/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {
  Avatar as StyledAvatar,
  Root as StyledRoot,
} from './styled-components.js';
import type {PropsT, StateT} from './types.js';

export default class Avatar extends React.Component<PropsT, StateT> {
  static defaultProps: $Shape<PropsT> = {
    overrides: {},
    size: 'scale1000',
  };

  state = {didImageFailToLoad: false};

  handleError = () => {
    this.setState({didImageFailToLoad: true});
  };

  render() {
    const {didImageFailToLoad} = this.state;
    const {name, overrides = {}, size, src} = this.props;
    const [Avatar, avatarProps] = getOverrides(overrides.Avatar, StyledAvatar);
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root
        aria-label={didImageFailToLoad ? name : null}
        role={didImageFailToLoad ? 'img' : null}
        $didImageFailToLoad={didImageFailToLoad}
        $size={size}
        {...rootProps}
      >
        {!didImageFailToLoad && (
          <Avatar
            alt={name}
            onError={this.handleError}
            src={src}
            $size={size}
            {...avatarProps}
          />
        )}
      </Root>
    );
  }
}
