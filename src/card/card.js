/* @flow */

import React from 'react';
import type {Node} from 'react';
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

import type {OverrideObjectT} from '../helpers/overrides';

export type Props = {
  +action?: Node,
  +children?: Node,
  +hasThumbnail: ({+thumbnail?: string}) => boolean,
  +headerImage?: string,
  +overrides: {
    Action?: OverrideObjectT<?{}>,
    Body?: OverrideObjectT<?{}>,
    Contents?: OverrideObjectT<?{}>,
    HeaderImage?: OverrideObjectT<?{}>,
    Root?: OverrideObjectT<?{}>,
    Thumbnail?: OverrideObjectT<?{}>,
    Title?: OverrideObjectT<?{}>,
  },
  +thumbnail?: string,
  +title?: Node,
};

export function hasThumbnail(props: {+thumbnail?: string}) {
  return Boolean(props.thumbnail);
}

function Card(props: Props) {
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
    <Root {...getOverrideProps(RootOverride)} {...otherProps}>
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
