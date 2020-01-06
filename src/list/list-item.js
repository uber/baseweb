/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {ARTWORK_SIZES} from './constants.js';
import {
  StyledRoot,
  StyledContent,
  StyledEndEnhancerContainer,
  StyledArtworkContainer,
} from './styled-components.js';
import type {PropsT} from './types.js';

function artworkSizeToIconSize(artworkSize, isSublist) {
  if (isSublist) {
    switch (artworkSize) {
      case ARTWORK_SIZES.LARGE:
        return 22;
      case ARTWORK_SIZES.SMALL:
      default:
        return 16;
    }
  }

  switch (artworkSize) {
    case ARTWORK_SIZES.SMALL:
      return 16;
    case ARTWORK_SIZES.LARGE:
      return 33;
    case ARTWORK_SIZES.MEDIUM:
    default:
      return 22;
  }
}

const ListItem = React.forwardRef<PropsT, HTMLLIElement>(
  (props: PropsT, ref) => {
    const {overrides = {}} = props;
    const Artwork = props.artwork;
    const EndEnhancer = props.endEnhancer;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [ArtworkContainer, artworkContainerProps] = getOverrides(
      overrides.ArtworkContainer,
      StyledArtworkContainer,
    );
    const [Content, contentProps] = getOverrides(
      overrides.Content,
      StyledContent,
    );
    const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(
      overrides.EndEnhancerContainer,
      StyledEndEnhancerContainer,
    );

    const artworkSize = React.useMemo(() => {
      if (props.sublist) {
        let size = props.artworkSize || ARTWORK_SIZES.SMALL;
        if (props.artworkSize === ARTWORK_SIZES.MEDIUM) {
          size = ARTWORK_SIZES.SMALL;
          if (__DEV__) {
            console.warn(
              'When ListItem sublist prop is true, artworkSize MEDIUM is aliased to SMALL',
            );
          }
        }
        return size;
      } else {
        return props.artworkSize || ARTWORK_SIZES.MEDIUM;
      }
    }, [props.artworkSize, props.sublist]);

    return (
      // eslint-disable-next-line flowtype/no-weak-types
      <Root ref={(ref: any)} {...rootProps}>
        {Artwork && (
          <ArtworkContainer
            $artworkSize={artworkSize}
            {...artworkContainerProps}
          >
            <Artwork size={artworkSizeToIconSize(artworkSize, props.sublist)} />
          </ArtworkContainer>
        )}
        <Content $mLeft={!Artwork} $sublist={!!props.sublist} {...contentProps}>
          {props.children}
          {EndEnhancer && (
            <EndEnhancerContainer {...endEnhancerContainerProps}>
              <EndEnhancer />
            </EndEnhancerContainer>
          )}
        </Content>
      </Root>
    );
  },
);
ListItem.displayName = 'ListItem';

export default ListItem;
