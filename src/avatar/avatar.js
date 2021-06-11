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
import type {PropsT, StateT} from './types.js';

function getInitials(name) {
  const words = name.split(' ');
  const initials = words.map(word => word[0]);
  return initials
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default class Avatar extends React.Component<PropsT, StateT> {
  static defaultProps: $Shape<PropsT> = {
    overrides: {},
    size: 'scale1000',
  };

  active: boolean;

  constructor(props: PropsT) {
    super(props);
    this.state = {noImageAvailable: !this.props.src};
  }

  componentDidMount() {
    // using this approach instead of attaching onError to image to make sure that
    // it works on server side too.
    if (!this.props.src) {
      return;
    }
    this.active = true;

    const image = new Image();
    image.onload = () => {
      if (!this.active) {
        return;
      }
      this.setState({noImageAvailable: false});
    };
    image.onerror = () => {
      if (!this.active) {
        return;
      }
      this.setState({noImageAvailable: true});
    };
    image.src = this.props.src;
  }

  componentWillUnmount() {
    this.active = false;
  }

  componentDidUpdate(prevProps: PropsT, prevState: StateT) {
    if (prevProps.src !== this.props.src) {
      this.setState({noImageAvailable: !this.props.src});
    }
  }

  render() {
    const {noImageAvailable} = this.state;
    const {name, overrides = {}, size, src} = this.props;
    const [Avatar, avatarProps] = getOverrides(overrides.Avatar, StyledAvatar);
    const [Initials, initialsProps] = getOverrides(
      overrides.Initials,
      StyledInitials,
    );
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root
        aria-label={noImageAvailable ? name : null}
        role={noImageAvailable ? 'img' : null}
        $didImageFailToLoad={noImageAvailable}
        $size={size}
        data-baseweb="avatar"
        {...rootProps}
      >
        {noImageAvailable ? (
          <Initials {...initialsProps}>
            {this.props.initials || getInitials(name)}
          </Initials>
        ) : (
          <Avatar alt={name} src={src} $size={size} {...avatarProps} />
        )}
      </Root>
    );
  }
}
