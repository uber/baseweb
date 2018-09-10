/* @flow */

import React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Root as StyledRoot,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
} from './styled-components';

import type {CardsPropsT} from './types';

export function hasThumbnail(props: {+thumbnail?: string}) {
  return Boolean(props.thumbnail);
}

function Card(props: CardsPropsT) {
  const {
    action,
    children,
    hasThumbnail,
    headerImage,
    thumbnail: thumbnailSrc,
    title,
    ...otherProps
  } = props;

  const {
    Action: ActionOverride,
    Body: BodyOverride,
    Contents: ContentsOverride,
    HeaderImage: HeaderImageOverride,
    Root: RootOverride,
    Thumbnail: ThumbnailOverride,
    Title: TitleOverride,
  } = props.overrides;

  const Action = getOverride(ActionOverride) || StyledAction;
  const Body = getOverride(BodyOverride) || StyledBody;
  const Contents = getOverride(ContentsOverride) || StyledContents;
  const HeaderImage = getOverride(HeaderImageOverride) || StyledHeaderImage;
  const Root = getOverride(RootOverride) || StyledRoot;
  const Thumbnail = getOverride(ThumbnailOverride) || StyledThumbnail;
  const Title = getOverride(TitleOverride) || StyledTitle;

  const $hasThumbnail = hasThumbnail(props);
  return (
    <Root {...otherProps} {...getOverrideProps(RootOverride)}>
      {headerImage && (
        <HeaderImage
          src={headerImage}
          {...getOverrideProps(HeaderImageOverride)}
        />
      )}
      <Contents {...getOverrideProps(ContentsOverride)}>
        {thumbnailSrc && (
          <Thumbnail
            src={thumbnailSrc}
            {...getOverrideProps(ThumbnailOverride)}
          />
        )}
        {title && (
          <Title
            $hasThumbnail={$hasThumbnail}
            {...getOverrideProps(TitleOverride)}
          >
            {title}
          </Title>
        )}
        <Body {...getOverrideProps(BodyOverride)}>{children}</Body>
        {action && <Action>{action}</Action>}
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
