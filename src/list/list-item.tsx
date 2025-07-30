/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { getOverrides } from '../helpers/overrides';

import { ARTWORK_SIZES, SHAPE } from './constants';
import {
  StyledRoot,
  StyledContent,
  StyledEndEnhancerContainer,
  StyledArtworkContainer,
} from './styled-components';
import type { ListProps } from './types';
import { artworkSizeToValue } from './utils';

const ListItem = React.forwardRef<HTMLLIElement, ListProps>((props: ListProps, ref) => {
  const { overrides = {} } = props;
  const Artwork = props.artwork;
  const EndEnhancer = props.endEnhancer;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ArtworkContainer, artworkContainerProps] = getOverrides(
    overrides.ArtworkContainer,
    StyledArtworkContainer
  );
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(
    overrides.EndEnhancerContainer,
    StyledEndEnhancerContainer
  );

  const artworkSize = React.useMemo(() => {
    if (props.sublist) {
      let size = props.artworkSize || ARTWORK_SIZES.SMALL;
      if (props.artworkSize === ARTWORK_SIZES.MEDIUM) {
        size = ARTWORK_SIZES.SMALL;
        if (__DEV__) {
          console.warn(
            'When ListItem sublist prop is true, artworkSize MEDIUM is aliased to SMALL'
          );
        }
      }
      return size;
    } else {
      return props.artworkSize || ARTWORK_SIZES.MEDIUM;
    }
  }, [props.artworkSize, props.sublist]);

  const isTapTarget = Boolean(props.onClick);
  const hasDivider = Boolean(props?.hasDivider ?? true);

  const getMainTextFromChild = (child: React.ReactNode | React.ReactNode[] | string) => {
    if (typeof child === 'string') {
      return child;
    } else if (React.isValidElement(child)) {
      return getMainTextFromChild(child.props.children);
    } else {
      return 'List item';
    }
  };

  const listItemName =
    React.Children.count(props.children) === 0
      ? ['List item']
      : React.Children.map(props.children, (child) => {
          return getMainTextFromChild(child);
        });

  // @ts-expect-error todo(ts-migration) TS18049 'listItemName' is possibly 'null' or 'undefined'.
  const ariaLabel = props.hasOwnProperty('aria-label') ? props['aria-label'] : listItemName[0];

  return (
    <Root
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      $shape={props.shape || SHAPE.DEFAULT}
      $as={isTapTarget ? 'button' : 'li'}
      $isTapTarget={isTapTarget}
      aria-label={props.role !== 'presentation' ? ariaLabel : null}
      aria-selected={props['aria-selected']}
      id={props.id}
      role={props.role}
      onClick={props.onClick}
      {...rootProps}
    >
      {Artwork && (
        <ArtworkContainer
          $artworkSize={artworkSize}
          $sublist={Boolean(props.sublist)}
          {...artworkContainerProps}
        >
          <Artwork
            size={
              typeof artworkSize === 'number'
                ? artworkSize
                : artworkSizeToValue(artworkSize, Boolean(props.sublist))
            }
          />
        </ArtworkContainer>
      )}

      <Content
        $mLeft={!Artwork}
        $sublist={!!props.sublist}
        $hasDivider={hasDivider}
        {...contentProps}
      >
        {props.children}
        {EndEnhancer &&
          // @ts-expect-error todo(flow->ts) it is not expected to be a number
          EndEnhancer !== 0 && (
            <EndEnhancerContainer {...endEnhancerContainerProps}>
              <EndEnhancer />
            </EndEnhancerContainer>
          )}
      </Content>
    </Root>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
