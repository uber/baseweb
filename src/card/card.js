/* @flow */

import React from 'react';
import type {Node} from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
  Wrapper as StyledWrapper,
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
    Thumbnail?: OverrideObjectT<?{}>,
    Title?: OverrideObjectT<?{}>,
    Wrapper?: OverrideObjectT<?{}>,
  },
  +thumbnail?: string,
  +title?: Node,
};

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
    Thumbnail: ThumbnailOverride,
    Title: TitleOverride,
    Wrapper: WrapperOverride,
  } = props.overrides;

  const Action = getOverride(ActionOverride) || StyledAction;
  const Body = getOverride(BodyOverride) || StyledBody;
  const Contents = getOverride(ContentsOverride) || StyledContents;
  const HeaderImage = getOverride(HeaderImageOverride) || StyledHeaderImage;
  const Thumbnail = getOverride(ThumbnailOverride) || StyledThumbnail;
  const Title = getOverride(TitleOverride) || StyledTitle;
  const Wrapper = getOverride(WrapperOverride) || StyledWrapper;

  const $hasThumbnail = hasThumbnail(props);
  return (
    <Wrapper {...getOverrideProps(WrapperOverride)} {...otherProps}>
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
    </Wrapper>
  );
}

Card.defaultProps = {
  action: null,
  children: null,
  hasThumbnail: (props: {+thumbnail?: string}) => Boolean(props.thumbnail),
  overrides: {},
};

export default Card;
