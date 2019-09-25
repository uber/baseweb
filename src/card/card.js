/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* @flow */

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Root as StyledRoot,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
} from './styled-components.js';

import type {CardsPropsT} from './types.js';

export function hasThumbnail(props: {+thumbnail?: string}) {
  return !!props.thumbnail;
}

function Card(props: CardsPropsT) {
  const {
    action,
    children,
    hasThumbnail,
    headerImage,
    thumbnail: thumbnailSrc,
    title,
    overrides,
    ...restProps
  } = props;

  const {
    Action: ActionOverride,
    Body: BodyOverride,
    Contents: ContentsOverride,
    HeaderImage: HeaderImageOverride,
    Root: RootOverride,
    Thumbnail: ThumbnailOverride,
    Title: TitleOverride,
  } = overrides;

  const [Action, getActionProps] = getOverrides<{}>(
    ActionOverride,
    StyledAction,
  );
  const [Body, getBodyProps] = getOverrides<{}>(BodyOverride, StyledBody);
  const [Contents, getContentsProps] = getOverrides<{}>(
    ContentsOverride,
    StyledContents,
  );
  const [HeaderImage, getHeaderImageProps] = getOverrides<{}>(
    HeaderImageOverride,
    StyledHeaderImage,
  );
  const [Root, getRootProps] = getOverrides<{}>(RootOverride, StyledRoot);
  const [Thumbnail, getThumbnailProps] = getOverrides<{}>(
    ThumbnailOverride,
    StyledThumbnail,
  );
  const [Title, getTitleProps] = getOverrides<{}>(TitleOverride, StyledTitle);

  const $hasThumbnail = hasThumbnail(props);
  return (
    <Root data-baseweb="card" {...restProps} {...getRootProps({})}>
      {headerImage && (
        <HeaderImage src={headerImage} {...getHeaderImageProps({})} />
      )}
      <Contents {...getContentsProps({})}>
        {thumbnailSrc && (
          <Thumbnail src={thumbnailSrc} {...getThumbnailProps({})} />
        )}
        {title && (
          <Title $hasThumbnail={$hasThumbnail} {...getThumbnailProps({})}>
            {title}
          </Title>
        )}
        <Body {...getBodyProps({})}>{children}</Body>
        {action && <Action {...getActionProps({})}>{action}</Action>}
      </Contents>
    </Root>
  );
}

Card.defaultProps = {
  action: null,
  children: null,
  hasThumbnail,
  overrides: {},
};

export default Card;
